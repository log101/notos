FROM ruby:2.7.6

LABEL maintainer="log101"

RUN curl -fsSL https://deb.nodesource.com/setup_16.x | bash -
RUN apt-get update -yqq && apt-get install -yqq --no-install-recommends \
    nodejs

RUN npm install --global yarn

COPY Gemfile* /usr/src/app/
COPY package.json /usr/src/app/
COPY yarn.lock /usr/src/app/

WORKDIR /usr/src/app
RUN bundle install
RUN yarn add @rails/webpacker
RUN yarn install --check-files

COPY . /usr/src/app

CMD ["bin/rails", "s", "-b", "0.0.0.0"]