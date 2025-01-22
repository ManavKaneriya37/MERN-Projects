import React, { useEffect, useRef, useState } from "react";
import CreateTransactoinModal from "../components/CreateTransactionModal";
import axios from "axios";


const Income = () => {

    useEffect(() => {
        
    }, [])
  
  return (
    <div className="home p-5 h-full w-full overflow-hidden relative">
      <CreateTransactoinModal tag="income" />
    </div>
  );
};

export default Income;
