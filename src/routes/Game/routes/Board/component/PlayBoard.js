import React, { useState } from "react";
import PockemonCard from "../../../../../components/PocemonCard";
import s from './style.module.css';
import cn from 'classnames'

const PlayerBoard = ({ cards, onClickCard, player}) => {
    const [isSelected, setSelected] = useState(null);
    return (
        <>
        { 
            cards.map((item) => 
                        <div className={cn(s.card, {[s.selected]:isSelected === item.id}

                        )}
                        onClick={() => {setSelected(item.id); onClickCard({player, ...item, })}}
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