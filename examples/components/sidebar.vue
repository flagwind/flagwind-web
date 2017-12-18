<template>
    <div class="layout-sidebar">
        <i-menu theme="light" width="auto" :active-name="activePath" @on-select="onMenuSelect">
            <template v-for="(item, index) in menus" v-if="!item.visible">
                <template v-if="item.children && item.children.length > 0">
                    <i-menu-group :key="item.path" :title="item.title" >
                        <i-menu-item v-for="(child, index) in item.children" :name="child.path" :key="child.path" v-if="!child.visible">
                            <i-icon :type="child.icon" v-if="child.icon"></i-icon> {{child.title}}
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
 * 表示一个公共侧边栏组件。
 * @class
 * @version 1.0.0
 */
@component
export default class Sidebar extends Component
{
    /**
     * 获取当前需要高亮的菜单路径。
     * @protected
     * @property
     * @returns string
     */
    protected get activePath(): string
    {
        return this.$route.path;
    }
    
    /**
     * 获取需要展示的菜单列表。
     * @protected
     * @property
     * @returns Array<models.IMenuItem>
     */
    protected get menus(): Array<models.IMenuItem>
    {
        let path: string = this.$route.path;
        let parentPath = path.substring(0, path.lastIndexOf("/"));
        let parentItem = this.$store.getters["menu/item"](parentPath);
        
        return parentItem.children;
    }
    
    /**
     * 当选择菜单项时调用。
     * @protected
     * @param  {string} path 菜单路径。
     */
    protected onMenuSelect(path: string): void
    {
        if(path !== this.$route.path)
        {
            // 跳转路由
            this.$router.push(path);
        }
    }
}
</script>
