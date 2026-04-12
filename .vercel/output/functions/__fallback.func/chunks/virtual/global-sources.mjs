const sources = [
    {
        "context": {
            "name": "nuxt:pages",
            "description": "Generated from your static page files.",
            "tips": [
                "Can be disabled with `{ excludeAppSources: ['nuxt:pages'] }`."
            ]
        },
        "urls": [
            {
                "loc": "/",
                "_sitemap": "pl-PL",
                "alternatives": [
                    {
                        "hreflang": "pl-PL",
                        "href": "/"
                    },
                    {
                        "hreflang": "en-US",
                        "href": "/en"
                    },
                    {
                        "hreflang": "x-default",
                        "href": "/"
                    }
                ]
            },
            {
                "loc": "/en",
                "_sitemap": "en-US",
                "alternatives": [
                    {
                        "hreflang": "pl-PL",
                        "href": "/"
                    },
                    {
                        "hreflang": "en-US",
                        "href": "/en"
                    },
                    {
                        "hreflang": "x-default",
                        "href": "/"
                    }
                ]
            },
            {
                "loc": "/polityka-prywatnosci",
                "_sitemap": "pl-PL",
                "alternatives": [
                    {
                        "hreflang": "pl-PL",
                        "href": "/polityka-prywatnosci"
                    },
                    {
                        "hreflang": "en-US",
                        "href": "/en/polityka-prywatnosci"
                    },
                    {
                        "hreflang": "x-default",
                        "href": "/polityka-prywatnosci"
                    }
                ]
            },
            {
                "loc": "/en/polityka-prywatnosci",
                "_sitemap": "en-US",
                "alternatives": [
                    {
                        "hreflang": "pl-PL",
                        "href": "/polityka-prywatnosci"
                    },
                    {
                        "hreflang": "en-US",
                        "href": "/en/polityka-prywatnosci"
                    },
                    {
                        "hreflang": "x-default",
                        "href": "/polityka-prywatnosci"
                    }
                ]
            }
        ],
        "sourceType": "app"
    }
];

export { sources };
//# sourceMappingURL=global-sources.mjs.map
