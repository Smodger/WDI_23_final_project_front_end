"use strict";function Auth(e,t){e.loginUrl=t+"/login",e.signupUrl=t+"/register",e.tokenPrefix=""}function RegisterController(e,t){function o(){e.signup(r.user).then(function(){t.go("login")})}var r=this;r.user={},r.submit=o}function LoginController(e,t){function o(){e.login(r.credentials).then(function(){t.go("usersIndex")})}var r=this;r.credentials={},r.submit=o}function googleMap(e){return{restrict:"E",replace:!0,template:'<div class="google-map"></div>',scope:{center:"=",zoom:"=",waypoints:"=",hasInfoWindows:"="},link:function(t,o){function r(){s.forEach(function(e){l.setMap(n),e.setMap(null)}),s=[]}var n=new e.google.maps.Map(o[0],{center:t.center,zoom:t.zoom,mapTypeId:"terrain"}),l=new e.google.maps.Polyline({path:s,geodesic:!0,strokeColor:"#FF0000",strokeOpacity:1,strokeWeight:2}),s=[];t.$watch("waypoints",function(o){r(),t.waypoints&&t.waypoints.forEach(function(o){var r=new e.google.maps.Marker({position:{lat:o.lat,lng:o.lng},map:n,animation:e.google.maps.Animation.DROP});t.hasInfoWindows&&!function(){r.addListener("mouseover",function(){l.open(n,r),s.push(r)}),r.addListener("mouseout",function(){l.close()}),r.addListener("click",function(){console.log("/routes/"+o.route.id),window.location.href="http://localhost:8000/#/routes/"+o.route.id});var t="<h1>"+o.route.title+"</h1><p>"+o.route.route_description+"</p>",l=new e.google.maps.InfoWindow({content:t})}()})})}}}function MainController(e,t,o){function r(){e.logout().then(function(){t.go("login")})}function n(o,r,n){(!e.isAuthenticated()&&s.includes(r.name)||"usersEdit"===r.name&&parseFloat(n.id)!==e.getPayload().id)&&(o.preventDefault(),t.go("login"))}var l=this;l.isLoggedIn=e.isAuthenticated;var s=["usersEdit"];o.$on("$stateChangeStart",n),l.logout=r}function Route(e,t){return new e(t+"/routes/:id",{id:"@id"},{update:{method:"PUT"}})}function Router(e,t){e.state("usersIndex",{url:"/users",templateUrl:"/templates/usersIndex.html",controller:"UsersIndexController as usersIndex"}).state("usersShow",{url:"/users/:id",templateUrl:"/templates/usersShow.html",controller:"UsersShowController as usersShow"}).state("usersEdit",{url:"/users/:id/edit",templateUrl:"/templates/usersEdit.html",controller:"UsersEditController as usersEdit"}).state("routesIndex",{url:"/routes",templateUrl:"/templates/routesIndex.html",controller:"RoutesIndexController as routesIndex"}).state("routesShow",{url:"/routes/:id",templateUrl:"/templates/routesShow.html",controller:"RoutesShowController as routesShow"}).state("routesNew",{url:"/routesNew",templateUrl:"/templates.routesNew.html",controller:"RoutesNewController as routesNew"}).state("routesEdit",{url:"/routes/:id/edit",templateUrl:"/templates.routesEdit.html",controller:"RoutesEditController as routesEdit"}).state("register",{url:"/register",templateUrl:"/templates/register.html",controller:"RegisterController as register"}).state("login",{url:"/login",templateUrl:"/templates/login.html",controller:"LoginController as login"}),t.otherwise("/routes")}function RoutesIndexController(e){var t=this;e.query(function(e){t.all=e,t.waypoints=e.map(function(e){return e.waypoints[0]})})}function RoutesShowController(e,t){function o(){r.route.$remove(function(){t.go("RoutesIndex")})}var r=this;r.center=null,e.get(t.params,function(e){r.route=e,r.center={lat:r.route.waypoints[0].lat,lng:r.route.waypoints[0].lng}}),r.delete=o}function RoutesEditController(e,t){function o(){r.route.$update(function(){t.go("routesShow",t.params)})}var r=this;r.route=e.get(t.params),this.update=o}function UsersIndexController(e){var t=this;t.all=e.query()}function UsersShowController(e,t,o){function r(){l.user.id===s&&(l.editable=!0)}function n(){l.user.$remove(function(){t.go("usersIndex")})}var l=this,s=o.getPayload().id;l.editable=!1,e.get(t.params).$promise.then(function(e){l.user=e,r()}),l.allowUserToEdit=r,l.delete=n}function UsersEditController(e,t){function o(){r.user.$update(function(){t.go("usersShow",t.params)})}var r=this;r.user=e.get(t.params),this.update=o}function User(e,t){return new e(t+"/users/:id",{id:"@id"},{update:{method:"PUT"}})}angular.module("finalProject",["ngResource","ui.router","satellizer"]).constant("API_URL","http://localhost:3000/api").config(Auth),Auth.$inject=["$authProvider","API_URL"],angular.module("finalProject").controller("RegisterController",RegisterController).controller("LoginController",LoginController),RegisterController.$inject=["$auth","$state"],LoginController.$inject=["$auth","$state"],angular.module("finalProject").directive("googleMap",googleMap),googleMap.$inject=["$window","$state"],angular.module("finalProject").controller("MainController",MainController),MainController.$inject=["$auth","$state","$rootScope"],angular.module("finalProject").factory("Route",Route),Route.$inject=["$resource","API_URL"],angular.module("finalProject").config(Router),Router.$inject=["$stateProvider","$urlRouterProvider"],angular.module("finalProject").controller("RoutesIndexController",RoutesIndexController).controller("RoutesShowController",RoutesShowController).controller("RoutesEditController",RoutesEditController),RoutesIndexController.$inject=["Route"],RoutesShowController.$inject=["Route","$state"],RoutesEditController.$inject=["Route","$state"],angular.module("finalProject").controller("UsersIndexController",UsersIndexController).controller("UsersShowController",UsersShowController).controller("UsersEditController",UsersEditController),UsersIndexController.$inject=["User"],UsersShowController.$inject=["User","$state","$auth"],UsersEditController.$inject=["User","$state"],angular.module("finalProject").factory("User",User),User.$inject=["$resource","API_URL"];
//# sourceMappingURL=app.js.map