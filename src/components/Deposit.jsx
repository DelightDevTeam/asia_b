import React, { useState } from "react";
import { Modal, Spinner } from "react-bootstrap";
import useFetch from "../hooks/useFetch";
import BASE_URL from "../hooks/baseURL";
import { ToastContainer, toast } from "react-toastify";
import SmallSpinner from "./SmallSpinner";
import { useNavigate } from "react-router-dom";


const Deposit = () => {
  const [show, setShow] = useState(false);
  const [selectedBank, setSelectedBank] = useState(0);
  const [amount, setAmount] = useState(0);
  const [refNo, setRefNo] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const {data: banks} = useFetch(BASE_URL + "/agent-payment-type");

  const selectedBankObject = banks.find((bank) => bank.id === selectedBank);
  // console.log(selectedBankObject);

  const handleCopyText = (acc_no) => {
    navigator.clipboard.writeText(acc_no);
    toast.success("Copied", {
        position: "top-right",
        autoClose: 1000,
        theme: 'dark',
        hideProgressBar: false,
        closeOnClick: true
    })
  }

  const deposit = (e) => {
    e.preventDefault();
    setLoading(true);
    if(amount < 1000){
      setLoading(false)
      toast.error("အနည်းဆုံး ၁၀၀၀ကျပ်မှစ၍ ထည့်သွင်းနိုင်ပါသည်။", {
          position: "top-right",
          autoClose: 1000,
          theme: 'dark',
          hideProgressBar: false,
          closeOnClick: true
      })
      return;
    }
    if(refNo.length !== 4){
      setLoading(false)
      toast.error("ဂဏန်း ၆လုံးပြည့်အောင်ရိုက်ထည့်ပေးပါ။", {
          position: "top-right",
          autoClose: 1000,
          theme: 'dark',
          hideProgressBar: false,
          closeOnClick: true
      })
      return;
    }
    const inputData = {
      "amount" : amount,
      "refrence_no" : refNo,
      "user_payment_id" : selectedBank
    }
    fetch(BASE_URL + "/transaction/deposit", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify(inputData),
    })
      .then(async (response) => {
        if (!response.ok) {
          let errorData;
          try {
            errorData = await response.json();
          } catch (error) {
            console.error("Error parsing JSON:", error);
          }
          if (response.status === 422) {
            setLoading(false)
            setError(errorData.errors);
            setSuccess("");
            setErrMsg("")
            console.error(`${response.status}:`, errorData);
            
          } else if (response.status === 401) {
            setLoading(false)
            setErrMsg(errorData.message);
            setSuccess("");
            setError("")
            console.error(`${response.status}:`, errorData);
          } else {
            console.error(`Unexpected error with status ${response.status}`);
          }
        }
        return response.json();
      })
      .then((data) => {
        // console.log(data);
        setLoading(false);
        setSuccess("ငွေသွင်းလွှာ တောင်းခံပြီးပါပြီ။.");
        setTimeout(() => {
          setSuccess("");
        }, 1000);
        navigate('/information?tab=logs')
        setErrMsg("")
        setError("")
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <div>
      <ToastContainer />
      {!selectedBankObject && (
        <>
        <div className="text-center mb-4">
          <button className="btn btn-outline-light"
          onClick={() => setShow(true)}
          >
            ငွေသွင်းရန် ဘဏ်အကောင့်များ ရွေးချယ်ပါ။
          </button>
        </div>
        </>

      )}
      
        {selectedBankObject && selectedBankObject.payment_type.img_url && (
          <div className="profileForm px-3 py-4 rounded-4 shadow-lg">
            <div className="d-flex justify-content-between">
              <div>
                <button className="btn btn-sm btn-outline-light mb-4" onClick={() => setSelectedBank(0)}>
                  <i className="fas fa-arrow-left"></i>
                </button>
              </div>
              <div>
                {success && (
                  <div className="alert alert-success alert-dismissible" role="alert">
                    {success}
                  </div>
                )}
                {errMsg && (
                  <div className="alert alert-danger alert-dismissible" role="alert">
                    {errMsg}
                  </div>
                )}
              </div>
            </div>

              <div
                className="mb-4 cursor-pointer d-flex gap-2 p-2 align-items-center justify-content-between border rounded-3 "
                style={{ background: "#E5E5E5" }}
              >
              <div className="d-flex gap-2 align-items-center">
                  <div>
                    <img
                      src={selectedBankObject.payment_type.img_url}
                      style={{ height: "50px", width: "50px" }}
                    />
                  </div>

                  <div>
                    <small className="text-secondary fw-bold d-block">
                      {selectedBankObject.account_name}
                    </small>
                    <small className="text-secondary fw-bold">
                      {selectedBankObject.account_no}
                    </small>
                  </div>

                </div>
                <div>
                  <i className="fa-regular fa-copy text-secondary cursor-pointer" onClick={() => handleCopyText(selectedBankObject.account_no)} style={{ fontSize: "25px" }}></i>
                </div>
              </div>
            <form onSubmit={deposit}>
              <div>
                <div className="row mb-2">
                  <div className="profileTitle col-5 mt-2">ပမာဏ : </div>
                    <div className="col-7">
                      <input
                        type="number"
                        className="form-control "
                        onChange={(e) => setAmount(e.target.value)}
                        value={amount}
                      />
                      {error.amount && (
                        <span className="text-danger">*{error.amount}</span>
                      )}
                    </div>
                </div>
                <div className="row mb-2">
                  <div className="profileTitle col-5 mt-2">နောက်ဆုံးဂဏန်း ၄လုံး : </div>
                  <div className="col-7">
                    <input
                      type="text"
                      className="form-control "
                      value={refNo}
                      onChange={(e) => setRefNo(e.target.value)}
                    />
                    {error.refrence_no && (
                        <span className="text-danger">*{error.refrence_no}</span>
                    )}
                  </div>
                </div>
                <div className="text-end mt-3">
                  {loading ? <Spinner /> : 
                  <button className="btn fw-bold text-black navLoginBtn">
                  ခွင့်ပြုသည်
                  </button>}
                </div>
              </div>
            </form>
          </div>
        )}

      
      <Modal
        show={show}
        onHide={() => setShow(false)}
        className="cursor-pointer infoBankAccModal"
      >
        <div className="px-1 py-2">
          <Modal.Header>
            <Modal.Title className=" text-center mx-auto">
              <h5 className="fw-bold infoBankAccModalTitle">
                Select Bank Deposit To
              </h5>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {banks && banks.map((bank, index) => {
              return (
                <div
                  onClick={() => {
                    setSelectedBank(bank.id);
                    setShow(false);
                  }}
                  key={index}
                  className="bg-white rounded-3 p-2 d-flex align-items-center justify-content-center text-black gap-2 mb-3"
                >
                  <img
                    src={bank.payment_type.img_url}
                    style={{ width: "50px", height: "50px" }}
                    className="img-fluid rounded shadow"
                  />
                  <div>
                    <p>
                      <span className="fw-semibold">Acc No :</span>
                      <span>{bank.account_no}</span>
                    </p>
                    <p>
                      <span className="fw-semibold">Acc Name:</span>
                      <span>{bank.account_name}</span>
                    </p>
                  </div>
                </div>
              );
            })}
          </Modal.Body>
          <Modal.Footer>
            <button
              onClick={() => setShow(false)}
              className="navLoginBtn btn text-black fw-bold w-100"
            >
              ပယ်ဖျက်သည်
            </button>
          </Modal.Footer>
        </div>
      </Modal>
    </div>
  );
};

export default Deposit;
