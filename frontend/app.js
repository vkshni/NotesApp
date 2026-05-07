// Frontend

// Buttons
const saveBtn = document.getElementById("save-btn");

// Inputs
const titleInput = document.getElementById("title-input");
const content = document.getElementById("content");

// Containers
const msgBox = document.getElementById("msg");
const notesListBox = document.getElementById("notes-list");

// Temporary Storage
const notesArr = JSON.parse(localStorage.getItem("notes")) || [];


saveBtn.onclick = () => saveBtnAction();

// Save Notes
const saveBtnAction = () => {

    const title = titleInput.value.trim();
    const noteContent = content.value.trim();

    if (title === "") return showMsg("Please enter title", "red");

    // Save to storage
    notesArr.push({
        id: Date.now(),
        title: title,
        content: noteContent
    });

    saveAndRender();

    titleInput.value = "";
    content.value = "";
    showMsg("Note added successfully", "green");


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
    const notes = await response.data();

    notesListBox.innerHTML = "";

    notes.forEach(note => {
        notesListBox.innerHTML = `
        <div class="note-card">
            <h3>${note.title}</h3>
            <p>${note.content}</p>
        </div>`
    });
}


// Save


// Runs on page load
loadNotes();

