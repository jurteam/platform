import React, { Component } from "react";

import { drizzleConnect } from "drizzle-react";
import { connect } from 'react-redux';

import { log, connector } from "../utils/helpers";

const Init = true;
// export const Init = props => {
//   const { dispatch } = props

//   // log('Init')

  
  if (connector() === 'connex') 
  {
    global.connection = connect;
    // global.dispatcher = dispatch;
  } 
  else 
  if (connector() === 'web3') 
  {
    global.connection = drizzleConnect;
    // global.dispatcher = global.drizzle.store.dispatch;
  }
  log('------------------ globbbbbal ------88--------',global)

// }

export default Init;
// export default connect(Init);
