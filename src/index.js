let tagsArray = []
let usersArray = []
let todosArray = []

function getUsers(){
    return fetch("http://localhost:3000/users")
    .then(function(response){
        return response.json()
    })
    .catch((error) => {
        console.log(error)
        alert("There is something wrong.....")
    });
}

function getTagsList(){
    return fetch("http://localhost:3000/tags")
    .then(function(response){
        return response.json()
    })
    .catch((error) => {
        console.log(error)
        alert("There is something wrong.....")
    });
}

function getTodos(){
    return fetch("http://localhost:3000/toDos")
    .then(function(response){
        return response.json()
    })
    .catch((error) => {
        console.log(error)
        alert("There is something wrong.....")
    });
}

function displayFilter(users, tags){
    let filterContainer = document.querySelector(".filter")
    let selectSpan = document.createElement("span")
    selectSpan.innerText = "Select filter: "
    filterContainer.append(selectSpan, displayUsernameFilter(users), displayTagsFilter(tags))
}

function displayUsernameFilter(usersArray){
    let userFilterContainer = document.createElement("div")
    userFilterContainer.setAttribute("class", "user-filter")

    let userFilterBtn = document.createElement("button")
    userFilterBtn.setAttribute("class", "filter-option")
    userFilterBtn.innerText = "Username"

    let userList = document.createElement("ul")
    userList.setAttribute("class", "user-list option")

    let allUserEl = document.createElement("li")
    allUserEl.innerText = "All"
    userList.append(allUserEl)

    allUserEl.addEventListener("click", function(){
        filterByName(allUserEl.innerText)
        })

    for (user of usersArray){
        let usernameEl = document.createElement("li")
        usernameEl.innerText = user.username
        userList.append(usernameEl)

        usernameEl.addEventListener("click", function(){
            filterByName(usernameEl.innerText)
        })
    }

    userFilterContainer.append(userFilterBtn, userList)
    return userFilterContainer
    
}

function filterByName(toFilterUsername){
    

    if(toFilterUsername === "All"){
        for(todo of todosArray){
            let toShowItem = document.getElementById(`${todo.id}`) 
                toShowItem.classList.remove("hidden")
        }
    }
    else{
        for (user of usersArray){
            if (user.username !== toFilterUsername){
                for (todo of user.toDos){
                    let toHideItem = document.getElementById(`${todo.id}`) 
                    toHideItem.classList.add("hidden")
                }
            }

            if (user.username === toFilterUsername){
                for (todo of user.toDos){
                    let toShowItem = document.getElementById(`${todo.id}`) 
                    toShowItem.classList.remove("hidden")
                }
            }
            }
    }
}

function displayTagsFilter(tags){
    let tagFilterContainer = document.createElement("div")
    tagFilterContainer.setAttribute("class", "tag-filter")

    let tagFilterBtn = document.createElement("button")
    tagFilterBtn.setAttribute("class", "filter-option")
    tagFilterBtn.innerText = "Tag"

    let tagList = document.createElement("ul")
    tagList.setAttribute("class", "tag-list option")

    let allTagEl = document.createElement("li")
    allTagEl.innerText = "All"
    tagList.append(allTagEl)

    allTagEl.addEventListener("click", function(){
        filterByTag(allTagEl.innerText)
    })

    for (tag of tags){
        let tagEl = document.createElement("li")
        tagEl.innerText = tag.toUpperCase()
        tagList.append(tagEl)

        tagEl.addEventListener("click", function(){
            filterByTag(tagEl.innerText)
        })
    }

    tagFilterContainer.append(tagFilterBtn, tagList)
    return tagFilterContainer
}

function filterByTag(toFilterTag){
    if(toFilterTag === "All"){
        for(todo of todosArray){
            let toShowItem = document.getElementById(`${todo.id}`) 
                toShowItem.classList.remove("hidden")
        }
    }
    else{
        for (todo of todosArray){
            let toHideItem = document.getElementById(`${todo.id}`) 
            toHideItem.classList.add("hidden")

                for(tag of todo.tag){
                  if (tag.toLowerCase() === toFilterTag.toLowerCase()){
                  toHideItem.classList.remove("hidden")
                }
            }
        }

    }
    
    // for (user of usersArray){
    //     for (todo of user.toDos){
            
    //         let toHideItem = document.getElementById(`${todo.id}`) 
    //         toHideItem.classList.add("hidden")

    //           for(tag of todo.tag){
                  
    //               if (tag.toLowerCase() === toFilterTag.toLowerCase()){
    //                 toHideItem.classList.remove("hidden")
    //               }
    //           }
        
    //     }
    // }
}

