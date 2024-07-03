import React, { useEffect } from "react";
import { FaHistory, FaUser } from "react-icons/fa";
import { IoWalletSharp } from "react-icons/io5";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import "../assets/css/information.css";
import Profile from "../components/Profile";
import ChangePassword from "../components/ChangePassword";
import BankAccount from "../components/BankAccount";
import MoneyTransfer from "../components/MoneyTransfer";
import Log from "../components/Log";


const InformationPage = () => {
  const navigate = useNavigate();
  const auth = localStorage.getItem("token");

  useEffect(() => {
    if (!auth) {
      navigate("/login");
    }
  }, [auth]);

  const [searchParams] = useSearchParams();
  const heading = [
    {
      id: 1,
      icon: <FaUser />,
      title: "Profile User",
      link: "/information?tab=profile",
      value: "profile",
    },
    {
      id: 2,
      icon: <IoWalletSharp />,
      title: "Money Transfer",
      link: "/information?tab=transfer",
      value: "transfer",
    },
    {
      id: 3,
      icon: <FaHistory />,
      title: "Logs",
      link: "/information?tab=logs",
      value: "logs",
    },
  ];
  const tab = searchParams.get("tab");
  useEffect(() => {
    if (!tab) navigate("/information?tab=profile");
  }, []);
  return (
    <div style={{ overflowX: "hidden" }}>
      <div style={{ background: "#262626" }} className="row">
        {heading.map((item) => {
          return (
            <div
              key={item.id}
              className={`${
                item.value === searchParams.get("tab") ? "activeInfoTab" : ""
              } text-center col-4`}
            >
              <div className={` py-2 text-center cursor-pointer`}>
                <Link to={item.link} className="text-center ">
                  <div className="infoIcon">{item.icon}</div>
                  <small className="infoTitle mt-sm-1 d-block fw-semibold">
                    {item.title}
                  </small>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
      <div className="py-4 px-2 px-sm-5 mx-auto">
        {tab === "profile" && (
          <>
            <Profile />
            {/* <BankAccount/> */}
            <ChangePassword />
          </>
        )}
        {tab === "transfer" && <MoneyTransfer />}
        {tab === "logs" && <Log />}
      </div>
    </div>
  );
};

export default InformationPage;
