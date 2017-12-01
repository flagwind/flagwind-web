/*!
 * This file is part of `common` module. 
 * 
 * Authors:
 *      jason <jasonsoop@gmail.com>
 * 
 * Licensed under the MIT License.
 * Copyright (C) 2010-2017 Flagwind Inc. All rights reserved. 
 */

import { Route } from "vue-router";
import { Component } from "./component";

/**
 * 定义视图的基础功能。
 * @class
 * @version 1.0.0
 */
export class View extends Component
{
    /**
     * 获取当前请求的路由信息。
     * @property
     * @returns Route
     */
    public get route(): Route
    {
        return this.$route;
    }
}
