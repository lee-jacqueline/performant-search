# Search Component Challenge

This project was completed on the 7th August 2021.

## Available Scripts

To start the project, run

`npm install` to install dependencies.\
`npm run start` to view in development mode.\
`npm run test` to launch the test runner.\
`npm run build` to build the package to a `dist` folder.\

## Built with

- create-react-app
- TypeScript
- Jest & react-testing-library

## How to use the component

1. Click the input box to see the dropdown.
2. Hover over the dropdown items to scroll and see list of countries.
3. Type an input string to filter the dropdown.
4. Click an item to select the country.

## Approach

### 1. Folder Structure

```
.
├── public
├── src
│ ├── components
│ │ └── Search
│ ├── App.css
│ ├── App.tsx
│ ├── index.css
│ └── index.tsx
├── .gitignore
├── package.json
└── README.md

```

Each route and component has the following files:

- index.tsx (where the main component is exported)
- {component}.css (where all the styles are included)
- {component}.test.tsx (where all the tests are written specifically for that component)

## Things I didn't get to implement in time

- Not displaying the flag on the input field

## Improvements to make

1. State to be taken out of App.tsx and put into redux or useContext
2. Dropdown to not be "display: none" will have the conditional logic to only render when the dropdown is requested
3. Use of Sass or Styled components for styling
