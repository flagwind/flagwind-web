import Vue from "vue";
Vue.config.productionTip = false;

import Promise from "es6-promise";
Promise.polyfill();

const testsContext = require.context("./specs", true, /\.spec$/);
testsContext.keys().forEach(testsContext);

// const srcContext = require.context("../../src", true, /^\.\/(?!main(\.js)?$)/);
// srcContext.keys().forEach(srcContext)
