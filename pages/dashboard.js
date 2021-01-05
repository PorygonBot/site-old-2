import { useState } from "react";
import useSWR from "swr";
import { useRouter } from "next/router";

import Layout from "../components/layout";
import oauth from "../components/oauth";
import { deleteTokens, getTokensForBrowser } from "../lib/cookie";

const fetcher = (url) => fetch(url).then((r) => r.json());

export default function Dashboard() {
    let { data, error } = useSWR("/api/user", fetcher);
    const router = useRouter();
    const user = data;

    const [isLoading, setIsLoading] = useState(false);

    if (isLoading || !user) {
        return <h1>Loading...</h1>;
    }

    if (!user.available) {
        router.push("/")
    }

    return (
        <Layout>
            <p>
                Hello, {user.available ? user.username : "world"}, to your
                dashboard!
            </p>
            <div class="relative inline-block group">
                <button class="bg-green-600 text-white p-4 text-lg">
                    Dropdown
                </button>
                <div class="hidden absolute bg-yellow-300 w-28 shadow-md group-hover:block">
                    <a
                        href="#"
                        class="text-black block hover:bg-blue-300"
                    >
                        Hi
                    </a>
                    <a
                        href="#"
                        class="text-black block hover:bg-blue-300"
                    >
                        Bye
                    </a>
                </div>
            </div>
        </Layout>
    );
}
