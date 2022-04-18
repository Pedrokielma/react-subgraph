import { createClient } from 'urql'
import { useEffect, useState } from 'react'
import { Link } from "react-router-dom";


const APIURL = "https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2"

const query = `
{
    tokens {
      symbol
      name
      
  }
  `

  const client = createClient({
    url: APIURL
  })

function TokensList() {

    const [tokens, setTokens] = useState([])
    useEffect(() => {
      fetchData()
    }, [])
  
    async function fetchData() {
      const response = await client.query(query).toPromise();
      console.log('response:', response)
      setTokens(response.data.tokens);
      console.log("epa", tokens.symbol)
    }

  return (
    <div>
    <h2>Token List</h2>
    {tokens.map((token)=>{
        return(
            <div>
            <h2><Link to={`/${token.id}`}>{token.name}</Link></h2>
            <h3>{token.symbol}</h3>
            </div>
            

        )
    })}

    </div>
  )
}

export default TokensList