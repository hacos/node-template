FROM keymetrics/pm2:10-jessie

WORKDIR /code

# Bundle APP files
COPY lib lib/
COPY node_modules node_modules/
COPY public public/
COPY test test/
COPY package.json *.js .env ./

CMD [ "pm2-runtime", "start", "ecosystem.config.js" ]
