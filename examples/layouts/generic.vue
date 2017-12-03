<template>
    <div class="u-container">
        <u-header></u-header>
        
        <div class="u-wrapper">
            <router-view></router-view>
        </div>
    </div>
</template>

<script lang="ts">

import { component, Component } from "src/index";
import Header from "examples/components/header.vue";

/**
 * 表示一个公共头部组件。
 * @class
 * @version 1.0.0
 */
@component({components: { "u-header": Header }})
export default class Generic extends Component
{
    
}
</script>
