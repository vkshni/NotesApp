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


// Render
const renderNotes = (arr) => {

    notesListBox.innerHTML = "";
    arr.forEach(note => {
        const notesBox = document.createElement("div");
        const title = document.createElement("span");
        const content = document.createElement("p");

        title.innerText = note.title;
        content.innerText = note.content;

        notesBox.append(title, content);
        notesListBox.appendChild(notesBox);
    });

}

// Save
const saveAndRender = () => {
    localStorage.setItem("notes", JSON.stringify(notesArr));
    renderNotes(notesArr);
}

// Render notes on page load
renderNotes(notesArr);

