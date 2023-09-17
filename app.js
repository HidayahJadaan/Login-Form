async function login() {
  try {
    const usersResponse = await fetch(
      "https://jsonplaceholder.typicode.com/users"
    );
    const allUsers = await usersResponse.json();
    localStorage.setItem("allUsers", JSON.stringify(allUsers)); //--------------------------------------------------------------- * LocalStorage

    if (!usersResponse.ok) {
      // Handle non-OK responses
      throw new Error("Failed to fetch user data");
    }

    const emailInput = document.getElementById("email");
    const loginButton = document.getElementById("loginBtn");

    loginButton.addEventListener("click", async (e) => {
      e.preventDefault(); // Prevent the form from submitting normally
      const email = emailInput.value.trim();
      // console.log('\nemail',email);

      // Check if the provided email exists in the list of users
      const isValid = allUsers.find((user) => user.email === email);
      // console.log('\nisValid',isValid);

      if (isValid) {
        localStorage.setItem("userEmail", email); //--------------------------------------------------------------- * LocalStorage

        const currentUser = allUsers.find((user) => user.email === email);
        console.log("currentUSer", currentUser);

        localStorage.setItem("userName", currentUser.name); //--------------------------------------------------------------- * LocalStorage

        // console.log(currentUser)

        window.location.href = "./post.html";
      } else {
        const errorText = document.getElementById("errorText");
        errorText.textContent = "Invalid email. Please check your credentials.";
        errorText.style.color = "red";
      }
    });

    // console.log(allUsers);
  } catch (error) {
    console.error("Error fetching user data", error);
    return [];
  }
}

//#########################################################

async function DisplayPosts() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    const allPosts = await response.json();

    localStorage.setItem("allposts", JSON.stringify(allPosts)); //--------------------------------------------------------------- * LocalStorage

    const data = localStorage.getItem("allUsers");
    const allUsers = JSON.parse(data);

    // console.log('\nallUsers',allUsers); // ================== Array of objects

    if (!response.ok) {
      throw new Error("Failed to fetch posts data");
    }

    const postsContainer = document.getElementById("posts-section");
    const currentUserEmail = localStorage.getItem("userEmail");
    const currentUserName = localStorage.getItem("userName");

    const local = localStorage.getItem('userEmail');

   if (local){

    for (let i = 0; i < allPosts.length; i++) {
      const email = allUsers.find((user) => user.id === allPosts[i].userId);
      // console.log('DisplayPosts Email',email); /// current user data

      // console.log('DisplayPosts Email',email.email); /// current Email (one email)

      const wrapper = document.createElement("div");
      wrapper.classList.add("wrapper");

      const nameLogo = document.createElement("div");
      nameLogo.classList.add("name-logo");

      const name = document.createElement("h4");
      name.textContent = email.name;

      const UserEmaill = document.createElement("p");
      UserEmaill.textContent = email.email;

      const paragraph = document.createElement("div");
      paragraph.classList.add("post-item-content");
      paragraph.textContent = allPosts[i].body;

      const link = document.createElement("a");
      link.textContent = "See Comments";
      link.classList.add("see-comments");

      link.addEventListener("click", async (e) => {
        e.preventDefault(); // Prevent the link from navigating
        const postId = allPosts[i].id;

        // Store the postId in localStorage to pass it to the comments.html page
        localStorage.setItem("selectedPostId", postId); //--------------------------------------------------------------- * LocalStorage

        window.location.href = "Comments.html";
      });

     
      const commentsSection = document.createElement("div");
      commentsSection.classList.add("comments-section");
      const commentLogo = document.createElement("img");
      commentLogo.src = "./Comment.svg";

      const addComment = document.createElement("textarea");
      addComment.classList.add("add-comment");
      addComment.placeholder = "Add Comment...";

      addComment.addEventListener("submit", () => {
        console.log("New CommentPosted");
      });

      
      commentsSection.appendChild(commentLogo);
      commentsSection.appendChild(addComment);

      commentsSection.appendChild(link);

      wrapper.appendChild(nameLogo);
      wrapper.appendChild(name);
      wrapper.appendChild(UserEmaill);
      wrapper.appendChild(paragraph);
      wrapper.appendChild(commentsSection);

      postsContainer.appendChild(wrapper);
    }

   }

    const AddPostBtn = document.getElementById("AddPost");
    const postModal = document.getElementById("postModal");
    const closeModalBtn = document.querySelector(".close");
    const postInput = document.getElementById("postInput");
    const submitPost = document.getElementById("submitPost");

    AddPostBtn.addEventListener("click", () => {
      // Show the modal when the "Add Post" button is clicked
      postModal.style.display = "block";
    });

    closeModalBtn.addEventListener("click", () => {
      // Hide the modal when the close button is clicked
      postModal.style.display = "none";
    });

    submitPost.addEventListener("click", () => {
      const userPost = postInput.value.trim();

      if (userPost) {
        const wrapper = document.createElement("div");
        wrapper.classList.add("wrapper");

        wrapper.innerHTML = `
      
      <div class="name-logo"> </div>
      <h4> ${currentUserName}</h4>
      <p> ${currentUserEmail}</p>`;

        const postContent = document.createElement("div");
        postContent.classList.add("post-item-content");
        postContent.textContent = userPost;

        wrapper.appendChild(postContent);

        const postsContainer = document.getElementById("posts-section");
        postsContainer.appendChild(wrapper);

        postInput.value = "";

        postModal.style.display = "none";

        console.log("New post added successfully");
      }
    });
  } catch (error) {
    console.error("Error fetching posts data", error);
    return [];
  }
}

