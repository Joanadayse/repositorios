import {  FaBars, FaGithub, FaPlus, FaTrash } from "react-icons/fa";
import { Container, Form, SubmitButton, List, DeleteButton } from "./styled";
import { useCallback, useState } from "react";
import api from "../../services/api";

export default function Main() {

const [meuRepo, setMeuRepo]= useState("");
const [repositorios , setRepositorios]= useState([]);
const [loading ,setLoading]= useState(false);


const handleSubmit= useCallback((e)=>{
 e.preventDefault();
 async function submit(params) {
setLoading(true);
  try{
       const response = await api.get(`repos/${meuRepo}`);

   console.log(response.data);

   const data = {
     name: response.data.full_name,
   };

   setRepositorios([...repositorios, data]);
   setMeuRepo("");

  }catch(error){
    console.log(error)

  } finally{
    setLoading(false);

  }

  
 }

 submit();
}, [meuRepo , repositorios])
 
 

function handleInputChange(e){
  setMeuRepo(e.target.value)
}

const handleDelete = useCallback((repo)=>{
  const find= repositorios.filter(r => r.name !== repo);
  setRepositorios(find);
},[repositorios]);

  return (
    <Container>
      <h1>
        <FaGithub />
        Meus Repositorios
      </h1>

      <Form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Adicionar repositorio"
          value={meuRepo}
          onChange={handleInputChange}
        />

        <SubmitButton >
          <FaPlus color="#fff" size={14} />
        </SubmitButton>
      </Form>

      <List>
 {
  repositorios.map(repo=>(
    <li key={repo.name}>
      <span>
        <DeleteButton onClick={()=> handleDelete(repo.name)}>
          <FaTrash size={14}/>
        </DeleteButton>
        {repo.name}
        
      </span>
      <a href="">
        <FaBars size={20}/>
      </a>
    </li>
  ))
 }
      </List>
    </Container>
  );
}
