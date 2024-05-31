set type=%1

IF %type% EQU install (
    set command=npm install
) ELSE (
    set command=npm run %type%
)

IF %type% EQU  (
    set command=npm run dev
)

start cmd k cd auth-service && %command% && exit
start cmd k cd user-service && %command% && exit
start cmd k cd product-service && %command% && exit
start cmd k cd order-service && %command% && exit