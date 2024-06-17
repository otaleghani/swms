#!/usr/bin/env nix-shell
#! nix-shell -i bash --pure
#! nix-shell -p bash httpie jq go
#! nix-shell -I nixpkgs=https://github.com/NixOS/nixpkgs/archive/ecbc30d5ed9f75449233b17d4a4cdeab53af793f.tar.gz

source ./reqs/login.sh

ITEMS_PATH="localhost:8080/api/v1/items/"

NAME="item"
NEW_NAME="item 2"
DESC="some"

echo "LOG: $ACCESS_TOKEN"

NEW_ITEM_ID=$(
  http -A bearer -a $ACCESS_TOKEN GET $ITEMS_PATH |
    jq -r ".data[] | select(.name == \"$NAME\") | .id")

if [ -n "$NEW_ITEM_ID" ]; then
  echo "LOG: Dummy item present, deleting it"
  DELETE_ID=$(
    http -A bearer -a $ACCESS_TOKEN DELETE $ITEMS_PATH$NEW_ITEM_ID |
      jq -r '.code')
fi

POST=$(
  http -A bearer -a $ACCESS_TOKEN POST $ITEMS_PATH \
  name="$NAME" \
  description="$DESC" |
    jq -r '.code') 

NEW_ITEM_ID=$(
  http -A bearer -a $ACCESS_TOKEN GET $ITEMS_PATH |
    jq -r ".data[] | select(.name == \"$NAME\") | .id")

echo $NEW_ITEM_ID

UPDATE=$(
  http -A bearer -a $ACCESS_TOKEN PUT $ITEMS_PATH$NEW_ITEM_ID \
  name="$NEW_NAME" |
    jq -r '.code')

GET=$(
  http -A bearer -a $ACCESS_TOKEN GET $ITEMS_PATH |
    jq -r '.code')

GET_ID=$(
  http -A bearer -a $ACCESS_TOKEN GET $ITEMS_PATH$NEW_ITEM_ID |
    jq -r '.code')

DELETE_ID=$(
  http -A bearer -a $ACCESS_TOKEN DELETE $ITEMS_PATH$NEW_ITEM_ID |
    jq -r '.code')

echo "POST ./items/ $POST"
echo "PUT ./items/ $UPDATE"
echo "GET ./items/ $GET"
echo "GET ./items/$NAME $GET_ID"
echo "DELETE ./items/ $DELETE_ID"
