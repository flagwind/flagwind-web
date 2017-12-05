/*!
 * This file is part of `common` module. 
 * 
 * Authors:
 *      jason <jasonsoop@gmail.com>
 * 
 * Licensed under the MIT License.
 * Copyright (C) 2010-2017 Flagwind Inc. All rights reserved. 
 */

import Vue from "vue";
import IView from "../components/iview/typings";
import components from "../components";

/**
 * 定义组件的基础功能。
 * @class
 * @version 1.0.0
 */
export class Component extends Vue
{
    /**
     * 获取一个全局消息提示框实例。
     * @returns IView.IMessageInstance
     */
    protected get $msgbox(): IView.IMessageInstance
    {
        return components.Message;
    }
}
