import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import BASE_URL from '../hooks/baseURL';
import SmallSpinner from './SmallSpinner';

const Profile = () => {
  const {data:user} = useFetch(BASE_URL + "/user");

  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [errMsg, setErrMsg] = useState("");
  
  const auth = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    if(!auth){
      navigate('/login');
    }
  }, [auth, navigate]);

  useEffect(() => {
    if (user) {
      setUsername(user.user_name || '');
      setName(user.name || '');
      setPhone(user.phone || '');
    }
  }, [user]);

  const profile = (e) => {
    e.preventDefault();
    const inputData = {
      name: name,
      phone: phone
    }
    fetch(BASE_URL + "/profile", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
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
            // console.error(`${response.status}:`, errorData);
            
          } else if (response.status === 401) {
            setLoading(false)
            setErrMsg(errorData.message);
            setSuccess("");
            setError("")
            console.error(`${response.status}:`, errorData);
          } else {
            // console.error(`Unexpected error with status ${response.status}`);
          }
        }
        return response.json();
      })
      .then((data) => {
        setLoading(false);
        setSuccess("New Password Changed Successfully.");
        setErrMsg("")
        setError("")
      })
      .catch((error) => {
        // console.error(error);
      });
  }
  
  return (
    <div>
      <form className="profileForm px-3 py-4 rounded-4" onSubmit={profile}>
      <div className="d-flex justify-content-between">
          <h5 className="fw-bold mb-3">မှတ်တမ်း ပြုပြင်ရန်</h5>
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
         <div className="row mb-2">
            <div className="profileTitle col-5 mt-2">ဂိမ်းအကောင့် : </div>
            <div className="col-7">
              <input type="text" 
              className="form-control"
              value={username} 
              disabled
              />
            </div>
        </div>
         <div className="row mb-2">
            <div className="profileTitle col-5 mt-2">အမည်အပြည့်စုံ : </div>
            <div className="col-7">
              <input type="text" 
              className="form-control" 
              value={name} 
              onChange={e => setName(e.target.value)}
              />
              {error.name && <span className="text-danger">*{error.name}</span>}
            </div>
        </div>
        <div className="row mb-2">
            <div className="profileTitle col-5 mt-2">Phone Number : </div>
            <div className="col-7">
            <input type="text" 
            className="form-control " 
            value={phone} 
            onChange={e => setPhone(e.target.value)} 
            />
            {error.phone && <span className="text-danger">*{error.phone}</span>}
            </div>
        </div>
        <div className="text-end mt-3">
        <button className="btn text-black navLoginBtn">
          {loading && <SmallSpinner />}
            Update Profile
        </button>
        </div>
      </form>
    </div>
  )
}

export default Profile
