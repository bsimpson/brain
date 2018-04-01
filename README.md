# Brain

## What the Hell is this?

I got the idea from [a blog post on Brain.js](https://itnext.io/you-can-build-a-neural-network-in-javascript-even-if-you-dont-really-understand-neural-networks-e63e12713a3)
on creating a neural network in Javascript. It seemed more approachable given my familiarity with that tech stack.

I decided to use a Slack channel for the training data, and try to predict given a `MESSAGE` who was most likely
the person that would say said message.

Future plans are hopefully to make this assess whether a statement is optimistic, or pessimistic given training
data around habitually representative individuals in Slack.

This could even be made into a Slack integration where you ask Slackbot/Hubot some question using trained data.

## Usage

Download the zipped JSON file from: https://<your-team-name>.slack.com/services/export

I used the directory `general` however this can be modified to your tastes in the `training.js` module.

Next, set your `MESSAGE` in `brain.js`.

You will also need to copy over your `users.json` file so that you can make sense of the Slack user identifiers.

Then run:

```
node brain.js
```

This should either 1) build training data and store it in `training.json`, or 2) load `training.json` from a previous
run. Note that you can delete `training.json` to regenerate the training data.

## Output

```
node brain.js

iterations: 10 training error: 0.4552615313681672205
...
iterations: 910, training error: 0.005107538808385978
Finished training
{ thehoagie: 0.8129670560771042, robocop: 0.18671212442290405 }
Wrote training data

```