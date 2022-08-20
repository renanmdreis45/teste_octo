import React, {useState, useRef} from 'react';
import '../styles/contatos.css';


export default function Contatos() {
  
  const nomeRef = useRef(null);
  const emailRef = useRef(null);
  const telefoneRef = useRef(null);
  const mensagemRef = useRef(null);
  const documentoRef = useRef(null);

  const dados = {
    nome: "",
    email: "",
    telefone: "",
    mensagem: "",
    documento: "",
  }

  const [values, setValues] = useState(dados);
  
  function onChange(e) {
    const {name, value} = e.target;

    values[name] = value;

    setValues({...values, [name]: value})
  }
  
  function onSubmit(e) {
    e.preventDefault();
    console.log(values)
    setValues([])

    nomeRef.current.value = '';
    emailRef.current.value = '';
    telefoneRef.current.value = '';
    mensagemRef.current.value = '';
    documentoRef.current.value = '';
  }
  

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center">
      <div className="mb-3 pt-0">
        <h3 className="text-center text-dark-400 text-3xl mb-4">Formulário de contato</h3>
      </div>
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        onSubmit={onSubmit}
      >
        <div className="mb-3 pt-0">
          <input
            type="text"
            ref = {nomeRef}
            onChange={onChange}
            placeholder="Nome"
            name="nome"
            className="px-3 py-3 placeholder-gray-400 text-gray-600 relative bg-white bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full"
            required
          />
        </div>
        <div className="mb-3 pt-0">
          <input
            type="email"
            ref = {emailRef}
            onChange={onChange}
            placeholder="Email"
            name="email"
            className="px-3 py-3 placeholder-gray-400 text-gray-600 relative bg-white bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full"
            required
          />
        </div>
        <div className="mb-3 pt-0">
          <input
            type="text"
            ref = {telefoneRef}
            onChange={onChange}
            placeholder="telefone"
            name="telefone"
            className="px-3 py-3 placeholder-gray-400 text-gray-600 relative bg-white bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full"
            required
          />
        </div>
        <div className="mb-3 pt-0">
          <textarea
            placeholder="Escreva uma mensagem"
            ref = {mensagemRef}
            onChange={onChange}
            name="mensagem"
            className="px-3 py-3 placeholder-gray-400 text-gray-600 relative bg-white bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full"
            required
          />
        </div>
        <input
            type="file"
            ref = {documentoRef}
            onChange={onChange}
            name="documento"
            className="px-3 py-3 placeholder-gray-400 text-gray-600 relative bg-white bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full"
            required
          />
        <div className="mb-3 pt-0">
          <button
            className="mt-5 bg-blue-500 text-white active:bg-blue-700 font-bold uppercase text-sm w-full py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
            type="submit"
          >
            Enviar
          </button>
        </div>
      </form>
    </div>
  );
};
