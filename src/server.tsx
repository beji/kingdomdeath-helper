import { IncomingMessage, ServerResponse } from "http";

const htmlhead = `<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <title>Kingdom: Death - Helper</title>
    <link href="https://fonts.googleapis.com/css?family=Bitter:700|Open+Sans:400,700" rel="stylesheet">
</head>
<body>
<div id="content">`;

const hmtlfoot = (bundlepaths = ["bundle.js"]) => `</div>${bundlepaths.map((bundlepath) => `<script src="/assets/${bundlepath}"></script>`).join("")}</body></html>`;

export default function serverRenderer(stats: any) {
    return (req: IncomingMessage, res: ServerResponse) => {
        res.writeHead(200, {
            "Content-Type": "text/html",
        });
        res.write(htmlhead);

        if (stats && stats.assetsByChunkName && stats.assetsByChunkName.main) {
            const bundles = [stats.assetsByChunkName["vendors~main"], stats.assetsByChunkName.main];
            return res.end(hmtlfoot(bundles));
        } else {
            return res.end(hmtlfoot());
        }
    };
}
