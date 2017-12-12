/*!
 * Authors:
 *      jason <jasonsoop@gmail.com>
 * 
 * Licensed under the MIT License.
 * Copyright (C) 2010-2017 Flagwind Inc. All rights reserved. 
 */

import { component, config } from "../../decorators";
import { Component } from "src/index";

/**
 * 表示一个示范组件。
 * @class
 * @version 1.0.0
 */
@component({ template: require("./example.html") })
export default class Example extends Component
{
    /**
     * 介绍容器高度。
     * @private
     * @member
     * @returns number
     */
    private introPanelHeight: number = 0;

    /**
     * 代码容器高度。
     * @private
     * @member
     * @returns number
     */
    private codePanelHeight: number = 0;
    
    /**
     * 获取或设置一个布尔值，用于描述组件是否准备完毕。
     * @private
     * @member
     * @returns number
     */
    private isReady: boolean = false;

    /**
     * 获取或设置一个布尔值，用于控制是否显示"展开代码"。
     * @protected
     * @member
     * @returns boolean
     */
    protected showExpand: boolean = true;

    /**
     * 获取或设置一个布尔值，用于表述当前代码是否已经展开。
     * @protected
     * @member
     * @returns boolean
     */
    protected isExpanded: boolean = false;
    
    /**
     * 获取代码容器的动态样式。
     * @protected
     * @property
     * @returns any
     */
    protected get codePanelStyle(): any
    {
        const style: any = {};

        if(this.isReady)
        {
            // 如果代码已经展开，则采用代码面板的高度，否则才用介绍面板的高度
            if(this.isExpanded)
            {
                style.height = `${this.codePanelHeight}px`;
            }
            else
            {
                style.height = `${this.introPanelHeight}px`;
            }
        }

        return style;
    }

    /**
     * 获取代码包装器的动态样式。
     * @protected
     * @property
     * @returns any
     */
    protected get codeWrapStyle(): any
    {
        const style: any =
        {
            opacity: 1
        };

        // 当配置项为隐藏代码，且代码没有展开时将包装容器设为透明
        if(this.hideCode && !this.isExpanded)
        {
            style.opacity = 0;
        }

        return style;
    }

    /**
     * 获取或设置示例标题。
     * @public
     * @config
     * @default ""
     * @returns string
     */
    @config({default: ""})
    public title: string;

    /**
     * 获取或设置是否以垂直方式展示。
     * @public
     * @config
     * @default false
     * @returns boolean
     */
    @config({default: false})
    public vertical: boolean;

    /**
     * 获取或设置是否隐藏代码。
     * @public
     * @config
     * @default false
     * @returns boolean
     */
    @config({default: false})
    public hideCode: boolean;
    
    /**
     * 创建组件时调用的钩子方法。
     * @protected
     * @returns void
     */
    protected mounted(): void
    {
        this.$nextTick(() =>
        {
            const introPanelHeight = this.$children[0].$children[0].$el.clientHeight;
            const codePanelHeight = this.$children[0].$children[1].$el.clientHeight + 20;

            this.codePanelHeight = codePanelHeight;
            
            // 当介绍容器高度大于代码容器高度时，将"展开代码"隐藏
            if((introPanelHeight > codePanelHeight) && !this.hideCode)
            {
                this.showExpand = false;
            }

            this.introPanelHeight = this.hideCode ? 30 : introPanelHeight;

            this.isReady = true;
        });
    }
    
    /**
     * 当点击展开代码操作条时调用。
     * @param  {MouseEvent} e 鼠标事件参数。
     * @returns void
     */
    protected onExpandCode(e: MouseEvent): void
    {
        this.isExpanded = !this.isExpanded;
    }
}
