import tables from "../../../../components/airtable";

export default async (req, res) => {
    const {
        query: { id },
    } = req;

    let rules;
    if (id !== "yo") rules = await tables.rules.find(id);
    else {
        rules = {
            recoil: "Direct",
            suicide: "Direct",
            abilityitem: "Passive",
            selfteam: "None",
            db: "Passive",
            spoiler: true,
            ping: "",
            forfeit: "None",
            format: "",
            quirks: true,
            timeOfPing: "First",
            stopTalking: false,
            tb: true,
            combinePD: false,
        };
    }

    res.json(rules, 200);
};
