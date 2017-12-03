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
import { IWorkbench } from "flagwind-core";
import ApplicationContext from "./application_context";

/**
 * 提供工作空间的常用功能。
 * @class
 * @version 1.0.0
 */
export default class Workspace extends Vue
{
    private _workbench: IWorkbench;

    /**
     * 获取工作空间所属的工作台实例。
     * @property
     * @returns IWorkbench
     */
    public get workbench(): IWorkbench
    {
        return this._workbench;
    }
    
    /**
     * 初始化工作空间的新实例。
     * @constructor
     * @param  {IWorkbench} workbench 工作台实例。
     * @param  {Router} router 主路由程序。
     */
    public constructor(workbench: IWorkbench)
    {
        let options =
        {
            el: "#workspace",
            router: ApplicationContext.current.router,
            store: ApplicationContext.current.store,
            template: '<div id="workspace"><router-view /></div>'
        };
        
        // 传入配置进行初始化
        super(options);
        
        // 保存工作台
        this._workbench = workbench;
    }
}
