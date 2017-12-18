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
import ArgumentException = flagwind.ArgumentException;
import InvalidOperationException = flagwind.InvalidOperationException;
import { Component } from "src/common";
import { component, config, watch } from "src/decorators";

// const PREFIX_CLS = "fw-number-counter";
const FRAMERATE = 30;
const COUNT_FRAMERATE = 20;
const FRAMES_PER_VALUE = 2;
const DIGIT_SPEEDBOOST = 0.5;
const MS_PER_FRAME = 1000 / FRAMERATE;
const COUNT_MS_PER_FRAME = 1000 / COUNT_FRAMERATE;
const FORMAT_PARSER = /^\(?([^)]*)\)?(?:(.)(d+))?$/;
const TRANSITION_END_EVENTS = "transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd";

const DIGIT_HTML = `
<span class="fw-number-counter-digit">
    <span class="fw-number-counter-digit-spacer">8</span>
    <span class="fw-number-counter-digit-inner">
        <span class="fw-number-counter-ribbon">
            <span class="fw-number-counter-ribbon-inner">
                <span class="fw-number-counter-value"></span>
            </span>
        </span>
    </span>
</span>
`;

const MARK_HTML = `
<span class="fw-number-counter-format-mark"></span>
`;

const now = function(): number
{
    let performance = window.performance;

    if(performance && performance.now)
    {
        return performance.now();
    }
    else
    {
        return +(new Date());
    }
};

const round = function(value: number, precision: number = 0): number
{
    if(!precision)
    {
        return Math.round(value);
    }

    value *= Math.pow(10, precision);
    value += 0.5;
    value = Math.floor(value);

    return value /= Math.pow(10, precision);
};

const truncate = function(value: number): number
{
    if(value < 0)
    {
        return Math.ceil(value);
    }
    else
    {
        return Math.floor(value);
    }
};

const fractionalPart = function(value: number): number
{
    return value - round(value);
};

const createElement = function(html: string): HTMLElement
{
    let element = document.createElement("div");

    element.innerHTML = html;
    
    return element.children[0] as HTMLElement;
};

const removeClass = function(element: HTMLElement, name: string): void
{
    let className = element.className;

    className = className.replace(new RegExp("(^| )" + (name.split(" ").join("|")) + "( |$)", "gi"), " ").trim();

    element.className = className;
};

const addClass = function(element: HTMLElement, name: string): void
{
    removeClass(element, name);

    element.className += ` ${name}`;
};

/**
 * 表示一个带过渡特效的数字组件。
 * @class
 * @version 1.0.0
 */
@component({template: require("./number-counter.html")})
export default class NumberCounter extends Component
{
    private _format: any;                                       // 格式化字符串解析后的匿名对象
    private _value: number;                                     // 用于界面渲染的数值
    private _ribbons: Array<any>;
    private _maxValues: number;
    private _digits: Array<HTMLElement>;
    private _transitionEndBound: boolean = false;
    
    /**
     * 渲染容器。
     * @private
     * @property
     * @returns HTMLElement
     */
    private get $inside(): HTMLElement
    {
        return this.$refs.inside as HTMLHtmlElement;
    }

    /**
     * 获取或设置数值。
     * @public
     * @config
     * @default 0
     * @returns number
     */
    @config({default: 0})
    public value: number;
    
    /**
     * 获取或设置用于格式化数值的字符串表达式。
     * @public
     * @config
     * @default "(d).dd"
     * @example (,ddd)    -  12,345,678
     * @example (,ddd).dd -  12,345,678.09
     * @example (.ddd),dd -  12.345.678,09
     * @example ( ddd),dd -  12 345 678,09
     * @example d         -  12345678
     * @returns string
     */
    @config({default: "(d).dd"})
    public format: string;
    
    /**
     * 获取或设置用于格式化数值的自定义函数。
     * @public
     * @config
     * @returns Function
     */
    @config()
    public formatFunction: (value: number) => string;
    
    /**
     * 获取或设置动画持续时间。
     * @public
     * @config
     * @default 2000
     * @returns number
     */
    @config({default: 2000})
    public duration: number;

    /**
     * 获取或设置动画类型。
     * @description 取值范围 "slide" 或 "count"
     * @public
     * @config
     * @default "slide"
     * @returns string
     */
    @config({default: "slide"})
    public animation: string;
    
