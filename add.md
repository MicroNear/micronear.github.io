<section id="add">

  <h3>Add a micronation</h3>
    <strong>Fictional micronations are not allowed</strong>

  <form id="add__form">
    <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
      <input class="mdl-textfield__input" type="text" maxlength="256" id="add__mname" required="true" />
      <label class="mdl-textfield__label" for="add__mname">Micronation name</label>
    </div>
    <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
        <input class="mdl-textfield__input uppercase" type="text" maxlength="4" id="add__code" required="true" />
        <label class="mdl-textfield__label" for="add__code">Country code</label>
    </div>
    <div class="mdl-textfield mdl-js-textfield">
      <textarea class="mdl-textfield__input" type="text" rows="3" id="add__description" maxlength="1000" required></textarea>
      <label class="mdl-textfield__label" for="add__description">Short description in English</label>
    </div>
    <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
      <input class="mdl-textfield__input" type="email" id="add__email" />
      <label class="mdl-textfield__label" for="add__email">Public email</label>
    </div>
    <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
      <input class="mdl-textfield__input" type="url" maxlength="256" id="add__mflag" />
      <label class="mdl-textfield__label" for="add__mflag">Flag (link)</label>
    </div>
    <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
      <input class="mdl-textfield__input" type="url" maxlength="256" id="add__mwebsite" />
      <label class="mdl-textfield__label" for="add__mwebsite">Website (link)</label>
    </div>
    <p>Website, Wiki page or a Discord server</p>
    <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
      <input class="mdl-textfield__input" type="password" maxlength="256" id="add__password" minlength="8" required="true" />
      <label class="mdl-textfield__label" for="add__password">Password</label>
    </div>
    <label class="mdl-switch mdl-js-switch mdl-js-ripple-effect" for="add__distance">
      <input type="checkbox" id="add__distance" class="mdl-switch__input" checked="" />
      <span class="mdl-switch__label">Show distance from users</span>
    </label>
    <label class="mdl-switch mdl-js-switch mdl-js-ripple-effect" for="add__coordinates">
      <input type="checkbox" id="add__coordinates" class="mdl-switch__input" />
      <span class="mdl-switch__label">Visible on map</span>
    </label>
    <label class="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" for="add__terms">
      <input type="checkbox" id="add__terms" class="mdl-checkbox__input" />
      <span class="mdl-checkbox__label">I agree to the <a href="privacy.html">Terms of Service</a> and the <a href="privacy.html">Privacy Policy</a></span>
    </label>
    <hr>
    <button class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent" id="add__buy">
      Add
    </button>
  </form>

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
