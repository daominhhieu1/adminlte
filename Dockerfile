FROM node:16 
 
# Note: this installs the necessary libs to make the bundled version of Chromium that Puppeteer
# installs, work.

RUN apt-get update \
    && apt-get install -y 
WORKDIR /manage-admin/app
ADD . /manage-admin/app
RUN npm install --save 
RUN npm install --verbose 
