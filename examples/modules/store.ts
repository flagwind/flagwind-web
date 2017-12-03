/*!
 * Authors:
 *      jason <jasonsoop@gmail.com>
 * 
 * Licensed under the MIT License.
 * Copyright (C) 2010-2017 Flagwind Inc. All rights reserved. 
 */

import { Store } from "vuex";
import { IApplicationModule, ApplicationContextBase } from "flagwind-core";
import { Workbench, ApplicationContext } from "src/index";
import route from "../stores/route";

/**
 * 状态管理模块。
 * @class
 * @version 1.0.0
 */
export default class StoreModule implements IApplicationModule
{
    /**
     * 获取应用扩展模块名称。
     * @property
     */
    public get name(): string
    {
        return "store";
    }
    
    /**
     * 初始化应用扩展模块，并使其为处理请求做好准备。
     * @param  {ApplicationContext} context 一个上下文对象，它提供对模块处理应用程序内所有应用程序对象的公用的方法、属性和事件的访问。
     * @returns void
     */
    public initialize(context: ApplicationContext): void
    {
        let store = new Store
        ({
            modules: {
            }
        });

        // 设置路由程序
        context.store = store;
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