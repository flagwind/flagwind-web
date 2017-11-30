/*!
 * This file is part of `components` module. 
 * 
 * Authors:
 *      jason <jasonsoop@gmail.com>
 * 
 * Licensed under the MIT License.
 * Copyright (C) 2010-2017 Flagwind Inc. All rights reserved. 
 */

import Vue from "vue";
import { Route, RawLocation } from "vue-router";
import { IView, ViewStatus, CancelEventArgs, InvalidOperationException } from "flagwind-core";
import { Component } from "./component";

/**
 * 表示视图组件的基类。
 * @class
 * @version 1.0.0
 */
export class View extends Component implements IView
{
    private _status: any;                               // 视图当前状态
    
    /**
     * 当正在进入视图时产生的事件。
     * @event EventArgs
     */
    public readonly ENTERING: string = "entering";
    
    /**
     * 当进入视图后产生的事件。
     * @event EventArgs
     */
    public readonly ENTERED: string = "entered";
    
    /**
     * 当正在离开视图时产生的事件。
     * @event CancelEventArgs
     */
    public readonly LEAVING: string = "leaving";

    /**
     * 当离开视图后产生的事件。
     * @event EventArgs
     */
    public readonly LEAVED: string = "leaved";

    /**
     * 获取试图的状态。
     * @property
     */
    public get status(): ViewStatus
    {
        return this._status;
    }
    
    /**
     * 获取当前请求的路由信息。
     * @property
     * @returns Route
     */
    public get route(): Route
    {
        return this.$route;
    }

    /**
     * 进入视图。
     * @async
     * @param  {Array<any>} ...args 可选参数。
     * @returns void
     */
    public async enter(to: Route, from: Route, next: (to?: RawLocation | false | ((vm: Vue) => any) | void) => void): Promise<void>
    {
        console.log("aaaaa");

        next((vm: Vue) =>
        {
            console.log("lalalalala");

            // 如果视图已经进入则不处理
            if(this._status !== ViewStatus.none)
            {
                return;
            }

            try
            {
                // 通知视图正在进入中
                this.onEntering(to, from);
            }
            catch(ex)
            {
                // 注意：可能因为预进入事件处理程序或视图构建过程出错，都必须重置视图状态为"none"
                this._status = ViewStatus.none;

                // 重抛异常，导致后续的关闭代码不能继续
                throw ex;
            }

            try
            {
                // 调用虚拟方法以执行实际进入操作
                // await this.onEnter(to, from);
            }
            catch(ex)
            {
                // 注意：如果在实际进入操作中，子类可能已经通过 onEntered 方法设置了视图状态为运行，则无需再重置视图状态；
                // 否则必须重置视图状态为"none"
                if(this._status === ViewStatus.entering)
                {
                    this._status = ViewStatus.none;
                }

                // 重抛异常，导致后续的关闭代码不能继续，故而上面代码重置了视图状态
                throw ex;
            }

            if(this._status === ViewStatus.entering)
            {
                // 通知视图进入完成
                this.onEntered(to, from);
            }
        });
    }
    
    /**
     * 离开视图。
     * @async
     * @param  {Array<any>} ...args 可选参数。
     * @returns void
     */
    public async leave(to: Route, from: Route, next: (to?: RawLocation | false | ((vm: Vue) => any) | void) => void): Promise<void>
    {
        // 保存原来的状态
        let originalStatus = this._status;
                
        // 如果视图正在离开或已经离开，则直接退出
        if(originalStatus === ViewStatus.leaving || originalStatus === ViewStatus.none)
        {
            return;
        }
        
        if(originalStatus === ViewStatus.entering)
        {
            throw new InvalidOperationException();
        }
        
        // 创建 "leaving" 事件
        let eventArgs = new CancelEventArgs(this.LEAVING);

        try
        {
            this.onLeaving(eventArgs, to, from);
        }
        catch(ex)
        {
            // 注意：由于事件处理程序出错，必须还原视图状态
            this._status = originalStatus;

            // 重抛异常，导致后续的关闭代码不能继续，故而上面代码重置了视图状态
            throw ex;
        }

        // 如果事件处理程序要取消后续的关闭操作，则重置视图状态
        if(eventArgs.cancel === true)
        {
            // 还原视图状态
            this._status = originalStatus;

            // 因为取消关闭，所以退出后续关闭操作
            next(false);

            return;
        }

        try
        {
            // 调用虚拟方法以进行实际的离开操作
            await this.onLeave(to, from);
        }
        catch(ex)
        {
            // 注意：如果在实际离开操作中，子类可能已经通过 onLeaved 方法设置了视图状态为离开，则无需再重置视图状态；
            // 否则必须还原视图状态
            if(this._status === ViewStatus.leaving)
            {
                this._status = originalStatus;
            }
            
            // 重抛异常，导致后续的关闭代码不能继续，故而上面代码重置了视图状态
            throw ex;
        }
        
        if(this._status !== ViewStatus.none)
        {
            // 通知视图离开完成
            this.onLeaved(to, from);
        }

        // 进行 vue-router 管道中的下一个钩子。
        next();
    }
        
