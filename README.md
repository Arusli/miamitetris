To re-webpack/update the main.js file, use: npm run-script build.

If you want to make the static version (no server), need to change the filepath to the js file in index.html, and change filpath to the palmtree image in the style.css. See below:

TO RUN APP WITH SERVER (app.js):
1. You need to link the index.html script tag to main.js.
2. Need to set css background image path to url('palmtrees.jpg');

TO RUN APP WITHOUT SERVER:
1. You need to link the index.html script tag to: script type="module" src="../src/index.js"
2. Need to set css background image path to url('../images/palmtrees.jpg')





