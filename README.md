
Github Issues Count
===================================

This a portal to get a live count of issues of public repository.
The web portal is live on: http://52.91.35.65:8089/

Solution
------------

The app uses the npm package https://www.npmjs.com/package/octonode which is wrapper for github V3 api.
Using the github search api, the count for no. of issues is retrieved.

Improvemts
------------

There is no check for the repo url entered. The url can be invalid or the repo can be private.