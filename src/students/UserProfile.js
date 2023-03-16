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
      console.log(sortedComplete)
    }
  },[userProgress])

  return <>
    <h2>{user.name}</h2>
    <div>You've completed {userProgress.length} flows</div>
    <ProgressChart data={userProgress} />
  </>


//   //progress chart
//   // X axis is sorted by date completed
//   // Y axis is the difficulty
//   return <LineChart
//   width={400}
//   height={400}
//   // data={data}
//   margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
// >
//   <XAxis dataKey="name" />
//   <Tooltip />
//   <CartesianGrid stroke="#f5f5f5" />
//   <Line type="monotone" dataKey="uv" stroke="#ff7300" yAxisId={0} />
//   <Line type="monotone" dataKey="pv" stroke="#387908" yAxisId={1} />
// </LineChart>

    
}