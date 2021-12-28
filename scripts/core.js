'use strict';

if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
      navigator.serviceWorker.register('/sw.js');
    });
}

import {
    errors,
    showSnackBar,
    verifyCode,
    sharePage,
    findGetParameter,
    round,
    geoPermission,
    sha256,
    sendAddRequest,
    sendFindRequest,
    makeMicronationListItem,
    sendListRequest,
    geoData,
    superfetch,
    isJSON,
    timeago,
    sendInfoRequest,
    sendUnlockRequest,
    sendEditRequest,
    sendRemoveRequest,
    sendSearchRequest,
    sendVerificationRequest,
    MAX_MICRONATIONS_PER_PAGE,
    protocol,
    domain
} from "/scripts/functions.js";

async function main() {
'use strict';

const link = window.location.pathname.replace(/\.[^/.]+$/, ""); // Remove extensions (.html, .jpg, ...) from the link so both "file" and "file.html" will work.
console.log(link);

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

if (link == "/find") {

    let location_notice = document.getElementById("location_notice");
    let location_button = document.getElementById("location_button");

    if(await geoPermission()) {
        let location = await geoData(true);
        await sendFindRequest(location);
    } else {
        location_notice.classList.remove("hidden");
        location_button.addEventListener("click", async e => {
            let location = await geoData(true);
            if(location) {
                await sendFindRequest(location);
                location_notice.classList.add("hidden");
            } else {
                showSnackBar(errors.location);
            }
        })
    }

} else if (link == "/index" || link == "/") {

    const switchpage = {
        back: {
            full: document.getElementById("switchpage_back_full"),
            one:  document.getElementById("switchpage_back_one"),
        },
        next: {
            one:  document.getElementById("switchpage_next_one"),
            full: document.getElementById("switchpage_next_full"),
        }
    }

    const count_span = document.getElementById("allmicronations_count");

    let url = `${protocol}${domain}/`;
    const total_micronations =  await superfetch(url, "GET", null);
    count_span.innerText = (total_micronations == undefined) ? count_span.innerText : total_micronations;
    let max_pages = Math.ceil(total_micronations/MAX_MICRONATIONS_PER_PAGE) - 1;

    let index_page = parseInt(0);

    const searchinput = document.getElementById("search_input");
    const searchresults =  document.getElementById("list__ul");

    searchinput.addEventListener("input", async function(e) {
        e.preventDefault();
        searchresults.innerHTML = null;
        
        if(searchinput.value.length > 1) {
            const results = await sendSearchRequest(searchinput.value);
            console.log(results);
    
            results.forEach(micronation => {
                const li = makeMicronationListItem(micronation.code, micronation.name, micronation.verified, "open_in_new" ,`/micronation.html?m=${micronation.code}`);
                searchresults.innerHTML += li;
            });

        } else {
            sendListRequest(index_page);
        }

    });

    function updateSwitchPageButtons() {    
        if(index_page == 0) {
            switchpage.back.full.setAttribute("disabled", "true");
        } else {
            switchpage.back.full.removeAttribute("disabled", "true");
        }
    
        if(index_page == 0) {
            switchpage.back.one.setAttribute("disabled", "true");
        } else {
            switchpage.back.one.removeAttribute("disabled", "true");
        }
    
        if(index_page == max_pages) {
            switchpage.next.one.setAttribute("disabled", "true");
        } else {
            switchpage.next.one.removeAttribute("disabled", "true");
        }
    
        if(index_page == max_pages) {
            switchpage.next.full.setAttribute("disabled", "true");
        } else {
            switchpage.next.full.removeAttribute("disabled", "true");
        }
        sendListRequest(index_page);
    }

    updateSwitchPageButtons();

    switchpage.back.full.addEventListener("click", e => {
        index_page = 0;
        sendListRequest(index_page);
        updateSwitchPageButtons();
    });

    switchpage.back.one.addEventListener("click", e => {
        index_page = (index_page-1 < 0) ? 0 : index_page - 1;;
        sendListRequest(index_page);
        updateSwitchPageButtons();
    });

    switchpage.next.one.addEventListener("click", e => {
        index_page = (index_page+1 > max_pages) ? max_pages : index_page+1;;
        sendListRequest(index_page);
        updateSwitchPageButtons();
    });

    switchpage.next.full.addEventListener("click", e => {
        index_page = max_pages;
        sendListRequest(index_page);
        updateSwitchPageButtons();
    });

} else if (link == "/add") {

const elements = {
    form: document.getElementById("add__form"),
    name: document.getElementById("add__mname"),
    description: document.getElementById("add__description"),
    code: document.getElementById("add__code"),
    email: document.getElementById("add__email"),
    flag: document.getElementById("add__mflag"),
    website: document.getElementById("add__mwebsite"),
    password: document.getElementById("add__password"),
    distance: document.getElementById("add__distance"),
    coordinates: document.getElementById("add__coordinates"),
    terms: document.getElementById("add__terms"),
    buy: document.getElementById("add__buy"),
    location: document.getElementById("add__location"),
}


elements.form.addEventListener("submit", (e) => {
    e.preventDefault();
})

const multiform = {
    form: document.getElementById("add__form"),
    back: document.getElementById("form_back"),
    next: document.getElementById("form_next"),
    steps: document.getElementsByClassName("form_step")
}

let location_notice = document.getElementById("location_notice");
let location_button = document.getElementById("location_button");
let location_privacywarning = document.getElementById("locationprivacywarning");

let step = 0;
let total_steps = multiform.form.dataset.steps;

async function updateForm() {
    document.querySelector(`.form_step.shown`).classList.remove("shown");
    document.querySelector(`.form_step[data-step='${step}']`).classList.add("shown");

    if(step == 0) {
        multiform.back.setAttribute("disabled", "true");
    } else {
        multiform.back.removeAttribute("disabled")
    }
    
    if(step == total_steps) {
        multiform.next.setAttribute("disabled", "true");
    } else {
        multiform.next.removeAttribute("disabled")
    }

    if(step == 2) {
        if(isJSON(elements.location.value) && JSON.parse(elements.location.value).hasOwnProperty("accuracy")) {
            multiform.next.removeAttribute("disabled")
        } else {
            multiform.next.setAttribute("disabled", "true");
        }

        location_button.addEventListener("click", async e => {
            let location = await geoData(true);
            if(location.hasOwnProperty("accuracy")) {
                multiform.next.removeAttribute("disabled");
                elements.location.value = JSON.stringify(location);
                location_button.setAttribute("disabled", "true");
                location_privacywarning.classList.remove("hidden");
            } else {
                showSnackBar(errors.location);
            }
        })
    }
}


multiform.next.addEventListener("click", e => {
    if(multiform.form.checkValidity()) {
        step++;
        updateForm();
    }
});

multiform.back.addEventListener("click", e => {
    step--;
    updateForm();
});

updateForm();

elements.buy.addEventListener("click", async (e) => {
    
    e.preventDefault();

    let data = {
        name: elements.name.value,
        code: elements.code.value,
        email: elements.email.value,
        flag: elements.flag.value,
        description: elements.description.value,
        website: elements.website.value,
        password: elements.password.value,
        privacy_distance: elements.distance.checked,
        privacy_coordinates: elements.coordinates.checked,
        terms: elements.terms.checked,
        coordinates: JSON.parse(elements.location.value)
    }

    if(verifyCode(data.code))  {

        if(data.coordinates.hasOwnProperty("accuracy")) {
            if(data.terms == true) {

                await sendAddRequest(data);

            } else {
                showSnackBar(errors.terms);
            }
        } else {
            showSnackBar("Enable location to continue")
        }


    } else {
        showSnackBar(`Country code ${data.code} is invalid`);
    }

});

} else if (link == "/permissions") {

    const r = findGetParameter("r");

      
    if('geolocation' in navigator) {

        const button = document.querySelector("#permissions__allowlocation");
        
        button.addEventListener("click", async (e) => {
            if(await geoData(false) != false) {
                window.location = (r == "") ? "/index" : r;
            }
        });

        //observeGeoPermission(r);

    } else {
        showSnackBar(errors.browser_support);
    }


} else if (link == "/micronation") {

    const code = findGetParameter("m");
    const share = document.querySelector("#mnpage__code");
    const flag = document.getElementById("mnpage__flag");
    flag.setAttribute("src", `${protocol}${domain}/image/${code}`);


    if(!(code == null || code == undefined)) {

        await sendInfoRequest(code);
        share.addEventListener("click", sharePage);

    
    } else {
        showSnackBar(errors.generic);
    }
} else if (link == "/edit") {


    const elements = {
        preform: document.querySelector("#edit__preform"),
        form: document.querySelector("#edit__form"),
        code: document.querySelector("#edit__code"),
        old_password: document.querySelector("#edit__old_password"),
        unlock: document.querySelector("#edit__unlock"),
        name: document.querySelector("#edit__name"),
        change_pass: document.querySelector("#edit__want_to_change_pass"),
        flag: document.querySelector("#edit__flag"),
        description: document.querySelector("#edit__description"),
        email: document.querySelector("#edit__email"),
        update_coordinates: document.querySelector("#edit__update_coordinates"),
        new_password_wrapper: document.querySelector("#edit__new_password_wrapper"),
        new_password: document.querySelector("#edit__new_password"),
        location: document.querySelector("#edit__location"),
        map: document.querySelector("#edit__map"),
        website_text: document.querySelector("#edit__website_text"),
        website: document.querySelector("#edit__website"),
        privacy_distance: document.querySelector("#edit__privacy_distance"),
        privacy_coordinates: document.querySelector("#edit__privacy_coordinates"),
        terms: document.querySelector("#edit__terms"),
        remove: document.querySelector("#edit__remove"),
        confirm_remove: document.querySelector("#edit__confirm_remove"),
        location_notice: document.getElementById("location_notice"),
        location_button: document.getElementById("location_button")
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

    elements.location_button.addEventListener("click", async e => {
        let location = await geoData(true);
        if(location.hasOwnProperty("accuracy")) {
            elements.location.value = JSON.stringify(location);
            elements.location_button.setAttribute("disabled", "true")
        } else {
            showSnackBar(errors.location);
        }
    })

    elements.update_coordinates.addEventListener("change", async e => {
        if(elements.update_coordinates.checked == true) {
            elements.location_notice.classList.remove("hidden");
            elements.location.setAttribute("required", true);
        } else {
            elements.location_notice.classList.add("hidden");
            elements.location.removeAttribute("required", true);
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


    let snackbarContainer = document.querySelector('#edit__confirm_remove');

    let handler = async function(event) {
        let password_hash = await sha256(elements.old_password.value);
        await sendRemoveRequest(code, password_hash);
    };

    elements.remove.addEventListener('click', async function() {
        'use strict';

        let data = {
          message: 'Are you sure?',
          timeout: 5000,
          actionHandler: handler,
          actionText: 'Remove'
        };

        snackbarContainer.MaterialSnackbar.showSnackbar(data);

    });

} else if (link == "/verification") {
    console.log(link);
    let elements = {
        form: document.getElementById("verification__form"),
        code: document.querySelector("#verification__code"),
        password: document.querySelector("#verification__password"),
    }

    elements.form.addEventListener("submit", async e => {
        e.preventDefault();

        let response = await sendVerificationRequest(elements.code.value, await sha256(elements.password.value));
        showSnackBar(response.message);
        if(response.success) {
            setTimeout(() => {
                window.location = "/verification";
            }, 1000)
        }
    });

    const verification_requests_element = document.querySelector("#verification_requests")
    const url = `${protocol}${domain}/verification_requests`;
    let data = await superfetch(url, "GET", {"limit": 20});

    if(data.length > 0) {
        verification_requests_element.innerHTML = "";
        
        data.forEach(entry => {
            const newelem = `
            <a href="/micronation.html?m=${entry.code}" class="mdl-list__item mdl-list__item--three-line">
                <span class="mdl-list__item-primary-content">
                    <span class="mdl-list__item-primary-content">
                        <span>${entry.code}</span>
                        <span class="mdl-list__item-text-body">
                            ${new Date(entry.time).toGMTString()}
                        </span>
                    </span>
                </span>
                <span class="mdl-list__item-secondary-content">
                    <i class="material-icons">access_time</i>
                </span>
            </a>`

          verification_requests_element.innerHTML += newelem;
        });
    }


} else if (link == "/log") {

    const logelem = document.querySelector("#log");
    
    let url = `${protocol}${domain}/log`;

    let data = await superfetch(url, "GET");

    data.forEach(entry => {
        let icon;
        switch(entry.type) {
            case "added":
                icon = "add_location_alt";
            case "removed":
                icon = "delete_forever";
            case "edited":
                icon = "edit";
            case "verified":
                icon = "flaky";
            case "requestedverification":
                icon = "task";
            case "backedup":
                icon = "cloud_done";
            default:
                icon = "info"
        }

        const newelem = `
        <li class="mdl-list__item">
            <span class="mdl-list__item-primary-content">
                <i class="material-icons mdl-list__item-icon">${icon}</i>
                ${entry.text}
            </span>
        </li>`
        logelem.innerHTML += newelem;
    })

} else {
    console.log(link);
}

}

main();
