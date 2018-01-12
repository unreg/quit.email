# quit.email

## Set invite url in server.conf, e.g. invite.domain.tld
```
modules {
    ...
    messaging
      {
      groups {
        invite {
          base-uri: "https://invite.domain.tld"
        }
      }
    }
    ...
}
```

## Get source
```
git clone https://github.com/unreg/quit.email
cd quit.email
```

## Edit `./app/js/utils/settings.js`, necessarily `serverDomain, joinLink, apiLink`
```
const path = {
  serverDomain: '', // server domain, e.g. 'actor.im'
  androidDownload: 'https://', // android app download, e.g. 'https://actor.im/android'
  iosDownload: 'https://', // ios app download, e.g. 'https://actor.im/ios'
  joinLink: 'https://', // e.g. https://app.actor.im'
  apiLink: 'https://', // same as base-url in server.conf,  e.g. 'https://api.actor.im'
  downloadLink: 'https://', // e.g. 'https://actor.im/dl
}
```

## Build and run

### Dependencies
```
npm i
```

### Build
```
gulp build --release
```

### Run
```
gulp dev
```

## Nginx settings for invite.domain.tld
```
server {
    listen 443 ssl http2;
    server_name invite.domain.tld;

    root /var/www/invite.domain.tld;

    location ^~ {
      proxy_set_header        Host $host;
      proxy_set_header        X-Real-IP $remote_addr;

      proxy_pass https://127.0.0.1:3000;
      proxy_redirect off;
    }

}
```

# Enjoy
