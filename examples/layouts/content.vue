<template>
    <i-row>
        <i-col span="4">
            <!--侧边栏开始-->
            <u-sidebar></u-sidebar>
            <!--侧边栏结束-->
        </i-col>
        <i-col span="20">
            <!--内容开始-->
            <div class="u-content">
                <router-view></router-view>
            </div>
            <!--内容结束-->
        </i-col>
    </i-row>
</template>

<script lang="ts">

import { component, Component } from "src/index";
import Sidebar from "../components/sidebar.vue";

@component
({
    components: { "u-sidebar": Sidebar }
})
export default class Content extends Component
{

}

// tslint:disable-next-line:no-consecutive-blank-lines
</script>
