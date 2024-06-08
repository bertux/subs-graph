import {
  Transfer as TransferEvent,
  ZNS,
} from "../../generated/ZNS/ZNS"
import {
  Domain,
} from "../../generated/schema"

export function handleTransfer(event: TransferEvent): void {
  // Here we write the handler code for the Domain entity
  let contractAddress = ZNS.bind(event.address);
  let domain = Domain.load(event.params.tokenId.toString());

  if (domain == null) {
    domain = new Domain(event.params.tokenId.toString());
    domain.creator = event.params.to;
  }

  domain.newOwner = event.params.to;
  domain.blockNumber = event.block.number;
  domain.save();
  // The domain entity handler code ends here
}