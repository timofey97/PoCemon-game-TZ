import React, { useState } from 'react'
import Menu from './Menu';
import NavBar from './navBar';



const MenuHeader = ({bgActive}) => {
    const [isActive, setActive] =  useState(null);
    
    const handClickHamburg = () => {
        setActive(prevState => !prevState)
    }

    const onMenuClick = () => {
        setActive(false);
    }
    
    return (
        <>
            <Menu 
                isActive={isActive} 
                onMenuClick={onMenuClick}/>

            <NavBar 
                isActive={isActive} 
                handClickHamburg={handClickHamburg} 
                bgActive={bgActive}/>
            
        </>
    )
}

export default MenuHeader;
