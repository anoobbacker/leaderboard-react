# Overview
This is a friendly fun project created after going through the pain of building custom things to calculate the leaderboard for the match predictions during the World Cup 2018, & Euro Cup 2020. I will be updating this for World Cup 2022. 

This can be used as the dashboard for a fun social leaderboard between friends.

This uses ReactJs, Bootstrap, HTML, JS, CSS for a static single pages design best suited for all devices like mobile, desktop etc.

# Preview
[View live preview](https://anoobbacker.github.io/leaderboard-react)

# Usage
Fork this project and peform the following steps to customize it for you and your friends:
1. `public/assets/data/*` has sample files for prediction and results. You need to update the files for you friends. Use either an online form like Microsoft Forms or Microsoft Excel to collect all the prediction scores from your friends.
2. Upload the CSV files in a publicly accessible read-only storage location. Use Azure Storage account for storing the CSV, set the CORS, and set the appropriate permission. The browser just needs a read-only access to these CSV files.
3. Update `src/games/*/*.js` to point to the publicly accessible CSV, tournament match stages, prediction points for each stages etc.
4. Update `src/components/TournamentContext.js` with the tournament details.
5. Upload the Avatars for your friends under `public/assets/img/`. The final name for the Avatar should be like `Adam.png`. Use the same name used in the CSV files for the Avatar image name.

To view a preview open the `index.html` file in your web browser after making the changes.

# To do
- Improve the documentation
- Improve the code to make it modular, reusable, configurable
- Add support for localization
- Add unit tests
- Automate the collecting prediction input from friends.
- Fetch match schedule, match results and particpant prediction using API.
- Integrate with DevOps CI/CD

# Prediction points
- Till quarterfinals, a perfect guess of score & the winner will bag 3-points. It will be 1-point if you predicted only the winner.
- From quarterfinals, a perfect guess of score & the winner is 5-points. If you predicted only the winner it will be 3-points. A wrong prediction will result in a deduction of 1-point.
- From semifinals, a perfect guess of score & the winner is 15-points. If you predicted only the winner it will be 5-points. A wrong prediction will result in a deduction of 5-point.
- From finals, a perfect guess of score & the winner is 40-points. If you predicted only the winner it will be 15-points. A wrong prediction will result in a deduction of 10-point.

# Screenshots
To be udpated

# Tools used
- [ReactJs](https://reactjs.org/)
- Avatars generated from [Getavataaars](https://getavataaars.com).
- Bootstrap template [New Age](https://github.com/BlackrockDigital/startbootstrap-new-age)
- Parsing of CSV using [Papa parse](http://papaparse.com/)

# Copyright and License
Code released under the [MIT](https://github.com/anoobbacker/betwc/blob/master/LICENSE) license.

## Available Scripts
In the project directory, you can run:

### `npm install`
To set up the packages.

### `npm start`
Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`
Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`
Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)