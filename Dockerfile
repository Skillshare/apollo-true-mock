FROM oven/bun:0.6.6
COPY bun.lockb package.json .
RUN bun install
COPY . .
EXPOSE 8080
CMD ["/bin/sh", "./entrypoint.sh"]