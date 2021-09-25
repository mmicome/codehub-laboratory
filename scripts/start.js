#!/usr/bin/env node

const { spawn } = require("child_process");
const prompts = require("prompts");
const pidTree = require("pidtree");

const portMaps = {
  art: 9001,
  blog: 9002,
  ecosphere: 9003,
  library: 9004,
  life: 9005,
  plan: 9006,
};

(async () => {
  const { featureApps } = await prompts([
    {
      type: "multiselect",
      name: "featureApps",
      message: "Choose Feature App(s) to work on:",
      instructions: false,
      choices: Object.entries(portMaps).map(([appName, portNumber]) => ({
        title: `${appName} (Port ${portNumber})`,
        value: appName,
      })),
    },
  ]);

  if (!featureApps?.length) {
    console.log("🚨 No feature app(s) selected");
    process.exit();
  }

  if (!process.env.HTTPS) {
    console.log("Live Server at http://0.0.0.0:9000/");
  }

  const startProcess = spawn(
    "lerna",
    [
      "run",
      "start",
      "--scope",
      `'*/{root-config,${featureApps.join(",")}}'`,
      "--stream",
      "--parallel",
    ],
    {
      stdio: "inherit",
      env: {
        ...process.env,
        FEATURE_APP_DATA: JSON.stringify(
          featureApps.reduce((result, currFeatureApp) => {
            result[currFeatureApp] = portMaps[currFeatureApp];
            return result;
          }, {})
        ),
      },
    }
  );

  setTimeout(async () => {
    const ids = await pidTree(startProcess.pid);
    process.on("SIGINT", async () => {
      spawn("kill", ["-9"].concat(ids));
    });
  }, 2000);
})();
