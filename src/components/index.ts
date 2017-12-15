/*!
 * This file is part of `components` module. 
 * 
 * Authors:
 *      jason <jasonsoop@gmail.com>
 * 
 * Licensed under the MIT License.
 * Copyright (C) 2010-2017 Flagwind Inc. All rights reserved. 
 */

import iview, { install as iviewInstall } from "./iview";
import web, { install as webInstall } from "./web";

const components =
{
    ...iview,
    ...web
};

// tslint:disable-next-line:variable-name
const install = function(Vue: any, opts: any = {})
{
    iviewInstall(Vue, opts);
    
    webInstall(Vue, opts);
};

export default { ...components, install };
