// Type definitions for iview 2.5.1
// Project: https://github.com/iview/iview
// Definitions by: yangdan
// Definitions: https://github.com/yangdan8/iview.git
import Vue from "vue";

export default Affix;

export interface Affix extends Vue {
  /**
   * 距离窗口顶部达到指定偏移量后触发
   * @default 0
   */
  'offset-top': number;
  /**
   * 距离窗口底部达到指定偏移量后触发
   */
  'offset-bottom': number;
  /**
   * 在固定状态发生改变时触发
   * @param value true | false
   */
  $emit(eventName: 'on-change', value: boolean): this;
}