import { Flex } from '@chakra-ui/react';
import React from 'react';
import { AiFillCloseCircle } from "react-icons/ai";
import { BiPoll } from "react-icons/bi";
import { BsLink45Deg, BsMic } from "react-icons/bs";
import { IoDocumentText, IoImageOutline } from "react-icons/io5";

type NewPostFormProps = {
    
};

const formTabs = [
    {
      title: "Post",
      icon: IoDocumentText,
    },
    {
      title: "Images & Video",
      icon: IoImageOutline,
    },
    {
      title: "Link",
      icon: BsLink45Deg,
    },
    {
      title: "Poll",
      icon: BiPoll,
    },
    {
      title: "Talk",
      icon: BsMic,
    },
  ];
const NewPostForm:React.FC<NewPostFormProps> = () => {
    
    return (
        <Flex direction='column' bg='white' borderRadius={4} mt={2}>
            <Flex width='100%'></Flex>

        </Flex>
    )
}
export default NewPostForm;