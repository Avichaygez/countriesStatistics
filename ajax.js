/**
 * 
 * @param {*} URL  =The Url of 
 * @returns  = 
 */
function getCountriesAsync(URL) {
    return new Promise((resolve, reject) => {
        $.ajax({
            method: "GET",
            url: URL,
            success: function (countries) {
                resolve(countries);
            },
            error: e => reject(e)
        });
    });
}
