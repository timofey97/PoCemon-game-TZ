import s from './style.module.css';
import cn from 'classnames';

import logo from './assets/1200px-International_Pokémon_logo.svg.png';

const NavBar = ({isActive, MenuHandler}) => {
    const handlerClick = () => {
        MenuHandler && MenuHandler();
    }
    return (
        <nav id={s.navbar}>
        <div className={s.navWrapper}>
            <p className={s.brand}>
            <img className={s.logo} src={logo} alt="Logo"></img>
            </p>
            <a className={cn(s.menuButton, {[s.active]: isActive === '2'})} onClick={handlerClick}>
            <span />
            </a>
        </div>
        </nav>
    )
}

export default NavBar;
