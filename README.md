# Finance Tracker Application

A full-stack finance management application built with React, Node.js, and MongoDB that helps users track their expenses, manage budgets, and visualize spending patterns.

## Features

-   📊 Interactive Dashboard with spending analytics
-   💰 Transaction management
-   📅 Budget planning and tracking
-   📱 Responsive design for mobile and desktop
-   📈 Visual charts and reports
-   🎯 Category-wise expense tracking

## Tech Stack

### Frontend

-   React.js
-   Tailwind CSS
-   Recharts for data visualization
-   React Router for navigation
-   Vite as build tool

### Backend

-   Node.js
-   Express.js
-   MongoDB
-   Mongoose ODM

## Getting Started

### Prerequisites

-   Node.js (v14 or higher)
-   MongoDB
-   Git

### Installation

1. Clone the repository

```bash
git clone https://github.com/yourusername/finance-tracker.git
cd finance-tracker
```

2. Install Backend Dependencies

```bash
cd backend
npm install
```

3. Install Frontend Dependencies

```bash
cd frontend
npm install
```

4. Environment Setup

Create `.env` file in backend directory:

```env
MONGODB_URI=your_mongodb_connection_string
PORT=5000
```

### Running the Application

1. Start Backend Server

```bash
cd backend
npm run dev
```

2. Start Frontend Development Server

```bash
cd frontend
npm run dev
```

The application will be available at `http://localhost:5173`

## Project Structure

```
finance-tracker/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── api/
│   │   └── App.jsx
│   ├── package.json
│   └── vite.config.js
│
└── backend/
    ├── models/
    ├── routes/
    ├── controllers/
    ├── config/
    ├── server.js
    └── package.json
```

## API Endpoints

### Transactions

-   `GET /api/transactions` - Get all transactions
-   `POST /api/transactions` - Create new transaction
-   `DELETE /api/transactions/:id` - Delete transaction

### Budgets

-   `GET /api/budgets` - Get all budgets
-   `POST /api/budgets` - Create new budget
-   `DELETE /api/budgets/:id` - Delete budget

## Available Scripts

### Frontend

-   `npm run dev` - Start development server
-   `npm run build` - Build for production
-   `npm run preview` - Preview production build

### Backend

-   `npm run dev` - Start development server
-   `npm start` - Start production server

## Contribution Guidelines

1. Fork the repository
2. Create a new branch (`git checkout -b feature/improvement`)
3. Commit changes (`git commit -am 'Add new feature'`)
4. Push to branch (`git push origin feature/improvement`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
