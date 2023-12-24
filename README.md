# React Habit Tracking APP

## Coding ninjas React Skill Test 3

- Built by using React (vite), Redux toolkit, local storage Tailwind CSS, , React spinners, React toastify, React router dom, heroicons

## Features

- Redux toolkit implementation for storing habits
- Create habit
- toggle any particular date habit state
- update habit info
- delete habit
- Tracking highest streak
- Tracking continuous count and many more
- Generic alert service to show success, error, and warn messages using react toastify library

## Project Folder structure

- app -> all src code
  - Components -> All components
  - store -> Redux store
  - Layouts -> This folder contains Public layout, Header, footer component
  - Services -> All services to call api endpoints or access outside of the project resources
  - In each feature one slices folder is there which will contain all feature slices, which we will use that inside feature components using useSelector or useDispatch hook
  - app.routes.jsx -> Routing configuration file

## How to run this project locally

- Clone this repository
- Run "npm install" inside this project
- Run "npm run dev" command to run this project locally
- Copy and open URL in any browser that's it

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
