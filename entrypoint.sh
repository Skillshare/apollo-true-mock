#!/bin/sh

if [ -n "$ATM_INTROSPECTION_ENDPOINT" ]; then
    echo "Attempting to load schema via introspection at ${ATM_INTROSPECTION_ENDPOINT}";
    rover graph introspect ${ATM_INTROSPECTION_ENDPOINT} --output /home/bun/app/schema.graphql;
fi

bun index.ts