# Copy release files to the website repository
version=$(jq -r .version package.json)
mkdir -p ../reshaped-website/releases/$version
mv ./reshaped-source-v$version.zip ../reshaped-website/releases/$version/reshaped-source-v$version.zip
