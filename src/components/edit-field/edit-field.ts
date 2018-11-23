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
import Type = flagwind.Type;
import Vue, { VNode } from "vue";
import { Component } from "src/common";
import { component, config } from "src/decorators";
import EditComponentTypes from "./edit-component-types";

// tslint:disable-next-line:no-var-requires
const equals = require("equals");

/**
 * 表示一个编辑域。
 * @class
 * @version 1.0.0
 */
@component({template: require("./edit-field.html")})
export default class EditField extends Component
{
    /**
     * 获取或设置组件修改前的值。
     * @protected
     * @property
     * @returns any
     */
    protected originalValue: any = null;

    /**
     * 获取或设置组件的当前值。
     * @protected
     * @property
     * @returns any
     */
    protected currentValue: any = null;

    /**
     * 获取或设置用于显示的值。
     * @protected
     * @property
     * @returns any
     */
    protected displayValue: string = "";

    /**
     * 获取或设置一个布尔值，表示当前是否正在编辑中。
     * @protected
     * @property
     * @returns boolean
     */
    protected editing: boolean = false;

    /**
     * 获取或设置一个布尔值，表示当前是否正在保存中。
     * @protected
     * @property
     * @returns boolean
     */
    protected saving: boolean = false;

    /**
     * 获取编辑组件的节点。
     * @protected
     * @property
     * @returns VNode
     */
    protected get editComponentNode(): VNode
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
    protected get editComponentTag(): string
    {
        const editNode = this.editComponentNode;

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
     * 获取编辑组件的实例。
     * @protected
     * @property
     * @returns Vue
     */
    protected get editComponent(): Vue
    {
        return this.editComponentNode ? this.editComponentNode.componentInstance : null;
    }

    /**
     * 获取或设置用于自定义格式化显示格式的函数。
     * @public
     * @config
     * @returns Function
     */
    @config({type: [Function]})
    public renderFormat: Function;

    /**
     * 获取或设置用于呈现多个数时显示的分隔符。
     * @public
     * @config
     * @returns string
     */
    @config({type: String, default: " , "})
    public separator: string;

    /**
     * 获取或设置用于呈现值为空时显示的标签。
     * @public
     * @config
     * @returns string
     */
    @config({type: String, default: "-"})
    public emptyLabel: string;

    /**
     * 获取或设置当编辑完成时调用的回调方法。
     * @public
     * @config
     * @returns Function
     */
    @config({type: [Function], required: true})
    public onChange: Function;

    /**
     * 获取或设置一个布尔值，表示当编辑组件为单行文本框时，是否按回车键可以提交。
     * @public
     * @config
     * @returns Function
     */
    @config({type: Boolean, default: true})
    public enterSubmit: boolean;
    
    /**
     * 当组件创建完成时调用。
     * @protected
     * @override
     * @returns void
     */
    protected created(): void
    {
        // 验证编辑组件
        if(this.validateComponent())
        {
            const props: any = this.editComponentNode.componentOptions.propsData;

            // 初始化组件的默认值
            this.currentValue = this.originalValue = props.value;
        }
    }

    /**
     * 当组件装载完成时调用。
     * @protected
     * @override
     * @returns void
     */
    protected mounted(): void
    {
        // 根据初始值渲染显示标值
        this.updateDisplayValue();

        // 监听内联组件的 value 属性变动
        this.editComponent.$watch("value", this.onValueChange);

        // 绑定内联编辑组件的 input 事件，以便监听数据变动
        this.editComponent.$on("input", this.onInputChange);
        
        // 绑定输入框回车键事件
        if(this.enterSubmit && this.editComponentTag === EditComponentTypes.input)
        {
            this.editComponent.$on("on-enter", this.onEditComplte);
        }
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

        // 记下改动前的值为原始值
        if(Type.isArray(this.currentValue))
        {
            this.originalValue = [].concat(this.currentValue);
        }
        else
        {
            this.originalValue = this.currentValue;
        }
        
    }
    
    /**
     * 当点击编辑完成按钮时调用。
     * @protected
     * @param  {any} e 事件参数。
     * @returns void
     */
    protected onEditComplte(): void
    {
        this.saving = true;
        this.editing = false;
        
        if(equals(this.currentValue, this.originalValue))
        {
            this.onEditSuccess();

            return;
        }

        const result = this.onChange(this.currentValue, this.originalValue);

        if(result !== null && result !== undefined)
        {
            if(result.then)
            {
                result.then((res: any) =>
                {
                    if(res === false)
                    {
                        this.onEditFailure();
                    }
                    else
                    {
                        this.onEditSuccess();
                    }
                }).catch(() =>
                {
                    this.onEditFailure();
                });
            }
            else
            {
                if(result === false)
                {
                    this.onEditFailure();
                }
                else
                {
                    this.onEditSuccess();
                }
            }
        }
        else
        {
            this.onEditSuccess();
        }
    }
    
    /**
     * 当编辑成功时调用。
     * @private
     * @returns void
     */
    private onEditSuccess(): void
    {
        this.updateDisplayValue();
        
        this.saving = false;
        this.editing = false;
    }

    /**
     * 当编辑失败时调用。
     * @private
     * @returns void
     */
    private onEditFailure(): void
    {
        this.saving = false;
        this.editing = true;
    }

    /**
     * 当编辑组件的 value 值发生变动时调用。
     * @private
     * @param  {any} value 变动后的的值。
     * @returns void
     */
    private onValueChange(value: any): void
    {
        // 设置当前值
        this.currentValue = value;

        // 更新显示值
        this.updateDisplayValue();
    }

    /**
     * 当编辑组件的输入或选择发生变动时调用。
     * @private
     * @param  {any} value 变动后的的值。
     * @returns void
     */
    private onInputChange(value: any): void
    {
        // 设置当前值
        this.currentValue = value;
    }
    
    /**
     * 验证内联编辑组件是否有效。
     * @private
     * @returns boolean
     */
    private validateComponent(): boolean
    {
        if(!this.editComponentTag)
        {
            throw new Error("The edit component is empty.");
        }

        const editComponentTags = Object.keys(EditComponentTypes).map(key => EditComponentTypes[key]);

        if(editComponentTags.indexOf(this.editComponentTag) === -1)
        {
            throw new Error(`The edit component must in "${editComponentTags.join(",")}"`);
        }

        return true;
    }
    
    /**
     * 根据当前值更新用于显示的值。
     * @private
     * @returns void
     */
    private updateDisplayValue(): void
    {
        const value: any = this.currentValue;
        const editComponent: any = this.editComponent;
        
        // 如果配置了自定义格式化函数，则交由格式化函数处理
        if(this.renderFormat)
        {
            this.displayValue = this.renderFormat(value);

            return;
        }

        // 如果值为空则直接显示空标签
        if(value === null || value === undefined || value === "" || value.length === 0)
        {
            this.displayValue = this.emptyLabel;

            return;
        }

        switch(this.editComponentTag)
        {
            case EditComponentTypes.input:
            case EditComponentTypes.inputNumber:
            {
                // 输入框或者数值输入库则直接取原始值做显示
                this.displayValue = value;
                
                break;
            }
            case EditComponentTypes.switch:
            {
                // 首先获取 switch 组件的开/关插槽
                const editComponentSlots = editComponent.$slots;

                if(editComponent.currentValue === editComponent.trueValue)
                {
                    const openSlot = editComponentSlots.open ? editComponentSlots.open[0] : null;
                    
                    // 如果 switch 组件有定义名为 open 的插槽，则取插槽中的文本，否则就取 switch 组件配置的的 true 值
                    this.displayValue = openSlot ? openSlot.children[0].text.trim() : editComponent.trueValue;
                }
                else
                {
                    // 如果 switch 组件有定义名为 close 的插槽，则取插槽中的文本，否则就取 switch 组件配置的的 false 值
                    const closeSlot = editComponentSlots.close ? editComponentSlots.close[0] : null;

                    this.displayValue = closeSlot ? closeSlot.children[0].text.trim() : editComponent.falseValue;
                }

                break;
            }
            case EditComponentTypes.datePicker:
            case EditComponentTypes.timePicker:
            {
                // 日期和时间则直接取编辑组件的渲染值
                this.displayValue = editComponent.visualValue;

                break;
            }
            case EditComponentTypes.cascader:
            {
                // 级联组件比较特殊，需要监听 "on-result-change" 才能获取到显示的内容
                editComponent.$on("on-result-change", () =>
                {
                    this.displayValue = editComponent.displayRender;
                });
                
                break;
            }
            case EditComponentTypes.select:
            {
                const labels = editComponent.values.map((item: any) => item.label);
                    
                this.displayValue = labels.join(this.separator);

                break;
            }
            case EditComponentTypes.radioGroup:
            {
                // 单选组需要找到标签等于值得那个单选框，然后再获取其 html 中的文本
                const radio = editComponent.childrens.find((item: any) => item.label === value);
                
                if(radio)
                {
                    this.displayValue = radio.$el.innerText.trim();
                }

                break;
            }
            case EditComponentTypes.checkboxGroup:
            {
                // 复选框组需要找到那些标签等于值得那些单选框，然后再联合其 html 中的文本
                const checkboxs = editComponent.childrens.filter((checkbox: any) => value.indexOf(checkbox.label) !== -1);

                const labels = checkboxs.map((checkbox: any) => checkbox.$el.innerText.trim());

                this.displayValue = labels.join(this.separator);

                break;
            }
        }
    }
}
