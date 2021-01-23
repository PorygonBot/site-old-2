import { useState } from "react";
import useSWR from "swr";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";

import oauth from "./oauth";
import Header from "./header"
import Footer from "./footer"
import { deleteTokens, getTokensForBrowser } from "../lib/cookie";

const fetcher = (url) => fetch(url).then((r) => r.json());

export default function Layout({ children }) {
    let { data, error } = useSWR("/api/user", fetcher);
    const user = data;

    return (
        <div className="bg-gray-main">
            <Header />
                <div className="font-mono">
                    {children}
                </div>
            <Footer />
        </div>
    );
}
