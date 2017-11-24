/*!
 * Authors:
 *      @author jason <jasonsoop@gmail.com>
 * 
 * @license Licensed under the MIT License.
 * @copyright Copyright (C) 2010-2017 Flagwind Inc. All rights reserved. 
 */

import { Application } from "flagwind-core";
import { ApplicationContext } from "./app/context";

// 获取应用程序上下文实例
let context = ApplicationContext.current;

// 启动应用程序
Application.start(context);
