/*!
 * Authors:
 *      jason <jasonsoop@gmail.com>
 * 
 * Licensed under the MIT License.
 * Copyright (C) 2010-2017 Flagwind Inc. All rights reserved. 
 */

const routes =
[
    {
        path: "/",
        redirect: "/intro"
    },
    {
        path: "/intro",
        component: (resolve: any) => (<any>require)(["views/intro.vue"], resolve)
    },
    {
        path: "/components",
        redirect: "/components/color"
    },
    {
        path: "/components/color",
        component: (resolve: any) => (<any>require)(["views/components/color.vue"], resolve)
    },
    {
        path: "/components/button",
        component: (resolve: any) => (<any>require)(["views/components/button.vue"], resolve)
    },
    {
        path: "/components/number-counter",
        component: (resolve: any) => (<any>require)(["views/components/number-counter.vue"], resolve)
    }
];

export default routes;
