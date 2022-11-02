FROM python:3.9-slim-buster

# set working directory
WORKDIR /usr/src/fitness-web-app

# set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# install system dependencies
RUN apt-get update \
  && apt-get -y install netcat gcc postgresql \
  && apt-get clean

# add and install requirements
COPY ./requirements.txt .
RUN pip install -r requirements.txt

# add entrypoint.sh
COPY ./entrypoint_socket.sh /usr/src/fitness-web-app/entrypoint_socket.sh
RUN chmod +x /usr/src/fitness-web-app/entrypoint_socket.sh

# add app
COPY . .
