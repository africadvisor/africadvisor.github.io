(function(){
  var burger=document.getElementById("burger"), nav=document.getElementById("navLinks");
  if(burger) burger.addEventListener("click",function(e){
    e.stopPropagation();
    var open=nav.classList.toggle("open"); burger.setAttribute("aria-expanded",open);
  });
  if(nav){
    nav.querySelectorAll("a").forEach(function(a){
      a.addEventListener("click",function(){nav.classList.remove("open");burger.setAttribute("aria-expanded","false");});
    });
    document.addEventListener("click",function(e){
      if(nav.classList.contains("open") && !nav.contains(e.target)){nav.classList.remove("open");burger.setAttribute("aria-expanded","false");}
    });
  }
  var y=document.getElementById("year"); if(y) y.textContent=new Date().getFullYear();
  var LANG=document.documentElement.lang||"fr";
  var grid=document.getElementById("dirGrid");
  if(grid){
    var FILTER="all", Q="";
    var refresh=function(){
      var n=0;
      grid.querySelectorAll(".cty-link").forEach(function(a){
        var okG = FILTER==="all"||a.getAttribute("data-g")===FILTER;
        var q=Q.trim().toLowerCase();
        var okQ = !q || a.getAttribute("data-name").indexOf(q)>-1;
        var show = okG&&okQ; a.style.display=show?"":"none"; if(show)n++;
      });
      var c=document.getElementById("dirCount");
      if(c) c.textContent = LANG==="fr" ? n+" pays affich\u00e9"+(n>1?"s":"")+" sur 54" : n+" of 54 markets shown";
    };
    var si=document.getElementById("ctySearch");
    if(si) si.addEventListener("input",function(e){Q=e.target.value;refresh();});
    document.querySelectorAll("#ctyFilters button").forEach(function(b){
      b.addEventListener("click",function(){
        document.querySelectorAll("#ctyFilters button").forEach(function(x){x.classList.remove("on");});
        b.classList.add("on"); FILTER=b.getAttribute("data-g"); refresh();
      });
    });
    refresh();
  }
  document.querySelectorAll(".jry[data-v]").forEach(function(b){
    b.addEventListener("click",function(){
      var s=document.getElementById("fService"); if(s) s.value=b.getAttribute("data-v");
      var c=document.getElementById("contact"); if(c) c.scrollIntoView({behavior:"smooth"});
    });
  });
  var form=document.getElementById("leadForm");
  if(form) form.addEventListener("submit",function(e){
    e.preventDefault();
    if(!form.checkValidity()){form.reportValidity();return;}
    /* Brancher ici votre endpoint (Formspree / Cloudflare Worker) :
       fetch("https://votre-endpoint",{method:"POST",body:new FormData(form)}) */
    var ok=document.getElementById("formOk");
    if(ok){ok.classList.add("show");ok.scrollIntoView({behavior:"smooth",block:"center"});}
    form.querySelector("button[type=submit]").disabled=true;
  });
  if("IntersectionObserver" in window && !matchMedia("(prefers-reduced-motion:reduce)").matches){
    var io=new IntersectionObserver(function(es){es.forEach(function(x){
      if(x.isIntersecting){x.target.classList.add("in");io.unobserve(x.target);}
    });},{threshold:.12});
    document.querySelectorAll("section .wrap > *").forEach(function(el){
      if(el.getBoundingClientRect().top>innerHeight){el.classList.add("pre");io.observe(el);}
    });
  }
})();