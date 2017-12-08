<template>
    <div class="u-header">
        <i-menu mode="horizontal" theme="primary" :active-name="activePath" @on-select="onMenuSelect">
            <i-menu-item v-for="(item, index) in menus" :name="item.path" :key="item.path" v-if="item.visible !== false">
                <i-icon :type="item.icon" v-if="item.icon"></i-icon> {{item.title}}
            </i-menu-item>
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
export default class Header extends Component
{
    /**
     * 获取所有根基。
     * @protected
     * @property
     * @returns Array<models.MenuItem>
     */
    protected get menus(): Array<models.MenuItem>
    {
        return this.$store.getters["menu/items"];
    }

    protected get activePath(): string
    {
        return this.$route.matched[0].path;
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
            // 跳转路由
            this.$router.push(path);
        }
    }
}
</script>
