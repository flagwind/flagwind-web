/*!
 * Authors:
 *      jason <jasonsoop@gmail.com>
 * 
 * Licensed under the MIT License.
 * Copyright (C) 2010-2017 Flagwind Inc. All rights reserved. 
 */

import * as models from "../../models";
import { Store, ActionTree, ActionContext } from "vuex";
import State from "./state";

export function add(store: ActionContext<State, any>, value: { path: string; items: Array<models.IMenuItem> }): void
{
    store.commit("ADD", value);
}

export function remove(store: ActionContext<State, any>, path: string): void
{
    store.commit("REMOVE", path);
}

export default <ActionTree<State, any>>
{
    add,
    remove
};