    /**
     * 当数值改变时调用。
     * @param  {number} value
     */
    @watch("value")
    protected onValueChange(value: number)
    {
        this.update(value);
    }

    /**
     * 创建组件时调用的钩子方法。
     * @protected
     * @returns void
     */
    protected mounted(): void
    {
        this._maxValues = ((this.duration / MS_PER_FRAME) / FRAMES_PER_VALUE) | 0;
        
        // 重置格式化字符串
        this.resetFormat();

        // 清洗需要绘制的数值
        this._value = this.cleanValue(this.value);
        
        // 绘制组件
        this.draw();
    }
    
    /**
     * 绘制组件。
     * @param  {number} value 需要绘制的数值。
     * @returns void
     */
    private draw(value: number = this._value): void
    {
        // 重置格式化字符串
        this.resetFormat();
        
        // 清空容器的内容
        this.$inside.innerHTML = "";

        removeClass(this.$el, "fw-number-counter-animating-up fw-number-counter-animating-down fw-number-counter-animating");

        this._ribbons = [];

        this.formatDigits(value);
    }
    
    /**
     * 更新数值。
     * @param  {number} newValue 需要更新的数值。
     * @returns void
     */
    private update(newValue: number): void
    {
        newValue = this.cleanValue(newValue);

        let diff = newValue - this._value;

        if(diff === 0)
        {
            return;
        }

        // fw-number-counter
        removeClass(this.$el, "fw-number-counter-animating-up fw-number-counter-animating-down fw-number-counter-animating");
        
        if(diff > 0)
        {
            addClass(this.$el, "fw-number-counter-animating-up");
        }
        else
        {
            addClass(this.$el, "fw-number-counter-animating-down");
        }

        this.animate(newValue);

        setTimeout(() =>
        {
            // tslint:disable-next-line:no-unused-expression
            this.$el.offsetHeight;

            addClass(this.$el, "fw-number-counter-animating");
        }, 0);

        this._value = newValue;
    }
    
    /**
     * 播放数值动画。
     * @param  {number} newValue 需要播放动画的数值。
     * @returns void
     */
    private animate(newValue: number): void
    {
        if(this.animation === "count")
        {
            this.animateCount(newValue);
        }
        else
        {
            this.animateSlide(newValue);
        }
    }
    
    /**
     * 播放 "count" 效果动画。
     * @param  {number} newValue 新的数值。
     * @returns void
     */
    private animateCount(newValue: number): void
    {
        let diff = +newValue - this._value;

        if(!diff)
        {
            return;
        }

        let start = now();
        let last = start;
        let tick: (time: number) => void;
        let current = this._value;
        
        (tick = (time: number) =>
        {
            if((now() - start) > this.duration)
            {
                this._value = newValue;
                
                this.draw();

                this.onComplete();

                return;
            }

            let delta = now() - last;

            if(delta > COUNT_MS_PER_FRAME)
            {
                last = now();

                let fraction = delta / this.duration;
                let dist = diff * fraction;

                current += dist;

                this.draw(Math.round(current));
            }

            if(requestAnimationFrame)
            {
                requestAnimationFrame(tick);
            }
            else
            {
                setTimeout(tick, COUNT_MS_PER_FRAME);
            }
        })(0);
    }

