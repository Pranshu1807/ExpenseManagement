import React from "react";
import "./analytics.css";
import { Progress } from "antd";
const Analytics = ({ allTransaction }) => {
  const categories = [
    "Salary",
    "Tip",
    "Project",
    "Food",
    "Movie",
    "Bills",
    "Medical",
    "Fee",
    "Other",
  ];
  const totalTransactions = allTransaction.length;
  const totalIncomeTransactions = allTransaction.filter(
    (transaction) => transaction.type === "Income"
  );
  const totalExpenseTransactions = allTransaction.filter(
    (transaction) => transaction.type === "Expense"
  );
  const totalIncomePercent =
    (totalIncomeTransactions.length / totalTransactions) * 100;
  const totalExpensePercent =
    (totalExpenseTransactions.length / totalTransactions) * 100;
  const totalTurnover = allTransaction.reduce(
    (accumulator, transaction) => accumulator + transaction.amount,
    0
  );
  const totalIncomeTurnover = totalIncomeTransactions.reduce(
    (accumulator, transaction) => accumulator + transaction.amount,
    0
  );
  const totalExpenseTurnover = totalExpenseTransactions.reduce(
    (accumulator, transaction) => accumulator + transaction.amount,
    0
  );
  const totalIncomeTurnoverPercent =
    (totalIncomeTurnover / totalTurnover) * 100;
  const totalExpenseTurnoverPercent =
    (totalExpenseTurnover / totalTurnover) * 100;
  return (
    <div className="AnalysisBody">
      <div className="TransactionsAnalysis">
        <div className="QuantitiyAnalysis">
          <div className="TotalTrn">
            <p>Total Transactions : {totalTransactions}</p>
          </div>
          <div className="IncomeExpense">
            <p className="grn">Income : {totalIncomeTransactions.length}</p>
            <p className="rd">Expense : {totalExpenseTransactions.length}</p>
            <div className="charts">
              <Progress
                type="circle"
                strokeColor={"green"}
                percent={totalIncomePercent.toFixed(0)}
                className="Chart"
              ></Progress>
              <Progress
                type="circle"
                strokeColor={"red"}
                percent={totalExpensePercent.toFixed(0)}
                className="Chart"
              ></Progress>
            </div>
          </div>
        </div>
        <div className="TurnoverAnalysis">
          <div className="TotalTrn">
            <p>Total Amount : {totalTurnover}</p>
          </div>
          <div className="IncomeExpense">
            <p className="grn">Income : {totalIncomeTurnover}</p>
            <p className="rd">Expense : {totalExpenseTurnover}</p>
            <div className="charts">
              <Progress
                type="circle"
                strokeColor={"green"}
                percent={totalIncomeTurnoverPercent.toFixed(0)}
                className="Chart"
              ></Progress>
              <Progress
                type="circle"
                strokeColor={"red"}
                percent={totalExpenseTurnoverPercent.toFixed(0)}
                className="Chart"
              ></Progress>
            </div>
          </div>
        </div>
      </div>
      <div className="categoryAnalysis">
        <div className="incomeCategory">
          <div className="categoryTitle">
            <h5>Categorywise Income</h5>
          </div>
          {categories.map((category) => {
            const required = allTransaction.filter(
              (transaction) =>
                transaction.type === "Income" &&
                transaction.category === category
            );
            const amount = required.reduce(
              (accumulator, transaction) => accumulator + transaction.amount,
              0
            );
            console.log(category, amount);
            return (
              amount > 0 && (
                <div className="CategoryCard">
                  <p>{category}</p>
                  <Progress
                    percent={((amount / totalIncomeTurnover) * 100).toFixed(0)}
                  ></Progress>
                </div>
              )
            );
          })}
        </div>
        <div className="expenseCategory">
          <div className="categoryTitle">
            <h5>Categorywise Expense</h5>
          </div>
          {categories.map((category) => {
            const required = allTransaction.filter(
              (transaction) =>
                transaction.type === "Expense" &&
                transaction.category === category
            );
            const amount = required.reduce(
              (accumulator, transaction) => accumulator + transaction.amount,
              0
            );
            console.log(category, amount);
            return (
              amount > 0 && (
                <div className="CategoryCard">
                  <p>{category}</p>
                  <Progress
                    percent={((amount / totalExpenseTurnover) * 100).toFixed(0)}
                  ></Progress>
                </div>
              )
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Analytics;
