import s from './style.module.css';
import cn from 'classnames';



const Menu = ({menu, onMenuClick, isActive}) => {
    return (
        <div className={cn(s.menuContainer, {[s.active]: isActive === '2'},{[s.deactive]: isActive === '1'})}>
        <div className={s.overlay} />
        <div className={s.menuItems}>
            <ul>
                {menu.map(item =>
                        <li key={item.title}>
                            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                            <a onClick={() => onMenuClick(item)}>
                                {item.title}
                            </a>
                        </li>
                    )}
            </ul>
        </div>
        </div>
    )
}

export default Menu;





