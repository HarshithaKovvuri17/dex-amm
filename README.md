readme_text = """
# DEX AMM Project

## Overview

This project implements a simplified Decentralized Exchange (DEX) using the Automated Market Maker (AMM) model, inspired by Uniswap V2.
The DEX enables decentralized, permissionless token trading without order books or centralized intermediaries.

Users can:
- Add liquidity to a token pair and receive LP tokens
- Remove liquidity by burning LP tokens
- Swap between two ERC-20 tokens using the constant product formula
- Earn trading fees as liquidity providers

---

## Features

- Initial and subsequent liquidity provision
- Liquidity removal with proportional share calculation
- Token swaps using constant product formula (x * y = k)
- 0.3% trading fee retained in the pool
- LP token accounting per provider
- Fully tested using Hardhat
- Docker-ready setup

---

## Architecture

### Smart Contracts

- DEX.sol  
  Core AMM logic handling liquidity pools, swaps, reserves, and LP accounting

- MockERC20.sol  
  ERC-20 token used for testing purposes

### Design Decisions

- Reserves are tracked internally
- LP tokens are handled via internal accounting
- Fees remain in the pool to benefit liquidity providers
- Solidity 0.8+ overflow checks are used

---

## Mathematical Implementation

### Constant Product Formula

x * y = k

Where:
- x = reserve of Token A
- y = reserve of Token B
- k = constant value

---

### Fee Calculation (0.3%)

amountInWithFee = amountIn * 997  
numerator = amountInWithFee * reserveOut  
denominator = (reserveIn * 1000) + amountInWithFee  
amountOut = numerator / denominator  

The 0.3% fee stays in the pool and increases LP value.

---

### LP Token Minting

Initial Liquidity:
liquidityMinted = sqrt(amountA * amountB)

Subsequent Liquidity:
liquidityMinted = (amountA * totalLiquidity) / reserveA

---

### Liquidity Removal

amountA = (liquidityBurned * reserveA) / totalLiquidity  
amountB = (liquidityBurned * reserveB) / totalLiquidity  

---

## Project Structure
```
dex-amm/
├── contracts/
│   ├── DEX.sol
│   ├── MockERC20.sol
├── test/
│   └── DEX.test.js
├── scripts/
│   └── deploy.js
├── Dockerfile
├── docker-compose.yml
├── .dockerignore
├── hardhat.config.cjs
├── package.json
└── README.md

---

## Setup Instructions

### Prerequisites
- Node.js 18+
- Git
- Docker (optional)

---

### Local Setup (Without Docker)

npm install  
npx hardhat compile  
npx hardhat test  

---

### Docker Setup

docker compose up -d  
docker compose exec app npm run compile  
docker compose exec app npm test  

---

## Testing

- Hardhat + Mocha + Chai
- Covers liquidity, swaps, fees, edge cases, and events
- 25+ test cases
- Coverage target: 80%+

---

## Known Limitations

- Single trading pair only
- No slippage protection
- No deadline parameter
- LP tokens are not transferable ERC-20 tokens

---

## Security Considerations

- Solidity 0.8+ overflow protection
- Input validation on all public functions
- No reliance on token balances for reserve tracking
- Fees retained in the pool
- State updated before external calls

---

## Conclusion

This project demonstrates a complete AMM-based DEX implementation similar to Uniswap V2.
It provides hands-on experience with liquidity pools, pricing mechanics, and decentralized trading.

---

## Author Notes

This project was built to understand DeFi AMM fundamentals, Solidity smart contracts, and production-style testing.
"""
