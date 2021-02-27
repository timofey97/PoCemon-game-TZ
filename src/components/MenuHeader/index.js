import React, { useState } from 'react'
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
                Some text...
            </Modal>
        </>
    )
}

export default MenuHeader;
