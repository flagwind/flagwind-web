/*!
 * Authors:
 *      jason <jasonsoop@gmail.com>
 * 
 * Licensed under the MIT License.
 * Copyright (C) 2010-2017 Flagwind Inc. All rights reserved. 
 */

import { component, View } from "../../../src/index";
import "./home.less";

@component({template: require("./home.html")})
export default class HomeView extends View
{
    public message: string = "Flagwind Web Examples";
    
    protected mounted(): void
    {
        // todo
        console.log("mounted");
    }
}
