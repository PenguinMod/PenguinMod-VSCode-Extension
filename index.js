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

      panel.webview.html = `<!DOCTYPE html>
      <html>
        <head></head>
        <body>
          <iframe sandbox="allow-scripts allow-popups allow-same-origin" width="200%" height="200%" src="https://studio.penguinmod.com/editor.html?livetests">
          <script>
          const frame = window.frames[0];
          frame.contentWindow.eval(\`
          vm.runtime.on("PROJECT_LOADED", () => {
            vm.extensionManager.securityManager.getSandboxMode = () => {
              return "unsandboxed";
            };
            vm.loadExtensionURL("data:text/plain;base64,${code}");
          });\`)          
          </script>
          </body>
        </html>`;
    }
  );

  context.subscriptions.push(disposable);
}

function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
