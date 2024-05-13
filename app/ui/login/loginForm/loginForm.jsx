"use client";

import { useState } from "react";
import styles from "./loginForm.module.css";
import { useFormState } from "react-dom"
import { FiEyeOff,FiEye } from "react-icons/fi";

const LoginForm = () => {
  const [state, formAction] = useFormState();
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  }
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  return (
    <div className={styles.container}>
      <div className={styles.loginspace}>
        <form action={formAction}>
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
                <input className={styles.userinput} type="text" placeholder="" name="username" />
              </div>
              <div className={styles.password}>
                <div className={styles.label}>
                  <div>Password</div>
                </div>
                <input
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
              <button>Login</button>
              {state && state}
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