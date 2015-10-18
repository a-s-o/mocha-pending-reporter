# mocha-pending-reporter
Mocha reporter similar to "min" but with logging of pending tests. Useful as a to-do list of things to be tested

![Sample Output](http://i.imgur.com/e4bbnT3.png?1)

## Usage

#### From the command line

    > npm install --save-dev mocha-pending-reporter
    > mocha -R mocha-pending-reporter

#### From your `package.json`

    "scripts": {
        "pending": "mocha -R mocha-pending-reporter"
    },
    "devDependencies": {
        "mocha": "*",
        "mocha-pending-reporter": "*"
    }

Then simply:
    > npm run pending
