// EcoQuest — API Client
//
// Thin fetch wrapper around the ecoquest-api backend. Auth is cookie-based
// (HttpOnly access_token cookie set by the backend), so every request is
// sent with credentials: 'include'. Endpoints that need it also get the
// token from localStorage as a Bearer fallback (useful if third-party
// cookie handling ever gets in the way in dev).

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1';

class ApiError extends Error {
  constructor(message, status, details) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.details = details;
  }
}

async function request(path, { method = 'GET', body, headers = {} } = {}) {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    method,
    credentials: 'include',
    headers: {
      ...(body ? { 'Content-Type': 'application/json' } : {}),
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (res.status === 204) return null;

  let data = null;
  const text = await res.text();
  if (text) {
    try {
      data = JSON.parse(text);
    } catch {
      data = text;
    }
  }

  if (!res.ok) {
    const message =
      data?.error?.message || data?.detail || (typeof data === 'string' ? data : 'Request failed');
    throw new ApiError(message, res.status, data?.error?.details);
  }

  return data;
}

export const api = {
  // ----- Auth -----
  register: (payload) => request('/auth/register', { method: 'POST', body: payload }),
  login: (email, password) => request('/auth/login', { method: 'POST', body: { email, password } }),
  logout: () => request('/auth/logout', { method: 'POST' }),
  me: () => request('/auth/me'),
  sessions: () => request('/auth/sessions'),

  // ----- Challenges -----
  listChallenges: () => request('/challenges'),
  getDailyChallenge: () => request('/challenges/daily'),
  getChallenge: (id) => request(`/challenges/${id}`),
  createChallenge: (payload) => request('/challenges', { method: 'POST', body: payload }),
  updateChallenge: (id, payload) => request(`/challenges/${id}`, { method: 'PUT', body: payload }),
  deleteChallenge: (id) => request(`/challenges/${id}`, { method: 'DELETE' }),
  listChallengeSubmissions: (id) => request(`/challenges/${id}/submissions`),

  // ----- Submissions -----
  getUploadUrl: (folder) =>
    request(`/submissions/upload-url${folder ? `?folder=${encodeURIComponent(folder)}` : ''}`, {
      method: 'POST',
    }),
  createSubmission: (payload) => request('/submissions', { method: 'POST', body: payload }),
  listSubmissions: () => request('/submissions'),
  getSubmission: (id) => request(`/submissions/${id}`),
  cancelSubmission: (id) => request(`/submissions/${id}`, { method: 'DELETE' }),

  // ----- Reviews (teacher) -----
  listPendingReviews: () => request('/reviews/pending'),
  createReview: (payload) => request('/reviews', { method: 'POST', body: payload }),
  getReviewHistory: (submissionId) => request(`/reviews/${submissionId}`),

  // ----- Leaderboard -----
  getLeaderboard: () => request('/leaderboard'),
  getSchoolLeaderboard: (schoolId) => request(`/leaderboard/school/${schoolId}`),
  getMyRank: () => request('/leaderboard/me'),

  // ----- Gamification -----
  getMyStats: () => request('/gamification/stats/me'),
  getMyBadges: () => request('/gamification/badges/me'),

  // ----- Users (admin) -----
  listUsers: () => request('/users'),
  getUser: (id) => request(`/users/${id}`),
  deactivateUser: (id) => request(`/users/${id}/deactivate`, { method: 'POST' }),
};

/** Upload a File directly to Cloudinary using a signed payload from the backend. */
export async function uploadImageToCloudinary(file, folder) {
  const signed = await api.getUploadUrl(folder);

  const form = new FormData();
  form.append('file', file);
  form.append('api_key', signed.api_key);
  form.append('timestamp', signed.timestamp);
  form.append('signature', signed.signature);
  form.append('folder', signed.folder);
  form.append('public_id', signed.public_id);

  const res = await fetch(signed.upload_url, { method: 'POST', body: form });
  const data = await res.json();
  if (!res.ok) {
    throw new ApiError(data?.error?.message || 'Image upload failed', res.status, data);
  }
  return data.secure_url || data.url;
}

export { ApiError };
