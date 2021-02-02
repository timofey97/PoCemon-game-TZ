import s from './style.module.css';
import cn from 'classnames';

const GamePage = ({onChangePageClick}) => {
    return (
        <div className={s.container}>
            <h1>This is Game Page!!</h1> 
            <button 
                className={cn(s.btn, s.btnhome)} 
                onClick={ () => onChangePageClick('home')}>
                    Вернуться на гравную страницу
            </button>
        </div>
    )
}

export default GamePage;
