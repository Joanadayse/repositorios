import {  FaBars, FaGithub, FaPlus, FaSpinner, FaTrash } from "react-icons/fa";
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
    const loadRepos = async () => {
      const saved = localStorage.getItem("repos");
      if (saved) {
        const reposData = JSON.parse(saved);
        // Verifica e atualiza dados desatualizados
        const updatedRepos = await Promise.all(
          reposData.map(async (repo) => {
            try {
              const response = await api.get(`repos/${repo.name}`);
              return response.data;
            } catch {
              return repo; // Mantém o antigo se der erro
            }
          })
        );
        setRepositorios(updatedRepos);
      }
    };
    loadRepos();
},[])

useEffect(() => {
   localStorage.setItem(
     "repos",
     JSON.stringify(
       repositorios.map((repo) => ({
         name: repo.name,
         owner: repo.owner?.login, // Adicione esta linha
         avatar_url: repo.owner?.avatar_url, // E esta
       }))
     )
   );
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
    // const data = {
    //   name: response.data.full_name,
    //   owner: {
    //     login: response.data.owner.login,
    //     avatar_url: response.data.owner.avatar_url,
    //   },
    // };

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

        <SubmitButton loading={loading ? 1 : 0}>
          {/* <FaPlus color="#fff" size={14} /> */}

          {loading ? (
            <FaSpinner color="#FFF" size={14} />
          ) : (
            <FaPlus color="#FFF" size={14} />
          )}
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
            <Link to={`/repositorio/${encodeURIComponent(repo.name)}`}>
              <FaBars size={20} />
            </Link>
          </li>
        ))}
      </List>
    </Container>
  );
}
