import React, { ReactNode } from 'react';
import { ModalContent, ModalWrapper } from './style';


interface IModalProps{
    children: ReactNode,
    className: string
}

export const Modal = ({children, className}: IModalProps ) => {
    
    return (
        <ModalWrapper>
            <ModalContent
            className={className}>
                {children}
            </ModalContent>
        </ModalWrapper>
    )

}