(function(){
var p=location.pathname.split("/").pop()||"index.html";
var L=[["index.html","Discover"],["profile.html","Profile"]];
var nav=L.map(function(l){return '<a href="'+l[0]+'"'+(p===l[0]?' class="on"':'')+'>'+l[1]+'</a>'}).join("");
var h='<header><a class="mark" href="index.html">Atelier</a><nav>'+nav+'</nav><a class="upload" href="upload.html">Share work</a></header>';
document.getElementById("site-header").outerHTML=h;
})();
