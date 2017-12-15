<template>
    <l-article>
        <h1>数字滚动</h1>
        <p>基础组件，触发业务逻辑时使用。</p>
        <h2>代码示例</h2>
        当前数据:{{num}}
        <f-number-scroll :newNumber="num"></f-number-scroll>
        <i-button type="primary" @click="num++">
            +1
        </i-button>
        <i-button type="primary" @click="num--">
            -1
        </i-button>
    </l-article>
</template>

<script lang="ts">
import { component, View } from "src/index";

@component
export default class NumberScroll extends View
{
    /**
     * 当前数据
     * @private
     * @member
     * @returns number
     */
    protected num: number = 0;

    /**
     * 创建组件时调用的钩子方法。
     * @protected
     * @returns void
     */
    protected mounted(): void
    {
    }
}
</script>
