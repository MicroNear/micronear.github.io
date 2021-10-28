'use strict';

const TESTING = false;
const API_VERSION = 2;
const API_TARGET = "micronear";
const MAX_MICRONATIONS_PER_PAGE = 10;

if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
      navigator.serviceWorker.register('/sw.js');
    });
}

const snackbar = document.getElementById("snackbar");

let protocol = "https://"
let domain = "api.bloomflare.dev";

if(TESTING) {
    protocol = "http://"
    domain = "localhost:3001";
}

const errors = {
    generic: "An error occured",
    location: "Location permission is denied, you may change it in the app settings",
    fetch: "Couldn't connect, turn on WiFi or Data",
    add_internal_fault: "An internal error occured",
    terms: "Agree to the Privacy Policy in order to proceed",
    micronation_not_found: "Couldn't fetch data about this micronation",
    geo_inaccurate: "Your device couldn't provide accurate geolocation",
    browser_support: "This browser is not suppoorted, open Micronear in Chrome",
    geo_denied: "Location access denied",
    location_needed: "Location access needed"
}

function showSnackBar(message) {
    if(snackbar.MaterialSnackbar != undefined) {
        snackbar.MaterialSnackbar.showSnackbar({message: message});
    } else {
        window.setTimeout(showSnackBar, 400, message);
    }
}

function verifyCode (code) {
    if(code.length > 1 && code.length < 5) {
        return true;
    } else {
        return false;
    }
}

async function sharePage() {
    const title = document.title;
    const url = document.location.href;
    const text = "";

    if(navigator.share) {
        try {
            await navigator
            .share({
              title,
              url,
              text
            })
    
                showSnackBar("Thanks for sharing");
          } catch (err) {
                // Cancelled or error
          }
    } else {
        showSnackBar("Sharing isn't supported by your device");
    }

  }

function findGetParameter(parameterName) {
    var result = undefined,
        tmp = [];
    location.search
        .substr(1)
        .split("&")
        .forEach(function (item) {
          tmp = item.split("=");
          if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
        });
    return result;
}

function round(value, precision) {
    var multiplier = Math.pow(10, precision || 0);
    return Math.round(value * multiplier) / multiplier;
}

async function geoPermission() {

    if(navigator.permissions) {
        return new Promise(function(resolve, reject) {

            navigator.permissions.query({name: 'geolocation'})
            .then(function(PermissionStatus) {
                if (PermissionStatus.state == 'granted') {
                    resolve(true);
                }else {
                    resolve(false);
                }
            })
        });
    } else {
        return false;
    }

}

function addhttps(url) {
    if (!/^(?:f|ht)tps?\:\/\//.test(url)) {
        url = "https://" + url;
    }
    return url;
}

/*
function observeGeoPermission(r) {
    if("permissions" in navigator) {
        navigator.permissions.query({name:'geolocation'}).then(function(result) {
            if(result.state == "granted") {
                console.log(result.state)
                //window.location = (r == "") ? "/index.html" : r;
            }
              result.onchange = function() {
                console.log(result.state)

                if(result.state == "granted") {
                    
                    //window.location = (r == "") ? "/index.html" : r;
                }
              }
        });
}
*/

async function sha256(message) {
    // encode as UTF-8
    const msgBuffer = new TextEncoder('utf-8').encode(message);
  
    // hash the message
    const hashBuffer = await window.crypto.subtle.digest('SHA-256', msgBuffer);
  
    // convert ArrayBuffer to Array
    const hashArray = Array.from(new Uint8Array(hashBuffer));
  
    // convert bytes to hex string
    const hashHex = hashArray.map(b => ('00' + b.toString(16)).slice(-2)).join('');
    // console.log(hashHex);
    return hashHex;
}

