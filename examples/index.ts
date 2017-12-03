/*!
 * Authors:
 *      jason <jasonsoop@gmail.com>
 * 
 * Licensed under the MIT License.
 * Copyright (C) 2010-2017 Flagwind Inc. All rights reserved. 
 */

import { Application } from "flagwind-core";
import { ApplicationContext } from "src/index";
import { RouteModule, ComponentModule } from "./modules";

// 获取应用上下文
let context = ApplicationContext.current;

// 注册全局组件模块
context.modules.add(new ComponentModule());

// 注册全局路由模块
context.modules.add(new RouteModule());

// 启动应用程序
Application.start(context);
