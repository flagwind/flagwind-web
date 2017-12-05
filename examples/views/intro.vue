<template>
    <div class="u-intro">
        <i-alert type="success" show-icon>
            A success prompt
            <span slot="desc">Content of prompt. Content of prompt. Content of prompt. Content of prompt. </span>
        </i-alert>
    </div>
</template>

<script lang="ts">

import { component, View } from "src/index";

@component
export default class IntroView extends View
{
    protected mounted(): void
    {
        this.$msgbox.error("lalala");
    }
}
</script>
