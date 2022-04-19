import { createClient } from 'urql'
import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import './TokenDetails.css'
import { AiOutlineArrowLeft } from 'react-icons/ai'





const APIURL = "https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2"



  const client = createClient({
    url: APIURL
  })



function TokenDetails() {
    const { tokenId } = useParams();

    const [compatibleTokens, setCompatibleTokens] = useState(false);
    const [token, setToken] = useState([])
    const [fetching, setFetching] = useState(true)
  


    const query = `
    {
      pairs (
          orderDirection: desc,
        orderBy:reserveUSD
        where: {
          token0: "${tokenId}"
        }
          
        ) {
           token1{
          name
          symbol
        }
       
        reserveUSD
      }
    }
    `

  


    
    useEffect(() => {
      fetchData()
      
    }, [])
    

  async function fetchData() {
      try{
    const response = await client.query(query).toPromise();
    console.log('response:', response)
    setToken(response.data.pairs);
    setFetching(false)
    console.log("epa", token)
  }
  catch (error){
    console.error(error)
}
} 

//   const showCompatibleTokens = () =>{
//     setCompatibleTokens(!compatibleTokens)

//   }

  return (

    // {weather ? <div className="temp">{Math.round(weather.main.temp)}°c</div> : null}
    <div>
    <Navbar />
   <div className='pairs-page-title'>
    <h2>These are the tokens you can exchange for in Uniswapp</h2>
    </div>
    <section className='list-pair-section'>
    <div className='list-pair'>
    <>
    <div className='title-list-pair format-list'>
      <p className='paragrf1'>Name</p>
      <p className='paragrf2'>Symbol</p>
      <p className='paragrf3'>Liquidity of pair</p>
    </div>
    <hr />
    </>

    <div className='list-body'>
        {!fetching && 
            <div>    
    
          {token.map((pairToken) => {
             return (
               <>
                 <div className='single-pair format-list'>
                 <p className='paragrf1'>{pairToken.token1.name}</p>
                 <p className='paragrf2'>{pairToken.token1.symbol}</p>
                 <p className='paragrf3'>{Number(pairToken.reserveUSD).toFixed(2)} $</p>

                 </div>
                 <hr />
                 </>
             )
            })}

            </div>
    }
    <div className='back-btn-div'>
    <Link  to='/'> <AiOutlineArrowLeft className='react-icon-back' /> <span>Go Back</span> </Link> 
    </div>
    </div>

    </div> 
    </section>
    </div>
   
  )
}

export default TokenDetails