
/*!
 * Authors:
 *      yanglijuan <1034102809@qq.com>
 * 
 * Licensed under the MIT License.
 * Copyright (C) 2010-2017 Flagwind Inc. All rights reserved. 
 */

import { Component } from "src/common";
import { component, watch, config } from "src/decorators";

@component({ template: require("./number-scroll.html") })
export default class NumberScroll extends Component
{
    /**
     * 当前数据
     * @private
     * @member
     * @returns number
     */
    protected currentNumber: number = 0;

    /**
     * 下一个数据
     * @private
     * @member
     * @returns number
     */
    protected nextNumber: number = 0;

    /**
     * 数据包裹的样式
     * @private
     * @member
     * @returns number
     */
    protected numberContentStyle: object = {};

    /**
     * 控制数字每一行的属性
     * @protected
     * @property
     * @returns object
     */
    protected get lineStyle(): object
    {
        return {height: this.lineHeight + "px"};
    }

    /**
     * 设置数字高度，用于控制上滚下滚。
     * @public
     * @config
     * @default "javascript"
     * @returns string
     */
    @config({ default: 30 })
    public lineHeight: number;

    /**
     * 从父组件传递过来的新数字
     * @public
     * @config
     * @default "javascript"
     * @returns string
     */
    @config({ default: 0 })
    public newNumber: number;

    /**
     * 创建组件时调用的钩子方法。
     * @protected
     * @returns void
     */
    protected mounted(): void
    {
        this.$nextTick(() =>
        {
            this.setTransform(this.lineHeight);// 默认切换到中间的位置
        });
    }

    /**
     * 当下一个数据变化时调用。
     * @protected
     * @returns void
     */
    @watch("newNumber")
    protected newNumberChange(num: number): void
    {
        this.setTransform(this.lineHeight);// 每次更新前都将数字包裹滚回中间位置
        this.currentNumber = this.nextNumber;
        this.nextNumber = num;
        
        // 当新数据大于当前数据时由下往上翻动，否则由上向下滚动
        setTimeout(() =>
        {
            if(num > this.currentNumber)
            {
                this.setTransform(this.lineHeight * 2);
            }
            else
            {
                this.setTransform(0);
            }
        // tslint:disable-next-line:align
        }, 500);
    }

    /**
     * 设置数字包裹的样式
     * @param  {number} num
     * @returns void
     */
    protected setTransform(num: number): void
    {
        const style: any = {};
        style.transform = `translateY(-${num}px)`;
        if(num !== this.lineHeight)
        {
            style.transition = "all 0.2s";
        }
        this.numberContentStyle = style;
        
    }
}
