let inputText=document.getElementById("input-text");
let taskList=document.getElementById("task-list");

loadsaved();
function addTask(){
    if(inputText.value!=""){
        let entry=document.createElement("entry");
        entry.innerHTML=inputText.value;
        let erase=document.createElement("erase");
        erase.innerHTML="X";
        entry.appendChild(erase);
        taskList.appendChild(entry);
        localsave();
        alert(localstorage.getitem("localdata"));
        
    }
    inputText.value="";
}

taskList.addEventListener("click",function(e){
    switch(e.target.tagName){
        case "ENTRY":
            e.target.classList.toggle("completed");
            localsave();
            break;
        case "ERASE":
            e.target.parentElement.remove();
            localsave();
            break;
    }

});

function localsave(){
    localStorage.setItem("data",taskList.innerHTML);
}

function loadsaved(){
    taskList.innerHTML= localstorage.getItem("data");
    
}
