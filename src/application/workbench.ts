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
import components from "../components";
import { WorkbenchBase, ApplicationContextBase } from "flagwind-core";
import Workspace from "./workspace";

/**
 * 提供工作台的基本封装。
 * @class
 * @version 1.0.0
 */
export default class Workbench extends WorkbenchBase
{
    private _workspace: Workspace;
    
    /**
     * 获取当前应用的主工作空间。
     * @property
     * @returns Workspace
     */
    public get workspace(): Workspace
    {
        return this._workspace;
    }
    
    /**
     * 初始化工作台的新实例。 
     * @param  {ApplicationContextBase} applicationContext
     */
    public constructor(context: ApplicationContextBase)
    {
        super(context);
    }
    
    /**
     * 当工作台打开时调用。
     * @async
     * @protected
     * @virtual
     * @param  {Array<string>} args
     * @returns void
     */
    protected async onOpen(args: Array<string>): Promise<void>
    {
        // 注册全局组件
        Vue.use(components);
        
        // 初始化工作空间
        this._workspace = this.createWorkspace();
    }
    
    /**
     * 创建一个工作空间对象。
     * @override
     * @returns IWorkspace
     */
    protected createWorkspace(): Workspace
    {
        return new Workspace(this);
    }
}
