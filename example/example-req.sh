curl --location --request POST 'http://localhost:8080/graphql' \
--header 'Content-Type: application/json' \
--data-raw '{"query":"query ViewerContext {\n    siteAnnouncement {\n        contentHTML\n        linkUrl\n    }\n    viewer {\n        firstName\n        lastName\n        notifications {\n            count\n        }\n    }\n}","variables":{}}'