import React from 'react'
import useFetch from '../hooks/useFetch'
import BASE_URL from '../hooks/baseURL'
import { Spinner } from 'react-bootstrap';

const HotTab = () => {
  const {data: hotgames, loading} = useFetch(BASE_URL + '/hotgamelist');

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
    <div className='container-fluid mb-5'>
      <h2 className='my-3'>Hot Games</h2>
      <div className="row mx-1 mb-5 pb-5">
        {loading ? <Spinner /> : 
        hotgames.length > 0 ? hotgames.map((item, index) => (
        <div
          key={index}
          className="p-0 cursor-pointer col-4 col-md-2 mb-3"
          onClick={launchGame(item.product_code, item.game_type_id, item.code)}
        >
          <img
            src={item.image_url}
            alt={`Game ${index}`}
            className="rounded-3 hotgame"

          />
        </div>
        )) : <h4 className='text-center'>There is no game list.</h4>}
      </div>
    </div>
  )
}

export default HotTab
