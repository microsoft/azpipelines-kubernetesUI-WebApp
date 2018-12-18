/*
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the MIT license.
*/

import { KubeResourceType, KubeServiceBase } from "@azurepipelines/azdevops-kube-summary/dist/Contracts/KubeServiceBase";

export class PageDataService extends KubeServiceBase {
    public fetch(resourceType: KubeResourceType, labelSelector?:string): Promise<any> {
        let url:string = "";
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
            default:
                return Promise.resolve([]);
        }
        if(labelSelector){
            url = url.concat("/?labelselector=",encodeURIComponent(labelSelector));
        }
        console.log(url);
        return this._populateEntities(url);
    }

    private _populateEntities(command: string): Promise<any> {
        return fetch(command)
            .then((res) => {
                return res.ok ? res.json() : {};
            });
    }
}