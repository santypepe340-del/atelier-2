(function(){
var p=location.pathname.split("/").pop()||"index.html";
window.sb=supabase.createClient(SB_URL,SB_KEY);
window.imgUrl=function(path){return SB_URL+"/storage/v1/object/public/artworks/"+path};
window.esc=function(s){return String(s==null?"":s).replace(/[&<>"']/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]})};
window.ready=sb.auth.getSession().then(function(r){
window.me=r.data.session?r.data.session.user:null;
var links=[["index.html","Discover"]];
if(me)links.push(["profile.html","My profile"]);
var nav=links.map(function(l){var on=p===l[0]&&(l[0]!=="profile.html"||!location.search);return '<a href="'+l[0]+'"'+(on?' class="on"':'')+'>'+l[1]+'</a>'}).join("");
var auth=me?'<a class="auth" href="#" id="out">Sign out</a>':'<a class="auth" href="auth.html">Sign in</a>';
document.getElementById("site-header").outerHTML='<header><a class="mark" href="index.html">Atelier</a><nav>'+nav+'</nav><span class="right">'+auth+'<a class="upload" href="upload.html">Share work</a></span></header>';
var o=document.getElementById("out");
if(o)o.onclick=function(e){e.preventDefault();sb.auth.signOut().then(function(){location.href="index.html"})};
});
})();
