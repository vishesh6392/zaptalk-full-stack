import React, { useEffect } from "react";
import { useState } from "react";
import { BiLogOutCircle, BiSearch } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { IoIosSearch } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { serverUrl } from "../main";
import {
  setOtherUserData,
  setSearchData,
  setSelectUser,
  setUserData,
} from "../redux/user.slice";

function SideBar() {
  const { userData, otherUserData, selectUser, onlineUsers, searchData } =
    useSelector((state) => state.user);
  let [Search, setSearch] = useState(false);
  let [input, setInput] = useState("");
  const Dispatch = useDispatch();
  const Navigate = useNavigate();
  const handleLogogout = async () => {
    try {
      let result = await axios.get(`${serverUrl}/auth/logout`, {
        withCredentials: true,
      });
      console.log(result);
      console.log("logout");
      Dispatch(setUserData(null));
      Dispatch(setOtherUserData(null));

      Navigate("/login");
    } catch (error) {
      console.log(error, "sideBar error");
    }
  };
  const handleSearch = async () => {
    try {
      let result = await axios.get(`${serverUrl}/user/search?query=${input}`, {
        withCredentials: true,
      });
      console.log(result.data);
      Dispatch(setSearchData(result.data));
    } catch (error) {
      console.log(error, "sideBar error");
    }
  };
  useEffect(() => {
    if (input) {
      handleSearch();
    }
  }, [input]);

  return (
    <div
      className={`lg:w-[30%] w-full h-full bg-slate-100 flex flex-col lg:block ${
        !selectUser ? "block" : "hidden"
      }`}
    >
      {/* Header section */}
      <div
        className="w-[40px] h-[40px] rounded-full overflow-hidden flex justify-center items-center
          shadow-gray-500 shadow-lg fixed bottom-[20px] left-[10px] bg-[#0ea5e9] cursor-pointer hover:bg-[#20c7ff]"
        onClick={handleLogogout}
      >
        <BiLogOutCircle className="w-[25px] h-[25]" />
      </div>

      <div className="w-full h-[260px] bg-gradient-to-br from-[#20c7ff] to-[#0ea5e9] rounded-b-[40%] shadow-xl p-6">
        <div className="flex items-center gap-4 p-5">
          <a href="/profile">
            <img
              src={
                userData.image ? userData.image : "https://i.pravatar.cc/100"
              }
              alt="User"
              className="w-14 h-14 rounded-full border-2 border-white shadow-gray-400 shadow-lg object-cover"
            />
          </a>
          <div className="text-white">
            <h2 className="font-bold text-lg">
              {userData.name ? userData.name : "John Doe"}
            </h2>
            <p className="text-sm text-white/80">Online</p>
          </div>
        </div>

        {/* Search bar */}
        <div className="w-full flex  items-center gap-[20px] ">
          {!Search && (
            <div
              className=" w-[60px] h-[60px]  rounded-full overflow-hidden flex justify-center items-center bg-white shadow-gray-500 shadow-lg"
              onClick={() => setSearch(true)}
            >
              <IoIosSearch className="w-[30px] h-[30px]" />
            </div>
          )}

          {Search && (
            <form className="w-[100%] h-[45px] bg-white shadow-gray-500 shadow-lg rounded-full flex items-center gap-[10px]  overflow-hidden px-[20px]">
              <IoIosSearch className="w-[20px] h-[20px] cursor-pointer" />
              <input
                onChange={(e) => setInput(e.target.value)}
                value={input}
                onSubmit={handleSearch}
                className="rounded-lg w-full h-full p-[10px] bg-white outline-none"
                type="text"
                placeholder="search Users...."
              />
              <RxCross2
                className=" w-[20px] h-[20px] cursor-pointer hover:text-red-500"
                onClick={() => setSearch(false)}
              />
            </form>
          )}
          <div>
            {otherUserData?.map(
              (user) =>
                onlineUsers.includes(user._id) &&
                !Search && (
                  <div className="relative   inline-block  rounded-full shadow-gray-500 shadow-lg mr-2 ">
                    <div className="w-[60px] h-[60px]  rounded-full overflow-hidden  bg-white">
                      <img
                        src={
                          user.image ? user.image : "https://i.pravatar.cc/100"
                        }
                        alt={otherUserData.name}
                        className="w-full h-full rounded-full boader-
             border-indigo-600 object-cover shadow-md"
                      />
                    </div>
                    <span className="w-[12px] h-[12px] rounded-full right-[5px] bottom-[3px] bg-green-400 absolute shadow-sm shadow-gray-400"></span>
                  </div>
                )
            )}
          </div>
        </div>
      </div>

      {/* Online Users */}
      <div className="p-4 flex-1 overflow-y-auto">
        <h3 className="text-gray-600 font-semibold mb-3">Online Users</h3>
        <div className="space-y-3">
          {otherUserData?.map((user) => (
            <div
              onClick={() => Dispatch(setSelectUser(user))}
              className="flex items-center gap-4 bg-white p-3 rounded-xl shadow hover:bg-blue-100 cursor-pointer"
            >
              <img
                src={user.image ? user.image : "https://i.pravatar.cc/100"}
                alt={user.name}
                className="w-10 h-10 rounded-full"
              />
              <div>
                <p className="font-medium">
                  {user.name ? user.name : "John Doe"}
                </p>
                {onlineUsers.includes(user._id) ? (
                  <p className="text-sm text-green-600">Online</p>
                ) : (
                  <p className="text-sm text-red-600">Offline</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div
        className={`absolute top-[260px] left-1/2 -translate-x-1/2 w-full max-w-md bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 ease-in-out z-20
          ${
            Search && input.length > 0
              ? "max-h-96 opacity-100"
              : "max-h-0 opacity-0"
          }`}
      >
        {input.length > 0
          ? searchData?.map((user) => (
              <div
                key={user._id}
                onClick={() => {
                  Dispatch(setSelectUser(user));
                  setSearch(false);
                  setSearchData("");
                }}
                className="flex items-center p-4 border-b border-gray-200 last:border-b-0 cursor-pointer hover:bg-gray-50"
              >
                <div className="relative w-12 h-12 rounded-full overflow-hidden mr-3">
                  <img
                    src={user.image}
                    alt={user.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src =
                        "https://placehold.co/150x150/cccccc/333333?text=User";
                    }}
                  />
                  {onlineUsers.includes(user._id) && (
                    <span className="absolute bottom-0 right-0 block w-3 h-3 bg-green-500 rounded-full ring-2 ring-white"></span>
                  )}
                </div>
                <div className="flex-grow">
                  <p className="text-lg font-medium text-gray-800">
                    {user.name}
                  </p>
                  <p
                    className={`text-sm ${
                      onlineUsers.includes(user._id)
                        ? "text-green-600"
                        : "text-red-500"
                    }`}
                  >
                    {onlineUsers.includes(user._id) ? "Online" : "Offline"}
                  </p>
                </div>
              </div>
            ))
          : Search &&
            input.length > 0 && (
              <p className="p-4 text-gray-500 text-center">No users found.</p>
            )}
      </div>
    </div>
  );
}

export default SideBar;
