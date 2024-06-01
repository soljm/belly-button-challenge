# Belly Button Challenge

From Module 14: Interactive Visualisations from the Data Analytics Boot Camp by Monash University and EdX.

By implementing skills learnt throughout the module, an attempt at the challenge has been submitted here.

Deployed to GitHub Pages [here](https://soljm.github.io/belly-button-challenge/).

## Contents

- `static` folder
  - `js` folder
    - `app.js` file containing main JavaScript code
- `index.html` file
- `samples.json` file

## Explanation

### Metadata Panel

A function was used to build the metadata panel where the demographic information is displayed when a test subject is selected from the dropdown menu. `.html("")` was used to clear any existing metadata information and a `for each` loop was used to loop through and append each key-value to display in the metadata panel.

### Charts

The required values were retrieved and stored in appropriately named variables. The OTU IDs and sample values were put into a list of strings to sort by sample values in descending order. The top 10 after sorting was retrieved and plotted in a horizontal bar chart using `.map()` for the x and y-axes.

### Dropdown Menu

A loop was used to add the values in `names` to the dropdown menu and the functions above were called to update the metadata panel and charts to reflect the new test subject ID.

## Credits

- All data and starter codes were given.
- Thanks to my friend, NT, for helping with syntax and troubleshooting.