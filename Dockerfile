FROM node:14.17.6

WORKDIR /usr/local/workspace

COPY ./yuecaimaster .

WORKDIR /usr/local/workspace/web

RUN npm install \ 
    && npm run build \
    && cp -r ./dist ../api/public

WORKDIR /usr/local/workspace/api

RUN npm install

EXPOSE 3100

CMD [ "npm", "run","serve" ]

