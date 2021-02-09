import firebase from 'firebase/app';
import 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyB-qoV9hc3g81F6O37I66AWXYjQjlIKL5s",
  authDomain: "pokemongame-367d1.firebaseapp.com",
  databaseURL: "https://pokemongame-367d1-default-rtdb.firebaseio.com",
  projectId: "pokemongame-367d1",
  storageBucket: "pokemongame-367d1.appspot.com",
  messagingSenderId: "259713470234",
  appId: "1:259713470234:web:528bb1fac363acc351e6a3"
};

firebase.initializeApp(firebaseConfig);

export default class Firebase {
  constructor() {
    if (!firebase.apps.length) {
   firebase.initializeApp({});
}else {
   firebase.app();
}

    this.fire = firebase;
    this.database = this.fire.database();
  }

  getPokemonSocket = ( cb ) => {
        this.database.ref( 'pokemons' ).on( 'value', ( snapshot ) => {
            cb( snapshot.val() );
        })
    }
  getPokemonsOnce = async () => {
    return await this.database.ref('pokemons').once('value').then(snapshot => snapshot.val());
  }

  postPokemon = (key, pokemon) => {
    this.database.ref(`pokemons/${key}`).set(pokemon);
  }

  addPokemon = (data) => {
    const newKey = this.database.ref().child('pokemons').push().key;
    this.database.ref(`pokemons/${newKey}`).set(data);
  }

  falseInStart =  (Trigger, cb) => {
   this.database.ref("pokemons").once("value", (snapshot) => {
        snapshot.forEach((child) => {child.ref.update({isActive: {Trigger}}); 
                                    });
        }).then(()=> cb());
      }
}
