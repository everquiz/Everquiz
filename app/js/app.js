function httpGet(theUrl) {
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open( "GET", theUrl, false );
  xmlHttp.send( null );
  return xmlHttp.responseText;
}

function getUser(id) {
  return httpGet('http://localhost:3000/users/' + id)
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


