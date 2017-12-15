/*!
* iView
* Web: https://www.iviewui.com
* Github: https://github.com/iview/iview
* Author: Aresn
*/

import NumberScroll from "./number-scroll/number-scroll";

const components =
{
    NumberScroll: NumberScroll as any
};

// tslint:disable-next-line:variable-name
export function install(Vue: any, opts: any = {})
{
    Object.keys(components).forEach(key =>
    {
        // flagwind 组件统一加小写 "f" 标识
        // 最终在模板中使用组件时以类似 "f-button", "f-icon", "f-table" 方式引用
        let name = "f" + key;
        let component = components[key];
        
        Vue.component(name, component);
    });
}

export default components;
