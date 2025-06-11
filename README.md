#!/bin/bash

# Clone the project
git clone https://github.com/your-username/todo-app.git
cd todo-app

# Database Setup
echo "Setting up MySQL database..."
mysql -u root -p -e "CREATE DATABASE todo_app;"

# Backend Setup
echo "Setting up backend..."
mkdir -p backend && cd backend
npm init -y
npm install express mysql2 sequelize bcryptjs jsonwebtoken cors dotenv express-validator
npm install -D nodemon

# Create backend .env file
cat > .env <<EOF
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=Santhosh@143
DB_NAME=todo_app
JWT_SECRET=f14bc0a9f1c7e46a9e2019e84cfaf1c2bc19df2eb6c4c7e28a8c34edc76de7f9
PORT=5000
EOF

# Start backend (in development mode)
npm run dev &

# Frontend Setup
cd ..
echo "Setting up frontend..."
npx create-next-app@latest frontend
cd frontend
npm install axios react-hot-toast

# Create frontend .env.local file
cat > .env.local <<EOF
NEXT_PUBLIC_API_URL=http://localhost:5000/api
EOF

# Start frontend
npm run dev

![Screenshot 2025-06-10 175003](https://github.com/user-attachments/assets/32d5fe33-26b8-491d-a50c-5f11d45baa21)

![Screenshot 2025-06-10 175036](https://github.com/user-attachments/assets/c98053b1-4eea-4f5f-915d-4d778ac9f823)


![Screenshot 2025-06-10 175214](https://github.com/user-attachments/assets/25ae88f8-c3d5-4ee6-a4c9-677582f6cc30)


![Screenshot 2025-06-10 175254](https://github.com/user-attachments/assets/1d31cd20-48c6-48d5-af93-e13dc798ca8a)
