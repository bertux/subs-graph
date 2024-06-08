import {
  Transfer as TransferEvent,
  Subscribers,
} from "../../generated/Subscribers/Subscribers"
import {
  NoGasPass,
} from "../../generated/schema"

export function handleTransfer(event: TransferEvent): void {
  // Here we write the handler code for the NoGasPass entity
  let contractAddress = Subscribers.bind(event.address);
  let noGasPass = NoGasPass.load(event.params.tokenId.toString());

  if (noGasPass == null) {
    noGasPass = new NoGasPass(event.params.tokenId.toString());
    noGasPass.creator = event.params.to;
  }

  noGasPass.newOwner = event.params.to;
  noGasPass.blockNumber = event.block.number;
  noGasPass.save();
  // The noGasPass entity handler code ends here
}