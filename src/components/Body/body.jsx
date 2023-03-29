import React, { useEffect, useRef, useState } from "react";
import { ReactComponent as Dot } from "../assets/icons/dot.svg";
import { ReactComponent as More } from "../assets/icons/more.svg";
import { ReactComponent as People } from "../assets/icons/people.svg";
import { ReactComponent as Files } from "../assets/icons/files.svg";
import { data } from "../utils/data";
import "./style.css";

const Body = () => {
  const [list, setList] = useState(data);
  const [dragging, setDragging] = useState(false);
  const dragItem = useRef();
  const dragNode = useRef();
  let card = [];
  useEffect(() => {
    setList(data);
  }, [setList]);

  const handleDragStart = (e, item) => {
    dragNode.current = e.target;
    dragNode.current.addEventListener("dragend", handleDragEnd);
    dragItem.current = item;

    setTimeout(() => {
      setDragging(true);
    }, 0);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDragEnter = (e, targetItem) => {
    if (dragNode.current !== e.target) {
      setList((oldList) => {
        let newList = oldList;
        newList[targetItem.grpI].cards.splice(
          targetItem.itemI,
          0,
          newList[dragItem.current.grpI].cards.splice(
            dragItem.current.itemI,
            1
          )[0]
        );
        dragItem.current = targetItem;
        return newList;
      });
    }
  };

  const handleDragEnd = (e) => {
    e.preventDefault();
    e.target.style.background = "#ffffff";
    e.target.style.boxShadow = `inset 0px 2px 0px rgba(0, 0, 0, 0.05),
      inset 0px -2px 0px rgba(0, 0, 0, 0.15)`;
    e.target.style.borderRadius = "4px";
    e.target.style.cursor = "pointer";
    setDragging(false);
    dragItem.current = null;
    dragNode?.current?.removeEventListener("dragend", handleDragEnd);
    dragNode.current = null;
  };
  const getStyles = (item) => {
    if (
      dragItem.current.grpI === item.grpI &&
      dragItem.current.itemI === item.itemI
    ) {
      return "card_wrap dragging";
    }
    return "card_wrap";
  };

  const allCards = data
    ?.map(({ cards }) => cards?.length)
    .reduce((p, n) => p + n);

  const resize = (str) => {
    if (str?.length > 28) {
      return `${str.substring(0, 28)}...`;
    }
    return str;
  };

  return (
    <div className="body_wrap">
      <div className="body_header">
        <span className="title">Заявки</span>
        <Dot />
        <span className="amount">{allCards}</span>
      </div>
      <div className="lists_wrap">
        {list?.map(({ id, title, cards }, grpI) => {
          card.push(cards);
          return (
            <div
              key={id}
              onDragEnter={
                dragging && !cards.length
                  ? (e) => handleDragEnter(e, { grpI, itemI: 0 })
                  : null
              }
              className="column_wrap"
            >
              <div className="list_header">
                <span>{title}</span>
                <Dot />
                <span>{cards.length}</span>
              </div>

              {/* { Iterating Cards below } 
                Cardlar pastda iteration bo'lyapti
              */}

              <div className="list_wrap">
                <div className="list_cards-section">
                  {cards.map((c, itemI) => {
                    return (
                      <div
                        onDragEnter={
                          dragging
                            ? (e) => {
                                handleDragEnter(e, { grpI, itemI });
                              }
                            : null
                        }
                        onDragStart={(e) => handleDragStart(e, { grpI, itemI })}
                        key={c.id}
                        className={
                          dragging ? getStyles({ grpI, itemI }) : "card_wrap"
                        }
                        onDragOver={(e) => handleDragOver(e)}
                        onDragEnd={(e) => handleDragEnd(e)}
                        draggable
                      >
                        <div className="card_header">
                          <div className="card_header-title_wrap">
                            <div className="card_header-title">{c.job}</div>
                            <div className="card_header-subtitle">
                              {resize(c.job_type)}
                            </div>
                          </div>
                          <More id="icon" />
                        </div>
                        <div className="card_middle">
                          <div
                            className={`${
                              c.status === "Второстепенная"
                                ? "blue"
                                : c.status === "Срочная заявка"
                                ? "red card_status"
                                : "card_status"
                            }`}
                          >
                            {c.status}
                          </div>
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
                            <img width={28} src={c.hr_img} alt="hr" />
                          </div>
                          <div className="hr_info">
                            <div className="hr_job">Рекруитер</div>
                            <div className="hr_name">{c.hr_name}</div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Body;
