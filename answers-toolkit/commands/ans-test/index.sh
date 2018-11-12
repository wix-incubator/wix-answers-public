#!/usr/bin/env bash

if [[ ${IS_BUILD_AGENT} == true ]]; then reporter=mocha-teamcity-reporter; else reporter=spec; fi

mocha --require node_modules/answers-lib/config/jsdom-setup.js \
--timeout 20000 \
--reporter $reporter \
--exit \
'dist/**/*.test.js' 'dist/**/*.spec.js' 'dist/spec.js' 'dist/**/spec.js' 'dist/**/*/spec.js'
