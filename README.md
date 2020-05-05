# dribbble-iecse
Dribbble for IECSE

Mongo Express React Node (Redis, Passport)

Progress so far:
 - Auth, S3, Like, Follow (display features left), Save, Comment, Dev Docker

Things left:
 - Protect routes on frontend better, state management
 - Edge Cases for API Requests (remaining ones)
 - CSS / Designing
 - On Second 5 AM thoughts, schemas might be redundant wrt designs and users 
 - better S3 config maybe send blob from node instead of direct URLs. Depends on security (currently all designs are stored with public access)

How to run:

```./Taskfile.sh```

Mongo CLI

```./Taskfile.sh dbshell```

