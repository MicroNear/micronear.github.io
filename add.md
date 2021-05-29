        <section id="add">

  <h3>Add a micronation</h3>
  <p>You can edit your micronation in the future</p>

  <form id="add__form">
    <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
      <input class="mdl-textfield__input" type="text" maxlength="256" id="add__mname" required="true" />
      <label class="mdl-textfield__label" for="add__mname">Micronation name</label>
    </div>
    <div class="mdl-textfield mdl-js-textfield">
      <textarea class="mdl-textfield__input" type="text" rows="3" id="add__description"></textarea>
      <label class="mdl-textfield__label" for="add__description">Description</label>
    </div>
    <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
      <input class="mdl-textfield__input" type="email" id="add__email" />
      <label class="mdl-textfield__label" for="add__email">Public email</label>
    </div>
    <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
      <input class="mdl-textfield__input" type="text" maxlength="1024" id="add__msplash" />
      <label class="mdl-textfield__label" for="add__msplash">Splash screen or flag link</label>
    </div>
    <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
      <input class="mdl-textfield__input" type="text" maxlength="256" id="add__mwebsite" />
      <label class="mdl-textfield__label" for="add__mwebsite">Website</label>
    </div>
    <label class="mdl-switch mdl-js-switch mdl-js-ripple-effect" for="add__distance">
      <input type="checkbox" id="add__distance" class="mdl-switch__input" checked="" />
      <span class="mdl-switch__label">Show on the find nearby page</span>
    </label>
    <label class="mdl-switch mdl-js-switch mdl-js-ripple-effect" for="add__coordinates">
      <input type="checkbox" id="add__coordinates" class="mdl-switch__input" />
      <span class="mdl-switch__label">Visible on map</span>
    </label>
    <label class="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" for="add__terms">
      <input type="checkbox" id="add__terms" class="mdl-checkbox__input" />
      <span class="mdl-checkbox__label">I agree to the <a href="terms.html">terms of service</a></span>
    </label>
    <button class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent" id="add__buy">
      Confirm
    </button>
  </form>

</section>
