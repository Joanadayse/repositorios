import { useParams } from "react-router-dom";
import { Container, Loading, Owner, Backbutton, IssuesList } from "./styled";
import { useEffect, useState } from "react";
import api from "../../services/api"
import { FaArrowLeft } from "react-icons/fa";

export default function Repositorio() {
  const { repositorio } = useParams();
   
  const [repo , setRepo]= useState({});
  const [issues, setIssues] = useState([]);
  const [loading,setLoading]=useState(true);
  const [error,setError]= useState(null);

  useEffect(() => {
    async function loadData(params) {
      try {
        const nomeRepo = decodeURIComponent(repositorio);

        const [repoResponse, issuesResponse] = await Promise.all([
          api.get(`/repos/${nomeRepo}`),
          api.get(`/repos/${nomeRepo}/issues`, {
            params: {
              state: "open",
              per_page: 5,
            },
          }),
        ]);
  setRepo(repoResponse.data);
 
  setIssues(issuesResponse.data);
  setLoading(false)
        console.log("Repositório:", repoResponse.data);
        console.log("Issues:", issuesResponse.data);
      } catch (error) {
        console.error(
          "Erro na requisição:",
          error.response?.data || error.message
        );
      }
    }

    if (repositorio) {
      loadData();
    }
  }, [repositorio]);


 if(loading){
return (
  <Loading>
    <h1>Carregando...</h1>
  </Loading>
)
 }

   
  return (
    <>
      <Container>
        <Backbutton to="/">
          <FaArrowLeft color="#000" size={30} />
        </Backbutton>
        <Owner>
          <img src={repo.owner.avatar_url} alt={repo.owner.login} />
          <h1>{repo.name}</h1>

          <p>{repo.description}</p>
        </Owner>

        <IssuesList>
          {issues.map((issue) => (
            <li key={String(issue.id)}>
 <img src={issue.user.avatar_url} alt={issue.user.login}/>
 <div>
  <strong>
    <a href={issue.html_url} >{issue.title}</a>
    {issue.labels.map(label=>(
      <span key={String(label.id)}>{label.name}</span>
    ))}
  </strong>

  <p>{issue.user.login}</p>
 </div>

            </li>
           
          ))}
        </IssuesList>
      </Container>
      ;
    </>
  );
}
