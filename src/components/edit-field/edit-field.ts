/*!
 * This file is part of `components` module. 
 * 
 * Authors:
 *      jason <jasonsoop@gmail.com>
 * 
 * Licensed under the MIT License.
 * Copyright (C) 2010-2017 Flagwind Inc. All rights reserved. 
 */

import flagwind from "flagwind-core";
import EnumUtils = flagwind.EnumUtils;
import Vue, { VNode } from "vue";
import { Component } from "src/common";
import { component, config, watch } from "src/decorators";
import EditComponentTypes from "./edit-component-types";

/**
 * 表示一个编辑域。
 * @class
 * @version 1.0.0
 */
@component({template: require("./edit-field.html")})
export default class EditField extends Component
{
    /**
     * 获取或设置一个布尔值，表示当前是否正在编辑中。
     * @protected
     * @property
     * @returns boolean
     */
    protected editing: boolean = false;
    
    /**
     * 获取编辑组件的节点。
     * @protected
     * @property
     * @returns VNode
     */
    protected get editNode(): VNode
    {
        const defaultSlot = this.$slots.default;
        
        return defaultSlot ? defaultSlot[0] : null;
    }
    
    /**
     * 获取编辑组件的标签。
     * @protected
     * @property
     * @returns string
     */
    protected get editTag(): string
    {
        const editNode = this.editNode;

        if(editNode)
        {
            if(editNode.componentOptions)
            {
                return editNode.componentOptions.tag;
            }
            else
            {
                return editNode.tag;
            }
        }
        
        return "";
    }

    /**
     * 获取或设置编辑框中的值。
     * @public
     * @config
     * @returns any
     */
    @config({type: [String, Number]})
    public value: string | number;

    protected created(): void
    {
        // console.log(componentTypes);

        // .componentInstance;

        // console.log(this.$slots);

        // const child: any = this.$slots.default[0];

        // child.componentOptions.propsData.value = "2018-04-28";
        // child.componentOptions.propsData.autofocus = true;

        // console.log(child.componentOptions.tag);

        // i-input i-input-number

        // console.log(child.componentOptions.propsData);
    }

    // protected render(h: any): void
    // {
    //     const child: any = this.$slots.default[0];

    //     console.log(child);

    //     return null;
    // }

    protected mounted(): void
    {
        // const child: any = this.$slots.default[0].componentInstance;

        // child.$on("input", (value: any) =>
        // {
        //     console.log(value);
        // });
    }

    /**
     * 当值改变时调用。
     * @param  {number} value
     */
    @watch("value")
    protected onValueChange(value: string | number)
    {
        this.update(value);
    }

    /**
     * 当点击编辑按钮时调用。
     * @protected
     * @param  {any} e 事件参数。
     * @returns void
     */
    protected onEdit(e: any): void
    {
        this.editing = true;

        // const child: any = this.$slots.default[0].componentInstance;

        // console.log(child);
    }

    /**
     * 更新数值。
     * @param  {number} newValue 需要更新的数值。
     * @returns void
     */
    private update(newValue: string | number): void
    {
        // console.log(newValue);
    }

    private checkEditComponent(): boolean
    {
        if(!this.editNode)
        {
            throw new Error("");
        }

        return false;
    }
}
