let inputText=document.getElementById("input-text");
let taskList=document.getElementById("task-list");


function completeTask(e){
    e.target.remove();
}
function addTask(){
    if(inputText.value!=""){
        let entry=document.createElement("entry");
        entry.innerHTML=inputText.value;
        let erase=document.createElement("erase");
        erase.innerHTML="X";
        entry.appendChild(erase);
        taskList.appendChild(entry); 
    }
    inputText.value="";
}














taskList.addEventListener("click",function(e){
    switch(e.target.tagName){
        case "ENTRY":
            e.target.parentElement.remove();
            break;
    }
});