
<section id="add">

  <h3>Verification</h3>
    <div>
        <p>Verify your micronation</p>
    </div>
    <form id="verification__form" class="hidden">
    <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
      <input class="mdl-textfield__input" type="text" maxlength="256" id="verification__name" required="true" value="Micronation" />
      <label class="mdl-textfield__label" for="verification__name">Micronation name</label>
    </div>
    <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
      <input class="mdl-textfield__input" type="url" maxlength="256" id="verification__website" />
      <label class="mdl-textfield__label" for="verification__website">Website</label>
    </div>
    <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label hidden" id="verification__new_password_wrapper">
      <input class="mdl-textfield__input" type="password" maxlength="256" id="verification__new_password" />
      <label class="mdl-textfield__label" for="verification__new_password">New Password</label>
    </div>
    <label class="mdl-switch mdl-js-switch mdl-js-ripple-effect" for="verification__privacy_distance">
      <input type="checkbox" id="verification__privacy_distance" class="mdl-switch__input" />
      <span class="mdl-switch__label">Show on the find nearby page</span>
    </label>
    <label class="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" for="verification__terms">
      <input type="checkbox" id="verification__terms" class="mdl-checkbox__input" disabled="" checked="" />
      <span class="mdl-checkbox__label">I agree to the Privacy Policy</span>
    </label>
    <button type="button" class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent" id="verification__remove">
      Request verification
    </button>
  </form>

</section>