    /**
     * 播放 "slide" 效果动画。
     * @param  {number} newValue 新的数值。
     * @returns void
     */
    private animateSlide(newValue: number): void
    {
        let oldValue = this._value;
        let fractionalCount = this.getFractionalDigitCount(oldValue, newValue);

        if(fractionalCount)
        {
            newValue = newValue * Math.pow(10, fractionalCount);
            oldValue = oldValue * Math.pow(10, fractionalCount);
        }

        let diff = newValue - oldValue;
        
        if(diff === 0)
        {
            return;
        }

        this.bindTransitionEnd();

        let digitCount = this.getDigitCount(oldValue, newValue);
        let digits = [];
        let start: number;
        let frames: Array<number>;
        let boosted: number = 0;

        for(let i = 0; i < digitCount; ++i)
        {
            start = truncate(oldValue / Math.pow(10, digitCount - i - 1));
            let end = truncate(newValue / Math.pow(10, digitCount - i - 1));
            let dist = end - start;

            if(Math.abs(dist) > this._maxValues)
            {
                frames = [];

                let increment = dist / (this._maxValues + this._maxValues * boosted * DIGIT_SPEEDBOOST);
                let current = start;
                
                while((dist > 0 && current < end) || (dist < 0 && current > end))
                {
                    frames.push(Math.round(current));

                    current += increment;
                }

                if(frames[frames.length - 1] !== end)
                {
                    frames.push(end);
                }

                boosted++;
            }
            else
            {
                frames = [];

                for(let j = start; start <= end ? j <= end : j >= end; start <= end ? j++ : j--)
                {
                    frames.push(j);
                }
            }

            frames.forEach((value, j) =>
            {
                frames[j] = Math.abs(value % 10);
            });

            digits.push(frames);
        }

        this.resetDigits();

        digits.reverse().forEach((frames, i) =>
        {
            if(!this._digits[i])
            {
                this.addDigit(" ", i >= fractionalCount);
            }

            if(!this._ribbons[i])
            {
                this._ribbons[i] = this._digits[i].querySelector(".fw-number-counter-ribbon-inner");
            }

            this._ribbons[i].innerHTML = "";

            if(diff < 0)
            {
                frames = frames.reverse();
            }

            frames.forEach((frame, j) =>
            {
                const $num = document.createElement("div");

                $num.className = "fw-number-counter-value";
                $num.innerHTML = frame.toString();

                this._ribbons[i].appendChild($num);

                if(j === frames.length - 1)
                {
                    addClass($num, "fw-number-counter-last-value");
                }

                if(j === 0)
                {
                    addClass($num, "fw-number-counter-first-value");
                }
            });
        });

        if(start < 0)
        {
            this.addDigit("-");
        }

        let $mark = this.$inside.querySelector("fw-number-counter-radix-mark");

        if($mark)
        {
            $mark.parentElement.removeChild($mark);
        }

        if(fractionalCount)
        {
            this.addSpacer(this._format.radix, this._digits[fractionalCount - 1], "fw-number-counter-radix-mark");
        }
    }
    
    /**
     * 绑定 "transitionend" 事件。
     * @returns void
     */
    private bindTransitionEnd(): void
    {
        if(this._transitionEndBound)
        {
            return;
        }

        this._transitionEndBound = true;

        let renderEnqueued = false;

        for(let eventName of TRANSITION_END_EVENTS.split(" "))
        {
            this.$el.addEventListener(eventName, () =>
            {
                if(renderEnqueued)
                {
                    return true;
                }

                renderEnqueued = true;

                setTimeout(() =>
                {
                    this.draw();

                    renderEnqueued = false;
                    
                    this.onComplete();

                }, 0);

                return true;
            });
        }
    }
    
    /**
     * 获取字符总数。
     * @param  {Array<number>} ...values
     * @returns number
     */
    private getDigitCount(...values: Array<number>): number
    {
        values.forEach((value, index) =>
        {
            values[index] = Math.abs(value);
        });

        let max = Math.max(...values);
        
        return Math.ceil(Math.log(max + 1) / Math.log(10));
    }
    
    /**
     * 获取小数总数。
     * @param  {Array<number>} ...values
     * @returns number
     */
    private getFractionalDigitCount(...values: Array<number>): number
    {
        let parser = /^\-?\d*\.(\d*?)0*$/;

        values.forEach((value, index) =>
        {
            let buffer = value.toString();
            let parts = parser.exec(buffer);

            if(parts === null)
            {
                values[index] = 0;
            }
            else
            {
                values[index] = parts[1].length;
            }
        });
        
        return Math.max(...values);
    }
    
    /**
     * 根据字符格式化表达式或函数格式化数值。
     * @param  {number} value
     * @returns void
     */
    private formatDigits(value: number): void
    {
        this._digits = [];
        
        if(Type.isFunction(this.formatFunction))
        {
            let valueString: string = this.formatFunction(value);

            for(let valueDigit of valueString.split("").reverse())
            {
                if(valueDigit.match(/0-9/))
                {
                    let $digit = this.drawDigit();
                    
                    $digit.querySelector(".fw-number-counter-value").innerHTML = valueDigit;

                    this._digits.push($digit);

                    this.insertDigit($digit);
                }
                else
                {
                    this.addSpacer(valueDigit);
                }
            }
        }
        else
        {
            let wholePart = !this._format.precision || !fractionalPart(value) || false;

            for(let digit of value.toString().split("").reverse())
            {
                if(digit === ".")
                {
                    wholePart = true;
                }

                this.addDigit(digit, wholePart);
            }
        }
    }
    
