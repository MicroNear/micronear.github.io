
<section id="add">

  <h3>Edit micronation</h3>
    <form id="edit__preform">
        <div class="mdl-textfield mdl-js-textfield">
            <input class="mdl-textfield__input" type="text" maxlength="256" id="edit__code" required="true" disabled />
            <label class="mdl-textfield__label" for="edit__code">Code</label>
        </div>
        <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
            <input class="mdl-textfield__input" type="password" maxlength="256" id="edit__old_password" required="true" autocomplete="current-password" />
            <label class="mdl-textfield__label" for="edit__password">Password</label>
        </div>
        <button class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent" id="edit__unlock">
            Unlock
        </button>
    </form>
<form id="edit__form" class="hidden">
    <div class="form_step shown">
      <h4>Basic information</h4>
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
        <label class="mdl-textfield__label" for="edit__email">Email</label>
      </div>
      <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
        <input class="mdl-textfield__input" type="url" maxlength="256" id="edit__flag" />
        <label class="mdl-textfield__label" for="edit__flag">Flag image link</label>
      </div>
      <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
        <input class="mdl-textfield__input" type="url" maxlength="256" id="edit__website" />
        <label class="mdl-textfield__label" for="edit__website">Website</label>
      </div>
      <p>If you don't have a website, use your Wiki page, Instagram or a Discord server</p>
    </div>
    <div>
    <h4>Location</h4>
    <label class="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" for="edit__update_coordinates">
      <input type="checkbox" id="edit__update_coordinates" class="mdl-checkbox__input" />
      <span class="mdl-checkbox__label">Update the coordinates with my location</span>
    </label>
    <div id="location_notice" class="hidden">
      <p>Allow Micronear to access the location of your micronation.</p>
      <button type="button" id="location_button" class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent">
        Grant location access
      </button>
    </div>
    <input type="hidden" id="edit__location">
    </div>
    <label class="mdl-switch mdl-js-switch mdl-js-ripple-effect" for="edit__privacy_distance">
      <input type="checkbox" id="edit__privacy_distance" class="mdl-switch__input" />
      <span class="mdl-switch__label">Show on the find nearby page</span>
    </label>
    <label class="mdl-switch mdl-js-switch mdl-js-ripple-effect" for="edit__privacy_coordinates">
      <input type="checkbox" id="edit__privacy_coordinates" class="mdl-switch__input" />
      <span class="mdl-switch__label">Visible on map</span>
    </label>
    <div>
      <h4>Submit</h4>
      <label class="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" for="edit__want_to_change_pass">
        <input type="checkbox" id="edit__want_to_change_pass" class="mdl-checkbox__input" />
        <span class="mdl-checkbox__label">Change password</span>
      </label>
      <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label hidden" id="edit__new_password_wrapper">
        <input class="mdl-textfield__input" type="password" maxlength="256" minlength="8" id="edit__new_password" autocomplete="new-password" />
        <label class="mdl-textfield__label" for="edit__new_password">New Password</label>
      </div>
      <label class="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" for="edit__terms">
        <input type="checkbox" id="edit__terms" class="mdl-checkbox__input" disabled="" checked="" />
        <span class="mdl-checkbox__label">I agree to the <a href="terms.html">Terms of Service</a> and the <a href="privacy.html">Privacy Policy</a></span>
      </label>
      <hr />
      <button type="button" class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect" id="edit__remove">
        Remove
      </button>
      <button type="submit" class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent" id="edit__buy">
        Update
      </button>
    </div>
</form>

  <div id="edit__confirm_remove" class="mdl-js-snackbar mdl-snackbar">
    <div class="mdl-snackbar__text"></div>
    <button class="mdl-snackbar__action" type="button"></button>
  </div>

</section>
