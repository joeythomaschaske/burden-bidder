# burden-bidder
1. download Intellij Idea and register for a student account
2. Open Idea and select new project
3. select Google App Engine project - you may need to download the app engine sdk, so do this and select the app engine sdk from the drop down
4. after the project is done creating itself, delete index.jsp, and the appengine-web.xml and web.xml files in web/WEB-INF folder
5. open the directory where you created this project in terminal/command line
6. type git init
7. git remote add origin https://github.com/joeythomaschaske/burden-bidder.git
8. git fetch
9. git pull origin master
10. this should sync your local project with the remote project

#Deploying
1. In the top right there should be an airplane icon, click on that and click on edit configurations
2. In the top left of the dialog hit the + button and select Google App Engine Deployment
3. Select a name and click Apply
4. To deploy hit the play button in the top right
5. A dialog may appear asking for a project name/ID. Enter burdenbidder
6. Enter a password if prompted
7. the app will deploy, and a browse window will open showing a key, copy this key
8. Paste the key in Idea at the prompt
9. see the live changes at burdenbidder.appspot.com