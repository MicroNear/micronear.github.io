<section id="add">
  <h1>Add a micronation</h1>
    <form id="add__form" data-steps="3" action="#">
      <div class="form_step shown" data-step="0">
        <h2>Basic information</h2>
        <div class="textfield">
          <label for="add__mname">Micronation name *</label>
          <input type="text" maxlength="256" id="add__mname" required="true" placeholder="Republic of Questonia" />
        </div>
        <div class="textfield">
            <label class="uppercase" for="add__code">Country code *</label>
            <input type="text" maxlength="4" id="add__code" required="true" autocapitalize autocomplete="country" placeholder="QES"/>
        </div>
        <div class="textfield">
          <label for="add__mflag">Flag image link</label>
          <input type="url" maxlength="256" id="add__mflag" autocomplete="url" placeholder="https://micronations.wiki/your-flag.png"/>
        </div>
        <div class="textfield">
          <label for="add__password">New password *</label>
          <input type="password" maxlength="256" id="add__password" minlength="8" required="true" autocomplete="new-password" />
        </div>
        <div class="textfield">
          <label for="add__description">Short description in English *</label>
          <textarea type="text" rows="3" id="add__description" maxlength="1000"></textarea>
        </div>
      </div>
      <div class="form_step" data-step="1">
        <h2>Contact</h2>
        <div>
          <label for="add__email">Email</label>
          <input type="email" id="add__email" autocomplete="email" />
        </div>
        <div>
          <label for="add__mwebsite">Website</label>
          <input type="url" maxlength="256" id="add__mwebsite" autocomplete="url" />
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
        <button class="accent" id="add__buy">
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
  <h2>Tips</h2>
  <h3>Choosing a country code</h3>
  <ul>
    <li>Country code is a 2, 3 or 4-letter code representing your micronation.</li>
    <li>For example: DR, MOL, SEA, SKL.</li>
  </ul>
  <h3>Security</h3>
  <ul>
    <li>Passphrases such as "micronationswilltakeover" are stronger and easier to remember than passwords like "Q9E4P1D7S2".</li>
    <li>Write down your password.</li>
  </ul>
  <h3>Need help?</h3>
  <a href="/about" class="button">
    Contact us
  </a>
</section>