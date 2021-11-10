confluent local services start

docker run -v $(pwd)/expectations:/config -p 1080:1080  mockserver/mockserver -serverPort 1080

# export MOCKSERVER_INITIALIZATION_JSON_PATH=./expectations/mastery-api.json
# mockserver -serverPort 1080 -logLevel DEBUG
