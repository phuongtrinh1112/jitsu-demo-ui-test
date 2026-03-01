import {
    GITHUB_URL,
    GITHUB_GET_REPOS_BY_ORG_URI,
    GITHUB_API_VERSION,
    GITHUB_ACCEPT_HEADER,
} from '../variables/api_vars';

export class GithubApi {
    readonly getReposByOrgUrl: string = GITHUB_URL + GITHUB_GET_REPOS_BY_ORG_URI;
    private getReposJsonResult: GithubRepoInfo[] | null = null;

    constructor() {}

    /**
     * Send GET request to github api to get repos by organization name.
     * Store the response json result in the variable called getReposJsonResult
     * 
     * @param orgName organization name
     */
    async sendGetReposByOrg(orgName: string) {
        try {
            const url = this.getReposByOrgUrl.replace('{org}', encodeURIComponent(orgName));
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    Accept: GITHUB_ACCEPT_HEADER,
                    'X-GitHub-Api-Version': GITHUB_API_VERSION,
                },
            });
            //validate response code is 200, if not throw error
            this.validateResponseCode(response, 200);
            //validate response bofy is not empty, if empty throw error
            if (response === null) {
                throw new Error(
                    `Failed to list repositories for organization ${orgName}: Response body is empty`,
                );
            }
            
            this.getReposJsonResult = (await response.json()) as GithubRepoInfo[];
        } catch (error) {
            console.error(`Error fetching repositories for organization ${orgName}:`, error);
            throw error;
        }
    }

    /**
     * Validate response code of an api response, if the response code is different from expected code, throw error
     * 
     * @param response api response
     * @param expectedCode expected code
     */
    async validateResponseCode(response: any, expectedCode: number) {
            if (response.status !== expectedCode) {
                throw new Error(`Expected status code ${expectedCode} but received ${response.status}`);
            }
    }

    /**
     * Count total repos in an organization by counting the number of objects in response json result
     * 
     * @returns total repos in an organization
     */
    async countReposInGithubRepoInfo(): Promise<number> {
        console.log('Repos number: ', this.getReposJsonResult ? this.getReposJsonResult.length : 0);
        return this.getReposJsonResult ? this.getReposJsonResult.length : 0;
    }

    /**
     * Find repo(s) that has the highest watchers count by looping through all repos and compares the field watchers_count
     * 
     * @returns a list of repos that have highest watchers
     */
    async findRepoWithHighestWatchers(): Promise<unknown[]> {
        let highestWatchersCount = 0;
        //find highest watchers count
        for (const repo of this.getReposJsonResult || []) {
            const tempoWatchersCount = repo.watchers_count;
            if (tempoWatchersCount > highestWatchersCount) {
                highestWatchersCount = tempoWatchersCount;
            }
        }
        //return list of repos that have the highest watchers count
        const reposWithHighestWatchers = [];
        console.log('Repos with the highest watchers count is ', highestWatchersCount, ' are as below: ');
        for (const repo of this.getReposJsonResult || []) {
            if (repo.watchers_count === highestWatchersCount) {
                reposWithHighestWatchers.push(repo);
                console.log('\t - ', repo.name, '\n');
            }
        }
        return reposWithHighestWatchers;
    }

    /**
     * Calculate total open issues of all repos by summing up the open_issues_count property of each repo
     * 
     * @returns total open issues of all repos
     */
    async calculateAllOpenIssues(): Promise<number> {
        let totalOpenIssues = 0;
        for (const repo of this.getReposJsonResult || []) {
            totalOpenIssues += repo.open_issues_count;
        }
        console.log('Total open issues count of all repos: ', totalOpenIssues);
        return totalOpenIssues;
    }

    /**
     * Sort repos by latest update time in descending order (latest update time first)
     * 
     * @returns a list of repos sorted by latest update time in descending order (latest update time first)
     */
    async sortReposByLatestUpdateTime(): Promise<GithubRepoInfo[]> {
        const sortedRepos = [...(this.getReposJsonResult || [])].sort((a, b) => {
            const dateA = new Date(a.updated_at).getTime();
            const dateB = new Date(b.updated_at).getTime();
            return dateB - dateA; // Sort in descending order (latest update time first)
        });

        console.log('Repos sorted by latest update time are as below:');
        for (const repo of sortedRepos) {
            console.log(`\t - Repo: ${repo.name}, Updated At: ${repo.updated_at} \n`);
        }
        return sortedRepos;
    }
    
}

// json objects for github api response
export interface GithubRepoOwner {
    login: string;
    id: number;
    node_id: string;
    avatar_url: string;
    gravatar_id: string;
    url: string;
    html_url: string;
    followers_url: string;
    following_url: string;
    gists_url: string;
    starred_url: string;
    subscriptions_url: string;
    organizations_url: string;
    repos_url: string;
    events_url: string;
    received_events_url: string;
    type: string;
    user_view_type: string;
    site_admin: boolean;
}

export interface GithubRepoLicense {
    key: string;
    name: string;
    spdx_id: string;
    url: string;
    node_id: string;
}

export interface GithubRepoPermissions {
    admin: boolean;
    maintain: boolean;
    push: boolean;
    triage: boolean;
    pull: boolean;
}

export interface GithubRepoInfo {
    id: number;
    node_id: string;
    name: string;
    full_name: string;
    private: boolean;
    owner: GithubRepoOwner;
    html_url: string;
    description: string | null;
    fork: boolean;
    url: string;
    forks_url: string;
    keys_url: string;
    collaborators_url: string;
    teams_url: string;
    hooks_url: string;
    issue_events_url: string;
    events_url: string;
    assignees_url: string;
    branches_url: string;
    tags_url: string;
    blobs_url: string;
    git_tags_url: string;
    git_refs_url: string;
    trees_url: string;
    statuses_url: string;
    languages_url: string;
    stargazers_url: string;
    contributors_url: string;
    subscribers_url: string;
    subscription_url: string;
    commits_url: string;
    git_commits_url: string;
    comments_url: string;
    issue_comment_url: string;
    contents_url: string;
    compare_url: string;
    merges_url: string;
    archive_url: string;
    downloads_url: string;
    issues_url: string;
    pulls_url: string;
    milestones_url: string;
    notifications_url: string;
    labels_url: string;
    releases_url: string;
    deployments_url: string;
    created_at: string;
    updated_at: string;
    pushed_at: string;
    git_url: string;
    ssh_url: string;
    clone_url: string;
    svn_url: string;
    homepage: string | null;
    size: number;
    stargazers_count: number;
    watchers_count: number;
    language: string | null;
    has_issues: boolean;
    has_projects: boolean;
    has_downloads: boolean;
    has_wiki: boolean;
    has_pages: boolean;
    has_discussions: boolean;
    forks_count: number;
    mirror_url: string | null;
    archived: boolean;
    disabled: boolean;
    open_issues_count: number;
    license: GithubRepoLicense | null;
    allow_forking: boolean;
    is_template: boolean;
    web_commit_signoff_required: boolean;
    has_pull_requests: boolean;
    pull_request_creation_policy: string;
    topics: string[];
    visibility: string;
    forks: number;
    open_issues: number;
    watchers: number;
    default_branch: string;
    permissions: GithubRepoPermissions;
    custom_properties: Record<string, unknown>;
}
