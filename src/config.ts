import * as dotenv from "dotenv";

export interface Configuration {
    backend: {
        base_url: string,
        repos_url: string,
    }
}

export default function createConfig(): Configuration {
    const backend_url = import.meta.env.VITE_RGIT_BACKEND_URL;

    return {
        backend: {
            base_url: backend_url,
            repos_url: new URL("/api/v1/repos", backend_url).toString()
        }
    }
}