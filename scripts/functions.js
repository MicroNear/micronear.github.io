'use strict';

export const testing = false;
const snackbar = document.getElementById("snackbar");

let protocol = "https://"
let domain = "api.micronear.berrykingdom.xyz";

if(testing) {
    protocol = "http://"
    domain = "127.0.0.1:3001";
}


export const errors = {
    generic: "An error occured",
    location: "Location permission is denied, you may change it in the app settings",
    fetch: "Couldn't connect, turn on WiFi or Data",
    add_internal_fault: "An internal error occured",
    terms: "Agree to the Privacy Policy in order to proceed",
    micronation_not_found: "Couldn't fetch data about this micronation",
    geo_inaccurate: "Your device couldn't provide accurate geolocation",
    browser_support: "This browser is not suppoorted, open Micronear in Chrome"
}

export function showSnackBar(message) {
    if(snackbar.MaterialSnackbar != undefined) {
        snackbar.MaterialSnackbar.showSnackbar({message: message});
    } else {
        window.setTimeout(showSnackBar, 100, message);
    }
}

export function verifyCode (code) {
    if(code.length > 1) {
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
    var result = null,
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

export function geoPermission() {

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
        showSnackBar(errors.browser_support);
        return false;
    }


}

export function addhttps(url) {
    if (!/^(?:f|ht)tps?\:\/\//.test(url)) {
        url = "https://" + url;
    }
    return url;
}

export function observeGeoPermission() {
    if("permissions" in navigator) {
        navigator.permissions.query({name:'geolocation'}).then(function(result) {
            if(result.state == "granted") {
                window.location = "/index.html";
            }
              result.onchange = function() {
                if(result.state == "granted") {
                    window.location = "/index.html";
                }
              }
        });
    } else {
        showSnackBar("Your browser might be incompatible, use Chrome")
    }
}

export async function sha256(message) {
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

export async function sendAddRequest (micronation) {

    let geolocation = await geoData(true);

    if(await geoPermission() == true) {

        if(geolocation.accuracy < 250) {


            micronation.coordinates = geolocation;

            micronation.password = await sha256(micronation.password)

            let url = `${protocol}${domain}/add`;

            console.log(micronation);
            
            await superfetch(url, "POST", micronation, (data) => {
                console.log(data);

                if(data.success == true) {

                    window.location = `/micronation.html?m=${data.code}`;

                } else {
                    if(data.reason != "") {
                        showSnackBar(data.reason);
                    } else {
                        showSnackBar(errors.add_internal_fault);

                    }
                }

                }, (error) => {
                    showSnackBar(errors.fetch)
                    console.log(error);
                }
            );

        } else {
            showSnackBar(errors.geo_inaccurate);
        }
        

    } else {
        showSnackBar(errors.location);
    }

}

export async function sendFindRequest () {

    let foundresults = document.querySelector("#found__results");

    if(await geoPermission() == true) {
        
        let geolocation = await geoData();

        foundresults.innerHTML = `<div id="p2" class="mdl-progress mdl-js-progress mdl-progress__indeterminate"></div>`;

        let url = `${protocol}${domain}/find`;

    await superfetch(url, "POST", geolocation, (data) => {

        let wrapper = document.createElement("div");
        if(data.length == 0) {
            wrapper.innerHTML += `<p>We couldn't find any micronations within 800km, would you like to <a href="/add.html">add your micronation</a>?</p>`;
        }
        data.forEach(micronation => {
            let card = `
<div class="card mdl-card mdl-shadow--2dp" style="background-image: linear-gradient(to bottom, rgb(255 255 255 / 85%), rgb(18 50 66 / 25%)), url('${micronation.splash}')">

  <div class="mdl-card__title">
    <h2 class="mdl-card__title-text">${micronation.name}</h2>
  </div>
  <div class="mdl-card__supporting-text">
    ${micronation.description}
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



    }, (error) => {
        showSnackBar(errors.fetch);
        console.log(error);
    })



    } else {
        showSnackBar(errors.location);
    }
    
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

export async function sendListRequest() {


    let url = `${protocol}${domain}/micronations`;


    let wrapper = document.getElementById("list__ul");
    wrapper.innerHTML = null;

    await superfetch(url, "GET", null, (data) => {
        console.log(data);

        if(data.length == 0) {
            wrapper.innerHTML += "<p>The server couldn't provide any micronations</p>"
        }

        data.forEach(micronation => {

            let listitem = makeMicronationListItem(micronation.code, micronation.name, micronation.verified, "open_in_new" ,`/micronation.html?m=${micronation.code}`)

        wrapper.innerHTML += listitem;
        });

        let add_button = makeMicronationListItem("ADD", "Add your micronation", false, "add", "/add.html");
        wrapper.innerHTML += add_button;


    }, (error) => {
        showSnackBar(errors.fetch)
        console.log(error);
    })



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
            showSnackBar(error.message);
            console.log(error);
        }, options);
    });
    
}

export async function superfetch(url, method, body, datahandler, errorhandler) {

    body = JSON.stringify(body);

    const options = {
        method: method,
        type: "cors"
    }

    if(method != "GET") {
        options.body = body;
    }

    fetch(url, options)
    .then((response) => {
        return response.json();
    }).then(data => datahandler(data))
    .catch(error => errorhandler(error)
    )
}


export async function sendInfoRequest(code) {

    let url = `${protocol}${domain}/micronation/${code}`;
    
    await superfetch(url, "GET", null, (micronation) => {

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
            edit: document.querySelector("#mnpage__edit")
        }
    
        elements.name.innerText = micronation.name;
        elements.edit.setAttribute("href", `edit.html?m=${micronation.code}`);
        //elements.edit.classList.add("hidden");
        elements.code_text.innerText = micronation.code;

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
            elements.map.setAttribute("href", `geo:${micronation.coordinates.latitude},${micronation.coordinates.longitude}`);
            elements.map.classList.remove("hidden");
        }
    
    }, async (error) => {
        console.log(error);
        showSnackBar(errors.fetch)
        return false;
    })

}


export async function sendUnlockRequest(code, password, elements) {

    let url = `${protocol}${domain}/unlock`;
    
    let request = {
        code: code
    }

    request.password = await sha256(password);

    console.log(request)

    await superfetch(url, "POST", request, (data) => {

        console.log(data)

        if(data.success) {

            elements.old_password.setAttribute("disabled", true);
            elements.unlock.setAttribute("disabled", true);

            elements.name.value = data.name;
            elements.description.value = data.description;
            elements.email.value = data.email;
            elements.splash.value = data.splash;
            elements.website.value = data.website;


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
            showSnackBar(data.error);
        }

    
    }, async (error) => {
        console.log(error);
        showSnackBar(errors.fetch);
        return false;
    })

}

export async function sendEditRequest(code, old_password, elements) {

    let geolocation = await geoData(true);

    let request = {
        code: code,
        old_password: old_password,
        name: elements.name.value,
        description: elements.description.value,
        email: elements.email.value,
        splash: elements.splash.value,
        website: elements.website.value,
        update_coordinates: elements.update_coordinates.checked,
        privacy_distance: elements.privacy_distance.checked,
        privacy_coordinates: elements.privacy_coordinates.checked,
        new_password: undefined,
        coordinates: undefined
    }

    if(elements.want_to_change_pass.checked == true) {
        request.new_password = await sha256(elements.new_password.value);
    } else {
        request.new_password = request.old_password;
    }

    console.log(request);


    if(await geoPermission() == true) {

        if(geolocation.accuracy < 250) {

            request.coordinates = geolocation;

            let url = `${protocol}${domain}/edit`;

            await superfetch(url, "POST", request, (data) => {
        
                console.log(data);
        
                if(data.success) {
        
                    console.log("SUCCESS");
                    window.location = `/micronation.html?m=${code}`;

                    
                } else {
                    showSnackBar(data.reason);
                }
            
        
            
            }, async (error) => {
                console.log(error);
                showSnackBar(errors.fetch)
                return false;
            })
            
        } else {
            showSnackBar(errors.geo_inaccurate);
        }
    } else {
        showSnackBar(errors.location);
    }

}

export async function sendRemoveRequest(code, password) {
    console.log(code, password);

    let url = `${protocol}${domain}/remove`;

    let request = {
        code: code,
        password: password
    }

    await superfetch(url, "POST", request, (data) => {

        console.log(data);

        if(data.success) {

            console.log("REMOVED");
            window.location = `/`;

            
        } else {
            showSnackBar(data.reason);
        }
    

    
    }, async (error) => {
        console.log(error);
        showSnackBar(errors.fetch)
        return false;
    })
}