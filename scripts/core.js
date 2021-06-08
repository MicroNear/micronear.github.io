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
    console.log("Browser not supported.");
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
    errors,
    sendEditDataRequest,
    sendEditRequest
} from '/scripts/functions.js';

console.log(link);

if(link == "/find.html" || link == "/add.html" || link == "/edit.html") {
    let geopermission = await geoPermission();
    if(!geopermission) {
        console.log("Not cool");
        window.location = "/permissions.html"; 
    }
}

if((link == "/find.html") || (link == "/")) {

    await sendFindRequest();

} else if (link == "/index.html") {

    await sendListRequest();

} else if (link == "/add.html") {

    const elements = {
        form: document.getElementById("add__form"),
        name: document.getElementById("add__mname"),
        description: document.getElementById("add__description"),
        imnc: null,
        email: document.getElementById("add__email"),
        splash: document.getElementById("add__msplash"),
        website: document.getElementById("add__mwebsite"),
        password: document.getElementById("add__password"),
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
            password: elements.password.value,
            privacy_distance: elements.distance.checked,
            privacy_coordinates: elements.coordinates.checked,
            terms: elements.terms.checked,
        }

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
} else if (link == "/edit.html") {

    /*
    const elements = {
        edit__preform: document.querySelector("#edit__preform"),
        edit__imnc: document.querySelector("#edit__imnc"),
        edit__password: document.querySelector("#edit__password"),
        edit__form: document.querySelector("#edit__form"),
        edit__new_password_wrapper: document.querySelector("#edit__new_password_wrapper"),
        edit__new_password: document.querySelector("#edit__new_password"),
        edit__want_to_change_pass: document.querySelector("#edit__want_to_change_pass")
    }
    */

    const elements = {
        preform: document.querySelector("#edit__preform"),
        form: document.querySelector("#edit__form"),
        imnc: document.querySelector("#edit__imnc"),
        password: document.querySelector("#edit__password"),
        name: document.querySelector("#edit__name"),
        splash: document.querySelector("#edit__splash"),
        description: document.querySelector("#edit__description"),
        email: document.querySelector("#edit__email"),
        want_to_change_pass: document.querySelector("#edit__want_to_change_pass"),
        new_password_wrapper: document.querySelector("#edit__new_password_wrapper"),
        new_password: document.querySelector("#edit__new_password"),
        map: document.querySelector("#edit__map"),
        website_text: document.querySelector("#edit__website_text"),
        website: document.querySelector("#edit__website"),
        privacy_distance: document.querySelector("#edit__privacy_distance"),
        privacy_coordinates: document.querySelector("#edit__privacy_coordinates"),
    }

    elements.want_to_change_pass.addEventListener("change", async e => {
        if(elements.want_to_change_pass.checked == true) {
            elements.new_password_wrapper.classList.remove("hidden");
            elements.new_password.setAttribute("required", true);
        } else {
            elements.new_password_wrapper.classList.add("hidden");
            elements.new_password.removeAttribute("required", true);
        }
    });

    const imnc = findGetParameter("m");

    if(!(imnc == null || imnc == undefined)) {

        elements.imnc.value = imnc;

        elements.preform.addEventListener("submit", async e => {
            e.preventDefault();
            await sendEditDataRequest(imnc, elements.password.value, elements);
        })
    
    } else {
        showSnackBar(errors.generic);
    }

    elements.form.addEventListener("submit", async e => {
        e.preventDefault();

        await sendEditRequest(imnc, elements.password.value, elements);

    });
} else if (link == "/info.html") {
    
} else {
    console.log(link);
}
