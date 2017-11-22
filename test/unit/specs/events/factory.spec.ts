/*!
 * @file This file is part of `events` module. 
 * 
 * Authors:
 *      @author jason <jasonsoop@gmail.com>
 * 
 * @license Licensed under the MIT License.
 * @copyright Copyright (C) 2010-2017 Flagwind Inc. All rights reserved. 
 */

import { assert } from "chai";
import { EventArgs } from "flagwind-core";
import { EventProvider } from "../../../../src/events/event_provider";
import { EventProviderFactory } from "../../../../src/events/event_provider_factory";

class Button
{

}

class CheckBox
{
    
}

describe("EventProviderFactoryTest", () =>
{
    const button = new Button();
    const checkBox = new CheckBox();
    
    /**
     * 测试获取事件提供程序。
     */
    it("getProviderTest", () =>
    {
        const factory = EventProviderFactory.instance;
        
        const provider1 = factory.getProvider(button);
        const provider2 = factory.getProvider(checkBox);
        
        assert.isNotNull(provider1);
        assert.isNotNull(provider2);

        provider1.addListener("something", (e: EventArgs) => {});

        assert.isTrue(provider1.hasListener("something"));
    });
});