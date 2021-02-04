import s from './style.module.css';
import {Link} from'react-router-dom';
import cn from 'classnames';
import menu from '../../../data/main-menu';


const Menu = ({ onMenuClick, isActive}) => {
    return (
        <div className={cn(s.menuContainer, {
            [s.active]: isActive === true,
            [s.deactive]: isActive === false
            })}>
        <div className={s.overlay} />
        <div className={s.menuItems}>
            <ul>
                {menu.map(({title, route }) =>
                        <li key={title}>
                            <Link to={route} onClick={onMenuClick}>
                                {title}
                            </Link>
                        </li>
                    )}
            </ul>
        </div>
        </div>
    )
}

export default Menu;





