/*
    // Copyright (c) Microsoft Corporation. All rights reserved.
    // Licensed under the MIT license.
*/

import * as K8sSummary from "@azurepipelines/webapp-kube-summary";
import { ContentReader } from "@azurepipelines/webapp-kube-summary/dist/WebUI/Common/ContentReader";
import { DefaultImageLocation } from "@azurepipelines/webapp-kube-summary/dist/WebUI/Common/DefaultImageLocation";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { PageDataService } from "./PageData";
import "./Summary.scss";

const contentElementId: string = "main-content";

class Summary extends React.Component<{}, { clusterName: string }> {
    public constructor(props: {}) {
        super(props);
        this.state = { clusterName: "" };
        fetch("/clusterName").then(res => res.json().then(val => this.setState({ clusterName: val.clusterName })));
    }

    public render(): JSX.Element {
        const props = {
            title: "Kubernetes summary UI Web App",
            kubeService: this._pageDataService,
            imageService: this._pageDataService,
            clusterName: this.state.clusterName,
            getContentReaderComponent: (props?: any) => <ContentReader {...props} />,
            getImageLocation: DefaultImageLocation.getImageLocation
        } as K8sSummary.IKubeSummaryProps;
        return <K8sSummary.KubeSummary  {...props} />;
    }

    private _pageDataService: PageDataService = new PageDataService();
}

ReactDOM.render(<Summary />, document.getElementById(contentElementId));
