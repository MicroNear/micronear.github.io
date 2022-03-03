
<section id="add">

  <h3>Edit micronation</h3>
    <form id="edit__preform">
        <div class="textfield mdl-js-textfield">
            <input type="text" maxlength="256" id="edit__code" required="true" disabled />
            <label for="edit__code">Code</label>
        </div>
        <div class="textfield">
            <input type="password" maxlength="256" id="edit__old_password" required="true" autocomplete="current-password" />
            <label for="edit__password">Password</label>
        </div>
        <button class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent" id="edit__unlock">
            Unlock
        </button>
    </form>
<form id="edit__form" class="hidden">
    <div class="form_step shown">
      <h4>Basic information</h4>
      <div class="textfield">
        <input type="text" maxlength="256" id="edit__name" required="true" value="Micronation" />
        <label for="edit__name">Micronation name</label>
      </div>
      <div class="textfield mdl-js-textfield">
        <textarea type="text" rows="3" id="edit__description" maxlength="1000"></textarea>
        <label for="edit__description">Description in English</label>
      </div>
      <div class="textfield">
        <input type="email" id="edit__email" />
        <label for="edit__email">Email</label>
      </div>
      <div class="textfield">
        <input type="url" maxlength="256" id="edit__flag" />
        <label for="edit__flag">Flag image link</label>
      </div>
      <div class="textfield">
        <input type="url" maxlength="256" id="edit__website" />
        <label for="edit__website">Website</label>
      </div>
      <p>If you don't have a website, use your Wiki page, Instagram or a Discord server</p>
    </div>
    <div>
    <h4>Location</h4>
    <label class="checkbox" for="edit__update_coordinates">
      <input type="checkbox" id="edit__update_coordinates" class="mdl-checkbox__input" />
      <span>Update the coordinates with my location</span>
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
      <label class="checkbox" for="edit__want_to_change_pass">
        <input type="checkbox" id="edit__want_to_change_pass" class="mdl-checkbox__input" />
        <span>Change password</span>
      </label>
      <div class="textfield mdl-js-textfield textfield--floating-label hidden" id="edit__new_password_wrapper">
        <input type="password" maxlength="256" minlength="8" id="edit__new_password" autocomplete="new-password" />
        <label for="edit__new_password">New Password</label>
      </div>
      <label class="checkbox" for="edit__terms">
        <input type="checkbox" id="edit__terms" class="mdl-checkbox__input" disabled="" checked="" />
        <span>I agree to the <a href="terms">Terms of Service</a> and the <a href="privacy">Privacy Policy</a></span>
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

</section>
