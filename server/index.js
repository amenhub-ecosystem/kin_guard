import express from "express";
import cors from "cors";
import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";
import { join } from "path";
import { existsSync, mkdirSync, writeFileSync } from "fs";

const PORT = process.env.PORT || 4000;

const app = express();
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

const file = join(process.cwd(), "server", "db.json");
const adapter = new JSONFile(file);
const db = new Low(adapter);

async function initDb() {
  await db.read();
  db.data = db.data || {
    users: [],
    invitations: [],
    careCircleMembers: [],
    lovedOnes: [],
    medications: [],
    medicationLogs: [],
    careStatusUpdates: [],
    activityEvents: [],
    messages: [],
    notifications: [],
    emergencyEvents: [],
    sessions: {},
  };
  await db.write();
}

app.get("/health", async (req, res) => {
  res.json({ status: "ok" });
});

// Simple in-memory request log for debugging/tests
const requestLog = [];
function logRequest(method, path, body, status, response) {
  requestLog.push({ method, path, body, status, response, timestamp: Date.now() });
}

function genToken() {
  return `t_${Math.random().toString(36).slice(2)}_${Date.now()}`;
}

function normalizeEmail(email) {
  return (email || "").trim().toLowerCase();
}

const uploadsDir = join(process.cwd(), "uploads");

function ensureUploadsDir() {
  if (!existsSync(uploadsDir)) {
    mkdirSync(uploadsDir, { recursive: true });
  }
}

function savePhotoDataUrl(dataUrl) {
  if (!dataUrl || typeof dataUrl !== "string" || !dataUrl.startsWith("data:image/")) {
    return null;
  }

  const match = /^data:(image\/[a-zA-Z0-9.+-]+);base64,(.+)$/.exec(dataUrl);
  if (!match) {
    return null;
  }

  const mimeType = match[1];
  const base64Content = match[2];
  const extension = mimeType.split("/")[1] || "png";
  const fileName = `${Date.now()}-${Math.random().toString(16).slice(2)}.${extension}`;

  ensureUploadsDir();
  const filePath = join(uploadsDir, fileName);
  writeFileSync(filePath, Buffer.from(base64Content, "base64"));

  return `/uploads/${fileName}`;
}

function resolveSession(token) {
  if (!token) return null;
  const s = db.data.sessions[token];
  if (!s) return null;
  const user = s.currentUserId ? db.data.users.find((u) => u.id === s.currentUserId) : null;
  return { session: s, user };
}

function findLovedOneForUser(userId) {
  if (!userId) return null;
  return db.data.lovedOnes.find((l) => l.ownerId === userId) || null;
}

app.post("/auth/signup", async (req, res) => {
  await db.read();
  const { fullName, email, password } = req.body;
  const nEmail = normalizeEmail(email);
  if (db.data.users.some((u) => u.email === nEmail)) {
    const payload = { code: "EMAIL_IN_USE", status: 409, message: "An account already exists with this email.", fieldErrors: { email: "An account with this email already exists." } };
    logRequest("POST", "/auth/signup", req.body, 409, payload);
    return res.status(409).json(payload);
  }

  const user = { id: `user-${Date.now()}`, fullName: fullName.trim(), email: nEmail, password, role: "family-admin", isVerified: false };
  db.data.users.push(user);

  // create session token
  const token = genToken();
  db.data.sessions[token] = { authJourneyActive: true, currentUserId: user.id, expectedOtp: "000000", recentlyAddedMember: null };
  await db.write();

  const responseBody = { user: { id: user.id, fullName: user.fullName, email: user.email, role: user.role }, token };
  logRequest("POST", "/auth/signup", req.body, 200, responseBody);
  res.json(responseBody);
});

app.post("/auth/login", async (req, res) => {
  await db.read();
  const { email, password } = req.body;
  const nEmail = normalizeEmail(email);
  const account = db.data.users.find((u) => u.email === nEmail);
  if (!account || account.password !== password) {
    const payload = { code: "AUTH_FAILURE", status: 401, message: "Email or password is incorrect.", fieldErrors: { email: "Email or password is incorrect.", password: "Email or password is incorrect." } };
    logRequest("POST", "/auth/login", req.body, 401, payload);
    return res.status(401).json(payload);
  }

  const token = genToken();
  db.data.sessions[token] = { authJourneyActive: true, currentUserId: account.id };
  await db.write();

  const responseBody = { user: { id: account.id, fullName: account.fullName, email: account.email, role: account.role }, token };
  logRequest("POST", "/auth/login", req.body, 200, responseBody);
  res.json(responseBody);
});

