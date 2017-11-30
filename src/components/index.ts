/*!
 * This file is part of `components` module. 
 * 
 * Authors:
 *      jason <jasonsoop@gmail.com>
 * 
 * Licensed under the MIT License.
 * Copyright (C) 2010-2017 Flagwind Inc. All rights reserved. 
 */

import iview from "./iview";

const components =
{
    Affix: iview.Affix,
    Alert: iview.Alert,
    AutoComplete: iview.AutoComplete,
    Avatar: iview.Avatar,
    BackTop: iview.BackTop,
    Badge: iview.Badge,
    Breadcrumb: iview.Breadcrumb,
    BreadcrumbItem: iview.BreadcrumbItem,
    iButton: iview.Button,
    Button: iview.Button,
    ButtonGroup: iview.ButtonGroup,
    Card: iview.Card,
    Carousel: iview.Carousel,
    CarouselItem: iview.CarouselItem,
    Cascader: iview.Cascader,
    Checkbox: iview.Checkbox,
    CheckboxGroup: iview.CheckboxGroup,
    iCircle: iview.Circle,
    Col: iview.Col,
    iCol: iview.Col,
    Collapse: iview.Collapse,
    ColorPicker: iview.ColorPicker,
    DatePicker: iview.DatePicker,
    Dropdown: iview.Dropdown,
    DropdownItem: iview.DropdownItem,
    DropdownMenu: iview.DropdownMenu,
    Form: iview.Form,
    iForm: iview.Form,
    FormItem: iview.FormItem,
    Icon: iview.Icon,
    Input: iview.Input,
    iInput: iview.Input,
    InputNumber: iview.InputNumber,
    Scroll: iview.Scroll,
    LoadingBar: iview.LoadingBar,
    Menu: iview.Menu,
    iMenu: iview.Menu,
    MenuGroup: iview.MenuGroup,
    MenuItem: iview.MenuItem,
    Submenu: iview.Submenu,
    Message: iview.Message,
    Modal: iview.Modal,
    Notice: iview.Notice,
    Option: iview.Option,
    iOption: iview.Option,
    OptionGroup: iview.OptionGroup,
    Page: iview.Page,
    Panel: iview.Panel,
    Poptip: iview.Poptip,
    Progress: iview.Progress,
    iProgress: iview.Progress,
    Radio: iview.Radio,
    RadioGroup: iview.RadioGroup,
    Rate: iview.Rate,
    Row: iview.Row,
    Select: iview.Select,
    iSelect: iview.Select,
    Slider: iview.Slider,
    Spin: iview.Spin,
    Step: iview.Step,
    Steps: iview.Steps,
    iSwitch: iview.Switch,
    iTable: iview.Table,
    Table: iview.Table,
    Tabs: iview.Tabs,
    TabPane: iview.TabPane,
    Tag: iview.Tag,
    Timeline: iview.Timeline,
    TimelineItem: iview.TimelineItem,
    TimePicker: iview.TimePicker,
    Tooltip: iview.Tooltip,
    Transfer: iview.Transfer,
    Tree: iview.Tree,
    Upload: iview.Upload
};

// tslint:disable-next-line:variable-name
const install = function(Vue: any, opts: any = {})
{
    iview.locale(opts.locale);
    iview.i18n(opts.i18n);
    
    Object.keys(components).forEach(key =>
    {
        Vue.component(key, components[key]);
    });
};

export default { ...components, install };
