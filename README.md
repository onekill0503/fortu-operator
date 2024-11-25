# Fortu-operator 🎲

A decentralized operator service for the Fortupool protocol that monitors Chainlink VRF responses, processes winner selection using subgraph data, and submits winners to the smart contract.

<center>
<h3>Powered By</h3>
</br>
<div>
  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfLiZmMOa7nJKl15YVdWyMrEY19RETEDe8mA&s" width="75" alt="LayerZero">
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  <img src="https://miro.medium.com/v2/da:true/resize:fit:1200/0*NNTrFTedUVht0Zch" width="200" alt="Chainlink">
</div>
</center>

## Overview 🔍

Fortu-operator is a crucial component of the Fortupool protocol, responsible for:
- Monitoring Chainlink VRF responses for random number generation
- Fetching and processing raffle data from Goldsky subgraph
- Calculating user tickets based on deposit amount and time
- Determining winners using a fair selection algorithm
- Submitting winner information to the smart contract

## How It Works 🔄

### 1. Random Number Monitoring
- Continuously monitors the Fortupool contract for new Chainlink VRF responses
- Validates if the random number belongs to the current batch
- Triggers the winner selection process when new valid numbers are detected

### 2. Data Collection
- Queries Goldsky subgraph for:
  - Current withdrawal requests based on Current Batch
  - User deposit information based on Current Batch
- Filters out addresses with zero deposit balance (depositAmount - WithdrawAmount)

### 3. Ticket Calculation
- For each valid participant:
  - Calculates base tickets from deposit amount
  - Adds bonus tickets based on deposit holding time
  - Formula: `tickets = (deposit_amount / TicketPrice) + (blocks_passed / blockToTicketRatio)`

### 4. Winner Selection
- Calculates total tickets in the pool
- Generates lucky number using formula:
  ```
  lucky_number = (RANDOM_NUMBERS % TOTAL_TICKETS) + 1
  ```
- Maps lucky number to user ticket range
- Identifies winning address

### 5. Winner Submission
- Calls `submitWinner` function on Fortupool contract
- Provides winning address and corresponding lucky number
- Monitors transaction confirmation

## Prerequisites 📋

- Bun
- Goldsky Subgraph
- Smartcontract address & ABI

## Installation 🛠️

```bash
# Clone the repository
git clone https://github.com/onekill0503/fortu-operator.git
cd fortu-operator

# Install dependencies
cargo build

# Set up environment variables
cp .env.example .env
```

## Configuration ⚙️

1. Configure environment variables in `.env`:
```env
FORTU_SMART_CONTRACT=""
SUSD_CONTRACT_ADDRESS=""
SUBGRAPH_ENDPOINT=""
OWNER_PRIVATE_KEY=""
RPC_PROVIDER=""
```


## Usage 💡

### Starting the Operator

```bash
# Install Requirement Library based on package.json
bun install

# Start in development mode
bun run dev
```

## Troubleshooting 🔧

Common issues and solutions:
1. **Subgraph Connection Fails**
   - Verify SUBGRAPH ENDPOINT URL
   - Check Goldsky service status

2. **Winner Submission Fails**
   - Verify operator account has enough gas
   - Check contract permissions

## Contributing 🤝

1. Fork the repository
2. Create your feature branch
3. Run tests and ensure they pass
4. Submit a pull request

## Related Projects 🔗

- [Fortupool](https://github.com/onekill0503/fortupool) - Main protocol smart contracts

## License 📄

Distributed under the MIT License. See `LICENSE.md` for more information.

## Contact 📧

Your Name - [@0xAlwaysbedream](https://twitter.com/0xAlwaysbedream)

Project Link: [https://github.com/onekill0503/fortu-operator](https://github.com/onekill0503/fortu-operator)
