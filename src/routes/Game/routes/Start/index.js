import { useState, useEffect, useContext} from 'react';

import s from './style.module.css';
import cn from 'classnames'

import PockemonCard from '../../../../components/PocemonCard';
import Layout from '../../../../components/Layout';
import { useHistory } from 'react-router-dom';
import { PokemonContext } from '../../../../context/PokemonsContent';



const StartPage = () => {
    const history = useHistory();
    const PokemonsBase = useContext(PokemonContext);
    const [permissNum, setPermissNum] = useState(true);

    useEffect(()=> {
        PokemonsBase.selectedPokemons.length > 5 ?
            setPermissNum(false)
            : setPermissNum(true)
        console.log(PokemonsBase.selectedPokemons);
    },[PokemonsBase.selectedPokemons])

    return (
        <Layout 
            id={'2'}
            title={'Cards'} 
            colorBg='#1687a7' 
        >
            <div className={s.container}>
                <h1 style={{
                     display: permissNum ? 'none' : ''
                    }}>You can choose only 5 cards</h1>
            <button 
                className={cn(s.btn, s.btnhome)} 
                onClick={PokemonsBase.AddNewCard}
                >
                    Add new Pokemon Card
            </button>
            <button 
            disabled={!permissNum}
                className={cn(s.btn, s.btnhome)} 
                onClick={() => history.push('/game/board')}
                >
                    Start Game
            </button>
            </div>

            <div className={s.flex}>
                {
                    Object.entries(PokemonsBase.allPokemons).map(([key,{name,img,id,type,values, isSelected}]) => <PockemonCard 
                                            key={key}
                                            name={name}
                                            img={img}
                                            id={id}
                                            pr={key}
                                            type={type}
                                            values = {values}
                                            isActive = {true}
                                            minimize = {false}
                                            className={s['large-card']}
                                            isSelected = {isSelected}
                                            onCardClick = {PokemonsBase.onSetSelected }
                />)}
            </div>
        </Layout>
    )
}

export default StartPage;


