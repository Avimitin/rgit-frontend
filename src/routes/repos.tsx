import useSWR from "swr";
import fetcher from "../lib/fetcher";

interface RepoInfo {
  name: string;
  head: string;
  project_info: {
    author: string;
    description: string;
  };
}

interface ApiReposResponse {
  dirs: Array<RepoInfo>;
}

export default function Repos() {
  const { data, error } = useSWR<ApiReposResponse>(
    "http://localhost:18080/api/v1/repos",
    fetcher
  );

  if (error) throw new Error(`fail to fetch repos api: ${error}`);
  if (!data) return <div>Loading...</div>;

  const table_items = data.dirs.map((repo) => {
    return (
      <tr key={repo.name}>
        <td>{repo.name}</td>
        <td>{repo.head}</td>
        <td>{repo.project_info.author}</td>
        <td>{repo.project_info.description}</td>
      </tr>
    );
  });

  return (
    <table>
      <thead>
        <tr>
          <th scope="col">Name</th>
          <th scope="col">Commit Head</th>
          <th scope="col">Author</th>
          <th scope="col">Description</th>
        </tr>
      </thead>
      <tbody>{table_items}</tbody>
    </table>
  );
}
