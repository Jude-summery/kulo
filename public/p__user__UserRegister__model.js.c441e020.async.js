(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[16],{j4xJ:function(e,t,a){"use strict";var n=a("g09b");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=n(a("p0pE")),u=n(a("d6i3")),s=a("slyq"),i={namespace:"userRegister",state:{status:void 0},effects:{submit:u.default.mark(function e(t,a){var n,r,i,p;return u.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return n=t.payload,r=a.call,i=a.put,e.next=4,r(s.signup,n);case 4:return p=e.sent,e.next=7,i({type:"registerHandle",payload:p});case 7:case"end":return e.stop()}},e)})},reducers:{registerHandle:function(e,t){var a=t.payload;return(0,r.default)({},e,{status:a.status})}}},p=i;t.default=p},slyq:function(e,t,a){"use strict";var n=a("g09b");Object.defineProperty(t,"__esModule",{value:!0}),t.signup=i;var r=n(a("d6i3")),u=n(a("1l/V")),s=n(a("t3Un"));function i(e){return p.apply(this,arguments)}function p(){return p=(0,u.default)(r.default.mark(function e(t){return r.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.abrupt("return",(0,s.default)("/api/signup",{method:"POST",data:t}));case 1:case"end":return e.stop()}},e)})),p.apply(this,arguments)}}}]);