import React from "react";
import { ReactComponent as More } from "../assets/icons/more.svg";
import { ReactComponent as People } from "../assets/icons/people.svg";
import { ReactComponent as Files } from "../assets/icons/files.svg";
import "./style.css";

const Card = ({ hr_img, hr_name, job, job_type, status }) => {
  let resized;
  if (job_type?.length > 28) {
    resized = `${job_type.substring(0, 28)}...`;
  } else {
    resized = job_type;
  }

  return (
    <div className="card_wrap">
      <div className="card_header">
        <div className="card_header-title_wrap">
          <div className="card_header-title">{job}</div>
          <div className="card_header-subtitle">{resized}</div>
        </div>
        <More id="icon" />
      </div>
      <div className="card_middle">
        <div className="card_status">{status}</div>
        <div className="card_statistic">
          <People />
          <span>3</span>
        </div>
        <div className="card_statistic">
          <Files />
          <span>255</span>
        </div>
      </div>
      <div className="card_footer">
        <div className="card_hr-img">
          <img width={28} src={hr_img} alt="hr" />
        </div>
        <div className="hr_info">
          <div className="hr_job">Рекруитер</div>
          <div className="hr_name">{hr_name}</div>
        </div>
      </div>
    </div>
  );
};

export default Card;
