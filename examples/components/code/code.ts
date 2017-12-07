/*!
 * Authors:
 *      jason <jasonsoop@gmail.com>
 * 
 * Licensed under the MIT License.
 * Copyright (C) 2010-2017 Flagwind Inc. All rights reserved. 
 */

import * as hljs from "highlight.js";
import Clipboard from "clipboard";
import { component, config, Component } from "src/index";

/**
 * 表示一个呈现代码块的组件。
 * @class
 * @description  通过设置`lang`配置项，可以呈现不同的编程语言。
 * @version 1.0.0
 */
@component({ template: require("./code.html") })
export default class Code extends Component
{
    /**
     * 代码内容。
     * @private
     * @member
     * @returns string
     */
    private content: string = "";
    
    /**
     * 获取一个布尔值，表示代码是否已经复制。
     * @protected
     * @member
     * @returns boolean
     */
    protected isCopy: boolean = false;

    /**
     * 获取或设置一个布尔值，表示当前是否处于放大状态。
     * @protected
     * @member
     * @returns boolean
     */
    protected isScale: boolean = false;
    
    /**
     * 获取当前代码所呈现的编程语言风格。
     * @protected
     * @property
     * @returns string
     */
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
    
    /**
     * 获取或设置当前代码采用的编程语言。
     * @public
     * @config
     * @default "javascript"
     * @returns string
     */
    @config({default: "javascript"})
    public lang: string;
    
    /**
     * 获取或设置当前代码快的的标题。
     * @public
     * @config
     * @default "Example"
     * @returns string
     */
    @config({default: "Example"})
    public title: string;

    /**
     * 获取或设置是否为当前代码块呈现背景。
     * @public
     * @config
     * @default false
     * @returns boolean
     */
    @config({default: false})
    public showBack: boolean;
    
    /**
     * 创建组件时调用的钩子方法。
     * @protected
     * @returns void
     */
    protected mounted(): void
    {
        const $code1 = this.$refs.code1 as HTMLElement;
        const $code2 = this.$refs.code2 as HTMLElement;

        this.content = $code1.innerHTML.replace(/\n/, "");
        
        $code1.innerHTML = this.content;
        $code2.innerHTML = this.content;
        
        hljs.highlightBlock($code1);
        hljs.highlightBlock($code2);
    }
    
    /**
     * 复制代码。
     * @protected
     * @param  {MouseEvent} e 鼠标事件参数。
     * @returns void
     */
    protected onCopy(e: MouseEvent): void
    {
        const content = this.content.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&");
        const clipboard = new Clipboard(".u-code-copy", {text() { return content; }});
        
        clipboard.on("success", (e: Clipboard.Event) =>
        {
            e.clearSelection();
            
            clipboard.destroy();
            
            this.isCopy = true;
            
            this.$msgbox.success("代码已复制到剪贴板");
            
            setTimeout(() => { this.isCopy = false; }, 2000);
        });
    }
    
    /**
     * 放大代码。
     * @protected
     * @param  {MouseEvent} e 鼠标事件参数。
     * @returns void
     */
    protected onScale(e: MouseEvent): void
    {
        this.isScale = true;
    }
}
