<template>
    <l-article>
        <h1>button 按钮</h1>
        <p>基础组件，触发业务逻辑时使用。</p>
        <h2>代码示例</h2>
        <u-example title="按钮类型">
            <template slot="case">
                <i-button>Default</i-button>
                <i-button type="primary">Primary</i-button>
                <i-button type="dashed">Dashed</i-button>
                <i-button type="text">Text</i-button>
                <br/><br/>
                <i-button type="info">Info</i-button>
                <i-button type="success">Success</i-button>
                <i-button type="warning">Warning</i-button>
                <i-button type="error">Error</i-button>
            </template>
            <template slot="desc">
                <p>按钮类型有：默认按钮、主按钮、幽灵按钮、虚线按钮、文字按钮以及四种颜色按钮。</p>
                <p>通过设置<code>type</code>为<code>primary</code>、<code>dashed</code>、<code>text</code>、<code>info</code>、<code>success</code>、<code>warning</code>、<code>error</code>创建不同样式的按钮，不设置为默认样式。</p>
            </template>
            <u-code slot="code" lang="html">{{code.type}}</u-code>
        </u-example>
        
        <u-example title="图标按钮及按钮形状">
            <template slot="case">
                <i-button type="primary" shape="circle" icon="ios-search"></i-button>
                <i-button type="primary" icon="ios-search">Search</i-button>
                <i-button type="primary" shape="circle" icon="ios-search">Search</i-button>
                <i-button type="primary" shape="circle">Circle</i-button>
                <br/><br/>
                <i-button shape="circle" icon="ios-search"></i-button>
                <i-button icon="ios-search">Search</i-button>
                <i-button shape="circle" icon="ios-search">Search</i-button>
                <i-button shape="circle">Circle</i-button>
            </template>
            <template slot="desc">
                <p>按钮类型有：默认按钮、主按钮、幽灵按钮、虚线按钮、文字按钮以及四种颜色按钮。</p>
                <p>通过设置<code>type</code>为<code>primary</code>、<code>dashed</code>、<code>text</code>、<code>info</code>、<code>success</code>、<code>warning</code>、<code>error</code>创建不同样式的按钮，不设置为默认样式。</p>
            </template>
            <u-code slot="code" lang="html">{{code.icon}}</u-code>
        </u-example>
        
        <u-example title="按钮尺寸">
            <template slot="case">
                <i-button type="primary" size="large">Large</i-button>
                <i-button type="primary">Default</i-button>
                <i-button type="primary" size="small">Small</i-button>
                <br/><br/>
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
                <br/><br/>
                <i-button type="error" long>DELETE</i-button>
            </template>
            <template slot="desc">
                <p>按钮有三种尺寸：大、默认（中）、小</p>
                <p>通过设置<code>size</code>为<code>large</code>和<code>small</code>将按钮设置为大和小尺寸，不设置为默认（中）尺寸。</p>
            </template>
            <u-code slot="code" lang="html">{{code.long}}</u-code>
        </u-example>

        <u-example title="不可用状态">
            <template slot="case">
                <i-button>Default</i-button>
                <i-button disabled>Default(Disabled)</i-button>
                <br/><br/>
                <i-button type="primary">Primary</i-button>
                <i-button type="primary" disabled>Primary(Disabled)</i-button>
                <br/><br/>
                <i-button type="dashed">Dashed</i-button>
                <i-button type="dashed" disabled>Dashed(Disabled)</i-button>
                <br/><br/>
                <i-button type="text">Text</i-button>
                <i-button type="text" disabled>Text(Disabled)</i-button>
            </template>
            <template slot="desc">
                <p>通过添加<code>disabled</code>属性可将按钮设置为不可用状态。</p>
            </template>
            <u-code slot="code" lang="html">{{code.disabled}}</u-code>
        </u-example>

        <u-example title="加载中状态">
            <template slot="case">
                <i-button type="primary" loading>Loading...</i-button>
                <i-button type="primary" :loading="loading" @click="toLoading">
                    <span v-if="!loading">Click me!</span>
                    <span v-else>Loading...</span>
                </i-button>
                <i-button type="primary" :loading="loading2" icon="checkmark-round" @click="toLoading2">
                    <span v-if="!loading2">Click me!</span>
                    <span v-else>Loading...</span>
                </i-button>
            </template>
            <template slot="desc">
                <p>通过添加<code>loading</code>属性可以让按钮处于加载中状态，后两个按钮在点击时进入加载状态。</p>
            </template>
            <u-code slot="code" lang="html">{{code.loading}}</u-code>
        </u-example>

        <u-example title="按钮组合">
            <template slot="case">
                <h4>Basic</h4>
                <br/><br/>
                <i-button-group>
                    <i-button>Cancel</i-button>
                    <i-button type="primary">Confirm</i-button>
                </i-button-group>
                <i-button-group>
                    <i-button disabled>Yesterday</i-button>
                    <i-button disabled>Today</i-button>
                    <i-button disabled>Tomorrow</i-button>
                </i-button-group>
                <i-button-group>
                    <i-button type="primary">L</i-button>
                    <i-button>M</i-button>
                    <i-button>M</i-button>
                    <i-button type="dashed">R</i-button>
                </i-button-group>
                <br/><br/>
                <h4>Icons</h4>
                <br/><br/>
                <i-button-group>
                    <i-button type="primary">
                        <i-icon type="ios-arrow-back"></i-icon>
                        Backward
                    </i-button>
                    <i-button type="primary">
                        Forward
                        <i-icon type="ios-arrow-forward"></i-icon>
                    </i-button>
                </i-button-group>
                <i-button-group>
                    <i-button type="primary" icon="ios-skip-backward"></i-button>
                    <i-button type="primary" icon="ios-skip-forward"></i-button>
                </i-button-group>
                <i-button-group>
                    <i-button icon="ios-color-wand-outline"></i-button>
                    <i-button icon="ios-sunny-outline"></i-button>
                    <i-button icon="ios-crop"></i-button>
                    <i-button icon="ios-color-filter-outline"></i-button>
                </i-button-group>
                <br/><br/>
                <h4>Circle</h4>
                <br/><br/>
                <i-button-group shape="circle">
                    <i-button type="primary">
                        <i-icon type="ios-arrow-back"></i-icon>
                        Backward
                    </i-button>
                    <i-button type="primary">
                        Forward
                        <i-icon type="ios-arrow-forward"></i-icon>
                    </i-button>
                </i-button-group>
                <i-button-group shape="circle">
                    <i-button type="primary" icon="ios-skip-backward"></i-button>
                    <i-button type="primary" icon="ios-skip-forward"></i-button>
                </i-button-group>
                <i-button-group shape="circle">
                    <i-button icon="ios-color-wand-outline"></i-button>
                    <i-button icon="ios-sunny-outline"></i-button>
                    <i-button icon="ios-crop"></i-button>
                    <i-button icon="ios-color-filter-outline"></i-button>
                </i-button-group>
                <br/><br/>
                <h4>Size</h4>
                <br/><br/>
                <i-button-group size="large">
                    <i-button>Large</i-button>
                    <i-button>Large</i-button>
                </i-button-group>
                <i-button-group>
                    <i-button>Default</i-button>
                    <i-button>Default</i-button>
                </i-button-group>
                <i-button-group size="small">
                    <i-button>Small</i-button>
                    <i-button>Small</i-button>
                </i-button-group>
                <br/><br/>
                <i-button-group size="large" shape="circle">
                    <i-button>Large</i-button>
                    <i-button>Large</i-button>
                </i-button-group>
                <i-button-group shape="circle">
                    <i-button>Default</i-button>
                    <i-button>Default</i-button>
                </i-button-group>
                <i-button-group size="small" shape="circle">
                    <i-button>Small</i-button>
                    <i-button>Small</i-button>
                </i-button-group>
            </template>
            <template slot="desc">
                <p>将多个<code>i-button</code>放入<code>i-buttonGroup</code>内，可实现按钮组合的效果。</p>
                <p>通过设置<code>i-buttonGroup</code>的属性<code>size</code>为<code>large</code>和<code>small</code>，可将按钮组尺寸设置为大和小，不设置<code>size</code>，则为默认（中）尺寸。</p>
                <p>通过设置<code>i-buttonGroup</code>的属性<code>shape</code>为<code>circle</code>，可将按钮组形状设置为圆角。</p>
            </template>
            <u-code slot="code" lang="html">{{code.group}}</u-code>
        </u-example>

        <u-example title="按钮组纵向排列">
            <template slot="case">
                <i-button-group vertical>
                    <i-button icon="logo-facebook"></i-button>
                    <i-button icon="logo-twitter"></i-button>
                    <i-button icon="logo-googleplus"></i-button>
                    <i-button icon="logo-tumblr"></i-button>
                </i-button-group>
            </template>
            <template slot="desc">
                <p>通过设置<code>ButtonGroup</code>的属性<code>vertical</code>，可以使按钮组纵向排列。</p>
            </template>
            <u-code slot="code" lang="html">{{code.vertical}}</u-code>
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
                        <td>按钮类型，可选值为<code>primary</code>、<code>dashed</code>、<code>text</code>、<code>info</code>、<code>success</code>、<code>warning</code>、<code>error</code>或者不设置</td>
                        <td>String</td>
                        <td>-</td>
                    </tr>
                    <tr>
                        <td>ghost</td>
                        <td>幽灵属性，使按钮背景透明</td>
                        <td>Boolean</td>
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
            
            <h3>ButtonGroup props</h3>
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
                        <td>size</td>
                        <td>按钮组合大小，可选值为<code>large</code>、<code>small</code>、<code>default</code>或者不设置</td>
                        <td>String</td>
                        <td>-</td>
                    </tr>
                    <tr>
                        <td>shape</td>
                        <td>按钮组合形状，可选值为<code>circle</code>或者不设置</td>
                        <td>String</td>
                        <td>-</td>
                    </tr>
                    <tr>
                        <td>vertical</td>
                        <td>是否纵向排列按钮组</td>
                        <td>Boolean</td>
                        <td>false</td>
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

    /**
     * 加载示例用到的按钮加载状态标识字段。
     * @protected
     * @member
     * @returns boolean
     */
    protected loading: boolean = false;

    /**
     * 加载示例用到的按钮加载状态标识字段。
     * @protected
     * @member
     * @returns boolean
     */
    protected loading2: boolean = false;

    /**
     * 将示例按钮设为加载状态。
     * @protected
     * @param  {MouseEvent} e 鼠标事件参数。
     * @returns void
     */
    protected toLoading(e: MouseEvent): void
    {
        this.loading = true;
    }

    /**
     * 将示例按钮设为加载状态。
     * @protected
     * @param  {MouseEvent} e 鼠标事件参数。
     * @returns void
     */
    protected toLoading2(): void
    {
        this.loading2 = true;
    }
}
</script>
