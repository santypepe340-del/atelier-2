(function(){
var p=location.pathname.split("/").pop()||"index.html";
window.sb=supabase.createClient(SB_URL,SB_KEY);
window.imgUrl=function(path){return SB_URL+"/storage/v1/object/public/artworks/"+path};
window.esc=function(s){return String(s==null?"":s).replace(/[&<>"']/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]})};
window.badge=function(f){return f?'<span class="vb" title="Founding member" aria-label="Founding member"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="11" fill="currentColor"/><path d="m7 12.5 3.2 3.2L17 9" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg></span>':""};
window.ago=function(t){var s=(Date.now()-new Date(t))/1000;if(s<60)return"just now";if(s<3600)return Math.floor(s/60)+"m";if(s<86400)return Math.floor(s/3600)+"h";if(s<604800)return Math.floor(s/86400)+"d";return new Date(t).toLocaleDateString(undefined,{month:"short",day:"numeric"})};
window.tile=function(a,withArtist){
var nm=a.profiles&&a.profiles.display_name,link="piece.html?id="+a.id;
var who=withArtist?'<a href="profile.html?id='+a.artist_id+'">'+esc(nm)+'</a>':"";
var why=a._why?'<span>'+esc(a._why)+'</span>':"";
if(a.kind==="writing"){var b=a.body||"";return '<figure><a class="wr" href="'+link+'"><b>'+esc(a.title)+'</b><p>'+esc(b.slice(0,180))+(b.length>180?"...":"")+'</p></a>'+(who||why?'<figcaption>'+who+why+'</figcaption>':"")+'</figure>'}
return '<figure tabindex="0"><a href="'+link+'"><img class="art" loading="lazy" src="'+imgUrl(a.thumb_path||a.image_path)+'" alt="'+esc(a.title)+'"></a><figcaption><b>'+esc(a.title)+'</b>'+who+why+'</figcaption></figure>'};
window.ready=sb.auth.getSession().then(function(r){
window.me=r.data.session?r.data.session.user:null;
var links=[["index.html","Home"],["challenges.html","Challenges"]];
if(me){links.push(["saved.html","Saved"]);links.push(["profile.html","My profile"])}
function item(l){var on=p===l[0]&&(l[0]!=="profile.html"||!location.search);return '<a href="'+l[0]+'"'+(on?' class="on"':'')+'>'+l[1]+'</a>'}
var nav=links.map(item).join("");
var authD=me?'<a class="auth dauth" href="#" id="out">Sign out</a>':'<a class="auth dauth" href="auth.html">Sign in</a>';
var authM=me?'<a href="#" id="out2">Sign out</a>':'<a href="auth.html">Sign in</a>';
var SRCH='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>';
var sheet='<div class="msheet" id="msheet" hidden><button class="mclose" id="mclose">Close</button>'+links.map(item).join("")+'<a href="upload.html">Add artwork to portfolio</a><a href="write.html">Add writing to portfolio</a>'+authM+'</div>';
document.getElementById("site-header").outerHTML='<header><a class="mark" href="index.html">Atelier</a><nav class="dnav">'+nav+'</nav><span class="right"><a class="auth" href="search.html" aria-label="Search">'+SRCH+'</a>'+authD+'<a class="upload" href="upload.html">Add to portfolio</a><button class="mbtn" id="mbtn" aria-expanded="false">Menu</button></span></header>'+sheet;
function so(){sb.auth.signOut().then(function(){location.href="index.html"})}
["out","out2"].forEach(function(i){var o=document.getElementById(i);if(o)o.onclick=function(e){e.preventDefault();so()}});
var sh=document.getElementById("msheet"),mb=document.getElementById("mbtn");
function openM(v){sh.hidden=!v;mb.setAttribute("aria-expanded",v?"true":"false");document.body.style.overflow=v?"hidden":""}
mb.onclick=function(){openM(true)};
document.getElementById("mclose").onclick=function(){openM(false)};
document.addEventListener("keydown",function(e){if(e.key==="Escape")openM(false)});
});
})();
