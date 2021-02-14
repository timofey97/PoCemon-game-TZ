import {Switch, Route, useRouteMatch, useHistory} from 'react-router-dom'
import { PokemonContext } from '../../../context/PokemonsContent';
import BoardPage from './Board';
import FinishPage from './Finish';
import StartPage from './Start';
import { FireBaseContext } from '../../../context/FirebaseContext';
import { useContext, useState, useEffect } from 'react';

const GamePage = () => {
    const match = useRouteMatch();
    const history = useHistory();
    const firebase = useContext( FireBaseContext );
    const [ selectedPokemons, setSelectedPokemons ] = useState([]);
    const [ pokemons, setPokemons ] = useState({});
    const [opponentPokemon, setOpponentPokemon] = useState([]);
    const [gameResult, setGameResult] = useState(null);

    const hendleOpponentPokemon = (pokemons) => {
        setOpponentPokemon((prevState) => {
        return [
            ...prevState,
            ...pokemons,
        ]
        })
    }
    console.log(opponentPokemon);

    const hendleClearContext = () => {
    
        setOpponentPokemon([]);
        setGameResult(null);
        
    }

    useEffect( () => {
        hendleClearContext();
        firebase.getPokemonSocket( ( pokemons ) => {
            setPokemons( pokemons );
        })

        return () => firebase.offPokemonSocket();
    }, [] );

    const handleSelectedPokemons = ( id ) => {
        setSelectedPokemons( () => {
            return [];
        })

        setPokemons( prevState => {
            return Object.entries( prevState ).reduce( ( acc, item ) => {
                const pokemon = { ...item[1] };
                if( item[0] === id ) {
                    pokemon.isSelected = !pokemon.isSelected ;
                };

                acc[item[0]] = pokemon;

                if( pokemon.isSelected ) {
                    setSelectedPokemons( prevState => {
                        return [ ...prevState, pokemon ];
                    })
                }

                return acc;
            }, {});
        });
    }

      const handleGameFinished = (result) => {
        setGameResult(result);
        history.push('/game/finish');
    };
    
    return (
        <PokemonContext.Provider value = {{
            selectedPokemons,
            onSetSelected: handleSelectedPokemons,
            allPokemons: pokemons,
            opponentPokemon,
            addOpponentPokemons: hendleOpponentPokemon,
            clearContext: hendleClearContext,
            gameResult,
            onGameFinished: handleGameFinished
        }}>
        <Switch>
            <Route path={`${match.path}/`} exact component={StartPage} />
            <Route path={`${match.path}/board`} component={BoardPage} />
            <Route path={`${match.path}/finish`} component={FinishPage} />
        </Switch>
        </PokemonContext.Provider>
    );
};

export default GamePage;

