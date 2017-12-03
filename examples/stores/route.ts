/*!
 * Authors:
 *      jason <jasonsoop@gmail.com>
 * 
 * Licensed under the MIT License.
 * Copyright (C) 2010-2017 Flagwind Inc. All rights reserved. 
 */

const SET_ROUTE_PATH = "SET_ROUTE_PATH";                  // 设置当前路由

const state = 
{
    // 头部当前路由，匹配高亮使用
    rootPath: "",

    // 左侧当前路由，匹配高亮使用
    fullPath: ""
};

const getters = 
{
    
};

const mutations =
{
    [SET_ROUTE_PATH](state, rootPath, fullPath)
    {
        state.rootPath = rootPath;
        state.fullPath = fullPath || "";
    }
};

const actions = 
{
    setRoutePath: ({commit, state}, rootPath, fullPath) =>
    {
        commit(SET_ROUTE_PATH, rootPath, fullPath);
    }
};

export default
{
    state,
    getters,
    mutations,
    actions
};
