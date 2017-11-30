/*!
 * Authors:
 *      jason <jasonsoop@gmail.com>
 * 
 * Licensed under the MIT License.
 * Copyright (C) 2010-2017 Flagwind Inc. All rights reserved. 
 */

import Vue from "vue";
import { component } from "../../../src/index";
import components from "../../../src/components";
import "./main.less";

Vue.use(components);

@component({template: require("./main.html")})
export default class Main extends Vue
{
    private message: string = "lucky";

    protected get name(): string
    {
        return this.message + " ";
    }

    public get buttonText(): string
    {
        return "哈哈哈哈";
    }

    protected mounted(): void
    {
        console.log(this.$options);
    }

    protected onButtonClick(e): void
    {
        // todo
    }
}
