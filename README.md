
```bash
Check branches 
```

# Incubation app
Incubation app is an Single Page MERN STACK project where new start up's can apply for INCUBATION.
Company's can apply for Incubation by sign-up/log-in to app and check the status of th application.
Admin can view Pending/New Application Details And verify it. Then either Approve  or Reject the application
And Allot Slot for Approved startups.  


## Tech Stack

**Client:** React, Bootstrap,Formik

**Server:** Node, Express,MongoDB,



* JWT authentication (httpOnly cookie)
* Image upload handled by Multer
* Formik and Yup  for form validation and form submission
* Axios to handle request from client to server
* Context Api's 


## Screenshots

[![incub1.jpg](https://i.postimg.cc/qqSJ7yts/incub1.jpg)](https://postimg.cc/9wP584Y0)

[![incub2-1.jpg](https://i.postimg.cc/DZtLbCM0/incub2-1.jpg)](https://postimg.cc/ftfJGvZQ)

## Lessons Learned

By doing this project i got a chance to implement what i have learned so far in React and 
Nodejs .In server side got a chance to use mongoose  and multer module  to connect to database and store 
images . tried  to implement refreshing tokens ended up in httpOnly tokens with an dummy in next project will try again . 

In client side it was a whole new experience bcz a jump from handlebars to React.
learned how to use useContext,Fomik,yup ,modals,etc.. created a context to handle user and admin 
AUTHENTICATION another context to handle the all applications received from server.
bootstrap modals to view applications and to allot slot. 

### `npm run dev`

Runs the react in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

Runs the node (server) in the development mode.\
Open [http://localhost:5000](http://localhost:5000) to view it in your browser.

used concurrently module to run server and react to run same time.


 
 