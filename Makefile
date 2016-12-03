BIN=node_modules/.bin

test:
	make lint
	$(BIN)/mocha 'test/specs/**/*.js'

lint:
	$(BIN)/eslint index.js
	$(BIN)/eslint 'test/specs/**/*.js'

docs:
	doxdox index.js --layout markdown --output DOCUMENTATION.md

.PHONY: test
