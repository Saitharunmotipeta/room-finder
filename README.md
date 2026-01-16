Room Finder Application

---

## 🔍 Design Trade-offs & Engineering Decisions

This project was built under real-world constraints such as limited time, scope prioritization, and the need to demonstrate end-to-end functionality rather than theoretical perfection. Below are the key trade-offs made consciously during development.

### 1️⃣ Authentication & Role Handling

* **Decision:** Centralized authentication using Supabase Auth with a single login flow.
* **Trade-off:** Role-based redirection and permissions were simplified to avoid over-engineering multiple auth pipelines.
* **Reasoning:** The primary goal was to showcase secure login, session handling, and gated access rather than complex IAM systems.
* **Impact:** Reduced complexity, faster iteration, clearer debugging.

### 2️⃣ Search Experience (Free-text vs Filters)

* **Decision:** Implemented a **free-text search** instead of dropdowns or rigid filters.
* **Trade-off:** Parsing natural language queries is less precise than structured filters.
* **Reasoning:** Improves UX and mimics how users naturally search (e.g. “1 bhk under 10000 for family”).
* **Impact:** Better user experience, slightly more client-side logic.

### 3️⃣ Image Handling (URLs vs Uploads)

* **Decision:** Room images are stored as **image URLs** instead of file uploads.
* **Trade-off:** No built-in image validation or compression.
* **Reasoning:** Avoids storage complexity while still demonstrating media handling.
* **Impact:** Faster implementation, easy to extend later.

### 4️⃣ UI Styling Approach

* **Decision:** Used inline styles with structured constants instead of a full CSS framework.
* **Trade-off:** Less scalable than Tailwind or CSS Modules.
* **Reasoning:** Keeps styles colocated, readable, and avoids framework overhead.
* **Impact:** Clean UI, fast iteration, minimal setup.

### 5️⃣ Performance & Data Fetching

* **Decision:** Client-side data fetching with debounced search.
* **Trade-off:** Some queries run on the client instead of server-side filtering.
* **Reasoning:** Reduces backend complexity and shows frontend optimization techniques.
* **Impact:** Smooth UX, acceptable performance for current scale.

---

## 🚀 Future Enhancements (If Scaled)

If this application were to be scaled for production use, the following improvements would be implemented:

### 🔐 Authentication & Security

* Role-based access control enforced fully at the database level
* Admin-only protected APIs
* Email verification + password recovery flows

### 🧠 Search & Discovery

* NLP-based query parsing
* Server-side filtering and ranking
* Price range inference (e.g. “cheap”, “premium”)

### 🖼️ Media Management

* Image uploads via Supabase Storage or S3
* Image compression and lazy loading
* Multiple images per room with carousel UI

### ⚡ Performance

* Server Components for read-heavy pages
* Pagination and infinite scrolling
* Caching with Redis or edge functions

### 📱 Platform Expansion

* Mobile app (Android / iOS)
* Push notifications for saved searches
* Owner analytics dashboard (views, saves, trends)

### 🧱 Architecture

* Move business logic to service layer
* Background jobs for analytics
* Monitoring & logging (Sentry, OpenTelemetry)

---

## 🎯 Final Note

The project intentionally prioritizes **clarity, correctness, and product thinking** over premature optimization.
Every decision reflects how early-stage products are realistically built and iterated.

This system is:

* Extendable
* Maintainable
* Deployment-ready

---
Some outputs samples...



---

Alright. Straight talk, recruiter lens on, no fluff.
I’ll do **two things**:

1️⃣ **Give you a clean “How to Run” section you can directly paste into README**
2️⃣ **Give you an honest evaluation of how strong this README is from a recruiter’s POV**, and what makes it eye-catching vs what still needs polish

---

## ▶️ How to Run the Project (Local Setup)

You should add **this exact section** to your README.

---

### 🛠️ Local Development Setup

#### Prerequisites

Make sure the following are installed on your system:

* **Node.js** (v18 or above)
* **npm** or **yarn**
* A **Supabase account**

---

#### 1️⃣ Clone the Repository

```bash
git clone <your-repo-url>
cd roomfinder
```

---

#### 2️⃣ Install Dependencies

```bash
npm install
```

or

```bash
yarn install
```

---

#### 3️⃣ Environment Configuration

Create a `.env.local` file in the root directory and add:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

> These values can be found in **Supabase → Project Settings → API**.

---

#### 4️⃣ Database Setup (Supabase)

Required tables:

* `profiles`
* `rooms`
* `room_images`
* `saved_rooms`

> SQL schema is assumed to be pre-configured in Supabase.
> (For production, migrations should be added.)

---

#### 5️⃣ Run the Application

```bash
npm run dev
```

Open:

```
http://localhost:3000
```

---

#### 6️⃣ Demo Roles (Optional)

For testing purposes:

* **Admin**: `admin@roomfinder.com`
* **Owner**: `owner@roomfinder.com`
* **User**: Any registered email

Role-based views are handled internally.

---