import { useState } from "react";
import useSWR from "swr";
import { useRouter } from "next/router";
import Image from "next/image";

import Layout from "../components/layout";
import oauth from "../components/oauth";
import { deleteTokens, getTokensForBrowser } from "../lib/cookie";

const fetcher = (url) => fetch(url).then((r) => r.json());

export default function Dashboard() {
    let userData = useSWR("/api/user", fetcher);
    const user = userData.data;
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [chosen, setChosen] = useState({
        guild: { id: "" },
        league: { fields: { "Custom Rules": ["yo"] } },
    });
    let leaguesData = useSWR(`/api/record/guild/${chosen.guild.id}`, fetcher);
    const leagues = leaguesData.data || [];
    let rulesData = useSWR(
        `/api/record/rules/${chosen.league.fields["Custom Rules"][0]}`,
        fetcher
    );
    const rules = rulesData.data || {};

    if (isLoading || !user) {
        return <h1>Loading...</h1>;
    }

    if (!user.available) {
        router.push("/");
    }

    const guilds = user.guilds;
    guilds.sort((a, b) => (a.name > b.name ? 1 : -1));

    return (
        <Layout>
            <p>
                Welcome, {user.available ? user.username : "world"}, to your
                dashboard!
            </p>
            <div className="relative inline-block group w-40">
                <button className="bg-green-600 hover:bg-green-300 text-white w-full p-1 text-base">
                    {chosen.guild.name ? (
                        <div className="text-black block hover:bg-blue-300 p-1">
                            <div className="inline-flex items-center">
                                <Image
                                    className="rounded-full"
                                    src={`https://cdn.discordapp.com/icons/${chosen.guild.id}/${chosen.guild.icon}.png?size=2048`}
                                    width={25}
                                    height={25}
                                />
                                {chosen.guild.name}
                            </div>
                        </div>
                    ) : (
                        "Servers"
                    )}
                </button>
                <div className="hidden absolute bg-yellow-300 w-full shadow-md group-hover:block">
                    {guilds.map((guild) => (
                        <a
                            href="#"
                            onClick={() => {
                                setChosen({
                                    guild: guild,
                                    league: {
                                        fields: { "Custom Rules": ["yo"] },
                                    },
                                });
                            }}
                            className="text-xs"
                        >
                            <div className="text-black block hover:bg-blue-300">
                                <div className="inline-flex items-center">
                                    <Image
                                        className="rounded-full pl-1"
                                        src={`https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png?size=2048`}
                                        width={25}
                                        height={25}
                                    />

                                    <div className="inline-flex">
                                        {guild.name}
                                    </div>
                                </div>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
            <div className="bg-gray-medium2 h-60">
                {leagues.length >= 1 ? (
                    <div>
                        {leagues.map((league) => (
                            <a
                                href="#"
                                onClick={() => {
                                    setChosen({
                                        guild: chosen.guild,
                                        league: league.fields["Custom Rules"]
                                            ? league
                                            : {
                                                  fields: {
                                                      "Custom Rules": ["yo"],
                                                  },
                                              },
                                    });
                                }}
                                className="text-xs"
                            >
                                <div className="text-black block hover:bg-blue-300 bg-yellow-300 inline-flex w-40 p-1 text-base">
                                    {league.fields["Name"]}
                                </div>
                                <br />
                            </a>
                        ))}
                        <a
                            href="#"
                            onClick={() => {
                                console.log("uh");
                            }}
                            className="text-xs"
                        >
                            <div className="text-black block hover:bg-blue-300 bg-yellow-300 inline-flex w-40 p-1 text-base">
                                +
                            </div>
                        </a>
                    </div>
                ) : (
                    ""
                )}
            </div>
        </Layout>
    );
}
