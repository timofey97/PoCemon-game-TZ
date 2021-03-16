import s from './style.module.css';
import cn from 'classnames';
import {useHistory} from 'react-router-dom';

import logo from './assets/1200px-International_Pokémon_logo.svg.png';
import {ReactComponent as LoginSVG} from './assets/login.svg';
import {ReactComponent as UserSVG} from './assets/user.svg';
import {ReactComponent as ExitSVG} from './assets/remove-button.svg';
import { useSelector } from 'react-redux';
import { selectLocalID, selectUserLoading } from '../../../store/user';

const NavBar = ({handClickExit,isActive, handClickHamburg, bgActive = false,onClickLogin}) => {
    const isLoadingUser = useSelector(selectUserLoading);
    const localId = useSelector(selectLocalID);
    console.log(localId);
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
                {(!isLoadingUser && !localId) && (
                    <div className={s.loginWrap}
                        onClick={onClickLogin}>
                        <LoginSVG/>
                    </div>)}
                {(!isLoadingUser && localId) && (
                    <div className={s.wrapUser}>
                        
                    <div className={s.loginWrap}
                        onClick={() => (history.push('/user'))}>
                        <UserSVG/>
                    </div>
                    <div className={s.exitwrap}
                        onClick={()=>handClickExit() }>
                         <ExitSVG/>
                    </div>
                    </div>
                    )}
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

