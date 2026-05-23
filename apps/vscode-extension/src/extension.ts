import * as vscode from "vscode";

import axios from "axios";

export function activate(
    context: vscode.ExtensionContext
) {

    const command = vscode.commands.registerCommand(

        "idksql.askDatabase",

        async () => {

            const query =
                await vscode.window.showInputBox({

                    placeHolder:
                        "Ask your database anything..."
                });

            if (!query) {

                return;
            }

            vscode.window.showInformationMessage(
                "Generating SQL..."
            );

            try {

                const response =
                    await axios.post(

                        "http://localhost:3001/api/query",

                        {
                            databaseType:
                                "mysql",

                            userQuery:
                                query
                        }
                    );

                const {

                    sql,

                    result

                } = response.data;

                const panel =
                    vscode.window.createWebviewPanel(

                        "idksql",

                        "IDKSQL Result",

                        vscode.ViewColumn.One,

                        {}
                    );

                panel.webview.html = `
                    <html>

                    <body
                        style="
                            background:#050505;
                            color:#fff;
                            font-family:monospace;
                            padding:20px;
                        "
                    >

                        <h1
                            style="
                                color:#ff3b3b;
                            "
                        >
                            GENERATED SQL
                        </h1>

                        <pre>
${sql}
                        </pre>

                        <h1
                            style="
                                color:#ff3b3b;
                                margin-top:40px;
                            "
                        >
                            RESULT
                        </h1>

                        <pre>
${JSON.stringify(
    result,
    null,
    2
)}
                        </pre>

                    </body>

                    </html>
                `;

            } catch (error) {

                vscode.window.showErrorMessage(
                    "Failed to execute query"
                );
            }
        }
    );

    context.subscriptions.push(
        command
    );
}

export function deactivate() {}
