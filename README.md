# Fullstack-project
This is my Learn English app project done in school. Well, maybe it's more of a Learn Finnish as it's written in English. The app is done as part of a backend course and it's made with node.js and the frontend is made with React.js.

# How does it work?
The app is meant for kids to learn a new language. The kid can train the words and an adult can add, edit and delete the words.
For the player there's a score counter and indicator which answers were correct, so the player know what to work on.

# Database creation
You can create the database with this :
 CREATE TABLE `words` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `english_word` varchar(30) NOT NULL,
  `finnish_word` varchar(30) NOT NULL,
  PRIMARY KEY (`id`)
) 

# To start the app locally...
The express.js uses files in frontend/build so build has to be created with "npm run build" in frontend folder. After that the app can be started with "node express.js".

# Screencast
https://youtu.be/lUes2u4FXtU
