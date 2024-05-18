"use client"

import styles from "@/app/ui/login/login.module.css"
import LoginForm from "./ui/login/loginForm/loginForm"
import isSignedIn from "@/app/lib/actions2";

const LoginPage = () => {
  return (
    <div className={styles.container}>
        <LoginForm/>
    </div>
  )
}

export default isSignedIn(LoginPage);