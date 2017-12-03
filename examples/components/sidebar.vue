<template>
    <div class="layout-sidebar">
        <i-menu ref="sideMenu" theme="light" width="auto" :active-name="$route.path" @on-select="onMenuSelect">
            <template v-for="(route, index) in routes" v-if="route.meta && route.meta.renderable !== false">
                <template v-if="route.children && route.children.length > 0">
                    <i-menu-group :title="route.meta.title">
                        <i-menu-item v-for="(item, index) in route.children" :name="getPath(route, item)" :key="getPath(route, item)" v-if="item.meta && item.meta.renderable !== false">
                            <i-icon :type="item.meta.icon" v-if="item.meta.icon"></i-icon> {{item.meta.title}}
                        </i-menu-item>
                    </i-menu-group>
                </template>
                <template v-else>
                    <i-menu-item :name="route.path"><i-icon :type="route.meta.icon" v-if="route.meta.icon"></i-icon> {{route.meta.title}}</i-menu-item>
                </template>
            </template>
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
export default class Sidebar extends Component
{
    protected get rootPath(): string
    {
        return this.$route.matched[0].path;
    }
    
    protected get routes(): Array<any>
    {
        let routes = (this.$router as any).options.routes;

        let buffer = routes.filter((item: any, index: any) =>
        {
            return this.$route.matched.length && this.$route.matched[0].path === item.path;
        });
        
        return buffer && buffer.length ? buffer[0].children : [];
    }

    protected getPath(path1: any, path2: any): string
    {
        return this.rootPath + "/" + path1.path + "/" + path2.path;
    }
    
    protected onMenuSelect(path: string): void
    {
        if(path !== this.$route.path)
        {
            // 设置根路由
            this.$store.dispatch("setRoutePath", this.rootPath);
            
            // 跳转路由
            this.$router.push(path);
        }
    }
}
</script>
