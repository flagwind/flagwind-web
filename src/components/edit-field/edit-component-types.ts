/*!
 * This file is part of `components` module. 
 * 
 * Authors:
 *      jason <jasonsoop@gmail.com>
 * 
 * Licensed under the MIT License.
 * Copyright (C) 2010-2017 Flagwind Inc. All rights reserved. 
 */

/**
 * 表示编辑域支持的组件类型。
 * @enum
 * @version 1.0.0
 */
enum EditComponentTypes
{
    /**
     * 输入框。
     * @member
     */
    input = "i-input",

    /**
     * 数字输入框。
     * @member
     */
    inputNumber = "i-input-number",
    
    /**
     * 开关。
     * @member
     */
    switch = "i-switch",

    /**
     * 选择器。
     * @member
     */
    select = "i-select",

    /**
     * 日期选择器。
     * @member
     */
    datePicker = "i-date-picker",

    /**
     * 时间选择器。
     * @member
     */
    timePicker = "i-time-picker",

    /**
     * 级联选择。
     * @member
     */
    cascader = "i-cascader",

    /**
     * 单选框组。
     * @member
     */
    radioGroup = "i-radio-group",
    
    /**
     * 复选框组。
     * @member
     */
    checkboxGroup = "i-checkbox-group"
}

export default EditComponentTypes;
