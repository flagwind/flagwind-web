/*!
 * This file is part of `components` module. 
 * 
 * Authors:
 *      jason <jasonsoop@gmail.com>
 * 
 * Licensed under the MIT License.
 * Copyright (C) 2010-2017 Flagwind Inc. All rights reserved. 
 */

import { Component } from "src/common";
import { component } from "src/decorators";

/**
 * 表示一个带过渡特效的数字组件。
 * @class
 * @version 1.0.0
 */
@component({ template: require("./number-counter.html") })
export default class NumberCounter extends Component
{
    protected mounted(): void
    {
        // todo
    }
}
