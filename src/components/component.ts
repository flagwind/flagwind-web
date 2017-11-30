/*!
 * This file is part of `components` module. 
 * 
 * Authors:
 *      jason <jasonsoop@gmail.com>
 * 
 * Licensed under the MIT License.
 * Copyright (C) 2010-2017 Flagwind Inc. All rights reserved. 
 */

import Vue from "vue";
import { IComponent, EventArgs } from "flagwind-core";

/**
 * 定义组件的基础功能。
 * @class
 * @version 1.0.0
 */
export class Component extends Vue implements IComponent
{
    /**
     * 为指定的事件类型注册一个侦听器，以使侦听器能够接收事件通知。
     * @summary 如果不再需要某个事件侦听器，可调用 removeListener() 删除它，否则会产生内存问题。
     * 由于垃圾回收器不会删除仍包含引用的对象，因此不会从内存中自动删除使用已注册事件侦听器的对象。
     * @param  {string} type 事件类型。
     * @param  {Function} 处理事件的侦听器函数。
     * @param  {any} scope? 侦听函数绑定的 this 对象。
     * @param  {boolean} once? 是否添加仅回调一次的事件侦听器，如果此参数设为 true 则在第一次回调时就自动移除监听。
     * @returns void
     */
    public addListener(type: string, listener: Function, scope: any = this, once: boolean = false): void
    {
        // this.$on(type, listener);
    }
    
    /**
     * 移除侦听器。如果没有注册任何匹配的侦听器，则对此方法的调用没有任何效果。
     * @param  {string} type 事件类型。
     * @param  {Function} listener 处理事件的侦听器函数。
     * @param  {any} scope? 侦听函数绑定的 this 对象。
     * @returns void
     */
    public removeListener(type: string, listener: Function, scope?: any): void
    {
        // todo
    }
    
    /**
     * 检查是否为特定事件类型注册了侦听器。
     * @param  {string} type 事件类型。
     * @returns boolean 如果指定类型的侦听器已注册，则值为 true；否则，值为 false。
     */
    public hasListener(type: string): boolean
    {
        return false;
    }
    
    /**
     * 派发一个指定类型的事件。
     * @param  {string} type 事件类型。
     * @param  {any} data? 事件数据。
     * @returns void
     */
    public dispatchEvent(type: string, data?: any): void;
    /**
     * 派发一个指定参数的事件。
     * @param  {EventArgs} eventArgs 事件参数实例。
     * @returns void
     */
    public dispatchEvent(args: EventArgs): void;
    public dispatchEvent()
    {
        // todo
    }
    
    /**
     * 执行与释放或重置非托管资源关联的应用程序定义的任务。
     * @returns void
     */
    public dispose(): void
    {
        // todo
    }
}
