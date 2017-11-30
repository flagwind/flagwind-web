/*!
 * Authors:
 *      jason <jasonsoop@gmail.com>
 * 
 * Licensed under the MIT License.
 * Copyright (C) 2010-2017 Flagwind Inc. All rights reserved. 
 */

import { Application } from "flagwind-core";
import { ApplicationContext } from "./app/context";

// 获取应用程序上下文实例
let context = ApplicationContext.current;

// 启动应用程序
Application.start(context);
