(() => {

    const jwkEcKey = {
      "crv": "P-384",
      "d": "wouCtU7Nw4E8_7n5C1-xBjB4xqSb_liZhYMsy8MGgxUny6Q8NCoH9xSiviwLFfK_",
      "ext": true,
      "key_ops": ["sign"],
      "kty": "EC",
      "x": "SzrRXmyI8VWFJg1dPUNbFcc9jZvjZEfH7ulKI1UkXAltd7RGWrcfFxqyGPcwu6AQ",
      "y": "hHUag3OvDzEr0uUQND4PXHQTXP5IDGdYhJhL-WLKjnGjQAw0rNGy5V29-aV-yseW"
    };

    /*
    The unwrapped signing key.
    */
    let signingKey;

    const signButton = document.querySelector(".jwk .sign-button");

    /*
    Import a JSON Web Key format EC private key, to use for ECDSA signing.
    Takes a string containing the JSON Web Key, and returns a Promise
    that will resolve to a CryptoKey representing the private key.
    */
    function importPrivateKey(jwk) {
      return window.crypto.subtle.importKey(
        "jwk",
        jwk,
        {
          name: "ECDSA",
          namedCurve: "P-384"
        },
        true,
        ["sign"]
      );
    }

    /*
    Fetch the contents of the "message" textbox, and encode it
    in a form we can use for the sign operation.
    */
    function getMessageEncoding() {
      const messageBox = document.querySelector("#jwk-message");
      const message = messageBox.value;
      const enc = new TextEncoder();
      return enc.encode(message);
    }

    /*
    Get the encoded message-to-sign, sign it and display a representation
    of the first part of it in the "signature" element.
    */
    async function signMessage() {
      const encoded = getMessageEncoding();
      const signature = await window.crypto.subtle.sign(
        {
          name: "ECDSA",
          hash: "SHA-512"
        },
        signingKey,
        encoded
      );

      const signatureValue = document.querySelector(".jwk .signature-value");
      signatureValue.classList.add('fade-in');
      signatureValue.addEventListener('animationend', () => {
        signatureValue.classList.remove('fade-in');
      });
      const buffer = new Uint8Array(signature, 0, 5);
      signatureValue.textContent = `${buffer}...[${signature.byteLength} bytes total]`;
    }

    /*
    Show and enable the sign button.
    */
    function enableSignButton() {
      signButton.classList.add('fade-in');
      signButton.addEventListener('animationend', () => {
        signButton.classList.remove('fade-in');
      });
      signButton.removeAttribute("disabled");
      signButton.classList.remove("hidden");
    }

    /*
    When the user clicks "Import Key"
    - import the key
    - enable the "Sign" button
    */
    const importKeyButton = document.querySelector(".jwk .import-key-button");
    importKeyButton.addEventListener("click", async () => {
      signingKey = await importPrivateKey(jwkEcKey);
      enableSignButton();
    });

    signButton.addEventListener("click", signMessage);

})();


