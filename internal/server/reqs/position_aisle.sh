#!/usr/bin/env nix-shell
#! nix-shell -i bash --pure
#! nix-shell -p bash httpie jq
#! nix-shell -I nixpkgs=https://github.com/NixOS/nixpkgs/archive/ecbc30d5ed9f75449233b17d4a4cdeab53af793f.tar.gz

source ./reqs/login.sh

API_PATH="localhost:8080/api/v1/aisles/"

NAME="aisle name"
NEW_NAME="aisle new name"

echo "LOG: $ACCESS_TOKEN"

NEW_ID=$(
  http -A bearer -a $ACCESS_TOKEN GET $API_PATH |
    jq -r ".data[] | select(.name == \"$NAME\") | .id")

if [ -n "$NEW_ID" ]; then
  echo "LOG: Dummy item present, deleting it"
  DELETE_ID=$(
    http -A bearer -a $ACCESS_TOKEN DELETE $API_PATH$NEW_CATEGORY_ID |
      jq -r '.code')
fi

POST=$(
  http -A bearer -a $ACCESS_TOKEN POST $API_PATH \
  name="$NAME" |
    jq -r '.code') 

NEW_ID=$(
  http -A bearer -a $ACCESS_TOKEN GET $API_PATH |
    jq -r ".data[] | select(.name == \"$NAME\") | .id")

echo "LOG: $NEW_ID"

UPDATE=$(
  http -A bearer -a $ACCESS_TOKEN PUT $API_PATH$NEW_ID \
  name="$NEW_NAME" |
    jq -r '.code')

GET=$(
  http -A bearer -a $ACCESS_TOKEN GET $API_PATH |
    jq -r '.code')

GET_ID=$(
  http -A bearer -a $ACCESS_TOKEN GET $API_PATH$NEW_ID |
    jq -r '.code')

DELETE_ID=$(
  http -A bearer -a $ACCESS_TOKEN DELETE $API_PATH$NEW_ID |
    jq -r '.code')

echo "POST ./items/ $POST"
echo "PUT ./items/ $UPDATE"
echo "GET ./items/ $GET"
echo "GET ./items/$NAME $GET_ID"
echo "DELETE ./items/ $DELETE_ID"
