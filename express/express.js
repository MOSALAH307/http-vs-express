const express = require("express");
const app = express();
const port = 5000;

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

app.use(express.json());

// User end ponts
//======================================

// get all users
app.get("/getAllUsers", (req, res) => {
  return res.json(users);
});
//======================================
// get all posts
app.get("/getAllPosts", (req, res) => {
  return res.json(posts);
});
//======================================
// get all users sorted alphapetically
app.get("/getAllUsersSorted", (req, res) => {
  let sortedUsers = [...users];
  sortedUsers.sort((a, b) => {
    if (a.name.toLowerCase() < b.name.toLowerCase()) {
      return -1;
    }
    if (a.name.toLowerCase() > b.name.toLowerCase()) {
      return 1;
    } else {
      return 0;
    }
  });
  return res.json(sortedUsers);
});
//======================================
// get all posts reversed
app.get("/getAllPostsReversed", (req, res) => {
  const reversedPosts = [...posts];
  return res.json(reversedPosts.reverse());
});
//======================================
// search user by id
app.get("/searchUserById", (req, res) => {
  // console.log(req.body);
  const { id } = req.body;
  const userFound = users.find((user) => {
    return user.id == id;
  });
  if (userFound) {
    return res.json({ user: userFound });
  } else {
    return res.json({ message: "user does not exist" });
  }
});
//======================================
// search post by id
app.get("/searchPostById", (req, res) => {
  // console.log(req.body);
  const { id } = req.body;
  const postFound = posts.find((post) => {
    return post.id == id;
  });
  if (postFound) {
    return res.json({ post: postFound });
  } else {
    return res.json({ message: "post does not exist" });
  }
});
//======================================
// add user
app.post("/addUser", (req, res) => {
  // console.log(req.body);
  const { id } = req.body;
  let userExists = users.find((user) => {
    return user.id == id;
  });
  if (userExists) {
    return res.json({ message: "user already exists" });
  } else {
    users.push(req.body);
    return res.json({ message: "user added", users });
  }
});
//======================================
// add post
app.post("/addPost", (req, res) => {
  // console.log(req.body);
  const { id } = req.body;
  let postExists = posts.find((post) => {
    return post.id == id;
  });
  if (postExists) {
    return res.json({ message: "post already exists" });
  } else {
    posts.push(req.body);
    return res.json({ message: "post added", posts });
  }
});
//======================================
// delete user
app.delete("/deleteUser", (req, res) => {
  // console.log(req.body);
  const { id } = req.body;
  const newUsers = users.filter((user) => {
    return user.id != id;
  });
  if (newUsers.length == users.length) {
    return res.json({ message: "user does not exist" });
  } else {
    users = newUsers;
    return res.json({ message: "user deleted", users });
  }
});
//======================================
// delete post
app.delete("/deletePost", (req, res) => {
  // console.log(req.body);
  const { id } = req.body;
  const newPosts = posts.filter((post) => {
    return post.id != id;
  });
  if (newPosts.length == posts.length) {
    return res.json({ message: "user does not exist" });
  } else {
    posts = newPosts;
    return res.json({ message: "user deleted", posts });
  }
});
//======================================
// update user
app.patch("/updateUser", (req, res) => {
  // console.log((req.body));
  const { id, age } = req.body;
  let userExists = false;
  let updatedUser;
  for (const user of users) {
    if (user.id == id) {
      user.age = age;
      userExists = true;
      updatedUser = user;
      break;
    }
  }
  if (userExists) {
    return res.json({ message: "user updated", user: updatedUser });
  } else {
    return res.json({ message: "user does not exist" });
  }
});
//======================================
// update post
app.patch("/updatePost", (req, res) => {
  // console.log((req.body));
  const { id, subject } = req.body;
  let postExists = false;
  let updatedPost;
  for (const post of posts) {
    if (post.id == id) {
      post.subject = subject;
      postExists = true;
      updatedPost = post;
      break;
    }
  }
  if (postExists) {
    return res.json({ message: "post updated", post: updatedPost });
  } else {
    return res.json({ message: "post does not exist" });
  }
});

app.listen(port, () => {
  console.log(`app running on ${port}`);
});
