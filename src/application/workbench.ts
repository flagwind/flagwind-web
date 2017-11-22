/*!
 * @file This file is part of `application` module. 
 * 
 * Authors:
 *      @author jason <jasonsoop@gmail.com>
 * 
 * @license Licensed under the MIT License.
 * @copyright Copyright (C) 2010-2017 Flagwind Inc. All rights reserved. 
 */

import { ArgumentException, InvalidOperationException, CancelEventArgs, IWorkbench, WorkbenchStatus, IWorkspace, ApplicationContextBase } from "flagwind-core";
import { EventProvider } from "../events/event_provider";

/**
 * 提供工作台的基本封装，建议自定义工作台从此类继承。
 * @abstract
 * @class
 * @version 1.0.0
 */
export abstract class WorkbenchBase extends EventProvider implements IWorkbench
{
    private _status: any;                                           // 工作台状态
    private _title: string;                                         // 工作台标题
    private _workspace: IWorkspace;                                 // 工作空间实例
    private _applicationContext: ApplicationContextBase;            // 应用程序上下文实例
    
    /**
     * 当工作台正在打开时产生的事件。
     * @event EventArgs
     */
    public readonly OPENING: string = "opening";
    
    /**
     * 当工作台被打开后产生的事件。
     * @event EventArgs
     */
    public readonly OPENED: string = "opened";

    /**
     * 当工作台正在取消激活时产生的事件。
     * @event EventArgs
     */
    public readonly DEACTIVATING: string = "deactivating";

    /**
     * 当工作台取消激活后产生的事件。
     * @event EventArgs
     */
    public readonly DEACTIVATED: string = "deactivated";

    /**
     * 当工作台正在激活时产生的事件。
     * @event EventArgs
     */
    public readonly ACTIVATING: string = "activating";

    /**
     * 当工作台正在关闭时产生的事件。
     * @event CancelEventArgs
     */
    public readonly CLOSING: string = "closing";

    /**
     * 当工作台被关闭后产生的事件。
     * @event EventArgs
     */
    public readonly CLOSED: string = "closed";
    
    /**
     * 当工作台标题被更改后产生的事件。
     * @event EventArgs
     */
    public readonly TITLE_CHANGED: string = "title_changed";
    
    /**
     * 获取工作台的当前状态。
     * @property
     * @returns WorkbenchStatus
     */
    public get status(): WorkbenchStatus
    {
        return this._status;
    }
    
    /**
     * 获取或设置工作台的标题。
     * @property
     * @returns string
     */
    public get title(): string
    {
        return this._title;
    }

    public set title(value: string)
    {
        // 如果与之前的标题相等，则不处理
        if(this._title === value)
        {
            return;
        }

        this._title = value ? value : "";

        // 通知标题被更改
        this.onTitleChanged();
    }
    
    /**
     * 获取工作台的主工作空间实例。
     * @property
     * @returns IWorkspace
     */
    public get workspace(): IWorkspace
    {
        return this._workspace;
    }
    
    /**
     * 获取工作台所属的应用程序上下文实例。
     * @property
     * @returns ApplicationContextBase
     */
    public get applicationContext(): ApplicationContextBase
    {
        return this._applicationContext;
    }

    /**
     * 初始化工作台的新实例。 
     * @protected
     * @param  {ApplicationContextBase} applicationContext+
     */
    protected constructor(applicationContext: ApplicationContextBase)
    {
        super();

        if(!applicationContext)
        {
            throw new ArgumentException("applicationContext");
        }

        this._status = WorkbenchStatus.closed;
        this._title = applicationContext.title;
        this._applicationContext = applicationContext;
    }

    /**
     * 打开工作台。
     * @async
     * @param  {Array<string>} args
     * @returns void
     */
    public async open(args: Array<string>): Promise<void>
    {
        // 如果工作台已经启动过则不处理
        if(this._status !== WorkbenchStatus.closed)
        {
            return;
        }
        
        try
        {
            // 通知工作台正在打开中
            this.onOpening();
        }
        catch(ex)
        {
            // 注意：可能因为预打开事件处理程序或工作台构建过程出错，都必须重置工作台状态为"closed"
            this._status = WorkbenchStatus.closed;

            // 重抛异常，导致后续的关闭代码不能继续
            throw ex;
        }

        try
        {
            // 创建工作空间
            this._workspace = this.createWorkspace();
            
            // 调用虚拟方法以执行实际启动的操作
            await this.onOpen(args);
        }
        catch(ex)
        {
            // 注意：如果在实际启动操作中，子类可能已经通过 onOpened 方法设置了工作台状态为运行，则无需再重置工作台状态；
            // 否则必须重置工作台状态为"closed"
            if(this._status === WorkbenchStatus.opening)
            {
                this._status = WorkbenchStatus.closed;
            }

            // 重抛异常，导致后续的关闭代码不能继续，故而上面代码重置了工作台状态
            throw ex;
        }

        if(this._status === WorkbenchStatus.opening)
        {
            // 通知工作台打开完成
            this.onOpened();
        }
    }

