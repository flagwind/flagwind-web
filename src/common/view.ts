/*!
 * This file is part of `common` module. 
 * 
 * Authors:
 *      jason <jasonsoop@gmail.com>
 * 
 * Licensed under the MIT License.
 * Copyright (C) 2010-2017 Flagwind Inc. All rights reserved. 
 */

import flagwind from "flagwind-core";
import { Component } from "./component";

/**
 * 定义视图的基础功能。
 * @class
 * @version 1.0.0
 */
export class View extends Component
{
    /**
     * 获取默认服务容器实例。
     * @protected
     * @property
     * @returns flagwind.IServiceProvider
     */
    protected get serviceProvier(): flagwind.IServiceProvider
    {
        return flagwind.ServiceProviderFactory.instance.default;
    }
}
