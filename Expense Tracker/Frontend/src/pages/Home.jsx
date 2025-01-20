import React from "react";

const Home = () => {
  return (
    <>
      <section className="home p-2 h-full w-full flex items-center justify-between overflow-hidden">
        <aside className="w-full h-full bg-white flex flex-col gap-2">
          <div className="transaction chart min-h-3/5 h-3/5 w-full relative bg-white">
            <h1 className="text-xl p-2 font-semibold opacity-80">
              All Transactions
            </h1>
          </div>
          <div className="w-full h-[40%] flex flex-wrap items-center justify-center gap-5">
            <article className="px-5 w-44 py-3 bg-emerald-100 rounded-md text-center">
              <h3 className="font-semibold text-green-500 my-1 text-lg">
                Total Income
              </h3>
              <p className="text-xl font-bold opacity-75">17,700</p>
            </article>
            <article className="px-5 w-44 py-3 bg-rose-100 rounded-md text-center">
              <h3 className="font-semibold text-red-500 my-1 text-lg">
                Total Expenses
              </h3>
              <p className="text-xl font-bold opacity-75">1700</p>
            </article>
            <article className="px-5 w-44 py-3 bg-zinc-200 rounded-md text-center">
              <h3 className="font-semibold my-1 text-lg text-gray-600">
                Total Balance
              </h3>
              <p className="text-xl font-bold opacity-75">+16,000</p>
            </article>
          </div>
        </aside>
        <aside className="w-[60%] h-full bg-white flex flex-col gap-5 px-3">
          <div>
            <h1 className="text-xl p-2 font-semibold opacity-80">
              Recent Transactions
            </h1>
            <div className="w-full h-fit px-2 flex flex-col gap-2">
              <span className=" w-full py-2 px-2 bg-zinc-300/10 text-red-500 flex rounded-xl items-center justify-between">
                <h5>Rent</h5>
                <p>-10000</p>
              </span>
              <span className="w-full py-2 px-2 bg-zinc-300/10 text-green-500 flex rounded-xl items-center justify-between">
                <h5>Bitcoin</h5>
                <p>+8000</p>
              </span>
              <span className="w-full py-2 px-2 bg-zinc-300/10 text-red-500 flex rounded-xl items-center justify-between">
                <h5>Dentist Appointment</h5>
                <p>-3000</p>
              </span>
              <span className="w-full py-2 px-2 bg-zinc-300/10 text-red-500 flex rounded-xl items-center justify-between">
                <h5>Mobile Recharge</h5>
                <p>-860</p>
              </span>
            </div>
          </div>
          <div className="p-2">
            <article className="bg-emerald-200/40 py-4 px-3 rounded-md">
              <span className="mb-2 px-2 flex w-full items-center justify-between">
                <h4>Min</h4>
                <h3 className="text-xl font-semibold">Income</h3>
                <h4>Max</h4>
              </span>
              <span className="flex bg-green-300/40 px-2 rounded-lg py-1 w-full items-center justify-between">
                <h4>1200</h4>
                <h4>8000</h4>
              </span>
            </article>
            <article className="mt-7 bg-rose-200/40 py-4 px-3 rounded-md">
              <span className="mb-2 px-2 flex w-full items-center justify-between">
                <h4>Min</h4>
                <h3 className="text-xl font-semibold">Expense</h3>
                <h4>Max</h4>
              </span>
              <span className="flex bg-red-300/40 px-2 rounded-lg py-1 w-full items-center justify-between">
                <h4>800</h4>
                <h4>10000</h4>
              </span>
            </article>
          </div>
        </aside>
      </section>
    </>
  );
};

export default Home;
