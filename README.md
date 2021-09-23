# ConnectyCube Custom identity provider Starter Kit

A starter demo project for using Custom identity provider service for ConnectyCube

Custom Identity Provider (CIdP) feature is necessary if you need to use an external database (your own users data base) to authenticate your application users instead of database on ConnectyCube server.

With Custom Identity Provider feature you can continue using your user database instead of storing/copying user data to ConnectyCube server. It works in a similar way to Facebook/Twitter SSO.

A more detailed guide about the feature:
https://developers.connectycube.com/guides/custom-identity-provider


## Installation

`npm install`


## Run

Run locally:

`DEBUG=custom-idp-starter-kit:* npm start`

Run on the server (use Nginx as a revers proxy):

`pm2 start ./bin/www`

## Testing

Request (both GET & POST are supported):

`curl -d "token=aUserAccessToken" -X POST http://localhost:3000/user/verify`

`curl -X GET http://localhost:3000/user/verify?token=aUserAccessToken`

Response:

`{"uid": xxxxxx}`
