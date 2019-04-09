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
        const url: string = "/getpodlog/?podName=" + encodeURIComponent(podName) + "&podContainerName=" + encodeURIComponent(podContainerName||"");
        return fetch(url).then(res => res.text());
    }

    private _populateEntities(command: string): Promise<any> {
        return fetch(command).then(res => res.ok ? res.json() : {});
    }
}
