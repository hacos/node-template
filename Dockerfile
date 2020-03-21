FROM keymetrics/pm2:10-jessie
WORKDIR /code

# Install things I like
RUN apt-get update && apt-get install -y vim wget unzip jq

# Bundle APP files
COPY lib lib/
COPY node_modules node_modules/
COPY public public/
COPY test test/
COPY package.json *.js .npmrc .env ./

CMD [ "pm2-runtime", "start", "ecosystem.config.js" ]
