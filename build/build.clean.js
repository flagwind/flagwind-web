const path = require("path");
const rimraf = require("rimraf");
const distPath = path.resolve(__dirname, "../dist");

// 清空构建目录
rimraf(distPath, (error) => 
{
    if(error)
    {
        throw error;
    }
});