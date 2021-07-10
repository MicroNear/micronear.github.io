<section id="add">

  <h3>Add a micronation</h3>
    <strong>Fictional micronations are not allowed</strong>

  <form id="add__form">
    <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
      <input class="mdl-textfield__input" type="text" maxlength="256" id="add__mname" required="true" />
      <label class="mdl-textfield__label" for="add__mname">Micronation name</label>
    </div>
    <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
        <input class="mdl-textfield__input" type="text" maxlength="3" id="add__code" required="true" />
        <label class="mdl-textfield__label" for="add__code">Country code</label>
    </div>
    <div class="mdl-textfield mdl-js-textfield">
      <textarea class="mdl-textfield__input" type="text" rows="3" id="add__description" maxlength="1000"></textarea>
      <label class="mdl-textfield__label" for="add__description">Description in English</label>
    </div>
    <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
      <input class="mdl-textfield__input" type="email" id="add__email" />
      <label class="mdl-textfield__label" for="add__email">Public email</label>
    </div>
    <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
      <input class="mdl-textfield__input" type="url" maxlength="256" id="add__msplash" />
      <label class="mdl-textfield__label" for="add__msplash">Splash screen or flag link</label>
    </div>
    <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
      <input class="mdl-textfield__input" type="url" maxlength="256" id="add__mwebsite" />
      <label class="mdl-textfield__label" for="add__mwebsite">Website</label>
    </div>
    <p>Website, Wiki page or a Discord server, include https://</p>
    <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
      <input class="mdl-textfield__input" type="password" maxlength="256" id="add__password" required="true" />
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
      <span class="mdl-checkbox__label">I agree to the <a href="privacy.html">Privacy Policy</a></span>
    </label>
    <button class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent" id="add__buy">
      Add
    </button>
  </form>

  <h5>Tips</h5>
  <ul>
    <li>Include https:// in links</li>
    <li>"mydogsnameisjohnny" is stronger password than "X97E4ZQ"</li>
    <li>Write down your password</li>
    <li>Issues? <a href="info.html">Contact us</a></li>
  </ul>

</section>
