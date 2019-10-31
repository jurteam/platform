# JUR MVP OFFCHAIN STORED DATA

The purpose of this document is to list all fields saved into db.
The field are listed for any page

## Page:

### - Profile Settings

- Full Name
- Email
- Wallet
- Date of Birth
- Gender
- Location
- Category                                  
- Show Full Name instead of Wallet address (_true/false_)
- Accept Terms and Conditions (_true/false_)


### - Privacy

- Accepted disclaimer (_true/false_)


### - Contracts List

- Contract status
- Contract name
- Duration:
  - Days
  - hours
  - Minutes
- Counterparty details
  - Part A Wallet
  - Part B Wallet
- Contract Total Value amount 
    (_Contract Value_ + _Part A penalty fee_ + _Part B penalty fee_)


### - New Contract

- Part A Wallet
- Part A Full Name
- Part A Email
- Part B Wallet
- Part B Full Name
- Part B Email


### - New Contract detail

- Contract name
- Contract address
- Contract Status
- KPI of the contracts
- Resolution Proof
- File attached
  - File name
  - Mime type
  - File size
- Category
- Duration:
  - Days
  - hours
  - Minutes
- Wallet number of who pays
- Contract Value amount
- Is there any penalty fee? (_true/false_)
- Part A penalty fee amount
- Part B penalty fee amount
- Action in case of dispute 


### - Further activities on contract

For each of the following actions:
- Contract saved as draft
- Contract sent to counterparty
- Contract rejected from counterparty
- Contract accepted from counterparty
- Payment effectued by part A
- Payment effectued by part B
- Agreed contract closed
- Confirm contract closed
- Withdrawn from contract by part A
- Withdrawn from contract by part B

the following fields are saved into db:
- Date and time
- Abstract of activity
- Status of contract
- Wallet number of sender
- Wallet number of receiver
- Part A readed (_true/false_)
- Part B readed (_true/false_)



For each of the following actions:
- Open Dispute
- Amend Dispute


the following fields are saved into db:
- Date and time
- Message
- Proposal for part A 
- Proposal for part B
- Abstract of activity
- Status of contract
- Wallet number of sender
- Wallet number of receiver
- Part A readed (_true/false_)
- Part B readed (_true/false_)
- File attached
  - File name
  - Mime type
  - File size



### - Activities on dispute

### - Oracles vote

- Amount of vote
- Oracle Wallet
- Part voted Wallet
- Message
- Transaction hash
- File attached
  - File name
  - Mime type
  - File size


