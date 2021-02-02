import React, { useState } from 'react'
import NavBar from './navBar';
import Menu from './Menu';


const MenuHeader = ({menu, onSelectMenu}) => {
    const [isActive, setActive] =  useState('');
    
    const MenuHandler = () => {
        setActive( () => { return isActive === '' ?  '2' : isActive === '2' ? '1' : '2' })
    }

    const onMenuClick = (item) => {
        setActive('1');
        onSelectMenu(item);
    }
    
    return (
        <>
            <NavBar isActive={isActive} MenuHandler={MenuHandler}/>
            <Menu menu={menu} onMenuClick={onMenuClick} isActive={isActive}/>
        </>
    )
}

export default MenuHeader;
