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

// Clear all Btn click
clearBtn.onclick = () => clearBtnAction();

// Clear Btn action
const clearBtnAction = async () => {
    const response = await fetch("http://localhost:5000/notes", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ delete_all: true })
    });

    if (response.ok) {
        loadNotes();
        showMsg("All notes deleted", "green");
    } else {
        showMsg("Failed to delete notes", "red");
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
    console.log(notes);

    notesListBox.innerHTML = "";

    notes.forEach(note => {
        notesListBox.innerHTML += `
    <div class="note-card">
        <h3>${note.title}</h3>
        <p>${note.content}</p>
    </div>`
    });
}


// Runs on page load
loadNotes();

