let inputText=document.getElementById("input-text");
let taskList=document.getElementById("task-list");

function addTask(){
    if(inputText.value!=""){
       let entry=document.createElement("entry");
        entry.innerHTML=inputText.value;
        taskList.appendChild(entry);
    }
}
