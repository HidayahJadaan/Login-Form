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
        <img src="../assets/imgs/Comment.svg">
  
        <textarea class="add-comment-text" placeholder="Write a comment..." id="add-commentText"></textarea>
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

    // console.log("Comments:", comments);
  } catch (error) {
    console.error("Error fetching comments data", error);
    return [];
  }
}

//#########################################################

function AddNewComment(wrapper, commentsContainer) {
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
  console.log("clicked");
  localStorage.removeItem("allUsers");
  localStorage.removeItem("allposts");
  localStorage.removeItem("userName");
  localStorage.removeItem("userEmail");
  localStorage.removeItem("selectedPostId");
  window.location.href = "../pages/index.html";
}

displaycomments();
AddNewComment();
