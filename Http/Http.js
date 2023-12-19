//function to convert request body from buffer
const convertData = (req, callback) => {
  let buffered;
  req.on("data", (chunk) => {
    buffered = chunk;
  });
  req.on("end", () => {
    const data = JSON.parse(buffered);
    // console.log(data);
    callback(data);
  });
};

const http = require("http");

http
  .createServer((req, res) => {
    let users = [
      { id: 1, name: "mohamed", age: 27 },
      { id: 2, name: "ahmed", age: 28 },
      { id: 3, name: "mohsen", age: 29 },
      { id: 4, name: "ali", age: 30 },
    ];
    let posts = [
      { id: 1, publisher: "mohamed", subject: "football" },
      { id: 2, publisher: "ahmed", subject: "swimming" },
      { id: 3, publisher: "mohsen", subject: "handball" },
      { id: 4, publisher: "ali", subject: "basketball" },
    ];
    //function to send response in json
    const response = (object) => {
      res.setHeader("Content-Type", "application/json");
      res.write(JSON.stringify(object));
      res.end();
    };
    // User end ponts
    //======================================

    // get all users
    if (req.method == "GET") {
      if (req.url == "/getAllUsers") {
        response({ users });
      }
      //======================================
      // get all posts
      else if (req.url == "/getAllPosts") {
        response({ posts });
      }
      //======================================
      // get all users sorted alphapetically
      else if (req.url == "/getAllUsersSorted") {
        let sortedUsers = [...users];
        sortedUsers.sort((a, b) => {
          if (a.name.toLowerCase() < b.name.toLowerCase()) {
            return -1;
          } else if (a.name.toLowerCase() > b.name.toLowerCase()) {
            return 1;
          } else {
            return 0;
          }
        });
        // console.log(sortedUsers);
        // console.log("original",users);
        response({ usersSorted: sortedUsers });
      }
      //======================================
      // get all posts reversed
      else if (req.url == "/getAllPostsReversed") {
        let sortedPosts = [...posts];
        // sortedPosts.sort((a, b) => {
        //   if (a.id < b.id) {
        //     return 1;
        //   } else if (a.id > b.id) {
        //     return -1;
        //   } else {
        //     return 0;
        //   }
        // });
        // console.log(posts);
        response({ postsReversed: sortedPosts.reverse() });
      }
      //======================================
      //search user by id
      else if (req.url == "/searchUserById") {
        convertData(req, (data) => {
          // console.log(data);
          const { id } = data;
          const userFound = users.find((user) => {
            return user.id == id;
          });
          if (userFound) {
            response({ message: "user exists", user: userFound });
          } else {
            response({ message: "user does not exist" });
          }
        });
        // let buffered;
        // req.on("data", (chunk) => {
        //   buffered = chunk;
        // });
        // req.on("end", () => {
        //   const { id } = JSON.parse(buffered);
        //   // console.log(id);
        //   const userFound = users.find((user) => {
        //     return user.id == id;
        //   });
        //   if (userFound) {
        //     response({ message: "user exists", user: userFound });
        //   } else {
        //     response({ message: "user does not exist" });
        //   }
        // });
      }
      //======================================
      //search post by id
      else if (req.url == "/searchPostById") {
        convertData(req, (data) => {
          const { id } = data;
          const postFound = posts.find((post) => {
            return post.id == id;
          });
          if (postFound) {
            response({ message: "post exists", post: postFound });
          } else {
            response({ message: "post does not exist" });
          }
        });
        // let buffered;
        // req.on("data", (chunk) => {
        //   buffered = chunk;
        // });
        // req.on("end", () => {
        //   const { id } = JSON.parse(buffered);
        //   // console.log(id);
        //   const postFound = posts.find((post) => {
        //     return post.id == id;
        //   });
        //   if (postFound) {
        //     response({ message: "post exists", post: postFound });
        //   } else {
        //     response({ message: "post does not exist" });
        //   }
        // });
      }
    }
    //======================================
    // add new user
    else if (req.method == "POST") {
      if (req.url == "/addNewUser") {
        convertData(req, (newUser) => {
          let userExists = users.find((user) => {
            return user.id == newUser.id;
          });
          if (!userExists) {
            users.push(newUser);
            response({ message: "user added", users });
          } else {
            response({ message: "user already exists" });
          }
        });
        // let buffered;
        // req.on("data", (data) => {
        //   buffered = data;
        // });
        // req.on("end", () => {
        //   let newUser = JSON.parse(buffered);
        //   // console.log(newUser);
        //   let userExists = users.find((user) => {
        //     return user.id == newUser.id;
        //   });
        //   if (!userExists) {
        //     users.push(newUser);
        //     // console.log(users);
        //     response({ message: "user added", users });
        //   } else {
        //     response({ message: "user already exists" });
        //   }
        // });
      }
      //======================================
      // add new post
      else if (req.url == "/addNewPost") {
        convertData(req, (newPost) => {
          let postExists = posts.find((post) => {
            return post.id == newPost.id;
          });
          if (!postExists) {
            posts.push(newPost);
            response({ message: "post added", posts });
          } else {
            response({ message: "post already exists" });
          }
        });
        // let buffered;
        // req.on("data", (data) => {
        //   buffered = data;
        // });
        // req.on("end", () => {
        //   let newPost = JSON.parse(buffered);
        //   // console.log(newPost);
        //   let postExists = posts.find((post) => {
        //     return post.id == newPost.id;
        //   });
        //   if (!postExists) {
        //     posts.push(newPost);
        //     // console.log(posts);
        //     response({ message: "post added", posts });
        //   } else {
        //     response({ message: "post already exists" });
        //   }
        // });
      }
    }
    //======================================
    //delete user
    else if (req.method == "DELETE") {
      if (req.url == "/deleteUser") {
        convertData(req, ({ id }) => {
          const newUsers = users.filter((user) => {
            return user.id != id;
          });
          if (newUsers.length == users.length) {
            response({ message: "user does not exist" });
          } else {
            users = newUsers;
            response({ message: "user deleted", users });
          }
        });
        // let buffered;
        // req.on("data", (chunk) => {
        //   // console.log(chunk);
        //   buffered = chunk;
        // });
        // req.on("end", () => {
        //   const { id } = JSON.parse(buffered);
        //   // console.log(id);
        //   const newUsers = users.filter((user) => {
        //     return user.id != id;
        //   });
        //   // console.log("users", users);
        //   // console.log("new",newUsers);
        //   if (newUsers.length == users.length) {
        //     response({ message: "user does not exist" });
        //   } else {
        //     users = newUsers;
        //     response({ message: "user deleted", users });
        //   }
        // });
      }
      //======================================
      //delete post
      if (req.url == "/deletePost") {
        convertData(req, ({ id }) => {
          const newPosts = posts.filter((post) => {
            return post.id != id;
          });
          if (newPosts.length == posts.length) {
            response({ message: "post does not exist" });
          } else {
            posts = newPosts;
            response({ message: "post deleted", posts });
          }
        });
        // let buffered;
        // req.on("data", (chunk) => {
        //   // console.log(chunk);
        //   buffered = chunk;
        // });
        // req.on("end", () => {
        //   const { id } = JSON.parse(buffered);
        //   // console.log(id);
        //   const newPosts = posts.filter((post) => {
        //     return post.id != id;
        //   });
        //   // console.log("posts", posts);
        //   // console.log("new",newPosts);
        //   if (newPosts.length == posts.length) {
        //     response({ message: "post does not exist" });
        //   } else {
        //     posts = newPosts;
        //     response({ message: "post deleted", posts });
        //   }
        // });
      }
    }
    //======================================
    //update user
    if (req.method == "PATCH") {
      if (req.url == "/updateUser") {
        convertData(req, ({ id, age, name }) => {
          let isExist = false;
          let updatedUser;
          for (const user of users) {
            if (user.id == id) {
              user.age = age;
              // user.name = name;
              isExist = true;
              updatedUser = user;
              break;
            }
          }
          if (isExist) {
            response({ message: "user updated", user: updatedUser });
          } else {
            response({ message: "user does not exist" });
          }
        });
        // let buffered;
        // req.on("data", (chunk) => {
        //   buffered = chunk;
        // });
        // req.on("end", () => {
        //   const { id, age } = JSON.parse(buffered);
        //   // console.log(id,age);
        //   let isExist = false;
        //   let updatedUser;
        //   for (const user of users) {
        //     if (user.id == id) {
        //       user.age = age;
        //       // console.log(user);
        //       isExist = true;
        //       updatedUser = user;
        //       break;
        //     }
        //   }
        //   if (isExist) {
        //     response({ message: "user updated", user: updatedUser });
        //   } else {
        //     response({ message: "user does not exist" });
        //   }
        // });
      }
      //======================================
      //update post
      if (req.url == "/updatePost") {
        convertData(req, ({ id, publisher, subject }) => {
          let isExist = false;
          let updatedPost;
          for (const post of posts) {
            if (post.id == id) {
              post.subject = subject;
              // post.publisher = publisher
              isExist = true;
              updatedPost = post;
              break;
            }
          }
          if (isExist) {
            response({ message: "post updated", post: updatedPost });
          } else {
            response({ message: "post does not exist" });
          }
        });
        // let buffered;
        // req.on("data", (chunk) => {
        //   buffered = chunk;
        // });
        // req.on("end", () => {
        //   const { id, subject } = JSON.parse(buffered);
        //   // console.log(id,subject);
        //   let isExist = false;
        //   let updatedPost;
        //   for (const post of posts) {
        //     if (post.id == id) {
        //       post.subject = subject;
        //       // console.log(post);
        //       isExist = true;
        //       updatedPost = post;
        //       break;
        //     }
        //   }
        //   if (isExist) {
        //     response({ message: "post updated", post: updatedPost });
        //   } else {
        //     response({ message: "post does not exist" });
        //   }
        // });
      }
    }
  })
  .listen(3001, () => {
    console.log("server running on 3001");
  });
