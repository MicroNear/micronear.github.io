<section id="verification">
    <h3>
        <span class="material-icons">
        verified
        </span>
        Verification
    </h3>
      <div>
        <p>Fill the form below to request verification. Make sure that the website contains a link to your micronation on Micronear.</p>
      </div>
      <form id="verification__form" class="">
      <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
        <input class="mdl-textfield__input uppercase" type="text" maxlength="3" id="verification__code" required="true" />
        <label class="mdl-textfield__label" for="verification__code">Country code</label>
      </div>
      <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
        <input class="mdl-textfield__input" type="url" maxlength="256" id="verification__wiki" />
        <label class="mdl-textfield__label" for="verification__wiki">Wiki page</label>
      </div>
      <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
        <input class="mdl-textfield__input" type="url" maxlength="256" id="verification__website" />
        <label class="mdl-textfield__label" for="verification__website">Website / Discord / Instagram / ?</label>
      </div>
      <p></p>
      <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
        <input class="mdl-textfield__input" type="password" maxlength="256" id="verification__password" />
        <label class="mdl-textfield__label" for="verification__password">Password</label>
      </div>
      <label class="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" for="verification__terms">
        <input type="checkbox" id="verification__terms" class="mdl-checkbox__input" />
        <span class="mdl-checkbox__label">I agree to the Privacy Policy</span>
      </label>
      <button type="button" class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent" id="verification__request">
        Request verification
      </button>
    </form>
  </section>