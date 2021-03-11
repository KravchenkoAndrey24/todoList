(this["webpackJsonpit-incubator-todolist-ts"]=this["webpackJsonpit-incubator-todolist-ts"]||[]).push([[0],{14:function(e,t,n){},15:function(e,t,n){},16:function(e,t,n){"use strict";n.r(t);var a=n(0),i=n.n(a),c=n(8),r=n.n(c),l=(n(14),n(5)),o=n(2),u=n(3),s=n(1),d=n(18);n(15);function f(e){var t=Object(a.useState)(""),n=Object(s.a)(t,2),c=n[0],r=n[1],l=Object(a.useState)(null),o=Object(s.a)(l,2),u=o[0],d=o[1],f=function(){var t=c.trim();t?e.addItem(t):d("Title is required"),r("")};return i.a.createElement("div",null,i.a.createElement("input",{value:c,onChange:function(e){r(e.currentTarget.value)},onKeyPress:function(e){d(null),"Enter"===e.key&&f()},className:u?"error":""}),i.a.createElement("button",{onClick:f},"+"),u&&i.a.createElement("div",{className:"error_message"},u))}function b(e){var t=Object(a.useState)(e.title),n=Object(s.a)(t,2),c=n[0],r=n[1],l=Object(a.useState)(!1),o=Object(s.a)(l,2),u=o[0],d=o[1];return u?i.a.createElement("input",{value:c,onChange:function(e){r(e.currentTarget.value)},onKeyPress:function(t){"Enter"===t.key&&(d(!1),e.changeTaskTitle(c))},autoFocus:!0,onBlur:function(){d(!1),e.changeTaskTitle(c)}}):i.a.createElement("span",{onDoubleClick:function(){d(!0)}},e.title)}var m=function(e){var t=e.tasks.map((function(t){return i.a.createElement("li",{key:t.id,className:t.isDone?"is_done":""},i.a.createElement("input",{type:"checkbox",checked:t.isDone,onChange:function(n){var a=n.currentTarget.checked;e.changeTaskStatus(t.id,a,e.id)}}),i.a.createElement(b,{title:t.title,changeTaskTitle:function(n){e.changeTitle(t.id,n,e.id)}}),i.a.createElement("button",{onClick:function(){e.removeTasks(t.id,e.id)}},"X"))}));return i.a.createElement("div",null,i.a.createElement("h3",null,i.a.createElement(b,{title:e.title,changeTaskTitle:function(t){return e.changeTodoListTitle(t,e.id)}}),i.a.createElement("button",{onClick:function(){return e.deleteTodolist(e.id)}},"X")),i.a.createElement(f,{addItem:function(t){e.addTasks(t,e.id)}}),i.a.createElement("ul",null,t),i.a.createElement("div",null,i.a.createElement("button",{className:"all"===e.filter?"active_filter":"",onClick:function(){return e.changeFilter("all",e.id)}},"All"),i.a.createElement("button",{className:"active"===e.filter?"active_filter":"",onClick:function(){return e.changeFilter("active",e.id)}},"Active"),i.a.createElement("button",{className:"completed"===e.filter?"active_filter":"",onClick:function(){return e.changeFilter("completed",e.id)}},"Completed")))},v=function(){var e,t=Object(d.a)(),n=Object(d.a)(),c=Object(a.useState)([{id:t,title:"What to learn",filter:"all"},{id:n,title:"What to buy",filter:"all"}]),r=Object(s.a)(c,2),b=r[0],v=r[1],j=Object(a.useState)((e={},Object(u.a)(e,t,[{id:Object(d.a)(),title:"HTML&CSS",isDone:!0},{id:Object(d.a)(),title:"JS",isDone:!0},{id:Object(d.a)(),title:"React JS",isDone:!1},{id:Object(d.a)(),title:"Rest API",isDone:!1},{id:Object(d.a)(),title:"GraphQL",isDone:!1}]),Object(u.a)(e,n,[{id:Object(d.a)(),title:"HTML&CSS",isDone:!0},{id:Object(d.a)(),title:"JS",isDone:!0},{id:Object(d.a)(),title:"React JS",isDone:!1}]),e)),O=Object(s.a)(j,2),h=O[0],k=O[1];function T(e,t){var n=h[t].filter((function(t){return t.id!==e}));h[t]=n,k(Object(o.a)({},h))}function E(e,t){var n={id:Object(d.a)(),title:e,isDone:!1};h[t]=[n].concat(Object(l.a)(h[t])),k(Object(o.a)({},h))}function g(e,t,n){var a=h[n].find((function(t){return t.id===e}));a&&(a.isDone=t,k(Object(o.a)({},h)))}function p(e,t,n){var a=h[n].find((function(t){return t.id===e}));a&&(a.title=t,k(Object(o.a)({},h)))}function S(e,t){var n=b.find((function(e){return e.id===t}));n&&(n.filter=e,v(Object(l.a)(b)))}function D(e,t){var n=b.find((function(e){return e.id===t}));n&&(n.title=e,v(Object(l.a)(b)))}function C(e){v(b.filter((function(t){return t.id!==e}))),delete h[e],k(Object(o.a)({},h))}var y=b.map((function(e){var t=h[e.id],n=t;return"active"===e.filter&&(n=t.filter((function(e){return!1===e.isDone}))),"completed"===e.filter&&(n=t.filter((function(e){return!0===e.isDone}))),i.a.createElement(m,{key:e.id,id:e.id,filter:e.filter,title:e.title,tasks:n,changeTitle:p,addTasks:E,removeTasks:T,changeFilter:S,changeTodoListTitle:D,changeTaskStatus:g,deleteTodolist:C})}));return i.a.createElement("div",{className:"App"},i.a.createElement(f,{addItem:function(e){var t=Object(d.a)(),n={id:t,title:e,filter:"all"};v([].concat(Object(l.a)(b),[n])),k(Object(o.a)(Object(o.a)({},h),{},Object(u.a)({},t,[])))}}),y)};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));r.a.render(i.a.createElement(v,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},9:function(e,t,n){e.exports=n(16)}},[[9,1,2]]]);
//# sourceMappingURL=main.b66a4486.chunk.js.map