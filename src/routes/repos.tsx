import useSWR from "swr";
import fetcher, { fakeFetcher } from "../lib/fetcher";
import { Configuration } from "../config";

interface RepoInfo {
  name: string;
  head: string;
  project_info: {
    author: string;
    description: string;
    thumbnail?: string;
  };
}

interface ApiReposResponse {
  dirs: Array<RepoInfo>;
}

interface ReposProps {
  config: Configuration;
}

export default function Repos({ config }: ReposProps) {
  let data, error;
  if (import.meta.env.DEV) {
    ({ data, error } = useSWR<ApiReposResponse>("/api/v1/repos", fakeFetcher));
  } else {
    ({ data, error } = useSWR<ApiReposResponse>(
      config.backend.repos_url,
      fetcher
    ));
  }

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
  const thumbnailUrl =
    repoInfo.project_info.thumbnail !== undefined ?
      repoInfo.project_info.thumbnail
      :
      "https://github.com/identicons/avimitin.png";
  return (
    <div className="card-frame">
      <div className="card-body">
        <div
          className="card-thumbnail"
          style={{ backgroundImage: `url("${thumbnailUrl}")` }}
        />
        <span className="card-title">{repoInfo.name}</span>
        <p className="card-desc">{repoInfo.project_info.description}</p>
      </div>
      <div className="card-footer">
        <img className="card-avatar"></img>
        <b>{repoInfo.project_info.author}</b> last commit on Oct 6, 2022
        <code>{repoInfo.head.slice(0, 8)}</code>
      </div>
    </div>
  );
}
