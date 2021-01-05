import { useState } from "react";
import useSWR from "swr";

import Layout from "../components/layout";
import { deleteTokens, getTokensForBrowser } from "../lib/cookie";

const fetcher = (url) => fetch(url).then((r) => r.json());

export default function Home() {
    let { data, error } = useSWR("/api/user", fetcher);
    const user = data;

    const [isLoading, setIsLoading] = useState(false);

    if (isLoading || !user) {
        return <h1>Loading...</h1>;
    }

    return (
        <Layout>
            <p>Hello, {user.available ? user.username : "world"}!</p>
        </Layout>
    );
}
