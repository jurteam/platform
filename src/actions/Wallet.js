import { log } from "../utils/helpers"; // log helpers

import {
  RESET_WALLET
} from "../reducers/types";

// Reset
export const resetWallet = () => ({
  type: RESET_WALLET
});