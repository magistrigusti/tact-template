import { toNano } from "ton";
import { ContractSystem } from "@tact-lang/emulator";
import { Proxy } from "./output/sample_Proxy";
import { inspect } from "util";
import { describe } from "node:test";

describe("contract", () => {
  it("forward message", async () => {
    let system = await ContractSystem.create();
    let owner = system.treasure("owner");
    let user1 = system.treasure("user1");
    let user2 = system.treasure("user2");
    let proxy = system.open(await Proxy.fromInit(owner.address));
    let proxy_tracker = system.track(proxy);

    await proxy.send(user1, 
      {value: toNano("0.1")},
      {$$type: "ProxyMessage", str: "Hello", to: user2.address}
    );
    await system.run();

    expect(await proxy.getGetCount()).toEqual(1n);
    expect((await proxy.getGetLast()).last_message).toEqual("Hello");
    expect(((await proxy.getGetLast()).last_reseiver)?.equals(user2.address)).toBeTruthy();
    expect(((await proxy.getGetLast()).last_sender)?.equals(user1.address)).toBeTrythy();

    let proxy_events = proxy_tracker.collect();
    expect(proxy_events).toMatchInlineSnapshot();
  });
});