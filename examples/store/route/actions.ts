/*!
 * Authors:
 *      jason <jasonsoop@gmail.com>
 * 
 * Licensed under the MIT License.
 * Copyright (C) 2010-2017 Flagwind Inc. All rights reserved. 
 */

import { Store, ActionTree, ActionContext } from "vuex";
import State from "./state";

export function setRootPath(store: ActionContext<State, any>, rootPath: string)
{
    store.commit("SET_ROOT_PATH", rootPath);
}

export function setFullPath(store: ActionContext<State, any>, fullPath: string)
{
    store.commit("SET_FULL_PATH", fullPath);
}

export default <ActionTree<State, any>>
{
    setRootPath,
    setFullPath
};
