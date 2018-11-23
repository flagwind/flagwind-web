/*!
 * Authors:
 *      jason <jasonsoop@gmail.com>
 * 
 * Licensed under the MIT License.
 * Copyright (C) 2010-2017 Flagwind Inc. All rights reserved. 
 */

import flagwind from "flagwind-core";
import WorkbenchBase = flagwind.WorkbenchBase;
import ApplicationContextBase = flagwind.ApplicationContextBase;
import ApplicationContext from "./context";
import Workspace from "./workspace";

import Vue from "vue";
import Router from "vue-router";
import Vuex from "vuex";
import routes from "../routes";
import modules from "../store";
import menus from "../config/menus";

// 导入系统组件
import components from "src/components";

// 导入应用组件
import Code from "examples/components/code";
import Example from "examples/components/example";
import Generic from "examples/layouts/generic.vue";
import Article from "examples/layouts/article.vue";

// 倒入全局样式
import "iview/dist/styles/iview.css";
import "src/styles/index.less";
import "examples/styles/index.less";

/**
 * 提供工作台的基本封装。
 * @class
 * @version 1.0.0
 */
export default class Workbench extends WorkbenchBase
{
    private _workspace: Workspace;
    
    /**
     * 获取当前应用的主工作空间。
     * @property
     * @returns Workspace
     */
    public get workspace(): Workspace
    {
        return this._workspace;
    }
    
    /**
     * 初始化工作台的新实例。 
     * @param  {ApplicationContextBase} applicationContext
     */
    public constructor(context: ApplicationContextBase)
    {
        super(context);
    }
    
    /**
     * 当工作台打开时调用。
     * @async
     * @protected
     * @virtual
     * @param  {Array<string>} args
     * @returns void
     */
    protected async onOpen(args: Array<string>): Promise<void>
    {
        let context = this.applicationContext as ApplicationContext;

        // 初始化组件
        this.initializeComponent(context);
        
        // 初始化路由程序
        this.initializeRouter(context);
        
        // 初始化状态管理程序
        this.initializeStore(context);
        
        // 初始化工作空间
        this._workspace = this.createWorkspace();
    }
    
    /**
     * 创建一个工作空间对象。
     * @override
     * @returns IWorkspace
     */
    protected createWorkspace(): Workspace
    {
        return new Workspace(this);
    }

    /**
     * 初始化全局组件。
     * @param  {ApplicationContext} context 应用程序上下文实例。
     * @returns void
     */
    private initializeComponent(context: ApplicationContext): void
    {
        // 注册系统组件
        Vue.use(components);

        // 注册应用组件
        Vue.component("u-code", Code);
        Vue.component("u-example", Example);

        // 注册布局母版
        Vue.component("l-generic", Generic);
        Vue.component("l-article", Article);
    }
    
    /**
     * 初始化路由程序。
     * @param  {ApplicationContext} context 应用程序上下文实例。
     * @returns void
     */
    private initializeRouter(context: ApplicationContext): void
    {
        // 注册路由组件
        Vue.use(Router);
        
        // 初始化路由程序
        let router = new Router({routes});
        
        // 设置路由程序
        context.router = router;
    }
    
    /**
     * 初始化状态管理程序。
     * @param  {ApplicationContext} context 应用程序上下文实例。
     * @returns void
     */
    private initializeStore(context: ApplicationContext): void
    {
        // 注册状态管理程序
        Vue.use(Vuex);

        // 初始化状态容器
        let store = new Vuex.Store
        ({
            modules
        });
        
        // 设置状态容器
        context.store = store;
        
        // 添加公共菜单
        context.store.dispatch("menu/add", { path: "/", items: menus });
    }
}
