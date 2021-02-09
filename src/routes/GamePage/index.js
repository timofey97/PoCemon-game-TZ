import {useState, useEffect} from 'react';
import database from '../../data/firebase';

import s from './style.module.css';
import cn from 'classnames'

import POKEMONS from '../../components/PocemonCard/Cads.json';

import PockemonCard from '../../components/PocemonCard';
import Layout from '../../components/Layout';
import Spinner from '../../components/spinner'



const GamePage = () => {
    const [pokemon, setPokemons] = useState({});
    const [loaded, setLoaded] = useState(true);
 
    useEffect(() => {
        new Promise((resolve) => {
        database.ref("pokemons").once("value", function(snapshot) {
        snapshot.forEach(function(child) {
            child.ref.update({
            isActive: false
            });
            resolve()
        });
        });
        })
        .then( () =>
                database.ref('pokemons').once('value', (snapshot)=> {
                    setPokemons(snapshot.val());
                    setLoaded(false)
                })
                
        );
    },[]);

    const onCardClick = (id) => {
        setPokemons(prevState => {
        return Object.entries(prevState).reduce((acc, item) => {
            const pokemona = {...item[1]};
            if (item[0] === id) {
                pokemona.isActive = !pokemona.isActive;
                database.ref('pokemons/' +item[0]).set({...item[1],isActive: pokemona.isActive })
            };
            acc[item[0]] = pokemona;
            return acc;
            }, {});
            });
    };

    const AddNewCard = () => {
        const newPostKey = database.ref().child('pokemons').push().key;
        var updates = {};
        updates['/pokemons/' + newPostKey] = POKEMONS;

        new Promise((resolve) => {
            database.ref().update(updates);
            resolve()
            })
            .then( () =>
                    database.ref('pokemons').once('value', (snapshot)=> {
                        setPokemons(snapshot.val());
                    })
            );
    }

    return (
        <Layout 
            id={'2'}
            title={'Cards'} 
            colorBg='#1687a7' 
        >
            <div className={s.container}>
            <button 
                className={cn(s.btn, s.btnhome)} 
                onClick={AddNewCard}
                >
                    Add new Pokemon Card
            </button>
            </div>

            <div className={s.flex}>
                {loaded ? <Spinner/> :
                    Object.entries(pokemon).map(([key,{name,img,id,type,values,isActive}]) => <PockemonCard 
                                            key={key}
                                            name={name}
                                            img={img}
                                            id={id}
                                            pr={key}
                                            type={type}
                                            values = {values}
                                            isActive = {isActive}
                                            onCardClick = {onCardClick}
                />)}
            </div>
        </Layout>
    )
}

export default GamePage;


