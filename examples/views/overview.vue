<template>
    <div class="u-overview">
        <i-alert type="success" show-icon>
            A success prompt
            <span slot="desc">Content of prompt. Content of prompt. Content of prompt. Content of prompt. </span>
        </i-alert>
    </div>
</template>

<script lang="ts">

import { component, View } from "src/index";

@component
export default class Overview extends View
{
    
}
</script>