    /**
     * 当准备进入视图时调用。
     * @protected
     * @virtual
     * @param  {Array<any>} ...args 可选参数。
     * @returns void
     */
    protected onEntering(to: Route, from: Route): void
    {
        // 更改视图状态为"entering"
        this._status = ViewStatus.entering;

        // 激发视图"entering"事件
        this.dispatchEvent(this.ENTERING, { to, from });
    }

    /**
     * 当进入视图时调用。
     * @async
     * @protected
     * @virtual
     * @param  {Array<any>} ...args 可选参数。
     * @returns Promise
     */
    protected async onEnter(to: Route, from: Route): Promise<void>
    {
        // virtual
    }
    
    /**
     * 当进入视图后调用。
     * @protected
     * @virtual
     * @param  {Array<any>} ...args 可选参数。
     * @returns void
     */
    protected onEntered(to: Route, from: Route): void
    {
        // 更改视图状态为"running"
        this._status = ViewStatus.running;

        // 激发视图"entered"事件
        this.dispatchEvent(this.ENTERED, { to, from });
    }

    /**
     * 当准备离开视图时调用。
     * @protected
     * @virtual
     * @param  {Route} to 即将要进入的目标路由。
     * @param  {Route} from 当前导航离开时的路由。
     * @param  {Array<any>} ...args 可选参数。
     */
    protected onLeaving(event: CancelEventArgs, to: Route, from: Route): void
    {
        // 设置视图的状态为"leaving"
        this._status = ViewStatus.leaving;

        // 激发视图"leaving"事件
        this.dispatchEvent(this.LEAVING, { to, from });
    }
    
    /**
     * 当离开视图时调用。
     * @async
     * @protected
     * @virtual
     * @param  {Route} to 即将要进入的目标路由。
     * @param  {Route} from 当前导航离开时的路由。
     * @returns void
     */
    protected async onLeave(to: Route, from: Route): Promise<void>
    {
        // virtual
    }

    /**
     * 当离开视图后调用。
     * @protected
     * @virtual
     * @param  {Route} to 即将要进入的目标路由。
     * @param  {Route} from 当前导航离开时的路由。
     * @returns void
     */
    protected onLeaved(to: Route, from: Route): void
    {
        // 更改视图状态为"none"
        this._status = ViewStatus.none;

        // 激发视图"leaved"事件
        this.dispatchEvent(this.LEAVED, { to, from});
    }

    /**
     * 当视图匹配到路由，并准备进入路由时调用。
     * @protected
     * @virtual
     * @param  {Route} to 即将要进入的目标路由。
     * @param  {Route} from 当前导航离开时的路由。
     * @param  {Function} next 一定要调用该方法来 resolve 这个钩子。执行效果依赖 next 方法的调用参数。
     */
    protected beforeRouteEnter(to: Route, from: Route, next: (to?: RawLocation | false | ((vm: Vue) => any) | void) => void): void
    {
        console.log("112233445666");

        this.enter(to, from, next);
    }
    
    /**
     * 在当前路由改变，但是该视图被复用时调用。
     * @protected
     * @virtual
     * @param  {Route} to 即将要进入的目标路由。
     * @param  {Route} from 当前导航离开时的路由。
     * @param  {Function} next 一定要调用该方法来 resolve 这个钩子。执行效果依赖 next 方法的调用参数。
     */
    protected beforeRouteUpdate(to: Route, from: Route, next: (to?: RawLocation | false | ((vm: Vue) => any) | void) => void): void
    {
        this.enter(to, from, next);
    }

    /**
     * 当导航离开该视图的对应路由时调用。
     * @protected
     * @virtual
     * @param  {Route} to 即将要进入的目标路由。
     * @param  {Route} from 当前导航离开时的路由。
     * @param  {Function} next 一定要调用该方法来 resolve 这个钩子。执行效果依赖 next 方法的调用参数。
     */
    protected beforeRouteLeave(to: Route, from: Route, next: (to?: RawLocation | false | ((vm: Vue) => any) | void) => void): void
    {
        this.leave(to, from, next);
    }
}
