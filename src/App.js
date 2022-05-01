import {FiSearch} from 'react-icons/fi'
import './styles.css'
import {useState} from 'react'
import api from './services/api'

function App() {
  const [input, setInput] = useState('')
  const [cep, setCep] = useState({})

  async function handleSearch(){
    
    if(input === ''){
      alert('Digite algum cep')
      return;
    }

    try{
      const response = await api.get(`${input}/json/`)
      setCep(response.data)
      setInput('')
    } 
    catch {
      alert('DEU ALGO ERRADO')
      setInput('')
    }

  }

  return (
    <div className="container">
      <h1 className="title">Buscador CEP</h1>

      <div className="containerInput">
        <input type="text" 
          placeholder="Digite seu cep..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <button className="buttonSearch" onClick={handleSearch}> 
          <FiSearch size={25} color="#fff" />
        </button>

      </div>

      {Object.keys(cep).length > 0 && (
        <main className="main">

        <h2>CEP: {cep.cep}</h2>
        <span><strong> Rua: </strong> {cep.logradouro}</span>
        <span><strong> Complemento: </strong> {cep.complemento}</span>
        <span><strong> Bairro: </strong> {cep.bairro}</span>
        <span><strong> Localidade: </strong> {cep.localidade} - {cep.uf}</span>

      </main>
      )}      

    </div>
  );
}

export default App;