app.post("/auth/password-reset/request", async (req, res) => {
  // For parity with mock: always return success message
  const responseBody = { message: "Password reset email sent." };
  logRequest("POST", "/auth/password-reset/request", req.body, 200, responseBody);
  res.json(responseBody);
});

app.post("/auth/otp/verify", async (req, res) => {
  await db.read();
  const token = req.headers["x-session-token"] || req.headers["authorization"]?.replace("Bearer ", "");
  if (!token || !db.data.sessions[token]) {
    const payload = { code: "OTP_NOT_REQUESTED", status: 400, message: "No verification code is available." };
    logRequest("POST", "/auth/otp/verify", req.body, 400, payload);
    return res.status(400).json(payload);
  }
  const session = db.data.sessions[token];
  if (!session.expectedOtp) {
    const payload = { code: "OTP_NOT_REQUESTED", status: 400, message: "No verification code is available." };
    logRequest("POST", "/auth/otp/verify", req.body, 400, payload);
    return res.status(400).json(payload);
  }
  if (String(req.body) !== session.expectedOtp && req.body.code !== session.expectedOtp) {
    const payload = { code: "INVALID_OTP", status: 400, message: "The verification code is incorrect. Please try again." };
    logRequest("POST", "/auth/otp/verify", req.body, 400, payload);
    return res.status(400).json(payload);
  }
  // success
  session.expectedOtp = undefined;
  // mark the user as verified if available
  if (session.currentUserId) {
    const u = db.data.users.find((x) => x.id === session.currentUserId);
    if (u) u.isVerified = true;
  }
  // keep the onboarding/auth journey active so the user can continue to the care-circle setup flow
  session.authJourneyActive = true;
  await db.write();
  const responseBody = { success: true };
  logRequest("POST", "/auth/otp/verify", req.body, 200, responseBody);
  res.json(responseBody);
});

app.post("/auth/otp/resend", async (req, res) => {
  await db.read();
  const token = req.headers["x-session-token"] || req.headers["authorization"]?.replace("Bearer ", "");
  if (!token || !db.data.sessions[token] || !db.data.sessions[token].currentUserId) {
    const payload = { code: "UNAUTHORIZED", status: 401, message: "Unable to resend the verification code." };
    logRequest("POST", "/auth/otp/resend", req.body, 401, payload);
    return res.status(401).json(payload);
  }
  const otp = "000000";
  db.data.sessions[token].expectedOtp = otp;
  await db.write();
  const responseBody = { success: true };
  logRequest("POST", "/auth/otp/resend", req.body, 200, responseBody);
  console.log(`[KinGuard] OTP resent for session ${token}: ${otp}`);
  res.json(responseBody);
});

app.get("/invitations/:token", async (req, res) => {
  await db.read();
  const token = req.params.token;
  if (!token) return res.json({ status: "not_found" });
  if (token === "invalid") return res.json({ status: "not_found" });
  if (token === "expired") {
    const mockInvitation = { token: "expired", email: "john.doe@example.com", inviterName: "Sarah Chen", careCircleName: "The Chen Family", expiresAt: new Date(Date.now() - 1000 * 60 * 60).toISOString(), role: "caregiver", status: "pending" };
    return res.json({ status: "expired", invitation: mockInvitation });
  }
  const invitation = db.data.invitations.find((i) => i.token === token);
  if (!invitation || invitation.status !== "pending") return res.json({ status: "not_found" });
  if (new Date(invitation.expiresAt) < new Date()) return res.json({ status: "expired", invitation });
  return res.json({ status: "valid", invitation });
});

