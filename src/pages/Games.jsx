import React, { useEffect, useState } from "react";
import GameHeading from "../components/GameHeading";
import { useNavigate, useSearchParams } from "react-router-dom";
import GameLists from "../components/GameLists";
import useFetch from "../hooks/useFetch";
import BASE_URL from "../hooks/baseURL";
import { Spinner } from "react-bootstrap";
import AllTab from "../components/AllTab";
import HotTab from "../components/HotTab";

const GamesPage = () => {
     const auth = localStorage.getItem("token");
    const navigate = useNavigate();
    useEffect(() => {
        if (!auth) {
            navigate("/login");
        }
    });
  const { data: types } = useFetch(BASE_URL + "/gameType");
  const [searchParams] = useSearchParams();
  const activeTab=searchParams.get('tab') || ''
  const [gameType, setGameType] = useState(searchParams.get("type") ?? "Slot");
  const [gameList, setGameList] = useState(searchParams.get("list") ?? "PP");
  const [provider, setProvider] = useState(null);
  const [type, setType] = useState(null);

  useEffect(() => {
    const typeParam = searchParams.get("type");
    const listParam = searchParams.get("list");

    setGameType(typeParam ?? "Slot");

    switch (typeParam) {
      case "Live Casino":
        setGameList(listParam ?? "PP");
        break;
      case "Sport Book":
        setGameList(listParam ?? "SBO");
        break;
      case "Fishing":
        setGameList(listParam ?? "PlayStar");
        break;
      default:
        setGameList(listParam ?? "PP");
        break;
    }
  }, [searchParams]);

  useEffect(() => {
    if (types) {
      const selectedGameType = types.find((type) => type.name === gameType);
      const selectedGameList = selectedGameType?.products.find(
        (list) => list.short_name === gameList
      );
      setProvider(selectedGameList?.id);
      setType(selectedGameType?.code);
    }
  }, [gameType, gameList, types]);

  const { data: games, loading } = useFetch(
    provider && type ? `${BASE_URL}/gamelist/${provider}/${type}` : null
  );

  const launchGame = (p_code, type_id, game_id) => (e) => {
    e.preventDefault();
    let gameData = {
        "productId" : p_code,
        "gameType" : type_id,
        "gameId" : game_id
    }
    // console.log(gameData);
    fetch(BASE_URL + "/game/Seamless/LaunchGame", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify(gameData)
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Launch Game failed");
            }
            console.log("Launch Game success");
            return response.json();
        })
        .then((data) => {
            console.log(data);
            window.open(data.Url, '_blank');
        })
        .catch((error) => {
            console.error("Launch Game error:", error);
        });
  }
  return (
    <div style={{ overflowX: "hidden" }}>
      <GameHeading />
      {activeTab !== 'all' && activeTab !== 'hot' && <GameLists />}
      
      {activeTab==='all' && <AllTab/> }
      {activeTab==='hot' && <HotTab/> }
     {!activeTab && <div className="py-4 px-2 px-sm-4">
        <div className="d-flex justify-content-between align-items-center">
          <div className="fw-bold">{gameType.toUpperCase()}</div>
          {gameType !== "Sport Book" && (
            <div className="fw-bold ms-3">{gameList}</div>
          )}
        </div>
        <div className="ms-2 row mt-3 mb-5 mx-auto">
          {loading ? (
            <Spinner />
          ) : (
            games.length > 0 ?
            games.map((item, index) => (
              <div
                key={index}
                className="p-0 cursor-pointer col-4 col-sm-3 col-lg-2 mb-2 mb-sm-3 cursor-pointer"
                onClick={launchGame(item.product_code, item.game_type_id, item.code)}
              >
                <img
                  src={item.image_url}
                  alt={`Game ${index}`}
                  className="gameImg rounded-3"
                />
              </div>
            )) : 
            <h4 className='text-center'>There is no game list.</h4>
          )}
        </div>
      </div>}
    </div>
  );
};

export default GamesPage;
