export interface GithubRelease {
    tag_name: string,
    published_at: string,
    html_url: string,
    prerelease: boolean,
    body: string
}

export class GithubCommunicator {
    public async releases(per_page = 100): Promise<GithubRelease[]> {
        return await fetch(`https://api.github.com/repos/unipept/unipept/releases?per_page=${per_page}`).then(r => r.json());
    }
}
