import { useState } from 'react';
import { FiSearch } from 'react-icons/fi'
import './styles.css';
import React from 'react';
import api from './services/api';


function App() {


const [input, setInput] = useState('');
const [cep, setCep] = useState({});

async function handleSearch(){
  if(input === ''){
    alert("Preencha Algo!")
    return; 
  }
  try{
    const response = await api.get(`${input}/json`);
    setCep(response.data)
    setInput("");
  }catch{
    alert("Erro na API");
    setInput("");
  }
}


  return (
    <div className="container">
      <h1 className="title">Buscador de Residências</h1>

      <div className="containerInput">
        <input type="text" 
        placeholder="Digite seu CEP" 
        value={input} 
        onChange={(e) => setInput(e.target.value)}
        />

       <button className="buttomSearch" onClick={handleSearch}>
        <FiSearch fontSize={25} color="#fff"/>
       </button>
      </div>

      <br/>
      {Object.keys(cep).length > 0 && (
              <main className='main'>
              <h2>CEP: {cep.cep}</h2>
              <spam>{cep.logradouro}</spam>
              <spam>{cep.complemento}</spam>
              <spam>{cep.bairro}</spam>
              <spam>{cep.localidade}, {cep.uf}</spam>
              <spam>IBGE: {cep.ibge}</spam>
              <br />
            </main>
      )}


    </div>
  );
}

export default App;
