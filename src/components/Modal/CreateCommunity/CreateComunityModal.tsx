import { auth, fireStore } from '@/src/Firebase/ClientApp';
import { Box, Button, Checkbox, Flex, Icon, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, Text } from '@chakra-ui/react';
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';
import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { BsFillEyeFill, BsFillPersonFill } from 'react-icons/bs';
import { HiLockClosed } from 'react-icons/hi';

type CreateComunityModalProps = {
    open: boolean;
    handleClose: () => void;
};

const CreateComunityModal:React.FC<CreateComunityModalProps> = ({
    open,
    handleClose}) => {
        const [user] = useAuthState(auth); 
        const [communityName, setCommunityName] = useState('');
        const [charsRemaining, setCharsRemaining] = useState(21);
        const [communityType, setCommunityType] = useState("public");
        const [error, setError] = useState('');
        const [loading, setLoading] = useState(false);

        const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
          if(event.target.value.length > 21) return 
          setCommunityName(event.target.value);
          // Recalculate how many chars we have left in name
          setCharsRemaining(21 - event.target.value.length);
        }

        const onCommunityTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
          setCommunityType(event.target.name)
        }

        const handleCreateCommunity = async () => {
          if(error) setError("");
          // validate community name
          const format = /[ `!@#$%^&*()+\-=\[\]{};':"\\|,.<>\/?~]/;
          if(format.test(communityName) || communityName.length < 3) {
            setError('Community names must be between 3-21 characters, and can only contain letters, numbers or underscores.');
            return;
          };
          

          setLoading(true);

          try {
              // create the community document  in firestore
              // Check the name is not taken 
              // if valid name create community
            const communityDocRef = doc(fireStore, 'communities', communityName);

            // Chacks if community exist in DB
            const communityDoc = await getDoc(communityDocRef);

            if(communityDoc.exists() ) {
              throw new Error(`Sorry, r/${communityName} is already taken. Try another.`);
              
            }

            // Create community
            await setDoc(communityDocRef, {
              // Creator Id
              creatorId: user?.uid,
              createdAt: serverTimestamp(),
              numberOfMembers: 1,
              privacyType: communityType,
            });
            setLoading(false);
          } catch(error: any) {
            console.log('handleCreateCommunityError', error);
            setError(error.message)
          }
          // create the community document  in firestore
            // Check the name is not taken 
            // if valid name create community
          const communityDocRef = doc(fireStore, 'communities', communityName);
          const communityDoc = await getDoc(communityDocRef);

          if(communityDoc.exists() ) {
            setError(`Sorry, r/${communityName} is already taken. Try another.`);
            return;
          }

          // Create community
          await setDoc(communityDocRef, {
            // Creator Id
            creatorId: user?.uid,
            createdAt: serverTimestamp(),
            numberOfMembers: 1,
            privacyType: communityType,
          });
          setLoading(false);
        }
        return (
            <>
        
              <Modal isOpen={open} onClose={handleClose} size="lg">
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader display="flex" 
                               flexDirection="column"
                               fontSize={15}
                               padding={3}
                    >Create a community</ModalHeader>
                  <Box pl={3} pr={3}>
                    <ModalCloseButton />
                    <ModalBody display='flex'
                               flexDirection='column'
                               padding="10px 0px">
                      <Text fontWeight={600} fontSize={15}>
                        Name
                      </Text>
                      <Text fontSize={11} color='gray.500'>
                        Community names including capitalization cannot be changed
                      </Text>
                      <Text position="relative"
                            top="28px"
                            left='10px'
                            width="20px"
                            color="gray.400"
                            >r/</Text>
                      <Input position="relative"
                             value={communityName}
                             size='sm'
                             pl="22px"
                             onChange={handleChange}
                             />
                      <Text fontSize="9pt" 
                            color={charsRemaining === 0 ? "red" : "gray.500"}>
                        {charsRemaining} Characters remaining
                      </Text>
                      <Text fontSize='9pt' color="red" pt={1}>
                        {error}
                      </Text>
                      <Box mt={4} mb={4}>
                        <Text fontWeight={600}
                              fontSize={15}>
                              Community Type
                        </Text>
                        {/* chackbox */}
                        <Stack spacing={2}>
                          <Checkbox name="public" 
                                    isChecked={communityType === 'public'}
                                    onChange={onCommunityTypeChange}
                                    >
                            <Flex align='center'>
                              <Icon as={BsFillPersonFill} color='gray.500' mr={2}/>
                              <Text fontSize="10pt" mr={1}>
                                Public
                              </Text>
                              <Text fontSize='8pt' color='gray.500' pt={1}>
                                Anyone can view, post, and comment to this community
                              </Text>
                            </Flex>
                          </Checkbox>
                          <Checkbox name="restricted"
                                    isChecked={communityType === 'restricted'}
                                    onChange={onCommunityTypeChange}>
                            <Flex align='center'>
                              <Icon as={BsFillEyeFill} color='gray.500' mr={2}/>
                              <Text fontSize="10pt" mr={1}>
                                Restricted
                              </Text>
                              <Text fontSize='8pt' color='gray.500' pt={1}>
                                Anyone can view this community, but only approved user can post
                              </Text>
                            </Flex>
                          </Checkbox>
                          <Checkbox name="private" 
                                    isChecked={communityType === 'private'}
                                    onChange={onCommunityTypeChange}>
                            <Flex align='center'>
                            <Icon as={HiLockClosed} color='gray.500' mr={2}/>
                              <Text fontSize="10pt" mr={1}>
                                Private
                              </Text>
                              <Text fontSize='8pt' color='gray.500' pt={1}>
                                Only approved users can view and submit to this community
                              </Text>
                            </Flex>
                          </Checkbox>
                        </Stack>
                      </Box>
                    </ModalBody>
                  </Box>
                
                  <ModalFooter>
                    <Button variant="outline" height="30px" mr={2} onClick={handleClose}>
                      Close
                    </Button>
                    <Button variant="solid"  height="30px"  isLoading={loading} onClick={handleCreateCommunity}>Create Community</Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>
            </>
          )
}
export default CreateComunityModal;