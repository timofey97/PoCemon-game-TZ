import React, { useEffect, useState } from 'react'
import s from './style.module.css';
import cn from 'classnames';

const LoginForm = ({onSubmit, isSignIn, RegistrClick,isResetField}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    useEffect(() => {
        setEmail('');
        setPassword('');
    }, [isResetField])

    const handleSubmit = (e) => {
        e.preventDefault();
        
        onSubmit && onSubmit({
            email,
            password
        })

        setEmail('');
        setPassword('');
    }


    return (
        <form onSubmit={handleSubmit}>
            <div className={s.root}>
                <div>
                    <input
                    value={email} 
                    type="email" 
                    className={cn(s.input, {[s.valid]: email})} 
                    required
                    onChange={(e)=> setEmail(e.target.value)}/>
                    <span className={s.highlight}></span>
                    <span className={s.bar}></span>
                    <label className={s.label}>Email</label>
                </div>
                <div>
                    <input
                    value={password} 
                    type="password" 
                    className={s.input} 
                    required
                    onChange={(e)=> setPassword(e.target.value)}/>
                    <span className={s.highlight}></span>
                    <span className={s.bar}></span>
                    <label className={s.label}>Password</label>
                </div>
                <div className={s.buttoncont}>
                    <button className={s.btnlogin}>
                        {isSignIn? 'LOG IN': 'SIGN IN'}
                    </button>
                    <p className={s.regLogbtn} onClick={RegistrClick}>
                        {isSignIn? 'Login?': 'Register?'}
                    </p>
                </div>
                
            </div>
        </form>
    )
}

export default LoginForm;
