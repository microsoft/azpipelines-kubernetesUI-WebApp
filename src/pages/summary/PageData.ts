/*
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the MIT license.
*/

import { KubeResourceType, KubeServiceBase } from "@azurepipelines/webapp-kube-summary/dist/Contracts/KubeServiceBase";

// todo :: add  'implements IImageService' to this class once we have the package
export class PageDataService extends KubeServiceBase {
    public fetch(resourceType: KubeResourceType, labelSelector?: string): Promise<any> {
        let url: string = "";
        switch (resourceType) {
            case KubeResourceType.Pods:
                url = "/getpods";
                break;
            case KubeResourceType.Services:
                url = "/getservices";
                break;
            case KubeResourceType.Deployments:
                url = "/getdeployments";
                break;
            case KubeResourceType.ReplicaSets:
                url = "/getreplicasets";
                break;

            case KubeResourceType.DaemonSets:
                url = "/getdaemonsets";
                break;

            case KubeResourceType.StatefulSets:
                url = "/getstatefulsets";
                break;

            default:
                return Promise.resolve([]);
        }
        if (labelSelector) {
            url = url.concat("/?labelselector=", encodeURIComponent(labelSelector));
        }

        console.log(url);
        return this._populateEntities(url);
    }

    public hasImageDetails(listImages: Array<string>): Promise<any> {
        let imageDetails: { [key: string]: boolean } = {};
        if (listImages) {
            for (const image of listImages) {
                if (!imageDetails[image]) {
                    const knownImage: boolean = image.startsWith("https://docker.io/library/redis@sha256:")
                        || image.startsWith("https://k8s.gcr.io/kubernetes-dashboard-amd64@sha256:");
                    imageDetails[image] = knownImage;
                }
            }
        }

        return Promise.resolve({ hasImageDetails: imageDetails });
    }

