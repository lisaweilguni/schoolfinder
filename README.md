# schoolfinder

## Description

schoolfinder is a full-stack progressive web app that helps students find the right high school. Schools can sign up and create a profile, students and parents can search based on location and multiple interests.

Visit the deployed site of **schoolfinder** [here](https://schoolfinder.fly.dev/).
Watch a 3-minute intro video to the project [here](https://www.youtube.com/watch?v=_yXq5PoJ0kg&feature=youtu.be).

![image](https://user-images.githubusercontent.com/109659918/203014655-9acd186f-e048-4c4e-85f7-e9590186d665.png)

## Design

This application is fully responsive for all screen sizes.
The design, layout and prototype was developed in Figma and implemented with Emotion.
In case you are interested, view my **figma design board** [here](https://www.figma.com/file/KKkyvPkQFprLiXeW85meAG/schoolfinder?node-id=0%3A1&t=ylX6z3YB8sZQU49p-1).

## Functionalities

- Search page with the option to filter based on location and multiple interests
- Full user authentication process (registration and login)
- User authorisation incl. creation of session tokens
- Registered schools can add schools to the platform (incl. option to choose up to three specializations)
- Dynamic routing for each school details page
- The location of each school is displayed on a map (Google Maps API)
- Private profile page where registered schools can edit or delete their profile and school information
- First-time users can get a tour of the functionalities
- The header adapts based on screen size and status of the user (logged in / not logged in)

## Technologies

- Next.js
- Typescript
- React
- PostgreSQL
- Node.js
- Emotion
- REST API
- Google API (Geocode, Maps)
- Figma
- DrawSQL
- Jest
- Playwright
- Fly.io

## Screenshots

### Search page
![image](https://user-images.githubusercontent.com/109659918/203014970-7897fc95-4c6c-4d6e-be52-a0d2c21b7af9.png)

### School details
![image](https://user-images.githubusercontent.com/109659918/203015517-fb9dc460-1118-4987-acd3-f139bc72952d.png)

### Private profile
![image](https://user-images.githubusercontent.com/109659918/203015317-82dab6bc-8c08-4a88-ae5a-ad55e12a2b8d.png)

### Design system in Figma
![image](https://user-images.githubusercontent.com/109659918/203016478-636ac265-8411-4cf7-9ff0-135a005517b5.png)

### Responsive Design
![image](https://user-images.githubusercontent.com/109659918/203347087-216e40bc-e252-415d-8ce5-764041a65611.png)

### Wireframing
![image](https://user-images.githubusercontent.com/109659918/203993323-f72f8597-5d77-4c76-8841-70178da0da7a.png)

### Wireframing (grey-scale)
![image](https://user-images.githubusercontent.com/109659918/203993247-a6c08956-a523-4bf6-9f0e-0f00776f3ab6.png)

### Project Management (Notion)
![Notion2](https://user-images.githubusercontent.com/109659918/203324457-92d23578-d8a8-4a16-8c6b-df082322841f.png)

### Database schema on DrawSQL
![Screenshot 2022-11-21 at 10 44 12](https://user-images.githubusercontent.com/109659918/203018384-b25c9463-df9b-4f4d-8c1f-ddd042d6b073.png)

## Setup instructions

- Clone the repository with `git clone <repo>`
- Setup the database by downloading and installing PostgreSQL
- Create a user and a database
- Create a new file .env
- Create an API key on the Google Maps Platform and store it in your .env with a variable name starting with NEXT_PUBLIC_
- Copy the environment variables from .env-example into .env
- Replace the placeholders xxxxx with your username, password and name of database
- Install dotenv-cli with `yarn add dotenv-cli`
- Run `yarn install` in your command line
- Run the migrations with `yarn migrate up`
- Start the server by running `yarn dev`

## Deploy on fly.io

- Generate a Fly.io Token, called _GitHub Actions Deploy Token_ and copy the text
- Create a new repository secret in the GitHub repo, named FLY_API_TOKEN
- Log into Fly.io on the command line: `flyctl auth login`
- Create an app `flyctl apps create --name <app name>`
- Create the Fly.io config files
- Add database credentials using Fly.io secrets
  `flyctl secrets set PGHOST=localhost PGDATABASE=$(openssl rand -hex 16) PGUSERNAME=upleveled$(openssl rand -hex 16) PGPASSWORD=$(openssl rand -base64 32)`
- Add built time environment variables to the config files (fly.toml, Dockerfile) as described [here](https://fly.io/docs/languages-and-frameworks/nextjs/#what-about-build-time-environment-variables)
- Create a 1GB volume for the PostgreSQL database in Frankfurt
  `flyctl volumes create postgres --size 1 --region fra`
- Deploy: `flyctl deploy`