    /**
     * 插入一个字符至  DOM 节点中。
     * @param  {HTMLElement} digit
     * @param  {HTMLElement} before?
     * @returns void
     */
    private insertDigit(digit: HTMLElement, before?: HTMLElement): void
    {
        let $inside = this.$inside;
        let $children = $inside.children;

        if(before)
        {
            $inside.insertBefore(digit, before);
        }
        else if(!$children.length)
        {
            this.$inside.appendChild(digit);
        }
        else
        {
            $inside.insertBefore(digit, $children[0]);
        }
    }
    
    /**
     * 添加一个分割字符。
     * @param  {string} chr
     * @param  {HTMLElement} before?
     * @param  {string} extraClasses?
     * @returns void
     */
    private addSpacer(chr: string, before?: HTMLElement, extraClasses?: string): void
    {
        let $spacer = createElement(MARK_HTML);
        $spacer.innerHTML = chr;

        if(extraClasses)
        {
            addClass($spacer, extraClasses);
        }

        this.insertDigit($spacer, before);
    }
    
    /**
     * 添加一个字符。
     * @param  {string} value
     * @param  {boolean=true} repeating
     * @returns void
     */
    private addDigit(value: string, repeating: boolean = true): void
    {
        if(value === "-")
        {
            this.addSpacer(value, null, "fw-number-counter-negation-mark");

            return;
        }

        if(value === ".")
        {
            this.addSpacer((this._format.radix || "."), null, "fw-number-counter-radix-mark");

            return;
        }
        
        if(repeating)
        {
            let resetted = false;
            
            while(true)
            {
                if(!this._format.repeating.length)
                {
                    if(resetted)
                    {
                        throw new InvalidOperationException("Bad format without digits");
                    }

                    this.resetFormat();
                    
                    resetted = true;
                }

                let chr = this._format.repeating[this._format.repeating.length - 1];

                this._format.repeating = this._format.repeating.substring(0, this._format.repeating.length - 1);

                if(chr === "d")
                {
                    break;
                }

                this.addSpacer(chr);
            }
        }

        // 生成单个字符节点
        let $digit = this.drawDigit();
        
        // 设置字符节点的值
        $digit.querySelector(".fw-number-counter-value").innerHTML = value;

        // 加入字符列表中
        this._digits.push($digit);

        // 将字符节点插入组件中
        this.insertDigit($digit);
    }
    
    /**
     * 绘制一个需要显示的字符节点。
     * @private
     * @returns HTMLElement
     */
    private drawDigit(): HTMLElement
    {
        return createElement(DIGIT_HTML);
    }
    
    /**
     * 重置字符。
     * @returns void
     */
    private resetDigits(): void
    {
        this._digits = [];
        this._ribbons = [];
        this.$inside.innerHTML = "";
        this.resetFormat();
    }
    
    /**
     * 重置格式化字符串为一个匿名对象。
     * @private
     * @returns void
     */
    private resetFormat(): void
    {
        let parsed = FORMAT_PARSER.exec(this.format);

        if(!parsed)
        {
            throw new ArgumentException("Unparsable digit format.");
        }

        let [repeating, radix, fractional] = parsed.splice(1, 4);
        let precision = fractional ? fractional.length : 0;

        this._format =
        {
            repeating,          // 重复值
            radix,              // 基数符
            precision           // 精度
        };
    }

    /**
     * 清洗需要渲染的数值。
     * @description 如果参数 value 含有小数点，则会根据格式化字符串的小数位进行四舍五入处理。
     * @returns number
     */
    private cleanValue(value: number): number
    {
        return round(value, this._format.precision);
    }
    
    /**
     * 当动画播放完毕时调用。
     * @returns void
     */
    private onComplete(): void
    {
        this.$emit("on-complete", this._value);
    }
}
