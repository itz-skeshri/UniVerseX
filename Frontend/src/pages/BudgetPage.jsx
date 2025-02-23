import React, { useState } from "react";
import { FiTrash } from "react-icons/fi";

const BudgetTracker = () => {
  const [balance, setBalance] = useState(5000);
  const [transactions, setTransactions] = useState([
    { id: 1, type: "credit", amount: 1000, description: "Freelance Payment" },
    { id: 2, type: "debit", amount: 500, description: "Groceries" },
    { id: 3, type: "debit", amount: 200, description: "Coffee" },
  ]);

  const [formData, setFormData] = useState({
    amount: "",
    description: "",
    type: "credit",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddTransaction = () => {
    const { amount, description, type } = formData;
    if (!amount || amount <= 0 || !description) {
      setErrorMessage("Please enter a valid amount and description.");
      return;
    }
    setErrorMessage("");

    const newTransaction = {
      id: transactions.length + 1,
      type,
      amount: Number(amount),
      description,
    };

    setTransactions([newTransaction, ...transactions]);
    setBalance((prevBalance) =>
      type === "credit"
        ? prevBalance + Number(amount)
        : prevBalance - Number(amount)
    );
    setFormData({ amount: "", description: "", type: "credit" });
  };

  const handleDeleteTransaction = (id, type, amount) => {
    setTransactions(
      transactions.filter((transaction) => transaction.id !== id)
    );
    setBalance((prevBalance) =>
      type === "credit" ? prevBalance - amount : prevBalance + amount
    );
  };

  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-cover bg-no-repeat bg-[url('https://images.pexels.com/photos/6610201/pexels-photo-6610201.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')]">
      <div className="w-full max-w-md mx-auto border border-gray-300 rounded-lg p-5 my-10 bg-white shadow-lg">
        <h2 className="text-2xl font-bold text-blue-600 text-center">
          Budget Tracker
        </h2>
        <h3 className="text-xl text-center mt-2">
          Available Balance:{" "}
          <span className="font-semibold text-gray-800">₹{balance}</span>
        </h3>

        <div className="mt-6">
          <h3 className="text-lg font-semibold">Add Transaction</h3>
          {errorMessage && (
            <p className="text-red-500 text-sm">{errorMessage}</p>
          )}
          <input
            type="number"
            name="amount"
            placeholder="Amount"
            value={formData.amount}
            onChange={handleChange}
            className="input input-bordered w-full mt-2"
          />
          <input
            type="text"
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            className="input input-bordered w-full mt-2"
          />
          <select
            name="type"
            className="select select-bordered w-full mt-2"
            value={formData.type}
            onChange={handleChange}
          >
            <option value="credit">Credit (Income)</option>
            <option value="debit">Debit (Expense)</option>
          </select>
          <button
            onClick={handleAddTransaction}
            className="btn btn-primary w-full mt-4"
          >
            Add Transaction
          </button>
        </div>

        <h3 className="text-lg font-semibold mt-6">Transaction History</h3>
        <div className="mt-2 space-y-2">
          {transactions.length === 0 ? (
            <p className="text-gray-500">No transactions yet.</p>
          ) : (
            <div className="space-y-2">
              {transactions.map(({ id, type, amount, description }) => (
                <div
                  key={id}
                  className={`p-3 rounded-lg flex justify-between items-center shadow-md ${type === "credit" ? "bg-green-100" : "bg-red-100"}`}
                >
                  <div className="flex-1 overflow-hidden">
                    <span className="block font-semibold truncate">
                      {description}
                    </span>
                  </div>
                  <span
                    className={`w-24 text-right ${type === "credit" ? "text-green-600" : "text-red-600"}`}
                  >
                    {type === "credit" ? "+" : "-"}₹{amount}
                  </span>
                  <button
                    onClick={() => handleDeleteTransaction(id, type, amount)}
                    className="btn btn-sm btn-error ml-4 rounded-full"
                  >
                    <FiTrash size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BudgetTracker;
