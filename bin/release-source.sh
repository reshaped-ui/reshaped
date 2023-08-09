mv LICENSE.md LICENSE-TEMP.md
mv LICENSE-SOURCE.md LICENSE.md

git archive -o reshaped-source-v$(jq -r .version package.json).zip HEAD . ':!.chromatic'

mv LICENSE.md LICENSE-SOURCE.md
mv LICENSE-TEMP.md LICENSE.md