
import './App.css';
import MyComponent from './components/addnew';
import Table from './components/table'
import Split from 'react-split'
import NewComponent from './components/newcomponent';
import { useState } from 'react/cjs/react.development';
import { useEffect } from 'react';
import axios from 'axios';

function App() {
  const [data,setData] = useState('')
  const getAllData = ()=>{
    try{
      axios.get(`http://localhost:3001/getAllRecords`).then(
        res =>{
            setData(res.data)
            console.log('****************************',res)
        }
    ).catch(error =>{
        alert('unable to fetch the records')
    })
    }catch(err){
      console.log(err)
    }
  }

useEffect(()=>{
  getAllData()
},[])

  return (
   
          <Split
            direction="vertical"
            style={{height:'95vh' }}
        >
          <Split  className='flex'>
          <div >
            <MyComponent />
          </div>
          <div style={{backgroundColor:'white'}}>
          <NewComponent />
          </div>
          </Split>
            
         
         <div>
            <Table />
         </div>
           
          
          </Split>
     
  
  );
}

export default App;
