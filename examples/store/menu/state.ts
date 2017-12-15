/*!
 * Authors:
 *      jason <jasonsoop@gmail.com>
 * 
 * Licensed under the MIT License.
 * Copyright (C) 2010-2017 Flagwind Inc. All rights reserved. 
 */

import * as models from "../../models";
import flagwind from "flagwind-core";
import Type = flagwind.Type;
import InvalidOperationException = flagwind.InvalidOperationException;

export default class State
{
    /**
     * 获取所有菜单项列表。
     * @member
     * @returns Array<models.IMenuItem>
     */
    public items: Array<models.IMenuItem> = new Array<models.IMenuItem>();
    
    /**
     * 查找指定路径的菜单项。
     * @param  {string} path 菜单路径字符串。
     * @returns models.IMenuItem 菜单项，如果未找到对应路径的菜单项则为 null。
     */
    public findItem(path: string, items: Array<models.IMenuItem> = this.items): models.IMenuItem
    {
        // 不允许查找根路径
        if(path === "/")
        {
            return null;
        }
        
        let result: models.IMenuItem = null;
        
        for(let item of items)
        {
            if(item.path && item.path.toLocaleLowerCase() === path.toLocaleLowerCase())
            {
                result = item;

                break;
            }

            if(Type.isArray(item.children))
            {
                result = this.findItem(path, item.children);
                
                if(result)
                {
                    break;
                }
            }
        }

        return result;
    }
}
