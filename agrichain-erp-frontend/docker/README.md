# Docker

There are two main containers, one for the web app and one for mongodb.

#### Setup
You will need docker installed on your computer.
cd into `docker/mongo/` and run `./run.sh` - This will download the mongo image.  
cd into `docker/webapp/` and run `./build.sh` - This will download an Ubuntu image and install all of the necessary dependencies like node, python, mongo libraries, etc.   

#### Running
Two scripts are available once setup is complete  
`run.sh` will drop you into the docker container. From here you can run any existing node commands. To run the app, you will need to make sure that all node dependencies are installed within the container due to the change of environment bindings.  
`run-webapp.sh` will start the docker container and automatically start the development build process for the application.

###### Misc:
In `/utilites`, a script has been added to drop into the mongo shell from within the docker container. This is useful for generating mongo queries or going over what exists in the database already.  

When running the `run-webapp.sh` script, make sure you've installed the node modules from within the docker container. 
