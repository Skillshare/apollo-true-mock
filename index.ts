import { makeExecutableSchema } from "@graphql-tools/schema";
import { ApolloServer } from '@apollo/server';
import { addMocksToSchema } from '@graphql-tools/mock';
import { startStandaloneServer } from '@apollo/server/standalone';
import fs from "node:fs";

const noopResolvers = {
    Query: {},
    Mutation: {}
}

const loadSchemaDef = async (): Promise<string> => {
    const fPath = process.env["ATM_SCHEMA_DEF"] ?? `${import.meta.dir}/schema.graphql`;
    console.log(`Loading schema def from ${fPath}`);
    //This should be able to use Bun.file() but for some reason things crash really hard in docker...
    const fileData = fs.readFileSync(fPath);
    return fileData.toString();
}

const schemaDef = await loadSchemaDef();

const schema = makeExecutableSchema({
    typeDefs: schemaDef,
    resolvers: noopResolvers
});

const server = new ApolloServer({
    schema: addMocksToSchema({schema}),
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
