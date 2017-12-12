/*!
 * Authors:
 *      jason <jasonsoop@gmail.com>
 * 
 * Licensed under the MIT License.
 * Copyright (C) 2010-2017 Flagwind Inc. All rights reserved. 
 */

import flagwind from "flagwind-core";
import ApplicationContext from "./application/context";

// 获取应用上下文
let context = ApplicationContext.current;

// 启动应用程序
flagwind.Application.start(context);
