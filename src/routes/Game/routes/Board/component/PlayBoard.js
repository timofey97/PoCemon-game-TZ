import React, { useState } from "react";
import PockemonCard from "../../../../../components/PocemonCard";
import s from './style.module.css';
import cn from 'classnames'
import Arrow from '../../../../../assets/arrow.png';

const PlayerBoard = ({ cards, onClickCard, player, disabled}) => {
    const [isSelected, setSelected] = useState(null);
    return (
        <>
         <div className={cn(s.container, { [s.visible]: disabled })}>
        <img className={s.img} src={Arrow} alt="arrow" />
        </div>
            {cards.map((item) => 
                        <div className={cn(s.card, {[s.selected]:isSelected === item.id}
                        )}
                        onClick={() => {if (!disabled) {setSelected(item.id); onClickCard({player, ...item })}}}
                        >
                            <PockemonCard 
                                            key={item.id}
                                            name={item.name}
                                            img={item.img}
                                            pr={item.id}
                                            id={item.id}
                                            type={item.type}
                                            values = {item.values}
                                            isActive
                                            minimize
                                            className = {s.card}
                                            onCardClick ={()=> null}
                                            />
                        </div>                
                )}
        </>
    );
};


export default PlayerBoard;