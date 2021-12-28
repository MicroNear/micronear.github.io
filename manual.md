# Maintenance manual
Micronear consists of two separate parts - the backend and the frontend.

## Backend (server)
Backend has been written in JavaScript, it uses the DENO runtime. It's like NODE but newer.
The server uses a large amount of beta/experimental modules and therefore they might change in the future.
Warning: Linux is CaSe sEnsiTivE.

Some useful linux commands:
- Update the app library: `sudo apt update`
- Update all apps: `sudo apt upgrade`
- Install openssl: `sudo apt install openssl`
- List current folder: `ls`
- Remove a file: `rm file.txt`
- Remove a folder: `rm myfolder -Rf`
- Rename a file: `mv data.txt renamed.txt`
- Move a file: `mv gum.txt trash/gum.txt`
- Run deno: `sudo paste_deno_path_here run paste_permissions_here --unstable paste_file_path_here`, for example `sudo /home/micronear/.deno/bin/deno run --allow-net --allow-read --allow-write --unstable backend/app.js`
- Screen will keep deno running even if you exit the terminal. `screen command ...` or `sudo screen command ...`. CTRL+C will stop the screen so rather close the window.
- Re-attach the screen with: `sudo screen -ls`, copy the screen id and then run `sudo screen -r paste_screen_id`
- Encrypt backup (or any data): `openssl enc -aes-256-cbc -pbkdf2 -in backup.json -out encryptedbackup.enc`
- Decrypt backup (or any data): `openssl enc -d -aes-256-cbc -pbkdf2 -in encryptedbackup.enc -out decryptedbackup.json`

### Setting up a Micronear server
- Install linux on your server, preferably latest Ubuntu or Debian.
- Make sure everything is up to date.
- Install the deno runtime
- Install mongodb (follow official instructions on docs.mongodb.com).
- Download the Micronear backend repository into a new `micronear` folder.
- (optional) For increased security, create a MongoDB account for Micronear and insert the credentials to `micronear/mongoauth.js`. Then edit the MongoDB config to require authentication.
- Set up your DNS server. Create a record pointing from desired subdomain to the ip of your server. This step is required in order to obtain a TLS certificate. For example, create an "A" record pointing from "api" (or api.yourdomain.com) to the WAN IP of your server.
- A TLS certificate is needed to enable HTTPS and encrypt the connection. Certbot can issue such certificates for free. Install Certbot on your server and request a TLS certificate for the subdomain mentioned above. (https://certbot.eff.org/instructions?ws=other&os=ubuntufocal). Then copy paths of the certificates from terminal.
- Edit the `micronear/app.js` file and insert the copied paths of the certificates.
- Set the TESTING variable to false in `micronear/app.js`. This will enable the TLS to encrypt the connection (HTTP + Secure = HTTPS).

#### Starting a MongoDB server
`sudo service mongod start`

#### Starting the server
Mongo must be running and there must not be any webserver making use of the 443 port.
- `cd micronear`
- `sudo screen /home/micronear/.deno/bin/deno run --allow-net --allow-read --allow-write --unstable backend/app.js`

### Backups
Backup the data periodically. It's highly advised to encrypt the backups.

#### Importing the database
If you have a backup, transfer it to the `micronear/` folder and cd there. Decrypt the file, if it's been encrypted and then import it using `sudo /home/micronear/.deno/bin/deno run --allow-all --unstable importdb.js decryptedbackup.json`.

#### Exporting the database
To export the database, cd into `micronear/` and run `sudo /home/micronear/.deno/bin/deno run --allow-all --unstable exportdb.js dump.json`. This will create a database dump in json. Do encrypt it and remove the original dump.

### Administration
All admin keys are listed in the `micronear/apikeys.js` file.

`apikeys.js`
```js
export const mongodatabase = "micronear"
export const mongousername = "cupertino"
export const mongopassword = "cupertino2021"
```

#### Adding an admin
Add a new entry to the apikeys file. Follow this format: `"sha256(newpassword)": "Name of the Admin",`.
Do not request raw passwords from admins. Instead, request a sha256 hashsum instead. For example: `"f6f9c5f004b4e5b525d9712aaafefcf17a8e93130541a137e5d7d9cf495a50f9": "John Doe",`.

#### Removing an admin
Remove their entry from the apikeys file.

#### Editing micronations as admin
Use your admin key just like password to edit any micronation. Tick the "Update password" option to reset the micronation's password. Note: This won't change your admin key.

#### Removing micronations as admin
From the edit page. Use your admin key to login.

#### Verifying micronations
Use your admin key just like password on the verification page. If you verify a micronation second time, it will lose verification (it inverts the verified status).

### Updating the backend
- Update the linux distro
- Update (install) deno
- Update mongo

## Frontend (app)
Micronear is a Web App - it's a website wrapped into an app. It uses HTML, CSS, JS and markdown. It is hosted on GitHub pages for free.

### Updating frontend
Change the version number in `/sw.js` to force users' devices to load new code (to update the app).
When changing the domain, the app also needs to be recompiled and reuploaded to the Google Play Store. Use https://pwabuilder.com and enable "location delegation".

### iOS
Micronear can be compiled using pwabuilder.com and added to the App Store, but you need a macbook and 100$/y to do it.

### Frontend note
The front end uses outdated Material Design Lite library. Please do rewrite it into React, Vue, Material.js, Material Components, or something similar to improve the performance and UX.

<br><br><br>