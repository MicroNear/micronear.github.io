<section id="verification">
    <h3>
        <span class="material-icons">
        verified
        </span>
        Verification
    </h3>
      <div>
        <p>Fill the form below to request the "verified" badge. Your micronation has to follow these requirements:</p>
        <ul class="mdl-list">
        <li class="mdl-list__item">
          <span class="mdl-list__item-primary-content">
          <i class="material-icons mdl-list__item-icon">contact_mail</i>
            Valid contact information on your Micronear page
        </span>
        </li>
        <li class="mdl-list__item">
          <span class="mdl-list__item-primary-content">
          <i class="material-icons mdl-list__item-icon">link</i>
            Website hyperlinked with your Micronear page
        </span>
        </li>
        <li class="mdl-list__item">
          <span class="mdl-list__item-primary-content">
          <i class="material-icons mdl-list__item-icon">social_distance</i>
            Micronear allowed to display the distance between your micronation and the users
        </span>
        </li>
      </ul>
      <p>We require the applicants to share approximate distance of their micronation from the users. Sharing precise location on map is optional.</p>
      </div>
      <form id="verification__form" class="">
      <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
        <input class="mdl-textfield__input uppercase" type="text" maxlength="3" autocomplete="username" id="verification__code" required />
        <label class="mdl-textfield__label" for="verification__code">Country code</label>
      </div>
      <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
        <input class="mdl-textfield__input" type="password" maxlength="256" autocomplete="current-password" id="verification__password" required />
        <label class="mdl-textfield__label" for="verification__password">Password</label>
      </div>
      <label class="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" for="verification__terms">
        <input type="checkbox" id="verification__terms" class="mdl-checkbox__input" required />
        <span class="mdl-checkbox__label">I agree to the <a href="privacy.html">Terms of Service</a> and the <a href="privacy.html">Privacy Policy</a></span>
      </label>
      <hr>
      <button type="submit" class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent" id="verification__request">
        Request verification
      </button>
    </form>
  </section>