# 📄 Resume Builder

A full-stack **Resume Builder App** that allows users to create, edit, and download professional resumes in **PDF** and **DOCX** formats.  
Built with the **MERN stack** and styled with modern UI components.

---

## 🚀 Tech Stack

- **Frontend:** React, TypeScript, Tailwind CSS / DaisyUI  
- **Backend:** Node.js, Express.js, MongoDB  
- **Other:** Puppeteer (PDF generation), html-docx-js (DOCX generation)  

---

## 🎥 Demo

🔗 [Live Demo](https://resume-builder-rho-five.vercel.app/)  


---

## 📸 Screenshots

### 📝 Resume Form
<img width="1906" height="916" alt="image" src="https://github.com/user-attachments/assets/afce5377-166d-48e6-89cc-d89e0b7fe13a" />


### 📄 Resume Preview
<img width="1885" height="914" alt="image" src="https://github.com/user-attachments/assets/92c28d6a-552f-4dab-b949-be2053b72282" />



## ⚙️ Features

- Create and manage multiple resumes
- Add education, experience, projects, certifications, skills, and achievements
- Export resumes as **PDF** and **DOCX**
- Edit or delete resumes anytime
- Responsive UI with clean design

---

## 🧑‍💻 Getting Started (Local Setup)

### 1. Clone the Repository

```bash
git clone <repo_url>
cd your-repo
```
#### 2. setup backend
```bash
cd backend
npm install
touch .env
```
add your .env file
```bash
PORT=5000
MONGODB_URI=your-mongodb-uri
JWT_SECRET=your-secret-key
```
run your code 
```bash
npm run dev
```
#### 3. setup frontend

```bash
cd frontend
npm install
npm run dev
```
add env of frontend also
```bash
VITE_BASE_URL=htttp://localhost:5000/api
```
---

### Developed By
Daljit singh
