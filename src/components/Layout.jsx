import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import BottomMenu from "./BottomMenu";
import { Modal } from "react-bootstrap";
import { CgClose } from "react-icons/cg";
import popUp from "../assets/img/popupImg.png";
import useFetch from "../hooks/useFetch";
import BASE_URL from "../hooks/baseURL";


const Layout = () => {
  const {data: popup} = useFetch(BASE_URL + "/popup-ads-banner");
  // console.log(popup);
  const [isModalOpen, setIsModalOpen] = useState(true);
  return (
    <div>
      <Modal show={isModalOpen} onHide={() => setIsModalOpen(false)}>
        <Modal.Header>
          <Modal.Title
            style={{ width: "100%" }}
            className="  d-flex justify-content-end"
          >
            <div
              onClick={() => setIsModalOpen(false)}
              className="modalCloseBtn cursor-pointer"
            >
              <CgClose color="black" />
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img src={popup?.img_url} className="popUpImg" />
        </Modal.Body>
      </Modal>
      <Navbar />
      <Outlet />
      <BottomMenu />
    </div>
  );
};

export default Layout;
