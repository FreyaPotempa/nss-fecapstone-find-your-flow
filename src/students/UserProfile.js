import { useContext, useEffect, useState } from 'react';
import { FlowContext } from '../auth/flows/FlowProvider';
import { ProgressChart } from './ProgressChart';


export const UserProfile = () => {
  const { getUserProgress, userProgress, getUserById, user } = useContext(FlowContext)
  const [sortedComplete, setSortedComplete ] = useState([])
  const localYogaUserObj = JSON.parse(localStorage.getItem("yoga_user"))

  useEffect(() => {
    getUserProgress(localYogaUserObj.id)
    getUserById(localYogaUserObj.id)
  },[])

  useEffect(() => {
    if (userProgress) {
      const progressSortedbyDate = userProgress.sort((a, b) => {
        let da = new Date(a.dateCompleted)
        let db = new Date(b.dateCompleted)
        return da - db
      })
      setSortedComplete(progressSortedbyDate)
    }
  },[userProgress])

  return <>
    <h2>{user.name}</h2>
    <div>You've completed {userProgress.length} flows</div>
    <ProgressChart data={userProgress} />
  </>

    
}