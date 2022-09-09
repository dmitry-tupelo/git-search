import {Octokit} from "@octokit/core";

export const octokit = new Octokit({
    auth: "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",
});

export const getDefaultUsersList = async () => {
    try {
        const result = await octokit.request("/users")
        return result?.data
    } catch (error) {
        console.log(error)
    }
}

export const getUserByUserName = async (userName) => {
    try {
        const result = await octokit.request(`/users/${userName}`)
        return result?.data
    }  catch(error) {
        console.log(error)
    }
}
