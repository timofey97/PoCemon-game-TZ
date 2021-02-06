import {useState} from 'react';
import Layout from '../../components/Layout';
import s from './style.module.css';
import POKEMONS from '../../components/PocemonCard/Cads.json';
import PockemonCard from '../../components/PocemonCard';

const GamePage = () => {
    const [pokemon, setPokemons] = useState(POKEMONS);

    const onCardClick= (id) => {

        setPokemons((pokemon) => {
        const index = pokemon.findIndex((el)=> el.id === id);

        const oldItem = pokemon[index];

        const newItem = {...oldItem, isActive: !oldItem.isActive};

        const newArr = [
            ...pokemon.slice(0, index), 
            newItem , 
            ...pokemon.slice(index+1)
        ];
         return newArr;
        });
    };

    return (
        <Layout 
          id={'2'}
          title={'Cards'} 
          colorBg='#1687a7' 
        >
            <div className={s.flex}>
                {
                  pokemon.map(item => <PockemonCard 
                                            key={item.id}
                                            name={item.name}
                                            img={item.img}
                                            id={item.id}
                                            type={item.type}
                                            values = {item.values}
                                            isActive = {item.isActive}
                                            onCardClick = {onCardClick}
                />)}
            </div>
          </Layout>
    )
}

export default GamePage;


