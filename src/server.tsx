import { IncomingMessage, ServerResponse } from "http";

const htmlhead = `<!doctype html>
<html>
<head>
</head>
<body>
<div id="content">`;

const hmtlfoot = (bundlepaths = ["bundle.js"]) => `</div>${bundlepaths.map((bundlepath) => `<script src="/assets/${bundlepath}"></script>`)}</body></html>`;

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
