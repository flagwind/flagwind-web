<template>
    <l-article>
        <h1>NumberCounter 数字计数</h1>
        <p>基础组件，触发业务逻辑时使用。</p>
        <h2>代码示例</h2>
        
        <u-example title="基本使用">
            <template slot="case">
                <fw-number-counter></fw-number-counter>
            </template>
            <template slot="desc">
            </template>
            <u-code slot="code" lang="html"></u-code>
        </u-example>

        <div class="api">
            <h2>API</h2>
            <h3>Button props</h3>
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
                        <td>type</td>
                        <td>按钮类型，可选值为<code>primary</code>、<code>ghost</code>、<code>dashed</code>、<code>text</code>、<code>info</code>、<code>success</code>、<code>warning</code>、<code>error</code>或者不设置</td>
                        <td>String</td>
                        <td>-</td>
                    </tr>
                    <tr>
                        <td>size</td>
                        <td>按钮大小，可选值为<code>large</code>、<code>small</code>、<code>default</code>或者不设置</td>
                        <td>String</td>
                        <td>-</td>
                    </tr>
                    <tr>
                        <td>shape</td>
                        <td>按钮形状，可选值为<code>circle</code>或者不设置</td>
                        <td>String</td>
                        <td>-</td>
                    </tr>
                    <tr>
                        <td>long</td>
                        <td>开启后，按钮的长度为 100%</td>
                        <td>Boolean</td>
                        <td>false</td>
                    </tr>
                    <tr>
                        <td>html-type</td>
                        <td>设置<code>button</code>原生的<code>type</code>，可选值为<code>button</code>、<code>submit</code>、<code>reset</code></td>
                        <td>String</td>
                        <td>button</td>
                    </tr>
                    <tr>
                        <td>disabled</td>
                        <td>设置按钮为禁用状态</td>
                        <td>Boolean</td>
                        <td>false</td>
                    </tr>
                    <tr>
                        <td>loading</td>
                        <td>设置按钮为加载中状态</td>
                        <td>Boolean</td>
                        <td>false</td>
                    </tr>
                    <tr>
                        <td>icon</td>
                        <td>设置按钮的图标类型</td>
                        <td>String</td>
                        <td>-</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </l-article>
</template>

<script lang="ts">
import { component, View } from "src/index";
import * as code from "examples/codes/button";

@component
export default class Button extends View
{
    /**
     * 演示需要的代码。
     * @protected
     * @member
     * @returns any
     */
    protected code: any = code;
}
</script>
