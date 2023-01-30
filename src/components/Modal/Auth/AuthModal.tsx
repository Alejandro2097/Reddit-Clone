import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from '@chakra-ui/react';
import React from 'react';
import { useRecoilState } from 'recoil';

import { authModalState } from '../../../atoms/authModalAtom';

type AuthModalProps = {
    
};

const AuthModal:React.FC<AuthModalProps> = () => {
    const [modalState, setModalState] = useRecoilState(authModalState)
    const handleClose = () => {
        setModalState((prev: any) => ({
            ...prev,
            open: false,
        }))
    }
    return (
        <>
            <Modal isOpen={modalState.open} onClose={handleClose}>
                <ModalOverlay />
                <ModalContent>
                <ModalHeader>Modal Title</ModalHeader>
                <ModalCloseButton />
                    <ModalBody>
                        Here is the modal body
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}
export default AuthModal;

