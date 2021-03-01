import React, { useState } from 'react'
import LoginForm from '../LoginForm';
import Modal from '../Modal';
import Menu from './Menu';
import NavBar from './navBar';



const MenuHeader = ({bgActive}) => {
    const [isActive, setActive] =  useState(null);
    const [isOpenModal, setOpenModal] =  useState(false);
    
    const handClickHamburg = () => {
        setActive(prevState => !prevState)
    }

    const onMenuClick = () => {
        setActive(false);
    }

    const handlerClickLogin = () => {
        setOpenModal(prevState => !prevState);
    }

    const handleSubmitClick = () => {
        setOpenModal(false);
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
                    onSubmit={handleSubmitClick}/>
            </Modal>
        </>
    )
}

export default MenuHeader;
