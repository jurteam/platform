module.exports.increaseTime = function increaseTime(id, duration) {
    // const id = Math.round((new Date()).getTime() / 1000);
    // console.log("================================");
    // console.log("id: ", id);
    // console.log("duration :", duration);
  
    return new Promise((resolve, reject) => {
      web3.currentProvider.send(
        {
          jsonrpc: "2.0",
          method: "evm_increaseTime",
          params: [duration],
          id: id
        },
        err1 => {
          if (err1) return reject(err1);
  
          web3.currentProvider.send(
            {
              jsonrpc: "2.0",
              method: "evm_mine",
              id: id + duration
            },
            (err2, res) => {
              // console.log("================================");
              // console.log("response: ", res);
              // return err2 ? reject(err2) : resolve(res);
            }
          );
        }
      );
    });
  };module.exports.increaseTime = function increaseTime(id, duration) {
    // const id = Math.round((new Date()).getTime() / 1000);
    console.log("================================");
    console.log("id: ", id);
    console.log("duration :", duration);
  
    return new Promise((resolve, reject) => {
      web3.currentProvider.send(
        {
          jsonrpc: "2.0",
          method: "evm_increaseTime",
          params: [duration],
          id: id
        },
        err1 => {
          if (err1) return reject(err1);
  
          web3.currentProvider.send(
            {
              jsonrpc: "2.0",
              method: "evm_mine",
              id: id + duration
            },
            (err2, res) => {
              console.log("================================");
              console.log("response: ", res);
              return err2 ? reject(err2) : resolve(res);
            }
          );
        }
      );
    });
  };