import { useRouteError } from "react-router-dom";
import useSWR from "swr";

type ApiRootResponse = {
  message: string;
};

const fetcher = (input: RequestInfo | URL, init?: RequestInit | undefined) =>
  fetch(input, init).then((res) => res.json());

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

export default function Root() {
  const { data, error } = useSWR<ApiRootResponse>(
    "http://localhost:18080",
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