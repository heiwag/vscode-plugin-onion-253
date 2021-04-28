import * as vscode from "vscode";
import { ProjectExplorerProvider } from "./projectsExplorer";
import { webviewHandler } from "./webview";

export function activate(context: vscode.ExtensionContext) {
  const projectsProvider = new ProjectExplorerProvider();
  vscode.window.registerTreeDataProvider("projects", projectsProvider);
  vscode.commands.registerCommand("projects.openWebview", webviewHandler);
}

export function deactivate() {}
