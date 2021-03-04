import s from './style.module.css';
import cn from 'classnames';
import {useHistory} from 'react-router-dom';

import logo from './assets/1200px-International_Pokémon_logo.svg.png';
import {ReactComponent as LoginSVG} from './assets/login.svg';

const NavBar = ({isActive, handClickHamburg, bgActive = false,onClickLogin}) => {
    const history = useHistory();
    const handlerClick = () => {
        handClickHamburg && handClickHamburg();
    }
    return (
        <nav id={s.navbar} className={cn({[s.bgActive]: bgActive})}>
        <div className={s.navWrapper}>
            <p className={s.brand} onClick={() => (history.push(''))}>
            <img className={s.logo} src={logo} alt="Logo"></img>
            </p>
            <div className={s.logoAndMenu}>
                <div className={s.loginWrap}
                    onClick={onClickLogin}>
                    <LoginSVG/>
                </div>
                <div 
                className={cn(s.menuButton, {
                [s.active]: isActive === '2'})} 
                onClick={handlerClick}>
                <span />
            </div>
            </div>
        </div>
        </nav>
    )
}

export default NavBar;

