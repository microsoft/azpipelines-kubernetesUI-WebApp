/*
    // Copyright (c) Microsoft Corporation. All rights reserved.
    // Licensed under the MIT license.
*/

import * as K8sSummary from "azdevops-kube-summary";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { PageDataService } from "./PageData";
import "./Summary.scss";

const contentElementId: string = "main-content";

class Summary extends React.Component<{}, {}> {
    public render(): JSX.Element {
        return <K8sSummary.KubeSummary kubeService={this._pageDataService} title="Kubernetes summary UI Web App" />;
    }

    private _pageDataService: PageDataService = new PageDataService();
}

ReactDOM.render(<Summary />, document.getElementById(contentElementId));
