/*!
* iView
* Web: https://www.iviewui.com
* Github: https://github.com/iview/iview
* Author: Aresn
*/

// tslint:disable-next-line:no-var-requires
const iview = require("iview");

const components =
{
    Affix: iview.Affix,
    Alert: iview.Alert,
    AutoComplete: iview.AutoComplete,
    Avatar: iview.Avatar,
    BackTop: iview.BackTop,
    Badge: iview.Badge,
    Breadcrumb: iview.Breadcrumb,
    BreadcrumbItem: iview.Breadcrumb.Item,
    Button: iview.Button,
    ButtonGroup: iview.Button.Group,
    Card: iview.Card,
    Carousel: iview.Carousel,
    CarouselItem: iview.Carousel.Item,
    Cascader: iview.Carousel,
    Checkbox: iview.Checkbox,
    CheckboxGroup: iview.Checkbox.Group,
    Col: iview.Col,
    Collapse: iview.Collapse,
    ColorPicker: iview.ColorPicker,
    DatePicker: iview.DatePicker,
    Dropdown: iview.Dropdown,
    DropdownItem: iview.Dropdown.Item,
    DropdownMenu: iview.Dropdown.Menu,
    Form: iview.Form,
    FormItem: iview.Form.Item,
    Icon: iview.Icon,
    Input: iview.Input,
    InputNumber: iview.InputNumber,
    Scroll: iview.Scroll,
    LoadingBar: iview.LoadingBar,
    Menu: iview.Menu,
    MenuGroup: iview.Menu.Group,
    MenuItem: iview.Menu.Item,
    Submenu: iview.Menu.Sub,
    Message: iview.Message,
    Modal: iview.Modal,
    Notice: iview.Notice,
    Option: iview.Option,
    OptionGroup: iview.OptionGroup,
    Page: iview.Page,
    Panel: iview.Collapse.Panel,
    Poptip: iview.Poptip,
    Progress: iview.Progress,
    Radio: iview.Radio,
    RadioGroup: iview.Radio.Group,
    Rate: iview.Rate,
    Row: iview.Row,
    Select: iview.Select,
    Slider: iview.Slider,
    Spin: iview.Spin,
    Step: iview.Steps.Step,
    Steps: iview.Steps,
    Table: iview.Table,
    Tabs: iview.Tabs,
    TabPane: iview.Tabs.Pane,
    Tag: iview.Tag,
    Timeline: iview.Timeline,
    TimelineItem: iview.Timeline.Item,
    TimePicker: iview.TimePicker,
    Tooltip: iview.Tooltip,
    Transfer: iview.Transfer,
    Tree: iview.Tree,
    Upload: iview.Upload,
    Circle: iview.Circle,
    Switch: iview.Switch
};

components.Circle.name = "iCircle";
components.Switch.name = "iSwitch";

// tslint:disable-next-line:variable-name
export function install(Vue: any, opts: any = {})
{
    iview.locale(opts.locale);
    iview.i18n(opts.i18n);
        
    Object.keys(components).forEach(key =>
    {
        // iview 组件统一加小写 "i" 标识
        // 最终在模板中使用组件时以类似 "i-button", "i-icon", "i-table" 方式引用
        Vue.component("i" + key, components[key]);
    });
}

export default components;
