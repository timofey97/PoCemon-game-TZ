import s from './style.module.css';
import {useContext, useEffect, useState} from 'react';
import { useHistory} from 'react-router-dom';
import { PokemonContext} from '../../../../context/PokemonsContent';
import PockemonCard from '../../../../components/PocemonCard';
import PlayerBoard from './component/PlayBoard';

const counterWin = (board, player1, player2) => {
    let player1Count = player1.length;
    let player2Count = player2.length;

    board.forEach(element => {
        if(element.card.possession === 'red') {
            player2Count++;
        }
        if(element.card.possession === 'blue') {
            player1Count++;
        }
        
    });
    return [player1Count, player2Count]
}

const BoardPage = () => {
      const SelectedContext = useContext(PokemonContext);
    const [board, setBoard] = useState([]);
    const [player2, setPlayer2] = useState([]);
    const [player1, setPlayer1] = useState(()=> {
        return SelectedContext.selectedPokemons.map(item => ({
            ...item, possession: 'blue', isSelected: false
        }))
    });
    const [choiseCar, setChoiseCard] = useState(null);
    const [steps, setStaps] =useState (0);
    const history = useHistory();

      const _gameFinished = (result) => {
        SelectedContext.onGameFinished(result);
        };
    

    if(SelectedContext.selectedPokemons.length === 0 ) {
        history.replace('/game');
    }

    useEffect( ()=> {
         async function FetchData () {
        const boardRespons = await fetch('https://reactmarathon-api.netlify.app/api/board');
        const boardRequest = await boardRespons.json();
         setBoard(boardRequest.data);

         const player2Response = await fetch('https://reactmarathon-api.netlify.app/api/create-player');
         const player2Request = await player2Response.json();
            SelectedContext.addOpponentPokemons(player2Request.data);
         setPlayer2(()=> {
        return player2Request.data.map(item => ({
            ...item, possession: 'red',
        }))
    })}
        FetchData();
    }, [])

    const handleClickBoardPlate= async (position) => {
        if(choiseCar) {
            const params ={
                position,
                card: choiseCar,
                board
            }


            const res = await fetch('https://reactmarathon-api.netlify.app/api/players-turn', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(params),
            });

            const request = await res.json();
            
            if (choiseCar.player === 1) {
                setPlayer1(prevState => prevState.filter(item => item.id !== choiseCar.id))
            }
            if (choiseCar.player === 2) {
                setPlayer2(prevState => prevState.filter(item => item.id !== choiseCar.id))
            }
            setBoard(request.data);
            setStaps( prevState => {
                const count = prevState+1;
                return count
            })
            }
        }


        useEffect(()=> {
            if(steps === 9) {
                const [count1, count2] = counterWin(board,player1,player2)
                if(count1 > count2){
                    _gameFinished('WIN')
                } else if (count1 < count2) {
                    _gameFinished('LOSE')
                } else {
                    _gameFinished ('DRAW')
                }
            }
        }, [steps])
    return (
        <div className={s.root}>
            <div className={s.playerOne}>
                <PlayerBoard 
                player={1}
                cards={player1} 
                onClickCard={(card)=>setChoiseCard(card)} />


                
            </div>
            <div className={s.board}>
                {
                    board.map(item => (
                        <div
                            key={item.position}
                            className={s.boardPlate}
                            onClick={() => !item.card && handleClickBoardPlate(item.position)}>
                                {
                                    item.card && <PockemonCard {...item.card} minimize isActive className ={s.card} onCardClick={()=> console.log('s')}/>
                                }
                        </div>
                    ))
                }
            </div>
            <div className={s.playerTwo}>
                <PlayerBoard player={2} cards={player2} onClickCard={(card)=>setChoiseCard(card)} />
            </div>
        </div>
    );
};

export default BoardPage;