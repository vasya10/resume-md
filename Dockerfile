FROM node:14.4
LABEL version "1.0.0"
MAINTAINER "Vasu Srinivasan"

# Avoid dialog fontend known error
ARG TERM=linux
ARG DEBIAN_FRONTEND=noninteractive

RUN apt-get update -y \
    && apt-get install -y apt-utils apt-transport-https \
    && curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - \
    && echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list \
    && apt-get update \
    && apt-get install -y yarn

COPY . /opt/app/resume-md
WORKDIR /opt/app/resume-md
RUN yarn install
CMD [ "yarn" , "start" ]
