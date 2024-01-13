const vscode = require("vscode");
/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  let disposable = vscode.commands.registerCommand(
    "extension.penguinmod",
    () => {
      // Create and show panel
      const panel = vscode.window.createWebviewPanel(
        "pm",
        "PenguinMod",
        vscode.ViewColumn.One,
        { enableScripts: true }
      );
      const code = new Buffer.from(
        vscode.window.activeTextEditor.document.getText()
      ).toString("base64");
      //console.log(code);
      panel.webview.html = `<!DOCTYPE html>
      <html>
        <head></head>
        <body>
          <iframe id="f" sandbox="allow-scripts allow-popups allow-same-origin" width="100%" height="100%" src="https://studio.penguinmod.com/editor.html?livetests">
          <script>
          const frame = document.getElementById("f").contentWindow;
          setTimeout(() => {frame.vm.extensionManager.securityManager.getSandboxMode = () => {
            return "unsandboxed";
          };
        frame.vm.loadExtensionURL("data:text/plain;base64,${code}");}, 10 * 1000)         
          </script>
          </body>
        </html>`;
    }
  );

  context.subscriptions.push(disposable);
}

function deactivate() { }

module.exports = {
  activate,
  deactivate,
};
