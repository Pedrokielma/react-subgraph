import './App.css';
import { Routes, Route } from "react-router-dom";
import TokensList from './Components/TokensList/TokensList';
import TokenDetails from './Components/TokenDetails/TokenDetails';





  
  

function App() {
 
  
  return (
    <div className="App">
     <Routes>
     <Route path="/" element={ <TokensList /> } />

     <Route
          path="/:tokenId"
          element={
           <TokenDetails />
          }
        />

     </Routes>


  
    </div>
  );
}

export default App;
