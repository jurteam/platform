import { ADVOCATE_UPDATE_BIO } from "../reducers/types"

export const updateBio = (address, bio) => {
  return {
    type: ADVOCATE_UPDATE_BIO,
    payload: {
      address,
      bio
    }
  }
}
