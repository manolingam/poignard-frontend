# Poignard

A platform for artists to create NFTs in support of Ukraine: all proceeds go to UkraineDAO and Unchain Fund. This repository contains the codebase for poignard frontend.

## How to run

- Clone the repository.
- Create a new local branch for whatever you are working on. For example, `git checkout -b <branch-name>`.
- `npm install` to get the dependancies installed locally.
- Create a `.env.local` file and copy the variables from `sample.env` with your own corresponding secrets.
- `npm run dev` to start running the server locally.

## How to make a pull request

Once you have commited changes in your local branch and pushed to your cloned repository, make a pull request to the `develop` branch for review.

## What is the tech stack

Runs on **NextJs** with the use of additional libraries below.

### Styling

- ChakraUI
- Styled Components

### Web3

- EthersJs
- Web3Js
- Web3Modal

### Requests

- Axios
- Urql
- Faketag
- JWT
