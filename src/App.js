import { createClient } from 'urql'
import { useEffect, useState } from 'react'
import './App.css';

const APIURL = ""

const query = `
  query {
    tokens(
      first: 5
      orderBy: tokenID
      orderDirection:desc
    ) {
      id
      tokenID
      contentURI
      metadataURI
    }
  }
  `

function App() {
  return (
    <div className="App">
  
    </div>
  );
}

export default App;
