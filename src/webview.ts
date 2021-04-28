import * as vscode from "vscode";
import { Project } from "./projectsExplorer";

export async function webviewHandler(project: Project) {
  vscode.env.openExternal(vscode.Uri.parse(project.url + "?vsc=1"));
  // await vscode.commands.executeCommand(
  //   "browse-lite.open",
  //   project.url + "?vsc=1"
  // );
}
