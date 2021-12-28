# Maintenance manual
Micronear consists of two separate parts - the backend and the frontend.

## Backend (server)
Backend has been written in JavaScript, it uses the DENO runtime. It's like NODE but newer.
The server uses a large amount of beta/experimental modules and therefore they might change in the future.
Warning: Linux is CaSe sEnsiTivE.

Some useful linux commands:
- Update the app library `sudo apt update`
- Update all apps `sudo apt upgrade`
- Install openssl `sudo apt install openssl`
- List current folder `ls`
- Remove a file `rm file.txt`
- Remove a folder `rm myfolder -Rf`
- Rename a file `mv data.txt renamed.txt`
- Move a file `mv gum.txt trash/gum.txt`
- Run deno `sudo paste_deno_path_here run paste_permissions_here --unstable paste_file_path_here`, for example `sudo /home/micronear/.deno/bin/deno run --allow-net --allow-read --allow-write --unstable backend/app.js`
- Screen will keep deno running even if you exit the terminal. `screen command ...` or `sudo screen command ...`. CTRL+C will stop the screen so rather close the window.
- Re-attach the screen with: `sudo screen -ls`, copy the screen id and then run `sudo screen -r paste_screen_id`

### Setting up a Micronear server
- Install linux on your server, preferably latest Ubuntu or Debian.
- Make sure everything is up to date.
- Install the deno runtime
- Install mongodb (follow official instructions on docs.mongodb.com).
- Download the Micronear backend repository into a new `micronear` folder.
- (optional) For increased security, create a MongoDB account for Micronear and insert the credentials to `micronear/mongoauth.js`. Then edit the MongoDB config to require authentication.
- Set up your DNS server. Create a record pointing from desired subdomain to the ip of your server. This step is required in order to obtain a TLS certificate. For example, create an "A" record pointing from "api" (or api.yourdomain.com) to the WAN IP of your server.
- A TLS certificate is needed to enable HTTPS and encrypt the connection. Certbot can issue such certificates for free. Install Certbot on your server and request a TLS certificate for the subdomain mentioned above. (https://certbot.eff.org/instructions?ws=other&os=ubuntufocal). Then copy paths of the certificates from terminal.
- Edit the `micronear/backend/app.js` file and insert the copied paths of the certificates.
- Set the TESTING variable to false in `micronear/backend/app.js`. This will enable the TLS to encrypt the connection (HTTP + Secure = HTTPS).

#### Starting a MongoDB server
`sudo service mongod start`

#### Loading a backup
If you have a backup, transfer it to the `micronear/` folder. If it's an encrypted file, decrypt it using `openssl enc -d -aes-256-cbc -pbkdf2 -in ./encrypted.enc -out decryptedbackup.json`.
Then import it. `sudo /home/micronear/.deno/bin/deno run --allow-all --unstable importdb.js decryptedbackup.json`

#### Starting the server
Mongo must be running and there must not be any webserver making use of the 443 port.
- `cd micronear`
- `sudo screen /home/micronear/.deno/bin/deno run --allow-net --allow-read --allow-write --unstable backend/app.js`



### Updating the backend

## Frontend (webapp)