(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{134:function(e,t,a){},135:function(e,t,a){"use strict";a.r(t);var n={};a.r(n),a.d(n,"setOrderSuccess",function(){return R}),a.d(n,"setOrderFailure",function(){return Y}),a.d(n,"placeOrder",function(){return U}),a.d(n,"getOrder",function(){return W}),a.d(n,"updateOrderStatus",function(){return B}),a.d(n,"updateOrderStatusSuccess",function(){return L}),a.d(n,"downloadICS",function(){return q}),a.d(n,"createICS",function(){return H});var r={};a.r(r),a.d(r,"setPageInfoSuccess",function(){return $}),a.d(r,"setPageInfo",function(){return z});var c={};a.r(c),a.d(c,"deleteNotificationSuccess",function(){return ie}),a.d(c,"deleteNotification",function(){return le}),a.d(c,"newNotificationSuccess",function(){return me}),a.d(c,"mockTicketNotification",function(){return de});var o=a(0),s=a.n(o),i=a(9),l=a.n(i),m=a(10),d=a(33),u="SET_ORDER_SUCCESS",p="SET_ORDER_FAILURE",f="UPDATE_ORDER_STATUS_SUCCESS",h="DELETE_NOTIFICATION_SUCCESS",E="NEW_NOTIFICATION_SUCCESS",b="SET_PAGE_INFO_SUCCESS",v=a(8),g={};var N=a(44),O={model:{}};var y={title:"",status:""};var C=Object(m.c)({order:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:g,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case u:return t.order;case f:return Object(d.a)({},e,{steps:t.steps});default:return e}},notifications:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:O,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"TEST_NOTIFICATION":case E:return Object(d.a)({},e,{model:Object(d.a)({},e.model,Object(N.a)({},t.notification.notificationId,t.notification))});case h:var a=v.cloneDeep(e.model);return delete a[t.id],a=-1===t.id?{}:a,Object(d.a)({},e,{model:a});default:return e}},page:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:y,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case b:return t.data;default:return e}}}),k=a(74),w=a.n(k),j=a(75);var D=a(16),S=a(13),I=a(20),A=a(17),T=a(19),F=a(176),P=a(174),x=a(18),_=a(45),M="https://bixal-cms-prototype.herokuapp.com";function R(e){return{type:u,order:e}}function Y(e){return{type:p,order:e}}function U(e){var t="".concat(M,"/api/placeOrder"),a={params:{order:e}};return function(e){return new Promise(function(n,r){_.post(t,a).then(function(t){var a=t.data;a.error?(e(Y(a.error)),r(a.error)):(e(R(a)),n(a))}).catch(function(t){e(R(t.message)),r(t.message)})})}}function W(e){var t="".concat(M,"/api/getOrder"),a={params:{orderId:"order_".concat(e)}};return function(e){return new Promise(function(n,r){_.post(t,a).then(function(t){var a=t.data;a.error?(e(Y(a.error)),r(a.error)):(e(R(a)),n(a))}).catch(function(t){e(Y(t.message)),r(t.message)})})}}function B(e){return function(t){t(L(e))}}function L(e){return{type:f,steps:e}}function q(e){var t="".concat(M,"/api/downloadICS"),a={};return function(e){_.get(t,a).then(function(e){var t=e.data;console.log(t)}).catch(function(e){console.log(e)})}}function H(e,t){var a="".concat(M,"/api/createICS"),n={params:{order:e,date:t}};return function(e){return new Promise(function(e,t){_.post(a,n).then(function(a){var n=a.data;console.log(n),n.error?t(n.error):e(n)}).catch(function(e){t(e.message)})})}}function $(e){return{type:b,data:e}}function z(e){return function(t){t($(e))}}var G=function(e){return v.map(e.products,function(e){var t="/".concat(e.imgSrc);return s.a.createElement("div",{className:"",key:e.id},s.a.createElement("div",{className:"media mt-2 mb-3"},s.a.createElement("img",{src:t,className:"mr-3",alt:"monitor"}),s.a.createElement("div",{className:"media-body"},s.a.createElement("h5",{className:"mt-0"},s.a.createElement("a",{href:"#"},e.title)),e.desc)),s.a.createElement("dl",{className:"row"},s.a.createElement("dt",{className:"col-sm-3"},"Quantity"),s.a.createElement("dd",{className:"col-sm-3"},e.qty),s.a.createElement("dd",{className:"col-sm"},s.a.createElement("a",{href:"#"},s.a.createElement("small",null,"Change")))),s.a.createElement("dl",{className:"row"},s.a.createElement("dt",{className:"col-sm-3"},"Price"),s.a.createElement("dd",{className:"col-sm"},"$",e.price)))})},J=function(e){var t=parseFloat(v.sumBy(e.order.products,"price")),a=parseFloat(t)+7.43;return s.a.createElement("div",{className:""},s.a.createElement(G,{products:e.order.products}),s.a.createElement("dl",{className:"row"},s.a.createElement("dt",{className:"col-sm-3"},"Delivery"),s.a.createElement("dd",{className:"col-sm-3"},"Your Desk"),s.a.createElement("dd",{className:"col-sm"},s.a.createElement("a",{href:"#"},s.a.createElement("small",null,"Change")))),s.a.createElement("dl",{className:"row"},s.a.createElement("dt",{className:"col-sm-3"},"Installation"),s.a.createElement("dd",{className:"col-sm-3"},"Contractor Provided"),s.a.createElement("dd",{className:"col-sm"},s.a.createElement("a",{href:"#"},s.a.createElement("small",null,"Change")))),s.a.createElement("p",null,s.a.createElement("a",{className:"","data-toggle":"collapse",href:"#collapseExample",role:"button","aria-expanded":"false","aria-controls":"collapseExample"},"Approval & Contract Details")),s.a.createElement("div",{className:"collapse",id:"collapseExample"},s.a.createElement("dl",{className:"row"},s.a.createElement("dt",{className:"col-sm-3"},"Approval"),s.a.createElement("dd",{className:"col-sm"},"Manager Only")),s.a.createElement("dl",{className:"row"},s.a.createElement("dt",{className:"col-sm-3"},"Contract"),s.a.createElement("dd",{className:"col-sm"},"CIO-CS"))),s.a.createElement("p",null,s.a.createElement("a",{className:"","data-toggle":"collapse",href:"#collapseExample2",role:"button","aria-expanded":"false","aria-controls":"collapseExample2"},"Subtotal & Delivery Details")),s.a.createElement("div",{className:"collapse",id:"collapseExample2"},s.a.createElement("dl",{className:"row"},s.a.createElement("dt",{className:"col-sm-3"},"Subtotal"),s.a.createElement("dd",{className:"col-sm"},"$",t)),s.a.createElement("dl",{className:"row"},s.a.createElement("dt",{className:"col-sm-3"},"Delivery & Installation"),s.a.createElement("dd",{className:"col-sm"},"$",7.43))),s.a.createElement("dl",{className:"row mt-3"},s.a.createElement("dt",{className:"col-sm-3"},"Total"),s.a.createElement("dd",{className:"col-sm"},s.a.createElement("strong",{className:"text-success"},"$",a.toFixed(2)))))},K=function(e){return s.a.createElement("div",{className:"mt-3"},s.a.createElement("button",{type:"button",className:"btn btn-primary btn-block btn-lg",onClick:function(){e.submitOrderFn()}},"Place Order"),s.a.createElement("p",{className:"mt-3"},"Forgot something? ",s.a.createElement("a",{href:"#"},"Continue shopping")))},Q=function(e){function t(e){var a;return Object(D.a)(this,t),(a=Object(I.a)(this,Object(A.a)(t).call(this))).placeOrder=function(){a.props.orderActions.placeOrder(a.state.order).then(function(e){a.setState({order:e,isPlaced:!0}),window.location.href="/order-confirmation/".concat(e.id)}).catch(function(e){console.log(e)})},e.pageActions.setPageInfo({title:"Your Cart",status:""}),a.state={isPlaced:!1,order:{id:1,placedDate:null,lastUpdateDate:null,user:{username:"test_user1",firstName:"justin",lastName:"sarnik",email:"justin.sarnik@bixal.com"},products:[{id:1,title:"LG 24M47VQ 24-Inch LED-lit Monitor",desc:"Fulfilled by Acme Tech Inc.",price:149.99,qty:1,imgSrc:"images/monitor.jpg"}],steps:[{id:1,status:"Order placed",authority:"test_user1",timestamp:null,isPending:!0,isFilled:!1},{id:2,status:"Manager Approved",authority:"Shaun Hernandez",timestamp:null,isPending:!0,isFilled:!1},{id:3,status:"Contractor Fulfilled",authority:"Acme Tech Inc.",timestamp:null,isPending:!0,isFilled:!1},{id:4,status:"Arrived for delivery and installation",authority:"CMS IT Depot",timestamp:null,isPending:!0,isFilled:!1}]}},a}return Object(T.a)(t,e),Object(S.a)(t,[{key:"render",value:function(){return s.a.createElement("div",{className:""},s.a.createElement(J,{order:this.state.order}),s.a.createElement(K,{submitOrderFn:this.placeOrder}))}}]),t}(o.Component);var V=Object(x.b)(function(e,t){return{order:e.order}},function(e){return{orderActions:Object(m.b)(n,e),pageActions:Object(m.b)(r,e)}})(Q),X=function(e){function t(e){var a;return Object(D.a)(this,t),(a=Object(I.a)(this,Object(A.a)(t).call(this))).componentDidMount=function(){a.props.orderActions.getOrder(a.orderId).then(function(e){a.setState({order:e})}).catch(function(e){console.log(e)})},a.handleButtonClick=function(){window.location.href="/order-status/".concat(a.props.order.id)},e.pageActions.setPageInfo({title:"Order Confirmation",status:""}),a.orderId=e.match.params.id,a.state={},a}return Object(T.a)(t,e),Object(S.a)(t,[{key:"render",value:function(){var e=this;return this.props.order.products?s.a.createElement("div",{className:""},s.a.createElement("div",{className:"mt-2 mb-3"},s.a.createElement("p",{className:"lead"},"Woot! Your order has been placed.")),s.a.createElement("div",{className:"text-center mb-3"},s.a.createElement("div",{className:"row"},s.a.createElement("div",{className:"col display-3"},s.a.createElement("i",{className:"fa fa-thumbs-o-up text-success"})),s.a.createElement("div",{className:"col"},s.a.createElement("img",{src:"/".concat(this.props.order.products[0].imgSrc),className:"mr-3",alt:"monitor"})))),s.a.createElement("h2",null,"What happens next?"),s.a.createElement("ol",null,s.a.createElement("li",null,"You'll receieve an email with confirmation of your order."),s.a.createElement("li",null,"The email will include a link for you to ",s.a.createElement("a",{href:"#",onClick:function(){e.handleButtonClick()}},"check the status")," of your order."),s.a.createElement("li",null,"We'll let you know when your order is ready for delivery and installation.")),s.a.createElement("p",{className:"mt-3"},"Have a question or need to change something? ",s.a.createElement("a",{href:""},"Contact our Delivery & Installation team"))):null}}]),t}(o.Component);var Z=Object(x.b)(function(e,t){return{order:e.order}},function(e){return{orderActions:Object(m.b)(n,e),pageActions:Object(m.b)(r,e)}})(X),ee=a(24),te=a.n(ee),ae=function(e){var t=0;return v.map(e.steps,function(a){var n=++t===e.steps.length;return s.a.createElement(re,{step:a,isLast:n,key:a.id,submitTicketFn:e.submitTicketFn})})},ne=function(e){return s.a.createElement("div",{className:"flex-container"},s.a.createElement("div",{className:"flex-item spacer ".concat(e.type)}))},re=function(e){var t=e.step.timestamp&&!e.step.isFilled||!e.step.isFilled&&!e.step.isPending,a=e.step.isFilled?"full":"half",n=e.step.isFilled?"fa-check-square-o":t?"fa-times":"fa-square-o";return s.a.createElement("div",null,s.a.createElement("div",{className:"media"},s.a.createElement("div",{className:"h2"},s.a.createElement("i",{className:"".concat(n," ").concat(e.step.isFilled?"text-success":"text-secondary"," ").concat(t?"text-failure":""," fa"),"aria-hidden":"true"})),s.a.createElement("div",{className:"media-body ml-3"},s.a.createElement("h5",{className:"mt-1 mb-0"},e.step.status),s.a.createElement("span",{className:"text-muted"},e.step.authority,e.step.timestamp?", ".concat(function(e){var t=ee(new Date),a=ee(e),n={d:t.diff(a,"days"),h:t.diff(a,"hours"),m:t.diff(a,"minutes"),s:t.diff(a,"seconds")};return"".concat(n.d?"".concat(n.d," days ago"):n.h?"".concat(n.h," hours ago"):n.m?"".concat(n.m," minutes ago"):n.s?"".concat(n.s," seconds ago"):"0 seconds ago")}(e.step.timestamp)):""))),t?s.a.createElement("div",{className:"alert alert-warning"},'"Oops! We\'ve hit a snag here."',s.a.createElement("br",null),e.step.ticket&&!e.step.ticket.isResolved?s.a.createElement("button",{className:"btn btn-link"},s.a.createElement("i",{className:"fa fa-comment"})," Connecting..."):s.a.createElement("button",{className:"btn btn-link",onClick:function(){return e.submitTicketFn(e.step.id)}},s.a.createElement("i",{className:"fa fa-comment"})," Chat with HelpDesk")):null,e.isLast?null:s.a.createElement(ne,{type:a}))},ce=function(e){return v.map(e.products,function(e){return s.a.createElement("div",{className:"media mt-2 mb-3",key:e.id},s.a.createElement("img",{src:"https://images-na.ssl-images-amazon.com/images/I/91jzIGu5N-L._AC_AA100_.jpg",className:"mr-3",alt:"monitor"}),s.a.createElement("div",{className:"media-body"},s.a.createElement("h5",{className:"mt-0"},s.a.createElement("a",{href:"#"},e.title)),e.desc))})},oe=function(e){function t(e){var a;return Object(D.a)(this,t),(a=Object(I.a)(this,Object(A.a)(t).call(this))).componentDidMount=function(){v.isEmpty(a.props.order)&&a.props.orderActions.getOrder(a.orderId).then(function(e){a.fillStepsTimer(2,3)}).catch(function(e){console.log(e)})},a.componentDidUpdate=function(e){e.order.steps!==a.props.order.steps&&-1===v.findIndex(a.props.order.steps,{isFilled:!1})&&a.setAllFilled()},a.fillStepsTimer=function(e,t){var n=e,r=setInterval(function(){var e=v.cloneDeep(a.props.order.steps),c=v.find(e,{id:n}),o=v.find(e,{id:n-1});n<=e.length&&o.isFilled?(c.isPending=!1,c.isFilled=!t||t!==n,c.timestamp=(new Date).getTime(),a.props.orderActions.updateOrderStatus(e),n++):clearInterval(r)},500)},a.submitTicket=function(e){var t=v.cloneDeep(a.props.order.steps);v.find(t,{id:e}).ticket={timestamp:(new Date).getTime(),isResolved:!1},a.props.orderActions.updateOrderStatus(t),setTimeout(function(){var t=v.cloneDeep(a.props.order.steps),n=v.find(t,{id:e});n.ticket.isResolved=!0,n.isFilled=!0,a.props.orderActions.updateOrderStatus(t),a.fillStepsTimer(e+1,null)},1e3)},a.handlePickupClick=function(){window.location.href="/schedule-pickup/".concat(a.props.order.id)},e.pageActions.setPageInfo({title:"Your Order Status",status:"Pending"}),a.orderId=e.match.params.id,a.state={},a}return Object(T.a)(t,e),Object(S.a)(t,[{key:"setAllFilled",value:function(){this.setState({isReadyForPickup:!0}),this.props.pageActions.setPageInfo({title:"Your Order Status",status:"Arrived"})}},{key:"render",value:function(){var e=this,t=this.props.order.products?this.props.order.products:null;return t?s.a.createElement("div",{className:"status-container"},s.a.createElement(ce,{products:t}),s.a.createElement("div",{className:"steps-container"},s.a.createElement(ae,{steps:this.props.order.steps,submitTicketFn:this.submitTicket}),this.state.isReadyForPickup?s.a.createElement("div",{className:"mt-2 mb-3"},s.a.createElement("button",{type:"button",className:"btn btn-primary btn-block btn-lg",onClick:function(){e.handlePickupClick()}},"Schedule Pickup Date")):null)):null}}]),t}(o.Component);var se=Object(x.b)(function(e,t){return{order:e.order}},function(e){return{orderActions:Object(m.b)(n,e),pageActions:Object(m.b)(r,e)}})(oe);function ie(e){return{type:h,id:e}}function le(e){return function(t){t(ie(e))}}function me(e){return{type:"NEW_NOTIFICATION_SUCCESS",notification:e}}function de(e,t){return function(a){var n=v.find(e.steps,{id:t});a(me({notificationType:"ticket",displayMessage:"Ticket Submitted: Order #:".concat(e.id," | Blocked-Action: ").concat(n.status),timestamp:new Date,notificationId:(new Date).getTime()}))}}var ue=a(173),pe=a(171),fe=a(82),he=a(54),Ee="http://bixal-cms-prototype.herokuapp.com",be=function(e){return s.a.createElement(he.c,{utils:e.utils},s.a.createElement(ue.a,{container:!0,className:e.classes,justify:"space-around"},s.a.createElement(he.a,{margin:"normal",id:"mui-pickers-date",label:"Select Date",value:e.selectedDate,onChange:e.handleDateChange,KeyboardButtonProps:{"aria-label":"select date"}}),s.a.createElement(he.b,{margin:"normal",id:"mui-pickers-time",label:"Select Time",value:e.selectedDate,onChange:e.handleDateChange,KeyboardButtonProps:{"aria-label":"select time"}})))},ve=function(e){var t=[new Date("6/25/2019 12:00:00 PM"),new Date("6/25/2019 3:00:00 PM"),new Date("6/26/2019 9:00:00 AM")];return v.map(t,function(t){var a=t.getTime();return s.a.createElement("label",{className:"btn btn-outline-secondary btn-block text-left font-weight-bolder",key:a},s.a.createElement("input",{type:"radio",autoComplete:"off",name:"time",id:"time1",onClick:function(){e.handleDateChange(t)}})," ",ee(t).format("dddd - M/DD/YY").trim()," ",s.a.createElement("br",null),s.a.createElement("small",{className:"font-weight-normal pl-4"},function(e){return"".concat(ee(e).format("h").trim()," - ").concat(ee(e).add(30,"minutes").format("hh:mm A").trim())}(t)))})},ge=function(e){function t(e){var a;return Object(D.a)(this,t),(a=Object(I.a)(this,Object(A.a)(t).call(this,e))).componentDidMount=function(){v.isEmpty(a.props.order)&&a.props.orderActions.getOrder(a.orderId).then(function(e){}).catch(function(e){})},a.handleDateChange=function(e){a.setState({selectedDate:e})},a.handleConfirm=function(){a.props.orderActions.createICS(a.props.order,a.state.selectedDate).then(function(e){a.setState({isReadyForDownload:!0}),a.props.pageActions.setPageInfo({title:"You're all set!",status:""})}).catch(function(e){})},a.handleDownloadICS=function(){window.location.href="".concat(Ee,"/api/downloadICS")},a.handleChooseDate=function(){a.setState({isShowDatePicker:!0})},e.pageActions.setPageInfo({title:"Delivery & Installation",status:""}),a.orderId=e.match.params.id,a.state={selectedDate:(new Date).getTime()},a.classes=Object(pe.a)({grid:{width:"60%"}}),a}return Object(T.a)(t,e),Object(S.a)(t,[{key:"render",value:function(){var e,t=this;return s.a.createElement("div",{className:"schedule-container"},this.state.isReadyForDownload?s.a.createElement("div",{className:""},s.a.createElement("div",{className:"mt-2 mb-3"},s.a.createElement("p",null,"Your appointment has been confirmed. We've sent you an email confirmation with a calendar invite. Or you can add it to your calendar directly below.")),s.a.createElement("div",{className:"text-center display-1 mb-3"},s.a.createElement("i",{className:"fa fa-calendar-check-o text-success"})),s.a.createElement("button",{type:"button",className:"btn btn-primary btn-block btn-lg",onClick:function(){t.handleDownloadICS()}},"Add To Calendar"),s.a.createElement("p",{className:"mt-3"},"Have a question or need to change something? ",s.a.createElement("a",{href:"#"},"Contact our Delivery & Installation team"))):s.a.createElement("div",{className:""},s.a.createElement("div",{className:"mt-2 mb-3"},s.a.createElement("p",null,"We come to you when you're ready. Pick a time and a technician will show up with your order and help you get everything set up."),s.a.createElement("p",null,"Here are some times that appear to be free on your calendar:"),s.a.createElement("p",{className:"d-none"},(e=this.state.selectedDate,ee(e).format("M/DD/YY hh:mm A").trim()))),s.a.createElement(ve,{handleDateChange:this.handleDateChange}),this.state.isShowDatePicker?s.a.createElement(be,{utils:fe.a,classes:this.classes,selectedDate:this.state.selectedDate,handleDateChange:this.handleDateChange}):null,s.a.createElement("button",{type:"button",className:"btn btn-primary btn-block btn-lg",onClick:function(){t.handleConfirm()}},"Set Delivery Time"),s.a.createElement("p",{className:"mt-3"},"None of these work? ",s.a.createElement("a",{href:"#",onClick:function(){t.handleChooseDate()}},"Find another time"))))}}]),t}(o.Component);var Ne=Object(x.b)(function(e,t){return{order:e.order,notifications:e.notifications}},function(e){return{orderActions:Object(m.b)(n,e),notificationActions:Object(m.b)(c,e),pageActions:Object(m.b)(r,e)}})(ge),Oe=function(e){return s.a.createElement("div",{className:"container"},s.a.createElement(F.a,null,s.a.createElement(P.a,{exact:!0,path:"/",render:function(e){return s.a.createElement(V,Object.assign({pageTitle:"Check Out"},e))}},s.a.createElement(P.a,{exact:!0,path:"/checkout",render:function(e){return s.a.createElement(V,e)}})),s.a.createElement(P.a,{exact:!0,path:"/order-confirmation/:id",render:function(e){return s.a.createElement(Z,e)}}),s.a.createElement(P.a,{exact:!0,path:"/order-status/:id",render:function(e){return s.a.createElement(se,e)}}),s.a.createElement(P.a,{exact:!0,path:"/schedule-pickup/:id",render:function(e){return s.a.createElement(Ne,e)}})))},ye=a(177),Ce=function(e){function t(){return Object(D.a)(this,t),Object(I.a)(this,Object(A.a)(t).apply(this,arguments))}return Object(T.a)(t,e),Object(S.a)(t,[{key:"render",value:function(){return s.a.createElement("nav",{className:"navbar navbar-light bg-light"},s.a.createElement("span",{className:"navbar-brand mb-0 h1"},this.props.page.title,this.props.page.status?s.a.createElement("span",null,":",s.a.createElement("span",{className:"text-success"}," ",this.props.page.status)):null),s.a.createElement("a",{className:"",href:"/"},s.a.createElement("i",{className:"fa fa-shopping-cart","aria-hidden":"true"})))}}]),t}(o.Component);var ke=Object(x.b)(function(e,t){return{page:e.page}},function(e){return{pageActions:Object(m.b)(r,e)}})(Object(ye.a)(Ce)),we=function(e){return s.a.createElement("div",{className:"notification"},s.a.createElement("div",{className:"alert alert-info",role:"alert"},s.a.createElement("p",null,(t=e.time,te()(t).format("M/DD/YY hh:mm A").trim())),s.a.createElement("p",null,e.message),s.a.createElement("button",{type:"button",className:"btn btn-outline-info",onClick:function(){e.closeFn(e.id)}},"Close")));var t},je=function(e){function t(e){var a;return Object(D.a)(this,t),(a=Object(I.a)(this,Object(A.a)(t).call(this))).handleCloseClick=function(e){a.props.notificationActions.deleteNotification(e)},a.notificationsContainer=function(){var e=v.orderBy(a.props.notifications.model,["timestamp"],["desc"]);return v.map(e,function(e){return s.a.createElement(we,{isAnimate:!0,type:e.side,message:e.displayMessage,time:e.timestamp,id:e.notificationId,closeFn:a.handleCloseClick,isFixed:!1,key:e.id})})},a}return Object(T.a)(t,e),Object(S.a)(t,[{key:"render",value:function(){return this.props.notifications.model?s.a.createElement("div",{className:"notifications-container flex-container column"},this.notificationsContainer()):null}}]),t}(o.Component);var De=Object(x.b)(function(e,t){return{notifications:e.notifications}},function(e){return{notificationActions:Object(m.b)(c,e)}})(je),Se=function(e){function t(e){return Object(D.a)(this,t),Object(I.a)(this,Object(A.a)(t).call(this))}return Object(T.a)(t,e),Object(S.a)(t,[{key:"render",value:function(){return s.a.createElement("div",{className:"App"},s.a.createElement(ke,null),s.a.createElement(Oe,null),s.a.createElement(De,null))}}]),t}(o.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var Ie,Ae=a(175),Te=(a(130),a(131),a(134),Object(m.d)(C,Ie,Object(m.a)(j.a,w()())));l.a.render(s.a.createElement(x.a,{store:Te},s.a.createElement(Ae.a,null,s.a.createElement(Se,null))),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})},90:function(e,t,a){e.exports=a(135)}},[[90,1,2]]]);
//# sourceMappingURL=main.be8d484c.chunk.js.map