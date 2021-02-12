import {Switch, Route, useRouteMatch} from 'react-router-dom'
import { PokemonContext } from '../../../context/PokemonsContent';
import BoardPage from './Board';
import FinishPage from './Finish';
import StartPage from './Start';
import { FireBaseContext } from '../../../context/FirebaseContext';
import { useContext, useState, useEffect } from 'react';
import POKEMONS from '../../../components/PocemonCard/Cads.json';

const GamePage = () => {
    const match = useRouteMatch();
    const firebase = useContext( FireBaseContext );
    const [ selectedPokemons, setSelectedPokemons ] = useState([]);
    const [ pokemons, setPokemons ] = useState({});


    useEffect( () => {
        firebase.getPokemonSocket( ( pokemons ) => {
            setPokemons( pokemons );
        })
    }, [] );

    const AddNewCard = () => {
        firebase.addPokemon(POKEMONS)
    }

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
                        return [ ...prevState, [ item[0], pokemon ] ];
                    })
                }

                return acc;
            }, {});
        });
    }
    
    return (
        <PokemonContext.Provider value = {{
            selectedPokemons,
            onSetSelected: handleSelectedPokemons,
            allPokemons: pokemons,
            AddNewCard
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