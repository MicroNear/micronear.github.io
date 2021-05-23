'use strict';

const link = window.location.pathname;

if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
      navigator.serviceWorker.register('/sw.js').then(function(registration) {
        // Registration was successful
        console.log('ServiceWorker registration successful with scope: ', registration.scope);
      }, function(err) {
        // registration failed :(
        console.log('ServiceWorker registration failed: ', err);
      });
    });
} else {
    alert("Browser not supported.")
}


import {
    showSnackBar,
    findGetParameter,
    round,
    geoPermission,
    observeGeoPermission,
    sendAddRequest,
    sendFindRequest,
    sendListRequest,
    geoData,
    superfetch,
    sendInfoRequest,
    errors
} from '/scripts/functions.js';

/*
import {
    Mnemonic
} from '/scripts/bip39/jsbip39.js'
*/

let geopermission = await geoPermission();

console.log(link)

if(link != "/permissions.html" && !geopermission) {
    console.log("Not cool")
    window.location = "/permissions.html"; 
}

if((link == "/index.html") || (link == "/")) {

    await sendFindRequest();

} else if (link == "/list.html") {

    await sendListRequest(0);

} else if (link == "/add.html") {

    /* Assuming that window.crypto.getRandomValues is available */

    var array = new Uint32Array(12);
    window.crypto.getRandomValues(array);

    console.log("Your lucky numbers:");
    for (var i = 0; i < array.length; i++) {
    console.log(array[i]);
    }

    /*
var m = new Mnemonic("english")

// Generate new mnemonics
var words = m.generate();
"canyon subway other flower grocery diagram cigar such custom rude couch horror"

// Generate BIP32 seeds from mnemonics
var seed = m.toSeed(words, "mysecretpassword");
"b4f0524dd1fcfc15ac2408fc9228df71c706aab238f8558d3b2bb3f4bce8ea25be9a3a6fc684a16ebfbb1240aee3decb404b856dd57298ce150441965c91c6e9"
    */



    const elements = {
        form: document.getElementById("add__form"),
        name: document.getElementById("add__mname"),
        description: document.getElementById("add__description"),
        imnc: null,
        email: document.getElementById("add__email"),
        splash: document.getElementById("add__msplash"),
        website: document.getElementById("add__mwebsite"),
        distance: document.getElementById("add__distance"),
        coordinates: document.getElementById("add__coordinates"),
        terms: document.getElementById("add__terms"),
        buy: document.getElementById("add__buy")
    }

    /*
    elements.terms.addEventListener("change", (e) => {
        const attribute = (elements.terms.checked) ? false : true;

        if(elements.terms.checked) {
            elements.buy.removeAttribute("disabled")
        } else {
            elements.buy.setAttribute("disabled", true);
        }

    })

    */

    elements.form.addEventListener("submit", (e) => {
        
        e.preventDefault();

        let data = {
            name: elements.name.value,
            email: elements.email.value,
            splash: elements.splash.value,
            description: elements.description.value,
            website: elements.website.value,
            privacy_distance: elements.distance.checked,
            privacy_coordinates: elements.coordinates.checked,
            terms: elements.terms.checked,
            coordinates: {latitude: null, longitude: null, accuracy: null}
        }

        console.log(data);

        if(data.terms == true) {
            sendAddRequest(data);
        } else {
            showSnackBar(errors.terms);
        }

    });
} else if (link == "/permissions.html") {

      
    if('geolocation' in navigator) {

        const button = document.querySelector("#permissions__allowlocation");
        
        button.addEventListener("click", async (e) => {
            if(await geoData(false) != false) {
                window.location = "/index.html";
            }
        });

        observeGeoPermission();

    } else {
        alert("Your browser is not supported.")
    }


} else if (link == "/micronation.html") {

    const imnc = findGetParameter("m");

    if(!(imnc == null || imnc == undefined)) {

        await sendInfoRequest(imnc);

    
    } else {
        showSnackBar(errors.generic);
    }
}
