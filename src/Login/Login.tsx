import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: any) => {
    e.preventDefault();
    const user = { login, password };
    try {
    const res = await axios.post('http://localhost:8088/api/auth/login', user);
    if (res.data.access_token) {
      localStorage.setItem('token', res.data.access_token);
      navigate('/');
    }
    } catch(e) {
        alert('incorrect data');
    }
  };

  return (
    <div className="form-container">
      <form className="form" onSubmit={handleLogin}>
        <label>
        <div className="label2">Логин: </div>
          <input type="login" value={login} onChange={(e) => setLogin(e.target.value)} />
        </label>
        <label>
          <div className="label2" >Пароль: </div>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <button className="button2" type="submit">Вход</button>
      </form>
    </div>
  );
};

export default Login;