import useSWR from "swr";
import fetcher from "../lib/fetcher";
import { Configuration } from "../config";

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

interface ReposProps {
  config: Configuration;
}

export default function Repos({ config }: ReposProps) {
  const { data, error } = useSWR<ApiReposResponse>(
    config.backend.repos_url,
    fetcher
  );

  if (error) throw new Error(`fail to fetch repos api: ${error}`);
  if (!data) return <div>Loading...</div>;

  const items = data.dirs.map((repo) => {
    return (
      <li key={repo.name}>
        <RepoCard repoInfo={repo} />
      </li>
    );
  });

  return <ul className="card-container">{items}</ul>;
}

interface RepoCardProps {
  repoInfo: RepoInfo;
}

function RepoCard({ repoInfo }: RepoCardProps) {
  return (
    <div className="card-frame">
      <img
        className="card-thumbnail"
        src="https://github.com/identicons/avimitin.png"
      />
      <span className="card-title">{repoInfo.name}</span>
      <p className="card-desc">{repoInfo.project_info.description}</p>
      <img className="card-avatar"></img>
      <p className="card-footer">
        <b>{repoInfo.project_info.author}</b> last commit on Oct 6, 2022
        <code>{repoInfo.head.slice(0, 8)}</code>
      </p>
    </div>
  );
}
