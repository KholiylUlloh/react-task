import React from "react";
import Body from "./components/Body/body";
import Navbar from "./components/Navbar/navbar";
import Sidebar from "./components/Sidebar/sidebar";

const App = () => {
  return (
    <div>
      <Navbar />
      <div className="wrapper">
        <Sidebar />
        <Body />
      </div>
    </div>
  );
};

export default App;
