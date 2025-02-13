import React from "react";
import "remixicon/fonts/remixicon.css";

const Room = () => {
  const [participantsModalOpen, setParticipantsModalOpen] =
    React.useState(false);

  return (
    <>
      <div className="room p-2 relative flex flex-col gap-2 items-center justify-between h-screen w-full">
        <header className="w-full h-[9vh] px-5 bg-neutral-100/20 shadow-xs flex items-center justify-between ">
          <div className="flex items-center h-full">
            <i
              onClick={() => setParticipantsModalOpen((prev) => !prev)}
              className="ri-menu-2-line text-xl p-1 px-2 cursor-pointer"
            ></i>
          </div>
          <div>
            <h1 className="font-semibold text-center">Chat Room</h1>
            <p className="text-[0.65rem] text-center opacity-40">
              <i className="ri-lock-password-line"></i> Encrypted by Room-Key
            </p>
          </div>
          <div>
            <h5 className="text-xs opacity-70 mb-1">Room Access-Key</h5>
            <p className="font-mono text-[0.85rem] w-full bg-neutral-100 py-1 px-1">
              asdf9012
            </p>
          </div>
        </header>
        <section className="conversation p-5 flex flex-col gap-2 items-start max-h-full h-full overflow-x-hidden overflow-y-auto bg-zinc-50 md:w-3/5 w-7/8">
          <div className="bg-white max-w-2/3 p-1 px-3 rounded">
            <h5 className="text-[0.65rem] opacity-60">Manav Kaneriya</h5>
            <p className="text-sm">Hello, how are you?</p>
          </div>
          <div className="bg-blue-400 ml-auto max-w-2/3 p-1 px-3 rounded-md">
            <h5 className="text-[0.65rem] opacity-60">Khush Dedakiya</h5>
            <p className="text-sm">
              Hello Manav!! How are you at this time. I am fine what about your
              situation with web
            </p>
          </div>
        </section>
        <div className="md:w-3/5 w-7/8 py-1 border-t-2 border-zinc-900/10 ">
          <div className="flex items-center gap-3 justify-between w-full rounded p-2 py-3">
            <input type="text" className="w-full bg-zinc-100 rounded p-2" />
            <button className="px-4 bg-indigo-500 py-2 rounded text-white cursor-pointer select-none">
              Send
            </button>
          </div>
        </div>
        { participantsModalOpen &&
          <aside>
            <div className="absolute top-0 left-0 bg-neutral-100 p-2 rounded-md md:w-[20vw] w-[45vw] h-screen">
              <div>
                <i
                  onClick={() => setParticipantsModalOpen((prev) => !prev)}
                  className="ri-close-large-fill m-2 cursor-pointer"
                ></i>
                <h1 className="text-2xl font-semibold ml-2 mt-2">
                  Participants
                </h1>
                <div className="line mt-3 w-full h-px bg-black/20"></div>
              </div>
              <div className="participants-list mt-2 px-1 flex flex-col overflow-x-hidden overflow-y-auto">
                <div className="w-full p-2 bg-white hover:bg-neutral-200 duration-100 ease-in rounded-md my-[0.3rem] text-sm">
                  Manav Kaneriya
                </div>
                <div className="w-full p-2 bg-white hover:bg-neutral-200 duration-100 ease-in rounded-md my-[0.3rem] text-sm">
                  Khush Dedakiya
                </div>
              </div>
            </div>
          </aside>
        }
      </div>
    </>
  );
};

export default Room;
