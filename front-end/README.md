#  Swift Mobility E-Scooter Frontend🛴

A modern, production-ready React web application for the Swift Mobility e-scooter rental platform. This frontend empowers users to register, rent scooters, manage profiles, redeem and send tokens, and interact with a blockchain-powered rewards system—all through a seamless, mobile-first interface.

---

## Table of Contents

- [Features](#features)

- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#⚙️-environment-variables)
- [Available Scripts](#available-scripts)
- [Theming](#theming)
- [Integration](#integration)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

---

## Features

- **User Authentication:** Sign up, sign in, password reset, and email verification.
- **Profile Management:** Edit profile, view rental history, and manage packages.
- **Scooter Rental:** Scan QR codes, unlock scooters, and view real-time availability.
- **Interactive Map:** Locate scooters and track rides.
- **Token System:** Redeem, send, and receive tokens powered by Solana blockchain.
- **Admin Tools:** Manage scooters and users (admin features).
- **Responsive Design:** Optimized for desktop and mobile devices.
- **Dark/Light Theme:** Toggle between professional dark and light modes.
- **Secure Payments:** Stripe integration for package purchases.
- **Notifications:** Real-time feedback with toast notifications.
- **Accessibility:** Inclusive, accessible design for all users.

---



## Tech Stack

- **Frontend:** React 18+, React Router, Bootstrap 5
- **State Management:** React Context API
- **Blockchain:** Solana Wallet Adapter, SPL Token integration
- **Payments:** Stripe.js
- **Icons:** React Icons (FontAwesome, Material)
- **Notifications:** React Toastify
- **Styling:** CSS Modules, Bootstrap, custom theming
- **Testing:** (Add if you have tests)

---

## Project Structure

```
src/
  assets/         # Images and icons
  components/     # Reusable UI components (NavBar, Footer, Accordion, etc.)
  context/        # Theme and User context providers
  data/           # Static data (e.g., packages)
  pages/          # Main route pages (Home, Landing, Map, Profile, etc.)
  utils/          # Utility functions (fetchBalance, sendTokens)
  App.jsx         # Main app routes
  main.jsx        # App bootstrap
  index.css       # Global styles and theming
```

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+ recommended)
- npm or yarn

### Installation

1. **Clone the repository:**

   ```sh
   git clone https://github.com/TsiOnshime/Swift
   cd front-end
   ```

2. **Install dependencies:**

   ```sh
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables:**

   - Copy `.env.example` to `.env` and fill in required values (see [Environment Variables](#environment-variables)).

4. **Start the development server:**

   ```sh
   npm run dev
   # or
   yarn dev
   ```

5. **Open in your browser:**
   - Visit [http://localhost:5173](http://localhost:5173)

---

 ## ⚙️ Environment Variables

Create a `.env` file in the root directory with:

```
VITE_BASE_URL=http://localhost:4001
VITE_MINT_ADDRESS=<your_solana_token_mint>
# Add any other required variables
```

---

## Available Scripts

- `npm run dev` — Start the development server
- `npm run build` — Build for production
- `npm run preview` — Preview the production build

---

## Theming

- **Light/Dark Mode:**  
  Toggle via the theme button in the navigation bar.  
  Theme state is managed globally using React Context and CSS variables for a smooth, professional look.

---

## Integration

- **Backend:**  
  Connects to the [Swift Mobility Backend API](https://github.com/TsiOnshime/Swift/blob/master/Backend/Readme.md) for authentication, scooter management, and payments.
- **Blockchain:**  
  Integrates with Solana for token rewards and transfers.
- **Payments:**  
  Uses Stripe for secure package purchases.

---

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss your ideas.

1. Fork the repo
2. Create your feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a pull request

---


## Contact

For questions or support, please open an issue or contact the maintainers:

- [yordabsa@gmail.com](mailto:yordabsa@gmail.com)
- [selamshimeles9@gmail.com](mailto:selamshimeles9@gmail.com)

---

> **Swift Mobility — Redefining Urban Transport with AI and Web3 Innovation** 
