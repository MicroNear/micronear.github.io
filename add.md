<section id="add">
  <h1>Add a micronation</h1>
    <form id="add__form" data-steps="3" action="#">
      <div class="form_step shown" data-step="0">
        <h2>Basic information</h2>
        <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
          <input class="mdl-textfield__input" type="text" maxlength="256" id="add__mname" required="true" />
          <label class="mdl-textfield__label" for="add__mname">Micronation name</label>
        </div>
        <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
            <input class="mdl-textfield__input uppercase" type="text" maxlength="4" id="add__code" required="true" autocomplete="country"/>
            <label class="mdl-textfield__label" for="add__code">Country code</label>
        </div>
        <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
          <input class="mdl-textfield__input" type="url" maxlength="256" id="add__mflag" autocomplete="url" />
          <label class="mdl-textfield__label" for="add__mflag">Flag image link</label>
        </div>
        <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
          <input class="mdl-textfield__input" type="password" maxlength="256" id="add__password" minlength="8" required="true" autocomplete="new-password" />
          <label class="mdl-textfield__label" for="add__password">New password</label>
        </div>
        <div class="mdl-textfield mdl-js-textfield">
          <textarea class="mdl-textfield__input" type="text" rows="3" id="add__description" maxlength="1000"></textarea>
          <label class="mdl-textfield__label" for="add__description">Short description in English</label>
        </div>
      </div>
      <div class="form_step" data-step="1">
        <h2>Contact</h2>
        <div>
          <input class="mdl-textfield__input" type="email" id="add__email" autocomplete="email" />
          <label class="mdl-textfield__label" for="add__email">Email</label>
        </div>
        <div>
          <input class="mdl-textfield__input" type="url" maxlength="256" id="add__mwebsite" autocomplete="url" />
          <label class="mdl-textfield__label" for="add__mwebsite">Website</label>
        </div>
        <p>If you don't have a website, use your Wiki page, Instagram or a Discord server. Include https://.</p>
      </div>
      <div class="form_step" data-step="2">
        <h2>Location</h2>
        <div id="location_notice">
          <p>Allow Micronear to access the location of your micronation.</p>
          <button id="location_button">
            Grant location access
          </button>
        </div>
        <input type="hidden" id="add__location">
        <label class="checkbox" for="add__distance">
          <input type="checkbox" id="add__distance" checked="" />
          <span>Show distance from users</span>
        </label>
        <label class="checkbox" for="add__coordinates">
          <input type="checkbox" id="add__coordinates"/>
          <span>Show on map</span>
        </label>
        <p id="locationprivacywarning" class="hidden">
          <strong>Your privacy is important!</strong>
          The <strong>Show on map</strong> option will make this location <strong>visible to anyone</strong>. <br>
        </p>
      </div>
      <div class="form_step" data-step="3">
        <h2>Submit</h2>
        <label class="checkbox" for="add__terms">
          <input type="checkbox" id="add__terms"/>
          <span>I agree to the <a href="/terms">Terms of Service</a> and the <a href="/privacy">Privacy Policy</a></span>
        </label>
        <button id="add__buy">
          Add
        </button>
      </div>
      <div class="form_controls">
        <button id="form_back">
          Back
        </button>
        <button id="form_next" class="accent">
          Next
        </button>
      </div>
    </form>
</section>
<hr>
<section id="tips">
  <h3>Choosing a country code</h3>
  <ul>
    <li>Country code is a 2, 3 or 4-letter code representing your micronation.</li>
    <li>For example: DR, MOL, SEA, SKL.</li>
  </ul>
  <h3>Privacy & Security</h3>
  <ul>
    <li>Passphrases such as "micronationswilltakeover" are stronger and easier to remember than passwords like "Q9E4P1D7S2".</li>
    <li>Write down your password.</li>
  </ul>
  <h3>Need help?</h3>
  <a href="/about" class="button">
    Contact us
  </a>
</section>