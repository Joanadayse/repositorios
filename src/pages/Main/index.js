import {  FaBars, FaGithub, FaPlus, FaTrash } from "react-icons/fa";
import {
  Container,
  Form,
  SubmitButton,
  List,
  DeleteButton,
  Input,
} from "./styled";
import { useCallback, useEffect, useState } from "react";
import api from "../../services/api";
import { Link } from "react-router-dom";

export default function Main() {

const [newRepo, setnewRepo]= useState("");
const [repositorios , setRepositorios]= useState([]);
const [loading ,setLoading]= useState(false);
const [alert , setAlert]= useState(null);

useEffect(()=>{
    const repoStorage = localStorage.getItem("repo");
    if (repoStorage) {
      setRepositorios(JSON.parse(repoStorage))
    }
},[])

useEffect(() => {
  localStorage.setItem("repo", JSON.stringify(repositorios));
}, [repositorios]);


const handleSubmit= useCallback((e)=>{
 e.preventDefault();
 async function submit(params) {
setLoading(true);
setAlert(null);
  try{

    if(newRepo === ""){
      throw new Error ("Voce precisa indicar um repositorio")
    }
    
    const response = await api.get(`repos/${newRepo}`);

    const hasrepo= repositorios.find(repo => repo.name === newRepo);

    if(hasrepo){
      throw new Error ("Repositorio Duplicado ! ")
    }

   console.log(response.data);

   const data = {
     name: response.data.full_name,
   };

   setRepositorios([...repositorios, data]);
   setnewRepo("");

  }catch(error){
    setAlert(true)
    console.log(error);

  } finally{
    setLoading(false);

  }

  
 }

 submit();
}, [newRepo , repositorios])
 
 

function handleInputChange(e){
  setnewRepo(e.target.value)
  setAlert(null)
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

      <Form onSubmit={handleSubmit} error={alert}>
        <Input
          type="text"
          placeholder="Adicionar repositorio"
          value={newRepo}
          onChange={handleInputChange}
          error={alert}
          
        />

        <SubmitButton>
          <FaPlus color="#fff" size={14} />
        </SubmitButton>
      </Form>

      <List>
        {repositorios.map((repo) => (
          <li key={repo.name}>
            <span>
              <DeleteButton onClick={() => handleDelete(repo.name)}>
                <FaTrash size={14} />
              </DeleteButton>
              {repo.name}
            </span>
            <Link to={`/repositorio/${ encodeURIComponent(repo.name)}`}>
              <FaBars size={20} />
            </Link>
          </li>
        ))}
      </List>
    </Container>
  );
}
