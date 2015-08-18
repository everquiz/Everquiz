(function(window) {  
  
    function show(pageName){
      var page = document.getElementById(pageName);
      document.querySelector("nav li.active").classList.remove("active");
      document.querySelector("nav li a[href="+"'#"+pageName+"'"+"]").closest("li").classList.add("active");
      
      document.body.setAttribute("page", pageName);
      
      document.querySelector("section.active").classList.remove("active");
      document.getElementById(pageName).classList.add("active");
    };
  
    function load(pageName){
      var page = document.getElementById(pageName);
      var src = page.getAttribute("src");
      
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
          page.innerHTML=xhttp.responseText;
          show(pageName);
        }
      };
      xhttp.open('GET', src, true);
      xhttp.send();
    };
  
    function onhashchange(){
      var hash = location.hash || "#intro";
      load(hash.substring(1));
    };
    
    window.addEventListener("hashchange", onhashchange, false);

})(this);