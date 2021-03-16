import React, { useState } from 'react'
import LoginForm from '../LoginForm';
import Modal from '../Modal';
import Menu from './Menu';
import NavBar from './navBar';
import {NotificationManager} from 'react-notifications';
import { useDispatch } from 'react-redux';
import { exitUser, getUserUpdateAsync } from '../../store/user';




const MenuHeader = ({bgActive}) => {
    const [isActive, setActive] =  useState(null);
    const [isOpenModal, setOpenModal] =  useState(false);
    const [isSignIn, setisSignIn] =  useState(false);
    const dispatch = useDispatch();

    const ScrSignIn = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB-qoV9hc3g81F6O37I66AWXYjQjlIKL5s';
    const ScrLogIn = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB-qoV9hc3g81F6O37I66AWXYjQjlIKL5s';
    
    const SrcStartP = 'https://reactmarathon-api.herokuapp.com/api/pokemons/starter';
    const notification = async (req) => {
        if(req.hasOwnProperty('error')) {
            NotificationManager.error(req.error.message,'Wrong');
        } else {
            if (isSignIn) {
                const pokemonsStart = await fetch (SrcStartP).then(res => res.json());
                for (const item of pokemonsStart.data) {
                    await fetch(`https://pokemongame-367d1-default-rtdb.firebaseio.com/${req.localId}/pokemons.json?auth=${req.idToken}`, {
                        method: 'POST',
                        body: JSON.stringify(item)
                })
                }
            }
            
            if (req.registered){
                NotificationManager.success('You successfully sign in');
            }
            else {
                NotificationManager.success('You successfully log in');
            }
            localStorage.setItem('idToken', req.idToken);
            dispatch(getUserUpdateAsync());
            
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

    const handClickExit = () => {
        dispatch(exitUser());
        NotificationManager.info('LOG OUT','You successfully log out');
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
                onClickLogin={handlerClickLogin}
                handClickExit={handClickExit}/>
        
               
            <Modal 
                    isOpen={isOpenModal}
                    title="Log in..."
                    onCloseModal={handlerClickLogin}>
                <LoginForm 
                    isResetField={!isOpenModal}
                    isSignIn={isSignIn}
                    RegistrClick= {RegistrClick}
                    onSubmit={handleSubmitClick}
                    />
            </Modal>
        </>
    )
}

export default MenuHeader;
