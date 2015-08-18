function httpGet(theUrl) {
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open( "GET", theUrl, false );
  xmlHttp.send( null );
  return xmlHttp.responseText;
}

function httpPost(theUrl, data) {
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open( "POST", theUrl, false );
  xmlHttp.setRequestHeader('Content-Type', 'application/json');
  xmlHttp.onreadystatechange = function () {
      if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
          alert(xmlHttp.responseText);
      }
  }
  xmlHttp.send( JSON.stringify( data ) );
}

function httpDel(theUrl, id) {
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open( "DELETE", theUrl + '/' + id, false);
  xmlHttp.setRequestHeader('Content-Type', 'application/json');
  xmlHttp.onreadystatechange = function () {
      if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
          alert(xmlHttp.responseText);
      }
  }
  xmlHttp.send( null )
}

function httpPut(theUrl, id, data) {
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open( "PUT", theUrl + '/' + id, false);
  xmlHttp.setRequestHeader('Content-Type', 'application/json');
  xmlHttp.onreadystatechange = function () {
      if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
          alert(xmlHttp.responseText);
      }
  }
  xmlHttp.send( data )
}

function getUser(id) {
  return httpGet('http://localhost:3000/users/' + id)
}

function postUser(data) {
  return httpPost('http://localhost:3000/users', data)
}

function delUser(id) {
  return httpDel('http://localhost:3000/users', id)
}

function editUser(id, data) {
  return httpDel('http://localhost:3000/users/' + id, data)
}

var users = httpGet('http://localhost:3000/users'),
    userDiv = document.getElementById('users'),
    ul = document.createElement('ul');
users = JSON.parse(users);

for (var i = users.length - 1; i >= 0; i--) {
  (function() {
    var li = document.createElement('li'),
        id = users[i].id,
        delBtn = document.createElement('input');
    li.textContent = users[i].name;
    delBtn.type = 'button';
    delBtn.value = 'Del';
    delBtn.addEventListener('click', function() {return delUser(id)});

    li.appendChild(delBtn);
    ul.appendChild(li);
  })(users[i])
};
userDiv.appendChild(ul);

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
      postUser(newUser);
    };
    this.name.value = '';
    this.email.value = '';
  return false;
}

// Catch form for creation of new user

var newUserForm = document.getElementById('newUser');
if (newUserForm.attachEvent) {
    newUserForm.attachEvent("submit", newUser);
} else {
    newUserForm.addEventListener("submit", newUser);
}

/**
 * Form handler for new Edit form
 */

function editUser(e) {
  if (e.preventDefault) e.preventDefault();
    if (this.name.value && this.email.value) {
      var editUser = {};
      editUser.name = this.name.value;
      editUser.email = this.email.value;
      console.log(editUser);
      postUser(editUser);
    };
    this.name.value = '';
    this.email.value = '';
  return false;
}

// Catch form for update of existing user

var editUserForm = document.getElementById('editUser');
if (editUserForm.attachEvent) {
    editUserForm.attachEvent("submit", editUser);
} else {
    editUserForm.addEventListener("submit", editUser);
}

// document.getElementById("newUser").submit();



