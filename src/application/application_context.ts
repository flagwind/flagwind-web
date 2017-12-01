/*!
 * This file is part of `application` module. 
 * 
 * Authors:
 *      jason <jasonsoop@gmail.com>
 * 
 * Licensed under the MIT License.
 * Copyright (C) 2010-2017 Flagwind Inc. All rights reserved. 
 */

import Vue from "vue";
import Router from "vue-router";
import { IWorkbench, ApplicationContextBase, InvalidOperationException } from "flagwind-core";
import { Workbench } from "./workbench";

/**
 * 包含当前应用程序的上下文实例。
 * @class
 * @version 1.0.0
 */
export class ApplicationContext extends ApplicationContextBase
{
    private _router: Router;

    /**
     * 获取或设置当前应用的主路由对象。
     * @property
     * @returns Router
     */
    public get router(): Router
    {
        if(!this._router)
        {
            this._router = this.createRouter();
        }

        return this._router;
    }
    
    public set router(value: Router)
    {
        if(!value)
        {
            throw new InvalidOperationException();
        }

        this._router = value;
    }

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
    protected constructor()
    {
        super("flagwind-web");
        
        // 注册路由组件
        Vue.use(Router);
    }

    /**
     * 创建一个工作台对象。
     * @override
     * @returns IWorkbench
     */
    protected createWorkbench(args: Array<string>): IWorkbench
    {
        return new Workbench(this);
    }

    /**
     * 创建一个主路由对象。
     * @returns Router
     */
    protected createRouter(): Router
    {
        return new Router();
    }
}
