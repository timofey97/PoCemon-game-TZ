import React, { useEffect, useRef } from 'react'

import s from './style.module.css';
import cn from 'classnames';

const Modal = ({title,children,onCloseModal, isOpen }) => {
    const modalEl = useRef();
    useEffect(() => {
        document.querySelector('body').style.overflow = isOpen ? 'hidden' : null;
    }, [isOpen])
    const hanleCloseModal = () => {
        onCloseModal && onCloseModal(false)
    }
    const handleClickRoot = (event) => {
        if (!modalEl.current.contains(event.target)) {
            hanleCloseModal();
        }
 

    }
    return (
        <div className={cn(s.root, {[s.open]: isOpen})}
            onClick={handleClickRoot}>
            <div 
                ref={modalEl}
                className={s.modal}>
                <div className={s.head}>
                     {title}
                    <span className={s.btnClose}
                          onClick={hanleCloseModal}
                            ></span>
                </div>
                <div className={s.content}>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default Modal;

