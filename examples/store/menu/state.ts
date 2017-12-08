/*!
 * Authors:
 *      jason <jasonsoop@gmail.com>
 * 
 * Licensed under the MIT License.
 * Copyright (C) 2010-2017 Flagwind Inc. All rights reserved. 
 */

import * as models from "../../models";
import { InvalidOperationException, Type } from "flagwind-core";

export default class State
{
    /**
     * 获取所有菜单项列表。
     * @member
     * @returns Array<models.MenuItem>
     */
    public items: Array<models.MenuItem> = new Array<models.MenuItem>();
    
    /**
     * 查找指定路径的菜单项。
     * @param  {string} path 菜单路径字符串。
     * @returns models.MenuItem 菜单项，如果未找到对应路径的菜单项则为 null。
     */
    public findItem(path: string, items: Array<models.MenuItem> = this.items): models.MenuItem
    {
        // 不允许查找根路径
        if(path === "/")
        {
            return null;
        }
        
        let result: models.MenuItem = null;
        
        for(let item of items)
        {
            if(item.path.toLocaleLowerCase() === path.toLocaleLowerCase())
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
