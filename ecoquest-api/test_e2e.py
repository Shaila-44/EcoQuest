import httpx
import uuid
import sys

BASE_URL = "http://localhost:8000/api/v1"

def print_step(msg):
    print(f"\n--- {msg} ---")

def run_test():
    client = httpx.Client(base_url=BASE_URL)
    
    # 1. Register Student
    print_step("Register Student")
    student_email = f"student_{uuid.uuid4().hex[:6]}@example.com"
    r = client.post("/auth/register", json={
        "email": student_email,
        "password": "Password123!",
        "full_name": "Test Student",
        "role_name": "Student",
        "school_code": "ECO001"
    })
    print(r.status_code, r.text)
    if r.status_code != 201:
        print("Registration failed")
        return
        
    # 2. Login Student
    print_step("Login Student")
    r = client.post("/auth/login", json={
        "email": student_email,
        "password": "Password123!"
    })
    print(r.status_code, r.text)
    if r.status_code != 200:
        print("Login failed")
        return
    token = r.json()["access_token"]
    student_client = httpx.Client(base_url=BASE_URL, headers={"Authorization": f"Bearer {token}"})
    
    # 3. Get Student Profile
    print_step("Get Student Profile")
    r = student_client.get("/auth/me")
    print(r.status_code, r.text)
    student_id = r.json()["user_id"]
    
    # 4. List Challenges
    print_step("List Challenges")
    r = student_client.get("/challenges")
    print(r.status_code, r.text)
    challenges = r.json()
    if not challenges:
        print("No challenges found")
        # Let's create one (needs admin? Let's assume auth ignores or anyone can for now)
        return
        
    challenge_id = challenges[0]["challenge_id"]
    
    # 5. Submit Challenge
    print_step("Submit Challenge")
    r = student_client.post("/submissions", json={
        "challenge_id": challenge_id,
        "image_url": "http://example.com/image.jpg",
        "description": "I planted a tree!"
    })
    print(r.status_code, r.text)
    if r.status_code != 201:
        print("Submission failed")
        return
    submission_id = r.json()["submission_id"]
    
    # 6. Register & Login Teacher
    print_step("Register & Login Teacher")
    teacher_email = f"teacher_{uuid.uuid4().hex[:6]}@example.com"
    r = client.post("/auth/register", json={
        "email": teacher_email,
        "password": "Password123!",
        "full_name": "Test Teacher",
        "role_name": "Teacher",
        "school_code": "ECO001"
    })
    print("Teacher Register:", r.status_code)
    
    r = client.post("/auth/login", json={
        "email": teacher_email,
        "password": "Password123!"
    })
    print("Teacher Login:", r.status_code)
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
        "comment": "Great job!",
        "points_override": 10
    })
    print(r.status_code, r.text)
    
    # 9. Get Leaderboard
    print_step("Get Leaderboard")
    r = student_client.get("/leaderboard")
    print(r.status_code, r.text)
    
    print_step("SUCCESS")
    
run_test()