function displayTableHeader(){
    let listContainer = document.querySelector(".list-container")
    
    let tableHeaderContainer = document.createElement("div")
    tableHeaderContainer.setAttribute("class", "todo-item table-header")

    let divEl = document.createElement("div")

    let usernameSpan = document.createElement("span")
    usernameSpan.innerText = "Username"

    let titleSpan =  document.createElement("span")
    titleSpan.innerText = "Task Title"

    let tagSpan =  document.createElement("span")
    tagSpan.innerText = "Tags"

    let statusSpan =  document.createElement("span")
    statusSpan.innerText = "Status"

    tableHeaderContainer.append(divEl, usernameSpan, titleSpan, tagSpan, statusSpan)
    listContainer.append(tableHeaderContainer)
}

function displayTodoList (){
    let listContainer = document.querySelector(".list-container")

    for(todo of todosArray){
        const todoItem = createTodo(todo)
        listContainer.append(todoItem)
    }

        
}
    
function createTodo(todo){
    let todoOwner = usersArray.find(function(user){
        return user.id === todo.userId
    })

    let todoContainer = document.createElement("li")
    todoContainer.setAttribute("class", "todo-item")
    todoContainer.setAttribute("id", todo.id)

    let avatar = document.createElement("img")
    avatar.setAttribute("class", "avatar")
    avatar.setAttribute("src", todoOwner.avatar)
    avatar.setAttribute("alt", todoOwner.username)

    let usernamePara = document.createElement("p")
    usernamePara.setAttribute("class", "username")
    usernamePara.innerText = todoOwner.username

    let todoTitle = document.createElement("p")
    todoTitle.setAttribute("class", "title")
    todoTitle.innerText = todo.title

    let tagPara = document.createElement("p")
    tagPara.setAttribute("class", "tag")
    tagPara.innerText = todo.tag.join(", ")

    let divEl = document.createElement("div")
    let statusPara = document.createElement("span")
    statusPara.setAttribute("class", "status")

    let updateBtn = document.createElement("button")
    updateBtn.setAttribute("class", "update")
    updateBtn.addEventListener("click", function(event){
        event.preventDefault()
        patchTodo(todo)
    })

    divEl.append(statusPara, updateBtn)
    todoContainer.append(avatar, usernamePara, todoTitle, tagPara, divEl)

    if(todo.completed === true) {
        statusPara.innerText = "✔"
        updateBtn.innerText = "Undone"
        todoContainer.classList.add("completed")
    }

    if(todo.completed === false) {
        statusPara.innerText = "✗"
        updateBtn.innerText = "Done"
    }

    return todoContainer

}

function patchTodo(todo){

    todo.completed = !todo.completed 

    fetch(`http://localhost:3000/toDos/${todo.id}`, {
        method:"PATCH",
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify({
            completed: todo.completed
         })
    })
    .then(response => response.json())
        .then(function(updatedTodo){

            let todoContainer = document.getElementById(`${updatedTodo.id}`)
            let statusPara = todoContainer.querySelector(".status")
            let updateBtn = todoContainer.querySelector(".update")

            if(updatedTodo.completed === true) {
                statusPara.innerText = "✔"
                updateBtn.innerText = "Undone"
                todoContainer.classList.add("completed")
            }
        
            if(updatedTodo.completed === false) {
                statusPara.innerText = "✗"
                updateBtn.innerText = "Done"
                todoContainer.classList.remove("completed")
            }
        })

}

function runPage(){
    getUsers()
        .then(function(users){
            usersArray = users

            getTagsList()
                .then(function(tags){
                    tagsArray = tags
                    displayFilter(users, tags)
                    displayNewTaskForm()

                    getTodos()
                    .then(function(todos){
                        todosArray = todos
                        displayTodoList() 
                        displayNewUserForm()
                    })
                      
                    
                })
        })  

    displayTableHeader()
}

