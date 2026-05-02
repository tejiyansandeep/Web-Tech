import { useEffect, useState } from "react";
import "./App.css";
const API = import.meta.env.VITE_API_URL || "http://localhost:5000";
function App() {
const [posts, setPosts] = useState([]);
const [title, setTitle] = useState("");
const [content, setContent] = useState("");
const [editingId, setEditingId] = useState(null);
const fetchPosts = async () => {
const res = await fetch(`${API}/posts`);
const data = await res.json();
setPosts(data);
};
useEffect(() => {
const fetchData = async () => {
const res = await fetch(`${API}/posts`);
const data = await res.json();
setPosts(data);
};
fetchData();
}, []);
const handleSubmit = async (e) => {
e.preventDefault();
const method = editingId ? "PUT" : "POST";
const url = editingId
? `${API}/posts/${editingId}`
: `${API}/posts`;
await fetch(url, {
method,
headers: { "Content-Type": "application/json" },
body: JSON.stringify({ title, content }),
});
setTitle("");
setContent("");
setEditingId(null);
fetchPosts();
};
const handleEdit = (post) => {
setTitle(post.title);
setContent(post.content);
setEditingId(post._id);
};
const handleDelete = async (id) => {
await fetch(`${API}/posts/${id}`, {
method: "DELETE",
});
fetchPosts();
};
return (
<div className="container">
<h1> Blog's</h1>
<form onSubmit={handleSubmit}>
<input
type="text"
placeholder="Title"
value={title}
onChange={(e) => setTitle(e.target.value)}
required
style={{ width: "100%", marginBottom: "10px" }}
/>
<textarea
placeholder="Content"
value={content}
onChange={(e) => setContent(e.target.value)}
required
style={{ width: "100%", marginBottom: "10px" }}
/>
<button type="submit">
{editingId ? "Update Post" : "Add Post"}
</button>
</form>
<hr />
{posts.map((post) => (
<div key={post._id} className="post">
<h3>{post.title}</h3>
<p>{post.content}</p>
<button onClick={() => handleEdit(post)}>Edit</button>
<button onClick={() => handleDelete(post._id)}>Delete</button>
</div>
))}
</div>
);
}
export default App