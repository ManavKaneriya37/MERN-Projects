import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import {
  Chart,
  LineController,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

Chart.register(
  LineController,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const Home = () => {
  const myChart = useRef(null);
  const [chartInstance, setChartInstance] = useState(null);

  const [transactions, setTransactions] = useState([]);
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios
      .get("/api/users/current-user", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setUser(response.data.store);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    if (user) {
      axios
        .get("/api/users/transactions/all", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          setTransactions(response.data.store);
        })
        .catch((error) => {
          console.error(error);
        });

      axios
        .post(
          "/api/incomes/all/get-incomes",
          {
            userId: user?._id,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((response) => {
          setIncomes(response.data.store);
        })
        .catch((error) => {
          console.error(error);
        });

      axios
        .post(
          "/api/expenses/all/get-expenses",
          {
            userId: user?._id,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((response) => {
          setExpenses(response.data.store);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [user]);

  console.log(transactions);

  useEffect(() => {
    if (myChart.current && incomes.length > 0 && expenses.length > 0) {
      const incomeData = incomes.map((income) => income.amount);
      const expenseData = expenses.map((expense) => expense.amount);

      const incomeDate = incomes.map(
        (income) => income.createdAt.split("T")[0].split("-")[1]
      );
      const expenseDate = expenses.map(
        (expense) => expense.createdAt.split("T")[0].split("-")[1]
      );

      const labels = Array.from(
        new Set([...incomeDate, ...expenseDate])
      ).sort();

      if (chartInstance) {
        chartInstance.destroy();
      }

      const newChartInstance = new Chart(myChart.current, {
        type: "line",
        data: {
          labels: labels,
          datasets: [
            {
              label: "Income",
              data: labels.map((label) => {
                const index = incomeDate.indexOf(label);
                return index !== -1 ? incomeData[index] : 0;
              }),
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 1,
              fill: true,
            },
            {
              label: "Expense",
              data: labels.map((label) => {
                const index = expenseDate.indexOf(label);
                return index !== -1 ? expenseData[index] : 0;
              }),
              borderColor: "rgba(255, 99, 132, 1)",
              borderWidth: 1,
              fill: true,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
      setChartInstance(newChartInstance);
    }
  }, [incomes, expenses]);

  const minIncomeAmount = incomes.reduce(
    (min, item) => (item.amount < min ? item.amount : min),
    Infinity
  );
  const maxIncomeAmount = incomes.reduce(
    (max, item) => (item.amount > max ? item.amount : max),
    0
  );

  const minExpenseAmount = expenses.reduce(
    (min, item) => (item.amount < min ? item.amount : min),
    Infinity
  );
  const maxExpenseAmount = expenses.reduce(
    (max, item) => (item.amount > max ? item.amount : max),
    0
  );

  const totalIncome = incomes.reduce((total, item) => total + item.amount, 0);
  const totalExpense = expenses.reduce((total, item) => total + item.amount, 0);
  const totalBalance = totalIncome - totalExpense;

  return (
    <>
      <section className="home p-2 h-full w-full flex items-center justify-between overflow-hidden">
        <aside className="w-full h-full bg-white flex flex-col gap-2">
          <div className="transaction chart min-h-3/5 h-3/5 w-full relative bg-white">
            <h1 className="text-xl p-2 font-semibold opacity-80">
              All Transactions
            </h1>
            <div className="w-full relative">
              <canvas ref={myChart} id="acquisitions"></canvas>
            </div>
          </div>
          <div className="w-full h-[40%] flex flex-wrap items-center justify-center gap-5">
            <article className="px-5 w-44 py-3 bg-emerald-50 rounded-md text-center">
              <h3 className="font-semibold text-green-400 my-1 text-lg">
                Total Income
              </h3>
              <p className="text-xl font-bold opacity-75">{totalIncome}</p>
            </article>
            <article className="px-5 w-44 py-3 bg-rose-50 rounded-md text-center">
              <h3 className="font-semibold text-red-400 my-1 text-lg">
                Total Expenses
              </h3>
              <p className="text-xl font-bold opacity-75">{totalExpense}</p>
            </article>
            <article className="px-5 w-44 py-3 bg-zinc-100/70 rounded-md text-center">
              <h3 className="font-semibold my-1 text-lg text-gray-400">
                Total Balance
              </h3>
              <p className="text-xl font-bold opacity-75">
                {`${totalBalance > 0 ? "+" : ""}` + totalBalance}
              </p>
            </article>
          </div>
        </aside>
        <aside className="w-[60%] h-full bg-white flex flex-col gap-5 px-3">
          <div>
            <h1 className="text-xl p-2 font-semibold opacity-80">
              Recent Transactions
            </h1>
            {transactions.length > 0 ? (
              transactions.slice(0, 4).map((transaction, index) => (
                <div className="w-full h-fit px-2 flex flex-col gap-2 my-1">
                  <span
                    key={index}
                    className={`${
                      transaction.type === "income"
                        ? "text-emerald-500"
                        : "text-rose-500"
                    } w-full py-2 px-2 bg-zinc-300/10 flex rounded-xl items-center justify-between`}
                  >
                    <h5>{transaction?.tag}</h5>
                    <p>{`${transaction.type === "income" ? "+" : "-"}${
                      transaction.amount
                    }`}</p>
                  </span>
                </div>
              ))
            ) : (
              <p className="text-base text-gray-600 text-center">
                No transactions yet.
              </p>
            )}
          </div>
          <div className="p-2">
            <article className="bg-emerald-100/40 py-4 px-3 rounded-md">
              <span className="mb-2 px-2 flex w-full items-center justify-between">
                <h4>Min</h4>
                <h3 className="text-xl font-semibold">Income</h3>
                <h4>Max</h4>
              </span>
              <span className="flex bg-green-200/40 px-2 rounded-lg py-1 w-full items-center justify-between">
                <h4>{minIncomeAmount}</h4>
                <h4>{maxIncomeAmount}</h4>
              </span>
            </article>
            <article className="mt-7 bg-rose-100/40 py-4 px-3 rounded-md">
              <span className="mb-2 px-2 flex w-full items-center justify-between">
                <h4>Min</h4>
                <h3 className="text-xl font-semibold">Expense</h3>
                <h4>Max</h4>
              </span>
              <span className="flex bg-red-200/40 px-2 rounded-lg py-1 w-full items-center justify-between">
                <h4>{minExpenseAmount}</h4>
                <h4>{maxExpenseAmount}</h4>
              </span>
            </article>
          </div>
        </aside>
      </section>
    </>
  );
};

export default Home;
