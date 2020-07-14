import RewardSmartContract from "../../build/contracts/JurRewards.json";
import Base from "./BaseConnexSC";

export default class RewardConnex extends Base {
  constructor() {
    super(RewardSmartContract);
  }

  withdrawReward = (address, activityId, slotId) =>
    this.execute(
      address,
      "withdrawReward",
      "Withdraw reward amount",
      activityId,
      slotId
    ).then(signRes => ({
      filter: this.filter("SlotRewarded", [{ activityId, slotId }])
    }));

  markSlotComplete = (address, activityId, slotId) =>
    this.execute(
      address,
      "markSlotComplete",
      "Mark activity slot as complete",
      activityId,
      slotId
    ).then(signRes => ({
      filter: this.filter("SlotUpdated", [{ activityId, slotId }])
    }));
}