(() => {

    /*
    Export the given key and write it into the "exported-key" space.
    */
    async function exportCryptoKey(key) {
      const exported = await window.crypto.subtle.exportKey(
        "jwk",
        key
      );
      const exportKeyOutput = document.querySelector(".exported-key");
      exportKeyOutput.classList.add("fade-in");
      exportKeyOutput.addEventListener("animationend", () => {
        exportKeyOutput.classList.remove("fade-in");
      });
      exportKeyOutput.textContent = JSON.stringify(exported, null, " ");
    }
  
    /*
    Generate a sign/verify key pair,
    then set up an event listener on the "Export" button.
    */
    window.crypto.subtle.generateKey(
      {
        name: "ECDSA",
        namedCurve: "P-384"
      },
      true,
      ["sign", "verify"]
    ).then((keyPair) => {
      const exportButton = document.querySelector(".export-key-button");
      exportButton.addEventListener("click", () => {
        exportCryptoKey(keyPair.privateKey);
      });
  
    });
  
  })();

  (() => {

    /*
    Store the calculated signature here, so we can verify it later.
    */
    let signature;
  
    /*
    Fetch the contents of the "message" textbox, and encode it
    in a form we can use for sign operation.
    */
    function getMessageEncoding() {
      const messageBox = document.querySelector("#ecdsa-message");
      let message = messageBox.value;
      let enc = new TextEncoder();
      return enc.encode(message);
    }
  
    /*
    Get the encoded message-to-sign, sign it and display a representation
    of the first part of it in the "signature" element.
    */
    async function signMessage(privateKey) {
      const signatureValue = document.querySelector(".ecdsa .signature-value");
      signatureValue.classList.remove("valid", "invalid");
  
      let encoded = getMessageEncoding();
      signature = await window.crypto.subtle.sign(
        {
          name: "ECDSA",
          hash: {name: "SHA-384"},
        },
        privateKey,
        encoded
      );
  
      signatureValue.classList.add('fade-in');
      signatureValue.addEventListener('animationend', () => {
        signatureValue.classList.remove('fade-in');
      });
      let buffer = new Uint8Array(signature, 0, 5);
      signatureValue.textContent = `${buffer}...[${signature.byteLength} bytes total]`;
    }
  
    /*
    Fetch the encoded message-to-sign and verify it against the stored signature.
    * If it checks out, set the "valid" class on the signature.
    * Otherwise set the "invalid" class.
    */
    async function verifyMessage(publicKey) {
      const signatureValue = document.querySelector(".ecdsa .signature-value");
      signatureValue.classList.remove("valid", "invalid");
  
      let encoded = getMessageEncoding();
      let result = await window.crypto.subtle.verify(
        {
          name: "ECDSA",
          hash: {name: "SHA-384"},
        },
        publicKey,
        signature,
        encoded
      );
  
      signatureValue.classList.add(result ? "valid" : "invalid");
    }
  
    /*
    Generate a sign/verify key, then set up event listeners
    on the "Sign" and "Verify" buttons.
    */
    window.crypto.subtle.generateKey(
      {
        name: "ECDSA",
        namedCurve: "P-384"
      },
      true,
      ["sign", "verify"]
    ).then((keyPair) => {
      const signButton = document.querySelector(".ecdsa .sign-button");
      signButton.addEventListener("click", () => {
        signMessage(keyPair.privateKey);
      });
  
      const verifyButton = document.querySelector(".ecdsa .verify-button");
      verifyButton.addEventListener("click", () => {
        verifyMessage(keyPair.publicKey);
      });
    });
  
  })();(() => {

    /*
    Store the calculated signature here, so we can verify it later.
    */
    let signature;
  
    /*
    Fetch the contents of the "message" textbox, and encode it
    in a form we can use for sign operation.
    */
    function getMessageEncoding() {
      const messageBox = document.querySelector("#ecdsa-message");
      let message = messageBox.value;
      let enc = new TextEncoder();
      return enc.encode(message);
    }
  
    /*
    Get the encoded message-to-sign, sign it and display a representation
    of the first part of it in the "signature" element.
    */
    async function signMessage(privateKey) {
      const signatureValue = document.querySelector(".ecdsa .signature-value");
      signatureValue.classList.remove("valid", "invalid");
  
      let encoded = getMessageEncoding();
      signature = await window.crypto.subtle.sign(
        {
          name: "ECDSA",
          hash: {name: "SHA-384"},
        },
        privateKey,
        encoded
      );
  
      signatureValue.classList.add('fade-in');
      signatureValue.addEventListener('animationend', () => {
        signatureValue.classList.remove('fade-in');
      });
      let buffer = new Uint8Array(signature, 0, 5);
      signatureValue.textContent = `${buffer}...[${signature.byteLength} bytes total]`;
    }
  
    /*
    Fetch the encoded message-to-sign and verify it against the stored signature.
    * If it checks out, set the "valid" class on the signature.
    * Otherwise set the "invalid" class.
    */
    async function verifyMessage(publicKey) {
      const signatureValue = document.querySelector(".ecdsa .signature-value");
      signatureValue.classList.remove("valid", "invalid");
  
      let encoded = getMessageEncoding();
      let result = await window.crypto.subtle.verify(
        {
          name: "ECDSA",
          hash: {name: "SHA-384"},
        },
        publicKey,
        signature,
        encoded
      );
  
      signatureValue.classList.add(result ? "valid" : "invalid");
    }
  
    /*
    Generate a sign/verify key, then set up event listeners
    on the "Sign" and "Verify" buttons.
    */
    window.crypto.subtle.generateKey(
      {
        name: "ECDSA",
        namedCurve: "P-384"
      },
      true,
      ["sign", "verify"]
    ).then((keyPair) => {
      const signButton = document.querySelector(".ecdsa .sign-button");
      signButton.addEventListener("click", () => {
        signMessage(keyPair.privateKey);
      });
  
      const verifyButton = document.querySelector(".ecdsa .verify-button");
      verifyButton.addEventListener("click", () => {
        verifyMessage(keyPair.publicKey);
      });
    });
  
  })();(() => {

  /*
  Store the calculated signature here, so we can verify it later.
  */
  let signature;

  /*
  Fetch the contents of the "message" textbox, and encode it
  in a form we can use for sign operation.
  */
  function getMessageEncoding() {
    const messageBox = document.querySelector("#ecdsa-message");
    let message = messageBox.value;
    let enc = new TextEncoder();
    return enc.encode(message);
  }

  /*
  Get the encoded message-to-sign, sign it and display a representation
  of the first part of it in the "signature" element.
  */
  async function signMessage(privateKey) {
    const signatureValue = document.querySelector(".ecdsa .signature-value");
    signatureValue.classList.remove("valid", "invalid");

    let encoded = getMessageEncoding();
    signature = await window.crypto.subtle.sign(
      {
        name: "ECDSA",
        hash: {name: "SHA-384"},
      },
      privateKey,
      encoded
    );

    signatureValue.classList.add('fade-in');
    signatureValue.addEventListener('animationend', () => {
      signatureValue.classList.remove('fade-in');
    });
    let buffer = new Uint8Array(signature, 0, 5);
    signatureValue.textContent = `${buffer}...[${signature.byteLength} bytes total]`;
  }

  /*
  Fetch the encoded message-to-sign and verify it against the stored signature.
  * If it checks out, set the "valid" class on the signature.
  * Otherwise set the "invalid" class.
  */
  async function verifyMessage(publicKey) {
    const signatureValue = document.querySelector(".ecdsa .signature-value");
    signatureValue.classList.remove("valid", "invalid");

    let encoded = getMessageEncoding();
    let result = await window.crypto.subtle.verify(
      {
        name: "ECDSA",
        hash: {name: "SHA-384"},
      },
      publicKey,
      signature,
      encoded
    );

    signatureValue.classList.add(result ? "valid" : "invalid");
  }

  /*
  Generate a sign/verify key, then set up event listeners
  on the "Sign" and "Verify" buttons.
  */
  window.crypto.subtle.generateKey(
    {
      name: "ECDSA",
      namedCurve: "P-384"
    },
    true,
    ["sign", "verify"]
  ).then((keyPair) => {
    const signButton = document.querySelector(".ecdsa .sign-button");
    signButton.addEventListener("click", () => {
      signMessage(keyPair.privateKey);
    });

    const verifyButton = document.querySelector(".ecdsa .verify-button");
    verifyButton.addEventListener("click", () => {
      verifyMessage(keyPair.publicKey);
    });
  });

})();(() => {

  /*
  Store the calculated signature here, so we can verify it later.
  */
  let signature;

  /*
  Fetch the contents of the "message" textbox, and encode it
  in a form we can use for sign operation.
  */
  function getMessageEncoding() {
    const messageBox = document.querySelector("#ecdsa-message");
    let message = messageBox.value;
    let enc = new TextEncoder();
    return enc.encode(message);
  }

  /*
  Get the encoded message-to-sign, sign it and display a representation
  of the first part of it in the "signature" element.
  */
  async function signMessage(privateKey) {
    const signatureValue = document.querySelector(".ecdsa .signature-value");
    signatureValue.classList.remove("valid", "invalid");

    let encoded = getMessageEncoding();
    signature = await window.crypto.subtle.sign(
      {
        name: "ECDSA",
        hash: {name: "SHA-384"},
      },
      privateKey,
      encoded
    );

    signatureValue.classList.add('fade-in');
    signatureValue.addEventListener('animationend', () => {
      signatureValue.classList.remove('fade-in');
    });
    let buffer = new Uint8Array(signature, 0, 5);
    signatureValue.textContent = `${buffer}...[${signature.byteLength} bytes total]`;
  }

  /*
  Fetch the encoded message-to-sign and verify it against the stored signature.
  * If it checks out, set the "valid" class on the signature.
  * Otherwise set the "invalid" class.
  */
  async function verifyMessage(publicKey) {
    const signatureValue = document.querySelector(".ecdsa .signature-value");
    signatureValue.classList.remove("valid", "invalid");

    let encoded = getMessageEncoding();
    let result = await window.crypto.subtle.verify(
      {
        name: "ECDSA",
        hash: {name: "SHA-384"},
      },
      publicKey,
      signature,
      encoded
    );

    signatureValue.classList.add(result ? "valid" : "invalid");
  }

  /*
  Generate a sign/verify key, then set up event listeners
  on the "Sign" and "Verify" buttons.
  */
  window.crypto.subtle.generateKey(
    {
      name: "ECDSA",
      namedCurve: "P-384"
    },
    true,
    ["sign", "verify"]
  ).then((keyPair) => {
    const signButton = document.querySelector(".ecdsa .sign-button");
    signButton.addEventListener("click", () => {
      signMessage(keyPair.privateKey);
    });

    const verifyButton = document.querySelector(".ecdsa .verify-button");
    verifyButton.addEventListener("click", () => {
      verifyMessage(keyPair.publicKey);
    });
  });

})();(() => {

  /*
  Store the calculated signature here, so we can verify it later.
  */
  let signature;

  /*
  Fetch the contents of the "message" textbox, and encode it
  in a form we can use for sign operation.
  */
  function getMessageEncoding() {
    const messageBox = document.querySelector("#ecdsa-message");
    let message = messageBox.value;
    let enc = new TextEncoder();
    return enc.encode(message);
  }

  /*
  Get the encoded message-to-sign, sign it and display a representation
  of the first part of it in the "signature" element.
  */
  async function signMessage(privateKey) {
    const signatureValue = document.querySelector(".ecdsa .signature-value");
    signatureValue.classList.remove("valid", "invalid");

    let encoded = getMessageEncoding();
    signature = await window.crypto.subtle.sign(
      {
        name: "ECDSA",
        hash: {name: "SHA-384"},
      },
      privateKey,
      encoded
    );

    signatureValue.classList.add('fade-in');
    signatureValue.addEventListener('animationend', () => {
      signatureValue.classList.remove('fade-in');
    });
    let buffer = new Uint8Array(signature, 0, 5);
    signatureValue.textContent = `${buffer}...[${signature.byteLength} bytes total]`;
  }

  /*
  Fetch the encoded message-to-sign and verify it against the stored signature.
  * If it checks out, set the "valid" class on the signature.
  * Otherwise set the "invalid" class.
  */
  async function verifyMessage(publicKey) {
    const signatureValue = document.querySelector(".ecdsa .signature-value");
    signatureValue.classList.remove("valid", "invalid");

    let encoded = getMessageEncoding();
    let result = await window.crypto.subtle.verify(
      {
        name: "ECDSA",
        hash: {name: "SHA-384"},
      },
      publicKey,
      signature,
      encoded
    );

    signatureValue.classList.add(result ? "valid" : "invalid");
  }

  /*
  Generate a sign/verify key, then set up event listeners
  on the "Sign" and "Verify" buttons.
  */
  window.crypto.subtle.generateKey(
    {
      name: "ECDSA",
      namedCurve: "P-384"
    },
    true,
    ["sign", "verify"]
  ).then((keyPair) => {
    const signButton = document.querySelector(".ecdsa .sign-button");
    signButton.addEventListener("click", () => {
      signMessage(keyPair.privateKey);
    });

    const verifyButton = document.querySelector(".ecdsa .verify-button");
    verifyButton.addEventListener("click", () => {
      verifyMessage(keyPair.publicKey);
    });
  });

})();(() => {

  /*
  Store the calculated signature here, so we can verify it later.
  */
  let signature;

  /*
  Fetch the contents of the "message" textbox, and encode it
  in a form we can use for sign operation.
  */
  function getMessageEncoding() {
    const messageBox = document.querySelector("#ecdsa-message");
    let message = messageBox.value;
    let enc = new TextEncoder();
    return enc.encode(message);
  }

  /*
  Get the encoded message-to-sign, sign it and display a representation
  of the first part of it in the "signature" element.
  */
  async function signMessage(privateKey) {
    const signatureValue = document.querySelector(".ecdsa .signature-value");
    signatureValue.classList.remove("valid", "invalid");

    let encoded = getMessageEncoding();
    signature = await window.crypto.subtle.sign(
      {
        name: "ECDSA",
        hash: {name: "SHA-384"},
      },
      privateKey,
      encoded
    );

    signatureValue.classList.add('fade-in');
    signatureValue.addEventListener('animationend', () => {
      signatureValue.classList.remove('fade-in');
    });
    let buffer = new Uint8Array(signature, 0, 5);
    signatureValue.textContent = `${buffer}...[${signature.byteLength} bytes total]`;
  }

  /*
  Fetch the encoded message-to-sign and verify it against the stored signature.
  * If it checks out, set the "valid" class on the signature.
  * Otherwise set the "invalid" class.
  */
  async function verifyMessage(publicKey) {
    const signatureValue = document.querySelector(".ecdsa .signature-value");
    signatureValue.classList.remove("valid", "invalid");

    let encoded = getMessageEncoding();
    let result = await window.crypto.subtle.verify(
      {
        name: "ECDSA",
        hash: {name: "SHA-384"},
      },
      publicKey,
      signature,
      encoded
    );

    signatureValue.classList.add(result ? "valid" : "invalid");
  }

  /*
  Generate a sign/verify key, then set up event listeners
  on the "Sign" and "Verify" buttons.
  */
  window.crypto.subtle.generateKey(
    {
      name: "ECDSA",
      namedCurve: "P-384"
    },
    true,
    ["sign", "verify"]
  ).then((keyPair) => {
    const signButton = document.querySelector(".ecdsa .sign-button");
    signButton.addEventListener("click", () => {
      signMessage(keyPair.privateKey);
    });

    const verifyButton = document.querySelector(".ecdsa .verify-button");
    verifyButton.addEventListener("click", () => {
      verifyMessage(keyPair.publicKey);
    });
  });

})();