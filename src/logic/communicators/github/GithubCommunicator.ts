export interface GithubRelease {
    tag_name: string,
    published_at: string,
    html_url: string,
    prerelease: boolean,
    body: string
}

export class GithubCommunicator {
    public async releases(url: string, per_page: number = 100): Promise<GithubRelease[]> {
        return await fetch(`${url}?per_page=${per_page}`).then(r => r.json());
    }
}
