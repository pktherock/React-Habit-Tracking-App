import { Link } from "react-router-dom";
import { Bars3Icon, XMarkIcon, HashtagIcon } from "@heroicons/react/24/solid";

import { useEffect, useState } from "react";

function Header() {
  const [time, setTime] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const timerId = setInterval(() => {
      const date = new Date();
      let hour = date.getHours();
      let minutes = date.getMinutes();
      const cycle = hour > 12 ? "PM" : "AM";

      hour = hour > 12 ? hour - 12 : hour;
      hour = hour < 10 ? `0${hour}` : hour;
      minutes = minutes < 10 ? `0${minutes}` : minutes;

      const formattedTime = `${hour}:${minutes} ${cycle}`;
      setTime(formattedTime);
    }, 1000);

    return () => clearInterval(timerId);
  }, []);

  return (
    <div className="w-full bg-white sticky top-0 shadow-lg">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 sm:px-6 lg:px-8">
        <div className="inline-flex items-center space-x-2">
          <span>
            <Link to="/">
              <HashtagIcon className="h-6 w-6 cursor-pointer" />
            </Link>
          </span>
          <span className="font-bold">React Habit Tracker app</span>
        </div>
        <span className="text-xl font-semibold text-yellow-800">{time}</span>
        <div className="space-x-4 items-center hidden lg:inline-flex">
          Coding ninjas Skill Test 2
        </div>

        <div className="lg:hidden">
          <Bars3Icon onClick={toggleMenu} className="h-6 w-6 cursor-pointer" />
        </div>
        {isMenuOpen && (
          <div className="absolute inset-x-0 top-0 z-50 origin-top-right transform p-2 transition lg:hidden">
            <div className="divide-y-2 divide-gray-50 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
              <div className="px-5 pb-6 pt-5">
                <div className="flex items-center justify-between">
                  <div className="inline-flex items-center space-x-2">
                    <span>
                      <Link to="/">
                        <HashtagIcon className="h-6 w-6 cursor-pointer" />
                      </Link>
                    </span>
                    <span className="font-bold">React Habit Tracker app</span>
                  </div>
                  <div className="-mr-2">
                    <button
                      type="button"
                      onClick={toggleMenu}
                      className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                    >
                      <span className="sr-only">Close menu</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
