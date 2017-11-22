/*!
 * @file This file is part of `application` module. 
 * 
 * Authors:
 *      @author jason <jasonsoop@gmail.com>
 * 
 * @license Licensed under the MIT License.
 * @copyright Copyright (C) 2010-2017 Flagwind Inc. All rights reserved. 
 */

import { IWorkspace, IView } from "flagwind-core";

/**
 * 表示工作空间的定义。
 * @class
 * @version 1.0.0
 */
export class Workspace implements IWorkspace
{
    /**
     * 添加一个试图。
     * @param  {IView} view 试图实例。
     * @returns IView
     */
    public addView(view: IView): IView
    {
        return null;
    }

    /**
     * 从工作空间中移除指定试图。
     * @param  {string|IView} name 试图名称或试图实例。
     * @returns void
     */
    public removeView(name: string | IView): void
    {
        // todo
    }

    /**
     * 根据指定的名称获取一个试图实例。
     * @param  {string} name 试图名称。
     * @returns IView
     */
    public getView(name: string): IView
    {
        return null;
    }
}
