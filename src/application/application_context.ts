/*!
 * @file This file is part of `application` module. 
 * 
 * Authors:
 *      @author jason <jasonsoop@gmail.com>
 * 
 * @license Licensed under the MIT License.
 * @copyright Copyright (C) 2010-2017 Flagwind Inc. All rights reserved. 
 */

import { IWorkbench, ApplicationContextBase, ServiceProviderFactory } from "flagwind-core";
import { EventProviderFactory  } from "../events/event_provider_factory";

/**
 * 应用程序上下文类。
 * @class
 * @version 1.0.0
 */
export class ApplicationContext extends ApplicationContextBase
{
    /**
     * 获取当前应用程序的上下文实例。
     * @static
     * @member
     */
    public static readonly current: ApplicationContext = new ApplicationContext();
    
    /**
     * @constructor
     */
    public constructor()
    {
        super();
        
        ServiceProviderFactory.instance.default.register(EventProviderFactory);
    }

    /**
     * 创建一个主窗体对象。
     * @override
     * @returns IWorkbench
     */
    protected createWorkbench(args: Array<string>): IWorkbench
    {
        console.log("ddd");
        
        return null;
    }
}
