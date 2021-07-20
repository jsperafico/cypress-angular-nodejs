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
index="proxy" AND (uri_path="/api*" OR uri_path="/splunk*") | rex field=uri_path "(?<uri_path>/api|/splunk)" | stats count by uri_path,http_method | replace "DEL*TE" with "Delete" in http_method
```

```
index="proxy" AND (uri_path="/api*" OR uri_path="/splunk*") | where not like(uri_path, "/splunk/en-US/splunkd/__raw/%") | stats count by uri_path,http_method
```

```
index="proxy" AND (uri_path="/api*" OR uri_path="/splunk*") | rex field=uri_path "(?<uri_path>/api|/splunk)" | stats count by uri_path,http_method | xyseries uri_path,http_method,count | fillnull value=0
```

```
index="proxy" AND (uri_path="/api*" OR uri_path="/splunk*") | rex field=uri_path "(?<uri_path>/api|/splunk)" | stats count by uri_path,http_method | table http_method,count | stats values(*) as *, sum(count) as count by http_method
```

# Splunk Base search for Dashboard

The goal of this feature is to minimize the amount of time to render a dashboard if you have multiple graphs and tables.

Once inside your dashboard, click on `Edit` and go to `Source` option aside `UI`.

You will see that each panel contains it's own query. Let's assume that you had the following queries in your dashboard:

```xml
<search>
    <query>index="proxy" AND (uri_path="/api*" OR uri_path="/splunk*") | rex field=uri_path "(?&lt;uri_path&gt;/api|/splunk) | stats count by uri_path,http_method | xyseries uri_path,http_method,count | fillnull value=0</query>
</search>
```

```xml
<search>
    <query>index="proxy" AND (uri_path="/api*" OR uri_path="/splunk*") | rex field=uri_path "(?&lt;uri_path&gt;/api|/splunk) | stats count by uri_path,http_method | table http_method,count | stats values(*) as *, sum(count) as count by http_method</query>
</search>
```

To reduce the amount of queries being performed, you can isolate the common statement into a single search execution. In order to do this, please add a `search` tag with an id under the `dashboard` tag. Please keep in mind that you will need to add `| table *` at the end of your `common_search` query.

```xml
<dashboard>
  <search id="common_search">
    <query>index="proxy" AND (uri_path="/api*" OR uri_path="/splunk*") | rex field=uri_path "(?&lt;uri_path&gt;/api|/splunk) | table *"</query>
    <earliest>-24h@h</earliest>
    <latest>now</latest>
    <sampleRatio>1</sampleRatio>
  </search>
  ...
</dashboard>
```

After edit all `search` tags that share the same base query, by given an attribute called `base`. 

```xml
<search base="common_search">
    <query>| stats count by uri_path,http_method | xyseries uri_path,http_method,count | fillnull value=0</query>
</search>
```

At the end of the process, you will have something like this:

```xml
<dashboard>
  <search id="common_search">
    <query>index="proxy" AND (uri_path="/api*" OR uri_path="/splunk*") | rex field=uri_path "(?&lt;uri_path&gt;/api|/splunk)" | table *</query>
    <earliest>$period.earliest$</earliest>
    <latest>$period.latest$</latest>
    <sampleRatio>1</sampleRatio>
  </search>

  <fieldset submitButton="false">
    <input type="time" token="period">
      <label>Please choose a period</label>
      <default>
        <earliest>-24h@h</earliest>
        <latest>now</latest>
      </default>
    </input>
  </fieldset>

  <label>my_awesome_dashboard</label>
  <row>
    <panel>
      <title>HTTP Methods for different Endpoints</title>
      <chart>
        <search base="common_search">
          <query>| stats count by uri_path,http_method | xyseries uri_path,http_method,count | fillnull value=0</query>
        </search>
        ...
      </chart>
    </panel>
  </row>
  <row>
    <panel>
      <title>HTTP Methods independently of Endpoint</title>
      <chart>
        <search base="common_search">
          <query>| stats count by uri_path,http_method | table http_method,count | stats values(*) as *, sum(count) as count by http_method</query>
        </search>
        ...
      </chart>
    </panel>
  </row>
</dashboard>
```