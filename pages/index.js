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
            <div className="h-60 bg-fixed bg-center bg-no-repeat bg-cover">
                <h1 className="text-5xl">Porygon</h1>
            </div>

            <div className="bg-gray-medium2 h-60">
                <p>yuh yuh</p>
            </div>

            <div className="h-60 bg-fixed bg-center bg-no-repeat bg-cover">
                <p>What's up people!</p>
            </div>
        </Layout>
    );
}
