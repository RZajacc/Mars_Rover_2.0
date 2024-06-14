# MarsRover_2.0
### Version information:

*This version is built vith Javascript+Typescript and styled with Bootstrap. Also page logic was restructured completely, unit tests with Vitest are added and in some basic form also Webpack*

*If you would like to take a look also on previous versions of the project please check:*

* **v1.0** built vith pure Javascript and styled with Bootstrap. Check [here](https://github.com/RZajacc/Mars_Rover_1.0)
* **v3.0** built vith Javascript+Typescript and styled with CSS+SCSS. Apart from Unit tests I'm working on End-to-end testing with Cypress, and trying to extend the use of Webpack. Check [here](https://github.com/RZajacc/MarsRover_3.0)

### Description:

Project is using one of NASA's open API'S. You can find a list of all of the available ones by clicking [here](https://api.nasa.gov/). Mars rover API let's you collect image data gathered by three mars rovers (Curiosity, Opportunity and Spirit).

The idea for this project is to display photos provided by the API and organize them in a structured way. User can select which rover data should be displayed on a selected solar day. It is also possible to query images from selected camera.

### Project requirements:

To start using the app you will have start with installing all dependencies: 

`npm i`

To run unit tests with Vitest run:

`npm run test` 

or if you prefer UI version: 

`npm run ui`

To check test coverage with Vitest run:

`npm run coverage`

To run End-To-End tests using Cypress run:

`npm run cypress:open`

