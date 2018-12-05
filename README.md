# Kubernetes summary UI Web App

## Prerequisites: Node and Npm
   
**Windows and Mac OSX**: Download and install node from [nodejs.org](http://nodejs.org/)

**Linux**: Install [using package manager](https://github.com/joyent/node/wiki/Installing-Node.js-via-package-manager)

From a terminal ensure at least node 8.4 and npm 5.3:

```bash
$ node -v && npm -v
v8.4.0
5.3.0
```

To install npm separately:

```
[sudo] npm install npm@5 -g
npm -v
5.6.0
```

Note: On windows if it's still returning npm 2.x run `where npm`. Notice hits in program files. Rename those two npm files and the 5.6.0 in AppData will win.

## Build

    npm install
    npm run build

_dist_ folder contains a node.js file [server.js], which acts as server later.

## Run

1. Make sure you have kubeconfig file. [How to get kubeconfig file](https://docs.microsoft.com/en-us/cli/azure/aks?view=azure-cli-latest#az-aks-get-credentials)

2. run local node.js server

    `npm run start`
    
3. open browser, and **localhost:8095**, provide config file, and can see default namespace UI. Provide namespace as query parameter to get other namespace details.

4. Azure template to create a webapp in azure `Azure\windows-webapp-template.json`.

## Dependencies

This repository depends on the following package:
- [azpipelines-kubernetesUI](https://github.com/Microsoft/azpipelines-kubernetesUI): UI library containing the React components to show Kubernetes summary UI.

Some external dependencies:
- `React` - Is used to render the UI.
- `TypeScript` - Example is written in TypeScript and complied to JavaScript
- `SASS` - Example is styled using SASS (which is compiled to CSS and delivered in webpack js bundles).
- `webpack` - Is used to gather dependencies into a single javascript bundle for each sample.

# Contributing

This project welcomes contributions and suggestions.  Most contributions require you to agree to a
Contributor License Agreement (CLA) declaring that you have the right to, and actually do, grant us
the rights to use your contribution. For details, visit https://cla.microsoft.com.

When you submit a pull request, a CLA-bot will automatically determine whether you need to provide
a CLA and decorate the PR appropriately (e.g., label, comment). Simply follow the instructions
provided by the bot. You will only need to do this once across all repos using our CLA.

This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/).
For more information see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) or
contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments.
