import { createClient } from 'urql'
import { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import Searchbar from '../Searchbar/Searchbar';
import Navbar from '../Navbar/Navbar';

import './TokensList.css'


const APIURL = "https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2"

const query = `
{
    tokens (
      orderBy: tradeVolumeUSD,
      orderDirection: desc,
      first: 500
      
    ) {
        id
      symbol
      name
      totalSupply
      tradeVolumeUSD
      totalLiquidity
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
    <div className='main-page'>
    <Navbar />
    <h2>Explore Tokens</h2>
    <Searchbar  search={searchFilter} />
    <section className='tokens-display'>
    {displayTokens.map((token)=>{
        return(
            <div className='token-container'>
            <h3>{token.name} ({token.symbol})</h3>
            <div className='financial-info'>
            <div className='info'>
            <p>Total supply:</p>
            <p>{token.totalSupply}</p>
            </div>
            <div className='info'>
            <p>Trade VolumeUSD:</p>
            <p>{Number(token.tradeVolumeUSD).toFixed(2)}</p>
            </div>
            <div className='info'>
            <p>Liquidity:</p>
            <p>{Number(token.totalLiquidity).toFixed(2) }</p>
            </div>
            </div>
            <div className='div-button'><button className='token-pairs-btn'><Link  to={`/${token.id}`}>Swap options</Link></button></div>
            
            
            </div>
            

        )
    })}
    </section>

    </div>
  )
}

export default TokensList