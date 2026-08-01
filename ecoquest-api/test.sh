#!/bin/bash
set -e

echo "=== 0. Test Registration Disabled ==="
curl -s -X POST "http://localhost:8000/api/v1/auth/register" \
  -H "Content-Type: application/json" \
  -d '{"email": "anyone@example.com", "password": "Password123!", "first_name": "Test", "last_name": "Student", "role": "Student"}' > res.json
cat res.json | jq .

echo -e "\n=== 1. Login Student ==="
curl -s -c cookies.txt -X POST "http://localhost:8000/api/v1/auth/login" \
  -H "Content-Type: application/json" \
  -d '{"email": "student1@ecoquest.com", "password": "Student123!"}' > res.json
cat res.json | jq .
TOKEN=$(jq -r '.access_token' res.json)

echo -e "\n=== 2. Get Me ==="
curl -s -b cookies.txt "http://localhost:8000/api/v1/auth/me" > res.json
cat res.json | jq .

echo -e "\n=== 3. List Challenges ==="
curl -s -b cookies.txt "http://localhost:8000/api/v1/challenges" > res.json
cat res.json | jq .

echo -e "\n=== 4. Get Daily Challenge ==="
curl -s -b cookies.txt "http://localhost:8000/api/v1/challenges/daily" > res.json
cat res.json | jq .
CHALLENGE_ID=$(jq -r '.challenge_id' res.json)

if [ "$CHALLENGE_ID" = "null" ]; then
    echo "No challenge found. Aborting."
    exit 1
fi

echo -e "\n=== 5. Submit Challenge ==="
curl -s -b cookies.txt -X POST "http://localhost:8000/api/v1/submissions" \
  -H "Content-Type: application/json" \
  -d '{"challenge_id": "'$CHALLENGE_ID'", "title": "Planted a tree", "image_url": "http://example.com/image.jpg", "description": "I planted a tree!"}' > res.json
cat res.json | jq .
SUB_ID=$(jq -r '.submission_id' res.json)

echo -e "\n=== 6. Login Teacher ==="
curl -s -c cookies_t.txt -X POST "http://localhost:8000/api/v1/auth/login" \
  -H "Content-Type: application/json" \
  -d '{"email": "teacher1@ecoquest.com", "password": "Teacher123!"}' > res.json
cat res.json | jq .

echo -e "\n=== 7. Get Pending Reviews ==="
curl -s -b cookies_t.txt "http://localhost:8000/api/v1/reviews/pending" > res.json
cat res.json | jq .

echo -e "\n=== 8. Approve Submission ==="
curl -s -b cookies_t.txt -X POST "http://localhost:8000/api/v1/reviews" \
  -H "Content-Type: application/json" \
  -d '{"submission_id": "'$SUB_ID'", "decision": "approved", "comment": "Great job!", "points_override": 10}' > res.json
cat res.json | jq .

echo -e "\n=== 9. Check Leaderboard ==="
curl -s -b cookies.txt "http://localhost:8000/api/v1/leaderboard" > res.json
cat res.json | jq .

