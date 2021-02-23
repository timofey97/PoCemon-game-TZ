import {Switch, Route, useRouteMatch, useHistory} from 'react-router-dom'
import { PokemonContext } from '../../../context/PokemonsContent';
import BoardPage from './Board';
import FinishPage from './Finish';
import StartPage from './Start';
import { useContext, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPokemonsAsync, selectPokemonsData } from '../../../store/pokemons';

const GamePage = () => {
    const match = useRouteMatch();
    const history = useHistory();

    const [ selectedPokemons, setSelectedPokemons ] = useState([]);
    const [ pokemons, setPokemons ] = useState({});
    const [opponentPokemon, setOpponentPokemon] = useState([]);
    const [gameResult, setGameResult] = useState(null);

    const pokemonsRedux = useSelector(selectPokemonsData)
    const dispatch = useDispatch()

    const hendleOpponentPokemon = (pokemons) => {
        setOpponentPokemon((prevState) => {
        return [
            ...prevState,
            ...pokemons,
        ]
        })
    }

    const hendleClearContext = () => {
    
        setOpponentPokemon([]);
        setGameResult(null);
        
    }

    useEffect( () => {
        hendleClearContext();
        dispatch(getPokemonsAsync());
    }, [] );

    useEffect(()=> {
        setPokemons(pokemonsRedux);
    }, [pokemonsRedux]);

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
        history.replace('/game/finish');
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

