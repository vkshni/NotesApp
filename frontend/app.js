// Frontend

// Buttons
const saveBtn = document.getElementById("save-btn");
const clearBtn = document.getElementById("clear-btn");

// Inputs
const titleInput = document.getElementById("title-input");
const content = document.getElementById("content");

// Containers
const msgBox = document.getElementById("msg");
const notesListBox = document.getElementById("notes-list");

// Save Btn click
saveBtn.onclick = () => saveBtnAction();

// Save Notes
const saveBtnAction = async () => {

    const title = titleInput.value.trim();
    const noteContent = content.value.trim();

    if (title === "") return showMsg("Please enter title", "red");

    // Save to storage
    await fetch("http://localhost:5000/notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content: noteContent })
    });


    titleInput.value = "";
    content.value = "";
    showMsg("Note added successfully", "green");
    loadNotes()  // refresh list
}

// Delete single note
async function deleteNote(id) {
    const response = await fetch(`http://localhost:5000/notes/${id}`, {
        method: "DELETE"
    })
    if (response.ok) {
        document.getElementById(`note-${id}`).remove()
        showMsg("Note deleted", "green")
    }
}

// Clear all Btn click
clearBtn.onclick = () => clearBtnAction();

// Clear all
const clearBtnAction = async () => {
    const response = await fetch("http://localhost:5000/notes/clear", {
        method: "DELETE"
    })
    if (response.ok) {
        loadNotes()
        showMsg("All notes deleted", "green")
    }
}

// Show msg
const showMsg = (msgText, color) => {
    msgBox.innerText = msgText;
    msgBox.style.color = color;
    msgBox.style.display = "block";

    setTimeout(() => {
        msgBox.style.display = "none";
    }, 1000);
}


// Load notes
async function loadNotes() {
    const response = await fetch("http://localhost:5000/notes")
    const notes = await response.json();

    notesListBox.innerHTML = "";

    notes.forEach(note => {
        notesListBox.innerHTML += `
    <div class="note-card" id="note-${note.id}">
        <h3>${note.title}</h3>
        <p>${note.content}</p>
        <button onclick="deleteNote(${note.id})">${"❌"}</button>
        <button>${"Edit"}</button>
    </div>`
    });
}


// Runs on page load
loadNotes();

