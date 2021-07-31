
<section id="add">

  <h3>Edit micronation</h3>
    <form id="edit__preform">
        <div class="mdl-textfield mdl-js-textfield">
            <input class="mdl-textfield__input" type="text" maxlength="256" id="edit__code" required="true" disabled />
            <label class="mdl-textfield__label" for="edit__code">Code</label>
        </div>
        <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
            <input class="mdl-textfield__input" type="password" maxlength="256" id="edit__old_password" required="true" />
            <label class="mdl-textfield__label" for="edit__password">Password</label>
        </div>
        <button class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent" id="edit__unlock">
            Unlock
        </button>
    </form>
    <form id="edit__form" class="hidden">
    <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
      <input class="mdl-textfield__input" type="text" maxlength="256" id="edit__name" required="true" value="Micronation" />
      <label class="mdl-textfield__label" for="edit__name">Micronation name</label>
    </div>
    <div class="mdl-textfield mdl-js-textfield">
      <textarea class="mdl-textfield__input" type="text" rows="3" id="edit__description" maxlength="1000"></textarea>
      <label class="mdl-textfield__label" for="edit__description">Description in English</label>
    </div>
    <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
      <input class="mdl-textfield__input" type="email" id="edit__email" />
      <label class="mdl-textfield__label" for="edit__email">Public email</label>
    </div>
    <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
      <input class="mdl-textfield__input" type="url" maxlength="256" id="edit__splash" />
      <label class="mdl-textfield__label" for="edit__splash">Splash screen or flag link</label>
    </div>
    <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
      <input class="mdl-textfield__input" type="url" maxlength="256" id="edit__website" />
      <label class="mdl-textfield__label" for="edit__website">Website</label>
    </div>
    <p>Website, Wiki page or a Discord server, include https://</p>
    <label class="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" for="edit__update_coordinates">
      <input type="checkbox" id="edit__update_coordinates" class="mdl-checkbox__input" />
      <span class="mdl-checkbox__label">Update coordinates</span>
    </label>
    <label class="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" for="edit__want_to_change_pass">
      <input type="checkbox" id="edit__want_to_change_pass" class="mdl-checkbox__input" />
      <span class="mdl-checkbox__label">Change password</span>
    </label>
    <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label hidden" id="edit__new_password_wrapper">
      <input class="mdl-textfield__input" type="password" maxlength="256" id="edit__new_password" />
      <label class="mdl-textfield__label" for="edit__new_password">New Password</label>
    </div>
    <label class="mdl-switch mdl-js-switch mdl-js-ripple-effect" for="edit__privacy_distance">
      <input type="checkbox" id="edit__privacy_distance" class="mdl-switch__input"/>
      <span class="mdl-switch__label">Show on the find nearby page</span>
    </label>
    <label class="mdl-switch mdl-js-switch mdl-js-ripple-effect" for="edit__privacy_coordinates">
      <input type="checkbox" id="edit__privacy_coordinates" class="mdl-switch__input"/>
      <span class="mdl-switch__label">Visible on map</span>
    </label>
    <label class="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" for="edit__terms">
      <input type="checkbox" id="edit__terms" class="mdl-checkbox__input" disabled checked />
      <span class="mdl-checkbox__label">I agree to the <a href="terms.html">Terms of Service</a> and the <a href="privacy.html">Privacy Policy</a></span>
    </label>
    <button type="button" class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect" id="edit__remove">
      Remove
    </button>
    <button type="submit" class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent" id="edit__buy">
      Update
    </button>
  </form>

  <div id="edit__confirm_remove" class="mdl-js-snackbar mdl-snackbar">
    <div class="mdl-snackbar__text"></div>
    <button class="mdl-snackbar__action" type="button"></button>
  </div>

</section>