async function sendAddRequest (micronation) {

    if(micronation.coordinates.hasOwnProperty("accuracy")) {

        if(micronation.coordinates.accuracy < 250 || TESTING) {

            micronation.password = await sha256(micronation.password)

            let url = `${protocol}${domain}/add`;

            console.log(micronation);
            
            let data = await superfetch(url, "POST", micronation);
            console.log(data);

            if(data.success == true) {

                window.location = `/micronation.html?m=${data.code}`;

            } else {
                if(data.message != "") {
                    showSnackBar(data.message);
                } else {
                    showSnackBar(errors.add_internal_fault);
                }
            }

        } else {
            showSnackBar(`Your device provided inaccurate location (${micronation.coordinates.accuracy}m), try again later`);
        }
        

    } else {
        showSnackBar("Enable location to continue");
    }

}

async function sendFindRequest (geolocation) {

    let foundresults = document.querySelector("#found__results");


    foundresults.innerHTML = `<div id="p2" class="mdl-progress mdl-js-progress mdl-progress__indeterminate"></div>`;
    
    let url = `${protocol}${domain}/find`;

    let data = await superfetch(url, "POST", geolocation);

    let wrapper = document.createElement("div");
    if(data.length == 0) {
        wrapper.innerHTML += `<p>We couldn't find any micronations within 800km, would you like to <a href="/add.html">add your micronation</a>?</p>`;
    }
    data.forEach(micronation => {
        let card = `
<div class="card mdl-card mdl-shadow--2dp" style="background-image: linear-gradient(to bottom, rgb(255 255 255 / 85%), rgb(18 50 66 / 25%)), url('${protocol}${domain}/image/${micronation.code}')">

<div class="mdl-card__title">
<h2 class="mdl-card__title-text">${micronation.name}</h2>
</div>
<div class="mdl-card__supporting-text">
${(micronation.description != undefined) ? micronation.description : "No description provided"}
</div>

<div class="mdl-card__actions mdl-card--border">
    <a href="micronation.html?m=${micronation.code}" class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">
        More
    </a>
    <span>${round(micronation.proximity, 1)}km</span>
</div>

<div class="mdl-card__menu">
<button class="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect">
    <i class="material-icons">${(micronation.verified) ? "verified" : null}</i>
</button>
</div>
</div>
        
        `;
        wrapper.innerHTML += card;
    });
    foundresults.innerHTML = null;
    found__results.appendChild(wrapper);
    
}

function makeMicronationListItem(code, name, verified, icon, link) {
    let oldlistitem = `
    <li class="mdl-list__item mdl-list__item--three-line">
        <span class="mdl-list__item-primary-content">
            <span>${code}</span>
            <span class="mdl-list__item-text-body">
                ${name}
            </span>
        </span>
        <span class="mdl-list__item-secondary-content">
            <i class="material-icons">${(verified) ? "verified" : null}</i>
        </span>
        <span class="mdl-list__item-secondary-content">
            <a href="${link}">
                <i class="material-icons">${icon}</i>
            </a>
        </span>
    </li>
    `;

    let listitem = `
    <a href="${link}" class="mdl-list__item mdl-list__item--three-line">
        <span class="mdl-list__item-primary-content">
            <span>${code}</span>
            <span class="mdl-list__item-text-body">
                ${name}
            </span>
        </span>
        <span class="mdl-list__item-secondary-content">
            ${(verified) ? '<i class="material-icons">verified</i>' : ""}
        </span>
        <span class="mdl-list__item-secondary-content">
            <i class="material-icons">${icon}</i>
        </span>
    </a>
    `;

    return listitem;
}

async function sendListRequest(page) {
    let url = `${protocol}${domain}/micronations/${page}`;
    const shown_span = document.getElementById("shownmicronations_count");


    let wrapper = document.getElementById("list__ul");
    wrapper.innerHTML = `<div id="p2" class="mdl-progress mdl-js-progress mdl-progress__indeterminate"></div>`;


    let data = await superfetch(url, "GET", null);

    wrapper.innerHTML = null;

    if(typeof data != typeof []) {
        showSnackBar((data == null) ? "Failed to fetch data" : data);
    } else {
        shown_span.innerText = data.length;

        if(data.length == 0) {
            wrapper.innerHTML += "<p>The server couldn't provide any micronations</p>"
        }

        data.forEach(micronation => {

            let listitem = makeMicronationListItem(micronation.code, micronation.name, micronation.verified, "open_in_new" ,`/micronation.html?m=${micronation.code}`)
    
        wrapper.innerHTML += listitem;
        });

    }

}

