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
            "hash": "9ace3ce43db1505091c11d15edce7b520cfb598d38402be254a3024146920859",
            "baseImageName": "metrics-server-amd64",
            "distance": 0,
            "imageType": "Docker Manifest, Schema 2",
            "mediaType": "application/vdn.docker.distribution.manifest.v2+json",
            "tags": ["production"],
            "layerInfo": [
                { "directive": "file", "arguments": "9ace3ce43db1505091c11d15edce7b520cfb598d38402be254a3024146920859" },
                { "directive": "file", "arguments": "9ace3ce43db1505091c11d15edce7b520cfb598d38402be254a3024146920859" }],
            "buildId": 1,
            "buildVersion": "a",
            "buildDefinitionName": "buildDefinitionName-x",
            "buildDefinitionId": "2"
        };

        return Promise.resolve(sampleImageData);
    }

    public getPodLog(podName: string): Promise<string> {
        const url: string = "/getpodlog/?podName=" + encodeURIComponent(podName);
        return fetch(url).then(res => res.text());
    }

    private _populateEntities(command: string): Promise<any> {
        return fetch(command).then(res => res.ok ? res.json() : {});
    }
}