<template>
    <div class="u-header">
        <i-menu mode="horizontal" theme="primary" :active-name="rootPath" @on-select="onMenuSelect">
            <i-menu-item v-for="(item, index) in $router.options.routes" :name="item.path" :key="item.path" v-if="item.meta && item.meta.renderable !== false">
                <i-icon :type="item.meta.icon" v-if="item.meta.icon"></i-icon> {{item.meta.title}}
            </i-menu-item>
        </i-menu>
    </div>
</template>

<script lang="ts">

import { component, Component } from "src/index";

/**
 * 表示一个公共头部组件。
 * @class
 * @version 1.0.0
 */
@component
export default class Header extends Component
{
    protected get rootPath(): string
    {
        return this.$store.getters["route/rootPath"];
    }
    
    protected set rootPath(value: string)
    {
        this.$store.dispatch("route/setRootPath", value);
    }
    
    /**
     * 创建组件时调用的钩子方法。
     * @protected
     * @returns void
     */
    protected mounted(): void
    {
        // 设置初始根路由
        this.rootPath = this.$route.matched && this.$route.matched[0].path;
    }
    
    /**
     * 当菜单项被选择时调用。
     * @protected
     * @param  {string} path 菜单路径。
     */
    protected onMenuSelect(path: string)
    {
        if(path !== this.$route.path)
        {
            // 设置根路由
            this.rootPath = path;
            
            // 跳转路由
            this.$router.push(path);
        }
    }
}
</script>
