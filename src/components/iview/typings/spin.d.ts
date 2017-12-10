// Type definitions for iview 2.5.1
// Project: https://github.com/iview/iview
// Definitions by: yangdan
// Definitions: https://github.com/yangdan8/iview.git
import Vue from "vue";

export default SpinInstance;

export interface Spin extends Vue {
  /**
   * Spin尺寸，可选值为large和small或者不设置
   */
  size: 'large' | 'small';
  /**
   * 是否固定，需要父级有relative或absolute
   * @default false
   */
  fix: boolean;
  /**
   * slot插槽对象
   */
  $slot: {
    /**
     * 自定义 Spin 的内容，设置slot后，默认的样式不生效
     */
    '': Vue
  };
}

export interface SpinConfig {
  /**
   * Spin尺寸，可选值为large和small或者不设置
   */
  size?: 'large' | 'small';
  /**
   * 是否固定，需要父级有relative或absolute
   * @default false
   */
  fix?: boolean;
}

export interface SpinInstance {
  /**
   * 显示。
   * @param options 配置对象
   */
  show(options: SpinConfig): void;
  /**
   * 隐藏
   */
  hide(): void;
}