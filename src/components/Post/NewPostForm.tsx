import { Flex, Icon } from '@chakra-ui/react';
import { type } from 'os';
import React, { useState } from 'react';
import { AiFillCloseCircle } from "react-icons/ai";
import { BiPoll } from "react-icons/bi";
import { BsLink45Deg, BsMic } from "react-icons/bs";
import { IoDocumentText, IoImageOutline } from "react-icons/io5";

import TextInput from './PostForm/TextInput';
import TabItem from "./TabItem";

type NewPostFormProps = {
    
};

const formTabs:TabItems[]  = [
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

  export type TabItems = {
    title: string;
    icon: typeof Icon.arguments;
  };
  
const NewPostForm:React.FC<NewPostFormProps> = () => {
    const [selectedTab, setSelectedTab] = useState(formTabs[0].title);
    const [textInputs, setTextInputs] = useState({
      title: "",
      body: ""
    });
    const [selectedFile, setSelectedFile] = useState<string>();
    const handleCreatePost = async () => {

    };

    const onSelectImage = () => {};

    const ontTextChange = () => {};
    return (
        <Flex direction='column' bg='white' borderRadius={4} mt={2}>
            <Flex width='100%'>
                {formTabs.map((item) => (
                    // eslint-disable-next-line react/jsx-key
                    <TabItem item={item} 
                             selected={item.title === selectedTab} 
                             setSelectedTab={setSelectedTab}/>
                )) }
            </Flex>
            <Flex p={4}>
              <TextInput/>
            </Flex>

        </Flex>
    )
}
export default NewPostForm;