# Myanimelist authenticator

A POC for a myanimelist authenticator using request and cheerio.
Can be extended to write scrapers that require authentication on the MyAnimeList website.

## Warnings

Be careful that too many failed logins will force a wait time before being able to attempt to login again.
It is recommended to use a proxy to avoid this.

## Files

A cookie will be stores in `./credentials/cookies.json`. It is used to persist logins so tha the credentials can be discarded.
A credential file is used to authenticate into the MyAnimelistWebsite for the very first time.