async function geoData (enableHighAccuracy) {

    const options = {
        enableHighAccuracy: enableHighAccuracy
    }

    return new Promise(function(resolve, reject) {
        navigator.geolocation.getCurrentPosition((location) => {

            let latitude = location.coords.latitude;
            let longitude = location.coords.longitude;
            let accuracy = location.coords.accuracy;

            let data = {
                "latitude": latitude,
                "longitude": longitude,
                "accuracy": accuracy
            }
            resolve(data);
        }, (error) => {
            resolve(false);
            showSnackBar(errors.geo_denied);
            console.log(error);
        }, options);
    });
    
}

async function superfetch(url, method, body) {
    body = (body == undefined) ? {} : body;

    body.api = {
        version: API_VERSION,
        target: API_TARGET
    }
    body = JSON.stringify(body);

    const options = {
        method: method,
        type: "cors",
    }

    if(method != "GET") {
        options.body = body;
    }

    let data = fetch(url, options)
    .then((response) => {
        return response.json();
    }).then(data => {return data})
    .catch(error => showSnackBar("ERROR: " + error))

    return data;
}

function isJSON(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

  
function timeago(ms) {
    let ago = Math.floor(ms / 1000);
    let part = 0;


    const locale = {
        moment: "a moment ago"
      , moments: "moments ago"
      , seconds: "%s seconds ago"
      , minute: "a minute ago"
      , minutes: "%m minutes ago"
      , hour: "an hour ago"
      , hours: "%h hours ago"
      , day: "a day ago"
      , days: "%D days ago"
      , week: "a week ago"
      , weeks: "%w weeks ago"
      , month: "a month ago"
      , months: "%M months ago"
      , years: "more than a year ago"
      , never: "never"
    };

    const MOMENT = 0;
    const MOMENTS = 2;
    const SECONDS = 5;
    const MINUTE = 60;
    const HOUR = 60 * MINUTE;
    const DAY = 24 * HOUR;
    const WEEK = 7 * DAY;
    const MONTH = 30 * DAY;
    const YEAR = 365 * DAY;
    // workaround for when `ms = Date.now() - 0`
    const NEVER = 45 * YEAR;
  
    if (ago < MOMENTS) { return locale.moment; }
    if (ago < SECONDS) { return locale.moments; }
    if (ago < MINUTE) { return locale.seconds.replace(/%\w?/, ago); }
  
    if (ago < (2 * MINUTE)) { return locale.minute; }
    if (ago < HOUR) {
      while (ago >= MINUTE) { ago -= MINUTE; part += 1; }
      return locale.minutes.replace(/%\w?/, part);
    }
  
    if (ago < (2 * HOUR)) { return locale.hour; }
    if (ago < DAY) {
      while (ago >= HOUR) { ago -= HOUR; part += 1; }
      return locale.hours.replace(/%\w?/, part);
    }
  
    if (ago < (2 * DAY)) { return locale.day; }
    if (ago < WEEK) {
      while (ago >= DAY) { ago -= DAY; part += 1; }
      return locale.days.replace(/%\w?/, part);
    }
  
    if (ago < (2 * WEEK)) { return locale.week; }
    if (ago < MONTH) {
      while (ago >= WEEK) { ago -= WEEK; part += 1; }
      return locale.weeks.replace(/%\w?/, part);
    }
  
    if (ago < (2 * MONTH)) { return locale.month; }
    if (ago < YEAR) { // 45 years, approximately the epoch
      while (ago >= MONTH) { ago -= MONTH; part += 1; }
      return locale.months.replace(/%\w?/, part);
    }
  
    if (ago < NEVER) {
      return locale.years;
    }
  
    return locale.never;
}

  
    
async function sendInfoRequest(code) {

    let url = `${protocol}${domain}/micronation/${code}`;
    
    let micronation =  await superfetch(url, "GET", null);

        console.log(micronation);
    
        const elements = {
            name: document.querySelector("#mnpage__name"),
            verified: document.querySelector("#mnpage__verified"),
            code_text: document.querySelector("#mnpage__code_text"),
            description: document.querySelector("#mnpage__description"),
            email: document.querySelector("#mnpage__email"),
            map: document.querySelector("#mnpage__map"),
            website_text: document.querySelector("#mnpage__website_text"),
            website: document.querySelector("#mnpage__website"),
            edit: document.querySelector("#mnpage__edit"),
            time_added: document.querySelector("#mnpage__time_added"),
            last_edit: document.querySelector("#mnpage__last_edit"),
        }
    
        elements.name.innerText = micronation.name;
        elements.edit.setAttribute("href", `edit.html?m=${micronation.code}`);
        elements.code_text.innerText = micronation.code;
        let time = Date.now();
        elements.time_added.innerText = timeAgo(time);
        elements.last_edit.innerText = timeAgo(time);

        if(micronation.verified == true) {
            elements.verified.classList.remove("hidden");
        }

        if(micronation.hasOwnProperty("website")) {
            //const fixedURL = addhttps(micronation.web);
            elements.website.setAttribute("href", micronation.website);

            let domain = (new URL(micronation.website));
            domain = domain.hostname.replace('www.','');

            elements.website_text.innerText = domain;
            elements.website.classList.remove("hidden");
        }

        if(micronation.hasOwnProperty("description")) {
            elements.description.innerText = micronation.description;
        }

        if(micronation.hasOwnProperty("email")) {
            elements.email.setAttribute("href", `mailto:${micronation.email}`);
            elements.email.classList.remove("hidden");
        }

        if(micronation.privacy_coordinates == true) {
            elements.map.setAttribute("href", `https://maps.google.com/?q=${micronation.coordinates.latitude},${micronation.coordinates.longitude}`);
            elements.map.classList.remove("hidden");
        }
    
    

}


async function sendUnlockRequest(code, password, elements) {

    let url = `${protocol}${domain}/unlock`;
    
    let request = {
        code: code
    }

    request.password = await sha256(password);

    console.log(request)

    let data = await superfetch(url, "POST", request);

    console.log(data)

    if(data.success) {
        if(data.is_admin) {
            elements.code.removeAttribute("disabled", "true");
        }

        elements.old_password.setAttribute("disabled", true);
        elements.unlock.setAttribute("disabled", true);

        elements.name.value = (data.name != undefined) ? data.name : null;
        elements.description.value = (data.description != undefined) ? data.description : null;
        elements.email.value = (data.email != undefined) ? data.email : null;
        elements.flag.value = (data.flag != undefined) ? data.flag : null;
        elements.website.value = (data.website != undefined) ? data.website : null;


        if(data.privacy_distance) {
            elements.privacy_distance.parentElement.MaterialSwitch.on();
        } else {
            elements.privacy_distance.parentElement.MaterialSwitch.off();
        }

        if(data.privacy_coordinates) {
            elements.privacy_coordinates.parentElement.MaterialSwitch.on();
        } else {
            elements.privacy_coordinates.parentElement.MaterialSwitch.off();
        }

        elements.form.classList.remove("hidden");


    } else {
        showSnackBar(data.message);
    }


}

async function sendEditRequest(code, old_password, elements) {

    let request = {
        new_code: elements.code.value,
        old_password: old_password,
        name: elements.name.value,
        description: elements.description.value,
        email: elements.email.value,
        flag: elements.flag.value,
        website: elements.website.value,
        update_coordinates: elements.update_coordinates.checked,
        privacy_distance: elements.privacy_distance.checked,
        privacy_coordinates: elements.privacy_coordinates.checked,
        change_pass: elements.change_pass.checked,
        new_password: undefined,
        coordinates: undefined
    }

    if(isJSON(elements.location.value)) {
        request.coordinates = JSON.parse(elements.location.value)
    }

    if(elements.change_pass.checked == true) {
        request.new_password = await sha256(elements.new_password.value);
    }

    console.log(request.coordinates)
    console.log(isJSON(request.coordinates));

    if(
        (
            request.update_coordinates == true
            &&
            typeof request.coordinates == 'object'
            &&
            request.coordinates.hasOwnProperty("accuracy")
        )
        ||
        request.update_coordinates == false
    ) {

        if(!(elements.update_coordinates.checked) || (request.coordinates.accuracy < 250) || TESTING) {

            let url = `${protocol}${domain}/edit/${code}`;

            let data = await superfetch(url, "POST", request);
        
            console.log(data);
        
            if(data.success) {
        
                console.log("SUCCESS");
                window.location = `/micronation.html?m=${request.new_code}`;

                
            } else {
                showSnackBar(data.message);
            }
    
            
        } else {
            showSnackBar(`Your device provided inaccurate location (${request.coordinates.accuracy}m), try again later`);
        }
    } else {
        showSnackBar(errors.location_needed);
    }

}

async function sendRemoveRequest(code, password) {
    console.log(code, password);

    let url = `${protocol}${domain}/remove/${code}`;

    let request = {
        password: password
    }

    let data = await superfetch(url, "POST", request);

    console.log(data);

    if(data.success) {

        console.log("REMOVED");
        window.location = `/`;

            
    } else {
            showSnackBar(data.message);
    }
    
}

async function sendSearchRequest(term) {
    const url = `${protocol}${domain}/search`;

    const options = {
        method: "POST",
        type: "cors",
        body: JSON.stringify({
            term: term,
        })
    }

    const data = fetch(url, options)
    .then((response) => {
        return response.json();
    }).then(data => {
        return data
    })
    .catch(error => {
        showSnackBar(error)   
    })
    return data;
}

async function sendVerificationRequest(code, password) {
    const url = `${protocol}${domain}/verify`;

    const options = {
        method: "POST",
        type: "cors",
        body: JSON.stringify({
            code: code,
            password: password
        })
    }

    const data = fetch(url, options)
    .then((response) => {
        return response.json();
    }).then(data => {
        return data
    })
    .catch(error => {
        showSnackBar(error)   
    })
    return data;
}



async function main() {
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


console.log(link);

/*
if(link == "/find.html" || link == "/add.html" || link == "/edit.html") {
    try {


    if(await geoPermission() != true) {
        console.log("Not cool");
        const r = encodeURIComponent(window.location);
        window.location = `permissions.html?r=${r}`; 
    }

    } catch (err) {
        console.log(err);
    }


}
*/

/*

let time = Date.now();

// 1. Aug, 16:10 - 19?
const mstart =  1627827019805;
const mend =    1627840219805;


if(time > mstart && time < mend) {
    showSnackBar(`Maintenance break, ${~~((mend-time)/1000/60)} minutes left`);

*/


if (link == "/find.html") {

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

} else if (link == "/index.html" || link == "/") {

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

} else if (link == "/add.html") {

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

} else if (link == "/permissions.html") {

    const r = findGetParameter("r");

      
    if('geolocation' in navigator) {

        const button = document.querySelector("#permissions__allowlocation");
        
        button.addEventListener("click", async (e) => {
            if(await geoData(false) != false) {
                window.location = (r == "") ? "/index.html" : r;
            }
        });

        //observeGeoPermission(r);

    } else {
        showSnackBar(errors.browser_support);
    }


} else if (link == "/micronation.html") {

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
} else if (link == "/edit.html") {


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

} else if (link == "/verification.html") {
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
        console.log(response);
    })


} else if (link == "/articles.html") {

    /*const o = document.getElementById("o");

    setInterval(function() {
        o.innerText += "o";
    }, 1*1000);
    */

} else {
    console.log(link);
}

}

main();
