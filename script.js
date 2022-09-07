/// <reference path="jquery-3.6.0.js" />
$("#tableOne").hide();
$("#tableTwo").hide()
$("#valDiv").hide();;
$("#search").focus();
let val = false;
/**
 * api request for all countries
 */
async function allCountries() {
    cleanScreen();
    try {
        let AllCountries = await getCountriesAsync(`https://restcountries.com/v3.1/all`)
        showCountries(AllCountries);
    }
    catch {
        alert(e);
    }
}

/**
 * api request for  countries who typed by user
 */
async function searchCountries() {
   
    try {

        let countries = await getCountriesAsync(`https://restcountries.com/v3.1/name/${$("#search").val()}`)

        showCountries(countries);

    }
    catch {
        val = true
        validation()

    }
}

function validation() {
    if (val == true) {
        $("#tableOne").hide();
        $("#tableTwo").hide();
        $("#statistics").hide()
        $("#valDiv").show();
    }
}


/**
 * 
 * @param {*} countries specific countries or all of them depends on the pressed button,
 * printing two tables with information 
 */
function showCountries(countries) {
    cleanScreen();
   
    console.log($("#search").length);

    let wrldPopulation = 0;
    let antarctic = 0;
    let americas = 0;
    let oceania = 0;
    let europe = 0;
    let africa = 0;
    let asia = 0;
    for (let country of countries) {

        wrldPopulation += country.population
        if (country.region == "Asia") {
            asia++;
        }
        if (country.region == "Oceania") {
            oceania++;
        }
        if (country.region == "Antarctic") {
            antarctic++;
        }
        else if (country.region == "Europe") {
            europe++;
        }
        else if (country.region == "Africa") {
            africa++;
        }
        else if (country.region == "Americas") {
            americas++;
        }

        $("#bodyOne").append(`
        <tr>
        <td>${country.name.common}</td>
        <td>${country.population}</td>
        </tr>
        `);
    }
    // end of for loop
    if (asia != 0) {
        $("#bodyTwo").append(`<tr> <td>Asia</td> <td>${asia}</td></tr>`);
    }
    if (europe != 0) {
        $("#bodyTwo").append(`<tr><td>Europe</td><td>${europe}</td></tr>`);
    }
    if (americas != 0) {
        $("#bodyTwo").append(`<tr><td>Americas</td><td>${americas}</td> </tr>`);
    }
    if (africa != 0) {
        $("#bodyTwo").append(`<tr><td>Africa</td><td>${africa}</td></tr>`);
    }
    if (oceania != 0) {
        $("#bodyTwo").append(`<tr><td>Oceania</td><td>${oceania}</td></tr>`);
    }
    if (antarctic != 0) {
        $("#bodyTwo").append(`<tr><td>Antarctic</td><td>${antarctic}</td></tr`);
    }

    let avgPopilation = wrldPopulation / countries.length;
    $("#numberOfCountries").html(`Total countries: ${countries.length}`);
    $("#worldPopulation").html(`Total Countries Population: ${wrldPopulation}`);
    $("#avgPopulation").html(`Average Population: ${avgPopilation.toFixed(0)}`);
}


function cleanScreen() {
    $("#valDiv").hide();
    $("#tableOne").show();
    $("#bodyOne").html("");
    $("#tableTwo").show();
    $("#bodyTwo").html("");
    $("#search").focus();
    $("#numberOfCountries").html(`Total countries: 0`);
    $("#worldPopulation").html(`Total Countries Population: 0`);
    $("#avgPopulation").html(`Average Population: 0`);
}
