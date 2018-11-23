/*!
* iView
* Web: https://www.iviewui.com
* Github: https://github.com/iview/iview
* Author: Aresn
*/

import flagwind from "flagwind-core";
import Type = flagwind.Type;
import iView from "iview";

const iview: any = iView;
const conflicts = ["Button", "Circle", "Col", "Content", "Form", "Footer", "Header", "Input", "Menu", "Option", "Progress", "Select", "Switch", "Table", "Time"];
const components = {};

Object.keys(iview).forEach(key =>
{
    const component = iview[key];

    if(Type.isObject(component))
    {
        components[key] = component;
    }
});

// tslint:disable-next-line:variable-name
export function install(Vue: any, opts: any = {})
{
    iview.locale(opts.locale);
    iview.i18n(opts.i18n);

    Object.keys(components).forEach(key =>
    {
        const component = components[key];

        if(conflicts.indexOf(key) === -1)
        {
            // 先以原始名字注册一下组件
            Vue.component(key, component);
        }

        // iview 组件统一加小写 "i" 标识
        // 最终在模板中使用组件时以类似 "i-button", "i-icon", "i-table" 方式引用
        if(key[0] !== "i")
        {
            Vue.component("i" + key, component);
        }
    });
}

export * from "iview";

export default components;
