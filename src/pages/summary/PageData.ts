/*
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the MIT license.
*/

import { KubeResourceType, KubeServiceBase } from "azdevops-kube-summary/dist/Contracts/Contracts";

export class PageDataService extends KubeServiceBase {
    public fetch(resourceType: KubeResourceType): Promise<any> {
        switch (resourceType) {
            case KubeResourceType.Pods:
                return this._populateEntities("/getpods");

            case KubeResourceType.Services:
                return this._populateEntities("/getservices");

            case KubeResourceType.Deployments:
                return this._populateEntities("/getdeployments");

            case KubeResourceType.ReplicaSets:
                return this._populateEntities("/getreplicasets");

            default:
                return Promise.resolve([]);
        }
    }

    private _populateEntities(command: string): Promise<any> {
        return fetch(command)
            .then((res) => {
                return res.ok ? res.json() : {};
            });
    }
}