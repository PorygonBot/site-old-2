import { useState } from "react";
import useSWR from "swr";
import { useRouter } from "next/router";

import Layout from "../components/layout";
import oauth from "../components/oauth";
import { deleteTokens, getTokensForBrowser } from "../lib/cookie";

const fetcher = (url) => fetch(url).then((r) => r.json());

export default function Home() {
    let { data, error } = useSWR("/api/user", fetcher);
    const router = useRouter();
    const user = data;

    const [isLoading, setIsLoading] = useState(false);

    if (isLoading === true || !user) {
        return <h1>Loading...</h1>;
    }

    return (
        <Layout>
            <p>Hello, {user.available ? user.username : "world"}!</p>
        </Layout>
    );
}
