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
     * 获取一个全局加载条实例。
     * @returns IView.ILoadingBarInstance
     */
    protected get $loading(): IView.ILoadingBarInstance
    {
        return components.LoadingBar;
    }
    
    /**
     * 获取一个全局消息提示框实例。
     * @returns IView.IMessageInstance
     */
    protected get $message(): IView.IMessageInstance
    {
        return components.Message;
    }
    
    /**
     * 获取一个全局模态框实例。
     * @returns IView.IModalInstance
     */
    protected get $modal(): IView.IModalInstance
    {
        return components.Modal;
    }
    
    /**
     * 获取一个全局通知提醒实例。
     * @returns IView.INoticeInstance
     */
    protected get $notice(): IView.INoticeInstance
    {
        return components.Notice;
    }
    
    /**
     * 获取一个全局加载中组件实例。
     * @returns IView.ISpin
     */
    protected get $spin(): IView.ISpinInstance
    {
        return components.Spin;
    }
}
