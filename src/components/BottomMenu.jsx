import React from "react";
import home from "../assets/img/home.png";
import slot from "../assets/img/slot.png";
import fish from "../assets/img/fish.png";
import card from "../assets/img/card.png";
import football from "../assets/img/football.png";
import "../assets/css/footer.css";
import { Link, useSearchParams } from "react-router-dom";

const BottomMenu = () => {
  const [searchParams] = useSearchParams();
  const items = [
    { img: home, link: "/", value: null },
    { img: slot, link: "/games?type=Slot&&list=PP", value: "Slot" },
    { img: fish, link: "/games?type=Fishing&&list=PlayStar", value: "Fishing" },
    { img: card, link: "/games?type=Live Casino&&list=PP", value: "Live Casino" },
    { img: football, link: "/games?type=Sport Book&&list=SBO", value: "Sport Book" },
  ];
  return (
    <div className="fixed-bottom">
      <div className="">
        <div className="row justify-content-around bottomMenu">
          {items.map((item, index) => {
            return (
              <div key={index} className={`${
                searchParams.get("type") === item.value
                  ? "  activeFixedBottomIcon"
                  : "normalColor "
              }  col-2 py-3 text-center`}>
                <Link
                  
                  to={item.link}
                  
                >
                  <img src={item.img} className="fixedBottomIcon" />
                </Link>
              </div>

            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BottomMenu;
