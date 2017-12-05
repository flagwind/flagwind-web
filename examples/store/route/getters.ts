/*!
 * Authors:
 *      jason <jasonsoop@gmail.com>
 * 
 * Licensed under the MIT License.
 * Copyright (C) 2010-2017 Flagwind Inc. All rights reserved. 
 */

import { Getter, GetterTree } from "vuex";
import State from "./state";

export function rootPath(state: State): string
{
    return state.rootPath;
}

export function fullPath(state: State): string
{
    return state.fullPath;
}

export default <GetterTree<State, any>>
{
    rootPath,
    fullPath
};
