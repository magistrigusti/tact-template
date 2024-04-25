import "@stdlib/ownable";

contract Proxy with Ownable {
  owner: Address;
  count: Int = 0;
  last_message: String? = null;
  last_sender: Address? = null;
  last_receiver: Address? = null;

  init (owner: Address) {
    self.owner = owner;
  }

  receive(str: String) {
    send(SendParametrs{
      to: self.owner,
      value: 0,
      mode: SendRemainingValue,
      body: str.asComment()
    });
    let ctx: Context = context();
    storeStats(ctx.sender, self.owner, str);
  }

  fun storeStats (sender: Address, receiver: Address, message: String) {
    self.count = self.coount + 1;
    self.last_sender = sender;
    self.last_receiver = receiver;
    self.last_message = message;
  }
}