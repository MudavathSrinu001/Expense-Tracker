import React, { useState } from "react";
import "./project.css";

const App = () => {
  const [totalAmount, setTotalAmount] = useState(0);
  const [balance, setBalance] = useState(0);
  const [expense, setExpense] = useState(0);
  const [tempAmount, setTempAmount] = useState("");
  const [userAmount, setUserAmount] = useState("");
  const [productTitle, setProductTitle] = useState("");
  const [error, setError] = useState({ budget: false, product: false });

  const [expenseList, setExpenseList] = useState([]);

  const handleTotalAmount = () => {
    const amount = parseFloat(tempAmount);
    if (isNaN(amount) || amount <= 0) {
      setError({ ...error, budget: true });
    } else {
      setError({ ...error, budget: false });
      setTotalAmount(amount);
      setBalance(amount - expense);
      setTempAmount("");
    }
  };

  const addExpense = () => {
    if (!productTitle || !userAmount) {
      setError({ ...error, product: true });
      return;
    }

    setError({ ...error, product: false });

    const expenseValue = parseFloat(userAmount);
    const updatedExpenseList = [
      ...expenseList,
      { title: productTitle, amount: expenseValue },
    ];

    setExpenseList(updatedExpenseList);
    setExpense(expense + expenseValue);
    setBalance(balance - expenseValue);
    setProductTitle("");
    setUserAmount("");
  };

  const modifyExpense = (index, edit = false) => {
    const expenseToModify = expenseList[index];
    if (edit) {
      setProductTitle(expenseToModify.title);
      setUserAmount(expenseToModify.amount);
    }

    setExpense(expense - expenseToModify.amount);
    setBalance(balance + expenseToModify.amount);
    setExpenseList(expenseList.filter((_, i) => i !== index));
  };

  return (
    <div className="wrapper">
      <h3>Expense Tracker</h3>
      <div className="container">
        <div className="total-amount-container">
          <input
            type="number"
            placeholder="Enter Total Amount"
            value={tempAmount}
            onChange={(e) => setTempAmount(e.target.value)}
          />
          <button className="submit" onClick={handleTotalAmount}>
            Set Budget
          </button>
          {error.budget && <p className="error">Please enter a valid budget.</p>}
        </div>
        <div className="output-container flex-space">
          <p>Total Budget: ₹{totalAmount}</p>
          <p>Expenses: ₹{expense}</p>
          <p>Balance: ₹{balance}</p>
        </div>
        <div className="user-amount-container">
          <input
            type="text"
            placeholder="Enter Product Name"
            value={productTitle}
            onChange={(e) => setProductTitle(e.target.value)}
          />
          <input
            type="number"
            placeholder="Enter Expense Amount"
            value={userAmount}
            onChange={(e) => setUserAmount(e.target.value)}
          />
          <button className="submit" onClick={addExpense}>
            Add Expense
          </button>
          {error.product && (
            <p className="error">Please fill in both fields.</p>
          )}
        </div>
        <div className="list">
          {expenseList.map((item, index) => (
            <div
              className="sublist-content flex-space"
              key={`${item.title}-${index}`}
            >
              <p className="product">{item.title}</p>
              <p className="amount">₹{item.amount}</p>
              <button
                className="edit"
                onClick={() => modifyExpense(index, true)}
              >
                Edit
              </button>
              <button
                className="delete"
                onClick={() => modifyExpense(index)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
