/**
 * REST
 */

var rest = (function() {
  var xmlHttp = new XMLHttpRequest();

  var httpGet = function (theUrl) {
    xmlHttp.open( "GET", theUrl, false );
    xmlHttp.onreadystatechange = function () {
      if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
        console.log(xmlHttp.responseText);
      }
    }
    xmlHttp.send( null );
    return xmlHttp.responseText;
  };

  var httpPost = function (theUrl, data) {
    xmlHttp.open( "POST", theUrl, false );
    xmlHttp.setRequestHeader('Content-Type', 'application/json');
    xmlHttp.onreadystatechange = function () {
      if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
        console.log(xmlHttp.responseText);
      }
    }
    xmlHttp.send( JSON.stringify( data ) );
  };

  var httpDel = function(theUrl, id) {
    xmlHttp.open( "DELETE", theUrl + '/' + id, false);
    xmlHttp.setRequestHeader('Content-Type', 'application/json');
    xmlHttp.onreadystatechange = function () {
      if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
        console.log(xmlHttp.responseText);
      }
    }
    xmlHttp.send( null )
  };

  var httpPut = function(theUrl, id, data) {
    xmlHttp.open( "PUT", theUrl + '/' + id, false);
    xmlHttp.setRequestHeader('Content-Type', 'application/json');
    xmlHttp.onreadystatechange = function () {
      if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
        console.log(xmlHttp.responseText);
      }
    }
    xmlHttp.send( JSON.stringify( data ) )
  };


  return {
    get: function(resource, id) {
      if (id) {
        return httpGet('http://localhost:3000/' + resource + '/' + id);
      };
      return httpGet('http://localhost:3000/' + resource);
    },
    post: function(resource, data) {
      return httpPost('http://localhost:3000/' + resource, data)
    },
    del: function(resource, id) {
      return httpDel('http://localhost:3000/' + resource, id)
    },
    put: function(resource, data) {
      return httpPut('http://localhost:3000/' + resource, data.id, data)
    }
  }

})();

/**
 * Helpers temporary
 */

function loadUserToForm (id) {
  var editUserForm = document.getElementById('editUser'),
      user = JSON.parse(rest.get('users', id));
  editUserForm.elements.id.value = user.id;
  editUserForm.name.value = user.name;
  editUserForm.email.value = user.email;
}

/**
 * Form handler for new User form
 */

function newUser(e) {
  if (e.preventDefault) e.preventDefault();
    if (this.name.value && this.email.value) {
      var newUser = {};
      newUser.name = this.name.value;
      newUser.email = this.email.value;
      console.log(newUser);
      rest.post('users', newUser);//postUser(newUser);
    };
    this.name.value = '';
    this.email.value = '';
  location.reload();
  return false;
}

/**
 * Form handler for new Edit form
 */

function editUser(e) {
  if (e.preventDefault) e.preventDefault();
    if (this.name.value && this.email.value) {
      var editUser = JSON.parse(rest.get('users', this.id.value));//JSON.parse(getUser(this.id.value));
      editUser.name = this.name.value;
      editUser.email = this.email.value;
      console.log(editUser);
      rest.put('users', editUser);//updateUser(editUser);
    };
    this.id.value = '';
    this.name.value = '';
    this.email.value = '';
  location.reload();
  return false;
}

/**
 * Form handler for new Edit form
 */

function newNote(e) {
  if (e.preventDefault) e.preventDefault();
    if (this.title.value && this.text.value) {
      var newNote = {};
      newNote.title = this.title.value;
      newNote.text = this.text.value;
      console.log(newNote);
      var user = JSON.parse(rest.get('users', 'a2d34923-bc22-4ac7-be76-e012468d717e'));
      user.notes.push(newNote);
      rest.put('users', user);
      // rest.post('users', newUser);//postUser(newUser);
    };
    this.title.value = '';
    this.text.value = '';
  // location.reload();
  return false;
}

/**
 * Some logic for testing
 */

/*
Load all users
 */

var users = rest.get('users'),//getUsers(),
    userDiv = document.getElementById('users'),
    ul = document.createElement('ul');
    table = document.getElementById('usersTable'),
    userNotesTable = document.getElementById('userNotes');
users = JSON.parse(users);

for (var i = users.length - 1; i >= 0; i--) {
  (function() {
    var id = users[i].id,
        tr = table.insertRow(1),
        cell1 = tr.insertCell(0),
        cell2 = tr.insertCell(1),
        cell3 = tr.insertCell(2),
        cell4 = tr.insertCell(3),
        cell5 = tr.insertCell(4),
        delBtn = document.createElement('input'),
        editBtn,
        showNotes,
        trNotes = userNotesTable.insertRow(1),
        cellNote1 = trNotes.insertCell(0);

    // Buttons
    delBtn.type = 'button';
    editBtn = delBtn.cloneNode(true);
    showNotes = delBtn.cloneNode(true);
    delBtn.value = 'Del';
    editBtn.value = 'Edit';
    showNotes.value = 'Show notes';

    // Events for buttons
    delBtn.addEventListener('click', function() {rest.del('users', id); location.reload();});
    editBtn.addEventListener('click', function() {loadUserToForm(id)});
    showNotes.addEventListener('click', function() {showUserNotes(id)});

    // Table
    cell1.textContent = users[i].id;
    cell2.textContent = users[i].name;
    cell3.textContent = users[i].email;
    cell4.textContent = users[i].notes;
    cell5.appendChild(delBtn);
    cell5.appendChild(editBtn);
    cell5.appendChild(showNotes);
    console.log(delBtn);

    // Table for notes
    // cellNote1.textContent = 


    // var li = document.createElement('li'),
    //     id = users[i].id,
    //     delBtn = document.createElement('input'),
    //     editBtn;
    // li.textContent = 
    // 'Name: ' + users[i].name + 
    // ' email: ' + users[i].email + 
    // ' notes: ' + users[i].notes.map(function(note){
    //     return note.title + ' tags: ' + note.tags;
    //   }).join(', ');
    // delBtn.type = 'button';
    // editBtn = delBtn.cloneNode(true);
    // delBtn.value = 'Del';
    // editBtn.value = 'Edit';
    // delBtn.addEventListener('click', function() {rest.del('users', id); location.reload();});
    // editBtn.addEventListener('click', function() {loadUserToForm(id)});
    // li.appendChild(delBtn);
    // li.appendChild(editBtn);
    // ul.appendChild(li);
  })(users[i])
};
userDiv.appendChild(ul);



// Catch form for creation of new user

var newUserForm = document.getElementById('newUser');
if (newUserForm.attachEvent) {
    newUserForm.attachEvent("submit", newUser);
} else {
    newUserForm.addEventListener("submit", newUser);
}

// Catch form for update of existing user

var editUserForm = document.getElementById('editUser');
if (editUserForm.attachEvent) {
    editUserForm.attachEvent("submit", editUser);
} else {
    editUserForm.addEventListener("submit", editUser);
}

// Catch form for new note of existing user

var newNoteForm = document.getElementById('newNote');
if (newNoteForm.attachEvent) {
    newNoteForm.attachEvent("submit", newNote);
} else {
    newNoteForm.addEventListener("submit", newNote);
}



