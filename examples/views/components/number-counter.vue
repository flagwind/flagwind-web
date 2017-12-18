<template>
    <l-article>
        <h1>NumberCounter 数字计数</h1>
        <h2>概述</h2>
        <p>根据数值的增减播放相应的过渡动画</p>
        <h2>代码示例</h2>
        <u-example title="基本使用">
            <template slot="case">
                <fw-number-counter :value="value1" style="font-size:46px;"></fw-number-counter>
                <br />
                <i-button @click="value1 += 10">加值</i-button>
                <i-button @click="value1 -= 10">减值</i-button>
            </template>
            <template slot="desc">
                <p>基本用法，通过设置<code>value</code>的增减实现数据的上下翻动。</p>
            </template>
            <u-code slot="code" lang="html">{{code.generic}}</u-code>
        </u-example>

        <u-example title="格式化">
            <template slot="case">
                <fw-number-counter :value="value2" format="(,ddd).dd" style="font-size:46px;"></fw-number-counter>
                <br />
                <i-button type="info" @click="value2 += 100">加值</i-button>
                <i-button type="warning" @click="value2 -= 100">减值</i-button>
            </template>
            <template slot="desc">
                <p>格式化数值，通过设置<code>format</code>属性，可自定义数值的格式化显示。</p>
                <p>例: (,ddd) > 12,345,678</p>
                <p>例: (,ddd).dd > 12,345,678.09</p>
                <p>例: (.ddd),dd > 12.345.678,09</p>
                <p>例: ( ddd),dd > 12 345 678,09</p>
                <p>例:  d > 12345678</p>
            </template>
            <u-code slot="code" lang="html">{{code.format}}</u-code>
        </u-example>

        <u-example title="动画效果">
            <template slot="case">
                <fw-number-counter :value="value3" animation="count" style="font-size:46px;"></fw-number-counter>
                <br />
                <i-button type="success" @click="value3 = 123456">加值</i-button>
                <i-button type="error" @click="value3 = 0">减值</i-button>
            </template>
            <template slot="desc">
                <p>通过设置<code>animation</code>属性为<code>slide</code>、<code>count</code>使用不同的数值变动效果。</p>
            </template>
            <u-code slot="code" lang="html">{{code.animation}}</u-code>
        </u-example>

        <div class="api">
            <h2>API</h2>
            <h3>属性</h3>
            <table>
                <thead>
                    <tr>
                        <th>属性</th>
                        <th>说明</th>
                        <th>类型</th>
                        <th>默认值</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>value</td>
                        <td>绑定的数值</td>
                        <td>Number</td>
                        <td>0</td>
                    </tr>
                    <tr>
                        <td>format</td>
                        <td>数值格式化字符串模板</td>
                        <td>String</td>
                        <td>(d).dd</td>
                    </tr>
                    <tr>
                        <td>formatFunction</td>
                        <td>自定义数值格式化函数</td>
                        <td>Function</td>
                        <td>-</td>
                    </tr>
                    <tr>
                        <td>animation</td>
                        <td>动画类型，可选参数为<code>slide</code>、<code>count</code></td>
                        <td>String</td>
                        <td>slide</td>
                    </tr>
                    <tr>
                        <td>duration</td>
                        <td>动画持续时间</td>
                        <td>Number</td>
                        <td>2000</td>
                    </tr>
                </tbody>
            </table>
            <h3>事件</h3>
            <table>
                <thead>
                    <tr>
                        <th>事件名</th>
                        <th>说明</th>
                        <th>返回值</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>on-complete</td>
                        <td>动画播放完毕时触发</td>
                        <td>无</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </l-article>
</template>

<script lang="ts">
import { component, View } from "src/index";
import * as code from "examples/codes/number-counter";

@component
export default class NumberCounter extends View
{
    /**
     * 演示需要的代码。
     * @protected
     * @member
     * @returns any
     */
    protected code: any = code;

    /**
     * 示例一使用的数值。
     * @protected
     * @member
     * @returns number
     */
    protected value1: number = 5210;

    /**
     * 示例二使用的数值。
     * @protected
     * @member
     * @returns number
     */
    protected value2: number = 12345.67;

    /**
     * 示例三使用的数值。
     * @protected
     * @member
     * @returns number
     */
    protected value3: number = 1000;
}
</script>
