FROM node:14.17.6

WORKDIR /usr/local/workspace

COPY ./yuecaimaster .

WORKDIR /usr/local/workspace/web

RUN yarn install \ 
    && yarn build \
    && cp -r ./dist ../api/public

WORKDIR /usr/local/workspace/api

RUN yarn install

EXPOSE 3100

CMD [ "yarn","serve" ]

