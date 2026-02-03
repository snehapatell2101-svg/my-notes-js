let notes = JSON.parse(localStorage.getItem("notes")) || [];

const notesList = document.getElementById("notesList");
const noteTitle = document.getElementById("noteTitle");
const noteText = document.getElementById("noteText");
const editIndex = document.getElementById("editIndex");
const saveBtn = document.getElementById("saveBtn");

function displayNotes() {
    notesList.innerHTML = "";
    notes.forEach((note, i) => {
        notesList.innerHTML += `
    <div class="col-md-4">
    <div class="note-card ${note.colors}">
    <div class="note-action">
    <i class="bi bi-pencil-square" onclick="editNote(${i})"></i>
     <i class="bi bi-trash" onclick="deleteNote(${i})"></i>
     
     </div>
     <h6>${note.title}</h6>
     <P>${note.text}</P>
    </div>
    </div>
    `;
    });

}

saveBtn.addEventListener("click", () => {
    const title = noteTitle.value.trim();
    const text = noteText.value.trim();
    if (!title || !text) return alert("please fill all fields");

    const colors = ["bg-yellow", "bg-red", "bg-blue"];
    const random = colors[Math.floor(Math.random() * colors.length)];//0.23
    const idx = editIndex.value;

    if (idx === "") {
        notes.push({ title, text, colors: random });
    }
    else {
        notes[idx] = { title, text, colors: random };
    }
    localStorage.setItem("notes", JSON.stringify(notes));

    noteTitle.value = "";
    noteText.value = "";
    editIndex.value = "";
    document.querySelector(".btn-close").click();
    displayNotes();
});
function editNote(i) {
    noteTitle.value = notes[i].title;
    noteText.value = notes[i].text;
    editIndex.value = i;

    document.getElementById("modalTitle").innerText = "Edit notes";
    new bootstrap.Modal(document.getElementById("noteModal")).show();
}

function deleteNote(i){
    notes.splice(i,1);
    localStorage.setItem("notes",JSON.stringify(notes));
    displayNotes();
}
 displayNotes();