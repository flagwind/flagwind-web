const fs = require("fs-extra");
const path = require("path");
const resolve = _path => path.resolve(__dirname, "../", _path);

const source = resolve("src/components/iview/typings");
const target = resolve("dist/typings/components/iview/typings");

fs.copySync(source, target);