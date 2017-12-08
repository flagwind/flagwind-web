<template>
    <div class="u-sidebar">
        <i-menu ref="sideMenu" theme="light" width="auto" :active-name="activePath" @on-select="onMenuSelect">
            <template v-for="(item, index) in menus" v-if="item.visible !== false">
                <template v-if="item.children && item.children.length > 0">
                    <i-menu-group v-bind="item.title" :key="item.path">
                        <i-menu-item v-for="(item, index) in item.children" :name="item.path" :key="getPath(route, item)" v-if="item.meta && item.meta.renderable !== false">
                            <i-icon :type="item.meta.icon" v-if="item.meta.icon"></i-icon> {{item.meta.title}}
                        </i-menu-item>
                    </i-menu-group>

                </template>
                <template v-else>
                    <i-menu-item :name="item.path" :key="item.path">
                        <i-icon :type="item.icon" v-if="item.icon"></i-icon> {{item.title}}
                    </i-menu-item>
                </template>
            </template>
        </i-menu>
    </div>
</template>

<script lang="ts">

import * as models from "../models";
import { component, Component } from "src/index";

/**
 * 表示一个公共头部组件。
 * @class
 * @version 1.0.0
 */
@component
export default class Sidebar extends Component
{
    protected get activePath(): string
    {
        return this.$route.path;
    }

    protected get menus(): Array<models.MenuItem>
    {
        let parentPath = this.$route.matched[0].path;
        let parentItem = this.$store.getters.menu.item(parentPath);

        return parentItem.children;
    }

    // protected get rootPath(): string
    // {
    //      return this.$store.getters["route/rootPath"];
    // }
    
    // protected get routes(): Array<any>
    // {
    //     let routes = (this.$router as any).options.routes;

    //     let buffer = routes.filter((item: any, index: any) =>
    //     {
    //         return this.$route.matched.length && this.$route.matched[0].path === item.path;
    //     });
        
    //     return buffer && buffer.length ? buffer[0].children : [];
    // }

    // protected getPath(path1: any, path2: any): string
    // {
    //     return this.rootPath + "/" + path1.path + "/" + path2.path;
    // }

    protected onMenuSelect(path: string): void
    {
        if(path !== this.$route.path)
        {
            // 设置根路由
            // this.$store.dispatch("route/setFullPath", path);

            // 跳转路由
            this.$router.push(path);
        }
    }
}
</script>
