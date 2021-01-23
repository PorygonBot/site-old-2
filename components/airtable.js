const AirtablePlus = require('airtable-plus');

const leaguesTable = new AirtablePlus({
    baseID: process.env.AIRTABLE_BASE_ID,
    apiKey: process.env.AIRTABLE_API_KEY,
    tableName: 'Leagues',
});

const rulesTable = new AirtablePlus({
    baseID: process.env.AIRTABLE_BASE_ID,
    apiKey: process.env.AIRTABLE_API_KEY,
    tableName: 'Custom Rules',
});

export default {
    leagues: leaguesTable,
    rules: rulesTable
}