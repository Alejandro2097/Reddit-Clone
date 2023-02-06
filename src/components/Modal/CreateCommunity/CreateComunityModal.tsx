import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/react';
import React from 'react';

type CreateComunityModalProps = {
    open: boolean;
    handleClose: () => void;
};

const CreateComunityModal:React.FC<CreateComunityModalProps> = ({
    open,
    handleClose}) => {
    
        return (
            <>
        
              <Modal isOpen={open} onClose={handleClose}>
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader>Modal Title</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody>
                    There is the modal body
                  </ModalBody>
        
                  <ModalFooter>
                    <Button colorScheme='blue' mr={3} onClick={handleClose}>
                      Close
                    </Button>
                    <Button variant='ghost'>Secondary Action</Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>
            </>
          )
}
export default CreateComunityModal;