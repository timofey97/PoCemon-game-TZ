import s from './style.module.css';
import {useContext} from 'react';
import { PokemonContext} from '../../../../context/PokemonsContent';
import PockemonCard from '../../../../components/PocemonCard';


const BoardPage = () => {
    const SelectedContext = useContext(PokemonContext);
    console.log(SelectedContext);
    return (
        <div className={s.root}>
            <div className={s.playerOne}>
                { SelectedContext.selectedPokemons && SelectedContext.selectedPokemons.map(([key,{name,img,id,type,values}]) => <PockemonCard 
                                            key={key}
                                            name={name}
                                            img={img}
                                            pr={key}
                                            id={id}
                                            type={type}
                                            values = {values}
                                            isActive = {true}
                                            minimize = {true}
                                            className = {s.card}
                                            isSelected = {true}
                                            onCardClick ={() => console.log(id)}

                />)
                }
            </div>
            <div className={s.board}>
                <div className={s.boardPlate}>1</div>
                <div className={s.boardPlate}>2</div>
                <div className={s.boardPlate}>3</div>
                <div className={s.boardPlate}>4</div>
                <div className={s.boardPlate}>5</div>
                <div className={s.boardPlate}>6</div>
                <div className={s.boardPlate}>7</div>
                <div className={s.boardPlate}>8</div>
                <div className={s.boardPlate}>9</div>
            </div>
        </div>
    );
};

export default BoardPage;