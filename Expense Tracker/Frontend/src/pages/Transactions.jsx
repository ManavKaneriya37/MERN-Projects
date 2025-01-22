import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import {useGSAP} from "@gsap/react";

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [transactionMenu, setTransactionMenu] = useState(false);

  useGSAP(
    function () {
      if (transactionMenu) {
        gsap.fromTo(
          panelRef.current,
          { opacity: 0, right: 0 },
          { opacity: 1, right: "45px", duration: 0.2, scrub: true }
        );
      }
    },
    [transactionMenu]
  );

  const panelRef = useRef();

  useEffect(() => {
    axios
      .post(
        "/api/users/transactoins/general",
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((response) => {
        setTransactions(response.data.store);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handelTransactionDelete = (transaction) => {
    axios.post(`/api/${transaction.type}s/delete`, {
      id: transaction._id,
    }
    )
    .then((response) => {
      if(response.data.statusCode === 200) {
        setTransactions(transactions.filter((t) => t._id !== transaction._id));
      }
    })
    .catch((error) => {
      console.error(error);
    }
    );
  }
  
  return (
    <div className="home p-5 h-full w-full overflow-hidden relative">
      <h1 className="text-xl">All General Transactions</h1>
      <div className="flex flex-col w-full gap-3 mt-6"> 
      {
        transactions && transactions.map((transaction) => (
          <div className={`bg-gray-100/50 w-full relative flex items-center justify-between px-5 py-2 rounded`}> 
            <div className={`${transaction.type == 'income' ? 'text-emerald-400' : 'text-red-400'} w-1/4`}>{transaction.tag}</div>
            <div className="text-center opacity-60 text-gray-500">{transaction.date.split('T')[0]}</div>
            <div className={`${transaction.type == 'income' ? 'text-emerald-400' : 'text-red-400'} flex itmes-center gap-3`}><div className="">{transaction.amount}</div> <i onClick={() =>
                    setTransactionMenu(
                      transactionMenu === transaction._id ? null : transaction._id
                    )
                  } className="text-black cursor-pointer px-2 ri-more-2-fill"></i> </div>
              {transactionMenu === transaction._id && (
                <div
                ref={panelRef}
                className="absolute opacity-0 right-8 top-3"
              >
                <ul className="z-10 relative bg-white rounded-md p-2">
                  <li onClick={() => handelTransactionDelete(transaction)} className="hover:bg-neutral-100/60 cursor-pointer p-2 px-4 text-sm shadow-sm flex items-center gap-2 ">
                    <i className="ri-delete-bin-7-line"></i>
                    <p>Delete</p>
                  </li>
                </ul>
              </div> 
              )}
          </div>
        ))
      }
      </div>
    </div>
  );
};

export default Transactions;
