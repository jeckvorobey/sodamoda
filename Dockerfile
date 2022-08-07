FROM node:12.22.5

RUN mkdir -p /app

EXPOSE 3000

COPY ./ /app
WORKDIR /app
RUN npm install
RUN npm build

CMD [ "npm", "start" ]