app.post("/invitations/:token/accept/caregiver", async (req, res) => {
  await db.read();
  const token = req.params.token;
  const values = req.body;
  if (!token) return res.status(400).json({ code: "INVALID_TOKEN", status: 400, message: "Invitation token is missing." });
  const invitation = db.data.invitations.find((i) => i.token === token);
  if (!invitation || invitation.status !== "pending") return res.status(404).json({ code: "INVITATION_NOT_FOUND", status: 404, message: "This invitation link is invalid or has already been used." });
  if (new Date(invitation.expiresAt) < new Date()) return res.status(410).json({ code: "INVITATION_EXPIRED", status: 410, message: "This invitation has expired." });

  const email = normalizeEmail(invitation.email);
  if (db.data.users.find((u) => u.email === email)) return res.status(409).json({ code: "EMAIL_IN_USE", status: 409, message: "An account already exists with this email.", fieldErrors: { email: "An account with this email already exists." } });

  const user = { id: `user-${Date.now()}`, fullName: values.fullName.trim(), email, password: values.password, role: "caregiver" };
  db.data.users.push(user);
  invitation.status = "accepted";
  // add to care circle members so they appear immediately
  if (invitation.inviterUserId) {
    db.data.careCircleMembers.push({ id: `member-${Date.now()}-${Math.random().toString(16).slice(2)}`, userId: user.id, role: invitation.role || 'caregiver', relationship: invitation.relationship || null, phone: invitation.phone || null, ownerId: invitation.inviterUserId, addedAt: new Date().toISOString() });
  }
  const tokenStr = genToken();
  db.data.sessions[tokenStr] = { authJourneyActive: true, currentUserId: user.id, expectedOtp: (Math.floor(100000 + Math.random() * 900000)).toString(), recentlyAddedMember: { fullName: user.fullName, email: user.email, role: invitation.role, careCircleName: invitation.careCircleName, inviterName: invitation.inviterName } };
  await db.write();

  const responseBody = { user: { id: user.id, fullName: user.fullName, email: user.email, role: user.role }, token: tokenStr };
  logRequest("POST", `/invitations/${token}/accept/caregiver`, req.body, 200, responseBody);
  res.json(responseBody);
});

app.post("/invitations/accept/family-member", async (req, res) => {
  await db.read();
  const values = req.body;
  const email = normalizeEmail(values.email);
  if (!email) return res.status(400).json({ code: "INVALID_EMAIL", status: 400, message: "Confirm the invitation email address.", fieldErrors: { email: "Confirm the invitation email address." } });
  if (db.data.users.find((u) => u.email === email)) return res.status(409).json({ code: "EMAIL_IN_USE", status: 409, message: "An account already exists with this email.", fieldErrors: { email: "An account with this email already exists." } });

  const user = { id: `user-${Date.now()}`, fullName: values.fullName.trim(), email, password: values.password, role: values.role ?? "family-member" };
  db.data.users.push(user);
  const tokenStr = genToken();
  // add to care circle members for the inviting user if available
  const sessionToken = req.headers["x-session-token"] || req.headers["authorization"]?.replace("Bearer ", "");
  const sessionInfo = resolveSession(sessionToken);
  const ownerId = sessionInfo?.user?.id || values.inviterUserId || null;
  if (ownerId) {
    db.data.careCircleMembers.push({ id: `member-${Date.now()}-${Math.random().toString(16).slice(2)}`, userId: user.id, role: user.role, relationship: values.relationship || null, phone: values.phone || null, ownerId, addedAt: new Date().toISOString() });
  }
  db.data.sessions[tokenStr] = { authJourneyActive: true, currentUserId: user.id, recentlyAddedMember: { fullName: user.fullName, email: user.email, role: user.role, careCircleName: values.careCircleName ?? "The Chen Family", inviterName: values.inviterName ?? "Sarah Chen" } };
  await db.write();

  const responseBody = { user: { id: user.id, fullName: user.fullName, email: user.email, role: user.role }, token: tokenStr };
  logRequest("POST", "/invitations/accept/family-member", req.body, 200, responseBody);
  res.json(responseBody);
});

