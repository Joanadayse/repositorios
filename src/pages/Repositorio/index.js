import { useParams } from "react-router-dom";
import {
  Container,
  Loading,
  Owner,
  Backbutton,
  IssuesList,
  PageActions,
  FilterList,
} from "./styled";
import { useEffect, useState } from "react";
import api from "../../services/api";
import { FaArrowLeft } from "react-icons/fa";

export default function Repositorio() {
  const { repositorio } = useParams();

  const [repo, setRepo] = useState({
    owner: { avatar_url: "", login: "" },
    name: "",
    description: "",
  });

  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page , setPage]= useState(1);
  const [filters, setFilters] = useState([
    { state: "all", label: "Todas", active: true },
    { state: "open", label: "Abertas", active: false },
    { state: "closed", label: "Fechadas", active: false },
  ]);

  const [filterIndex, setFilterIndex]= useState(0);

  useEffect(() => {
    async function loadData(params) {
      try {
        const nomeRepo = decodeURIComponent(repositorio);
       

        const [repoResponse, issuesResponse] = await Promise.all([
          api.get(`/repos/${nomeRepo}`),
          api.get(`/repos/${nomeRepo}/issues`, {
            params: {
              state: filters.find(f => f.active).state,
              per_page: 5,
            },
          }),
        ]);
        setRepo(repoResponse.data);

        setIssues(issuesResponse.data);
        setLoading(false);
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

useEffect(() => {
  async function loadIssue() {
    try {
      setLoading(true); // Ativa loading durante a requisição
      const nomeRepo = decodeURIComponent(repositorio);

      const response = await api.get(`/repos/${nomeRepo}/issues`, {
        params: {
          state: filters[filterIndex].state,
          page,
          per_page: 5,
        },
      });

      setIssues(response.data);
    } catch (error) {
      console.error("Erro ao carregar issues:", error);
    } finally {
      setLoading(false); // Desativa loading independente do resultado
    }
  }

  loadIssue(); // Adicione esta linha para executar a função
}, [filterIndex,filters, repositorio, page]);

function handlePage(action) {
  setPage((prev) => {
    if (action === "back" && prev > 1) return prev - 1;
    if (action === "next") return prev + 1;
    return prev; // Impede página negativa
  });
}

function handleFilter(index){
  setFilterIndex(index)

}



  if (loading) {
    return (
      <Loading>
        <h1>Carregando...</h1>
      </Loading>
    );
  }

  return (
    <>
      <Container>
        <Backbutton to="/">
          <FaArrowLeft color="#000" size={30} />
        </Backbutton>

        {repo && repo.owner && (
          <Owner>
            <img src={repo.owner.avatar_url} alt={repo.owner.login} />
            <h1>{repo.name}</h1>
            <p>{repo.description}</p>
          </Owner>
        )}

        {/* <Owner>
          {repo.owner && (
            <>
              <img src={repo.owner.avatar_url} alt={repo.owner.login} />
              <h1>{repo.name}</h1>
              <p>{repo.description}</p>
            </>
          )}
        </Owner> */}

        <FilterList active={filterIndex}>
          {filters.map((filter, index) => (
            <button
              type="button"
              key={filter.label}
              onClick={() => {
                handleFilter(index);
              }}
            >
              {filter.label}
            </button>
          ))}
        </FilterList>

        <IssuesList>
          {issues.map((issue) => (
            <li key={String(issue.id)}>
              <img src={issue.user.avatar_url} alt={issue.user.login} />
              <div>
                <strong>
                  <a href={issue.html_url}>{issue.title}</a>
                  {issue.labels.map((label) => (
                    <span key={String(label.id)}>{label.name}</span>
                  ))}
                </strong>

                <p>{issue.user.login}</p>
              </div>
            </li>
          ))}
        </IssuesList>

        <PageActions>
          <button
            type="button"
            onClick={() => handlePage("back")}
            disabled={page < 2} // Desativa botão na primeira página
          >
            Voltar
          </button>
          <span>Página {page}</span> {/* Exibe página atual */}
          <button
            type="button"
            onClick={() => handlePage("next")}
            disabled={issues.length < 5} // Desativa se não houver mais itens
          >
            Próxima
          </button>
        </PageActions>
      </Container>
      ;
    </>
  );
}
