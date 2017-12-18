/*!
 * Authors:
 *      jason <jasonsoop@gmail.com>
 * 
 * Licensed under the MIT License.
 * Copyright (C) 2010-2017 Flagwind Inc. All rights reserved. 
 */

/**
 * 表示一个菜单项的定义。
 * @interface
 * @version 1.0.0
 */
export default interface IMenuItem
{
    /**
     * 获取或设置标题。
     * @property
     * @returns string
     */
    title: string;
    
    /**
     * 获取或设置访问路径。
     * @property
     * @returns string
     */
    path?: string;
    
    /**
     * 获取或设置图标样式。
     * @property
     * @returns string
     */
    icon?: string;
    
    /**
     * 获取或设置菜单是否可见。
     * @property
     * @returns boolean
     */
    visible?: boolean;
    
    /**
     * 获取或设置子菜单。
     * @property
     * @returns Array<MenuItem>
     */
    children?: Array<IMenuItem>;
}
