import React, { useState } from 'react'
import LoginForm from '../LoginForm';
import Modal from '../Modal';
import Menu from './Menu';
import NavBar from './navBar';
import {NotificationManager} from 'react-notifications';



const MenuHeader = ({bgActive}) => {
    const [isActive, setActive] =  useState(null);
    const [isOpenModal, setOpenModal] =  useState(false);
    const [isSignIn, setisSignIn] =  useState(false);

    const ScrSignIn = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB-qoV9hc3g81F6O37I66AWXYjQjlIKL5s';
    const ScrLogIn = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB-qoV9hc3g81F6O37I66AWXYjQjlIKL5s';
    
    const notification = (req) => {
        if(req.hasOwnProperty('error')) {
            NotificationManager.error(req.error.message,'Wrong');
        } else {
            
            if (req.registered){
                NotificationManager.success('You successfully sign in');
            }
            else {
                NotificationManager.success('You successfully log in');
            }
            localStorage.setItem('idToken', req.idToken);
            setOpenModal(false);
            setisSignIn(false);
        }
        
    }

    
    const handClickHamburg = () => {
        setActive(prevState => !prevState)
    }

    const onMenuClick = () => {
        setActive(false);
    }

    const handlerClickLogin = () => {
        setOpenModal(prevState => !prevState);
    }

    const handleSubmitClick = async ({email, password}) => {
        
        const requestOptions = {
            method: 'POST',
            body: JSON.stringify({
                email,
                password,
                returnSecureToken: true
            })
            
        }
        const linkToFetch = isSignIn? ScrLogIn: ScrSignIn 
        const response = await fetch(linkToFetch, requestOptions).then(res => res.json())
        notification(response);
        
    }

    const RegistrClick = () => {
        setisSignIn(!isSignIn);
    }
    
    return (
        <>
            <Menu 
                isActive={isActive} 
                onMenuClick={onMenuClick}/>

            <NavBar 
                isActive={isActive} 
                handClickHamburg={handClickHamburg} 
                bgActive={bgActive}
                onClickLogin={handlerClickLogin}/>
        
               
            <Modal 
                    isOpen={isOpenModal}
                    title="Log in..."
                    onCloseModal={handlerClickLogin}>
                <LoginForm 
                    isSignIn={isSignIn}
                    RegistrClick= {RegistrClick}
                    onSubmit={handleSubmitClick}
                    />
            </Modal>
        </>
    )
}

export default MenuHeader;
