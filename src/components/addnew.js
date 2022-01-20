import React, {useState,useEffect} from 'react'
import  axios from 'axios';


function Addnew() {
  const [firstName,setFirstName] = useState('')
  const [lastName,setLastName] = useState('')
  const [counts,setCounts] = useState('')


  // this function is used to add new  records to the mongodb through node js
  const handleSubmit = async (e)=>{
    try{
     
      if(firstName !== null && lastName !== null){
      //  e.preventDefault()
        const response =  await fetch(`http://localhost:3001/addRecord`, {
          method: "POST",
          body: JSON.stringify({
              firstname:firstName,
              lastname:lastName
          }),
          headers: {
              "Content-type": "application/json; charset=UTF-8"
          }
      })
      setFirstName('')
      setLastName('')
      const data = await response.json();
        console.log(data)
      }else{
        alert('please fill out the fields')
      }
      
    }catch(err){
      console.log(err)
    }
  }

// This function is used to get the number of counts that the add endpoint has triggred
  const getCounter = async()=>{
    try{
      axios.get(`http://localhost:3001/getCouterForAdd`).then(
        res =>{
            setCounts(res.data[0].updatecount)
            console.log(res)
        }
    ).catch(error =>{
        alert('unable to fetch the Counter')
    })
    }catch(err){
      console.log(err)
    }
  }

  useEffect(()=>{
    getCounter()
  },[])

    return (
      <div className='container'>
         <br />
         <h3>You Have Done Add {counts} Times</h3>
         <br />
          <form onSubmit={handleSubmit}>
            <div class="form-group row">
                <label for="staticEmail" class="col-sm-2 col-form-label">FirtName</label>
                <div class="col-sm-10">
                <input type="text" class="form-control" id="inputfirst" value={firstName} onChange={e=>setFirstName(e.target.value)} placeholder="FirstName" required  />
                </div>
            </div>
            <div class="form-group row">
                <label for="inputPassword" class="col-sm-2 col-form-label">LastName</label>
                <div class="col-sm-10">
                <input type="text" class="form-control" id="LastName" value={lastName} onChange={e=>setLastName(e.target.value)} placeholder="LastName" required />
                </div>
            </div>
            <button type='submit' className='btn btn-success'>Submit</button>
            </form>
      </div>
       
    );
  }

  export default Addnew