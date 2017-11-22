/*!
 * @file This file is part of `events` module. 
 * 
 * Authors:
 *      @author jason <jasonsoop@gmail.com>
 * 
 * @license Licensed under the MIT License.
 * @copyright Copyright (C) 2010-2017 Flagwind Inc. All rights reserved. 
 */

import { ArgumentException, IEventProvider, EventProviderFactoryBase } from "flagwind-core";
import { EventProvider } from "./event_provider";

/**
 * 提供关于事件提供程序的功能。
 * @class
 * @version 1.0.0
 */
export class EventProviderFactory extends EventProviderFactoryBase
{
    private static _instance: EventProviderFactory;
    
    /**
     * 获取事件提供程序工厂的单实例。
     * @static
     * @property
     * @returns EventProviderFactory
     */
    public static get instance(): EventProviderFactory
    {
        if(!this._instance)
        {
            this._instance = new EventProviderFactory();
        }
        
        return this._instance;
    }
    
    /**
     * 根据指定事件源创建一个事件提供程序。
     * @override
     * @param  {any} source IEventProvider 所抛出事件对象的源对象。
     * @returns IEventProvider 事件提供程序实例。
     */
    protected createProvider(source: any): IEventProvider
    {
        if(!source)
        {
            throw new ArgumentException();
        }

        return new EventProvider(source);
    }
}
