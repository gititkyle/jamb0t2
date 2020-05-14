<div align="center">
    <img width="115" src="app/rsrc/images/avatar.gif">
</div>

# `jamb0t2`: the bot who jams [plug.dj/justjambands](https://plug.dj/justjambands)

[![Build Status](https://travis-ci.org/chooooons/jamb0t2.svg?branch=master)](https://travis-ci.org/chooooons/jamb0t2)

## Tools
+ node 12.16.0
+ npm 6.13.4
+ TypeScript 3.8.3

## Getting started
1. Make sure you have `node` installed or start [here](https://nodejs.org/en/download/)
1. Verify `node` and `npm` versions
    + `node -v` (should ouput `v12.16.0` or similar)
    + `npm -v` (should output `6.13.4` or similar)
1. Create a [plug.dj](https://plug.dj) account for your test bot
1. Generate api keys (required for certain features)
    + [giphy](https://developers.giphy.com/docs/sdk/)
    + [twitter](https://developer.twitter.com)
1. Clone this repo
    + `git clone git@github.com:chooooons/jamb0t2.git`
    + `cd jamb0t2`
1. Work off develop branch
    + `git checkout -b <your-branch-name> develop`
1. Set environment variables
    + `vim ~/.bash_profile`
    + Add the following lines
        + `export NODE_PATH=$NODE_PATH:./:./app`
        + `export JAMBOT2_EMAIL=<email>`
        + `export JAMBOT2_PASSWORD=<password>`
        + `export GIPHY_KEY=<giphy key>`
        + `export TWITTER_CONSUMER_KEY=<key>`
        + `export TWITTER_CONSUMER_SECRET=<secret>`
        + `export TWITTER_ACCESS_KEY=<key>`
        + `export TWITTER_ACCESS_SECRET=<secret>`
    + `:wq` save and [close](https://img.devrant.com/devrant/rant/r_807739_n54aC.jpg)
    + `source ~/.bash_profile`
1. Install npm dependencies
    + `npm install`
1. Set up log directory
    + `sudo mkdir /jamb0t2/var/log/jamb0t2`
    + `chown` this directory to your user
1. Link configuration
    + `cd config` from the root directory of this project
    + `ln -s dev.conf.json conf.json`
    + edit `conf.json` to use your room if you aren't using `dev-justjambands` to test
        ```
        "plug": {
            "room": "<your room>"
        }
1. Run
    + `cd ..` back to the root directory
    + `npm start`

## Specs
1. Specs live in the same directory as the feature it tests
    + `score.ts`
    + `score.spec.ts`
1. Run `npm test` to run all tests
1. Run `npm test:coverage` to generate coverage report

## Structure
**/app** - app entry<br/>
**/app/rsrc** - resources <br/>
**/app/src** - source<br/>
**/build** - build scripts<br/>
**/config** - configuration<br/>
**/coverage** - coverage (emitted by `nyc`)<br/>
**/dist** - distribution app (emitted by `tsc`)<br/>

 ## Logs
+ console
+ /jamb0t2/var/log/jamb0t2/jamb0t2*.log

## Guidelines
1. General
    + Always specify *exact* versions of npm dependencies
        + `"typescript": "3.8.3"` not `"typescript": "^3.8.3"`
1. Style
    + Indentation of 4 spaces

## Tasks
All tasks are defined in `package.json` and run with `npm run <task>`. This is subject to change as this project grows.

[<img width="50" alt="@jamb0t2" src="app/rsrc/images/twitter-logo.png">](https://twitter.com/jamb0t2)
