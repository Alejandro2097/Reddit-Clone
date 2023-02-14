import { Flex, Icon } from '@chakra-ui/react';
import { Timestamp } from '@google-cloud/firestore';
import { User } from 'firebase/auth';
import { addDoc, collection, serverTimestamp, updateDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import { useRouter } from 'next/router';
import { type } from 'os';
import React, { useState } from 'react';
import { AiFillCloseCircle } from "react-icons/ai";
import { BiPoll } from "react-icons/bi";
import { BsLink45Deg, BsMic } from "react-icons/bs";
import { IoDocumentText, IoImageOutline } from "react-icons/io5";

import { Post } from '../../atoms/postAtom';
import { fireStore, storage } from '../../Firebase/ClientApp';
import ImageUpload from './PostForm/ImageUpload';
import TextInput from './PostForm/TextInput';
import TabItem from "./TabItem";

type NewPostFormProps = {
    user: User;
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
        const newPost: Post ={
          communityId: communityId as string,
          creatorId: user?.uid,
          creatorDisplayName: user.email!.split('@')[0],
          title: textInputs.body,
          body: textInputs.body,
          numberOfComments: 0,
          voteStatus: 0,
          createdAt: serverTimestamp() as Timestamp
        }

        // sotre post in db 
        try {
          const postDocRef = await addDoc(collection(fireStore, 'post'), newPost)
          // check for selectFile
          // store in storage => getDownloadURL (return image url)
      
        
          if(selectedFile) {
            const imageRef = ref(storage, `posts/${postDocRef.id}/image`);
            await uploadString(imageRef, selectedFile, 'data_url');
            const downloadURL = await getDownloadURL(imageRef);
                // update post doc by adding imageURL
            await updateDoc(postDocRef, {
              imageURL: downloadURL,
            });
          }
        } catch (error: any) {
          console.log('Handle create post error', error.message)
        }
        setLoading(false);
        // redirect the user back to the communityPage using the router

        // router.back():
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