function displayNewTaskForm (){
    let formSection = document.querySelector(".todo-form")

    let taskForm = document.createElement("form")
    taskForm.setAttribute("id","create-task")
    taskForm.setAttribute("class", "input-form")
    formSection.prepend(taskForm)

    let h2El = document.createElement("h2")
    h2El.innerText = "[ Add New Task ]"

    let userLabel = document.createElement("label")
    userLabel.setAttribute("for","user")
    userLabel.innerText = "Who are you?"

    let selectUser = document.createElement("select")
    selectUser.setAttribute("id","user")
    selectUser.setAttribute("name", "user")

    let emptyOption = document.createElement("option")
    emptyOption.setAttribute("value", "")
    emptyOption.innerText = "Select your account"

    selectUser.append(emptyOption)

    for(user of usersArray){
        
        let userOption = document.createElement("option")
        userOption.setAttribute("value", user.id)
        userOption.innerText = user.username
        selectUser.append(userOption)
    }

    let titleLabel = document.createElement("label")
    titleLabel.setAttribute("for","title")
    titleLabel.innerText = "Task"

    let titleInput = document.createElement("input")
    titleInput.setAttribute("id", "title")
    titleInput.setAttribute("name", "title")
    titleInput.setAttribute("type", "text")

    let tagPara = document.createElement("p")
    tagPara.innerText = "Select Tag"

    taskForm.append(h2El, userLabel, selectUser, titleLabel, titleInput, tagPara)

    for (tag of tagsArray){
        let divEl = document.createElement("div")

        let tagBox = document.createElement("input")
        tagBox.setAttribute("id", tag)
        tagBox.setAttribute("name", tag)
        tagBox.setAttribute("type", "checkbox")

        let tagLabel = document.createElement("label")
        tagLabel.setAttribute("for",tag)
        tagLabel.innerText = tag

        divEl.append(tagBox,tagLabel)
        taskForm.append(divEl)

        
    }

    taskForm.addEventListener("submit", function(event){
        event.preventDefault()

        let selectedTag = []
        for (tag of tagsArray){
            var check = document.getElementById(`${tag}`);
            if (check.checked === true){
                selectedTag.push(tag)
            }
        }
        
        const newTodo = {
            title: titleInput.value,
            completed: false,
            userId: Number(selectUser.value),
            tag: selectedTag
        }
        

        let formComplete = validateTaskForm(newTodo)

        if (formComplete===true) {
            postNewTodo(newTodo)
                .then(function(newTaskFromServer){
                    
                    let tableHeader = document.querySelector(".table-header")
                    const todoItem = createTodo(newTaskFromServer)
                    tableHeader.after(todoItem)  

                    for(user of usersArray){
                        if(newTaskFromServer.userId === user.id){
                            user.toDos.push(newTaskFromServer)
                        }
                    }
                    
                    todosArray.push(newTaskFromServer)
                    taskForm.reset()
            })
         }    
    })   

    
    let formBtn = document.createElement("button")
    formBtn.setAttribute("type","submit")
    formBtn.innerText = "Add to list"

    taskForm.append(formBtn)
}

function postNewTodo(newTodo){
  return  fetch("http://localhost:3000/toDos",{
        method: "POST",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newTodo)
    })
    .then(response => response.json())
    .catch((error) => {
            console.log(error)
            alert("There is something wrong.....")
          });       
}

function displayNewUserForm(){
    let newUserSection = document.querySelector(".newuser-form")
    
    let createUserForm = document.createElement("form")
    createUserForm.setAttribute("id", "create-user")
    createUserForm.setAttribute("class", "input-form")
    newUserSection.append(createUserForm)

    let h2El = document.createElement("h2")
    h2El.innerText = "Add New User"

    let newNameLabel = document.createElement("label")
    newNameLabel.setAttribute("for", "username")
    newNameLabel.innerText = "User Name"

    let newNameInput = document.createElement("input")
    newNameInput.setAttribute("id", "username")
    newNameInput.setAttribute("name", "username")
    newNameInput.setAttribute("type", "text")

    let newAvatarLabel = document.createElement("label")
    newAvatarLabel.setAttribute("for", "avatar")
    newAvatarLabel.innerText = "Profile Image"

    let newAvatarInput = document.createElement("input")
    newAvatarInput.setAttribute("id", "avatar")
    newAvatarInput.setAttribute("name", "avatar")
    newAvatarInput.setAttribute("type", "text")

    let submitUserBtn = document.createElement("button")
    submitUserBtn.setAttribute("type", "submit")
    submitUserBtn.innerText = "Create User"

    createUserForm.append(h2El, newNameLabel, newNameInput, newAvatarLabel, newAvatarInput, submitUserBtn)
    
    createUserForm.addEventListener("submit", function(event){
        event.preventDefault()

        const newUser = {
            username: newNameInput.value,
            avatar: newAvatarInput.value
        }

        let formComplete = validateUserForm(newUser)

        if (formComplete === true) {
            postNewUser(newUser)
            .then(function(newUserFromSever){
                
                createUserForm.reset()

                newUserFromSever.toDos = []
                usersArray.push(newUserFromSever)
                
                let selectUser = document.querySelector("#user")
                let userOption = document.createElement("option")
                userOption.setAttribute("value", newUserFromSever.id)
                userOption.innerText = newUserFromSever.username
                selectUser.append(userOption)
                
                let userList = document.querySelector(".user-list")
                let usernameEl = document.createElement("li")
                usernameEl.innerText = newUserFromSever.username
                userList.append(usernameEl)

                usernameEl.addEventListener("click", function(){
                filterByName(usernameEl.innerText)
                })
            })
        
        }
    })
}

function postNewUser(newUser){
    return  fetch("http://localhost:3000/users",{
        method: "POST",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newUser)
    })
    .then(response => response.json())
    .catch((error) => {
            console.log(error)
            alert("There is something wrong.....")
          });      
}

function validateUserForm(newUser){
    if (newUser.username === ""){
        alert("Please enter username");
    return false;
    }

    if (newUser.avatar === ""){
        alert("Please enter profile image link");
    return false;
    }
    
    return true
}

function validateTaskForm(newTodo){
    if (newTodo.userId === ""){
        alert("Please Select Account");
    return false;
    }

    if (newTodo.title === ""){
        alert("Task content must be filled out");
    return false;
    }

    if( newTodo.tag.length === 0){
        alert("Please select at least one tag");
        return false;
    }
    
    return true
}

runPage()
