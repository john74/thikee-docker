"use client";

import styles from '../../styles/Forms.module.css';
import { useState } from "react";
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { signIn } from "next-auth/react";
import { toast } from 'react-hot-toast';


const SignInPage = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    const { email, password } = formData;

    const onChange = event => {
        const {name, value} = event.target;
        setFormData({ ...formData, [name]:value })
    }

    const [signInSuccess, setSignInSuccess] = useState(false);
    const login = async () => {
        const response = await signIn("credentials", {
            email: email,
            password: password,
            redirect: false,
            callbackUrl: "/"
        });

        if (response?.error) {
            toast.error(response.error);
        } else {
            setSignInSuccess(true);
            toast.success("Login successful.");
        }
    };

    if (signInSuccess) {
        redirect('/');
    }

    return (
        <div className={styles.formContainer}>
            <div className="demoMessage">
                <p>This demo showcases an ongoing project, and certain functionalities have intentional limitations.
            While the signup feature is operational, please note that, for demo purposes, you can sign in using the credentials:</p>
                <p>
                    <span>Email</span>: demo@app.com <span>Password</span>: demouser.
                </p>
                <p>Feel free to explore the <a href="https://github.com/john74/thikee-frontend" target='_blank'>frontend</a> and <a href="https://github.com/john74/thikee-backend" target='_blank'>backend</a> code.</p>
            </div>
            <div className={styles.form}>
                <h1 className={styles.title}>Sign in</h1>
                <div className={styles.fields}>
                    <div className={styles.field}>
                        <label className={styles.label} htmlFor="email">Email:</label>
                        <input className={styles.input} type="email" id="email" name="email" onChange={onChange} />
                    </div>
                    <div className={styles.field}>
                        <label className={styles.label} htmlFor="password">Password:</label>
                        <input className={styles.input} type="password" id="password" name="password" onChange={onChange}/>
                    </div>
                    <input className={styles.input} type="submit" value="Sign in" onClick={login}/>
                    <div className={styles.authOptions}>
                        <span className={styles.text}>Don't have an account?</span>
                        <Link className={styles.link} href="/sign-up/">Sign up</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignInPage;