import { makeExecutableSchema } from "@graphql-tools/schema";
import { ApolloServer } from '@apollo/server';
import { addMocksToSchema } from '@graphql-tools/mock';
import { startStandaloneServer } from '@apollo/server/standalone';
import fs from "node:fs";
import { baselineMocks } from "./base_mocks";

const noopResolvers = {
    Query: {},
    Mutation: {}
}

const loadSchemaDef = async (): Promise<string> => {
    const fPath = process.env["ATM_TYPE_DEFS_PATH"] ?? `${import.meta.dir}/schema.graphql`;
    console.log(`Loading schema def from ${fPath}`);
    if (!fs.existsSync(fPath)) {
        console.log(`Unable to load schema file at ${fPath}, type definitions file required`);
        process.exit(2);
    }
    //This should be able to use Bun.file() but for some reason things crash really hard in docker...
    const fileData = fs.readFileSync(fPath);
    return fileData.toString();
}

const schemaDef = await loadSchemaDef();

const schema = makeExecutableSchema({
    typeDefs: schemaDef,
    resolvers: noopResolvers
});

let customMocks = {};

const mocksPath = process.env["ATM_CUSTOM_MOCKS_PATH"] ?? `${import.meta.dir}/custom-mocks.ts`;

if (fs.existsSync(mocksPath)) {
    customMocks = (await import(mocksPath)).default;
}

const mocks = {
    ...baselineMocks,
    ...customMocks
};

const server = new ApolloServer({
    schema: addMocksToSchema({schema, mocks}), 
});

console.log("Starting standalone server with mock schema");

const port = process.env["PORT"] ? parseInt(process.env["PORT"]) : 8080;

startStandaloneServer(
    server,
    {
        listen: {port}
    }
);

console.log(`🚀 Server ready at: http://localhost:${port}/graphql`);
