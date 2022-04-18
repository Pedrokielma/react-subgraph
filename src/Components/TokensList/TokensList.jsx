import { createClient } from 'urql'
import { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import Searchbar from '../Searchbar/Searchbar';


const APIURL = "https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2"

const query = `
{
    tokens {
        id
      symbol
      name
    }
  }
  `

  const client = createClient({
    url: APIURL
  })

function TokensList() {

    const [tokens, setTokens] = useState([])
    const [displayTokens, setDisplayTokens]= useState([])




    useEffect(() => {
      fetchData()
    }, [])
  
    async function fetchData() {
      const response = await client.query(query).toPromise();
      console.log('response:', response)
      setTokens(response.data.tokens);
      setDisplayTokens(response.data.tokens);
      console.log("epa", tokens)
    }


    const searchFilter = (searchQuery) => {
      let filteredItems = tokens.filter((token) =>
        token.name.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
      console.log(filteredItems);
      setDisplayTokens(filteredItems);
    };

  return (
    <div>
    <h2>Token List</h2>
    <Searchbar  search={searchFilter} />
    {displayTokens.map((token)=>{
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