import oauth from "../../components/oauth";
import { saveTokens, deleteTokens, getTokensForServer } from "../../lib/cookie";
const axios = require("axios");
const querystring = require("querystring");

export default async (req, res) => {
    const tokens = getTokensForServer(req);

    if (tokens.token && tokens.refreshToken) {
        let user;
        try {
            user = await oauth.getUser(tokens.token);
            user.guilds = await oauth.getUserGuilds(tokens.token);
            user.available = true;

            res.statusCode = 200;
            res.json(user);
        } catch (e) {
            deleteTokens();
            res.statusCode = 404;
            res.json({ available: false });
        }
    } else {
        res.statusCode = 404;
        res.json({ available: false });
    }
};
