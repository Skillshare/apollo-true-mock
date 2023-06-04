FROM oven/bun:0.6.6

RUN apt-get update

RUN apt-get -y install curl

RUN curl -sSL https://rover.apollo.dev/nix/latest | sh

ENV PATH=$PATH:/root/.rover/bin

COPY bun.lockb package.json .
RUN bun install
COPY . .
EXPOSE 8080
CMD ["/bin/sh", "./entrypoint.sh"]