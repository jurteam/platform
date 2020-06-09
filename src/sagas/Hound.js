import { takeEvery } from "redux-saga/effects";
import { CATCH_EVENTS, HOUND_START_SMELLING } from "../reducers/types";

const MAX_TRIES = 4;

const Preys = {
  allPreys: [],

  forEach: fn => Preys.allPreys.filter(Boolean).forEach(fn),

  start: prey =>
    Preys.allPreys.push({ ...prey, index: Preys.allPreys.length, _tries: 0 }),

  stop: prey => {
    const index = Preys.allPreys.findIndex(p => p.index === prey.index);
    const preyable = Preys.allPreys[index];
    if (!preyable) return;
    if (typeof preyable.onFound === "function") preyable.onFound();
    if (index >= 0) Preys.allPreys.splice(index, 1);
  }
};

function* smellIt(action) {
  // console.log("hound saga smelling", action);
  Preys.forEach(prey =>
    prey.filter
      .order(prey._tries === 3 ? "desc" : "asc")
      .apply(0, 1)
      .then(logs => {
        if (prey.shouldStop(logs)) {
          // console.log("hound saga found prey", prey, "logs", logs);
          Preys.stop(prey);
        } else {
          prey._tries += 1;
          if (prey._tries > (prey.maxTries || MAX_TRIES)) Preys.stop(prey);
          // console.log(
          //   "hound saga found nothing in this smell",
          //   action,
          //   prey,
          //   "logs",
          //   logs
          // );
        }
      })
  );
  yield true;
}

function* startSmelling(action) {
  const preyable = action.payload;

  if (!preyable)
    throw Error(
      "hound needs connex filter and shouldStop function as payload. Provided:",
      preyable
    );
  if (typeof preyable.shouldStop !== "function")
    throw Error(
      "hound needs shouldStop function. Provided:",
      preyable.shouldStop
    );
  if (typeof preyable.filter !== "object")
    throw Error("hound needs connex filter. Provided:", preyable.filter);

  yield Preys.start(action.payload);
  // console.log("hound saga now tracking", Preys.allPreys);
}

export default function* houndSaga() {
  yield takeEvery(CATCH_EVENTS, smellIt);
  yield takeEvery(HOUND_START_SMELLING, startSmelling);
}
