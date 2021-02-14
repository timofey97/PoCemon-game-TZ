import s from './style.module.css';
import { useContext, useState } from 'react';
import {useHistory} from 'react-router-dom';
import {PokemonContext} from '../../../../context/PokemonsContent';
import PokemonCard from '../../../../components/PocemonCard';
import { FireBaseContext } from '../../../../context/FirebaseContext';

  

const FinishPage = () => {
    const pokemonContext = useContext(PokemonContext);
    const history = useHistory()
    const [isPokemonAdded, setPokemonAdded] = useState(false);
    const firebase = useContext( FireBaseContext );


    if (!pokemonContext.gameResult) {
        history.replace('/game');
    }

    const handleClick = () => {
        pokemonContext.clearContext();
        history.push('/game');
    };

    const handleAddNewPokemon = async (card) => {
        setPokemonAdded(!isPokemonAdded);
        if (!isPokemonAdded) {
        await firebase.addPokemon(card);
        }
        
    };

    return (
        <>
      
      <div className={s.container}>
          <h1 className={s.title}>You {pokemonContext.gameResult}</h1>
        <div className={s.playerOne}>
          {
            pokemonContext.selectedPokemons.map(({name, type, img, id, values}) => (
              <PokemonCard
                className={s['large-card']}
                name = {name}
                type = {type}
                img = {img}
                id = {id}
                values = {values}
                isActive
              />
            ))
          }
        </div>
        <div>

          <button className={s.button} onClick={handleClick}>
          END GAME
        </button>
        </div>
        {pokemonContext.gameResult === "WIN"? <h1 className={s.title}>Choose one card</h1> : null}
        <div className={s.playerTwo}>
          {
            pokemonContext.opponentPokemon.map((card) => (
              <PokemonCard
                className={s['large-card']}
                name = {card.name}
                type = {card.type}
                img = {card.img}
                id = {card.id}
                values = {card.values}
                isActive
                onCardClick={async () => {
                if (pokemonContext.gameResult === 'WIN' && !isPokemonAdded) {
                  await handleAddNewPokemon(card)
                }
            }}
              />
            ))
          }
        </div>
      </div>

    </>
    );
};

export default FinishPage;