//#########################################################

async function displaycomments() {
  try {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/comments"
    );
    const allcomments = await response.json();

    const selectedPost = localStorage.getItem("selectedPostId");
    const selectedPostId = JSON.parse(selectedPost);

    const user = localStorage.getItem("allUsers");
    const alluser = JSON.parse(user);
    // console.log('comments alluser',alluser); // all users (Array of object)

    const ALLPOST = localStorage.getItem("allposts");
    const selectedPostCONTENT = JSON.parse(ALLPOST);

    // console.log('Selected Post Content', selectedPostCONTENT); // all posts (array of objects)

    const thepostcontent = selectedPostCONTENT.filter(
      (item) => item.id === selectedPostId
    );

    // console.log('0000000000000000000',);

    // console.log('From Filter ',thepostcontent); // array of one object (selected post data)
    const theuser = alluser.filter(
      (item) => item.id === thepostcontent[0].userId
    );
    // console.log('the user',theuser); // array of one object (selected user data)

    // console.log('the user first', theuser[0]); // one object (selected user data)

    const POSTCOMMENTS = allcomments.filter(
      (item) => item.postId === selectedPostId
    );

    // console.log('Post Comment ',POSTCOMMENTS); // array of objects (all comments for the selected post)

    const commentsContainer = document.getElementById("comments-section");

    const wrapper = document.createElement("div");
    wrapper.classList.add("wrapper");

    wrapper.innerHTML = `
      
      <div class="name-logo"> </div>
      <h4> ${theuser[0].name}</h4>
      <p> ${theuser[0].email}</p>
      <div class="post-item-content"> ${thepostcontent[0].body}</div>

      <div class="comments-section">
      <img src="./Comment.svg">

      <textarea class="add-comment-text" placeholder="Write a comment..."></textarea>
            <button class="add-new-commentBtn" id="add-new-comment"> 
            <span class="icon"><i class="fas fa-paper-plane fa-lg"></i></span>
            
            </button>
      </div>

      `;

    commentsContainer.appendChild(wrapper);

    for (let i = 0; i < POSTCOMMENTS.length; i++) {
      const commentItem = document.createElement("div");
      commentItem.classList.add("commentItem");

      commentItem.innerHTML = `
          <div class=" comment-wrapper">
          <div class="logo"> </div>
          <h4>${POSTCOMMENTS[i].email}</h4>
          <div class="comment-item-content"> ${POSTCOMMENTS[i].body}</div>
          </div>

          `;

      wrapper.appendChild(commentItem);
    }

    const AddNewCommentBtn = wrapper.querySelector("#add-new-comment");

    AddNewCommentBtn.addEventListener("click", () => {

      AddNewComment(wrapper, commentsContainer);
    });

    console.log("Comments:", comments);
  } catch (error) {
    console.error("Error fetching comments data", error);
    return [];
  }
}


//#########################################################

function AddNewComment(wrapper, commentsContainer){


  const addCommentTextarea = wrapper.querySelector(".add-comment-text");
  const currentUser = localStorage.getItem("userEmail");
  const commentText = addCommentTextarea.value.trim();

  if (commentText) {
    const commentItem = document.createElement("div");
    commentItem.classList.add("commentItem");

    commentItem.innerHTML = `
      <div class="comment-wrapper">
        <div class="logo"></div>
        <h4>${currentUser}</h4>
        <div class="comment-item-content">${commentText}</div>
      </div>
    `;

    wrapper.appendChild(commentItem);
    commentsContainer.appendChild(wrapper);

    // Clear the textarea after adding the comment
    addCommentTextarea.value = "";

    console.log("New comment posted successfully");
  }

}
//#########################################################

function handleLogout() {
  const logoutButton = document.getElementById("logout");

  logoutButton.addEventListener("click", () => {
    localStorage.removeItem("allUsers");
    localStorage.removeItem("allposts");
    localStorage.removeItem("userName");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("selectedPostId");
    window.location.href = "index.html";
  });
}

//#########################################################

// Initialize the app
async function init() {
  login();
  await DisplayPosts();
  await displaycomments();
  handleLogout();
}

init();
