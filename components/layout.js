import { useState } from "react";
import useSWR from "swr";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";

import oauth from "./oauth";
import { deleteTokens, getTokensForBrowser } from "../lib/cookie";

const fetcher = (url) => fetch(url).then((r) => r.json());

export default function Layout({ children }) {
    let { data, error } = useSWR("/api/user", fetcher);
    const router = useRouter();
    const user = data;

    const [isLoading, setIsLoading] = useState(false);

    const url = oauth.generateAuthUrl({
        scope: ["identify", "guilds"],
    });

    const logout = async (e) => {
        const tokens = getTokensForBrowser();
        const credentials = Buffer.from(
            `${process.env.DISCORD_CLIENT_ID}:${process.env.DISCORD_CLIENT_SECRET}`
        ).toString("base64");
        await oauth.revokeToken(tokens.access_token, credentials);
        deleteTokens();
        setIsLoading(true);
        router.reload();
    };

    if (isLoading || !user) {
        return <h1>Loading...</h1>;
    }

    const guildNames =
        user && user.guilds ? user.guilds.map((guild) => guild.name) : [];

    return (
        <div>
            <div className="bg-black w-full flex justify-between p-2 items-center">
                <div className="flex text-white items-center">
                    <Link href="/">
                        <a>
                            <div className="inline-flex">
                                <Image
                                    src="/PorygonLogoCircle.png"
                                    width={50}
                                    height={50}
                                />
                            </div>
                        </a>
                    </Link>
                    <ul className="inline-flex text-white text-2xl ml-3">
                        <Link href="https://discord.com/api/oauth2/authorize?client_id=692091256477581423&permissions=0&scope=bot"><a><li className="ml-3 mr-2">Invite</li></a></Link>
                        <Link href="https://discord.gg/ZPTMZ8f"><a><li className="ml-3 mr-2">Server</li></a></Link>
                        <Link href="https://bit.ly/porygon"><a><li className="ml-3 mr-2">Documentation</li></a></Link>
                    </ul>
                </div>

                <div classname="items-center">
                    {!user.available ? (
                        <button
                            onClick={(e) => router.push(url)}
                            className="p-3 w-24 h-12 text-pink-400 hover:text-white text-sm text-center font-bold rounded-lg border-2 border-pink-400 bg-transparent hover:bg-pink-400"
                        >
                            Login
                        </button>
                    ) : (
                        <button
                            onClick={logout}
                            className="p-3 w-24 h-12 text-pink-400 hover:text-white text-sm text-center font-bold rounded-lg border-2 border-pink-400 bg-transparent hover:bg-pink-400"
                        >
                            Logout
                        </button>
                    )}
                </div>
            </div>
            {children}
        </div>
    );
}
