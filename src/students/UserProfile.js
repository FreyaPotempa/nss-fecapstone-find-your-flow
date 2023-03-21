import { Heading, Text } from '@chakra-ui/react';
import { useContext, useEffect, useState } from 'react';
import { FlowContext } from '../auth/flows/FlowProvider';
import { ProgressChart } from './ProgressChart';


export const UserProfile = () => {
  const { getUserProgress, userProgress, getUserById, user } = useContext(FlowContext)
  const localYogaUserObj = JSON.parse(localStorage.getItem("yoga_user"))

  useEffect(() => {
    getUserProgress(localYogaUserObj.id)
    getUserById(localYogaUserObj.id)
  },[])

  useEffect(() => {
    if (userProgress) {
      userProgress.sort((a, b) => {
        let da = new Date(a.dateCompleted)
        let db = new Date(b.dateCompleted)
        return da - db
      })
    }
  },[userProgress])

  return <>
    <Heading as='h3' size='lg' m='6'>{user.name}</Heading>
    <Text m='4' p='4'>You've completed {userProgress.length} flows</Text>
    <ProgressChart data={userProgress} />
  </>

    
}