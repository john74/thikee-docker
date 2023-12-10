"use client";

import styles from '../../styles/Forms.module.css';
import Link from 'next/link';

import { useState } from "react";
import { redirect } from 'next/navigation';

import {
    useHandleProxyRequest,
} from '@hooks';


const SignUpPage = () => {
    const [formData, setFormData] = useState({
        email: '',
        username: '',
        password: ''
    })

    const { email, username, password } = formData;

    const onChange = event => {
        const {name, value} = event.target;
        setFormData({ ...formData, [name]:value })
    }

    const [signUpSuccess, setSignUpSuccess] = useState(false);

    const signUp = async (event)  => {
        event.preventDefault();
        event.stopPropagation();

        const baseUrl = globalThis?.window?.location.origin;
        const method = "POST";
        const targetEndpoint = "api/users/sign-up/";
        const url = `${baseUrl}/api/${method.toLowerCase()}/?targetEndpoint=${targetEndpoint}`;
        const body = {email, username, password};

        const responseJSON = await useHandleProxyRequest(url, method, body,);
        if (!responseJSON) return;

        setSignUpSuccess(true);
    }

    if (signUpSuccess) {
        redirect('/sign-in/');
    }

    return (
        <div className={styles.formContainer}>
            <div className={styles.form}>
                <h1 className={styles.title}>Sign up</h1>
                <div className={styles.fields}>
                    <div className={styles.field}>
                        <label className={styles.label} htmlFor="email">Email:</label>
                        <input className={styles.input} type="email" id="email" name="email" onChange={onChange} />
                    </div>
                    <div className={styles.field}>
                        <label className={styles.label} htmlFor="username">Username:</label>
                        <input className={styles.input} type="username" id="username" name="username" onChange={onChange} />
                    </div>
                    <div className={styles.field}>
                        <label className={styles.label} htmlFor="password">Password:</label>
                        <input className={styles.input} type="password" id="password" name="password" onChange={onChange}/>
                    </div>
                    <input className={styles.input} type="submit" value="Sign up" onClick={signUp}/>
                    <div className={styles.authOptions}>
                        <span className={styles.text}>Already have an account?</span>
                        <Link className={styles.link} href="/sign-in/">Sign in</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignUpPage;