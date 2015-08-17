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

function getUser(id) {
  return httpGet('http://localhost:3000/users/' + id)
}

function postUser(data) {
  return httpPost('http://localhost:3000/users', data)
}

var users = httpGet('http://localhost:3000/users'),
    userDiv = document.getElementById('users'),
    ul = document.createElement('ul');
users = JSON.parse(users);

for (var i = users.length - 1; i >= 0; i--) {
  (function() {
    var li = document.createElement('li');
    li.textContent = users[i].name;
    var id = users[i].id;
    li.addEventListener('click', function() {alert(getUser(id));});
    ul.appendChild(li);
  })(users[i])
};
userDiv.appendChild(ul);

function newUser(e) {
  if (e.preventDefault) e.preventDefault();
    if (this.name.value && this.email.value) {
      var newUser = {};
      newUser.name = this.name.value;
      newUser.email = this.email.value;
      console.log(newUser);
      postUser(newUser);
    };
  return false;
}

var newUserForm = document.getElementById('newUser');
if (newUserForm.attachEvent) {
    newUserForm.attachEvent("submit", newUser);
} else {
    newUserForm.addEventListener("submit", newUser);
}
// document.getElementById("newUser").submit();



