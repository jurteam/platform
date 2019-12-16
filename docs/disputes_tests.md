# JUR MVP - TESTING SCENARIOS FOR OPEN LAYER DISPUTE

### Opening phase

- Oracles try to vote on a dispute opened within first 48h

### Voting phase

- A Party tries to amend his dispute proposal

- No one votes for the dispute

- Counterparty does not send his dispute resolution proposal within the timeframe

- Claimant keeps voting for himself and wins

- No clear majority at the end of the dispute  
**this action should extend the dispute**

- More than 10% (DISPUTE_WINDOW_MAX) of votes placed in the last time window  
**this action should extend the dispute**  

- Try to vote for more than 100% of what is placed on the other outcome  
**this action should fail** 

### Dispute Extended (flow not yet managed)

- Try to vote after the dispute is extended

### Dispute Closed (disputeEnds passed by)

- Try to vote after the dispute is closed

- A party try to withdraw his reward

- A voter try to withdraw his reward before the time of 24 hours (VOTE_LOCKUP) is passed from the dispute end

- A voter try to withdraw his reward after the time of 24 hours (VOTE_LOCKUP) is passed from the dispute end

- A voter from the losing part try to withdraw his reward