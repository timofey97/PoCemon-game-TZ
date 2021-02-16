import s from './style.module.css';
import React, {useContext, useEffect, useState} from 'react';
import { useHistory} from 'react-router-dom';
import { PokemonContext} from '../../../../context/PokemonsContent';
import PockemonCard from '../../../../components/PocemonCard';
import PlayerBoard from './component/PlayBoard';
import ArrowChoice from './component/ArrowChoice/ArrowChoice';
import Result from './component/Result/Result';

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

const randomSide = () => {
  let random = Math.floor(1 + Math.random() * 2);
  return random;
};

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
    const [side, setSide] = useState(0);
    const [stop, setStop] = useState(false);

    const [resultType, setResultType] = useState(null);
    const history = useHistory();

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
    setTimeout(() => {
      setSide(randomSide);
    }, 3000);
        
    }, [])

    const handleClickBoardPlate= async (position) => {
        if(choiseCar) {
            setStop(true);
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
             setSide((prevState) => {
                if (prevState === 1) {
                return 2;
                }
                if (prevState === 2) {
                return 1;
                }
            });
            }
        }


          useEffect(() => {
                if (steps === 9) {
                const [count1, count2] = counterWin(board, player1, player2);
                if (count1 > count2) {
                    setResultType('win');
                    setTimeout(() => {
                   SelectedContext.onGameFinished('WIN');
                }, 1000);
                } else if (count1 < count2) {
                    setResultType('lose');
                    setTimeout(() => {
                   SelectedContext.onGameFinished('LOSE');
                }, 1000);
                } else {
                    setResultType('draw');
                    setTimeout(() => {
                   SelectedContext.onGameFinished('DRAW');
                }, 1000);
                }
                console.log(resultType)
                
                }
            }, [steps]);


    return (
        <div className={s.root}>
            <Result type={resultType} />
            <ArrowChoice stop={stop} side={side} />

            <div className={s.playerOne}>
                <PlayerBoard 
                player={1}
                cards={player1} 
                onClickCard={(card)=> { if (side === 1) {setChoiseCard(card)}}} 
                disabled={side !== 1}/>


                
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
                <PlayerBoard 
                    player={2} 
                    cards={player2} 
                    onClickCard={(card)=> {if (side === 2) {setChoiseCard(card)} }} 
                    disabled={side !== 2}/>
            </div>
        </div>
    );
};

export default BoardPage;