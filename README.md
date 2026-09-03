 # 🏠 HomieeBook | Home Reservation System  

**HomieeBook** is a **modern web application** designed to make **home reservation, renting, and management simple and efficient**.  

It connects **guests (renters)** and **hosts (owners)**, creating a community-driven platform where users can **explore homes, book stays, and manage reservations** easily.  

This project is built to help users who struggle with **finding affordable homes** or **managing their rental properties** in a secure, user-friendly environment.  

---

## 🌍 Live Demo  
Check out the live version of HomieeBook here:  
👉 [HomieeBook on Vercel](https://homiee-book-9a2u.vercel.app/)

---
## 🚀 Features  

- 🏡 **Browse & Search Homes** – Explore available homes by location, type, or price range.  
- 👤 **Guest & Host Roles** – Guests can book homes, while hosts can upload/manage their listings.  
- 🖼 **Upload Home Photos** – Hosts can showcase property images and details for better visibility.  
- 🔐 **User Authentication** – Secure login & signup system for safe access.
- ⭐ **Real-Time Reviews** – Guests can submit and view property reviews in real time, helping users make informed booking decisions.
- 📊 **Dashboard** – Manage bookings, reservations, and property details.  
- 📱 **Responsive Design** – Works seamlessly on desktop and mobile devices.  
- ⚡ **Fast & Modern UI** – Clean design with smooth user experience.  

---

## 📸 Screenshots  

![Homepage](https://github.com/sonivipin119/HomieeBook/blob/main/assets/Screenshot%202025-09-05%20100250.png)  
![Dashboard](https://github.com/sonivipin119/HomieeBook/blob/main/assets/Screenshot%202025-09-05%20100324.png) 
![SignUp/Login](https://github.com/sonivipin119/HomieeBook/blob/main/assets/Screenshot%202025-09-05%20100525.png)
![Favourite](https://github.com/sonivipin119/HomieeBook/blob/main/assets/Screenshot%202025-09-05%20100558.png)
![Bookings](https://github.com/sonivipin119/HomieeBook/blob/main/assets/Screenshot%202025-09-05%20100614.png)
![Details](https://github.com/sonivipin119/HomieeBook/blob/main/assets/Screenshot%202025-09-05%20100649.png)
![Deatils2](https://github.com/sonivipin119/HomieeBook/blob/main/assets/Screenshot%202025-09-05%20100701.png)

---

# ⚙️ Installation

Follow these steps to set up HomieeBook locally:
 Clone the repository:
 ```
 git clone https://github.com/sonivipin119/HomieeBook.git
 cd HomieeBook
 ```
 ### Configure Backend

 Open:

 ```text
 backend/src/main/resources/application.properties

 server.port=${PORT_NUMBER}

 spring.datasource.url=${MYSQL_DATABASE_URL}
 spring.datasource.username=${MYSQL_DATABASE_USERNAME}
 spring.datasource.password=${MYSQL_DATABASE_PASSWORD}

 spring.jpa.hibernate.ddl-auto=update
 spring.jpa.show-sql=true
 spring.jpa.properties.hibernate.format_sql=true

 # Google OAuth2
 spring.security.oauth2.client.registration.google.client-id=${GOOGLE_CLIENT_ID}
 spring.security.oauth2.client.registration.google.client-secret=${GOOGLE_CLIENT_SECRET}

 # JWT
 jwt.secret=${JWT_SECRET}

 # Cloudinary
 cloudinary.cloud-name=${CLOUDINARY_CLOUD_NAME}
 cloudinary.api-key=${CLOUDINARY_API_KEY}
 cloudinary.api-secret=${CLOUDINARY_API_SECRET}
 ```
 Create Database
 ```
 CREATE DATABASE your_Db_name;
 ```
 Install Frontend dependencies:
 ```
 cd Frontend
 npm install
 ```

 Start the Backend server:
 ```
 mvn spring-boot:run
 ```
 Backend Start at:
 ```
 http://localhost:PORT_NUMBER
 ```
 Start the Frontend:
 ```
 npm run dev
 ```
 Open in browser
 ```
 http://localhost:5173
 ```
---

## 📖 Usage

- 👤 Guest User
 - Browse homes
 - Filter/search by location & budget
 - Request/book a home
 - View booking history
 - Post and view reviews

- 🏠 Host User
 - Upload property details with images
 - Manage availability & reservations
 - Approve/reject booking requests

---

## 📑 Software Requirement Specification (SRS) – Summary  

### 🔹 Problem Statement  
Many users face challenges in finding affordable and trusted homes, while property owners struggle to manage reservations efficiently.
There is a need for a **community-driven platform** that bridges this gap.

---

### 🔹 Users  

- **Guest (Reader):** Can browse, search, and book homes..  
- **Host (Book Owner):** Can upload, manage, and rent out homes.  

---

### 🔹 Flow of Application  

1. **Signup/Login** as Guest or Host.  
2. Guests **search for homes** by location.  
3. Hosts **upload property details** with images and availability
4. Guests **send requests** to booking homes.  
5. Hosts **approve/deny requests**.  
6. Both parties manage their history via the **dashboard**.  

---

## 📌 Tech Stack  

- **Frontend:** React.js, Tailwind CSS
- **Backend:** Spring framework
- **Database:** MySql  
- **Authentication:** JWT / OAuth
- **File Storage:** Cloudinary
- **Email Service:** Email.js
- **Hosting:** Vercel / Netlify 

---

## 🤝 Contributing  

Contributions are welcome! 🎉  

1. Fork the repo  
2. Create a feature branch  
3. Commit your changes  
4. Submit a pull request  

---

## ✨ Author  

👤 **Vipin Soni**  
- GitHub: [@sonivipin119](https://github.com/sonivipin119)  
- LinkedIn: [My LinkedIn Profile](https://www.linkedin.com/in/vipin-soni-416a61257/)  
