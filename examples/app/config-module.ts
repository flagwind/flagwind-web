/*!
 * Authors:
 *      jason <jasonsoop@gmail.com>
 * 
 * Licensed under the MIT License.
 * Copyright (C) 2010-2017 Flagwind Inc. All rights reserved. 
 */

import { IApplicationModule, ApplicationContextBase } from "flagwind-core";
import { Workbench, ApplicationContext } from "src/index";
import menus from "../config/menus";

/**
 * 组件管理模块。
 * @class
 * @version 1.0.0
 */
export default class ConfigModule implements IApplicationModule
{
    /**
     * 获取应用扩展模块名称。
     * @property
     */
    public get name(): string
    {
        return "config";
    }
    
    /**
     * 初始化应用扩展模块，并使其为处理请求做好准备。
     * @param  {ApplicationContext} context 一个上下文对象，它提供对模块处理应用程序内所有应用程序对象的公用的方法、属性和事件的访问。
     * @returns void
     */
    public initialize(context: ApplicationContext): void
    {
        // 初始化菜单
        this.initMenu(context);
    }

    /**
     * 执行与释放或重置非托管资源关联的应用程序定义的任务。
     * @returns void
     */
    public dispose(): void
    {
        // todo
    }
    
    private initMenu(context: ApplicationContext)
    {
       context.store.dispatch("menu/add", { path: "/", items: menus });
    }
}
