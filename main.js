const postsList = document.querySelector(".posts-list");

const url = "http://localhost:5001/api/posts/";

const addPostForm = document.querySelector(".add-post-form");
const titleValue = document.getElementById("title-value");
const bodyValue = document.getElementById("body-value");

let output = "";
let postId;

function renderPosts(posts) {
  posts.forEach((post) => {
    output += `
        <div class="card mt-4 col-md-6 bg-light">
            <div class="card-body" data-id = ${post._id}>
                <h5 class="card-title">${post.title}</h5>
                <h6 class="card-subtitle mb-2 text-body-secondary">${post.date}</h6>
                <p class="card-text">${post.body}</p>
                <a href="#" class="card-link" id="edit-post" onclick = "">Edit</a>
                <a href="#" class="card-link" id="delete-post" onclick = "">Delete</a>
            </div>
        </div>
        `;
  });
  postsList.innerHTML = output;
}

//Get  - Read the posts
//Method : Get
fetch(url)
  .then((res) => res.json())
  .then((data) => renderPosts(data));

// Create - insert new post
// Method - POST
function createNewPost() {
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: titleValue.value,
      body: bodyValue.value,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      const dataArr = [];
      dataArr.push(data);
      renderPosts(dataArr);
    });
  titleValue.value = "";
  bodyValue.value = "";
}

//Event listener for Edit button and Delete Button
// Also to set the text content areas according to their parent values otherwise it takes the first element
// and set the values in the areas accordingly. Using event listener we can select each element and to update them
// set the text areas as their value.

postsList.addEventListener("click", (e) => {
  e.preventDefault();
  if (e.target.id == "edit-post") {
    console.log("edit button pressed");
    const parent = e.target.parentElement;
    let titleContent = parent.querySelector(".card-title").textContent;
    let bodyContent = parent.querySelector(".card-text").textContent;

    titleValue.value = titleContent;
    bodyValue.value = bodyContent;
    postId = e.target.parentElement.dataset.id;
  } else if (e.target.id == "delete-post") {
    console.log("delete button pressed");
    postId = e.target.parentElement.dataset.id;
    deletePost(postId);
  }
});

//Delete - Remove the existing post
//method - DELETE
function deletePost(id) {
  
  fetch(`${url}/${id}`, {
    method: "DELETE",
  })
    .then((res) => res.json())
    .then(() => location.reload());
}

// Update - update the existing post
// Method - PATCH
function editPost() {

  console.log(postId);
  fetch(`${url}/${postId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: titleValue.value,
      body: bodyValue.value,
    }),
  })
    .then((res) => res.json())
    .then(() => location.reload());
}