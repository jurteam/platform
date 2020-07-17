import { log } from "../../utils/helpers";


export default class connexSign {


  async signCertIdentification() 
  {
    const signingService = global.connex.vendor.sign('cert')

    let rndString = this.randomHEXString(8);

    return signingService.request({
      purpose: 'identification',
      payload: {
          type: 'text',
          content: rndString
      }
    })

  }

  randomHEXString(byte) {
    var randomHex = require('randomhex');
   
    return randomHex(byte);
  }


}


