/*!
 * Authors:
 *      jason <jasonsoop@gmail.com>
 * 
 * Licensed under the MIT License.
 * Copyright (C) 2010-2017 Flagwind Inc. All rights reserved. 
 */

import { Application } from "flagwind-core";
import { ApplicationContext } from "src/index";
import { ComponentModule, RouteModule, StoreModule, ConfigModule } from "./app";

// 获取应用上下文
let context = ApplicationContext.current;

// 注册全局组件模块
context.modules.add(new ComponentModule());

// 注册全局路由模块
context.modules.add(new RouteModule());

// 注册全局状态模块
context.modules.add(new StoreModule());

// 注册全局配置模块
context.modules.add(new ConfigModule());

// 启动应用程序
Application.start(context);
