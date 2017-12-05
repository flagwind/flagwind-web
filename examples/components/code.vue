<template>
    <div class="u-code">
        <pre><code ref="code1" :class="language"><slot></slot></code></pre>

        <span class="scale" @click="scale">
            <i-tooltip content="放大" placement="top" transfer>
                <i-icon type="qr-scanner" size="18"></i-icon>
            </i-tooltip>
        </span>

        <span class="copy" @click="clip">
            <i-tooltip content="复制代码" placement="top" transfer>
                <i-icon type="clipboard" size="18" v-show="!copied"></i-icon>
                <i-icon type="checkmark" size="18" v-show="copied" style="color:#5cb85c"></i-icon>
            </i-tooltip>
        </span>

        <i-modal class-name="code-scale-modal" :title="title" width="65" v-model="openScale">
            <pre><code :class="language" ref="code2"></code></pre>
        </i-modal>
    </div>
</template>

<script lang="ts">

import * as hljs from "highlight.js";
import Clipboard from "clipboard";
import { component, property, Component } from "src/index";

/**
 * 表示一个公共头部组件。
 * @class
 * @version 1.0.0
 */
@component
export default class Code extends Component
{
    private _code: string = "";

    protected copied: boolean = false;
    protected openScale: boolean = false;

    protected get language(): string
    {
        if(this.lang === "auto")
        {
            return "";
        }
        else
        {
            return this.lang;
        }
    }

    @property({default: "javascript"})
    public lang: string;

    @property({default: "Example"})
    public title: string;

    protected mounted(): void
    {
        let $code1 = this.$refs.code1 as any;
        let $code2 = this.$refs.code2 as any;

        this._code = $code1.innerHTML.replace(/\n/, "");

        $code1.innerHTML = this._code;
        $code2.innerHTML = this._code;
        
        hljs.highlightBlock($code1);
        hljs.highlightBlock($code2);
    }

    protected clip(): void
    {
        let code = this._code.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&");
        let clipboard = new Clipboard(".copy", {text(){return code;}});

        clipboard.on("success", (e: Clipboard.Event) =>
        {
            e.clearSelection();
            clipboard.destroy();

            this.copied = true;

            
            
            setTimeout(() =>
            {
                this.copied = false;
            }, 2000);
        });
    }

    protected scale(): void
    {
        this.openScale = true;
    }
}

</script>

<style scoped>
    .u-code
    {
        position: relative;
        font-size: 14px;
    }

    span.copy, span.scale, span.open-fiddle
    {
        border-radius: 0 0 3px 3px;
        padding: 2px 5px;
        position: absolute;
        top: 5px;
        right: 0;
        color: #b2b2b2;
        cursor: pointer;
    }

    span.scale
    {
        right: 25px;
    }
</style>
