LICENSE_PATH="LICENSE.md"
LICENSE_SOURCE_PATH="LICENSE-SOURCE.md"
LICENSE_TMP_PATH="LICENSE-TEMP.md"

PKG_JSON_PATH="./package.json"
PKG_JSON_TMP_PATH="./package-temp.json"


mv $LICENSE_PATH $LICENSE_TMP_PATH
mv $LICENSE_SOURCE_PATH $LICENSE_PATH

cp $PKG_JSON_PATH $PKG_JSON_TMP_PATH
jq --arg license "SEE LICENSE IN LICENSE.md" '.license = $license' $PKG_JSON_PATH > ./temp.json && mv temp.json $PKG_JSON_PATH

git archive -o reshaped-source-v$(jq -r .version package.json).zip HEAD . ':!.chromatic'

mv $LICENSE_PATH $LICENSE_SOURCE_PATH
mv $LICENSE_TMP_PATH $LICENSE_PATH

mv $PKG_JSON_TMP_PATH $PKG_JSON_PATH
