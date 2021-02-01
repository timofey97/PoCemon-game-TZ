import React, { useState } from 'react'
import NavBar from './navBar';
import Menu from './Menu';

const MenuHeader = () => {
    const [isActive, setActive] =  useState('');
    
    const MenuHandler = () => {
        setActive( () => {
            if (isActive === '') {
                return '2'
            } else if (isActive === '2') {
                return '1'
            } else { return '2'}
        })
    }
    return (
        <>
            <NavBar isActive={isActive} MenuHandler={MenuHandler}/>
            <Menu isActive={isActive}/>
        </>
    )
}

export default MenuHeader;
