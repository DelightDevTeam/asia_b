import React, { useEffect, useState } from "react";
import "../assets/css/games.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import BASE_URL from "../hooks/baseURL";

const GameLists = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const gameType = searchParams.get("type") || "Slot";
  const gameList = searchParams.get("list") || "PP";
  const [type, setType] = useState(1);

  useEffect(() => {
    const typeMapping = {
      "Slot": 1,
      "Live Casino": 2,
      "Sport Book": 3,
      "Fishing": 4
    };
    setType(typeMapping[gameType] || 1);
  }, [gameType]);

  const { data: provider } = useFetch(`${BASE_URL}/gameTypeProducts/${type}`);
  const lists = provider?.products || [];

  return (
    <>
      {lists.length > 0 && (
        <div className="gameProviders py-3 px-2 px-sm-4 gap-2 gap-sm-3 gap-lg-4 gap-lg-0 d-flex align-items-center">
          {lists.map((list, index) => (
            <div
              onClick={() => navigate(`/games?type=${gameType}&list=${list.short_name}`)}
              key={index}
              className={`${
                gameList === list.short_name ? "activeGameList" : ""
              } cursor-pointer py-1 px-3 px-sm-4 rounded-2 gameProvider`}
            >
              {list.short_name}
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default GameLists;
