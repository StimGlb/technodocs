(node:18596) [DEP0060] DeprecationWarning: The `util._extend` API is deprecated. Please use Object.assign() instead.
(Use `node --trace-deprecation ...` to show where the warning was created)
15:36:42 [vite] (client) Pre-transform error: No matching HTML proxy module found from /src%5Cpages%5Csimulateurs%5Cconso_electrique.html?html-proxy&index=0.js
⬥ Rewrote URL to /index.html
⬥ Rewrote URL to /index.html
15:36:42 [vite] Internal server error: Failed to parse source for import analysis because the content contains invalid JS syntax. You may need to install appropriate plugins to handle the .html file format, or if it's an asset, add "**/*.html" to `assetsInclude` in your configuration.
  Plugin: vite:import-analysis
  File: E:/Dev/technodocs-vanilla/index.html:10:40
  9  |      />
  10 |      <title>Techno Docs | Accueil</title>
  11 |      <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
     |          ^
  12 |      <link rel="stylesheet" href="/src/css/style.css" />
  13 |      <link rel="stylesheet" href="/src/css/style-index-light.css" />
      at TransformPluginContext._formatLog (file:///E:/Dev/technodocs-vanilla/node_modules/vite/dist/node/chunks/config.js:28999:43)
      at TransformPluginContext.error (file:///E:/Dev/technodocs-vanilla/node_modules/vite/dist/node/chunks/config.js:28996:14)
      at TransformPluginContext.transform (file:///E:/Dev/technodocs-vanilla/node_modules/vite/dist/node/chunks/config.js:27082:10)
      at async EnvironmentPluginContainer.transform (file:///E:/Dev/technodocs-vanilla/node_modules/vite/dist/node/chunks/config.js:28797:14)
      at async loadAndTransform (file:///E:/Dev/technodocs-vanilla/node_modules/vite/dist/node/chunks/config.js:22670:26)
15:36:42 [vite] Internal server error: No matching HTML proxy module found from E:/Dev/technodocs-vanilla/src/pages/simulateurs/conso_electrique.html?html-proxy&index=0.js
      at LoadPluginContext.handler (file:///E:/Dev/technodocs-vanilla/node_modules/vite/dist/node/chunks/config.js:23741:17)
      at EnvironmentPluginContainer.load (file:///E:/Dev/technodocs-vanilla/node_modules/vite/dist/node/chunks/config.js:28759:56)
      at process.processTicksAndRejections (node:internal/process/task_queues:103:5)
      at async loadAndTransform (file:///E:/Dev/technodocs-vanilla/node_modules/vite/dist/node/chunks/config.js:22628:21)