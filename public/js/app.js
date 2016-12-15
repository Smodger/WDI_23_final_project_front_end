"use strict";function Auth(t,e){t.loginUrl=e+"/login",t.signupUrl=e+"/register",t.tokenPrefix=""}function RegisterController(t,e){function o(){t.signup(r.user).then(function(){e.go("login")})}var r=this;r.user={},r.submit=o}function LoginController(t,e){function o(){t.login(r.credentials).then(function(){e.go("routesIndex")})}var r=this;r.credentials={},r.submit=o}function googleMap(t,e,o){return{restrict:"E",replace:!0,template:'<div class="google-map"></div>',scope:{center:"=",zoom:"=",waypoints:"=",hasInfoWindows:"=",isEditable:"=",isTraceable:"=",routeId:"="},link:function(r,n){function l(t){console.log("clicked");var n={};n.lat=t.latLng.lat(),n.lng=t.latLng.lng(),e.params.id?(n.route_id=e.params.id,n.position=r.waypoints.length+1):(n.route_id=r.routeId,d.push(n),n.position=d.length),o.save(n,function(t){e.params.id&&r.waypoints.push(t),u(t),i()})}function i(){if(r.isTraceable){g=[];var t=r.waypoints?r.waypoints:d;t.forEach(function(t){g.push({lat:t.lat,lng:t.lng})}),p.setPath(g)}}function s(){h.forEach(function(t){t.setMap(null)}),h=[]}function a(t){this.waypoint.lat=t.latLng.lat(),this.waypoint.lng=t.latLng.lng(),o.update(this.waypoint,function(){i()})}function u(e){var o=new t.google.maps.Marker({position:{lat:e.lat,lng:e.lng},map:c,animation:t.google.maps.Animation.DROP,draggable:r.isEditable,waypoint:e});o.addListener("dragend",a),r.hasInfoWindows&&!function(){o.addListener("mouseover",function(){n.open(c,o),h.push(o)}),o.addListener("mouseout",function(){n.close()}),o.addListener("click",function(){window.location.href="/#/routes/"+e.route.id});var r="<h1>"+e.route.title+"</h1><p>"+e.route.route_description+"</p><h5>Click the marker for route details</h5><style> h1 { border: 1px solid #E37222; color: #E37222; text-align: center; border-radius: 5px;} p {color: #777879} h5 {color: #777879; text-decoration: underline;}</style>",n=new t.google.maps.InfoWindow({content:r})}(),h.push(o)}console.log(r);var c=new t.google.maps.Map(n[0],{center:r.center,zoom:r.zoom,mapTypeId:"terrain"}),d=[];c.addListener("dblclick",l);var g=[],p=new t.google.maps.Polyline({geodesic:!0,strokeColor:"#FF0000",strokeOpacity:1,strokeWeight:2,map:c});i();var h=[];r.$watch("waypoints",function(){s(),r.waypoints&&r.waypoints.forEach(u)})}}}function MainController(t,e,o){function r(){t.logout().then(function(){e.go("login")})}function n(o,r,n){(!t.isAuthenticated()&&s.includes(r.name)||"usersEdit"===r.name&&parseFloat(n.id)!==t.getPayload().id)&&(o.preventDefault(),e.go("login"))}function l(){return navigator.geolocation?void navigator.geolocation.getCurrentPosition(function(t){i.position=t,i.myLat=i.position.coords.latitude.toFixed(4),i.myLng=i.position.coords.longitude.toFixed(4),$("#longLat").append("<h2> Latitude: "+i.myLat+", Longitude:  "+i.myLng+"</h2>")}.bind(i)):"Error in getting position"}var i=this;i.isLoggedIn=t.isAuthenticated,i.currentUser=t.getPayload();var s=["usersEdit"];o.$on("$stateChangeStart",n),i.logout=r,i.getLocation=l}function Route(t,e){return new t(e+"/routes/:id",{id:"@id"},{update:{method:"PUT"}})}function Router(t,e){t.state("usersIndex",{url:"/users",templateUrl:"/templates/usersIndex.html",controller:"UsersIndexController as usersIndex"}).state("usersShow",{url:"/users/:id",templateUrl:"/templates/usersShow.html",controller:"UsersShowController as usersShow"}).state("usersEdit",{url:"/users/:id/edit",templateUrl:"/templates/usersEdit.html",controller:"UsersEditController as usersEdit"}).state("routesIndex",{url:"/routes",templateUrl:"/templates/routesIndex.html",controller:"RoutesIndexController as routesIndex"}).state("routesNew",{url:"/routes/new",templateUrl:"/templates/routesNew.html",controller:"RoutesNewController as routesNew"}).state("routesShow",{url:"/routes/:id",templateUrl:"/templates/routesShow.html",controller:"RoutesShowController as routesShow"}).state("routesEdit",{url:"/routes/:id/edit",templateUrl:"/templates/routesEdit.html",controller:"RoutesEditController as routesEdit"}).state("usefulInfo",{url:"/usefulInfo",templateUrl:"/templates/usefulInfo.html"}).state("register",{url:"/register",templateUrl:"/templates/register.html",controller:"RegisterController as register"}).state("login",{url:"/login",templateUrl:"/templates/login.html",controller:"LoginController as login"}),e.otherwise("/routes")}function RoutesIndexController(t){var e=this;t.query(function(t){e.all=t,e.waypoints=t.map(function(t){return t.waypoints[0]})})}function RoutesNewController(t){function e(){t.save(o.route,function(t){console.log(t),o.routeId=t.id,o.showmap=!0})}var o=this;o.route={},o.showmap=!1,o.createRoute=e}function RoutesShowController(t,e,o){function r(){console.log("in function"),n.route.$remove(function(){e.go("routesIndex")})}var n=this;n.switchEditState=!1,n.center=null,t.get(e.params,function(t){if(n.route=t,n.center={lat:n.route.waypoints[0].lat,lng:n.route.waypoints[0].lng},o.isAuthenticated()){var e=o.getPayload().id;n.isCurrentUser=e===t.user.id}}),n.delete=r}function RoutesEditController(t,e){function o(){r.route.$update(function(){e.reload()})}var r=this;r.route=t.get(e.params),r.update=o}function UsersIndexController(t){var e=this;e.all=t.query()}function UsersShowController(t,e,o){function r(){l.user.id===i&&(l.editable=!0)}function n(){l.user.$remove(function(){e.go("usersIndex")})}var l=this,i=o.getPayload().id;l.editable=!1,t.get(e.params).$promise.then(function(t){l.user=t,r()}),l.allowUserToEdit=r,l.delete=n}function UsersEditController(t,e){function o(){r.user.$update(function(){e.go("usersShow",e.params)})}var r=this;r.user=t.get(e.params),this.update=o}function User(t,e){return new t(e+"/users/:id",{id:"@id"},{update:{method:"PUT"}})}function Waypoint(t,e){return new t(e+"/waypoints/:id",{id:"@id"},{update:{method:"PUT"}})}angular.module("finalProject",["ngResource","ui.router","satellizer"]).constant("API_URL","localhost"===window.location.hostname?"http://localhost:3000/api":"//findawalk.herokuapp.com/api").config(Auth),Auth.$inject=["$authProvider","API_URL"],angular.module("finalProject").controller("RegisterController",RegisterController).controller("LoginController",LoginController),RegisterController.$inject=["$auth","$state"],LoginController.$inject=["$auth","$state"],angular.module("finalProject").directive("googleMap",googleMap),googleMap.$inject=["$window","$state","Waypoint"],angular.module("finalProject").controller("MainController",MainController),MainController.$inject=["$auth","$state","$rootScope"],angular.module("finalProject").factory("Route",Route),Route.$inject=["$resource","API_URL"],angular.module("finalProject").config(Router),Router.$inject=["$stateProvider","$urlRouterProvider"],angular.module("finalProject").controller("RoutesIndexController",RoutesIndexController).controller("RoutesNewController",RoutesNewController).controller("RoutesShowController",RoutesShowController).controller("RoutesEditController",RoutesEditController),RoutesIndexController.$inject=["Route"],RoutesNewController.$inject=["Route"],RoutesShowController.$inject=["Route","$state","$auth"],RoutesEditController.$inject=["Route","$state"],angular.module("finalProject").controller("UsersIndexController",UsersIndexController).controller("UsersShowController",UsersShowController).controller("UsersEditController",UsersEditController),UsersIndexController.$inject=["User"],UsersShowController.$inject=["User","$state","$auth"],UsersEditController.$inject=["User","$state"],angular.module("finalProject").factory("User",User),User.$inject=["$resource","API_URL"],angular.module("finalProject").factory("Waypoint",Waypoint),Waypoint.$inject=["$resource","API_URL"];
//# sourceMappingURL=app.js.map
