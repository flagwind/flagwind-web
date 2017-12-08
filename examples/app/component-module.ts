/*!
 * Authors:
 *      jason <jasonsoop@gmail.com>
 * 
 * Licensed under the MIT License.
 * Copyright (C) 2010-2017 Flagwind Inc. All rights reserved. 
 */

import Vue from "vue";
import { IApplicationModule, ApplicationContextBase } from "flagwind-core";
import { Workbench, ApplicationContext } from "src/index";

import Code from "examples/components/code";
import Example from "examples/components/example";

import Generic from "examples/layouts/generic.vue";
import Article from "examples/layouts/article.vue";

// 注册公共样式
import "src/styles/index.less";

// 注册项目样式
import "examples/styles/index.less";

/**
 * 组件管理模块。
 * @class
 * @version 1.0.0
 */
export default class ComponentModule implements IApplicationModule
{
    /**
     * 获取应用扩展模块名称。
     * @property
     */
    public get name(): string
    {
        return "component";
    }
    
    /**
     * 初始化应用扩展模块，并使其为处理请求做好准备。
     * @param  {ApplicationContext} context 一个上下文对象，它提供对模块处理应用程序内所有应用程序对象的公用的方法、属性和事件的访问。
     * @returns void
     */
    public initialize(context: ApplicationContext): void
    {
        // 注册公共组件
        Vue.component("u-code", Code);
        Vue.component("u-example", Example);
        
        // 注册布局母版
        Vue.component("l-generic", Generic);
        Vue.component("l-article", Article);
    }

    /**
     * 执行与释放或重置非托管资源关联的应用程序定义的任务。
     * @returns void
     */
    public dispose(): void
    {
        // todo
    }
}
