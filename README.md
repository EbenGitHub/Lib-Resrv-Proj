# <img src="https://raw.githubusercontent.com/EbenGitHub/Lib-Resrv-Proj/main/client/src/assets/lib.webp" data-canonical-src="https://gyazo.com/eb5c5741b6a9a16c692170a41a49c858.png" width="50" height="50" /> ላyብRaሪ 
This is alx specialization final project.. 🥳🥳
> [url link](https://library-31bw.onrender.com/)
```

  .---.    .-./`)  _______   .-------.       ____    .-------.       ____     __            ____    .-------. .-------.  
  | ,_|    \ .-.')\  ____  \ |  _ _   \    .'  __ `. |  _ _   \      \   \   /  /         .'  __ `. \  _(`)_ \\  _(`)_ \ 
,-./  )    / `-' \| |    \ | | ( ' )  |   /   '  \  \| ( ' )  |       \  _. /  '         /   '  \  \| (_ o._)|| (_ o._)| 
\  '_ '`)   `-'`"`| |____/ / |(_ o _) /   |___|  /  ||(_ o _) /        _( )_ .'          |___|  /  ||  (_,_) /|  (_,_) / 
 > (_)  )   .---. |   _ _ '. | (_,_).' __    _.-`   || (_,_).' __  ___(_ o _)'              _.-`   ||   '-.-' |   '-.-'  
(  .  .-'   |   | |  ( ' )  \|  |\ \  |  |.'   _    ||  |\ \  |  ||   |(_,_)'            .'   _    ||   |     |   |      
 `-'`-'|___ |   | | (_{;}_) ||  | \ `'   /|  _( )_  ||  | \ `'   /|   `-'  /             |  _( )_  ||   |     |   |      
  |        \|   | |  (_,_)  /|  |  \    / \ (_ o _) /|  |  \    /  \      /              \ (_ o _) //   )     /   )      
  `--------`'---' /_______.' ''-'   `'-'   '.(_,_).' ''-'   `'-'    `-..-'                '.(_,_).' `---'     `---'      
                                                                                                                         

```

## About the Project
### Description
Hi! Welcome to the ultimate ላyብRaሪ, library for local library users and book lovers. This is a complete guide about the project of ላyብRaሪ. Briefly speaking, this is an app for reserving books while sitting and relaxing at your home. Sounds interseting? I will take you to a journey, from the idea conception all the way to the deployment, my inspirations and the technologies I used. Buckle up and let's hit the notes 😊.
### Targets
Simply this app is for Students, Teachers, Professors or any one who loves and reads books. Have you ever went to a library seeking to read or borrow a  book, but went back home disappointed the book you are looking is not available. Or Have you ever spend your day working or learning and did not get the chance to go to a library and reserve a book for your study. Say good bye to those problems. This app will help you solve problems related with book reserving issues.
### UIUX Designs
I used some imaginary characters (Persona) to consider people with different background, gender, occupations, etc...
And I tried to set the problem and user experience with User Journey Map, User Story and Problem Statement.
Before starting to build anything, I sketch how the web should look like using paper wireframe and Low Fidelity Prototype using Figma.
I did usability study on three people and after improving based on the feedbacks, I created case study for the project.
### CICD Workflow
> I used CircleCI for my countinuous integration and continuous deployment
[![CircleCI](https://dl.circleci.com/status-badge/img/gh/Eenrics/Udacity-ML-app/tree/main.svg?style=svg)](https://dl.circleci.com/status-badge/redirect/gh/Eenrics/Udacity-ML-app/tree/main)
### Technologies
* React
* Redux
* Nodejs
* Express
* Apollo GraphQL
* WebSocket
* Tailwindcss
* Formik
* Yup
* Jest
* Render
* Figma
* docker
* kubernetes
* huskey
* prettier
* emailjs

####

## Inspiration
### Description
Any local people know that, if you want to reserve a book, you have to be present in person there at the library. There is no garantee that when you go to the library that you will get the book you are looking for. This creates huge frustration among people, students and teachers.. especially those who sacrified alot just to go to the library.
### Problem trying to solve
This application will solve the problem of being physically present at the local library just to reserve a book. You will have certain amount of days (usually three days) with in which you must come to the library and take the reserved book. If you did not take the book after those days, the book will expire and you have to reserve again if the book is available. When you take the book, the book will be marked as unavailable for reservation untill you returned the book. The web application uses websocket and apollo graphql subsription, that when two or more people are using the app and when one of them reserve the book, the server will notify all connected clients about the changes and it will be immediatly reflected on the users screen as unavailable.
### Still unsloved problems
This application will not solve the following problems.
* You will be able to read the book tile and author, but you won't be able to read the content of the book using this app.
* This app will only avoid the need for physical availability to reserve the book. But to take the book, you have to be physically present.

####

## How to use it
### Installation and Running
Got to this [url link](https://library-31bw.onrender.com/). Sign up. And start reserving books. For the time being, the datum are not real.
If you prefer to install it locally and test it out for yourself..

##### Using GitHub Codes
> First Make sure you have node version `16.19.0` or latest. The application is made with `19.8.1`, and if you use node version older than `16.19.0`, It will not work
> Pull the github repository
####
```bash
git pull https://github.com/EbenGitHub/Lib-Resrv-Proj/
```
> Navigate to `server` directory and install dependencies
####
```bash
cd server/
npm install
```
> Run the apollo graphql, ws and express server
####
```bash
npm start
```
> Install the dependecies for the frontend and Run the app
####
```bash
cd ../client
npm install
npm run deploy
```
Go to `http://localhost:4000`. It is ready.

##### Using Docker Images
> Pull the github repository
####
```bash
git pull https://github.com/EbenGitHub/Lib-Resrv-Proj/
```
> Install docker
####
```bash
sudo apt install docker.io -y
```
> Go to `server` and `client` directory and run the scrept for building the docker image
####
```bash
cd server/
./run_docker.sh
cd ../client
./run_docker.sh
```
> you don't have to run `upload_docker.sh`

##### Using Kubernetes Pods
> Pull the github repository
####
```bash
git pull https://github.com/EbenGitHub/Lib-Resrv-Proj/
```
> Install docker
####
```bash
sudo apt install docker.io -y
```
> Install minikube and kubectl
####
```bash
sudo apt install minikube kubectl -y
```
> Go to `server` and `client` directory and run the scrept for pulling the docker image and deploying to kubernetes cluster
####
```bash
cd server/
./run_kubernetes.sh
cd ../client
./run_kubernetes.sh
```
####

## Live DEMO and URL
[video link](https://www.veed.io/view/374e7a27-cf73-4ede-b443-147286e3f8ba?panel=share)
####

## Developer and License
### Developer
Ebenezer Eshetie [GitHub](https://github.com/EbenGitHub) [LinkedIn](https://www.linkedin.com/in/abenezereshetie/) [Email](mailto:abenezergooo@gmail.com)
### License
Released with __MIT License__.
### Contribute
See `CONTRIBUTE.md`
####
> © Copyright Reserved. Ebenezer Eshetie
