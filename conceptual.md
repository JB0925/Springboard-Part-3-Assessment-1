### Conceptual Exercise

Answer the following questions below:

- What are some ways of managing asynchronous code in JavaScript?
You can use Promise objects, or you can use async / await.
- What is a Promise?
It is a one time guarantee of a future value that will be returned.
- What are the differences between an async function and a regular function?
An async function returns a Promise, which will need to be resolved. It also uses the keywords "async, and "await". A regular function does neither of these.
- What is the difference between Node.js and Express.js?
Node is a platform for running JS outside of a browser. Express is a web framework using some of the features of Node.
- What is the error-first callback pattern?
This means that, in certain functions, we check for an error first. If an error is found, we exit the running process.
- What is middleware?
Middleware are functions that run between the request and the response. An example might be a "checkForLogin" function that is used as middleware. In express, we place the middleware between the route and the callback. In our hypothetical "checkForLogin", it would check to see if a user is logged in and, presumably if not, it would not allow the rest of the request.
- What does the `next` function do?
"Next" allows the route to continue on to the next thing in the application. So, if an error occurs, it will not stay stuck on the error; the application will continue.
- What are some issues with the following code? (consider all aspects: performance, structure, naming, etc)
1). What if there are other users than elie, joel, and matt? 2). This code would return a list of Promises, so you should call "Promise.all()" on the return value, or call "return Promise.all([elie, matt, joel])" 3). It might be better to not await the AJAX calls and get them in parallel afterwards with "await elie", etc.
```js
async function getUsers() {
  const elie = await $.getJSON('https://api.github.com/users/elie');
  const joel = await $.getJSON('https://api.github.com/users/joelburton');
  const matt = await $.getJSON('https://api.github.com/users/mmmaaatttttt');

  return [elie, matt, joel];
}
```
