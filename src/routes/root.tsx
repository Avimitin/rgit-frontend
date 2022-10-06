import { useRouteError } from "react-router-dom";
import useSWR from "swr";
import { Configuration } from "../config";
import fetcher from "../lib/fetcher";

type ApiRootResponse = {
  message: string;
};

export function ErrorPage() {
  const error = useRouteError() as Error;
  console.log(error);

  return (
    <div>
      <h1>Oops! Error occur...</h1>
      <p>{`Details: ${error.message}`}</p>
    </div>
  );
}

interface RootProps {
  config: Configuration;
}

export default function Root({ config }: RootProps) {
  const { data, error } = useSWR<ApiRootResponse>(
    config.backend.base_url,
    fetcher
  );

  if (error) throw new Error(`Fail to get response from backend: ${error}`);
  if (!data) return <div className="loading">Loading data...</div>;

  return (
    <div>
      <h1>Rgit</h1>
      <p>{data.message}</p>
    </div>
  );
}
