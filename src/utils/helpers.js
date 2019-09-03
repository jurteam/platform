import linkify from "linkifyjs/string";

// Log helper only on DEVELOPMENT environmentexport const warn = (mixed, obj) => {
export const log = (mixed, obj, type) => {
  let out = [];
  if (typeof type === "undefined") type = 0; // default to log

  if (process.env.NODE_ENV === "development") {
    if (typeof obj === "undefined") {
      out = [mixed];
    } else {
      out = [mixed, obj];
    }
  }
  switch (type) {
    case -1: // error
      console.error(...out);
      break;
    case 1: // warn
      console.warn(...out);
      break;
    default:
      // log
      console.log(...out);
      break;
  }
};
export const warn = (mixed, obj) => {
  return log(mixed, obj, 1);
};
export const error = (mixed, obj) => {
  return log(mixed, obj, -1);
};

// EVM connection checker
export const checkConnection = (web3) => {
  if (!web3) {
    return { pathname: "/" };
  }
};

export const chainErrorHandler = err => {
  // if (err.message.includes('User denied transaction') ||
  //     err.message.includes('Request has been rejected.') ||
  //     err.message.includes('transaction has been discarded') ||
  //     err.message.includes('Transaction not confirmed'))
  //     throw new Error('web3UserTxRejected');

  // if (err.message.includes('nonce too low'))
  //     throw new Error('web3NonceTooLow');

  // if (err.message.includes('nonce may not be larger than'))
  //     throw new Error('web3NonceTooHigh');

  // if (err.message.includes('insufficient funds for gas'))
  //     throw new Error('web3InsufficientFundsForGas');

  // if (err.message.includes('intrinsic gas too low'))
  //     throw new Error('web3GasTooLow');

  // throw new Error(err);
  console.log('chain error', err);
  console.log('chain error.message', err.message);
  warn('chain exeption', err.message);
}

// Route redirect helper
export const redirect = (...checks) => {
  log("redirect", { checks });
  return (nextState, replace) => {
    log("redirect", { nextState, replace });
    let result;
    checks.some(check => {
      log("redirect", { check });
      result = check();
      return !!result;
    });
    result && replace(result);
  };
};

export const humanToEth = ( value ) => {
  const decimals = "1";
  let amount = 0;

  if (typeof value === "string") {
    amount = value.replace(".", "");
  } else {
    amount =
      Number(value) *
      Number(
        decimals.padEnd(Number(process.env.REACT_APP_TOKEN_DECIMALS) + 1, "0")
      );
  }
  return amount;
};

export const toCurrencyFormat = ( value ) => {
  const decimals = "1";

  const num =
    Number(humanToEth(value)) /
    Number(
      decimals.padEnd(Number(process.env.REACT_APP_TOKEN_DECIMALS) + 1, "0")
    );
  return num.toFixed(2);
};

export const ethToHuman = ( value ) => {
  const decimals = "1";
  const amount =
    Number(value) /
    Number(
      decimals.padEnd(Number(process.env.REACT_APP_TOKEN_DECIMALS) + 1, "0")
    );
  return amount;
};

export const ethToStore = ( value ) => {
  const amount = Number(value);
  return amount.toFixed(process.env.REACT_APP_TOKEN_DECIMALS);
};

export const getFormattedDate = (date) => {
  let year = date.getFullYear();
  let month = (1 + date.getMonth()).toString().padStart(2, "0");
  let day = date
    .getDate()
    .toString()
    .padStart(2, "0");

  return `${year}-${month}-${day}`;
};

export const capitalize = (string) =>
  string.charAt(0).toUpperCase() + string.slice(1);

export const urlify = (str) => {
  const html = linkify(str, {
    target: (href, type) => {
      if (href.startsWith(window.location.origin)) {
        return "_self";
      } else {
        return "_blank";
      }
    }
  });
  return html;
};

export const dateReducer = (date) => {
  var d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
};

export const upperCaseFirst = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const ellipsisString = (str, count, length) => {
  if (str.length > (count || 10)) {
    return str.substring(0, length || 10) + "...";
  } else {
    return str;
  }
};

export const arrayColumn = (arr, n) => arr.map(x => x[n]);

/**
 *
 * @param {*} contractData
 * @param {*} wallet -  if specified check is performed against the provided value for wallet
 *                      instead of whoPays
 */
export const calculateFundingAndDispersal = (contractData) => {
  const { partAPenaltyFee, partBPenaltyFee, whoPays, value } = contractData;
  const [ partA ] = contractData.counterparties;

  console.log('calculateFundingAndDispersal – run', contractData);

  const {
    web3: { utils }
  } = global.drizzle;

  let fundings = {
    a: Number(partAPenaltyFee),
    b: Number(partBPenaltyFee)
  };
  let dispersal = {
    a: Number(partAPenaltyFee),
    b: Number(partBPenaltyFee)
  };

  if (whoPays === partA.wallet) {
    fundings.a = Number(partAPenaltyFee) + Number(value);
    dispersal.b = Number(partBPenaltyFee) + Number(value);
  } else {
    fundings.b = Number(partBPenaltyFee) + Number(value);
    dispersal.a = Number(partAPenaltyFee) + Number(value);
  }

  // Avoid presicion issues on BN
  if (process.env.REACT_APP_VECHAIN_ENABLED === 'true')
  { // Comet - VeChain Blockchain

    let web3Utils = global.drizzle.web3.utils;
    fundings.a = web3Utils.toWei(fundings.a.toString(), 'ether');
    fundings.b = web3Utils.toWei(fundings.b.toString(), 'ether');
    dispersal.a = web3Utils.toWei(dispersal.a.toString(), 'ether');
    dispersal.b = web3Utils.toWei(dispersal.b.toString(), 'ether');

    // fundings.a = web3Utils.toBN(fundings.a).toString();
    // fundings.b = web3Utils.toBN(fundings.b).toString();
    // dispersal.a = web3Utils.toBN(dispersal.a).toString();
    // dispersal.b = web3Utils.toBN(dispersal.b).toString();
  }

  return {
    fundings: fundings,
    dispersal: dispersal
  }
}

// @retun float value
export const getContractTotalValue = (contract, toHuman) => {

  if (typeof toHuman === 'undefined') toHuman = false;

  log("getContractTotalValue – run", contract);
  let value = 0

  // base value
  if (typeof contract.value !== 'undefined') {
    value = Number(contract.value)
  } else {
    value = Number(contract.amount)
  }

  // penalties
  if (typeof contract.partAPenaltyFee !== 'undefined') {
    value = value + Number(contract.partAPenaltyFee) + Number(contract.partBPenaltyFee)
  } else if (typeof contract.penaltyFee !== 'undefined' && contract.penaltyFee !== null) {
    value = value + Number(contract.penaltyFee.partA) + Number(contract.penaltyFee.partB)
  }

  return toHuman ? ethToHuman(value) : value;
}

export const formatAmount = (amount) => {

  // TODO: WEI conversion

  // Avoid presicion issues on BN
  if (process.env.REACT_APP_VECHAIN_ENABLED === 'true')
  { // Comet - VeChain Blockchain
    amount = amount.toString()
  }

  return amount
}

export const canVote = (statusId) => {

  const canVote = [35,36].indexOf(statusId) >= 0;

  return canVote
}