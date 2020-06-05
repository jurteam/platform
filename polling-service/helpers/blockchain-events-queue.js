const QUEUE_NAME = "blockchain-events";
const ASSERT_QUEUE_FAILURE = 123;

function assert() {
  return queue
    .assertQueue(QUEUE_NAME)
    .catch(exitOnAssertFailure)
    .then(res => (!res ? exitOnAssertFailure() : res));
}

function exitOnAssertFailure(e) {
  console.log("failed to assert queue", QUEUE_NAME);
  console.error(e);
  process.exit(ASSERT_QUEUE_FAILURE);
}

function push(data) {
  return queue.push(QUEUE_NAME, data);
}

module.exports = {
  assert,
  push
};
