@"
FROM nginx:alpine

COPY build /usr/share/nginx/html

EXPOSE 7860

CMD ["nginx", "-g", "daemon off;"]
"@ | Set-Content Dockerfile