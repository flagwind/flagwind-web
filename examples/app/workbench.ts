/*!
 * @file This file is part of `examples` module. 
 * 
 * Authors:
 *      @author jason <jasonsoop@gmail.com>
 * 
 * @license Licensed under the MIT License.
 * @copyright Copyright (C) 2010-2017 Flagwind Inc. All rights reserved. 
 */

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
