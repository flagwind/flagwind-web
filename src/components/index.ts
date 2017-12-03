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
    "i-affix": iview.Affix,
    "i-alert": iview.Alert,
    "i-auto-complete": iview.AutoComplete,
    "i-avatar": iview.Avatar,
    "i-back-top": iview.BackTop,
    "i-badge": iview.Badge,
    "i-breadcrumb": iview.Breadcrumb,
    "i-breadcrumb-item": iview.BreadcrumbItem,
    "i-button": iview.Button,
    "i-button-group": iview.ButtonGroup,
    "i-card": iview.Card,
    "i-carousel": iview.Carousel,
    "i-carousel-item": iview.CarouselItem,
    "i-cascader": iview.Cascader,
    "i-checkbox": iview.Checkbox,
    "i-checkbox-group": iview.CheckboxGroup,
    "i-circle": iview.Circle,
    "i-col": iview.Col,
    "i-collapse": iview.Collapse,
    "i-color-picker": iview.ColorPicker,
    "i-date-picker": iview.DatePicker,
    "i-dropdown": iview.Dropdown,
    "i-dropdown-item": iview.DropdownItem,
    "i-dropdown-menu": iview.DropdownMenu,
    "i-form": iview.Form,
    "i-form-item": iview.FormItem,
    "i-icon": iview.Icon,
    "i-input": iview.Input,
    "i-input-number": iview.InputNumber,
    "i-menu": iview.Menu,
    "i-menu-group": iview.MenuGroup,
    "i-menu-item": iview.MenuItem,
    "i-submenu": iview.Submenu,
    "i-modal": iview.Modal,
    "i-option": iview.Option,
    "i-option-group": iview.OptionGroup,
    "i-page": iview.Page,
    "i-panel": iview.Panel,
    "i-poptip": iview.Poptip,
    "i-progress": iview.Progress,
    "i-radio": iview.Radio,
    "i-radio-group": iview.RadioGroup,
    "i-rate": iview.Rate,
    "i-row": iview.Row,
    "i-select": iview.Select,
    "i-slider": iview.Slider,
    "i-spin": iview.Spin,
    "i-step": iview.Step,
    "i-steps": iview.Steps,
    "i-switch": iview.Switch,
    "i-table": iview.Table,
    "i-tabs": iview.Tabs,
    "i-tab-pane": iview.TabPane,
    "i-tag": iview.Tag,
    "i-timeline": iview.Timeline,
    "i-timeline-item": iview.TimelineItem,
    "i-time-picker": iview.TimePicker,
    "i-tooltip": iview.Tooltip,
    "i-transfer": iview.Transfer,
    "i-tree": iview.Tree,
    "i-upload": iview.Upload
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
