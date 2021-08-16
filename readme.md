Hi! This is my first server & API & web app created with Node.js and ExpressJS.

This web app is a World of Warcraft character manager that lets users (manually) upload their characters to track:
- Realm
- Faction
- Race
- Class
- Level
- Crafting professions (not cooking, fishing nor archaeology)
- Picture (views are optimized for WoW official webpage character pictures)
- Guild

Character management requires user authentication.

Users can only view/edit/delete their own characters.

In guild view, users can see a preview of all guild members, but can only view/edit/delete their own characters.

## Dependencies
- express
- nodemon
- dotenv

Database:
- mongoose
- method-override

Views:
- hbs

Image uploading:
- multer
- cloudinary
- streamifier

Authentication:
- passport
- passport-local
- express-session
- connect-mongo
- bcrypt

## Resources
- Font icons: https://fontawesome.com/
- Alliance & Horde emblems: https://worldofwarcraft.com/en-gb/game/races
