"use client";

import { Suspense, useState } from "react";
import Loading from "@/app/(dashboard)/loading";
import { User } from "@prisma/client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeSwitch from "../navbar/ThemeSwitch";
import Image from "next/image";
import imglogo from "../../../public/images/logo.png"
import { 
  FaHome, 
  FaSeedling, 
  FaUsers, 
  FaStore, 
  FaRobot, 
  FaCamera
} from "react-icons/fa";
import { Leaf } from "lucide-react";

export default function HomeLayout({
  children,
  currentUser,
}: {
  children: React.ReactNode;
  currentUser: User;
}) {
  const [menu, setMenu] = useState<boolean>(true);
  const items = [
    { name: "Home", icon: <FaHome />, path: "/" },
    { name: "Food Analysis", icon: <FaSeedling />, path: "/crops" },
    {name:"Daily Goals ",icon:<FaCamera/>,path:"/dailygoals"},
    { name: "Diet Recommendations", icon: <FaStore />, path: "/dietrecomm" },
    { name: "Food Alternate", icon: <FaStore />, path: "/foodAnalysis" },

    { name: "Chat-Bot", icon: <FaRobot />, path: "/chat-bot" },
    
  ];
  const pathname = usePathname();

  return (
    <div className="w-full min-h-screen bg-gray-100 transition-all">
      {/* Navigation */}
      <nav className="flex items-center justify-between p-3 px-4 border-b shadow-md bg-white sticky top-0 z-50">
        <div className="flex items-center space-x-2 animate-fadeIn">
          <Image src={imglogo} className="w-8 h-8 text-green-600 transition-transform hover:scale-110" alt=""/>
                   <span className="text-xl font-bold text-gray-800">FoodMonito</span>
        </div>
        {/* <div className="hidden md:flex space-x-6 animate-slideIn">
          {items.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={`text-gray-600 transition duration-300 ease-in-out hover:text-green-600 ${
                pathname === item.path ? "text-green-600 font-bold scale-105" : ""
              }`}
            >
              <span className="flex items-center space-x-1">
                {item.icon}
                <span>{item.name}</span>
              </span>
            </Link>
          ))}
        </div> */}
        <div className="flex gap-4 items-center">
          {!currentUser && (
            <Link href="/signin" className="text-gray-600 hover:text-green-600 transition-all">
              Login
            </Link>
          )}
          <ThemeSwitch />
          
        </div>
      </nav>

      <div className="flex">
        {/* Sidebar */}
        <div
          className={`bg-white shadow-lg w-60 px-4 transition-transform fixed h-full z-50 ${
            menu ? "translate-x-0" : "-translate-x-64"
          } ease-in-out duration-300 transform`}
        >
          {/* <button
            onClick={() => setMenu(!menu)}
            className="text-green-600 hover:text-green-700 transition-colors"
          >
            {menu ? "Close Sidebar" : "Open Sidebar"}
          </button> */}
          <ul className="mt-4 space-y-4 animate-slideIn">
            {items.map((item) => (
              <li key={item.path}>
                <Link
                  href={item.path}
                  className={`block p-2 rounded-md transition-all ${
                    pathname === item.path
                      ? "bg-green-100 text-green-600 font-semibold"
                      : "text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  <span className="flex items-center space-x-2">
                    {item.icon}
                    <span>{item.name}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <Suspense fallback={<Loading />}>
          <div className="flex-grow transition-all ps-60">
            <div className="bg-white shadow-md">
              {children}
          </div>
          </div>
        </Suspense>
      </div>
    </div>
  );
}
