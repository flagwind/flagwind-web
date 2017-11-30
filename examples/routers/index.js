/*!
 * This file is part of `examples` module. 
 * 
 * Authors:
 *      jason <jasonsoop@gmail.com>
 * 
 * Licensed under the MIT License.
 * Copyright (C) 2010-2017 Flagwind Inc. All rights reserved. 
 */

import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

import Main from "../views/main";

export default new Router
({
    routes:
    [
        {
            path: "/",
            component: Main
        }
    ]
});
