;(function(){

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

  function loadNoteToForm (userId, noteId) {
    var editNoteForm = document.getElementById('editNote'),
        user = JSON.parse(rest.get('users', userId));
    editNoteForm.elements.userId.value = user.id;
    editNoteForm.elements.noteId.value = noteId;
    editNoteForm.title.value = user.notes[noteId].title;
    editNoteForm.text.value = user.notes[noteId].text;
  }

  function showUserNotes(id) {
    var  user = JSON.parse(rest.get('users', id)),
         table = document.getElementById('userNotesTable').tBodies[0],
         notes = user.notes;
    table.innerHTML = '';
    if (!notes) return;
    for (var i = notes.length - 1; i >= 0; i--) {
      (function(i) {
        var note = notes[i],
            id = note.id,
            tr = table.insertRow(0),
            cell1 = tr.insertCell(0),
            cell2 = tr.insertCell(1),
            cell3 = tr.insertCell(2),
            cell4 = tr.insertCell(3),
            cell5 = tr.insertCell(4),
            cell6 = tr.insertCell(5),
            delBtn = document.createElement('input'),
            editBtn;
        // Buttons
        delBtn.type = 'button';
        editBtn = delBtn.cloneNode(true);
        delBtn.value = 'Del';
        editBtn.value = 'Edit';

        // Events for buttons
        delBtn.addEventListener('click', function() {deleteNote(user.id, i); location.reload();});
        editBtn.addEventListener('click', function() {loadNoteToForm(user.id, i)});

        // Table
        cell1.textContent = note.id;
        cell2.textContent = note.title;
        cell3.textContent = note.text;
        cell4.textContent = note.tags;
        cell5.textContent = new Date(note.date);
        cell6.appendChild(delBtn);
        cell6.appendChild(editBtn);
      })(i)
    };
  }

  /**
   * Form handler for new User form
   */

  function newUser(e) {
    if (e.preventDefault) e.preventDefault();
      if (this.name.value && this.email.value && this.password.value) {
        var newUser = {};
        newUser.name = this.name.value;
        newUser.email = this.email.value;
        newUser.password = this.password.value;
        console.log(newUser);
        rest.post('users', newUser);//postUser(newUser);
      };
      this.name.value = '';
      this.email.value = '';
      this.password.value = '';
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

  function editNote (e) {
    if (e.preventDefault) e.preventDefault();
      if (this.title.value && this.text.value) {

        var noteId = this.noteId.value,
            userId = this.userId.value,
            editUser = JSON.parse(rest.get('users', userId));//JSON.parse(getUser(this.id.value));
        editUser.notes[noteId].title = this.title.value;
        editUser.notes[noteId].text = this.text.value;
        console.log(editUser);
        rest.put('users', editUser);//updateUser(editUser);
      };
      this.id.value = '';
      this.title.value = '';
      this.text.value = '';
    location.reload();
    return false;
  }

  /**
   * Form handler for delete Note
   */
  function deleteNote(userId, noteId) {
    var user = JSON.parse(rest.get('users', userId));
    console.log(user.notes);
    user.notes.splice(noteId, 1);
    console.log(user.notes);
    rest.put('users', user);
    // user.note
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
      table = document.getElementById('usersTable');
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
          showNotes;

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
    })(users[i])
  };



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

  // Catch form for update of existing user

  var editNoteForm = document.getElementById('editNote');
  if (editNoteForm.attachEvent) {
      editNoteForm.attachEvent("submit", editNote);
  } else {
      editNoteForm.addEventListener("submit", editNote);
  }

})()