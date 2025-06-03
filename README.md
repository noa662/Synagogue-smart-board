# Digital Synagogue Display

A digital display system for synagogues — showing daily halachic times, announcements, contact details, and more.

## Key Technologies

- **Frontend**: React, PrimeReact  
- **Backend**: Node.js, Express  
- **Database**: MongoDB + Mongoose  
- **Authentication**: JWT, bcrypt  
- **Email**: Nodemailer (Gmail SMTP)  
- **Zmanim**: KosherZmanim  

## Main Features

- Responsive interface designed for display screens in the synagogue
- User management and permissions (Admin)
- Content and page updates via backend API
- Automatic email sending upon user inquiries
- Calculation of daily halachic times based on geographic location

## Installation and Running

### Prerequisites

- Node.js ≥ 18
- MongoDB installed locally or access to a cloud database
- Gmail account for sending emails
  
### Installing the Server
```
cd server
npm install
npm run dev
```

### Installing the Client
```
cd client
npm install
npm start
```

### Environment Variables (node/.env)

Below is an example of environment variables you need to configure.
Remember not to commit your .env file to public repositories!

DB=mongodb+srv://<username>:<password>@cluster.mongodb.net/
PORT=8080
ADMIN_PASSWORD=your_admin_password
JWT_SECRET=your_jwt_secret_key
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_password_or_app_password

### Screenshots

![מסך ראשי](https://github.com/user-attachments/assets/107ae6bb-b7c9-499e-a84a-a68920d589c1)
![זמני תפילה](https://github.com/user-attachments/assets/1003f3fe-7c62-4aab-aac8-3bda9003ddcd)
![זמני היום](https://github.com/user-attachments/assets/6dc300e8-23c5-4266-b8fd-1cdc29a9955e)
![הרשמה](https://github.com/user-attachments/assets/630007b9-b102-4232-8bb3-78e59c3a70e1)
![רשימת אירועים](https://github.com/user-attachments/assets/f25bfdb5-855f-4348-9477-5a4430ccb1d8)
![שליחת פניה](https://github.com/user-attachments/assets/68e6f9b5-89fd-4982-aa49-97a172e95786)

#### Admin Options:

![הוספת אירוע](https://github.com/user-attachments/assets/8dfdcfb7-2fdc-4217-b34a-4bf68559251a)
![רשימת פניות ומחיקתם](https://github.com/user-attachments/assets/2e6acd05-05e3-4959-bbe5-ead9d89b845c)
![הגדרות תצוגה](https://github.com/user-attachments/assets/776418b9-6c6c-437d-8a03-69cbed89efbe)
![מסך ראשי לאחר עדכון הגדרות מנהל](https://github.com/user-attachments/assets/70cbb9b4-524d-4454-be07-7aedd1b60757)

