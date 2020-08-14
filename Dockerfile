FROM node:12.16.1-alpine3.9 as build

MAINTAINER Saurabh Srivastava (saurass.in)

WORKDIR /tinyurl_frontend
COPY package*.json /tinyurl_frontend/
RUN yarn
COPY . /tinyurl_frontend
RUN yarn build

FROM nginx:alpine

MAINTAINER Saurabh Srivastava (saurass.in)

COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /tinyurl_frontend/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]