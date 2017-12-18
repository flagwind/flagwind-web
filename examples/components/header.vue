<template>
    <header class="layout-header">
        <i-menu mode="horizontal" theme="primary" :active-name="activePath" @on-select="onMenuItemSelect">
            <i-menu-item v-for="(item, index) in menus" :name="item.path" :key="item.path" v-if="!item.visible">
                <i-icon :type="item.icon" v-if="item.icon"></i-icon> {{item.title}}
            </i-menu-item>
        </i-menu>
    </header>
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
export default class Header extends Component
{
    /**
     * 获取需要展示的菜单列表。
     * @protected
     * @property
     * @returns Array<models.IMenuItem>
     */
    protected get menus(): Array<models.IMenuItem>
    {
        return this.$store.getters["menu/items"];
    }
    
    /**
     * 获取当前需要高亮的菜单路径。
     * @protected
     * @property
     * @returns string
     */
    protected get activePath(): string
    {
        let path: string = this.$route.path;
        let index: number = path.lastIndexOf("/");
        
        if(index !== 0)
        {
            path = path.substring(0, path.lastIndexOf("/"));
        }

        return path;
    }
    
    /**
     * 当选择菜单项时调用。
     * @protected
     * @param  {string} path 菜单路径。
     */
    protected onMenuItemSelect(path: string)
    {
        if(path !== this.$route.path)
        {
            this.$router.push(path);
        }
    }
}
</script>
