// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

var http = require('http');
var fs = require('fs');
var url = require('url');
var k8s = require('@kubernetes/client-node');
var formidable = require('formidable');
var express = require("express");

const port = process.env.PORT || 8096;
const defaultNamespace = "default";
const configEnvKey = 'KUBECONFIG';
const loginPageUrl = "/login/login.html";
const summaryUrl = "/summary/summary.html";
var k8sApi;
var k8sAppApiClient;
var userInputNamespace = "";

const getNamespaces = (namespace, pretty) => { return k8sApi && k8sApi.listNamespace(pretty); };
const getNamespacedPods = (namespace, pretty, labelFilter) => { return k8sApi && k8sApi.listNamespacedPod(namespace, pretty, undefined,undefined,undefined,labelFilter||""); };
const getServices = (namespace, pretty) => { return k8sApi && k8sApi.listNamespacedService(namespace, pretty); };
const getDeployments = (namespace, pretty) => { return k8sAppApiClient && k8sAppApiClient.listNamespacedDeployment(namespace, pretty); };
const getReplicaSets = (namespace, pretty) => { return k8sAppApiClient && k8sAppApiClient.listNamespacedReplicaSet(namespace, pretty); };

var app = express();
app.use(express.static('dest'));

console.log('Using port:' + port);
app.get('/', function (req, res) {
    res.redirect('/login');
});

app.get('/login', function (req, res) {
    var { requestUrl, namespaceComputed } = getUserInput(req);
    userInputNamespace = namespaceComputed;
    if (isUserLogRequired()) {
        res.sendFile(__dirname + loginPageUrl);
    }
    else {
        var summaryUrl = '/summary?namespace=' + userInputNamespace;
        res.redirect(summaryUrl);
    }
});

app.post('/login', function (req, res) {
    var { requestUrl, namespaceComputed } = getUserInput(req);
    userInputNamespace = namespaceComputed;
    var form = new formidable.IncomingForm();
    var fileName = loginPageUrl;
    form.parse(req, function (err, fields, files) {
        if (!err) {
            if (files && files.fileToUpload && files.fileToUpload.size) {
                process.env[configEnvKey] = files.fileToUpload.path;
                var kc = new k8s.KubeConfig();
                kc.loadFromDefault();
                k8sApi = kc.makeApiClient(k8s.Core_v1Api);
                k8sAppApiClient = kc.makeApiClient(k8s.Apps_v1Api);
                var summaryUrl = '/summary?namespace=' + userInputNamespace;
                res.redirect(summaryUrl);
            }
        }
        else {
            res.redirect('/login');
        }
    });
});

app.get('/summary', function (req, res) {
    var { requestUrl, namespaceComputed } = getUserInput(req);
    userInputNamespace = namespaceComputed;
    var fileName = isUserLogRequired() ? loginPageUrl : summaryUrl;
    res.sendFile(__dirname + fileName);
});

app.get('/getpods', function (req, res) {
    processCommands(req, res, getNamespacedPods);
});

app.get('/getservices', function (req, res) {
    processCommands(req, res, getServices);
});

app.get('/getnamespaces', function (req, res) {
    processCommands(req, res, getNamespaces);
});

app.get('/getdeployments', function (req, res) {
    processCommands(req, res, getDeployments);
});

app.get('/getreplicasets', function (req, res) {
    processCommands(req, res, getReplicaSets);
});

app.get("/logout", function (req, res) {
    var kubConfig = process.env[configEnvKey];
    k8sApi = undefined;
    k8sAppApiClient = undefined;
    process.env[configEnvKey] = "";
    userInputNamespace = defaultNamespace;
    if (kubConfig && fs.existsSync(kubConfig)) {
        fs.unlinkSync(kubConfig);
    }

    res.redirect("/login");
});

app.use(function (req, res, next) {
    var { requestUrl, namespaceComputed } = getUserInput(req);
    if (requestUrl) {
        userInputNamespace = namespaceComputed;
        var fileName = "/summary" + requestUrl;
        res.sendFile(__dirname + fileName);
    }
});

function processCommands(req, res, command) {
    var { requestUrl, namespaceComputed } = getUserInput(req);
    userInputNamespace = namespaceComputed;
    if (userInputNamespace && command) {
        var selector = getLabelSelector(req);
        var promise = selector?command(userInputNamespace, "false", selector):command(userInputNamespace, "false");
        if (promise) {
            promise.then(function (result) {
                var outputRes = JSON.stringify(result.body);
                res.writeHead(result.response.statusCode, { 'Content-Type': 'application/json', 'Content-Length': outputRes.length });
                res.write(outputRes);
                res.end();
            })
                .catch(function (error) {
                    var errorMessage = error && error.message || error;
                    if (errorMessage) {
                        res.writeHead(404, { 'Content-Type': 'text/plain', 'Content-Length': errorMessage.length });
                        res.write(errorMessage);
                        res.end();
                    }
                });
            return true;
        }
        else {
            userInputNamespace = defaultNamespace;
            res.sendFile(__dirname + loginPageUrl);
        }
    }

    return false;
}

function isUserLogRequired(req) {
    return process.env[configEnvKey] ? false : true;
}

function getUserInput(req) {
    var urlObject = url.parse(req.url, true);
    var requestUrl = urlObject.pathname.toLowerCase();
    var namespaceComputed = urlObject.query["namespace"] || userInputNamespace || defaultNamespace;
    console.log('getUserInput requestUrl:' + requestUrl + ' namespace: ' + namespaceComputed);
    return { requestUrl: requestUrl, namespaceComputed: namespaceComputed };
}

function getLabelSelector(req) {
    var urlObject = url.parse(req.url, true);
    var requestUrl = urlObject.pathname.toLowerCase();
    var labelSelector = urlObject.query["labelselector"];
    if(labelSelector) {
        return decodeURIComponent(labelSelector);
    }
    return undefined;
}

exports.listen = function () {
    app.listen.apply(app, arguments);
};

exports.close = function (callback) {
    app.close(callback);
};

app.listen(port);