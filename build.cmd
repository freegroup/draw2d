:: generate the jsDoc
cd ./jsdoc/
yarn install
./node_modules/jsdoc/jsdoc.js -c ./jsdoc.conf

:: generate the VUEjs app
npm run build

:: delete old docu
cd ..
rm -r ./docs/
cp -r ./jsdoc/dist/ ./docs

:: build the dist folder
cp ./dist/draw2d.js ./jsdoc/public/
yarn install
yarn build
