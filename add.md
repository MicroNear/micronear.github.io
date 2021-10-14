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
        <p>If you don't have a website, use your Wiki page, Instagram or a Discord server</p>
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
          If you are at home right now, <strong>do not enable</strong> the <strong>"Show on map" option</strong>. <br>
          <em>You can update the location of your micronation later<em>
        </p>
      </div>
      <div class="form_step" data-step="3">
        <h4>Submit</h4>
        <label class="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" for="add__terms">
          <input type="checkbox" id="add__terms" class="mdl-checkbox__input" />
          <span class="mdl-checkbox__label">I agree to the <a href="/terms.html">Terms of Service</a> and the <a href="/privacy.html">Privacy Policy</a></span>
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
  <h5>Tips</h5>
  <ul>
    <li>Country code examples: DR, MOL, SEA, SKL</li>
    <li>Country code for <b>Nonexistent</b> Republic should be <b>NE</b> or <b>NX</b>, not <b>N</b>R.</li>
    <li>Country code for Kingdom of <b>Noone</b> should be <b>NN</b>, not KO<b>N</b>.</li>
    <li>Include https:// in all links</li>
    <li>"Show distance from users" option won't display the location on map</li>
    <li>"mydogsnameisjohnny" is stronger password than "X97E4ZQ"</li>
    <li>Write down your password</li>
  </ul>
  <p>
  <a href="about.html">Contact us</a></p>
</section>

