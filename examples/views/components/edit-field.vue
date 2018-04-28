<template>
    <l-article>
        <h1>EditField 编辑域</h1>
        <h2>概述</h2>
        <p>一个快捷编辑域。</p>
        <h2>代码示例</h2>
        <u-example title="基本使用">
            <template slot="case">
                <fw-edit-field v-model="name">
                    <i-input />
                </fw-edit-field>
            </template>
            <template slot="desc">
                <p>基本用法，通过设置<code>value</code>的增减实现数据的上下翻动。</p>
            </template>
            <u-code slot="code" lang="html"></u-code>
        </u-example>
    </l-article>
</template>

<script lang="ts">
import { component, View } from "src/index";
import * as code from "examples/codes/number-counter";

@component
export default class EditField extends View
{
    protected name: string = "jason";
}
</script>
