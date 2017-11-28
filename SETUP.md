# Setup

Follow these steps to run this app on your personal machine!  Instructions are split into 2 sections:

1. [Environment Setup](#environment-setup)
    
    - Project Requirements 
    - Download the Project
    - Setup Local Environment 

2. [Run Web Bakers](#run-web-bakers)

## Environment Setup

### Project Requirements

1. [Install Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)

    Check that it installed correctly:

    ```
    which git
    ```

    If Git was installed, this will return the path `/usr/local/bin/git`  
    If you get an error, check the Git documentation and try again.

2. [Install Node.js](https://nodejs.org/en/)

    Check the version installed:

    ```
    node -v
    ```
    Note: As of November 2017, we are using node 6.10.0 for this project, but any version higher than 6 should work.

    Along with Node, your install should also give you a copy of npm and all of its libraries.  Check your npm version with this command:

    ```
    npm -v
    ```
    Note: As of November 2017, we are using npm 5.0.0 - since Node updates less frequently than NPM, we recommend doing a manual update to get the latest version.  

    Run this command to update npm:

    ```
    npm install npm@latest -g
    ```


3. [Install MongoDB Community Edition](https://docs.mongodb.com/manual/administration/install-community/)

    Follow the instructions for installing to your operating system.


### Download the Project

1. [Clone the repository](https://github.com/Web-Bakers/web-bakers)

    Move to the directory you'd like to use to contain this project and clone it:

    ```
    git clone https://github.com/Web-Bakers/web-bakers.git
    ```

2. Move into that repository.

    ```
    cd web-bakers
    ```

3. Contact the team if you would like to contribute regularly and need access to push updates to the repository.

### Setup Local Environment

1. Install Node.js dependencies inside your web-bakers directory:

    ```
    npm install
    ```

## Run Web Bakers

1. Get MongoDB running:

    1. In an empty terminal, start the database process:
        ```
        mongod
        ```

        The `waiting for connections` message in the console means the process is running successfully.

    2. To interact with MongoDB, open a new terminal and run a mongo shell:
        ```
        mongo
        ```
    Note: if these commands do not work for your machine, see the installation instructions, or try using the full path to the script files, for example:
    ```
     C:\Program Files\MongoDB\Server\3.4\bin\mongod
     and
     C:\Program Files\MongoDB\Server\3.4\bin\mongo
    ```

    Leave these terminals open while you work with the repo!

2. Run the app:

    1. Get the node app running:

        ```
        node app.js
        ```

        You should see a message in the console once the app is running: `"Server running... what's going on in the kitchen?"` 
    
    2. Check it out:
    
        Open a browser and navigate to `localhost:3000` to view the landing page.  

3. Run the tests:

    Instructions coming soon!

4. Shut down MongoDB when finished:

    Make sure to go to both MongoDB terminals and use `Ctrl + C` to shut down the database. 


_____________________________
If you have trouble with any of these steps, please [open a new issue](https://github.com/Web-Bakers/web-bakers/issues) describing what went wrong.

If you are ready to code, check out our [Contribution Guidelines](https://github.com/Web-Bakers/web-bakers/blob/develop/CONTRIBUTING.md) for next steps!

Last updated: 11/25/2017