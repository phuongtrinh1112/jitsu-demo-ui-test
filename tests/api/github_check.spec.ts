import { test } from '@playwright/test';
import { GithubApi } from '../../api/github_api';

test.describe('@api', () => {
    async function checkGithubApiWithOrgName(orgName: string) {
        const githubApi = new GithubApi();
        await githubApi.sendGetReposByOrg(orgName);
        //count total repos
        await githubApi.countReposInGithubRepoInfo();

        //calculate total open issues of all repos
        await githubApi.calculateAllOpenIssues();

        //find repo(s) that has the highest watchers count
        await githubApi.findRepoWithHighestWatchers();

        //sort repos by latest update time
        await githubApi.sortReposByLatestUpdateTime();
    }

    test('check github api for SeleniumHQ organization', {
    tag: ['@api', '@github', '@happyFlow', '@seleniumHQ'],
    }, async () => {
        await checkGithubApiWithOrgName('SeleniumHQ');
    });

    test('check github api for random organization', {
    tag: ['@api', '@github', '@happyFlow', '@randomOrg'],
    }, async () => {
        await checkGithubApiWithOrgName('randomOrg');
    });
});