FROM node:12 as builder
WORKDIR /app
COPY . .
RUN npm install
RUN node build.js

FROM nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