    /**
     * 关闭工作台。
     * @async
     * @returns boolean
     */
    public async close(): Promise<boolean>
    {
        // 保存原来的状态
        let originalStatus = this._status;

        // 如果工作台正在关闭或已经关闭，则直接退出
        if(originalStatus === WorkbenchStatus.closing || originalStatus === WorkbenchStatus.closed)
        {
            return false;
        }
        
        if(originalStatus === WorkbenchStatus.opening)
        {
            throw new InvalidOperationException();
        }
        
        // 创建 "closing" 事件
        let args = new CancelEventArgs(this.CLOSING);

        try
        {
            this.onClosing(args);
        }
        catch(ex)
        {
            // 注意：由于事件处理程序出错，必须还原工作台状态
            this._status = originalStatus;

            // 重抛异常，导致后续的关闭代码不能继续，故而上面代码重置了工作台状态
            throw ex;
        }

        // 如果事件处理程序要取消后续的关闭操作，则重置工作台状态
        if(args.cancel === true)
        {
            // 还原工作台状态
            this._status = originalStatus;

            // 因为取消关闭，所以退出后续关闭操作
            return false;
        }

        try
        {
            // 调用虚拟方法以进行实际的关闭操作
            await this.onClose();
        }
        catch(ex)
        {
            // 注意：如果在实际关闭操作中，子类可能已经通过 onClosed 方法设置了工作台状态为关闭，则无需再重置工作台状态；
            // 否则必须还原工作台状态
            if(this._status === WorkbenchStatus.closing)
            {
                this._status = originalStatus;
            }
            
            // 重抛异常，导致后续的关闭代码不能继续，故而上面代码重置了工作台状态
            throw ex;
        }

        if(this._status !== WorkbenchStatus.closed)
        {
            // 通知工作台关闭完成
            this.onClosed();
        }

        // 返回成功
        return true;
    }

    /**
     * 取消激活工作台。
     * @returns void
     */
    public deactivate(): void
    {
        // 保存原来的状态
        let originalStatus = this._status;
        
        // 如果工作台不是在运行中，则直接退出
        if(originalStatus !== WorkbenchStatus.running)
        {
            return;
        }
        
        try
        {
            // 通知工作台正在失去焦点中
            this.onDeactivateing();
        }
        catch(ex)
        {
            // 还原状态
            this._status = originalStatus;

            // 重抛异常，导致后续的代码不能继续
            throw ex;
        }
        
        try
        {
            // 调用虚拟方法以执行实际失去焦点操作
            this.onDeactivate();
        }
        catch(ex)
        {
            // 注意：如果在实际取消激活操作中，子类可能已经通过 onDeactivated 方法设置了工作台状态为已经取消激活，则无需再重置工作台状态；
            // 否则必须重置工作台状态为原来的状态
            if(this._status === WorkbenchStatus.deactivating)
            {
                // 还原状态
                this._status = originalStatus;
            }

            // 重抛异常，导致后续的关闭代码不能继续，故而上面代码重置了工作台状态
            throw ex;
        }
        
        if(this._status !== WorkbenchStatus.deactivated)
        {
            // 通知工作台取消激活完成
            this.onDeactivated();
        }
    }
    
    /**
     * 激活工作台。
     * @returns void
     */
    public activate(): void
    {
        // 保存原来的状态
        let originalStatus = this._status;

        // 如果工作台不是在取消激活中，则直接退出
        if(originalStatus !== WorkbenchStatus.deactivated)
        {
            return;
        }
        
        try
        {
            // 通知工作台正在获得焦点中
            this.onActivating();
        }
        catch(ex)
        {
            // 还原状态
            this._status = originalStatus;

            // 重抛异常，导致后续的代码不能继续
            throw ex;
        }
        
        try
        {
            // 调用虚拟方法以执行实际获得焦点操作
            this.onActivate();
        }
        catch(ex)
        {
            // 注意：如果在实际取消激活操作中，子类可能已经通过 onActivated 方法设置了工作台状态为正在运行，则无需再重置工作台状态；
            // 否则必须重置工作台状态为原来的状态
            if(this._status === WorkbenchStatus.activating)
            {
                // 还原状态
                this._status = originalStatus;
            }

            // 重抛异常，导致后续的关闭代码不能继续，故而上面代码重置了工作台状态
            throw ex;
        }
        
        if(this._status === WorkbenchStatus.activating)
        {
            // 通知工作台取消激活完成
            this.onActivated();
        }
    }