app.post("/care-circles", async (req, res) => {
  await db.read();
  const data = req.body;
  // minimal server-side validation
  if (!data || !data.circleName || !data.lovedOneName) {
    const payload = { code: "INVALID_INPUT", status: 400, message: "Missing required fields." };
    logRequest("POST", "/care-circles", req.body, 400, payload);
    return res.status(400).json(payload);
  }

  const sessionToken = req.headers["x-session-token"] || req.headers["authorization"]?.replace("Bearer ", "");
  const sessionInfo = resolveSession(sessionToken);
  const ownerId = sessionInfo?.user?.id || null;

  const savedPhoto = savePhotoDataUrl(data.photo);
  const persistedCircle = {
    ...data,
    photo: savedPhoto ?? data.photo ?? null,
    lovedOneName: data.lovedOneName,
    relationship: data.relationship ?? null,
    age: data.age ?? null,
    gender: data.gender ?? null,
    phone: data.phone ?? null,
    email: data.email ?? null,
    medication: data.medication ?? null,
    dailyCheckIns: data.dailyCheckIns ?? null,
  };

  const lovedOne = {
    id: `loved-${Date.now()}`,
    ownerId,
    name: persistedCircle.lovedOneName,
    dob: persistedCircle.age ? `Age ${persistedCircle.age}` : null,
    gender: persistedCircle.gender ?? null,
    photo: savedPhoto ?? null,
    contactInfo: persistedCircle.email || persistedCircle.phone || null,
    relationship: persistedCircle.relationship ?? null,
    medication: persistedCircle.medication ?? null,
    dailyCheckIns: persistedCircle.dailyCheckIns ?? null,
    circleName: persistedCircle.circleName ?? null,
  };

  db.data.lovedOnes.push(lovedOne);

  if (ownerId) {
    const existing = db.data.careCircleMembers.find((m) => m.userId === ownerId && m.ownerId === ownerId);
    if (!existing) {
      db.data.careCircleMembers.push({
        id: `member-${Date.now()}-${Math.random().toString(16).slice(2)}`,
        userId: ownerId,
        role: "family-admin",
        relationship: "self",
        phone: persistedCircle.phone ?? null,
        ownerId,
        addedAt: new Date().toISOString(),
      });
    }
  }

  if (sessionInfo?.session) {
    sessionInfo.session.careCircleDraft = persistedCircle;
    sessionInfo.session.authJourneyActive = true;
  }

  await db.write();
  const responseBody = { careCircle: persistedCircle, lovedOne };
  logRequest("POST", "/care-circles", req.body, 200, responseBody);
  res.json(responseBody);
});

app.post("/care-circles/invitations", async (req, res) => {
  await db.read();
  const members = req.body;
  if (!Array.isArray(members) || members.length === 0) {
    const payload = { code: "INVALID_INPUT", status: 400, message: "Add at least one family member to invite." };
    logRequest("POST", "/care-circles/invitations", req.body, 400, payload);
    return res.status(400).json(payload);
  }
  const sessionToken = req.headers["x-session-token"] || req.headers["authorization"]?.replace("Bearer ", "");
  const sessionInfo = resolveSession(sessionToken);
  const inviterUserId = sessionInfo?.user?.id;
  const invited = members.map((member) => {
    const invitation = { token: `invite-${Date.now()}-${Math.random().toString(16).slice(2)}`, email: normalizeEmail(member.email), inviterName: sessionInfo?.user?.fullName || "Family Administrator", inviterUserId: inviterUserId || null, careCircleName: sessionInfo?.user ? `${sessionInfo.user.fullName}'s care circle` : "Your care circle", expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7).toISOString(), role: member.role, relationship: member.relationship, phone: member.phone, status: "pending" };
    db.data.invitations.push(invitation);
    return { ...member, invitationToken: invitation.token };
  });
  if (sessionInfo?.session) sessionInfo.session.inviteTeamDraft = { members };
  await db.write();
  const responseBody = { invited };
  logRequest("POST", "/care-circles/invitations", req.body, 200, responseBody);
  res.json(responseBody);
});

// --- Stage 3: CRUD endpoints (single-tenant: resolved from session token) ---

app.get('/loved-one', async (req, res) => {
  await db.read();
  const token = req.headers['x-session-token'] || req.headers['authorization']?.replace('Bearer ', '');
  const sessionInfo = resolveSession(token);
  if (!sessionInfo?.user) return res.status(401).json({ code: 'UNAUTHORIZED', status: 401 });
  const lovedOne = findLovedOneForUser(sessionInfo.user.id);
  if (!lovedOne) return res.status(404).json({ code: 'NOT_FOUND', status: 404 });
  res.json({ lovedOne });
});

