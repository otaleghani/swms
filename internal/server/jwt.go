package server

import (
	"crypto/rand"
	"encoding/base64"
	"errors"
	"time"

	"github.com/golang-jwt/jwt/v5"
	"github.com/otaleghani/swms/internal/database"
)

func generateJwtSecret(length int, db *database.Database) error {
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

	err = db.Sorm.InsertInto(database.Metadata{Secret: randomString[:length]})
	if err != nil {
		return err
	}
	return nil
}

// Gets the JWT access token
func getAccessToken(id string, db *database.Database) (string, error) {
	// jwtSecret := os.Getenv("JWT_SECRET")
	metadata := []database.Metadata{}
	err := db.Sorm.Select(&metadata, "")
	if err != nil {
		return "", err
	}

	claims := jwt.RegisteredClaims{
		ExpiresAt: jwt.NewNumericDate(time.Now().Add(1 * time.Hour)),
		IssuedAt:  jwt.NewNumericDate(time.Now()),
		Issuer:    "swms",
		Subject:   id,
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	ss, err := token.SignedString([]byte(metadata[1].Secret))
	if err != nil {
		return "", err
	}

	return ss, nil
}

// Get the JWT refresh token
func getRefreshToken(id string, db *database.Database) (string, error) {
	// jwtSecret := os.Getenv("JWT_SECRET")
	metadata := []database.Metadata{}
	err := db.Sorm.Select(&metadata, "")
	if err != nil {
		return "", err
	}

	claims := jwt.RegisteredClaims{
		ExpiresAt: jwt.NewNumericDate(time.Now().Add(1440 * time.Hour)),
		IssuedAt:  jwt.NewNumericDate(time.Now()),
		Issuer:    "swms_refresh",
		Subject:   id,
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	ss, err := token.SignedString([]byte(metadata[1].Secret))
	if err != nil {
		return "", err
	}

	return ss, nil
}

func checkAccessToken(tokenStr string, db *database.Database) error {
	metadata := []database.Metadata{}
	err := db.Sorm.Select(&metadata, "")
	if err != nil {
		return err
	}
	var claims jwt.RegisteredClaims
	token, err := jwt.ParseWithClaims(tokenStr, &claims,
		func(token *jwt.Token) (interface{}, error) {
			return []byte(metadata[1].Secret), nil
		},
	)
	if err != nil {
		return err
	}
	if !token.Valid {
		return errors.New("jwt token invalid")
	}
	if claims.Issuer != "swms" {
		return errors.New("jwt token issuer does not match")
	}

	return nil
}

func checkRefreshToken(tokenStr string, db *database.Database) error {
	metadata := []database.Metadata{}
	err := db.Sorm.Select(&metadata, "")
	if err != nil {
		return err
	}
	var claims jwt.RegisteredClaims
	token, err := jwt.ParseWithClaims(tokenStr, &claims,
		func(token *jwt.Token) (interface{}, error) {
			return []byte(metadata[1].Secret), nil
		},
	)
	if err != nil {
		return err
	}
	if !token.Valid {
		return errors.New("jwt token invalid")
	}
	if claims.Issuer != "swms_refresh" {
		return errors.New("jwt token issuer does not match")
	}
	if err := db.CheckRevokedToken(tokenStr); err != nil {
		return err
	}

	return nil
}

func refreshAccessToken(tokenStr string, db *database.Database) (string, error) {
	metadata := []database.Metadata{}
	err := db.Sorm.Select(&metadata, "")
	if err != nil {
		return "", err
	}
	var claims jwt.RegisteredClaims
	token, err := jwt.ParseWithClaims(tokenStr, &claims,
		func(token *jwt.Token) (interface{}, error) {
			return []byte(metadata[1].Secret), nil
		},
	)
	if err != nil {
		return "", err
	}
	if !token.Valid {
		return "", errors.New("jwt token invalid")
	}
	if claims.Issuer != "swms_refresh" {
		return "", errors.New("jwt token issuer does not match")
	}

	accessTok, err := getAccessToken(claims.Subject, db)
	if err != nil {
		return "", err
	}

	return accessTok, nil
}
