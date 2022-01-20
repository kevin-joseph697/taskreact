import React, { useEffect } from 'react'
import {IoMdCreate, IoMdCheckmarkCircle,IoMdClose,IoMdTrash} from 'react-icons/io'
import axios from 'axios'
import { useState } from 'react/cjs/react.development'



function Table() {

  const [records,setRecords] = useState([])
  const [inEditMode, setInEditMode] = useState({
    status: false,
    rowKey: null
    });
    const [editname,setEditName] = useState('')


  const onEdit = (id) =>{
    setInEditMode({
      status: true,
      rowKey: id.id
  })
  setEditName(id.lastname)
  }

  // when the seleted item is edited and clicked save this function will be executed
  const onSave = async (id)=>{
    try{
      const response =  await fetch(`http://localhost:3001/updateRecords`, {
        method: "PATCH",
        body: JSON.stringify({
            id:id.id,
            lastname:editname
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
    setInEditMode({
      status: false,
      rowKey: null
    })  
    getAllData()
    const data = await response.json();
      console.log(data)

   
    }catch(err){
      console.log(err)
    }
  }

  const onCancel = () =>{

    // reset the inEditMode state value
    setInEditMode({
      status: false,
      rowKey: null
  })
  
  setEditName(null);

  }

  // this function is used to get all the data from mongodb
  const getAllData = ()=>{
    try{
      axios.get(`http://localhost:3001/getAllRecords`).then(
        res =>{
            setRecords(res.data)
            console.log(res)
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
      <div className='container'>
          <br/>
          <table className="table">
            <thead className="thead-dark">
                <tr>
                
                <th scope="col">First Name</th>
                <th scope="col">Last Name</th>
                <th scope="col">Number of Time Updated</th>
                <th scope="col">Action</th>
              
                </tr>
            </thead>
            <tbody>

                {
                  records.map(data=>(
                    <tr>
                    <td>{data.firstname}</td>
                  {/* conditional rendring of elements if it is in the edit mode or not in the edit mode */}
                    <td>
                    {
                                                        
                     inEditMode.status && inEditMode.rowKey === data._id ? (
                       <input type="text" value={editname }
                        onChange={(event) => setEditName(event.target.value)}
                         style={{color:'black'}} />
                          ) : (
                           data.lastname
                            )
                      }
                    </td>

                    <td>{data.updatecount}</td>
                        {
                                        inEditMode.status && inEditMode.rowKey === data._id ? (
                                                                <React.Fragment>
                                                                  
                                                                    <IoMdCheckmarkCircle style={{cursor:'pointer',marginRight:'8px',marginTop:'40px'}}  onClick={() => onSave({id: data._id})} />
                                                                    <IoMdClose style={{cursor:'pointer'}}  onClick={() => onCancel()} />
                                                                    
                                                                </React.Fragment>
                                                            ) : (
                                                              
                                                                   <div> 
                                                                <IoMdCreate style={{cursor:"pointer"} }  onClick ={() => onEdit({id: data._id, lastname: data.lastname})}/>
                                                                </div>
                                                            )
                                                        }
                    </tr>
                  ))
                }
               
             </tbody>
            </table>
           
      </div>
       
    );
  }

  export default Table