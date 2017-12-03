/*!
 * Authors:
 *      jason <jasonsoop@gmail.com>
 * 
 * Licensed under the MIT License.
 * Copyright (C) 2010-2017 Flagwind Inc. All rights reserved. 
 */

import GenericLayout from "../layouts/generic.vue";
import ContentLayout from "../layouts/content.vue";

import Overview from "../views/overview.vue";

const routes =
[
    {
        path: "/",
        redirect: to =>
        {
            return "overview";
        }
    },
    {
        path: "/overview",
        component: GenericLayout,
        meta:
        {
            title: "概览",
            icon: "pie-graph"
        },
        children:
        [
            {
                path: "",
                component: Overview
            }
        ]
    }
];

export default routes;
