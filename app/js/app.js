function httpGet(theUrl) {
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open( "GET", theUrl, false );
  xmlHttp.send( null );
  return xmlHttp.responseText;
}

var users = httpGet('http://localhost:3000/users'),
    userDiv = document.getElementById('users'),
    ul = document.createElement('ul');
users = JSON.parse(users);

for (var i = users.length - 1; i >= 0; i--) {
  var li = document.createElement('li');
  li.textContent = users[i].name;
  ul.appendChild(li);
};
userDiv.appendChild(ul);
