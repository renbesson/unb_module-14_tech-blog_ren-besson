////////////////////////////////////////////////////////////////////////////////////////
// Add new comment
////////////////////////////////////////////////////////////////////////////////////////
const newCommentHandler = async (event) => {
  event.preventDefault();

  const text = document.getElementById("newComment").value.trim();

  if (text) {
    const response = await fetch("/api/comment", {
      method: "POST",
      body: JSON.stringify({ text, post_id }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace(`/post/${post_id}`);
    } else {
      const myJson = await response.json();
      alert(`${response.statusText}`);
    }
  }
};

document.getElementById("newCommentBtn").addEventListener("click", newCommentHandler);

////////////////////////////////////////////////////////////////////////////////////////
// Update comment
////////////////////////////////////////////////////////////////////////////////////////
const updateCommentHandler = async (event) => {
  event.preventDefault();

  const id = event.target.attributes[1].value;
  console.log(id);
  const text = document.getElementById(`updateComment-${id}`).value.trim();

  if (text) {
    const response = await fetch(`/api/comment/${id}`, {
      method: "PUT",
      body: JSON.stringify({ text, id }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace(`/post/${post_id}`);
    } else {
      const myJson = await response.json();
      alert(`${response.statusText}`);
    }
  }
};

const updateBtns = document.querySelectorAll("#updateBtn");

for (const updateBtn of updateBtns) {
  updateBtn.addEventListener("click", updateCommentHandler);
}

////////////////////////////////////////////////////////////////////////////////////////
// Delete comment
////////////////////////////////////////////////////////////////////////////////////////
const deleteCommentHandler = async (event) => {
  const id = event.target.attributes[1].value;

  if (id) {
    const response = await fetch(`/api/comment/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace(`/post/${post_id}`);
    } else {
      const myJson = await response.json();
      alert(`${response.statusText}\n${myJson.message}`);
    }
  }
};

const deleteBtns = document.querySelectorAll("#deleteBtn");

for (const deleteBtn of deleteBtns) {
  deleteBtn.addEventListener("click", deleteCommentHandler);
}