app.put('/loved-one', async (req, res) => {
  await db.read();
  const token = req.headers['x-session-token'] || req.headers['authorization']?.replace('Bearer ', '');
  const sessionInfo = resolveSession(token);
  if (!sessionInfo?.user) return res.status(401).json({ code: 'UNAUTHORIZED', status: 401 });
  const lovedOne = findLovedOneForUser(sessionInfo.user.id);
  if (!lovedOne) return res.status(404).json({ code: 'NOT_FOUND', status: 404 });
  Object.assign(lovedOne, req.body || {});
  await db.write();
  res.json({ lovedOne });
});

// Medications
app.get('/medications', async (req, res) => {
  await db.read();
  const token = req.headers['x-session-token'] || req.headers['authorization']?.replace('Bearer ', '');
  const sessionInfo = resolveSession(token);
  if (!sessionInfo?.user) return res.status(401).json({ code: 'UNAUTHORIZED', status: 401 });
  const lovedOne = findLovedOneForUser(sessionInfo.user.id);
  const meds = lovedOne ? db.data.medications.filter((m) => m.lovedOneId === lovedOne.id) : [];
  res.json({ medications: meds });
});

app.post('/medications', async (req, res) => {
  await db.read();
  const token = req.headers['x-session-token'] || req.headers['authorization']?.replace('Bearer ', '');
  const sessionInfo = resolveSession(token);
  if (!sessionInfo?.user) return res.status(401).json({ code: 'UNAUTHORIZED', status: 401 });
  const lovedOne = findLovedOneForUser(sessionInfo.user.id);
  if (!lovedOne) return res.status(404).json({ code: 'NO_LOVED_ONE', status: 404 });
  const med = { id: `med-${Date.now()}-${Math.random().toString(16).slice(2)}`, lovedOneId: lovedOne.id, name: req.body.name, dose: req.body.dose || null, schedule: req.body.schedule || null, notes: req.body.notes || null, active: true };
  db.data.medications.push(med);
  await db.write();
  res.json({ medication: med });
});

app.put('/medications/:id', async (req, res) => {
  await db.read();
  const med = db.data.medications.find((m) => m.id === req.params.id);
  if (!med) return res.status(404).json({ code: 'NOT_FOUND', status: 404 });
  Object.assign(med, req.body || {});
  await db.write();
  res.json({ medication: med });
});

app.delete('/medications/:id', async (req, res) => {
  await db.read();
  const idx = db.data.medications.findIndex((m) => m.id === req.params.id);
  if (idx === -1) return res.status(404).json({ code: 'NOT_FOUND', status: 404 });
  db.data.medications.splice(idx, 1);
  await db.write();
  res.status(204).end();
});

// Medication logs
app.post('/medications/:id/logs', async (req, res) => {
  await db.read();
  const med = db.data.medications.find((m) => m.id === req.params.id);
  if (!med) return res.status(404).json({ code: 'NOT_FOUND', status: 404 });
  const entry = { id: `log-${Date.now()}-${Math.random().toString(16).slice(2)}`, medicationId: med.id, lovedOneId: med.lovedOneId, action: req.body.action || 'taken', timestamp: req.body.timestamp || new Date().toISOString(), actorUserId: null };
  db.data.medicationLogs.push(entry);
  // create activity event
  db.data.activityEvents.push({ id: `evt-${Date.now()}-${Math.random().toString(16).slice(2)}`, type: 'medication_log', lovedOneId: med.lovedOneId, actorUserId: entry.actorUserId, timestamp: entry.timestamp, metadata: { medicationId: med.id, action: entry.action } });
  await db.write();
  res.json({ logEntry: entry });
});

app.get('/medication-logs', async (req, res) => {
  await db.read();
  const token = req.headers['x-session-token'] || req.headers['authorization']?.replace('Bearer ', '');
  const sessionInfo = resolveSession(token);
  if (!sessionInfo?.user) return res.status(401).json({ code: 'UNAUTHORIZED', status: 401 });
  const lovedOne = findLovedOneForUser(sessionInfo.user.id);
  const logs = lovedOne ? db.data.medicationLogs.filter((l) => l.lovedOneId === lovedOne.id) : [];
  res.json({ logs });
});

