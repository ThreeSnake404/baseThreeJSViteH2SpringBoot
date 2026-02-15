var T_=Object.defineProperty;var w_=(t,e,n)=>e in t?T_(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n;var Yn=(t,e,n)=>w_(t,typeof e!="symbol"?e+"":e,n);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function n(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(r){if(r.ep)return;r.ep=!0;const s=n(r);fetch(r.href,s)}})();function A_(t){return t&&t.__esModule&&Object.prototype.hasOwnProperty.call(t,"default")?t.default:t}var wp={exports:{}},ol={},Ap={exports:{}},ke={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var yo=Symbol.for("react.element"),R_=Symbol.for("react.portal"),C_=Symbol.for("react.fragment"),P_=Symbol.for("react.strict_mode"),L_=Symbol.for("react.profiler"),b_=Symbol.for("react.provider"),D_=Symbol.for("react.context"),U_=Symbol.for("react.forward_ref"),N_=Symbol.for("react.suspense"),I_=Symbol.for("react.memo"),F_=Symbol.for("react.lazy"),Xf=Symbol.iterator;function O_(t){return t===null||typeof t!="object"?null:(t=Xf&&t[Xf]||t["@@iterator"],typeof t=="function"?t:null)}var Rp={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},Cp=Object.assign,Pp={};function Ms(t,e,n){this.props=t,this.context=e,this.refs=Pp,this.updater=n||Rp}Ms.prototype.isReactComponent={};Ms.prototype.setState=function(t,e){if(typeof t!="object"&&typeof t!="function"&&t!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,t,e,"setState")};Ms.prototype.forceUpdate=function(t){this.updater.enqueueForceUpdate(this,t,"forceUpdate")};function Lp(){}Lp.prototype=Ms.prototype;function zc(t,e,n){this.props=t,this.context=e,this.refs=Pp,this.updater=n||Rp}var kc=zc.prototype=new Lp;kc.constructor=zc;Cp(kc,Ms.prototype);kc.isPureReactComponent=!0;var jf=Array.isArray,bp=Object.prototype.hasOwnProperty,Bc={current:null},Dp={key:!0,ref:!0,__self:!0,__source:!0};function Up(t,e,n){var i,r={},s=null,o=null;if(e!=null)for(i in e.ref!==void 0&&(o=e.ref),e.key!==void 0&&(s=""+e.key),e)bp.call(e,i)&&!Dp.hasOwnProperty(i)&&(r[i]=e[i]);var a=arguments.length-2;if(a===1)r.children=n;else if(1<a){for(var l=Array(a),u=0;u<a;u++)l[u]=arguments[u+2];r.children=l}if(t&&t.defaultProps)for(i in a=t.defaultProps,a)r[i]===void 0&&(r[i]=a[i]);return{$$typeof:yo,type:t,key:s,ref:o,props:r,_owner:Bc.current}}function z_(t,e){return{$$typeof:yo,type:t.type,key:e,ref:t.ref,props:t.props,_owner:t._owner}}function Hc(t){return typeof t=="object"&&t!==null&&t.$$typeof===yo}function k_(t){var e={"=":"=0",":":"=2"};return"$"+t.replace(/[=:]/g,function(n){return e[n]})}var Yf=/\/+/g;function bl(t,e){return typeof t=="object"&&t!==null&&t.key!=null?k_(""+t.key):e.toString(36)}function _a(t,e,n,i,r){var s=typeof t;(s==="undefined"||s==="boolean")&&(t=null);var o=!1;if(t===null)o=!0;else switch(s){case"string":case"number":o=!0;break;case"object":switch(t.$$typeof){case yo:case R_:o=!0}}if(o)return o=t,r=r(o),t=i===""?"."+bl(o,0):i,jf(r)?(n="",t!=null&&(n=t.replace(Yf,"$&/")+"/"),_a(r,e,n,"",function(u){return u})):r!=null&&(Hc(r)&&(r=z_(r,n+(!r.key||o&&o.key===r.key?"":(""+r.key).replace(Yf,"$&/")+"/")+t)),e.push(r)),1;if(o=0,i=i===""?".":i+":",jf(t))for(var a=0;a<t.length;a++){s=t[a];var l=i+bl(s,a);o+=_a(s,e,n,l,r)}else if(l=O_(t),typeof l=="function")for(t=l.call(t),a=0;!(s=t.next()).done;)s=s.value,l=i+bl(s,a++),o+=_a(s,e,n,l,r);else if(s==="object")throw e=String(t),Error("Objects are not valid as a React child (found: "+(e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e)+"). If you meant to render a collection of children, use an array instead.");return o}function Do(t,e,n){if(t==null)return t;var i=[],r=0;return _a(t,i,"","",function(s){return e.call(n,s,r++)}),i}function B_(t){if(t._status===-1){var e=t._result;e=e(),e.then(function(n){(t._status===0||t._status===-1)&&(t._status=1,t._result=n)},function(n){(t._status===0||t._status===-1)&&(t._status=2,t._result=n)}),t._status===-1&&(t._status=0,t._result=e)}if(t._status===1)return t._result.default;throw t._result}var Xt={current:null},va={transition:null},H_={ReactCurrentDispatcher:Xt,ReactCurrentBatchConfig:va,ReactCurrentOwner:Bc};function Np(){throw Error("act(...) is not supported in production builds of React.")}ke.Children={map:Do,forEach:function(t,e,n){Do(t,function(){e.apply(this,arguments)},n)},count:function(t){var e=0;return Do(t,function(){e++}),e},toArray:function(t){return Do(t,function(e){return e})||[]},only:function(t){if(!Hc(t))throw Error("React.Children.only expected to receive a single React element child.");return t}};ke.Component=Ms;ke.Fragment=C_;ke.Profiler=L_;ke.PureComponent=zc;ke.StrictMode=P_;ke.Suspense=N_;ke.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=H_;ke.act=Np;ke.cloneElement=function(t,e,n){if(t==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+t+".");var i=Cp({},t.props),r=t.key,s=t.ref,o=t._owner;if(e!=null){if(e.ref!==void 0&&(s=e.ref,o=Bc.current),e.key!==void 0&&(r=""+e.key),t.type&&t.type.defaultProps)var a=t.type.defaultProps;for(l in e)bp.call(e,l)&&!Dp.hasOwnProperty(l)&&(i[l]=e[l]===void 0&&a!==void 0?a[l]:e[l])}var l=arguments.length-2;if(l===1)i.children=n;else if(1<l){a=Array(l);for(var u=0;u<l;u++)a[u]=arguments[u+2];i.children=a}return{$$typeof:yo,type:t.type,key:r,ref:s,props:i,_owner:o}};ke.createContext=function(t){return t={$$typeof:D_,_currentValue:t,_currentValue2:t,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},t.Provider={$$typeof:b_,_context:t},t.Consumer=t};ke.createElement=Up;ke.createFactory=function(t){var e=Up.bind(null,t);return e.type=t,e};ke.createRef=function(){return{current:null}};ke.forwardRef=function(t){return{$$typeof:U_,render:t}};ke.isValidElement=Hc;ke.lazy=function(t){return{$$typeof:F_,_payload:{_status:-1,_result:t},_init:B_}};ke.memo=function(t,e){return{$$typeof:I_,type:t,compare:e===void 0?null:e}};ke.startTransition=function(t){var e=va.transition;va.transition={};try{t()}finally{va.transition=e}};ke.unstable_act=Np;ke.useCallback=function(t,e){return Xt.current.useCallback(t,e)};ke.useContext=function(t){return Xt.current.useContext(t)};ke.useDebugValue=function(){};ke.useDeferredValue=function(t){return Xt.current.useDeferredValue(t)};ke.useEffect=function(t,e){return Xt.current.useEffect(t,e)};ke.useId=function(){return Xt.current.useId()};ke.useImperativeHandle=function(t,e,n){return Xt.current.useImperativeHandle(t,e,n)};ke.useInsertionEffect=function(t,e){return Xt.current.useInsertionEffect(t,e)};ke.useLayoutEffect=function(t,e){return Xt.current.useLayoutEffect(t,e)};ke.useMemo=function(t,e){return Xt.current.useMemo(t,e)};ke.useReducer=function(t,e,n){return Xt.current.useReducer(t,e,n)};ke.useRef=function(t){return Xt.current.useRef(t)};ke.useState=function(t){return Xt.current.useState(t)};ke.useSyncExternalStore=function(t,e,n){return Xt.current.useSyncExternalStore(t,e,n)};ke.useTransition=function(){return Xt.current.useTransition()};ke.version="18.3.1";Ap.exports=ke;var Ei=Ap.exports;const G_=A_(Ei);/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var V_=Ei,W_=Symbol.for("react.element"),X_=Symbol.for("react.fragment"),j_=Object.prototype.hasOwnProperty,Y_=V_.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,q_={key:!0,ref:!0,__self:!0,__source:!0};function Ip(t,e,n){var i,r={},s=null,o=null;n!==void 0&&(s=""+n),e.key!==void 0&&(s=""+e.key),e.ref!==void 0&&(o=e.ref);for(i in e)j_.call(e,i)&&!q_.hasOwnProperty(i)&&(r[i]=e[i]);if(t&&t.defaultProps)for(i in e=t.defaultProps,e)r[i]===void 0&&(r[i]=e[i]);return{$$typeof:W_,type:t,key:s,ref:o,props:r,_owner:Y_.current}}ol.Fragment=X_;ol.jsx=Ip;ol.jsxs=Ip;wp.exports=ol;var Hr=wp.exports,Iu={},Fp={exports:{}},fn={},Op={exports:{}},zp={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(t){function e(b,I){var B=b.length;b.push(I);e:for(;0<B;){var j=B-1>>>1,ee=b[j];if(0<r(ee,I))b[j]=I,b[B]=ee,B=j;else break e}}function n(b){return b.length===0?null:b[0]}function i(b){if(b.length===0)return null;var I=b[0],B=b.pop();if(B!==I){b[0]=B;e:for(var j=0,ee=b.length,ye=ee>>>1;j<ye;){var H=2*(j+1)-1,q=b[H],ae=H+1,ge=b[ae];if(0>r(q,B))ae<ee&&0>r(ge,q)?(b[j]=ge,b[ae]=B,j=ae):(b[j]=q,b[H]=B,j=H);else if(ae<ee&&0>r(ge,B))b[j]=ge,b[ae]=B,j=ae;else break e}}return I}function r(b,I){var B=b.sortIndex-I.sortIndex;return B!==0?B:b.id-I.id}if(typeof performance=="object"&&typeof performance.now=="function"){var s=performance;t.unstable_now=function(){return s.now()}}else{var o=Date,a=o.now();t.unstable_now=function(){return o.now()-a}}var l=[],u=[],f=1,d=null,h=3,m=!1,v=!1,S=!1,p=typeof setTimeout=="function"?setTimeout:null,c=typeof clearTimeout=="function"?clearTimeout:null,_=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function g(b){for(var I=n(u);I!==null;){if(I.callback===null)i(u);else if(I.startTime<=b)i(u),I.sortIndex=I.expirationTime,e(l,I);else break;I=n(u)}}function M(b){if(S=!1,g(b),!v)if(n(l)!==null)v=!0,V(P);else{var I=n(u);I!==null&&Y(M,I.startTime-b)}}function P(b,I){v=!1,S&&(S=!1,c(N),N=-1),m=!0;var B=h;try{for(g(I),d=n(l);d!==null&&(!(d.expirationTime>I)||b&&!C());){var j=d.callback;if(typeof j=="function"){d.callback=null,h=d.priorityLevel;var ee=j(d.expirationTime<=I);I=t.unstable_now(),typeof ee=="function"?d.callback=ee:d===n(l)&&i(l),g(I)}else i(l);d=n(l)}if(d!==null)var ye=!0;else{var H=n(u);H!==null&&Y(M,H.startTime-I),ye=!1}return ye}finally{d=null,h=B,m=!1}}var R=!1,w=null,N=-1,K=5,x=-1;function C(){return!(t.unstable_now()-x<K)}function X(){if(w!==null){var b=t.unstable_now();x=b;var I=!0;try{I=w(!0,b)}finally{I?Q():(R=!1,w=null)}}else R=!1}var Q;if(typeof _=="function")Q=function(){_(X)};else if(typeof MessageChannel<"u"){var L=new MessageChannel,W=L.port2;L.port1.onmessage=X,Q=function(){W.postMessage(null)}}else Q=function(){p(X,0)};function V(b){w=b,R||(R=!0,Q())}function Y(b,I){N=p(function(){b(t.unstable_now())},I)}t.unstable_IdlePriority=5,t.unstable_ImmediatePriority=1,t.unstable_LowPriority=4,t.unstable_NormalPriority=3,t.unstable_Profiling=null,t.unstable_UserBlockingPriority=2,t.unstable_cancelCallback=function(b){b.callback=null},t.unstable_continueExecution=function(){v||m||(v=!0,V(P))},t.unstable_forceFrameRate=function(b){0>b||125<b?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):K=0<b?Math.floor(1e3/b):5},t.unstable_getCurrentPriorityLevel=function(){return h},t.unstable_getFirstCallbackNode=function(){return n(l)},t.unstable_next=function(b){switch(h){case 1:case 2:case 3:var I=3;break;default:I=h}var B=h;h=I;try{return b()}finally{h=B}},t.unstable_pauseExecution=function(){},t.unstable_requestPaint=function(){},t.unstable_runWithPriority=function(b,I){switch(b){case 1:case 2:case 3:case 4:case 5:break;default:b=3}var B=h;h=b;try{return I()}finally{h=B}},t.unstable_scheduleCallback=function(b,I,B){var j=t.unstable_now();switch(typeof B=="object"&&B!==null?(B=B.delay,B=typeof B=="number"&&0<B?j+B:j):B=j,b){case 1:var ee=-1;break;case 2:ee=250;break;case 5:ee=1073741823;break;case 4:ee=1e4;break;default:ee=5e3}return ee=B+ee,b={id:f++,callback:I,priorityLevel:b,startTime:B,expirationTime:ee,sortIndex:-1},B>j?(b.sortIndex=B,e(u,b),n(l)===null&&b===n(u)&&(S?(c(N),N=-1):S=!0,Y(M,B-j))):(b.sortIndex=ee,e(l,b),v||m||(v=!0,V(P))),b},t.unstable_shouldYield=C,t.unstable_wrapCallback=function(b){var I=h;return function(){var B=h;h=I;try{return b.apply(this,arguments)}finally{h=B}}}})(zp);Op.exports=zp;var $_=Op.exports;/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var K_=Ei,cn=$_;function J(t){for(var e="https://reactjs.org/docs/error-decoder.html?invariant="+t,n=1;n<arguments.length;n++)e+="&args[]="+encodeURIComponent(arguments[n]);return"Minified React error #"+t+"; visit "+e+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var kp=new Set,no={};function yr(t,e){fs(t,e),fs(t+"Capture",e)}function fs(t,e){for(no[t]=e,t=0;t<e.length;t++)kp.add(e[t])}var li=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),Fu=Object.prototype.hasOwnProperty,Z_=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,qf={},$f={};function Q_(t){return Fu.call($f,t)?!0:Fu.call(qf,t)?!1:Z_.test(t)?$f[t]=!0:(qf[t]=!0,!1)}function J_(t,e,n,i){if(n!==null&&n.type===0)return!1;switch(typeof e){case"function":case"symbol":return!0;case"boolean":return i?!1:n!==null?!n.acceptsBooleans:(t=t.toLowerCase().slice(0,5),t!=="data-"&&t!=="aria-");default:return!1}}function ev(t,e,n,i){if(e===null||typeof e>"u"||J_(t,e,n,i))return!0;if(i)return!1;if(n!==null)switch(n.type){case 3:return!e;case 4:return e===!1;case 5:return isNaN(e);case 6:return isNaN(e)||1>e}return!1}function jt(t,e,n,i,r,s,o){this.acceptsBooleans=e===2||e===3||e===4,this.attributeName=i,this.attributeNamespace=r,this.mustUseProperty=n,this.propertyName=t,this.type=e,this.sanitizeURL=s,this.removeEmptyString=o}var bt={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(t){bt[t]=new jt(t,0,!1,t,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(t){var e=t[0];bt[e]=new jt(e,1,!1,t[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(t){bt[t]=new jt(t,2,!1,t.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(t){bt[t]=new jt(t,2,!1,t,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(t){bt[t]=new jt(t,3,!1,t.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(t){bt[t]=new jt(t,3,!0,t,null,!1,!1)});["capture","download"].forEach(function(t){bt[t]=new jt(t,4,!1,t,null,!1,!1)});["cols","rows","size","span"].forEach(function(t){bt[t]=new jt(t,6,!1,t,null,!1,!1)});["rowSpan","start"].forEach(function(t){bt[t]=new jt(t,5,!1,t.toLowerCase(),null,!1,!1)});var Gc=/[\-:]([a-z])/g;function Vc(t){return t[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(t){var e=t.replace(Gc,Vc);bt[e]=new jt(e,1,!1,t,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(t){var e=t.replace(Gc,Vc);bt[e]=new jt(e,1,!1,t,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(t){var e=t.replace(Gc,Vc);bt[e]=new jt(e,1,!1,t,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(t){bt[t]=new jt(t,1,!1,t.toLowerCase(),null,!1,!1)});bt.xlinkHref=new jt("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(t){bt[t]=new jt(t,1,!1,t.toLowerCase(),null,!0,!0)});function Wc(t,e,n,i){var r=bt.hasOwnProperty(e)?bt[e]:null;(r!==null?r.type!==0:i||!(2<e.length)||e[0]!=="o"&&e[0]!=="O"||e[1]!=="n"&&e[1]!=="N")&&(ev(e,n,r,i)&&(n=null),i||r===null?Q_(e)&&(n===null?t.removeAttribute(e):t.setAttribute(e,""+n)):r.mustUseProperty?t[r.propertyName]=n===null?r.type===3?!1:"":n:(e=r.attributeName,i=r.attributeNamespace,n===null?t.removeAttribute(e):(r=r.type,n=r===3||r===4&&n===!0?"":""+n,i?t.setAttributeNS(i,e,n):t.setAttribute(e,n))))}var hi=K_.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,Uo=Symbol.for("react.element"),Gr=Symbol.for("react.portal"),Vr=Symbol.for("react.fragment"),Xc=Symbol.for("react.strict_mode"),Ou=Symbol.for("react.profiler"),Bp=Symbol.for("react.provider"),Hp=Symbol.for("react.context"),jc=Symbol.for("react.forward_ref"),zu=Symbol.for("react.suspense"),ku=Symbol.for("react.suspense_list"),Yc=Symbol.for("react.memo"),yi=Symbol.for("react.lazy"),Gp=Symbol.for("react.offscreen"),Kf=Symbol.iterator;function Ps(t){return t===null||typeof t!="object"?null:(t=Kf&&t[Kf]||t["@@iterator"],typeof t=="function"?t:null)}var ut=Object.assign,Dl;function Vs(t){if(Dl===void 0)try{throw Error()}catch(n){var e=n.stack.trim().match(/\n( *(at )?)/);Dl=e&&e[1]||""}return`
`+Dl+t}var Ul=!1;function Nl(t,e){if(!t||Ul)return"";Ul=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(e)if(e=function(){throw Error()},Object.defineProperty(e.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(e,[])}catch(u){var i=u}Reflect.construct(t,[],e)}else{try{e.call()}catch(u){i=u}t.call(e.prototype)}else{try{throw Error()}catch(u){i=u}t()}}catch(u){if(u&&i&&typeof u.stack=="string"){for(var r=u.stack.split(`
`),s=i.stack.split(`
`),o=r.length-1,a=s.length-1;1<=o&&0<=a&&r[o]!==s[a];)a--;for(;1<=o&&0<=a;o--,a--)if(r[o]!==s[a]){if(o!==1||a!==1)do if(o--,a--,0>a||r[o]!==s[a]){var l=`
`+r[o].replace(" at new "," at ");return t.displayName&&l.includes("<anonymous>")&&(l=l.replace("<anonymous>",t.displayName)),l}while(1<=o&&0<=a);break}}}finally{Ul=!1,Error.prepareStackTrace=n}return(t=t?t.displayName||t.name:"")?Vs(t):""}function tv(t){switch(t.tag){case 5:return Vs(t.type);case 16:return Vs("Lazy");case 13:return Vs("Suspense");case 19:return Vs("SuspenseList");case 0:case 2:case 15:return t=Nl(t.type,!1),t;case 11:return t=Nl(t.type.render,!1),t;case 1:return t=Nl(t.type,!0),t;default:return""}}function Bu(t){if(t==null)return null;if(typeof t=="function")return t.displayName||t.name||null;if(typeof t=="string")return t;switch(t){case Vr:return"Fragment";case Gr:return"Portal";case Ou:return"Profiler";case Xc:return"StrictMode";case zu:return"Suspense";case ku:return"SuspenseList"}if(typeof t=="object")switch(t.$$typeof){case Hp:return(t.displayName||"Context")+".Consumer";case Bp:return(t._context.displayName||"Context")+".Provider";case jc:var e=t.render;return t=t.displayName,t||(t=e.displayName||e.name||"",t=t!==""?"ForwardRef("+t+")":"ForwardRef"),t;case Yc:return e=t.displayName||null,e!==null?e:Bu(t.type)||"Memo";case yi:e=t._payload,t=t._init;try{return Bu(t(e))}catch{}}return null}function nv(t){var e=t.type;switch(t.tag){case 24:return"Cache";case 9:return(e.displayName||"Context")+".Consumer";case 10:return(e._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return t=e.render,t=t.displayName||t.name||"",e.displayName||(t!==""?"ForwardRef("+t+")":"ForwardRef");case 7:return"Fragment";case 5:return e;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return Bu(e);case 8:return e===Xc?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e}return null}function Bi(t){switch(typeof t){case"boolean":case"number":case"string":case"undefined":return t;case"object":return t;default:return""}}function Vp(t){var e=t.type;return(t=t.nodeName)&&t.toLowerCase()==="input"&&(e==="checkbox"||e==="radio")}function iv(t){var e=Vp(t)?"checked":"value",n=Object.getOwnPropertyDescriptor(t.constructor.prototype,e),i=""+t[e];if(!t.hasOwnProperty(e)&&typeof n<"u"&&typeof n.get=="function"&&typeof n.set=="function"){var r=n.get,s=n.set;return Object.defineProperty(t,e,{configurable:!0,get:function(){return r.call(this)},set:function(o){i=""+o,s.call(this,o)}}),Object.defineProperty(t,e,{enumerable:n.enumerable}),{getValue:function(){return i},setValue:function(o){i=""+o},stopTracking:function(){t._valueTracker=null,delete t[e]}}}}function No(t){t._valueTracker||(t._valueTracker=iv(t))}function Wp(t){if(!t)return!1;var e=t._valueTracker;if(!e)return!0;var n=e.getValue(),i="";return t&&(i=Vp(t)?t.checked?"true":"false":t.value),t=i,t!==n?(e.setValue(t),!0):!1}function La(t){if(t=t||(typeof document<"u"?document:void 0),typeof t>"u")return null;try{return t.activeElement||t.body}catch{return t.body}}function Hu(t,e){var n=e.checked;return ut({},e,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:n??t._wrapperState.initialChecked})}function Zf(t,e){var n=e.defaultValue==null?"":e.defaultValue,i=e.checked!=null?e.checked:e.defaultChecked;n=Bi(e.value!=null?e.value:n),t._wrapperState={initialChecked:i,initialValue:n,controlled:e.type==="checkbox"||e.type==="radio"?e.checked!=null:e.value!=null}}function Xp(t,e){e=e.checked,e!=null&&Wc(t,"checked",e,!1)}function Gu(t,e){Xp(t,e);var n=Bi(e.value),i=e.type;if(n!=null)i==="number"?(n===0&&t.value===""||t.value!=n)&&(t.value=""+n):t.value!==""+n&&(t.value=""+n);else if(i==="submit"||i==="reset"){t.removeAttribute("value");return}e.hasOwnProperty("value")?Vu(t,e.type,n):e.hasOwnProperty("defaultValue")&&Vu(t,e.type,Bi(e.defaultValue)),e.checked==null&&e.defaultChecked!=null&&(t.defaultChecked=!!e.defaultChecked)}function Qf(t,e,n){if(e.hasOwnProperty("value")||e.hasOwnProperty("defaultValue")){var i=e.type;if(!(i!=="submit"&&i!=="reset"||e.value!==void 0&&e.value!==null))return;e=""+t._wrapperState.initialValue,n||e===t.value||(t.value=e),t.defaultValue=e}n=t.name,n!==""&&(t.name=""),t.defaultChecked=!!t._wrapperState.initialChecked,n!==""&&(t.name=n)}function Vu(t,e,n){(e!=="number"||La(t.ownerDocument)!==t)&&(n==null?t.defaultValue=""+t._wrapperState.initialValue:t.defaultValue!==""+n&&(t.defaultValue=""+n))}var Ws=Array.isArray;function ns(t,e,n,i){if(t=t.options,e){e={};for(var r=0;r<n.length;r++)e["$"+n[r]]=!0;for(n=0;n<t.length;n++)r=e.hasOwnProperty("$"+t[n].value),t[n].selected!==r&&(t[n].selected=r),r&&i&&(t[n].defaultSelected=!0)}else{for(n=""+Bi(n),e=null,r=0;r<t.length;r++){if(t[r].value===n){t[r].selected=!0,i&&(t[r].defaultSelected=!0);return}e!==null||t[r].disabled||(e=t[r])}e!==null&&(e.selected=!0)}}function Wu(t,e){if(e.dangerouslySetInnerHTML!=null)throw Error(J(91));return ut({},e,{value:void 0,defaultValue:void 0,children:""+t._wrapperState.initialValue})}function Jf(t,e){var n=e.value;if(n==null){if(n=e.children,e=e.defaultValue,n!=null){if(e!=null)throw Error(J(92));if(Ws(n)){if(1<n.length)throw Error(J(93));n=n[0]}e=n}e==null&&(e=""),n=e}t._wrapperState={initialValue:Bi(n)}}function jp(t,e){var n=Bi(e.value),i=Bi(e.defaultValue);n!=null&&(n=""+n,n!==t.value&&(t.value=n),e.defaultValue==null&&t.defaultValue!==n&&(t.defaultValue=n)),i!=null&&(t.defaultValue=""+i)}function ed(t){var e=t.textContent;e===t._wrapperState.initialValue&&e!==""&&e!==null&&(t.value=e)}function Yp(t){switch(t){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function Xu(t,e){return t==null||t==="http://www.w3.org/1999/xhtml"?Yp(e):t==="http://www.w3.org/2000/svg"&&e==="foreignObject"?"http://www.w3.org/1999/xhtml":t}var Io,qp=function(t){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(e,n,i,r){MSApp.execUnsafeLocalFunction(function(){return t(e,n,i,r)})}:t}(function(t,e){if(t.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in t)t.innerHTML=e;else{for(Io=Io||document.createElement("div"),Io.innerHTML="<svg>"+e.valueOf().toString()+"</svg>",e=Io.firstChild;t.firstChild;)t.removeChild(t.firstChild);for(;e.firstChild;)t.appendChild(e.firstChild)}});function io(t,e){if(e){var n=t.firstChild;if(n&&n===t.lastChild&&n.nodeType===3){n.nodeValue=e;return}}t.textContent=e}var Ys={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},rv=["Webkit","ms","Moz","O"];Object.keys(Ys).forEach(function(t){rv.forEach(function(e){e=e+t.charAt(0).toUpperCase()+t.substring(1),Ys[e]=Ys[t]})});function $p(t,e,n){return e==null||typeof e=="boolean"||e===""?"":n||typeof e!="number"||e===0||Ys.hasOwnProperty(t)&&Ys[t]?(""+e).trim():e+"px"}function Kp(t,e){t=t.style;for(var n in e)if(e.hasOwnProperty(n)){var i=n.indexOf("--")===0,r=$p(n,e[n],i);n==="float"&&(n="cssFloat"),i?t.setProperty(n,r):t[n]=r}}var sv=ut({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function ju(t,e){if(e){if(sv[t]&&(e.children!=null||e.dangerouslySetInnerHTML!=null))throw Error(J(137,t));if(e.dangerouslySetInnerHTML!=null){if(e.children!=null)throw Error(J(60));if(typeof e.dangerouslySetInnerHTML!="object"||!("__html"in e.dangerouslySetInnerHTML))throw Error(J(61))}if(e.style!=null&&typeof e.style!="object")throw Error(J(62))}}function Yu(t,e){if(t.indexOf("-")===-1)return typeof e.is=="string";switch(t){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var qu=null;function qc(t){return t=t.target||t.srcElement||window,t.correspondingUseElement&&(t=t.correspondingUseElement),t.nodeType===3?t.parentNode:t}var $u=null,is=null,rs=null;function td(t){if(t=To(t)){if(typeof $u!="function")throw Error(J(280));var e=t.stateNode;e&&(e=fl(e),$u(t.stateNode,t.type,e))}}function Zp(t){is?rs?rs.push(t):rs=[t]:is=t}function Qp(){if(is){var t=is,e=rs;if(rs=is=null,td(t),e)for(t=0;t<e.length;t++)td(e[t])}}function Jp(t,e){return t(e)}function em(){}var Il=!1;function tm(t,e,n){if(Il)return t(e,n);Il=!0;try{return Jp(t,e,n)}finally{Il=!1,(is!==null||rs!==null)&&(em(),Qp())}}function ro(t,e){var n=t.stateNode;if(n===null)return null;var i=fl(n);if(i===null)return null;n=i[e];e:switch(e){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(i=!i.disabled)||(t=t.type,i=!(t==="button"||t==="input"||t==="select"||t==="textarea")),t=!i;break e;default:t=!1}if(t)return null;if(n&&typeof n!="function")throw Error(J(231,e,typeof n));return n}var Ku=!1;if(li)try{var Ls={};Object.defineProperty(Ls,"passive",{get:function(){Ku=!0}}),window.addEventListener("test",Ls,Ls),window.removeEventListener("test",Ls,Ls)}catch{Ku=!1}function ov(t,e,n,i,r,s,o,a,l){var u=Array.prototype.slice.call(arguments,3);try{e.apply(n,u)}catch(f){this.onError(f)}}var qs=!1,ba=null,Da=!1,Zu=null,av={onError:function(t){qs=!0,ba=t}};function lv(t,e,n,i,r,s,o,a,l){qs=!1,ba=null,ov.apply(av,arguments)}function uv(t,e,n,i,r,s,o,a,l){if(lv.apply(this,arguments),qs){if(qs){var u=ba;qs=!1,ba=null}else throw Error(J(198));Da||(Da=!0,Zu=u)}}function Mr(t){var e=t,n=t;if(t.alternate)for(;e.return;)e=e.return;else{t=e;do e=t,e.flags&4098&&(n=e.return),t=e.return;while(t)}return e.tag===3?n:null}function nm(t){if(t.tag===13){var e=t.memoizedState;if(e===null&&(t=t.alternate,t!==null&&(e=t.memoizedState)),e!==null)return e.dehydrated}return null}function nd(t){if(Mr(t)!==t)throw Error(J(188))}function cv(t){var e=t.alternate;if(!e){if(e=Mr(t),e===null)throw Error(J(188));return e!==t?null:t}for(var n=t,i=e;;){var r=n.return;if(r===null)break;var s=r.alternate;if(s===null){if(i=r.return,i!==null){n=i;continue}break}if(r.child===s.child){for(s=r.child;s;){if(s===n)return nd(r),t;if(s===i)return nd(r),e;s=s.sibling}throw Error(J(188))}if(n.return!==i.return)n=r,i=s;else{for(var o=!1,a=r.child;a;){if(a===n){o=!0,n=r,i=s;break}if(a===i){o=!0,i=r,n=s;break}a=a.sibling}if(!o){for(a=s.child;a;){if(a===n){o=!0,n=s,i=r;break}if(a===i){o=!0,i=s,n=r;break}a=a.sibling}if(!o)throw Error(J(189))}}if(n.alternate!==i)throw Error(J(190))}if(n.tag!==3)throw Error(J(188));return n.stateNode.current===n?t:e}function im(t){return t=cv(t),t!==null?rm(t):null}function rm(t){if(t.tag===5||t.tag===6)return t;for(t=t.child;t!==null;){var e=rm(t);if(e!==null)return e;t=t.sibling}return null}var sm=cn.unstable_scheduleCallback,id=cn.unstable_cancelCallback,fv=cn.unstable_shouldYield,dv=cn.unstable_requestPaint,ht=cn.unstable_now,hv=cn.unstable_getCurrentPriorityLevel,$c=cn.unstable_ImmediatePriority,om=cn.unstable_UserBlockingPriority,Ua=cn.unstable_NormalPriority,pv=cn.unstable_LowPriority,am=cn.unstable_IdlePriority,al=null,Vn=null;function mv(t){if(Vn&&typeof Vn.onCommitFiberRoot=="function")try{Vn.onCommitFiberRoot(al,t,void 0,(t.current.flags&128)===128)}catch{}}var Nn=Math.clz32?Math.clz32:vv,gv=Math.log,_v=Math.LN2;function vv(t){return t>>>=0,t===0?32:31-(gv(t)/_v|0)|0}var Fo=64,Oo=4194304;function Xs(t){switch(t&-t){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return t&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return t}}function Na(t,e){var n=t.pendingLanes;if(n===0)return 0;var i=0,r=t.suspendedLanes,s=t.pingedLanes,o=n&268435455;if(o!==0){var a=o&~r;a!==0?i=Xs(a):(s&=o,s!==0&&(i=Xs(s)))}else o=n&~r,o!==0?i=Xs(o):s!==0&&(i=Xs(s));if(i===0)return 0;if(e!==0&&e!==i&&!(e&r)&&(r=i&-i,s=e&-e,r>=s||r===16&&(s&4194240)!==0))return e;if(i&4&&(i|=n&16),e=t.entangledLanes,e!==0)for(t=t.entanglements,e&=i;0<e;)n=31-Nn(e),r=1<<n,i|=t[n],e&=~r;return i}function xv(t,e){switch(t){case 1:case 2:case 4:return e+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function Sv(t,e){for(var n=t.suspendedLanes,i=t.pingedLanes,r=t.expirationTimes,s=t.pendingLanes;0<s;){var o=31-Nn(s),a=1<<o,l=r[o];l===-1?(!(a&n)||a&i)&&(r[o]=xv(a,e)):l<=e&&(t.expiredLanes|=a),s&=~a}}function Qu(t){return t=t.pendingLanes&-1073741825,t!==0?t:t&1073741824?1073741824:0}function lm(){var t=Fo;return Fo<<=1,!(Fo&4194240)&&(Fo=64),t}function Fl(t){for(var e=[],n=0;31>n;n++)e.push(t);return e}function Mo(t,e,n){t.pendingLanes|=e,e!==536870912&&(t.suspendedLanes=0,t.pingedLanes=0),t=t.eventTimes,e=31-Nn(e),t[e]=n}function yv(t,e){var n=t.pendingLanes&~e;t.pendingLanes=e,t.suspendedLanes=0,t.pingedLanes=0,t.expiredLanes&=e,t.mutableReadLanes&=e,t.entangledLanes&=e,e=t.entanglements;var i=t.eventTimes;for(t=t.expirationTimes;0<n;){var r=31-Nn(n),s=1<<r;e[r]=0,i[r]=-1,t[r]=-1,n&=~s}}function Kc(t,e){var n=t.entangledLanes|=e;for(t=t.entanglements;n;){var i=31-Nn(n),r=1<<i;r&e|t[i]&e&&(t[i]|=e),n&=~r}}var Ye=0;function um(t){return t&=-t,1<t?4<t?t&268435455?16:536870912:4:1}var cm,Zc,fm,dm,hm,Ju=!1,zo=[],Pi=null,Li=null,bi=null,so=new Map,oo=new Map,Ti=[],Mv="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function rd(t,e){switch(t){case"focusin":case"focusout":Pi=null;break;case"dragenter":case"dragleave":Li=null;break;case"mouseover":case"mouseout":bi=null;break;case"pointerover":case"pointerout":so.delete(e.pointerId);break;case"gotpointercapture":case"lostpointercapture":oo.delete(e.pointerId)}}function bs(t,e,n,i,r,s){return t===null||t.nativeEvent!==s?(t={blockedOn:e,domEventName:n,eventSystemFlags:i,nativeEvent:s,targetContainers:[r]},e!==null&&(e=To(e),e!==null&&Zc(e)),t):(t.eventSystemFlags|=i,e=t.targetContainers,r!==null&&e.indexOf(r)===-1&&e.push(r),t)}function Ev(t,e,n,i,r){switch(e){case"focusin":return Pi=bs(Pi,t,e,n,i,r),!0;case"dragenter":return Li=bs(Li,t,e,n,i,r),!0;case"mouseover":return bi=bs(bi,t,e,n,i,r),!0;case"pointerover":var s=r.pointerId;return so.set(s,bs(so.get(s)||null,t,e,n,i,r)),!0;case"gotpointercapture":return s=r.pointerId,oo.set(s,bs(oo.get(s)||null,t,e,n,i,r)),!0}return!1}function pm(t){var e=sr(t.target);if(e!==null){var n=Mr(e);if(n!==null){if(e=n.tag,e===13){if(e=nm(n),e!==null){t.blockedOn=e,hm(t.priority,function(){fm(n)});return}}else if(e===3&&n.stateNode.current.memoizedState.isDehydrated){t.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}t.blockedOn=null}function xa(t){if(t.blockedOn!==null)return!1;for(var e=t.targetContainers;0<e.length;){var n=ec(t.domEventName,t.eventSystemFlags,e[0],t.nativeEvent);if(n===null){n=t.nativeEvent;var i=new n.constructor(n.type,n);qu=i,n.target.dispatchEvent(i),qu=null}else return e=To(n),e!==null&&Zc(e),t.blockedOn=n,!1;e.shift()}return!0}function sd(t,e,n){xa(t)&&n.delete(e)}function Tv(){Ju=!1,Pi!==null&&xa(Pi)&&(Pi=null),Li!==null&&xa(Li)&&(Li=null),bi!==null&&xa(bi)&&(bi=null),so.forEach(sd),oo.forEach(sd)}function Ds(t,e){t.blockedOn===e&&(t.blockedOn=null,Ju||(Ju=!0,cn.unstable_scheduleCallback(cn.unstable_NormalPriority,Tv)))}function ao(t){function e(r){return Ds(r,t)}if(0<zo.length){Ds(zo[0],t);for(var n=1;n<zo.length;n++){var i=zo[n];i.blockedOn===t&&(i.blockedOn=null)}}for(Pi!==null&&Ds(Pi,t),Li!==null&&Ds(Li,t),bi!==null&&Ds(bi,t),so.forEach(e),oo.forEach(e),n=0;n<Ti.length;n++)i=Ti[n],i.blockedOn===t&&(i.blockedOn=null);for(;0<Ti.length&&(n=Ti[0],n.blockedOn===null);)pm(n),n.blockedOn===null&&Ti.shift()}var ss=hi.ReactCurrentBatchConfig,Ia=!0;function wv(t,e,n,i){var r=Ye,s=ss.transition;ss.transition=null;try{Ye=1,Qc(t,e,n,i)}finally{Ye=r,ss.transition=s}}function Av(t,e,n,i){var r=Ye,s=ss.transition;ss.transition=null;try{Ye=4,Qc(t,e,n,i)}finally{Ye=r,ss.transition=s}}function Qc(t,e,n,i){if(Ia){var r=ec(t,e,n,i);if(r===null)jl(t,e,i,Fa,n),rd(t,i);else if(Ev(r,t,e,n,i))i.stopPropagation();else if(rd(t,i),e&4&&-1<Mv.indexOf(t)){for(;r!==null;){var s=To(r);if(s!==null&&cm(s),s=ec(t,e,n,i),s===null&&jl(t,e,i,Fa,n),s===r)break;r=s}r!==null&&i.stopPropagation()}else jl(t,e,i,null,n)}}var Fa=null;function ec(t,e,n,i){if(Fa=null,t=qc(i),t=sr(t),t!==null)if(e=Mr(t),e===null)t=null;else if(n=e.tag,n===13){if(t=nm(e),t!==null)return t;t=null}else if(n===3){if(e.stateNode.current.memoizedState.isDehydrated)return e.tag===3?e.stateNode.containerInfo:null;t=null}else e!==t&&(t=null);return Fa=t,null}function mm(t){switch(t){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(hv()){case $c:return 1;case om:return 4;case Ua:case pv:return 16;case am:return 536870912;default:return 16}default:return 16}}var Ai=null,Jc=null,Sa=null;function gm(){if(Sa)return Sa;var t,e=Jc,n=e.length,i,r="value"in Ai?Ai.value:Ai.textContent,s=r.length;for(t=0;t<n&&e[t]===r[t];t++);var o=n-t;for(i=1;i<=o&&e[n-i]===r[s-i];i++);return Sa=r.slice(t,1<i?1-i:void 0)}function ya(t){var e=t.keyCode;return"charCode"in t?(t=t.charCode,t===0&&e===13&&(t=13)):t=e,t===10&&(t=13),32<=t||t===13?t:0}function ko(){return!0}function od(){return!1}function dn(t){function e(n,i,r,s,o){this._reactName=n,this._targetInst=r,this.type=i,this.nativeEvent=s,this.target=o,this.currentTarget=null;for(var a in t)t.hasOwnProperty(a)&&(n=t[a],this[a]=n?n(s):s[a]);return this.isDefaultPrevented=(s.defaultPrevented!=null?s.defaultPrevented:s.returnValue===!1)?ko:od,this.isPropagationStopped=od,this}return ut(e.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=ko)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=ko)},persist:function(){},isPersistent:ko}),e}var Es={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(t){return t.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},ef=dn(Es),Eo=ut({},Es,{view:0,detail:0}),Rv=dn(Eo),Ol,zl,Us,ll=ut({},Eo,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:tf,button:0,buttons:0,relatedTarget:function(t){return t.relatedTarget===void 0?t.fromElement===t.srcElement?t.toElement:t.fromElement:t.relatedTarget},movementX:function(t){return"movementX"in t?t.movementX:(t!==Us&&(Us&&t.type==="mousemove"?(Ol=t.screenX-Us.screenX,zl=t.screenY-Us.screenY):zl=Ol=0,Us=t),Ol)},movementY:function(t){return"movementY"in t?t.movementY:zl}}),ad=dn(ll),Cv=ut({},ll,{dataTransfer:0}),Pv=dn(Cv),Lv=ut({},Eo,{relatedTarget:0}),kl=dn(Lv),bv=ut({},Es,{animationName:0,elapsedTime:0,pseudoElement:0}),Dv=dn(bv),Uv=ut({},Es,{clipboardData:function(t){return"clipboardData"in t?t.clipboardData:window.clipboardData}}),Nv=dn(Uv),Iv=ut({},Es,{data:0}),ld=dn(Iv),Fv={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},Ov={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},zv={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function kv(t){var e=this.nativeEvent;return e.getModifierState?e.getModifierState(t):(t=zv[t])?!!e[t]:!1}function tf(){return kv}var Bv=ut({},Eo,{key:function(t){if(t.key){var e=Fv[t.key]||t.key;if(e!=="Unidentified")return e}return t.type==="keypress"?(t=ya(t),t===13?"Enter":String.fromCharCode(t)):t.type==="keydown"||t.type==="keyup"?Ov[t.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:tf,charCode:function(t){return t.type==="keypress"?ya(t):0},keyCode:function(t){return t.type==="keydown"||t.type==="keyup"?t.keyCode:0},which:function(t){return t.type==="keypress"?ya(t):t.type==="keydown"||t.type==="keyup"?t.keyCode:0}}),Hv=dn(Bv),Gv=ut({},ll,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),ud=dn(Gv),Vv=ut({},Eo,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:tf}),Wv=dn(Vv),Xv=ut({},Es,{propertyName:0,elapsedTime:0,pseudoElement:0}),jv=dn(Xv),Yv=ut({},ll,{deltaX:function(t){return"deltaX"in t?t.deltaX:"wheelDeltaX"in t?-t.wheelDeltaX:0},deltaY:function(t){return"deltaY"in t?t.deltaY:"wheelDeltaY"in t?-t.wheelDeltaY:"wheelDelta"in t?-t.wheelDelta:0},deltaZ:0,deltaMode:0}),qv=dn(Yv),$v=[9,13,27,32],nf=li&&"CompositionEvent"in window,$s=null;li&&"documentMode"in document&&($s=document.documentMode);var Kv=li&&"TextEvent"in window&&!$s,_m=li&&(!nf||$s&&8<$s&&11>=$s),cd=" ",fd=!1;function vm(t,e){switch(t){case"keyup":return $v.indexOf(e.keyCode)!==-1;case"keydown":return e.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function xm(t){return t=t.detail,typeof t=="object"&&"data"in t?t.data:null}var Wr=!1;function Zv(t,e){switch(t){case"compositionend":return xm(e);case"keypress":return e.which!==32?null:(fd=!0,cd);case"textInput":return t=e.data,t===cd&&fd?null:t;default:return null}}function Qv(t,e){if(Wr)return t==="compositionend"||!nf&&vm(t,e)?(t=gm(),Sa=Jc=Ai=null,Wr=!1,t):null;switch(t){case"paste":return null;case"keypress":if(!(e.ctrlKey||e.altKey||e.metaKey)||e.ctrlKey&&e.altKey){if(e.char&&1<e.char.length)return e.char;if(e.which)return String.fromCharCode(e.which)}return null;case"compositionend":return _m&&e.locale!=="ko"?null:e.data;default:return null}}var Jv={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function dd(t){var e=t&&t.nodeName&&t.nodeName.toLowerCase();return e==="input"?!!Jv[t.type]:e==="textarea"}function Sm(t,e,n,i){Zp(i),e=Oa(e,"onChange"),0<e.length&&(n=new ef("onChange","change",null,n,i),t.push({event:n,listeners:e}))}var Ks=null,lo=null;function e0(t){bm(t,0)}function ul(t){var e=Yr(t);if(Wp(e))return t}function t0(t,e){if(t==="change")return e}var ym=!1;if(li){var Bl;if(li){var Hl="oninput"in document;if(!Hl){var hd=document.createElement("div");hd.setAttribute("oninput","return;"),Hl=typeof hd.oninput=="function"}Bl=Hl}else Bl=!1;ym=Bl&&(!document.documentMode||9<document.documentMode)}function pd(){Ks&&(Ks.detachEvent("onpropertychange",Mm),lo=Ks=null)}function Mm(t){if(t.propertyName==="value"&&ul(lo)){var e=[];Sm(e,lo,t,qc(t)),tm(e0,e)}}function n0(t,e,n){t==="focusin"?(pd(),Ks=e,lo=n,Ks.attachEvent("onpropertychange",Mm)):t==="focusout"&&pd()}function i0(t){if(t==="selectionchange"||t==="keyup"||t==="keydown")return ul(lo)}function r0(t,e){if(t==="click")return ul(e)}function s0(t,e){if(t==="input"||t==="change")return ul(e)}function o0(t,e){return t===e&&(t!==0||1/t===1/e)||t!==t&&e!==e}var Fn=typeof Object.is=="function"?Object.is:o0;function uo(t,e){if(Fn(t,e))return!0;if(typeof t!="object"||t===null||typeof e!="object"||e===null)return!1;var n=Object.keys(t),i=Object.keys(e);if(n.length!==i.length)return!1;for(i=0;i<n.length;i++){var r=n[i];if(!Fu.call(e,r)||!Fn(t[r],e[r]))return!1}return!0}function md(t){for(;t&&t.firstChild;)t=t.firstChild;return t}function gd(t,e){var n=md(t);t=0;for(var i;n;){if(n.nodeType===3){if(i=t+n.textContent.length,t<=e&&i>=e)return{node:n,offset:e-t};t=i}e:{for(;n;){if(n.nextSibling){n=n.nextSibling;break e}n=n.parentNode}n=void 0}n=md(n)}}function Em(t,e){return t&&e?t===e?!0:t&&t.nodeType===3?!1:e&&e.nodeType===3?Em(t,e.parentNode):"contains"in t?t.contains(e):t.compareDocumentPosition?!!(t.compareDocumentPosition(e)&16):!1:!1}function Tm(){for(var t=window,e=La();e instanceof t.HTMLIFrameElement;){try{var n=typeof e.contentWindow.location.href=="string"}catch{n=!1}if(n)t=e.contentWindow;else break;e=La(t.document)}return e}function rf(t){var e=t&&t.nodeName&&t.nodeName.toLowerCase();return e&&(e==="input"&&(t.type==="text"||t.type==="search"||t.type==="tel"||t.type==="url"||t.type==="password")||e==="textarea"||t.contentEditable==="true")}function a0(t){var e=Tm(),n=t.focusedElem,i=t.selectionRange;if(e!==n&&n&&n.ownerDocument&&Em(n.ownerDocument.documentElement,n)){if(i!==null&&rf(n)){if(e=i.start,t=i.end,t===void 0&&(t=e),"selectionStart"in n)n.selectionStart=e,n.selectionEnd=Math.min(t,n.value.length);else if(t=(e=n.ownerDocument||document)&&e.defaultView||window,t.getSelection){t=t.getSelection();var r=n.textContent.length,s=Math.min(i.start,r);i=i.end===void 0?s:Math.min(i.end,r),!t.extend&&s>i&&(r=i,i=s,s=r),r=gd(n,s);var o=gd(n,i);r&&o&&(t.rangeCount!==1||t.anchorNode!==r.node||t.anchorOffset!==r.offset||t.focusNode!==o.node||t.focusOffset!==o.offset)&&(e=e.createRange(),e.setStart(r.node,r.offset),t.removeAllRanges(),s>i?(t.addRange(e),t.extend(o.node,o.offset)):(e.setEnd(o.node,o.offset),t.addRange(e)))}}for(e=[],t=n;t=t.parentNode;)t.nodeType===1&&e.push({element:t,left:t.scrollLeft,top:t.scrollTop});for(typeof n.focus=="function"&&n.focus(),n=0;n<e.length;n++)t=e[n],t.element.scrollLeft=t.left,t.element.scrollTop=t.top}}var l0=li&&"documentMode"in document&&11>=document.documentMode,Xr=null,tc=null,Zs=null,nc=!1;function _d(t,e,n){var i=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;nc||Xr==null||Xr!==La(i)||(i=Xr,"selectionStart"in i&&rf(i)?i={start:i.selectionStart,end:i.selectionEnd}:(i=(i.ownerDocument&&i.ownerDocument.defaultView||window).getSelection(),i={anchorNode:i.anchorNode,anchorOffset:i.anchorOffset,focusNode:i.focusNode,focusOffset:i.focusOffset}),Zs&&uo(Zs,i)||(Zs=i,i=Oa(tc,"onSelect"),0<i.length&&(e=new ef("onSelect","select",null,e,n),t.push({event:e,listeners:i}),e.target=Xr)))}function Bo(t,e){var n={};return n[t.toLowerCase()]=e.toLowerCase(),n["Webkit"+t]="webkit"+e,n["Moz"+t]="moz"+e,n}var jr={animationend:Bo("Animation","AnimationEnd"),animationiteration:Bo("Animation","AnimationIteration"),animationstart:Bo("Animation","AnimationStart"),transitionend:Bo("Transition","TransitionEnd")},Gl={},wm={};li&&(wm=document.createElement("div").style,"AnimationEvent"in window||(delete jr.animationend.animation,delete jr.animationiteration.animation,delete jr.animationstart.animation),"TransitionEvent"in window||delete jr.transitionend.transition);function cl(t){if(Gl[t])return Gl[t];if(!jr[t])return t;var e=jr[t],n;for(n in e)if(e.hasOwnProperty(n)&&n in wm)return Gl[t]=e[n];return t}var Am=cl("animationend"),Rm=cl("animationiteration"),Cm=cl("animationstart"),Pm=cl("transitionend"),Lm=new Map,vd="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function Wi(t,e){Lm.set(t,e),yr(e,[t])}for(var Vl=0;Vl<vd.length;Vl++){var Wl=vd[Vl],u0=Wl.toLowerCase(),c0=Wl[0].toUpperCase()+Wl.slice(1);Wi(u0,"on"+c0)}Wi(Am,"onAnimationEnd");Wi(Rm,"onAnimationIteration");Wi(Cm,"onAnimationStart");Wi("dblclick","onDoubleClick");Wi("focusin","onFocus");Wi("focusout","onBlur");Wi(Pm,"onTransitionEnd");fs("onMouseEnter",["mouseout","mouseover"]);fs("onMouseLeave",["mouseout","mouseover"]);fs("onPointerEnter",["pointerout","pointerover"]);fs("onPointerLeave",["pointerout","pointerover"]);yr("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));yr("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));yr("onBeforeInput",["compositionend","keypress","textInput","paste"]);yr("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));yr("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));yr("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var js="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),f0=new Set("cancel close invalid load scroll toggle".split(" ").concat(js));function xd(t,e,n){var i=t.type||"unknown-event";t.currentTarget=n,uv(i,e,void 0,t),t.currentTarget=null}function bm(t,e){e=(e&4)!==0;for(var n=0;n<t.length;n++){var i=t[n],r=i.event;i=i.listeners;e:{var s=void 0;if(e)for(var o=i.length-1;0<=o;o--){var a=i[o],l=a.instance,u=a.currentTarget;if(a=a.listener,l!==s&&r.isPropagationStopped())break e;xd(r,a,u),s=l}else for(o=0;o<i.length;o++){if(a=i[o],l=a.instance,u=a.currentTarget,a=a.listener,l!==s&&r.isPropagationStopped())break e;xd(r,a,u),s=l}}}if(Da)throw t=Zu,Da=!1,Zu=null,t}function tt(t,e){var n=e[ac];n===void 0&&(n=e[ac]=new Set);var i=t+"__bubble";n.has(i)||(Dm(e,t,2,!1),n.add(i))}function Xl(t,e,n){var i=0;e&&(i|=4),Dm(n,t,i,e)}var Ho="_reactListening"+Math.random().toString(36).slice(2);function co(t){if(!t[Ho]){t[Ho]=!0,kp.forEach(function(n){n!=="selectionchange"&&(f0.has(n)||Xl(n,!1,t),Xl(n,!0,t))});var e=t.nodeType===9?t:t.ownerDocument;e===null||e[Ho]||(e[Ho]=!0,Xl("selectionchange",!1,e))}}function Dm(t,e,n,i){switch(mm(e)){case 1:var r=wv;break;case 4:r=Av;break;default:r=Qc}n=r.bind(null,e,n,t),r=void 0,!Ku||e!=="touchstart"&&e!=="touchmove"&&e!=="wheel"||(r=!0),i?r!==void 0?t.addEventListener(e,n,{capture:!0,passive:r}):t.addEventListener(e,n,!0):r!==void 0?t.addEventListener(e,n,{passive:r}):t.addEventListener(e,n,!1)}function jl(t,e,n,i,r){var s=i;if(!(e&1)&&!(e&2)&&i!==null)e:for(;;){if(i===null)return;var o=i.tag;if(o===3||o===4){var a=i.stateNode.containerInfo;if(a===r||a.nodeType===8&&a.parentNode===r)break;if(o===4)for(o=i.return;o!==null;){var l=o.tag;if((l===3||l===4)&&(l=o.stateNode.containerInfo,l===r||l.nodeType===8&&l.parentNode===r))return;o=o.return}for(;a!==null;){if(o=sr(a),o===null)return;if(l=o.tag,l===5||l===6){i=s=o;continue e}a=a.parentNode}}i=i.return}tm(function(){var u=s,f=qc(n),d=[];e:{var h=Lm.get(t);if(h!==void 0){var m=ef,v=t;switch(t){case"keypress":if(ya(n)===0)break e;case"keydown":case"keyup":m=Hv;break;case"focusin":v="focus",m=kl;break;case"focusout":v="blur",m=kl;break;case"beforeblur":case"afterblur":m=kl;break;case"click":if(n.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":m=ad;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":m=Pv;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":m=Wv;break;case Am:case Rm:case Cm:m=Dv;break;case Pm:m=jv;break;case"scroll":m=Rv;break;case"wheel":m=qv;break;case"copy":case"cut":case"paste":m=Nv;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":m=ud}var S=(e&4)!==0,p=!S&&t==="scroll",c=S?h!==null?h+"Capture":null:h;S=[];for(var _=u,g;_!==null;){g=_;var M=g.stateNode;if(g.tag===5&&M!==null&&(g=M,c!==null&&(M=ro(_,c),M!=null&&S.push(fo(_,M,g)))),p)break;_=_.return}0<S.length&&(h=new m(h,v,null,n,f),d.push({event:h,listeners:S}))}}if(!(e&7)){e:{if(h=t==="mouseover"||t==="pointerover",m=t==="mouseout"||t==="pointerout",h&&n!==qu&&(v=n.relatedTarget||n.fromElement)&&(sr(v)||v[ui]))break e;if((m||h)&&(h=f.window===f?f:(h=f.ownerDocument)?h.defaultView||h.parentWindow:window,m?(v=n.relatedTarget||n.toElement,m=u,v=v?sr(v):null,v!==null&&(p=Mr(v),v!==p||v.tag!==5&&v.tag!==6)&&(v=null)):(m=null,v=u),m!==v)){if(S=ad,M="onMouseLeave",c="onMouseEnter",_="mouse",(t==="pointerout"||t==="pointerover")&&(S=ud,M="onPointerLeave",c="onPointerEnter",_="pointer"),p=m==null?h:Yr(m),g=v==null?h:Yr(v),h=new S(M,_+"leave",m,n,f),h.target=p,h.relatedTarget=g,M=null,sr(f)===u&&(S=new S(c,_+"enter",v,n,f),S.target=g,S.relatedTarget=p,M=S),p=M,m&&v)t:{for(S=m,c=v,_=0,g=S;g;g=Tr(g))_++;for(g=0,M=c;M;M=Tr(M))g++;for(;0<_-g;)S=Tr(S),_--;for(;0<g-_;)c=Tr(c),g--;for(;_--;){if(S===c||c!==null&&S===c.alternate)break t;S=Tr(S),c=Tr(c)}S=null}else S=null;m!==null&&Sd(d,h,m,S,!1),v!==null&&p!==null&&Sd(d,p,v,S,!0)}}e:{if(h=u?Yr(u):window,m=h.nodeName&&h.nodeName.toLowerCase(),m==="select"||m==="input"&&h.type==="file")var P=t0;else if(dd(h))if(ym)P=s0;else{P=i0;var R=n0}else(m=h.nodeName)&&m.toLowerCase()==="input"&&(h.type==="checkbox"||h.type==="radio")&&(P=r0);if(P&&(P=P(t,u))){Sm(d,P,n,f);break e}R&&R(t,h,u),t==="focusout"&&(R=h._wrapperState)&&R.controlled&&h.type==="number"&&Vu(h,"number",h.value)}switch(R=u?Yr(u):window,t){case"focusin":(dd(R)||R.contentEditable==="true")&&(Xr=R,tc=u,Zs=null);break;case"focusout":Zs=tc=Xr=null;break;case"mousedown":nc=!0;break;case"contextmenu":case"mouseup":case"dragend":nc=!1,_d(d,n,f);break;case"selectionchange":if(l0)break;case"keydown":case"keyup":_d(d,n,f)}var w;if(nf)e:{switch(t){case"compositionstart":var N="onCompositionStart";break e;case"compositionend":N="onCompositionEnd";break e;case"compositionupdate":N="onCompositionUpdate";break e}N=void 0}else Wr?vm(t,n)&&(N="onCompositionEnd"):t==="keydown"&&n.keyCode===229&&(N="onCompositionStart");N&&(_m&&n.locale!=="ko"&&(Wr||N!=="onCompositionStart"?N==="onCompositionEnd"&&Wr&&(w=gm()):(Ai=f,Jc="value"in Ai?Ai.value:Ai.textContent,Wr=!0)),R=Oa(u,N),0<R.length&&(N=new ld(N,t,null,n,f),d.push({event:N,listeners:R}),w?N.data=w:(w=xm(n),w!==null&&(N.data=w)))),(w=Kv?Zv(t,n):Qv(t,n))&&(u=Oa(u,"onBeforeInput"),0<u.length&&(f=new ld("onBeforeInput","beforeinput",null,n,f),d.push({event:f,listeners:u}),f.data=w))}bm(d,e)})}function fo(t,e,n){return{instance:t,listener:e,currentTarget:n}}function Oa(t,e){for(var n=e+"Capture",i=[];t!==null;){var r=t,s=r.stateNode;r.tag===5&&s!==null&&(r=s,s=ro(t,n),s!=null&&i.unshift(fo(t,s,r)),s=ro(t,e),s!=null&&i.push(fo(t,s,r))),t=t.return}return i}function Tr(t){if(t===null)return null;do t=t.return;while(t&&t.tag!==5);return t||null}function Sd(t,e,n,i,r){for(var s=e._reactName,o=[];n!==null&&n!==i;){var a=n,l=a.alternate,u=a.stateNode;if(l!==null&&l===i)break;a.tag===5&&u!==null&&(a=u,r?(l=ro(n,s),l!=null&&o.unshift(fo(n,l,a))):r||(l=ro(n,s),l!=null&&o.push(fo(n,l,a)))),n=n.return}o.length!==0&&t.push({event:e,listeners:o})}var d0=/\r\n?/g,h0=/\u0000|\uFFFD/g;function yd(t){return(typeof t=="string"?t:""+t).replace(d0,`
`).replace(h0,"")}function Go(t,e,n){if(e=yd(e),yd(t)!==e&&n)throw Error(J(425))}function za(){}var ic=null,rc=null;function sc(t,e){return t==="textarea"||t==="noscript"||typeof e.children=="string"||typeof e.children=="number"||typeof e.dangerouslySetInnerHTML=="object"&&e.dangerouslySetInnerHTML!==null&&e.dangerouslySetInnerHTML.__html!=null}var oc=typeof setTimeout=="function"?setTimeout:void 0,p0=typeof clearTimeout=="function"?clearTimeout:void 0,Md=typeof Promise=="function"?Promise:void 0,m0=typeof queueMicrotask=="function"?queueMicrotask:typeof Md<"u"?function(t){return Md.resolve(null).then(t).catch(g0)}:oc;function g0(t){setTimeout(function(){throw t})}function Yl(t,e){var n=e,i=0;do{var r=n.nextSibling;if(t.removeChild(n),r&&r.nodeType===8)if(n=r.data,n==="/$"){if(i===0){t.removeChild(r),ao(e);return}i--}else n!=="$"&&n!=="$?"&&n!=="$!"||i++;n=r}while(n);ao(e)}function Di(t){for(;t!=null;t=t.nextSibling){var e=t.nodeType;if(e===1||e===3)break;if(e===8){if(e=t.data,e==="$"||e==="$!"||e==="$?")break;if(e==="/$")return null}}return t}function Ed(t){t=t.previousSibling;for(var e=0;t;){if(t.nodeType===8){var n=t.data;if(n==="$"||n==="$!"||n==="$?"){if(e===0)return t;e--}else n==="/$"&&e++}t=t.previousSibling}return null}var Ts=Math.random().toString(36).slice(2),Hn="__reactFiber$"+Ts,ho="__reactProps$"+Ts,ui="__reactContainer$"+Ts,ac="__reactEvents$"+Ts,_0="__reactListeners$"+Ts,v0="__reactHandles$"+Ts;function sr(t){var e=t[Hn];if(e)return e;for(var n=t.parentNode;n;){if(e=n[ui]||n[Hn]){if(n=e.alternate,e.child!==null||n!==null&&n.child!==null)for(t=Ed(t);t!==null;){if(n=t[Hn])return n;t=Ed(t)}return e}t=n,n=t.parentNode}return null}function To(t){return t=t[Hn]||t[ui],!t||t.tag!==5&&t.tag!==6&&t.tag!==13&&t.tag!==3?null:t}function Yr(t){if(t.tag===5||t.tag===6)return t.stateNode;throw Error(J(33))}function fl(t){return t[ho]||null}var lc=[],qr=-1;function Xi(t){return{current:t}}function it(t){0>qr||(t.current=lc[qr],lc[qr]=null,qr--)}function Je(t,e){qr++,lc[qr]=t.current,t.current=e}var Hi={},kt=Xi(Hi),Qt=Xi(!1),mr=Hi;function ds(t,e){var n=t.type.contextTypes;if(!n)return Hi;var i=t.stateNode;if(i&&i.__reactInternalMemoizedUnmaskedChildContext===e)return i.__reactInternalMemoizedMaskedChildContext;var r={},s;for(s in n)r[s]=e[s];return i&&(t=t.stateNode,t.__reactInternalMemoizedUnmaskedChildContext=e,t.__reactInternalMemoizedMaskedChildContext=r),r}function Jt(t){return t=t.childContextTypes,t!=null}function ka(){it(Qt),it(kt)}function Td(t,e,n){if(kt.current!==Hi)throw Error(J(168));Je(kt,e),Je(Qt,n)}function Um(t,e,n){var i=t.stateNode;if(e=e.childContextTypes,typeof i.getChildContext!="function")return n;i=i.getChildContext();for(var r in i)if(!(r in e))throw Error(J(108,nv(t)||"Unknown",r));return ut({},n,i)}function Ba(t){return t=(t=t.stateNode)&&t.__reactInternalMemoizedMergedChildContext||Hi,mr=kt.current,Je(kt,t),Je(Qt,Qt.current),!0}function wd(t,e,n){var i=t.stateNode;if(!i)throw Error(J(169));n?(t=Um(t,e,mr),i.__reactInternalMemoizedMergedChildContext=t,it(Qt),it(kt),Je(kt,t)):it(Qt),Je(Qt,n)}var ti=null,dl=!1,ql=!1;function Nm(t){ti===null?ti=[t]:ti.push(t)}function x0(t){dl=!0,Nm(t)}function ji(){if(!ql&&ti!==null){ql=!0;var t=0,e=Ye;try{var n=ti;for(Ye=1;t<n.length;t++){var i=n[t];do i=i(!0);while(i!==null)}ti=null,dl=!1}catch(r){throw ti!==null&&(ti=ti.slice(t+1)),sm($c,ji),r}finally{Ye=e,ql=!1}}return null}var $r=[],Kr=0,Ha=null,Ga=0,gn=[],_n=0,gr=null,ri=1,si="";function Ji(t,e){$r[Kr++]=Ga,$r[Kr++]=Ha,Ha=t,Ga=e}function Im(t,e,n){gn[_n++]=ri,gn[_n++]=si,gn[_n++]=gr,gr=t;var i=ri;t=si;var r=32-Nn(i)-1;i&=~(1<<r),n+=1;var s=32-Nn(e)+r;if(30<s){var o=r-r%5;s=(i&(1<<o)-1).toString(32),i>>=o,r-=o,ri=1<<32-Nn(e)+r|n<<r|i,si=s+t}else ri=1<<s|n<<r|i,si=t}function sf(t){t.return!==null&&(Ji(t,1),Im(t,1,0))}function of(t){for(;t===Ha;)Ha=$r[--Kr],$r[Kr]=null,Ga=$r[--Kr],$r[Kr]=null;for(;t===gr;)gr=gn[--_n],gn[_n]=null,si=gn[--_n],gn[_n]=null,ri=gn[--_n],gn[_n]=null}var un=null,ln=null,rt=!1,Ln=null;function Fm(t,e){var n=Sn(5,null,null,0);n.elementType="DELETED",n.stateNode=e,n.return=t,e=t.deletions,e===null?(t.deletions=[n],t.flags|=16):e.push(n)}function Ad(t,e){switch(t.tag){case 5:var n=t.type;return e=e.nodeType!==1||n.toLowerCase()!==e.nodeName.toLowerCase()?null:e,e!==null?(t.stateNode=e,un=t,ln=Di(e.firstChild),!0):!1;case 6:return e=t.pendingProps===""||e.nodeType!==3?null:e,e!==null?(t.stateNode=e,un=t,ln=null,!0):!1;case 13:return e=e.nodeType!==8?null:e,e!==null?(n=gr!==null?{id:ri,overflow:si}:null,t.memoizedState={dehydrated:e,treeContext:n,retryLane:1073741824},n=Sn(18,null,null,0),n.stateNode=e,n.return=t,t.child=n,un=t,ln=null,!0):!1;default:return!1}}function uc(t){return(t.mode&1)!==0&&(t.flags&128)===0}function cc(t){if(rt){var e=ln;if(e){var n=e;if(!Ad(t,e)){if(uc(t))throw Error(J(418));e=Di(n.nextSibling);var i=un;e&&Ad(t,e)?Fm(i,n):(t.flags=t.flags&-4097|2,rt=!1,un=t)}}else{if(uc(t))throw Error(J(418));t.flags=t.flags&-4097|2,rt=!1,un=t}}}function Rd(t){for(t=t.return;t!==null&&t.tag!==5&&t.tag!==3&&t.tag!==13;)t=t.return;un=t}function Vo(t){if(t!==un)return!1;if(!rt)return Rd(t),rt=!0,!1;var e;if((e=t.tag!==3)&&!(e=t.tag!==5)&&(e=t.type,e=e!=="head"&&e!=="body"&&!sc(t.type,t.memoizedProps)),e&&(e=ln)){if(uc(t))throw Om(),Error(J(418));for(;e;)Fm(t,e),e=Di(e.nextSibling)}if(Rd(t),t.tag===13){if(t=t.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(J(317));e:{for(t=t.nextSibling,e=0;t;){if(t.nodeType===8){var n=t.data;if(n==="/$"){if(e===0){ln=Di(t.nextSibling);break e}e--}else n!=="$"&&n!=="$!"&&n!=="$?"||e++}t=t.nextSibling}ln=null}}else ln=un?Di(t.stateNode.nextSibling):null;return!0}function Om(){for(var t=ln;t;)t=Di(t.nextSibling)}function hs(){ln=un=null,rt=!1}function af(t){Ln===null?Ln=[t]:Ln.push(t)}var S0=hi.ReactCurrentBatchConfig;function Ns(t,e,n){if(t=n.ref,t!==null&&typeof t!="function"&&typeof t!="object"){if(n._owner){if(n=n._owner,n){if(n.tag!==1)throw Error(J(309));var i=n.stateNode}if(!i)throw Error(J(147,t));var r=i,s=""+t;return e!==null&&e.ref!==null&&typeof e.ref=="function"&&e.ref._stringRef===s?e.ref:(e=function(o){var a=r.refs;o===null?delete a[s]:a[s]=o},e._stringRef=s,e)}if(typeof t!="string")throw Error(J(284));if(!n._owner)throw Error(J(290,t))}return t}function Wo(t,e){throw t=Object.prototype.toString.call(e),Error(J(31,t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t))}function Cd(t){var e=t._init;return e(t._payload)}function zm(t){function e(c,_){if(t){var g=c.deletions;g===null?(c.deletions=[_],c.flags|=16):g.push(_)}}function n(c,_){if(!t)return null;for(;_!==null;)e(c,_),_=_.sibling;return null}function i(c,_){for(c=new Map;_!==null;)_.key!==null?c.set(_.key,_):c.set(_.index,_),_=_.sibling;return c}function r(c,_){return c=Fi(c,_),c.index=0,c.sibling=null,c}function s(c,_,g){return c.index=g,t?(g=c.alternate,g!==null?(g=g.index,g<_?(c.flags|=2,_):g):(c.flags|=2,_)):(c.flags|=1048576,_)}function o(c){return t&&c.alternate===null&&(c.flags|=2),c}function a(c,_,g,M){return _===null||_.tag!==6?(_=tu(g,c.mode,M),_.return=c,_):(_=r(_,g),_.return=c,_)}function l(c,_,g,M){var P=g.type;return P===Vr?f(c,_,g.props.children,M,g.key):_!==null&&(_.elementType===P||typeof P=="object"&&P!==null&&P.$$typeof===yi&&Cd(P)===_.type)?(M=r(_,g.props),M.ref=Ns(c,_,g),M.return=c,M):(M=Ca(g.type,g.key,g.props,null,c.mode,M),M.ref=Ns(c,_,g),M.return=c,M)}function u(c,_,g,M){return _===null||_.tag!==4||_.stateNode.containerInfo!==g.containerInfo||_.stateNode.implementation!==g.implementation?(_=nu(g,c.mode,M),_.return=c,_):(_=r(_,g.children||[]),_.return=c,_)}function f(c,_,g,M,P){return _===null||_.tag!==7?(_=cr(g,c.mode,M,P),_.return=c,_):(_=r(_,g),_.return=c,_)}function d(c,_,g){if(typeof _=="string"&&_!==""||typeof _=="number")return _=tu(""+_,c.mode,g),_.return=c,_;if(typeof _=="object"&&_!==null){switch(_.$$typeof){case Uo:return g=Ca(_.type,_.key,_.props,null,c.mode,g),g.ref=Ns(c,null,_),g.return=c,g;case Gr:return _=nu(_,c.mode,g),_.return=c,_;case yi:var M=_._init;return d(c,M(_._payload),g)}if(Ws(_)||Ps(_))return _=cr(_,c.mode,g,null),_.return=c,_;Wo(c,_)}return null}function h(c,_,g,M){var P=_!==null?_.key:null;if(typeof g=="string"&&g!==""||typeof g=="number")return P!==null?null:a(c,_,""+g,M);if(typeof g=="object"&&g!==null){switch(g.$$typeof){case Uo:return g.key===P?l(c,_,g,M):null;case Gr:return g.key===P?u(c,_,g,M):null;case yi:return P=g._init,h(c,_,P(g._payload),M)}if(Ws(g)||Ps(g))return P!==null?null:f(c,_,g,M,null);Wo(c,g)}return null}function m(c,_,g,M,P){if(typeof M=="string"&&M!==""||typeof M=="number")return c=c.get(g)||null,a(_,c,""+M,P);if(typeof M=="object"&&M!==null){switch(M.$$typeof){case Uo:return c=c.get(M.key===null?g:M.key)||null,l(_,c,M,P);case Gr:return c=c.get(M.key===null?g:M.key)||null,u(_,c,M,P);case yi:var R=M._init;return m(c,_,g,R(M._payload),P)}if(Ws(M)||Ps(M))return c=c.get(g)||null,f(_,c,M,P,null);Wo(_,M)}return null}function v(c,_,g,M){for(var P=null,R=null,w=_,N=_=0,K=null;w!==null&&N<g.length;N++){w.index>N?(K=w,w=null):K=w.sibling;var x=h(c,w,g[N],M);if(x===null){w===null&&(w=K);break}t&&w&&x.alternate===null&&e(c,w),_=s(x,_,N),R===null?P=x:R.sibling=x,R=x,w=K}if(N===g.length)return n(c,w),rt&&Ji(c,N),P;if(w===null){for(;N<g.length;N++)w=d(c,g[N],M),w!==null&&(_=s(w,_,N),R===null?P=w:R.sibling=w,R=w);return rt&&Ji(c,N),P}for(w=i(c,w);N<g.length;N++)K=m(w,c,N,g[N],M),K!==null&&(t&&K.alternate!==null&&w.delete(K.key===null?N:K.key),_=s(K,_,N),R===null?P=K:R.sibling=K,R=K);return t&&w.forEach(function(C){return e(c,C)}),rt&&Ji(c,N),P}function S(c,_,g,M){var P=Ps(g);if(typeof P!="function")throw Error(J(150));if(g=P.call(g),g==null)throw Error(J(151));for(var R=P=null,w=_,N=_=0,K=null,x=g.next();w!==null&&!x.done;N++,x=g.next()){w.index>N?(K=w,w=null):K=w.sibling;var C=h(c,w,x.value,M);if(C===null){w===null&&(w=K);break}t&&w&&C.alternate===null&&e(c,w),_=s(C,_,N),R===null?P=C:R.sibling=C,R=C,w=K}if(x.done)return n(c,w),rt&&Ji(c,N),P;if(w===null){for(;!x.done;N++,x=g.next())x=d(c,x.value,M),x!==null&&(_=s(x,_,N),R===null?P=x:R.sibling=x,R=x);return rt&&Ji(c,N),P}for(w=i(c,w);!x.done;N++,x=g.next())x=m(w,c,N,x.value,M),x!==null&&(t&&x.alternate!==null&&w.delete(x.key===null?N:x.key),_=s(x,_,N),R===null?P=x:R.sibling=x,R=x);return t&&w.forEach(function(X){return e(c,X)}),rt&&Ji(c,N),P}function p(c,_,g,M){if(typeof g=="object"&&g!==null&&g.type===Vr&&g.key===null&&(g=g.props.children),typeof g=="object"&&g!==null){switch(g.$$typeof){case Uo:e:{for(var P=g.key,R=_;R!==null;){if(R.key===P){if(P=g.type,P===Vr){if(R.tag===7){n(c,R.sibling),_=r(R,g.props.children),_.return=c,c=_;break e}}else if(R.elementType===P||typeof P=="object"&&P!==null&&P.$$typeof===yi&&Cd(P)===R.type){n(c,R.sibling),_=r(R,g.props),_.ref=Ns(c,R,g),_.return=c,c=_;break e}n(c,R);break}else e(c,R);R=R.sibling}g.type===Vr?(_=cr(g.props.children,c.mode,M,g.key),_.return=c,c=_):(M=Ca(g.type,g.key,g.props,null,c.mode,M),M.ref=Ns(c,_,g),M.return=c,c=M)}return o(c);case Gr:e:{for(R=g.key;_!==null;){if(_.key===R)if(_.tag===4&&_.stateNode.containerInfo===g.containerInfo&&_.stateNode.implementation===g.implementation){n(c,_.sibling),_=r(_,g.children||[]),_.return=c,c=_;break e}else{n(c,_);break}else e(c,_);_=_.sibling}_=nu(g,c.mode,M),_.return=c,c=_}return o(c);case yi:return R=g._init,p(c,_,R(g._payload),M)}if(Ws(g))return v(c,_,g,M);if(Ps(g))return S(c,_,g,M);Wo(c,g)}return typeof g=="string"&&g!==""||typeof g=="number"?(g=""+g,_!==null&&_.tag===6?(n(c,_.sibling),_=r(_,g),_.return=c,c=_):(n(c,_),_=tu(g,c.mode,M),_.return=c,c=_),o(c)):n(c,_)}return p}var ps=zm(!0),km=zm(!1),Va=Xi(null),Wa=null,Zr=null,lf=null;function uf(){lf=Zr=Wa=null}function cf(t){var e=Va.current;it(Va),t._currentValue=e}function fc(t,e,n){for(;t!==null;){var i=t.alternate;if((t.childLanes&e)!==e?(t.childLanes|=e,i!==null&&(i.childLanes|=e)):i!==null&&(i.childLanes&e)!==e&&(i.childLanes|=e),t===n)break;t=t.return}}function os(t,e){Wa=t,lf=Zr=null,t=t.dependencies,t!==null&&t.firstContext!==null&&(t.lanes&e&&(Zt=!0),t.firstContext=null)}function Mn(t){var e=t._currentValue;if(lf!==t)if(t={context:t,memoizedValue:e,next:null},Zr===null){if(Wa===null)throw Error(J(308));Zr=t,Wa.dependencies={lanes:0,firstContext:t}}else Zr=Zr.next=t;return e}var or=null;function ff(t){or===null?or=[t]:or.push(t)}function Bm(t,e,n,i){var r=e.interleaved;return r===null?(n.next=n,ff(e)):(n.next=r.next,r.next=n),e.interleaved=n,ci(t,i)}function ci(t,e){t.lanes|=e;var n=t.alternate;for(n!==null&&(n.lanes|=e),n=t,t=t.return;t!==null;)t.childLanes|=e,n=t.alternate,n!==null&&(n.childLanes|=e),n=t,t=t.return;return n.tag===3?n.stateNode:null}var Mi=!1;function df(t){t.updateQueue={baseState:t.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function Hm(t,e){t=t.updateQueue,e.updateQueue===t&&(e.updateQueue={baseState:t.baseState,firstBaseUpdate:t.firstBaseUpdate,lastBaseUpdate:t.lastBaseUpdate,shared:t.shared,effects:t.effects})}function ai(t,e){return{eventTime:t,lane:e,tag:0,payload:null,callback:null,next:null}}function Ui(t,e,n){var i=t.updateQueue;if(i===null)return null;if(i=i.shared,He&2){var r=i.pending;return r===null?e.next=e:(e.next=r.next,r.next=e),i.pending=e,ci(t,n)}return r=i.interleaved,r===null?(e.next=e,ff(i)):(e.next=r.next,r.next=e),i.interleaved=e,ci(t,n)}function Ma(t,e,n){if(e=e.updateQueue,e!==null&&(e=e.shared,(n&4194240)!==0)){var i=e.lanes;i&=t.pendingLanes,n|=i,e.lanes=n,Kc(t,n)}}function Pd(t,e){var n=t.updateQueue,i=t.alternate;if(i!==null&&(i=i.updateQueue,n===i)){var r=null,s=null;if(n=n.firstBaseUpdate,n!==null){do{var o={eventTime:n.eventTime,lane:n.lane,tag:n.tag,payload:n.payload,callback:n.callback,next:null};s===null?r=s=o:s=s.next=o,n=n.next}while(n!==null);s===null?r=s=e:s=s.next=e}else r=s=e;n={baseState:i.baseState,firstBaseUpdate:r,lastBaseUpdate:s,shared:i.shared,effects:i.effects},t.updateQueue=n;return}t=n.lastBaseUpdate,t===null?n.firstBaseUpdate=e:t.next=e,n.lastBaseUpdate=e}function Xa(t,e,n,i){var r=t.updateQueue;Mi=!1;var s=r.firstBaseUpdate,o=r.lastBaseUpdate,a=r.shared.pending;if(a!==null){r.shared.pending=null;var l=a,u=l.next;l.next=null,o===null?s=u:o.next=u,o=l;var f=t.alternate;f!==null&&(f=f.updateQueue,a=f.lastBaseUpdate,a!==o&&(a===null?f.firstBaseUpdate=u:a.next=u,f.lastBaseUpdate=l))}if(s!==null){var d=r.baseState;o=0,f=u=l=null,a=s;do{var h=a.lane,m=a.eventTime;if((i&h)===h){f!==null&&(f=f.next={eventTime:m,lane:0,tag:a.tag,payload:a.payload,callback:a.callback,next:null});e:{var v=t,S=a;switch(h=e,m=n,S.tag){case 1:if(v=S.payload,typeof v=="function"){d=v.call(m,d,h);break e}d=v;break e;case 3:v.flags=v.flags&-65537|128;case 0:if(v=S.payload,h=typeof v=="function"?v.call(m,d,h):v,h==null)break e;d=ut({},d,h);break e;case 2:Mi=!0}}a.callback!==null&&a.lane!==0&&(t.flags|=64,h=r.effects,h===null?r.effects=[a]:h.push(a))}else m={eventTime:m,lane:h,tag:a.tag,payload:a.payload,callback:a.callback,next:null},f===null?(u=f=m,l=d):f=f.next=m,o|=h;if(a=a.next,a===null){if(a=r.shared.pending,a===null)break;h=a,a=h.next,h.next=null,r.lastBaseUpdate=h,r.shared.pending=null}}while(!0);if(f===null&&(l=d),r.baseState=l,r.firstBaseUpdate=u,r.lastBaseUpdate=f,e=r.shared.interleaved,e!==null){r=e;do o|=r.lane,r=r.next;while(r!==e)}else s===null&&(r.shared.lanes=0);vr|=o,t.lanes=o,t.memoizedState=d}}function Ld(t,e,n){if(t=e.effects,e.effects=null,t!==null)for(e=0;e<t.length;e++){var i=t[e],r=i.callback;if(r!==null){if(i.callback=null,i=n,typeof r!="function")throw Error(J(191,r));r.call(i)}}}var wo={},Wn=Xi(wo),po=Xi(wo),mo=Xi(wo);function ar(t){if(t===wo)throw Error(J(174));return t}function hf(t,e){switch(Je(mo,e),Je(po,t),Je(Wn,wo),t=e.nodeType,t){case 9:case 11:e=(e=e.documentElement)?e.namespaceURI:Xu(null,"");break;default:t=t===8?e.parentNode:e,e=t.namespaceURI||null,t=t.tagName,e=Xu(e,t)}it(Wn),Je(Wn,e)}function ms(){it(Wn),it(po),it(mo)}function Gm(t){ar(mo.current);var e=ar(Wn.current),n=Xu(e,t.type);e!==n&&(Je(po,t),Je(Wn,n))}function pf(t){po.current===t&&(it(Wn),it(po))}var at=Xi(0);function ja(t){for(var e=t;e!==null;){if(e.tag===13){var n=e.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||n.data==="$?"||n.data==="$!"))return e}else if(e.tag===19&&e.memoizedProps.revealOrder!==void 0){if(e.flags&128)return e}else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break;for(;e.sibling===null;){if(e.return===null||e.return===t)return null;e=e.return}e.sibling.return=e.return,e=e.sibling}return null}var $l=[];function mf(){for(var t=0;t<$l.length;t++)$l[t]._workInProgressVersionPrimary=null;$l.length=0}var Ea=hi.ReactCurrentDispatcher,Kl=hi.ReactCurrentBatchConfig,_r=0,lt=null,gt=null,Et=null,Ya=!1,Qs=!1,go=0,y0=0;function Ut(){throw Error(J(321))}function gf(t,e){if(e===null)return!1;for(var n=0;n<e.length&&n<t.length;n++)if(!Fn(t[n],e[n]))return!1;return!0}function _f(t,e,n,i,r,s){if(_r=s,lt=e,e.memoizedState=null,e.updateQueue=null,e.lanes=0,Ea.current=t===null||t.memoizedState===null?w0:A0,t=n(i,r),Qs){s=0;do{if(Qs=!1,go=0,25<=s)throw Error(J(301));s+=1,Et=gt=null,e.updateQueue=null,Ea.current=R0,t=n(i,r)}while(Qs)}if(Ea.current=qa,e=gt!==null&&gt.next!==null,_r=0,Et=gt=lt=null,Ya=!1,e)throw Error(J(300));return t}function vf(){var t=go!==0;return go=0,t}function kn(){var t={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return Et===null?lt.memoizedState=Et=t:Et=Et.next=t,Et}function En(){if(gt===null){var t=lt.alternate;t=t!==null?t.memoizedState:null}else t=gt.next;var e=Et===null?lt.memoizedState:Et.next;if(e!==null)Et=e,gt=t;else{if(t===null)throw Error(J(310));gt=t,t={memoizedState:gt.memoizedState,baseState:gt.baseState,baseQueue:gt.baseQueue,queue:gt.queue,next:null},Et===null?lt.memoizedState=Et=t:Et=Et.next=t}return Et}function _o(t,e){return typeof e=="function"?e(t):e}function Zl(t){var e=En(),n=e.queue;if(n===null)throw Error(J(311));n.lastRenderedReducer=t;var i=gt,r=i.baseQueue,s=n.pending;if(s!==null){if(r!==null){var o=r.next;r.next=s.next,s.next=o}i.baseQueue=r=s,n.pending=null}if(r!==null){s=r.next,i=i.baseState;var a=o=null,l=null,u=s;do{var f=u.lane;if((_r&f)===f)l!==null&&(l=l.next={lane:0,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null}),i=u.hasEagerState?u.eagerState:t(i,u.action);else{var d={lane:f,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null};l===null?(a=l=d,o=i):l=l.next=d,lt.lanes|=f,vr|=f}u=u.next}while(u!==null&&u!==s);l===null?o=i:l.next=a,Fn(i,e.memoizedState)||(Zt=!0),e.memoizedState=i,e.baseState=o,e.baseQueue=l,n.lastRenderedState=i}if(t=n.interleaved,t!==null){r=t;do s=r.lane,lt.lanes|=s,vr|=s,r=r.next;while(r!==t)}else r===null&&(n.lanes=0);return[e.memoizedState,n.dispatch]}function Ql(t){var e=En(),n=e.queue;if(n===null)throw Error(J(311));n.lastRenderedReducer=t;var i=n.dispatch,r=n.pending,s=e.memoizedState;if(r!==null){n.pending=null;var o=r=r.next;do s=t(s,o.action),o=o.next;while(o!==r);Fn(s,e.memoizedState)||(Zt=!0),e.memoizedState=s,e.baseQueue===null&&(e.baseState=s),n.lastRenderedState=s}return[s,i]}function Vm(){}function Wm(t,e){var n=lt,i=En(),r=e(),s=!Fn(i.memoizedState,r);if(s&&(i.memoizedState=r,Zt=!0),i=i.queue,xf(Ym.bind(null,n,i,t),[t]),i.getSnapshot!==e||s||Et!==null&&Et.memoizedState.tag&1){if(n.flags|=2048,vo(9,jm.bind(null,n,i,r,e),void 0,null),At===null)throw Error(J(349));_r&30||Xm(n,e,r)}return r}function Xm(t,e,n){t.flags|=16384,t={getSnapshot:e,value:n},e=lt.updateQueue,e===null?(e={lastEffect:null,stores:null},lt.updateQueue=e,e.stores=[t]):(n=e.stores,n===null?e.stores=[t]:n.push(t))}function jm(t,e,n,i){e.value=n,e.getSnapshot=i,qm(e)&&$m(t)}function Ym(t,e,n){return n(function(){qm(e)&&$m(t)})}function qm(t){var e=t.getSnapshot;t=t.value;try{var n=e();return!Fn(t,n)}catch{return!0}}function $m(t){var e=ci(t,1);e!==null&&In(e,t,1,-1)}function bd(t){var e=kn();return typeof t=="function"&&(t=t()),e.memoizedState=e.baseState=t,t={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:_o,lastRenderedState:t},e.queue=t,t=t.dispatch=T0.bind(null,lt,t),[e.memoizedState,t]}function vo(t,e,n,i){return t={tag:t,create:e,destroy:n,deps:i,next:null},e=lt.updateQueue,e===null?(e={lastEffect:null,stores:null},lt.updateQueue=e,e.lastEffect=t.next=t):(n=e.lastEffect,n===null?e.lastEffect=t.next=t:(i=n.next,n.next=t,t.next=i,e.lastEffect=t)),t}function Km(){return En().memoizedState}function Ta(t,e,n,i){var r=kn();lt.flags|=t,r.memoizedState=vo(1|e,n,void 0,i===void 0?null:i)}function hl(t,e,n,i){var r=En();i=i===void 0?null:i;var s=void 0;if(gt!==null){var o=gt.memoizedState;if(s=o.destroy,i!==null&&gf(i,o.deps)){r.memoizedState=vo(e,n,s,i);return}}lt.flags|=t,r.memoizedState=vo(1|e,n,s,i)}function Dd(t,e){return Ta(8390656,8,t,e)}function xf(t,e){return hl(2048,8,t,e)}function Zm(t,e){return hl(4,2,t,e)}function Qm(t,e){return hl(4,4,t,e)}function Jm(t,e){if(typeof e=="function")return t=t(),e(t),function(){e(null)};if(e!=null)return t=t(),e.current=t,function(){e.current=null}}function eg(t,e,n){return n=n!=null?n.concat([t]):null,hl(4,4,Jm.bind(null,e,t),n)}function Sf(){}function tg(t,e){var n=En();e=e===void 0?null:e;var i=n.memoizedState;return i!==null&&e!==null&&gf(e,i[1])?i[0]:(n.memoizedState=[t,e],t)}function ng(t,e){var n=En();e=e===void 0?null:e;var i=n.memoizedState;return i!==null&&e!==null&&gf(e,i[1])?i[0]:(t=t(),n.memoizedState=[t,e],t)}function ig(t,e,n){return _r&21?(Fn(n,e)||(n=lm(),lt.lanes|=n,vr|=n,t.baseState=!0),e):(t.baseState&&(t.baseState=!1,Zt=!0),t.memoizedState=n)}function M0(t,e){var n=Ye;Ye=n!==0&&4>n?n:4,t(!0);var i=Kl.transition;Kl.transition={};try{t(!1),e()}finally{Ye=n,Kl.transition=i}}function rg(){return En().memoizedState}function E0(t,e,n){var i=Ii(t);if(n={lane:i,action:n,hasEagerState:!1,eagerState:null,next:null},sg(t))og(e,n);else if(n=Bm(t,e,n,i),n!==null){var r=Wt();In(n,t,i,r),ag(n,e,i)}}function T0(t,e,n){var i=Ii(t),r={lane:i,action:n,hasEagerState:!1,eagerState:null,next:null};if(sg(t))og(e,r);else{var s=t.alternate;if(t.lanes===0&&(s===null||s.lanes===0)&&(s=e.lastRenderedReducer,s!==null))try{var o=e.lastRenderedState,a=s(o,n);if(r.hasEagerState=!0,r.eagerState=a,Fn(a,o)){var l=e.interleaved;l===null?(r.next=r,ff(e)):(r.next=l.next,l.next=r),e.interleaved=r;return}}catch{}finally{}n=Bm(t,e,r,i),n!==null&&(r=Wt(),In(n,t,i,r),ag(n,e,i))}}function sg(t){var e=t.alternate;return t===lt||e!==null&&e===lt}function og(t,e){Qs=Ya=!0;var n=t.pending;n===null?e.next=e:(e.next=n.next,n.next=e),t.pending=e}function ag(t,e,n){if(n&4194240){var i=e.lanes;i&=t.pendingLanes,n|=i,e.lanes=n,Kc(t,n)}}var qa={readContext:Mn,useCallback:Ut,useContext:Ut,useEffect:Ut,useImperativeHandle:Ut,useInsertionEffect:Ut,useLayoutEffect:Ut,useMemo:Ut,useReducer:Ut,useRef:Ut,useState:Ut,useDebugValue:Ut,useDeferredValue:Ut,useTransition:Ut,useMutableSource:Ut,useSyncExternalStore:Ut,useId:Ut,unstable_isNewReconciler:!1},w0={readContext:Mn,useCallback:function(t,e){return kn().memoizedState=[t,e===void 0?null:e],t},useContext:Mn,useEffect:Dd,useImperativeHandle:function(t,e,n){return n=n!=null?n.concat([t]):null,Ta(4194308,4,Jm.bind(null,e,t),n)},useLayoutEffect:function(t,e){return Ta(4194308,4,t,e)},useInsertionEffect:function(t,e){return Ta(4,2,t,e)},useMemo:function(t,e){var n=kn();return e=e===void 0?null:e,t=t(),n.memoizedState=[t,e],t},useReducer:function(t,e,n){var i=kn();return e=n!==void 0?n(e):e,i.memoizedState=i.baseState=e,t={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:t,lastRenderedState:e},i.queue=t,t=t.dispatch=E0.bind(null,lt,t),[i.memoizedState,t]},useRef:function(t){var e=kn();return t={current:t},e.memoizedState=t},useState:bd,useDebugValue:Sf,useDeferredValue:function(t){return kn().memoizedState=t},useTransition:function(){var t=bd(!1),e=t[0];return t=M0.bind(null,t[1]),kn().memoizedState=t,[e,t]},useMutableSource:function(){},useSyncExternalStore:function(t,e,n){var i=lt,r=kn();if(rt){if(n===void 0)throw Error(J(407));n=n()}else{if(n=e(),At===null)throw Error(J(349));_r&30||Xm(i,e,n)}r.memoizedState=n;var s={value:n,getSnapshot:e};return r.queue=s,Dd(Ym.bind(null,i,s,t),[t]),i.flags|=2048,vo(9,jm.bind(null,i,s,n,e),void 0,null),n},useId:function(){var t=kn(),e=At.identifierPrefix;if(rt){var n=si,i=ri;n=(i&~(1<<32-Nn(i)-1)).toString(32)+n,e=":"+e+"R"+n,n=go++,0<n&&(e+="H"+n.toString(32)),e+=":"}else n=y0++,e=":"+e+"r"+n.toString(32)+":";return t.memoizedState=e},unstable_isNewReconciler:!1},A0={readContext:Mn,useCallback:tg,useContext:Mn,useEffect:xf,useImperativeHandle:eg,useInsertionEffect:Zm,useLayoutEffect:Qm,useMemo:ng,useReducer:Zl,useRef:Km,useState:function(){return Zl(_o)},useDebugValue:Sf,useDeferredValue:function(t){var e=En();return ig(e,gt.memoizedState,t)},useTransition:function(){var t=Zl(_o)[0],e=En().memoizedState;return[t,e]},useMutableSource:Vm,useSyncExternalStore:Wm,useId:rg,unstable_isNewReconciler:!1},R0={readContext:Mn,useCallback:tg,useContext:Mn,useEffect:xf,useImperativeHandle:eg,useInsertionEffect:Zm,useLayoutEffect:Qm,useMemo:ng,useReducer:Ql,useRef:Km,useState:function(){return Ql(_o)},useDebugValue:Sf,useDeferredValue:function(t){var e=En();return gt===null?e.memoizedState=t:ig(e,gt.memoizedState,t)},useTransition:function(){var t=Ql(_o)[0],e=En().memoizedState;return[t,e]},useMutableSource:Vm,useSyncExternalStore:Wm,useId:rg,unstable_isNewReconciler:!1};function Cn(t,e){if(t&&t.defaultProps){e=ut({},e),t=t.defaultProps;for(var n in t)e[n]===void 0&&(e[n]=t[n]);return e}return e}function dc(t,e,n,i){e=t.memoizedState,n=n(i,e),n=n==null?e:ut({},e,n),t.memoizedState=n,t.lanes===0&&(t.updateQueue.baseState=n)}var pl={isMounted:function(t){return(t=t._reactInternals)?Mr(t)===t:!1},enqueueSetState:function(t,e,n){t=t._reactInternals;var i=Wt(),r=Ii(t),s=ai(i,r);s.payload=e,n!=null&&(s.callback=n),e=Ui(t,s,r),e!==null&&(In(e,t,r,i),Ma(e,t,r))},enqueueReplaceState:function(t,e,n){t=t._reactInternals;var i=Wt(),r=Ii(t),s=ai(i,r);s.tag=1,s.payload=e,n!=null&&(s.callback=n),e=Ui(t,s,r),e!==null&&(In(e,t,r,i),Ma(e,t,r))},enqueueForceUpdate:function(t,e){t=t._reactInternals;var n=Wt(),i=Ii(t),r=ai(n,i);r.tag=2,e!=null&&(r.callback=e),e=Ui(t,r,i),e!==null&&(In(e,t,i,n),Ma(e,t,i))}};function Ud(t,e,n,i,r,s,o){return t=t.stateNode,typeof t.shouldComponentUpdate=="function"?t.shouldComponentUpdate(i,s,o):e.prototype&&e.prototype.isPureReactComponent?!uo(n,i)||!uo(r,s):!0}function lg(t,e,n){var i=!1,r=Hi,s=e.contextType;return typeof s=="object"&&s!==null?s=Mn(s):(r=Jt(e)?mr:kt.current,i=e.contextTypes,s=(i=i!=null)?ds(t,r):Hi),e=new e(n,s),t.memoizedState=e.state!==null&&e.state!==void 0?e.state:null,e.updater=pl,t.stateNode=e,e._reactInternals=t,i&&(t=t.stateNode,t.__reactInternalMemoizedUnmaskedChildContext=r,t.__reactInternalMemoizedMaskedChildContext=s),e}function Nd(t,e,n,i){t=e.state,typeof e.componentWillReceiveProps=="function"&&e.componentWillReceiveProps(n,i),typeof e.UNSAFE_componentWillReceiveProps=="function"&&e.UNSAFE_componentWillReceiveProps(n,i),e.state!==t&&pl.enqueueReplaceState(e,e.state,null)}function hc(t,e,n,i){var r=t.stateNode;r.props=n,r.state=t.memoizedState,r.refs={},df(t);var s=e.contextType;typeof s=="object"&&s!==null?r.context=Mn(s):(s=Jt(e)?mr:kt.current,r.context=ds(t,s)),r.state=t.memoizedState,s=e.getDerivedStateFromProps,typeof s=="function"&&(dc(t,e,s,n),r.state=t.memoizedState),typeof e.getDerivedStateFromProps=="function"||typeof r.getSnapshotBeforeUpdate=="function"||typeof r.UNSAFE_componentWillMount!="function"&&typeof r.componentWillMount!="function"||(e=r.state,typeof r.componentWillMount=="function"&&r.componentWillMount(),typeof r.UNSAFE_componentWillMount=="function"&&r.UNSAFE_componentWillMount(),e!==r.state&&pl.enqueueReplaceState(r,r.state,null),Xa(t,n,r,i),r.state=t.memoizedState),typeof r.componentDidMount=="function"&&(t.flags|=4194308)}function gs(t,e){try{var n="",i=e;do n+=tv(i),i=i.return;while(i);var r=n}catch(s){r=`
Error generating stack: `+s.message+`
`+s.stack}return{value:t,source:e,stack:r,digest:null}}function Jl(t,e,n){return{value:t,source:null,stack:n??null,digest:e??null}}function pc(t,e){try{console.error(e.value)}catch(n){setTimeout(function(){throw n})}}var C0=typeof WeakMap=="function"?WeakMap:Map;function ug(t,e,n){n=ai(-1,n),n.tag=3,n.payload={element:null};var i=e.value;return n.callback=function(){Ka||(Ka=!0,Tc=i),pc(t,e)},n}function cg(t,e,n){n=ai(-1,n),n.tag=3;var i=t.type.getDerivedStateFromError;if(typeof i=="function"){var r=e.value;n.payload=function(){return i(r)},n.callback=function(){pc(t,e)}}var s=t.stateNode;return s!==null&&typeof s.componentDidCatch=="function"&&(n.callback=function(){pc(t,e),typeof i!="function"&&(Ni===null?Ni=new Set([this]):Ni.add(this));var o=e.stack;this.componentDidCatch(e.value,{componentStack:o!==null?o:""})}),n}function Id(t,e,n){var i=t.pingCache;if(i===null){i=t.pingCache=new C0;var r=new Set;i.set(e,r)}else r=i.get(e),r===void 0&&(r=new Set,i.set(e,r));r.has(n)||(r.add(n),t=G0.bind(null,t,e,n),e.then(t,t))}function Fd(t){do{var e;if((e=t.tag===13)&&(e=t.memoizedState,e=e!==null?e.dehydrated!==null:!0),e)return t;t=t.return}while(t!==null);return null}function Od(t,e,n,i,r){return t.mode&1?(t.flags|=65536,t.lanes=r,t):(t===e?t.flags|=65536:(t.flags|=128,n.flags|=131072,n.flags&=-52805,n.tag===1&&(n.alternate===null?n.tag=17:(e=ai(-1,1),e.tag=2,Ui(n,e,1))),n.lanes|=1),t)}var P0=hi.ReactCurrentOwner,Zt=!1;function Gt(t,e,n,i){e.child=t===null?km(e,null,n,i):ps(e,t.child,n,i)}function zd(t,e,n,i,r){n=n.render;var s=e.ref;return os(e,r),i=_f(t,e,n,i,s,r),n=vf(),t!==null&&!Zt?(e.updateQueue=t.updateQueue,e.flags&=-2053,t.lanes&=~r,fi(t,e,r)):(rt&&n&&sf(e),e.flags|=1,Gt(t,e,i,r),e.child)}function kd(t,e,n,i,r){if(t===null){var s=n.type;return typeof s=="function"&&!Cf(s)&&s.defaultProps===void 0&&n.compare===null&&n.defaultProps===void 0?(e.tag=15,e.type=s,fg(t,e,s,i,r)):(t=Ca(n.type,null,i,e,e.mode,r),t.ref=e.ref,t.return=e,e.child=t)}if(s=t.child,!(t.lanes&r)){var o=s.memoizedProps;if(n=n.compare,n=n!==null?n:uo,n(o,i)&&t.ref===e.ref)return fi(t,e,r)}return e.flags|=1,t=Fi(s,i),t.ref=e.ref,t.return=e,e.child=t}function fg(t,e,n,i,r){if(t!==null){var s=t.memoizedProps;if(uo(s,i)&&t.ref===e.ref)if(Zt=!1,e.pendingProps=i=s,(t.lanes&r)!==0)t.flags&131072&&(Zt=!0);else return e.lanes=t.lanes,fi(t,e,r)}return mc(t,e,n,i,r)}function dg(t,e,n){var i=e.pendingProps,r=i.children,s=t!==null?t.memoizedState:null;if(i.mode==="hidden")if(!(e.mode&1))e.memoizedState={baseLanes:0,cachePool:null,transitions:null},Je(Jr,an),an|=n;else{if(!(n&1073741824))return t=s!==null?s.baseLanes|n:n,e.lanes=e.childLanes=1073741824,e.memoizedState={baseLanes:t,cachePool:null,transitions:null},e.updateQueue=null,Je(Jr,an),an|=t,null;e.memoizedState={baseLanes:0,cachePool:null,transitions:null},i=s!==null?s.baseLanes:n,Je(Jr,an),an|=i}else s!==null?(i=s.baseLanes|n,e.memoizedState=null):i=n,Je(Jr,an),an|=i;return Gt(t,e,r,n),e.child}function hg(t,e){var n=e.ref;(t===null&&n!==null||t!==null&&t.ref!==n)&&(e.flags|=512,e.flags|=2097152)}function mc(t,e,n,i,r){var s=Jt(n)?mr:kt.current;return s=ds(e,s),os(e,r),n=_f(t,e,n,i,s,r),i=vf(),t!==null&&!Zt?(e.updateQueue=t.updateQueue,e.flags&=-2053,t.lanes&=~r,fi(t,e,r)):(rt&&i&&sf(e),e.flags|=1,Gt(t,e,n,r),e.child)}function Bd(t,e,n,i,r){if(Jt(n)){var s=!0;Ba(e)}else s=!1;if(os(e,r),e.stateNode===null)wa(t,e),lg(e,n,i),hc(e,n,i,r),i=!0;else if(t===null){var o=e.stateNode,a=e.memoizedProps;o.props=a;var l=o.context,u=n.contextType;typeof u=="object"&&u!==null?u=Mn(u):(u=Jt(n)?mr:kt.current,u=ds(e,u));var f=n.getDerivedStateFromProps,d=typeof f=="function"||typeof o.getSnapshotBeforeUpdate=="function";d||typeof o.UNSAFE_componentWillReceiveProps!="function"&&typeof o.componentWillReceiveProps!="function"||(a!==i||l!==u)&&Nd(e,o,i,u),Mi=!1;var h=e.memoizedState;o.state=h,Xa(e,i,o,r),l=e.memoizedState,a!==i||h!==l||Qt.current||Mi?(typeof f=="function"&&(dc(e,n,f,i),l=e.memoizedState),(a=Mi||Ud(e,n,a,i,h,l,u))?(d||typeof o.UNSAFE_componentWillMount!="function"&&typeof o.componentWillMount!="function"||(typeof o.componentWillMount=="function"&&o.componentWillMount(),typeof o.UNSAFE_componentWillMount=="function"&&o.UNSAFE_componentWillMount()),typeof o.componentDidMount=="function"&&(e.flags|=4194308)):(typeof o.componentDidMount=="function"&&(e.flags|=4194308),e.memoizedProps=i,e.memoizedState=l),o.props=i,o.state=l,o.context=u,i=a):(typeof o.componentDidMount=="function"&&(e.flags|=4194308),i=!1)}else{o=e.stateNode,Hm(t,e),a=e.memoizedProps,u=e.type===e.elementType?a:Cn(e.type,a),o.props=u,d=e.pendingProps,h=o.context,l=n.contextType,typeof l=="object"&&l!==null?l=Mn(l):(l=Jt(n)?mr:kt.current,l=ds(e,l));var m=n.getDerivedStateFromProps;(f=typeof m=="function"||typeof o.getSnapshotBeforeUpdate=="function")||typeof o.UNSAFE_componentWillReceiveProps!="function"&&typeof o.componentWillReceiveProps!="function"||(a!==d||h!==l)&&Nd(e,o,i,l),Mi=!1,h=e.memoizedState,o.state=h,Xa(e,i,o,r);var v=e.memoizedState;a!==d||h!==v||Qt.current||Mi?(typeof m=="function"&&(dc(e,n,m,i),v=e.memoizedState),(u=Mi||Ud(e,n,u,i,h,v,l)||!1)?(f||typeof o.UNSAFE_componentWillUpdate!="function"&&typeof o.componentWillUpdate!="function"||(typeof o.componentWillUpdate=="function"&&o.componentWillUpdate(i,v,l),typeof o.UNSAFE_componentWillUpdate=="function"&&o.UNSAFE_componentWillUpdate(i,v,l)),typeof o.componentDidUpdate=="function"&&(e.flags|=4),typeof o.getSnapshotBeforeUpdate=="function"&&(e.flags|=1024)):(typeof o.componentDidUpdate!="function"||a===t.memoizedProps&&h===t.memoizedState||(e.flags|=4),typeof o.getSnapshotBeforeUpdate!="function"||a===t.memoizedProps&&h===t.memoizedState||(e.flags|=1024),e.memoizedProps=i,e.memoizedState=v),o.props=i,o.state=v,o.context=l,i=u):(typeof o.componentDidUpdate!="function"||a===t.memoizedProps&&h===t.memoizedState||(e.flags|=4),typeof o.getSnapshotBeforeUpdate!="function"||a===t.memoizedProps&&h===t.memoizedState||(e.flags|=1024),i=!1)}return gc(t,e,n,i,s,r)}function gc(t,e,n,i,r,s){hg(t,e);var o=(e.flags&128)!==0;if(!i&&!o)return r&&wd(e,n,!1),fi(t,e,s);i=e.stateNode,P0.current=e;var a=o&&typeof n.getDerivedStateFromError!="function"?null:i.render();return e.flags|=1,t!==null&&o?(e.child=ps(e,t.child,null,s),e.child=ps(e,null,a,s)):Gt(t,e,a,s),e.memoizedState=i.state,r&&wd(e,n,!0),e.child}function pg(t){var e=t.stateNode;e.pendingContext?Td(t,e.pendingContext,e.pendingContext!==e.context):e.context&&Td(t,e.context,!1),hf(t,e.containerInfo)}function Hd(t,e,n,i,r){return hs(),af(r),e.flags|=256,Gt(t,e,n,i),e.child}var _c={dehydrated:null,treeContext:null,retryLane:0};function vc(t){return{baseLanes:t,cachePool:null,transitions:null}}function mg(t,e,n){var i=e.pendingProps,r=at.current,s=!1,o=(e.flags&128)!==0,a;if((a=o)||(a=t!==null&&t.memoizedState===null?!1:(r&2)!==0),a?(s=!0,e.flags&=-129):(t===null||t.memoizedState!==null)&&(r|=1),Je(at,r&1),t===null)return cc(e),t=e.memoizedState,t!==null&&(t=t.dehydrated,t!==null)?(e.mode&1?t.data==="$!"?e.lanes=8:e.lanes=1073741824:e.lanes=1,null):(o=i.children,t=i.fallback,s?(i=e.mode,s=e.child,o={mode:"hidden",children:o},!(i&1)&&s!==null?(s.childLanes=0,s.pendingProps=o):s=_l(o,i,0,null),t=cr(t,i,n,null),s.return=e,t.return=e,s.sibling=t,e.child=s,e.child.memoizedState=vc(n),e.memoizedState=_c,t):yf(e,o));if(r=t.memoizedState,r!==null&&(a=r.dehydrated,a!==null))return L0(t,e,o,i,a,r,n);if(s){s=i.fallback,o=e.mode,r=t.child,a=r.sibling;var l={mode:"hidden",children:i.children};return!(o&1)&&e.child!==r?(i=e.child,i.childLanes=0,i.pendingProps=l,e.deletions=null):(i=Fi(r,l),i.subtreeFlags=r.subtreeFlags&14680064),a!==null?s=Fi(a,s):(s=cr(s,o,n,null),s.flags|=2),s.return=e,i.return=e,i.sibling=s,e.child=i,i=s,s=e.child,o=t.child.memoizedState,o=o===null?vc(n):{baseLanes:o.baseLanes|n,cachePool:null,transitions:o.transitions},s.memoizedState=o,s.childLanes=t.childLanes&~n,e.memoizedState=_c,i}return s=t.child,t=s.sibling,i=Fi(s,{mode:"visible",children:i.children}),!(e.mode&1)&&(i.lanes=n),i.return=e,i.sibling=null,t!==null&&(n=e.deletions,n===null?(e.deletions=[t],e.flags|=16):n.push(t)),e.child=i,e.memoizedState=null,i}function yf(t,e){return e=_l({mode:"visible",children:e},t.mode,0,null),e.return=t,t.child=e}function Xo(t,e,n,i){return i!==null&&af(i),ps(e,t.child,null,n),t=yf(e,e.pendingProps.children),t.flags|=2,e.memoizedState=null,t}function L0(t,e,n,i,r,s,o){if(n)return e.flags&256?(e.flags&=-257,i=Jl(Error(J(422))),Xo(t,e,o,i)):e.memoizedState!==null?(e.child=t.child,e.flags|=128,null):(s=i.fallback,r=e.mode,i=_l({mode:"visible",children:i.children},r,0,null),s=cr(s,r,o,null),s.flags|=2,i.return=e,s.return=e,i.sibling=s,e.child=i,e.mode&1&&ps(e,t.child,null,o),e.child.memoizedState=vc(o),e.memoizedState=_c,s);if(!(e.mode&1))return Xo(t,e,o,null);if(r.data==="$!"){if(i=r.nextSibling&&r.nextSibling.dataset,i)var a=i.dgst;return i=a,s=Error(J(419)),i=Jl(s,i,void 0),Xo(t,e,o,i)}if(a=(o&t.childLanes)!==0,Zt||a){if(i=At,i!==null){switch(o&-o){case 4:r=2;break;case 16:r=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:r=32;break;case 536870912:r=268435456;break;default:r=0}r=r&(i.suspendedLanes|o)?0:r,r!==0&&r!==s.retryLane&&(s.retryLane=r,ci(t,r),In(i,t,r,-1))}return Rf(),i=Jl(Error(J(421))),Xo(t,e,o,i)}return r.data==="$?"?(e.flags|=128,e.child=t.child,e=V0.bind(null,t),r._reactRetry=e,null):(t=s.treeContext,ln=Di(r.nextSibling),un=e,rt=!0,Ln=null,t!==null&&(gn[_n++]=ri,gn[_n++]=si,gn[_n++]=gr,ri=t.id,si=t.overflow,gr=e),e=yf(e,i.children),e.flags|=4096,e)}function Gd(t,e,n){t.lanes|=e;var i=t.alternate;i!==null&&(i.lanes|=e),fc(t.return,e,n)}function eu(t,e,n,i,r){var s=t.memoizedState;s===null?t.memoizedState={isBackwards:e,rendering:null,renderingStartTime:0,last:i,tail:n,tailMode:r}:(s.isBackwards=e,s.rendering=null,s.renderingStartTime=0,s.last=i,s.tail=n,s.tailMode=r)}function gg(t,e,n){var i=e.pendingProps,r=i.revealOrder,s=i.tail;if(Gt(t,e,i.children,n),i=at.current,i&2)i=i&1|2,e.flags|=128;else{if(t!==null&&t.flags&128)e:for(t=e.child;t!==null;){if(t.tag===13)t.memoizedState!==null&&Gd(t,n,e);else if(t.tag===19)Gd(t,n,e);else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break e;for(;t.sibling===null;){if(t.return===null||t.return===e)break e;t=t.return}t.sibling.return=t.return,t=t.sibling}i&=1}if(Je(at,i),!(e.mode&1))e.memoizedState=null;else switch(r){case"forwards":for(n=e.child,r=null;n!==null;)t=n.alternate,t!==null&&ja(t)===null&&(r=n),n=n.sibling;n=r,n===null?(r=e.child,e.child=null):(r=n.sibling,n.sibling=null),eu(e,!1,r,n,s);break;case"backwards":for(n=null,r=e.child,e.child=null;r!==null;){if(t=r.alternate,t!==null&&ja(t)===null){e.child=r;break}t=r.sibling,r.sibling=n,n=r,r=t}eu(e,!0,n,null,s);break;case"together":eu(e,!1,null,null,void 0);break;default:e.memoizedState=null}return e.child}function wa(t,e){!(e.mode&1)&&t!==null&&(t.alternate=null,e.alternate=null,e.flags|=2)}function fi(t,e,n){if(t!==null&&(e.dependencies=t.dependencies),vr|=e.lanes,!(n&e.childLanes))return null;if(t!==null&&e.child!==t.child)throw Error(J(153));if(e.child!==null){for(t=e.child,n=Fi(t,t.pendingProps),e.child=n,n.return=e;t.sibling!==null;)t=t.sibling,n=n.sibling=Fi(t,t.pendingProps),n.return=e;n.sibling=null}return e.child}function b0(t,e,n){switch(e.tag){case 3:pg(e),hs();break;case 5:Gm(e);break;case 1:Jt(e.type)&&Ba(e);break;case 4:hf(e,e.stateNode.containerInfo);break;case 10:var i=e.type._context,r=e.memoizedProps.value;Je(Va,i._currentValue),i._currentValue=r;break;case 13:if(i=e.memoizedState,i!==null)return i.dehydrated!==null?(Je(at,at.current&1),e.flags|=128,null):n&e.child.childLanes?mg(t,e,n):(Je(at,at.current&1),t=fi(t,e,n),t!==null?t.sibling:null);Je(at,at.current&1);break;case 19:if(i=(n&e.childLanes)!==0,t.flags&128){if(i)return gg(t,e,n);e.flags|=128}if(r=e.memoizedState,r!==null&&(r.rendering=null,r.tail=null,r.lastEffect=null),Je(at,at.current),i)break;return null;case 22:case 23:return e.lanes=0,dg(t,e,n)}return fi(t,e,n)}var _g,xc,vg,xg;_g=function(t,e){for(var n=e.child;n!==null;){if(n.tag===5||n.tag===6)t.appendChild(n.stateNode);else if(n.tag!==4&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===e)break;for(;n.sibling===null;){if(n.return===null||n.return===e)return;n=n.return}n.sibling.return=n.return,n=n.sibling}};xc=function(){};vg=function(t,e,n,i){var r=t.memoizedProps;if(r!==i){t=e.stateNode,ar(Wn.current);var s=null;switch(n){case"input":r=Hu(t,r),i=Hu(t,i),s=[];break;case"select":r=ut({},r,{value:void 0}),i=ut({},i,{value:void 0}),s=[];break;case"textarea":r=Wu(t,r),i=Wu(t,i),s=[];break;default:typeof r.onClick!="function"&&typeof i.onClick=="function"&&(t.onclick=za)}ju(n,i);var o;n=null;for(u in r)if(!i.hasOwnProperty(u)&&r.hasOwnProperty(u)&&r[u]!=null)if(u==="style"){var a=r[u];for(o in a)a.hasOwnProperty(o)&&(n||(n={}),n[o]="")}else u!=="dangerouslySetInnerHTML"&&u!=="children"&&u!=="suppressContentEditableWarning"&&u!=="suppressHydrationWarning"&&u!=="autoFocus"&&(no.hasOwnProperty(u)?s||(s=[]):(s=s||[]).push(u,null));for(u in i){var l=i[u];if(a=r!=null?r[u]:void 0,i.hasOwnProperty(u)&&l!==a&&(l!=null||a!=null))if(u==="style")if(a){for(o in a)!a.hasOwnProperty(o)||l&&l.hasOwnProperty(o)||(n||(n={}),n[o]="");for(o in l)l.hasOwnProperty(o)&&a[o]!==l[o]&&(n||(n={}),n[o]=l[o])}else n||(s||(s=[]),s.push(u,n)),n=l;else u==="dangerouslySetInnerHTML"?(l=l?l.__html:void 0,a=a?a.__html:void 0,l!=null&&a!==l&&(s=s||[]).push(u,l)):u==="children"?typeof l!="string"&&typeof l!="number"||(s=s||[]).push(u,""+l):u!=="suppressContentEditableWarning"&&u!=="suppressHydrationWarning"&&(no.hasOwnProperty(u)?(l!=null&&u==="onScroll"&&tt("scroll",t),s||a===l||(s=[])):(s=s||[]).push(u,l))}n&&(s=s||[]).push("style",n);var u=s;(e.updateQueue=u)&&(e.flags|=4)}};xg=function(t,e,n,i){n!==i&&(e.flags|=4)};function Is(t,e){if(!rt)switch(t.tailMode){case"hidden":e=t.tail;for(var n=null;e!==null;)e.alternate!==null&&(n=e),e=e.sibling;n===null?t.tail=null:n.sibling=null;break;case"collapsed":n=t.tail;for(var i=null;n!==null;)n.alternate!==null&&(i=n),n=n.sibling;i===null?e||t.tail===null?t.tail=null:t.tail.sibling=null:i.sibling=null}}function Nt(t){var e=t.alternate!==null&&t.alternate.child===t.child,n=0,i=0;if(e)for(var r=t.child;r!==null;)n|=r.lanes|r.childLanes,i|=r.subtreeFlags&14680064,i|=r.flags&14680064,r.return=t,r=r.sibling;else for(r=t.child;r!==null;)n|=r.lanes|r.childLanes,i|=r.subtreeFlags,i|=r.flags,r.return=t,r=r.sibling;return t.subtreeFlags|=i,t.childLanes=n,e}function D0(t,e,n){var i=e.pendingProps;switch(of(e),e.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return Nt(e),null;case 1:return Jt(e.type)&&ka(),Nt(e),null;case 3:return i=e.stateNode,ms(),it(Qt),it(kt),mf(),i.pendingContext&&(i.context=i.pendingContext,i.pendingContext=null),(t===null||t.child===null)&&(Vo(e)?e.flags|=4:t===null||t.memoizedState.isDehydrated&&!(e.flags&256)||(e.flags|=1024,Ln!==null&&(Rc(Ln),Ln=null))),xc(t,e),Nt(e),null;case 5:pf(e);var r=ar(mo.current);if(n=e.type,t!==null&&e.stateNode!=null)vg(t,e,n,i,r),t.ref!==e.ref&&(e.flags|=512,e.flags|=2097152);else{if(!i){if(e.stateNode===null)throw Error(J(166));return Nt(e),null}if(t=ar(Wn.current),Vo(e)){i=e.stateNode,n=e.type;var s=e.memoizedProps;switch(i[Hn]=e,i[ho]=s,t=(e.mode&1)!==0,n){case"dialog":tt("cancel",i),tt("close",i);break;case"iframe":case"object":case"embed":tt("load",i);break;case"video":case"audio":for(r=0;r<js.length;r++)tt(js[r],i);break;case"source":tt("error",i);break;case"img":case"image":case"link":tt("error",i),tt("load",i);break;case"details":tt("toggle",i);break;case"input":Zf(i,s),tt("invalid",i);break;case"select":i._wrapperState={wasMultiple:!!s.multiple},tt("invalid",i);break;case"textarea":Jf(i,s),tt("invalid",i)}ju(n,s),r=null;for(var o in s)if(s.hasOwnProperty(o)){var a=s[o];o==="children"?typeof a=="string"?i.textContent!==a&&(s.suppressHydrationWarning!==!0&&Go(i.textContent,a,t),r=["children",a]):typeof a=="number"&&i.textContent!==""+a&&(s.suppressHydrationWarning!==!0&&Go(i.textContent,a,t),r=["children",""+a]):no.hasOwnProperty(o)&&a!=null&&o==="onScroll"&&tt("scroll",i)}switch(n){case"input":No(i),Qf(i,s,!0);break;case"textarea":No(i),ed(i);break;case"select":case"option":break;default:typeof s.onClick=="function"&&(i.onclick=za)}i=r,e.updateQueue=i,i!==null&&(e.flags|=4)}else{o=r.nodeType===9?r:r.ownerDocument,t==="http://www.w3.org/1999/xhtml"&&(t=Yp(n)),t==="http://www.w3.org/1999/xhtml"?n==="script"?(t=o.createElement("div"),t.innerHTML="<script><\/script>",t=t.removeChild(t.firstChild)):typeof i.is=="string"?t=o.createElement(n,{is:i.is}):(t=o.createElement(n),n==="select"&&(o=t,i.multiple?o.multiple=!0:i.size&&(o.size=i.size))):t=o.createElementNS(t,n),t[Hn]=e,t[ho]=i,_g(t,e,!1,!1),e.stateNode=t;e:{switch(o=Yu(n,i),n){case"dialog":tt("cancel",t),tt("close",t),r=i;break;case"iframe":case"object":case"embed":tt("load",t),r=i;break;case"video":case"audio":for(r=0;r<js.length;r++)tt(js[r],t);r=i;break;case"source":tt("error",t),r=i;break;case"img":case"image":case"link":tt("error",t),tt("load",t),r=i;break;case"details":tt("toggle",t),r=i;break;case"input":Zf(t,i),r=Hu(t,i),tt("invalid",t);break;case"option":r=i;break;case"select":t._wrapperState={wasMultiple:!!i.multiple},r=ut({},i,{value:void 0}),tt("invalid",t);break;case"textarea":Jf(t,i),r=Wu(t,i),tt("invalid",t);break;default:r=i}ju(n,r),a=r;for(s in a)if(a.hasOwnProperty(s)){var l=a[s];s==="style"?Kp(t,l):s==="dangerouslySetInnerHTML"?(l=l?l.__html:void 0,l!=null&&qp(t,l)):s==="children"?typeof l=="string"?(n!=="textarea"||l!=="")&&io(t,l):typeof l=="number"&&io(t,""+l):s!=="suppressContentEditableWarning"&&s!=="suppressHydrationWarning"&&s!=="autoFocus"&&(no.hasOwnProperty(s)?l!=null&&s==="onScroll"&&tt("scroll",t):l!=null&&Wc(t,s,l,o))}switch(n){case"input":No(t),Qf(t,i,!1);break;case"textarea":No(t),ed(t);break;case"option":i.value!=null&&t.setAttribute("value",""+Bi(i.value));break;case"select":t.multiple=!!i.multiple,s=i.value,s!=null?ns(t,!!i.multiple,s,!1):i.defaultValue!=null&&ns(t,!!i.multiple,i.defaultValue,!0);break;default:typeof r.onClick=="function"&&(t.onclick=za)}switch(n){case"button":case"input":case"select":case"textarea":i=!!i.autoFocus;break e;case"img":i=!0;break e;default:i=!1}}i&&(e.flags|=4)}e.ref!==null&&(e.flags|=512,e.flags|=2097152)}return Nt(e),null;case 6:if(t&&e.stateNode!=null)xg(t,e,t.memoizedProps,i);else{if(typeof i!="string"&&e.stateNode===null)throw Error(J(166));if(n=ar(mo.current),ar(Wn.current),Vo(e)){if(i=e.stateNode,n=e.memoizedProps,i[Hn]=e,(s=i.nodeValue!==n)&&(t=un,t!==null))switch(t.tag){case 3:Go(i.nodeValue,n,(t.mode&1)!==0);break;case 5:t.memoizedProps.suppressHydrationWarning!==!0&&Go(i.nodeValue,n,(t.mode&1)!==0)}s&&(e.flags|=4)}else i=(n.nodeType===9?n:n.ownerDocument).createTextNode(i),i[Hn]=e,e.stateNode=i}return Nt(e),null;case 13:if(it(at),i=e.memoizedState,t===null||t.memoizedState!==null&&t.memoizedState.dehydrated!==null){if(rt&&ln!==null&&e.mode&1&&!(e.flags&128))Om(),hs(),e.flags|=98560,s=!1;else if(s=Vo(e),i!==null&&i.dehydrated!==null){if(t===null){if(!s)throw Error(J(318));if(s=e.memoizedState,s=s!==null?s.dehydrated:null,!s)throw Error(J(317));s[Hn]=e}else hs(),!(e.flags&128)&&(e.memoizedState=null),e.flags|=4;Nt(e),s=!1}else Ln!==null&&(Rc(Ln),Ln=null),s=!0;if(!s)return e.flags&65536?e:null}return e.flags&128?(e.lanes=n,e):(i=i!==null,i!==(t!==null&&t.memoizedState!==null)&&i&&(e.child.flags|=8192,e.mode&1&&(t===null||at.current&1?_t===0&&(_t=3):Rf())),e.updateQueue!==null&&(e.flags|=4),Nt(e),null);case 4:return ms(),xc(t,e),t===null&&co(e.stateNode.containerInfo),Nt(e),null;case 10:return cf(e.type._context),Nt(e),null;case 17:return Jt(e.type)&&ka(),Nt(e),null;case 19:if(it(at),s=e.memoizedState,s===null)return Nt(e),null;if(i=(e.flags&128)!==0,o=s.rendering,o===null)if(i)Is(s,!1);else{if(_t!==0||t!==null&&t.flags&128)for(t=e.child;t!==null;){if(o=ja(t),o!==null){for(e.flags|=128,Is(s,!1),i=o.updateQueue,i!==null&&(e.updateQueue=i,e.flags|=4),e.subtreeFlags=0,i=n,n=e.child;n!==null;)s=n,t=i,s.flags&=14680066,o=s.alternate,o===null?(s.childLanes=0,s.lanes=t,s.child=null,s.subtreeFlags=0,s.memoizedProps=null,s.memoizedState=null,s.updateQueue=null,s.dependencies=null,s.stateNode=null):(s.childLanes=o.childLanes,s.lanes=o.lanes,s.child=o.child,s.subtreeFlags=0,s.deletions=null,s.memoizedProps=o.memoizedProps,s.memoizedState=o.memoizedState,s.updateQueue=o.updateQueue,s.type=o.type,t=o.dependencies,s.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext}),n=n.sibling;return Je(at,at.current&1|2),e.child}t=t.sibling}s.tail!==null&&ht()>_s&&(e.flags|=128,i=!0,Is(s,!1),e.lanes=4194304)}else{if(!i)if(t=ja(o),t!==null){if(e.flags|=128,i=!0,n=t.updateQueue,n!==null&&(e.updateQueue=n,e.flags|=4),Is(s,!0),s.tail===null&&s.tailMode==="hidden"&&!o.alternate&&!rt)return Nt(e),null}else 2*ht()-s.renderingStartTime>_s&&n!==1073741824&&(e.flags|=128,i=!0,Is(s,!1),e.lanes=4194304);s.isBackwards?(o.sibling=e.child,e.child=o):(n=s.last,n!==null?n.sibling=o:e.child=o,s.last=o)}return s.tail!==null?(e=s.tail,s.rendering=e,s.tail=e.sibling,s.renderingStartTime=ht(),e.sibling=null,n=at.current,Je(at,i?n&1|2:n&1),e):(Nt(e),null);case 22:case 23:return Af(),i=e.memoizedState!==null,t!==null&&t.memoizedState!==null!==i&&(e.flags|=8192),i&&e.mode&1?an&1073741824&&(Nt(e),e.subtreeFlags&6&&(e.flags|=8192)):Nt(e),null;case 24:return null;case 25:return null}throw Error(J(156,e.tag))}function U0(t,e){switch(of(e),e.tag){case 1:return Jt(e.type)&&ka(),t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 3:return ms(),it(Qt),it(kt),mf(),t=e.flags,t&65536&&!(t&128)?(e.flags=t&-65537|128,e):null;case 5:return pf(e),null;case 13:if(it(at),t=e.memoizedState,t!==null&&t.dehydrated!==null){if(e.alternate===null)throw Error(J(340));hs()}return t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 19:return it(at),null;case 4:return ms(),null;case 10:return cf(e.type._context),null;case 22:case 23:return Af(),null;case 24:return null;default:return null}}var jo=!1,Ot=!1,N0=typeof WeakSet=="function"?WeakSet:Set,ue=null;function Qr(t,e){var n=t.ref;if(n!==null)if(typeof n=="function")try{n(null)}catch(i){ft(t,e,i)}else n.current=null}function Sc(t,e,n){try{n()}catch(i){ft(t,e,i)}}var Vd=!1;function I0(t,e){if(ic=Ia,t=Tm(),rf(t)){if("selectionStart"in t)var n={start:t.selectionStart,end:t.selectionEnd};else e:{n=(n=t.ownerDocument)&&n.defaultView||window;var i=n.getSelection&&n.getSelection();if(i&&i.rangeCount!==0){n=i.anchorNode;var r=i.anchorOffset,s=i.focusNode;i=i.focusOffset;try{n.nodeType,s.nodeType}catch{n=null;break e}var o=0,a=-1,l=-1,u=0,f=0,d=t,h=null;t:for(;;){for(var m;d!==n||r!==0&&d.nodeType!==3||(a=o+r),d!==s||i!==0&&d.nodeType!==3||(l=o+i),d.nodeType===3&&(o+=d.nodeValue.length),(m=d.firstChild)!==null;)h=d,d=m;for(;;){if(d===t)break t;if(h===n&&++u===r&&(a=o),h===s&&++f===i&&(l=o),(m=d.nextSibling)!==null)break;d=h,h=d.parentNode}d=m}n=a===-1||l===-1?null:{start:a,end:l}}else n=null}n=n||{start:0,end:0}}else n=null;for(rc={focusedElem:t,selectionRange:n},Ia=!1,ue=e;ue!==null;)if(e=ue,t=e.child,(e.subtreeFlags&1028)!==0&&t!==null)t.return=e,ue=t;else for(;ue!==null;){e=ue;try{var v=e.alternate;if(e.flags&1024)switch(e.tag){case 0:case 11:case 15:break;case 1:if(v!==null){var S=v.memoizedProps,p=v.memoizedState,c=e.stateNode,_=c.getSnapshotBeforeUpdate(e.elementType===e.type?S:Cn(e.type,S),p);c.__reactInternalSnapshotBeforeUpdate=_}break;case 3:var g=e.stateNode.containerInfo;g.nodeType===1?g.textContent="":g.nodeType===9&&g.documentElement&&g.removeChild(g.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(J(163))}}catch(M){ft(e,e.return,M)}if(t=e.sibling,t!==null){t.return=e.return,ue=t;break}ue=e.return}return v=Vd,Vd=!1,v}function Js(t,e,n){var i=e.updateQueue;if(i=i!==null?i.lastEffect:null,i!==null){var r=i=i.next;do{if((r.tag&t)===t){var s=r.destroy;r.destroy=void 0,s!==void 0&&Sc(e,n,s)}r=r.next}while(r!==i)}}function ml(t,e){if(e=e.updateQueue,e=e!==null?e.lastEffect:null,e!==null){var n=e=e.next;do{if((n.tag&t)===t){var i=n.create;n.destroy=i()}n=n.next}while(n!==e)}}function yc(t){var e=t.ref;if(e!==null){var n=t.stateNode;switch(t.tag){case 5:t=n;break;default:t=n}typeof e=="function"?e(t):e.current=t}}function Sg(t){var e=t.alternate;e!==null&&(t.alternate=null,Sg(e)),t.child=null,t.deletions=null,t.sibling=null,t.tag===5&&(e=t.stateNode,e!==null&&(delete e[Hn],delete e[ho],delete e[ac],delete e[_0],delete e[v0])),t.stateNode=null,t.return=null,t.dependencies=null,t.memoizedProps=null,t.memoizedState=null,t.pendingProps=null,t.stateNode=null,t.updateQueue=null}function yg(t){return t.tag===5||t.tag===3||t.tag===4}function Wd(t){e:for(;;){for(;t.sibling===null;){if(t.return===null||yg(t.return))return null;t=t.return}for(t.sibling.return=t.return,t=t.sibling;t.tag!==5&&t.tag!==6&&t.tag!==18;){if(t.flags&2||t.child===null||t.tag===4)continue e;t.child.return=t,t=t.child}if(!(t.flags&2))return t.stateNode}}function Mc(t,e,n){var i=t.tag;if(i===5||i===6)t=t.stateNode,e?n.nodeType===8?n.parentNode.insertBefore(t,e):n.insertBefore(t,e):(n.nodeType===8?(e=n.parentNode,e.insertBefore(t,n)):(e=n,e.appendChild(t)),n=n._reactRootContainer,n!=null||e.onclick!==null||(e.onclick=za));else if(i!==4&&(t=t.child,t!==null))for(Mc(t,e,n),t=t.sibling;t!==null;)Mc(t,e,n),t=t.sibling}function Ec(t,e,n){var i=t.tag;if(i===5||i===6)t=t.stateNode,e?n.insertBefore(t,e):n.appendChild(t);else if(i!==4&&(t=t.child,t!==null))for(Ec(t,e,n),t=t.sibling;t!==null;)Ec(t,e,n),t=t.sibling}var Pt=null,Pn=!1;function pi(t,e,n){for(n=n.child;n!==null;)Mg(t,e,n),n=n.sibling}function Mg(t,e,n){if(Vn&&typeof Vn.onCommitFiberUnmount=="function")try{Vn.onCommitFiberUnmount(al,n)}catch{}switch(n.tag){case 5:Ot||Qr(n,e);case 6:var i=Pt,r=Pn;Pt=null,pi(t,e,n),Pt=i,Pn=r,Pt!==null&&(Pn?(t=Pt,n=n.stateNode,t.nodeType===8?t.parentNode.removeChild(n):t.removeChild(n)):Pt.removeChild(n.stateNode));break;case 18:Pt!==null&&(Pn?(t=Pt,n=n.stateNode,t.nodeType===8?Yl(t.parentNode,n):t.nodeType===1&&Yl(t,n),ao(t)):Yl(Pt,n.stateNode));break;case 4:i=Pt,r=Pn,Pt=n.stateNode.containerInfo,Pn=!0,pi(t,e,n),Pt=i,Pn=r;break;case 0:case 11:case 14:case 15:if(!Ot&&(i=n.updateQueue,i!==null&&(i=i.lastEffect,i!==null))){r=i=i.next;do{var s=r,o=s.destroy;s=s.tag,o!==void 0&&(s&2||s&4)&&Sc(n,e,o),r=r.next}while(r!==i)}pi(t,e,n);break;case 1:if(!Ot&&(Qr(n,e),i=n.stateNode,typeof i.componentWillUnmount=="function"))try{i.props=n.memoizedProps,i.state=n.memoizedState,i.componentWillUnmount()}catch(a){ft(n,e,a)}pi(t,e,n);break;case 21:pi(t,e,n);break;case 22:n.mode&1?(Ot=(i=Ot)||n.memoizedState!==null,pi(t,e,n),Ot=i):pi(t,e,n);break;default:pi(t,e,n)}}function Xd(t){var e=t.updateQueue;if(e!==null){t.updateQueue=null;var n=t.stateNode;n===null&&(n=t.stateNode=new N0),e.forEach(function(i){var r=W0.bind(null,t,i);n.has(i)||(n.add(i),i.then(r,r))})}}function Tn(t,e){var n=e.deletions;if(n!==null)for(var i=0;i<n.length;i++){var r=n[i];try{var s=t,o=e,a=o;e:for(;a!==null;){switch(a.tag){case 5:Pt=a.stateNode,Pn=!1;break e;case 3:Pt=a.stateNode.containerInfo,Pn=!0;break e;case 4:Pt=a.stateNode.containerInfo,Pn=!0;break e}a=a.return}if(Pt===null)throw Error(J(160));Mg(s,o,r),Pt=null,Pn=!1;var l=r.alternate;l!==null&&(l.return=null),r.return=null}catch(u){ft(r,e,u)}}if(e.subtreeFlags&12854)for(e=e.child;e!==null;)Eg(e,t),e=e.sibling}function Eg(t,e){var n=t.alternate,i=t.flags;switch(t.tag){case 0:case 11:case 14:case 15:if(Tn(e,t),zn(t),i&4){try{Js(3,t,t.return),ml(3,t)}catch(S){ft(t,t.return,S)}try{Js(5,t,t.return)}catch(S){ft(t,t.return,S)}}break;case 1:Tn(e,t),zn(t),i&512&&n!==null&&Qr(n,n.return);break;case 5:if(Tn(e,t),zn(t),i&512&&n!==null&&Qr(n,n.return),t.flags&32){var r=t.stateNode;try{io(r,"")}catch(S){ft(t,t.return,S)}}if(i&4&&(r=t.stateNode,r!=null)){var s=t.memoizedProps,o=n!==null?n.memoizedProps:s,a=t.type,l=t.updateQueue;if(t.updateQueue=null,l!==null)try{a==="input"&&s.type==="radio"&&s.name!=null&&Xp(r,s),Yu(a,o);var u=Yu(a,s);for(o=0;o<l.length;o+=2){var f=l[o],d=l[o+1];f==="style"?Kp(r,d):f==="dangerouslySetInnerHTML"?qp(r,d):f==="children"?io(r,d):Wc(r,f,d,u)}switch(a){case"input":Gu(r,s);break;case"textarea":jp(r,s);break;case"select":var h=r._wrapperState.wasMultiple;r._wrapperState.wasMultiple=!!s.multiple;var m=s.value;m!=null?ns(r,!!s.multiple,m,!1):h!==!!s.multiple&&(s.defaultValue!=null?ns(r,!!s.multiple,s.defaultValue,!0):ns(r,!!s.multiple,s.multiple?[]:"",!1))}r[ho]=s}catch(S){ft(t,t.return,S)}}break;case 6:if(Tn(e,t),zn(t),i&4){if(t.stateNode===null)throw Error(J(162));r=t.stateNode,s=t.memoizedProps;try{r.nodeValue=s}catch(S){ft(t,t.return,S)}}break;case 3:if(Tn(e,t),zn(t),i&4&&n!==null&&n.memoizedState.isDehydrated)try{ao(e.containerInfo)}catch(S){ft(t,t.return,S)}break;case 4:Tn(e,t),zn(t);break;case 13:Tn(e,t),zn(t),r=t.child,r.flags&8192&&(s=r.memoizedState!==null,r.stateNode.isHidden=s,!s||r.alternate!==null&&r.alternate.memoizedState!==null||(Tf=ht())),i&4&&Xd(t);break;case 22:if(f=n!==null&&n.memoizedState!==null,t.mode&1?(Ot=(u=Ot)||f,Tn(e,t),Ot=u):Tn(e,t),zn(t),i&8192){if(u=t.memoizedState!==null,(t.stateNode.isHidden=u)&&!f&&t.mode&1)for(ue=t,f=t.child;f!==null;){for(d=ue=f;ue!==null;){switch(h=ue,m=h.child,h.tag){case 0:case 11:case 14:case 15:Js(4,h,h.return);break;case 1:Qr(h,h.return);var v=h.stateNode;if(typeof v.componentWillUnmount=="function"){i=h,n=h.return;try{e=i,v.props=e.memoizedProps,v.state=e.memoizedState,v.componentWillUnmount()}catch(S){ft(i,n,S)}}break;case 5:Qr(h,h.return);break;case 22:if(h.memoizedState!==null){Yd(d);continue}}m!==null?(m.return=h,ue=m):Yd(d)}f=f.sibling}e:for(f=null,d=t;;){if(d.tag===5){if(f===null){f=d;try{r=d.stateNode,u?(s=r.style,typeof s.setProperty=="function"?s.setProperty("display","none","important"):s.display="none"):(a=d.stateNode,l=d.memoizedProps.style,o=l!=null&&l.hasOwnProperty("display")?l.display:null,a.style.display=$p("display",o))}catch(S){ft(t,t.return,S)}}}else if(d.tag===6){if(f===null)try{d.stateNode.nodeValue=u?"":d.memoizedProps}catch(S){ft(t,t.return,S)}}else if((d.tag!==22&&d.tag!==23||d.memoizedState===null||d===t)&&d.child!==null){d.child.return=d,d=d.child;continue}if(d===t)break e;for(;d.sibling===null;){if(d.return===null||d.return===t)break e;f===d&&(f=null),d=d.return}f===d&&(f=null),d.sibling.return=d.return,d=d.sibling}}break;case 19:Tn(e,t),zn(t),i&4&&Xd(t);break;case 21:break;default:Tn(e,t),zn(t)}}function zn(t){var e=t.flags;if(e&2){try{e:{for(var n=t.return;n!==null;){if(yg(n)){var i=n;break e}n=n.return}throw Error(J(160))}switch(i.tag){case 5:var r=i.stateNode;i.flags&32&&(io(r,""),i.flags&=-33);var s=Wd(t);Ec(t,s,r);break;case 3:case 4:var o=i.stateNode.containerInfo,a=Wd(t);Mc(t,a,o);break;default:throw Error(J(161))}}catch(l){ft(t,t.return,l)}t.flags&=-3}e&4096&&(t.flags&=-4097)}function F0(t,e,n){ue=t,Tg(t)}function Tg(t,e,n){for(var i=(t.mode&1)!==0;ue!==null;){var r=ue,s=r.child;if(r.tag===22&&i){var o=r.memoizedState!==null||jo;if(!o){var a=r.alternate,l=a!==null&&a.memoizedState!==null||Ot;a=jo;var u=Ot;if(jo=o,(Ot=l)&&!u)for(ue=r;ue!==null;)o=ue,l=o.child,o.tag===22&&o.memoizedState!==null?qd(r):l!==null?(l.return=o,ue=l):qd(r);for(;s!==null;)ue=s,Tg(s),s=s.sibling;ue=r,jo=a,Ot=u}jd(t)}else r.subtreeFlags&8772&&s!==null?(s.return=r,ue=s):jd(t)}}function jd(t){for(;ue!==null;){var e=ue;if(e.flags&8772){var n=e.alternate;try{if(e.flags&8772)switch(e.tag){case 0:case 11:case 15:Ot||ml(5,e);break;case 1:var i=e.stateNode;if(e.flags&4&&!Ot)if(n===null)i.componentDidMount();else{var r=e.elementType===e.type?n.memoizedProps:Cn(e.type,n.memoizedProps);i.componentDidUpdate(r,n.memoizedState,i.__reactInternalSnapshotBeforeUpdate)}var s=e.updateQueue;s!==null&&Ld(e,s,i);break;case 3:var o=e.updateQueue;if(o!==null){if(n=null,e.child!==null)switch(e.child.tag){case 5:n=e.child.stateNode;break;case 1:n=e.child.stateNode}Ld(e,o,n)}break;case 5:var a=e.stateNode;if(n===null&&e.flags&4){n=a;var l=e.memoizedProps;switch(e.type){case"button":case"input":case"select":case"textarea":l.autoFocus&&n.focus();break;case"img":l.src&&(n.src=l.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(e.memoizedState===null){var u=e.alternate;if(u!==null){var f=u.memoizedState;if(f!==null){var d=f.dehydrated;d!==null&&ao(d)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(J(163))}Ot||e.flags&512&&yc(e)}catch(h){ft(e,e.return,h)}}if(e===t){ue=null;break}if(n=e.sibling,n!==null){n.return=e.return,ue=n;break}ue=e.return}}function Yd(t){for(;ue!==null;){var e=ue;if(e===t){ue=null;break}var n=e.sibling;if(n!==null){n.return=e.return,ue=n;break}ue=e.return}}function qd(t){for(;ue!==null;){var e=ue;try{switch(e.tag){case 0:case 11:case 15:var n=e.return;try{ml(4,e)}catch(l){ft(e,n,l)}break;case 1:var i=e.stateNode;if(typeof i.componentDidMount=="function"){var r=e.return;try{i.componentDidMount()}catch(l){ft(e,r,l)}}var s=e.return;try{yc(e)}catch(l){ft(e,s,l)}break;case 5:var o=e.return;try{yc(e)}catch(l){ft(e,o,l)}}}catch(l){ft(e,e.return,l)}if(e===t){ue=null;break}var a=e.sibling;if(a!==null){a.return=e.return,ue=a;break}ue=e.return}}var O0=Math.ceil,$a=hi.ReactCurrentDispatcher,Mf=hi.ReactCurrentOwner,yn=hi.ReactCurrentBatchConfig,He=0,At=null,mt=null,Lt=0,an=0,Jr=Xi(0),_t=0,xo=null,vr=0,gl=0,Ef=0,eo=null,$t=null,Tf=0,_s=1/0,ei=null,Ka=!1,Tc=null,Ni=null,Yo=!1,Ri=null,Za=0,to=0,wc=null,Aa=-1,Ra=0;function Wt(){return He&6?ht():Aa!==-1?Aa:Aa=ht()}function Ii(t){return t.mode&1?He&2&&Lt!==0?Lt&-Lt:S0.transition!==null?(Ra===0&&(Ra=lm()),Ra):(t=Ye,t!==0||(t=window.event,t=t===void 0?16:mm(t.type)),t):1}function In(t,e,n,i){if(50<to)throw to=0,wc=null,Error(J(185));Mo(t,n,i),(!(He&2)||t!==At)&&(t===At&&(!(He&2)&&(gl|=n),_t===4&&wi(t,Lt)),en(t,i),n===1&&He===0&&!(e.mode&1)&&(_s=ht()+500,dl&&ji()))}function en(t,e){var n=t.callbackNode;Sv(t,e);var i=Na(t,t===At?Lt:0);if(i===0)n!==null&&id(n),t.callbackNode=null,t.callbackPriority=0;else if(e=i&-i,t.callbackPriority!==e){if(n!=null&&id(n),e===1)t.tag===0?x0($d.bind(null,t)):Nm($d.bind(null,t)),m0(function(){!(He&6)&&ji()}),n=null;else{switch(um(i)){case 1:n=$c;break;case 4:n=om;break;case 16:n=Ua;break;case 536870912:n=am;break;default:n=Ua}n=Dg(n,wg.bind(null,t))}t.callbackPriority=e,t.callbackNode=n}}function wg(t,e){if(Aa=-1,Ra=0,He&6)throw Error(J(327));var n=t.callbackNode;if(as()&&t.callbackNode!==n)return null;var i=Na(t,t===At?Lt:0);if(i===0)return null;if(i&30||i&t.expiredLanes||e)e=Qa(t,i);else{e=i;var r=He;He|=2;var s=Rg();(At!==t||Lt!==e)&&(ei=null,_s=ht()+500,ur(t,e));do try{B0();break}catch(a){Ag(t,a)}while(!0);uf(),$a.current=s,He=r,mt!==null?e=0:(At=null,Lt=0,e=_t)}if(e!==0){if(e===2&&(r=Qu(t),r!==0&&(i=r,e=Ac(t,r))),e===1)throw n=xo,ur(t,0),wi(t,i),en(t,ht()),n;if(e===6)wi(t,i);else{if(r=t.current.alternate,!(i&30)&&!z0(r)&&(e=Qa(t,i),e===2&&(s=Qu(t),s!==0&&(i=s,e=Ac(t,s))),e===1))throw n=xo,ur(t,0),wi(t,i),en(t,ht()),n;switch(t.finishedWork=r,t.finishedLanes=i,e){case 0:case 1:throw Error(J(345));case 2:er(t,$t,ei);break;case 3:if(wi(t,i),(i&130023424)===i&&(e=Tf+500-ht(),10<e)){if(Na(t,0)!==0)break;if(r=t.suspendedLanes,(r&i)!==i){Wt(),t.pingedLanes|=t.suspendedLanes&r;break}t.timeoutHandle=oc(er.bind(null,t,$t,ei),e);break}er(t,$t,ei);break;case 4:if(wi(t,i),(i&4194240)===i)break;for(e=t.eventTimes,r=-1;0<i;){var o=31-Nn(i);s=1<<o,o=e[o],o>r&&(r=o),i&=~s}if(i=r,i=ht()-i,i=(120>i?120:480>i?480:1080>i?1080:1920>i?1920:3e3>i?3e3:4320>i?4320:1960*O0(i/1960))-i,10<i){t.timeoutHandle=oc(er.bind(null,t,$t,ei),i);break}er(t,$t,ei);break;case 5:er(t,$t,ei);break;default:throw Error(J(329))}}}return en(t,ht()),t.callbackNode===n?wg.bind(null,t):null}function Ac(t,e){var n=eo;return t.current.memoizedState.isDehydrated&&(ur(t,e).flags|=256),t=Qa(t,e),t!==2&&(e=$t,$t=n,e!==null&&Rc(e)),t}function Rc(t){$t===null?$t=t:$t.push.apply($t,t)}function z0(t){for(var e=t;;){if(e.flags&16384){var n=e.updateQueue;if(n!==null&&(n=n.stores,n!==null))for(var i=0;i<n.length;i++){var r=n[i],s=r.getSnapshot;r=r.value;try{if(!Fn(s(),r))return!1}catch{return!1}}}if(n=e.child,e.subtreeFlags&16384&&n!==null)n.return=e,e=n;else{if(e===t)break;for(;e.sibling===null;){if(e.return===null||e.return===t)return!0;e=e.return}e.sibling.return=e.return,e=e.sibling}}return!0}function wi(t,e){for(e&=~Ef,e&=~gl,t.suspendedLanes|=e,t.pingedLanes&=~e,t=t.expirationTimes;0<e;){var n=31-Nn(e),i=1<<n;t[n]=-1,e&=~i}}function $d(t){if(He&6)throw Error(J(327));as();var e=Na(t,0);if(!(e&1))return en(t,ht()),null;var n=Qa(t,e);if(t.tag!==0&&n===2){var i=Qu(t);i!==0&&(e=i,n=Ac(t,i))}if(n===1)throw n=xo,ur(t,0),wi(t,e),en(t,ht()),n;if(n===6)throw Error(J(345));return t.finishedWork=t.current.alternate,t.finishedLanes=e,er(t,$t,ei),en(t,ht()),null}function wf(t,e){var n=He;He|=1;try{return t(e)}finally{He=n,He===0&&(_s=ht()+500,dl&&ji())}}function xr(t){Ri!==null&&Ri.tag===0&&!(He&6)&&as();var e=He;He|=1;var n=yn.transition,i=Ye;try{if(yn.transition=null,Ye=1,t)return t()}finally{Ye=i,yn.transition=n,He=e,!(He&6)&&ji()}}function Af(){an=Jr.current,it(Jr)}function ur(t,e){t.finishedWork=null,t.finishedLanes=0;var n=t.timeoutHandle;if(n!==-1&&(t.timeoutHandle=-1,p0(n)),mt!==null)for(n=mt.return;n!==null;){var i=n;switch(of(i),i.tag){case 1:i=i.type.childContextTypes,i!=null&&ka();break;case 3:ms(),it(Qt),it(kt),mf();break;case 5:pf(i);break;case 4:ms();break;case 13:it(at);break;case 19:it(at);break;case 10:cf(i.type._context);break;case 22:case 23:Af()}n=n.return}if(At=t,mt=t=Fi(t.current,null),Lt=an=e,_t=0,xo=null,Ef=gl=vr=0,$t=eo=null,or!==null){for(e=0;e<or.length;e++)if(n=or[e],i=n.interleaved,i!==null){n.interleaved=null;var r=i.next,s=n.pending;if(s!==null){var o=s.next;s.next=r,i.next=o}n.pending=i}or=null}return t}function Ag(t,e){do{var n=mt;try{if(uf(),Ea.current=qa,Ya){for(var i=lt.memoizedState;i!==null;){var r=i.queue;r!==null&&(r.pending=null),i=i.next}Ya=!1}if(_r=0,Et=gt=lt=null,Qs=!1,go=0,Mf.current=null,n===null||n.return===null){_t=1,xo=e,mt=null;break}e:{var s=t,o=n.return,a=n,l=e;if(e=Lt,a.flags|=32768,l!==null&&typeof l=="object"&&typeof l.then=="function"){var u=l,f=a,d=f.tag;if(!(f.mode&1)&&(d===0||d===11||d===15)){var h=f.alternate;h?(f.updateQueue=h.updateQueue,f.memoizedState=h.memoizedState,f.lanes=h.lanes):(f.updateQueue=null,f.memoizedState=null)}var m=Fd(o);if(m!==null){m.flags&=-257,Od(m,o,a,s,e),m.mode&1&&Id(s,u,e),e=m,l=u;var v=e.updateQueue;if(v===null){var S=new Set;S.add(l),e.updateQueue=S}else v.add(l);break e}else{if(!(e&1)){Id(s,u,e),Rf();break e}l=Error(J(426))}}else if(rt&&a.mode&1){var p=Fd(o);if(p!==null){!(p.flags&65536)&&(p.flags|=256),Od(p,o,a,s,e),af(gs(l,a));break e}}s=l=gs(l,a),_t!==4&&(_t=2),eo===null?eo=[s]:eo.push(s),s=o;do{switch(s.tag){case 3:s.flags|=65536,e&=-e,s.lanes|=e;var c=ug(s,l,e);Pd(s,c);break e;case 1:a=l;var _=s.type,g=s.stateNode;if(!(s.flags&128)&&(typeof _.getDerivedStateFromError=="function"||g!==null&&typeof g.componentDidCatch=="function"&&(Ni===null||!Ni.has(g)))){s.flags|=65536,e&=-e,s.lanes|=e;var M=cg(s,a,e);Pd(s,M);break e}}s=s.return}while(s!==null)}Pg(n)}catch(P){e=P,mt===n&&n!==null&&(mt=n=n.return);continue}break}while(!0)}function Rg(){var t=$a.current;return $a.current=qa,t===null?qa:t}function Rf(){(_t===0||_t===3||_t===2)&&(_t=4),At===null||!(vr&268435455)&&!(gl&268435455)||wi(At,Lt)}function Qa(t,e){var n=He;He|=2;var i=Rg();(At!==t||Lt!==e)&&(ei=null,ur(t,e));do try{k0();break}catch(r){Ag(t,r)}while(!0);if(uf(),He=n,$a.current=i,mt!==null)throw Error(J(261));return At=null,Lt=0,_t}function k0(){for(;mt!==null;)Cg(mt)}function B0(){for(;mt!==null&&!fv();)Cg(mt)}function Cg(t){var e=bg(t.alternate,t,an);t.memoizedProps=t.pendingProps,e===null?Pg(t):mt=e,Mf.current=null}function Pg(t){var e=t;do{var n=e.alternate;if(t=e.return,e.flags&32768){if(n=U0(n,e),n!==null){n.flags&=32767,mt=n;return}if(t!==null)t.flags|=32768,t.subtreeFlags=0,t.deletions=null;else{_t=6,mt=null;return}}else if(n=D0(n,e,an),n!==null){mt=n;return}if(e=e.sibling,e!==null){mt=e;return}mt=e=t}while(e!==null);_t===0&&(_t=5)}function er(t,e,n){var i=Ye,r=yn.transition;try{yn.transition=null,Ye=1,H0(t,e,n,i)}finally{yn.transition=r,Ye=i}return null}function H0(t,e,n,i){do as();while(Ri!==null);if(He&6)throw Error(J(327));n=t.finishedWork;var r=t.finishedLanes;if(n===null)return null;if(t.finishedWork=null,t.finishedLanes=0,n===t.current)throw Error(J(177));t.callbackNode=null,t.callbackPriority=0;var s=n.lanes|n.childLanes;if(yv(t,s),t===At&&(mt=At=null,Lt=0),!(n.subtreeFlags&2064)&&!(n.flags&2064)||Yo||(Yo=!0,Dg(Ua,function(){return as(),null})),s=(n.flags&15990)!==0,n.subtreeFlags&15990||s){s=yn.transition,yn.transition=null;var o=Ye;Ye=1;var a=He;He|=4,Mf.current=null,I0(t,n),Eg(n,t),a0(rc),Ia=!!ic,rc=ic=null,t.current=n,F0(n),dv(),He=a,Ye=o,yn.transition=s}else t.current=n;if(Yo&&(Yo=!1,Ri=t,Za=r),s=t.pendingLanes,s===0&&(Ni=null),mv(n.stateNode),en(t,ht()),e!==null)for(i=t.onRecoverableError,n=0;n<e.length;n++)r=e[n],i(r.value,{componentStack:r.stack,digest:r.digest});if(Ka)throw Ka=!1,t=Tc,Tc=null,t;return Za&1&&t.tag!==0&&as(),s=t.pendingLanes,s&1?t===wc?to++:(to=0,wc=t):to=0,ji(),null}function as(){if(Ri!==null){var t=um(Za),e=yn.transition,n=Ye;try{if(yn.transition=null,Ye=16>t?16:t,Ri===null)var i=!1;else{if(t=Ri,Ri=null,Za=0,He&6)throw Error(J(331));var r=He;for(He|=4,ue=t.current;ue!==null;){var s=ue,o=s.child;if(ue.flags&16){var a=s.deletions;if(a!==null){for(var l=0;l<a.length;l++){var u=a[l];for(ue=u;ue!==null;){var f=ue;switch(f.tag){case 0:case 11:case 15:Js(8,f,s)}var d=f.child;if(d!==null)d.return=f,ue=d;else for(;ue!==null;){f=ue;var h=f.sibling,m=f.return;if(Sg(f),f===u){ue=null;break}if(h!==null){h.return=m,ue=h;break}ue=m}}}var v=s.alternate;if(v!==null){var S=v.child;if(S!==null){v.child=null;do{var p=S.sibling;S.sibling=null,S=p}while(S!==null)}}ue=s}}if(s.subtreeFlags&2064&&o!==null)o.return=s,ue=o;else e:for(;ue!==null;){if(s=ue,s.flags&2048)switch(s.tag){case 0:case 11:case 15:Js(9,s,s.return)}var c=s.sibling;if(c!==null){c.return=s.return,ue=c;break e}ue=s.return}}var _=t.current;for(ue=_;ue!==null;){o=ue;var g=o.child;if(o.subtreeFlags&2064&&g!==null)g.return=o,ue=g;else e:for(o=_;ue!==null;){if(a=ue,a.flags&2048)try{switch(a.tag){case 0:case 11:case 15:ml(9,a)}}catch(P){ft(a,a.return,P)}if(a===o){ue=null;break e}var M=a.sibling;if(M!==null){M.return=a.return,ue=M;break e}ue=a.return}}if(He=r,ji(),Vn&&typeof Vn.onPostCommitFiberRoot=="function")try{Vn.onPostCommitFiberRoot(al,t)}catch{}i=!0}return i}finally{Ye=n,yn.transition=e}}return!1}function Kd(t,e,n){e=gs(n,e),e=ug(t,e,1),t=Ui(t,e,1),e=Wt(),t!==null&&(Mo(t,1,e),en(t,e))}function ft(t,e,n){if(t.tag===3)Kd(t,t,n);else for(;e!==null;){if(e.tag===3){Kd(e,t,n);break}else if(e.tag===1){var i=e.stateNode;if(typeof e.type.getDerivedStateFromError=="function"||typeof i.componentDidCatch=="function"&&(Ni===null||!Ni.has(i))){t=gs(n,t),t=cg(e,t,1),e=Ui(e,t,1),t=Wt(),e!==null&&(Mo(e,1,t),en(e,t));break}}e=e.return}}function G0(t,e,n){var i=t.pingCache;i!==null&&i.delete(e),e=Wt(),t.pingedLanes|=t.suspendedLanes&n,At===t&&(Lt&n)===n&&(_t===4||_t===3&&(Lt&130023424)===Lt&&500>ht()-Tf?ur(t,0):Ef|=n),en(t,e)}function Lg(t,e){e===0&&(t.mode&1?(e=Oo,Oo<<=1,!(Oo&130023424)&&(Oo=4194304)):e=1);var n=Wt();t=ci(t,e),t!==null&&(Mo(t,e,n),en(t,n))}function V0(t){var e=t.memoizedState,n=0;e!==null&&(n=e.retryLane),Lg(t,n)}function W0(t,e){var n=0;switch(t.tag){case 13:var i=t.stateNode,r=t.memoizedState;r!==null&&(n=r.retryLane);break;case 19:i=t.stateNode;break;default:throw Error(J(314))}i!==null&&i.delete(e),Lg(t,n)}var bg;bg=function(t,e,n){if(t!==null)if(t.memoizedProps!==e.pendingProps||Qt.current)Zt=!0;else{if(!(t.lanes&n)&&!(e.flags&128))return Zt=!1,b0(t,e,n);Zt=!!(t.flags&131072)}else Zt=!1,rt&&e.flags&1048576&&Im(e,Ga,e.index);switch(e.lanes=0,e.tag){case 2:var i=e.type;wa(t,e),t=e.pendingProps;var r=ds(e,kt.current);os(e,n),r=_f(null,e,i,t,r,n);var s=vf();return e.flags|=1,typeof r=="object"&&r!==null&&typeof r.render=="function"&&r.$$typeof===void 0?(e.tag=1,e.memoizedState=null,e.updateQueue=null,Jt(i)?(s=!0,Ba(e)):s=!1,e.memoizedState=r.state!==null&&r.state!==void 0?r.state:null,df(e),r.updater=pl,e.stateNode=r,r._reactInternals=e,hc(e,i,t,n),e=gc(null,e,i,!0,s,n)):(e.tag=0,rt&&s&&sf(e),Gt(null,e,r,n),e=e.child),e;case 16:i=e.elementType;e:{switch(wa(t,e),t=e.pendingProps,r=i._init,i=r(i._payload),e.type=i,r=e.tag=j0(i),t=Cn(i,t),r){case 0:e=mc(null,e,i,t,n);break e;case 1:e=Bd(null,e,i,t,n);break e;case 11:e=zd(null,e,i,t,n);break e;case 14:e=kd(null,e,i,Cn(i.type,t),n);break e}throw Error(J(306,i,""))}return e;case 0:return i=e.type,r=e.pendingProps,r=e.elementType===i?r:Cn(i,r),mc(t,e,i,r,n);case 1:return i=e.type,r=e.pendingProps,r=e.elementType===i?r:Cn(i,r),Bd(t,e,i,r,n);case 3:e:{if(pg(e),t===null)throw Error(J(387));i=e.pendingProps,s=e.memoizedState,r=s.element,Hm(t,e),Xa(e,i,null,n);var o=e.memoizedState;if(i=o.element,s.isDehydrated)if(s={element:i,isDehydrated:!1,cache:o.cache,pendingSuspenseBoundaries:o.pendingSuspenseBoundaries,transitions:o.transitions},e.updateQueue.baseState=s,e.memoizedState=s,e.flags&256){r=gs(Error(J(423)),e),e=Hd(t,e,i,n,r);break e}else if(i!==r){r=gs(Error(J(424)),e),e=Hd(t,e,i,n,r);break e}else for(ln=Di(e.stateNode.containerInfo.firstChild),un=e,rt=!0,Ln=null,n=km(e,null,i,n),e.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling;else{if(hs(),i===r){e=fi(t,e,n);break e}Gt(t,e,i,n)}e=e.child}return e;case 5:return Gm(e),t===null&&cc(e),i=e.type,r=e.pendingProps,s=t!==null?t.memoizedProps:null,o=r.children,sc(i,r)?o=null:s!==null&&sc(i,s)&&(e.flags|=32),hg(t,e),Gt(t,e,o,n),e.child;case 6:return t===null&&cc(e),null;case 13:return mg(t,e,n);case 4:return hf(e,e.stateNode.containerInfo),i=e.pendingProps,t===null?e.child=ps(e,null,i,n):Gt(t,e,i,n),e.child;case 11:return i=e.type,r=e.pendingProps,r=e.elementType===i?r:Cn(i,r),zd(t,e,i,r,n);case 7:return Gt(t,e,e.pendingProps,n),e.child;case 8:return Gt(t,e,e.pendingProps.children,n),e.child;case 12:return Gt(t,e,e.pendingProps.children,n),e.child;case 10:e:{if(i=e.type._context,r=e.pendingProps,s=e.memoizedProps,o=r.value,Je(Va,i._currentValue),i._currentValue=o,s!==null)if(Fn(s.value,o)){if(s.children===r.children&&!Qt.current){e=fi(t,e,n);break e}}else for(s=e.child,s!==null&&(s.return=e);s!==null;){var a=s.dependencies;if(a!==null){o=s.child;for(var l=a.firstContext;l!==null;){if(l.context===i){if(s.tag===1){l=ai(-1,n&-n),l.tag=2;var u=s.updateQueue;if(u!==null){u=u.shared;var f=u.pending;f===null?l.next=l:(l.next=f.next,f.next=l),u.pending=l}}s.lanes|=n,l=s.alternate,l!==null&&(l.lanes|=n),fc(s.return,n,e),a.lanes|=n;break}l=l.next}}else if(s.tag===10)o=s.type===e.type?null:s.child;else if(s.tag===18){if(o=s.return,o===null)throw Error(J(341));o.lanes|=n,a=o.alternate,a!==null&&(a.lanes|=n),fc(o,n,e),o=s.sibling}else o=s.child;if(o!==null)o.return=s;else for(o=s;o!==null;){if(o===e){o=null;break}if(s=o.sibling,s!==null){s.return=o.return,o=s;break}o=o.return}s=o}Gt(t,e,r.children,n),e=e.child}return e;case 9:return r=e.type,i=e.pendingProps.children,os(e,n),r=Mn(r),i=i(r),e.flags|=1,Gt(t,e,i,n),e.child;case 14:return i=e.type,r=Cn(i,e.pendingProps),r=Cn(i.type,r),kd(t,e,i,r,n);case 15:return fg(t,e,e.type,e.pendingProps,n);case 17:return i=e.type,r=e.pendingProps,r=e.elementType===i?r:Cn(i,r),wa(t,e),e.tag=1,Jt(i)?(t=!0,Ba(e)):t=!1,os(e,n),lg(e,i,r),hc(e,i,r,n),gc(null,e,i,!0,t,n);case 19:return gg(t,e,n);case 22:return dg(t,e,n)}throw Error(J(156,e.tag))};function Dg(t,e){return sm(t,e)}function X0(t,e,n,i){this.tag=t,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=e,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=i,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Sn(t,e,n,i){return new X0(t,e,n,i)}function Cf(t){return t=t.prototype,!(!t||!t.isReactComponent)}function j0(t){if(typeof t=="function")return Cf(t)?1:0;if(t!=null){if(t=t.$$typeof,t===jc)return 11;if(t===Yc)return 14}return 2}function Fi(t,e){var n=t.alternate;return n===null?(n=Sn(t.tag,e,t.key,t.mode),n.elementType=t.elementType,n.type=t.type,n.stateNode=t.stateNode,n.alternate=t,t.alternate=n):(n.pendingProps=e,n.type=t.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=t.flags&14680064,n.childLanes=t.childLanes,n.lanes=t.lanes,n.child=t.child,n.memoizedProps=t.memoizedProps,n.memoizedState=t.memoizedState,n.updateQueue=t.updateQueue,e=t.dependencies,n.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext},n.sibling=t.sibling,n.index=t.index,n.ref=t.ref,n}function Ca(t,e,n,i,r,s){var o=2;if(i=t,typeof t=="function")Cf(t)&&(o=1);else if(typeof t=="string")o=5;else e:switch(t){case Vr:return cr(n.children,r,s,e);case Xc:o=8,r|=8;break;case Ou:return t=Sn(12,n,e,r|2),t.elementType=Ou,t.lanes=s,t;case zu:return t=Sn(13,n,e,r),t.elementType=zu,t.lanes=s,t;case ku:return t=Sn(19,n,e,r),t.elementType=ku,t.lanes=s,t;case Gp:return _l(n,r,s,e);default:if(typeof t=="object"&&t!==null)switch(t.$$typeof){case Bp:o=10;break e;case Hp:o=9;break e;case jc:o=11;break e;case Yc:o=14;break e;case yi:o=16,i=null;break e}throw Error(J(130,t==null?t:typeof t,""))}return e=Sn(o,n,e,r),e.elementType=t,e.type=i,e.lanes=s,e}function cr(t,e,n,i){return t=Sn(7,t,i,e),t.lanes=n,t}function _l(t,e,n,i){return t=Sn(22,t,i,e),t.elementType=Gp,t.lanes=n,t.stateNode={isHidden:!1},t}function tu(t,e,n){return t=Sn(6,t,null,e),t.lanes=n,t}function nu(t,e,n){return e=Sn(4,t.children!==null?t.children:[],t.key,e),e.lanes=n,e.stateNode={containerInfo:t.containerInfo,pendingChildren:null,implementation:t.implementation},e}function Y0(t,e,n,i,r){this.tag=e,this.containerInfo=t,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=Fl(0),this.expirationTimes=Fl(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Fl(0),this.identifierPrefix=i,this.onRecoverableError=r,this.mutableSourceEagerHydrationData=null}function Pf(t,e,n,i,r,s,o,a,l){return t=new Y0(t,e,n,a,l),e===1?(e=1,s===!0&&(e|=8)):e=0,s=Sn(3,null,null,e),t.current=s,s.stateNode=t,s.memoizedState={element:i,isDehydrated:n,cache:null,transitions:null,pendingSuspenseBoundaries:null},df(s),t}function q0(t,e,n){var i=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:Gr,key:i==null?null:""+i,children:t,containerInfo:e,implementation:n}}function Ug(t){if(!t)return Hi;t=t._reactInternals;e:{if(Mr(t)!==t||t.tag!==1)throw Error(J(170));var e=t;do{switch(e.tag){case 3:e=e.stateNode.context;break e;case 1:if(Jt(e.type)){e=e.stateNode.__reactInternalMemoizedMergedChildContext;break e}}e=e.return}while(e!==null);throw Error(J(171))}if(t.tag===1){var n=t.type;if(Jt(n))return Um(t,n,e)}return e}function Ng(t,e,n,i,r,s,o,a,l){return t=Pf(n,i,!0,t,r,s,o,a,l),t.context=Ug(null),n=t.current,i=Wt(),r=Ii(n),s=ai(i,r),s.callback=e??null,Ui(n,s,r),t.current.lanes=r,Mo(t,r,i),en(t,i),t}function vl(t,e,n,i){var r=e.current,s=Wt(),o=Ii(r);return n=Ug(n),e.context===null?e.context=n:e.pendingContext=n,e=ai(s,o),e.payload={element:t},i=i===void 0?null:i,i!==null&&(e.callback=i),t=Ui(r,e,o),t!==null&&(In(t,r,o,s),Ma(t,r,o)),o}function Ja(t){if(t=t.current,!t.child)return null;switch(t.child.tag){case 5:return t.child.stateNode;default:return t.child.stateNode}}function Zd(t,e){if(t=t.memoizedState,t!==null&&t.dehydrated!==null){var n=t.retryLane;t.retryLane=n!==0&&n<e?n:e}}function Lf(t,e){Zd(t,e),(t=t.alternate)&&Zd(t,e)}function $0(){return null}var Ig=typeof reportError=="function"?reportError:function(t){console.error(t)};function bf(t){this._internalRoot=t}xl.prototype.render=bf.prototype.render=function(t){var e=this._internalRoot;if(e===null)throw Error(J(409));vl(t,e,null,null)};xl.prototype.unmount=bf.prototype.unmount=function(){var t=this._internalRoot;if(t!==null){this._internalRoot=null;var e=t.containerInfo;xr(function(){vl(null,t,null,null)}),e[ui]=null}};function xl(t){this._internalRoot=t}xl.prototype.unstable_scheduleHydration=function(t){if(t){var e=dm();t={blockedOn:null,target:t,priority:e};for(var n=0;n<Ti.length&&e!==0&&e<Ti[n].priority;n++);Ti.splice(n,0,t),n===0&&pm(t)}};function Df(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)}function Sl(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11&&(t.nodeType!==8||t.nodeValue!==" react-mount-point-unstable "))}function Qd(){}function K0(t,e,n,i,r){if(r){if(typeof i=="function"){var s=i;i=function(){var u=Ja(o);s.call(u)}}var o=Ng(e,i,t,0,null,!1,!1,"",Qd);return t._reactRootContainer=o,t[ui]=o.current,co(t.nodeType===8?t.parentNode:t),xr(),o}for(;r=t.lastChild;)t.removeChild(r);if(typeof i=="function"){var a=i;i=function(){var u=Ja(l);a.call(u)}}var l=Pf(t,0,!1,null,null,!1,!1,"",Qd);return t._reactRootContainer=l,t[ui]=l.current,co(t.nodeType===8?t.parentNode:t),xr(function(){vl(e,l,n,i)}),l}function yl(t,e,n,i,r){var s=n._reactRootContainer;if(s){var o=s;if(typeof r=="function"){var a=r;r=function(){var l=Ja(o);a.call(l)}}vl(e,o,t,r)}else o=K0(n,e,t,r,i);return Ja(o)}cm=function(t){switch(t.tag){case 3:var e=t.stateNode;if(e.current.memoizedState.isDehydrated){var n=Xs(e.pendingLanes);n!==0&&(Kc(e,n|1),en(e,ht()),!(He&6)&&(_s=ht()+500,ji()))}break;case 13:xr(function(){var i=ci(t,1);if(i!==null){var r=Wt();In(i,t,1,r)}}),Lf(t,1)}};Zc=function(t){if(t.tag===13){var e=ci(t,134217728);if(e!==null){var n=Wt();In(e,t,134217728,n)}Lf(t,134217728)}};fm=function(t){if(t.tag===13){var e=Ii(t),n=ci(t,e);if(n!==null){var i=Wt();In(n,t,e,i)}Lf(t,e)}};dm=function(){return Ye};hm=function(t,e){var n=Ye;try{return Ye=t,e()}finally{Ye=n}};$u=function(t,e,n){switch(e){case"input":if(Gu(t,n),e=n.name,n.type==="radio"&&e!=null){for(n=t;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll("input[name="+JSON.stringify(""+e)+'][type="radio"]'),e=0;e<n.length;e++){var i=n[e];if(i!==t&&i.form===t.form){var r=fl(i);if(!r)throw Error(J(90));Wp(i),Gu(i,r)}}}break;case"textarea":jp(t,n);break;case"select":e=n.value,e!=null&&ns(t,!!n.multiple,e,!1)}};Jp=wf;em=xr;var Z0={usingClientEntryPoint:!1,Events:[To,Yr,fl,Zp,Qp,wf]},Fs={findFiberByHostInstance:sr,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},Q0={bundleType:Fs.bundleType,version:Fs.version,rendererPackageName:Fs.rendererPackageName,rendererConfig:Fs.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:hi.ReactCurrentDispatcher,findHostInstanceByFiber:function(t){return t=im(t),t===null?null:t.stateNode},findFiberByHostInstance:Fs.findFiberByHostInstance||$0,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var qo=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!qo.isDisabled&&qo.supportsFiber)try{al=qo.inject(Q0),Vn=qo}catch{}}fn.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=Z0;fn.createPortal=function(t,e){var n=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!Df(e))throw Error(J(200));return q0(t,e,null,n)};fn.createRoot=function(t,e){if(!Df(t))throw Error(J(299));var n=!1,i="",r=Ig;return e!=null&&(e.unstable_strictMode===!0&&(n=!0),e.identifierPrefix!==void 0&&(i=e.identifierPrefix),e.onRecoverableError!==void 0&&(r=e.onRecoverableError)),e=Pf(t,1,!1,null,null,n,!1,i,r),t[ui]=e.current,co(t.nodeType===8?t.parentNode:t),new bf(e)};fn.findDOMNode=function(t){if(t==null)return null;if(t.nodeType===1)return t;var e=t._reactInternals;if(e===void 0)throw typeof t.render=="function"?Error(J(188)):(t=Object.keys(t).join(","),Error(J(268,t)));return t=im(e),t=t===null?null:t.stateNode,t};fn.flushSync=function(t){return xr(t)};fn.hydrate=function(t,e,n){if(!Sl(e))throw Error(J(200));return yl(null,t,e,!0,n)};fn.hydrateRoot=function(t,e,n){if(!Df(t))throw Error(J(405));var i=n!=null&&n.hydratedSources||null,r=!1,s="",o=Ig;if(n!=null&&(n.unstable_strictMode===!0&&(r=!0),n.identifierPrefix!==void 0&&(s=n.identifierPrefix),n.onRecoverableError!==void 0&&(o=n.onRecoverableError)),e=Ng(e,null,t,1,n??null,r,!1,s,o),t[ui]=e.current,co(t),i)for(t=0;t<i.length;t++)n=i[t],r=n._getVersion,r=r(n._source),e.mutableSourceEagerHydrationData==null?e.mutableSourceEagerHydrationData=[n,r]:e.mutableSourceEagerHydrationData.push(n,r);return new xl(e)};fn.render=function(t,e,n){if(!Sl(e))throw Error(J(200));return yl(null,t,e,!1,n)};fn.unmountComponentAtNode=function(t){if(!Sl(t))throw Error(J(40));return t._reactRootContainer?(xr(function(){yl(null,null,t,!1,function(){t._reactRootContainer=null,t[ui]=null})}),!0):!1};fn.unstable_batchedUpdates=wf;fn.unstable_renderSubtreeIntoContainer=function(t,e,n,i){if(!Sl(n))throw Error(J(200));if(t==null||t._reactInternals===void 0)throw Error(J(38));return yl(t,e,n,!1,i)};fn.version="18.3.1-next-f1338f8080-20240426";function Fg(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(Fg)}catch(t){console.error(t)}}Fg(),Fp.exports=fn;var J0=Fp.exports,Jd=J0;Iu.createRoot=Jd.createRoot,Iu.hydrateRoot=Jd.hydrateRoot;/**
 * @license
 * Copyright 2010-2023 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Uf="161",ex=0,eh=1,tx=2,Og=1,nx=2,Jn=3,Gi=0,tn=1,ni=2,Oi=0,ls=1,th=2,nh=3,ih=4,ix=5,ir=100,rx=101,sx=102,rh=103,sh=104,ox=200,ax=201,lx=202,ux=203,Cc=204,Pc=205,cx=206,fx=207,dx=208,hx=209,px=210,mx=211,gx=212,_x=213,vx=214,xx=0,Sx=1,yx=2,el=3,Mx=4,Ex=5,Tx=6,wx=7,zg=0,Ax=1,Rx=2,zi=0,Cx=1,Px=2,Lx=3,kg=4,bx=5,Dx=6,Bg=300,vs=301,xs=302,Lc=303,bc=304,Ml=306,Dc=1e3,bn=1001,Uc=1002,Vt=1003,oh=1004,Os=1005,qt=1006,iu=1007,lr=1008,ki=1009,Ux=1010,Nx=1011,Nf=1012,Hg=1013,Ci=1014,ii=1015,So=1016,Gg=1017,Vg=1018,fr=1020,Ix=1021,Dn=1023,Fx=1024,Ox=1025,dr=1026,Ss=1027,zx=1028,Wg=1029,kx=1030,Xg=1031,jg=1033,ru=33776,su=33777,ou=33778,au=33779,ah=35840,lh=35841,uh=35842,ch=35843,Yg=36196,fh=37492,dh=37496,hh=37808,ph=37809,mh=37810,gh=37811,_h=37812,vh=37813,xh=37814,Sh=37815,yh=37816,Mh=37817,Eh=37818,Th=37819,wh=37820,Ah=37821,lu=36492,Rh=36494,Ch=36495,Bx=36283,Ph=36284,Lh=36285,bh=36286,qg=3e3,hr=3001,Hx=3200,Gx=3201,$g=0,Vx=1,xn="",Tt="srgb",di="srgb-linear",If="display-p3",El="display-p3-linear",tl="linear",nt="srgb",nl="rec709",il="p3",wr=7680,Dh=519,Wx=512,Xx=513,jx=514,Kg=515,Yx=516,qx=517,$x=518,Kx=519,Uh=35044,Nh="300 es",Nc=1035,oi=2e3,rl=2001;class ws{addEventListener(e,n){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(n)===-1&&i[e].push(n)}hasEventListener(e,n){if(this._listeners===void 0)return!1;const i=this._listeners;return i[e]!==void 0&&i[e].indexOf(n)!==-1}removeEventListener(e,n){if(this._listeners===void 0)return;const r=this._listeners[e];if(r!==void 0){const s=r.indexOf(n);s!==-1&&r.splice(s,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const i=this._listeners[e.type];if(i!==void 0){e.target=this;const r=i.slice(0);for(let s=0,o=r.length;s<o;s++)r[s].call(this,e);e.target=null}}}const It=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],uu=Math.PI/180,Ic=180/Math.PI;function Ao(){const t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(It[t&255]+It[t>>8&255]+It[t>>16&255]+It[t>>24&255]+"-"+It[e&255]+It[e>>8&255]+"-"+It[e>>16&15|64]+It[e>>24&255]+"-"+It[n&63|128]+It[n>>8&255]+"-"+It[n>>16&255]+It[n>>24&255]+It[i&255]+It[i>>8&255]+It[i>>16&255]+It[i>>24&255]).toLowerCase()}function Kt(t,e,n){return Math.max(e,Math.min(n,t))}function Zx(t,e){return(t%e+e)%e}function cu(t,e,n){return(1-n)*t+n*e}function Ih(t){return(t&t-1)===0&&t!==0}function Fc(t){return Math.pow(2,Math.floor(Math.log(t)/Math.LN2))}function zs(t,e){switch(e.constructor){case Float32Array:return t;case Uint32Array:return t/4294967295;case Uint16Array:return t/65535;case Uint8Array:return t/255;case Int32Array:return Math.max(t/2147483647,-1);case Int16Array:return Math.max(t/32767,-1);case Int8Array:return Math.max(t/127,-1);default:throw new Error("Invalid component type.")}}function Yt(t,e){switch(e.constructor){case Float32Array:return t;case Uint32Array:return Math.round(t*4294967295);case Uint16Array:return Math.round(t*65535);case Uint8Array:return Math.round(t*255);case Int32Array:return Math.round(t*2147483647);case Int16Array:return Math.round(t*32767);case Int8Array:return Math.round(t*127);default:throw new Error("Invalid component type.")}}class Ge{constructor(e=0,n=0){Ge.prototype.isVector2=!0,this.x=e,this.y=n}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,n){return this.x=e,this.y=n,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const n=this.x,i=this.y,r=e.elements;return this.x=r[0]*n+r[3]*i+r[6],this.y=r[1]*n+r[4]*i+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,n){return this.x=Math.max(e.x,Math.min(n.x,this.x)),this.y=Math.max(e.y,Math.min(n.y,this.y)),this}clampScalar(e,n){return this.x=Math.max(e,Math.min(n,this.x)),this.y=Math.max(e,Math.min(n,this.y)),this}clampLength(e,n){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(n,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const n=Math.sqrt(this.lengthSq()*e.lengthSq());if(n===0)return Math.PI/2;const i=this.dot(e)/n;return Math.acos(Kt(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const n=this.x-e.x,i=this.y-e.y;return n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this}lerpVectors(e,n,i){return this.x=e.x+(n.x-e.x)*i,this.y=e.y+(n.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this}rotateAround(e,n){const i=Math.cos(n),r=Math.sin(n),s=this.x-e.x,o=this.y-e.y;return this.x=s*i-o*r+e.x,this.y=s*r+o*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Oe{constructor(e,n,i,r,s,o,a,l,u){Oe.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,n,i,r,s,o,a,l,u)}set(e,n,i,r,s,o,a,l,u){const f=this.elements;return f[0]=e,f[1]=r,f[2]=a,f[3]=n,f[4]=s,f[5]=l,f[6]=i,f[7]=o,f[8]=u,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const n=this.elements,i=e.elements;return n[0]=i[0],n[1]=i[1],n[2]=i[2],n[3]=i[3],n[4]=i[4],n[5]=i[5],n[6]=i[6],n[7]=i[7],n[8]=i[8],this}extractBasis(e,n,i){return e.setFromMatrix3Column(this,0),n.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const n=e.elements;return this.set(n[0],n[4],n[8],n[1],n[5],n[9],n[2],n[6],n[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,n){const i=e.elements,r=n.elements,s=this.elements,o=i[0],a=i[3],l=i[6],u=i[1],f=i[4],d=i[7],h=i[2],m=i[5],v=i[8],S=r[0],p=r[3],c=r[6],_=r[1],g=r[4],M=r[7],P=r[2],R=r[5],w=r[8];return s[0]=o*S+a*_+l*P,s[3]=o*p+a*g+l*R,s[6]=o*c+a*M+l*w,s[1]=u*S+f*_+d*P,s[4]=u*p+f*g+d*R,s[7]=u*c+f*M+d*w,s[2]=h*S+m*_+v*P,s[5]=h*p+m*g+v*R,s[8]=h*c+m*M+v*w,this}multiplyScalar(e){const n=this.elements;return n[0]*=e,n[3]*=e,n[6]*=e,n[1]*=e,n[4]*=e,n[7]*=e,n[2]*=e,n[5]*=e,n[8]*=e,this}determinant(){const e=this.elements,n=e[0],i=e[1],r=e[2],s=e[3],o=e[4],a=e[5],l=e[6],u=e[7],f=e[8];return n*o*f-n*a*u-i*s*f+i*a*l+r*s*u-r*o*l}invert(){const e=this.elements,n=e[0],i=e[1],r=e[2],s=e[3],o=e[4],a=e[5],l=e[6],u=e[7],f=e[8],d=f*o-a*u,h=a*l-f*s,m=u*s-o*l,v=n*d+i*h+r*m;if(v===0)return this.set(0,0,0,0,0,0,0,0,0);const S=1/v;return e[0]=d*S,e[1]=(r*u-f*i)*S,e[2]=(a*i-r*o)*S,e[3]=h*S,e[4]=(f*n-r*l)*S,e[5]=(r*s-a*n)*S,e[6]=m*S,e[7]=(i*l-u*n)*S,e[8]=(o*n-i*s)*S,this}transpose(){let e;const n=this.elements;return e=n[1],n[1]=n[3],n[3]=e,e=n[2],n[2]=n[6],n[6]=e,e=n[5],n[5]=n[7],n[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const n=this.elements;return e[0]=n[0],e[1]=n[3],e[2]=n[6],e[3]=n[1],e[4]=n[4],e[5]=n[7],e[6]=n[2],e[7]=n[5],e[8]=n[8],this}setUvTransform(e,n,i,r,s,o,a){const l=Math.cos(s),u=Math.sin(s);return this.set(i*l,i*u,-i*(l*o+u*a)+o+e,-r*u,r*l,-r*(-u*o+l*a)+a+n,0,0,1),this}scale(e,n){return this.premultiply(fu.makeScale(e,n)),this}rotate(e){return this.premultiply(fu.makeRotation(-e)),this}translate(e,n){return this.premultiply(fu.makeTranslation(e,n)),this}makeTranslation(e,n){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,n,0,0,1),this}makeRotation(e){const n=Math.cos(e),i=Math.sin(e);return this.set(n,-i,0,i,n,0,0,0,1),this}makeScale(e,n){return this.set(e,0,0,0,n,0,0,0,1),this}equals(e){const n=this.elements,i=e.elements;for(let r=0;r<9;r++)if(n[r]!==i[r])return!1;return!0}fromArray(e,n=0){for(let i=0;i<9;i++)this.elements[i]=e[i+n];return this}toArray(e=[],n=0){const i=this.elements;return e[n]=i[0],e[n+1]=i[1],e[n+2]=i[2],e[n+3]=i[3],e[n+4]=i[4],e[n+5]=i[5],e[n+6]=i[6],e[n+7]=i[7],e[n+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const fu=new Oe;function Zg(t){for(let e=t.length-1;e>=0;--e)if(t[e]>=65535)return!0;return!1}function sl(t){return document.createElementNS("http://www.w3.org/1999/xhtml",t)}function Qx(){const t=sl("canvas");return t.style.display="block",t}const Fh={};function us(t){t in Fh||(Fh[t]=!0,console.warn(t))}const Oh=new Oe().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),zh=new Oe().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),$o={[di]:{transfer:tl,primaries:nl,toReference:t=>t,fromReference:t=>t},[Tt]:{transfer:nt,primaries:nl,toReference:t=>t.convertSRGBToLinear(),fromReference:t=>t.convertLinearToSRGB()},[El]:{transfer:tl,primaries:il,toReference:t=>t.applyMatrix3(zh),fromReference:t=>t.applyMatrix3(Oh)},[If]:{transfer:nt,primaries:il,toReference:t=>t.convertSRGBToLinear().applyMatrix3(zh),fromReference:t=>t.applyMatrix3(Oh).convertLinearToSRGB()}},Jx=new Set([di,El]),$e={enabled:!0,_workingColorSpace:di,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(t){if(!Jx.has(t))throw new Error(`Unsupported working color space, "${t}".`);this._workingColorSpace=t},convert:function(t,e,n){if(this.enabled===!1||e===n||!e||!n)return t;const i=$o[e].toReference,r=$o[n].fromReference;return r(i(t))},fromWorkingColorSpace:function(t,e){return this.convert(t,this._workingColorSpace,e)},toWorkingColorSpace:function(t,e){return this.convert(t,e,this._workingColorSpace)},getPrimaries:function(t){return $o[t].primaries},getTransfer:function(t){return t===xn?tl:$o[t].transfer}};function cs(t){return t<.04045?t*.0773993808:Math.pow(t*.9478672986+.0521327014,2.4)}function du(t){return t<.0031308?t*12.92:1.055*Math.pow(t,.41666)-.055}let Ar;class Qg{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{Ar===void 0&&(Ar=sl("canvas")),Ar.width=e.width,Ar.height=e.height;const i=Ar.getContext("2d");e instanceof ImageData?i.putImageData(e,0,0):i.drawImage(e,0,0,e.width,e.height),n=Ar}return n.width>2048||n.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),n.toDataURL("image/jpeg",.6)):n.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const n=sl("canvas");n.width=e.width,n.height=e.height;const i=n.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const r=i.getImageData(0,0,e.width,e.height),s=r.data;for(let o=0;o<s.length;o++)s[o]=cs(s[o]/255)*255;return i.putImageData(r,0,0),n}else if(e.data){const n=e.data.slice(0);for(let i=0;i<n.length;i++)n instanceof Uint8Array||n instanceof Uint8ClampedArray?n[i]=Math.floor(cs(n[i]/255)*255):n[i]=cs(n[i]);return{data:n,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let eS=0;class Jg{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:eS++}),this.uuid=Ao(),this.data=e,this.dataReady=!0,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const n=e===void 0||typeof e=="string";if(!n&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let o=0,a=r.length;o<a;o++)r[o].isDataTexture?s.push(hu(r[o].image)):s.push(hu(r[o]))}else s=hu(r);i.url=s}return n||(e.images[this.uuid]=i),i}}function hu(t){return typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap?Qg.getDataURL(t):t.data?{data:Array.from(t.data),width:t.width,height:t.height,type:t.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let tS=0;class nn extends ws{constructor(e=nn.DEFAULT_IMAGE,n=nn.DEFAULT_MAPPING,i=bn,r=bn,s=qt,o=lr,a=Dn,l=ki,u=nn.DEFAULT_ANISOTROPY,f=xn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:tS++}),this.uuid=Ao(),this.name="",this.source=new Jg(e),this.mipmaps=[],this.mapping=n,this.channel=0,this.wrapS=i,this.wrapT=r,this.magFilter=s,this.minFilter=o,this.anisotropy=u,this.format=a,this.internalFormat=null,this.type=l,this.offset=new Ge(0,0),this.repeat=new Ge(1,1),this.center=new Ge(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Oe,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,typeof f=="string"?this.colorSpace=f:(us("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=f===hr?Tt:xn),this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.needsPMREMUpdate=!1}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const n=e===void 0||typeof e=="string";if(!n&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),n||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Bg)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Dc:e.x=e.x-Math.floor(e.x);break;case bn:e.x=e.x<0?0:1;break;case Uc:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Dc:e.y=e.y-Math.floor(e.y);break;case bn:e.y=e.y<0?0:1;break;case Uc:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}get encoding(){return us("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace===Tt?hr:qg}set encoding(e){us("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=e===hr?Tt:xn}}nn.DEFAULT_IMAGE=null;nn.DEFAULT_MAPPING=Bg;nn.DEFAULT_ANISOTROPY=1;class wt{constructor(e=0,n=0,i=0,r=1){wt.prototype.isVector4=!0,this.x=e,this.y=n,this.z=i,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,n,i,r){return this.x=e,this.y=n,this.z=i,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;case 3:this.w=n;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this.z=e.z+n.z,this.w=e.w+n.w,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this.z+=e.z*n,this.w+=e.w*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this.z=e.z-n.z,this.w=e.w-n.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const n=this.x,i=this.y,r=this.z,s=this.w,o=e.elements;return this.x=o[0]*n+o[4]*i+o[8]*r+o[12]*s,this.y=o[1]*n+o[5]*i+o[9]*r+o[13]*s,this.z=o[2]*n+o[6]*i+o[10]*r+o[14]*s,this.w=o[3]*n+o[7]*i+o[11]*r+o[15]*s,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const n=Math.sqrt(1-e.w*e.w);return n<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/n,this.y=e.y/n,this.z=e.z/n),this}setAxisAngleFromRotationMatrix(e){let n,i,r,s;const l=e.elements,u=l[0],f=l[4],d=l[8],h=l[1],m=l[5],v=l[9],S=l[2],p=l[6],c=l[10];if(Math.abs(f-h)<.01&&Math.abs(d-S)<.01&&Math.abs(v-p)<.01){if(Math.abs(f+h)<.1&&Math.abs(d+S)<.1&&Math.abs(v+p)<.1&&Math.abs(u+m+c-3)<.1)return this.set(1,0,0,0),this;n=Math.PI;const g=(u+1)/2,M=(m+1)/2,P=(c+1)/2,R=(f+h)/4,w=(d+S)/4,N=(v+p)/4;return g>M&&g>P?g<.01?(i=0,r=.707106781,s=.707106781):(i=Math.sqrt(g),r=R/i,s=w/i):M>P?M<.01?(i=.707106781,r=0,s=.707106781):(r=Math.sqrt(M),i=R/r,s=N/r):P<.01?(i=.707106781,r=.707106781,s=0):(s=Math.sqrt(P),i=w/s,r=N/s),this.set(i,r,s,n),this}let _=Math.sqrt((p-v)*(p-v)+(d-S)*(d-S)+(h-f)*(h-f));return Math.abs(_)<.001&&(_=1),this.x=(p-v)/_,this.y=(d-S)/_,this.z=(h-f)/_,this.w=Math.acos((u+m+c-1)/2),this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,n){return this.x=Math.max(e.x,Math.min(n.x,this.x)),this.y=Math.max(e.y,Math.min(n.y,this.y)),this.z=Math.max(e.z,Math.min(n.z,this.z)),this.w=Math.max(e.w,Math.min(n.w,this.w)),this}clampScalar(e,n){return this.x=Math.max(e,Math.min(n,this.x)),this.y=Math.max(e,Math.min(n,this.y)),this.z=Math.max(e,Math.min(n,this.z)),this.w=Math.max(e,Math.min(n,this.w)),this}clampLength(e,n){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(n,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this.z+=(e.z-this.z)*n,this.w+=(e.w-this.w)*n,this}lerpVectors(e,n,i){return this.x=e.x+(n.x-e.x)*i,this.y=e.y+(n.y-e.y)*i,this.z=e.z+(n.z-e.z)*i,this.w=e.w+(n.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this.z=e[n+2],this.w=e[n+3],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e[n+2]=this.z,e[n+3]=this.w,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this.z=e.getZ(n),this.w=e.getW(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class nS extends ws{constructor(e=1,n=1,i={}){super(),this.isRenderTarget=!0,this.width=e,this.height=n,this.depth=1,this.scissor=new wt(0,0,e,n),this.scissorTest=!1,this.viewport=new wt(0,0,e,n);const r={width:e,height:n,depth:1};i.encoding!==void 0&&(us("THREE.WebGLRenderTarget: option.encoding has been replaced by option.colorSpace."),i.colorSpace=i.encoding===hr?Tt:xn),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:qt,depthBuffer:!0,stencilBuffer:!1,depthTexture:null,samples:0},i),this.texture=new nn(r,i.mapping,i.wrapS,i.wrapT,i.magFilter,i.minFilter,i.format,i.type,i.anisotropy,i.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.flipY=!1,this.texture.generateMipmaps=i.generateMipmaps,this.texture.internalFormat=i.internalFormat,this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.depthTexture=i.depthTexture,this.samples=i.samples}setSize(e,n,i=1){(this.width!==e||this.height!==n||this.depth!==i)&&(this.width=e,this.height=n,this.depth=i,this.texture.image.width=e,this.texture.image.height=n,this.texture.image.depth=i,this.dispose()),this.viewport.set(0,0,e,n),this.scissor.set(0,0,e,n)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.texture=e.texture.clone(),this.texture.isRenderTargetTexture=!0;const n=Object.assign({},e.texture.image);return this.texture.source=new Jg(n),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Sr extends nS{constructor(e=1,n=1,i={}){super(e,n,i),this.isWebGLRenderTarget=!0}}class e_ extends nn{constructor(e=null,n=1,i=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:n,height:i,depth:r},this.magFilter=Vt,this.minFilter=Vt,this.wrapR=bn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class iS extends nn{constructor(e=null,n=1,i=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:n,height:i,depth:r},this.magFilter=Vt,this.minFilter=Vt,this.wrapR=bn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Ro{constructor(e=0,n=0,i=0,r=1){this.isQuaternion=!0,this._x=e,this._y=n,this._z=i,this._w=r}static slerpFlat(e,n,i,r,s,o,a){let l=i[r+0],u=i[r+1],f=i[r+2],d=i[r+3];const h=s[o+0],m=s[o+1],v=s[o+2],S=s[o+3];if(a===0){e[n+0]=l,e[n+1]=u,e[n+2]=f,e[n+3]=d;return}if(a===1){e[n+0]=h,e[n+1]=m,e[n+2]=v,e[n+3]=S;return}if(d!==S||l!==h||u!==m||f!==v){let p=1-a;const c=l*h+u*m+f*v+d*S,_=c>=0?1:-1,g=1-c*c;if(g>Number.EPSILON){const P=Math.sqrt(g),R=Math.atan2(P,c*_);p=Math.sin(p*R)/P,a=Math.sin(a*R)/P}const M=a*_;if(l=l*p+h*M,u=u*p+m*M,f=f*p+v*M,d=d*p+S*M,p===1-a){const P=1/Math.sqrt(l*l+u*u+f*f+d*d);l*=P,u*=P,f*=P,d*=P}}e[n]=l,e[n+1]=u,e[n+2]=f,e[n+3]=d}static multiplyQuaternionsFlat(e,n,i,r,s,o){const a=i[r],l=i[r+1],u=i[r+2],f=i[r+3],d=s[o],h=s[o+1],m=s[o+2],v=s[o+3];return e[n]=a*v+f*d+l*m-u*h,e[n+1]=l*v+f*h+u*d-a*m,e[n+2]=u*v+f*m+a*h-l*d,e[n+3]=f*v-a*d-l*h-u*m,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,n,i,r){return this._x=e,this._y=n,this._z=i,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,n=!0){const i=e._x,r=e._y,s=e._z,o=e._order,a=Math.cos,l=Math.sin,u=a(i/2),f=a(r/2),d=a(s/2),h=l(i/2),m=l(r/2),v=l(s/2);switch(o){case"XYZ":this._x=h*f*d+u*m*v,this._y=u*m*d-h*f*v,this._z=u*f*v+h*m*d,this._w=u*f*d-h*m*v;break;case"YXZ":this._x=h*f*d+u*m*v,this._y=u*m*d-h*f*v,this._z=u*f*v-h*m*d,this._w=u*f*d+h*m*v;break;case"ZXY":this._x=h*f*d-u*m*v,this._y=u*m*d+h*f*v,this._z=u*f*v+h*m*d,this._w=u*f*d-h*m*v;break;case"ZYX":this._x=h*f*d-u*m*v,this._y=u*m*d+h*f*v,this._z=u*f*v-h*m*d,this._w=u*f*d+h*m*v;break;case"YZX":this._x=h*f*d+u*m*v,this._y=u*m*d+h*f*v,this._z=u*f*v-h*m*d,this._w=u*f*d-h*m*v;break;case"XZY":this._x=h*f*d-u*m*v,this._y=u*m*d-h*f*v,this._z=u*f*v+h*m*d,this._w=u*f*d+h*m*v;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return n===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,n){const i=n/2,r=Math.sin(i);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const n=e.elements,i=n[0],r=n[4],s=n[8],o=n[1],a=n[5],l=n[9],u=n[2],f=n[6],d=n[10],h=i+a+d;if(h>0){const m=.5/Math.sqrt(h+1);this._w=.25/m,this._x=(f-l)*m,this._y=(s-u)*m,this._z=(o-r)*m}else if(i>a&&i>d){const m=2*Math.sqrt(1+i-a-d);this._w=(f-l)/m,this._x=.25*m,this._y=(r+o)/m,this._z=(s+u)/m}else if(a>d){const m=2*Math.sqrt(1+a-i-d);this._w=(s-u)/m,this._x=(r+o)/m,this._y=.25*m,this._z=(l+f)/m}else{const m=2*Math.sqrt(1+d-i-a);this._w=(o-r)/m,this._x=(s+u)/m,this._y=(l+f)/m,this._z=.25*m}return this._onChangeCallback(),this}setFromUnitVectors(e,n){let i=e.dot(n)+1;return i<Number.EPSILON?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*n.z-e.z*n.y,this._y=e.z*n.x-e.x*n.z,this._z=e.x*n.y-e.y*n.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Kt(this.dot(e),-1,1)))}rotateTowards(e,n){const i=this.angleTo(e);if(i===0)return this;const r=Math.min(1,n/i);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,n){const i=e._x,r=e._y,s=e._z,o=e._w,a=n._x,l=n._y,u=n._z,f=n._w;return this._x=i*f+o*a+r*u-s*l,this._y=r*f+o*l+s*a-i*u,this._z=s*f+o*u+i*l-r*a,this._w=o*f-i*a-r*l-s*u,this._onChangeCallback(),this}slerp(e,n){if(n===0)return this;if(n===1)return this.copy(e);const i=this._x,r=this._y,s=this._z,o=this._w;let a=o*e._w+i*e._x+r*e._y+s*e._z;if(a<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,a=-a):this.copy(e),a>=1)return this._w=o,this._x=i,this._y=r,this._z=s,this;const l=1-a*a;if(l<=Number.EPSILON){const m=1-n;return this._w=m*o+n*this._w,this._x=m*i+n*this._x,this._y=m*r+n*this._y,this._z=m*s+n*this._z,this.normalize(),this}const u=Math.sqrt(l),f=Math.atan2(u,a),d=Math.sin((1-n)*f)/u,h=Math.sin(n*f)/u;return this._w=o*d+this._w*h,this._x=i*d+this._x*h,this._y=r*d+this._y*h,this._z=s*d+this._z*h,this._onChangeCallback(),this}slerpQuaternions(e,n,i){return this.copy(e).slerp(n,i)}random(){const e=Math.random(),n=Math.sqrt(1-e),i=Math.sqrt(e),r=2*Math.PI*Math.random(),s=2*Math.PI*Math.random();return this.set(n*Math.cos(r),i*Math.sin(s),i*Math.cos(s),n*Math.sin(r))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,n=0){return this._x=e[n],this._y=e[n+1],this._z=e[n+2],this._w=e[n+3],this._onChangeCallback(),this}toArray(e=[],n=0){return e[n]=this._x,e[n+1]=this._y,e[n+2]=this._z,e[n+3]=this._w,e}fromBufferAttribute(e,n){return this._x=e.getX(n),this._y=e.getY(n),this._z=e.getZ(n),this._w=e.getW(n),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class z{constructor(e=0,n=0,i=0){z.prototype.isVector3=!0,this.x=e,this.y=n,this.z=i}set(e,n,i){return i===void 0&&(i=this.z),this.x=e,this.y=n,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this.z=e.z+n.z,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this.z+=e.z*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this.z=e.z-n.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,n){return this.x=e.x*n.x,this.y=e.y*n.y,this.z=e.z*n.z,this}applyEuler(e){return this.applyQuaternion(kh.setFromEuler(e))}applyAxisAngle(e,n){return this.applyQuaternion(kh.setFromAxisAngle(e,n))}applyMatrix3(e){const n=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*n+s[3]*i+s[6]*r,this.y=s[1]*n+s[4]*i+s[7]*r,this.z=s[2]*n+s[5]*i+s[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const n=this.x,i=this.y,r=this.z,s=e.elements,o=1/(s[3]*n+s[7]*i+s[11]*r+s[15]);return this.x=(s[0]*n+s[4]*i+s[8]*r+s[12])*o,this.y=(s[1]*n+s[5]*i+s[9]*r+s[13])*o,this.z=(s[2]*n+s[6]*i+s[10]*r+s[14])*o,this}applyQuaternion(e){const n=this.x,i=this.y,r=this.z,s=e.x,o=e.y,a=e.z,l=e.w,u=2*(o*r-a*i),f=2*(a*n-s*r),d=2*(s*i-o*n);return this.x=n+l*u+o*d-a*f,this.y=i+l*f+a*u-s*d,this.z=r+l*d+s*f-o*u,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const n=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*n+s[4]*i+s[8]*r,this.y=s[1]*n+s[5]*i+s[9]*r,this.z=s[2]*n+s[6]*i+s[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,n){return this.x=Math.max(e.x,Math.min(n.x,this.x)),this.y=Math.max(e.y,Math.min(n.y,this.y)),this.z=Math.max(e.z,Math.min(n.z,this.z)),this}clampScalar(e,n){return this.x=Math.max(e,Math.min(n,this.x)),this.y=Math.max(e,Math.min(n,this.y)),this.z=Math.max(e,Math.min(n,this.z)),this}clampLength(e,n){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(n,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this.z+=(e.z-this.z)*n,this}lerpVectors(e,n,i){return this.x=e.x+(n.x-e.x)*i,this.y=e.y+(n.y-e.y)*i,this.z=e.z+(n.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,n){const i=e.x,r=e.y,s=e.z,o=n.x,a=n.y,l=n.z;return this.x=r*l-s*a,this.y=s*o-i*l,this.z=i*a-r*o,this}projectOnVector(e){const n=e.lengthSq();if(n===0)return this.set(0,0,0);const i=e.dot(this)/n;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return pu.copy(this).projectOnVector(e),this.sub(pu)}reflect(e){return this.sub(pu.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const n=Math.sqrt(this.lengthSq()*e.lengthSq());if(n===0)return Math.PI/2;const i=this.dot(e)/n;return Math.acos(Kt(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const n=this.x-e.x,i=this.y-e.y,r=this.z-e.z;return n*n+i*i+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,n,i){const r=Math.sin(n)*e;return this.x=r*Math.sin(i),this.y=Math.cos(n)*e,this.z=r*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,n,i){return this.x=e*Math.sin(n),this.y=i,this.z=e*Math.cos(n),this}setFromMatrixPosition(e){const n=e.elements;return this.x=n[12],this.y=n[13],this.z=n[14],this}setFromMatrixScale(e){const n=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=n,this.y=i,this.z=r,this}setFromMatrixColumn(e,n){return this.fromArray(e.elements,n*4)}setFromMatrix3Column(e,n){return this.fromArray(e.elements,n*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this.z=e[n+2],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e[n+2]=this.z,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this.z=e.getZ(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=(Math.random()-.5)*2,n=Math.random()*Math.PI*2,i=Math.sqrt(1-e**2);return this.x=i*Math.cos(n),this.y=i*Math.sin(n),this.z=e,this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const pu=new z,kh=new Ro;class Co{constructor(e=new z(1/0,1/0,1/0),n=new z(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=n}set(e,n){return this.min.copy(e),this.max.copy(n),this}setFromArray(e){this.makeEmpty();for(let n=0,i=e.length;n<i;n+=3)this.expandByPoint(wn.fromArray(e,n));return this}setFromBufferAttribute(e){this.makeEmpty();for(let n=0,i=e.count;n<i;n++)this.expandByPoint(wn.fromBufferAttribute(e,n));return this}setFromPoints(e){this.makeEmpty();for(let n=0,i=e.length;n<i;n++)this.expandByPoint(e[n]);return this}setFromCenterAndSize(e,n){const i=wn.copy(n).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,n=!1){return this.makeEmpty(),this.expandByObject(e,n)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,n=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const s=i.getAttribute("position");if(n===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=s.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,wn):wn.fromBufferAttribute(s,o),wn.applyMatrix4(e.matrixWorld),this.expandByPoint(wn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Ko.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),Ko.copy(i.boundingBox)),Ko.applyMatrix4(e.matrixWorld),this.union(Ko)}const r=e.children;for(let s=0,o=r.length;s<o;s++)this.expandByObject(r[s],n);return this}containsPoint(e){return!(e.x<this.min.x||e.x>this.max.x||e.y<this.min.y||e.y>this.max.y||e.z<this.min.z||e.z>this.max.z)}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,n){return n.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return!(e.max.x<this.min.x||e.min.x>this.max.x||e.max.y<this.min.y||e.min.y>this.max.y||e.max.z<this.min.z||e.min.z>this.max.z)}intersectsSphere(e){return this.clampPoint(e.center,wn),wn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let n,i;return e.normal.x>0?(n=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(n=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(n+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(n+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(n+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(n+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),n<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(ks),Zo.subVectors(this.max,ks),Rr.subVectors(e.a,ks),Cr.subVectors(e.b,ks),Pr.subVectors(e.c,ks),mi.subVectors(Cr,Rr),gi.subVectors(Pr,Cr),$i.subVectors(Rr,Pr);let n=[0,-mi.z,mi.y,0,-gi.z,gi.y,0,-$i.z,$i.y,mi.z,0,-mi.x,gi.z,0,-gi.x,$i.z,0,-$i.x,-mi.y,mi.x,0,-gi.y,gi.x,0,-$i.y,$i.x,0];return!mu(n,Rr,Cr,Pr,Zo)||(n=[1,0,0,0,1,0,0,0,1],!mu(n,Rr,Cr,Pr,Zo))?!1:(Qo.crossVectors(mi,gi),n=[Qo.x,Qo.y,Qo.z],mu(n,Rr,Cr,Pr,Zo))}clampPoint(e,n){return n.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,wn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(wn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(qn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),qn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),qn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),qn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),qn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),qn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),qn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),qn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(qn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const qn=[new z,new z,new z,new z,new z,new z,new z,new z],wn=new z,Ko=new Co,Rr=new z,Cr=new z,Pr=new z,mi=new z,gi=new z,$i=new z,ks=new z,Zo=new z,Qo=new z,Ki=new z;function mu(t,e,n,i,r){for(let s=0,o=t.length-3;s<=o;s+=3){Ki.fromArray(t,s);const a=r.x*Math.abs(Ki.x)+r.y*Math.abs(Ki.y)+r.z*Math.abs(Ki.z),l=e.dot(Ki),u=n.dot(Ki),f=i.dot(Ki);if(Math.max(-Math.max(l,u,f),Math.min(l,u,f))>a)return!1}return!0}const rS=new Co,Bs=new z,gu=new z;class Ff{constructor(e=new z,n=-1){this.isSphere=!0,this.center=e,this.radius=n}set(e,n){return this.center.copy(e),this.radius=n,this}setFromPoints(e,n){const i=this.center;n!==void 0?i.copy(n):rS.setFromPoints(e).getCenter(i);let r=0;for(let s=0,o=e.length;s<o;s++)r=Math.max(r,i.distanceToSquared(e[s]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const n=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=n*n}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,n){const i=this.center.distanceToSquared(e);return n.copy(e),i>this.radius*this.radius&&(n.sub(this.center).normalize(),n.multiplyScalar(this.radius).add(this.center)),n}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Bs.subVectors(e,this.center);const n=Bs.lengthSq();if(n>this.radius*this.radius){const i=Math.sqrt(n),r=(i-this.radius)*.5;this.center.addScaledVector(Bs,r/i),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(gu.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Bs.copy(e.center).add(gu)),this.expandByPoint(Bs.copy(e.center).sub(gu))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const $n=new z,_u=new z,Jo=new z,_i=new z,vu=new z,ea=new z,xu=new z;class sS{constructor(e=new z,n=new z(0,0,-1)){this.origin=e,this.direction=n}set(e,n){return this.origin.copy(e),this.direction.copy(n),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,n){return n.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,$n)),this}closestPointToPoint(e,n){n.subVectors(e,this.origin);const i=n.dot(this.direction);return i<0?n.copy(this.origin):n.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const n=$n.subVectors(e,this.origin).dot(this.direction);return n<0?this.origin.distanceToSquared(e):($n.copy(this.origin).addScaledVector(this.direction,n),$n.distanceToSquared(e))}distanceSqToSegment(e,n,i,r){_u.copy(e).add(n).multiplyScalar(.5),Jo.copy(n).sub(e).normalize(),_i.copy(this.origin).sub(_u);const s=e.distanceTo(n)*.5,o=-this.direction.dot(Jo),a=_i.dot(this.direction),l=-_i.dot(Jo),u=_i.lengthSq(),f=Math.abs(1-o*o);let d,h,m,v;if(f>0)if(d=o*l-a,h=o*a-l,v=s*f,d>=0)if(h>=-v)if(h<=v){const S=1/f;d*=S,h*=S,m=d*(d+o*h+2*a)+h*(o*d+h+2*l)+u}else h=s,d=Math.max(0,-(o*h+a)),m=-d*d+h*(h+2*l)+u;else h=-s,d=Math.max(0,-(o*h+a)),m=-d*d+h*(h+2*l)+u;else h<=-v?(d=Math.max(0,-(-o*s+a)),h=d>0?-s:Math.min(Math.max(-s,-l),s),m=-d*d+h*(h+2*l)+u):h<=v?(d=0,h=Math.min(Math.max(-s,-l),s),m=h*(h+2*l)+u):(d=Math.max(0,-(o*s+a)),h=d>0?s:Math.min(Math.max(-s,-l),s),m=-d*d+h*(h+2*l)+u);else h=o>0?-s:s,d=Math.max(0,-(o*h+a)),m=-d*d+h*(h+2*l)+u;return i&&i.copy(this.origin).addScaledVector(this.direction,d),r&&r.copy(_u).addScaledVector(Jo,h),m}intersectSphere(e,n){$n.subVectors(e.center,this.origin);const i=$n.dot(this.direction),r=$n.dot($n)-i*i,s=e.radius*e.radius;if(r>s)return null;const o=Math.sqrt(s-r),a=i-o,l=i+o;return l<0?null:a<0?this.at(l,n):this.at(a,n)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const n=e.normal.dot(this.direction);if(n===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/n;return i>=0?i:null}intersectPlane(e,n){const i=this.distanceToPlane(e);return i===null?null:this.at(i,n)}intersectsPlane(e){const n=e.distanceToPoint(this.origin);return n===0||e.normal.dot(this.direction)*n<0}intersectBox(e,n){let i,r,s,o,a,l;const u=1/this.direction.x,f=1/this.direction.y,d=1/this.direction.z,h=this.origin;return u>=0?(i=(e.min.x-h.x)*u,r=(e.max.x-h.x)*u):(i=(e.max.x-h.x)*u,r=(e.min.x-h.x)*u),f>=0?(s=(e.min.y-h.y)*f,o=(e.max.y-h.y)*f):(s=(e.max.y-h.y)*f,o=(e.min.y-h.y)*f),i>o||s>r||((s>i||isNaN(i))&&(i=s),(o<r||isNaN(r))&&(r=o),d>=0?(a=(e.min.z-h.z)*d,l=(e.max.z-h.z)*d):(a=(e.max.z-h.z)*d,l=(e.min.z-h.z)*d),i>l||a>r)||((a>i||i!==i)&&(i=a),(l<r||r!==r)&&(r=l),r<0)?null:this.at(i>=0?i:r,n)}intersectsBox(e){return this.intersectBox(e,$n)!==null}intersectTriangle(e,n,i,r,s){vu.subVectors(n,e),ea.subVectors(i,e),xu.crossVectors(vu,ea);let o=this.direction.dot(xu),a;if(o>0){if(r)return null;a=1}else if(o<0)a=-1,o=-o;else return null;_i.subVectors(this.origin,e);const l=a*this.direction.dot(ea.crossVectors(_i,ea));if(l<0)return null;const u=a*this.direction.dot(vu.cross(_i));if(u<0||l+u>o)return null;const f=-a*_i.dot(xu);return f<0?null:this.at(f/o,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class vt{constructor(e,n,i,r,s,o,a,l,u,f,d,h,m,v,S,p){vt.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,n,i,r,s,o,a,l,u,f,d,h,m,v,S,p)}set(e,n,i,r,s,o,a,l,u,f,d,h,m,v,S,p){const c=this.elements;return c[0]=e,c[4]=n,c[8]=i,c[12]=r,c[1]=s,c[5]=o,c[9]=a,c[13]=l,c[2]=u,c[6]=f,c[10]=d,c[14]=h,c[3]=m,c[7]=v,c[11]=S,c[15]=p,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new vt().fromArray(this.elements)}copy(e){const n=this.elements,i=e.elements;return n[0]=i[0],n[1]=i[1],n[2]=i[2],n[3]=i[3],n[4]=i[4],n[5]=i[5],n[6]=i[6],n[7]=i[7],n[8]=i[8],n[9]=i[9],n[10]=i[10],n[11]=i[11],n[12]=i[12],n[13]=i[13],n[14]=i[14],n[15]=i[15],this}copyPosition(e){const n=this.elements,i=e.elements;return n[12]=i[12],n[13]=i[13],n[14]=i[14],this}setFromMatrix3(e){const n=e.elements;return this.set(n[0],n[3],n[6],0,n[1],n[4],n[7],0,n[2],n[5],n[8],0,0,0,0,1),this}extractBasis(e,n,i){return e.setFromMatrixColumn(this,0),n.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(e,n,i){return this.set(e.x,n.x,i.x,0,e.y,n.y,i.y,0,e.z,n.z,i.z,0,0,0,0,1),this}extractRotation(e){const n=this.elements,i=e.elements,r=1/Lr.setFromMatrixColumn(e,0).length(),s=1/Lr.setFromMatrixColumn(e,1).length(),o=1/Lr.setFromMatrixColumn(e,2).length();return n[0]=i[0]*r,n[1]=i[1]*r,n[2]=i[2]*r,n[3]=0,n[4]=i[4]*s,n[5]=i[5]*s,n[6]=i[6]*s,n[7]=0,n[8]=i[8]*o,n[9]=i[9]*o,n[10]=i[10]*o,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromEuler(e){const n=this.elements,i=e.x,r=e.y,s=e.z,o=Math.cos(i),a=Math.sin(i),l=Math.cos(r),u=Math.sin(r),f=Math.cos(s),d=Math.sin(s);if(e.order==="XYZ"){const h=o*f,m=o*d,v=a*f,S=a*d;n[0]=l*f,n[4]=-l*d,n[8]=u,n[1]=m+v*u,n[5]=h-S*u,n[9]=-a*l,n[2]=S-h*u,n[6]=v+m*u,n[10]=o*l}else if(e.order==="YXZ"){const h=l*f,m=l*d,v=u*f,S=u*d;n[0]=h+S*a,n[4]=v*a-m,n[8]=o*u,n[1]=o*d,n[5]=o*f,n[9]=-a,n[2]=m*a-v,n[6]=S+h*a,n[10]=o*l}else if(e.order==="ZXY"){const h=l*f,m=l*d,v=u*f,S=u*d;n[0]=h-S*a,n[4]=-o*d,n[8]=v+m*a,n[1]=m+v*a,n[5]=o*f,n[9]=S-h*a,n[2]=-o*u,n[6]=a,n[10]=o*l}else if(e.order==="ZYX"){const h=o*f,m=o*d,v=a*f,S=a*d;n[0]=l*f,n[4]=v*u-m,n[8]=h*u+S,n[1]=l*d,n[5]=S*u+h,n[9]=m*u-v,n[2]=-u,n[6]=a*l,n[10]=o*l}else if(e.order==="YZX"){const h=o*l,m=o*u,v=a*l,S=a*u;n[0]=l*f,n[4]=S-h*d,n[8]=v*d+m,n[1]=d,n[5]=o*f,n[9]=-a*f,n[2]=-u*f,n[6]=m*d+v,n[10]=h-S*d}else if(e.order==="XZY"){const h=o*l,m=o*u,v=a*l,S=a*u;n[0]=l*f,n[4]=-d,n[8]=u*f,n[1]=h*d+S,n[5]=o*f,n[9]=m*d-v,n[2]=v*d-m,n[6]=a*f,n[10]=S*d+h}return n[3]=0,n[7]=0,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromQuaternion(e){return this.compose(oS,e,aS)}lookAt(e,n,i){const r=this.elements;return sn.subVectors(e,n),sn.lengthSq()===0&&(sn.z=1),sn.normalize(),vi.crossVectors(i,sn),vi.lengthSq()===0&&(Math.abs(i.z)===1?sn.x+=1e-4:sn.z+=1e-4,sn.normalize(),vi.crossVectors(i,sn)),vi.normalize(),ta.crossVectors(sn,vi),r[0]=vi.x,r[4]=ta.x,r[8]=sn.x,r[1]=vi.y,r[5]=ta.y,r[9]=sn.y,r[2]=vi.z,r[6]=ta.z,r[10]=sn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,n){const i=e.elements,r=n.elements,s=this.elements,o=i[0],a=i[4],l=i[8],u=i[12],f=i[1],d=i[5],h=i[9],m=i[13],v=i[2],S=i[6],p=i[10],c=i[14],_=i[3],g=i[7],M=i[11],P=i[15],R=r[0],w=r[4],N=r[8],K=r[12],x=r[1],C=r[5],X=r[9],Q=r[13],L=r[2],W=r[6],V=r[10],Y=r[14],b=r[3],I=r[7],B=r[11],j=r[15];return s[0]=o*R+a*x+l*L+u*b,s[4]=o*w+a*C+l*W+u*I,s[8]=o*N+a*X+l*V+u*B,s[12]=o*K+a*Q+l*Y+u*j,s[1]=f*R+d*x+h*L+m*b,s[5]=f*w+d*C+h*W+m*I,s[9]=f*N+d*X+h*V+m*B,s[13]=f*K+d*Q+h*Y+m*j,s[2]=v*R+S*x+p*L+c*b,s[6]=v*w+S*C+p*W+c*I,s[10]=v*N+S*X+p*V+c*B,s[14]=v*K+S*Q+p*Y+c*j,s[3]=_*R+g*x+M*L+P*b,s[7]=_*w+g*C+M*W+P*I,s[11]=_*N+g*X+M*V+P*B,s[15]=_*K+g*Q+M*Y+P*j,this}multiplyScalar(e){const n=this.elements;return n[0]*=e,n[4]*=e,n[8]*=e,n[12]*=e,n[1]*=e,n[5]*=e,n[9]*=e,n[13]*=e,n[2]*=e,n[6]*=e,n[10]*=e,n[14]*=e,n[3]*=e,n[7]*=e,n[11]*=e,n[15]*=e,this}determinant(){const e=this.elements,n=e[0],i=e[4],r=e[8],s=e[12],o=e[1],a=e[5],l=e[9],u=e[13],f=e[2],d=e[6],h=e[10],m=e[14],v=e[3],S=e[7],p=e[11],c=e[15];return v*(+s*l*d-r*u*d-s*a*h+i*u*h+r*a*m-i*l*m)+S*(+n*l*m-n*u*h+s*o*h-r*o*m+r*u*f-s*l*f)+p*(+n*u*d-n*a*m-s*o*d+i*o*m+s*a*f-i*u*f)+c*(-r*a*f-n*l*d+n*a*h+r*o*d-i*o*h+i*l*f)}transpose(){const e=this.elements;let n;return n=e[1],e[1]=e[4],e[4]=n,n=e[2],e[2]=e[8],e[8]=n,n=e[6],e[6]=e[9],e[9]=n,n=e[3],e[3]=e[12],e[12]=n,n=e[7],e[7]=e[13],e[13]=n,n=e[11],e[11]=e[14],e[14]=n,this}setPosition(e,n,i){const r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=n,r[14]=i),this}invert(){const e=this.elements,n=e[0],i=e[1],r=e[2],s=e[3],o=e[4],a=e[5],l=e[6],u=e[7],f=e[8],d=e[9],h=e[10],m=e[11],v=e[12],S=e[13],p=e[14],c=e[15],_=d*p*u-S*h*u+S*l*m-a*p*m-d*l*c+a*h*c,g=v*h*u-f*p*u-v*l*m+o*p*m+f*l*c-o*h*c,M=f*S*u-v*d*u+v*a*m-o*S*m-f*a*c+o*d*c,P=v*d*l-f*S*l-v*a*h+o*S*h+f*a*p-o*d*p,R=n*_+i*g+r*M+s*P;if(R===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const w=1/R;return e[0]=_*w,e[1]=(S*h*s-d*p*s-S*r*m+i*p*m+d*r*c-i*h*c)*w,e[2]=(a*p*s-S*l*s+S*r*u-i*p*u-a*r*c+i*l*c)*w,e[3]=(d*l*s-a*h*s-d*r*u+i*h*u+a*r*m-i*l*m)*w,e[4]=g*w,e[5]=(f*p*s-v*h*s+v*r*m-n*p*m-f*r*c+n*h*c)*w,e[6]=(v*l*s-o*p*s-v*r*u+n*p*u+o*r*c-n*l*c)*w,e[7]=(o*h*s-f*l*s+f*r*u-n*h*u-o*r*m+n*l*m)*w,e[8]=M*w,e[9]=(v*d*s-f*S*s-v*i*m+n*S*m+f*i*c-n*d*c)*w,e[10]=(o*S*s-v*a*s+v*i*u-n*S*u-o*i*c+n*a*c)*w,e[11]=(f*a*s-o*d*s-f*i*u+n*d*u+o*i*m-n*a*m)*w,e[12]=P*w,e[13]=(f*S*r-v*d*r+v*i*h-n*S*h-f*i*p+n*d*p)*w,e[14]=(v*a*r-o*S*r-v*i*l+n*S*l+o*i*p-n*a*p)*w,e[15]=(o*d*r-f*a*r+f*i*l-n*d*l-o*i*h+n*a*h)*w,this}scale(e){const n=this.elements,i=e.x,r=e.y,s=e.z;return n[0]*=i,n[4]*=r,n[8]*=s,n[1]*=i,n[5]*=r,n[9]*=s,n[2]*=i,n[6]*=r,n[10]*=s,n[3]*=i,n[7]*=r,n[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,n=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(n,i,r))}makeTranslation(e,n,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,n,0,0,1,i,0,0,0,1),this}makeRotationX(e){const n=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,n,-i,0,0,i,n,0,0,0,0,1),this}makeRotationY(e){const n=Math.cos(e),i=Math.sin(e);return this.set(n,0,i,0,0,1,0,0,-i,0,n,0,0,0,0,1),this}makeRotationZ(e){const n=Math.cos(e),i=Math.sin(e);return this.set(n,-i,0,0,i,n,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,n){const i=Math.cos(n),r=Math.sin(n),s=1-i,o=e.x,a=e.y,l=e.z,u=s*o,f=s*a;return this.set(u*o+i,u*a-r*l,u*l+r*a,0,u*a+r*l,f*a+i,f*l-r*o,0,u*l-r*a,f*l+r*o,s*l*l+i,0,0,0,0,1),this}makeScale(e,n,i){return this.set(e,0,0,0,0,n,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,n,i,r,s,o){return this.set(1,i,s,0,e,1,o,0,n,r,1,0,0,0,0,1),this}compose(e,n,i){const r=this.elements,s=n._x,o=n._y,a=n._z,l=n._w,u=s+s,f=o+o,d=a+a,h=s*u,m=s*f,v=s*d,S=o*f,p=o*d,c=a*d,_=l*u,g=l*f,M=l*d,P=i.x,R=i.y,w=i.z;return r[0]=(1-(S+c))*P,r[1]=(m+M)*P,r[2]=(v-g)*P,r[3]=0,r[4]=(m-M)*R,r[5]=(1-(h+c))*R,r[6]=(p+_)*R,r[7]=0,r[8]=(v+g)*w,r[9]=(p-_)*w,r[10]=(1-(h+S))*w,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,n,i){const r=this.elements;let s=Lr.set(r[0],r[1],r[2]).length();const o=Lr.set(r[4],r[5],r[6]).length(),a=Lr.set(r[8],r[9],r[10]).length();this.determinant()<0&&(s=-s),e.x=r[12],e.y=r[13],e.z=r[14],An.copy(this);const u=1/s,f=1/o,d=1/a;return An.elements[0]*=u,An.elements[1]*=u,An.elements[2]*=u,An.elements[4]*=f,An.elements[5]*=f,An.elements[6]*=f,An.elements[8]*=d,An.elements[9]*=d,An.elements[10]*=d,n.setFromRotationMatrix(An),i.x=s,i.y=o,i.z=a,this}makePerspective(e,n,i,r,s,o,a=oi){const l=this.elements,u=2*s/(n-e),f=2*s/(i-r),d=(n+e)/(n-e),h=(i+r)/(i-r);let m,v;if(a===oi)m=-(o+s)/(o-s),v=-2*o*s/(o-s);else if(a===rl)m=-o/(o-s),v=-o*s/(o-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=u,l[4]=0,l[8]=d,l[12]=0,l[1]=0,l[5]=f,l[9]=h,l[13]=0,l[2]=0,l[6]=0,l[10]=m,l[14]=v,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,n,i,r,s,o,a=oi){const l=this.elements,u=1/(n-e),f=1/(i-r),d=1/(o-s),h=(n+e)*u,m=(i+r)*f;let v,S;if(a===oi)v=(o+s)*d,S=-2*d;else if(a===rl)v=s*d,S=-1*d;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=2*u,l[4]=0,l[8]=0,l[12]=-h,l[1]=0,l[5]=2*f,l[9]=0,l[13]=-m,l[2]=0,l[6]=0,l[10]=S,l[14]=-v,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const n=this.elements,i=e.elements;for(let r=0;r<16;r++)if(n[r]!==i[r])return!1;return!0}fromArray(e,n=0){for(let i=0;i<16;i++)this.elements[i]=e[i+n];return this}toArray(e=[],n=0){const i=this.elements;return e[n]=i[0],e[n+1]=i[1],e[n+2]=i[2],e[n+3]=i[3],e[n+4]=i[4],e[n+5]=i[5],e[n+6]=i[6],e[n+7]=i[7],e[n+8]=i[8],e[n+9]=i[9],e[n+10]=i[10],e[n+11]=i[11],e[n+12]=i[12],e[n+13]=i[13],e[n+14]=i[14],e[n+15]=i[15],e}}const Lr=new z,An=new vt,oS=new z(0,0,0),aS=new z(1,1,1),vi=new z,ta=new z,sn=new z,Bh=new vt,Hh=new Ro;class Tl{constructor(e=0,n=0,i=0,r=Tl.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=n,this._z=i,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,n,i,r=this._order){return this._x=e,this._y=n,this._z=i,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,n=this._order,i=!0){const r=e.elements,s=r[0],o=r[4],a=r[8],l=r[1],u=r[5],f=r[9],d=r[2],h=r[6],m=r[10];switch(n){case"XYZ":this._y=Math.asin(Kt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-f,m),this._z=Math.atan2(-o,s)):(this._x=Math.atan2(h,u),this._z=0);break;case"YXZ":this._x=Math.asin(-Kt(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(a,m),this._z=Math.atan2(l,u)):(this._y=Math.atan2(-d,s),this._z=0);break;case"ZXY":this._x=Math.asin(Kt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(-d,m),this._z=Math.atan2(-o,u)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-Kt(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(h,m),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-o,u));break;case"YZX":this._z=Math.asin(Kt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-f,u),this._y=Math.atan2(-d,s)):(this._x=0,this._y=Math.atan2(a,m));break;case"XZY":this._z=Math.asin(-Kt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(h,u),this._y=Math.atan2(a,s)):(this._x=Math.atan2(-f,m),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+n)}return this._order=n,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,n,i){return Bh.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Bh,n,i)}setFromVector3(e,n=this._order){return this.set(e.x,e.y,e.z,n)}reorder(e){return Hh.setFromEuler(this),this.setFromQuaternion(Hh,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],n=0){return e[n]=this._x,e[n+1]=this._y,e[n+2]=this._z,e[n+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Tl.DEFAULT_ORDER="XYZ";class t_{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let lS=0;const Gh=new z,br=new Ro,Kn=new vt,na=new z,Hs=new z,uS=new z,cS=new Ro,Vh=new z(1,0,0),Wh=new z(0,1,0),Xh=new z(0,0,1),fS={type:"added"},dS={type:"removed"};class zt extends ws{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:lS++}),this.uuid=Ao(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=zt.DEFAULT_UP.clone();const e=new z,n=new Tl,i=new Ro,r=new z(1,1,1);function s(){i.setFromEuler(n,!1)}function o(){n.setFromQuaternion(i,void 0,!1)}n._onChange(s),i._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:n},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new vt},normalMatrix:{value:new Oe}}),this.matrix=new vt,this.matrixWorld=new vt,this.matrixAutoUpdate=zt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=zt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new t_,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,n){this.quaternion.setFromAxisAngle(e,n)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,n){return br.setFromAxisAngle(e,n),this.quaternion.multiply(br),this}rotateOnWorldAxis(e,n){return br.setFromAxisAngle(e,n),this.quaternion.premultiply(br),this}rotateX(e){return this.rotateOnAxis(Vh,e)}rotateY(e){return this.rotateOnAxis(Wh,e)}rotateZ(e){return this.rotateOnAxis(Xh,e)}translateOnAxis(e,n){return Gh.copy(e).applyQuaternion(this.quaternion),this.position.add(Gh.multiplyScalar(n)),this}translateX(e){return this.translateOnAxis(Vh,e)}translateY(e){return this.translateOnAxis(Wh,e)}translateZ(e){return this.translateOnAxis(Xh,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Kn.copy(this.matrixWorld).invert())}lookAt(e,n,i){e.isVector3?na.copy(e):na.set(e,n,i);const r=this.parent;this.updateWorldMatrix(!0,!1),Hs.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Kn.lookAt(Hs,na,this.up):Kn.lookAt(na,Hs,this.up),this.quaternion.setFromRotationMatrix(Kn),r&&(Kn.extractRotation(r.matrixWorld),br.setFromRotationMatrix(Kn),this.quaternion.premultiply(br.invert()))}add(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.add(arguments[n]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.parent!==null&&e.parent.remove(e),e.parent=this,this.children.push(e),e.dispatchEvent(fS)):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const n=this.children.indexOf(e);return n!==-1&&(e.parent=null,this.children.splice(n,1),e.dispatchEvent(dS)),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Kn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Kn.multiply(e.parent.matrixWorld)),e.applyMatrix4(Kn),this.add(e),e.updateWorldMatrix(!1,!0),this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,n){if(this[e]===n)return this;for(let i=0,r=this.children.length;i<r;i++){const o=this.children[i].getObjectByProperty(e,n);if(o!==void 0)return o}}getObjectsByProperty(e,n,i=[]){this[e]===n&&i.push(this);const r=this.children;for(let s=0,o=r.length;s<o;s++)r[s].getObjectsByProperty(e,n,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Hs,e,uS),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Hs,cS,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const n=this.matrixWorld.elements;return e.set(n[8],n[9],n[10]).normalize()}raycast(){}traverse(e){e(this);const n=this.children;for(let i=0,r=n.length;i<r;i++)n[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const n=this.children;for(let i=0,r=n.length;i<r;i++)n[i].traverseVisible(e)}traverseAncestors(e){const n=this.parent;n!==null&&(e(n),n.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,e=!0);const n=this.children;for(let i=0,r=n.length;i<r;i++){const s=n[i];(s.matrixWorldAutoUpdate===!0||e===!0)&&s.updateMatrixWorld(e)}}updateWorldMatrix(e,n){const i=this.parent;if(e===!0&&i!==null&&i.matrixWorldAutoUpdate===!0&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),n===!0){const r=this.children;for(let s=0,o=r.length;s<o;s++){const a=r[s];a.matrixWorldAutoUpdate===!0&&a.updateWorldMatrix(!1,!0)}}}toJSON(e){const n=e===void 0||typeof e=="string",i={};n&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.visibility=this._visibility,r.active=this._active,r.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),r.maxGeometryCount=this._maxGeometryCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.geometryCount=this._geometryCount,r.matricesTexture=this._matricesTexture.toJSON(e),this.boundingSphere!==null&&(r.boundingSphere={center:r.boundingSphere.center.toArray(),radius:r.boundingSphere.radius}),this.boundingBox!==null&&(r.boundingBox={min:r.boundingBox.min.toArray(),max:r.boundingBox.max.toArray()}));function s(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(e.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const l=a.shapes;if(Array.isArray(l))for(let u=0,f=l.length;u<f;u++){const d=l[u];s(e.shapes,d)}else s(e.shapes,l)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let l=0,u=this.material.length;l<u;l++)a.push(s(e.materials,this.material[l]));r.material=a}else r.material=s(e.materials,this.material);if(this.children.length>0){r.children=[];for(let a=0;a<this.children.length;a++)r.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let a=0;a<this.animations.length;a++){const l=this.animations[a];r.animations.push(s(e.animations,l))}}if(n){const a=o(e.geometries),l=o(e.materials),u=o(e.textures),f=o(e.images),d=o(e.shapes),h=o(e.skeletons),m=o(e.animations),v=o(e.nodes);a.length>0&&(i.geometries=a),l.length>0&&(i.materials=l),u.length>0&&(i.textures=u),f.length>0&&(i.images=f),d.length>0&&(i.shapes=d),h.length>0&&(i.skeletons=h),m.length>0&&(i.animations=m),v.length>0&&(i.nodes=v)}return i.object=r,i;function o(a){const l=[];for(const u in a){const f=a[u];delete f.metadata,l.push(f)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,n=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),n===!0)for(let i=0;i<e.children.length;i++){const r=e.children[i];this.add(r.clone())}return this}}zt.DEFAULT_UP=new z(0,1,0);zt.DEFAULT_MATRIX_AUTO_UPDATE=!0;zt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Rn=new z,Zn=new z,Su=new z,Qn=new z,Dr=new z,Ur=new z,jh=new z,yu=new z,Mu=new z,Eu=new z;class Gn{constructor(e=new z,n=new z,i=new z){this.a=e,this.b=n,this.c=i}static getNormal(e,n,i,r){r.subVectors(i,n),Rn.subVectors(e,n),r.cross(Rn);const s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(e,n,i,r,s){Rn.subVectors(r,n),Zn.subVectors(i,n),Su.subVectors(e,n);const o=Rn.dot(Rn),a=Rn.dot(Zn),l=Rn.dot(Su),u=Zn.dot(Zn),f=Zn.dot(Su),d=o*u-a*a;if(d===0)return s.set(0,0,0),null;const h=1/d,m=(u*l-a*f)*h,v=(o*f-a*l)*h;return s.set(1-m-v,v,m)}static containsPoint(e,n,i,r){return this.getBarycoord(e,n,i,r,Qn)===null?!1:Qn.x>=0&&Qn.y>=0&&Qn.x+Qn.y<=1}static getInterpolation(e,n,i,r,s,o,a,l){return this.getBarycoord(e,n,i,r,Qn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,Qn.x),l.addScaledVector(o,Qn.y),l.addScaledVector(a,Qn.z),l)}static isFrontFacing(e,n,i,r){return Rn.subVectors(i,n),Zn.subVectors(e,n),Rn.cross(Zn).dot(r)<0}set(e,n,i){return this.a.copy(e),this.b.copy(n),this.c.copy(i),this}setFromPointsAndIndices(e,n,i,r){return this.a.copy(e[n]),this.b.copy(e[i]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,n,i,r){return this.a.fromBufferAttribute(e,n),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Rn.subVectors(this.c,this.b),Zn.subVectors(this.a,this.b),Rn.cross(Zn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Gn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,n){return Gn.getBarycoord(e,this.a,this.b,this.c,n)}getInterpolation(e,n,i,r,s){return Gn.getInterpolation(e,this.a,this.b,this.c,n,i,r,s)}containsPoint(e){return Gn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Gn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,n){const i=this.a,r=this.b,s=this.c;let o,a;Dr.subVectors(r,i),Ur.subVectors(s,i),yu.subVectors(e,i);const l=Dr.dot(yu),u=Ur.dot(yu);if(l<=0&&u<=0)return n.copy(i);Mu.subVectors(e,r);const f=Dr.dot(Mu),d=Ur.dot(Mu);if(f>=0&&d<=f)return n.copy(r);const h=l*d-f*u;if(h<=0&&l>=0&&f<=0)return o=l/(l-f),n.copy(i).addScaledVector(Dr,o);Eu.subVectors(e,s);const m=Dr.dot(Eu),v=Ur.dot(Eu);if(v>=0&&m<=v)return n.copy(s);const S=m*u-l*v;if(S<=0&&u>=0&&v<=0)return a=u/(u-v),n.copy(i).addScaledVector(Ur,a);const p=f*v-m*d;if(p<=0&&d-f>=0&&m-v>=0)return jh.subVectors(s,r),a=(d-f)/(d-f+(m-v)),n.copy(r).addScaledVector(jh,a);const c=1/(p+S+h);return o=S*c,a=h*c,n.copy(i).addScaledVector(Dr,o).addScaledVector(Ur,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const n_={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},xi={h:0,s:0,l:0},ia={h:0,s:0,l:0};function Tu(t,e,n){return n<0&&(n+=1),n>1&&(n-=1),n<1/6?t+(e-t)*6*n:n<1/2?e:n<2/3?t+(e-t)*6*(2/3-n):t}class We{constructor(e,n,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,n,i)}set(e,n,i){if(n===void 0&&i===void 0){const r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,n,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,n=Tt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,$e.toWorkingColorSpace(this,n),this}setRGB(e,n,i,r=$e.workingColorSpace){return this.r=e,this.g=n,this.b=i,$e.toWorkingColorSpace(this,r),this}setHSL(e,n,i,r=$e.workingColorSpace){if(e=Zx(e,1),n=Kt(n,0,1),i=Kt(i,0,1),n===0)this.r=this.g=this.b=i;else{const s=i<=.5?i*(1+n):i+n-i*n,o=2*i-s;this.r=Tu(o,s,e+1/3),this.g=Tu(o,s,e),this.b=Tu(o,s,e-1/3)}return $e.toWorkingColorSpace(this,r),this}setStyle(e,n=Tt){function i(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const o=r[1],a=r[2];switch(o){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,n);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,n);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,n);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=r[1],o=s.length;if(o===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,n);if(o===6)return this.setHex(parseInt(s,16),n);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,n);return this}setColorName(e,n=Tt){const i=n_[e.toLowerCase()];return i!==void 0?this.setHex(i,n):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=cs(e.r),this.g=cs(e.g),this.b=cs(e.b),this}copyLinearToSRGB(e){return this.r=du(e.r),this.g=du(e.g),this.b=du(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Tt){return $e.fromWorkingColorSpace(Ft.copy(this),e),Math.round(Kt(Ft.r*255,0,255))*65536+Math.round(Kt(Ft.g*255,0,255))*256+Math.round(Kt(Ft.b*255,0,255))}getHexString(e=Tt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,n=$e.workingColorSpace){$e.fromWorkingColorSpace(Ft.copy(this),n);const i=Ft.r,r=Ft.g,s=Ft.b,o=Math.max(i,r,s),a=Math.min(i,r,s);let l,u;const f=(a+o)/2;if(a===o)l=0,u=0;else{const d=o-a;switch(u=f<=.5?d/(o+a):d/(2-o-a),o){case i:l=(r-s)/d+(r<s?6:0);break;case r:l=(s-i)/d+2;break;case s:l=(i-r)/d+4;break}l/=6}return e.h=l,e.s=u,e.l=f,e}getRGB(e,n=$e.workingColorSpace){return $e.fromWorkingColorSpace(Ft.copy(this),n),e.r=Ft.r,e.g=Ft.g,e.b=Ft.b,e}getStyle(e=Tt){$e.fromWorkingColorSpace(Ft.copy(this),e);const n=Ft.r,i=Ft.g,r=Ft.b;return e!==Tt?`color(${e} ${n.toFixed(3)} ${i.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(n*255)},${Math.round(i*255)},${Math.round(r*255)})`}offsetHSL(e,n,i){return this.getHSL(xi),this.setHSL(xi.h+e,xi.s+n,xi.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,n){return this.r=e.r+n.r,this.g=e.g+n.g,this.b=e.b+n.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,n){return this.r+=(e.r-this.r)*n,this.g+=(e.g-this.g)*n,this.b+=(e.b-this.b)*n,this}lerpColors(e,n,i){return this.r=e.r+(n.r-e.r)*i,this.g=e.g+(n.g-e.g)*i,this.b=e.b+(n.b-e.b)*i,this}lerpHSL(e,n){this.getHSL(xi),e.getHSL(ia);const i=cu(xi.h,ia.h,n),r=cu(xi.s,ia.s,n),s=cu(xi.l,ia.l,n);return this.setHSL(i,r,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const n=this.r,i=this.g,r=this.b,s=e.elements;return this.r=s[0]*n+s[3]*i+s[6]*r,this.g=s[1]*n+s[4]*i+s[7]*r,this.b=s[2]*n+s[5]*i+s[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,n=0){return this.r=e[n],this.g=e[n+1],this.b=e[n+2],this}toArray(e=[],n=0){return e[n]=this.r,e[n+1]=this.g,e[n+2]=this.b,e}fromBufferAttribute(e,n){return this.r=e.getX(n),this.g=e.getY(n),this.b=e.getZ(n),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Ft=new We;We.NAMES=n_;let hS=0;class Po extends ws{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:hS++}),this.uuid=Ao(),this.name="",this.type="Material",this.blending=ls,this.side=Gi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Cc,this.blendDst=Pc,this.blendEquation=ir,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new We(0,0,0),this.blendAlpha=0,this.depthFunc=el,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Dh,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=wr,this.stencilZFail=wr,this.stencilZPass=wr,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const n in e){const i=e[n];if(i===void 0){console.warn(`THREE.Material: parameter '${n}' has value of undefined.`);continue}const r=this[n];if(r===void 0){console.warn(`THREE.Material: '${n}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(i):r&&r.isVector3&&i&&i.isVector3?r.copy(i):this[n]=i}}toJSON(e){const n=e===void 0||typeof e=="string";n&&(e={textures:{},images:{}});const i={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==ls&&(i.blending=this.blending),this.side!==Gi&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==Cc&&(i.blendSrc=this.blendSrc),this.blendDst!==Pc&&(i.blendDst=this.blendDst),this.blendEquation!==ir&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==el&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Dh&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==wr&&(i.stencilFail=this.stencilFail),this.stencilZFail!==wr&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==wr&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function r(s){const o=[];for(const a in s){const l=s[a];delete l.metadata,o.push(l)}return o}if(n){const s=r(e.textures),o=r(e.images);s.length>0&&(i.textures=s),o.length>0&&(i.images=o)}return i}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const n=e.clippingPlanes;let i=null;if(n!==null){const r=n.length;i=new Array(r);for(let s=0;s!==r;++s)i[s]=n[s].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class i_ extends Po{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new We(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=zg,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const pt=new z,ra=new Ge;class Xn{constructor(e,n,i=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=n,this.count=e!==void 0?e.length/n:0,this.normalized=i,this.usage=Uh,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.gpuType=ii,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}get updateRange(){return us("THREE.BufferAttribute: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(e){return this.usage=e,this}addUpdateRange(e,n){this.updateRanges.push({start:e,count:n})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,n,i){e*=this.itemSize,i*=n.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[e+r]=n.array[i+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let n=0,i=this.count;n<i;n++)ra.fromBufferAttribute(this,n),ra.applyMatrix3(e),this.setXY(n,ra.x,ra.y);else if(this.itemSize===3)for(let n=0,i=this.count;n<i;n++)pt.fromBufferAttribute(this,n),pt.applyMatrix3(e),this.setXYZ(n,pt.x,pt.y,pt.z);return this}applyMatrix4(e){for(let n=0,i=this.count;n<i;n++)pt.fromBufferAttribute(this,n),pt.applyMatrix4(e),this.setXYZ(n,pt.x,pt.y,pt.z);return this}applyNormalMatrix(e){for(let n=0,i=this.count;n<i;n++)pt.fromBufferAttribute(this,n),pt.applyNormalMatrix(e),this.setXYZ(n,pt.x,pt.y,pt.z);return this}transformDirection(e){for(let n=0,i=this.count;n<i;n++)pt.fromBufferAttribute(this,n),pt.transformDirection(e),this.setXYZ(n,pt.x,pt.y,pt.z);return this}set(e,n=0){return this.array.set(e,n),this}getComponent(e,n){let i=this.array[e*this.itemSize+n];return this.normalized&&(i=zs(i,this.array)),i}setComponent(e,n,i){return this.normalized&&(i=Yt(i,this.array)),this.array[e*this.itemSize+n]=i,this}getX(e){let n=this.array[e*this.itemSize];return this.normalized&&(n=zs(n,this.array)),n}setX(e,n){return this.normalized&&(n=Yt(n,this.array)),this.array[e*this.itemSize]=n,this}getY(e){let n=this.array[e*this.itemSize+1];return this.normalized&&(n=zs(n,this.array)),n}setY(e,n){return this.normalized&&(n=Yt(n,this.array)),this.array[e*this.itemSize+1]=n,this}getZ(e){let n=this.array[e*this.itemSize+2];return this.normalized&&(n=zs(n,this.array)),n}setZ(e,n){return this.normalized&&(n=Yt(n,this.array)),this.array[e*this.itemSize+2]=n,this}getW(e){let n=this.array[e*this.itemSize+3];return this.normalized&&(n=zs(n,this.array)),n}setW(e,n){return this.normalized&&(n=Yt(n,this.array)),this.array[e*this.itemSize+3]=n,this}setXY(e,n,i){return e*=this.itemSize,this.normalized&&(n=Yt(n,this.array),i=Yt(i,this.array)),this.array[e+0]=n,this.array[e+1]=i,this}setXYZ(e,n,i,r){return e*=this.itemSize,this.normalized&&(n=Yt(n,this.array),i=Yt(i,this.array),r=Yt(r,this.array)),this.array[e+0]=n,this.array[e+1]=i,this.array[e+2]=r,this}setXYZW(e,n,i,r,s){return e*=this.itemSize,this.normalized&&(n=Yt(n,this.array),i=Yt(i,this.array),r=Yt(r,this.array),s=Yt(s,this.array)),this.array[e+0]=n,this.array[e+1]=i,this.array[e+2]=r,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Uh&&(e.usage=this.usage),e}}class r_ extends Xn{constructor(e,n,i){super(new Uint16Array(e),n,i)}}class s_ extends Xn{constructor(e,n,i){super(new Uint32Array(e),n,i)}}class pr extends Xn{constructor(e,n,i){super(new Float32Array(e),n,i)}}let pS=0;const mn=new vt,wu=new zt,Nr=new z,on=new Co,Gs=new Co,Mt=new z;class Er extends ws{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:pS++}),this.uuid=Ao(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Zg(e)?s_:r_)(e,1):this.index=e,this}getAttribute(e){return this.attributes[e]}setAttribute(e,n){return this.attributes[e]=n,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,n,i=0){this.groups.push({start:e,count:n,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,n){this.drawRange.start=e,this.drawRange.count=n}applyMatrix4(e){const n=this.attributes.position;n!==void 0&&(n.applyMatrix4(e),n.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const s=new Oe().getNormalMatrix(e);i.applyNormalMatrix(s),i.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return mn.makeRotationFromQuaternion(e),this.applyMatrix4(mn),this}rotateX(e){return mn.makeRotationX(e),this.applyMatrix4(mn),this}rotateY(e){return mn.makeRotationY(e),this.applyMatrix4(mn),this}rotateZ(e){return mn.makeRotationZ(e),this.applyMatrix4(mn),this}translate(e,n,i){return mn.makeTranslation(e,n,i),this.applyMatrix4(mn),this}scale(e,n,i){return mn.makeScale(e,n,i),this.applyMatrix4(mn),this}lookAt(e){return wu.lookAt(e),wu.updateMatrix(),this.applyMatrix4(wu.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Nr).negate(),this.translate(Nr.x,Nr.y,Nr.z),this}setFromPoints(e){const n=[];for(let i=0,r=e.length;i<r;i++){const s=e[i];n.push(s.x,s.y,s.z||0)}return this.setAttribute("position",new pr(n,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Co);const e=this.attributes.position,n=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingBox.set(new z(-1/0,-1/0,-1/0),new z(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),n)for(let i=0,r=n.length;i<r;i++){const s=n[i];on.setFromBufferAttribute(s),this.morphTargetsRelative?(Mt.addVectors(this.boundingBox.min,on.min),this.boundingBox.expandByPoint(Mt),Mt.addVectors(this.boundingBox.max,on.max),this.boundingBox.expandByPoint(Mt)):(this.boundingBox.expandByPoint(on.min),this.boundingBox.expandByPoint(on.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Ff);const e=this.attributes.position,n=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingSphere.set(new z,1/0);return}if(e){const i=this.boundingSphere.center;if(on.setFromBufferAttribute(e),n)for(let s=0,o=n.length;s<o;s++){const a=n[s];Gs.setFromBufferAttribute(a),this.morphTargetsRelative?(Mt.addVectors(on.min,Gs.min),on.expandByPoint(Mt),Mt.addVectors(on.max,Gs.max),on.expandByPoint(Mt)):(on.expandByPoint(Gs.min),on.expandByPoint(Gs.max))}on.getCenter(i);let r=0;for(let s=0,o=e.count;s<o;s++)Mt.fromBufferAttribute(e,s),r=Math.max(r,i.distanceToSquared(Mt));if(n)for(let s=0,o=n.length;s<o;s++){const a=n[s],l=this.morphTargetsRelative;for(let u=0,f=a.count;u<f;u++)Mt.fromBufferAttribute(a,u),l&&(Nr.fromBufferAttribute(e,u),Mt.add(Nr)),r=Math.max(r,i.distanceToSquared(Mt))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,n=this.attributes;if(e===null||n.position===void 0||n.normal===void 0||n.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=e.array,r=n.position.array,s=n.normal.array,o=n.uv.array,a=r.length/3;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Xn(new Float32Array(4*a),4));const l=this.getAttribute("tangent").array,u=[],f=[];for(let x=0;x<a;x++)u[x]=new z,f[x]=new z;const d=new z,h=new z,m=new z,v=new Ge,S=new Ge,p=new Ge,c=new z,_=new z;function g(x,C,X){d.fromArray(r,x*3),h.fromArray(r,C*3),m.fromArray(r,X*3),v.fromArray(o,x*2),S.fromArray(o,C*2),p.fromArray(o,X*2),h.sub(d),m.sub(d),S.sub(v),p.sub(v);const Q=1/(S.x*p.y-p.x*S.y);isFinite(Q)&&(c.copy(h).multiplyScalar(p.y).addScaledVector(m,-S.y).multiplyScalar(Q),_.copy(m).multiplyScalar(S.x).addScaledVector(h,-p.x).multiplyScalar(Q),u[x].add(c),u[C].add(c),u[X].add(c),f[x].add(_),f[C].add(_),f[X].add(_))}let M=this.groups;M.length===0&&(M=[{start:0,count:i.length}]);for(let x=0,C=M.length;x<C;++x){const X=M[x],Q=X.start,L=X.count;for(let W=Q,V=Q+L;W<V;W+=3)g(i[W+0],i[W+1],i[W+2])}const P=new z,R=new z,w=new z,N=new z;function K(x){w.fromArray(s,x*3),N.copy(w);const C=u[x];P.copy(C),P.sub(w.multiplyScalar(w.dot(C))).normalize(),R.crossVectors(N,C);const Q=R.dot(f[x])<0?-1:1;l[x*4]=P.x,l[x*4+1]=P.y,l[x*4+2]=P.z,l[x*4+3]=Q}for(let x=0,C=M.length;x<C;++x){const X=M[x],Q=X.start,L=X.count;for(let W=Q,V=Q+L;W<V;W+=3)K(i[W+0]),K(i[W+1]),K(i[W+2])}}computeVertexNormals(){const e=this.index,n=this.getAttribute("position");if(n!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new Xn(new Float32Array(n.count*3),3),this.setAttribute("normal",i);else for(let h=0,m=i.count;h<m;h++)i.setXYZ(h,0,0,0);const r=new z,s=new z,o=new z,a=new z,l=new z,u=new z,f=new z,d=new z;if(e)for(let h=0,m=e.count;h<m;h+=3){const v=e.getX(h+0),S=e.getX(h+1),p=e.getX(h+2);r.fromBufferAttribute(n,v),s.fromBufferAttribute(n,S),o.fromBufferAttribute(n,p),f.subVectors(o,s),d.subVectors(r,s),f.cross(d),a.fromBufferAttribute(i,v),l.fromBufferAttribute(i,S),u.fromBufferAttribute(i,p),a.add(f),l.add(f),u.add(f),i.setXYZ(v,a.x,a.y,a.z),i.setXYZ(S,l.x,l.y,l.z),i.setXYZ(p,u.x,u.y,u.z)}else for(let h=0,m=n.count;h<m;h+=3)r.fromBufferAttribute(n,h+0),s.fromBufferAttribute(n,h+1),o.fromBufferAttribute(n,h+2),f.subVectors(o,s),d.subVectors(r,s),f.cross(d),i.setXYZ(h+0,f.x,f.y,f.z),i.setXYZ(h+1,f.x,f.y,f.z),i.setXYZ(h+2,f.x,f.y,f.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let n=0,i=e.count;n<i;n++)Mt.fromBufferAttribute(e,n),Mt.normalize(),e.setXYZ(n,Mt.x,Mt.y,Mt.z)}toNonIndexed(){function e(a,l){const u=a.array,f=a.itemSize,d=a.normalized,h=new u.constructor(l.length*f);let m=0,v=0;for(let S=0,p=l.length;S<p;S++){a.isInterleavedBufferAttribute?m=l[S]*a.data.stride+a.offset:m=l[S]*f;for(let c=0;c<f;c++)h[v++]=u[m++]}return new Xn(h,f,d)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const n=new Er,i=this.index.array,r=this.attributes;for(const a in r){const l=r[a],u=e(l,i);n.setAttribute(a,u)}const s=this.morphAttributes;for(const a in s){const l=[],u=s[a];for(let f=0,d=u.length;f<d;f++){const h=u[f],m=e(h,i);l.push(m)}n.morphAttributes[a]=l}n.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,l=o.length;a<l;a++){const u=o[a];n.addGroup(u.start,u.count,u.materialIndex)}return n}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const u in l)l[u]!==void 0&&(e[u]=l[u]);return e}e.data={attributes:{}};const n=this.index;n!==null&&(e.data.index={type:n.array.constructor.name,array:Array.prototype.slice.call(n.array)});const i=this.attributes;for(const l in i){const u=i[l];e.data.attributes[l]=u.toJSON(e.data)}const r={};let s=!1;for(const l in this.morphAttributes){const u=this.morphAttributes[l],f=[];for(let d=0,h=u.length;d<h;d++){const m=u[d];f.push(m.toJSON(e.data))}f.length>0&&(r[l]=f,s=!0)}s&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(e.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const n={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone(n));const r=e.attributes;for(const u in r){const f=r[u];this.setAttribute(u,f.clone(n))}const s=e.morphAttributes;for(const u in s){const f=[],d=s[u];for(let h=0,m=d.length;h<m;h++)f.push(d[h].clone(n));this.morphAttributes[u]=f}this.morphTargetsRelative=e.morphTargetsRelative;const o=e.groups;for(let u=0,f=o.length;u<f;u++){const d=o[u];this.addGroup(d.start,d.count,d.materialIndex)}const a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Yh=new vt,Zi=new sS,sa=new Ff,qh=new z,Ir=new z,Fr=new z,Or=new z,Au=new z,oa=new z,aa=new Ge,la=new Ge,ua=new Ge,$h=new z,Kh=new z,Zh=new z,ca=new z,fa=new z;class Un extends zt{constructor(e=new Er,n=new i_){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=n,this.updateMorphTargets()}copy(e,n){return super.copy(e,n),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const n=this.geometry.morphAttributes,i=Object.keys(n);if(i.length>0){const r=n[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){const a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}getVertexPosition(e,n){const i=this.geometry,r=i.attributes.position,s=i.morphAttributes.position,o=i.morphTargetsRelative;n.fromBufferAttribute(r,e);const a=this.morphTargetInfluences;if(s&&a){oa.set(0,0,0);for(let l=0,u=s.length;l<u;l++){const f=a[l],d=s[l];f!==0&&(Au.fromBufferAttribute(d,e),o?oa.addScaledVector(Au,f):oa.addScaledVector(Au.sub(n),f))}n.add(oa)}return n}raycast(e,n){const i=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),sa.copy(i.boundingSphere),sa.applyMatrix4(s),Zi.copy(e.ray).recast(e.near),!(sa.containsPoint(Zi.origin)===!1&&(Zi.intersectSphere(sa,qh)===null||Zi.origin.distanceToSquared(qh)>(e.far-e.near)**2))&&(Yh.copy(s).invert(),Zi.copy(e.ray).applyMatrix4(Yh),!(i.boundingBox!==null&&Zi.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,n,Zi)))}_computeIntersections(e,n,i){let r;const s=this.geometry,o=this.material,a=s.index,l=s.attributes.position,u=s.attributes.uv,f=s.attributes.uv1,d=s.attributes.normal,h=s.groups,m=s.drawRange;if(a!==null)if(Array.isArray(o))for(let v=0,S=h.length;v<S;v++){const p=h[v],c=o[p.materialIndex],_=Math.max(p.start,m.start),g=Math.min(a.count,Math.min(p.start+p.count,m.start+m.count));for(let M=_,P=g;M<P;M+=3){const R=a.getX(M),w=a.getX(M+1),N=a.getX(M+2);r=da(this,c,e,i,u,f,d,R,w,N),r&&(r.faceIndex=Math.floor(M/3),r.face.materialIndex=p.materialIndex,n.push(r))}}else{const v=Math.max(0,m.start),S=Math.min(a.count,m.start+m.count);for(let p=v,c=S;p<c;p+=3){const _=a.getX(p),g=a.getX(p+1),M=a.getX(p+2);r=da(this,o,e,i,u,f,d,_,g,M),r&&(r.faceIndex=Math.floor(p/3),n.push(r))}}else if(l!==void 0)if(Array.isArray(o))for(let v=0,S=h.length;v<S;v++){const p=h[v],c=o[p.materialIndex],_=Math.max(p.start,m.start),g=Math.min(l.count,Math.min(p.start+p.count,m.start+m.count));for(let M=_,P=g;M<P;M+=3){const R=M,w=M+1,N=M+2;r=da(this,c,e,i,u,f,d,R,w,N),r&&(r.faceIndex=Math.floor(M/3),r.face.materialIndex=p.materialIndex,n.push(r))}}else{const v=Math.max(0,m.start),S=Math.min(l.count,m.start+m.count);for(let p=v,c=S;p<c;p+=3){const _=p,g=p+1,M=p+2;r=da(this,o,e,i,u,f,d,_,g,M),r&&(r.faceIndex=Math.floor(p/3),n.push(r))}}}}function mS(t,e,n,i,r,s,o,a){let l;if(e.side===tn?l=i.intersectTriangle(o,s,r,!0,a):l=i.intersectTriangle(r,s,o,e.side===Gi,a),l===null)return null;fa.copy(a),fa.applyMatrix4(t.matrixWorld);const u=n.ray.origin.distanceTo(fa);return u<n.near||u>n.far?null:{distance:u,point:fa.clone(),object:t}}function da(t,e,n,i,r,s,o,a,l,u){t.getVertexPosition(a,Ir),t.getVertexPosition(l,Fr),t.getVertexPosition(u,Or);const f=mS(t,e,n,i,Ir,Fr,Or,ca);if(f){r&&(aa.fromBufferAttribute(r,a),la.fromBufferAttribute(r,l),ua.fromBufferAttribute(r,u),f.uv=Gn.getInterpolation(ca,Ir,Fr,Or,aa,la,ua,new Ge)),s&&(aa.fromBufferAttribute(s,a),la.fromBufferAttribute(s,l),ua.fromBufferAttribute(s,u),f.uv1=Gn.getInterpolation(ca,Ir,Fr,Or,aa,la,ua,new Ge),f.uv2=f.uv1),o&&($h.fromBufferAttribute(o,a),Kh.fromBufferAttribute(o,l),Zh.fromBufferAttribute(o,u),f.normal=Gn.getInterpolation(ca,Ir,Fr,Or,$h,Kh,Zh,new z),f.normal.dot(i.direction)>0&&f.normal.multiplyScalar(-1));const d={a,b:l,c:u,normal:new z,materialIndex:0};Gn.getNormal(Ir,Fr,Or,d.normal),f.face=d}return f}class As extends Er{constructor(e=1,n=1,i=1,r=1,s=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:n,depth:i,widthSegments:r,heightSegments:s,depthSegments:o};const a=this;r=Math.floor(r),s=Math.floor(s),o=Math.floor(o);const l=[],u=[],f=[],d=[];let h=0,m=0;v("z","y","x",-1,-1,i,n,e,o,s,0),v("z","y","x",1,-1,i,n,-e,o,s,1),v("x","z","y",1,1,e,i,n,r,o,2),v("x","z","y",1,-1,e,i,-n,r,o,3),v("x","y","z",1,-1,e,n,i,r,s,4),v("x","y","z",-1,-1,e,n,-i,r,s,5),this.setIndex(l),this.setAttribute("position",new pr(u,3)),this.setAttribute("normal",new pr(f,3)),this.setAttribute("uv",new pr(d,2));function v(S,p,c,_,g,M,P,R,w,N,K){const x=M/w,C=P/N,X=M/2,Q=P/2,L=R/2,W=w+1,V=N+1;let Y=0,b=0;const I=new z;for(let B=0;B<V;B++){const j=B*C-Q;for(let ee=0;ee<W;ee++){const ye=ee*x-X;I[S]=ye*_,I[p]=j*g,I[c]=L,u.push(I.x,I.y,I.z),I[S]=0,I[p]=0,I[c]=R>0?1:-1,f.push(I.x,I.y,I.z),d.push(ee/w),d.push(1-B/N),Y+=1}}for(let B=0;B<N;B++)for(let j=0;j<w;j++){const ee=h+j+W*B,ye=h+j+W*(B+1),H=h+(j+1)+W*(B+1),q=h+(j+1)+W*B;l.push(ee,ye,q),l.push(ye,H,q),b+=6}a.addGroup(m,b,K),m+=b,h+=Y}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new As(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function ys(t){const e={};for(const n in t){e[n]={};for(const i in t[n]){const r=t[n][i];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)?r.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[n][i]=null):e[n][i]=r.clone():Array.isArray(r)?e[n][i]=r.slice():e[n][i]=r}}return e}function Ht(t){const e={};for(let n=0;n<t.length;n++){const i=ys(t[n]);for(const r in i)e[r]=i[r]}return e}function gS(t){const e=[];for(let n=0;n<t.length;n++)e.push(t[n].clone());return e}function o_(t){return t.getRenderTarget()===null?t.outputColorSpace:$e.workingColorSpace}const _S={clone:ys,merge:Ht};var vS=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,xS=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Vi extends Po{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=vS,this.fragmentShader=xS,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={derivatives:!1,fragDepth:!1,drawBuffers:!1,shaderTextureLOD:!1,clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=ys(e.uniforms),this.uniformsGroups=gS(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const n=super.toJSON(e);n.glslVersion=this.glslVersion,n.uniforms={};for(const r in this.uniforms){const o=this.uniforms[r].value;o&&o.isTexture?n.uniforms[r]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?n.uniforms[r]={type:"c",value:o.getHex()}:o&&o.isVector2?n.uniforms[r]={type:"v2",value:o.toArray()}:o&&o.isVector3?n.uniforms[r]={type:"v3",value:o.toArray()}:o&&o.isVector4?n.uniforms[r]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?n.uniforms[r]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?n.uniforms[r]={type:"m4",value:o.toArray()}:n.uniforms[r]={value:o}}Object.keys(this.defines).length>0&&(n.defines=this.defines),n.vertexShader=this.vertexShader,n.fragmentShader=this.fragmentShader,n.lights=this.lights,n.clipping=this.clipping;const i={};for(const r in this.extensions)this.extensions[r]===!0&&(i[r]=!0);return Object.keys(i).length>0&&(n.extensions=i),n}}class a_ extends zt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new vt,this.projectionMatrix=new vt,this.projectionMatrixInverse=new vt,this.coordinateSystem=oi}copy(e,n){return super.copy(e,n),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,n){super.updateWorldMatrix(e,n),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Si=new z,Qh=new Ge,Jh=new Ge;class vn extends a_{constructor(e=50,n=1,i=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=r,this.focus=10,this.aspect=n,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,n){return super.copy(e,n),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const n=.5*this.getFilmHeight()/e;this.fov=Ic*2*Math.atan(n),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(uu*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Ic*2*Math.atan(Math.tan(uu*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,n,i){Si.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Si.x,Si.y).multiplyScalar(-e/Si.z),Si.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(Si.x,Si.y).multiplyScalar(-e/Si.z)}getViewSize(e,n){return this.getViewBounds(e,Qh,Jh),n.subVectors(Jh,Qh)}setViewOffset(e,n,i,r,s,o){this.aspect=e/n,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=n,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let n=e*Math.tan(uu*.5*this.fov)/this.zoom,i=2*n,r=this.aspect*i,s=-.5*r;const o=this.view;if(this.view!==null&&this.view.enabled){const l=o.fullWidth,u=o.fullHeight;s+=o.offsetX*r/l,n-=o.offsetY*i/u,r*=o.width/l,i*=o.height/u}const a=this.filmOffset;a!==0&&(s+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,n,n-i,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const n=super.toJSON(e);return n.object.fov=this.fov,n.object.zoom=this.zoom,n.object.near=this.near,n.object.far=this.far,n.object.focus=this.focus,n.object.aspect=this.aspect,this.view!==null&&(n.object.view=Object.assign({},this.view)),n.object.filmGauge=this.filmGauge,n.object.filmOffset=this.filmOffset,n}}const zr=-90,kr=1;class SS extends zt{constructor(e,n,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new vn(zr,kr,e,n);r.layers=this.layers,this.add(r);const s=new vn(zr,kr,e,n);s.layers=this.layers,this.add(s);const o=new vn(zr,kr,e,n);o.layers=this.layers,this.add(o);const a=new vn(zr,kr,e,n);a.layers=this.layers,this.add(a);const l=new vn(zr,kr,e,n);l.layers=this.layers,this.add(l);const u=new vn(zr,kr,e,n);u.layers=this.layers,this.add(u)}updateCoordinateSystem(){const e=this.coordinateSystem,n=this.children.concat(),[i,r,s,o,a,l]=n;for(const u of n)this.remove(u);if(e===oi)i.up.set(0,1,0),i.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===rl)i.up.set(0,-1,0),i.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const u of n)this.add(u),u.updateMatrixWorld()}update(e,n){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,o,a,l,u,f]=this.children,d=e.getRenderTarget(),h=e.getActiveCubeFace(),m=e.getActiveMipmapLevel(),v=e.xr.enabled;e.xr.enabled=!1;const S=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,e.setRenderTarget(i,0,r),e.render(n,s),e.setRenderTarget(i,1,r),e.render(n,o),e.setRenderTarget(i,2,r),e.render(n,a),e.setRenderTarget(i,3,r),e.render(n,l),e.setRenderTarget(i,4,r),e.render(n,u),i.texture.generateMipmaps=S,e.setRenderTarget(i,5,r),e.render(n,f),e.setRenderTarget(d,h,m),e.xr.enabled=v,i.texture.needsPMREMUpdate=!0}}class l_ extends nn{constructor(e,n,i,r,s,o,a,l,u,f){e=e!==void 0?e:[],n=n!==void 0?n:vs,super(e,n,i,r,s,o,a,l,u,f),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class yS extends Sr{constructor(e=1,n={}){super(e,e,n),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},r=[i,i,i,i,i,i];n.encoding!==void 0&&(us("THREE.WebGLCubeRenderTarget: option.encoding has been replaced by option.colorSpace."),n.colorSpace=n.encoding===hr?Tt:xn),this.texture=new l_(r,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=n.generateMipmaps!==void 0?n.generateMipmaps:!1,this.texture.minFilter=n.minFilter!==void 0?n.minFilter:qt}fromEquirectangularTexture(e,n){this.texture.type=n.type,this.texture.colorSpace=n.colorSpace,this.texture.generateMipmaps=n.generateMipmaps,this.texture.minFilter=n.minFilter,this.texture.magFilter=n.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new As(5,5,5),s=new Vi({name:"CubemapFromEquirect",uniforms:ys(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:tn,blending:Oi});s.uniforms.tEquirect.value=n;const o=new Un(r,s),a=n.minFilter;return n.minFilter===lr&&(n.minFilter=qt),new SS(1,10,this).update(e,o),n.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,n,i,r){const s=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(n,i,r);e.setRenderTarget(s)}}const Ru=new z,MS=new z,ES=new Oe;class tr{constructor(e=new z(1,0,0),n=0){this.isPlane=!0,this.normal=e,this.constant=n}set(e,n){return this.normal.copy(e),this.constant=n,this}setComponents(e,n,i,r){return this.normal.set(e,n,i),this.constant=r,this}setFromNormalAndCoplanarPoint(e,n){return this.normal.copy(e),this.constant=-n.dot(this.normal),this}setFromCoplanarPoints(e,n,i){const r=Ru.subVectors(i,n).cross(MS.subVectors(e,n)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,n){return n.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,n){const i=e.delta(Ru),r=this.normal.dot(i);if(r===0)return this.distanceToPoint(e.start)===0?n.copy(e.start):null;const s=-(e.start.dot(this.normal)+this.constant)/r;return s<0||s>1?null:n.copy(e.start).addScaledVector(i,s)}intersectsLine(e){const n=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return n<0&&i>0||i<0&&n>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,n){const i=n||ES.getNormalMatrix(e),r=this.coplanarPoint(Ru).applyMatrix4(e),s=this.normal.applyMatrix3(i).normalize();return this.constant=-r.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Qi=new Ff,ha=new z;class Of{constructor(e=new tr,n=new tr,i=new tr,r=new tr,s=new tr,o=new tr){this.planes=[e,n,i,r,s,o]}set(e,n,i,r,s,o){const a=this.planes;return a[0].copy(e),a[1].copy(n),a[2].copy(i),a[3].copy(r),a[4].copy(s),a[5].copy(o),this}copy(e){const n=this.planes;for(let i=0;i<6;i++)n[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,n=oi){const i=this.planes,r=e.elements,s=r[0],o=r[1],a=r[2],l=r[3],u=r[4],f=r[5],d=r[6],h=r[7],m=r[8],v=r[9],S=r[10],p=r[11],c=r[12],_=r[13],g=r[14],M=r[15];if(i[0].setComponents(l-s,h-u,p-m,M-c).normalize(),i[1].setComponents(l+s,h+u,p+m,M+c).normalize(),i[2].setComponents(l+o,h+f,p+v,M+_).normalize(),i[3].setComponents(l-o,h-f,p-v,M-_).normalize(),i[4].setComponents(l-a,h-d,p-S,M-g).normalize(),n===oi)i[5].setComponents(l+a,h+d,p+S,M+g).normalize();else if(n===rl)i[5].setComponents(a,d,S,g).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+n);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Qi.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const n=e.geometry;n.boundingSphere===null&&n.computeBoundingSphere(),Qi.copy(n.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Qi)}intersectsSprite(e){return Qi.center.set(0,0,0),Qi.radius=.7071067811865476,Qi.applyMatrix4(e.matrixWorld),this.intersectsSphere(Qi)}intersectsSphere(e){const n=this.planes,i=e.center,r=-e.radius;for(let s=0;s<6;s++)if(n[s].distanceToPoint(i)<r)return!1;return!0}intersectsBox(e){const n=this.planes;for(let i=0;i<6;i++){const r=n[i];if(ha.x=r.normal.x>0?e.max.x:e.min.x,ha.y=r.normal.y>0?e.max.y:e.min.y,ha.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(ha)<0)return!1}return!0}containsPoint(e){const n=this.planes;for(let i=0;i<6;i++)if(n[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function u_(){let t=null,e=!1,n=null,i=null;function r(s,o){n(s,o),i=t.requestAnimationFrame(r)}return{start:function(){e!==!0&&n!==null&&(i=t.requestAnimationFrame(r),e=!0)},stop:function(){t.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(s){n=s},setContext:function(s){t=s}}}function TS(t,e){const n=e.isWebGL2,i=new WeakMap;function r(u,f){const d=u.array,h=u.usage,m=d.byteLength,v=t.createBuffer();t.bindBuffer(f,v),t.bufferData(f,d,h),u.onUploadCallback();let S;if(d instanceof Float32Array)S=t.FLOAT;else if(d instanceof Uint16Array)if(u.isFloat16BufferAttribute)if(n)S=t.HALF_FLOAT;else throw new Error("THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.");else S=t.UNSIGNED_SHORT;else if(d instanceof Int16Array)S=t.SHORT;else if(d instanceof Uint32Array)S=t.UNSIGNED_INT;else if(d instanceof Int32Array)S=t.INT;else if(d instanceof Int8Array)S=t.BYTE;else if(d instanceof Uint8Array)S=t.UNSIGNED_BYTE;else if(d instanceof Uint8ClampedArray)S=t.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+d);return{buffer:v,type:S,bytesPerElement:d.BYTES_PER_ELEMENT,version:u.version,size:m}}function s(u,f,d){const h=f.array,m=f._updateRange,v=f.updateRanges;if(t.bindBuffer(d,u),m.count===-1&&v.length===0&&t.bufferSubData(d,0,h),v.length!==0){for(let S=0,p=v.length;S<p;S++){const c=v[S];n?t.bufferSubData(d,c.start*h.BYTES_PER_ELEMENT,h,c.start,c.count):t.bufferSubData(d,c.start*h.BYTES_PER_ELEMENT,h.subarray(c.start,c.start+c.count))}f.clearUpdateRanges()}m.count!==-1&&(n?t.bufferSubData(d,m.offset*h.BYTES_PER_ELEMENT,h,m.offset,m.count):t.bufferSubData(d,m.offset*h.BYTES_PER_ELEMENT,h.subarray(m.offset,m.offset+m.count)),m.count=-1),f.onUploadCallback()}function o(u){return u.isInterleavedBufferAttribute&&(u=u.data),i.get(u)}function a(u){u.isInterleavedBufferAttribute&&(u=u.data);const f=i.get(u);f&&(t.deleteBuffer(f.buffer),i.delete(u))}function l(u,f){if(u.isGLBufferAttribute){const h=i.get(u);(!h||h.version<u.version)&&i.set(u,{buffer:u.buffer,type:u.type,bytesPerElement:u.elementSize,version:u.version});return}u.isInterleavedBufferAttribute&&(u=u.data);const d=i.get(u);if(d===void 0)i.set(u,r(u,f));else if(d.version<u.version){if(d.size!==u.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");s(d.buffer,u,f),d.version=u.version}}return{get:o,remove:a,update:l}}class wl extends Er{constructor(e=1,n=1,i=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:n,widthSegments:i,heightSegments:r};const s=e/2,o=n/2,a=Math.floor(i),l=Math.floor(r),u=a+1,f=l+1,d=e/a,h=n/l,m=[],v=[],S=[],p=[];for(let c=0;c<f;c++){const _=c*h-o;for(let g=0;g<u;g++){const M=g*d-s;v.push(M,-_,0),S.push(0,0,1),p.push(g/a),p.push(1-c/l)}}for(let c=0;c<l;c++)for(let _=0;_<a;_++){const g=_+u*c,M=_+u*(c+1),P=_+1+u*(c+1),R=_+1+u*c;m.push(g,M,R),m.push(M,P,R)}this.setIndex(m),this.setAttribute("position",new pr(v,3)),this.setAttribute("normal",new pr(S,3)),this.setAttribute("uv",new pr(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new wl(e.width,e.height,e.widthSegments,e.heightSegments)}}var wS=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,AS=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,RS=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,CS=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,PS=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,LS=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,bS=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,DS=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,US=`#ifdef USE_BATCHING
	attribute float batchId;
	uniform highp sampler2D batchingTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,NS=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( batchId );
#endif`,IS=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,FS=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,OS=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,zS=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,kS=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,BS=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,HS=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,GS=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,VS=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,WS=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,XS=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,jS=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`,YS=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`,qS=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
float luminance( const in vec3 rgb ) {
	const vec3 weights = vec3( 0.2126729, 0.7151522, 0.0721750 );
	return dot( weights, rgb );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,$S=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,KS=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,ZS=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,QS=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,JS=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,ey=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,ty="gl_FragColor = linearToOutputTexel( gl_FragColor );",ny=`
const mat3 LINEAR_SRGB_TO_LINEAR_DISPLAY_P3 = mat3(
	vec3( 0.8224621, 0.177538, 0.0 ),
	vec3( 0.0331941, 0.9668058, 0.0 ),
	vec3( 0.0170827, 0.0723974, 0.9105199 )
);
const mat3 LINEAR_DISPLAY_P3_TO_LINEAR_SRGB = mat3(
	vec3( 1.2249401, - 0.2249404, 0.0 ),
	vec3( - 0.0420569, 1.0420571, 0.0 ),
	vec3( - 0.0196376, - 0.0786361, 1.0982735 )
);
vec4 LinearSRGBToLinearDisplayP3( in vec4 value ) {
	return vec4( value.rgb * LINEAR_SRGB_TO_LINEAR_DISPLAY_P3, value.a );
}
vec4 LinearDisplayP3ToLinearSRGB( in vec4 value ) {
	return vec4( value.rgb * LINEAR_DISPLAY_P3_TO_LINEAR_SRGB, value.a );
}
vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}
vec4 LinearToLinear( in vec4 value ) {
	return value;
}
vec4 LinearTosRGB( in vec4 value ) {
	return sRGBTransferOETF( value );
}`,iy=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,ry=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,sy=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,oy=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,ay=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,ly=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,uy=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,cy=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,fy=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,dy=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,hy=`#ifdef USE_LIGHTMAP
	vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
	vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
	reflectedLight.indirectDiffuse += lightMapIrradiance;
#endif`,py=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,my=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,gy=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,_y=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	#if defined ( LEGACY_LIGHTS )
		if ( cutoffDistance > 0.0 && decayExponent > 0.0 ) {
			return pow( saturate( - lightDistance / cutoffDistance + 1.0 ), decayExponent );
		}
		return 1.0;
	#else
		float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
		if ( cutoffDistance > 0.0 ) {
			distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
		}
		return distanceFalloff;
	#endif
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,vy=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,xy=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Sy=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,yy=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,My=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Ey=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,Ty=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,wy=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Ay=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Ry=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Cy=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	gl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Py=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Ly=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		varying float vFragDepth;
		varying float vIsPerspective;
	#else
		uniform float logDepthBufFC;
	#endif
#endif`,by=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		vFragDepth = 1.0 + gl_Position.w;
		vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
	#else
		if ( isPerspectiveMatrix( projectionMatrix ) ) {
			gl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;
			gl_Position.z *= gl_Position.w;
		}
	#endif
#endif`,Dy=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Uy=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Ny=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,Iy=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Fy=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Oy=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,zy=`#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,ky=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		objectNormal += morphNormal0 * morphTargetInfluences[ 0 ];
		objectNormal += morphNormal1 * morphTargetInfluences[ 1 ];
		objectNormal += morphNormal2 * morphTargetInfluences[ 2 ];
		objectNormal += morphNormal3 * morphTargetInfluences[ 3 ];
	#endif
#endif`,By=`#ifdef USE_MORPHTARGETS
	uniform float morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
		uniform sampler2DArray morphTargetsTexture;
		uniform ivec2 morphTargetsTextureSize;
		vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
			int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
			int y = texelIndex / morphTargetsTextureSize.x;
			int x = texelIndex - y * morphTargetsTextureSize.x;
			ivec3 morphUV = ivec3( x, y, morphTargetIndex );
			return texelFetch( morphTargetsTexture, morphUV, 0 );
		}
	#else
		#ifndef USE_MORPHNORMALS
			uniform float morphTargetInfluences[ 8 ];
		#else
			uniform float morphTargetInfluences[ 4 ];
		#endif
	#endif
#endif`,Hy=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		transformed += morphTarget0 * morphTargetInfluences[ 0 ];
		transformed += morphTarget1 * morphTargetInfluences[ 1 ];
		transformed += morphTarget2 * morphTargetInfluences[ 2 ];
		transformed += morphTarget3 * morphTargetInfluences[ 3 ];
		#ifndef USE_MORPHNORMALS
			transformed += morphTarget4 * morphTargetInfluences[ 4 ];
			transformed += morphTarget5 * morphTargetInfluences[ 5 ];
			transformed += morphTarget6 * morphTargetInfluences[ 6 ];
			transformed += morphTarget7 * morphTargetInfluences[ 7 ];
		#endif
	#endif
#endif`,Gy=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,Vy=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Wy=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Xy=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,jy=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Yy=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,qy=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,$y=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Ky=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Zy=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Qy=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Jy=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;
const vec3 PackFactors = vec3( 256. * 256. * 256., 256. * 256., 256. );
const vec4 UnpackFactors = UnpackDownscale / vec4( PackFactors, 1. );
const float ShiftRight8 = 1. / 256.;
vec4 packDepthToRGBA( const in float v ) {
	vec4 r = vec4( fract( v * PackFactors ), v );
	r.yzw -= r.xyz * ShiftRight8;	return r * PackUpscale;
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors );
}
vec2 packDepthToRG( in highp float v ) {
	return packDepthToRGBA( v ).yx;
}
float unpackRGToDepth( const in highp vec2 v ) {
	return unpackRGBAToDepth( vec4( v.xy, 0.0, 0.0 ) );
}
vec4 pack2HalfToRGBA( vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,eM=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,tM=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,nM=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,iM=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,rM=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,sM=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,oM=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return shadow;
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
		vec3 lightToPosition = shadowCoord.xyz;
		float dp = ( length( lightToPosition ) - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );		dp += shadowBias;
		vec3 bd3D = normalize( lightToPosition );
		#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
			vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
			return (
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
			) * ( 1.0 / 9.0 );
		#else
			return texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
		#endif
	}
#endif`,aM=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,lM=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,uM=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,cM=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,fM=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,dM=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,hM=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,pM=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,mM=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,gM=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,_M=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 OptimizedCineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,vM=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,xM=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
		vec3 refractedRayExit = position + transmissionRay;
		vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
		vec2 refractionCoords = ndcPos.xy / ndcPos.w;
		refractionCoords += 1.0;
		refractionCoords /= 2.0;
		vec4 transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
		vec3 transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,SM=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,yM=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,MM=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,EM=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const TM=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,wM=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,AM=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,RM=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,CM=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,PM=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,LM=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,bM=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#endif
}`,DM=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,UM=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,NM=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,IM=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,FM=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,OM=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,zM=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,kM=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,BM=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,HM=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,GM=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,VM=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,WM=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,XM=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,jM=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,YM=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,qM=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,$M=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,KM=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,ZM=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,QM=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,JM=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,eE=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,tE=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,nE=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );
	vec2 scale;
	scale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );
	scale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,iE=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Ue={alphahash_fragment:wS,alphahash_pars_fragment:AS,alphamap_fragment:RS,alphamap_pars_fragment:CS,alphatest_fragment:PS,alphatest_pars_fragment:LS,aomap_fragment:bS,aomap_pars_fragment:DS,batching_pars_vertex:US,batching_vertex:NS,begin_vertex:IS,beginnormal_vertex:FS,bsdfs:OS,iridescence_fragment:zS,bumpmap_pars_fragment:kS,clipping_planes_fragment:BS,clipping_planes_pars_fragment:HS,clipping_planes_pars_vertex:GS,clipping_planes_vertex:VS,color_fragment:WS,color_pars_fragment:XS,color_pars_vertex:jS,color_vertex:YS,common:qS,cube_uv_reflection_fragment:$S,defaultnormal_vertex:KS,displacementmap_pars_vertex:ZS,displacementmap_vertex:QS,emissivemap_fragment:JS,emissivemap_pars_fragment:ey,colorspace_fragment:ty,colorspace_pars_fragment:ny,envmap_fragment:iy,envmap_common_pars_fragment:ry,envmap_pars_fragment:sy,envmap_pars_vertex:oy,envmap_physical_pars_fragment:vy,envmap_vertex:ay,fog_vertex:ly,fog_pars_vertex:uy,fog_fragment:cy,fog_pars_fragment:fy,gradientmap_pars_fragment:dy,lightmap_fragment:hy,lightmap_pars_fragment:py,lights_lambert_fragment:my,lights_lambert_pars_fragment:gy,lights_pars_begin:_y,lights_toon_fragment:xy,lights_toon_pars_fragment:Sy,lights_phong_fragment:yy,lights_phong_pars_fragment:My,lights_physical_fragment:Ey,lights_physical_pars_fragment:Ty,lights_fragment_begin:wy,lights_fragment_maps:Ay,lights_fragment_end:Ry,logdepthbuf_fragment:Cy,logdepthbuf_pars_fragment:Py,logdepthbuf_pars_vertex:Ly,logdepthbuf_vertex:by,map_fragment:Dy,map_pars_fragment:Uy,map_particle_fragment:Ny,map_particle_pars_fragment:Iy,metalnessmap_fragment:Fy,metalnessmap_pars_fragment:Oy,morphcolor_vertex:zy,morphnormal_vertex:ky,morphtarget_pars_vertex:By,morphtarget_vertex:Hy,normal_fragment_begin:Gy,normal_fragment_maps:Vy,normal_pars_fragment:Wy,normal_pars_vertex:Xy,normal_vertex:jy,normalmap_pars_fragment:Yy,clearcoat_normal_fragment_begin:qy,clearcoat_normal_fragment_maps:$y,clearcoat_pars_fragment:Ky,iridescence_pars_fragment:Zy,opaque_fragment:Qy,packing:Jy,premultiplied_alpha_fragment:eM,project_vertex:tM,dithering_fragment:nM,dithering_pars_fragment:iM,roughnessmap_fragment:rM,roughnessmap_pars_fragment:sM,shadowmap_pars_fragment:oM,shadowmap_pars_vertex:aM,shadowmap_vertex:lM,shadowmask_pars_fragment:uM,skinbase_vertex:cM,skinning_pars_vertex:fM,skinning_vertex:dM,skinnormal_vertex:hM,specularmap_fragment:pM,specularmap_pars_fragment:mM,tonemapping_fragment:gM,tonemapping_pars_fragment:_M,transmission_fragment:vM,transmission_pars_fragment:xM,uv_pars_fragment:SM,uv_pars_vertex:yM,uv_vertex:MM,worldpos_vertex:EM,background_vert:TM,background_frag:wM,backgroundCube_vert:AM,backgroundCube_frag:RM,cube_vert:CM,cube_frag:PM,depth_vert:LM,depth_frag:bM,distanceRGBA_vert:DM,distanceRGBA_frag:UM,equirect_vert:NM,equirect_frag:IM,linedashed_vert:FM,linedashed_frag:OM,meshbasic_vert:zM,meshbasic_frag:kM,meshlambert_vert:BM,meshlambert_frag:HM,meshmatcap_vert:GM,meshmatcap_frag:VM,meshnormal_vert:WM,meshnormal_frag:XM,meshphong_vert:jM,meshphong_frag:YM,meshphysical_vert:qM,meshphysical_frag:$M,meshtoon_vert:KM,meshtoon_frag:ZM,points_vert:QM,points_frag:JM,shadow_vert:eE,shadow_frag:tE,sprite_vert:nE,sprite_frag:iE},se={common:{diffuse:{value:new We(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Oe},alphaMap:{value:null},alphaMapTransform:{value:new Oe},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Oe}},envmap:{envMap:{value:null},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Oe}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Oe}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Oe},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Oe},normalScale:{value:new Ge(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Oe},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Oe}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Oe}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Oe}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new We(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new We(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Oe},alphaTest:{value:0},uvTransform:{value:new Oe}},sprite:{diffuse:{value:new We(16777215)},opacity:{value:1},center:{value:new Ge(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Oe},alphaMap:{value:null},alphaMapTransform:{value:new Oe},alphaTest:{value:0}}},Bn={basic:{uniforms:Ht([se.common,se.specularmap,se.envmap,se.aomap,se.lightmap,se.fog]),vertexShader:Ue.meshbasic_vert,fragmentShader:Ue.meshbasic_frag},lambert:{uniforms:Ht([se.common,se.specularmap,se.envmap,se.aomap,se.lightmap,se.emissivemap,se.bumpmap,se.normalmap,se.displacementmap,se.fog,se.lights,{emissive:{value:new We(0)}}]),vertexShader:Ue.meshlambert_vert,fragmentShader:Ue.meshlambert_frag},phong:{uniforms:Ht([se.common,se.specularmap,se.envmap,se.aomap,se.lightmap,se.emissivemap,se.bumpmap,se.normalmap,se.displacementmap,se.fog,se.lights,{emissive:{value:new We(0)},specular:{value:new We(1118481)},shininess:{value:30}}]),vertexShader:Ue.meshphong_vert,fragmentShader:Ue.meshphong_frag},standard:{uniforms:Ht([se.common,se.envmap,se.aomap,se.lightmap,se.emissivemap,se.bumpmap,se.normalmap,se.displacementmap,se.roughnessmap,se.metalnessmap,se.fog,se.lights,{emissive:{value:new We(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ue.meshphysical_vert,fragmentShader:Ue.meshphysical_frag},toon:{uniforms:Ht([se.common,se.aomap,se.lightmap,se.emissivemap,se.bumpmap,se.normalmap,se.displacementmap,se.gradientmap,se.fog,se.lights,{emissive:{value:new We(0)}}]),vertexShader:Ue.meshtoon_vert,fragmentShader:Ue.meshtoon_frag},matcap:{uniforms:Ht([se.common,se.bumpmap,se.normalmap,se.displacementmap,se.fog,{matcap:{value:null}}]),vertexShader:Ue.meshmatcap_vert,fragmentShader:Ue.meshmatcap_frag},points:{uniforms:Ht([se.points,se.fog]),vertexShader:Ue.points_vert,fragmentShader:Ue.points_frag},dashed:{uniforms:Ht([se.common,se.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ue.linedashed_vert,fragmentShader:Ue.linedashed_frag},depth:{uniforms:Ht([se.common,se.displacementmap]),vertexShader:Ue.depth_vert,fragmentShader:Ue.depth_frag},normal:{uniforms:Ht([se.common,se.bumpmap,se.normalmap,se.displacementmap,{opacity:{value:1}}]),vertexShader:Ue.meshnormal_vert,fragmentShader:Ue.meshnormal_frag},sprite:{uniforms:Ht([se.sprite,se.fog]),vertexShader:Ue.sprite_vert,fragmentShader:Ue.sprite_frag},background:{uniforms:{uvTransform:{value:new Oe},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ue.background_vert,fragmentShader:Ue.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1}},vertexShader:Ue.backgroundCube_vert,fragmentShader:Ue.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ue.cube_vert,fragmentShader:Ue.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ue.equirect_vert,fragmentShader:Ue.equirect_frag},distanceRGBA:{uniforms:Ht([se.common,se.displacementmap,{referencePosition:{value:new z},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ue.distanceRGBA_vert,fragmentShader:Ue.distanceRGBA_frag},shadow:{uniforms:Ht([se.lights,se.fog,{color:{value:new We(0)},opacity:{value:1}}]),vertexShader:Ue.shadow_vert,fragmentShader:Ue.shadow_frag}};Bn.physical={uniforms:Ht([Bn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Oe},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Oe},clearcoatNormalScale:{value:new Ge(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Oe},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Oe},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Oe},sheen:{value:0},sheenColor:{value:new We(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Oe},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Oe},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Oe},transmissionSamplerSize:{value:new Ge},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Oe},attenuationDistance:{value:0},attenuationColor:{value:new We(0)},specularColor:{value:new We(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Oe},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Oe},anisotropyVector:{value:new Ge},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Oe}}]),vertexShader:Ue.meshphysical_vert,fragmentShader:Ue.meshphysical_frag};const pa={r:0,b:0,g:0};function rE(t,e,n,i,r,s,o){const a=new We(0);let l=s===!0?0:1,u,f,d=null,h=0,m=null;function v(p,c){let _=!1,g=c.isScene===!0?c.background:null;g&&g.isTexture&&(g=(c.backgroundBlurriness>0?n:e).get(g)),g===null?S(a,l):g&&g.isColor&&(S(g,1),_=!0);const M=t.xr.getEnvironmentBlendMode();M==="additive"?i.buffers.color.setClear(0,0,0,1,o):M==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,o),(t.autoClear||_)&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),g&&(g.isCubeTexture||g.mapping===Ml)?(f===void 0&&(f=new Un(new As(1,1,1),new Vi({name:"BackgroundCubeMaterial",uniforms:ys(Bn.backgroundCube.uniforms),vertexShader:Bn.backgroundCube.vertexShader,fragmentShader:Bn.backgroundCube.fragmentShader,side:tn,depthTest:!1,depthWrite:!1,fog:!1})),f.geometry.deleteAttribute("normal"),f.geometry.deleteAttribute("uv"),f.onBeforeRender=function(P,R,w){this.matrixWorld.copyPosition(w.matrixWorld)},Object.defineProperty(f.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(f)),f.material.uniforms.envMap.value=g,f.material.uniforms.flipEnvMap.value=g.isCubeTexture&&g.isRenderTargetTexture===!1?-1:1,f.material.uniforms.backgroundBlurriness.value=c.backgroundBlurriness,f.material.uniforms.backgroundIntensity.value=c.backgroundIntensity,f.material.toneMapped=$e.getTransfer(g.colorSpace)!==nt,(d!==g||h!==g.version||m!==t.toneMapping)&&(f.material.needsUpdate=!0,d=g,h=g.version,m=t.toneMapping),f.layers.enableAll(),p.unshift(f,f.geometry,f.material,0,0,null)):g&&g.isTexture&&(u===void 0&&(u=new Un(new wl(2,2),new Vi({name:"BackgroundMaterial",uniforms:ys(Bn.background.uniforms),vertexShader:Bn.background.vertexShader,fragmentShader:Bn.background.fragmentShader,side:Gi,depthTest:!1,depthWrite:!1,fog:!1})),u.geometry.deleteAttribute("normal"),Object.defineProperty(u.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(u)),u.material.uniforms.t2D.value=g,u.material.uniforms.backgroundIntensity.value=c.backgroundIntensity,u.material.toneMapped=$e.getTransfer(g.colorSpace)!==nt,g.matrixAutoUpdate===!0&&g.updateMatrix(),u.material.uniforms.uvTransform.value.copy(g.matrix),(d!==g||h!==g.version||m!==t.toneMapping)&&(u.material.needsUpdate=!0,d=g,h=g.version,m=t.toneMapping),u.layers.enableAll(),p.unshift(u,u.geometry,u.material,0,0,null))}function S(p,c){p.getRGB(pa,o_(t)),i.buffers.color.setClear(pa.r,pa.g,pa.b,c,o)}return{getClearColor:function(){return a},setClearColor:function(p,c=1){a.set(p),l=c,S(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(p){l=p,S(a,l)},render:v}}function sE(t,e,n,i){const r=t.getParameter(t.MAX_VERTEX_ATTRIBS),s=i.isWebGL2?null:e.get("OES_vertex_array_object"),o=i.isWebGL2||s!==null,a={},l=p(null);let u=l,f=!1;function d(L,W,V,Y,b){let I=!1;if(o){const B=S(Y,V,W);u!==B&&(u=B,m(u.object)),I=c(L,Y,V,b),I&&_(L,Y,V,b)}else{const B=W.wireframe===!0;(u.geometry!==Y.id||u.program!==V.id||u.wireframe!==B)&&(u.geometry=Y.id,u.program=V.id,u.wireframe=B,I=!0)}b!==null&&n.update(b,t.ELEMENT_ARRAY_BUFFER),(I||f)&&(f=!1,N(L,W,V,Y),b!==null&&t.bindBuffer(t.ELEMENT_ARRAY_BUFFER,n.get(b).buffer))}function h(){return i.isWebGL2?t.createVertexArray():s.createVertexArrayOES()}function m(L){return i.isWebGL2?t.bindVertexArray(L):s.bindVertexArrayOES(L)}function v(L){return i.isWebGL2?t.deleteVertexArray(L):s.deleteVertexArrayOES(L)}function S(L,W,V){const Y=V.wireframe===!0;let b=a[L.id];b===void 0&&(b={},a[L.id]=b);let I=b[W.id];I===void 0&&(I={},b[W.id]=I);let B=I[Y];return B===void 0&&(B=p(h()),I[Y]=B),B}function p(L){const W=[],V=[],Y=[];for(let b=0;b<r;b++)W[b]=0,V[b]=0,Y[b]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:W,enabledAttributes:V,attributeDivisors:Y,object:L,attributes:{},index:null}}function c(L,W,V,Y){const b=u.attributes,I=W.attributes;let B=0;const j=V.getAttributes();for(const ee in j)if(j[ee].location>=0){const H=b[ee];let q=I[ee];if(q===void 0&&(ee==="instanceMatrix"&&L.instanceMatrix&&(q=L.instanceMatrix),ee==="instanceColor"&&L.instanceColor&&(q=L.instanceColor)),H===void 0||H.attribute!==q||q&&H.data!==q.data)return!0;B++}return u.attributesNum!==B||u.index!==Y}function _(L,W,V,Y){const b={},I=W.attributes;let B=0;const j=V.getAttributes();for(const ee in j)if(j[ee].location>=0){let H=I[ee];H===void 0&&(ee==="instanceMatrix"&&L.instanceMatrix&&(H=L.instanceMatrix),ee==="instanceColor"&&L.instanceColor&&(H=L.instanceColor));const q={};q.attribute=H,H&&H.data&&(q.data=H.data),b[ee]=q,B++}u.attributes=b,u.attributesNum=B,u.index=Y}function g(){const L=u.newAttributes;for(let W=0,V=L.length;W<V;W++)L[W]=0}function M(L){P(L,0)}function P(L,W){const V=u.newAttributes,Y=u.enabledAttributes,b=u.attributeDivisors;V[L]=1,Y[L]===0&&(t.enableVertexAttribArray(L),Y[L]=1),b[L]!==W&&((i.isWebGL2?t:e.get("ANGLE_instanced_arrays"))[i.isWebGL2?"vertexAttribDivisor":"vertexAttribDivisorANGLE"](L,W),b[L]=W)}function R(){const L=u.newAttributes,W=u.enabledAttributes;for(let V=0,Y=W.length;V<Y;V++)W[V]!==L[V]&&(t.disableVertexAttribArray(V),W[V]=0)}function w(L,W,V,Y,b,I,B){B===!0?t.vertexAttribIPointer(L,W,V,b,I):t.vertexAttribPointer(L,W,V,Y,b,I)}function N(L,W,V,Y){if(i.isWebGL2===!1&&(L.isInstancedMesh||Y.isInstancedBufferGeometry)&&e.get("ANGLE_instanced_arrays")===null)return;g();const b=Y.attributes,I=V.getAttributes(),B=W.defaultAttributeValues;for(const j in I){const ee=I[j];if(ee.location>=0){let ye=b[j];if(ye===void 0&&(j==="instanceMatrix"&&L.instanceMatrix&&(ye=L.instanceMatrix),j==="instanceColor"&&L.instanceColor&&(ye=L.instanceColor)),ye!==void 0){const H=ye.normalized,q=ye.itemSize,ae=n.get(ye);if(ae===void 0)continue;const ge=ae.buffer,Me=ae.type,he=ae.bytesPerElement,Ve=i.isWebGL2===!0&&(Me===t.INT||Me===t.UNSIGNED_INT||ye.gpuType===Hg);if(ye.isInterleavedBufferAttribute){const Pe=ye.data,U=Pe.stride,Rt=ye.offset;if(Pe.isInstancedInterleavedBuffer){for(let xe=0;xe<ee.locationSize;xe++)P(ee.location+xe,Pe.meshPerAttribute);L.isInstancedMesh!==!0&&Y._maxInstanceCount===void 0&&(Y._maxInstanceCount=Pe.meshPerAttribute*Pe.count)}else for(let xe=0;xe<ee.locationSize;xe++)M(ee.location+xe);t.bindBuffer(t.ARRAY_BUFFER,ge);for(let xe=0;xe<ee.locationSize;xe++)w(ee.location+xe,q/ee.locationSize,Me,H,U*he,(Rt+q/ee.locationSize*xe)*he,Ve)}else{if(ye.isInstancedBufferAttribute){for(let Pe=0;Pe<ee.locationSize;Pe++)P(ee.location+Pe,ye.meshPerAttribute);L.isInstancedMesh!==!0&&Y._maxInstanceCount===void 0&&(Y._maxInstanceCount=ye.meshPerAttribute*ye.count)}else for(let Pe=0;Pe<ee.locationSize;Pe++)M(ee.location+Pe);t.bindBuffer(t.ARRAY_BUFFER,ge);for(let Pe=0;Pe<ee.locationSize;Pe++)w(ee.location+Pe,q/ee.locationSize,Me,H,q*he,q/ee.locationSize*Pe*he,Ve)}}else if(B!==void 0){const H=B[j];if(H!==void 0)switch(H.length){case 2:t.vertexAttrib2fv(ee.location,H);break;case 3:t.vertexAttrib3fv(ee.location,H);break;case 4:t.vertexAttrib4fv(ee.location,H);break;default:t.vertexAttrib1fv(ee.location,H)}}}}R()}function K(){X();for(const L in a){const W=a[L];for(const V in W){const Y=W[V];for(const b in Y)v(Y[b].object),delete Y[b];delete W[V]}delete a[L]}}function x(L){if(a[L.id]===void 0)return;const W=a[L.id];for(const V in W){const Y=W[V];for(const b in Y)v(Y[b].object),delete Y[b];delete W[V]}delete a[L.id]}function C(L){for(const W in a){const V=a[W];if(V[L.id]===void 0)continue;const Y=V[L.id];for(const b in Y)v(Y[b].object),delete Y[b];delete V[L.id]}}function X(){Q(),f=!0,u!==l&&(u=l,m(u.object))}function Q(){l.geometry=null,l.program=null,l.wireframe=!1}return{setup:d,reset:X,resetDefaultState:Q,dispose:K,releaseStatesOfGeometry:x,releaseStatesOfProgram:C,initAttributes:g,enableAttribute:M,disableUnusedAttributes:R}}function oE(t,e,n,i){const r=i.isWebGL2;let s;function o(f){s=f}function a(f,d){t.drawArrays(s,f,d),n.update(d,s,1)}function l(f,d,h){if(h===0)return;let m,v;if(r)m=t,v="drawArraysInstanced";else if(m=e.get("ANGLE_instanced_arrays"),v="drawArraysInstancedANGLE",m===null){console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}m[v](s,f,d,h),n.update(d,s,h)}function u(f,d,h){if(h===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let v=0;v<h;v++)this.render(f[v],d[v]);else{m.multiDrawArraysWEBGL(s,f,0,d,0,h);let v=0;for(let S=0;S<h;S++)v+=d[S];n.update(v,s,1)}}this.setMode=o,this.render=a,this.renderInstances=l,this.renderMultiDraw=u}function aE(t,e,n){let i;function r(){if(i!==void 0)return i;if(e.has("EXT_texture_filter_anisotropic")===!0){const w=e.get("EXT_texture_filter_anisotropic");i=t.getParameter(w.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function s(w){if(w==="highp"){if(t.getShaderPrecisionFormat(t.VERTEX_SHADER,t.HIGH_FLOAT).precision>0&&t.getShaderPrecisionFormat(t.FRAGMENT_SHADER,t.HIGH_FLOAT).precision>0)return"highp";w="mediump"}return w==="mediump"&&t.getShaderPrecisionFormat(t.VERTEX_SHADER,t.MEDIUM_FLOAT).precision>0&&t.getShaderPrecisionFormat(t.FRAGMENT_SHADER,t.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}const o=typeof WebGL2RenderingContext<"u"&&t.constructor.name==="WebGL2RenderingContext";let a=n.precision!==void 0?n.precision:"highp";const l=s(a);l!==a&&(console.warn("THREE.WebGLRenderer:",a,"not supported, using",l,"instead."),a=l);const u=o||e.has("WEBGL_draw_buffers"),f=n.logarithmicDepthBuffer===!0,d=t.getParameter(t.MAX_TEXTURE_IMAGE_UNITS),h=t.getParameter(t.MAX_VERTEX_TEXTURE_IMAGE_UNITS),m=t.getParameter(t.MAX_TEXTURE_SIZE),v=t.getParameter(t.MAX_CUBE_MAP_TEXTURE_SIZE),S=t.getParameter(t.MAX_VERTEX_ATTRIBS),p=t.getParameter(t.MAX_VERTEX_UNIFORM_VECTORS),c=t.getParameter(t.MAX_VARYING_VECTORS),_=t.getParameter(t.MAX_FRAGMENT_UNIFORM_VECTORS),g=h>0,M=o||e.has("OES_texture_float"),P=g&&M,R=o?t.getParameter(t.MAX_SAMPLES):0;return{isWebGL2:o,drawBuffers:u,getMaxAnisotropy:r,getMaxPrecision:s,precision:a,logarithmicDepthBuffer:f,maxTextures:d,maxVertexTextures:h,maxTextureSize:m,maxCubemapSize:v,maxAttributes:S,maxVertexUniforms:p,maxVaryings:c,maxFragmentUniforms:_,vertexTextures:g,floatFragmentTextures:M,floatVertexTextures:P,maxSamples:R}}function lE(t){const e=this;let n=null,i=0,r=!1,s=!1;const o=new tr,a=new Oe,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(d,h){const m=d.length!==0||h||i!==0||r;return r=h,i=d.length,m},this.beginShadows=function(){s=!0,f(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(d,h){n=f(d,h,0)},this.setState=function(d,h,m){const v=d.clippingPlanes,S=d.clipIntersection,p=d.clipShadows,c=t.get(d);if(!r||v===null||v.length===0||s&&!p)s?f(null):u();else{const _=s?0:i,g=_*4;let M=c.clippingState||null;l.value=M,M=f(v,h,g,m);for(let P=0;P!==g;++P)M[P]=n[P];c.clippingState=M,this.numIntersection=S?this.numPlanes:0,this.numPlanes+=_}};function u(){l.value!==n&&(l.value=n,l.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function f(d,h,m,v){const S=d!==null?d.length:0;let p=null;if(S!==0){if(p=l.value,v!==!0||p===null){const c=m+S*4,_=h.matrixWorldInverse;a.getNormalMatrix(_),(p===null||p.length<c)&&(p=new Float32Array(c));for(let g=0,M=m;g!==S;++g,M+=4)o.copy(d[g]).applyMatrix4(_,a),o.normal.toArray(p,M),p[M+3]=o.constant}l.value=p,l.needsUpdate=!0}return e.numPlanes=S,e.numIntersection=0,p}}function uE(t){let e=new WeakMap;function n(o,a){return a===Lc?o.mapping=vs:a===bc&&(o.mapping=xs),o}function i(o){if(o&&o.isTexture){const a=o.mapping;if(a===Lc||a===bc)if(e.has(o)){const l=e.get(o).texture;return n(l,o.mapping)}else{const l=o.image;if(l&&l.height>0){const u=new yS(l.height);return u.fromEquirectangularTexture(t,o),e.set(o,u),o.addEventListener("dispose",r),n(u.texture,o.mapping)}else return null}}return o}function r(o){const a=o.target;a.removeEventListener("dispose",r);const l=e.get(a);l!==void 0&&(e.delete(a),l.dispose())}function s(){e=new WeakMap}return{get:i,dispose:s}}class c_ extends a_{constructor(e=-1,n=1,i=1,r=-1,s=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=n,this.top=i,this.bottom=r,this.near=s,this.far=o,this.updateProjectionMatrix()}copy(e,n){return super.copy(e,n),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,n,i,r,s,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=n,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),n=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let s=i-e,o=i+e,a=r+n,l=r-n;if(this.view!==null&&this.view.enabled){const u=(this.right-this.left)/this.view.fullWidth/this.zoom,f=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=u*this.view.offsetX,o=s+u*this.view.width,a-=f*this.view.offsetY,l=a-f*this.view.height}this.projectionMatrix.makeOrthographic(s,o,a,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const n=super.toJSON(e);return n.object.zoom=this.zoom,n.object.left=this.left,n.object.right=this.right,n.object.top=this.top,n.object.bottom=this.bottom,n.object.near=this.near,n.object.far=this.far,this.view!==null&&(n.object.view=Object.assign({},this.view)),n}}const es=4,ep=[.125,.215,.35,.446,.526,.582],rr=20,Cu=new c_,tp=new We;let Pu=null,Lu=0,bu=0;const nr=(1+Math.sqrt(5))/2,Br=1/nr,np=[new z(1,1,1),new z(-1,1,1),new z(1,1,-1),new z(-1,1,-1),new z(0,nr,Br),new z(0,nr,-Br),new z(Br,0,nr),new z(-Br,0,nr),new z(nr,Br,0),new z(-nr,Br,0)];class ip{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,n=0,i=.1,r=100){Pu=this._renderer.getRenderTarget(),Lu=this._renderer.getActiveCubeFace(),bu=this._renderer.getActiveMipmapLevel(),this._setSize(256);const s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(e,i,r,s),n>0&&this._blur(s,0,0,n),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(e,n=null){return this._fromTexture(e,n)}fromCubemap(e,n=null){return this._fromTexture(e,n)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=op(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=sp(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(Pu,Lu,bu),e.scissorTest=!1,ma(e,0,0,e.width,e.height)}_fromTexture(e,n){e.mapping===vs||e.mapping===xs?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Pu=this._renderer.getRenderTarget(),Lu=this._renderer.getActiveCubeFace(),bu=this._renderer.getActiveMipmapLevel();const i=n||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),n=4*this._cubeSize,i={magFilter:qt,minFilter:qt,generateMipmaps:!1,type:So,format:Dn,colorSpace:di,depthBuffer:!1},r=rp(e,n,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==n){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=rp(e,n,i);const{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=cE(s)),this._blurMaterial=fE(s,e,n)}return r}_compileMaterial(e){const n=new Un(this._lodPlanes[0],e);this._renderer.compile(n,Cu)}_sceneToCubeUV(e,n,i,r){const a=new vn(90,1,n,i),l=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],f=this._renderer,d=f.autoClear,h=f.toneMapping;f.getClearColor(tp),f.toneMapping=zi,f.autoClear=!1;const m=new i_({name:"PMREM.Background",side:tn,depthWrite:!1,depthTest:!1}),v=new Un(new As,m);let S=!1;const p=e.background;p?p.isColor&&(m.color.copy(p),e.background=null,S=!0):(m.color.copy(tp),S=!0);for(let c=0;c<6;c++){const _=c%3;_===0?(a.up.set(0,l[c],0),a.lookAt(u[c],0,0)):_===1?(a.up.set(0,0,l[c]),a.lookAt(0,u[c],0)):(a.up.set(0,l[c],0),a.lookAt(0,0,u[c]));const g=this._cubeSize;ma(r,_*g,c>2?g:0,g,g),f.setRenderTarget(r),S&&f.render(v,a),f.render(e,a)}v.geometry.dispose(),v.material.dispose(),f.toneMapping=h,f.autoClear=d,e.background=p}_textureToCubeUV(e,n){const i=this._renderer,r=e.mapping===vs||e.mapping===xs;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=op()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=sp());const s=r?this._cubemapMaterial:this._equirectMaterial,o=new Un(this._lodPlanes[0],s),a=s.uniforms;a.envMap.value=e;const l=this._cubeSize;ma(n,0,0,3*l,2*l),i.setRenderTarget(n),i.render(o,Cu)}_applyPMREM(e){const n=this._renderer,i=n.autoClear;n.autoClear=!1;for(let r=1;r<this._lodPlanes.length;r++){const s=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),o=np[(r-1)%np.length];this._blur(e,r-1,r,s,o)}n.autoClear=i}_blur(e,n,i,r,s){const o=this._pingPongRenderTarget;this._halfBlur(e,o,n,i,r,"latitudinal",s),this._halfBlur(o,e,i,i,r,"longitudinal",s)}_halfBlur(e,n,i,r,s,o,a){const l=this._renderer,u=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const f=3,d=new Un(this._lodPlanes[r],u),h=u.uniforms,m=this._sizeLods[i]-1,v=isFinite(s)?Math.PI/(2*m):2*Math.PI/(2*rr-1),S=s/v,p=isFinite(s)?1+Math.floor(f*S):rr;p>rr&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${p} samples when the maximum is set to ${rr}`);const c=[];let _=0;for(let w=0;w<rr;++w){const N=w/S,K=Math.exp(-N*N/2);c.push(K),w===0?_+=K:w<p&&(_+=2*K)}for(let w=0;w<c.length;w++)c[w]=c[w]/_;h.envMap.value=e.texture,h.samples.value=p,h.weights.value=c,h.latitudinal.value=o==="latitudinal",a&&(h.poleAxis.value=a);const{_lodMax:g}=this;h.dTheta.value=v,h.mipInt.value=g-i;const M=this._sizeLods[r],P=3*M*(r>g-es?r-g+es:0),R=4*(this._cubeSize-M);ma(n,P,R,3*M,2*M),l.setRenderTarget(n),l.render(d,Cu)}}function cE(t){const e=[],n=[],i=[];let r=t;const s=t-es+1+ep.length;for(let o=0;o<s;o++){const a=Math.pow(2,r);n.push(a);let l=1/a;o>t-es?l=ep[o-t+es-1]:o===0&&(l=0),i.push(l);const u=1/(a-2),f=-u,d=1+u,h=[f,f,d,f,d,d,f,f,d,d,f,d],m=6,v=6,S=3,p=2,c=1,_=new Float32Array(S*v*m),g=new Float32Array(p*v*m),M=new Float32Array(c*v*m);for(let R=0;R<m;R++){const w=R%3*2/3-1,N=R>2?0:-1,K=[w,N,0,w+2/3,N,0,w+2/3,N+1,0,w,N,0,w+2/3,N+1,0,w,N+1,0];_.set(K,S*v*R),g.set(h,p*v*R);const x=[R,R,R,R,R,R];M.set(x,c*v*R)}const P=new Er;P.setAttribute("position",new Xn(_,S)),P.setAttribute("uv",new Xn(g,p)),P.setAttribute("faceIndex",new Xn(M,c)),e.push(P),r>es&&r--}return{lodPlanes:e,sizeLods:n,sigmas:i}}function rp(t,e,n){const i=new Sr(t,e,n);return i.texture.mapping=Ml,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function ma(t,e,n,i,r){t.viewport.set(e,n,i,r),t.scissor.set(e,n,i,r)}function fE(t,e,n){const i=new Float32Array(rr),r=new z(0,1,0);return new Vi({name:"SphericalGaussianBlur",defines:{n:rr,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${t}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:zf(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Oi,depthTest:!1,depthWrite:!1})}function sp(){return new Vi({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:zf(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Oi,depthTest:!1,depthWrite:!1})}function op(){return new Vi({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:zf(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Oi,depthTest:!1,depthWrite:!1})}function zf(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function dE(t){let e=new WeakMap,n=null;function i(a){if(a&&a.isTexture){const l=a.mapping,u=l===Lc||l===bc,f=l===vs||l===xs;if(u||f)if(a.isRenderTargetTexture&&a.needsPMREMUpdate===!0){a.needsPMREMUpdate=!1;let d=e.get(a);return n===null&&(n=new ip(t)),d=u?n.fromEquirectangular(a,d):n.fromCubemap(a,d),e.set(a,d),d.texture}else{if(e.has(a))return e.get(a).texture;{const d=a.image;if(u&&d&&d.height>0||f&&d&&r(d)){n===null&&(n=new ip(t));const h=u?n.fromEquirectangular(a):n.fromCubemap(a);return e.set(a,h),a.addEventListener("dispose",s),h.texture}else return null}}}return a}function r(a){let l=0;const u=6;for(let f=0;f<u;f++)a[f]!==void 0&&l++;return l===u}function s(a){const l=a.target;l.removeEventListener("dispose",s);const u=e.get(l);u!==void 0&&(e.delete(l),u.dispose())}function o(){e=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:i,dispose:o}}function hE(t){const e={};function n(i){if(e[i]!==void 0)return e[i];let r;switch(i){case"WEBGL_depth_texture":r=t.getExtension("WEBGL_depth_texture")||t.getExtension("MOZ_WEBGL_depth_texture")||t.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":r=t.getExtension("EXT_texture_filter_anisotropic")||t.getExtension("MOZ_EXT_texture_filter_anisotropic")||t.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":r=t.getExtension("WEBGL_compressed_texture_s3tc")||t.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||t.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":r=t.getExtension("WEBGL_compressed_texture_pvrtc")||t.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:r=t.getExtension(i)}return e[i]=r,r}return{has:function(i){return n(i)!==null},init:function(i){i.isWebGL2?(n("EXT_color_buffer_float"),n("WEBGL_clip_cull_distance")):(n("WEBGL_depth_texture"),n("OES_texture_float"),n("OES_texture_half_float"),n("OES_texture_half_float_linear"),n("OES_standard_derivatives"),n("OES_element_index_uint"),n("OES_vertex_array_object"),n("ANGLE_instanced_arrays")),n("OES_texture_float_linear"),n("EXT_color_buffer_half_float"),n("WEBGL_multisampled_render_to_texture")},get:function(i){const r=n(i);return r===null&&console.warn("THREE.WebGLRenderer: "+i+" extension not supported."),r}}}function pE(t,e,n,i){const r={},s=new WeakMap;function o(d){const h=d.target;h.index!==null&&e.remove(h.index);for(const v in h.attributes)e.remove(h.attributes[v]);for(const v in h.morphAttributes){const S=h.morphAttributes[v];for(let p=0,c=S.length;p<c;p++)e.remove(S[p])}h.removeEventListener("dispose",o),delete r[h.id];const m=s.get(h);m&&(e.remove(m),s.delete(h)),i.releaseStatesOfGeometry(h),h.isInstancedBufferGeometry===!0&&delete h._maxInstanceCount,n.memory.geometries--}function a(d,h){return r[h.id]===!0||(h.addEventListener("dispose",o),r[h.id]=!0,n.memory.geometries++),h}function l(d){const h=d.attributes;for(const v in h)e.update(h[v],t.ARRAY_BUFFER);const m=d.morphAttributes;for(const v in m){const S=m[v];for(let p=0,c=S.length;p<c;p++)e.update(S[p],t.ARRAY_BUFFER)}}function u(d){const h=[],m=d.index,v=d.attributes.position;let S=0;if(m!==null){const _=m.array;S=m.version;for(let g=0,M=_.length;g<M;g+=3){const P=_[g+0],R=_[g+1],w=_[g+2];h.push(P,R,R,w,w,P)}}else if(v!==void 0){const _=v.array;S=v.version;for(let g=0,M=_.length/3-1;g<M;g+=3){const P=g+0,R=g+1,w=g+2;h.push(P,R,R,w,w,P)}}else return;const p=new(Zg(h)?s_:r_)(h,1);p.version=S;const c=s.get(d);c&&e.remove(c),s.set(d,p)}function f(d){const h=s.get(d);if(h){const m=d.index;m!==null&&h.version<m.version&&u(d)}else u(d);return s.get(d)}return{get:a,update:l,getWireframeAttribute:f}}function mE(t,e,n,i){const r=i.isWebGL2;let s;function o(m){s=m}let a,l;function u(m){a=m.type,l=m.bytesPerElement}function f(m,v){t.drawElements(s,v,a,m*l),n.update(v,s,1)}function d(m,v,S){if(S===0)return;let p,c;if(r)p=t,c="drawElementsInstanced";else if(p=e.get("ANGLE_instanced_arrays"),c="drawElementsInstancedANGLE",p===null){console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}p[c](s,v,a,m*l,S),n.update(v,s,S)}function h(m,v,S){if(S===0)return;const p=e.get("WEBGL_multi_draw");if(p===null)for(let c=0;c<S;c++)this.render(m[c]/l,v[c]);else{p.multiDrawElementsWEBGL(s,v,0,a,m,0,S);let c=0;for(let _=0;_<S;_++)c+=v[_];n.update(c,s,1)}}this.setMode=o,this.setIndex=u,this.render=f,this.renderInstances=d,this.renderMultiDraw=h}function gE(t){const e={geometries:0,textures:0},n={frame:0,calls:0,triangles:0,points:0,lines:0};function i(s,o,a){switch(n.calls++,o){case t.TRIANGLES:n.triangles+=a*(s/3);break;case t.LINES:n.lines+=a*(s/2);break;case t.LINE_STRIP:n.lines+=a*(s-1);break;case t.LINE_LOOP:n.lines+=a*s;break;case t.POINTS:n.points+=a*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function r(){n.calls=0,n.triangles=0,n.points=0,n.lines=0}return{memory:e,render:n,programs:null,autoReset:!0,reset:r,update:i}}function _E(t,e){return t[0]-e[0]}function vE(t,e){return Math.abs(e[1])-Math.abs(t[1])}function xE(t,e,n){const i={},r=new Float32Array(8),s=new WeakMap,o=new wt,a=[];for(let u=0;u<8;u++)a[u]=[u,0];function l(u,f,d){const h=u.morphTargetInfluences;if(e.isWebGL2===!0){const v=f.morphAttributes.position||f.morphAttributes.normal||f.morphAttributes.color,S=v!==void 0?v.length:0;let p=s.get(f);if(p===void 0||p.count!==S){let W=function(){Q.dispose(),s.delete(f),f.removeEventListener("dispose",W)};var m=W;p!==void 0&&p.texture.dispose();const g=f.morphAttributes.position!==void 0,M=f.morphAttributes.normal!==void 0,P=f.morphAttributes.color!==void 0,R=f.morphAttributes.position||[],w=f.morphAttributes.normal||[],N=f.morphAttributes.color||[];let K=0;g===!0&&(K=1),M===!0&&(K=2),P===!0&&(K=3);let x=f.attributes.position.count*K,C=1;x>e.maxTextureSize&&(C=Math.ceil(x/e.maxTextureSize),x=e.maxTextureSize);const X=new Float32Array(x*C*4*S),Q=new e_(X,x,C,S);Q.type=ii,Q.needsUpdate=!0;const L=K*4;for(let V=0;V<S;V++){const Y=R[V],b=w[V],I=N[V],B=x*C*4*V;for(let j=0;j<Y.count;j++){const ee=j*L;g===!0&&(o.fromBufferAttribute(Y,j),X[B+ee+0]=o.x,X[B+ee+1]=o.y,X[B+ee+2]=o.z,X[B+ee+3]=0),M===!0&&(o.fromBufferAttribute(b,j),X[B+ee+4]=o.x,X[B+ee+5]=o.y,X[B+ee+6]=o.z,X[B+ee+7]=0),P===!0&&(o.fromBufferAttribute(I,j),X[B+ee+8]=o.x,X[B+ee+9]=o.y,X[B+ee+10]=o.z,X[B+ee+11]=I.itemSize===4?o.w:1)}}p={count:S,texture:Q,size:new Ge(x,C)},s.set(f,p),f.addEventListener("dispose",W)}let c=0;for(let g=0;g<h.length;g++)c+=h[g];const _=f.morphTargetsRelative?1:1-c;d.getUniforms().setValue(t,"morphTargetBaseInfluence",_),d.getUniforms().setValue(t,"morphTargetInfluences",h),d.getUniforms().setValue(t,"morphTargetsTexture",p.texture,n),d.getUniforms().setValue(t,"morphTargetsTextureSize",p.size)}else{const v=h===void 0?0:h.length;let S=i[f.id];if(S===void 0||S.length!==v){S=[];for(let M=0;M<v;M++)S[M]=[M,0];i[f.id]=S}for(let M=0;M<v;M++){const P=S[M];P[0]=M,P[1]=h[M]}S.sort(vE);for(let M=0;M<8;M++)M<v&&S[M][1]?(a[M][0]=S[M][0],a[M][1]=S[M][1]):(a[M][0]=Number.MAX_SAFE_INTEGER,a[M][1]=0);a.sort(_E);const p=f.morphAttributes.position,c=f.morphAttributes.normal;let _=0;for(let M=0;M<8;M++){const P=a[M],R=P[0],w=P[1];R!==Number.MAX_SAFE_INTEGER&&w?(p&&f.getAttribute("morphTarget"+M)!==p[R]&&f.setAttribute("morphTarget"+M,p[R]),c&&f.getAttribute("morphNormal"+M)!==c[R]&&f.setAttribute("morphNormal"+M,c[R]),r[M]=w,_+=w):(p&&f.hasAttribute("morphTarget"+M)===!0&&f.deleteAttribute("morphTarget"+M),c&&f.hasAttribute("morphNormal"+M)===!0&&f.deleteAttribute("morphNormal"+M),r[M]=0)}const g=f.morphTargetsRelative?1:1-_;d.getUniforms().setValue(t,"morphTargetBaseInfluence",g),d.getUniforms().setValue(t,"morphTargetInfluences",r)}}return{update:l}}function SE(t,e,n,i){let r=new WeakMap;function s(l){const u=i.render.frame,f=l.geometry,d=e.get(l,f);if(r.get(d)!==u&&(e.update(d),r.set(d,u)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),r.get(l)!==u&&(n.update(l.instanceMatrix,t.ARRAY_BUFFER),l.instanceColor!==null&&n.update(l.instanceColor,t.ARRAY_BUFFER),r.set(l,u))),l.isSkinnedMesh){const h=l.skeleton;r.get(h)!==u&&(h.update(),r.set(h,u))}return d}function o(){r=new WeakMap}function a(l){const u=l.target;u.removeEventListener("dispose",a),n.remove(u.instanceMatrix),u.instanceColor!==null&&n.remove(u.instanceColor)}return{update:s,dispose:o}}class f_ extends nn{constructor(e,n,i,r,s,o,a,l,u,f){if(f=f!==void 0?f:dr,f!==dr&&f!==Ss)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");i===void 0&&f===dr&&(i=Ci),i===void 0&&f===Ss&&(i=fr),super(null,r,s,o,a,l,f,i,u),this.isDepthTexture=!0,this.image={width:e,height:n},this.magFilter=a!==void 0?a:Vt,this.minFilter=l!==void 0?l:Vt,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const n=super.toJSON(e);return this.compareFunction!==null&&(n.compareFunction=this.compareFunction),n}}const d_=new nn,h_=new f_(1,1);h_.compareFunction=Kg;const p_=new e_,m_=new iS,g_=new l_,ap=[],lp=[],up=new Float32Array(16),cp=new Float32Array(9),fp=new Float32Array(4);function Rs(t,e,n){const i=t[0];if(i<=0||i>0)return t;const r=e*n;let s=ap[r];if(s===void 0&&(s=new Float32Array(r),ap[r]=s),e!==0){i.toArray(s,0);for(let o=1,a=0;o!==e;++o)a+=n,t[o].toArray(s,a)}return s}function xt(t,e){if(t.length!==e.length)return!1;for(let n=0,i=t.length;n<i;n++)if(t[n]!==e[n])return!1;return!0}function St(t,e){for(let n=0,i=e.length;n<i;n++)t[n]=e[n]}function Al(t,e){let n=lp[e];n===void 0&&(n=new Int32Array(e),lp[e]=n);for(let i=0;i!==e;++i)n[i]=t.allocateTextureUnit();return n}function yE(t,e){const n=this.cache;n[0]!==e&&(t.uniform1f(this.addr,e),n[0]=e)}function ME(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(t.uniform2f(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(xt(n,e))return;t.uniform2fv(this.addr,e),St(n,e)}}function EE(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(t.uniform3f(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else if(e.r!==void 0)(n[0]!==e.r||n[1]!==e.g||n[2]!==e.b)&&(t.uniform3f(this.addr,e.r,e.g,e.b),n[0]=e.r,n[1]=e.g,n[2]=e.b);else{if(xt(n,e))return;t.uniform3fv(this.addr,e),St(n,e)}}function TE(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(t.uniform4f(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(xt(n,e))return;t.uniform4fv(this.addr,e),St(n,e)}}function wE(t,e){const n=this.cache,i=e.elements;if(i===void 0){if(xt(n,e))return;t.uniformMatrix2fv(this.addr,!1,e),St(n,e)}else{if(xt(n,i))return;fp.set(i),t.uniformMatrix2fv(this.addr,!1,fp),St(n,i)}}function AE(t,e){const n=this.cache,i=e.elements;if(i===void 0){if(xt(n,e))return;t.uniformMatrix3fv(this.addr,!1,e),St(n,e)}else{if(xt(n,i))return;cp.set(i),t.uniformMatrix3fv(this.addr,!1,cp),St(n,i)}}function RE(t,e){const n=this.cache,i=e.elements;if(i===void 0){if(xt(n,e))return;t.uniformMatrix4fv(this.addr,!1,e),St(n,e)}else{if(xt(n,i))return;up.set(i),t.uniformMatrix4fv(this.addr,!1,up),St(n,i)}}function CE(t,e){const n=this.cache;n[0]!==e&&(t.uniform1i(this.addr,e),n[0]=e)}function PE(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(t.uniform2i(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(xt(n,e))return;t.uniform2iv(this.addr,e),St(n,e)}}function LE(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(t.uniform3i(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else{if(xt(n,e))return;t.uniform3iv(this.addr,e),St(n,e)}}function bE(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(t.uniform4i(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(xt(n,e))return;t.uniform4iv(this.addr,e),St(n,e)}}function DE(t,e){const n=this.cache;n[0]!==e&&(t.uniform1ui(this.addr,e),n[0]=e)}function UE(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(t.uniform2ui(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(xt(n,e))return;t.uniform2uiv(this.addr,e),St(n,e)}}function NE(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(t.uniform3ui(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else{if(xt(n,e))return;t.uniform3uiv(this.addr,e),St(n,e)}}function IE(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(t.uniform4ui(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(xt(n,e))return;t.uniform4uiv(this.addr,e),St(n,e)}}function FE(t,e,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(t.uniform1i(this.addr,r),i[0]=r);const s=this.type===t.SAMPLER_2D_SHADOW?h_:d_;n.setTexture2D(e||s,r)}function OE(t,e,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(t.uniform1i(this.addr,r),i[0]=r),n.setTexture3D(e||m_,r)}function zE(t,e,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(t.uniform1i(this.addr,r),i[0]=r),n.setTextureCube(e||g_,r)}function kE(t,e,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(t.uniform1i(this.addr,r),i[0]=r),n.setTexture2DArray(e||p_,r)}function BE(t){switch(t){case 5126:return yE;case 35664:return ME;case 35665:return EE;case 35666:return TE;case 35674:return wE;case 35675:return AE;case 35676:return RE;case 5124:case 35670:return CE;case 35667:case 35671:return PE;case 35668:case 35672:return LE;case 35669:case 35673:return bE;case 5125:return DE;case 36294:return UE;case 36295:return NE;case 36296:return IE;case 35678:case 36198:case 36298:case 36306:case 35682:return FE;case 35679:case 36299:case 36307:return OE;case 35680:case 36300:case 36308:case 36293:return zE;case 36289:case 36303:case 36311:case 36292:return kE}}function HE(t,e){t.uniform1fv(this.addr,e)}function GE(t,e){const n=Rs(e,this.size,2);t.uniform2fv(this.addr,n)}function VE(t,e){const n=Rs(e,this.size,3);t.uniform3fv(this.addr,n)}function WE(t,e){const n=Rs(e,this.size,4);t.uniform4fv(this.addr,n)}function XE(t,e){const n=Rs(e,this.size,4);t.uniformMatrix2fv(this.addr,!1,n)}function jE(t,e){const n=Rs(e,this.size,9);t.uniformMatrix3fv(this.addr,!1,n)}function YE(t,e){const n=Rs(e,this.size,16);t.uniformMatrix4fv(this.addr,!1,n)}function qE(t,e){t.uniform1iv(this.addr,e)}function $E(t,e){t.uniform2iv(this.addr,e)}function KE(t,e){t.uniform3iv(this.addr,e)}function ZE(t,e){t.uniform4iv(this.addr,e)}function QE(t,e){t.uniform1uiv(this.addr,e)}function JE(t,e){t.uniform2uiv(this.addr,e)}function eT(t,e){t.uniform3uiv(this.addr,e)}function tT(t,e){t.uniform4uiv(this.addr,e)}function nT(t,e,n){const i=this.cache,r=e.length,s=Al(n,r);xt(i,s)||(t.uniform1iv(this.addr,s),St(i,s));for(let o=0;o!==r;++o)n.setTexture2D(e[o]||d_,s[o])}function iT(t,e,n){const i=this.cache,r=e.length,s=Al(n,r);xt(i,s)||(t.uniform1iv(this.addr,s),St(i,s));for(let o=0;o!==r;++o)n.setTexture3D(e[o]||m_,s[o])}function rT(t,e,n){const i=this.cache,r=e.length,s=Al(n,r);xt(i,s)||(t.uniform1iv(this.addr,s),St(i,s));for(let o=0;o!==r;++o)n.setTextureCube(e[o]||g_,s[o])}function sT(t,e,n){const i=this.cache,r=e.length,s=Al(n,r);xt(i,s)||(t.uniform1iv(this.addr,s),St(i,s));for(let o=0;o!==r;++o)n.setTexture2DArray(e[o]||p_,s[o])}function oT(t){switch(t){case 5126:return HE;case 35664:return GE;case 35665:return VE;case 35666:return WE;case 35674:return XE;case 35675:return jE;case 35676:return YE;case 5124:case 35670:return qE;case 35667:case 35671:return $E;case 35668:case 35672:return KE;case 35669:case 35673:return ZE;case 5125:return QE;case 36294:return JE;case 36295:return eT;case 36296:return tT;case 35678:case 36198:case 36298:case 36306:case 35682:return nT;case 35679:case 36299:case 36307:return iT;case 35680:case 36300:case 36308:case 36293:return rT;case 36289:case 36303:case 36311:case 36292:return sT}}class aT{constructor(e,n,i){this.id=e,this.addr=i,this.cache=[],this.type=n.type,this.setValue=BE(n.type)}}class lT{constructor(e,n,i){this.id=e,this.addr=i,this.cache=[],this.type=n.type,this.size=n.size,this.setValue=oT(n.type)}}class uT{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,n,i){const r=this.seq;for(let s=0,o=r.length;s!==o;++s){const a=r[s];a.setValue(e,n[a.id],i)}}}const Du=/(\w+)(\])?(\[|\.)?/g;function dp(t,e){t.seq.push(e),t.map[e.id]=e}function cT(t,e,n){const i=t.name,r=i.length;for(Du.lastIndex=0;;){const s=Du.exec(i),o=Du.lastIndex;let a=s[1];const l=s[2]==="]",u=s[3];if(l&&(a=a|0),u===void 0||u==="["&&o+2===r){dp(n,u===void 0?new aT(a,t,e):new lT(a,t,e));break}else{let d=n.map[a];d===void 0&&(d=new uT(a),dp(n,d)),n=d}}}class Pa{constructor(e,n){this.seq=[],this.map={};const i=e.getProgramParameter(n,e.ACTIVE_UNIFORMS);for(let r=0;r<i;++r){const s=e.getActiveUniform(n,r),o=e.getUniformLocation(n,s.name);cT(s,o,this)}}setValue(e,n,i,r){const s=this.map[n];s!==void 0&&s.setValue(e,i,r)}setOptional(e,n,i){const r=n[i];r!==void 0&&this.setValue(e,i,r)}static upload(e,n,i,r){for(let s=0,o=n.length;s!==o;++s){const a=n[s],l=i[a.id];l.needsUpdate!==!1&&a.setValue(e,l.value,r)}}static seqWithValue(e,n){const i=[];for(let r=0,s=e.length;r!==s;++r){const o=e[r];o.id in n&&i.push(o)}return i}}function hp(t,e,n){const i=t.createShader(e);return t.shaderSource(i,n),t.compileShader(i),i}const fT=37297;let dT=0;function hT(t,e){const n=t.split(`
`),i=[],r=Math.max(e-6,0),s=Math.min(e+6,n.length);for(let o=r;o<s;o++){const a=o+1;i.push(`${a===e?">":" "} ${a}: ${n[o]}`)}return i.join(`
`)}function pT(t){const e=$e.getPrimaries($e.workingColorSpace),n=$e.getPrimaries(t);let i;switch(e===n?i="":e===il&&n===nl?i="LinearDisplayP3ToLinearSRGB":e===nl&&n===il&&(i="LinearSRGBToLinearDisplayP3"),t){case di:case El:return[i,"LinearTransferOETF"];case Tt:case If:return[i,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",t),[i,"LinearTransferOETF"]}}function pp(t,e,n){const i=t.getShaderParameter(e,t.COMPILE_STATUS),r=t.getShaderInfoLog(e).trim();if(i&&r==="")return"";const s=/ERROR: 0:(\d+)/.exec(r);if(s){const o=parseInt(s[1]);return n.toUpperCase()+`

`+r+`

`+hT(t.getShaderSource(e),o)}else return r}function mT(t,e){const n=pT(e);return`vec4 ${t}( vec4 value ) { return ${n[0]}( ${n[1]}( value ) ); }`}function gT(t,e){let n;switch(e){case Cx:n="Linear";break;case Px:n="Reinhard";break;case Lx:n="OptimizedCineon";break;case kg:n="ACESFilmic";break;case Dx:n="AgX";break;case bx:n="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),n="Linear"}return"vec3 "+t+"( vec3 color ) { return "+n+"ToneMapping( color ); }"}function _T(t){return[t.extensionDerivatives||t.envMapCubeUVHeight||t.bumpMap||t.normalMapTangentSpace||t.clearcoatNormalMap||t.flatShading||t.alphaToCoverage||t.shaderID==="physical"?"#extension GL_OES_standard_derivatives : enable":"",(t.extensionFragDepth||t.logarithmicDepthBuffer)&&t.rendererExtensionFragDepth?"#extension GL_EXT_frag_depth : enable":"",t.extensionDrawBuffers&&t.rendererExtensionDrawBuffers?"#extension GL_EXT_draw_buffers : require":"",(t.extensionShaderTextureLOD||t.envMap||t.transmission)&&t.rendererExtensionShaderTextureLod?"#extension GL_EXT_shader_texture_lod : enable":""].filter(ts).join(`
`)}function vT(t){return[t.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",t.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(ts).join(`
`)}function xT(t){const e=[];for(const n in t){const i=t[n];i!==!1&&e.push("#define "+n+" "+i)}return e.join(`
`)}function ST(t,e){const n={},i=t.getProgramParameter(e,t.ACTIVE_ATTRIBUTES);for(let r=0;r<i;r++){const s=t.getActiveAttrib(e,r),o=s.name;let a=1;s.type===t.FLOAT_MAT2&&(a=2),s.type===t.FLOAT_MAT3&&(a=3),s.type===t.FLOAT_MAT4&&(a=4),n[o]={type:s.type,location:t.getAttribLocation(e,o),locationSize:a}}return n}function ts(t){return t!==""}function mp(t,e){const n=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return t.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,n).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function gp(t,e){return t.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const yT=/^[ \t]*#include +<([\w\d./]+)>/gm;function Oc(t){return t.replace(yT,ET)}const MT=new Map([["encodings_fragment","colorspace_fragment"],["encodings_pars_fragment","colorspace_pars_fragment"],["output_fragment","opaque_fragment"]]);function ET(t,e){let n=Ue[e];if(n===void 0){const i=MT.get(e);if(i!==void 0)n=Ue[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("Can not resolve #include <"+e+">")}return Oc(n)}const TT=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function _p(t){return t.replace(TT,wT)}function wT(t,e,n,i){let r="";for(let s=parseInt(e);s<parseInt(n);s++)r+=i.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function vp(t){let e=`precision ${t.precision} float;
	precision ${t.precision} int;
	precision ${t.precision} sampler2D;
	precision ${t.precision} samplerCube;
	`;return t.isWebGL2&&(e+=`precision ${t.precision} sampler3D;
		precision ${t.precision} sampler2DArray;
		precision ${t.precision} sampler2DShadow;
		precision ${t.precision} samplerCubeShadow;
		precision ${t.precision} sampler2DArrayShadow;
		precision ${t.precision} isampler2D;
		precision ${t.precision} isampler3D;
		precision ${t.precision} isamplerCube;
		precision ${t.precision} isampler2DArray;
		precision ${t.precision} usampler2D;
		precision ${t.precision} usampler3D;
		precision ${t.precision} usamplerCube;
		precision ${t.precision} usampler2DArray;
		`),t.precision==="highp"?e+=`
#define HIGH_PRECISION`:t.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:t.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function AT(t){let e="SHADOWMAP_TYPE_BASIC";return t.shadowMapType===Og?e="SHADOWMAP_TYPE_PCF":t.shadowMapType===nx?e="SHADOWMAP_TYPE_PCF_SOFT":t.shadowMapType===Jn&&(e="SHADOWMAP_TYPE_VSM"),e}function RT(t){let e="ENVMAP_TYPE_CUBE";if(t.envMap)switch(t.envMapMode){case vs:case xs:e="ENVMAP_TYPE_CUBE";break;case Ml:e="ENVMAP_TYPE_CUBE_UV";break}return e}function CT(t){let e="ENVMAP_MODE_REFLECTION";if(t.envMap)switch(t.envMapMode){case xs:e="ENVMAP_MODE_REFRACTION";break}return e}function PT(t){let e="ENVMAP_BLENDING_NONE";if(t.envMap)switch(t.combine){case zg:e="ENVMAP_BLENDING_MULTIPLY";break;case Ax:e="ENVMAP_BLENDING_MIX";break;case Rx:e="ENVMAP_BLENDING_ADD";break}return e}function LT(t){const e=t.envMapCubeUVHeight;if(e===null)return null;const n=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,n),7*16)),texelHeight:i,maxMip:n}}function bT(t,e,n,i){const r=t.getContext(),s=n.defines;let o=n.vertexShader,a=n.fragmentShader;const l=AT(n),u=RT(n),f=CT(n),d=PT(n),h=LT(n),m=n.isWebGL2?"":_T(n),v=vT(n),S=xT(s),p=r.createProgram();let c,_,g=n.glslVersion?"#version "+n.glslVersion+`
`:"";n.isRawShaderMaterial?(c=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,S].filter(ts).join(`
`),c.length>0&&(c+=`
`),_=[m,"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,S].filter(ts).join(`
`),_.length>0&&(_+=`
`)):(c=[vp(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,S,n.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",n.batching?"#define USE_BATCHING":"",n.instancing?"#define USE_INSTANCING":"",n.instancingColor?"#define USE_INSTANCING_COLOR":"",n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.map?"#define USE_MAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+f:"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.displacementMap?"#define USE_DISPLACEMENTMAP":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.mapUv?"#define MAP_UV "+n.mapUv:"",n.alphaMapUv?"#define ALPHAMAP_UV "+n.alphaMapUv:"",n.lightMapUv?"#define LIGHTMAP_UV "+n.lightMapUv:"",n.aoMapUv?"#define AOMAP_UV "+n.aoMapUv:"",n.emissiveMapUv?"#define EMISSIVEMAP_UV "+n.emissiveMapUv:"",n.bumpMapUv?"#define BUMPMAP_UV "+n.bumpMapUv:"",n.normalMapUv?"#define NORMALMAP_UV "+n.normalMapUv:"",n.displacementMapUv?"#define DISPLACEMENTMAP_UV "+n.displacementMapUv:"",n.metalnessMapUv?"#define METALNESSMAP_UV "+n.metalnessMapUv:"",n.roughnessMapUv?"#define ROUGHNESSMAP_UV "+n.roughnessMapUv:"",n.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+n.anisotropyMapUv:"",n.clearcoatMapUv?"#define CLEARCOATMAP_UV "+n.clearcoatMapUv:"",n.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+n.clearcoatNormalMapUv:"",n.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+n.clearcoatRoughnessMapUv:"",n.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+n.iridescenceMapUv:"",n.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+n.iridescenceThicknessMapUv:"",n.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+n.sheenColorMapUv:"",n.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+n.sheenRoughnessMapUv:"",n.specularMapUv?"#define SPECULARMAP_UV "+n.specularMapUv:"",n.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+n.specularColorMapUv:"",n.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+n.specularIntensityMapUv:"",n.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+n.transmissionMapUv:"",n.thicknessMapUv?"#define THICKNESSMAP_UV "+n.thicknessMapUv:"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexColors?"#define USE_COLOR":"",n.vertexAlphas?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.flatShading?"#define FLAT_SHADED":"",n.skinning?"#define USE_SKINNING":"",n.morphTargets?"#define USE_MORPHTARGETS":"",n.morphNormals&&n.flatShading===!1?"#define USE_MORPHNORMALS":"",n.morphColors&&n.isWebGL2?"#define USE_MORPHCOLORS":"",n.morphTargetsCount>0&&n.isWebGL2?"#define MORPHTARGETS_TEXTURE":"",n.morphTargetsCount>0&&n.isWebGL2?"#define MORPHTARGETS_TEXTURE_STRIDE "+n.morphTextureStride:"",n.morphTargetsCount>0&&n.isWebGL2?"#define MORPHTARGETS_COUNT "+n.morphTargetsCount:"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+l:"",n.sizeAttenuation?"#define USE_SIZEATTENUATION":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.useLegacyLights?"#define LEGACY_LIGHTS":"",n.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",n.logarithmicDepthBuffer&&n.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )","	attribute vec3 morphTarget0;","	attribute vec3 morphTarget1;","	attribute vec3 morphTarget2;","	attribute vec3 morphTarget3;","	#ifdef USE_MORPHNORMALS","		attribute vec3 morphNormal0;","		attribute vec3 morphNormal1;","		attribute vec3 morphNormal2;","		attribute vec3 morphNormal3;","	#else","		attribute vec3 morphTarget4;","		attribute vec3 morphTarget5;","		attribute vec3 morphTarget6;","		attribute vec3 morphTarget7;","	#endif","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(ts).join(`
`),_=[m,vp(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,S,n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",n.map?"#define USE_MAP":"",n.matcap?"#define USE_MATCAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+u:"",n.envMap?"#define "+f:"",n.envMap?"#define "+d:"",h?"#define CUBEUV_TEXEL_WIDTH "+h.texelWidth:"",h?"#define CUBEUV_TEXEL_HEIGHT "+h.texelHeight:"",h?"#define CUBEUV_MAX_MIP "+h.maxMip+".0":"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoat?"#define USE_CLEARCOAT":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.iridescence?"#define USE_IRIDESCENCE":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaTest?"#define USE_ALPHATEST":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.sheen?"#define USE_SHEEN":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexColors||n.instancingColor?"#define USE_COLOR":"",n.vertexAlphas?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.gradientMap?"#define USE_GRADIENTMAP":"",n.flatShading?"#define FLAT_SHADED":"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+l:"",n.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.useLegacyLights?"#define LEGACY_LIGHTS":"",n.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",n.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",n.logarithmicDepthBuffer&&n.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",n.toneMapping!==zi?"#define TONE_MAPPING":"",n.toneMapping!==zi?Ue.tonemapping_pars_fragment:"",n.toneMapping!==zi?gT("toneMapping",n.toneMapping):"",n.dithering?"#define DITHERING":"",n.opaque?"#define OPAQUE":"",Ue.colorspace_pars_fragment,mT("linearToOutputTexel",n.outputColorSpace),n.useDepthPacking?"#define DEPTH_PACKING "+n.depthPacking:"",`
`].filter(ts).join(`
`)),o=Oc(o),o=mp(o,n),o=gp(o,n),a=Oc(a),a=mp(a,n),a=gp(a,n),o=_p(o),a=_p(a),n.isWebGL2&&n.isRawShaderMaterial!==!0&&(g=`#version 300 es
`,c=[v,"precision mediump sampler2DArray;","#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+c,_=["precision mediump sampler2DArray;","#define varying in",n.glslVersion===Nh?"":"layout(location = 0) out highp vec4 pc_fragColor;",n.glslVersion===Nh?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+_);const M=g+c+o,P=g+_+a,R=hp(r,r.VERTEX_SHADER,M),w=hp(r,r.FRAGMENT_SHADER,P);r.attachShader(p,R),r.attachShader(p,w),n.index0AttributeName!==void 0?r.bindAttribLocation(p,0,n.index0AttributeName):n.morphTargets===!0&&r.bindAttribLocation(p,0,"position"),r.linkProgram(p);function N(X){if(t.debug.checkShaderErrors){const Q=r.getProgramInfoLog(p).trim(),L=r.getShaderInfoLog(R).trim(),W=r.getShaderInfoLog(w).trim();let V=!0,Y=!0;if(r.getProgramParameter(p,r.LINK_STATUS)===!1)if(V=!1,typeof t.debug.onShaderError=="function")t.debug.onShaderError(r,p,R,w);else{const b=pp(r,R,"vertex"),I=pp(r,w,"fragment");console.error("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(p,r.VALIDATE_STATUS)+`

Material Name: `+X.name+`
Material Type: `+X.type+`

Program Info Log: `+Q+`
`+b+`
`+I)}else Q!==""?console.warn("THREE.WebGLProgram: Program Info Log:",Q):(L===""||W==="")&&(Y=!1);Y&&(X.diagnostics={runnable:V,programLog:Q,vertexShader:{log:L,prefix:c},fragmentShader:{log:W,prefix:_}})}r.deleteShader(R),r.deleteShader(w),K=new Pa(r,p),x=ST(r,p)}let K;this.getUniforms=function(){return K===void 0&&N(this),K};let x;this.getAttributes=function(){return x===void 0&&N(this),x};let C=n.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return C===!1&&(C=r.getProgramParameter(p,fT)),C},this.destroy=function(){i.releaseStatesOfProgram(this),r.deleteProgram(p),this.program=void 0},this.type=n.shaderType,this.name=n.shaderName,this.id=dT++,this.cacheKey=e,this.usedTimes=1,this.program=p,this.vertexShader=R,this.fragmentShader=w,this}let DT=0;class UT{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const n=e.vertexShader,i=e.fragmentShader,r=this._getShaderStage(n),s=this._getShaderStage(i),o=this._getShaderCacheForMaterial(e);return o.has(r)===!1&&(o.add(r),r.usedTimes++),o.has(s)===!1&&(o.add(s),s.usedTimes++),this}remove(e){const n=this.materialCache.get(e);for(const i of n)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const n=this.materialCache;let i=n.get(e);return i===void 0&&(i=new Set,n.set(e,i)),i}_getShaderStage(e){const n=this.shaderCache;let i=n.get(e);return i===void 0&&(i=new NT(e),n.set(e,i)),i}}class NT{constructor(e){this.id=DT++,this.code=e,this.usedTimes=0}}function IT(t,e,n,i,r,s,o){const a=new t_,l=new UT,u=new Set,f=[],d=r.isWebGL2,h=r.logarithmicDepthBuffer,m=r.vertexTextures;let v=r.precision;const S={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function p(x){return u.add(x),x===0?"uv":`uv${x}`}function c(x,C,X,Q,L){const W=Q.fog,V=L.geometry,Y=x.isMeshStandardMaterial?Q.environment:null,b=(x.isMeshStandardMaterial?n:e).get(x.envMap||Y),I=b&&b.mapping===Ml?b.image.height:null,B=S[x.type];x.precision!==null&&(v=r.getMaxPrecision(x.precision),v!==x.precision&&console.warn("THREE.WebGLProgram.getParameters:",x.precision,"not supported, using",v,"instead."));const j=V.morphAttributes.position||V.morphAttributes.normal||V.morphAttributes.color,ee=j!==void 0?j.length:0;let ye=0;V.morphAttributes.position!==void 0&&(ye=1),V.morphAttributes.normal!==void 0&&(ye=2),V.morphAttributes.color!==void 0&&(ye=3);let H,q,ae,ge;if(B){const Ze=Bn[B];H=Ze.vertexShader,q=Ze.fragmentShader}else H=x.vertexShader,q=x.fragmentShader,l.update(x),ae=l.getVertexShaderID(x),ge=l.getFragmentShaderID(x);const Me=t.getRenderTarget(),he=L.isInstancedMesh===!0,Ve=L.isBatchedMesh===!0,Pe=!!x.map,U=!!x.matcap,Rt=!!b,xe=!!x.aoMap,Ae=!!x.lightMap,_e=!!x.bumpMap,st=!!x.normalMap,be=!!x.displacementMap,T=!!x.emissiveMap,y=!!x.metalnessMap,F=!!x.roughnessMap,ne=x.anisotropy>0,$=x.clearcoat>0,te=x.iridescence>0,pe=x.sheen>0,oe=x.transmission>0,ce=ne&&!!x.anisotropyMap,Te=$&&!!x.clearcoatMap,Ne=$&&!!x.clearcoatNormalMap,Z=$&&!!x.clearcoatRoughnessMap,qe=te&&!!x.iridescenceMap,ze=te&&!!x.iridescenceThicknessMap,Re=pe&&!!x.sheenColorMap,ve=pe&&!!x.sheenRoughnessMap,fe=!!x.specularMap,De=!!x.specularColorMap,Xe=!!x.specularIntensityMap,et=oe&&!!x.transmissionMap,Be=oe&&!!x.thicknessMap,Ke=!!x.gradientMap,A=!!x.alphaMap,ie=x.alphaTest>0,re=!!x.alphaHash,de=!!x.extensions;let Se=zi;x.toneMapped&&(Me===null||Me.isXRRenderTarget===!0)&&(Se=t.toneMapping);const je={isWebGL2:d,shaderID:B,shaderType:x.type,shaderName:x.name,vertexShader:H,fragmentShader:q,defines:x.defines,customVertexShaderID:ae,customFragmentShaderID:ge,isRawShaderMaterial:x.isRawShaderMaterial===!0,glslVersion:x.glslVersion,precision:v,batching:Ve,instancing:he,instancingColor:he&&L.instanceColor!==null,supportsVertexTextures:m,outputColorSpace:Me===null?t.outputColorSpace:Me.isXRRenderTarget===!0?Me.texture.colorSpace:di,alphaToCoverage:!!x.alphaToCoverage,map:Pe,matcap:U,envMap:Rt,envMapMode:Rt&&b.mapping,envMapCubeUVHeight:I,aoMap:xe,lightMap:Ae,bumpMap:_e,normalMap:st,displacementMap:m&&be,emissiveMap:T,normalMapObjectSpace:st&&x.normalMapType===Vx,normalMapTangentSpace:st&&x.normalMapType===$g,metalnessMap:y,roughnessMap:F,anisotropy:ne,anisotropyMap:ce,clearcoat:$,clearcoatMap:Te,clearcoatNormalMap:Ne,clearcoatRoughnessMap:Z,iridescence:te,iridescenceMap:qe,iridescenceThicknessMap:ze,sheen:pe,sheenColorMap:Re,sheenRoughnessMap:ve,specularMap:fe,specularColorMap:De,specularIntensityMap:Xe,transmission:oe,transmissionMap:et,thicknessMap:Be,gradientMap:Ke,opaque:x.transparent===!1&&x.blending===ls&&x.alphaToCoverage===!1,alphaMap:A,alphaTest:ie,alphaHash:re,combine:x.combine,mapUv:Pe&&p(x.map.channel),aoMapUv:xe&&p(x.aoMap.channel),lightMapUv:Ae&&p(x.lightMap.channel),bumpMapUv:_e&&p(x.bumpMap.channel),normalMapUv:st&&p(x.normalMap.channel),displacementMapUv:be&&p(x.displacementMap.channel),emissiveMapUv:T&&p(x.emissiveMap.channel),metalnessMapUv:y&&p(x.metalnessMap.channel),roughnessMapUv:F&&p(x.roughnessMap.channel),anisotropyMapUv:ce&&p(x.anisotropyMap.channel),clearcoatMapUv:Te&&p(x.clearcoatMap.channel),clearcoatNormalMapUv:Ne&&p(x.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Z&&p(x.clearcoatRoughnessMap.channel),iridescenceMapUv:qe&&p(x.iridescenceMap.channel),iridescenceThicknessMapUv:ze&&p(x.iridescenceThicknessMap.channel),sheenColorMapUv:Re&&p(x.sheenColorMap.channel),sheenRoughnessMapUv:ve&&p(x.sheenRoughnessMap.channel),specularMapUv:fe&&p(x.specularMap.channel),specularColorMapUv:De&&p(x.specularColorMap.channel),specularIntensityMapUv:Xe&&p(x.specularIntensityMap.channel),transmissionMapUv:et&&p(x.transmissionMap.channel),thicknessMapUv:Be&&p(x.thicknessMap.channel),alphaMapUv:A&&p(x.alphaMap.channel),vertexTangents:!!V.attributes.tangent&&(st||ne),vertexColors:x.vertexColors,vertexAlphas:x.vertexColors===!0&&!!V.attributes.color&&V.attributes.color.itemSize===4,pointsUvs:L.isPoints===!0&&!!V.attributes.uv&&(Pe||A),fog:!!W,useFog:x.fog===!0,fogExp2:!!W&&W.isFogExp2,flatShading:x.flatShading===!0,sizeAttenuation:x.sizeAttenuation===!0,logarithmicDepthBuffer:h,skinning:L.isSkinnedMesh===!0,morphTargets:V.morphAttributes.position!==void 0,morphNormals:V.morphAttributes.normal!==void 0,morphColors:V.morphAttributes.color!==void 0,morphTargetsCount:ee,morphTextureStride:ye,numDirLights:C.directional.length,numPointLights:C.point.length,numSpotLights:C.spot.length,numSpotLightMaps:C.spotLightMap.length,numRectAreaLights:C.rectArea.length,numHemiLights:C.hemi.length,numDirLightShadows:C.directionalShadowMap.length,numPointLightShadows:C.pointShadowMap.length,numSpotLightShadows:C.spotShadowMap.length,numSpotLightShadowsWithMaps:C.numSpotLightShadowsWithMaps,numLightProbes:C.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:x.dithering,shadowMapEnabled:t.shadowMap.enabled&&X.length>0,shadowMapType:t.shadowMap.type,toneMapping:Se,useLegacyLights:t._useLegacyLights,decodeVideoTexture:Pe&&x.map.isVideoTexture===!0&&$e.getTransfer(x.map.colorSpace)===nt,premultipliedAlpha:x.premultipliedAlpha,doubleSided:x.side===ni,flipSided:x.side===tn,useDepthPacking:x.depthPacking>=0,depthPacking:x.depthPacking||0,index0AttributeName:x.index0AttributeName,extensionDerivatives:de&&x.extensions.derivatives===!0,extensionFragDepth:de&&x.extensions.fragDepth===!0,extensionDrawBuffers:de&&x.extensions.drawBuffers===!0,extensionShaderTextureLOD:de&&x.extensions.shaderTextureLOD===!0,extensionClipCullDistance:de&&x.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:de&&x.extensions.multiDraw===!0&&i.has("WEBGL_multi_draw"),rendererExtensionFragDepth:d||i.has("EXT_frag_depth"),rendererExtensionDrawBuffers:d||i.has("WEBGL_draw_buffers"),rendererExtensionShaderTextureLod:d||i.has("EXT_shader_texture_lod"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:x.customProgramCacheKey()};return je.vertexUv1s=u.has(1),je.vertexUv2s=u.has(2),je.vertexUv3s=u.has(3),u.clear(),je}function _(x){const C=[];if(x.shaderID?C.push(x.shaderID):(C.push(x.customVertexShaderID),C.push(x.customFragmentShaderID)),x.defines!==void 0)for(const X in x.defines)C.push(X),C.push(x.defines[X]);return x.isRawShaderMaterial===!1&&(g(C,x),M(C,x),C.push(t.outputColorSpace)),C.push(x.customProgramCacheKey),C.join()}function g(x,C){x.push(C.precision),x.push(C.outputColorSpace),x.push(C.envMapMode),x.push(C.envMapCubeUVHeight),x.push(C.mapUv),x.push(C.alphaMapUv),x.push(C.lightMapUv),x.push(C.aoMapUv),x.push(C.bumpMapUv),x.push(C.normalMapUv),x.push(C.displacementMapUv),x.push(C.emissiveMapUv),x.push(C.metalnessMapUv),x.push(C.roughnessMapUv),x.push(C.anisotropyMapUv),x.push(C.clearcoatMapUv),x.push(C.clearcoatNormalMapUv),x.push(C.clearcoatRoughnessMapUv),x.push(C.iridescenceMapUv),x.push(C.iridescenceThicknessMapUv),x.push(C.sheenColorMapUv),x.push(C.sheenRoughnessMapUv),x.push(C.specularMapUv),x.push(C.specularColorMapUv),x.push(C.specularIntensityMapUv),x.push(C.transmissionMapUv),x.push(C.thicknessMapUv),x.push(C.combine),x.push(C.fogExp2),x.push(C.sizeAttenuation),x.push(C.morphTargetsCount),x.push(C.morphAttributeCount),x.push(C.numDirLights),x.push(C.numPointLights),x.push(C.numSpotLights),x.push(C.numSpotLightMaps),x.push(C.numHemiLights),x.push(C.numRectAreaLights),x.push(C.numDirLightShadows),x.push(C.numPointLightShadows),x.push(C.numSpotLightShadows),x.push(C.numSpotLightShadowsWithMaps),x.push(C.numLightProbes),x.push(C.shadowMapType),x.push(C.toneMapping),x.push(C.numClippingPlanes),x.push(C.numClipIntersection),x.push(C.depthPacking)}function M(x,C){a.disableAll(),C.isWebGL2&&a.enable(0),C.supportsVertexTextures&&a.enable(1),C.instancing&&a.enable(2),C.instancingColor&&a.enable(3),C.matcap&&a.enable(4),C.envMap&&a.enable(5),C.normalMapObjectSpace&&a.enable(6),C.normalMapTangentSpace&&a.enable(7),C.clearcoat&&a.enable(8),C.iridescence&&a.enable(9),C.alphaTest&&a.enable(10),C.vertexColors&&a.enable(11),C.vertexAlphas&&a.enable(12),C.vertexUv1s&&a.enable(13),C.vertexUv2s&&a.enable(14),C.vertexUv3s&&a.enable(15),C.vertexTangents&&a.enable(16),C.anisotropy&&a.enable(17),C.alphaHash&&a.enable(18),C.batching&&a.enable(19),x.push(a.mask),a.disableAll(),C.fog&&a.enable(0),C.useFog&&a.enable(1),C.flatShading&&a.enable(2),C.logarithmicDepthBuffer&&a.enable(3),C.skinning&&a.enable(4),C.morphTargets&&a.enable(5),C.morphNormals&&a.enable(6),C.morphColors&&a.enable(7),C.premultipliedAlpha&&a.enable(8),C.shadowMapEnabled&&a.enable(9),C.useLegacyLights&&a.enable(10),C.doubleSided&&a.enable(11),C.flipSided&&a.enable(12),C.useDepthPacking&&a.enable(13),C.dithering&&a.enable(14),C.transmission&&a.enable(15),C.sheen&&a.enable(16),C.opaque&&a.enable(17),C.pointsUvs&&a.enable(18),C.decodeVideoTexture&&a.enable(19),C.alphaToCoverage&&a.enable(20),x.push(a.mask)}function P(x){const C=S[x.type];let X;if(C){const Q=Bn[C];X=_S.clone(Q.uniforms)}else X=x.uniforms;return X}function R(x,C){let X;for(let Q=0,L=f.length;Q<L;Q++){const W=f[Q];if(W.cacheKey===C){X=W,++X.usedTimes;break}}return X===void 0&&(X=new bT(t,C,x,s),f.push(X)),X}function w(x){if(--x.usedTimes===0){const C=f.indexOf(x);f[C]=f[f.length-1],f.pop(),x.destroy()}}function N(x){l.remove(x)}function K(){l.dispose()}return{getParameters:c,getProgramCacheKey:_,getUniforms:P,acquireProgram:R,releaseProgram:w,releaseShaderCache:N,programs:f,dispose:K}}function FT(){let t=new WeakMap;function e(s){let o=t.get(s);return o===void 0&&(o={},t.set(s,o)),o}function n(s){t.delete(s)}function i(s,o,a){t.get(s)[o]=a}function r(){t=new WeakMap}return{get:e,remove:n,update:i,dispose:r}}function OT(t,e){return t.groupOrder!==e.groupOrder?t.groupOrder-e.groupOrder:t.renderOrder!==e.renderOrder?t.renderOrder-e.renderOrder:t.material.id!==e.material.id?t.material.id-e.material.id:t.z!==e.z?t.z-e.z:t.id-e.id}function xp(t,e){return t.groupOrder!==e.groupOrder?t.groupOrder-e.groupOrder:t.renderOrder!==e.renderOrder?t.renderOrder-e.renderOrder:t.z!==e.z?e.z-t.z:t.id-e.id}function Sp(){const t=[];let e=0;const n=[],i=[],r=[];function s(){e=0,n.length=0,i.length=0,r.length=0}function o(d,h,m,v,S,p){let c=t[e];return c===void 0?(c={id:d.id,object:d,geometry:h,material:m,groupOrder:v,renderOrder:d.renderOrder,z:S,group:p},t[e]=c):(c.id=d.id,c.object=d,c.geometry=h,c.material=m,c.groupOrder=v,c.renderOrder=d.renderOrder,c.z=S,c.group=p),e++,c}function a(d,h,m,v,S,p){const c=o(d,h,m,v,S,p);m.transmission>0?i.push(c):m.transparent===!0?r.push(c):n.push(c)}function l(d,h,m,v,S,p){const c=o(d,h,m,v,S,p);m.transmission>0?i.unshift(c):m.transparent===!0?r.unshift(c):n.unshift(c)}function u(d,h){n.length>1&&n.sort(d||OT),i.length>1&&i.sort(h||xp),r.length>1&&r.sort(h||xp)}function f(){for(let d=e,h=t.length;d<h;d++){const m=t[d];if(m.id===null)break;m.id=null,m.object=null,m.geometry=null,m.material=null,m.group=null}}return{opaque:n,transmissive:i,transparent:r,init:s,push:a,unshift:l,finish:f,sort:u}}function zT(){let t=new WeakMap;function e(i,r){const s=t.get(i);let o;return s===void 0?(o=new Sp,t.set(i,[o])):r>=s.length?(o=new Sp,s.push(o)):o=s[r],o}function n(){t=new WeakMap}return{get:e,dispose:n}}function kT(){const t={};return{get:function(e){if(t[e.id]!==void 0)return t[e.id];let n;switch(e.type){case"DirectionalLight":n={direction:new z,color:new We};break;case"SpotLight":n={position:new z,direction:new z,color:new We,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":n={position:new z,color:new We,distance:0,decay:0};break;case"HemisphereLight":n={direction:new z,skyColor:new We,groundColor:new We};break;case"RectAreaLight":n={color:new We,position:new z,halfWidth:new z,halfHeight:new z};break}return t[e.id]=n,n}}}function BT(){const t={};return{get:function(e){if(t[e.id]!==void 0)return t[e.id];let n;switch(e.type){case"DirectionalLight":n={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ge};break;case"SpotLight":n={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ge};break;case"PointLight":n={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ge,shadowCameraNear:1,shadowCameraFar:1e3};break}return t[e.id]=n,n}}}let HT=0;function GT(t,e){return(e.castShadow?2:0)-(t.castShadow?2:0)+(e.map?1:0)-(t.map?1:0)}function VT(t,e){const n=new kT,i=BT(),r={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let f=0;f<9;f++)r.probe.push(new z);const s=new z,o=new vt,a=new vt;function l(f,d){let h=0,m=0,v=0;for(let X=0;X<9;X++)r.probe[X].set(0,0,0);let S=0,p=0,c=0,_=0,g=0,M=0,P=0,R=0,w=0,N=0,K=0;f.sort(GT);const x=d===!0?Math.PI:1;for(let X=0,Q=f.length;X<Q;X++){const L=f[X],W=L.color,V=L.intensity,Y=L.distance,b=L.shadow&&L.shadow.map?L.shadow.map.texture:null;if(L.isAmbientLight)h+=W.r*V*x,m+=W.g*V*x,v+=W.b*V*x;else if(L.isLightProbe){for(let I=0;I<9;I++)r.probe[I].addScaledVector(L.sh.coefficients[I],V);K++}else if(L.isDirectionalLight){const I=n.get(L);if(I.color.copy(L.color).multiplyScalar(L.intensity*x),L.castShadow){const B=L.shadow,j=i.get(L);j.shadowBias=B.bias,j.shadowNormalBias=B.normalBias,j.shadowRadius=B.radius,j.shadowMapSize=B.mapSize,r.directionalShadow[S]=j,r.directionalShadowMap[S]=b,r.directionalShadowMatrix[S]=L.shadow.matrix,M++}r.directional[S]=I,S++}else if(L.isSpotLight){const I=n.get(L);I.position.setFromMatrixPosition(L.matrixWorld),I.color.copy(W).multiplyScalar(V*x),I.distance=Y,I.coneCos=Math.cos(L.angle),I.penumbraCos=Math.cos(L.angle*(1-L.penumbra)),I.decay=L.decay,r.spot[c]=I;const B=L.shadow;if(L.map&&(r.spotLightMap[w]=L.map,w++,B.updateMatrices(L),L.castShadow&&N++),r.spotLightMatrix[c]=B.matrix,L.castShadow){const j=i.get(L);j.shadowBias=B.bias,j.shadowNormalBias=B.normalBias,j.shadowRadius=B.radius,j.shadowMapSize=B.mapSize,r.spotShadow[c]=j,r.spotShadowMap[c]=b,R++}c++}else if(L.isRectAreaLight){const I=n.get(L);I.color.copy(W).multiplyScalar(V),I.halfWidth.set(L.width*.5,0,0),I.halfHeight.set(0,L.height*.5,0),r.rectArea[_]=I,_++}else if(L.isPointLight){const I=n.get(L);if(I.color.copy(L.color).multiplyScalar(L.intensity*x),I.distance=L.distance,I.decay=L.decay,L.castShadow){const B=L.shadow,j=i.get(L);j.shadowBias=B.bias,j.shadowNormalBias=B.normalBias,j.shadowRadius=B.radius,j.shadowMapSize=B.mapSize,j.shadowCameraNear=B.camera.near,j.shadowCameraFar=B.camera.far,r.pointShadow[p]=j,r.pointShadowMap[p]=b,r.pointShadowMatrix[p]=L.shadow.matrix,P++}r.point[p]=I,p++}else if(L.isHemisphereLight){const I=n.get(L);I.skyColor.copy(L.color).multiplyScalar(V*x),I.groundColor.copy(L.groundColor).multiplyScalar(V*x),r.hemi[g]=I,g++}}_>0&&(e.isWebGL2?t.has("OES_texture_float_linear")===!0?(r.rectAreaLTC1=se.LTC_FLOAT_1,r.rectAreaLTC2=se.LTC_FLOAT_2):(r.rectAreaLTC1=se.LTC_HALF_1,r.rectAreaLTC2=se.LTC_HALF_2):t.has("OES_texture_float_linear")===!0?(r.rectAreaLTC1=se.LTC_FLOAT_1,r.rectAreaLTC2=se.LTC_FLOAT_2):t.has("OES_texture_half_float_linear")===!0?(r.rectAreaLTC1=se.LTC_HALF_1,r.rectAreaLTC2=se.LTC_HALF_2):console.error("THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.")),r.ambient[0]=h,r.ambient[1]=m,r.ambient[2]=v;const C=r.hash;(C.directionalLength!==S||C.pointLength!==p||C.spotLength!==c||C.rectAreaLength!==_||C.hemiLength!==g||C.numDirectionalShadows!==M||C.numPointShadows!==P||C.numSpotShadows!==R||C.numSpotMaps!==w||C.numLightProbes!==K)&&(r.directional.length=S,r.spot.length=c,r.rectArea.length=_,r.point.length=p,r.hemi.length=g,r.directionalShadow.length=M,r.directionalShadowMap.length=M,r.pointShadow.length=P,r.pointShadowMap.length=P,r.spotShadow.length=R,r.spotShadowMap.length=R,r.directionalShadowMatrix.length=M,r.pointShadowMatrix.length=P,r.spotLightMatrix.length=R+w-N,r.spotLightMap.length=w,r.numSpotLightShadowsWithMaps=N,r.numLightProbes=K,C.directionalLength=S,C.pointLength=p,C.spotLength=c,C.rectAreaLength=_,C.hemiLength=g,C.numDirectionalShadows=M,C.numPointShadows=P,C.numSpotShadows=R,C.numSpotMaps=w,C.numLightProbes=K,r.version=HT++)}function u(f,d){let h=0,m=0,v=0,S=0,p=0;const c=d.matrixWorldInverse;for(let _=0,g=f.length;_<g;_++){const M=f[_];if(M.isDirectionalLight){const P=r.directional[h];P.direction.setFromMatrixPosition(M.matrixWorld),s.setFromMatrixPosition(M.target.matrixWorld),P.direction.sub(s),P.direction.transformDirection(c),h++}else if(M.isSpotLight){const P=r.spot[v];P.position.setFromMatrixPosition(M.matrixWorld),P.position.applyMatrix4(c),P.direction.setFromMatrixPosition(M.matrixWorld),s.setFromMatrixPosition(M.target.matrixWorld),P.direction.sub(s),P.direction.transformDirection(c),v++}else if(M.isRectAreaLight){const P=r.rectArea[S];P.position.setFromMatrixPosition(M.matrixWorld),P.position.applyMatrix4(c),a.identity(),o.copy(M.matrixWorld),o.premultiply(c),a.extractRotation(o),P.halfWidth.set(M.width*.5,0,0),P.halfHeight.set(0,M.height*.5,0),P.halfWidth.applyMatrix4(a),P.halfHeight.applyMatrix4(a),S++}else if(M.isPointLight){const P=r.point[m];P.position.setFromMatrixPosition(M.matrixWorld),P.position.applyMatrix4(c),m++}else if(M.isHemisphereLight){const P=r.hemi[p];P.direction.setFromMatrixPosition(M.matrixWorld),P.direction.transformDirection(c),p++}}}return{setup:l,setupView:u,state:r}}function yp(t,e){const n=new VT(t,e),i=[],r=[];function s(){i.length=0,r.length=0}function o(d){i.push(d)}function a(d){r.push(d)}function l(d){n.setup(i,d)}function u(d){n.setupView(i,d)}return{init:s,state:{lightsArray:i,shadowsArray:r,lights:n},setupLights:l,setupLightsView:u,pushLight:o,pushShadow:a}}function WT(t,e){let n=new WeakMap;function i(s,o=0){const a=n.get(s);let l;return a===void 0?(l=new yp(t,e),n.set(s,[l])):o>=a.length?(l=new yp(t,e),a.push(l)):l=a[o],l}function r(){n=new WeakMap}return{get:i,dispose:r}}class XT extends Po{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Hx,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class jT extends Po{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const YT=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,qT=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function $T(t,e,n){let i=new Of;const r=new Ge,s=new Ge,o=new wt,a=new XT({depthPacking:Gx}),l=new jT,u={},f=n.maxTextureSize,d={[Gi]:tn,[tn]:Gi,[ni]:ni},h=new Vi({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Ge},radius:{value:4}},vertexShader:YT,fragmentShader:qT}),m=h.clone();m.defines.HORIZONTAL_PASS=1;const v=new Er;v.setAttribute("position",new Xn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const S=new Un(v,h),p=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Og;let c=this.type;this.render=function(R,w,N){if(p.enabled===!1||p.autoUpdate===!1&&p.needsUpdate===!1||R.length===0)return;const K=t.getRenderTarget(),x=t.getActiveCubeFace(),C=t.getActiveMipmapLevel(),X=t.state;X.setBlending(Oi),X.buffers.color.setClear(1,1,1,1),X.buffers.depth.setTest(!0),X.setScissorTest(!1);const Q=c!==Jn&&this.type===Jn,L=c===Jn&&this.type!==Jn;for(let W=0,V=R.length;W<V;W++){const Y=R[W],b=Y.shadow;if(b===void 0){console.warn("THREE.WebGLShadowMap:",Y,"has no shadow.");continue}if(b.autoUpdate===!1&&b.needsUpdate===!1)continue;r.copy(b.mapSize);const I=b.getFrameExtents();if(r.multiply(I),s.copy(b.mapSize),(r.x>f||r.y>f)&&(r.x>f&&(s.x=Math.floor(f/I.x),r.x=s.x*I.x,b.mapSize.x=s.x),r.y>f&&(s.y=Math.floor(f/I.y),r.y=s.y*I.y,b.mapSize.y=s.y)),b.map===null||Q===!0||L===!0){const j=this.type!==Jn?{minFilter:Vt,magFilter:Vt}:{};b.map!==null&&b.map.dispose(),b.map=new Sr(r.x,r.y,j),b.map.texture.name=Y.name+".shadowMap",b.camera.updateProjectionMatrix()}t.setRenderTarget(b.map),t.clear();const B=b.getViewportCount();for(let j=0;j<B;j++){const ee=b.getViewport(j);o.set(s.x*ee.x,s.y*ee.y,s.x*ee.z,s.y*ee.w),X.viewport(o),b.updateMatrices(Y,j),i=b.getFrustum(),M(w,N,b.camera,Y,this.type)}b.isPointLightShadow!==!0&&this.type===Jn&&_(b,N),b.needsUpdate=!1}c=this.type,p.needsUpdate=!1,t.setRenderTarget(K,x,C)};function _(R,w){const N=e.update(S);h.defines.VSM_SAMPLES!==R.blurSamples&&(h.defines.VSM_SAMPLES=R.blurSamples,m.defines.VSM_SAMPLES=R.blurSamples,h.needsUpdate=!0,m.needsUpdate=!0),R.mapPass===null&&(R.mapPass=new Sr(r.x,r.y)),h.uniforms.shadow_pass.value=R.map.texture,h.uniforms.resolution.value=R.mapSize,h.uniforms.radius.value=R.radius,t.setRenderTarget(R.mapPass),t.clear(),t.renderBufferDirect(w,null,N,h,S,null),m.uniforms.shadow_pass.value=R.mapPass.texture,m.uniforms.resolution.value=R.mapSize,m.uniforms.radius.value=R.radius,t.setRenderTarget(R.map),t.clear(),t.renderBufferDirect(w,null,N,m,S,null)}function g(R,w,N,K){let x=null;const C=N.isPointLight===!0?R.customDistanceMaterial:R.customDepthMaterial;if(C!==void 0)x=C;else if(x=N.isPointLight===!0?l:a,t.localClippingEnabled&&w.clipShadows===!0&&Array.isArray(w.clippingPlanes)&&w.clippingPlanes.length!==0||w.displacementMap&&w.displacementScale!==0||w.alphaMap&&w.alphaTest>0||w.map&&w.alphaTest>0){const X=x.uuid,Q=w.uuid;let L=u[X];L===void 0&&(L={},u[X]=L);let W=L[Q];W===void 0&&(W=x.clone(),L[Q]=W,w.addEventListener("dispose",P)),x=W}if(x.visible=w.visible,x.wireframe=w.wireframe,K===Jn?x.side=w.shadowSide!==null?w.shadowSide:w.side:x.side=w.shadowSide!==null?w.shadowSide:d[w.side],x.alphaMap=w.alphaMap,x.alphaTest=w.alphaTest,x.map=w.map,x.clipShadows=w.clipShadows,x.clippingPlanes=w.clippingPlanes,x.clipIntersection=w.clipIntersection,x.displacementMap=w.displacementMap,x.displacementScale=w.displacementScale,x.displacementBias=w.displacementBias,x.wireframeLinewidth=w.wireframeLinewidth,x.linewidth=w.linewidth,N.isPointLight===!0&&x.isMeshDistanceMaterial===!0){const X=t.properties.get(x);X.light=N}return x}function M(R,w,N,K,x){if(R.visible===!1)return;if(R.layers.test(w.layers)&&(R.isMesh||R.isLine||R.isPoints)&&(R.castShadow||R.receiveShadow&&x===Jn)&&(!R.frustumCulled||i.intersectsObject(R))){R.modelViewMatrix.multiplyMatrices(N.matrixWorldInverse,R.matrixWorld);const Q=e.update(R),L=R.material;if(Array.isArray(L)){const W=Q.groups;for(let V=0,Y=W.length;V<Y;V++){const b=W[V],I=L[b.materialIndex];if(I&&I.visible){const B=g(R,I,K,x);R.onBeforeShadow(t,R,w,N,Q,B,b),t.renderBufferDirect(N,null,Q,B,R,b),R.onAfterShadow(t,R,w,N,Q,B,b)}}}else if(L.visible){const W=g(R,L,K,x);R.onBeforeShadow(t,R,w,N,Q,W,null),t.renderBufferDirect(N,null,Q,W,R,null),R.onAfterShadow(t,R,w,N,Q,W,null)}}const X=R.children;for(let Q=0,L=X.length;Q<L;Q++)M(X[Q],w,N,K,x)}function P(R){R.target.removeEventListener("dispose",P);for(const N in u){const K=u[N],x=R.target.uuid;x in K&&(K[x].dispose(),delete K[x])}}}function KT(t,e,n){const i=n.isWebGL2;function r(){let A=!1;const ie=new wt;let re=null;const de=new wt(0,0,0,0);return{setMask:function(Se){re!==Se&&!A&&(t.colorMask(Se,Se,Se,Se),re=Se)},setLocked:function(Se){A=Se},setClear:function(Se,je,Ze,Ct,hn){hn===!0&&(Se*=Ct,je*=Ct,Ze*=Ct),ie.set(Se,je,Ze,Ct),de.equals(ie)===!1&&(t.clearColor(Se,je,Ze,Ct),de.copy(ie))},reset:function(){A=!1,re=null,de.set(-1,0,0,0)}}}function s(){let A=!1,ie=null,re=null,de=null;return{setTest:function(Se){Se?he(t.DEPTH_TEST):Ve(t.DEPTH_TEST)},setMask:function(Se){ie!==Se&&!A&&(t.depthMask(Se),ie=Se)},setFunc:function(Se){if(re!==Se){switch(Se){case xx:t.depthFunc(t.NEVER);break;case Sx:t.depthFunc(t.ALWAYS);break;case yx:t.depthFunc(t.LESS);break;case el:t.depthFunc(t.LEQUAL);break;case Mx:t.depthFunc(t.EQUAL);break;case Ex:t.depthFunc(t.GEQUAL);break;case Tx:t.depthFunc(t.GREATER);break;case wx:t.depthFunc(t.NOTEQUAL);break;default:t.depthFunc(t.LEQUAL)}re=Se}},setLocked:function(Se){A=Se},setClear:function(Se){de!==Se&&(t.clearDepth(Se),de=Se)},reset:function(){A=!1,ie=null,re=null,de=null}}}function o(){let A=!1,ie=null,re=null,de=null,Se=null,je=null,Ze=null,Ct=null,hn=null;return{setTest:function(Qe){A||(Qe?he(t.STENCIL_TEST):Ve(t.STENCIL_TEST))},setMask:function(Qe){ie!==Qe&&!A&&(t.stencilMask(Qe),ie=Qe)},setFunc:function(Qe,Bt,On){(re!==Qe||de!==Bt||Se!==On)&&(t.stencilFunc(Qe,Bt,On),re=Qe,de=Bt,Se=On)},setOp:function(Qe,Bt,On){(je!==Qe||Ze!==Bt||Ct!==On)&&(t.stencilOp(Qe,Bt,On),je=Qe,Ze=Bt,Ct=On)},setLocked:function(Qe){A=Qe},setClear:function(Qe){hn!==Qe&&(t.clearStencil(Qe),hn=Qe)},reset:function(){A=!1,ie=null,re=null,de=null,Se=null,je=null,Ze=null,Ct=null,hn=null}}}const a=new r,l=new s,u=new o,f=new WeakMap,d=new WeakMap;let h={},m={},v=new WeakMap,S=[],p=null,c=!1,_=null,g=null,M=null,P=null,R=null,w=null,N=null,K=new We(0,0,0),x=0,C=!1,X=null,Q=null,L=null,W=null,V=null;const Y=t.getParameter(t.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let b=!1,I=0;const B=t.getParameter(t.VERSION);B.indexOf("WebGL")!==-1?(I=parseFloat(/^WebGL (\d)/.exec(B)[1]),b=I>=1):B.indexOf("OpenGL ES")!==-1&&(I=parseFloat(/^OpenGL ES (\d)/.exec(B)[1]),b=I>=2);let j=null,ee={};const ye=t.getParameter(t.SCISSOR_BOX),H=t.getParameter(t.VIEWPORT),q=new wt().fromArray(ye),ae=new wt().fromArray(H);function ge(A,ie,re,de){const Se=new Uint8Array(4),je=t.createTexture();t.bindTexture(A,je),t.texParameteri(A,t.TEXTURE_MIN_FILTER,t.NEAREST),t.texParameteri(A,t.TEXTURE_MAG_FILTER,t.NEAREST);for(let Ze=0;Ze<re;Ze++)i&&(A===t.TEXTURE_3D||A===t.TEXTURE_2D_ARRAY)?t.texImage3D(ie,0,t.RGBA,1,1,de,0,t.RGBA,t.UNSIGNED_BYTE,Se):t.texImage2D(ie+Ze,0,t.RGBA,1,1,0,t.RGBA,t.UNSIGNED_BYTE,Se);return je}const Me={};Me[t.TEXTURE_2D]=ge(t.TEXTURE_2D,t.TEXTURE_2D,1),Me[t.TEXTURE_CUBE_MAP]=ge(t.TEXTURE_CUBE_MAP,t.TEXTURE_CUBE_MAP_POSITIVE_X,6),i&&(Me[t.TEXTURE_2D_ARRAY]=ge(t.TEXTURE_2D_ARRAY,t.TEXTURE_2D_ARRAY,1,1),Me[t.TEXTURE_3D]=ge(t.TEXTURE_3D,t.TEXTURE_3D,1,1)),a.setClear(0,0,0,1),l.setClear(1),u.setClear(0),he(t.DEPTH_TEST),l.setFunc(el),be(!1),T(eh),he(t.CULL_FACE),_e(Oi);function he(A){h[A]!==!0&&(t.enable(A),h[A]=!0)}function Ve(A){h[A]!==!1&&(t.disable(A),h[A]=!1)}function Pe(A,ie){return m[A]!==ie?(t.bindFramebuffer(A,ie),m[A]=ie,i&&(A===t.DRAW_FRAMEBUFFER&&(m[t.FRAMEBUFFER]=ie),A===t.FRAMEBUFFER&&(m[t.DRAW_FRAMEBUFFER]=ie)),!0):!1}function U(A,ie){let re=S,de=!1;if(A)if(re=v.get(ie),re===void 0&&(re=[],v.set(ie,re)),A.isWebGLMultipleRenderTargets){const Se=A.texture;if(re.length!==Se.length||re[0]!==t.COLOR_ATTACHMENT0){for(let je=0,Ze=Se.length;je<Ze;je++)re[je]=t.COLOR_ATTACHMENT0+je;re.length=Se.length,de=!0}}else re[0]!==t.COLOR_ATTACHMENT0&&(re[0]=t.COLOR_ATTACHMENT0,de=!0);else re[0]!==t.BACK&&(re[0]=t.BACK,de=!0);de&&(n.isWebGL2?t.drawBuffers(re):e.get("WEBGL_draw_buffers").drawBuffersWEBGL(re))}function Rt(A){return p!==A?(t.useProgram(A),p=A,!0):!1}const xe={[ir]:t.FUNC_ADD,[rx]:t.FUNC_SUBTRACT,[sx]:t.FUNC_REVERSE_SUBTRACT};if(i)xe[rh]=t.MIN,xe[sh]=t.MAX;else{const A=e.get("EXT_blend_minmax");A!==null&&(xe[rh]=A.MIN_EXT,xe[sh]=A.MAX_EXT)}const Ae={[ox]:t.ZERO,[ax]:t.ONE,[lx]:t.SRC_COLOR,[Cc]:t.SRC_ALPHA,[px]:t.SRC_ALPHA_SATURATE,[dx]:t.DST_COLOR,[cx]:t.DST_ALPHA,[ux]:t.ONE_MINUS_SRC_COLOR,[Pc]:t.ONE_MINUS_SRC_ALPHA,[hx]:t.ONE_MINUS_DST_COLOR,[fx]:t.ONE_MINUS_DST_ALPHA,[mx]:t.CONSTANT_COLOR,[gx]:t.ONE_MINUS_CONSTANT_COLOR,[_x]:t.CONSTANT_ALPHA,[vx]:t.ONE_MINUS_CONSTANT_ALPHA};function _e(A,ie,re,de,Se,je,Ze,Ct,hn,Qe){if(A===Oi){c===!0&&(Ve(t.BLEND),c=!1);return}if(c===!1&&(he(t.BLEND),c=!0),A!==ix){if(A!==_||Qe!==C){if((g!==ir||R!==ir)&&(t.blendEquation(t.FUNC_ADD),g=ir,R=ir),Qe)switch(A){case ls:t.blendFuncSeparate(t.ONE,t.ONE_MINUS_SRC_ALPHA,t.ONE,t.ONE_MINUS_SRC_ALPHA);break;case th:t.blendFunc(t.ONE,t.ONE);break;case nh:t.blendFuncSeparate(t.ZERO,t.ONE_MINUS_SRC_COLOR,t.ZERO,t.ONE);break;case ih:t.blendFuncSeparate(t.ZERO,t.SRC_COLOR,t.ZERO,t.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",A);break}else switch(A){case ls:t.blendFuncSeparate(t.SRC_ALPHA,t.ONE_MINUS_SRC_ALPHA,t.ONE,t.ONE_MINUS_SRC_ALPHA);break;case th:t.blendFunc(t.SRC_ALPHA,t.ONE);break;case nh:t.blendFuncSeparate(t.ZERO,t.ONE_MINUS_SRC_COLOR,t.ZERO,t.ONE);break;case ih:t.blendFunc(t.ZERO,t.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",A);break}M=null,P=null,w=null,N=null,K.set(0,0,0),x=0,_=A,C=Qe}return}Se=Se||ie,je=je||re,Ze=Ze||de,(ie!==g||Se!==R)&&(t.blendEquationSeparate(xe[ie],xe[Se]),g=ie,R=Se),(re!==M||de!==P||je!==w||Ze!==N)&&(t.blendFuncSeparate(Ae[re],Ae[de],Ae[je],Ae[Ze]),M=re,P=de,w=je,N=Ze),(Ct.equals(K)===!1||hn!==x)&&(t.blendColor(Ct.r,Ct.g,Ct.b,hn),K.copy(Ct),x=hn),_=A,C=!1}function st(A,ie){A.side===ni?Ve(t.CULL_FACE):he(t.CULL_FACE);let re=A.side===tn;ie&&(re=!re),be(re),A.blending===ls&&A.transparent===!1?_e(Oi):_e(A.blending,A.blendEquation,A.blendSrc,A.blendDst,A.blendEquationAlpha,A.blendSrcAlpha,A.blendDstAlpha,A.blendColor,A.blendAlpha,A.premultipliedAlpha),l.setFunc(A.depthFunc),l.setTest(A.depthTest),l.setMask(A.depthWrite),a.setMask(A.colorWrite);const de=A.stencilWrite;u.setTest(de),de&&(u.setMask(A.stencilWriteMask),u.setFunc(A.stencilFunc,A.stencilRef,A.stencilFuncMask),u.setOp(A.stencilFail,A.stencilZFail,A.stencilZPass)),F(A.polygonOffset,A.polygonOffsetFactor,A.polygonOffsetUnits),A.alphaToCoverage===!0?he(t.SAMPLE_ALPHA_TO_COVERAGE):Ve(t.SAMPLE_ALPHA_TO_COVERAGE)}function be(A){X!==A&&(A?t.frontFace(t.CW):t.frontFace(t.CCW),X=A)}function T(A){A!==ex?(he(t.CULL_FACE),A!==Q&&(A===eh?t.cullFace(t.BACK):A===tx?t.cullFace(t.FRONT):t.cullFace(t.FRONT_AND_BACK))):Ve(t.CULL_FACE),Q=A}function y(A){A!==L&&(b&&t.lineWidth(A),L=A)}function F(A,ie,re){A?(he(t.POLYGON_OFFSET_FILL),(W!==ie||V!==re)&&(t.polygonOffset(ie,re),W=ie,V=re)):Ve(t.POLYGON_OFFSET_FILL)}function ne(A){A?he(t.SCISSOR_TEST):Ve(t.SCISSOR_TEST)}function $(A){A===void 0&&(A=t.TEXTURE0+Y-1),j!==A&&(t.activeTexture(A),j=A)}function te(A,ie,re){re===void 0&&(j===null?re=t.TEXTURE0+Y-1:re=j);let de=ee[re];de===void 0&&(de={type:void 0,texture:void 0},ee[re]=de),(de.type!==A||de.texture!==ie)&&(j!==re&&(t.activeTexture(re),j=re),t.bindTexture(A,ie||Me[A]),de.type=A,de.texture=ie)}function pe(){const A=ee[j];A!==void 0&&A.type!==void 0&&(t.bindTexture(A.type,null),A.type=void 0,A.texture=void 0)}function oe(){try{t.compressedTexImage2D.apply(t,arguments)}catch(A){console.error("THREE.WebGLState:",A)}}function ce(){try{t.compressedTexImage3D.apply(t,arguments)}catch(A){console.error("THREE.WebGLState:",A)}}function Te(){try{t.texSubImage2D.apply(t,arguments)}catch(A){console.error("THREE.WebGLState:",A)}}function Ne(){try{t.texSubImage3D.apply(t,arguments)}catch(A){console.error("THREE.WebGLState:",A)}}function Z(){try{t.compressedTexSubImage2D.apply(t,arguments)}catch(A){console.error("THREE.WebGLState:",A)}}function qe(){try{t.compressedTexSubImage3D.apply(t,arguments)}catch(A){console.error("THREE.WebGLState:",A)}}function ze(){try{t.texStorage2D.apply(t,arguments)}catch(A){console.error("THREE.WebGLState:",A)}}function Re(){try{t.texStorage3D.apply(t,arguments)}catch(A){console.error("THREE.WebGLState:",A)}}function ve(){try{t.texImage2D.apply(t,arguments)}catch(A){console.error("THREE.WebGLState:",A)}}function fe(){try{t.texImage3D.apply(t,arguments)}catch(A){console.error("THREE.WebGLState:",A)}}function De(A){q.equals(A)===!1&&(t.scissor(A.x,A.y,A.z,A.w),q.copy(A))}function Xe(A){ae.equals(A)===!1&&(t.viewport(A.x,A.y,A.z,A.w),ae.copy(A))}function et(A,ie){let re=d.get(ie);re===void 0&&(re=new WeakMap,d.set(ie,re));let de=re.get(A);de===void 0&&(de=t.getUniformBlockIndex(ie,A.name),re.set(A,de))}function Be(A,ie){const de=d.get(ie).get(A);f.get(ie)!==de&&(t.uniformBlockBinding(ie,de,A.__bindingPointIndex),f.set(ie,de))}function Ke(){t.disable(t.BLEND),t.disable(t.CULL_FACE),t.disable(t.DEPTH_TEST),t.disable(t.POLYGON_OFFSET_FILL),t.disable(t.SCISSOR_TEST),t.disable(t.STENCIL_TEST),t.disable(t.SAMPLE_ALPHA_TO_COVERAGE),t.blendEquation(t.FUNC_ADD),t.blendFunc(t.ONE,t.ZERO),t.blendFuncSeparate(t.ONE,t.ZERO,t.ONE,t.ZERO),t.blendColor(0,0,0,0),t.colorMask(!0,!0,!0,!0),t.clearColor(0,0,0,0),t.depthMask(!0),t.depthFunc(t.LESS),t.clearDepth(1),t.stencilMask(4294967295),t.stencilFunc(t.ALWAYS,0,4294967295),t.stencilOp(t.KEEP,t.KEEP,t.KEEP),t.clearStencil(0),t.cullFace(t.BACK),t.frontFace(t.CCW),t.polygonOffset(0,0),t.activeTexture(t.TEXTURE0),t.bindFramebuffer(t.FRAMEBUFFER,null),i===!0&&(t.bindFramebuffer(t.DRAW_FRAMEBUFFER,null),t.bindFramebuffer(t.READ_FRAMEBUFFER,null)),t.useProgram(null),t.lineWidth(1),t.scissor(0,0,t.canvas.width,t.canvas.height),t.viewport(0,0,t.canvas.width,t.canvas.height),h={},j=null,ee={},m={},v=new WeakMap,S=[],p=null,c=!1,_=null,g=null,M=null,P=null,R=null,w=null,N=null,K=new We(0,0,0),x=0,C=!1,X=null,Q=null,L=null,W=null,V=null,q.set(0,0,t.canvas.width,t.canvas.height),ae.set(0,0,t.canvas.width,t.canvas.height),a.reset(),l.reset(),u.reset()}return{buffers:{color:a,depth:l,stencil:u},enable:he,disable:Ve,bindFramebuffer:Pe,drawBuffers:U,useProgram:Rt,setBlending:_e,setMaterial:st,setFlipSided:be,setCullFace:T,setLineWidth:y,setPolygonOffset:F,setScissorTest:ne,activeTexture:$,bindTexture:te,unbindTexture:pe,compressedTexImage2D:oe,compressedTexImage3D:ce,texImage2D:ve,texImage3D:fe,updateUBOMapping:et,uniformBlockBinding:Be,texStorage2D:ze,texStorage3D:Re,texSubImage2D:Te,texSubImage3D:Ne,compressedTexSubImage2D:Z,compressedTexSubImage3D:qe,scissor:De,viewport:Xe,reset:Ke}}function ZT(t,e,n,i,r,s,o){const a=r.isWebGL2,l=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,u=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),f=new WeakMap;let d;const h=new WeakMap;let m=!1;try{m=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function v(T,y){return m?new OffscreenCanvas(T,y):sl("canvas")}function S(T,y,F,ne){let $=1;if((T.width>ne||T.height>ne)&&($=ne/Math.max(T.width,T.height)),$<1||y===!0)if(typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&T instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&T instanceof ImageBitmap){const te=y?Fc:Math.floor,pe=te($*T.width),oe=te($*T.height);d===void 0&&(d=v(pe,oe));const ce=F?v(pe,oe):d;return ce.width=pe,ce.height=oe,ce.getContext("2d").drawImage(T,0,0,pe,oe),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+T.width+"x"+T.height+") to ("+pe+"x"+oe+")."),ce}else return"data"in T&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+T.width+"x"+T.height+")."),T;return T}function p(T){return Ih(T.width)&&Ih(T.height)}function c(T){return a?!1:T.wrapS!==bn||T.wrapT!==bn||T.minFilter!==Vt&&T.minFilter!==qt}function _(T,y){return T.generateMipmaps&&y&&T.minFilter!==Vt&&T.minFilter!==qt}function g(T){t.generateMipmap(T)}function M(T,y,F,ne,$=!1){if(a===!1)return y;if(T!==null){if(t[T]!==void 0)return t[T];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+T+"'")}let te=y;if(y===t.RED&&(F===t.FLOAT&&(te=t.R32F),F===t.HALF_FLOAT&&(te=t.R16F),F===t.UNSIGNED_BYTE&&(te=t.R8)),y===t.RED_INTEGER&&(F===t.UNSIGNED_BYTE&&(te=t.R8UI),F===t.UNSIGNED_SHORT&&(te=t.R16UI),F===t.UNSIGNED_INT&&(te=t.R32UI),F===t.BYTE&&(te=t.R8I),F===t.SHORT&&(te=t.R16I),F===t.INT&&(te=t.R32I)),y===t.RG&&(F===t.FLOAT&&(te=t.RG32F),F===t.HALF_FLOAT&&(te=t.RG16F),F===t.UNSIGNED_BYTE&&(te=t.RG8)),y===t.RGBA){const pe=$?tl:$e.getTransfer(ne);F===t.FLOAT&&(te=t.RGBA32F),F===t.HALF_FLOAT&&(te=t.RGBA16F),F===t.UNSIGNED_BYTE&&(te=pe===nt?t.SRGB8_ALPHA8:t.RGBA8),F===t.UNSIGNED_SHORT_4_4_4_4&&(te=t.RGBA4),F===t.UNSIGNED_SHORT_5_5_5_1&&(te=t.RGB5_A1)}return(te===t.R16F||te===t.R32F||te===t.RG16F||te===t.RG32F||te===t.RGBA16F||te===t.RGBA32F)&&e.get("EXT_color_buffer_float"),te}function P(T,y,F){return _(T,F)===!0||T.isFramebufferTexture&&T.minFilter!==Vt&&T.minFilter!==qt?Math.log2(Math.max(y.width,y.height))+1:T.mipmaps!==void 0&&T.mipmaps.length>0?T.mipmaps.length:T.isCompressedTexture&&Array.isArray(T.image)?y.mipmaps.length:1}function R(T){return T===Vt||T===oh||T===Os?t.NEAREST:t.LINEAR}function w(T){const y=T.target;y.removeEventListener("dispose",w),K(y),y.isVideoTexture&&f.delete(y)}function N(T){const y=T.target;y.removeEventListener("dispose",N),C(y)}function K(T){const y=i.get(T);if(y.__webglInit===void 0)return;const F=T.source,ne=h.get(F);if(ne){const $=ne[y.__cacheKey];$.usedTimes--,$.usedTimes===0&&x(T),Object.keys(ne).length===0&&h.delete(F)}i.remove(T)}function x(T){const y=i.get(T);t.deleteTexture(y.__webglTexture);const F=T.source,ne=h.get(F);delete ne[y.__cacheKey],o.memory.textures--}function C(T){const y=T.texture,F=i.get(T),ne=i.get(y);if(ne.__webglTexture!==void 0&&(t.deleteTexture(ne.__webglTexture),o.memory.textures--),T.depthTexture&&T.depthTexture.dispose(),T.isWebGLCubeRenderTarget)for(let $=0;$<6;$++){if(Array.isArray(F.__webglFramebuffer[$]))for(let te=0;te<F.__webglFramebuffer[$].length;te++)t.deleteFramebuffer(F.__webglFramebuffer[$][te]);else t.deleteFramebuffer(F.__webglFramebuffer[$]);F.__webglDepthbuffer&&t.deleteRenderbuffer(F.__webglDepthbuffer[$])}else{if(Array.isArray(F.__webglFramebuffer))for(let $=0;$<F.__webglFramebuffer.length;$++)t.deleteFramebuffer(F.__webglFramebuffer[$]);else t.deleteFramebuffer(F.__webglFramebuffer);if(F.__webglDepthbuffer&&t.deleteRenderbuffer(F.__webglDepthbuffer),F.__webglMultisampledFramebuffer&&t.deleteFramebuffer(F.__webglMultisampledFramebuffer),F.__webglColorRenderbuffer)for(let $=0;$<F.__webglColorRenderbuffer.length;$++)F.__webglColorRenderbuffer[$]&&t.deleteRenderbuffer(F.__webglColorRenderbuffer[$]);F.__webglDepthRenderbuffer&&t.deleteRenderbuffer(F.__webglDepthRenderbuffer)}if(T.isWebGLMultipleRenderTargets)for(let $=0,te=y.length;$<te;$++){const pe=i.get(y[$]);pe.__webglTexture&&(t.deleteTexture(pe.__webglTexture),o.memory.textures--),i.remove(y[$])}i.remove(y),i.remove(T)}let X=0;function Q(){X=0}function L(){const T=X;return T>=r.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+T+" texture units while this GPU supports only "+r.maxTextures),X+=1,T}function W(T){const y=[];return y.push(T.wrapS),y.push(T.wrapT),y.push(T.wrapR||0),y.push(T.magFilter),y.push(T.minFilter),y.push(T.anisotropy),y.push(T.internalFormat),y.push(T.format),y.push(T.type),y.push(T.generateMipmaps),y.push(T.premultiplyAlpha),y.push(T.flipY),y.push(T.unpackAlignment),y.push(T.colorSpace),y.join()}function V(T,y){const F=i.get(T);if(T.isVideoTexture&&st(T),T.isRenderTargetTexture===!1&&T.version>0&&F.__version!==T.version){const ne=T.image;if(ne===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(ne.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{q(F,T,y);return}}n.bindTexture(t.TEXTURE_2D,F.__webglTexture,t.TEXTURE0+y)}function Y(T,y){const F=i.get(T);if(T.version>0&&F.__version!==T.version){q(F,T,y);return}n.bindTexture(t.TEXTURE_2D_ARRAY,F.__webglTexture,t.TEXTURE0+y)}function b(T,y){const F=i.get(T);if(T.version>0&&F.__version!==T.version){q(F,T,y);return}n.bindTexture(t.TEXTURE_3D,F.__webglTexture,t.TEXTURE0+y)}function I(T,y){const F=i.get(T);if(T.version>0&&F.__version!==T.version){ae(F,T,y);return}n.bindTexture(t.TEXTURE_CUBE_MAP,F.__webglTexture,t.TEXTURE0+y)}const B={[Dc]:t.REPEAT,[bn]:t.CLAMP_TO_EDGE,[Uc]:t.MIRRORED_REPEAT},j={[Vt]:t.NEAREST,[oh]:t.NEAREST_MIPMAP_NEAREST,[Os]:t.NEAREST_MIPMAP_LINEAR,[qt]:t.LINEAR,[iu]:t.LINEAR_MIPMAP_NEAREST,[lr]:t.LINEAR_MIPMAP_LINEAR},ee={[Wx]:t.NEVER,[Kx]:t.ALWAYS,[Xx]:t.LESS,[Kg]:t.LEQUAL,[jx]:t.EQUAL,[$x]:t.GEQUAL,[Yx]:t.GREATER,[qx]:t.NOTEQUAL};function ye(T,y,F){if(y.type===ii&&e.has("OES_texture_float_linear")===!1&&(y.magFilter===qt||y.magFilter===iu||y.magFilter===Os||y.magFilter===lr||y.minFilter===qt||y.minFilter===iu||y.minFilter===Os||y.minFilter===lr)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),F?(t.texParameteri(T,t.TEXTURE_WRAP_S,B[y.wrapS]),t.texParameteri(T,t.TEXTURE_WRAP_T,B[y.wrapT]),(T===t.TEXTURE_3D||T===t.TEXTURE_2D_ARRAY)&&t.texParameteri(T,t.TEXTURE_WRAP_R,B[y.wrapR]),t.texParameteri(T,t.TEXTURE_MAG_FILTER,j[y.magFilter]),t.texParameteri(T,t.TEXTURE_MIN_FILTER,j[y.minFilter])):(t.texParameteri(T,t.TEXTURE_WRAP_S,t.CLAMP_TO_EDGE),t.texParameteri(T,t.TEXTURE_WRAP_T,t.CLAMP_TO_EDGE),(T===t.TEXTURE_3D||T===t.TEXTURE_2D_ARRAY)&&t.texParameteri(T,t.TEXTURE_WRAP_R,t.CLAMP_TO_EDGE),(y.wrapS!==bn||y.wrapT!==bn)&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."),t.texParameteri(T,t.TEXTURE_MAG_FILTER,R(y.magFilter)),t.texParameteri(T,t.TEXTURE_MIN_FILTER,R(y.minFilter)),y.minFilter!==Vt&&y.minFilter!==qt&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.")),y.compareFunction&&(t.texParameteri(T,t.TEXTURE_COMPARE_MODE,t.COMPARE_REF_TO_TEXTURE),t.texParameteri(T,t.TEXTURE_COMPARE_FUNC,ee[y.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){const ne=e.get("EXT_texture_filter_anisotropic");if(y.magFilter===Vt||y.minFilter!==Os&&y.minFilter!==lr||y.type===ii&&e.has("OES_texture_float_linear")===!1||a===!1&&y.type===So&&e.has("OES_texture_half_float_linear")===!1)return;(y.anisotropy>1||i.get(y).__currentAnisotropy)&&(t.texParameterf(T,ne.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(y.anisotropy,r.getMaxAnisotropy())),i.get(y).__currentAnisotropy=y.anisotropy)}}function H(T,y){let F=!1;T.__webglInit===void 0&&(T.__webglInit=!0,y.addEventListener("dispose",w));const ne=y.source;let $=h.get(ne);$===void 0&&($={},h.set(ne,$));const te=W(y);if(te!==T.__cacheKey){$[te]===void 0&&($[te]={texture:t.createTexture(),usedTimes:0},o.memory.textures++,F=!0),$[te].usedTimes++;const pe=$[T.__cacheKey];pe!==void 0&&($[T.__cacheKey].usedTimes--,pe.usedTimes===0&&x(y)),T.__cacheKey=te,T.__webglTexture=$[te].texture}return F}function q(T,y,F){let ne=t.TEXTURE_2D;(y.isDataArrayTexture||y.isCompressedArrayTexture)&&(ne=t.TEXTURE_2D_ARRAY),y.isData3DTexture&&(ne=t.TEXTURE_3D);const $=H(T,y),te=y.source;n.bindTexture(ne,T.__webglTexture,t.TEXTURE0+F);const pe=i.get(te);if(te.version!==pe.__version||$===!0){n.activeTexture(t.TEXTURE0+F);const oe=$e.getPrimaries($e.workingColorSpace),ce=y.colorSpace===xn?null:$e.getPrimaries(y.colorSpace),Te=y.colorSpace===xn||oe===ce?t.NONE:t.BROWSER_DEFAULT_WEBGL;t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,y.flipY),t.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL,y.premultiplyAlpha),t.pixelStorei(t.UNPACK_ALIGNMENT,y.unpackAlignment),t.pixelStorei(t.UNPACK_COLORSPACE_CONVERSION_WEBGL,Te);const Ne=c(y)&&p(y.image)===!1;let Z=S(y.image,Ne,!1,r.maxTextureSize);Z=be(y,Z);const qe=p(Z)||a,ze=s.convert(y.format,y.colorSpace);let Re=s.convert(y.type),ve=M(y.internalFormat,ze,Re,y.colorSpace,y.isVideoTexture);ye(ne,y,qe);let fe;const De=y.mipmaps,Xe=a&&y.isVideoTexture!==!0&&ve!==Yg,et=pe.__version===void 0||$===!0,Be=te.dataReady,Ke=P(y,Z,qe);if(y.isDepthTexture)ve=t.DEPTH_COMPONENT,a?y.type===ii?ve=t.DEPTH_COMPONENT32F:y.type===Ci?ve=t.DEPTH_COMPONENT24:y.type===fr?ve=t.DEPTH24_STENCIL8:ve=t.DEPTH_COMPONENT16:y.type===ii&&console.error("WebGLRenderer: Floating point depth texture requires WebGL2."),y.format===dr&&ve===t.DEPTH_COMPONENT&&y.type!==Nf&&y.type!==Ci&&(console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."),y.type=Ci,Re=s.convert(y.type)),y.format===Ss&&ve===t.DEPTH_COMPONENT&&(ve=t.DEPTH_STENCIL,y.type!==fr&&(console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."),y.type=fr,Re=s.convert(y.type))),et&&(Xe?n.texStorage2D(t.TEXTURE_2D,1,ve,Z.width,Z.height):n.texImage2D(t.TEXTURE_2D,0,ve,Z.width,Z.height,0,ze,Re,null));else if(y.isDataTexture)if(De.length>0&&qe){Xe&&et&&n.texStorage2D(t.TEXTURE_2D,Ke,ve,De[0].width,De[0].height);for(let A=0,ie=De.length;A<ie;A++)fe=De[A],Xe?Be&&n.texSubImage2D(t.TEXTURE_2D,A,0,0,fe.width,fe.height,ze,Re,fe.data):n.texImage2D(t.TEXTURE_2D,A,ve,fe.width,fe.height,0,ze,Re,fe.data);y.generateMipmaps=!1}else Xe?(et&&n.texStorage2D(t.TEXTURE_2D,Ke,ve,Z.width,Z.height),Be&&n.texSubImage2D(t.TEXTURE_2D,0,0,0,Z.width,Z.height,ze,Re,Z.data)):n.texImage2D(t.TEXTURE_2D,0,ve,Z.width,Z.height,0,ze,Re,Z.data);else if(y.isCompressedTexture)if(y.isCompressedArrayTexture){Xe&&et&&n.texStorage3D(t.TEXTURE_2D_ARRAY,Ke,ve,De[0].width,De[0].height,Z.depth);for(let A=0,ie=De.length;A<ie;A++)fe=De[A],y.format!==Dn?ze!==null?Xe?Be&&n.compressedTexSubImage3D(t.TEXTURE_2D_ARRAY,A,0,0,0,fe.width,fe.height,Z.depth,ze,fe.data,0,0):n.compressedTexImage3D(t.TEXTURE_2D_ARRAY,A,ve,fe.width,fe.height,Z.depth,0,fe.data,0,0):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Xe?Be&&n.texSubImage3D(t.TEXTURE_2D_ARRAY,A,0,0,0,fe.width,fe.height,Z.depth,ze,Re,fe.data):n.texImage3D(t.TEXTURE_2D_ARRAY,A,ve,fe.width,fe.height,Z.depth,0,ze,Re,fe.data)}else{Xe&&et&&n.texStorage2D(t.TEXTURE_2D,Ke,ve,De[0].width,De[0].height);for(let A=0,ie=De.length;A<ie;A++)fe=De[A],y.format!==Dn?ze!==null?Xe?Be&&n.compressedTexSubImage2D(t.TEXTURE_2D,A,0,0,fe.width,fe.height,ze,fe.data):n.compressedTexImage2D(t.TEXTURE_2D,A,ve,fe.width,fe.height,0,fe.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Xe?Be&&n.texSubImage2D(t.TEXTURE_2D,A,0,0,fe.width,fe.height,ze,Re,fe.data):n.texImage2D(t.TEXTURE_2D,A,ve,fe.width,fe.height,0,ze,Re,fe.data)}else if(y.isDataArrayTexture)Xe?(et&&n.texStorage3D(t.TEXTURE_2D_ARRAY,Ke,ve,Z.width,Z.height,Z.depth),Be&&n.texSubImage3D(t.TEXTURE_2D_ARRAY,0,0,0,0,Z.width,Z.height,Z.depth,ze,Re,Z.data)):n.texImage3D(t.TEXTURE_2D_ARRAY,0,ve,Z.width,Z.height,Z.depth,0,ze,Re,Z.data);else if(y.isData3DTexture)Xe?(et&&n.texStorage3D(t.TEXTURE_3D,Ke,ve,Z.width,Z.height,Z.depth),Be&&n.texSubImage3D(t.TEXTURE_3D,0,0,0,0,Z.width,Z.height,Z.depth,ze,Re,Z.data)):n.texImage3D(t.TEXTURE_3D,0,ve,Z.width,Z.height,Z.depth,0,ze,Re,Z.data);else if(y.isFramebufferTexture){if(et)if(Xe)n.texStorage2D(t.TEXTURE_2D,Ke,ve,Z.width,Z.height);else{let A=Z.width,ie=Z.height;for(let re=0;re<Ke;re++)n.texImage2D(t.TEXTURE_2D,re,ve,A,ie,0,ze,Re,null),A>>=1,ie>>=1}}else if(De.length>0&&qe){Xe&&et&&n.texStorage2D(t.TEXTURE_2D,Ke,ve,De[0].width,De[0].height);for(let A=0,ie=De.length;A<ie;A++)fe=De[A],Xe?Be&&n.texSubImage2D(t.TEXTURE_2D,A,0,0,ze,Re,fe):n.texImage2D(t.TEXTURE_2D,A,ve,ze,Re,fe);y.generateMipmaps=!1}else Xe?(et&&n.texStorage2D(t.TEXTURE_2D,Ke,ve,Z.width,Z.height),Be&&n.texSubImage2D(t.TEXTURE_2D,0,0,0,ze,Re,Z)):n.texImage2D(t.TEXTURE_2D,0,ve,ze,Re,Z);_(y,qe)&&g(ne),pe.__version=te.version,y.onUpdate&&y.onUpdate(y)}T.__version=y.version}function ae(T,y,F){if(y.image.length!==6)return;const ne=H(T,y),$=y.source;n.bindTexture(t.TEXTURE_CUBE_MAP,T.__webglTexture,t.TEXTURE0+F);const te=i.get($);if($.version!==te.__version||ne===!0){n.activeTexture(t.TEXTURE0+F);const pe=$e.getPrimaries($e.workingColorSpace),oe=y.colorSpace===xn?null:$e.getPrimaries(y.colorSpace),ce=y.colorSpace===xn||pe===oe?t.NONE:t.BROWSER_DEFAULT_WEBGL;t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,y.flipY),t.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL,y.premultiplyAlpha),t.pixelStorei(t.UNPACK_ALIGNMENT,y.unpackAlignment),t.pixelStorei(t.UNPACK_COLORSPACE_CONVERSION_WEBGL,ce);const Te=y.isCompressedTexture||y.image[0].isCompressedTexture,Ne=y.image[0]&&y.image[0].isDataTexture,Z=[];for(let A=0;A<6;A++)!Te&&!Ne?Z[A]=S(y.image[A],!1,!0,r.maxCubemapSize):Z[A]=Ne?y.image[A].image:y.image[A],Z[A]=be(y,Z[A]);const qe=Z[0],ze=p(qe)||a,Re=s.convert(y.format,y.colorSpace),ve=s.convert(y.type),fe=M(y.internalFormat,Re,ve,y.colorSpace),De=a&&y.isVideoTexture!==!0,Xe=te.__version===void 0||ne===!0,et=$.dataReady;let Be=P(y,qe,ze);ye(t.TEXTURE_CUBE_MAP,y,ze);let Ke;if(Te){De&&Xe&&n.texStorage2D(t.TEXTURE_CUBE_MAP,Be,fe,qe.width,qe.height);for(let A=0;A<6;A++){Ke=Z[A].mipmaps;for(let ie=0;ie<Ke.length;ie++){const re=Ke[ie];y.format!==Dn?Re!==null?De?et&&n.compressedTexSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+A,ie,0,0,re.width,re.height,Re,re.data):n.compressedTexImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+A,ie,fe,re.width,re.height,0,re.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):De?et&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+A,ie,0,0,re.width,re.height,Re,ve,re.data):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+A,ie,fe,re.width,re.height,0,Re,ve,re.data)}}}else{Ke=y.mipmaps,De&&Xe&&(Ke.length>0&&Be++,n.texStorage2D(t.TEXTURE_CUBE_MAP,Be,fe,Z[0].width,Z[0].height));for(let A=0;A<6;A++)if(Ne){De?et&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+A,0,0,0,Z[A].width,Z[A].height,Re,ve,Z[A].data):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+A,0,fe,Z[A].width,Z[A].height,0,Re,ve,Z[A].data);for(let ie=0;ie<Ke.length;ie++){const de=Ke[ie].image[A].image;De?et&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+A,ie+1,0,0,de.width,de.height,Re,ve,de.data):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+A,ie+1,fe,de.width,de.height,0,Re,ve,de.data)}}else{De?et&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+A,0,0,0,Re,ve,Z[A]):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+A,0,fe,Re,ve,Z[A]);for(let ie=0;ie<Ke.length;ie++){const re=Ke[ie];De?et&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+A,ie+1,0,0,Re,ve,re.image[A]):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+A,ie+1,fe,Re,ve,re.image[A])}}}_(y,ze)&&g(t.TEXTURE_CUBE_MAP),te.__version=$.version,y.onUpdate&&y.onUpdate(y)}T.__version=y.version}function ge(T,y,F,ne,$,te){const pe=s.convert(F.format,F.colorSpace),oe=s.convert(F.type),ce=M(F.internalFormat,pe,oe,F.colorSpace);if(!i.get(y).__hasExternalTextures){const Ne=Math.max(1,y.width>>te),Z=Math.max(1,y.height>>te);$===t.TEXTURE_3D||$===t.TEXTURE_2D_ARRAY?n.texImage3D($,te,ce,Ne,Z,y.depth,0,pe,oe,null):n.texImage2D($,te,ce,Ne,Z,0,pe,oe,null)}n.bindFramebuffer(t.FRAMEBUFFER,T),_e(y)?l.framebufferTexture2DMultisampleEXT(t.FRAMEBUFFER,ne,$,i.get(F).__webglTexture,0,Ae(y)):($===t.TEXTURE_2D||$>=t.TEXTURE_CUBE_MAP_POSITIVE_X&&$<=t.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&t.framebufferTexture2D(t.FRAMEBUFFER,ne,$,i.get(F).__webglTexture,te),n.bindFramebuffer(t.FRAMEBUFFER,null)}function Me(T,y,F){if(t.bindRenderbuffer(t.RENDERBUFFER,T),y.depthBuffer&&!y.stencilBuffer){let ne=a===!0?t.DEPTH_COMPONENT24:t.DEPTH_COMPONENT16;if(F||_e(y)){const $=y.depthTexture;$&&$.isDepthTexture&&($.type===ii?ne=t.DEPTH_COMPONENT32F:$.type===Ci&&(ne=t.DEPTH_COMPONENT24));const te=Ae(y);_e(y)?l.renderbufferStorageMultisampleEXT(t.RENDERBUFFER,te,ne,y.width,y.height):t.renderbufferStorageMultisample(t.RENDERBUFFER,te,ne,y.width,y.height)}else t.renderbufferStorage(t.RENDERBUFFER,ne,y.width,y.height);t.framebufferRenderbuffer(t.FRAMEBUFFER,t.DEPTH_ATTACHMENT,t.RENDERBUFFER,T)}else if(y.depthBuffer&&y.stencilBuffer){const ne=Ae(y);F&&_e(y)===!1?t.renderbufferStorageMultisample(t.RENDERBUFFER,ne,t.DEPTH24_STENCIL8,y.width,y.height):_e(y)?l.renderbufferStorageMultisampleEXT(t.RENDERBUFFER,ne,t.DEPTH24_STENCIL8,y.width,y.height):t.renderbufferStorage(t.RENDERBUFFER,t.DEPTH_STENCIL,y.width,y.height),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.DEPTH_STENCIL_ATTACHMENT,t.RENDERBUFFER,T)}else{const ne=y.isWebGLMultipleRenderTargets===!0?y.texture:[y.texture];for(let $=0;$<ne.length;$++){const te=ne[$],pe=s.convert(te.format,te.colorSpace),oe=s.convert(te.type),ce=M(te.internalFormat,pe,oe,te.colorSpace),Te=Ae(y);F&&_e(y)===!1?t.renderbufferStorageMultisample(t.RENDERBUFFER,Te,ce,y.width,y.height):_e(y)?l.renderbufferStorageMultisampleEXT(t.RENDERBUFFER,Te,ce,y.width,y.height):t.renderbufferStorage(t.RENDERBUFFER,ce,y.width,y.height)}}t.bindRenderbuffer(t.RENDERBUFFER,null)}function he(T,y){if(y&&y.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(n.bindFramebuffer(t.FRAMEBUFFER,T),!(y.depthTexture&&y.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!i.get(y.depthTexture).__webglTexture||y.depthTexture.image.width!==y.width||y.depthTexture.image.height!==y.height)&&(y.depthTexture.image.width=y.width,y.depthTexture.image.height=y.height,y.depthTexture.needsUpdate=!0),V(y.depthTexture,0);const ne=i.get(y.depthTexture).__webglTexture,$=Ae(y);if(y.depthTexture.format===dr)_e(y)?l.framebufferTexture2DMultisampleEXT(t.FRAMEBUFFER,t.DEPTH_ATTACHMENT,t.TEXTURE_2D,ne,0,$):t.framebufferTexture2D(t.FRAMEBUFFER,t.DEPTH_ATTACHMENT,t.TEXTURE_2D,ne,0);else if(y.depthTexture.format===Ss)_e(y)?l.framebufferTexture2DMultisampleEXT(t.FRAMEBUFFER,t.DEPTH_STENCIL_ATTACHMENT,t.TEXTURE_2D,ne,0,$):t.framebufferTexture2D(t.FRAMEBUFFER,t.DEPTH_STENCIL_ATTACHMENT,t.TEXTURE_2D,ne,0);else throw new Error("Unknown depthTexture format")}function Ve(T){const y=i.get(T),F=T.isWebGLCubeRenderTarget===!0;if(T.depthTexture&&!y.__autoAllocateDepthBuffer){if(F)throw new Error("target.depthTexture not supported in Cube render targets");he(y.__webglFramebuffer,T)}else if(F){y.__webglDepthbuffer=[];for(let ne=0;ne<6;ne++)n.bindFramebuffer(t.FRAMEBUFFER,y.__webglFramebuffer[ne]),y.__webglDepthbuffer[ne]=t.createRenderbuffer(),Me(y.__webglDepthbuffer[ne],T,!1)}else n.bindFramebuffer(t.FRAMEBUFFER,y.__webglFramebuffer),y.__webglDepthbuffer=t.createRenderbuffer(),Me(y.__webglDepthbuffer,T,!1);n.bindFramebuffer(t.FRAMEBUFFER,null)}function Pe(T,y,F){const ne=i.get(T);y!==void 0&&ge(ne.__webglFramebuffer,T,T.texture,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,0),F!==void 0&&Ve(T)}function U(T){const y=T.texture,F=i.get(T),ne=i.get(y);T.addEventListener("dispose",N),T.isWebGLMultipleRenderTargets!==!0&&(ne.__webglTexture===void 0&&(ne.__webglTexture=t.createTexture()),ne.__version=y.version,o.memory.textures++);const $=T.isWebGLCubeRenderTarget===!0,te=T.isWebGLMultipleRenderTargets===!0,pe=p(T)||a;if($){F.__webglFramebuffer=[];for(let oe=0;oe<6;oe++)if(a&&y.mipmaps&&y.mipmaps.length>0){F.__webglFramebuffer[oe]=[];for(let ce=0;ce<y.mipmaps.length;ce++)F.__webglFramebuffer[oe][ce]=t.createFramebuffer()}else F.__webglFramebuffer[oe]=t.createFramebuffer()}else{if(a&&y.mipmaps&&y.mipmaps.length>0){F.__webglFramebuffer=[];for(let oe=0;oe<y.mipmaps.length;oe++)F.__webglFramebuffer[oe]=t.createFramebuffer()}else F.__webglFramebuffer=t.createFramebuffer();if(te)if(r.drawBuffers){const oe=T.texture;for(let ce=0,Te=oe.length;ce<Te;ce++){const Ne=i.get(oe[ce]);Ne.__webglTexture===void 0&&(Ne.__webglTexture=t.createTexture(),o.memory.textures++)}}else console.warn("THREE.WebGLRenderer: WebGLMultipleRenderTargets can only be used with WebGL2 or WEBGL_draw_buffers extension.");if(a&&T.samples>0&&_e(T)===!1){const oe=te?y:[y];F.__webglMultisampledFramebuffer=t.createFramebuffer(),F.__webglColorRenderbuffer=[],n.bindFramebuffer(t.FRAMEBUFFER,F.__webglMultisampledFramebuffer);for(let ce=0;ce<oe.length;ce++){const Te=oe[ce];F.__webglColorRenderbuffer[ce]=t.createRenderbuffer(),t.bindRenderbuffer(t.RENDERBUFFER,F.__webglColorRenderbuffer[ce]);const Ne=s.convert(Te.format,Te.colorSpace),Z=s.convert(Te.type),qe=M(Te.internalFormat,Ne,Z,Te.colorSpace,T.isXRRenderTarget===!0),ze=Ae(T);t.renderbufferStorageMultisample(t.RENDERBUFFER,ze,qe,T.width,T.height),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0+ce,t.RENDERBUFFER,F.__webglColorRenderbuffer[ce])}t.bindRenderbuffer(t.RENDERBUFFER,null),T.depthBuffer&&(F.__webglDepthRenderbuffer=t.createRenderbuffer(),Me(F.__webglDepthRenderbuffer,T,!0)),n.bindFramebuffer(t.FRAMEBUFFER,null)}}if($){n.bindTexture(t.TEXTURE_CUBE_MAP,ne.__webglTexture),ye(t.TEXTURE_CUBE_MAP,y,pe);for(let oe=0;oe<6;oe++)if(a&&y.mipmaps&&y.mipmaps.length>0)for(let ce=0;ce<y.mipmaps.length;ce++)ge(F.__webglFramebuffer[oe][ce],T,y,t.COLOR_ATTACHMENT0,t.TEXTURE_CUBE_MAP_POSITIVE_X+oe,ce);else ge(F.__webglFramebuffer[oe],T,y,t.COLOR_ATTACHMENT0,t.TEXTURE_CUBE_MAP_POSITIVE_X+oe,0);_(y,pe)&&g(t.TEXTURE_CUBE_MAP),n.unbindTexture()}else if(te){const oe=T.texture;for(let ce=0,Te=oe.length;ce<Te;ce++){const Ne=oe[ce],Z=i.get(Ne);n.bindTexture(t.TEXTURE_2D,Z.__webglTexture),ye(t.TEXTURE_2D,Ne,pe),ge(F.__webglFramebuffer,T,Ne,t.COLOR_ATTACHMENT0+ce,t.TEXTURE_2D,0),_(Ne,pe)&&g(t.TEXTURE_2D)}n.unbindTexture()}else{let oe=t.TEXTURE_2D;if((T.isWebGL3DRenderTarget||T.isWebGLArrayRenderTarget)&&(a?oe=T.isWebGL3DRenderTarget?t.TEXTURE_3D:t.TEXTURE_2D_ARRAY:console.error("THREE.WebGLTextures: THREE.Data3DTexture and THREE.DataArrayTexture only supported with WebGL2.")),n.bindTexture(oe,ne.__webglTexture),ye(oe,y,pe),a&&y.mipmaps&&y.mipmaps.length>0)for(let ce=0;ce<y.mipmaps.length;ce++)ge(F.__webglFramebuffer[ce],T,y,t.COLOR_ATTACHMENT0,oe,ce);else ge(F.__webglFramebuffer,T,y,t.COLOR_ATTACHMENT0,oe,0);_(y,pe)&&g(oe),n.unbindTexture()}T.depthBuffer&&Ve(T)}function Rt(T){const y=p(T)||a,F=T.isWebGLMultipleRenderTargets===!0?T.texture:[T.texture];for(let ne=0,$=F.length;ne<$;ne++){const te=F[ne];if(_(te,y)){const pe=T.isWebGLCubeRenderTarget?t.TEXTURE_CUBE_MAP:t.TEXTURE_2D,oe=i.get(te).__webglTexture;n.bindTexture(pe,oe),g(pe),n.unbindTexture()}}}function xe(T){if(a&&T.samples>0&&_e(T)===!1){const y=T.isWebGLMultipleRenderTargets?T.texture:[T.texture],F=T.width,ne=T.height;let $=t.COLOR_BUFFER_BIT;const te=[],pe=T.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT,oe=i.get(T),ce=T.isWebGLMultipleRenderTargets===!0;if(ce)for(let Te=0;Te<y.length;Te++)n.bindFramebuffer(t.FRAMEBUFFER,oe.__webglMultisampledFramebuffer),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0+Te,t.RENDERBUFFER,null),n.bindFramebuffer(t.FRAMEBUFFER,oe.__webglFramebuffer),t.framebufferTexture2D(t.DRAW_FRAMEBUFFER,t.COLOR_ATTACHMENT0+Te,t.TEXTURE_2D,null,0);n.bindFramebuffer(t.READ_FRAMEBUFFER,oe.__webglMultisampledFramebuffer),n.bindFramebuffer(t.DRAW_FRAMEBUFFER,oe.__webglFramebuffer);for(let Te=0;Te<y.length;Te++){te.push(t.COLOR_ATTACHMENT0+Te),T.depthBuffer&&te.push(pe);const Ne=oe.__ignoreDepthValues!==void 0?oe.__ignoreDepthValues:!1;if(Ne===!1&&(T.depthBuffer&&($|=t.DEPTH_BUFFER_BIT),T.stencilBuffer&&($|=t.STENCIL_BUFFER_BIT)),ce&&t.framebufferRenderbuffer(t.READ_FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.RENDERBUFFER,oe.__webglColorRenderbuffer[Te]),Ne===!0&&(t.invalidateFramebuffer(t.READ_FRAMEBUFFER,[pe]),t.invalidateFramebuffer(t.DRAW_FRAMEBUFFER,[pe])),ce){const Z=i.get(y[Te]).__webglTexture;t.framebufferTexture2D(t.DRAW_FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,Z,0)}t.blitFramebuffer(0,0,F,ne,0,0,F,ne,$,t.NEAREST),u&&t.invalidateFramebuffer(t.READ_FRAMEBUFFER,te)}if(n.bindFramebuffer(t.READ_FRAMEBUFFER,null),n.bindFramebuffer(t.DRAW_FRAMEBUFFER,null),ce)for(let Te=0;Te<y.length;Te++){n.bindFramebuffer(t.FRAMEBUFFER,oe.__webglMultisampledFramebuffer),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0+Te,t.RENDERBUFFER,oe.__webglColorRenderbuffer[Te]);const Ne=i.get(y[Te]).__webglTexture;n.bindFramebuffer(t.FRAMEBUFFER,oe.__webglFramebuffer),t.framebufferTexture2D(t.DRAW_FRAMEBUFFER,t.COLOR_ATTACHMENT0+Te,t.TEXTURE_2D,Ne,0)}n.bindFramebuffer(t.DRAW_FRAMEBUFFER,oe.__webglMultisampledFramebuffer)}}function Ae(T){return Math.min(r.maxSamples,T.samples)}function _e(T){const y=i.get(T);return a&&T.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&y.__useRenderToTexture!==!1}function st(T){const y=o.render.frame;f.get(T)!==y&&(f.set(T,y),T.update())}function be(T,y){const F=T.colorSpace,ne=T.format,$=T.type;return T.isCompressedTexture===!0||T.isVideoTexture===!0||T.format===Nc||F!==di&&F!==xn&&($e.getTransfer(F)===nt?a===!1?e.has("EXT_sRGB")===!0&&ne===Dn?(T.format=Nc,T.minFilter=qt,T.generateMipmaps=!1):y=Qg.sRGBToLinear(y):(ne!==Dn||$!==ki)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",F)),y}this.allocateTextureUnit=L,this.resetTextureUnits=Q,this.setTexture2D=V,this.setTexture2DArray=Y,this.setTexture3D=b,this.setTextureCube=I,this.rebindTextures=Pe,this.setupRenderTarget=U,this.updateRenderTargetMipmap=Rt,this.updateMultisampleRenderTarget=xe,this.setupDepthRenderbuffer=Ve,this.setupFrameBufferTexture=ge,this.useMultisampledRTT=_e}function QT(t,e,n){const i=n.isWebGL2;function r(s,o=xn){let a;const l=$e.getTransfer(o);if(s===ki)return t.UNSIGNED_BYTE;if(s===Gg)return t.UNSIGNED_SHORT_4_4_4_4;if(s===Vg)return t.UNSIGNED_SHORT_5_5_5_1;if(s===Ux)return t.BYTE;if(s===Nx)return t.SHORT;if(s===Nf)return t.UNSIGNED_SHORT;if(s===Hg)return t.INT;if(s===Ci)return t.UNSIGNED_INT;if(s===ii)return t.FLOAT;if(s===So)return i?t.HALF_FLOAT:(a=e.get("OES_texture_half_float"),a!==null?a.HALF_FLOAT_OES:null);if(s===Ix)return t.ALPHA;if(s===Dn)return t.RGBA;if(s===Fx)return t.LUMINANCE;if(s===Ox)return t.LUMINANCE_ALPHA;if(s===dr)return t.DEPTH_COMPONENT;if(s===Ss)return t.DEPTH_STENCIL;if(s===Nc)return a=e.get("EXT_sRGB"),a!==null?a.SRGB_ALPHA_EXT:null;if(s===zx)return t.RED;if(s===Wg)return t.RED_INTEGER;if(s===kx)return t.RG;if(s===Xg)return t.RG_INTEGER;if(s===jg)return t.RGBA_INTEGER;if(s===ru||s===su||s===ou||s===au)if(l===nt)if(a=e.get("WEBGL_compressed_texture_s3tc_srgb"),a!==null){if(s===ru)return a.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(s===su)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(s===ou)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(s===au)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(a=e.get("WEBGL_compressed_texture_s3tc"),a!==null){if(s===ru)return a.COMPRESSED_RGB_S3TC_DXT1_EXT;if(s===su)return a.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(s===ou)return a.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(s===au)return a.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(s===ah||s===lh||s===uh||s===ch)if(a=e.get("WEBGL_compressed_texture_pvrtc"),a!==null){if(s===ah)return a.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(s===lh)return a.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(s===uh)return a.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(s===ch)return a.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(s===Yg)return a=e.get("WEBGL_compressed_texture_etc1"),a!==null?a.COMPRESSED_RGB_ETC1_WEBGL:null;if(s===fh||s===dh)if(a=e.get("WEBGL_compressed_texture_etc"),a!==null){if(s===fh)return l===nt?a.COMPRESSED_SRGB8_ETC2:a.COMPRESSED_RGB8_ETC2;if(s===dh)return l===nt?a.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:a.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(s===hh||s===ph||s===mh||s===gh||s===_h||s===vh||s===xh||s===Sh||s===yh||s===Mh||s===Eh||s===Th||s===wh||s===Ah)if(a=e.get("WEBGL_compressed_texture_astc"),a!==null){if(s===hh)return l===nt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:a.COMPRESSED_RGBA_ASTC_4x4_KHR;if(s===ph)return l===nt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:a.COMPRESSED_RGBA_ASTC_5x4_KHR;if(s===mh)return l===nt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:a.COMPRESSED_RGBA_ASTC_5x5_KHR;if(s===gh)return l===nt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:a.COMPRESSED_RGBA_ASTC_6x5_KHR;if(s===_h)return l===nt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:a.COMPRESSED_RGBA_ASTC_6x6_KHR;if(s===vh)return l===nt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:a.COMPRESSED_RGBA_ASTC_8x5_KHR;if(s===xh)return l===nt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:a.COMPRESSED_RGBA_ASTC_8x6_KHR;if(s===Sh)return l===nt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:a.COMPRESSED_RGBA_ASTC_8x8_KHR;if(s===yh)return l===nt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:a.COMPRESSED_RGBA_ASTC_10x5_KHR;if(s===Mh)return l===nt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:a.COMPRESSED_RGBA_ASTC_10x6_KHR;if(s===Eh)return l===nt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:a.COMPRESSED_RGBA_ASTC_10x8_KHR;if(s===Th)return l===nt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:a.COMPRESSED_RGBA_ASTC_10x10_KHR;if(s===wh)return l===nt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:a.COMPRESSED_RGBA_ASTC_12x10_KHR;if(s===Ah)return l===nt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:a.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(s===lu||s===Rh||s===Ch)if(a=e.get("EXT_texture_compression_bptc"),a!==null){if(s===lu)return l===nt?a.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:a.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(s===Rh)return a.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(s===Ch)return a.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(s===Bx||s===Ph||s===Lh||s===bh)if(a=e.get("EXT_texture_compression_rgtc"),a!==null){if(s===lu)return a.COMPRESSED_RED_RGTC1_EXT;if(s===Ph)return a.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(s===Lh)return a.COMPRESSED_RED_GREEN_RGTC2_EXT;if(s===bh)return a.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return s===fr?i?t.UNSIGNED_INT_24_8:(a=e.get("WEBGL_depth_texture"),a!==null?a.UNSIGNED_INT_24_8_WEBGL:null):t[s]!==void 0?t[s]:null}return{convert:r}}class JT extends vn{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class ga extends zt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const ew={type:"move"};class Uu{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new ga,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new ga,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new z,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new z),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new ga,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new z,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new z),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const n=this._hand;if(n)for(const i of e.hand.values())this._getHandJoint(n,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,n,i){let r=null,s=null,o=null;const a=this._targetRay,l=this._grip,u=this._hand;if(e&&n.session.visibilityState!=="visible-blurred"){if(u&&e.hand){o=!0;for(const S of e.hand.values()){const p=n.getJointPose(S,i),c=this._getHandJoint(u,S);p!==null&&(c.matrix.fromArray(p.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,c.jointRadius=p.radius),c.visible=p!==null}const f=u.joints["index-finger-tip"],d=u.joints["thumb-tip"],h=f.position.distanceTo(d.position),m=.02,v=.005;u.inputState.pinching&&h>m+v?(u.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!u.inputState.pinching&&h<=m-v&&(u.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(s=n.getPose(e.gripSpace,i),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(r=n.getPose(e.targetRaySpace,i),r===null&&s!==null&&(r=s),r!==null&&(a.matrix.fromArray(r.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,r.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(r.linearVelocity)):a.hasLinearVelocity=!1,r.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(r.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(ew)))}return a!==null&&(a.visible=r!==null),l!==null&&(l.visible=s!==null),u!==null&&(u.visible=o!==null),this}_getHandJoint(e,n){if(e.joints[n.jointName]===void 0){const i=new ga;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[n.jointName]=i,e.add(i)}return e.joints[n.jointName]}}const tw=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,nw=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepthEXT = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepthEXT = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class iw{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,n,i){if(this.texture===null){const r=new nn,s=e.properties.get(r);s.__webglTexture=n.texture,(n.depthNear!=i.depthNear||n.depthFar!=i.depthFar)&&(this.depthNear=n.depthNear,this.depthFar=n.depthFar),this.texture=r}}render(e,n){if(this.texture!==null){if(this.mesh===null){const i=n.cameras[0].viewport,r=new Vi({extensions:{fragDepth:!0},vertexShader:tw,fragmentShader:nw,uniforms:{depthColor:{value:this.texture},depthWidth:{value:i.z},depthHeight:{value:i.w}}});this.mesh=new Un(new wl(20,20),r)}e.render(this.mesh,n)}}reset(){this.texture=null,this.mesh=null}}class rw extends ws{constructor(e,n){super();const i=this;let r=null,s=1,o=null,a="local-floor",l=1,u=null,f=null,d=null,h=null,m=null,v=null;const S=new iw,p=n.getContextAttributes();let c=null,_=null;const g=[],M=[],P=new Ge;let R=null;const w=new vn;w.layers.enable(1),w.viewport=new wt;const N=new vn;N.layers.enable(2),N.viewport=new wt;const K=[w,N],x=new JT;x.layers.enable(1),x.layers.enable(2);let C=null,X=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(H){let q=g[H];return q===void 0&&(q=new Uu,g[H]=q),q.getTargetRaySpace()},this.getControllerGrip=function(H){let q=g[H];return q===void 0&&(q=new Uu,g[H]=q),q.getGripSpace()},this.getHand=function(H){let q=g[H];return q===void 0&&(q=new Uu,g[H]=q),q.getHandSpace()};function Q(H){const q=M.indexOf(H.inputSource);if(q===-1)return;const ae=g[q];ae!==void 0&&(ae.update(H.inputSource,H.frame,u||o),ae.dispatchEvent({type:H.type,data:H.inputSource}))}function L(){r.removeEventListener("select",Q),r.removeEventListener("selectstart",Q),r.removeEventListener("selectend",Q),r.removeEventListener("squeeze",Q),r.removeEventListener("squeezestart",Q),r.removeEventListener("squeezeend",Q),r.removeEventListener("end",L),r.removeEventListener("inputsourceschange",W);for(let H=0;H<g.length;H++){const q=M[H];q!==null&&(M[H]=null,g[H].disconnect(q))}C=null,X=null,S.reset(),e.setRenderTarget(c),m=null,h=null,d=null,r=null,_=null,ye.stop(),i.isPresenting=!1,e.setPixelRatio(R),e.setSize(P.width,P.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(H){s=H,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(H){a=H,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return u||o},this.setReferenceSpace=function(H){u=H},this.getBaseLayer=function(){return h!==null?h:m},this.getBinding=function(){return d},this.getFrame=function(){return v},this.getSession=function(){return r},this.setSession=async function(H){if(r=H,r!==null){if(c=e.getRenderTarget(),r.addEventListener("select",Q),r.addEventListener("selectstart",Q),r.addEventListener("selectend",Q),r.addEventListener("squeeze",Q),r.addEventListener("squeezestart",Q),r.addEventListener("squeezeend",Q),r.addEventListener("end",L),r.addEventListener("inputsourceschange",W),p.xrCompatible!==!0&&await n.makeXRCompatible(),R=e.getPixelRatio(),e.getSize(P),r.renderState.layers===void 0||e.capabilities.isWebGL2===!1){const q={antialias:r.renderState.layers===void 0?p.antialias:!0,alpha:!0,depth:p.depth,stencil:p.stencil,framebufferScaleFactor:s};m=new XRWebGLLayer(r,n,q),r.updateRenderState({baseLayer:m}),e.setPixelRatio(1),e.setSize(m.framebufferWidth,m.framebufferHeight,!1),_=new Sr(m.framebufferWidth,m.framebufferHeight,{format:Dn,type:ki,colorSpace:e.outputColorSpace,stencilBuffer:p.stencil})}else{let q=null,ae=null,ge=null;p.depth&&(ge=p.stencil?n.DEPTH24_STENCIL8:n.DEPTH_COMPONENT24,q=p.stencil?Ss:dr,ae=p.stencil?fr:Ci);const Me={colorFormat:n.RGBA8,depthFormat:ge,scaleFactor:s};d=new XRWebGLBinding(r,n),h=d.createProjectionLayer(Me),r.updateRenderState({layers:[h]}),e.setPixelRatio(1),e.setSize(h.textureWidth,h.textureHeight,!1),_=new Sr(h.textureWidth,h.textureHeight,{format:Dn,type:ki,depthTexture:new f_(h.textureWidth,h.textureHeight,ae,void 0,void 0,void 0,void 0,void 0,void 0,q),stencilBuffer:p.stencil,colorSpace:e.outputColorSpace,samples:p.antialias?4:0});const he=e.properties.get(_);he.__ignoreDepthValues=h.ignoreDepthValues}_.isXRRenderTarget=!0,this.setFoveation(l),u=null,o=await r.requestReferenceSpace(a),ye.setContext(r),ye.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode};function W(H){for(let q=0;q<H.removed.length;q++){const ae=H.removed[q],ge=M.indexOf(ae);ge>=0&&(M[ge]=null,g[ge].disconnect(ae))}for(let q=0;q<H.added.length;q++){const ae=H.added[q];let ge=M.indexOf(ae);if(ge===-1){for(let he=0;he<g.length;he++)if(he>=M.length){M.push(ae),ge=he;break}else if(M[he]===null){M[he]=ae,ge=he;break}if(ge===-1)break}const Me=g[ge];Me&&Me.connect(ae)}}const V=new z,Y=new z;function b(H,q,ae){V.setFromMatrixPosition(q.matrixWorld),Y.setFromMatrixPosition(ae.matrixWorld);const ge=V.distanceTo(Y),Me=q.projectionMatrix.elements,he=ae.projectionMatrix.elements,Ve=Me[14]/(Me[10]-1),Pe=Me[14]/(Me[10]+1),U=(Me[9]+1)/Me[5],Rt=(Me[9]-1)/Me[5],xe=(Me[8]-1)/Me[0],Ae=(he[8]+1)/he[0],_e=Ve*xe,st=Ve*Ae,be=ge/(-xe+Ae),T=be*-xe;q.matrixWorld.decompose(H.position,H.quaternion,H.scale),H.translateX(T),H.translateZ(be),H.matrixWorld.compose(H.position,H.quaternion,H.scale),H.matrixWorldInverse.copy(H.matrixWorld).invert();const y=Ve+be,F=Pe+be,ne=_e-T,$=st+(ge-T),te=U*Pe/F*y,pe=Rt*Pe/F*y;H.projectionMatrix.makePerspective(ne,$,te,pe,y,F),H.projectionMatrixInverse.copy(H.projectionMatrix).invert()}function I(H,q){q===null?H.matrixWorld.copy(H.matrix):H.matrixWorld.multiplyMatrices(q.matrixWorld,H.matrix),H.matrixWorldInverse.copy(H.matrixWorld).invert()}this.updateCamera=function(H){if(r===null)return;S.texture!==null&&(H.near=S.depthNear,H.far=S.depthFar),x.near=N.near=w.near=H.near,x.far=N.far=w.far=H.far,(C!==x.near||X!==x.far)&&(r.updateRenderState({depthNear:x.near,depthFar:x.far}),C=x.near,X=x.far,w.near=C,w.far=X,N.near=C,N.far=X,w.updateProjectionMatrix(),N.updateProjectionMatrix(),H.updateProjectionMatrix());const q=H.parent,ae=x.cameras;I(x,q);for(let ge=0;ge<ae.length;ge++)I(ae[ge],q);ae.length===2?b(x,w,N):x.projectionMatrix.copy(w.projectionMatrix),B(H,x,q)};function B(H,q,ae){ae===null?H.matrix.copy(q.matrixWorld):(H.matrix.copy(ae.matrixWorld),H.matrix.invert(),H.matrix.multiply(q.matrixWorld)),H.matrix.decompose(H.position,H.quaternion,H.scale),H.updateMatrixWorld(!0),H.projectionMatrix.copy(q.projectionMatrix),H.projectionMatrixInverse.copy(q.projectionMatrixInverse),H.isPerspectiveCamera&&(H.fov=Ic*2*Math.atan(1/H.projectionMatrix.elements[5]),H.zoom=1)}this.getCamera=function(){return x},this.getFoveation=function(){if(!(h===null&&m===null))return l},this.setFoveation=function(H){l=H,h!==null&&(h.fixedFoveation=H),m!==null&&m.fixedFoveation!==void 0&&(m.fixedFoveation=H)},this.hasDepthSensing=function(){return S.texture!==null};let j=null;function ee(H,q){if(f=q.getViewerPose(u||o),v=q,f!==null){const ae=f.views;m!==null&&(e.setRenderTargetFramebuffer(_,m.framebuffer),e.setRenderTarget(_));let ge=!1;ae.length!==x.cameras.length&&(x.cameras.length=0,ge=!0);for(let he=0;he<ae.length;he++){const Ve=ae[he];let Pe=null;if(m!==null)Pe=m.getViewport(Ve);else{const Rt=d.getViewSubImage(h,Ve);Pe=Rt.viewport,he===0&&(e.setRenderTargetTextures(_,Rt.colorTexture,h.ignoreDepthValues?void 0:Rt.depthStencilTexture),e.setRenderTarget(_))}let U=K[he];U===void 0&&(U=new vn,U.layers.enable(he),U.viewport=new wt,K[he]=U),U.matrix.fromArray(Ve.transform.matrix),U.matrix.decompose(U.position,U.quaternion,U.scale),U.projectionMatrix.fromArray(Ve.projectionMatrix),U.projectionMatrixInverse.copy(U.projectionMatrix).invert(),U.viewport.set(Pe.x,Pe.y,Pe.width,Pe.height),he===0&&(x.matrix.copy(U.matrix),x.matrix.decompose(x.position,x.quaternion,x.scale)),ge===!0&&x.cameras.push(U)}const Me=r.enabledFeatures;if(Me&&Me.includes("depth-sensing")){const he=d.getDepthInformation(ae[0]);he&&he.isValid&&he.texture&&S.init(e,he,r.renderState)}}for(let ae=0;ae<g.length;ae++){const ge=M[ae],Me=g[ae];ge!==null&&Me!==void 0&&Me.update(ge,q,u||o)}S.render(e,x),j&&j(H,q),q.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:q}),v=null}const ye=new u_;ye.setAnimationLoop(ee),this.setAnimationLoop=function(H){j=H},this.dispose=function(){}}}function sw(t,e){function n(p,c){p.matrixAutoUpdate===!0&&p.updateMatrix(),c.value.copy(p.matrix)}function i(p,c){c.color.getRGB(p.fogColor.value,o_(t)),c.isFog?(p.fogNear.value=c.near,p.fogFar.value=c.far):c.isFogExp2&&(p.fogDensity.value=c.density)}function r(p,c,_,g,M){c.isMeshBasicMaterial||c.isMeshLambertMaterial?s(p,c):c.isMeshToonMaterial?(s(p,c),d(p,c)):c.isMeshPhongMaterial?(s(p,c),f(p,c)):c.isMeshStandardMaterial?(s(p,c),h(p,c),c.isMeshPhysicalMaterial&&m(p,c,M)):c.isMeshMatcapMaterial?(s(p,c),v(p,c)):c.isMeshDepthMaterial?s(p,c):c.isMeshDistanceMaterial?(s(p,c),S(p,c)):c.isMeshNormalMaterial?s(p,c):c.isLineBasicMaterial?(o(p,c),c.isLineDashedMaterial&&a(p,c)):c.isPointsMaterial?l(p,c,_,g):c.isSpriteMaterial?u(p,c):c.isShadowMaterial?(p.color.value.copy(c.color),p.opacity.value=c.opacity):c.isShaderMaterial&&(c.uniformsNeedUpdate=!1)}function s(p,c){p.opacity.value=c.opacity,c.color&&p.diffuse.value.copy(c.color),c.emissive&&p.emissive.value.copy(c.emissive).multiplyScalar(c.emissiveIntensity),c.map&&(p.map.value=c.map,n(c.map,p.mapTransform)),c.alphaMap&&(p.alphaMap.value=c.alphaMap,n(c.alphaMap,p.alphaMapTransform)),c.bumpMap&&(p.bumpMap.value=c.bumpMap,n(c.bumpMap,p.bumpMapTransform),p.bumpScale.value=c.bumpScale,c.side===tn&&(p.bumpScale.value*=-1)),c.normalMap&&(p.normalMap.value=c.normalMap,n(c.normalMap,p.normalMapTransform),p.normalScale.value.copy(c.normalScale),c.side===tn&&p.normalScale.value.negate()),c.displacementMap&&(p.displacementMap.value=c.displacementMap,n(c.displacementMap,p.displacementMapTransform),p.displacementScale.value=c.displacementScale,p.displacementBias.value=c.displacementBias),c.emissiveMap&&(p.emissiveMap.value=c.emissiveMap,n(c.emissiveMap,p.emissiveMapTransform)),c.specularMap&&(p.specularMap.value=c.specularMap,n(c.specularMap,p.specularMapTransform)),c.alphaTest>0&&(p.alphaTest.value=c.alphaTest);const _=e.get(c).envMap;if(_&&(p.envMap.value=_,p.flipEnvMap.value=_.isCubeTexture&&_.isRenderTargetTexture===!1?-1:1,p.reflectivity.value=c.reflectivity,p.ior.value=c.ior,p.refractionRatio.value=c.refractionRatio),c.lightMap){p.lightMap.value=c.lightMap;const g=t._useLegacyLights===!0?Math.PI:1;p.lightMapIntensity.value=c.lightMapIntensity*g,n(c.lightMap,p.lightMapTransform)}c.aoMap&&(p.aoMap.value=c.aoMap,p.aoMapIntensity.value=c.aoMapIntensity,n(c.aoMap,p.aoMapTransform))}function o(p,c){p.diffuse.value.copy(c.color),p.opacity.value=c.opacity,c.map&&(p.map.value=c.map,n(c.map,p.mapTransform))}function a(p,c){p.dashSize.value=c.dashSize,p.totalSize.value=c.dashSize+c.gapSize,p.scale.value=c.scale}function l(p,c,_,g){p.diffuse.value.copy(c.color),p.opacity.value=c.opacity,p.size.value=c.size*_,p.scale.value=g*.5,c.map&&(p.map.value=c.map,n(c.map,p.uvTransform)),c.alphaMap&&(p.alphaMap.value=c.alphaMap,n(c.alphaMap,p.alphaMapTransform)),c.alphaTest>0&&(p.alphaTest.value=c.alphaTest)}function u(p,c){p.diffuse.value.copy(c.color),p.opacity.value=c.opacity,p.rotation.value=c.rotation,c.map&&(p.map.value=c.map,n(c.map,p.mapTransform)),c.alphaMap&&(p.alphaMap.value=c.alphaMap,n(c.alphaMap,p.alphaMapTransform)),c.alphaTest>0&&(p.alphaTest.value=c.alphaTest)}function f(p,c){p.specular.value.copy(c.specular),p.shininess.value=Math.max(c.shininess,1e-4)}function d(p,c){c.gradientMap&&(p.gradientMap.value=c.gradientMap)}function h(p,c){p.metalness.value=c.metalness,c.metalnessMap&&(p.metalnessMap.value=c.metalnessMap,n(c.metalnessMap,p.metalnessMapTransform)),p.roughness.value=c.roughness,c.roughnessMap&&(p.roughnessMap.value=c.roughnessMap,n(c.roughnessMap,p.roughnessMapTransform)),e.get(c).envMap&&(p.envMapIntensity.value=c.envMapIntensity)}function m(p,c,_){p.ior.value=c.ior,c.sheen>0&&(p.sheenColor.value.copy(c.sheenColor).multiplyScalar(c.sheen),p.sheenRoughness.value=c.sheenRoughness,c.sheenColorMap&&(p.sheenColorMap.value=c.sheenColorMap,n(c.sheenColorMap,p.sheenColorMapTransform)),c.sheenRoughnessMap&&(p.sheenRoughnessMap.value=c.sheenRoughnessMap,n(c.sheenRoughnessMap,p.sheenRoughnessMapTransform))),c.clearcoat>0&&(p.clearcoat.value=c.clearcoat,p.clearcoatRoughness.value=c.clearcoatRoughness,c.clearcoatMap&&(p.clearcoatMap.value=c.clearcoatMap,n(c.clearcoatMap,p.clearcoatMapTransform)),c.clearcoatRoughnessMap&&(p.clearcoatRoughnessMap.value=c.clearcoatRoughnessMap,n(c.clearcoatRoughnessMap,p.clearcoatRoughnessMapTransform)),c.clearcoatNormalMap&&(p.clearcoatNormalMap.value=c.clearcoatNormalMap,n(c.clearcoatNormalMap,p.clearcoatNormalMapTransform),p.clearcoatNormalScale.value.copy(c.clearcoatNormalScale),c.side===tn&&p.clearcoatNormalScale.value.negate())),c.iridescence>0&&(p.iridescence.value=c.iridescence,p.iridescenceIOR.value=c.iridescenceIOR,p.iridescenceThicknessMinimum.value=c.iridescenceThicknessRange[0],p.iridescenceThicknessMaximum.value=c.iridescenceThicknessRange[1],c.iridescenceMap&&(p.iridescenceMap.value=c.iridescenceMap,n(c.iridescenceMap,p.iridescenceMapTransform)),c.iridescenceThicknessMap&&(p.iridescenceThicknessMap.value=c.iridescenceThicknessMap,n(c.iridescenceThicknessMap,p.iridescenceThicknessMapTransform))),c.transmission>0&&(p.transmission.value=c.transmission,p.transmissionSamplerMap.value=_.texture,p.transmissionSamplerSize.value.set(_.width,_.height),c.transmissionMap&&(p.transmissionMap.value=c.transmissionMap,n(c.transmissionMap,p.transmissionMapTransform)),p.thickness.value=c.thickness,c.thicknessMap&&(p.thicknessMap.value=c.thicknessMap,n(c.thicknessMap,p.thicknessMapTransform)),p.attenuationDistance.value=c.attenuationDistance,p.attenuationColor.value.copy(c.attenuationColor)),c.anisotropy>0&&(p.anisotropyVector.value.set(c.anisotropy*Math.cos(c.anisotropyRotation),c.anisotropy*Math.sin(c.anisotropyRotation)),c.anisotropyMap&&(p.anisotropyMap.value=c.anisotropyMap,n(c.anisotropyMap,p.anisotropyMapTransform))),p.specularIntensity.value=c.specularIntensity,p.specularColor.value.copy(c.specularColor),c.specularColorMap&&(p.specularColorMap.value=c.specularColorMap,n(c.specularColorMap,p.specularColorMapTransform)),c.specularIntensityMap&&(p.specularIntensityMap.value=c.specularIntensityMap,n(c.specularIntensityMap,p.specularIntensityMapTransform))}function v(p,c){c.matcap&&(p.matcap.value=c.matcap)}function S(p,c){const _=e.get(c).light;p.referencePosition.value.setFromMatrixPosition(_.matrixWorld),p.nearDistance.value=_.shadow.camera.near,p.farDistance.value=_.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:r}}function ow(t,e,n,i){let r={},s={},o=[];const a=n.isWebGL2?t.getParameter(t.MAX_UNIFORM_BUFFER_BINDINGS):0;function l(_,g){const M=g.program;i.uniformBlockBinding(_,M)}function u(_,g){let M=r[_.id];M===void 0&&(v(_),M=f(_),r[_.id]=M,_.addEventListener("dispose",p));const P=g.program;i.updateUBOMapping(_,P);const R=e.render.frame;s[_.id]!==R&&(h(_),s[_.id]=R)}function f(_){const g=d();_.__bindingPointIndex=g;const M=t.createBuffer(),P=_.__size,R=_.usage;return t.bindBuffer(t.UNIFORM_BUFFER,M),t.bufferData(t.UNIFORM_BUFFER,P,R),t.bindBuffer(t.UNIFORM_BUFFER,null),t.bindBufferBase(t.UNIFORM_BUFFER,g,M),M}function d(){for(let _=0;_<a;_++)if(o.indexOf(_)===-1)return o.push(_),_;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function h(_){const g=r[_.id],M=_.uniforms,P=_.__cache;t.bindBuffer(t.UNIFORM_BUFFER,g);for(let R=0,w=M.length;R<w;R++){const N=Array.isArray(M[R])?M[R]:[M[R]];for(let K=0,x=N.length;K<x;K++){const C=N[K];if(m(C,R,K,P)===!0){const X=C.__offset,Q=Array.isArray(C.value)?C.value:[C.value];let L=0;for(let W=0;W<Q.length;W++){const V=Q[W],Y=S(V);typeof V=="number"||typeof V=="boolean"?(C.__data[0]=V,t.bufferSubData(t.UNIFORM_BUFFER,X+L,C.__data)):V.isMatrix3?(C.__data[0]=V.elements[0],C.__data[1]=V.elements[1],C.__data[2]=V.elements[2],C.__data[3]=0,C.__data[4]=V.elements[3],C.__data[5]=V.elements[4],C.__data[6]=V.elements[5],C.__data[7]=0,C.__data[8]=V.elements[6],C.__data[9]=V.elements[7],C.__data[10]=V.elements[8],C.__data[11]=0):(V.toArray(C.__data,L),L+=Y.storage/Float32Array.BYTES_PER_ELEMENT)}t.bufferSubData(t.UNIFORM_BUFFER,X,C.__data)}}}t.bindBuffer(t.UNIFORM_BUFFER,null)}function m(_,g,M,P){const R=_.value,w=g+"_"+M;if(P[w]===void 0)return typeof R=="number"||typeof R=="boolean"?P[w]=R:P[w]=R.clone(),!0;{const N=P[w];if(typeof R=="number"||typeof R=="boolean"){if(N!==R)return P[w]=R,!0}else if(N.equals(R)===!1)return N.copy(R),!0}return!1}function v(_){const g=_.uniforms;let M=0;const P=16;for(let w=0,N=g.length;w<N;w++){const K=Array.isArray(g[w])?g[w]:[g[w]];for(let x=0,C=K.length;x<C;x++){const X=K[x],Q=Array.isArray(X.value)?X.value:[X.value];for(let L=0,W=Q.length;L<W;L++){const V=Q[L],Y=S(V),b=M%P;b!==0&&P-b<Y.boundary&&(M+=P-b),X.__data=new Float32Array(Y.storage/Float32Array.BYTES_PER_ELEMENT),X.__offset=M,M+=Y.storage}}}const R=M%P;return R>0&&(M+=P-R),_.__size=M,_.__cache={},this}function S(_){const g={boundary:0,storage:0};return typeof _=="number"||typeof _=="boolean"?(g.boundary=4,g.storage=4):_.isVector2?(g.boundary=8,g.storage=8):_.isVector3||_.isColor?(g.boundary=16,g.storage=12):_.isVector4?(g.boundary=16,g.storage=16):_.isMatrix3?(g.boundary=48,g.storage=48):_.isMatrix4?(g.boundary=64,g.storage=64):_.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",_),g}function p(_){const g=_.target;g.removeEventListener("dispose",p);const M=o.indexOf(g.__bindingPointIndex);o.splice(M,1),t.deleteBuffer(r[g.id]),delete r[g.id],delete s[g.id]}function c(){for(const _ in r)t.deleteBuffer(r[_]);o=[],r={},s={}}return{bind:l,update:u,dispose:c}}class __{constructor(e={}){const{canvas:n=Qx(),context:i=null,depth:r=!0,stencil:s=!0,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:u=!1,powerPreference:f="default",failIfMajorPerformanceCaveat:d=!1}=e;this.isWebGLRenderer=!0;let h;i!==null?h=i.getContextAttributes().alpha:h=o;const m=new Uint32Array(4),v=new Int32Array(4);let S=null,p=null;const c=[],_=[];this.domElement=n,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Tt,this._useLegacyLights=!1,this.toneMapping=zi,this.toneMappingExposure=1;const g=this;let M=!1,P=0,R=0,w=null,N=-1,K=null;const x=new wt,C=new wt;let X=null;const Q=new We(0);let L=0,W=n.width,V=n.height,Y=1,b=null,I=null;const B=new wt(0,0,W,V),j=new wt(0,0,W,V);let ee=!1;const ye=new Of;let H=!1,q=!1,ae=null;const ge=new vt,Me=new Ge,he=new z,Ve={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function Pe(){return w===null?Y:1}let U=i;function Rt(E,D){for(let k=0;k<E.length;k++){const G=E[k],O=n.getContext(G,D);if(O!==null)return O}return null}try{const E={alpha:!0,depth:r,stencil:s,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:u,powerPreference:f,failIfMajorPerformanceCaveat:d};if("setAttribute"in n&&n.setAttribute("data-engine",`three.js r${Uf}`),n.addEventListener("webglcontextlost",Ke,!1),n.addEventListener("webglcontextrestored",A,!1),n.addEventListener("webglcontextcreationerror",ie,!1),U===null){const D=["webgl2","webgl","experimental-webgl"];if(g.isWebGL1Renderer===!0&&D.shift(),U=Rt(D,E),U===null)throw Rt(D)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}typeof WebGLRenderingContext<"u"&&U instanceof WebGLRenderingContext&&console.warn("THREE.WebGLRenderer: WebGL 1 support was deprecated in r153 and will be removed in r163."),U.getShaderPrecisionFormat===void 0&&(U.getShaderPrecisionFormat=function(){return{rangeMin:1,rangeMax:1,precision:1}})}catch(E){throw console.error("THREE.WebGLRenderer: "+E.message),E}let xe,Ae,_e,st,be,T,y,F,ne,$,te,pe,oe,ce,Te,Ne,Z,qe,ze,Re,ve,fe,De,Xe;function et(){xe=new hE(U),Ae=new aE(U,xe,e),xe.init(Ae),fe=new QT(U,xe,Ae),_e=new KT(U,xe,Ae),st=new gE(U),be=new FT,T=new ZT(U,xe,_e,be,Ae,fe,st),y=new uE(g),F=new dE(g),ne=new TS(U,Ae),De=new sE(U,xe,ne,Ae),$=new pE(U,ne,st,De),te=new SE(U,$,ne,st),ze=new xE(U,Ae,T),Ne=new lE(be),pe=new IT(g,y,F,xe,Ae,De,Ne),oe=new sw(g,be),ce=new zT,Te=new WT(xe,Ae),qe=new rE(g,y,F,_e,te,h,l),Z=new $T(g,te,Ae),Xe=new ow(U,st,Ae,_e),Re=new oE(U,xe,st,Ae),ve=new mE(U,xe,st,Ae),st.programs=pe.programs,g.capabilities=Ae,g.extensions=xe,g.properties=be,g.renderLists=ce,g.shadowMap=Z,g.state=_e,g.info=st}et();const Be=new rw(g,U);this.xr=Be,this.getContext=function(){return U},this.getContextAttributes=function(){return U.getContextAttributes()},this.forceContextLoss=function(){const E=xe.get("WEBGL_lose_context");E&&E.loseContext()},this.forceContextRestore=function(){const E=xe.get("WEBGL_lose_context");E&&E.restoreContext()},this.getPixelRatio=function(){return Y},this.setPixelRatio=function(E){E!==void 0&&(Y=E,this.setSize(W,V,!1))},this.getSize=function(E){return E.set(W,V)},this.setSize=function(E,D,k=!0){if(Be.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}W=E,V=D,n.width=Math.floor(E*Y),n.height=Math.floor(D*Y),k===!0&&(n.style.width=E+"px",n.style.height=D+"px"),this.setViewport(0,0,E,D)},this.getDrawingBufferSize=function(E){return E.set(W*Y,V*Y).floor()},this.setDrawingBufferSize=function(E,D,k){W=E,V=D,Y=k,n.width=Math.floor(E*k),n.height=Math.floor(D*k),this.setViewport(0,0,E,D)},this.getCurrentViewport=function(E){return E.copy(x)},this.getViewport=function(E){return E.copy(B)},this.setViewport=function(E,D,k,G){E.isVector4?B.set(E.x,E.y,E.z,E.w):B.set(E,D,k,G),_e.viewport(x.copy(B).multiplyScalar(Y).floor())},this.getScissor=function(E){return E.copy(j)},this.setScissor=function(E,D,k,G){E.isVector4?j.set(E.x,E.y,E.z,E.w):j.set(E,D,k,G),_e.scissor(C.copy(j).multiplyScalar(Y).floor())},this.getScissorTest=function(){return ee},this.setScissorTest=function(E){_e.setScissorTest(ee=E)},this.setOpaqueSort=function(E){b=E},this.setTransparentSort=function(E){I=E},this.getClearColor=function(E){return E.copy(qe.getClearColor())},this.setClearColor=function(){qe.setClearColor.apply(qe,arguments)},this.getClearAlpha=function(){return qe.getClearAlpha()},this.setClearAlpha=function(){qe.setClearAlpha.apply(qe,arguments)},this.clear=function(E=!0,D=!0,k=!0){let G=0;if(E){let O=!1;if(w!==null){const le=w.texture.format;O=le===jg||le===Xg||le===Wg}if(O){const le=w.texture.type,me=le===ki||le===Ci||le===Nf||le===fr||le===Gg||le===Vg,Ee=qe.getClearColor(),we=qe.getClearAlpha(),Ie=Ee.r,Ce=Ee.g,Le=Ee.b;me?(m[0]=Ie,m[1]=Ce,m[2]=Le,m[3]=we,U.clearBufferuiv(U.COLOR,0,m)):(v[0]=Ie,v[1]=Ce,v[2]=Le,v[3]=we,U.clearBufferiv(U.COLOR,0,v))}else G|=U.COLOR_BUFFER_BIT}D&&(G|=U.DEPTH_BUFFER_BIT),k&&(G|=U.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),U.clear(G)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){n.removeEventListener("webglcontextlost",Ke,!1),n.removeEventListener("webglcontextrestored",A,!1),n.removeEventListener("webglcontextcreationerror",ie,!1),ce.dispose(),Te.dispose(),be.dispose(),y.dispose(),F.dispose(),te.dispose(),De.dispose(),Xe.dispose(),pe.dispose(),Be.dispose(),Be.removeEventListener("sessionstart",hn),Be.removeEventListener("sessionend",Qe),ae&&(ae.dispose(),ae=null),Bt.stop()};function Ke(E){E.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),M=!0}function A(){console.log("THREE.WebGLRenderer: Context Restored."),M=!1;const E=st.autoReset,D=Z.enabled,k=Z.autoUpdate,G=Z.needsUpdate,O=Z.type;et(),st.autoReset=E,Z.enabled=D,Z.autoUpdate=k,Z.needsUpdate=G,Z.type=O}function ie(E){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",E.statusMessage)}function re(E){const D=E.target;D.removeEventListener("dispose",re),de(D)}function de(E){Se(E),be.remove(E)}function Se(E){const D=be.get(E).programs;D!==void 0&&(D.forEach(function(k){pe.releaseProgram(k)}),E.isShaderMaterial&&pe.releaseShaderCache(E))}this.renderBufferDirect=function(E,D,k,G,O,le){D===null&&(D=Ve);const me=O.isMesh&&O.matrixWorld.determinant()<0,Ee=S_(E,D,k,G,O);_e.setMaterial(G,me);let we=k.index,Ie=1;if(G.wireframe===!0){if(we=$.getWireframeAttribute(k),we===void 0)return;Ie=2}const Ce=k.drawRange,Le=k.attributes.position;let dt=Ce.start*Ie,rn=(Ce.start+Ce.count)*Ie;le!==null&&(dt=Math.max(dt,le.start*Ie),rn=Math.min(rn,(le.start+le.count)*Ie)),we!==null?(dt=Math.max(dt,0),rn=Math.min(rn,we.count)):Le!=null&&(dt=Math.max(dt,0),rn=Math.min(rn,Le.count));const yt=rn-dt;if(yt<0||yt===1/0)return;De.setup(O,G,Ee,k,we);let jn,ot=Re;if(we!==null&&(jn=ne.get(we),ot=ve,ot.setIndex(jn)),O.isMesh)G.wireframe===!0?(_e.setLineWidth(G.wireframeLinewidth*Pe()),ot.setMode(U.LINES)):ot.setMode(U.TRIANGLES);else if(O.isLine){let Fe=G.linewidth;Fe===void 0&&(Fe=1),_e.setLineWidth(Fe*Pe()),O.isLineSegments?ot.setMode(U.LINES):O.isLineLoop?ot.setMode(U.LINE_LOOP):ot.setMode(U.LINE_STRIP)}else O.isPoints?ot.setMode(U.POINTS):O.isSprite&&ot.setMode(U.TRIANGLES);if(O.isBatchedMesh)ot.renderMultiDraw(O._multiDrawStarts,O._multiDrawCounts,O._multiDrawCount);else if(O.isInstancedMesh)ot.renderInstances(dt,yt,O.count);else if(k.isInstancedBufferGeometry){const Fe=k._maxInstanceCount!==void 0?k._maxInstanceCount:1/0,Rl=Math.min(k.instanceCount,Fe);ot.renderInstances(dt,yt,Rl)}else ot.render(dt,yt)};function je(E,D,k){E.transparent===!0&&E.side===ni&&E.forceSinglePass===!1?(E.side=tn,E.needsUpdate=!0,bo(E,D,k),E.side=Gi,E.needsUpdate=!0,bo(E,D,k),E.side=ni):bo(E,D,k)}this.compile=function(E,D,k=null){k===null&&(k=E),p=Te.get(k),p.init(),_.push(p),k.traverseVisible(function(O){O.isLight&&O.layers.test(D.layers)&&(p.pushLight(O),O.castShadow&&p.pushShadow(O))}),E!==k&&E.traverseVisible(function(O){O.isLight&&O.layers.test(D.layers)&&(p.pushLight(O),O.castShadow&&p.pushShadow(O))}),p.setupLights(g._useLegacyLights);const G=new Set;return E.traverse(function(O){const le=O.material;if(le)if(Array.isArray(le))for(let me=0;me<le.length;me++){const Ee=le[me];je(Ee,k,O),G.add(Ee)}else je(le,k,O),G.add(le)}),_.pop(),p=null,G},this.compileAsync=function(E,D,k=null){const G=this.compile(E,D,k);return new Promise(O=>{function le(){if(G.forEach(function(me){be.get(me).currentProgram.isReady()&&G.delete(me)}),G.size===0){O(E);return}setTimeout(le,10)}xe.get("KHR_parallel_shader_compile")!==null?le():setTimeout(le,10)})};let Ze=null;function Ct(E){Ze&&Ze(E)}function hn(){Bt.stop()}function Qe(){Bt.start()}const Bt=new u_;Bt.setAnimationLoop(Ct),typeof self<"u"&&Bt.setContext(self),this.setAnimationLoop=function(E){Ze=E,Be.setAnimationLoop(E),E===null?Bt.stop():Bt.start()},Be.addEventListener("sessionstart",hn),Be.addEventListener("sessionend",Qe),this.render=function(E,D){if(D!==void 0&&D.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(M===!0)return;E.matrixWorldAutoUpdate===!0&&E.updateMatrixWorld(),D.parent===null&&D.matrixWorldAutoUpdate===!0&&D.updateMatrixWorld(),Be.enabled===!0&&Be.isPresenting===!0&&(Be.cameraAutoUpdate===!0&&Be.updateCamera(D),D=Be.getCamera()),E.isScene===!0&&E.onBeforeRender(g,E,D,w),p=Te.get(E,_.length),p.init(),_.push(p),ge.multiplyMatrices(D.projectionMatrix,D.matrixWorldInverse),ye.setFromProjectionMatrix(ge),q=this.localClippingEnabled,H=Ne.init(this.clippingPlanes,q),S=ce.get(E,c.length),S.init(),c.push(S),On(E,D,0,g.sortObjects),S.finish(),g.sortObjects===!0&&S.sort(b,I),this.info.render.frame++,H===!0&&Ne.beginShadows();const k=p.state.shadowsArray;if(Z.render(k,E,D),H===!0&&Ne.endShadows(),this.info.autoReset===!0&&this.info.reset(),(Be.enabled===!1||Be.isPresenting===!1||Be.hasDepthSensing()===!1)&&qe.render(S,E),p.setupLights(g._useLegacyLights),D.isArrayCamera){const G=D.cameras;for(let O=0,le=G.length;O<le;O++){const me=G[O];kf(S,E,me,me.viewport)}}else kf(S,E,D);w!==null&&(T.updateMultisampleRenderTarget(w),T.updateRenderTargetMipmap(w)),E.isScene===!0&&E.onAfterRender(g,E,D),De.resetDefaultState(),N=-1,K=null,_.pop(),_.length>0?p=_[_.length-1]:p=null,c.pop(),c.length>0?S=c[c.length-1]:S=null};function On(E,D,k,G){if(E.visible===!1)return;if(E.layers.test(D.layers)){if(E.isGroup)k=E.renderOrder;else if(E.isLOD)E.autoUpdate===!0&&E.update(D);else if(E.isLight)p.pushLight(E),E.castShadow&&p.pushShadow(E);else if(E.isSprite){if(!E.frustumCulled||ye.intersectsSprite(E)){G&&he.setFromMatrixPosition(E.matrixWorld).applyMatrix4(ge);const me=te.update(E),Ee=E.material;Ee.visible&&S.push(E,me,Ee,k,he.z,null)}}else if((E.isMesh||E.isLine||E.isPoints)&&(!E.frustumCulled||ye.intersectsObject(E))){const me=te.update(E),Ee=E.material;if(G&&(E.boundingSphere!==void 0?(E.boundingSphere===null&&E.computeBoundingSphere(),he.copy(E.boundingSphere.center)):(me.boundingSphere===null&&me.computeBoundingSphere(),he.copy(me.boundingSphere.center)),he.applyMatrix4(E.matrixWorld).applyMatrix4(ge)),Array.isArray(Ee)){const we=me.groups;for(let Ie=0,Ce=we.length;Ie<Ce;Ie++){const Le=we[Ie],dt=Ee[Le.materialIndex];dt&&dt.visible&&S.push(E,me,dt,k,he.z,Le)}}else Ee.visible&&S.push(E,me,Ee,k,he.z,null)}}const le=E.children;for(let me=0,Ee=le.length;me<Ee;me++)On(le[me],D,k,G)}function kf(E,D,k,G){const O=E.opaque,le=E.transmissive,me=E.transparent;p.setupLightsView(k),H===!0&&Ne.setGlobalState(g.clippingPlanes,k),le.length>0&&x_(O,le,D,k),G&&_e.viewport(x.copy(G)),O.length>0&&Lo(O,D,k),le.length>0&&Lo(le,D,k),me.length>0&&Lo(me,D,k),_e.buffers.depth.setTest(!0),_e.buffers.depth.setMask(!0),_e.buffers.color.setMask(!0),_e.setPolygonOffset(!1)}function x_(E,D,k,G){if((k.isScene===!0?k.overrideMaterial:null)!==null)return;const le=Ae.isWebGL2;ae===null&&(ae=new Sr(1,1,{generateMipmaps:!0,type:xe.has("EXT_color_buffer_half_float")?So:ki,minFilter:lr,samples:le?4:0})),g.getDrawingBufferSize(Me),le?ae.setSize(Me.x,Me.y):ae.setSize(Fc(Me.x),Fc(Me.y));const me=g.getRenderTarget();g.setRenderTarget(ae),g.getClearColor(Q),L=g.getClearAlpha(),L<1&&g.setClearColor(16777215,.5),g.clear();const Ee=g.toneMapping;g.toneMapping=zi,Lo(E,k,G),T.updateMultisampleRenderTarget(ae),T.updateRenderTargetMipmap(ae);let we=!1;for(let Ie=0,Ce=D.length;Ie<Ce;Ie++){const Le=D[Ie],dt=Le.object,rn=Le.geometry,yt=Le.material,jn=Le.group;if(yt.side===ni&&dt.layers.test(G.layers)){const ot=yt.side;yt.side=tn,yt.needsUpdate=!0,Bf(dt,k,G,rn,yt,jn),yt.side=ot,yt.needsUpdate=!0,we=!0}}we===!0&&(T.updateMultisampleRenderTarget(ae),T.updateRenderTargetMipmap(ae)),g.setRenderTarget(me),g.setClearColor(Q,L),g.toneMapping=Ee}function Lo(E,D,k){const G=D.isScene===!0?D.overrideMaterial:null;for(let O=0,le=E.length;O<le;O++){const me=E[O],Ee=me.object,we=me.geometry,Ie=G===null?me.material:G,Ce=me.group;Ee.layers.test(k.layers)&&Bf(Ee,D,k,we,Ie,Ce)}}function Bf(E,D,k,G,O,le){E.onBeforeRender(g,D,k,G,O,le),E.modelViewMatrix.multiplyMatrices(k.matrixWorldInverse,E.matrixWorld),E.normalMatrix.getNormalMatrix(E.modelViewMatrix),O.onBeforeRender(g,D,k,G,E,le),O.transparent===!0&&O.side===ni&&O.forceSinglePass===!1?(O.side=tn,O.needsUpdate=!0,g.renderBufferDirect(k,D,G,O,E,le),O.side=Gi,O.needsUpdate=!0,g.renderBufferDirect(k,D,G,O,E,le),O.side=ni):g.renderBufferDirect(k,D,G,O,E,le),E.onAfterRender(g,D,k,G,O,le)}function bo(E,D,k){D.isScene!==!0&&(D=Ve);const G=be.get(E),O=p.state.lights,le=p.state.shadowsArray,me=O.state.version,Ee=pe.getParameters(E,O.state,le,D,k),we=pe.getProgramCacheKey(Ee);let Ie=G.programs;G.environment=E.isMeshStandardMaterial?D.environment:null,G.fog=D.fog,G.envMap=(E.isMeshStandardMaterial?F:y).get(E.envMap||G.environment),Ie===void 0&&(E.addEventListener("dispose",re),Ie=new Map,G.programs=Ie);let Ce=Ie.get(we);if(Ce!==void 0){if(G.currentProgram===Ce&&G.lightsStateVersion===me)return Gf(E,Ee),Ce}else Ee.uniforms=pe.getUniforms(E),E.onBuild(k,Ee,g),E.onBeforeCompile(Ee,g),Ce=pe.acquireProgram(Ee,we),Ie.set(we,Ce),G.uniforms=Ee.uniforms;const Le=G.uniforms;return(!E.isShaderMaterial&&!E.isRawShaderMaterial||E.clipping===!0)&&(Le.clippingPlanes=Ne.uniform),Gf(E,Ee),G.needsLights=M_(E),G.lightsStateVersion=me,G.needsLights&&(Le.ambientLightColor.value=O.state.ambient,Le.lightProbe.value=O.state.probe,Le.directionalLights.value=O.state.directional,Le.directionalLightShadows.value=O.state.directionalShadow,Le.spotLights.value=O.state.spot,Le.spotLightShadows.value=O.state.spotShadow,Le.rectAreaLights.value=O.state.rectArea,Le.ltc_1.value=O.state.rectAreaLTC1,Le.ltc_2.value=O.state.rectAreaLTC2,Le.pointLights.value=O.state.point,Le.pointLightShadows.value=O.state.pointShadow,Le.hemisphereLights.value=O.state.hemi,Le.directionalShadowMap.value=O.state.directionalShadowMap,Le.directionalShadowMatrix.value=O.state.directionalShadowMatrix,Le.spotShadowMap.value=O.state.spotShadowMap,Le.spotLightMatrix.value=O.state.spotLightMatrix,Le.spotLightMap.value=O.state.spotLightMap,Le.pointShadowMap.value=O.state.pointShadowMap,Le.pointShadowMatrix.value=O.state.pointShadowMatrix),G.currentProgram=Ce,G.uniformsList=null,Ce}function Hf(E){if(E.uniformsList===null){const D=E.currentProgram.getUniforms();E.uniformsList=Pa.seqWithValue(D.seq,E.uniforms)}return E.uniformsList}function Gf(E,D){const k=be.get(E);k.outputColorSpace=D.outputColorSpace,k.batching=D.batching,k.instancing=D.instancing,k.instancingColor=D.instancingColor,k.skinning=D.skinning,k.morphTargets=D.morphTargets,k.morphNormals=D.morphNormals,k.morphColors=D.morphColors,k.morphTargetsCount=D.morphTargetsCount,k.numClippingPlanes=D.numClippingPlanes,k.numIntersection=D.numClipIntersection,k.vertexAlphas=D.vertexAlphas,k.vertexTangents=D.vertexTangents,k.toneMapping=D.toneMapping}function S_(E,D,k,G,O){D.isScene!==!0&&(D=Ve),T.resetTextureUnits();const le=D.fog,me=G.isMeshStandardMaterial?D.environment:null,Ee=w===null?g.outputColorSpace:w.isXRRenderTarget===!0?w.texture.colorSpace:di,we=(G.isMeshStandardMaterial?F:y).get(G.envMap||me),Ie=G.vertexColors===!0&&!!k.attributes.color&&k.attributes.color.itemSize===4,Ce=!!k.attributes.tangent&&(!!G.normalMap||G.anisotropy>0),Le=!!k.morphAttributes.position,dt=!!k.morphAttributes.normal,rn=!!k.morphAttributes.color;let yt=zi;G.toneMapped&&(w===null||w.isXRRenderTarget===!0)&&(yt=g.toneMapping);const jn=k.morphAttributes.position||k.morphAttributes.normal||k.morphAttributes.color,ot=jn!==void 0?jn.length:0,Fe=be.get(G),Rl=p.state.lights;if(H===!0&&(q===!0||E!==K)){const pn=E===K&&G.id===N;Ne.setState(G,E,pn)}let ct=!1;G.version===Fe.__version?(Fe.needsLights&&Fe.lightsStateVersion!==Rl.state.version||Fe.outputColorSpace!==Ee||O.isBatchedMesh&&Fe.batching===!1||!O.isBatchedMesh&&Fe.batching===!0||O.isInstancedMesh&&Fe.instancing===!1||!O.isInstancedMesh&&Fe.instancing===!0||O.isSkinnedMesh&&Fe.skinning===!1||!O.isSkinnedMesh&&Fe.skinning===!0||O.isInstancedMesh&&Fe.instancingColor===!0&&O.instanceColor===null||O.isInstancedMesh&&Fe.instancingColor===!1&&O.instanceColor!==null||Fe.envMap!==we||G.fog===!0&&Fe.fog!==le||Fe.numClippingPlanes!==void 0&&(Fe.numClippingPlanes!==Ne.numPlanes||Fe.numIntersection!==Ne.numIntersection)||Fe.vertexAlphas!==Ie||Fe.vertexTangents!==Ce||Fe.morphTargets!==Le||Fe.morphNormals!==dt||Fe.morphColors!==rn||Fe.toneMapping!==yt||Ae.isWebGL2===!0&&Fe.morphTargetsCount!==ot)&&(ct=!0):(ct=!0,Fe.__version=G.version);let Yi=Fe.currentProgram;ct===!0&&(Yi=bo(G,D,O));let Vf=!1,Cs=!1,Cl=!1;const Dt=Yi.getUniforms(),qi=Fe.uniforms;if(_e.useProgram(Yi.program)&&(Vf=!0,Cs=!0,Cl=!0),G.id!==N&&(N=G.id,Cs=!0),Vf||K!==E){Dt.setValue(U,"projectionMatrix",E.projectionMatrix),Dt.setValue(U,"viewMatrix",E.matrixWorldInverse);const pn=Dt.map.cameraPosition;pn!==void 0&&pn.setValue(U,he.setFromMatrixPosition(E.matrixWorld)),Ae.logarithmicDepthBuffer&&Dt.setValue(U,"logDepthBufFC",2/(Math.log(E.far+1)/Math.LN2)),(G.isMeshPhongMaterial||G.isMeshToonMaterial||G.isMeshLambertMaterial||G.isMeshBasicMaterial||G.isMeshStandardMaterial||G.isShaderMaterial)&&Dt.setValue(U,"isOrthographic",E.isOrthographicCamera===!0),K!==E&&(K=E,Cs=!0,Cl=!0)}if(O.isSkinnedMesh){Dt.setOptional(U,O,"bindMatrix"),Dt.setOptional(U,O,"bindMatrixInverse");const pn=O.skeleton;pn&&(Ae.floatVertexTextures?(pn.boneTexture===null&&pn.computeBoneTexture(),Dt.setValue(U,"boneTexture",pn.boneTexture,T)):console.warn("THREE.WebGLRenderer: SkinnedMesh can only be used with WebGL 2. With WebGL 1 OES_texture_float and vertex textures support is required."))}O.isBatchedMesh&&(Dt.setOptional(U,O,"batchingTexture"),Dt.setValue(U,"batchingTexture",O._matricesTexture,T));const Pl=k.morphAttributes;if((Pl.position!==void 0||Pl.normal!==void 0||Pl.color!==void 0&&Ae.isWebGL2===!0)&&ze.update(O,k,Yi),(Cs||Fe.receiveShadow!==O.receiveShadow)&&(Fe.receiveShadow=O.receiveShadow,Dt.setValue(U,"receiveShadow",O.receiveShadow)),G.isMeshGouraudMaterial&&G.envMap!==null&&(qi.envMap.value=we,qi.flipEnvMap.value=we.isCubeTexture&&we.isRenderTargetTexture===!1?-1:1),Cs&&(Dt.setValue(U,"toneMappingExposure",g.toneMappingExposure),Fe.needsLights&&y_(qi,Cl),le&&G.fog===!0&&oe.refreshFogUniforms(qi,le),oe.refreshMaterialUniforms(qi,G,Y,V,ae),Pa.upload(U,Hf(Fe),qi,T)),G.isShaderMaterial&&G.uniformsNeedUpdate===!0&&(Pa.upload(U,Hf(Fe),qi,T),G.uniformsNeedUpdate=!1),G.isSpriteMaterial&&Dt.setValue(U,"center",O.center),Dt.setValue(U,"modelViewMatrix",O.modelViewMatrix),Dt.setValue(U,"normalMatrix",O.normalMatrix),Dt.setValue(U,"modelMatrix",O.matrixWorld),G.isShaderMaterial||G.isRawShaderMaterial){const pn=G.uniformsGroups;for(let Ll=0,E_=pn.length;Ll<E_;Ll++)if(Ae.isWebGL2){const Wf=pn[Ll];Xe.update(Wf,Yi),Xe.bind(Wf,Yi)}else console.warn("THREE.WebGLRenderer: Uniform Buffer Objects can only be used with WebGL 2.")}return Yi}function y_(E,D){E.ambientLightColor.needsUpdate=D,E.lightProbe.needsUpdate=D,E.directionalLights.needsUpdate=D,E.directionalLightShadows.needsUpdate=D,E.pointLights.needsUpdate=D,E.pointLightShadows.needsUpdate=D,E.spotLights.needsUpdate=D,E.spotLightShadows.needsUpdate=D,E.rectAreaLights.needsUpdate=D,E.hemisphereLights.needsUpdate=D}function M_(E){return E.isMeshLambertMaterial||E.isMeshToonMaterial||E.isMeshPhongMaterial||E.isMeshStandardMaterial||E.isShadowMaterial||E.isShaderMaterial&&E.lights===!0}this.getActiveCubeFace=function(){return P},this.getActiveMipmapLevel=function(){return R},this.getRenderTarget=function(){return w},this.setRenderTargetTextures=function(E,D,k){be.get(E.texture).__webglTexture=D,be.get(E.depthTexture).__webglTexture=k;const G=be.get(E);G.__hasExternalTextures=!0,G.__hasExternalTextures&&(G.__autoAllocateDepthBuffer=k===void 0,G.__autoAllocateDepthBuffer||xe.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),G.__useRenderToTexture=!1))},this.setRenderTargetFramebuffer=function(E,D){const k=be.get(E);k.__webglFramebuffer=D,k.__useDefaultFramebuffer=D===void 0},this.setRenderTarget=function(E,D=0,k=0){w=E,P=D,R=k;let G=!0,O=null,le=!1,me=!1;if(E){const we=be.get(E);we.__useDefaultFramebuffer!==void 0?(_e.bindFramebuffer(U.FRAMEBUFFER,null),G=!1):we.__webglFramebuffer===void 0?T.setupRenderTarget(E):we.__hasExternalTextures&&T.rebindTextures(E,be.get(E.texture).__webglTexture,be.get(E.depthTexture).__webglTexture);const Ie=E.texture;(Ie.isData3DTexture||Ie.isDataArrayTexture||Ie.isCompressedArrayTexture)&&(me=!0);const Ce=be.get(E).__webglFramebuffer;E.isWebGLCubeRenderTarget?(Array.isArray(Ce[D])?O=Ce[D][k]:O=Ce[D],le=!0):Ae.isWebGL2&&E.samples>0&&T.useMultisampledRTT(E)===!1?O=be.get(E).__webglMultisampledFramebuffer:Array.isArray(Ce)?O=Ce[k]:O=Ce,x.copy(E.viewport),C.copy(E.scissor),X=E.scissorTest}else x.copy(B).multiplyScalar(Y).floor(),C.copy(j).multiplyScalar(Y).floor(),X=ee;if(_e.bindFramebuffer(U.FRAMEBUFFER,O)&&Ae.drawBuffers&&G&&_e.drawBuffers(E,O),_e.viewport(x),_e.scissor(C),_e.setScissorTest(X),le){const we=be.get(E.texture);U.framebufferTexture2D(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_CUBE_MAP_POSITIVE_X+D,we.__webglTexture,k)}else if(me){const we=be.get(E.texture),Ie=D||0;U.framebufferTextureLayer(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0,we.__webglTexture,k||0,Ie)}N=-1},this.readRenderTargetPixels=function(E,D,k,G,O,le,me){if(!(E&&E.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ee=be.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&me!==void 0&&(Ee=Ee[me]),Ee){_e.bindFramebuffer(U.FRAMEBUFFER,Ee);try{const we=E.texture,Ie=we.format,Ce=we.type;if(Ie!==Dn&&fe.convert(Ie)!==U.getParameter(U.IMPLEMENTATION_COLOR_READ_FORMAT)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}const Le=Ce===So&&(xe.has("EXT_color_buffer_half_float")||Ae.isWebGL2&&xe.has("EXT_color_buffer_float"));if(Ce!==ki&&fe.convert(Ce)!==U.getParameter(U.IMPLEMENTATION_COLOR_READ_TYPE)&&!(Ce===ii&&(Ae.isWebGL2||xe.has("OES_texture_float")||xe.has("WEBGL_color_buffer_float")))&&!Le){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}D>=0&&D<=E.width-G&&k>=0&&k<=E.height-O&&U.readPixels(D,k,G,O,fe.convert(Ie),fe.convert(Ce),le)}finally{const we=w!==null?be.get(w).__webglFramebuffer:null;_e.bindFramebuffer(U.FRAMEBUFFER,we)}}},this.copyFramebufferToTexture=function(E,D,k=0){const G=Math.pow(2,-k),O=Math.floor(D.image.width*G),le=Math.floor(D.image.height*G);T.setTexture2D(D,0),U.copyTexSubImage2D(U.TEXTURE_2D,k,0,0,E.x,E.y,O,le),_e.unbindTexture()},this.copyTextureToTexture=function(E,D,k,G=0){const O=D.image.width,le=D.image.height,me=fe.convert(k.format),Ee=fe.convert(k.type);T.setTexture2D(k,0),U.pixelStorei(U.UNPACK_FLIP_Y_WEBGL,k.flipY),U.pixelStorei(U.UNPACK_PREMULTIPLY_ALPHA_WEBGL,k.premultiplyAlpha),U.pixelStorei(U.UNPACK_ALIGNMENT,k.unpackAlignment),D.isDataTexture?U.texSubImage2D(U.TEXTURE_2D,G,E.x,E.y,O,le,me,Ee,D.image.data):D.isCompressedTexture?U.compressedTexSubImage2D(U.TEXTURE_2D,G,E.x,E.y,D.mipmaps[0].width,D.mipmaps[0].height,me,D.mipmaps[0].data):U.texSubImage2D(U.TEXTURE_2D,G,E.x,E.y,me,Ee,D.image),G===0&&k.generateMipmaps&&U.generateMipmap(U.TEXTURE_2D),_e.unbindTexture()},this.copyTextureToTexture3D=function(E,D,k,G,O=0){if(g.isWebGL1Renderer){console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.");return}const le=E.max.x-E.min.x+1,me=E.max.y-E.min.y+1,Ee=E.max.z-E.min.z+1,we=fe.convert(G.format),Ie=fe.convert(G.type);let Ce;if(G.isData3DTexture)T.setTexture3D(G,0),Ce=U.TEXTURE_3D;else if(G.isDataArrayTexture||G.isCompressedArrayTexture)T.setTexture2DArray(G,0),Ce=U.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}U.pixelStorei(U.UNPACK_FLIP_Y_WEBGL,G.flipY),U.pixelStorei(U.UNPACK_PREMULTIPLY_ALPHA_WEBGL,G.premultiplyAlpha),U.pixelStorei(U.UNPACK_ALIGNMENT,G.unpackAlignment);const Le=U.getParameter(U.UNPACK_ROW_LENGTH),dt=U.getParameter(U.UNPACK_IMAGE_HEIGHT),rn=U.getParameter(U.UNPACK_SKIP_PIXELS),yt=U.getParameter(U.UNPACK_SKIP_ROWS),jn=U.getParameter(U.UNPACK_SKIP_IMAGES),ot=k.isCompressedTexture?k.mipmaps[O]:k.image;U.pixelStorei(U.UNPACK_ROW_LENGTH,ot.width),U.pixelStorei(U.UNPACK_IMAGE_HEIGHT,ot.height),U.pixelStorei(U.UNPACK_SKIP_PIXELS,E.min.x),U.pixelStorei(U.UNPACK_SKIP_ROWS,E.min.y),U.pixelStorei(U.UNPACK_SKIP_IMAGES,E.min.z),k.isDataTexture||k.isData3DTexture?U.texSubImage3D(Ce,O,D.x,D.y,D.z,le,me,Ee,we,Ie,ot.data):k.isCompressedArrayTexture?(console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: untested support for compressed srcTexture."),U.compressedTexSubImage3D(Ce,O,D.x,D.y,D.z,le,me,Ee,we,ot.data)):U.texSubImage3D(Ce,O,D.x,D.y,D.z,le,me,Ee,we,Ie,ot),U.pixelStorei(U.UNPACK_ROW_LENGTH,Le),U.pixelStorei(U.UNPACK_IMAGE_HEIGHT,dt),U.pixelStorei(U.UNPACK_SKIP_PIXELS,rn),U.pixelStorei(U.UNPACK_SKIP_ROWS,yt),U.pixelStorei(U.UNPACK_SKIP_IMAGES,jn),O===0&&G.generateMipmaps&&U.generateMipmap(Ce),_e.unbindTexture()},this.initTexture=function(E){E.isCubeTexture?T.setTextureCube(E,0):E.isData3DTexture?T.setTexture3D(E,0):E.isDataArrayTexture||E.isCompressedArrayTexture?T.setTexture2DArray(E,0):T.setTexture2D(E,0),_e.unbindTexture()},this.resetState=function(){P=0,R=0,w=null,_e.reset(),De.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return oi}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const n=this.getContext();n.drawingBufferColorSpace=e===If?"display-p3":"srgb",n.unpackColorSpace=$e.workingColorSpace===El?"display-p3":"srgb"}get outputEncoding(){return console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace===Tt?hr:qg}set outputEncoding(e){console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace=e===hr?Tt:di}get useLegacyLights(){return console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights}set useLegacyLights(e){console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights=e}}class aw extends __{}aw.prototype.isWebGL1Renderer=!0;let lw=class extends zt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,n){return super.copy(e,n),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const n=super.toJSON(e);return this.fog!==null&&(n.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(n.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(n.object.backgroundIntensity=this.backgroundIntensity),n}};class uw extends Po{constructor(e){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new We(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new We(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=$g,this.normalScale=new Ge(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class v_ extends zt{constructor(e,n=1){super(),this.isLight=!0,this.type="Light",this.color=new We(e),this.intensity=n}dispose(){}copy(e,n){return super.copy(e,n),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const n=super.toJSON(e);return n.object.color=this.color.getHex(),n.object.intensity=this.intensity,this.groundColor!==void 0&&(n.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(n.object.distance=this.distance),this.angle!==void 0&&(n.object.angle=this.angle),this.decay!==void 0&&(n.object.decay=this.decay),this.penumbra!==void 0&&(n.object.penumbra=this.penumbra),this.shadow!==void 0&&(n.object.shadow=this.shadow.toJSON()),n}}const Nu=new vt,Mp=new z,Ep=new z;class cw{constructor(e){this.camera=e,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Ge(512,512),this.map=null,this.mapPass=null,this.matrix=new vt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Of,this._frameExtents=new Ge(1,1),this._viewportCount=1,this._viewports=[new wt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const n=this.camera,i=this.matrix;Mp.setFromMatrixPosition(e.matrixWorld),n.position.copy(Mp),Ep.setFromMatrixPosition(e.target.matrixWorld),n.lookAt(Ep),n.updateMatrixWorld(),Nu.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Nu),i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(Nu)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class fw extends cw{constructor(){super(new c_(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class dw extends v_{constructor(e,n){super(e,n),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(zt.DEFAULT_UP),this.updateMatrix(),this.target=new zt,this.shadow=new fw}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class hw extends v_{constructor(e,n){super(e,n),this.isAmbientLight=!0,this.type="AmbientLight"}}class pw{constructor(e=!0){this.autoStart=e,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=Tp(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let e=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const n=Tp();e=(n-this.oldTime)/1e3,this.oldTime=n,this.elapsedTime+=e}return e}}function Tp(){return(typeof performance>"u"?Date:performance).now()}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Uf}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Uf);function mw(t){const e=new __({canvas:t,antialias:!0});return e.setPixelRatio(Math.min(window.devicePixelRatio,2)),e.setSize(t.clientWidth,t.clientHeight),e.outputColorSpace=Tt,e.toneMapping=kg,e.toneMappingExposure=1,e}function gw(t,e,n,i){const r=new ResizeObserver(()=>{const s=t.clientWidth,o=t.clientHeight;s===0||o===0||(e.setPixelRatio(Math.min(window.devicePixelRatio,2)),e.setSize(s,o),n.aspect=s/o,n.updateProjectionMatrix())});return r.observe(t),()=>r.disconnect()}class _w{constructor(e){Yn(this,"canvas");Yn(this,"renderer");Yn(this,"scene");Yn(this,"camera");Yn(this,"clock");Yn(this,"resizeDispose",null);Yn(this,"rafId",null);Yn(this,"disposed",!1);this.canvas=e,this.renderer=mw(e),this.scene=new lw,this.camera=new vn(50,e.clientWidth/e.clientHeight||1,.1,1e3),this.camera.position.set(0,0,5),this.clock=new pw;const n=new hw(4210752),i=new dw(16777215,.8);i.position.set(2,4,3),this.scene.add(n,i);const r=new As(1,1,1),s=new uw({color:2263295}),o=new Un(r,s);this.scene.add(o)}start(){this.resizeDispose=gw(this.canvas,this.renderer,this.camera);const e=()=>{if(this.disposed)return;this.rafId=requestAnimationFrame(e);const n=this.clock.getElapsedTime(),i=this.scene.children.find(r=>r.type==="Mesh");i&&(i.rotation.x=n*.2,i.rotation.y=n*.3),this.renderer.render(this.scene,this.camera)};e()}dispose(){var e;this.disposed=!0,this.rafId!=null&&cancelAnimationFrame(this.rafId),this.rafId=null,(e=this.resizeDispose)==null||e.call(this),this.scene.traverse(n=>{var i,r;n instanceof Un&&((i=n.geometry)==null||i.dispose(),Array.isArray(n.material)?n.material.forEach(s=>s.dispose()):(r=n.material)==null||r.dispose())}),this.renderer.dispose()}}const vw="";function xw(){const t=Ei.useRef(null),[e,n]=Ei.useState("closed"),i=Ei.useRef(null);return Ei.useEffect(()=>{if(!t.current)return;const r=new _w(t.current);return r.start(),()=>r.dispose()},[]),Ei.useEffect(()=>{const s=`${window.location.protocol==="https:"?"wss:":"ws:"}//${window.location.host}${vw}/ws`,o=new WebSocket(s);return i.current=o,o.onopen=()=>n("open"),o.onclose=()=>n("closed"),o.onmessage=a=>console.log("WS:",a.data),()=>{o.close(),i.current=null}},[]),Hr.jsxs(Hr.Fragment,{children:[Hr.jsx("canvas",{ref:t,style:{display:"block",width:"100%",height:"100%"}}),Hr.jsxs("div",{style:{position:"absolute",top:12,left:12,color:"#fff",textShadow:"0 0 4px #000",fontSize:14},children:["WebSocket: ",e]})]})}Iu.createRoot(document.getElementById("root")).render(Hr.jsx(G_.StrictMode,{children:Hr.jsx(xw,{})}));
