FILES=$(git status --porcelain | grep '^[MADRC!?]..' | sed s/^...//)
# echo $PML_ARGS
LABEL=$(node answers-client/common/lib/dist/tools/calc-module-label/cli.js $PML_ARGS --root answers-client --root-name client --aliases answers-client/common/lib/config/client-module-aliases.json ${FILES})
LABEL="${LABEL##*/}"
sed -i.bak -e "1s/^/$LABEL: /" $1
