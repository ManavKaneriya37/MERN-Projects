const Home = () => {
  return (
    <>
      <div className="flex items-center justify-center min-h-screen p-20 bg-neutral-50">
        <div className="flex text-center flex-col items-center">
          <h1 className="md:text-3xl text-2xl font-semibold">
            Welcome to Our Real-Time Chat Application!
          </h1>
          <p className="md:text-lg mt-3 opacity-80">
            Connect with friends and family in real-time, share messages, and
            enjoy seamless communication!
          </p>
          <div className="line w-full h-px bg-black/20 mt-10 "></div>
          <section className="w-full h-full md:flex items-center justify-between">
            <div className="flex flex-col items-center justify-center gap-3">
              <div className="text-xl opacity-80">Join a room</div>
              <input
                type="text"
                className="border border-gray-600 focus:bg-gray-200/50 outline-none rounded px-2 py-2 md:w-[22vw]"
                placeholder="Enter room key"
              />
              <button className="bg-indigo-500 mt-5 select-none hover:bg-indigo-600 duration-150 cursor-pointer w-full text-white font-semibold py-2 rounded">
                Join
              </button>
            </div>
            <div className="line md:w-px md:h-60 my-5 opacity-30 text-xl block content-center text-center w-full">OR</div>
            <div className="flex flex-col md:gap-7 gap-2 items-center mt-5">
              <h1 className="text-lg opacity-80">Create a new your own room!</h1>
              <button className="bg-indigo-500 select-none hover:bg-indigo-600 duration-150 cursor-pointer w-full px-8 text-white font-semibold py-2 rounded">
                Create a room
              </button>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default Home;
