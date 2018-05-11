/*!
 * This file is part of `components` module. 
 * 
 * Authors:
 *      jason <jasonsoop@gmail.com>
 * 
 * Licensed under the MIT License.
 * Copyright (C) 2010-2017 Flagwind Inc. All rights reserved. 
 */

import iview, { install as installIView } from "./iview";
import NumberCounter from "./number-counter";
import EditField from "./edit-field";

const components =
{
    NumberCounter,
    EditField
};

// tslint:disable-next-line:variable-name
const install = function(Vue: any, opts: any = {})
{
    installIView(Vue, opts);
    
    Object.keys(components).forEach(key =>
    {
        // flagwind 组件统一加小写 "fw" 标识
        // 最终在模板中使用组件时以类似 "fw-number-counter" 方式引用
        Vue.component("fw" + key, components[key]);
    });
};

export default { ...iview, ...components, install };
