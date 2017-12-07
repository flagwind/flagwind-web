/*!
 * Authors:
 *      jason <jasonsoop@gmail.com>
 * 
 * Licensed under the MIT License.
 * Copyright (C) 2010-2017 Flagwind Inc. All rights reserved. 
 */

import GenericLayout from "../layouts/generic.vue";
import ContentLayout from "../layouts/content.vue";

import IntroView from "../views/intro.vue";
import ColorView from "../views/color.vue";
import ButtonView from "../views/button.vue";

const routes =
[
    {
        path: "*",
        redirect: "/"
    },
    {
        path: "/",
        redirect: "overview"
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
                component: IntroView
            }
        ]
    },
    {
        path: "/components",
        component: GenericLayout,
        meta:
        {
            title: "组件",
            icon: "ios-keypad"
        },
        children:
        [
            {
                path: "",
                redirect: "generic"
            },
            {
                path: "generic",
                component: ContentLayout,
                meta:
                {
                    title: "基本"
                },
                children:
                [
                    {
                        path: "",
                        redirect: "color"
                    },
                    {
                        path: "color",
                        component: ColorView,
                        meta:
                        {
                            title: "颜色",
                            icon: "android-color-palette"
                        }
                    },
                    {
                        path: "button",
                        component: ButtonView,
                        meta:
                        {
                            title: "按钮",
                            icon: "social-youtube-outline"
                        }
                    }
                ]
            }
        ]
    }
];

export default routes;
