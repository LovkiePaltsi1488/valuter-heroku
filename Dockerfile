FROM node:current-alpine3.10
WORKDIR /server
EXPOSE 1488
COPY . /server
RUN npm i
CMD ["node", "app/app.js"]
