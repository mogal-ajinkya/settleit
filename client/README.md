# SplitIt - Expense Sharing Made Easy

SplitIt is a MERN stack application designed to simplify expense sharing among groups of friends during trips or shared activities. Instead of each person logging their own expenses, one person can manage all transactions and easily calculate how to minimize cash flow among the group.

## Features

- **Single-point Entry**: One person can create a sheet, add group members, and log all transactions.
- **Expense Sharing**: Automatically calculates the minimum cash flow required to settle all debts.
- **Group Management**: Create and manage multiple groups for different trips or activities.
- **Shareable Sheets**: Easy sharing of expense sheets with all group members.
- **Final Settlement**: Provides a clear summary of who owes what to whom.

## Tech Stack

- **MongoDB**: Database
- **Express.js**: Backend framework
- **React**: Frontend library
- **Node.js**: Runtime environment

## Installation

1. Clone the repository
   ```
   git clone https://github.com/yourusername/splitit.git
   cd splitit
   ```

2. Install dependencies for backend and frontend
   ```
   cd backend
   npm install
   cd ../frontend
   npm install
   ```

3. Set up environment variables
   Create a `.env` file in the backend directory and add:
   ```
   MONGODB_URI=your_mongodb_connection_string
   PORT=5000
   ```

4. Start the backend server
   ```
   cd backend
   npm start
   ```

5. Start the frontend application
   ```
   cd frontend
   npm start
   ```

The application should now be running on `http://localhost:3000`

## Usage

1. Create an account or log in
2. Create a new group and add members
3. Start adding expenses, specifying who paid and for whom
4. View the calculated minimum cash flow to settle all debts
5. Share the expense sheet with your group

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.

## Contact

If you have any questions, feel free to reach out to [Your Name] at [your.email@example.com].
