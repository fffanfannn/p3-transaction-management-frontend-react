import React, { useState } from "react";
import store_csrul from "../redux/store_csurl";
import { useNavigate } from "react-router-dom";


function Register() {
  const [registerNote, setRegisterNote] = useState("");
  const [isVip, setIsVip] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [vipOrNot, setVipOrNot] = useState(false);
  const [isTransition, setIsTransition] = useState(false);

  const navigate = useNavigate();
  const vipBox = (event) => {
    const usertype = event.target.value;
    setIsVip(usertype === "user");
  };

  const submitRegister = (e) => {
    e.preventDefault();
    setIsTransition(true);

    setTimeout(() => {
      setIsTransition(false);
    }, 3000);

    const userType = document.getElementById("usertype").value;
    const formData = {
      name: name,
      email: email,
      password: password,
      userType: userType,
      isVip: vipOrNot,
    };

    const csURL = store_csrul.getState().csURL;
    fetch(`${csURL}api/user/register`, {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.status === 200) {
          setRegisterNote("Register success, please login");
          setTimeout(() => {
            navigate("/login");
          }, 3000);
        } else {
          setRegisterNote("Username or email already exists");
        }
        return res.text();
      })
      .then((data) => {
        console.log(data);
      });
  };

  return (
    <div className="signBox">
      <h2>Sign Up</h2>
      <form onSubmit={submitRegister}>
        <div>
          *
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            placeholder="Username"
            required
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          *
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            placeholder="Email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          *
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            placeholder="Password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          *
          <select id="usertype" name="usertype" onChange={vipBox}>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        {isVip && (
          <div className="checkbox">
            <input
              type="checkbox"
              id="vipuser"
              name="vipuser"
              value="vipUser"
              checked={vipOrNot}
              onChange={() => setVipOrNot(!vipOrNot)}
            />
            VIP
          </div>
        )}
        <button type="submit">Sign Up</button>
      </form>
      {registerNote && <p>{registerNote}</p>}
      {isTransition && (
        <div className="transition">
          <div className="transitionHoler">
            <img
              src={process.env.PUBLIC_URL + "/work-in-progress.png"}
              alt="work-in-progress"
            />
            <h3>{registerNote}</h3>
          </div>
        </div>
      )}
    </div>
  );
}

export default Register;
