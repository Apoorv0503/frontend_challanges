//we will trigger any thing only after our content is loaded

console.log("script added");

document.addEventListener("DOMContentLoaded", function () {
  //get all 4 html elemnts, so that we can do operations over them
  const todoForm = document.querySelector(".todoForm");
  const todoInput = document.querySelector(".todoInput");
  const todoSubmit = document.querySelector(".todoSubmit");
  const todoList = document.querySelector(".todoList");

  let editMode=false;
  let editItem=null;

  //to add to do
  todoForm.addEventListener("submit", function (event) {
    //do not reload the page
    event.preventDefault();
    const todoText = todoInput.value.trim(); //removed the extra spaces

    // console.log(todoText);

    //conditional rendering here, either show "Add TOdo" or "edit todo"
    if(editMode){
        //it's not react (no re-rendering upon change), so we need to reflect chnages in list manually.
        editItem.parentNode.firstChild.textContent=todoText; //flow is: ✏️button --> li --> span --> text
        todoSubmit.innerText='Add Todo'; //changed button contant to original one
        editMode=false;
        editItem=null;
        todoInput.value=""; //empty the input after done
    }
    else{
        addTodo(todoText);
        todoInput.value=""; //empty the input after done
    }
   
  });

  //to edit/delete a todo, use the event delegation concept
  todoList.addEventListener("click",function(event){
        const clickedItem=event.target;

        console.log(clickedItem);

        console.log("Event listener clicked")
        //make sure if anything other than the button got clicked, then it is ignored by eventlistener
        if(clickedItem.tagName==="BUTTON"){
            if(clickedItem.innerText==='❌'){

                //removed this clicked item from its parent node
                clickedItem.parentNode.remove();
            }
            else if(clickedItem.innerText==='✏️'){

                todoSubmit.innerText='Edit Todo'; //change button content
                editMode=true;
                editItem=clickedItem;
                //chnaged the input box's value to the current todo item's value, and chnaged the focus to this input,
                //now you can edit it and submit the todo
                todoInput.value=clickedItem.parentNode.firstChild.textContent; //flow is: ✏️button --> li --> span --> text
                todoInput.focus();   
            }
        }
  });

  //add todo to the list
  function addTodo(todoText) {
    const todoItem = document.createElement("li");
    todoItem.innerHTML = `<span>${todoText}</span>`;

    //created edit/delete buttons
    const editButton = document.createElement("button");
    editButton.innerText = `✏️`;

    const deleteButton = document.createElement("button");
    deleteButton.innerText = `❌`;

    todoItem.appendChild(editButton);
    todoItem.appendChild(deleteButton);

    //added todo
    todoList.appendChild(todoItem);
  }

  //delete todo
//   function removeTodo() {}
});
