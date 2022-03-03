
<section id="add">

  <h1>Edit micronation</h1>
    <form id="edit__preform">
        <div class="textfield mdl-js-textfield">
            <label for="edit__code">Code</label>
            <input type="text" maxlength="256" id="edit__code" required="true" autocapitalize disabled />
        </div>
        <div class="textfield">
            <label for="edit__password">Password</label>
            <input type="password" maxlength="256" id="edit__old_password" required="true" autocomplete="current-password" />
        </div>
        <button class="accent" id="edit__unlock">
            Unlock
        </button>
    </form>
<form id="edit__form" class="hidden">
    <div class="form_step shown">
      <h2>Basic information</h2>
      <div class="textfield">
        <input type="text" maxlength="256" id="edit__name" required="true" value="Micronation" />
        <label for="edit__name">Micronation name</label>
      </div>
      <div class="textfield mdl-js-textfield">
        <label for="edit__description">Description in English</label>
        <textarea type="text" rows="3" id="edit__description" maxlength="1000"></textarea>
      </div>
      <div class="textfield">
        <label for="edit__email">Email</label>
        <input type="email" id="edit__email" />
      </div>
      <div class="textfield">
        <label for="edit__flag">Flag image link</label>
        <input type="url" maxlength="256" id="edit__flag" />
      </div>
      <div class="textfield">
        <label for="edit__website">Website</label>
        <input type="url" maxlength="256" id="edit__website" />
      </div>
      <p>If you don't have a website, use your Wiki page, Instagram or a Discord server</p>
    </div>
    <div>
    <h2>Location</h2>
    <label class="checkbox" for="edit__update_coordinates">
      <input type="checkbox" id="edit__update_coordinates"/>
      <span>Update the coordinates with my location</span>
    </label>
    <div id="location_notice" class="hidden">
      <p>Allow Micronear to access the location of your micronation.</p>
      <button type="button" id="location_button">
        Grant location access
      </button>
    </div>
    <input type="hidden" id="edit__location">
    </div>
    <label class="checkbox" for="edit__privacy_distance">
      <input type="checkbox" id="edit__privacy_distance"/>
      <span class="mdl-switch__label">Show on the find nearby page</span>
    </label>
    <label class="checkbox" for="edit__privacy_coordinates">
      <input type="checkbox" id="edit__privacy_coordinates"/>
      <span class="mdl-switch__label">Visible on map</span>
    </label>
    <div>
      <h2>Submit</h2>
      <label class="checkbox" for="edit__want_to_change_pass">
        <input type="checkbox" id="edit__want_to_change_pass"/>
        <span>Change password</span>
      </label>
      <div class="textfield hidden" id="edit__new_password_wrapper">
        <input type="password" maxlength="256" minlength="8" id="edit__new_password" autocomplete="new-password" />
        <label for="edit__new_password">New Password</label>
      </div>
      <label class="checkbox" for="edit__terms">
        <input type="checkbox" id="edit__terms" disabled="" checked="" />
        <span>I agree to the <a href="terms">Terms of Service</a> and the <a href="privacy">Privacy Policy</a></span>
      </label>
      <hr />
      <div class="row">
        <button type="button" id="edit__remove">
          Remove
        </button>
        <button class="accent" type="submit" id="edit__buy">
          Update
        </button>
      </div>
    </div>
</form>

</section>
