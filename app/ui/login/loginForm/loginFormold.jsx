"use client";

import {authenticate} from "@/app/lib/actions"
import { useState } from "react";
import styles from "./loginForm.module.css";
import { FiEyeOff,FiEye } from "react-icons/fi";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [showPassword, setShowPassword] = useState(true);
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  }
  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const result = await authenticate({ username, password });

    if (result.redirect === '/dashboard') {
      router.push(result.redirect);
      document.cookie = result.cookieSerialized;
    } else {
      setErrorMessage(result);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.loginspace}>
        <form onSubmit={handleSubmit}>
          <div className={styles.loginform}>
            <div className={styles.ellipse}></div>
            <div className={styles.login}>
              <div className={styles.logo}>
                <div className={styles.image}></div>
              </div>
              <div className={styles.heading}>Welcome to Mantiswave Networks!</div>
              <div className={styles.username}>
                <div className={styles.label}>
                  <div>Username</div>
                </div>
                <input 
                  autoComplete="off" 
                  className={styles.userinput} type="text" 
                  placeholder="" 
                  name="username"
                  value={username}
                  onChange={handleUsernameChange} 
                />
              </div>
              <div className={styles.password}>
                <div className={styles.label}>
                  <div>Password</div>
                </div>
                <input
                  autoComplete="off"
                  className={styles.passwordinput}
                  type={showPassword ? "password" : "text"}
                  placeholder=""
                  name="password"
                  value={password}
                  onChange={handlePasswordChange}
                />
                <div className={styles.eye} onClick={togglePasswordVisibility}>
                  {showPassword ? (
                    <FiEye color="#4F4F4F" size="20" />
                  ) : (
                    <FiEyeOff size="20" color="#4F4F4F" />
                  )}
                </div>
              </div>
              {/* Error message display */}
              {errorMessage && <div className={styles.error}>{errorMessage} !</div>}
              <button type="submit">Login</button>
            </div>
          </div>
        </form>
      </div>
      <div className={styles.banner}>
      </div>
    </div>
  )
}

export default LoginForm