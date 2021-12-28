<section id="add">
  <h3>Add a micronation</h3>
    <form id="add__form" data-steps="3" action="#">
      <div class="form_step shown" data-step="0">
        <h4>Basic information</h4>
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
        <h4>Contact</h4>
        <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
          <input class="mdl-textfield__input" type="email" id="add__email" autocomplete="email" />
          <label class="mdl-textfield__label" for="add__email">Email</label>
        </div>
        <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
          <input class="mdl-textfield__input" type="url" maxlength="256" id="add__mwebsite" autocomplete="url" />
          <label class="mdl-textfield__label" for="add__mwebsite">Website</label>
        </div>
        <p>If you don't have a website, use your Wiki page, Instagram or a Discord server. Include https://.</p>
      </div>
      <div class="form_step" data-step="2">
        <h4>Location</h4>
        <div id="location_notice">
          <p>Allow Micronear to access the location of your micronation.</p>
          <button id="location_button" class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent">
            Grant location access
          </button>
        </div>
        <input type="hidden" id="add__location">
        <label class="mdl-switch mdl-js-switch mdl-js-ripple-effect" for="add__distance">
          <input type="checkbox" id="add__distance" class="mdl-switch__input" checked="" />
          <span class="mdl-switch__label">Show distance from users</span>
        </label>
          <label class="mdl-switch mdl-js-switch mdl-js-ripple-effect" for="add__coordinates">
          <input type="checkbox" id="add__coordinates" class="mdl-switch__input" />
          <span class="mdl-switch__label">Show on map</span>
        </label>
        <p id="locationprivacywarning" class="hidden">
          <strong>Your physical security is important!</strong>
          The <strong>Show on map</strong> option will make this location <strong>visible to anyone</strong>. <br>
        </p>
      </div>
      <div class="form_step" data-step="3">
        <h4>Submit</h4>
        <label class="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" for="add__terms">
          <input type="checkbox" id="add__terms" class="mdl-checkbox__input" />
          <span class="mdl-checkbox__label">I agree to the <a href="/terms">Terms of Service</a> and the <a href="/privacy">Privacy Policy</a></span>
        </label>
        <button class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent" id="add__buy">
          Add
        </button>
      </div>
      <div class="form_controls">
        <button id="form_back" class="mdl-button mdl-js-button mdl-js-ripple-effect">
          Back
        </button>
        <button id="form_next" class="mdl-button mdl-js-button mdl-button--accent mdl-button--raised mdl-js-ripple-effect">
          Next
        </button>
      </div>
    </form>
</section>
<hr>
<section id="tips">
  <h5>Choosing a country code</h5>
  <ul>
    <li>Country code is a 2, 3 or 4-letter code representing your micronation.</li>
    <li>Don't include "Kingdom" or "Republic" in your code. For example Nonexistent Republic should be NE or NEX, not NR.</li>
    <li>Valid examples: DR, MOL, SEA, SKL.</li>
  </ul>
  <h5>Privacy & Security</h5>
  <ul>
    <li>Longer passwords such as "micronationswilltakeover" are stronger and easier to remember than passwords like "Q9E4P1D7S2".</li>
    <li>Write down your password.</li>
  </ul>
  <h5>Need help?</h5>
  <a href="/about" class="mdl-button mdl-js-button mdl-button--accent mdl-button--raised mdl-js-ripple-effect">
    Contact us
  </a>
</section>