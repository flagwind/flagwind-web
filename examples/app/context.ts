/*!
 * This file is part of `examples` module. 
 * 
 * Authors:
 *      jason <jasonsoop@gmail.com>
 * 
 * Licensed under the MIT License.
 * Copyright (C) 2010-2017 Flagwind Inc. All rights reserved. 
 */

import { IWorkbench, ApplicationContextBase } from "flagwind-core";
import { Workbench } from "./workbench";

/**
 * 包含当前应用程序的上下文实例。
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
     * 私有构造函数。
     * @private
     */
    private constructor()
    {
        super("flagwind-web-examples");
    }
    
    /**
     * 创建一个主窗体对象。
     * 通常子类中实现的该方法只是创建空的工作台对象，并没有构建出该工作台下面的子构件。
     * 具体构建工作台子构件的最佳时机通常在 Workbench 类的 Open 方法内进行。
     * @override
     * @returns IWorkbench
     */
    protected createWorkbench(args: Array<string>): IWorkbench
    {
        return new Workbench(this);
    }
}
