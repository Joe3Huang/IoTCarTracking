webpackJsonp([1],{"1/oy":function(e,t){},"9M+g":function(e,t){},C9st:function(e,t){},IOps:function(e,t){},Id91:function(e,t){},JY1l:function(e,t){},Jmt5:function(e,t){},NHnr:function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});s("Jmt5"),s("9M+g");var n=s("7+uW"),o={render:function(){var e=this.$createElement,t=this._self._c||e;return t("div",{attrs:{id:"app"}},[t("router-view")],1)},staticRenderFns:[]};var i=s("VU/8")({name:"App"},o,!1,function(e){s("jlzU")},null,null).exports,a=s("/ocq"),r={name:"Login",data:function(){return{msg:"",email:"",password:""}},created:function(){var e=this;this.$store.watch(function(t){return{data:e.$store.getters["user/getMessage"]}},function(t,s){t&&(console.log(t),e.msg=t.data)})},methods:{login:function(){console.log(this.email),console.log(this.password),this.$store.dispatch("user/login",{email:this.email,password:this.password})},test:function(){this.$store.dispatch("rest",{})}}},c={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"login w-100"},[s("form",{staticClass:"form-inline justify-content-end",staticStyle:{"flex-flow":"row"},attrs:{id:"signin",role:"form"},on:{submit:function(t){return t.preventDefault(),e.login(t)}}},[s("div",{staticClass:"input-group"},[e._v(e._s(e.msg))]),e._v(" "),s("div",{staticClass:"input-group mr-1"},[e._m(0),e._v(" "),s("input",{directives:[{name:"model",rawName:"v-model",value:e.email,expression:"email"}],staticClass:"form-control",attrs:{id:"email",type:"email",name:"email",value:"",placeholder:"Email Address"},domProps:{value:e.email},on:{input:function(t){t.target.composing||(e.email=t.target.value)}}})]),e._v(" "),s("div",{staticClass:"input-group mr-1"},[e._m(1),e._v(" "),s("input",{directives:[{name:"model",rawName:"v-model",value:e.password,expression:"password"}],staticClass:"form-control",attrs:{id:"password",type:"password",name:"password",value:"",placeholder:"Password"},domProps:{value:e.password},on:{input:function(t){t.target.composing||(e.password=t.target.value)}}})]),e._v(" "),s("button",{staticClass:"btn btn-primary",attrs:{type:"submit"}},[e._v("Login")])])])},staticRenderFns:[function(){var e=this.$createElement,t=this._self._c||e;return t("span",{staticClass:"input-group-addon"},[t("i",{staticClass:"glyphicon glyphicon-user"})])},function(){var e=this.$createElement,t=this._self._c||e;return t("span",{staticClass:"input-group-addon"},[t("i",{staticClass:"glyphicon glyphicon-lock"})])}]};var d=s("VU/8")(r,c,!1,function(e){s("QuiF")},"data-v-b164611e",null).exports,l=s("//Fk"),u=s.n(l),m=s("BO1k"),p=s.n(m),g=window.google,v={name:"google-map",props:["name"],data:function(){return{mapName:this.name+"-map",markerCoordinates:[],map:null,bounds:null,markers:[],devicesTemp:[]}},mounted:function(){this.bounds=new g.maps.LatLngBounds;var e=document.getElementById(this.mapName),t={zoom:8,center:new g.maps.LatLng(-40.9006,174.886),mapTypeId:g.maps.MapTypeId.ROADMAP};this.map=new g.maps.Map(e,t)},created:function(){var e=this;this.$store.watch(function(t){return e.$store.getters["socket/getDeviceData"]},function(t,s){if(t){if(t.device_code){var n=e.devicesTemp.find(function(e){return e.device_code==t.device_code});n?(n=t,e.updateMarkerPosition(t)):(e.devicesTemp.push(t),e.setNewCoordinate(t))}"CLOSE"==t.command&&(e.$store.commit("socket/SET_DEVICE_DATA",{}),e.deleteMarker(t))}}),this.$store.watch(function(t){return e.$store.getters["socket/isAuthenticated"]},function(t,s){t||(e.deleteAllMarker(),e.devicesTemp=[])})},methods:{findTheMarker:function(e){var t=e.getPosition();this.map.zoom=9,this.map.setCenter(t)},updateMarkerPosition:function(e){var t=this.markerCoordinates.find(function(t){return t.device_code==e.device_code});t&&(t.latitude=e.latitude,t.longitude=e.longitude,this.markers.find(function(t){return t.device_code==e.device_code}).setPosition(new g.maps.LatLng(e.latitude,e.longitude)))},updateMap:function(e){var t=new g.maps.LatLng(e.latitude,e.longitude),s=new g.maps.Marker({position:t,map:this.map,label:e.name,device_code:e.device_code});this.markers.push(s),console.log("updateMarkers",this.markers),this.map.fitBounds(this.bounds.extend(t)),this.findTheMarker(s)},setNewCoordinate:function(e){console.log(e),e.device_code&&e.latitude&&e.longitude&&(this.markerCoordinates.push(e),console.log("setNewMarker",this.markerCoordinates),this.updateMap(e))},deleteMarker:function(e){var t=this.markerCoordinates.find(function(t){return t.device_code==e.device_code}),s=void 0;t&&-1!==(s=this.markerCoordinates.indexOf(t))&&this.markerCoordinates.splice(s,1),console.log("-------deleteMarker------11111",this.markerCoordinates),(t=this.markers.find(function(t){return t.device_code==e.device_code}))&&(this.clearMarker(t),-1!==(s=this.markers.indexOf(t))&&this.markers.splice(s,1)),console.log("-------deleteMarker------2222",this.markers);var n=!0,o=!1,i=void 0;try{for(var a,r=p()(this.markerCoordinates);!(n=(a=r.next()).done);n=!0){var c=a.value;this.updateMarkerPosition(c)}}catch(e){o=!0,i=e}finally{try{!n&&r.return&&r.return()}finally{if(o)throw i}}t=this.devicesTemp.find(function(t){return t.device_code==e.device_code}),-1!==(s=this.devicesTemp.indexOf(t))&&this.devicesTemp.splice(s,1)},clearMarker:function(e){console.log("------------clearMarker--------------",e),e.label=null,e.setMap(null)},deleteAllMarker:function(){for(var e=0;e<this.markers.length;e++)this.markers[e].setMap(null);this.markers=[]}}},f={render:function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"google-map"},[t("div",{staticClass:"google-map-view",attrs:{id:this.mapName}})])},staticRenderFns:[]};var h=s("VU/8")(v,f,!1,function(e){s("wlSO")},"data-v-191b3890",null).exports,_={name:"Device",data:function(){return{msg:"Device List",devices:[]}},created:function(){var e=this.$store.getters["device/getUserDevices"];this.devices=e.filter(function(e){return"BROWSER_ADMIN"!=e.device_type}),console.log(this.devices)},methods:{disconnectDevice:function(e){console.log(e),this.$store.dispatch("device/disconnectTheDevice",e)},test:function(){this.$store.dispatch("rest",{})}},components:{}},C={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"device"},[s("h1",[e._v(e._s(e.msg))]),e._v(" "),s("ul",{staticClass:"list-group align-items-center w-100 list-group-flush",attrs:{id:"example-1"}},e._l(e.devices,function(t){return s("li",{key:t.id,staticClass:"list-group-item text-left w-50"},[s("div",{staticClass:"col-lg-10 list-group"},[s("span",{staticClass:"list-group-item"},[e._v("Name: "+e._s(t.name))]),e._v(" "),s("span",{staticClass:"list-group-item"},[e._v(" Type: "+e._s(t.device_type))]),e._v(" "),s("span",{staticClass:"list-group-item"},[e._v("Code: "+e._s(t.device_code))]),e._v(" "),s("span",{staticClass:"list-group-item"},[e._v("Status: "+e._s(t.status))])]),e._v(" "),s("button",{staticClass:"col-lg-2",on:{click:function(s){e.disconnectDevice(t.uid)}}},[e._v("Reset the device")])])}))])},staticRenderFns:[]};var k=s("VU/8")(_,C,!1,function(e){s("obFx")},"data-v-0e012582",null).exports,w=s("mtWM"),E=s.n(w).a.create({baseURL:"http://35.197.110.192/RestApi",headers:{"Content-Type":"application/json",Authorization:"Bearer "}}),T=s("woOf"),b=s.n(T),D={data:function(){return{heartBeatCount:4,browserData:{}}},created:function(){var e=this;this.$store.watch(function(t){return{data:e.$store.getters["socket/getBrowserUserData"],isConnected:e.$store.getters["socket/isConnected"],isAuthenticated:e.$store.getters["socket/isAuthenticated"]}},function(t,s){t&&(console.log(t),t.isConnected&&0==t.isAuthenticated&&(e.browserData=t.data,e.sendObj({command:"AUTH",send_to:"ALL",device_type:e.browserData.device_type,device_code:e.browserData.device_code,random_link_code:e.browserData.random_link_code,message:""}),console.log(e.browserData)))}),this.$options.sockets.onopen=function(t){console.log(t),e.$store.commit("socket/SOCKET_ONOPEN"),e.ready()},this.$options.sockets.onmessage=function(t){e.heartBeatCount=5;var s=JSON.parse(t.data);if(console.log("--------------onmessage---------------",s),e.$store.getters["socket/isAuthenticated"]&&s.message.position){var n=b()(s.message.position,{device_code:s.device_code,name:s.message.name});e.$store.commit("socket/SET_DEVICE_DATA",n),e.$store.commit("device/SET_DEVICE_DATA",n)}if("AUTH"==s.command&&("OK"===s.message?(e.$store.commit("socket/SET_AUTH_TRUE"),console.log("--------------resp.command == AUTH---------------",s.data)):"DEVICE-OK"===s.message&&s.data&&e.$store.commit("device/SET_DEVICE_DATA",s.data)),"CLOSE"==s.command){var o={device_code:s.message.data.deviceCode,command:s.command};e.$store.commit("socket/SET_DEVICE_DATA",o)}}},methods:{ready:function(){var e=this;window.setInterval(function(){e.heartBeatCount?e.heartBeatCount-=1:e.heartBeat()},1e3)},sendObj:function(e){this.heartBeatCount=5,this.$socket.sendObj(e)},heartBeat:function(){console.log("-----------------------------heartBeat----------------"),this.sendObj({command:"HEARTBEAT",send_to:"ALL",device_type:this.browserData.device_type,device_code:this.browserData.device_code,random_link_code:this.browserData.random_link_code,message:""})}}},S=s("lbHh"),A={name:"Home",mixins:[D],data:function(){return{msg:"Welcome to Home page",bShowDevices:!1}},beforeCreate:function(){console.log("Nothing gets called before me!")},created:function(){var e=this;this.getLocalToken(),this.$store.getters["user/isLoggedin"]&&this.logininToDO(),this.$store.watch(function(t){return e.$store.getters["user/isLoggedin"]},function(t,s){console.log(s),console.log(t),t&&e.logininToDO(),console.log(e.$store)})},computed:{},methods:{test:function(){this.$store.dispatch("user/rest",{}),this.$store.dispatch("device/rest",{}),this.$store.dispatch("socket/rest",{}),S.set("access_token","",{expires:7})},logininToDO:function(){var e=this;E.defaults.headers.Authorization="Bearer "+this.$store.getters["user/getToken"],u.a.all([this.$store.dispatch("user/getTheUserInfo"),this.$store.dispatch("device/getUserDevices")]).then(function(t){console.log("Hello"),console.log(t);var s=t[1].data.find(function(e){return"BROWSER_ADMIN"==e.device_type});e.$store.commit("socket/SET_BROWSERUSER_DATA",s)}).catch(function(e){console.log(e)})},socketTest:function(){this.$socket.sendObj({awesome:"data"})},getLocalToken:function(){var e=S.get("access_token");e&&this.$store.commit("user/addWebToken",e)}},components:{"google-map":h,login:d,device:k}},y={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"home header"},[s("nav",{staticClass:"navbar navbar-light navbar-expand-md bg-faded justify-content-center container-fluid"},[s("a",{staticClass:"brand-title navbar-brand d-flex w-50 mr-auto",attrs:{href:"/"}},[e._v("IoT-CarTracking")]),e._v(" "),s("b-btn",{directives:[{name:"b-toggle",rawName:"v-b-toggle.collapse1",modifiers:{collapse1:!0}}],staticClass:"navbar-toggler",attrs:{type:"button","data-toggle":"collapse","data-target":"#collapsingNavbar3"}},[s("span",{staticClass:"navbar-toggler-icon"})]),e._v(" "),s("b-collapse",{staticClass:"navbar-collapse collapse",staticStyle:{width:"1000px"},attrs:{id:"collapse1"}},[s("b-card",{staticStyle:{border:"0px",margin:"0px",padding:"0px"}},[s("ul",{staticClass:"nav navbar-nav pull-right"},[this.$store.getters["user/isLoggedin"]?s("li",{staticClass:"nav-item"},[s("a",{staticClass:"nav-link",attrs:{href:"#"},on:{click:function(t){e.bShowDevices=!e.bShowDevices}}},[e._v("Devices")])]):e._e(),e._v(" "),this.$store.getters["user/isLoggedin"]?s("li",{staticClass:"nav-item"},[s("a",{staticClass:"nav-link",attrs:{href:"#"},on:{click:function(t){e.test()}}},[e._v("Logout")])]):e._e(),e._v(" "),this.$store.getters["user/isLoggedin"]?e._e():s("li",{staticClass:"nav-item"},[s("login"),e._v(" "),s("div",{staticClass:"d-flex justify-content-end"},[s("router-link",{staticClass:"nav-link",staticStyle:{"font-size":"50%",padding:"0px",margin:"2px 0 0 0"},attrs:{to:"/register"}},[e._v("Register -")]),e._v(" "),s("router-link",{staticClass:"nav-link",staticStyle:{"font-size":"50%",padding:"0px",margin:"2px 0 0 0"},attrs:{to:"/resetPassword"}},[e._v("- Forgot Password")])],1)],1)])])],1)],1),e._v(" "),this.bShowDevices?s("device"):e._e(),e._v(" "),s("div",{staticClass:"map"},[s("google-map",{ref:"googleMap",attrs:{name:"example"}})],1),e._v(" "),s("div",[e._v("isLoggedin: "+e._s(this.$store.getters["user/isLoggedin"]))]),e._v(" "),s("div",[e._v("isConnected - socket: "+e._s(this.$store.getters["socket/isConnected"]))]),e._v(" "),s("div",[e._v("Authentication - socket: "+e._s(this.$store.getters["socket/isAuthenticated"]))])],1)},staticRenderFns:[]};var $=s("VU/8")(A,y,!1,function(e){s("PAKy")},"data-v-1f6cfc5b",null).exports,O={name:"Register",data:function(){return{msg:"This is Register page",email:"",password:"",firstName:"",lastName:"",city:""}},methods:{register:function(){console.log(this.email),console.log(this.password);var e=this;E.post("/registerUser",{email:this.email,password:this.password,first_name:this.firstName,last_name:this.lastName,city:this.city}).then(function(t){console.log(t),e.msg=t.data}).catch(function(t){t.response&&(console.log(t.response),e.msg=t.response.data.message)})}}},R={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"register container"},[s("h1",[e._v("Register Your Account")]),s("br"),e._v(" "),s("form",{staticClass:"navbar-form w-50 mx-auto",attrs:{id:"signin",role:"form"},on:{submit:function(t){return t.preventDefault(),e.register(t)}}},[s("div",{staticClass:"input-group"},[e._m(0),e._v(" "),s("input",{directives:[{name:"model",rawName:"v-model",value:e.email,expression:"email"}],staticClass:"form-control",attrs:{id:"email",type:"email",name:"email",value:"",placeholder:"Email Address"},domProps:{value:e.email},on:{input:function(t){t.target.composing||(e.email=t.target.value)}}})]),e._v(" "),s("div",{staticClass:"input-group  mt-3"},[e._m(1),e._v(" "),s("input",{directives:[{name:"model",rawName:"v-model",value:e.password,expression:"password"}],staticClass:"form-control",attrs:{id:"password",type:"password",name:"password",value:"",placeholder:"Password"},domProps:{value:e.password},on:{input:function(t){t.target.composing||(e.password=t.target.value)}}})]),e._v(" "),s("button",{staticClass:"btn btn-primary mt-3",attrs:{type:"submit"}},[e._v("Register")])]),e._v(" "),s("p",{staticClass:"msg",staticStyle:{color:"red"}},[e._v(e._s(e.msg))])])},staticRenderFns:[function(){var e=this.$createElement,t=this._self._c||e;return t("span",{staticClass:"input-group-addon"},[t("i",{staticClass:"glyphicon glyphicon-user"})])},function(){var e=this.$createElement,t=this._self._c||e;return t("span",{staticClass:"input-group-addon"},[t("i",{staticClass:"glyphicon glyphicon-lock"})])}]};var x=s("VU/8")(O,R,!1,function(e){s("IOps")},"data-v-cc2ca1e2",null).exports,U={name:"ForgetPassword",data:function(){return{msg:"This is ForgetPassword page",email:""}},methods:{reset:function(){console.log(this.email);var e=this;E.post("/resetPassword",{email:this.email}).then(function(t){console.log(t),e.msg=t.data}).catch(function(t){t.response&&(console.log(t.response),e.msg=t.response.data.message)})}}},N={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"reset-password container"},[s("h1",[e._v("Reset Your Password")]),s("br"),e._v(" "),s("form",{staticClass:"navbar-form w-50 mx-auto",attrs:{role:"form"},on:{submit:function(t){return t.preventDefault(),e.reset(t)}}},[s("div",{staticClass:"input-group"},[e._m(0),e._v(" "),s("input",{directives:[{name:"model",rawName:"v-model",value:e.email,expression:"email"}],staticClass:"form-control",attrs:{id:"email",type:"email",name:"email",value:"",placeholder:"Email Address"},domProps:{value:e.email},on:{input:function(t){t.target.composing||(e.email=t.target.value)}}})]),e._v(" "),s("button",{staticClass:"btn btn-primary mt-3",attrs:{type:"submit"}},[e._v("Reset")])]),e._v("\n  "+e._s(e.msg)+"\n")])},staticRenderFns:[function(){var e=this.$createElement,t=this._self._c||e;return t("span",{staticClass:"input-group-addon"},[t("i",{staticClass:"glyphicon glyphicon-user"})])}]};var M=s("VU/8")(U,N,!1,function(e){s("JY1l")},"data-v-49785cc9",null).exports;n.a.use(a.a);var L=new a.a({routes:[{path:"/",name:"Home",component:$},{path:"/login",name:"Login",component:d},{path:"/register",name:"Register",component:x},{path:"/resetPassword",name:"ResetPassword",component:M}]}),I=s("e6fC"),P=s("Rf8U"),B=s.n(P),V=s("NYxO"),F={namespaced:!0,state:{userName:"",loggedInStatus:!1,authToken:"",uid:"",message:""},getters:{getToken:function(e){return e.authToken},isLoggedin:function(e){return e.loggedInStatus},getMessage:function(e){return e.message}},actions:{login:function(e,t){E.post("/accessToken",{grant_type:"password",client_id:"2",client_secret:"JInx5GkilhknZ7TNmSOOHfPkQAUZSOhgec97WMMK",scope:"*",username:t.email,password:t.password}).then(function(t){e.commit("addWebToken",t.data.access_token),S.set("access_token",t.data.access_token,{expires:7}),e.commit("SET_MESSAGE","")}).catch(function(t){console.log(t.response),t.response&&e.commit("SET_MESSAGE",t.response.data.error)})},logout:function(e){e.commit("removeWebToken")},rest:function(e){e.commit("resetState")},setUid:function(e,t){e.commit("addUid",t)},getTheUserInfo:function(e){return E.get("/userInfo").then(function(t){return console.log(t),e.commit("addUid",t.data.uid),t}).catch(function(e){console.log("rest"),console.log(e.response)})}},mutations:{addWebToken:function(e,t){e.authToken=t,e.loggedInStatus=!0},removeWebToken:function(e){e.authToken="",e.user.authToken=!1},resetState:function(e){e.userName="",e.loggedInStatus=!1,e.authToken="",e.uid="",e.message=""},addUid:function(e,t){e.uid=t},SET_MESSAGE:function(e,t){e.message=t}}},j={namespaced:!0,state:{devices:[]},getters:{getUserDevices:function(e){return e.devices}},actions:{getUserDevices:function(e){return E.get("/device/userDevices").then(function(t){return console.log(t),e.commit("ADD_DEVICES",t.data),t}).catch(function(e){console.log("getUserDevices"),console.log(e.response)})},disconnectTheDevice:function(e,t){E.post("/device/resetDevice",{device_uid:t}).then(function(t){console.log(t.data),e.commit("SET_DEVICE_DATA",t.data)}).catch(function(e){console.log("disconnectTheDevice"),console.log(e.response)})},rest:function(e){e.commit("resetState")}},mutations:{ADD_DEVICES:function(e,t){e.devices=t},resetState:function(e){e.devices=[]},SET_DEVICE_DATA:function(e,t){var s=e.devices.find(function(e){return e.device_code==t.device_code});s&&b()(s,t)}}},H={namespaced:!0,state:{isConnected:!1,isAuthenticated:!1,message:"",reconnectError:!1,deviceData:{},browserUserData:{}},getters:{getPosition:function(e){return{latitude:e.latitude,longitude:e.longitude}},getDeviceData:function(e){return e.deviceData},getBrowserUserData:function(e){return e.browserUserData},isConnected:function(e){return e.isConnected},isAuthenticated:function(e){return e.isAuthenticated}},actions:{rest:function(e){e.commit("RESET")}},mutations:{SOCKET_ONOPEN:function(e){e.isConnected=!0},SOCKET_ONCLOSE:function(e,t){e.socket.isConnected=!1},SOCKET_ONERROR:function(e,t){console.error(e,t)},SOCKET_ONMESSAGE:function(e,t){console.log(t),e.message=t},SOCKET_RECONNECT:function(e,t){console.info(e,t)},SOCKET_RECONNECT_ERROR:function(e){e.socket.reconnectError=!0},SET_POSITION:function(e,t){e.latitude=t.latitude,e.longitude=t.longitude},SET_DEVICE_DATA:function(e,t){e.deviceData=t},SET_BROWSERUSER_DATA:function(e,t){e.browserUserData=t},RESET:function(e){e.isAuthenticated=!1,e.message="",e.reconnectError=!1,e.deviceData={},e.browserUserData={}},SET_AUTH_TRUE:function(e){e.isAuthenticated=!0},SET_AUTH_FALSE:function(e){e.isAuthenticated=!1}}};n.a.use(V.a);var W=void 0,K=function(){return W||(W=new V.a.Store({modules:{user:F,device:j,socket:H}}))},z=s("U8jO"),J=s.n(z);n.a.config.productionTip=!1,n.a.config.devtools=!0,n.a.use(J.a,"ws://35.197.110.192/Socket",{format:"json",reconnection:!0,reconnectionAttempts:5,reconnectionDelay:3e3}),s("C9st"),n.a.use(B.a,E),n.a.use(I.a),new n.a({el:"#app",store:K,router:L,axios:E,components:{App:i},template:"<App/>"})},PAKy:function(e,t){},QuiF:function(e,t){},jlzU:function(e,t){},obFx:function(e,t){},wlSO:function(e,t){},zj2Q:function(e,t){}},["NHnr"]);
//# sourceMappingURL=app.2ba572fb10850f55d9c7.js.map