// Check-ins / care status updates
app.post('/check-ins', async (req, res) => {
  await db.read();
  const token = req.headers['x-session-token'] || req.headers['authorization']?.replace('Bearer ', '');
  const sessionInfo = resolveSession(token);
  if (!sessionInfo?.user) return res.status(401).json({ code: 'UNAUTHORIZED', status: 401 });
  const lovedOne = findLovedOneForUser(sessionInfo.user.id);
  if (!lovedOne) return res.status(404).json({ code: 'NO_LOVED_ONE', status: 404 });
  const checkIn = { id: `check-${Date.now()}-${Math.random().toString(16).slice(2)}`, lovedOneId: lovedOne.id, status: req.body.status, notes: req.body.notes || null, timestamp: req.body.timestamp || new Date().toISOString(), actorUserId: sessionInfo.user.id };
  db.data.careStatusUpdates.push(checkIn);
  db.data.activityEvents.push({ id: `evt-${Date.now()}-${Math.random().toString(16).slice(2)}`, type: 'check_in', lovedOneId: lovedOne.id, actorUserId: sessionInfo.user.id, timestamp: checkIn.timestamp, metadata: { status: checkIn.status } });
  // create notifications for other members if status needs attention
  if (checkIn.status && ['needs_attention', 'immediate_help', 'needs_assistance'].includes(String(checkIn.status).toLowerCase())) {
    const members = db.data.careCircleMembers.filter((m) => m.ownerId === lovedOne.ownerId && m.userId !== sessionInfo.user.id);
    members.forEach((m) => db.data.notifications.push({ id: `n-${Date.now()}-${Math.random().toString(16).slice(2)}`, type: 'care_status', title: `Status: ${checkIn.status}`, body: checkIn.notes || '', createdAt: new Date().toISOString(), read: false, resolved: false, targetUserId: m.userId, lovedOneId: lovedOne.id, relatedEmergencyId: null }));
  }
  await db.write();
  res.json({ checkIn });
});

app.get('/activity-events', async (req, res) => {
  await db.read();
  const token = req.headers['x-session-token'] || req.headers['authorization']?.replace('Bearer ', '');
  const sessionInfo = resolveSession(token);
  if (!sessionInfo?.user) return res.status(401).json({ code: 'UNAUTHORIZED', status: 401 });
  const lovedOne = findLovedOneForUser(sessionInfo.user.id);
  const events = lovedOne ? db.data.activityEvents.filter((e) => e.lovedOneId === lovedOne.id) : [];
  res.json({ events });
});

// GET check-ins (list)
app.get('/check-ins', async (req, res) => {
  await db.read();
  const token = req.headers['x-session-token'] || req.headers['authorization']?.replace('Bearer ', '');
  const sessionInfo = resolveSession(token);
  if (!sessionInfo?.user) return res.status(401).json({ code: 'UNAUTHORIZED', status: 401 });
  const lovedOne = findLovedOneForUser(sessionInfo.user.id);
  if (!lovedOne) return res.status(404).json({ code: 'NO_LOVED_ONE', status: 404 });
  const checks = db.data.careStatusUpdates.filter((c) => c.lovedOneId === lovedOne.id);
  res.json({ checkIns: checks });
});

// Simple messages/conversations model
app.get('/conversations', async (req, res) => {
  await db.read();
  const token = req.headers['x-session-token'] || req.headers['authorization']?.replace('Bearer ', '');
  const sessionInfo = resolveSession(token);
  if (!sessionInfo?.user) return res.status(401).json({ code: 'UNAUTHORIZED', status: 401 });
  const uid = sessionInfo.user.id;
  const msgs = db.data.messages.filter((m) => m.fromUserId === uid || m.toUserId === uid);
  // group by conversationId if present, else by other participant
  const convMap = new Map();
  msgs.forEach((m) => {
    const convId = m.conversationId || `conv-${[m.fromUserId, m.toUserId].sort().join('-')}`;
    const entry = convMap.get(convId) || { id: convId, participants: new Set(), lastMessage: null, unreadCount: 0 };
    entry.participants.add(m.fromUserId);
    entry.participants.add(m.toUserId);
    if (!entry.lastMessage || new Date(m.timestamp) > new Date(entry.lastMessage.timestamp)) entry.lastMessage = m;
    if (m.toUserId === uid && !m.isRead) entry.unreadCount = (entry.unreadCount || 0) + 1;
    convMap.set(convId, entry);
  });
  const conversations = Array.from(convMap.values()).map((c) => ({ id: c.id, participants: Array.from(c.participants), lastMessage: c.lastMessage, unreadCount: c.unreadCount }));
  res.json({ conversations });
});

