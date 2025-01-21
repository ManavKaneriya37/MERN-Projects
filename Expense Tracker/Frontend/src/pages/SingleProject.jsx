import React, { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const SingleProject = () => {
  const location = useLocation();
  const project = location.state.project;
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const sortOptionsRef = useRef(null);

  useEffect(() => {
    axios.post(
        "/api/incomes/get-incomes",
        { projectId: project._id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        if (res.data.statusCode === 200) {
          setIncomes(res.data.store);
        }
      })
      .catch((err) => {
        console.error(err);
      });

    axios.post(
      "/api/expenses/get-expenses",
      { projectId: project._id },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    )
    .then((res) => {
      if (res.data.statusCode === 200) {
        setExpenses(res.data.store);
      }
    })
    .catch((err) => {
      console.error(err);
    });

    axios.post("/api/incomes/get-total", { projectId: project._id }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then((res) => {
      if (res.data.statusCode === 200) {
        setTotalIncome(res.data.store);
      }
    })
    .catch((err) => {
      console.error(err);
    });

    axios.post("/api/expenses/get-total", { projectId: project._id }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then((res) => {
      if (res.data.statusCode === 200) {
        setTotalExpense(res.data.store);
      }
    })
    .catch((err) => {
      console.error(err);
    });
  }, []);


  return (
    <div className="home p-5 h-full w-full overflow-hidden overflow-y-auto relative">
      <div className="flex items-center justify-between px-7">
        <h1 className="text-2xl font-bold">{project.name}</h1>
        <button className="bg-zinc-600 text-white p-1 px-6 rounded-lg hover:bg-gray-500 ease-in duration-100">
          Edit
        </button>
      </div>
      <section className="w-full h-fit flex gap-3 items-center justify-between mt-3">
        <div className="relative overflow-hidden h-28 flex-grow px-4 py-3 bg-emerald-100 rounded-lg">
          <h1 className="text-xl font-semibold text-center">Incomes</h1>
          <div className="h-full w-full flex items-center text-3xl justify-center relative text-green-500">
            {totalIncome}
          </div>
        </div>
        <div className="h-28 flex-grow px-4 py-3 bg-rose-100 rounded-lg">
          <h1 className="text-xl font-semibold text-center">Expenses</h1>
          <div className="h-full w-full flex items-center text-3xl justify-center relative text-red-500">
            {totalExpense}
          </div>
        </div>
        <div className="h-28 flex-grow px-4 py-3 bg-gray-100 rounded-lg">
          <h1 className="text-xl font-semibold text-center">Balance</h1>
          <div className="h-full w-full flex items-center text-3xl justify-center relative text-gray-500">
            {totalIncome - totalExpense}
          </div>
        </div>
      </section>
      {project.budget !== 0 && (
        <span className="flex justify-end px-5 my-2">
          <p>Budget: {project.budget}</p>
        </span>
      )}
      <div className="mt-6">
        <h1 className="text-lg">Recent Transactions</h1>
        <div className="flex items-start gap-10 w-full h-fit py-3">
          <div className="w-1/2 h-full">
            <article className="w-full flex flex-col gap-3 justify-between">
              {expenses &&
                expenses.map((expense) => (
                  <div className="w-full flex items-center gap-10 justify-between bg-red-200 rounded-md px-2 py-1">
                    <p>{expense.tag}</p>
                    <p>{expense?.category}</p>
                    <p>₹{expense.amount}</p>
                  </div>
                ))}
            </article>
          </div>
          <div className="w-1/2 h-full">
            <article className="w-full flex flex-col gap-3 justify-between">
              {incomes &&
                incomes.map((income) => (
                  <div className="w-full flex gap-10 items-center justify-between bg-green-200 rounded-md px-2 py-1">
                    <p>{income.tag}</p>
                    <p>{income?.category}</p>
                    <p>₹{income.amount}</p>
                  </div>
                ))}
            </article>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProject;
