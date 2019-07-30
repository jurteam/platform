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

export const arrayColumn = (arr, n) => {arr.map(x => x[n]);};

/**
 *
 * @param {*} contractData
 * @param {*} wallet -  if specified check is performed against the provided value for wallet
 *                      instead of whoPays
 */
export const calculateFundingAndDispersal = (contractData) => {
  const { partAPenaltyFee, partBPenaltyFee, whoPays, value } = contractData;
  const [ partA ] = contractData.counterparties;

  const {
    web3: { utils }
  } = global.drizzle;

  let fundings = {
    a: Number(
      humanToEth(ethToStore(ethToHuman(Number(humanToEth(partAPenaltyFee)))))
    ),
    b: Number(
      humanToEth(ethToStore(ethToHuman(Number(humanToEth(partBPenaltyFee)))))
    )
  };
  let dispersal = {
    a: Number(
      humanToEth(ethToStore(ethToHuman(Number(humanToEth(partAPenaltyFee)))))
    ),
    b: Number(
      humanToEth(ethToStore(ethToHuman(Number(humanToEth(partBPenaltyFee)))))
    )
  };

  if (whoPays === partA.wallet) {
    fundings.a = Number(
      humanToEth(
        ethToStore(
          ethToHuman(
            Number(humanToEth(partAPenaltyFee)) + Number(humanToEth(value))
          )
        )
      )
    );
    dispersal.b = Number(
      humanToEth(
        ethToStore(
          ethToHuman(
            Number(humanToEth(partBPenaltyFee)) + Number(humanToEth(value))
          )
        )
      )
    );
  } else {
    fundings.b = Number(
      humanToEth(
        ethToStore(
          ethToHuman(
            Number(humanToEth(partBPenaltyFee)) + Number(humanToEth(value))
          )
        )
      )
    );
    dispersal.a = Number(
      humanToEth(
        ethToStore(
          ethToHuman(
            Number(humanToEth(partAPenaltyFee)) + Number(humanToEth(value))
          )
        )
      )
    );
  }

  // Avoid presicion issues on BN
  if (process.env.REACT_APP_VECHAIN_ENABLED === 'true')
  { // Comet - VeChain Blockchain
    fundings.a = fundings.a.toString();
    fundings.b = fundings.b.toString();
    dispersal.a = dispersal.a.toString();
    dispersal.b = dispersal.b.toString();
  }

  return {
    fundings: fundings,
    dispersal: dispersal
  }
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