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

const uppercase = document.querySelectorAll(".uppercase");
uppercase.forEach(element => {
    element.addEventListener("input", e => {
        let p= e.target.selectionStart;
        e.target.value = e.target.value.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        e.target.value = e.target.value.toUpperCase();
        e.target.setSelectionRange(p, p);
    });
})

import {
    sha256,
    showSnackBar,
    verifyCode,
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
    sendUnlockRequest,
    sendEditRequest,
    sharePage,
    sendRemoveRequest
} from '/scripts/functions.js';

console.log(link);

if(link == "/find.html" || link == "/add.html" || link == "/edit.html") {
    try {
    let geopermission = await geoPermission();
    if(!geopermission) {
        console.log("Not cool");
        const r = encodeURIComponent(window.location);
        window.location = `permissions.html?r=${r}`; 
    }
    } catch (err) {
        console.log(err)
    }
}


let time = Date.now();

// 1. Aug, 16:10 - 18:10
const mstart = 1627827019805;
const mend = 1627834219805;


if(time > mstart && time < mend) {
    showSnackBar(`Maintenance break, ${~~((mend-time)/1000/60)} minutes left`);

} else if (link == "/find.html") {

    await sendFindRequest();

} else if (link == "/index.html" || link == "/") {

    await sendListRequest();

} else if (link == "/add.html") {

    const elements = {
        form: document.getElementById("add__form"),
        name: document.getElementById("add__mname"),
        description: document.getElementById("add__description"),
        code: document.getElementById("add__code"),
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
    elements.code.addEventListener("input", e => {
        let p= e.target.selectionStart;
        e.target.value = e.target.value.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        e.target.value = e.target.value.toUpperCase();
        e.target.setSelectionRange(p, p);
    });


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
            code: elements.code.value,
            email: elements.email.value,
            splash: elements.splash.value,
            description: elements.description.value,
            website: elements.website.value,
            password: elements.password.value,
            privacy_distance: elements.distance.checked,
            privacy_coordinates: elements.coordinates.checked,
            terms: elements.terms.checked,
        }

        if(verifyCode(data.code))  {

            if(data.terms == true) {

                sendAddRequest(data);

            } else {
                showSnackBar(errors.terms);
            }

        } else {
            showSnackBar("Code in wrong format");
        }



    });
} else if (link == "/permissions.html") {

    const r = findGetParameter("r");

      
    if('geolocation' in navigator) {

        const button = document.querySelector("#permissions__allowlocation");
        
        button.addEventListener("click", async (e) => {
            if(await geoData(false) != false) {
                window.location = (r == "") ? "/index.html" : r;
            }
        });

        observeGeoPermission(r);

    } else {
        alert("Your browser is not supported.")
    }


} else if (link == "/micronation.html") {

    const code = findGetParameter("m");
    const share = document.querySelector("#mnpage__code");


    if(!(code == null || code == undefined)) {

        await sendInfoRequest(code);
        share.addEventListener("click", sharePage);

    
    } else {
        showSnackBar(errors.generic);
    }
} else if (link == "/edit.html") {


    const elements = {
        preform: document.querySelector("#edit__preform"),
        form: document.querySelector("#edit__form"),
        code: document.querySelector("#edit__code"),
        old_password: document.querySelector("#edit__old_password"),
        unlock: document.querySelector("#edit__unlock"),
        name: document.querySelector("#edit__name"),
        change_pass: document.querySelector("#edit__want_to_change_pass"),
        splash: document.querySelector("#edit__splash"),
        description: document.querySelector("#edit__description"),
        email: document.querySelector("#edit__email"),
        update_coordinates: document.querySelector("#edit__update_coordinates"),
        new_password_wrapper: document.querySelector("#edit__new_password_wrapper"),
        new_password: document.querySelector("#edit__new_password"),
        map: document.querySelector("#edit__map"),
        website_text: document.querySelector("#edit__website_text"),
        website: document.querySelector("#edit__website"),
        privacy_distance: document.querySelector("#edit__privacy_distance"),
        privacy_coordinates: document.querySelector("#edit__privacy_coordinates"),
        terms: document.querySelector("#edit__terms"),
        remove: document.querySelector("#edit__remove"),
        confirm_remove: document.querySelector("#edit__confirm_remove"),
    }

    elements.change_pass.addEventListener("change", async e => {
        if(elements.change_pass.checked == true) {
            elements.new_password_wrapper.classList.remove("hidden");
            elements.new_password.setAttribute("required", true);
        } else {
            elements.new_password_wrapper.classList.add("hidden");
            elements.new_password.removeAttribute("required", true);
        }
    });

    const code = findGetParameter("m");

    if(!(code == null || code == undefined)) {

        elements.code.value = code;

        elements.preform.addEventListener("submit", async e => {
            e.preventDefault();
            await sendUnlockRequest(code, elements.old_password.value, elements);
        })
    
    } else {
        showSnackBar(errors.generic);
        console.error(errors.generic);
    }

    elements.form.addEventListener("submit", async e => {
        e.preventDefault();
        let password_hash = await sha256(elements.old_password.value);

        await sendEditRequest(code, password_hash, elements);

    });


    var snackbarContainer = document.querySelector('#edit__confirm_remove');

    var handler = async function(event) {
        let password_hash = await sha256(elements.old_password.value);
        await sendRemoveRequest(code, password_hash);
    };

    elements.remove.addEventListener('click', function() {
        'use strict';
  
        var data = {
          message: 'Are you sure?',
          timeout: 5000,
          actionHandler: handler,
          actionText: 'Remove'
        };
        snackbarContainer.MaterialSnackbar.showSnackbar(data);
    });


} else if (link == "/info.html") {
    
} else if (link == "/verification.html") {
    let elements = {
        code: document.querySelector("#verification__code"),
        website: document.querySelector("#verification__website"),
        password: document.querySelector("#verification__password"),
        button: document.querySelector("#verification__request")
    }
} else if (link == "/articles.html") {

    const o = document.getElementById("o");
    addO(o);

    function addO (o) {
        setTimeout(function() {
            o.innerText += "o";
        }, 1*1000);
        addO();
    }

} else {
    console.log(link);
}