    public getImageDetails(imageName: string): Promise<any> {
        const sampleImageData = {
            "imageName": imageName,
            "imageUri": imageName,
            "distance": null,
            "imageType": "",
            "mediaType": "",
            "tags": [
                "2"
            ],
            "layerInfo": [
                {
                    "directive": "ADD",
                    "arguments": "file:1d7cb45c4e196a6a84319b976b95ce1a9037c40b085e88350c071bf27ff59166 in /",
                    "size": "88.9MB",
                    "createdOn": new Date(1552350011000)
                },
                {
                    "directive": "RUN",
                    "arguments": "/bin/sh -c set -xe   && echo '#!/bin/sh' > /usr/sbin/policy-rc.d  && echo 'exit 101' >> /usr/sbin/policy-rc.d  && chmod +x /usr/sbin/policy-rc.d   && dpkg-divert --local --rename --add /sbin/initctl  && cp -a /usr/sbin/policy-rc.d /sbin/initctl  && sed -i 's/^exit.*/exit 0/' /sbin/initctl   && echo 'force-unsafe-io' > /etc/dpkg/dpkg.cfg.d/docker-apt-speedup   && echo 'DPkg::Post-Invoke { \"rm -f /var/cache/apt/archives/*.deb /var/cache/apt/archives/partial/*.deb /var/cache/apt/*.bin || true\"; };' > /etc/apt/apt.conf.d/docker-clean  && echo 'APT::Update::Post-Invoke { \"rm -f /var/cache/apt/archives/*.deb /var/cache/apt/archives/partial/*.deb /var/cache/apt/*.bin || true\"; };' >> /etc/apt/apt.conf.d/docker-clean  && echo 'Dir::Cache::pkgcache \"\"; Dir::Cache::srcpkgcache \"\";' >> /etc/apt/apt.conf.d/docker-clean   && echo 'Acquire::Languages \"none\";' > /etc/apt/apt.conf.d/docker-no-languages   && echo 'Acquire::GzipIndexes \"true\"; Acquire::CompressionTypes::Order:: \"gz\";' > /etc/apt/apt.conf.d/docker-gzip-indexes   && echo 'Apt::AutoRemove::SuggestsImportant \"false\";' > /etc/apt/apt.conf.d/docker-autoremove-suggest",
                    "size": "745B",
                    "createdOn": new Date(1552350012000)
                },
                {
                    "directive": "RUN",
                    "arguments": "/bin/sh -c rm -rf /var/lib/apt/lists/",
                    "size": "0B",
                    "createdOn": new Date(1552350013000)
                },
                {
                    "directive": "RUN",
                    "arguments": "/bin/sh -c mkdir -p /run/systemd && echo 'docker' > /run/systemd/containe",
                    "size": "7B",
                    "createdOn": new Date(1552350017000)
                },
                {
                    "directive": "CMD",
                    "arguments": "[\"/bin/bash\"]",
                    "size": "0B",
                    "createdOn": new Date(1552350017000)
                },
                {
                    "directive": "MAINTAINER",
                    "arguments": "demousr@gmail.com",
                    "size": "0B",
                    "createdOn": new Date(1554188266000)
                },
                {
                    "directive": "RUN",
                    "arguments": "/bin/sh -c apt-get updat",
                    "size": "24.7MB",
                    "createdOn": new Date(1554188342000)
                },
                {
                    "directive": "CMD",
                    "arguments": "[\"/bin/sh\" \"-c\" \"[“echo”,”Image created”]\"]",
                    "size": "0B",
                    "createdOn": new Date(1554191934000)
                },
                {
                    "directive": "LABEL",
                    "arguments": "WebAppServer1.image.build.buildnumber=10",
                    "size": "0B",
                    "createdOn": new Date(1554718624000)
                },
                {
                    "directive": "LABEL",
                    "arguments": "WebAppServer1.image.build.definitionname=WebApp-CI",
                    "size": "0B",
                    "createdOn": new Date(1554718625000)
                },
                {
                    "directive": "LABEL",
                    "arguments": "WebAppServer1.image.build.repository.name=WebApp",
                    "size": "0B",
                    "createdOn": new Date(1554718625000)
                },
                {
                    "directive": "LABEL",
                    "arguments": "WebAppServer1.image.build.repository.uri=http://WebAppServer1/AppCollection/WebApp/_git/WebApp",
                    "size": "0B",
                    "createdOn": new Date(1554718626000)
                },
                {
                    "directive": "LABEL",
                    "arguments": "WebAppServer1.image.build.requestedfor=WebApp User",
                    "size": "0B",
                    "createdOn": new Date(1554718626000)
                },
                {
                    "directive": "LABEL",
                    "arguments": "WebAppServer1.image.build.sourcebranchname=master",
                    "size": "0B",
                    "createdOn": new Date(1554718626000)
                },
                {
                    "directive": "LABEL",
                    "arguments": "WebAppServer1.image.build.sourceversion=da9cc268fa2aef15f222817a324cc5e02fee2946",
                    "size": "0B",
                    "createdOn": new Date(1554718627000)
                },
                {
                    "directive": "LABEL",
                    "arguments": "WebAppServer1.image.system.teamfoundationcollectionuriNotDefined=http://WebAppServer1/AppCollection/",
                    "size": "0B",
                    "createdOn": new Date(1554718627000)
                },
                {
                    "directive": "LABEL",
                    "arguments": "WebAppServer1.image.system.teamproject=WebApp",
                    "size": "0B",
                    "createdOn": new Date(1554718627000)
                }
            ],
            "runId": 10,
            "pipelineVersion": "5",
            "pipelineName": "WebApp-CI",
            "pipelineId": "1",
            "imageSize": "1362",
            "jobName": "CI Agent job 1",
            "createTime": new Date(1554718639820)
        };

        return Promise.resolve(sampleImageData);
    }

    public getPodLog(podName: string, podContainerName?: string): Promise<string> {
        const url: string = "/getpodlog/?podName=" + encodeURIComponent(podName) + "&podContainerName=" + encodeURIComponent(podContainerName || "");
        return fetch(url).then(res => res.text());
    }

