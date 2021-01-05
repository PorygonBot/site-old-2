import { useEffect } from "react";
import { useRouter } from "next/router";

import oauth from "../components/oauth";
import { saveTokens } from "../lib/cookie";

function Callback(props) {
    const router = useRouter();

    useEffect(async () => {
        if (props.code === undefined)
            await router.push("/");

        const data = await oauth.tokenRequest({
            code: props.code,
            scope: ["identify", "guilds"],
            grantType: "authorization_code",
        }).catch((e) => {console.error(e)});
        if (data !== 400) {
            saveTokens(data.access_token, data.refresh_token);
        }

        await router.push("/");
    });

    return <p>Redirecting you to home...</p>;
}

Callback.getInitialProps = async (ctx) => {
    const code = ctx.query.code;

    return {
        code: code,
    };
};

export default Callback;
