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

const components =
{
    ...iview
};

// tslint:disable-next-line:variable-name
const install = function(Vue: any, opts: any = {})
{
    installIView(Vue, opts);
};

export default { ...components, install };
