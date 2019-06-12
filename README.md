# Google Maps Challenge - Christian Gileski

##How to run the service:

1. Make sure you have [Node](https://nodejs.org/en/) and [npm](https://www.npmjs.com/) installed on your machine. This project is a full-stack node project, utlizing Hapi for the server, axios for the routing, and React for the user interface.

###If cloning from the git repository, go [here](https://github.com/christiangileski/google-maps-challenge), and follow these additional instructions before proceeding. If downloading the `.zip`, proceed to step five.

2. Clone the repository
3. Run `npm install` from the console of your choosing (bash, terminal, etc.) while in the project folder to install all dependencies.
4. Create a `.env` file and add the field `API_KEY` with your respective API key as the value.

###API Key instructions

5. If you're running this from the submitted `.zip`, update the included `.env` which contains the `API_KEY` field to your own valid [Google API Key](https://developers.google.com/maps/documentation/javascript/get-api-key).
6. Enable the Google Geocoding API for your project whose API key you'll be using by clicking the `Enable` button after selecting your project [here](https://console.developers.google.com/apis/library/geocoding-backend.googleapis.com). This is necessary to utilize the geocoding functionality.
7. Enable the Google Maps API for your project whose API key you'll be using by clicking the `Enable` button after selecting your project [here](https://console.developers.google.com/apis/library/maps-backend.googleapis.com). This is necessary to use the map which is rendered to the React UI.

###Additional instructions **ALL** users must follow to properly run the application

8. Open *two* instances of your preferred console (bash, terminal, etc.) inside the project. One will host the server locally, the other will host the client locally.
9. If you've already run `npm install` or downloaded the project from the `.zip`, you're ready for the next step. Otherwise, run `npm install` to install the necessary dependencies.
10. On one console, run `npm run serve`. This will fire up the server on http://localhost:8333. The client is dependent on the server so run this first and make sure it starts succesfully. You will see a `Server running at:` message if successful.
11. On the second console, run `npm run client`. This will fire up the user interface on http://localhost:3000. NOTE: This will run an unoptimized development client locally, and will automatically open a Chrome tab to the aforementioned address.

##Features

- This application features an interactive Google map, as well as two textfields and three buttons, two of which retrieve information for the addresses in their respective text fields, and one to retrieve the distance between the two locations.

- The address fields allow for *any* address the Google Maps API allows (street address, geographic coordinates, building name eg. The White House).

- Clicking one of the buttons to retrieve information for one of the addresses utilizes either the geocode api or reverse geocode api to collect and display information regarding the given address. If an invalid address is entered, an error message is displayed instead.

- In addition to receiving the information for the entered address, the rendered map will center on the address, as well as inserting a marker on the location with the street address of the location as a tooltip.

- The buttons to retrieve address information are disabled until the respective address textfield is populated with some value.

- Clicking the button to calculate the distance between the two addresses displays the street addresses of the two addresses, regardless of their format, in addition to their distance apart in multiple units of measurement.

- The buttons to calculate distance is disabled until both address fields are populated with some value.

- Two `edit address` icon buttons are located to the right of each address textfield. Clicking one of the buttons allows the user to click on the map to retrieve its coordinates and populate the address field using that approach.

- The left container has decreased opacity if the user is currently in the mode to select an address from the map. Clicking a button or focusing on one of the textfields brings the user out of that mode, noted by the restored opacity to the left container.

- There's a `Loading...` page before the application retrieves your API key and plugs it into the rendered map, so users aren't looking at a blank page in the brief moments while the data loads.

- There's a `404` page with a redirect link to the homepage if the user manually enters an invalid URL in the browser's URL bar.

###Why I find it interesting and what I believe I've done to enhance its interactivity

- I believe adding an interactive Google Map to an otherwise simple distance-calculating app added much more to the user experience. The option to select an address directly from the map rather than being limited to only manually inputting the address adds a layer of complexity and depth that otherwise wouldn't be available.

- Google's interactive apis which integrate well with each other are awesome. Being able to take a click event from their map and plug it right into their geocoding functionality is seamless and intuitive. I'm able to place markers and re-center the map on my selected location with ease.

- I believe I've added some features which enhance the application:
    - A blue/white color theme which mimics Google Maps' color theme.
    - Carefully aligned and padded content which improves user-friendliness and aesthetic appeal.
    - A `Loading...` page and `404` page so and errors or moments outside of the main application are handled well.
    - The application uses `<Grid>` so it scales pretty well for most, if not all monitors and laptops. It does not include mobile or tablet friendliness, however.
    - Handling invalid addresses responsibly and disabling buttons until values are input improves robustness to exceptions.
    - Small features such as the tooltip when hovering the `edit address` button or decreasing opacity when in the mode to select an address from the map are minor but important details which make the application more user-friendly.
    - Similar to above, adding a marker and re-centering the map after selecting to get information about one of the addresses is a small but cool feature to have, in my opinion.
    - Use of React and Material UI made for an aesthetically-pleasing interface, with components familiar to users.

###Challenges faced while building this application

- I haven't worked much in Hapi 17, so the client-to-server routing was more challenging than I'm used to. Unfortunately I had to hard-code the server-side URL into the axios calls and enable cors on the server. In the past, I've been able to write helper functions which prevent the need for cors between client-side and servide-side api calls, and rather have the helper axios functions simply call, for example, `/api/geocode`.

- Figuring out how to take an environment variable, load it server-side, then utilize it client-side was tricky. In addition, I had to make sure the Google Map didn't try to render before the API key had loaded, otherwise the map wouldn't load correctly.

- I didn't write any unit or integration tests, those would've taken too much time, in my opinion.

####Miscellaneous

The project was started using a duplicate of the repository I used to build my personal site. The repository for that can be found [here](https://github.com/christiangileski/personal-website). My personal site is hosted at http://www.christiangileski.me This project is built using react-scripts for the UI. As mentioned, running the client runs a non-optimized development build, and thus the initial load takes some time to bundle all of the code and start the client.