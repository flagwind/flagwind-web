/*!
 * Authors:
 *      jason <jasonsoop@gmail.com>
 * 
 * Licensed under the MIT License.
 * Copyright (C) 2010-2017 Flagwind Inc. All rights reserved. 
 */

import { Module, GetterTree, MutationTree, ActionTree, Plugin } from "vuex";
import State from "./state";
import Mutations from "./mutations";
import Getters from "./getters";
import Actions from "./actions";

export default class Route implements Module<State, any>
{
    public namespaced: boolean;
    public state: State;
    public mutations = Mutations;
    public getters = Getters;
    public actions = Actions;
    
    public constructor()
    {
        this.namespaced = true;
        this.state = new State();
    }
}
