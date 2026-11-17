import httpx
import uuid
import sys
import io

BASE_URL = "http://localhost:8000/api/v1"

def print_step(msg):
    print(f"\n--- {msg} ---")

def run_test():
    client = httpx.Client(base_url=BASE_URL)
    
    # Login Student (Demo)
    print_step("Login Student")
    r = client.post("/auth/login", json={
        "email": "student1@ecoquest.com",
        "password": "Student123!"
    })
    print(r.status_code, r.text)
    token = r.json()["access_token"]
    student_client = httpx.Client(base_url=BASE_URL, headers={"Authorization": f"Bearer {token}"})
    
    # 4. List Challenges
    print_step("List Challenges")
    r = student_client.get("/challenges")
    print(r.status_code, r.text)
    challenges = r.json()
    challenge_id = challenges[1]["challenge_id"]
    
    # 4.5 Request Upload URL (Fallback test)
    print_step("Request Upload URL")
    r = student_client.post("/submissions/upload-url")
    print(r.status_code, r.text)
    upload_url = r.json()["upload_url"]
    
    # 4.6 Upload Local File
    print_step("Upload Local File")
    dummy_image = b"\xff\xd8\xffdummy_jpeg_data"
    files = {'file': ('test.jpg', dummy_image, 'image/jpeg')}
    # Since it's a fallback upload url, just post directly
    r = client.post(upload_url, files=files)
    print(r.status_code, r.text)
    local_image_url = r.json()["url"]
    
    # 5. Submit Challenge
    print_step("Submit Challenge")
    r = student_client.post("/submissions", json={
        "challenge_id": challenge_id,
        "image_url": local_image_url,
        "description": "I planted a tree! And this is local.", "title": "test"
    })
    print(r.status_code, r.text)
    submission_id = r.json()["submission_id"]
    
    # 6. Login Teacher
    print_step("Login Teacher")
    r = client.post("/auth/login", json={
        "email": "teacher1@ecoquest.com",
        "password": "Teacher123!"
    })
    t_token = r.json()["access_token"]
    teacher_client = httpx.Client(base_url=BASE_URL, headers={"Authorization": f"Bearer {t_token}"})
    
    # 7. Get Pending Reviews
    print_step("Get Pending Reviews")
    r = teacher_client.get("/reviews/pending")
    print(r.status_code, r.text)
    
    # 8. Create Review (Approve)
    print_step("Create Review (Approve)")
    r = teacher_client.post("/reviews", json={
        "submission_id": submission_id,
        "decision": "approved",
        "comment": "Great job testing local uploads!",
        "points_override": 15
    })
    print(r.status_code, r.text)
    
    print_step("SUCCESS")
    
run_test()
