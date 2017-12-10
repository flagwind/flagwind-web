/*!
 * Authors:
 *      jason <jasonsoop@gmail.com>
 * 
 * Licensed under the MIT License.
 * Copyright (C) 2010-2017 Flagwind Inc. All rights reserved. 
 */

import { Mutation, MutationTree } from "vuex";
import flagwind from "flagwind-core";
import Type = flagwind.Type;
import ArgumentException = flagwind.ArgumentException;
import InvalidOperationException = flagwind.InvalidOperationException;
import * as models from "../../models";
import State from "./state";

export function ADD(state: State, value: { path: string; items: Array<models.MenuItem> }): void
{
    if(!value.path)
    {
        throw new ArgumentException("path is invalid.");
    }

    let children: Array<models.MenuItem>;           // 子菜单列表
    
    if(value.path !== "/")
    {
        // 根据路径查找父菜单
        let parent = state.findItem(value.path);

        if(parent)
        {
            if(Type.isArray(parent.children))
            {
                children = parent.children;
            }
            else
            {
                // 如果父菜单没有挂载 "children"，则初始化一个子菜单数组
                children = new Array<models.MenuItem>();
                
                parent.children = children;
            }
        }
        else
        {
            throw new InvalidOperationException(`can't find path '${value.path}'`);
        }
    }
    else
    {
        children = state.items;
    }

    children.push(...value.items);
}

export function REMOVE(state: State, path: string): void
{
    if(path || path === "/")
    {
        throw new ArgumentException("path is invalid.");
    }

    let item = state.findItem(path);

    if(!item)
    {
        // 如果没有根据路径找到菜单项，则直接退出
        return;
    }
    
    // 根据路径查找菜单项
    let items = state.items;
    let index = path.lastIndexOf("/");

    // 如果父菜单不是根菜单，则获取父菜单下的子菜单列表
    if(index !== 0)
    {
        path = path.substring(0, index);

        items = state.findItem(path).children;
    }
    
    // 移除菜单项
    items.splice(items.indexOf(item), 1);
}

export default <MutationTree<State>>
{
    ADD,
    REMOVE
};
