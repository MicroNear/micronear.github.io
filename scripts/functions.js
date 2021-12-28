'use strict';

export const errors = {
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

export function showSnackBar(message) {
    if(snackbar.MaterialSnackbar != undefined) {
        snackbar.MaterialSnackbar.showSnackbar({message: message});
    } else {
        window.setTimeout(showSnackBar, 400, message);
    }
}

export function verifyCode (code) {
    if(code.length > 1 && code.length < 5) {
        return true;
    } else {
        return false;
    }
}

export async function sharePage() {
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

export function findGetParameter(parameterName) {
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

export function round(value, precision) {
    var multiplier = Math.pow(10, precision || 0);
    return Math.round(value * multiplier) / multiplier;
}

export async function geoPermission() {

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

export function addhttps(url) {
    if (!/^(?:f|ht)tps?\:\/\//.test(url)) {
        url = "https://" + url;
    }
    return url;
}

export async function sha256(message) {
    const msgBuffer = new TextEncoder('utf-8').encode(message);
    const hashBuffer = await window.crypto.subtle.digest('SHA-256', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => ('00' + b.toString(16)).slice(-2)).join('');
    return hashHex;
}

export async function sendAddRequest (micronation) {

    if(micronation.coordinates.hasOwnProperty("accuracy")) {

        if(micronation.coordinates.accuracy < ACCURACY_TO_ADD || TESTING) {

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

export async function sendFindRequest (geolocation) {

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

export function makeMicronationListItem(code, name, verified, icon, link) {
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

export async function sendListRequest(page) {
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

export async function geoData (enableHighAccuracy) {

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

export async function superfetch(url, method, body) {
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

export function isJSON(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

  
export function timeago(ms) {
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
      , year: "a year ago"
      , years: "%Y years ago"
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

    if (ago < (2 * YEAR)) { return locale.year; }
    if (ago < NEVER) { // 45 years, approximately the epoch
      while (ago >= YEAR) { ago -= YEAR; part += 1; }
      return locale.years.replace(/%\w?/, part);
    }
  
    if (ago < NEVER) {
      return locale.years;
    }
  
    return locale.never;
}
    
export async function sendInfoRequest(code) {

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
        elements.time_added.innerText = timeago(time - micronation.time_added);
        elements.last_edit.innerText = timeago(time - micronation.last_edit);

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

export async function sendUnlockRequest(code, password, elements) {

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
            elements.privacy_distance.setAttribute("disabled", "true")
            elements.privacy_coordinates.setAttribute("disabled", "true")
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

export async function sendEditRequest(code, old_password, elements) {

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

        if(!(elements.update_coordinates.checked) || (request.coordinates.accuracy < ACCURACY_TO_ADD) || TESTING) {

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

export async function sendRemoveRequest(code, password) {
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

export async function sendSearchRequest(term) {
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

export async function sendVerificationRequest(code, password) {
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