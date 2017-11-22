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

class Button extends EventProvider
{
    
}

describe("EventProviderTest", () =>
{
    const button = new Button();
    const provider = new EventProvider();
    const provider1 = new EventProvider();

    /**
     * 测试事件源。
     */
    it("sourceTest", () =>
    {
        const task1 = new Promise((resolve) =>
        {
            button.addListener("something", (e: EventArgs) =>
            {
                assert.equal(e.source, button);

                resolve();
            });

            button.dispatchEvent("something", "from button");
        });

        const task2 = new Promise((resolve) => 
        {
            provider.addListener("something", (e: EventArgs) =>
            {
                assert.equal(e.source, provider);

                resolve();
            });

            provider.dispatchEvent("something", "from provider");
        });

        return Promise.all([task1, task2]);
    });

    /**
     * 测试单次监听事件。
     */
    it("onceTest", () => 
    {
        const listener = (e: EventArgs) => 
        {

        };

        provider1.addListener("something", listener, null, true);

        assert.isTrue(provider1.hasListener("something"));

        provider1.dispatchEvent(new EventArgs("something", "data"));

        assert.isFalse(provider1.hasListener("something"));
    })
});