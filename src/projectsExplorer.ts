import * as vscode from "vscode";
import axios from "axios";

export class ProjectExplorerProvider
  implements vscode.TreeDataProvider<Project> {
  private _onDidChangeTreeData: vscode.EventEmitter<
    void | Project | null | undefined
  > = new vscode.EventEmitter<Project | undefined | void | null>();

  readonly onDidChangeTreeData: vscode.Event<
    Project | undefined | void | null
  > = this._onDidChangeTreeData.event;

  refresh(): void {
    this._onDidChangeTreeData.fire();
  }

  getTreeItem(element: Project): vscode.TreeItem | Thenable<vscode.TreeItem> {
    let treeItem = new vscode.TreeItem({
      label: element.name,
    });
    treeItem.command = {
      command: "projects.openWebview",
      title: "open webview",
      arguments: [element],
    };

    return treeItem;
  }

  getChildren(element?: Project): vscode.ProviderResult<Project[]> {
    return this.fetchProject();
  }

  private sortProject(projects: Project[]): Project[] {
    return projects.sort((a: Project, b: Project) => {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    });
  }

  private fetchProject(): Promise<Project[]> {
    return axios
      .get("http://10.8.8.253:8400/projects")
      .then((res) => res.data)
      .then((data) => {
        let projects = data.data.map((x: any) => ({
          name: x.name,
          url: `http://10.8.8.253:8500/project/details/${x.id}`,
        }));
        projects = this.sortProject(projects);
        return projects;
      })
      .catch((err) => {
        vscode.window.showErrorMessage("253项目获取失败", err);
        return [];
      });
  }
}

export interface Project {
  name: string;
  url: string;
}
