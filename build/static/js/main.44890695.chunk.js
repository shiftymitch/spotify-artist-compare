(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{27:function(e,t,a){e.exports=a(58)},32:function(e,t,a){},55:function(e,t,a){},56:function(e,t,a){},57:function(e,t,a){},58:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),c=a(25),l=a.n(c),s=(a(32),a(11)),o=a(1);var i=function(){return r.a.createElement("div",{className:"navbar navbar-expand-lg position-sticky justify-content-between"},r.a.createElement("p",{className:"navbar-brand ml-5 mr-5"},r.a.createElement("img",{src:"/spotify_icon.png",alt:"spotify-icon"}),r.a.createElement("strong",{className:"ml-3"},"Spotify Artist Compare")),r.a.createElement(s.b,{to:function(){return"/compare"===window.location.pathname?"/":"/compare"}},r.a.createElement("button",{className:"navbar-item btn btn-sm btn-outline-success mr-auto",id:"compare"},"Compare")))};var m=function(){return r.a.createElement("h5",{className:"text-center align-bottom mt-5 mb-5"},"Built by ",r.a.createElement("a",{href:"https://github.com/shiftymitch"},"Mitch Henderson"))},u=a(8),p=a(10),f=a.n(p);var E=function(e){return r.a.createElement("div",Object.assign({className:"container".concat(e.fluid?"-fluid":"")},e))};a(55);var d=function(e){return r.a.createElement("form",{className:"search text-center"},r.a.createElement("div",{className:"form-group"},r.a.createElement("input",{value:e.search,onChange:e.handleInputChange,name:"search",list:"results",type:"text",className:"form-control",placeholder:"Search for an artist...",id:"search"}),r.a.createElement("button",{type:"submit",onClick:e.handleFormSubmit,className:"btn btn-outline-success form-control"},"Search")))};a(56);var h=function(e){return r.a.createElement("div",{className:"d-flex justify-content-around"},r.a.createElement("ul",{className:"search-results"},e.results.slice(0,1).map((function(t){return r.a.createElement("li",{key:t.id,className:"list-group-item"},r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"col-4"},r.a.createElement("a",{target:"_blank",rel:"noopener noreferrer",href:t.external_urls.spotify},r.a.createElement("img",{className:"img-fluid",src:e.results[0].images[0]?e.results[0].images[0].url:"",alt:t.name}))),r.a.createElement("div",{className:"col"},r.a.createElement("h5",null,r.a.createElement("a",{target:"_blank",rel:"noopener noreferrer",href:t.external_urls.spotify},t.name)),r.a.createElement("p",null,r.a.createElement("strong",null,"Followers: "),t.followers.total.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",")),r.a.createElement("p",null,r.a.createElement("strong",null,"Popularity: "),t.popularity),r.a.createElement("p",null,r.a.createElement("strong",null,"Genres: "),t.genres.join(", ")))),r.a.createElement("hr",null),r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"col"},r.a.createElement("ul",{className:"track-results mb-5"},r.a.createElement("h5",null,"Top Tracks:"),e.topTracks.map((function(e){return r.a.createElement("li",{key:e.id,className:"list-group-item"},r.a.createElement("a",{href:e.external_urls.spotify},e.name))})))),r.a.createElement("div",{className:"col"},r.a.createElement("ul",{className:"related-artists mb-5"},r.a.createElement("h5",null,"Related Artists:"),e.relatedArtists.map((function(e){return r.a.createElement("li",{key:e.id,className:"list-group-item"},r.a.createElement("a",{href:e.external_urls.spotify},e.name))}))))))}))))},g=function(e){var t=Object(n.useState)([]),a=Object(u.a)(t,2),c=a[0],l=a[1],s=Object(n.useState)(),o=Object(u.a)(s,2),i=o[0],m=o[1],p=Object(n.useState)([]),g=Object(u.a)(p,2),v=g[0],b=g[1],N=Object(n.useState)([]),y=Object(u.a)(N,2),k=y[0],w=y[1],j=Object(n.useState)([]),S=Object(u.a)(j,2),x=S[0],O=S[1];return Object(n.useEffect)((function(){f.a.get("/api/token").then((function(e){l(e.data.token)})).catch((function(e){return console.log(e)}))}),[]),r.a.createElement("div",null,r.a.createElement(E,null,r.a.createElement("h3",{id:"search-header",className:"text-center"},"Artist ",e.artistCount),r.a.createElement(d,{handleFormSubmit:function(e){e.preventDefault(),f.a.get("https://api.spotify.com/v1/search?q="+i+"&type=artist&access_token="+c).then((function(e){b(e.data.artists.items.filter((function(e){return e.name.length===i.length}))),f.a.get("https://api.spotify.com/v1/artists/"+e.data.artists.items[0].id+"/top-tracks?country=US&access_token="+c).then((function(e){w(e.data.tracks)})),f.a.get("https://api.spotify.com/v1/artists/"+e.data.artists.items[0].id+"/related-artists?&access_token="+c).then((function(e){O(e.data.artists)}))})).catch((function(e){return console.log(e)}))},handleInputChange:function(e){m(e.target.value)}}),r.a.createElement(h,{results:v,topTracks:k,relatedArtists:x})))};var v=function(){return r.a.createElement("div",{className:"row ml-5 mr-5"},r.a.createElement("div",{className:"col"},r.a.createElement(g,{artistCount:"Search"})))};var b=function(){return r.a.createElement("div",{className:"row ml-5 mr-5"},r.a.createElement("div",{className:"col"},r.a.createElement(g,{artistCount:1})),r.a.createElement("div",{className:"col"},r.a.createElement(g,{artistCount:2})))};a(57);var N=function(){return r.a.createElement(s.a,null,r.a.createElement(i,null),r.a.createElement(o.c,null,r.a.createElement(o.a,{exact:!0,path:"/",component:v}),r.a.createElement(o.a,{exact:!0,path:"/compare",component:b})),r.a.createElement(m,null))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));l.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(N,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[27,1,2]]]);
//# sourceMappingURL=main.44890695.chunk.js.map