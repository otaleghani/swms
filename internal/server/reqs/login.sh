#!/usr/bin/env nix-shell
#! nix-shell -i bash --pure
#! nix-shell -p bash httpie jq go
#! nix-shell -I nixpkgs=https://github.com/NixOS/nixpkgs/archive/ecbc30d5ed9f75449233b17d4a4cdeab53af793f.tar.gz

# Run this script in the ./server 

rm test.db
go test -v &
export GO_PID=$!
echo $GO_PID

USERS_PATH="localhost:8080/api/v1/users/"
LOGIN_PATH="localhost:8080/api/v1/login/"

USER_PASSWORD="asd"
USER_EMAIL="some@thing.com"

# creates user
POST=$(
  http POST $USERS_PATH \
  email="$USER_EMAIL" \
  password="$USER_PASSWORD" |
    jq -r '.code')

if [ $POST = "201" ]; then
  echo "LOG: Item added, logging in"
else 
  echo "LOG: Already present, logging in"
fi


# gets access / refresh token
export ACCESS_TOKEN=$(
  http POST $LOGIN_PATH \
  email=$USER_EMAIL \
  password=$USER_PASSWORD |
    jq -r '.accessToken')

export REFRESH_TOKEN=$(
  http POST $LOGIN_PATH \
  email=$USER_EMAIL \
  password=$USER_PASSWORD |
    jq -r '.refreshToken')


# EMAIL=$(
#   http GET localhost:8080/api/v1/users/ | 
#   jq -r '.data[] | select(.email == "some@thing.com") | .email')
# echo $ACCESSTOKEN 
# GETITEMS=$(
#   http -A bearer -a $ACCESSTOKEN GET $ITEMS | 
#     jq -r '.code')
# 
# 
# POSTITEMS=$(
#   http -A bearer -a $ACCESSTOKEN POST $ITEMS \
#   name=$INAME \
#   description=$IDESC |
#     jq -r '.code') 
# 
# ITEMID=$(
#   http -A bearer -a $ACCESSTOKEN GET $ITEMS |
#     jq -r '.data[] | select(.name == "item") | .id')
# 
# # GETITEM=$(
# #   http -A bearer -a $ACCESSTOKEN GET $ITEMS/$ITEMID |
# #     jq -r '.code')
# 
# echo "GET ./items/ $GETITEMS"
# echo "POST ./items/ $POSTITEMS"
# echo "GET ./items/ $ITEMID"
# 
