import React, { useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useGetSignedUserQuery } from "../../store/api/userApi";
import dummyImg from "../../assets/images/dummy.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleUser,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import LogoutModal from "../modals/Logout";

const user = {
  name: "Tom Cook",
  email: "tom@example.com",
  imageUrl:
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
};

const Navbar = () => {
  const navigate = useNavigate();
  const { data: signedUser } = useGetSignedUserQuery();
  const [LogoutOpen, setLogouOpen] = useState(false);
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);

  const handleLogouOpen = () => {
    // Open the logout confirmation modal first
    setLogoutModalOpen(true);
  };

  const handleLogouClose = () => {
    // Close both modals
    setLogouOpen(false);
    setLogoutModalOpen(false);
  };

  return (
    <div className="fixed z-50 flex items-center justify-between w-full h-16 bg-white border-b-2">
      <div className="flex items-center">
        <div className="relative">
          <div className="flex items-baseline ml-10 space-x-4">
            <Link to="/home/dashboard" className="flex items-center">
              <p className="text-3xl font-bold text-blue-500">Medi</p>
              <p className="text-3xl font-bold text-black">sense</p>
            </Link>

            {/* Add other navigation links here */}
          </div>
        </div>
      </div>
      <div className="relative mr-16">
        <div className="flex items-center ml-4">
          {/* Profile dropdown */}
          <Menu as="div" className="relative ml-3">
            <div>
              <Menu.Button className="relative flex items-center max-w-xs text-sm rounded-full focus:outline-none">
                <span className="absolute -inset-1.5" />
                <span className="sr-only">Open user menu</span>
                {/* <img
                  className="w-10 h-10 rounded-full"
                  src={user.imageUrl}
                  alt=""
                /> */}
                <img
                  src={
                    signedUser?.payload?.image
                      ? `http://localhost:3002/${signedUser?.payload?.image}`
                      : dummyImg
                  }
                  alt="Patient"
                  className="w-10 h-10 rounded-full"
                />
                <p className="ml-5 text-xl font-bold text-black">
                  {signedUser?.payload?.firstName}
                </p>
              </Menu.Button>
            </div>
            <Transition
              as={Transition.Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute z-50 w-40 py-1 mt-2 origin-top-right bg-white rounded-md shadow-md ring-1 ring-black ring-opacity-5 focus:outline-none">
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      to="#"
                      className={`${
                        active ? "bg-gray-100" : ""
                      } block px-4 py-2 text-sm text-gray-700`}
                    >
                      <FontAwesomeIcon icon={faCircleUser} className="mr-2" />
                      Your Profile
                    </Link>
                  )}
                </Menu.Item>

                <Menu.Item>
                  {({ active }) => (
                    <Link
                      onClick={handleLogouOpen}
                      className={`${
                        active ? "bg-gray-100" : ""
                      } block px-4 py-2 text-sm text-gray-700`}
                    >
                      <FontAwesomeIcon
                        icon={faRightFromBracket}
                        className="mr-2"
                      />
                      Sign out
                    </Link>
                  )}
                </Menu.Item>
              </Menu.Items>
            </Transition>
          </Menu>
          <LogoutModal open={logoutModalOpen} handleClose={handleLogouClose} />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
