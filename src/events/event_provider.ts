/*!
 * @file This file is part of `events` module. 
 * 
 * Authors:
 *      @author jason <jasonsoop@gmail.com>
 * 
 * @license Licensed under the MIT License.
 * @copyright Copyright (C) 2010-2017 Flagwind Inc. All rights reserved. 
 */

import Vue from "vue";
import { Type, Map, Set, IEventProvider, EventArgs, ArgumentException } from "flagwind-core";

/**
 * 事件提供程序类。
 * @description 用于添加或删除事件侦听器的方法，检查是否已注册特定类型的事件侦听器，并调度事件。
 * @class
 * @version 1.0.0
 */
export class EventProvider implements IEventProvider
{
    private _proxy: Vue;                                            // 事件代理
    private _source: IEventProvider;                                // 事件源
    private _events: Map<string, Set<[Function, Function]>>;        // 事件监听器字典
    
    /**
     * 初始化事件提供程序的新实例。
     * @constructor
     */
    public constructor(source: IEventProvider = null)
    {
        // 采用 Vue 自身的发布订阅作为事件代理
        this._proxy = new Vue();
        
        // 保存事件源对象
        this._source = source || this;
        
        // 初始化事件监听器元组列表
        this._events = new Map<string, Set<[Function, Function]>>();
    }
    
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
    public addListener(type: string, listener: Function, scope?: any, once?: boolean): void
    {
        if(!type || !listener)
        {
            throw new ArgumentException();
        }

        // 监听器元组格式: [原始监听函数, 绑定作用域后的监听函数]
        let tuple: [Function, Function] = [listener, scope ? listener.bind(scope) : listener];

        // 根据事件类型获取所有监听器元组列表
        let listeners = this.getListeners(type);
        
        // 将元组添加至本地列表中
        listeners.add(tuple);

        if(!once)
        {
            this._proxy.$on(type, tuple[1]);
        }
        else
        {
            // 当注册一次性事件监听时，需要及时删除本地保存的监听器元组
            this._proxy.$once(type, tuple[1]);
            this._proxy.$once(type, () => listeners.delete(tuple));
        }
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
        if(!type || !listener)
        {
            throw new ArgumentException();
        }

        // 根据事件类型获取所有监听器元组列表
        let listeners = this.getListeners(type);

        // 根据原始监听函数查找对应的监听器元组
        let tuple = listeners.find(item => item[0] === listener);

        if(tuple)
        {
            // 从本地列表中移除监听器元组
            listeners.delete(tuple);

            // 从事件代理中移除监听函数
            this._proxy.$off(type, tuple[1]);
        }
    }

    /**
     * 检查是否为特定事件类型注册了侦听器。
     * @param  {string} type 事件类型。
     * @returns boolean 如果指定类型的侦听器已注册，则值为 true；否则，值为 false。
     */
    public hasListener(type: string): boolean
    {
        return this.getListeners(type).size > 0;
    }
    
    /**
     * 派发一个指定名称的事件。
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
        let params = arguments,
            args: EventArgs;

        switch(params.length)
        {
            // 重载匹配: 
            // dispatchEvent(args: EventArgs): void;
            // dispatchEvent(type: string): void;
            case 1:
            {
                if(params[0] instanceof EventArgs)
                {
                    // 参数匹配: args: EventArgs
                    args = params[0];
                }
                else if(Type.isString(params[0]))
                {
                    // 参数匹配: type: string
                    args = new EventArgs(params[0]);
                }

                break;
            }
            // 重载匹配:
            // dispatchEvent(type: string, data: any): void;
            // tslint:disable-next-line:no-magic-numbers
            case 2:
            {
                // 参数匹配: type: string, data: any
                args = new EventArgs(params[0], params[1]);

                break;
            }
        }

        if(!args)
        {
            throw new ArgumentException("please check the arguments.");
        }

        // 设置事件源
        args.source = this._source;

        // 利用事件代理触发事件
        this._proxy.$emit(args.type, args);
    }
    
    /**
     * 根据指定的事件类型获取所有监听器元组列表。
     * @param  {string} type 事件类型。
     * @returns Set<[Function, Function]> 指定事件类型的监听器元组列表。
     */
    private getListeners(type: string): Set<[Function, Function]>
    {
        let listeners = this._events.get(type);
        
        if(!listeners)
        {
            listeners = new Set<[Function, Function]>();
            
            this._events.set(type, listeners);
        }
        
        return listeners;
    }
}
