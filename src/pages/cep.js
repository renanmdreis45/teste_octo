import React, {useState, useRef} from 'react';
import axios from 'axios';
import '../styles/cep.css'
import logo from '../assets/logo.png'
import { Button, FormControl, Table} from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';


export default function Cep() {

  const ruaRef = useRef(null);
  const cidadeRef = useRef(null);
  const ufRef = useRef(null);

  const [rua, setRua] = useState('');
  const [cidade, setCidade] = useState('');
  const [uf, setUf] = useState('');
  const [table, setTable] = useState('');


  function Pesquisar(){
    setTable('') 
    let nome_rua = rua;
    let nome_cidade = cidade;
    let sigla_uf = uf;

      axios.get("https://viacep.com.br/ws/"+sigla_uf+"/"+nome_cidade+"/"+nome_rua+"/json/", {
          method: "GET",
          mode: "cors",
          headers: {
              'content-type': 'application/json;charset=utf-8',
          },
        }).then((response) => {      
          list_table(response.data);
        }).catch((error) => {
           console.log(error);
        });
  }

  function list_table(itens){
    let lines = [];
    let i = 0;


          for(i=0; i <= itens.length; i++){
            
            if(itens[i]){

              lines.push(<tr key={itens[i].cep}>
                            <td>{itens[i].cep}</td>
                            <td>{itens[i].ibge}</td>
                            <td>{itens[i].logradouro}</td>
                            <td>{itens[i].bairro}</td>
                            <td>{itens[i].uf}</td>
                            <td>{itens[i].localidade}</td>
                          </tr>)

            }
      }
 
    setTable(lines)

  }

  function onSubmit(e) {
    e.preventDefault();

    ruaRef.current.value = '';
    cidadeRef.current.value = '';
    ufRef.current.value = '';
    setRua('')
    setCidade('')
    setUf('')
  }

  function handleReset(){
     setTable([])
  }
  

  return (
    <div className="App">
      
      <div className="top-bar">
          <img src={logo} alt="" className="img-logo"/>          
      </div>
      

      <div className="container-pesquisar">

        <div className="flex justify-center">
         <form
           className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
           onSubmit={onSubmit}
          >
           <FormControl ref={ruaRef} key={3} onChange={ e => setRua(e.target.value) } className="txt my-3" placeholder="Rua" required/>
           <FormControl ref={cidadeRef} key={4} onChange={ e => setCidade(e.target.value) } className="txt my-3" placeholder="Cidade" required/>
           <FormControl ref={ufRef} key={5} onChange={ e => setUf(e.target.value) } className="txt my-3" placeholder="UF" required/>
           <div className="px-3">
             <Button variant="primary bg-blue-500 active:bg-blue-700" className="w-full my-3" onClick={ () =>{Pesquisar()} } type="submit">Pesquisar</Button>
           </div>
           <div className="px-3">
             <Button variant="primary bg-blue-500 active:bg-blue-700" className="w-full my-3 " onClick={ () =>{handleReset()} } type="button">Limpar</Button>
           </div>
         </form>

        </div>

      </div>
      <div className="container-resultado-pesquisa">
          
          <Table bg="primary" responsive bordered striped>
            <thead>
              <tr>
                <th>CEP</th>
                <th>Nº IBGE</th>
                <th>Logradouro</th>
                <th>Bairro</th>
                <th>Unidade Federativa</th>
                <th>Município</th>
              </tr>
            </thead>
            <tbody>
              {table}
            </tbody>
          </Table>
      </div>

    </div>
      
  );
}
