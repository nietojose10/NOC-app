# NOC Project

The target is create several tasks using clean architecture with TypeScript

# dev
1. Clone the file .env.template to .env and to .env.test
2. Set up environment variables
3. Execute command ```npm install```
4. Levantar las bases de datos con el comando
    ```
    docker compose up -d
    ```
5. Execute the command
    ```
    npx prisma migrate dev
    ```
6. Execute ```npm run dev```