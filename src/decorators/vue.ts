/*!
 * This file is part of `decorators` module. 
 * 
 * Authors:
 *      jason <jasonsoop@gmail.com>
 * 
 * Licensed under the MIT License.
 * Copyright (C) 2010-2017 Flagwind Inc. All rights reserved. 
 */

import Component from "vue-class-component";

Component.registerHooks
([
    "beforeRouteEnter",
    "beforeRouteLeave",
    "beforeRouteUpdate"
]);

export { Component as component };
export { Inject as inject, Model as model, Prop as prop, Provide as provide, Watch as watch } from "vue-property-decorator";
