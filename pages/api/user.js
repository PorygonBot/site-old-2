import oauth from "../../components/oauth";
import { saveTokens, getTokensForServer } from "../../lib/cookie";

export default async (req, res) => {
    const tokens = getTokensForServer(req);

    if (tokens.token && tokens.refreshToken) {
        let user;
        try {
            user = await oauth.getUser(tokens.token).catch((e) => console.error(e));
            user.guilds = await oauth.getUserGuilds(tokens.token).catch((e) => console.error(e));
            user.available = true;

            res.statusCode = 200;
            res.json(user);
        }
        catch (e) {
            const newTokens = await oauth.tokenRequest({
                refreshToken: tokens.refreshToken,
                grantType: "refresh_token",
            });
            saveTokens(newTokens.access_token, newTokens.refresh_token)
    
            user = await oauth.getUser(newTokens.access_token);
            user.guilds = await oauth.getUserGuilds(newTokens.access_token);
            user.available = true;

            res.statusCode = 200;
            res.json(user);
        }
    }
    else {
        res.statusCode = 404;
        res.json({available: false});
    }
};
