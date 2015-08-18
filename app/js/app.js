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
 * Some logic for testing
 */

/*
Load all users
 */

var users = rest.get('users'),//getUsers(),
    userDiv = document.getElementById('users'),
    ul = document.createElement('ul');
users = JSON.parse(users);

for (var i = users.length - 1; i >= 0; i--) {
  (function() {
    var li = document.createElement('li'),
        id = users[i].id,
        delBtn = document.createElement('input'),
        editBtn;
    li.textContent = users[i].name;
    delBtn.type = 'button';
    editBtn = delBtn.cloneNode(true);
    delBtn.value = 'Del';
    editBtn.value = 'Edit';
    delBtn.addEventListener('click', function() {rest.del('users', id); location.reload();});
    editBtn.addEventListener('click', function() {loadUserToForm(id)});
    li.appendChild(delBtn);
    li.appendChild(editBtn);
    ul.appendChild(li);
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

// document.getElementById("newUser").submit();



