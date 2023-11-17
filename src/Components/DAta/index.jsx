import axios from 'axios'
import React, { useEffect, useState } from 'react'
import "./index.css"


const Data = () => {

    const [data, setData] = useState([])
const [inpValue, setInpValue] = useState("")

const [category, setCategory] = useState("all")


function handleCategoryBtn(id) {
    setCategory(id)
}

const handleSearch=(e)=>{
    setInpValue(e.target.value.toLocaleLowerCase())
}
const handleSortLowtoExp =()=>{
    
   setData([...data].sort((a,b) => (a.unitPrice > b.unitPrice) ? 1 : ((b.unitPrice > a.unitPrice) ? -1 : 0)))
}

const handleSortEXtoLOW=()=>{
    
    setData([...data].sort((a,b) => (a.unitPrice < b.unitPrice) ? 1 : ((b.unitPrice < a.unitPrice) ? -1 : 0)))
 }
 
    const baseUrl = "https://northwind.vercel.app/api/products"


    const datalar = async () => {
        try {
            const response = await axios(baseUrl)
            console.log(data);
            setData(response.data);

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {

        datalar()

    }, [])

    return (
        <>
        <input type="search" className='search' onChange={handleSearch} />
        <button onClick={handleSortEXtoLOW}>expensive</button>
        <button onClick={handleSortLowtoExp}>cheap</button>
        <br />
        <button onClick={()=>handleCategoryBtn(1)}>Category1</button>
        <button onClick={()=>handleCategoryBtn(2)}>Category2</button>
        <button onClick={()=>handleCategoryBtn(3)}>Category3</button>
            <table>
                <thead>
                    <tr>
                        <th>quantityPerUnit</th>
                        <th>unitsInStock</th>
                        <th>name</th>
                        <th>unitPrice</th>
                        <th>categoryId</th>
                    </tr>
                </thead>
                 <tbody>
                {
                    data && data
                    .filter((item)=>item.name.toLocaleLowerCase().includes(inpValue))
                    .filter(item=>item.categoryId === category || category === "all")
                    .map((item) =>


                            <tr key={item.id}>
                                <td>{item.quantityPerUnit}</td>
                                <td>{item.unitsInStock}</td>
                                <td>{item.name}</td>
                                <td>{item.unitPrice}</td>
                                <td>{item.categoryId}</td>
                            </tr>
                   



                    )}     </tbody></table>

        </>
    )
}

export default Data