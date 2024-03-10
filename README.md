<p align="center"><a href="https://identity.ic0.app" target="_blank" rel="noopener noreferrer"><img src="./assets/Logo.png" alt="Internet Identity"></a></p>

## Introduction

HireVerse is a decentralized hiring platform that allows users to create and apply for job listings. It is built on the
Internet Computer and uses the Motoko programming language. The platform is designed to be decentralized, secure, and
scalable. It is also designed to be easy to use and accessible to everyone.


<p align="center"><a href="https://identity.ic0.app" target="_blank" rel="noopener noreferrer"><img width="800" src="assets/PreviewGIF.gif" alt="Internet Identity"></a></p>


## Features

- Create and apply for job listings
- Manage company profiles and managers
- Review and rate companies and employees
- View open job listings and contact person to apply for them

## Pre-requisites

- Node.js (v20)
- DFX (v0.17.0)
- NPM (v7.24.0)
- WSL2 (Windows Subsystem for Linux)
- Ubuntu-22.04 LTS (WSL2)

## Getting Started (for Windows)

1. Run command ``git clone https://github.com/dave-andrew/HireVerse.git`` to clone the repository
2. Run command ``cd HireVerse`` to navigate to the project directory
3. On windows, make sure you have downloaded the Windows Subsystem for Linux (WSL2), to check if you have it installed,
   run ``wsl --list --verbose`` on powershell/cmd. If you don't have it installed, follow the instructions on this
   link: https://docs.microsoft.com/en-us/windows/wsl/install (The recommended version is Ubuntu-22.04 LTS)
4. Switch to wsl by running ``wsl`` on powershell/cmd
5. Run
   command ``DFX_VERSION=0.17.0 sh -ci "$(curl -fsSL https://raw.githubusercontent.com/dfinity/sdk/dfxvm-install-script/install.sh)"``
   to install the internet computer version 0.17.0
6. Check installed dfx version by running ``dfx --version`` on wsl (make sure it outputted 0.17.0, if not maybe try to
   set the default of the dfx using ``dfxvm default 0.17.0``)
7. Use npm version 20 using ``nvm use 20`` (Install node if you haven't installed it yet by following the instructions
   on this link: https://nodejs.org/en/download/)
8. Run command ``npm install`` to install the required packages
9. Run command ``npm run mops`` to install the mops package
10. Run command ``dfx start --background`` to start the internet computer
11. Run command ``dfx deploy -y --no-wallet`` to deploy the canisters
12. (Optional) Run command ``npm run seed`` to seed the database with dummy data
13. Open a new powershell/cmd window and run ``cd src/Hireverse_frontend``, then ``npm run inner-install`` to install
    the required packages for the frontend
14. Run ``npm run start`` to start the frontend
15. Open a web browser and go to ``http://localhost:8000`` to view the website

## What separates HireVerse?

- Transparency from salary, reviews, and company ratings
- Authentic and verified job listings, companies, and reviews with internet identity
- Decentralized and secure platform
- Easy to use and accessible to everyone

## Preview

![Image Preview](https://github.com/dave-andrew/HireVerse/blob/master/assets/Preview1.png)
![Image Preview](https://github.com/dave-andrew/HireVerse/blob/master/assets/Preview2.png)
![Image Preview](https://github.com/dave-andrew/HireVerse/blob/master/assets/Preview3.png)

## Video Installation Guide & Demo

[Project Showcase](https://youtu.be/PT00fKtOCz8)
[Project Installation Guide](https://youtu.be/gPCakF4NUjo)


## FAQ

- **Why seed the database?**
    - **Seeding the database is optional**, it is only used to populate the database with dummy data for testing
      purposes.
      Currently, when it is not deployed on the main net, the database will be empty. Seeding the database will populate
      the database with dummy data so that you can test the platform. After the platform is deployed on the main net,
      companies and users will populate the database with real data with verified internet identity.
- **Why there is a demo testing alert in the internet identity login?**
    - Because currently HireVerse is not deployed on the mainnet, the official internet identity login
      at https://identity.ic0.app will have a forbidden signature failure. To prevent this, for temporary, HireVerse
      will use the local replica of the internet identity login. This is only for testing purposes and will not be used
      in the final version.
- **Why we must use blockchain for HireVerse?**
    - Blockchain is used to ensure the security and transparency of the platform. It also allows for decentralized
      storage and computation, which makes the platform more secure and scalable. Internet Identity usage allows user to
      give reviews and ratings to companies and employees **anonymously**, but still guarantees **the authenticity** of
      the
      review (One user only can review one time to a company).

## Future Development

- Collaborate with the government to verify company registration. This guarantees all the companies listed on the
  platform are legitimate and trustworthy. With the government verification, companies will have the option to display
  the verified badge on their profile (to apply manager need to pay a specified price). This will increase the
  trustworthiness of the platform and can be another source of income for HireVerse.
- Create premium accounts for companies to access additional features such as advanced analytics and priority listing.
- Implement a premium subscription model for users to access additional features such as advanced analytics and priority
  listing.

## Contact

If you have any questions or want to discuss HireVerse further, please feel free to reach out to us at:

- Email: vincent.tanjaya@binus.edu
