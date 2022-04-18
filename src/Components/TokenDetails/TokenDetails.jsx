import { createClient } from 'urql'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';




const APIURL = "https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2"
//(orderBy: tradeVolumeUSD, orderDirection: desc)


  const client = createClient({
    url: APIURL
  })

//   getUser($input: "0x00000000000045166c45af0fc6e4cf31d9e14b9a")


function TokenDetails() {
    const { tokenId } = useParams();

    const [compatibleTokens, setCompatibleTokens] = useState(false);
    const [token, setToken] = useState([])
    const [fetching, setFetching] = useState(true)
  


    const query = `
    {
        pairs (where: {
          token0: "${tokenId}"
        }){
          id
          token0{
             symbol
                  name
                  symbol
              totalSupply
            tradeVolumeUSD
            totalLiquidity
          }
          token1{
            symbol
            name
            id
          }
          
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
    <>
   

        {!fetching && 
            <div>
        <h2>Token Detail</h2>
        <h3>{token[0].id}</h3>
    <h3>{token[0].token0.name}</h3>
    <h3>{token[0].token0.symbol}</h3>
    <h3>{token[0].token0.totalSupply}</h3>
    <h3>{token[0].token0.tradeVolumeUSD}</h3>
    <h3>{token[0].token0.totalLiquidity}</h3>


            <h2>Show tokens there you can exchange for in Uniswapp</h2>
     
    <button onClick={() => setCompatibleTokens(!compatibleTokens)}>
        { compatibleTokens? "Hide" : "Show"}
      </button>
          
          
          {compatibleTokens && token.map((pairToken) => {
             return (
                 <div>
                 <h2>{pairToken.token1.name}</h2>
                 <h3>{pairToken.token1.symbol}</h3>
                 </div>
             )
            })}


    
    </div> 
    }
    

    
    </>
  
    



   
    
    
  )
}

export default TokenDetails