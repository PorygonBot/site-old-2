import { useState } from "react";
import useSWR from "swr";
import {useRouter} from 'next/router'

import Layout from "../components/layout";
import oauth from '../components/oauth'
import {deleteTokens, getTokensForBrowser} from '../lib/cookie'

const fetcher = url => fetch(url).then(r => r.json())

export default function Home() {
	let {data, error} = useSWR('/api/user', fetcher);
	const router = useRouter()
	const user = data;

	const [isLoading, setIsLoading] = useState(false);
	
	const url = oauth.generateAuthUrl({
        scope: ["identify", "guilds"]
	});
	const buttonCSS = "h-40 w-40 bg-blue-200"

	const logout = async (e) => {
		const tokens = getTokensForBrowser();
		const credentials = Buffer.from(`${process.env.DISCORD_CLIENT_ID}:${process.env.DISCORD_CLIENT_SECRET}`).toString("base64");
		await oauth.revokeToken(tokens.access_token, credentials);
		deleteTokens();
	}

	/*
	You want to store the loading status in the state.
	Set it to false. 
	When you click logout, set that to true. 
	Once the function is resolved, set to false again.

	oh that's smart. can you show me lol, i came up with a really jank solution for loading stuff.
	
	yeah you can use the useState()
	*/
	
	if (!user) {
		return <h1>Loading...</h1>
	}

	const guildNames = user && user.guilds ? user.guilds.map((guild) => guild.name) : []

    return (
        <Layout>
            <h1 className="text-5xl font-bold text-purple-500">
                Hello, {user.available ? user.username : "world"}!
            </h1>
			<ul>
			{ 
				guildNames.map((guildName) => <li>{guildName}</li>)
			}
			</ul>
            {
				!user.available ? <a href={url}><button className={buttonCSS}>Login</button></a> : <button onClick={logout} className={buttonCSS}>Logout</button>
			}
        </Layout>
    );
}
