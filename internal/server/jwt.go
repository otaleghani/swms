package server

import (
  "os"
  "time"
  "errors"
  "crypto/rand"
  "encoding/base64"

  "github.com/golang-jwt/jwt/v5"
)

func generateJwtSecret(length int) (error) {
  // Calculate the number of random bytes needed
  n := (length * 3) / 4

  // Create a slice to hold the random bytes
  randomBytes := make([]byte, n)

  // Read random bytes
  _, err := rand.Read(randomBytes)
  if err != nil {
    return err
  }

  // Encode the random bytes to a base64 string
  randomString := base64.URLEncoding.EncodeToString(randomBytes)

  err = os.Setenv("JWT_SECRET", randomString[:length])
  if err != nil {
    return err
  }

  // Return the string truncated to the desired length
  return nil
}

// Gets the JWT access token
func getAccessToken(id string) (string, error) {
  jwtSecret := os.Getenv("JWT_SECRET")

  claims := jwt.RegisteredClaims{
    ExpiresAt: jwt.NewNumericDate(time.Now().Add(1 * time.Hour)),
    IssuedAt: jwt.NewNumericDate(time.Now()),
    Issuer: "swms",
    Subject: id,
  }

  token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
  ss, err := token.SignedString([]byte(jwtSecret))
  if err != nil {
    return "", err
  }

  return ss, nil
}

// Get the JWT refresh token
func getRefreshToken(id string) (string, error) {
  jwtSecret := os.Getenv("JWT_SECRET")

  claims := jwt.RegisteredClaims{
    ExpiresAt: jwt.NewNumericDate(time.Now().Add(1440 * time.Hour)),
    IssuedAt: jwt.NewNumericDate(time.Now()),
    Issuer: "swms_refresh",
    Subject: id,
  }

  token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
  ss, err := token.SignedString([]byte(jwtSecret))
  if err != nil {
    return "", err
  }

  return ss, nil
}

func checkAccessToken(tokenStr string) (bool, error) {
  jwtSecret := os.Getenv("JWT_SECRET")
  var claims jwt.RegisteredClaims
  token, err := jwt.ParseWithClaims(tokenStr, &claims, 
    func(token *jwt.Token) (interface{}, error) {
      return []byte(jwtSecret), nil
    },
  )
  if err != nil {
    return false, err
  }
  if !token.Valid {
    return false, errors.New("jwt token invalid")
  }
  if claims.Issuer != "swms" {
    return false, errors.New("jwt token issuer does not match")
  }

  return true, nil
}

func refreshAccessToken(tokenStr string) (string, error) {
  jwtSecret := os.Getenv("JWT_SECRET")
  var claims jwt.RegisteredClaims
  token, err := jwt.ParseWithClaims(tokenStr, &claims, 
    func(token *jwt.Token) (interface{}, error) {
      return []byte(jwtSecret), nil
    },
  )
  if err != nil {
    return "", err
  }
  if !token.Valid {
    return "", errors.New("jwt token invalid")
  }
  if claims.Issuer != "swms-refresh" {
    return "", errors.New("jwt token issuer does not match")
  }

  accessTok, err := getAccessToken(claims.Subject)
  if err != nil {
    return "", err
  }

  return accessTok, nil
}
