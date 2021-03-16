import s from './style.module.css';
import { useContext, useState } from 'react';
import {useHistory} from 'react-router-dom';
import {PokemonContext} from '../../../../context/PokemonsContent';
import PokemonCard from '../../../../components/PocemonCard';
import { FireBaseContext } from '../../../../context/FirebaseContext';
import { selectLocalID } from '../../../../store/user';
import { useSelector } from 'react-redux';

  

const FinishPage = () => {
    const pokemonContext = useContext(PokemonContext);
    const history = useHistory()
    const [isPokemonAdded, setPokemonAdded] = useState(false);
    const [selectedCard, setSelectedCard] = useState(null);
    const localId = useSelector(selectLocalID);

    if(pokemonContext.gameResult === 'LOSE') {
      setPokemonAdded(true);
    }

    if (!pokemonContext.gameResult) {
        history.replace('/game');
    }
    console.log(selectedCard);
    const handleClick = async() => {
          const idToken = localStorage.getItem('idToken');
         await fetch(`https://pokemongame-367d1-default-rtdb.firebaseio.com/${localId}/pokemons.json?auth=${idToken}`, {
                        method: 'POST',
                        body: JSON.stringify(selectedCard)
                })
        pokemonContext.clearContext();
        history.push('/game');
    };

    // const handleAddNewPokemon = async (card) => {
    //     setPokemonAdded(!isPokemonAdded);        
    // };

    return (
        <>
      
      <div className={s.container}>
          <h1 className={s.title}>You {pokemonContext.gameResult}</h1>
        <div className={s.playerOne}>
          {
            pokemonContext.selectedPokemons.map(({name, type, img, id, values}) => (
              <PokemonCard
              key={id}
                className={s['large-card']}
                name = {name}
                type = {type}
                img = {img}
                id = {id}
                values = {values}
                isActive
                minimize = {false}
              />
            ))
          }
        </div>
        <div>

          <button className={s.button}  onClick={handleClick}>
          END GAME
        </button>
        </div>
        {pokemonContext.gameResult === "WIN"? <h1 className={s.title}>Choose one card</h1> : null}
        <div className={s.playerTwo}>
          {
            pokemonContext.opponentPokemon.map((card) => (
              <PokemonCard
              key={card.id}
                className={s['large-card'] }
                name = {card.name}
                type = {card.type}
                img = {card.img}
                id = {card.id}
                values = {card.values}
                isActive
                isSelected = {selectedCard && selectedCard.id === card.id}
                minimize = {false}
                onCardClick={() => {
                if (pokemonContext.gameResult === 'WIN') {
                  setSelectedCard(card);
                  setPokemonAdded(!isPokemonAdded); 
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