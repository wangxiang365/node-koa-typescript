(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-156d8ffc"],{"2b6d":function(a,t,e){"use strict";var s=e("4f9c"),r=e.n(s);r.a},"3ca2":function(a,t,e){"use strict";e.r(t);var s,r=function(){var a=this,t=a.$createElement,e=a._self._c||t;return e("div",{staticClass:"resetLoginPwd-wrap"},[e("ul",[e("li",[e("div",[a._v("旧密码")]),e("div",{staticClass:"inp"},[e("input",{directives:[{name:"model",rawName:"v-model",value:a.formData.passwordOld,expression:"formData.passwordOld"}],attrs:{type:"password",placeholder:"请输入旧密码"},domProps:{value:a.formData.passwordOld},on:{input:function(t){t.target.composing||a.$set(a.formData,"passwordOld",t.target.value)}}})])]),e("li",[e("div",[a._v("新密码")]),e("div",{staticClass:"inp"},[e("input",{directives:[{name:"model",rawName:"v-model",value:a.formData.passwordNew,expression:"formData.passwordNew"}],attrs:{type:"password",placeholder:"请输入新密码"},domProps:{value:a.formData.passwordNew},on:{input:function(t){t.target.composing||a.$set(a.formData,"passwordNew",t.target.value)}}})])]),e("li",[e("div",[a._v("确认密码")]),e("div",{staticClass:"inp"},[e("input",{directives:[{name:"model",rawName:"v-model",value:a.formData.passwordConfirm,expression:"formData.passwordConfirm"}],attrs:{type:"password",placeholder:"请确认新密码"},domProps:{value:a.formData.passwordConfirm},on:{input:function(t){t.target.composing||a.$set(a.formData,"passwordConfirm",t.target.value)}}})])]),e("div",{staticClass:"tip"},[a._v("密码必须至少6个字符，而且同时包含字母和数字。")])]),e("van-button",{staticClass:"unverified-btn",attrs:{type:"primary"},on:{click:a.savePwd}},[a._v("保存新密码")])],1)},o=[],n=(e("b0c0"),e("d3b7"),e("ac1f"),e("466d"),e("96cf"),e("2fa7")),i=(e("e7e5"),e("d399")),d=(e("c3a6"),e("ad06")),p=(e("66b9"),e("b650")),c={components:(s={},Object(n["a"])(s,p["a"].name,p["a"]),Object(n["a"])(s,d["a"].name,d["a"]),Object(n["a"])(s,i["a"].name,i["a"]),s),data:function(){return{formData:{passwordOld:"",passwordNew:"",passwordConfirm:""},rePwd:/^(?=.*?[a-z)(?=.*>[A-Z])(?=.*?[0-9])[a-zA_Z0-9]{6,20}$/,matchTips:"密码必须至少6-20个字符，而且同时包含字母和数字。"}},mounted:function(){this.userInfo=JSON.parse(localStorage.getItem("LZWLUSERINFO"))},methods:{savePwd:function(){var a;return regeneratorRuntime.async((function(t){while(1)switch(t.prev=t.next){case 0:if(this.formData.passwordOld){t.next=3;break}return Object(i["a"])("请输入旧密码"),t.abrupt("return",!1);case 3:if(this.formData.passwordNew){t.next=8;break}return Object(i["a"])("请输入新密码"),t.abrupt("return",!1);case 8:if(this.formData.passwordNew.match(this.rePwd)){t.next=11;break}return Object(i["a"])(this.matchTips),t.abrupt("return",!1);case 11:if(this.formData.passwordConfirm){t.next=16;break}return Object(i["a"])("请输入确认密码"),t.abrupt("return",!1);case 16:if(this.formData.passwordConfirm===this.formData.passwordNew){t.next=19;break}return Object(i["a"])("新密码不一致"),t.abrupt("return",!1);case 19:return t.next=21,regeneratorRuntime.awrap(this.$http.post("".concat(this.api.updatePass),{id:this.userInfo.userId,password:this.formData.passwordOld,newPassword:this.formData.passwordNew,subNewPassword:this.formData.passwordConfirm}));case 21:if(a=t.sent,a.data.status!==this.api.ERR_OK){t.next=25;break}return this.$router.back(),t.abrupt("return");case 25:this.$toast(a.data.msg);case 26:case"end":return t.stop()}}),null,this)}}},u=c,m=(e("2b6d"),e("2877")),f=Object(m["a"])(u,r,o,!1,null,null,null);t["default"]=f.exports},"4f9c":function(a,t,e){},c3a6:function(a,t,e){"use strict";e("68ef"),e("09fe")}}]);
//# sourceMappingURL=chunk-156d8ffc.1584768776983.js.map