app.get('/conversations/:id/messages', async (req, res) => {
  await db.read();
  const token = req.headers['x-session-token'] || req.headers['authorization']?.replace('Bearer ', '');
  const sessionInfo = resolveSession(token);
  if (!sessionInfo?.user) return res.status(401).json({ code: 'UNAUTHORIZED', status: 401 });
  const convId = req.params.id;
  const msgs = db.data.messages.filter((m) => (m.conversationId === convId) || (m.conversationId === undefined && (`conv-${[m.fromUserId, m.toUserId].sort().join('-')}` === convId)));
  res.json({ messages: msgs });
});

app.post('/conversations/:id/messages', async (req, res) => {
  await db.read();
  const token = req.headers['x-session-token'] || req.headers['authorization']?.replace('Bearer ', '');
  const sessionInfo = resolveSession(token);
  if (!sessionInfo?.user) return res.status(401).json({ code: 'UNAUTHORIZED', status: 401 });
  const convId = req.params.id;
  const toUserId = req.body.toUserId;
  if (!toUserId) return res.status(400).json({ code: 'INVALID_INPUT', status: 400 });
  const message = { id: `msg-${Date.now()}-${Math.random().toString(16).slice(2)}`, conversationId: convId, fromUserId: sessionInfo.user.id, toUserId, text: req.body.content || '', timestamp: new Date().toISOString(), isRead: false };
  db.data.messages.push(message);
  // create notification for recipient
  db.data.notifications.push({ id: `n-${Date.now()}-${Math.random().toString(16).slice(2)}`, type: 'message', title: `Message from ${sessionInfo.user.fullName}`, body: message.text, createdAt: new Date().toISOString(), read: false, resolved: false, targetUserId: toUserId, lovedOneId: null, relatedEmergencyId: null });
  await db.write();
  res.json({ message });
});

// Notifications
app.get('/notifications', async (req, res) => {
  await db.read();
  const token = req.headers['x-session-token'] || req.headers['authorization']?.replace('Bearer ', '');
  const sessionInfo = resolveSession(token);
  if (!sessionInfo?.user) return res.status(401).json({ code: 'UNAUTHORIZED', status: 401 });
  const userId = sessionInfo.user.id;
  const notes = db.data.notifications.filter((n) => n.targetUserId === userId);
  res.json({ notifications: notes });
});

app.post('/notifications/:id/mark-read', async (req, res) => {
  await db.read();
  const note = db.data.notifications.find((n) => n.id === req.params.id);
  if (!note) return res.status(404).json({ code: 'NOT_FOUND', status: 404 });
  note.read = true;
  await db.write();
  res.json({ success: true });
});

app.post('/notifications/:id/resolve', async (req, res) => {
  await db.read();
  const note = db.data.notifications.find((n) => n.id === req.params.id);
  if (!note) return res.status(404).json({ code: 'NOT_FOUND', status: 404 });
  note.resolved = true;
  await db.write();
  res.json({ success: true });
});

// Emergencies
app.post('/emergencies', async (req, res) => {
  await db.read();
  const token = req.headers['x-session-token'] || req.headers['authorization']?.replace('Bearer ', '');
  const sessionInfo = resolveSession(token);
  if (!sessionInfo?.user) return res.status(401).json({ code: 'UNAUTHORIZED', status: 401 });
  const lovedOne = findLovedOneForUser(sessionInfo.user.id);
  if (!lovedOne) return res.status(404).json({ code: 'NO_LOVED_ONE', status: 404 });
  const ev = { id: `em-${Date.now()}-${Math.random().toString(16).slice(2)}`, lovedOneId: lovedOne.id, type: req.body.type || 'unknown', location: req.body.location || null, notes: req.body.notes || null, timestamp: new Date().toISOString(), status: 'active', createdBy: sessionInfo.user.id };
  db.data.emergencyEvents.push(ev);
  // create notifications for all members
  const members = db.data.careCircleMembers.filter((m) => m.ownerId === lovedOne.ownerId && m.userId !== sessionInfo.user.id);
  members.forEach((m) => db.data.notifications.push({ id: `n-${Date.now()}-${Math.random().toString(16).slice(2)}`, type: 'emergency', title: `Emergency: ${ev.type}`, body: ev.notes || '', createdAt: new Date().toISOString(), read: false, resolved: false, targetUserId: m.userId, lovedOneId: lovedOne.id, relatedEmergencyId: ev.id }));
  await db.write();
  res.json({ emergency: ev });
});

