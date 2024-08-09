const settleDebts = (expenses) => {
    console.log("gettting expense");
    const balances = {};
    const gid = expenses.groupId;
    console.log(gid);
    console.log(expenses.groupId);
  
    // Step 1: Calculate the net balance for each person
    expenses.forEach(expense => {
      // console.log(expense)
      const { payer, amount, payees } = expense;
  
      // Initialize the payer's balance if not already done
      if (!balances[payer]) balances[payer] = 0;
      balances[payer] += amount;
  
      // Subtract the amounts from each payee's balance
      payees.forEach(payee => {
        if (!balances[payee.identifier]) balances[payee.identifier] = 0;
        balances[payee.identifier] -= payee.amount;
      });
    });
  
    // Step 2: Create an array of people who owe money and those who need to be paid
    const owes = [];
    const gets = [];
  
    Object.keys(balances).forEach(person => {
      if (balances[person] > 0) {
        gets.push({ person, amount: balances[person] });
      } else if (balances[person] < 0) {
        owes.push({ person, amount: -balances[person] });
      }
    });
  
    // Step 3: Settle the debts
    const settlements = [];
  
    while (owes.length && gets.length) {
      const owe = owes.pop();
      const get = gets.pop();
  
      const settledAmount = Math.min(owe.amount, get.amount);
  
      settlements.push({
        from: owe.person,
        to: get.person,
        amount: settledAmount,
        groupId:gid
      });
  
      // Adjust the balances
      owe.amount -= settledAmount;
      get.amount -= settledAmount;
  
      // If there's still balance left, put them back into the array
      if (owe.amount > 0) owes.push(owe);
      if (get.amount > 0) gets.push(get);
    }
    settlements?.map((st)=>{
      console.log(st);
    })
    return settlements;
};

module.exports = settleDebts;

