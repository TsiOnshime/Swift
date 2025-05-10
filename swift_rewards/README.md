
# Swift Rewards Solana Program

A secure, production-ready Solana Anchor program powering the rewards and token transfer system for the Swift Mobility E-Scooter ecosystem.

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Program Architecture](#program-architecture)
- [Instructions](#instructions)
- [Accounts](#accounts)
- [Getting Started](#getting-started)
- [Deployment](#deployment)
- [Testing](#testing)
- [Security](#security)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

---

## Overview

**Swift Rewards** is a robust Solana smart contract (Anchor program) designed to enable transparent, on-chain reward distribution and peer-to-peer token transfers for the Swift Mobility platform.  
By leveraging the speed and security of Solana, Swift Rewards ensures that every ride, reward, and transfer is fast, secure, and fully auditable — empowering a new era of decentralized urban mobility.

---

## Features

- **Automated Token Rewards:** Instantly mint reward tokens to users for completed actions (e.g., scooter rentals).
- **Peer-to-Peer Transfers:** Enable users to send tokens to each other seamlessly.
- **Secure Mint Authority:** Uses a Program Derived Address (PDA) for minting, eliminating private key risks.
- **Anchor Framework:** Built with Anchor for safety, maintainability, and developer ergonomics.
- **Multi-language Client Support:** TypeScript and Rust clients for easy integration.
- **Comprehensive Testing:** Includes a full suite of Mocha/Chai tests for reliability.

---

##  Tech Stack

- [Solana](https://solana.com/) — High-performance blockchain
- [Anchor](https://book.anchor-lang.com/) — Solana smart contract framework
- [Rust](https://www.rust-lang.org/) — Secure, fast smart contract language
- [TypeScript](https://www.typescriptlang.org/) — For tests and client integration
- [Mocha](https://mochajs.org/) & [Chai](https://www.chaijs.com/) — Testing framework

---

## Program Architecture

- **Program ID:**  
  `2NB3BVcoJeCP5aEQLCFuCDYhERoCJyJrLzLVCdzYY7Zf` (Devnet)

- **Mint Authority:**  
  Program Derived Address (PDA) with seed `"mint-authority"`

- **Token Mint:**  
  Configurable via environment (`TOKEN_MINT`)

---

## Instructions

### 1. `initialize`

Initializes the program (if needed).  
**Accounts:**  
- None (or as required by your logic)

---

### 2. `reward_for_package`

Mints reward tokens to a user's associated token account.

**Accounts:**
- `swift_mint` (Mint): The SPL token mint
- `user_token_account` (TokenAccount): User's associated token account
- `mint_authority` (PDA): Program's mint authority
- `token_program` (Program): SPL Token program

**Args:**
- `amount` (u64): Number of tokens to mint

---

### 3. `transfer_coins`

Transfers tokens from one user to another.

**Accounts:**
- `from_token_account` (TokenAccount): Sender's token account
- `to_token_account` (TokenAccount): Recipient's token account
- `user` (Signer): Sender's wallet
- `token_program` (Program): SPL Token program

**Args:**
- `amount` (u64): Number of tokens to transfer

---

## Accounts

- **Mint Authority PDA:**  
  Derived with seed `"mint-authority"` and the program ID.

- **User Token Accounts:**  
  Standard SPL associated token accounts for the reward mint.

---

## Getting Started

### Prerequisites

- [Solana CLI](https://docs.solana.com/cli/install-solana-cli-tools)
- [Anchor CLI](https://book.anchor-lang.com/chapter_2/installation.html)
- Node.js (for tests)
- Rust (for building Solana programs)

### 1. Clone the Repository

```sh
git clone https://github.com/TsiOnshime/Swift.git
cd swift_rewards

### 2. Install Dependencies

```sh
yarn install
# or
npm install
```

### 3. Configure Your Environment

Set up your Solana CLI and wallet:
```sh
solana config set --url devnet
solana-keygen new --outfile ~/.config/solana/id.json
```
(Optional) Set your custom token mint in `.env` or `Anchor.toml` if needed.

---

## Deployment

### Localnet

1. Start a local validator:
    ```sh
    solana-test-validator
    ```
2. In another terminal, build and deploy:
    ```sh
    anchor build
    anchor deploy
    ```

### Devnet

1. Make sure your wallet is funded on devnet:
    ```sh
    solana airdrop 2
    ```
2. Build and deploy:
    ```sh
    anchor build
    anchor deploy --provider.cluster devnet
    ```

---

## Testing

- All tests are in the `tests/` directory.
- Run with:
    ```sh
    anchor test
    ```
- Tests are written in TypeScript and cover all major instructions and edge cases.

---

## Security

- Anchor account validation for robust safety.
- Mint authority is a PDA (no private key exposure).
- All instructions check for correct authority and account ownership.
- For production, a third-party audit is strongly recommended.

---

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---

## License

MIT

---

## Contact

For questions or support, please open an issue or contact the maintainer.

---

> **Swift Rewards — Powering the future of urban mobility, one token at a time.**