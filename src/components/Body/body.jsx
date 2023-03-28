import React from "react";
import { ReactComponent as Dot } from "../assets/icons/dot.svg";
import List from "../List/list";
import Nodata from "../NoData/nodata";
import { data } from "../utils/data";
import "./style.css";

const Body = () => {
  const allCards = data
    .map(({ cards }) => cards.length)
    .reduce((p, n) => p + n);
  console.log(data.map((l) => l));

  return (
    <div className="body_wrap">
      <div className="body_header">
        <span className="title">Заявки</span>
        <Dot />
        <span className="amount">{allCards}</span>
      </div>
      <div className="lists_wrap">
        {data?.map(({ id, title, cards }, idx) => {
          if (!cards.length) {
            return <Nodata key={id} title={title} />;
          }
          return <List key={id} id={id} title={title} cards={cards} />;
        })}
      </div>
    </div>
  );
};

export default Body;
