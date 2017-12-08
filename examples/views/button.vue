<template>
    <article>
        <h1>button 按钮</h1>
        <p>基础组件，触发业务逻辑时使用。</p>
        <h2>代码示例</h2>
        
        <u-example title="按钮类型">
            <template slot="case">
                <i-button>Default</i-button>
                <i-button type="primary">Primary</i-button>
                <i-button type="ghost">Ghost</i-button>
                <i-button type="dashed">Dashed</i-button>
                <i-button type="text">Text</i-button>
                <br /><br />
                <i-button type="info">Info</i-button>
                <i-button type="success">Success</i-button>
                <i-button type="warning">Warning</i-button>
                <i-button type="error">Error</i-button>
            </template>
            <template slot="desc">
                <p>按钮类型有：默认按钮、主按钮、幽灵按钮、虚线按钮、文字按钮以及四种颜色按钮。</p>
                <p>通过设置<code>type</code>为<code>primary</code>、<code>ghost</code>、<code>dashed</code>、<code>text</code>、<code>info</code>、<code>success</code>、<code>warning</code>、<code>error</code>创建不同样式的按钮，不设置为默认样式。</p>
            </template>
            <u-code slot="code" lang="html">{{code.type}}</u-code>
        </u-example>

        <u-example title="图标按钮及按钮形状">
            <template slot="case">
                <i-button type="primary" shape="circle" icon="ios-search"></i-button>
                <i-button type="primary" icon="ios-search">Search</i-button>
                <i-button type="primary" shape="circle" icon="ios-search">Search</i-button>
                <i-button type="primary" shape="circle">Circle</i-button>
                <br><br>
                <i-button type="ghost" shape="circle" icon="ios-search"></i-button>
                <i-button type="ghost" icon="ios-search">Search</i-button>
                <i-button type="ghost" shape="circle" icon="ios-search">Search</i-button>
                <i-button type="ghost" shape="circle">Circle</i-button>
            </template>
            <template slot="desc">
                <p>按钮类型有：默认按钮、主按钮、幽灵按钮、虚线按钮、文字按钮以及四种颜色按钮。</p>
                <p>通过设置<code>type</code>为<code>primary</code>、<code>ghost</code>、<code>dashed</code>、<code>text</code>、<code>info</code>、<code>success</code>、<code>warning</code>、<code>error</code>创建不同样式的按钮，不设置为默认样式。</p>
            </template>
            <u-code slot="code" lang="html">{{code.icon}}</u-code>
        </u-example>
        
        <u-example title="按钮尺寸">
            <template slot="case">
                <i-button type="primary" size="large">Large</i-button>
                <i-button type="primary">Default</i-button>
                <i-button type="primary" size="small">Small</i-button>
                <br><br>
                <i-button type="primary" shape="circle" size="large">Large</i-button>
                <i-button type="primary" shape="circle">Default</i-button>
                <i-button type="primary" shape="circle" size="small">Small</i-button>
            </template>
            <template slot="desc">
                <p>按钮有三种尺寸：大、默认（中）、小</p>
                <p>通过设置<code>size</code>为<code>large</code>和<code>small</code>将按钮设置为大和小尺寸，不设置为默认（中）尺寸。</p>
            </template>
            <u-code slot="code" lang="html">{{code.size}}</u-code>
        </u-example>

        <u-example title="长按钮">
            <template slot="case">
                <i-button type="success" long>SUBMIT</i-button>
                <br><br>
                <i-button type="error" long>DELETE</i-button>
            </template>
            <template slot="desc">
                <p>按钮有三种尺寸：大、默认（中）、小</p>
                <p>通过设置<code>size</code>为<code>large</code>和<code>small</code>将按钮设置为大和小尺寸，不设置为默认（中）尺寸。</p>
            </template>
            <u-code slot="code" lang="html">{{code.long}}</u-code>
        </u-example>

    </article>
</template>

<script lang="ts">

import { component, View } from "src/index";
import * as code from "../codes/button";

@component
export default class Button extends View
{
    protected code: any = code;
}
</script>
