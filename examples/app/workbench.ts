/*!
 * This file is part of `examples` module. 
 * 
 * Authors:
 *      jason <jasonsoop@gmail.com>
 * 
 * Licensed under the MIT License.
 * Copyright (C) 2010-2017 Flagwind Inc. All rights reserved. 
 */

// import Vue from "vue";
// import Router from "vue-router";
import { IWorkspace, WorkbenchBase, ApplicationContextBase } from "flagwind-core";
import { Workspace } from "./workspace";

/**
 * 提供工作台的基本封装。
 * @class
 * @version 1.0.0
 */
export class Workbench extends WorkbenchBase
{
    /**
     * 初始化工作台的新实例。 
     * @param  {ApplicationContextBase} applicationContext
     */
    public constructor(context: ApplicationContextBase)
    {
        super(context);
        
        // 安装 Vue 路由插件
        // Vue.use(Router);
    }
    
    /**
     * 创建一个工作空间对象。
     * @override
     * @returns IWorkspace
     */
    protected createWorkspace(): IWorkspace
    {
        return new Workspace(this);
    }
}