    /**
     * 当准备打开工作台时调用。
     * @protected
     * @virtual
     * @returns void
     */
    protected onOpening(): void
    {
        // 更改工作台状态为"opening"
        this._status = WorkbenchStatus.opening;

        // 激发工作台"opening"事件
        this.dispatchEvent(this.OPENING);
    }
    
    /**
     * 当工作台打开时调用。
     * @async
     * @protected
     * @virtual
     * @param  {Array<string>} args
     * @returns void
     */
    protected async onOpen(args: Array<string>): Promise<void>
    {
        // virtual
    }
    
    /**
     * 当工作台打开完成时调用。
     * @protected
     * @virtual
     * @returns void
     */
    protected onOpened(): void
    {
        // 更改工作台状态为"running"
        this._status = WorkbenchStatus.running;

        // 激发工作台"opened"事件
        this.dispatchEvent(this.OPENED);
    }
    
    /**
     * 当准备关闭工作台时调用。
     * @protected
     * @virtual
     * @param  {CancelEventArgs} event
     */
    protected onClosing(event: CancelEventArgs): void
    {
        // 设置工作台的状态为"closing"
        this._status = WorkbenchStatus.closing;
        
        // 激发工作台"closing"事件
        this.dispatchEvent(event);
    }
    
    /**
     * 当工作台关闭时调用。
     * @async
     * @protected
     * @virtual
     * @returns void
     */
    protected async onClose(): Promise<void>
    {
        // virtual
    }

    /**
     * 当工作台关闭完成时调用。
     * @protected
     * @virtual
     * @returns void
     */
    protected onClosed(): void
    {
        // 更改工作台状态为"closed"
        this._status = WorkbenchStatus.closed;

        // 激发工作台"closed"事件
        this.dispatchEvent(this.CLOSED);
    }
    
    /**
     * 当工作台准备失去焦点时调用。
     * @protected
     * @virtual
     * @returns void
     */
    protected onDeactivateing(): void
    {
        // 设置工作台的状态为"deactivating"
        this._status = WorkbenchStatus.deactivating;

        // 激发工作台"deactivating"事件
        this.dispatchEvent(this.DEACTIVATING);
    }
    
    /**
     * 当工作台失去焦点时调用。
     * @protected
     * @virtual
     * @returns void
     */
    protected onDeactivate(): void
    {
        // virtual
    }
    
    /**
     * 当工作台失去焦点后调用。
     * @protected
     * @virtual
     * @returns void
     */
    protected onDeactivated(): void
    {
        // 设置工作台的状态为"deactivated"
        this._status = WorkbenchStatus.deactivated;

        // 激发工作台"deactivated"事件
        this.dispatchEvent(this.DEACTIVATED);
    }

    /**
     * 当工作台准备获得焦时调用。
     * @protected
     * @virtual
     * @returns void
     */
    protected onActivating(): void
    {
        // 设置工作台的状态为"activating"
        this._status = WorkbenchStatus.activating;

        // 激发工作台"activating"事件
        this.dispatchEvent(this.ACTIVATING);
    }

    /**
     * 当工作台获得焦时调用。
     * @protected
     * @virtual
     * @returns void
     */
    protected onActivate(): void
    {
        // virtual
    }

    /**
     * 当工作台获得焦后调用。
     * @protected
     * @virtual
     * @returns void
     */
    protected onActivated(): void
    {
        // 设置工作台的状态为"running"
        this._status = WorkbenchStatus.running;
    }

    /**
     * 当工作台标题更改后调用。
     * @protected
     * @virtual
     * @returns void
     */
    protected onTitleChanged(): void
    {
        // 激发工作台"titleChanged"事件
        this.dispatchEvent(this.TITLE_CHANGED);
    }

    /**
     * 创建一个工作空间对象。
     * @abstract
     * @returns IWorkspace
     */
    protected abstract createWorkspace(): IWorkspace;
}
