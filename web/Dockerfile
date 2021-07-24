FROM node:14.16.0

RUN mkdir app
WORKDIR /app

# Copy release files
ADD build .
ADD VERSION .
ADD entrypoint.sh .
RUN chmod +x entrypoint.sh

# Env variables
ENV REACT_APP_API_URL=http://localhost:4000/api

# Expose relevant ports
EXPOSE 5000

ENTRYPOINT ["./entrypoint.sh"]