<section id="verification">
  <h3>
      <span class="material-icons">
      verified
      </span>
      Verification
  </h3>
    <div>
      <p>Fill the form below to request the "verified" badge. Your micronation has to follow these requirements:</p>
    <ul class="">
      <li class="">
        <span>
        <i class="material-icons -icon">contact_mail</i>
          Valid contact information on your Micronear page
      </span>
      </li>
      <li class="">
        <span>
        <i class="material-icons -icon">web</i>
          A website link on your Micronear page
      </span>
      </li>
      <li class="">
        <span>
        <i class="material-icons -icon">social_distance</i>
          Micronear allowed to display the distance between your micronation and the users
      </span>
      </li>
      <li class="">
        <span>
        <i class="material-icons -icon">insert_photo</i>
          A flag that will be shown on the "Nearest micronations" page
      </span>
      </li>
    </ul>
    <p>Sharing location on map is optional.</p>
    </div>
    <form id="verification__form" class="">
    <div class="textfield">
      <input class="uppercase" type="text" maxlength="4" autocomplete="username" id="verification__code" autocomplete="country" required />
      <label class="mdl-textfield__label" for="verification__code">Country code</label>
    </div>
    <div class="textfield">
      <input type="password" maxlength="256" autocomplete="current-password" id="verification__password" autocomplete="current-password" required />
      <label class="mdl-textfield__label" for="verification__password">Password</label>
    </div>
    <label class="checkbox" for="verification__terms">
      <input type="checkbox" id="verification__terms" class="mdl-checkbox__input" required />
      <span class="mdl-checkbox__label">I agree to the <a href="privacy.html">Terms of Service</a> and the <a href="privacy.html">Privacy Policy</a></span>
    </label>
    <hr>
    <button type="submit" class="button accent" id="verification__request">
      Request verification
    </button>
  </form>
</section>
<section>
  <h3>Verification requests</h3>
    <ul id="verification_requests" class="list">
      <li class="listitem">
            <span>
                <span>No requests</span>
                <span>
                    No pending verification requests
                </span>
            </span>
            <span>
                <i class="material-icons">task_alt</i>
            </span>
        </span>
      </li>
  </ul>
</section>