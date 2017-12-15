<template>
    <l-generic>
        <i-row>
            <i-col span="4">
                <u-sidebar></u-sidebar>
            </i-col>
            <i-col span="20">
                <div class="layout-content">
                    <slot></slot>
                </div>
            </i-col>
        </i-row>
    </l-generic>
</template>

<script lang="ts">
import { component, Component } from "src/index";
import Sidebar from "../components/sidebar.vue";

/**
 * 表示一个包含头部和侧边栏的文章布局母版。
 * @class
 * @version 1.0.0
 */
@component({components: {"u-sidebar": Sidebar}})
export default class Article extends Component
{
    
}
</script>
