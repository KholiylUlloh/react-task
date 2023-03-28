import React, { useEffect, useState } from "react";
import { ReactComponent as Dot } from "../assets/icons/dot1.svg";
import Card from "../Card/card";
import "./style.css";

const List = ({ title, cards }) => {
  const [cardsPerList, setCardsPerList] = useState([]);
  useEffect(() => {
    let cardQuantityPerList = cards.filter((c) => c.define_id === title);
    setCardsPerList(cardQuantityPerList);
  }, [cards, title]);

  return (
    <div className="column_wrap">
      <div className="list_header">
        <span>{title}</span>
        <Dot />
        <span>{cardsPerList.length}</span>
      </div>
      <div className="list_wrap">
        <div className="list_cards-section">
          {cards?.map(({ id, hr_img, hr_name, job, job_type, status }) => {
            return (
              <Card
                key={id}
                hr_img={hr_img}
                hr_name={hr_name}
                job={job}
                job_type={job_type}
                status={status}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default List;
