import React, { useEffect, useState } from "react"
import Card from "./Components/Card";
import Axios from "axios"


function App() {

    const [data, setData] = useState([])
    const [nextPage, setNextPage] = useState('')
    const [prevPage, setPrevPage] = useState('')
    const [isLoading, setIsLoading] = useState(true)
    const [fetched, setIsFetched] = useState(false)

    useEffect(() => {
        if(fetched===false){
            const baseUrl = 'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=20'
            Axios.get(baseUrl).then((res)=>{
                setData(res.data.results)    
                setNextPage(res.data.next)
                setPrevPage(res.data.previous)
                setIsLoading(false)
                setIsFetched(true)
            },[])
        } else {
            console.log('Data already fetched for general search')
        }
            
    },[])

    const changePrevContent = ()=>{
       Axios.get(prevPage).then((res)=>{
                setData(res.data.results)    
                setNextPage(res.data.next)
                setPrevPage(res.data.previous)
                console.log(data)
        })
    }
    const changeNextContent = ()=>{
        Axios.get(nextPage).then((res)=>{
                setData(res.data.results)    
                setNextPage(res.data.next)
                setPrevPage(res.data.previous)
                console.log(data)
        })
    }

    return (
        <div className="container-fluid">
            <div className="my-navbar">
                <h1>MY POKEDEX</h1>
            </div>
            <div className="container">
                <div className="poke-button-container">
                    <button className="poke-button" onClick={changePrevContent}>Prev</button>
                    <button className="poke-button" onClick={changeNextContent}>Next</button>
                </div>
            {isLoading===true ? <div className="loader">Loading...</div>: <div className="row">
                {data.map((el,index)=> <Card key={index} name={el.name} url={el.url}/>)}
            </div>}
            </div>
            <div className="footer text-center">
                <p>Made with ♥ by <a href="https://github.com/markorodriguez">Marko</a> </p>
            </div>
            
        </div>



    )
}

export default App;