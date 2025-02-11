#! /usr/bin/env node
require("dotenv").config();
const { Client } = require("pg");

const connectionString = process.env.CONNECTION_STRING;

const SQL = `
INSERT INTO messages (username, message) 
VALUES
  ('VecchiR', 'Hello, world!'),
  ('Shamdry', 'woof.'),
  ('thethird', 'thethirdmessage')
`;

const client = new Client({
    connectionString: connectionString,
    ssl: {
        rejectUnauthorized: false, // Required for Supabase SSL connection
    },
});

async function connectAndQuery() {
    try {
        await client.connect();
        console.log('Connected to Supabase!');
        await client.query(SQL);
    } catch (err) {
        console.error('Error connecting or querying:', err);
    } finally {
        await client.end();
        console.log('data added to the database');
    }
}

connectAndQuery();

