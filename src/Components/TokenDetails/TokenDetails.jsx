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
  


    const query = `
    {
        pairs (where: {
          token0: ${tokenId}
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

  


    const [token, setToken] = useState([])
    useEffect(() => {
      fetchData()
    }, [])

  async function fetchData() {
    const response = await client.query(query).toPromise();
    console.log('response:', response)
    setToken(response.data.token);
    console.log("epa", token)
  }

  return (
    <div>
    <h2>Token Detail</h2>
    <h3>{token.name}</h3>
    <h3>{token.symbol}</h3>
    <h3>{token.totalSupply}</h3>
    <h3>{token.tradeVolumeUSD}</h3>
    <h3>{token.totalLiquidity}</h3>
   
    </div>
    
  )
}

export default TokenDetails