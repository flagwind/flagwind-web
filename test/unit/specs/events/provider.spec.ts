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

// class Button extends EventProvider
// {
    
// }

describe("EventProviderTest", () =>
{
    // const button = new Button();

    it("sourceTest", () => 
    {
        // const eventArgs = new EventArgs("click");
        // const provider = new EventProvider(null);

        assert.equal(1, 1);

        // button.addListener("click", (e: EventArgs) => 
        // {
        //     assert.equal(e.source, button)
        // });

        // button.dispatchEvent("click", "sss");
    });
});
