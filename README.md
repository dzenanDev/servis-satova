#Servis satova React JS

#Used technologies
-React
-Typescript
-AntD - Ant Design
-Node (server side)

How to use?
Clone the project locally and:

Create local .env
cp .env.sample .env
Install and start locally
yarn install
yarn start
Development IDE with VSCode

To use with VSCode make sure to:

Do not delete the .vscode folder in root of the project
When prompted to choose TypeScript version pick the workspace version of Typescript over the version provided along with VSCode
Use ESlint and Prettier that come with the project

Project file structure
The structure of files in this project is opinionated and based on best practices from other projects, mainly: AntDesign Pro and Next.js examples

|_ node_modules
|_ public        
|_ src
    |_ utils
    |_ styles  
    |_ locales 
    |_ pages
        |_ 404.tsx
        |_ HomePage
            |_ index.tsx
            |_ styles.module.scss
            |_ components
                |_ ...
    |_ layouts
    |_ interfaces
    |_ redux
        |_ store.ts
        |_ modules
            |_ module.ts
    |_ components
        |_ SuperComponent
            |_ index.tsx
            |_ styles.module.scss
            |_ FETCH_USERS.graphql
            |_ HelperComponent.tsx
            |_ BigHelperCompoent
                |_ ...
Notes:
Translation are based on next-i18next. And the folders for 'locales' are located in ./public/locales folder [*** REVISE ***]
Global libraries and custom js can be placed in ./lib
Use aliases to access:
src ~ (e.g import home from '~/pages/home')
components @components
