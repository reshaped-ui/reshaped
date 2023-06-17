# Copy release files to the website repository
version=$(jq -r .version package.json)
mv ./reshaped-react-v$version.tgz ../reshaped-website/releases/$version/reshaped-react-v$version.tgz
mv ./reshaped-source-v$version.zip ../reshaped-website/releases/$version/reshaped-source-v$version.zip

# Move storybook build
rm -rf ../reshaped-website/public/storybook
cp -r ./dist/app ../reshaped-website/public/storybook
