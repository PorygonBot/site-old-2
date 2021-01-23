import tables from '../../../../components/airtable'

export default async (req, res) => {
    const {
        query: { id },
    } = req;

    const leagues = await tables.leagues.read();
    let final = [];
    if (id) {
        final = leagues.filter((record) => record.fields["Guild ID"] === id);
    }

    res.json(final, 200);
}
