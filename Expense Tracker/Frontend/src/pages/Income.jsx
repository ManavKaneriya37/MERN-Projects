import React, { useEffect, useRef, useState, useContext } from "react";
import CreateTransactionModal from "../components/CreateTransactionModal";
import axios from "axios";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const Income = () => {
  const [user, setUser] = useState(null);
  const [incomes, setIncomes] = useState([]);
  const [incomesTotal, setIncomesTotal] = useState(0);
  const [incomeMenu, setIncomeMenu] = useState(false);
  const panelRef = useRef();

  useGSAP(
    function () {
      if (incomeMenu) {
        gsap.fromTo(
          panelRef.current,
          { opacity: 0, right: 0 },
          { opacity: 1, right: "45px", duration: 0.2, scrub: true }
        );
      }
    },
    [incomeMenu]
  );

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
        .post(
          "/api/incomes/user/get-incomes",
          {
            userId: user._id,
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
          console.log(error);
        });

      axios
        .post("/api/incomes/get-total", {
          userId: user._id,
        })
        .then((response) => {
          setIncomesTotal(response.data.store);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [user]);

  const handleIncomeDelete = (income) => {
    axios
      .post(`/api/incomes/delete`, {
        id: income._id,
      })
      .then((response) => {
        if (response.data.statusCode === 200) {
          setIncomes(incomes.filter((t) => t._id !== income._id));
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="home p-5 h-full w-full overflow-hidden overflow-y-auto relative">
      <CreateTransactionModal tag="income" />
      <div className="my-5">
        <h1 className="text-2xl text-center">Total Incomes</h1>
        <h1 className="text-3xl text-center text-emerald-500">
          ₹{incomesTotal || 0}
        </h1>
      </div>
      <div className="h-full relative">
        {incomes && incomes.length > 0 ? (
          incomes.map((income) => (
            <div
              className={`bg-gray-100/50 my-2 w-full text-emerald-500 relative flex items-center justify-between px-5 py-2 rounded`}
            >
              <div className="flex flex-col gap-2 w-1/4">
                {income?.project?.name && (
                  <div className="text-xs text-gray-600 opacity-80">{income?.project?.name}</div>
                )}
                <div>{income?.tag}</div>
              </div>

              <div className="text-center opacity-60 text-gray-500/70">
                {income?.date?.split("T")[0]}
              </div>
              <div className={`flex items-center gap-3`}>
                <div className="">₹{income.amount}</div>
                <i
                  onClick={() =>
                    setIncomeMenu(incomeMenu === income._id ? null : income._id)
                  }
                  className="text-black cursor-pointer px-2 ri-more-2-fill"
                ></i>
              </div>
              {incomeMenu === income._id && (
                <div
                  ref={panelRef}
                  className="absolute opacity-0 right-8 top-3"
                >
                  <ul className="z-10 relative bg-white rounded-md p-2">
                    <li
                      onClick={() => handleIncomeDelete(income)}
                      className="hover:bg-neutral-100/60 text-red-400 cursor-pointer p-2 px-4 text-sm shadow-sm flex items-center gap-2 "
                    >
                      <i className="ri-delete-bin-7-line"></i>
                      <p>Delete</p>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          ))
        ) : (
          <h1 className="text-center text-2xl">No incomes yet</h1>
        )}
      </div>
    </div>
  );
};

export default Income;