    public getImageProvenances(imageNames: string[]): Promise<any> {
        const imageName = imageNames[0];
        const sampleImageProvenance = {
            "resourceUri": imageName,
            "build": {
                "name": "80ba3a3c-a1d1-4c17-b04d-87c6a1db7dcc",
                "resourceUri": imageName,
                "noteName": "projects/d75f4228-7f7f-435c-9fd3-edab92c59e1d/notes/1",
                "kind": 2,
                "createTime": "2019-11-28T10:49:10.110Z",
                "updateTime": "2019-11-28T10:49:10.110Z",
                "build": {
                    "provenance": {
                        "id": "1",
                        "projectId": "d75f4228-7f7f-435c-9fd3-edab92c59e1d",
                        "createTime": "2019-11-28T10:49:10.110Z",
                        "startTime": "2019-11-28T10:49:10.110Z",
                        "creator": "sample@microsoft.com",
                        "logsUri": "http://localhost/DefaultCollection/p1/_build/results?buildId=2",
                        "sourceProvenance": {
                            "context": {
                                "git": {
                                    "url": "http://localhost/DefaultCollection/p1/_git/p1",
                                    "revisionId": "04c33e226720e53e427bc8fc56b654f645a591e8"
                                },
                                "contextCase": 3
                            }
                        },
                        "buildOptions": {
                            "dockerFilePath": "C:\\vsts-agent\\_work\\27\\s\\Dockerfile",
                            "labels": "localhost.image.system.teamfoundationcollectionuri=http://localhost/DefaultCollection/, localhost.image.system.teamproject=p1",
                            "tags": "2",
                            "context": "C:\\vsts-agent\\_work\\27\\s"
                        },
                        "builderVersion": "2",
                        "buildArtifacts": [
                            {
                                "checksum": "ae440470da5483fb43c68562ebf28b9cb6542735d14c343d920efe0354095ab5",
                                "id": imageName,
                                "names": ["registry.azurecr.io/hello-world:2"]
                            }
                        ]
                    }
                }
            },
            "image": {
                "name": "fa56acb3-906e-4076-b7e6-90b6a1fb1ea9",
                "resourceUri": imageName,
                "noteName": "projects/d75f4228-7f7f-435c-9fd3-edab92c59e1d/notes/ubuntu",
                "kind": 3,
                "createTime": "2019-11-28T10:49:10.110Z",
                "updateTime": "2019-11-28T10:49:10.110Z",
                "image": {
                    "fingerprint": {
                        "v1Name": "96d8a98d5c14bfed8edff88cf705f15ff630a516ef781abef1ff92a2f73fbf02",
                        "v2Blob": ["a1aa3da2a80a775df55e880b094a1a8de19b919435ad0c71c29a0983d64e65db", "ef1a1ec5bba9f5efcecf38693111c335cafa27f53669a91bee5d3dc17819180c", "6c3332381368f5c277995c2e1d19dc895b8a870ba7d1ccd8a4dbe4a5c26810bc"],
                        "v2Name": "30b6dd71670db3a07d360875957b535f7aa5a5a0132025bf865a8e96346b6685"
                    },
                    "distance": 17,
                    "layerInfo": [
                        {
                            "directive": "ADD",
                            "arguments": "file:288ac0434f65264f3c50cf3e2766c5dbf3fa953c89995dd9445063fd565aac81 in / "
                        },
                        {
                            "directive": "RUN",
                            "arguments": "/bin/sh -c [ -z \"$(apt-get indextargets)\" ]"
                        },
                        {
                            "directive": "RUN",
                            "arguments": "/bin/sh -c set -xe   && echo '#!/bin/sh' > /usr/sbin/policy-rc.d  && echo 'exit 101' >> /usr/sbin/policy-rc.d  && chmod +x /usr/sbin/policy-rc.d   && dpkg-divert --local --rename --add /sbin/initctl  && cp -a /usr/sbin/policy-rc.d /sbin/initctl  && sed -i 's/^exit.*/exit 0/' /sbin/initctl   && echo 'force-unsafe-io' > /etc/dpkg/dpkg.cfg.d/docker-apt-speedup   && echo 'DPkg::Post-Invoke { \"rm -f /var/cache/apt/archives/*.deb /var/cache/apt/archives/partial/*.deb /var/cache/apt/*.bin || true\"; };' > /etc/apt/apt.conf.d/docker-clean  && echo 'APT::Update::Post-Invoke { \"rm -f /var/cache/apt/archives/*.deb /var/cache/apt/archives/partial/*.deb /var/cache/apt/*.bin || true\"; };' >> /etc/apt/apt.conf.d/docker-clean  && echo 'Dir::Cache::pkgcache \"\"; Dir::Cache::srcpkgcache \"\";' >> /etc/apt/apt.conf.d/docker-clean   && echo 'Acquire::Languages \"none\";' > /etc/apt/apt.conf.d/docker-no-languages   && echo 'Acquire::GzipIndexes \"true\"; Acquire::CompressionTypes::Order:: \"gz\";' > /etc/apt/apt.conf.d/docker-gzip-indexes   && echo 'Apt::AutoRemove::SuggestsImportant \"false\";' > /etc/apt/apt.conf.d/docker-autoremove-suggests"
                        }, {
                            "directive": "RUN", "arguments": "/bin/sh -c mkdir -p /run/systemd && echo 'docker' > /run/systemd/container"
                        },
                        {
                            "directive": "CMD",
                            "arguments": "[\"/bin/sh\" \"-c\" \"[“echo”,”Image created”]\"]"
                        }
                    ]
                }
            },
            "deployment": [],
            "attestation": [],
            "vulnerability": []
        };

        return Promise.resolve([sampleImageProvenance]);
    }

    private _populateEntities(command: string): Promise<any> {
        return fetch(command).then(res => res.ok ? res.json() : {});
    }
}
