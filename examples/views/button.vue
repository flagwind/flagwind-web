<template>
    <article>
        <h1>button 按钮</h1>
        <p>基础组件，触发业务逻辑时使用。</p>

        <h2>代码示例</h2>
        
        <i-row id="按钮类型" class="example">
            <i-col class="example-demo" span="12">
                <div class="example-case">
                    <i-button>Default</i-button>
                    <i-button type="primary">Primary</i-button>
                    <i-button type="ghost">Ghost</i-button>
                    <i-button type="dashed">Dashed</i-button>
                    <i-button type="text">Text</i-button>
                    <br><br>
                    <i-button type="info">Info</i-button>
                    <i-button type="success">Success</i-button>
                    <i-button type="warning">Warning</i-button>
                    <i-button type="error">Error</i-button>
                </div>
                <div class="example-title"><span>按钮类型 <a href="#按钮类型">#</a></span></div>
                <div class="example-desc">
                    <p>按钮类型有：默认按钮、主按钮、幽灵按钮、虚线按钮、文字按钮以及四种颜色按钮。</p>
                    <p>通过设置<code>type</code>为<code>primary</code>、<code>ghost</code>、<code>dashed</code>、<code>text</code>、<code>info</code>、<code>success</code>、<code>warning</code>、<code>error</code>创建不同样式的按钮，不设置为默认样式。</p>
                </div>
            </i-col>

            <div class="example-split"></div>
        
            <i-col class="example-code" span="12" style="height:251px">
                <u-code lang="html">
                    {{code.type}}
                </u-code>
                <!-- <div> -->
                    <!-- <highlight-code lang="xml" code='
                    <i-button>Default</i-button>
                    <i-button type="primary">Primary</i-button>
                    <i-button type="ghost">Ghost</i-button>
                    <i-button type="dashed">Dashed</i-button>
                    <i-button type="text">Text</i-button>
                    <br><br>
                    <i-button type="info">Info</i-button>
                    <i-button type="success">Success</i-button>
                    <i-button type="warning">Warning</i-button>
                    <i-button type="error">Error</i-button>
                    '>
                    </highlight-code> -->
                <!-- </div> -->

                <div class="example-code-more"><i class="ivu-icon ivu-icon-ios-arrow-down" style=""></i> <i class="ivu-icon ivu-icon-ios-arrow-up" style="display: none;"></i> <button type="button" class="ivu-btn ivu-btn-text" style="display: none;"><!----> <!----> <span>Show Code</span></button></div>
            </i-col>
        </i-row>

        <!-- <i-card>
            <i-button>Default</i-button>
            <i-button type="primary">Primary</i-button>
            <i-button type="ghost">Ghost</i-button>
            <i-button type="dashed">Dashed</i-button>
            <i-button type="text">Text</i-button>
            <br><br>
            <i-button type="info">Info</i-button>
            <i-button type="success">Success</i-button>
            <i-button type="warning">Warning</i-button>
            <i-button type="error">Error</i-button>
        </i-card> -->

        <!-- <h2>图标按钮及按钮形状</h2>

        <i-card>
            <i-button type="primary" shape="circle" icon="ios-search"></i-button>
            <i-button type="primary" icon="ios-search">Search</i-button>
            <i-button type="primary" shape="circle" icon="ios-search">Search</i-button>
            <i-button type="primary" shape="circle">Circle</i-button>
            <br><br>
            <i-button type="ghost" shape="circle" icon="ios-search"></i-button>
            <i-button type="ghost" icon="ios-search">Search</i-button>
            <i-button type="ghost" shape="circle" icon="ios-search">Search</i-button>
            <i-button type="ghost" shape="circle">Circle</i-button>
        </i-card>

        <h2>按钮尺寸</h2>

        <i-card>
            <i-button type="primary" size="large">Large</i-button>
            <i-button type="primary">Default</i-button>
            <i-button type="primary" size="small">Small</i-button>
            <br><br>
            <i-button type="primary" shape="circle" size="large">Large</i-button>
            <i-button type="primary" shape="circle">Default</i-button>
            <i-button type="primary" shape="circle" size="small">Small</i-button>
        </i-card> -->
        
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
