import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import store_csrul from "../redux/store_csurl";

import work_in_progress_image from "../work-in-progress.png";

function Login() {
  const navigate = useNavigate();
  const [loginNote, setLoginNote] = useState("");
  const [isTransition, setIsTransition] = useState(false);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const submitLogin = async (e) => {
    e.preventDefault();
    setIsTransition(true);
    setTimeout(() => {
      setIsTransition(false);
    }, 3000);

    const formData = { name, password };
    const csURL = store_csrul.getState().csURL;
    console.log("csurl", csURL);

    try {
      const response = await fetch(`${csURL}api/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.errMsg) {
        setLoginNote(data.errMsg);
      } else {
        setLoginNote("Login success");
        console.log(data);
        localStorage.setItem("lastUserInfo", JSON.stringify(data));
        const userInfoName = JSON.parse(
          localStorage.getItem("lastUserInfo")
        ).name;
        if (data.userType === "admin") {
          setTimeout(() => {
            navigate("/admin");
          }, 1500);
        } else if (data.userType === "user") {
          setTimeout(() => {
            navigate(`/main/userdata/${userInfoName}`);
          }, 1500);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="signBox">
      <h2>Sign In</h2>
      <form onSubmit={submitLogin}>
        <div>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Username"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
      <p>{loginNote}</p>
      {isTransition && (
        <div className="transition">
          <div className="transitionHoler">
            <img src={work_in_progress_image} alt="work-in-progress" />
            <h3>{loginNote}</h3>
          </div>
        </div>
      )}
    </div>
  );
}

export default Login;
