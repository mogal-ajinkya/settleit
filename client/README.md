# SplitIt - Expense Sharing Made Easy

SplitIt is a MERN stack application designed to simplify expense sharing among groups of friends during trips or shared activities. Instead of each person logging their own expenses, one person can manage all transactions and easily calculate how to minimize cash flow among the group.

## How it works 
   - **Following diagram shows input debts to be settled**:
   ![image](https://github.com/user-attachments/assets/e894410d-0255-42ad-9efe-eccd9fb3548b)
   - **Above debts can be settled in following optimized way**:
   ![image](https://github.com/user-attachments/assets/301328f9-124c-41bf-b71d-82467823fa0d)

   - ** Algorithm ** : The idea is to use Greedy algorithm where at every step, settle all amounts of one person and recur for remaining n-1 persons.
   - How to pick the first person? To pick the first person, calculate the net amount for every person where net amount is obtained by subtracting all debts (amounts to pay) from all credits (amounts to be paid).
   - Once net amount for every person is evaluated, find two persons with maximum and minimum net amounts. These two persons are the most creditors and debtors.
   - The person with minimum of two is our first person to be settled and removed from list. Let the minimum of two amounts be x.
   - We pay ‘x’ amount from the maximum debtor to maximum creditor and settle one person. If x is equal to the maximum debit, then maximum debtor is settled, else maximum creditor is settled.


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
   cd server
   npm install
   cd ../client
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
   cd server
   nodemon server.js
   ```

5. Start the frontend application
   ```
   cd client
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

## Demo

[splitit.com](https://splitit-sife.onrender.com/)

