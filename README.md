# Cypress, Angular, NodeJS, Nginx and Splunk

The goal of this project was to have a hands-on experience on the technology stack bellow and reference project to go back to whenever I felt the need to do it.

# Technology Stack

- NodeJS
- Angular
- Cypress
- Nginx
- Splunk

# How to Run?

If you want to run this project, please use docker. Is way simpler hehe.

Using the `terminal`, go to the root folder of this project, being the very same `folder` where this README.md file is located.

Run the following command:
```
docker-compose up -d
```

# How to access the angular application and splunk?

Splunk url: http://localhost:8080/splunk
Angular app: http://localhost:8080/

# Splunk access

User: admin
Password: Test1234

# Splunk queries

Usefull splunk queries:

```
index="proxy" AND (uri_path="/api*" OR uri_path="/splunk*") | rex field=uri_path "(?<uri_path>/api|/splunk)" | stats count by uri_path,http_method
```

```
index="proxy" AND (uri_path="/api*" OR uri_path="/splunk*") | rex field=uri_path "(?<uri_path>/api|/splunk)" | stats count by uri_path,http_method | xyseries uri_path,http_method,count | fillnull value=0
```