import { PlusSquareIcon } from '@chakra-ui/icons'
import { Button, Center, Heading } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import AddCategory from './AddCategory'
import { useDispatch, useSelector } from 'react-redux'
import { getcat } from '../../Redux/Admin/GetCat/Action'
import CatTable from './CatTable'

export default function Category() {
   const [handlecategory,setHandlecategory]=useState(false) 
   const dispatch=useDispatch()
   const storedcatdata=useSelector((state)=>state.getcatreducer)
   const {getcatisLoading,getcatisError,result}=storedcatdata
   const [categories,SetCategories]=useState([])
   const [random,setRandom]=useState(false)
  //  console.log('result',result)
  // console.log(categories,'categories')
   useEffect(()=>{
dispatch(getcat)
// SetCategories(result)
   },[random])
   const refonadd=()=>{
    setRandom(!random)
   }
  return (
    <div>
  <Heading textAlign={"center"} >Category</Heading>
  {/* <Button onClick={()=>setHandlecategory(!handlecategory)}>Add Category <PlusSquareIcon/></Button> */}

<AddCategory refonadd={refonadd}/>
{getcatisLoading?<Heading><Center>Loading...</Center></Heading>:getcatisError?<Heading><Center>
  Something going wrong...</Center></Heading>:
  <CatTable data={result}/>}

    </div>
  )
}
