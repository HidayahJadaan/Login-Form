
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
        link.href='"Comments.html';

  
        link.addEventListener("click", async (e) => {
          e.preventDefault(); // Prevent the link from navigating
          const postId = allPosts[i].id;
  
          // Store the postId in localStorage to pass it to the comments.html page
          localStorage.setItem("selectedPostId", postId); //--------------------------------------------------------------- * LocalStorage
  
         window.location.href = "./pages/Comments.html";

        });
  
       
        const commentsSection = document.createElement("div");
        commentsSection.classList.add("comments-section");
        const commentLogo = document.createElement("img");
        commentLogo.src = "./assets/imgs/Comment.svg";
  
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

   
  function handleLogout() {
    const logoutButton = document.getElementById("logout");
  
    logoutButton.addEventListener("click", () => {
      localStorage.removeItem("allUsers");
      localStorage.removeItem("allposts");
      localStorage.removeItem("userName");
      localStorage.removeItem("userEmail");
      localStorage.removeItem("selectedPostId");
      window.location.href = "./pages/index.html";
    });
  }

DisplayPosts();
handleLogout();