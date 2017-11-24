/*!
 * @file This file is part of `examples` module. 
 * 
 * Authors:
 *      @author jason <jasonsoop@gmail.com>
 * 
 * @license Licensed under the MIT License.
 * @copyright Copyright (C) 2010-2017 Flagwind Inc. All rights reserved. 
 */

import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

import Button from "../components/button.vue";

export default new Router
({
    routes:
    [
        {
            path: "/",
            name: "button",
            component: Button
        }
    ]
});
