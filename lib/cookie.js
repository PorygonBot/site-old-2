import Cookie from "js-cookie";

const saveTokens = (token, refreshToken) => {
    Cookie.set("token", token);
    Cookie.set("refreshToken", refreshToken);
}

const deleteTokens = () => {
    Cookie.remove("token");
    Cookie.remove("refreshToken");
}

const getTokensForBrowser = () => {
    let token = Cookie.getJSON("token");
    let refreshToken = Cookie.getJSON("refreshToken");
    return {
        token: token,
        refreshToken: refreshToken,
    };
}

const getTokensForServer = (req) => {
    let token = "";
    let refreshToken = "";

    if (req.headers.cookie) {
        const cookieToken = req.headers.cookie
            .split(";")
            .find((c) => c.trim().startsWith("token="));
        const cookieRefreshToken = req.headers.cookie
            .split(";")
            .find((c) => c.trim().startsWith("refreshToken="));

        token = cookieToken.split("=")[1];
        refreshToken = cookieRefreshToken.split("=")[1];
    }

    return {
        token: token,
        refreshToken: refreshToken,
    };
}

export {
    saveTokens,
    deleteTokens,
    getTokensForBrowser,
    getTokensForServer,
};