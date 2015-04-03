pretotype-template
==================

Setup environment.

- Install grunt and npm.
- Install npm modules: npm install
- Install bower modules: grunt bower
- Run for development: grunt dev, enter to localhost:8001

Karma test are run in background by 'grunt dev' task.

Protractor tests
----------------

Install webdriver:
./node_modules/protractor/bin/webdriver-manager update

Start selenium server:
./node_modules/protractor/bin/webdriver-manager start

Run protractor tests:
./node_modules/protractor/bin/protractor ./src/test/protractor.config.js

