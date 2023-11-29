import { PlusSquareIcon } from '@chakra-ui/icons'
import { Button, Heading } from '@chakra-ui/react'
import React, { useState } from 'react'
import AddCategory from './AddCategory'

export default function Category() {
   const [handlecategory,setHandlecategory]=useState(false) 
   
  return (
    <div>
  <Heading textAlign={"center"} >Category</Heading>
  {/* <Button onClick={()=>setHandlecategory(!handlecategory)}>Add Category <PlusSquareIcon/></Button> */}

<AddCategory/>
    </div>
  )
}
