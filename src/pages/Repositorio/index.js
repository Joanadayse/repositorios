import { useParams } from "react-router-dom";
import { Container } from "./styled";
import { useEffect, useState } from "react";
import api from "../../services/api"

export default function Repositorio() {
  const { repositorio } = useParams();
  const [repo , setRepo]= useState({});
  const [issues, setIssues] = useState([]);
  const [loading,setLoading]=useState(true);

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

   
  return (
    <>
      <Container >
        {/* {decodeURIComponent( repositorio)} */}
      </Container>;
    </>
  );
}
