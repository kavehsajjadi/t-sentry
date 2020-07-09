import * as express from "express";
import * as Sentry from "@sentry/node";
import { RewriteFrames } from "@sentry/integrations";

Sentry.init({
  dsn: "https://256ce9e3c02842d782865bd63070c123@o187397.ingest.sentry.io/1283893",
  integrations: [
    new RewriteFrames({
      root: __dirname || process.cwd()
    })
  ],
  release: "test-release"
});

const app = express();
const port = 3000;

// The request handler must be the first middleware on the app
app.use(Sentry.Handlers.requestHandler());

// The error handler must be before any other error middleware
app.use(Sentry.Handlers.errorHandler());

app.get("/", (_, res) => res.send("Hello World!"));

app.get("/capture", (_, res) => {
  Sentry.captureMessage("message!");
  res.send("done");
});

app.get("/throw", (_, __) => {
  const e = new Error("error2");
  Sentry.captureException(e);
  throw e;
});

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
