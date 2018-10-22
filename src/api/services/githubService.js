import axios from "axios";
import btoa from "btoa";
import utils from "../../utils";


const { getEnvironment } = utils;

const apiPath = "https://api.github.com";
const usersApiPath = `${apiPath}/users`;

const getAuthKey = (username, password) => btoa(`${username}:${password}`);

const getHeaders = () => {
    let username = getEnvironment("USERNAME");
    let password = getEnvironment("PASSWORD");
    if (!username || !password) {
        return {};
    }
    return {
        Authorization: `Basic ${getAuthKey(username, password)}`, 
    };
}

const getResource = async (uri) => (
    await axios.get(uri, {
        headers: getHeaders()
    })
)

const getUsersReposApiPath = (username) => (
    `${usersApiPath}/${username}/repos`
);

const extractGitHubUser = (user = {}) => ({
    name: user.name,
    username: user.login,
    image: user.avatar_url,
    profile: user.html_url,
    email: user.email,
    bio: user.bio,
    followers: user.followers,
    following: user.following,
    repository_api: user.repos_url,
});

const extractGitHubRepositories = (repos = []) => repos.map((repo = {})=> ({
    name: repo.name,
    stars: repo.stargazers_count,
    language: repo.language,
    description: repo.description,
    url: repo.html_url
}))

const getUser = async (username) => {
    try {
        let { data } = await getResource(`${usersApiPath}/${username}`);
        let user = extractGitHubUser(data);
        return user;
    } catch (e) {
        let { response } = e;
        let { status, data } = response;
        if (status === 404) {
            return null;
        }
        else {
            throw data;
        }
    }
}

const getRepositoriesByUrl = async (repository_api) => {
    try {
        let { data } = await getResource(repository_api);
        if (!Array.isArray(data)) {
            return [];
        }
        let user = extractGitHubRepositories(data);
        return user;
    } catch (e) {
        let { response } = e;
        let { status, data } = response;
        if (status === 404) {
            return [];
        }
        else {
            throw data;
        }
    }
}

const getUserRepositories = async (username) => {
    return await getRepositoriesByUrl(
        getUsersReposApiPath(username)
    );
}

const getUserWithRepositories = async (username) => {
    let userResponse = await getUser(username);
    if (userResponse === null) {
        return null;
    }
    let repositories = await getRepositoriesByUrl(userResponse.repository_api);
    let user = Object.assign({}, userResponse, {repositories});
    return user;
}

export default {
    getUser,
    getUserRepositories,
    getUserWithRepositories,
};