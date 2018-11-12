if [[ ${IS_BUILD_AGENT} == true ]]
	then TSLINT_ARGS="--formatters-dir node_modules/tslint-teamcity-reporter/ --format TSHintTeamcity"
	else TSLINT_ARGS=""
fi

tslint $TSLINT_ARGS -c tslint.json src/**/*.tsx src/**/*.ts src/*.ts src/*.tsx
