<template>
    <l-generic>
        <div class="view-intro">
            <i-alert type="success" show-icon>
                A success prompt
                <span slot="desc">Content of prompt. Content of prompt. Content of prompt. Content of prompt. </span>
            </i-alert>
        </div>
    </l-generic>
</template>

<script lang="ts">
import { component, View } from "src/index";

@component
export default class Intro extends View
{
    protected mounted(): void
    {
        // todo
    }
}
</script>
