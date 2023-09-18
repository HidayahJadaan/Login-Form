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
  
          window.location.href = "../pages/post.html";
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

  login();

