const webpackConfig = require("../../build/webpack.test.config");

module.exports = function(config)
{
    config.set
    ({
        // browsers: ["PhantomJS", "ChromeHeadless"],
        browsers: ["ChromeHeadless"],
        // browsers: ["PhantomJS"],
        
        frameworks: ["mocha", "sinon-chai", "phantomjs-shim"],
        
        reporters: ["spec", "coverage"],
            
        files: ["./index.js"],
        
        preprocessors:
        {
            "./index.js": ["webpack", "sourcemap"]
        },
        
        webpack: webpackConfig,
        
        // webpackMiddleware:
        // {
        //     noInfo: true
        // },

        webpackMiddleware:
        {
            quiet: false,
            noInfo: true,
            stats:
            {
                assets: false,
                colors: true,
                version: false,
                hash: false,
                timings: false,
                chunks: false,
                chunkModules: false
            }
        },
        
        coverageReporter:
        {
            dir: "./coverage",
            reporters:
            [
                { type: "lcov", subdir: "." },
                { type: "text-summary" }
            ]
        }
    })
}