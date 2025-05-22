const config = require("../widget.config.cjs");

const { widgetName, widgetVersion, uploadScript, file, server } = config;
console.log(config);
console.log(widgetName, uploadScript, file, server);
const open = require("open");
const path = require("path");

const fileUrl = `fmp://${server}/${file}?script=${uploadScript}&param=`;

const thePath = path.join(__dirname, "../", "dist", "index.html");
const params = { widgetName, widgetVersion, thePath };
const url = fileUrl + encodeURIComponent(JSON.stringify(params));
open(url);
