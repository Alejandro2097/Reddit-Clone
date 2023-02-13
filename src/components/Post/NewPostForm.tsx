import { Flex, Icon } from '@chakra-ui/react';
import { User } from 'firebase/auth';
import { useRouter } from 'next/router';
import { type } from 'os';
import React, { useState } from 'react';
import { AiFillCloseCircle } from "react-icons/ai";
import { BiPoll } from "react-icons/bi";
import { BsLink45Deg, BsMic } from "react-icons/bs";
import { IoDocumentText, IoImageOutline } from "react-icons/io5";

import { Post } from '../../atoms/postAtom';
import ImageUpload from './PostForm/ImageUpload';
import TextInput from './PostForm/TextInput';
import TabItem from "./TabItem";

type NewPostFormProps = {
    user: User | null | undefined
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
  
const NewPostForm:React.FC<NewPostFormProps> = ({user}) => {
    const router = useRouter(); 
    const [selectedTab, setSelectedTab] = useState(formTabs[0].title);
    const [loading, setLoading] = useState(false);
    const [textInputs, setTextInputs] = useState({
      title: "",
      body: ""
    });
    const [selectedFile, setSelectedFile] = useState<string>();
    const handleCreatePost = async () => {
      const { communityId} = router.query;
        // construct a new object => type post
        const newPostL: Post ={}

        // sotre post in db 

        // check for selectFile
          // store in storage => getDownloadURL (return image url)
          // update post doc by adding imageURL
        
        // redirect the user back to the communityPage using the router
    };

    const onSelectImage = (event: React.ChangeEvent<HTMLInputElement>) => {
      const reader = new FileReader();
      if(event.target.files?.[0]){
        reader.readAsDataURL(event.target.files[0]);
      }

      reader.onload = (readerEvent) => {
        if(readerEvent.target?.result){
          setSelectedFile(readerEvent.target.result as string)
        }
      }
    };

    const onTextChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      ) => {
        const {
          target: {name, value},
        } = event;
        setTextInputs(prev => ({
          ...prev,
          [name]: value,
        }))
      };

    return (
        <Flex direction='column' bg='white' borderRadius={4} mt={2}>
            <Flex width='100%'>
                {formTabs.map((item) => (
                    // eslint-disable-next-line react/jsx-key
                    <TabItem
                      item={item} 
                      key={item.title}
                      selected={item.title === selectedTab} 
                      setSelectedTab={setSelectedTab}/>
                )) }
            </Flex>
            <Flex p={4}>
              {selectedTab === "Post" && (
                <TextInput  
                  textInputs={textInputs}
                  handleCreatePost={handleCreatePost}
                  onChange={onTextChange}
                  loading={loading}
                />
              )}
              {selectedTab === "Images & Video" && (
                <ImageUpload 
                  selectedFile={selectedFile}
                  onSelectImage={onSelectImage}
                  setSelectedTab={setSelectedTab}
                  setSelectedFile={setSelectedFile}
                />
              )}
            </Flex>

        </Flex>
    )
}
export default NewPostForm;