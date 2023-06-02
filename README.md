# Apollo True Mock

An extensible Docker image and Bun.js app to create a standalone mock of a GraphQL Schema.

## Usage

There are two ways to use this package

1. As a docker image, under `apollo-true-mock:latest`
2. Directly through *Bun*
   1. `bun install`
   2. `bun index.ts`

## Configuration

All configuration is done through loaded files with paths customizable via ENV variables:

**Note:** ${currDir} represents the current directory the script executes in, for docker this is `/home/bun/app`

1. (Required) the type definitions for your schema (in SDL format). By default, we look for this file in `${currDir}/schema.graphql`. However, this is customizable via the env var `ATM_TYPE_DEFS_PATH`
2. (Optional) custom type mocks. All types will automatically receive a default mock (scalar types will receive mocks based on their type. See more information [here](https://www.apollographql.com/docs/apollo-server/testing/mocking/)). By default, we load the default export from `${currDir}/custom-mocks.ts`. However, this is customizable via the env var `ATM_CUSTOM_MOCKS_PATH`

## Examples

A full working **docker-compose** example can be found in `./example`