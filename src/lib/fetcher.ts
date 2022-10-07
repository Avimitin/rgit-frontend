export default function fetcher(input: RequestInfo | URL, init?: RequestInit | undefined) {
    return fetch(input, init).then((res) => res.json());
}

export function fakeFetcher(input: RequestInfo | URL, init?: RequestInit | undefined): Promise<any> {
    const data = {
        dirs: [
            {
                name: "RepoA",
                head: "AC176D6F",
                project_info: {
                    author: "avimitin",
                    description: "The A repo",
                    thumbnail: "https://source.unsplash.com/random/1920x1080"
                }
            },
            {
                name: "RepoB",
                head: "B37192AD",
                project_info: {
                    author: "avimitin",
                    description: "The B repo",
                    thumbnail: "https://source.unsplash.com/random/980x720"
                }
            },
            {
                name: "RepoC",
                head: "79FCAA96",
                project_info: {
                    author: "avimitin",
                    description: "The C repo",
                    thumbnail: "https://source.unsplash.com/random/2160x1960"
                }
            }
        ]
    };

    if (input.toString().search("/api/v1/repos") !== -1) {
        return new Promise(resolve => setTimeout(resolve, 2000)).then(() => data);
    }

    return new Promise(resolve => { return {} })
}
