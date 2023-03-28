import React from "react";
import addfiles from "../assets/images/AddFiles.png";
import { ReactComponent as Dot } from "../assets/icons/dot1.svg";
import "./style.css";

const Nodata = ({ title }) => {
  return (
    <div className="nodata_wrap">
      <div className="list_header">
        <span>{title}</span>
        <Dot />
        <span>0</span>
      </div>
      <div className="nodata_body">
        <img src={addfiles} alt="addfiles" />
        Если есть подходящие заявки, перетащите их сюда 🤓
      </div>
    </div>
  );
};

export default Nodata;
