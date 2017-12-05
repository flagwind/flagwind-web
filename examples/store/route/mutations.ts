/*!
 * Authors:
 *      jason <jasonsoop@gmail.com>
 * 
 * Licensed under the MIT License.
 * Copyright (C) 2010-2017 Flagwind Inc. All rights reserved. 
 */

import { Mutation, MutationTree } from "vuex";
import State from "./state";

export function SET_ROOT_PATH(state: State, rootPath: string)
{
    state.rootPath = rootPath;
}

export function SET_FULL_PATH(state: State, fullPath: string)
{
    state.fullPath = fullPath;
}

export default <MutationTree<State>>
{
    SET_ROOT_PATH,
    SET_FULL_PATH
};
