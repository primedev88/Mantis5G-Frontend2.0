"use client";

import {  useState } from "react";
import { useRouter } from 'next/navigation';
import styles from "./loginForm.module.css";
import { FiEyeOff,FiEye } from "react-icons/fi";


const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(true);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  }
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error,setError] = useState('');
  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();

    const hardcodedUsername = 'admin';
    const hardcodedPassword = 'password123';

    if (username === hardcodedUsername && password === hardcodedPassword) {
      sessionStorage.setItem('isLoggedIn', 'true');
      router.push('/dashboard');
    } else {
      setError("Invalid Credentials !");
    }
  };
 
  return (
    <div className={styles.container}>
      <div className={styles.loginspace}>
        <form onSubmit={handleLogin}>
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
                  onChange={(e) => setUsername(e.target.value)}
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
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div className={styles.eye} onClick={togglePasswordVisibility}>
                  {showPassword ? (
                    <FiEye color="#4F4F4F" size="20" />
                  ) : (
                    <FiEyeOff size="20" color="#4F4F4F" />
                  )}
                </div>
              </div>
              <div className={styles.error}>{error}</div>
              <button >Login</button>
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