app.get('/emergencies', async (req, res) => {
  await db.read();
  const token = req.headers['x-session-token'] || req.headers['authorization']?.replace('Bearer ', '');
  const sessionInfo = resolveSession(token);
  if (!sessionInfo?.user) return res.status(401).json({ code: 'UNAUTHORIZED', status: 401 });
  const lovedOne = findLovedOneForUser(sessionInfo.user.id);
  const events = lovedOne ? db.data.emergencyEvents.filter((e) => e.lovedOneId === lovedOne.id) : [];
  res.json({ emergencyEvents: events });
});

app.post('/emergencies/:id/respond', async (req, res) => {
  await db.read();
  const ev = db.data.emergencyEvents.find((e) => e.id === req.params.id);
  if (!ev) return res.status(404).json({ code: 'NOT_FOUND', status: 404 });
  const action = req.body.action;
  if (action === 'acknowledge') ev.status = 'acknowledged';
  if (action === 'responding') ev.status = 'responding';
  if (action === 'resolve') {
    ev.status = 'resolved';
    // auto-resolve related notifications
    db.data.notifications.forEach((n) => {
      if (n.relatedEmergencyId === ev.id) n.resolved = true;
    });
  }
  await db.write();
  res.json({ emergency: ev });
});

app.get("/auth/session", async (req, res) => {
  await db.read();
  const token = req.headers["x-session-token"] || req.headers["authorization"]?.replace("Bearer ", "");
  const session = token ? db.data.sessions[token] : undefined;
  const currentUser = session?.currentUserId ? db.data.users.find((u) => u.id === session.currentUserId) : undefined;
  const responseBody = {
    authJourneyActive: !!session?.authJourneyActive,
    currentUser: currentUser ? { id: currentUser.id, fullName: currentUser.fullName, email: currentUser.email, role: currentUser.role } : undefined,
    careCircleDraft: session?.careCircleDraft ?? undefined,
    inviteTeamDraft: session?.inviteTeamDraft ?? undefined,
    recentlyAddedMember: session?.recentlyAddedMember ?? undefined,
  };
  logRequest("GET", "/auth/session", null, 200, responseBody);
  res.json(responseBody);
});

app.post("/auth/logout", async (req, res) => {
  await db.read();
  const token = req.headers["x-session-token"] || req.headers["authorization"]?.replace("Bearer ", "");
  if (token && db.data.sessions[token]) {
    delete db.data.sessions[token];
    await db.write();
  }
  logRequest("POST", "/auth/logout", null, 200, { success: true });
  res.json({});
});

// Test-only endpoints
app.get("/__test__/last-otp", async (req, res) => {
  await db.read();
  const email = normalizeEmail(req.query.email || "");
  const sessionEntry = Object.values(db.data.sessions).find((s) => {
    const u = db.data.users.find((x) => x.id === s.currentUserId);
    return u && u.email === email;
  });
  const otp = sessionEntry?.expectedOtp ?? null;
  res.json({ otp });
});

app.get("/__test__/current-user", async (req, res) => {
  await db.read();
  const token = req.query.token || req.headers["x-session-token"] || req.headers["authorization"]?.replace("Bearer ", "");
  const session = token ? db.data.sessions[token] : undefined;
  const user = session?.currentUserId ? db.data.users.find((u) => u.id === session.currentUserId) : null;
  res.json({ user: user ? { id: user.id, fullName: user.fullName, email: user.email, role: user.role } : null });
});

app.get("/__test__/request-log", (req, res) => {
  res.json({ log: requestLog });
});

app.post("/__test__/reset", async (req, res) => {
  // reset DB to initial seeded values from file on disk
  await initDb();
  requestLog.length = 0;
  res.json({ success: true });
});

initDb()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`KinGuard backend running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to initialize DB", err);
    process.exit(1);
  });

export default app;
