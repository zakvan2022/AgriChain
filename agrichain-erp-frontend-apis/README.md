# README #

### What is this repository for? ###
This repo readme contains how to set up the AgriChain blockchain and the development process

Features:
===========
 1.1 Private Ethereum Blockchain:
------------------------------------------------------

- Setting up a private instance of the etherum blockchain for the AgriChain project

1.2 IPFS:
-----------------
 IPFS provides a convenient interface for distributed data storage, with a hash address for reference to data stored. This address will be stored in a smart farm contract on the AgriChain blockchain.

- Setting up an instance of IPFS for storing immutable records saved by users on the AgriChain database.
- Retrieving hashes of store records

1.3 AgriChain Hash Storage:
---------------------------------------------

- Smart contracts which serves as a middle layer between the AgriChain database and IPFS instances.
- It stores a map of database records with their corresponding IPFS records. 

1.4 AgriChain Smart Farm Contracts:
----------------------------------------------------

 A smart farm contract is a protocol which shall enforce agreements between participants in the ecosystem. Smart contract codes are stored on the blockchain while smart contract data are stored on InterPlanetary File System (IPFS). In AgriChain, farmers may use AgriChain’s predefined farm contracts to:

- monitor farm inputs and outputs,
- define storage specifications,
- secure large volume financial transactions on the AgriChain decentralized exchange, 
- build more complex procedures and applications. 

 To retrieve the latest data associated with a farm contract, the address is fetched from the AgriChain blockchain and the system queries IPFS for the associated file.

1.5 AgriChain Blockchain Explorer:
-----------------------------------

A blockchain explorer where user can:

- market price of the AgriChain Token (AGT)
- blocks and transactions
- mined blocks with its associated miners and transactions
- processed transactions
- deployed smart contract codes and ABI

For reference see etherscan.io


