import * as vscode from "vscode";
import { HelloWorldPanel } from "./HelloWorldPanel";

export function activate(context: vscode.ExtensionContext) {
  console.log('Congratulations, your extension "get-request" is now active!');

  context.subscriptions.push(
    vscode.commands.registerCommand("get-request.helloWorld", () => {
      HelloWorldPanel.createOrShow(context.extensionUri);
    })
  );
  context.subscriptions.push(
    vscode.commands.registerCommand("get-request.askQuestion", async () => {
      const answer = await vscode.window.showInformationMessage(
        "How was your day?",
        "good",
        "bad"
      );
      if (answer === "bad") {
        vscode.window.showInformationMessage("Sorry to hear that");
      } else {
        vscode.window.showInformationMessage("Go on!!!!!!");
      }
    })
  );
}

export function deactivate() {}
