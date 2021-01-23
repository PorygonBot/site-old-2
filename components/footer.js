import Link from "next/link";

export default function Footer() {
    return (
        <div className="bg-black pb-2 pt-2 bottom-0">
            <div className="bottom-0">
                <p className="text-gray-500 text-xs">
                    Site and bot created by{" "}
                    <Link href="https://harshithiyer.me/">
                        <a className="text-gray-400 hover:text-gray-300">
                            Harshith Iyer (harbar20)
                        </a>
                    </Link>
                    . Logo created by{" "}
                    <Link href="https://themewsthebest-portfolio.weebly.com/">
                        <a className="text-gray-400 hover:text-gray-300">
                            MewsTheBest
                        </a>
                    </Link>
                    . Porygon (the character and the name), Pokémon, and Pokémon
                    character names are trademarks of Nintendo. Porygon (the
                    bot), PorygonBot, PorygonTheBot, PorygonTesting, Harshith
                    Iyer, harbar20, and porygonbot.xyz are not affiliated with
                    The Pokémon Company or Nintendo.{" "}
                    <Link href="https://github.com/PorygonBot/site">
                        <a className="text-gray-400 hover:text-gray-300">
                            Site Source
                        </a>
                    </Link>
                </p>
            </div>
        </div>
    );
}
