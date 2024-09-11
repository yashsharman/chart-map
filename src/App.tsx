import { useState } from "react";
import "./App.css";
import Contact from "./components/Contact";
import { useAppSelector } from "./redux/hooks";
import ChartNMap from "./components/ChartNMap";

function App() {
  const [activeTab, setActiveTab] = useState("Contact Page");
  const contact = useAppSelector((state) => state.contacts);
  console.log(contact);

  return (
    <>
      <div className=" w-[100vw] h-[100vh] flex flex-col">
        <div className="topbar w-full h-[4rem] bg-blue-900 text-white flex items-center justify-center font-bold text-2xl">
          {activeTab}
        </div>
        <div className="flex-1 flex md:flex-row flex-col">
          <div className="sideBar md:w-[10rem] w-full  bg-white text-black flex md:flex-col flex-row font-semibold">
            <div
              className={`tab  md:w-full w-1/2 cursor-pointer p-4 ${
                activeTab === "Contact Page" ? "bg-blue-400 text-white" : ""
              }`}
              onClick={() => setActiveTab("Contact Page")}
            >
              Contact
            </div>
            <div
              className={`tab md:w-full w-1/2 cursor-pointer p-4 ${
                activeTab !== "Contact Page" ? "bg-blue-400 text-white" : ""
              }`}
              onClick={() => setActiveTab("Charts and Maps")}
            >
              Charts and Maps
            </div>
          </div>
          {activeTab === "Contact Page" ? <Contact /> : <ChartNMap />}
        </div>
      </div>
    </>
  );
}

export default App;
