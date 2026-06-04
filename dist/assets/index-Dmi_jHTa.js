(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))r(o);new MutationObserver(o=>{for(const l of o)if(l.type==="childList")for(const i of l.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&r(i)}).observe(document,{childList:!0,subtree:!0});function n(o){const l={};return o.integrity&&(l.integrity=o.integrity),o.referrerPolicy&&(l.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?l.credentials="include":o.crossOrigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function r(o){if(o.ep)return;o.ep=!0;const l=n(o);fetch(o.href,l)}})();function Ah(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var md={exports:{}},zl={},gd={exports:{}},M={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Zr=Symbol.for("react.element"),bh=Symbol.for("react.portal"),Bh=Symbol.for("react.fragment"),Uh=Symbol.for("react.strict_mode"),Wh=Symbol.for("react.profiler"),Hh=Symbol.for("react.provider"),Vh=Symbol.for("react.context"),Qh=Symbol.for("react.forward_ref"),Yh=Symbol.for("react.suspense"),Gh=Symbol.for("react.memo"),Kh=Symbol.for("react.lazy"),fu=Symbol.iterator;function Xh(e){return e===null||typeof e!="object"?null:(e=fu&&e[fu]||e["@@iterator"],typeof e=="function"?e:null)}var yd={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},vd=Object.assign,xd={};function Gn(e,t,n){this.props=e,this.context=t,this.refs=xd,this.updater=n||yd}Gn.prototype.isReactComponent={};Gn.prototype.setState=function(e,t){if(typeof e!="object"&&typeof e!="function"&&e!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,e,t,"setState")};Gn.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")};function wd(){}wd.prototype=Gn.prototype;function ra(e,t,n){this.props=e,this.context=t,this.refs=xd,this.updater=n||yd}var oa=ra.prototype=new wd;oa.constructor=ra;vd(oa,Gn.prototype);oa.isPureReactComponent=!0;var pu=Array.isArray,kd=Object.prototype.hasOwnProperty,la={current:null},Sd={key:!0,ref:!0,__self:!0,__source:!0};function Cd(e,t,n){var r,o={},l=null,i=null;if(t!=null)for(r in t.ref!==void 0&&(i=t.ref),t.key!==void 0&&(l=""+t.key),t)kd.call(t,r)&&!Sd.hasOwnProperty(r)&&(o[r]=t[r]);var s=arguments.length-2;if(s===1)o.children=n;else if(1<s){for(var a=Array(s),c=0;c<s;c++)a[c]=arguments[c+2];o.children=a}if(e&&e.defaultProps)for(r in s=e.defaultProps,s)o[r]===void 0&&(o[r]=s[r]);return{$$typeof:Zr,type:e,key:l,ref:i,props:o,_owner:la.current}}function Jh(e,t){return{$$typeof:Zr,type:e.type,key:t,ref:e.ref,props:e.props,_owner:e._owner}}function ia(e){return typeof e=="object"&&e!==null&&e.$$typeof===Zr}function Zh(e){var t={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,function(n){return t[n]})}var hu=/\/+/g;function oi(e,t){return typeof e=="object"&&e!==null&&e.key!=null?Zh(""+e.key):t.toString(36)}function Oo(e,t,n,r,o){var l=typeof e;(l==="undefined"||l==="boolean")&&(e=null);var i=!1;if(e===null)i=!0;else switch(l){case"string":case"number":i=!0;break;case"object":switch(e.$$typeof){case Zr:case bh:i=!0}}if(i)return i=e,o=o(i),e=r===""?"."+oi(i,0):r,pu(o)?(n="",e!=null&&(n=e.replace(hu,"$&/")+"/"),Oo(o,t,n,"",function(c){return c})):o!=null&&(ia(o)&&(o=Jh(o,n+(!o.key||i&&i.key===o.key?"":(""+o.key).replace(hu,"$&/")+"/")+e)),t.push(o)),1;if(i=0,r=r===""?".":r+":",pu(e))for(var s=0;s<e.length;s++){l=e[s];var a=r+oi(l,s);i+=Oo(l,t,n,a,o)}else if(a=Xh(e),typeof a=="function")for(e=a.call(e),s=0;!(l=e.next()).done;)l=l.value,a=r+oi(l,s++),i+=Oo(l,t,n,a,o);else if(l==="object")throw t=String(e),Error("Objects are not valid as a React child (found: "+(t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t)+"). If you meant to render a collection of children, use an array instead.");return i}function ao(e,t,n){if(e==null)return e;var r=[],o=0;return Oo(e,r,"","",function(l){return t.call(n,l,o++)}),r}function qh(e){if(e._status===-1){var t=e._result;t=t(),t.then(function(n){(e._status===0||e._status===-1)&&(e._status=1,e._result=n)},function(n){(e._status===0||e._status===-1)&&(e._status=2,e._result=n)}),e._status===-1&&(e._status=0,e._result=t)}if(e._status===1)return e._result.default;throw e._result}var Se={current:null},Fo={transition:null},e0={ReactCurrentDispatcher:Se,ReactCurrentBatchConfig:Fo,ReactCurrentOwner:la};function jd(){throw Error("act(...) is not supported in production builds of React.")}M.Children={map:ao,forEach:function(e,t,n){ao(e,function(){t.apply(this,arguments)},n)},count:function(e){var t=0;return ao(e,function(){t++}),t},toArray:function(e){return ao(e,function(t){return t})||[]},only:function(e){if(!ia(e))throw Error("React.Children.only expected to receive a single React element child.");return e}};M.Component=Gn;M.Fragment=Bh;M.Profiler=Wh;M.PureComponent=ra;M.StrictMode=Uh;M.Suspense=Yh;M.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=e0;M.act=jd;M.cloneElement=function(e,t,n){if(e==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+e+".");var r=vd({},e.props),o=e.key,l=e.ref,i=e._owner;if(t!=null){if(t.ref!==void 0&&(l=t.ref,i=la.current),t.key!==void 0&&(o=""+t.key),e.type&&e.type.defaultProps)var s=e.type.defaultProps;for(a in t)kd.call(t,a)&&!Sd.hasOwnProperty(a)&&(r[a]=t[a]===void 0&&s!==void 0?s[a]:t[a])}var a=arguments.length-2;if(a===1)r.children=n;else if(1<a){s=Array(a);for(var c=0;c<a;c++)s[c]=arguments[c+2];r.children=s}return{$$typeof:Zr,type:e.type,key:o,ref:l,props:r,_owner:i}};M.createContext=function(e){return e={$$typeof:Vh,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},e.Provider={$$typeof:Hh,_context:e},e.Consumer=e};M.createElement=Cd;M.createFactory=function(e){var t=Cd.bind(null,e);return t.type=e,t};M.createRef=function(){return{current:null}};M.forwardRef=function(e){return{$$typeof:Qh,render:e}};M.isValidElement=ia;M.lazy=function(e){return{$$typeof:Kh,_payload:{_status:-1,_result:e},_init:qh}};M.memo=function(e,t){return{$$typeof:Gh,type:e,compare:t===void 0?null:t}};M.startTransition=function(e){var t=Fo.transition;Fo.transition={};try{e()}finally{Fo.transition=t}};M.unstable_act=jd;M.useCallback=function(e,t){return Se.current.useCallback(e,t)};M.useContext=function(e){return Se.current.useContext(e)};M.useDebugValue=function(){};M.useDeferredValue=function(e){return Se.current.useDeferredValue(e)};M.useEffect=function(e,t){return Se.current.useEffect(e,t)};M.useId=function(){return Se.current.useId()};M.useImperativeHandle=function(e,t,n){return Se.current.useImperativeHandle(e,t,n)};M.useInsertionEffect=function(e,t){return Se.current.useInsertionEffect(e,t)};M.useLayoutEffect=function(e,t){return Se.current.useLayoutEffect(e,t)};M.useMemo=function(e,t){return Se.current.useMemo(e,t)};M.useReducer=function(e,t,n){return Se.current.useReducer(e,t,n)};M.useRef=function(e){return Se.current.useRef(e)};M.useState=function(e){return Se.current.useState(e)};M.useSyncExternalStore=function(e,t,n){return Se.current.useSyncExternalStore(e,t,n)};M.useTransition=function(){return Se.current.useTransition()};M.version="18.3.1";gd.exports=M;var k=gd.exports;const it=Ah(k);/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var t0=k,n0=Symbol.for("react.element"),r0=Symbol.for("react.fragment"),o0=Object.prototype.hasOwnProperty,l0=t0.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,i0={key:!0,ref:!0,__self:!0,__source:!0};function Ed(e,t,n){var r,o={},l=null,i=null;n!==void 0&&(l=""+n),t.key!==void 0&&(l=""+t.key),t.ref!==void 0&&(i=t.ref);for(r in t)o0.call(t,r)&&!i0.hasOwnProperty(r)&&(o[r]=t[r]);if(e&&e.defaultProps)for(r in t=e.defaultProps,t)o[r]===void 0&&(o[r]=t[r]);return{$$typeof:n0,type:e,key:l,ref:i,props:o,_owner:l0.current}}zl.Fragment=r0;zl.jsx=Ed;zl.jsxs=Ed;md.exports=zl;var u=md.exports,Pd={exports:{}},Oe={},Rd={exports:{}},_d={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(e){function t($,L){var z=$.length;$.push(L);e:for(;0<z;){var U=z-1>>>1,D=$[U];if(0<o(D,L))$[U]=L,$[z]=D,z=U;else break e}}function n($){return $.length===0?null:$[0]}function r($){if($.length===0)return null;var L=$[0],z=$.pop();if(z!==L){$[0]=z;e:for(var U=0,D=$.length,ie=D>>>1;U<ie;){var ee=2*(U+1)-1,re=$[ee],Le=ee+1,De=$[Le];if(0>o(re,z))Le<D&&0>o(De,re)?($[U]=De,$[Le]=z,U=Le):($[U]=re,$[ee]=z,U=ee);else if(Le<D&&0>o(De,z))$[U]=De,$[Le]=z,U=Le;else break e}}return L}function o($,L){var z=$.sortIndex-L.sortIndex;return z!==0?z:$.id-L.id}if(typeof performance=="object"&&typeof performance.now=="function"){var l=performance;e.unstable_now=function(){return l.now()}}else{var i=Date,s=i.now();e.unstable_now=function(){return i.now()-s}}var a=[],c=[],h=1,p=null,m=3,x=!1,v=!1,w=!1,E=typeof setTimeout=="function"?setTimeout:null,f=typeof clearTimeout=="function"?clearTimeout:null,d=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function g($){for(var L=n(c);L!==null;){if(L.callback===null)r(c);else if(L.startTime<=$)r(c),L.sortIndex=L.expirationTime,t(a,L);else break;L=n(c)}}function S($){if(w=!1,g($),!v)if(n(a)!==null)v=!0,Et(j);else{var L=n(c);L!==null&&Xt(S,L.startTime-$)}}function j($,L){v=!1,w&&(w=!1,f(R),R=-1),x=!0;var z=m;try{for(g(L),p=n(a);p!==null&&(!(p.expirationTime>L)||$&&!W());){var U=p.callback;if(typeof U=="function"){p.callback=null,m=p.priorityLevel;var D=U(p.expirationTime<=L);L=e.unstable_now(),typeof D=="function"?p.callback=D:p===n(a)&&r(a),g(L)}else r(a);p=n(a)}if(p!==null)var ie=!0;else{var ee=n(c);ee!==null&&Xt(S,ee.startTime-L),ie=!1}return ie}finally{p=null,m=z,x=!1}}var _=!1,C=null,R=-1,O=5,T=-1;function W(){return!(e.unstable_now()-T<O)}function Ne(){if(C!==null){var $=e.unstable_now();T=$;var L=!0;try{L=C(!0,$)}finally{L?V():(_=!1,C=null)}}else _=!1}var V;if(typeof d=="function")V=function(){d(Ne)};else if(typeof MessageChannel<"u"){var je=new MessageChannel,me=je.port2;je.port1.onmessage=Ne,V=function(){me.postMessage(null)}}else V=function(){E(Ne,0)};function Et($){C=$,_||(_=!0,V())}function Xt($,L){R=E(function(){$(e.unstable_now())},L)}e.unstable_IdlePriority=5,e.unstable_ImmediatePriority=1,e.unstable_LowPriority=4,e.unstable_NormalPriority=3,e.unstable_Profiling=null,e.unstable_UserBlockingPriority=2,e.unstable_cancelCallback=function($){$.callback=null},e.unstable_continueExecution=function(){v||x||(v=!0,Et(j))},e.unstable_forceFrameRate=function($){0>$||125<$?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):O=0<$?Math.floor(1e3/$):5},e.unstable_getCurrentPriorityLevel=function(){return m},e.unstable_getFirstCallbackNode=function(){return n(a)},e.unstable_next=function($){switch(m){case 1:case 2:case 3:var L=3;break;default:L=m}var z=m;m=L;try{return $()}finally{m=z}},e.unstable_pauseExecution=function(){},e.unstable_requestPaint=function(){},e.unstable_runWithPriority=function($,L){switch($){case 1:case 2:case 3:case 4:case 5:break;default:$=3}var z=m;m=$;try{return L()}finally{m=z}},e.unstable_scheduleCallback=function($,L,z){var U=e.unstable_now();switch(typeof z=="object"&&z!==null?(z=z.delay,z=typeof z=="number"&&0<z?U+z:U):z=U,$){case 1:var D=-1;break;case 2:D=250;break;case 5:D=1073741823;break;case 4:D=1e4;break;default:D=5e3}return D=z+D,$={id:h++,callback:L,priorityLevel:$,startTime:z,expirationTime:D,sortIndex:-1},z>U?($.sortIndex=z,t(c,$),n(a)===null&&$===n(c)&&(w?(f(R),R=-1):w=!0,Xt(S,z-U))):($.sortIndex=D,t(a,$),v||x||(v=!0,Et(j))),$},e.unstable_shouldYield=W,e.unstable_wrapCallback=function($){var L=m;return function(){var z=m;m=L;try{return $.apply(this,arguments)}finally{m=z}}}})(_d);Rd.exports=_d;var s0=Rd.exports;/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var a0=k,Me=s0;function P(e){for(var t="https://reactjs.org/docs/error-decoder.html?invariant="+e,n=1;n<arguments.length;n++)t+="&args[]="+encodeURIComponent(arguments[n]);return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var $d=new Set,zr={};function hn(e,t){Dn(e,t),Dn(e+"Capture",t)}function Dn(e,t){for(zr[e]=t,e=0;e<t.length;e++)$d.add(t[e])}var vt=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),es=Object.prototype.hasOwnProperty,u0=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,mu={},gu={};function c0(e){return es.call(gu,e)?!0:es.call(mu,e)?!1:u0.test(e)?gu[e]=!0:(mu[e]=!0,!1)}function d0(e,t,n,r){if(n!==null&&n.type===0)return!1;switch(typeof t){case"function":case"symbol":return!0;case"boolean":return r?!1:n!==null?!n.acceptsBooleans:(e=e.toLowerCase().slice(0,5),e!=="data-"&&e!=="aria-");default:return!1}}function f0(e,t,n,r){if(t===null||typeof t>"u"||d0(e,t,n,r))return!0;if(r)return!1;if(n!==null)switch(n.type){case 3:return!t;case 4:return t===!1;case 5:return isNaN(t);case 6:return isNaN(t)||1>t}return!1}function Ce(e,t,n,r,o,l,i){this.acceptsBooleans=t===2||t===3||t===4,this.attributeName=r,this.attributeNamespace=o,this.mustUseProperty=n,this.propertyName=e,this.type=t,this.sanitizeURL=l,this.removeEmptyString=i}var he={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e){he[e]=new Ce(e,0,!1,e,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(e){var t=e[0];he[t]=new Ce(t,1,!1,e[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(e){he[e]=new Ce(e,2,!1,e.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(e){he[e]=new Ce(e,2,!1,e,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e){he[e]=new Ce(e,3,!1,e.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(e){he[e]=new Ce(e,3,!0,e,null,!1,!1)});["capture","download"].forEach(function(e){he[e]=new Ce(e,4,!1,e,null,!1,!1)});["cols","rows","size","span"].forEach(function(e){he[e]=new Ce(e,6,!1,e,null,!1,!1)});["rowSpan","start"].forEach(function(e){he[e]=new Ce(e,5,!1,e.toLowerCase(),null,!1,!1)});var sa=/[\-:]([a-z])/g;function aa(e){return e[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e){var t=e.replace(sa,aa);he[t]=new Ce(t,1,!1,e,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e){var t=e.replace(sa,aa);he[t]=new Ce(t,1,!1,e,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(e){var t=e.replace(sa,aa);he[t]=new Ce(t,1,!1,e,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(e){he[e]=new Ce(e,1,!1,e.toLowerCase(),null,!1,!1)});he.xlinkHref=new Ce("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(e){he[e]=new Ce(e,1,!1,e.toLowerCase(),null,!0,!0)});function ua(e,t,n,r){var o=he.hasOwnProperty(t)?he[t]:null;(o!==null?o.type!==0:r||!(2<t.length)||t[0]!=="o"&&t[0]!=="O"||t[1]!=="n"&&t[1]!=="N")&&(f0(t,n,o,r)&&(n=null),r||o===null?c0(t)&&(n===null?e.removeAttribute(t):e.setAttribute(t,""+n)):o.mustUseProperty?e[o.propertyName]=n===null?o.type===3?!1:"":n:(t=o.attributeName,r=o.attributeNamespace,n===null?e.removeAttribute(t):(o=o.type,n=o===3||o===4&&n===!0?"":""+n,r?e.setAttributeNS(r,t,n):e.setAttribute(t,n))))}var Ct=a0.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,uo=Symbol.for("react.element"),xn=Symbol.for("react.portal"),wn=Symbol.for("react.fragment"),ca=Symbol.for("react.strict_mode"),ts=Symbol.for("react.profiler"),Nd=Symbol.for("react.provider"),Ld=Symbol.for("react.context"),da=Symbol.for("react.forward_ref"),ns=Symbol.for("react.suspense"),rs=Symbol.for("react.suspense_list"),fa=Symbol.for("react.memo"),$t=Symbol.for("react.lazy"),zd=Symbol.for("react.offscreen"),yu=Symbol.iterator;function er(e){return e===null||typeof e!="object"?null:(e=yu&&e[yu]||e["@@iterator"],typeof e=="function"?e:null)}var q=Object.assign,li;function cr(e){if(li===void 0)try{throw Error()}catch(n){var t=n.stack.trim().match(/\n( *(at )?)/);li=t&&t[1]||""}return`
`+li+e}var ii=!1;function si(e,t){if(!e||ii)return"";ii=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(t)if(t=function(){throw Error()},Object.defineProperty(t.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(t,[])}catch(c){var r=c}Reflect.construct(e,[],t)}else{try{t.call()}catch(c){r=c}e.call(t.prototype)}else{try{throw Error()}catch(c){r=c}e()}}catch(c){if(c&&r&&typeof c.stack=="string"){for(var o=c.stack.split(`
`),l=r.stack.split(`
`),i=o.length-1,s=l.length-1;1<=i&&0<=s&&o[i]!==l[s];)s--;for(;1<=i&&0<=s;i--,s--)if(o[i]!==l[s]){if(i!==1||s!==1)do if(i--,s--,0>s||o[i]!==l[s]){var a=`
`+o[i].replace(" at new "," at ");return e.displayName&&a.includes("<anonymous>")&&(a=a.replace("<anonymous>",e.displayName)),a}while(1<=i&&0<=s);break}}}finally{ii=!1,Error.prepareStackTrace=n}return(e=e?e.displayName||e.name:"")?cr(e):""}function p0(e){switch(e.tag){case 5:return cr(e.type);case 16:return cr("Lazy");case 13:return cr("Suspense");case 19:return cr("SuspenseList");case 0:case 2:case 15:return e=si(e.type,!1),e;case 11:return e=si(e.type.render,!1),e;case 1:return e=si(e.type,!0),e;default:return""}}function os(e){if(e==null)return null;if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case wn:return"Fragment";case xn:return"Portal";case ts:return"Profiler";case ca:return"StrictMode";case ns:return"Suspense";case rs:return"SuspenseList"}if(typeof e=="object")switch(e.$$typeof){case Ld:return(e.displayName||"Context")+".Consumer";case Nd:return(e._context.displayName||"Context")+".Provider";case da:var t=e.render;return e=e.displayName,e||(e=t.displayName||t.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case fa:return t=e.displayName||null,t!==null?t:os(e.type)||"Memo";case $t:t=e._payload,e=e._init;try{return os(e(t))}catch{}}return null}function h0(e){var t=e.type;switch(e.tag){case 24:return"Cache";case 9:return(t.displayName||"Context")+".Consumer";case 10:return(t._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return e=t.render,e=e.displayName||e.name||"",t.displayName||(e!==""?"ForwardRef("+e+")":"ForwardRef");case 7:return"Fragment";case 5:return t;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return os(t);case 8:return t===ca?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof t=="function")return t.displayName||t.name||null;if(typeof t=="string")return t}return null}function Vt(e){switch(typeof e){case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function Td(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(t==="checkbox"||t==="radio")}function m0(e){var t=Td(e)?"checked":"value",n=Object.getOwnPropertyDescriptor(e.constructor.prototype,t),r=""+e[t];if(!e.hasOwnProperty(t)&&typeof n<"u"&&typeof n.get=="function"&&typeof n.set=="function"){var o=n.get,l=n.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return o.call(this)},set:function(i){r=""+i,l.call(this,i)}}),Object.defineProperty(e,t,{enumerable:n.enumerable}),{getValue:function(){return r},setValue:function(i){r=""+i},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function co(e){e._valueTracker||(e._valueTracker=m0(e))}function Id(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var n=t.getValue(),r="";return e&&(r=Td(e)?e.checked?"true":"false":e.value),e=r,e!==n?(t.setValue(e),!0):!1}function rl(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}function ls(e,t){var n=t.checked;return q({},t,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:n??e._wrapperState.initialChecked})}function vu(e,t){var n=t.defaultValue==null?"":t.defaultValue,r=t.checked!=null?t.checked:t.defaultChecked;n=Vt(t.value!=null?t.value:n),e._wrapperState={initialChecked:r,initialValue:n,controlled:t.type==="checkbox"||t.type==="radio"?t.checked!=null:t.value!=null}}function Md(e,t){t=t.checked,t!=null&&ua(e,"checked",t,!1)}function is(e,t){Md(e,t);var n=Vt(t.value),r=t.type;if(n!=null)r==="number"?(n===0&&e.value===""||e.value!=n)&&(e.value=""+n):e.value!==""+n&&(e.value=""+n);else if(r==="submit"||r==="reset"){e.removeAttribute("value");return}t.hasOwnProperty("value")?ss(e,t.type,n):t.hasOwnProperty("defaultValue")&&ss(e,t.type,Vt(t.defaultValue)),t.checked==null&&t.defaultChecked!=null&&(e.defaultChecked=!!t.defaultChecked)}function xu(e,t,n){if(t.hasOwnProperty("value")||t.hasOwnProperty("defaultValue")){var r=t.type;if(!(r!=="submit"&&r!=="reset"||t.value!==void 0&&t.value!==null))return;t=""+e._wrapperState.initialValue,n||t===e.value||(e.value=t),e.defaultValue=t}n=e.name,n!==""&&(e.name=""),e.defaultChecked=!!e._wrapperState.initialChecked,n!==""&&(e.name=n)}function ss(e,t,n){(t!=="number"||rl(e.ownerDocument)!==e)&&(n==null?e.defaultValue=""+e._wrapperState.initialValue:e.defaultValue!==""+n&&(e.defaultValue=""+n))}var dr=Array.isArray;function Ln(e,t,n,r){if(e=e.options,t){t={};for(var o=0;o<n.length;o++)t["$"+n[o]]=!0;for(n=0;n<e.length;n++)o=t.hasOwnProperty("$"+e[n].value),e[n].selected!==o&&(e[n].selected=o),o&&r&&(e[n].defaultSelected=!0)}else{for(n=""+Vt(n),t=null,o=0;o<e.length;o++){if(e[o].value===n){e[o].selected=!0,r&&(e[o].defaultSelected=!0);return}t!==null||e[o].disabled||(t=e[o])}t!==null&&(t.selected=!0)}}function as(e,t){if(t.dangerouslySetInnerHTML!=null)throw Error(P(91));return q({},t,{value:void 0,defaultValue:void 0,children:""+e._wrapperState.initialValue})}function wu(e,t){var n=t.value;if(n==null){if(n=t.children,t=t.defaultValue,n!=null){if(t!=null)throw Error(P(92));if(dr(n)){if(1<n.length)throw Error(P(93));n=n[0]}t=n}t==null&&(t=""),n=t}e._wrapperState={initialValue:Vt(n)}}function Od(e,t){var n=Vt(t.value),r=Vt(t.defaultValue);n!=null&&(n=""+n,n!==e.value&&(e.value=n),t.defaultValue==null&&e.defaultValue!==n&&(e.defaultValue=n)),r!=null&&(e.defaultValue=""+r)}function ku(e){var t=e.textContent;t===e._wrapperState.initialValue&&t!==""&&t!==null&&(e.value=t)}function Fd(e){switch(e){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function us(e,t){return e==null||e==="http://www.w3.org/1999/xhtml"?Fd(t):e==="http://www.w3.org/2000/svg"&&t==="foreignObject"?"http://www.w3.org/1999/xhtml":e}var fo,Dd=function(e){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(t,n,r,o){MSApp.execUnsafeLocalFunction(function(){return e(t,n,r,o)})}:e}(function(e,t){if(e.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in e)e.innerHTML=t;else{for(fo=fo||document.createElement("div"),fo.innerHTML="<svg>"+t.valueOf().toString()+"</svg>",t=fo.firstChild;e.firstChild;)e.removeChild(e.firstChild);for(;t.firstChild;)e.appendChild(t.firstChild)}});function Tr(e,t){if(t){var n=e.firstChild;if(n&&n===e.lastChild&&n.nodeType===3){n.nodeValue=t;return}}e.textContent=t}var kr={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},g0=["Webkit","ms","Moz","O"];Object.keys(kr).forEach(function(e){g0.forEach(function(t){t=t+e.charAt(0).toUpperCase()+e.substring(1),kr[t]=kr[e]})});function Ad(e,t,n){return t==null||typeof t=="boolean"||t===""?"":n||typeof t!="number"||t===0||kr.hasOwnProperty(e)&&kr[e]?(""+t).trim():t+"px"}function bd(e,t){e=e.style;for(var n in t)if(t.hasOwnProperty(n)){var r=n.indexOf("--")===0,o=Ad(n,t[n],r);n==="float"&&(n="cssFloat"),r?e.setProperty(n,o):e[n]=o}}var y0=q({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function cs(e,t){if(t){if(y0[e]&&(t.children!=null||t.dangerouslySetInnerHTML!=null))throw Error(P(137,e));if(t.dangerouslySetInnerHTML!=null){if(t.children!=null)throw Error(P(60));if(typeof t.dangerouslySetInnerHTML!="object"||!("__html"in t.dangerouslySetInnerHTML))throw Error(P(61))}if(t.style!=null&&typeof t.style!="object")throw Error(P(62))}}function ds(e,t){if(e.indexOf("-")===-1)return typeof t.is=="string";switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var fs=null;function pa(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var ps=null,zn=null,Tn=null;function Su(e){if(e=to(e)){if(typeof ps!="function")throw Error(P(280));var t=e.stateNode;t&&(t=Fl(t),ps(e.stateNode,e.type,t))}}function Bd(e){zn?Tn?Tn.push(e):Tn=[e]:zn=e}function Ud(){if(zn){var e=zn,t=Tn;if(Tn=zn=null,Su(e),t)for(e=0;e<t.length;e++)Su(t[e])}}function Wd(e,t){return e(t)}function Hd(){}var ai=!1;function Vd(e,t,n){if(ai)return e(t,n);ai=!0;try{return Wd(e,t,n)}finally{ai=!1,(zn!==null||Tn!==null)&&(Hd(),Ud())}}function Ir(e,t){var n=e.stateNode;if(n===null)return null;var r=Fl(n);if(r===null)return null;n=r[t];e:switch(t){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(r=!r.disabled)||(e=e.type,r=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!r;break e;default:e=!1}if(e)return null;if(n&&typeof n!="function")throw Error(P(231,t,typeof n));return n}var hs=!1;if(vt)try{var tr={};Object.defineProperty(tr,"passive",{get:function(){hs=!0}}),window.addEventListener("test",tr,tr),window.removeEventListener("test",tr,tr)}catch{hs=!1}function v0(e,t,n,r,o,l,i,s,a){var c=Array.prototype.slice.call(arguments,3);try{t.apply(n,c)}catch(h){this.onError(h)}}var Sr=!1,ol=null,ll=!1,ms=null,x0={onError:function(e){Sr=!0,ol=e}};function w0(e,t,n,r,o,l,i,s,a){Sr=!1,ol=null,v0.apply(x0,arguments)}function k0(e,t,n,r,o,l,i,s,a){if(w0.apply(this,arguments),Sr){if(Sr){var c=ol;Sr=!1,ol=null}else throw Error(P(198));ll||(ll=!0,ms=c)}}function mn(e){var t=e,n=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do t=e,t.flags&4098&&(n=t.return),e=t.return;while(e)}return t.tag===3?n:null}function Qd(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function Cu(e){if(mn(e)!==e)throw Error(P(188))}function S0(e){var t=e.alternate;if(!t){if(t=mn(e),t===null)throw Error(P(188));return t!==e?null:e}for(var n=e,r=t;;){var o=n.return;if(o===null)break;var l=o.alternate;if(l===null){if(r=o.return,r!==null){n=r;continue}break}if(o.child===l.child){for(l=o.child;l;){if(l===n)return Cu(o),e;if(l===r)return Cu(o),t;l=l.sibling}throw Error(P(188))}if(n.return!==r.return)n=o,r=l;else{for(var i=!1,s=o.child;s;){if(s===n){i=!0,n=o,r=l;break}if(s===r){i=!0,r=o,n=l;break}s=s.sibling}if(!i){for(s=l.child;s;){if(s===n){i=!0,n=l,r=o;break}if(s===r){i=!0,r=l,n=o;break}s=s.sibling}if(!i)throw Error(P(189))}}if(n.alternate!==r)throw Error(P(190))}if(n.tag!==3)throw Error(P(188));return n.stateNode.current===n?e:t}function Yd(e){return e=S0(e),e!==null?Gd(e):null}function Gd(e){if(e.tag===5||e.tag===6)return e;for(e=e.child;e!==null;){var t=Gd(e);if(t!==null)return t;e=e.sibling}return null}var Kd=Me.unstable_scheduleCallback,ju=Me.unstable_cancelCallback,C0=Me.unstable_shouldYield,j0=Me.unstable_requestPaint,ne=Me.unstable_now,E0=Me.unstable_getCurrentPriorityLevel,ha=Me.unstable_ImmediatePriority,Xd=Me.unstable_UserBlockingPriority,il=Me.unstable_NormalPriority,P0=Me.unstable_LowPriority,Jd=Me.unstable_IdlePriority,Tl=null,st=null;function R0(e){if(st&&typeof st.onCommitFiberRoot=="function")try{st.onCommitFiberRoot(Tl,e,void 0,(e.current.flags&128)===128)}catch{}}var Ze=Math.clz32?Math.clz32:N0,_0=Math.log,$0=Math.LN2;function N0(e){return e>>>=0,e===0?32:31-(_0(e)/$0|0)|0}var po=64,ho=4194304;function fr(e){switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return e&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return e}}function sl(e,t){var n=e.pendingLanes;if(n===0)return 0;var r=0,o=e.suspendedLanes,l=e.pingedLanes,i=n&268435455;if(i!==0){var s=i&~o;s!==0?r=fr(s):(l&=i,l!==0&&(r=fr(l)))}else i=n&~o,i!==0?r=fr(i):l!==0&&(r=fr(l));if(r===0)return 0;if(t!==0&&t!==r&&!(t&o)&&(o=r&-r,l=t&-t,o>=l||o===16&&(l&4194240)!==0))return t;if(r&4&&(r|=n&16),t=e.entangledLanes,t!==0)for(e=e.entanglements,t&=r;0<t;)n=31-Ze(t),o=1<<n,r|=e[n],t&=~o;return r}function L0(e,t){switch(e){case 1:case 2:case 4:return t+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function z0(e,t){for(var n=e.suspendedLanes,r=e.pingedLanes,o=e.expirationTimes,l=e.pendingLanes;0<l;){var i=31-Ze(l),s=1<<i,a=o[i];a===-1?(!(s&n)||s&r)&&(o[i]=L0(s,t)):a<=t&&(e.expiredLanes|=s),l&=~s}}function gs(e){return e=e.pendingLanes&-1073741825,e!==0?e:e&1073741824?1073741824:0}function Zd(){var e=po;return po<<=1,!(po&4194240)&&(po=64),e}function ui(e){for(var t=[],n=0;31>n;n++)t.push(e);return t}function qr(e,t,n){e.pendingLanes|=t,t!==536870912&&(e.suspendedLanes=0,e.pingedLanes=0),e=e.eventTimes,t=31-Ze(t),e[t]=n}function T0(e,t){var n=e.pendingLanes&~t;e.pendingLanes=t,e.suspendedLanes=0,e.pingedLanes=0,e.expiredLanes&=t,e.mutableReadLanes&=t,e.entangledLanes&=t,t=e.entanglements;var r=e.eventTimes;for(e=e.expirationTimes;0<n;){var o=31-Ze(n),l=1<<o;t[o]=0,r[o]=-1,e[o]=-1,n&=~l}}function ma(e,t){var n=e.entangledLanes|=t;for(e=e.entanglements;n;){var r=31-Ze(n),o=1<<r;o&t|e[r]&t&&(e[r]|=t),n&=~o}}var B=0;function qd(e){return e&=-e,1<e?4<e?e&268435455?16:536870912:4:1}var ef,ga,tf,nf,rf,ys=!1,mo=[],Ot=null,Ft=null,Dt=null,Mr=new Map,Or=new Map,Lt=[],I0="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function Eu(e,t){switch(e){case"focusin":case"focusout":Ot=null;break;case"dragenter":case"dragleave":Ft=null;break;case"mouseover":case"mouseout":Dt=null;break;case"pointerover":case"pointerout":Mr.delete(t.pointerId);break;case"gotpointercapture":case"lostpointercapture":Or.delete(t.pointerId)}}function nr(e,t,n,r,o,l){return e===null||e.nativeEvent!==l?(e={blockedOn:t,domEventName:n,eventSystemFlags:r,nativeEvent:l,targetContainers:[o]},t!==null&&(t=to(t),t!==null&&ga(t)),e):(e.eventSystemFlags|=r,t=e.targetContainers,o!==null&&t.indexOf(o)===-1&&t.push(o),e)}function M0(e,t,n,r,o){switch(t){case"focusin":return Ot=nr(Ot,e,t,n,r,o),!0;case"dragenter":return Ft=nr(Ft,e,t,n,r,o),!0;case"mouseover":return Dt=nr(Dt,e,t,n,r,o),!0;case"pointerover":var l=o.pointerId;return Mr.set(l,nr(Mr.get(l)||null,e,t,n,r,o)),!0;case"gotpointercapture":return l=o.pointerId,Or.set(l,nr(Or.get(l)||null,e,t,n,r,o)),!0}return!1}function of(e){var t=en(e.target);if(t!==null){var n=mn(t);if(n!==null){if(t=n.tag,t===13){if(t=Qd(n),t!==null){e.blockedOn=t,rf(e.priority,function(){tf(n)});return}}else if(t===3&&n.stateNode.current.memoizedState.isDehydrated){e.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}e.blockedOn=null}function Do(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var n=vs(e.domEventName,e.eventSystemFlags,t[0],e.nativeEvent);if(n===null){n=e.nativeEvent;var r=new n.constructor(n.type,n);fs=r,n.target.dispatchEvent(r),fs=null}else return t=to(n),t!==null&&ga(t),e.blockedOn=n,!1;t.shift()}return!0}function Pu(e,t,n){Do(e)&&n.delete(t)}function O0(){ys=!1,Ot!==null&&Do(Ot)&&(Ot=null),Ft!==null&&Do(Ft)&&(Ft=null),Dt!==null&&Do(Dt)&&(Dt=null),Mr.forEach(Pu),Or.forEach(Pu)}function rr(e,t){e.blockedOn===t&&(e.blockedOn=null,ys||(ys=!0,Me.unstable_scheduleCallback(Me.unstable_NormalPriority,O0)))}function Fr(e){function t(o){return rr(o,e)}if(0<mo.length){rr(mo[0],e);for(var n=1;n<mo.length;n++){var r=mo[n];r.blockedOn===e&&(r.blockedOn=null)}}for(Ot!==null&&rr(Ot,e),Ft!==null&&rr(Ft,e),Dt!==null&&rr(Dt,e),Mr.forEach(t),Or.forEach(t),n=0;n<Lt.length;n++)r=Lt[n],r.blockedOn===e&&(r.blockedOn=null);for(;0<Lt.length&&(n=Lt[0],n.blockedOn===null);)of(n),n.blockedOn===null&&Lt.shift()}var In=Ct.ReactCurrentBatchConfig,al=!0;function F0(e,t,n,r){var o=B,l=In.transition;In.transition=null;try{B=1,ya(e,t,n,r)}finally{B=o,In.transition=l}}function D0(e,t,n,r){var o=B,l=In.transition;In.transition=null;try{B=4,ya(e,t,n,r)}finally{B=o,In.transition=l}}function ya(e,t,n,r){if(al){var o=vs(e,t,n,r);if(o===null)xi(e,t,r,ul,n),Eu(e,r);else if(M0(o,e,t,n,r))r.stopPropagation();else if(Eu(e,r),t&4&&-1<I0.indexOf(e)){for(;o!==null;){var l=to(o);if(l!==null&&ef(l),l=vs(e,t,n,r),l===null&&xi(e,t,r,ul,n),l===o)break;o=l}o!==null&&r.stopPropagation()}else xi(e,t,r,null,n)}}var ul=null;function vs(e,t,n,r){if(ul=null,e=pa(r),e=en(e),e!==null)if(t=mn(e),t===null)e=null;else if(n=t.tag,n===13){if(e=Qd(t),e!==null)return e;e=null}else if(n===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null);return ul=e,null}function lf(e){switch(e){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(E0()){case ha:return 1;case Xd:return 4;case il:case P0:return 16;case Jd:return 536870912;default:return 16}default:return 16}}var Tt=null,va=null,Ao=null;function sf(){if(Ao)return Ao;var e,t=va,n=t.length,r,o="value"in Tt?Tt.value:Tt.textContent,l=o.length;for(e=0;e<n&&t[e]===o[e];e++);var i=n-e;for(r=1;r<=i&&t[n-r]===o[l-r];r++);return Ao=o.slice(e,1<r?1-r:void 0)}function bo(e){var t=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function go(){return!0}function Ru(){return!1}function Fe(e){function t(n,r,o,l,i){this._reactName=n,this._targetInst=o,this.type=r,this.nativeEvent=l,this.target=i,this.currentTarget=null;for(var s in e)e.hasOwnProperty(s)&&(n=e[s],this[s]=n?n(l):l[s]);return this.isDefaultPrevented=(l.defaultPrevented!=null?l.defaultPrevented:l.returnValue===!1)?go:Ru,this.isPropagationStopped=Ru,this}return q(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=go)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=go)},persist:function(){},isPersistent:go}),t}var Kn={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},xa=Fe(Kn),eo=q({},Kn,{view:0,detail:0}),A0=Fe(eo),ci,di,or,Il=q({},eo,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:wa,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==or&&(or&&e.type==="mousemove"?(ci=e.screenX-or.screenX,di=e.screenY-or.screenY):di=ci=0,or=e),ci)},movementY:function(e){return"movementY"in e?e.movementY:di}}),_u=Fe(Il),b0=q({},Il,{dataTransfer:0}),B0=Fe(b0),U0=q({},eo,{relatedTarget:0}),fi=Fe(U0),W0=q({},Kn,{animationName:0,elapsedTime:0,pseudoElement:0}),H0=Fe(W0),V0=q({},Kn,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),Q0=Fe(V0),Y0=q({},Kn,{data:0}),$u=Fe(Y0),G0={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},K0={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},X0={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function J0(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=X0[e])?!!t[e]:!1}function wa(){return J0}var Z0=q({},eo,{key:function(e){if(e.key){var t=G0[e.key]||e.key;if(t!=="Unidentified")return t}return e.type==="keypress"?(e=bo(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?K0[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:wa,charCode:function(e){return e.type==="keypress"?bo(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?bo(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),q0=Fe(Z0),em=q({},Il,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),Nu=Fe(em),tm=q({},eo,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:wa}),nm=Fe(tm),rm=q({},Kn,{propertyName:0,elapsedTime:0,pseudoElement:0}),om=Fe(rm),lm=q({},Il,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),im=Fe(lm),sm=[9,13,27,32],ka=vt&&"CompositionEvent"in window,Cr=null;vt&&"documentMode"in document&&(Cr=document.documentMode);var am=vt&&"TextEvent"in window&&!Cr,af=vt&&(!ka||Cr&&8<Cr&&11>=Cr),Lu=" ",zu=!1;function uf(e,t){switch(e){case"keyup":return sm.indexOf(t.keyCode)!==-1;case"keydown":return t.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function cf(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var kn=!1;function um(e,t){switch(e){case"compositionend":return cf(t);case"keypress":return t.which!==32?null:(zu=!0,Lu);case"textInput":return e=t.data,e===Lu&&zu?null:e;default:return null}}function cm(e,t){if(kn)return e==="compositionend"||!ka&&uf(e,t)?(e=sf(),Ao=va=Tt=null,kn=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case"compositionend":return af&&t.locale!=="ko"?null:t.data;default:return null}}var dm={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Tu(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t==="input"?!!dm[e.type]:t==="textarea"}function df(e,t,n,r){Bd(r),t=cl(t,"onChange"),0<t.length&&(n=new xa("onChange","change",null,n,r),e.push({event:n,listeners:t}))}var jr=null,Dr=null;function fm(e){Sf(e,0)}function Ml(e){var t=jn(e);if(Id(t))return e}function pm(e,t){if(e==="change")return t}var ff=!1;if(vt){var pi;if(vt){var hi="oninput"in document;if(!hi){var Iu=document.createElement("div");Iu.setAttribute("oninput","return;"),hi=typeof Iu.oninput=="function"}pi=hi}else pi=!1;ff=pi&&(!document.documentMode||9<document.documentMode)}function Mu(){jr&&(jr.detachEvent("onpropertychange",pf),Dr=jr=null)}function pf(e){if(e.propertyName==="value"&&Ml(Dr)){var t=[];df(t,Dr,e,pa(e)),Vd(fm,t)}}function hm(e,t,n){e==="focusin"?(Mu(),jr=t,Dr=n,jr.attachEvent("onpropertychange",pf)):e==="focusout"&&Mu()}function mm(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return Ml(Dr)}function gm(e,t){if(e==="click")return Ml(t)}function ym(e,t){if(e==="input"||e==="change")return Ml(t)}function vm(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var nt=typeof Object.is=="function"?Object.is:vm;function Ar(e,t){if(nt(e,t))return!0;if(typeof e!="object"||e===null||typeof t!="object"||t===null)return!1;var n=Object.keys(e),r=Object.keys(t);if(n.length!==r.length)return!1;for(r=0;r<n.length;r++){var o=n[r];if(!es.call(t,o)||!nt(e[o],t[o]))return!1}return!0}function Ou(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function Fu(e,t){var n=Ou(e);e=0;for(var r;n;){if(n.nodeType===3){if(r=e+n.textContent.length,e<=t&&r>=t)return{node:n,offset:t-e};e=r}e:{for(;n;){if(n.nextSibling){n=n.nextSibling;break e}n=n.parentNode}n=void 0}n=Ou(n)}}function hf(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?hf(e,t.parentNode):"contains"in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function mf(){for(var e=window,t=rl();t instanceof e.HTMLIFrameElement;){try{var n=typeof t.contentWindow.location.href=="string"}catch{n=!1}if(n)e=t.contentWindow;else break;t=rl(e.document)}return t}function Sa(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||t==="textarea"||e.contentEditable==="true")}function xm(e){var t=mf(),n=e.focusedElem,r=e.selectionRange;if(t!==n&&n&&n.ownerDocument&&hf(n.ownerDocument.documentElement,n)){if(r!==null&&Sa(n)){if(t=r.start,e=r.end,e===void 0&&(e=t),"selectionStart"in n)n.selectionStart=t,n.selectionEnd=Math.min(e,n.value.length);else if(e=(t=n.ownerDocument||document)&&t.defaultView||window,e.getSelection){e=e.getSelection();var o=n.textContent.length,l=Math.min(r.start,o);r=r.end===void 0?l:Math.min(r.end,o),!e.extend&&l>r&&(o=r,r=l,l=o),o=Fu(n,l);var i=Fu(n,r);o&&i&&(e.rangeCount!==1||e.anchorNode!==o.node||e.anchorOffset!==o.offset||e.focusNode!==i.node||e.focusOffset!==i.offset)&&(t=t.createRange(),t.setStart(o.node,o.offset),e.removeAllRanges(),l>r?(e.addRange(t),e.extend(i.node,i.offset)):(t.setEnd(i.node,i.offset),e.addRange(t)))}}for(t=[],e=n;e=e.parentNode;)e.nodeType===1&&t.push({element:e,left:e.scrollLeft,top:e.scrollTop});for(typeof n.focus=="function"&&n.focus(),n=0;n<t.length;n++)e=t[n],e.element.scrollLeft=e.left,e.element.scrollTop=e.top}}var wm=vt&&"documentMode"in document&&11>=document.documentMode,Sn=null,xs=null,Er=null,ws=!1;function Du(e,t,n){var r=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;ws||Sn==null||Sn!==rl(r)||(r=Sn,"selectionStart"in r&&Sa(r)?r={start:r.selectionStart,end:r.selectionEnd}:(r=(r.ownerDocument&&r.ownerDocument.defaultView||window).getSelection(),r={anchorNode:r.anchorNode,anchorOffset:r.anchorOffset,focusNode:r.focusNode,focusOffset:r.focusOffset}),Er&&Ar(Er,r)||(Er=r,r=cl(xs,"onSelect"),0<r.length&&(t=new xa("onSelect","select",null,t,n),e.push({event:t,listeners:r}),t.target=Sn)))}function yo(e,t){var n={};return n[e.toLowerCase()]=t.toLowerCase(),n["Webkit"+e]="webkit"+t,n["Moz"+e]="moz"+t,n}var Cn={animationend:yo("Animation","AnimationEnd"),animationiteration:yo("Animation","AnimationIteration"),animationstart:yo("Animation","AnimationStart"),transitionend:yo("Transition","TransitionEnd")},mi={},gf={};vt&&(gf=document.createElement("div").style,"AnimationEvent"in window||(delete Cn.animationend.animation,delete Cn.animationiteration.animation,delete Cn.animationstart.animation),"TransitionEvent"in window||delete Cn.transitionend.transition);function Ol(e){if(mi[e])return mi[e];if(!Cn[e])return e;var t=Cn[e],n;for(n in t)if(t.hasOwnProperty(n)&&n in gf)return mi[e]=t[n];return e}var yf=Ol("animationend"),vf=Ol("animationiteration"),xf=Ol("animationstart"),wf=Ol("transitionend"),kf=new Map,Au="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function Yt(e,t){kf.set(e,t),hn(t,[e])}for(var gi=0;gi<Au.length;gi++){var yi=Au[gi],km=yi.toLowerCase(),Sm=yi[0].toUpperCase()+yi.slice(1);Yt(km,"on"+Sm)}Yt(yf,"onAnimationEnd");Yt(vf,"onAnimationIteration");Yt(xf,"onAnimationStart");Yt("dblclick","onDoubleClick");Yt("focusin","onFocus");Yt("focusout","onBlur");Yt(wf,"onTransitionEnd");Dn("onMouseEnter",["mouseout","mouseover"]);Dn("onMouseLeave",["mouseout","mouseover"]);Dn("onPointerEnter",["pointerout","pointerover"]);Dn("onPointerLeave",["pointerout","pointerover"]);hn("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));hn("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));hn("onBeforeInput",["compositionend","keypress","textInput","paste"]);hn("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));hn("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));hn("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var pr="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),Cm=new Set("cancel close invalid load scroll toggle".split(" ").concat(pr));function bu(e,t,n){var r=e.type||"unknown-event";e.currentTarget=n,k0(r,t,void 0,e),e.currentTarget=null}function Sf(e,t){t=(t&4)!==0;for(var n=0;n<e.length;n++){var r=e[n],o=r.event;r=r.listeners;e:{var l=void 0;if(t)for(var i=r.length-1;0<=i;i--){var s=r[i],a=s.instance,c=s.currentTarget;if(s=s.listener,a!==l&&o.isPropagationStopped())break e;bu(o,s,c),l=a}else for(i=0;i<r.length;i++){if(s=r[i],a=s.instance,c=s.currentTarget,s=s.listener,a!==l&&o.isPropagationStopped())break e;bu(o,s,c),l=a}}}if(ll)throw e=ms,ll=!1,ms=null,e}function Q(e,t){var n=t[Es];n===void 0&&(n=t[Es]=new Set);var r=e+"__bubble";n.has(r)||(Cf(t,e,2,!1),n.add(r))}function vi(e,t,n){var r=0;t&&(r|=4),Cf(n,e,r,t)}var vo="_reactListening"+Math.random().toString(36).slice(2);function br(e){if(!e[vo]){e[vo]=!0,$d.forEach(function(n){n!=="selectionchange"&&(Cm.has(n)||vi(n,!1,e),vi(n,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[vo]||(t[vo]=!0,vi("selectionchange",!1,t))}}function Cf(e,t,n,r){switch(lf(t)){case 1:var o=F0;break;case 4:o=D0;break;default:o=ya}n=o.bind(null,t,n,e),o=void 0,!hs||t!=="touchstart"&&t!=="touchmove"&&t!=="wheel"||(o=!0),r?o!==void 0?e.addEventListener(t,n,{capture:!0,passive:o}):e.addEventListener(t,n,!0):o!==void 0?e.addEventListener(t,n,{passive:o}):e.addEventListener(t,n,!1)}function xi(e,t,n,r,o){var l=r;if(!(t&1)&&!(t&2)&&r!==null)e:for(;;){if(r===null)return;var i=r.tag;if(i===3||i===4){var s=r.stateNode.containerInfo;if(s===o||s.nodeType===8&&s.parentNode===o)break;if(i===4)for(i=r.return;i!==null;){var a=i.tag;if((a===3||a===4)&&(a=i.stateNode.containerInfo,a===o||a.nodeType===8&&a.parentNode===o))return;i=i.return}for(;s!==null;){if(i=en(s),i===null)return;if(a=i.tag,a===5||a===6){r=l=i;continue e}s=s.parentNode}}r=r.return}Vd(function(){var c=l,h=pa(n),p=[];e:{var m=kf.get(e);if(m!==void 0){var x=xa,v=e;switch(e){case"keypress":if(bo(n)===0)break e;case"keydown":case"keyup":x=q0;break;case"focusin":v="focus",x=fi;break;case"focusout":v="blur",x=fi;break;case"beforeblur":case"afterblur":x=fi;break;case"click":if(n.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":x=_u;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":x=B0;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":x=nm;break;case yf:case vf:case xf:x=H0;break;case wf:x=om;break;case"scroll":x=A0;break;case"wheel":x=im;break;case"copy":case"cut":case"paste":x=Q0;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":x=Nu}var w=(t&4)!==0,E=!w&&e==="scroll",f=w?m!==null?m+"Capture":null:m;w=[];for(var d=c,g;d!==null;){g=d;var S=g.stateNode;if(g.tag===5&&S!==null&&(g=S,f!==null&&(S=Ir(d,f),S!=null&&w.push(Br(d,S,g)))),E)break;d=d.return}0<w.length&&(m=new x(m,v,null,n,h),p.push({event:m,listeners:w}))}}if(!(t&7)){e:{if(m=e==="mouseover"||e==="pointerover",x=e==="mouseout"||e==="pointerout",m&&n!==fs&&(v=n.relatedTarget||n.fromElement)&&(en(v)||v[xt]))break e;if((x||m)&&(m=h.window===h?h:(m=h.ownerDocument)?m.defaultView||m.parentWindow:window,x?(v=n.relatedTarget||n.toElement,x=c,v=v?en(v):null,v!==null&&(E=mn(v),v!==E||v.tag!==5&&v.tag!==6)&&(v=null)):(x=null,v=c),x!==v)){if(w=_u,S="onMouseLeave",f="onMouseEnter",d="mouse",(e==="pointerout"||e==="pointerover")&&(w=Nu,S="onPointerLeave",f="onPointerEnter",d="pointer"),E=x==null?m:jn(x),g=v==null?m:jn(v),m=new w(S,d+"leave",x,n,h),m.target=E,m.relatedTarget=g,S=null,en(h)===c&&(w=new w(f,d+"enter",v,n,h),w.target=g,w.relatedTarget=E,S=w),E=S,x&&v)t:{for(w=x,f=v,d=0,g=w;g;g=gn(g))d++;for(g=0,S=f;S;S=gn(S))g++;for(;0<d-g;)w=gn(w),d--;for(;0<g-d;)f=gn(f),g--;for(;d--;){if(w===f||f!==null&&w===f.alternate)break t;w=gn(w),f=gn(f)}w=null}else w=null;x!==null&&Bu(p,m,x,w,!1),v!==null&&E!==null&&Bu(p,E,v,w,!0)}}e:{if(m=c?jn(c):window,x=m.nodeName&&m.nodeName.toLowerCase(),x==="select"||x==="input"&&m.type==="file")var j=pm;else if(Tu(m))if(ff)j=ym;else{j=mm;var _=hm}else(x=m.nodeName)&&x.toLowerCase()==="input"&&(m.type==="checkbox"||m.type==="radio")&&(j=gm);if(j&&(j=j(e,c))){df(p,j,n,h);break e}_&&_(e,m,c),e==="focusout"&&(_=m._wrapperState)&&_.controlled&&m.type==="number"&&ss(m,"number",m.value)}switch(_=c?jn(c):window,e){case"focusin":(Tu(_)||_.contentEditable==="true")&&(Sn=_,xs=c,Er=null);break;case"focusout":Er=xs=Sn=null;break;case"mousedown":ws=!0;break;case"contextmenu":case"mouseup":case"dragend":ws=!1,Du(p,n,h);break;case"selectionchange":if(wm)break;case"keydown":case"keyup":Du(p,n,h)}var C;if(ka)e:{switch(e){case"compositionstart":var R="onCompositionStart";break e;case"compositionend":R="onCompositionEnd";break e;case"compositionupdate":R="onCompositionUpdate";break e}R=void 0}else kn?uf(e,n)&&(R="onCompositionEnd"):e==="keydown"&&n.keyCode===229&&(R="onCompositionStart");R&&(af&&n.locale!=="ko"&&(kn||R!=="onCompositionStart"?R==="onCompositionEnd"&&kn&&(C=sf()):(Tt=h,va="value"in Tt?Tt.value:Tt.textContent,kn=!0)),_=cl(c,R),0<_.length&&(R=new $u(R,e,null,n,h),p.push({event:R,listeners:_}),C?R.data=C:(C=cf(n),C!==null&&(R.data=C)))),(C=am?um(e,n):cm(e,n))&&(c=cl(c,"onBeforeInput"),0<c.length&&(h=new $u("onBeforeInput","beforeinput",null,n,h),p.push({event:h,listeners:c}),h.data=C))}Sf(p,t)})}function Br(e,t,n){return{instance:e,listener:t,currentTarget:n}}function cl(e,t){for(var n=t+"Capture",r=[];e!==null;){var o=e,l=o.stateNode;o.tag===5&&l!==null&&(o=l,l=Ir(e,n),l!=null&&r.unshift(Br(e,l,o)),l=Ir(e,t),l!=null&&r.push(Br(e,l,o))),e=e.return}return r}function gn(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5);return e||null}function Bu(e,t,n,r,o){for(var l=t._reactName,i=[];n!==null&&n!==r;){var s=n,a=s.alternate,c=s.stateNode;if(a!==null&&a===r)break;s.tag===5&&c!==null&&(s=c,o?(a=Ir(n,l),a!=null&&i.unshift(Br(n,a,s))):o||(a=Ir(n,l),a!=null&&i.push(Br(n,a,s)))),n=n.return}i.length!==0&&e.push({event:t,listeners:i})}var jm=/\r\n?/g,Em=/\u0000|\uFFFD/g;function Uu(e){return(typeof e=="string"?e:""+e).replace(jm,`
`).replace(Em,"")}function xo(e,t,n){if(t=Uu(t),Uu(e)!==t&&n)throw Error(P(425))}function dl(){}var ks=null,Ss=null;function Cs(e,t){return e==="textarea"||e==="noscript"||typeof t.children=="string"||typeof t.children=="number"||typeof t.dangerouslySetInnerHTML=="object"&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var js=typeof setTimeout=="function"?setTimeout:void 0,Pm=typeof clearTimeout=="function"?clearTimeout:void 0,Wu=typeof Promise=="function"?Promise:void 0,Rm=typeof queueMicrotask=="function"?queueMicrotask:typeof Wu<"u"?function(e){return Wu.resolve(null).then(e).catch(_m)}:js;function _m(e){setTimeout(function(){throw e})}function wi(e,t){var n=t,r=0;do{var o=n.nextSibling;if(e.removeChild(n),o&&o.nodeType===8)if(n=o.data,n==="/$"){if(r===0){e.removeChild(o),Fr(t);return}r--}else n!=="$"&&n!=="$?"&&n!=="$!"||r++;n=o}while(n);Fr(t)}function At(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t==="$"||t==="$!"||t==="$?")break;if(t==="/$")return null}}return e}function Hu(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="$"||n==="$!"||n==="$?"){if(t===0)return e;t--}else n==="/$"&&t++}e=e.previousSibling}return null}var Xn=Math.random().toString(36).slice(2),lt="__reactFiber$"+Xn,Ur="__reactProps$"+Xn,xt="__reactContainer$"+Xn,Es="__reactEvents$"+Xn,$m="__reactListeners$"+Xn,Nm="__reactHandles$"+Xn;function en(e){var t=e[lt];if(t)return t;for(var n=e.parentNode;n;){if(t=n[xt]||n[lt]){if(n=t.alternate,t.child!==null||n!==null&&n.child!==null)for(e=Hu(e);e!==null;){if(n=e[lt])return n;e=Hu(e)}return t}e=n,n=e.parentNode}return null}function to(e){return e=e[lt]||e[xt],!e||e.tag!==5&&e.tag!==6&&e.tag!==13&&e.tag!==3?null:e}function jn(e){if(e.tag===5||e.tag===6)return e.stateNode;throw Error(P(33))}function Fl(e){return e[Ur]||null}var Ps=[],En=-1;function Gt(e){return{current:e}}function G(e){0>En||(e.current=Ps[En],Ps[En]=null,En--)}function H(e,t){En++,Ps[En]=e.current,e.current=t}var Qt={},xe=Gt(Qt),Re=Gt(!1),an=Qt;function An(e,t){var n=e.type.contextTypes;if(!n)return Qt;var r=e.stateNode;if(r&&r.__reactInternalMemoizedUnmaskedChildContext===t)return r.__reactInternalMemoizedMaskedChildContext;var o={},l;for(l in n)o[l]=t[l];return r&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=t,e.__reactInternalMemoizedMaskedChildContext=o),o}function _e(e){return e=e.childContextTypes,e!=null}function fl(){G(Re),G(xe)}function Vu(e,t,n){if(xe.current!==Qt)throw Error(P(168));H(xe,t),H(Re,n)}function jf(e,t,n){var r=e.stateNode;if(t=t.childContextTypes,typeof r.getChildContext!="function")return n;r=r.getChildContext();for(var o in r)if(!(o in t))throw Error(P(108,h0(e)||"Unknown",o));return q({},n,r)}function pl(e){return e=(e=e.stateNode)&&e.__reactInternalMemoizedMergedChildContext||Qt,an=xe.current,H(xe,e),H(Re,Re.current),!0}function Qu(e,t,n){var r=e.stateNode;if(!r)throw Error(P(169));n?(e=jf(e,t,an),r.__reactInternalMemoizedMergedChildContext=e,G(Re),G(xe),H(xe,e)):G(Re),H(Re,n)}var pt=null,Dl=!1,ki=!1;function Ef(e){pt===null?pt=[e]:pt.push(e)}function Lm(e){Dl=!0,Ef(e)}function Kt(){if(!ki&&pt!==null){ki=!0;var e=0,t=B;try{var n=pt;for(B=1;e<n.length;e++){var r=n[e];do r=r(!0);while(r!==null)}pt=null,Dl=!1}catch(o){throw pt!==null&&(pt=pt.slice(e+1)),Kd(ha,Kt),o}finally{B=t,ki=!1}}return null}var Pn=[],Rn=0,hl=null,ml=0,Ae=[],be=0,un=null,ht=1,mt="";function Jt(e,t){Pn[Rn++]=ml,Pn[Rn++]=hl,hl=e,ml=t}function Pf(e,t,n){Ae[be++]=ht,Ae[be++]=mt,Ae[be++]=un,un=e;var r=ht;e=mt;var o=32-Ze(r)-1;r&=~(1<<o),n+=1;var l=32-Ze(t)+o;if(30<l){var i=o-o%5;l=(r&(1<<i)-1).toString(32),r>>=i,o-=i,ht=1<<32-Ze(t)+o|n<<o|r,mt=l+e}else ht=1<<l|n<<o|r,mt=e}function Ca(e){e.return!==null&&(Jt(e,1),Pf(e,1,0))}function ja(e){for(;e===hl;)hl=Pn[--Rn],Pn[Rn]=null,ml=Pn[--Rn],Pn[Rn]=null;for(;e===un;)un=Ae[--be],Ae[be]=null,mt=Ae[--be],Ae[be]=null,ht=Ae[--be],Ae[be]=null}var Ie=null,Te=null,K=!1,Je=null;function Rf(e,t){var n=Be(5,null,null,0);n.elementType="DELETED",n.stateNode=t,n.return=e,t=e.deletions,t===null?(e.deletions=[n],e.flags|=16):t.push(n)}function Yu(e,t){switch(e.tag){case 5:var n=e.type;return t=t.nodeType!==1||n.toLowerCase()!==t.nodeName.toLowerCase()?null:t,t!==null?(e.stateNode=t,Ie=e,Te=At(t.firstChild),!0):!1;case 6:return t=e.pendingProps===""||t.nodeType!==3?null:t,t!==null?(e.stateNode=t,Ie=e,Te=null,!0):!1;case 13:return t=t.nodeType!==8?null:t,t!==null?(n=un!==null?{id:ht,overflow:mt}:null,e.memoizedState={dehydrated:t,treeContext:n,retryLane:1073741824},n=Be(18,null,null,0),n.stateNode=t,n.return=e,e.child=n,Ie=e,Te=null,!0):!1;default:return!1}}function Rs(e){return(e.mode&1)!==0&&(e.flags&128)===0}function _s(e){if(K){var t=Te;if(t){var n=t;if(!Yu(e,t)){if(Rs(e))throw Error(P(418));t=At(n.nextSibling);var r=Ie;t&&Yu(e,t)?Rf(r,n):(e.flags=e.flags&-4097|2,K=!1,Ie=e)}}else{if(Rs(e))throw Error(P(418));e.flags=e.flags&-4097|2,K=!1,Ie=e}}}function Gu(e){for(e=e.return;e!==null&&e.tag!==5&&e.tag!==3&&e.tag!==13;)e=e.return;Ie=e}function wo(e){if(e!==Ie)return!1;if(!K)return Gu(e),K=!0,!1;var t;if((t=e.tag!==3)&&!(t=e.tag!==5)&&(t=e.type,t=t!=="head"&&t!=="body"&&!Cs(e.type,e.memoizedProps)),t&&(t=Te)){if(Rs(e))throw _f(),Error(P(418));for(;t;)Rf(e,t),t=At(t.nextSibling)}if(Gu(e),e.tag===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(P(317));e:{for(e=e.nextSibling,t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="/$"){if(t===0){Te=At(e.nextSibling);break e}t--}else n!=="$"&&n!=="$!"&&n!=="$?"||t++}e=e.nextSibling}Te=null}}else Te=Ie?At(e.stateNode.nextSibling):null;return!0}function _f(){for(var e=Te;e;)e=At(e.nextSibling)}function bn(){Te=Ie=null,K=!1}function Ea(e){Je===null?Je=[e]:Je.push(e)}var zm=Ct.ReactCurrentBatchConfig;function lr(e,t,n){if(e=n.ref,e!==null&&typeof e!="function"&&typeof e!="object"){if(n._owner){if(n=n._owner,n){if(n.tag!==1)throw Error(P(309));var r=n.stateNode}if(!r)throw Error(P(147,e));var o=r,l=""+e;return t!==null&&t.ref!==null&&typeof t.ref=="function"&&t.ref._stringRef===l?t.ref:(t=function(i){var s=o.refs;i===null?delete s[l]:s[l]=i},t._stringRef=l,t)}if(typeof e!="string")throw Error(P(284));if(!n._owner)throw Error(P(290,e))}return e}function ko(e,t){throw e=Object.prototype.toString.call(t),Error(P(31,e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e))}function Ku(e){var t=e._init;return t(e._payload)}function $f(e){function t(f,d){if(e){var g=f.deletions;g===null?(f.deletions=[d],f.flags|=16):g.push(d)}}function n(f,d){if(!e)return null;for(;d!==null;)t(f,d),d=d.sibling;return null}function r(f,d){for(f=new Map;d!==null;)d.key!==null?f.set(d.key,d):f.set(d.index,d),d=d.sibling;return f}function o(f,d){return f=Wt(f,d),f.index=0,f.sibling=null,f}function l(f,d,g){return f.index=g,e?(g=f.alternate,g!==null?(g=g.index,g<d?(f.flags|=2,d):g):(f.flags|=2,d)):(f.flags|=1048576,d)}function i(f){return e&&f.alternate===null&&(f.flags|=2),f}function s(f,d,g,S){return d===null||d.tag!==6?(d=_i(g,f.mode,S),d.return=f,d):(d=o(d,g),d.return=f,d)}function a(f,d,g,S){var j=g.type;return j===wn?h(f,d,g.props.children,S,g.key):d!==null&&(d.elementType===j||typeof j=="object"&&j!==null&&j.$$typeof===$t&&Ku(j)===d.type)?(S=o(d,g.props),S.ref=lr(f,d,g),S.return=f,S):(S=Yo(g.type,g.key,g.props,null,f.mode,S),S.ref=lr(f,d,g),S.return=f,S)}function c(f,d,g,S){return d===null||d.tag!==4||d.stateNode.containerInfo!==g.containerInfo||d.stateNode.implementation!==g.implementation?(d=$i(g,f.mode,S),d.return=f,d):(d=o(d,g.children||[]),d.return=f,d)}function h(f,d,g,S,j){return d===null||d.tag!==7?(d=on(g,f.mode,S,j),d.return=f,d):(d=o(d,g),d.return=f,d)}function p(f,d,g){if(typeof d=="string"&&d!==""||typeof d=="number")return d=_i(""+d,f.mode,g),d.return=f,d;if(typeof d=="object"&&d!==null){switch(d.$$typeof){case uo:return g=Yo(d.type,d.key,d.props,null,f.mode,g),g.ref=lr(f,null,d),g.return=f,g;case xn:return d=$i(d,f.mode,g),d.return=f,d;case $t:var S=d._init;return p(f,S(d._payload),g)}if(dr(d)||er(d))return d=on(d,f.mode,g,null),d.return=f,d;ko(f,d)}return null}function m(f,d,g,S){var j=d!==null?d.key:null;if(typeof g=="string"&&g!==""||typeof g=="number")return j!==null?null:s(f,d,""+g,S);if(typeof g=="object"&&g!==null){switch(g.$$typeof){case uo:return g.key===j?a(f,d,g,S):null;case xn:return g.key===j?c(f,d,g,S):null;case $t:return j=g._init,m(f,d,j(g._payload),S)}if(dr(g)||er(g))return j!==null?null:h(f,d,g,S,null);ko(f,g)}return null}function x(f,d,g,S,j){if(typeof S=="string"&&S!==""||typeof S=="number")return f=f.get(g)||null,s(d,f,""+S,j);if(typeof S=="object"&&S!==null){switch(S.$$typeof){case uo:return f=f.get(S.key===null?g:S.key)||null,a(d,f,S,j);case xn:return f=f.get(S.key===null?g:S.key)||null,c(d,f,S,j);case $t:var _=S._init;return x(f,d,g,_(S._payload),j)}if(dr(S)||er(S))return f=f.get(g)||null,h(d,f,S,j,null);ko(d,S)}return null}function v(f,d,g,S){for(var j=null,_=null,C=d,R=d=0,O=null;C!==null&&R<g.length;R++){C.index>R?(O=C,C=null):O=C.sibling;var T=m(f,C,g[R],S);if(T===null){C===null&&(C=O);break}e&&C&&T.alternate===null&&t(f,C),d=l(T,d,R),_===null?j=T:_.sibling=T,_=T,C=O}if(R===g.length)return n(f,C),K&&Jt(f,R),j;if(C===null){for(;R<g.length;R++)C=p(f,g[R],S),C!==null&&(d=l(C,d,R),_===null?j=C:_.sibling=C,_=C);return K&&Jt(f,R),j}for(C=r(f,C);R<g.length;R++)O=x(C,f,R,g[R],S),O!==null&&(e&&O.alternate!==null&&C.delete(O.key===null?R:O.key),d=l(O,d,R),_===null?j=O:_.sibling=O,_=O);return e&&C.forEach(function(W){return t(f,W)}),K&&Jt(f,R),j}function w(f,d,g,S){var j=er(g);if(typeof j!="function")throw Error(P(150));if(g=j.call(g),g==null)throw Error(P(151));for(var _=j=null,C=d,R=d=0,O=null,T=g.next();C!==null&&!T.done;R++,T=g.next()){C.index>R?(O=C,C=null):O=C.sibling;var W=m(f,C,T.value,S);if(W===null){C===null&&(C=O);break}e&&C&&W.alternate===null&&t(f,C),d=l(W,d,R),_===null?j=W:_.sibling=W,_=W,C=O}if(T.done)return n(f,C),K&&Jt(f,R),j;if(C===null){for(;!T.done;R++,T=g.next())T=p(f,T.value,S),T!==null&&(d=l(T,d,R),_===null?j=T:_.sibling=T,_=T);return K&&Jt(f,R),j}for(C=r(f,C);!T.done;R++,T=g.next())T=x(C,f,R,T.value,S),T!==null&&(e&&T.alternate!==null&&C.delete(T.key===null?R:T.key),d=l(T,d,R),_===null?j=T:_.sibling=T,_=T);return e&&C.forEach(function(Ne){return t(f,Ne)}),K&&Jt(f,R),j}function E(f,d,g,S){if(typeof g=="object"&&g!==null&&g.type===wn&&g.key===null&&(g=g.props.children),typeof g=="object"&&g!==null){switch(g.$$typeof){case uo:e:{for(var j=g.key,_=d;_!==null;){if(_.key===j){if(j=g.type,j===wn){if(_.tag===7){n(f,_.sibling),d=o(_,g.props.children),d.return=f,f=d;break e}}else if(_.elementType===j||typeof j=="object"&&j!==null&&j.$$typeof===$t&&Ku(j)===_.type){n(f,_.sibling),d=o(_,g.props),d.ref=lr(f,_,g),d.return=f,f=d;break e}n(f,_);break}else t(f,_);_=_.sibling}g.type===wn?(d=on(g.props.children,f.mode,S,g.key),d.return=f,f=d):(S=Yo(g.type,g.key,g.props,null,f.mode,S),S.ref=lr(f,d,g),S.return=f,f=S)}return i(f);case xn:e:{for(_=g.key;d!==null;){if(d.key===_)if(d.tag===4&&d.stateNode.containerInfo===g.containerInfo&&d.stateNode.implementation===g.implementation){n(f,d.sibling),d=o(d,g.children||[]),d.return=f,f=d;break e}else{n(f,d);break}else t(f,d);d=d.sibling}d=$i(g,f.mode,S),d.return=f,f=d}return i(f);case $t:return _=g._init,E(f,d,_(g._payload),S)}if(dr(g))return v(f,d,g,S);if(er(g))return w(f,d,g,S);ko(f,g)}return typeof g=="string"&&g!==""||typeof g=="number"?(g=""+g,d!==null&&d.tag===6?(n(f,d.sibling),d=o(d,g),d.return=f,f=d):(n(f,d),d=_i(g,f.mode,S),d.return=f,f=d),i(f)):n(f,d)}return E}var Bn=$f(!0),Nf=$f(!1),gl=Gt(null),yl=null,_n=null,Pa=null;function Ra(){Pa=_n=yl=null}function _a(e){var t=gl.current;G(gl),e._currentValue=t}function $s(e,t,n){for(;e!==null;){var r=e.alternate;if((e.childLanes&t)!==t?(e.childLanes|=t,r!==null&&(r.childLanes|=t)):r!==null&&(r.childLanes&t)!==t&&(r.childLanes|=t),e===n)break;e=e.return}}function Mn(e,t){yl=e,Pa=_n=null,e=e.dependencies,e!==null&&e.firstContext!==null&&(e.lanes&t&&(Pe=!0),e.firstContext=null)}function We(e){var t=e._currentValue;if(Pa!==e)if(e={context:e,memoizedValue:t,next:null},_n===null){if(yl===null)throw Error(P(308));_n=e,yl.dependencies={lanes:0,firstContext:e}}else _n=_n.next=e;return t}var tn=null;function $a(e){tn===null?tn=[e]:tn.push(e)}function Lf(e,t,n,r){var o=t.interleaved;return o===null?(n.next=n,$a(t)):(n.next=o.next,o.next=n),t.interleaved=n,wt(e,r)}function wt(e,t){e.lanes|=t;var n=e.alternate;for(n!==null&&(n.lanes|=t),n=e,e=e.return;e!==null;)e.childLanes|=t,n=e.alternate,n!==null&&(n.childLanes|=t),n=e,e=e.return;return n.tag===3?n.stateNode:null}var Nt=!1;function Na(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function zf(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,effects:e.effects})}function yt(e,t){return{eventTime:e,lane:t,tag:0,payload:null,callback:null,next:null}}function bt(e,t,n){var r=e.updateQueue;if(r===null)return null;if(r=r.shared,F&2){var o=r.pending;return o===null?t.next=t:(t.next=o.next,o.next=t),r.pending=t,wt(e,n)}return o=r.interleaved,o===null?(t.next=t,$a(r)):(t.next=o.next,o.next=t),r.interleaved=t,wt(e,n)}function Bo(e,t,n){if(t=t.updateQueue,t!==null&&(t=t.shared,(n&4194240)!==0)){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,ma(e,n)}}function Xu(e,t){var n=e.updateQueue,r=e.alternate;if(r!==null&&(r=r.updateQueue,n===r)){var o=null,l=null;if(n=n.firstBaseUpdate,n!==null){do{var i={eventTime:n.eventTime,lane:n.lane,tag:n.tag,payload:n.payload,callback:n.callback,next:null};l===null?o=l=i:l=l.next=i,n=n.next}while(n!==null);l===null?o=l=t:l=l.next=t}else o=l=t;n={baseState:r.baseState,firstBaseUpdate:o,lastBaseUpdate:l,shared:r.shared,effects:r.effects},e.updateQueue=n;return}e=n.lastBaseUpdate,e===null?n.firstBaseUpdate=t:e.next=t,n.lastBaseUpdate=t}function vl(e,t,n,r){var o=e.updateQueue;Nt=!1;var l=o.firstBaseUpdate,i=o.lastBaseUpdate,s=o.shared.pending;if(s!==null){o.shared.pending=null;var a=s,c=a.next;a.next=null,i===null?l=c:i.next=c,i=a;var h=e.alternate;h!==null&&(h=h.updateQueue,s=h.lastBaseUpdate,s!==i&&(s===null?h.firstBaseUpdate=c:s.next=c,h.lastBaseUpdate=a))}if(l!==null){var p=o.baseState;i=0,h=c=a=null,s=l;do{var m=s.lane,x=s.eventTime;if((r&m)===m){h!==null&&(h=h.next={eventTime:x,lane:0,tag:s.tag,payload:s.payload,callback:s.callback,next:null});e:{var v=e,w=s;switch(m=t,x=n,w.tag){case 1:if(v=w.payload,typeof v=="function"){p=v.call(x,p,m);break e}p=v;break e;case 3:v.flags=v.flags&-65537|128;case 0:if(v=w.payload,m=typeof v=="function"?v.call(x,p,m):v,m==null)break e;p=q({},p,m);break e;case 2:Nt=!0}}s.callback!==null&&s.lane!==0&&(e.flags|=64,m=o.effects,m===null?o.effects=[s]:m.push(s))}else x={eventTime:x,lane:m,tag:s.tag,payload:s.payload,callback:s.callback,next:null},h===null?(c=h=x,a=p):h=h.next=x,i|=m;if(s=s.next,s===null){if(s=o.shared.pending,s===null)break;m=s,s=m.next,m.next=null,o.lastBaseUpdate=m,o.shared.pending=null}}while(!0);if(h===null&&(a=p),o.baseState=a,o.firstBaseUpdate=c,o.lastBaseUpdate=h,t=o.shared.interleaved,t!==null){o=t;do i|=o.lane,o=o.next;while(o!==t)}else l===null&&(o.shared.lanes=0);dn|=i,e.lanes=i,e.memoizedState=p}}function Ju(e,t,n){if(e=t.effects,t.effects=null,e!==null)for(t=0;t<e.length;t++){var r=e[t],o=r.callback;if(o!==null){if(r.callback=null,r=n,typeof o!="function")throw Error(P(191,o));o.call(r)}}}var no={},at=Gt(no),Wr=Gt(no),Hr=Gt(no);function nn(e){if(e===no)throw Error(P(174));return e}function La(e,t){switch(H(Hr,t),H(Wr,e),H(at,no),e=t.nodeType,e){case 9:case 11:t=(t=t.documentElement)?t.namespaceURI:us(null,"");break;default:e=e===8?t.parentNode:t,t=e.namespaceURI||null,e=e.tagName,t=us(t,e)}G(at),H(at,t)}function Un(){G(at),G(Wr),G(Hr)}function Tf(e){nn(Hr.current);var t=nn(at.current),n=us(t,e.type);t!==n&&(H(Wr,e),H(at,n))}function za(e){Wr.current===e&&(G(at),G(Wr))}var X=Gt(0);function xl(e){for(var t=e;t!==null;){if(t.tag===13){var n=t.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||n.data==="$?"||n.data==="$!"))return t}else if(t.tag===19&&t.memoizedProps.revealOrder!==void 0){if(t.flags&128)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var Si=[];function Ta(){for(var e=0;e<Si.length;e++)Si[e]._workInProgressVersionPrimary=null;Si.length=0}var Uo=Ct.ReactCurrentDispatcher,Ci=Ct.ReactCurrentBatchConfig,cn=0,J=null,se=null,ce=null,wl=!1,Pr=!1,Vr=0,Tm=0;function ge(){throw Error(P(321))}function Ia(e,t){if(t===null)return!1;for(var n=0;n<t.length&&n<e.length;n++)if(!nt(e[n],t[n]))return!1;return!0}function Ma(e,t,n,r,o,l){if(cn=l,J=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,Uo.current=e===null||e.memoizedState===null?Fm:Dm,e=n(r,o),Pr){l=0;do{if(Pr=!1,Vr=0,25<=l)throw Error(P(301));l+=1,ce=se=null,t.updateQueue=null,Uo.current=Am,e=n(r,o)}while(Pr)}if(Uo.current=kl,t=se!==null&&se.next!==null,cn=0,ce=se=J=null,wl=!1,t)throw Error(P(300));return e}function Oa(){var e=Vr!==0;return Vr=0,e}function ot(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return ce===null?J.memoizedState=ce=e:ce=ce.next=e,ce}function He(){if(se===null){var e=J.alternate;e=e!==null?e.memoizedState:null}else e=se.next;var t=ce===null?J.memoizedState:ce.next;if(t!==null)ce=t,se=e;else{if(e===null)throw Error(P(310));se=e,e={memoizedState:se.memoizedState,baseState:se.baseState,baseQueue:se.baseQueue,queue:se.queue,next:null},ce===null?J.memoizedState=ce=e:ce=ce.next=e}return ce}function Qr(e,t){return typeof t=="function"?t(e):t}function ji(e){var t=He(),n=t.queue;if(n===null)throw Error(P(311));n.lastRenderedReducer=e;var r=se,o=r.baseQueue,l=n.pending;if(l!==null){if(o!==null){var i=o.next;o.next=l.next,l.next=i}r.baseQueue=o=l,n.pending=null}if(o!==null){l=o.next,r=r.baseState;var s=i=null,a=null,c=l;do{var h=c.lane;if((cn&h)===h)a!==null&&(a=a.next={lane:0,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null}),r=c.hasEagerState?c.eagerState:e(r,c.action);else{var p={lane:h,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null};a===null?(s=a=p,i=r):a=a.next=p,J.lanes|=h,dn|=h}c=c.next}while(c!==null&&c!==l);a===null?i=r:a.next=s,nt(r,t.memoizedState)||(Pe=!0),t.memoizedState=r,t.baseState=i,t.baseQueue=a,n.lastRenderedState=r}if(e=n.interleaved,e!==null){o=e;do l=o.lane,J.lanes|=l,dn|=l,o=o.next;while(o!==e)}else o===null&&(n.lanes=0);return[t.memoizedState,n.dispatch]}function Ei(e){var t=He(),n=t.queue;if(n===null)throw Error(P(311));n.lastRenderedReducer=e;var r=n.dispatch,o=n.pending,l=t.memoizedState;if(o!==null){n.pending=null;var i=o=o.next;do l=e(l,i.action),i=i.next;while(i!==o);nt(l,t.memoizedState)||(Pe=!0),t.memoizedState=l,t.baseQueue===null&&(t.baseState=l),n.lastRenderedState=l}return[l,r]}function If(){}function Mf(e,t){var n=J,r=He(),o=t(),l=!nt(r.memoizedState,o);if(l&&(r.memoizedState=o,Pe=!0),r=r.queue,Fa(Df.bind(null,n,r,e),[e]),r.getSnapshot!==t||l||ce!==null&&ce.memoizedState.tag&1){if(n.flags|=2048,Yr(9,Ff.bind(null,n,r,o,t),void 0,null),de===null)throw Error(P(349));cn&30||Of(n,t,o)}return o}function Of(e,t,n){e.flags|=16384,e={getSnapshot:t,value:n},t=J.updateQueue,t===null?(t={lastEffect:null,stores:null},J.updateQueue=t,t.stores=[e]):(n=t.stores,n===null?t.stores=[e]:n.push(e))}function Ff(e,t,n,r){t.value=n,t.getSnapshot=r,Af(t)&&bf(e)}function Df(e,t,n){return n(function(){Af(t)&&bf(e)})}function Af(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!nt(e,n)}catch{return!0}}function bf(e){var t=wt(e,1);t!==null&&qe(t,e,1,-1)}function Zu(e){var t=ot();return typeof e=="function"&&(e=e()),t.memoizedState=t.baseState=e,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:Qr,lastRenderedState:e},t.queue=e,e=e.dispatch=Om.bind(null,J,e),[t.memoizedState,e]}function Yr(e,t,n,r){return e={tag:e,create:t,destroy:n,deps:r,next:null},t=J.updateQueue,t===null?(t={lastEffect:null,stores:null},J.updateQueue=t,t.lastEffect=e.next=e):(n=t.lastEffect,n===null?t.lastEffect=e.next=e:(r=n.next,n.next=e,e.next=r,t.lastEffect=e)),e}function Bf(){return He().memoizedState}function Wo(e,t,n,r){var o=ot();J.flags|=e,o.memoizedState=Yr(1|t,n,void 0,r===void 0?null:r)}function Al(e,t,n,r){var o=He();r=r===void 0?null:r;var l=void 0;if(se!==null){var i=se.memoizedState;if(l=i.destroy,r!==null&&Ia(r,i.deps)){o.memoizedState=Yr(t,n,l,r);return}}J.flags|=e,o.memoizedState=Yr(1|t,n,l,r)}function qu(e,t){return Wo(8390656,8,e,t)}function Fa(e,t){return Al(2048,8,e,t)}function Uf(e,t){return Al(4,2,e,t)}function Wf(e,t){return Al(4,4,e,t)}function Hf(e,t){if(typeof t=="function")return e=e(),t(e),function(){t(null)};if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function Vf(e,t,n){return n=n!=null?n.concat([e]):null,Al(4,4,Hf.bind(null,t,e),n)}function Da(){}function Qf(e,t){var n=He();t=t===void 0?null:t;var r=n.memoizedState;return r!==null&&t!==null&&Ia(t,r[1])?r[0]:(n.memoizedState=[e,t],e)}function Yf(e,t){var n=He();t=t===void 0?null:t;var r=n.memoizedState;return r!==null&&t!==null&&Ia(t,r[1])?r[0]:(e=e(),n.memoizedState=[e,t],e)}function Gf(e,t,n){return cn&21?(nt(n,t)||(n=Zd(),J.lanes|=n,dn|=n,e.baseState=!0),t):(e.baseState&&(e.baseState=!1,Pe=!0),e.memoizedState=n)}function Im(e,t){var n=B;B=n!==0&&4>n?n:4,e(!0);var r=Ci.transition;Ci.transition={};try{e(!1),t()}finally{B=n,Ci.transition=r}}function Kf(){return He().memoizedState}function Mm(e,t,n){var r=Ut(e);if(n={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null},Xf(e))Jf(t,n);else if(n=Lf(e,t,n,r),n!==null){var o=ke();qe(n,e,r,o),Zf(n,t,r)}}function Om(e,t,n){var r=Ut(e),o={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null};if(Xf(e))Jf(t,o);else{var l=e.alternate;if(e.lanes===0&&(l===null||l.lanes===0)&&(l=t.lastRenderedReducer,l!==null))try{var i=t.lastRenderedState,s=l(i,n);if(o.hasEagerState=!0,o.eagerState=s,nt(s,i)){var a=t.interleaved;a===null?(o.next=o,$a(t)):(o.next=a.next,a.next=o),t.interleaved=o;return}}catch{}finally{}n=Lf(e,t,o,r),n!==null&&(o=ke(),qe(n,e,r,o),Zf(n,t,r))}}function Xf(e){var t=e.alternate;return e===J||t!==null&&t===J}function Jf(e,t){Pr=wl=!0;var n=e.pending;n===null?t.next=t:(t.next=n.next,n.next=t),e.pending=t}function Zf(e,t,n){if(n&4194240){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,ma(e,n)}}var kl={readContext:We,useCallback:ge,useContext:ge,useEffect:ge,useImperativeHandle:ge,useInsertionEffect:ge,useLayoutEffect:ge,useMemo:ge,useReducer:ge,useRef:ge,useState:ge,useDebugValue:ge,useDeferredValue:ge,useTransition:ge,useMutableSource:ge,useSyncExternalStore:ge,useId:ge,unstable_isNewReconciler:!1},Fm={readContext:We,useCallback:function(e,t){return ot().memoizedState=[e,t===void 0?null:t],e},useContext:We,useEffect:qu,useImperativeHandle:function(e,t,n){return n=n!=null?n.concat([e]):null,Wo(4194308,4,Hf.bind(null,t,e),n)},useLayoutEffect:function(e,t){return Wo(4194308,4,e,t)},useInsertionEffect:function(e,t){return Wo(4,2,e,t)},useMemo:function(e,t){var n=ot();return t=t===void 0?null:t,e=e(),n.memoizedState=[e,t],e},useReducer:function(e,t,n){var r=ot();return t=n!==void 0?n(t):t,r.memoizedState=r.baseState=t,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:t},r.queue=e,e=e.dispatch=Mm.bind(null,J,e),[r.memoizedState,e]},useRef:function(e){var t=ot();return e={current:e},t.memoizedState=e},useState:Zu,useDebugValue:Da,useDeferredValue:function(e){return ot().memoizedState=e},useTransition:function(){var e=Zu(!1),t=e[0];return e=Im.bind(null,e[1]),ot().memoizedState=e,[t,e]},useMutableSource:function(){},useSyncExternalStore:function(e,t,n){var r=J,o=ot();if(K){if(n===void 0)throw Error(P(407));n=n()}else{if(n=t(),de===null)throw Error(P(349));cn&30||Of(r,t,n)}o.memoizedState=n;var l={value:n,getSnapshot:t};return o.queue=l,qu(Df.bind(null,r,l,e),[e]),r.flags|=2048,Yr(9,Ff.bind(null,r,l,n,t),void 0,null),n},useId:function(){var e=ot(),t=de.identifierPrefix;if(K){var n=mt,r=ht;n=(r&~(1<<32-Ze(r)-1)).toString(32)+n,t=":"+t+"R"+n,n=Vr++,0<n&&(t+="H"+n.toString(32)),t+=":"}else n=Tm++,t=":"+t+"r"+n.toString(32)+":";return e.memoizedState=t},unstable_isNewReconciler:!1},Dm={readContext:We,useCallback:Qf,useContext:We,useEffect:Fa,useImperativeHandle:Vf,useInsertionEffect:Uf,useLayoutEffect:Wf,useMemo:Yf,useReducer:ji,useRef:Bf,useState:function(){return ji(Qr)},useDebugValue:Da,useDeferredValue:function(e){var t=He();return Gf(t,se.memoizedState,e)},useTransition:function(){var e=ji(Qr)[0],t=He().memoizedState;return[e,t]},useMutableSource:If,useSyncExternalStore:Mf,useId:Kf,unstable_isNewReconciler:!1},Am={readContext:We,useCallback:Qf,useContext:We,useEffect:Fa,useImperativeHandle:Vf,useInsertionEffect:Uf,useLayoutEffect:Wf,useMemo:Yf,useReducer:Ei,useRef:Bf,useState:function(){return Ei(Qr)},useDebugValue:Da,useDeferredValue:function(e){var t=He();return se===null?t.memoizedState=e:Gf(t,se.memoizedState,e)},useTransition:function(){var e=Ei(Qr)[0],t=He().memoizedState;return[e,t]},useMutableSource:If,useSyncExternalStore:Mf,useId:Kf,unstable_isNewReconciler:!1};function Ge(e,t){if(e&&e.defaultProps){t=q({},t),e=e.defaultProps;for(var n in e)t[n]===void 0&&(t[n]=e[n]);return t}return t}function Ns(e,t,n,r){t=e.memoizedState,n=n(r,t),n=n==null?t:q({},t,n),e.memoizedState=n,e.lanes===0&&(e.updateQueue.baseState=n)}var bl={isMounted:function(e){return(e=e._reactInternals)?mn(e)===e:!1},enqueueSetState:function(e,t,n){e=e._reactInternals;var r=ke(),o=Ut(e),l=yt(r,o);l.payload=t,n!=null&&(l.callback=n),t=bt(e,l,o),t!==null&&(qe(t,e,o,r),Bo(t,e,o))},enqueueReplaceState:function(e,t,n){e=e._reactInternals;var r=ke(),o=Ut(e),l=yt(r,o);l.tag=1,l.payload=t,n!=null&&(l.callback=n),t=bt(e,l,o),t!==null&&(qe(t,e,o,r),Bo(t,e,o))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var n=ke(),r=Ut(e),o=yt(n,r);o.tag=2,t!=null&&(o.callback=t),t=bt(e,o,r),t!==null&&(qe(t,e,r,n),Bo(t,e,r))}};function ec(e,t,n,r,o,l,i){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(r,l,i):t.prototype&&t.prototype.isPureReactComponent?!Ar(n,r)||!Ar(o,l):!0}function qf(e,t,n){var r=!1,o=Qt,l=t.contextType;return typeof l=="object"&&l!==null?l=We(l):(o=_e(t)?an:xe.current,r=t.contextTypes,l=(r=r!=null)?An(e,o):Qt),t=new t(n,l),e.memoizedState=t.state!==null&&t.state!==void 0?t.state:null,t.updater=bl,e.stateNode=t,t._reactInternals=e,r&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=o,e.__reactInternalMemoizedMaskedChildContext=l),t}function tc(e,t,n,r){e=t.state,typeof t.componentWillReceiveProps=="function"&&t.componentWillReceiveProps(n,r),typeof t.UNSAFE_componentWillReceiveProps=="function"&&t.UNSAFE_componentWillReceiveProps(n,r),t.state!==e&&bl.enqueueReplaceState(t,t.state,null)}function Ls(e,t,n,r){var o=e.stateNode;o.props=n,o.state=e.memoizedState,o.refs={},Na(e);var l=t.contextType;typeof l=="object"&&l!==null?o.context=We(l):(l=_e(t)?an:xe.current,o.context=An(e,l)),o.state=e.memoizedState,l=t.getDerivedStateFromProps,typeof l=="function"&&(Ns(e,t,l,n),o.state=e.memoizedState),typeof t.getDerivedStateFromProps=="function"||typeof o.getSnapshotBeforeUpdate=="function"||typeof o.UNSAFE_componentWillMount!="function"&&typeof o.componentWillMount!="function"||(t=o.state,typeof o.componentWillMount=="function"&&o.componentWillMount(),typeof o.UNSAFE_componentWillMount=="function"&&o.UNSAFE_componentWillMount(),t!==o.state&&bl.enqueueReplaceState(o,o.state,null),vl(e,n,o,r),o.state=e.memoizedState),typeof o.componentDidMount=="function"&&(e.flags|=4194308)}function Wn(e,t){try{var n="",r=t;do n+=p0(r),r=r.return;while(r);var o=n}catch(l){o=`
Error generating stack: `+l.message+`
`+l.stack}return{value:e,source:t,stack:o,digest:null}}function Pi(e,t,n){return{value:e,source:null,stack:n??null,digest:t??null}}function zs(e,t){try{console.error(t.value)}catch(n){setTimeout(function(){throw n})}}var bm=typeof WeakMap=="function"?WeakMap:Map;function ep(e,t,n){n=yt(-1,n),n.tag=3,n.payload={element:null};var r=t.value;return n.callback=function(){Cl||(Cl=!0,Us=r),zs(e,t)},n}function tp(e,t,n){n=yt(-1,n),n.tag=3;var r=e.type.getDerivedStateFromError;if(typeof r=="function"){var o=t.value;n.payload=function(){return r(o)},n.callback=function(){zs(e,t)}}var l=e.stateNode;return l!==null&&typeof l.componentDidCatch=="function"&&(n.callback=function(){zs(e,t),typeof r!="function"&&(Bt===null?Bt=new Set([this]):Bt.add(this));var i=t.stack;this.componentDidCatch(t.value,{componentStack:i!==null?i:""})}),n}function nc(e,t,n){var r=e.pingCache;if(r===null){r=e.pingCache=new bm;var o=new Set;r.set(t,o)}else o=r.get(t),o===void 0&&(o=new Set,r.set(t,o));o.has(n)||(o.add(n),e=eg.bind(null,e,t,n),t.then(e,e))}function rc(e){do{var t;if((t=e.tag===13)&&(t=e.memoizedState,t=t!==null?t.dehydrated!==null:!0),t)return e;e=e.return}while(e!==null);return null}function oc(e,t,n,r,o){return e.mode&1?(e.flags|=65536,e.lanes=o,e):(e===t?e.flags|=65536:(e.flags|=128,n.flags|=131072,n.flags&=-52805,n.tag===1&&(n.alternate===null?n.tag=17:(t=yt(-1,1),t.tag=2,bt(n,t,1))),n.lanes|=1),e)}var Bm=Ct.ReactCurrentOwner,Pe=!1;function we(e,t,n,r){t.child=e===null?Nf(t,null,n,r):Bn(t,e.child,n,r)}function lc(e,t,n,r,o){n=n.render;var l=t.ref;return Mn(t,o),r=Ma(e,t,n,r,l,o),n=Oa(),e!==null&&!Pe?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~o,kt(e,t,o)):(K&&n&&Ca(t),t.flags|=1,we(e,t,r,o),t.child)}function ic(e,t,n,r,o){if(e===null){var l=n.type;return typeof l=="function"&&!Qa(l)&&l.defaultProps===void 0&&n.compare===null&&n.defaultProps===void 0?(t.tag=15,t.type=l,np(e,t,l,r,o)):(e=Yo(n.type,null,r,t,t.mode,o),e.ref=t.ref,e.return=t,t.child=e)}if(l=e.child,!(e.lanes&o)){var i=l.memoizedProps;if(n=n.compare,n=n!==null?n:Ar,n(i,r)&&e.ref===t.ref)return kt(e,t,o)}return t.flags|=1,e=Wt(l,r),e.ref=t.ref,e.return=t,t.child=e}function np(e,t,n,r,o){if(e!==null){var l=e.memoizedProps;if(Ar(l,r)&&e.ref===t.ref)if(Pe=!1,t.pendingProps=r=l,(e.lanes&o)!==0)e.flags&131072&&(Pe=!0);else return t.lanes=e.lanes,kt(e,t,o)}return Ts(e,t,n,r,o)}function rp(e,t,n){var r=t.pendingProps,o=r.children,l=e!==null?e.memoizedState:null;if(r.mode==="hidden")if(!(t.mode&1))t.memoizedState={baseLanes:0,cachePool:null,transitions:null},H(Nn,ze),ze|=n;else{if(!(n&1073741824))return e=l!==null?l.baseLanes|n:n,t.lanes=t.childLanes=1073741824,t.memoizedState={baseLanes:e,cachePool:null,transitions:null},t.updateQueue=null,H(Nn,ze),ze|=e,null;t.memoizedState={baseLanes:0,cachePool:null,transitions:null},r=l!==null?l.baseLanes:n,H(Nn,ze),ze|=r}else l!==null?(r=l.baseLanes|n,t.memoizedState=null):r=n,H(Nn,ze),ze|=r;return we(e,t,o,n),t.child}function op(e,t){var n=t.ref;(e===null&&n!==null||e!==null&&e.ref!==n)&&(t.flags|=512,t.flags|=2097152)}function Ts(e,t,n,r,o){var l=_e(n)?an:xe.current;return l=An(t,l),Mn(t,o),n=Ma(e,t,n,r,l,o),r=Oa(),e!==null&&!Pe?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~o,kt(e,t,o)):(K&&r&&Ca(t),t.flags|=1,we(e,t,n,o),t.child)}function sc(e,t,n,r,o){if(_e(n)){var l=!0;pl(t)}else l=!1;if(Mn(t,o),t.stateNode===null)Ho(e,t),qf(t,n,r),Ls(t,n,r,o),r=!0;else if(e===null){var i=t.stateNode,s=t.memoizedProps;i.props=s;var a=i.context,c=n.contextType;typeof c=="object"&&c!==null?c=We(c):(c=_e(n)?an:xe.current,c=An(t,c));var h=n.getDerivedStateFromProps,p=typeof h=="function"||typeof i.getSnapshotBeforeUpdate=="function";p||typeof i.UNSAFE_componentWillReceiveProps!="function"&&typeof i.componentWillReceiveProps!="function"||(s!==r||a!==c)&&tc(t,i,r,c),Nt=!1;var m=t.memoizedState;i.state=m,vl(t,r,i,o),a=t.memoizedState,s!==r||m!==a||Re.current||Nt?(typeof h=="function"&&(Ns(t,n,h,r),a=t.memoizedState),(s=Nt||ec(t,n,s,r,m,a,c))?(p||typeof i.UNSAFE_componentWillMount!="function"&&typeof i.componentWillMount!="function"||(typeof i.componentWillMount=="function"&&i.componentWillMount(),typeof i.UNSAFE_componentWillMount=="function"&&i.UNSAFE_componentWillMount()),typeof i.componentDidMount=="function"&&(t.flags|=4194308)):(typeof i.componentDidMount=="function"&&(t.flags|=4194308),t.memoizedProps=r,t.memoizedState=a),i.props=r,i.state=a,i.context=c,r=s):(typeof i.componentDidMount=="function"&&(t.flags|=4194308),r=!1)}else{i=t.stateNode,zf(e,t),s=t.memoizedProps,c=t.type===t.elementType?s:Ge(t.type,s),i.props=c,p=t.pendingProps,m=i.context,a=n.contextType,typeof a=="object"&&a!==null?a=We(a):(a=_e(n)?an:xe.current,a=An(t,a));var x=n.getDerivedStateFromProps;(h=typeof x=="function"||typeof i.getSnapshotBeforeUpdate=="function")||typeof i.UNSAFE_componentWillReceiveProps!="function"&&typeof i.componentWillReceiveProps!="function"||(s!==p||m!==a)&&tc(t,i,r,a),Nt=!1,m=t.memoizedState,i.state=m,vl(t,r,i,o);var v=t.memoizedState;s!==p||m!==v||Re.current||Nt?(typeof x=="function"&&(Ns(t,n,x,r),v=t.memoizedState),(c=Nt||ec(t,n,c,r,m,v,a)||!1)?(h||typeof i.UNSAFE_componentWillUpdate!="function"&&typeof i.componentWillUpdate!="function"||(typeof i.componentWillUpdate=="function"&&i.componentWillUpdate(r,v,a),typeof i.UNSAFE_componentWillUpdate=="function"&&i.UNSAFE_componentWillUpdate(r,v,a)),typeof i.componentDidUpdate=="function"&&(t.flags|=4),typeof i.getSnapshotBeforeUpdate=="function"&&(t.flags|=1024)):(typeof i.componentDidUpdate!="function"||s===e.memoizedProps&&m===e.memoizedState||(t.flags|=4),typeof i.getSnapshotBeforeUpdate!="function"||s===e.memoizedProps&&m===e.memoizedState||(t.flags|=1024),t.memoizedProps=r,t.memoizedState=v),i.props=r,i.state=v,i.context=a,r=c):(typeof i.componentDidUpdate!="function"||s===e.memoizedProps&&m===e.memoizedState||(t.flags|=4),typeof i.getSnapshotBeforeUpdate!="function"||s===e.memoizedProps&&m===e.memoizedState||(t.flags|=1024),r=!1)}return Is(e,t,n,r,l,o)}function Is(e,t,n,r,o,l){op(e,t);var i=(t.flags&128)!==0;if(!r&&!i)return o&&Qu(t,n,!1),kt(e,t,l);r=t.stateNode,Bm.current=t;var s=i&&typeof n.getDerivedStateFromError!="function"?null:r.render();return t.flags|=1,e!==null&&i?(t.child=Bn(t,e.child,null,l),t.child=Bn(t,null,s,l)):we(e,t,s,l),t.memoizedState=r.state,o&&Qu(t,n,!0),t.child}function lp(e){var t=e.stateNode;t.pendingContext?Vu(e,t.pendingContext,t.pendingContext!==t.context):t.context&&Vu(e,t.context,!1),La(e,t.containerInfo)}function ac(e,t,n,r,o){return bn(),Ea(o),t.flags|=256,we(e,t,n,r),t.child}var Ms={dehydrated:null,treeContext:null,retryLane:0};function Os(e){return{baseLanes:e,cachePool:null,transitions:null}}function ip(e,t,n){var r=t.pendingProps,o=X.current,l=!1,i=(t.flags&128)!==0,s;if((s=i)||(s=e!==null&&e.memoizedState===null?!1:(o&2)!==0),s?(l=!0,t.flags&=-129):(e===null||e.memoizedState!==null)&&(o|=1),H(X,o&1),e===null)return _s(t),e=t.memoizedState,e!==null&&(e=e.dehydrated,e!==null)?(t.mode&1?e.data==="$!"?t.lanes=8:t.lanes=1073741824:t.lanes=1,null):(i=r.children,e=r.fallback,l?(r=t.mode,l=t.child,i={mode:"hidden",children:i},!(r&1)&&l!==null?(l.childLanes=0,l.pendingProps=i):l=Wl(i,r,0,null),e=on(e,r,n,null),l.return=t,e.return=t,l.sibling=e,t.child=l,t.child.memoizedState=Os(n),t.memoizedState=Ms,e):Aa(t,i));if(o=e.memoizedState,o!==null&&(s=o.dehydrated,s!==null))return Um(e,t,i,r,s,o,n);if(l){l=r.fallback,i=t.mode,o=e.child,s=o.sibling;var a={mode:"hidden",children:r.children};return!(i&1)&&t.child!==o?(r=t.child,r.childLanes=0,r.pendingProps=a,t.deletions=null):(r=Wt(o,a),r.subtreeFlags=o.subtreeFlags&14680064),s!==null?l=Wt(s,l):(l=on(l,i,n,null),l.flags|=2),l.return=t,r.return=t,r.sibling=l,t.child=r,r=l,l=t.child,i=e.child.memoizedState,i=i===null?Os(n):{baseLanes:i.baseLanes|n,cachePool:null,transitions:i.transitions},l.memoizedState=i,l.childLanes=e.childLanes&~n,t.memoizedState=Ms,r}return l=e.child,e=l.sibling,r=Wt(l,{mode:"visible",children:r.children}),!(t.mode&1)&&(r.lanes=n),r.return=t,r.sibling=null,e!==null&&(n=t.deletions,n===null?(t.deletions=[e],t.flags|=16):n.push(e)),t.child=r,t.memoizedState=null,r}function Aa(e,t){return t=Wl({mode:"visible",children:t},e.mode,0,null),t.return=e,e.child=t}function So(e,t,n,r){return r!==null&&Ea(r),Bn(t,e.child,null,n),e=Aa(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function Um(e,t,n,r,o,l,i){if(n)return t.flags&256?(t.flags&=-257,r=Pi(Error(P(422))),So(e,t,i,r)):t.memoizedState!==null?(t.child=e.child,t.flags|=128,null):(l=r.fallback,o=t.mode,r=Wl({mode:"visible",children:r.children},o,0,null),l=on(l,o,i,null),l.flags|=2,r.return=t,l.return=t,r.sibling=l,t.child=r,t.mode&1&&Bn(t,e.child,null,i),t.child.memoizedState=Os(i),t.memoizedState=Ms,l);if(!(t.mode&1))return So(e,t,i,null);if(o.data==="$!"){if(r=o.nextSibling&&o.nextSibling.dataset,r)var s=r.dgst;return r=s,l=Error(P(419)),r=Pi(l,r,void 0),So(e,t,i,r)}if(s=(i&e.childLanes)!==0,Pe||s){if(r=de,r!==null){switch(i&-i){case 4:o=2;break;case 16:o=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:o=32;break;case 536870912:o=268435456;break;default:o=0}o=o&(r.suspendedLanes|i)?0:o,o!==0&&o!==l.retryLane&&(l.retryLane=o,wt(e,o),qe(r,e,o,-1))}return Va(),r=Pi(Error(P(421))),So(e,t,i,r)}return o.data==="$?"?(t.flags|=128,t.child=e.child,t=tg.bind(null,e),o._reactRetry=t,null):(e=l.treeContext,Te=At(o.nextSibling),Ie=t,K=!0,Je=null,e!==null&&(Ae[be++]=ht,Ae[be++]=mt,Ae[be++]=un,ht=e.id,mt=e.overflow,un=t),t=Aa(t,r.children),t.flags|=4096,t)}function uc(e,t,n){e.lanes|=t;var r=e.alternate;r!==null&&(r.lanes|=t),$s(e.return,t,n)}function Ri(e,t,n,r,o){var l=e.memoizedState;l===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:r,tail:n,tailMode:o}:(l.isBackwards=t,l.rendering=null,l.renderingStartTime=0,l.last=r,l.tail=n,l.tailMode=o)}function sp(e,t,n){var r=t.pendingProps,o=r.revealOrder,l=r.tail;if(we(e,t,r.children,n),r=X.current,r&2)r=r&1|2,t.flags|=128;else{if(e!==null&&e.flags&128)e:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&uc(e,n,t);else if(e.tag===19)uc(e,n,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break e;for(;e.sibling===null;){if(e.return===null||e.return===t)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}r&=1}if(H(X,r),!(t.mode&1))t.memoizedState=null;else switch(o){case"forwards":for(n=t.child,o=null;n!==null;)e=n.alternate,e!==null&&xl(e)===null&&(o=n),n=n.sibling;n=o,n===null?(o=t.child,t.child=null):(o=n.sibling,n.sibling=null),Ri(t,!1,o,n,l);break;case"backwards":for(n=null,o=t.child,t.child=null;o!==null;){if(e=o.alternate,e!==null&&xl(e)===null){t.child=o;break}e=o.sibling,o.sibling=n,n=o,o=e}Ri(t,!0,n,null,l);break;case"together":Ri(t,!1,null,null,void 0);break;default:t.memoizedState=null}return t.child}function Ho(e,t){!(t.mode&1)&&e!==null&&(e.alternate=null,t.alternate=null,t.flags|=2)}function kt(e,t,n){if(e!==null&&(t.dependencies=e.dependencies),dn|=t.lanes,!(n&t.childLanes))return null;if(e!==null&&t.child!==e.child)throw Error(P(153));if(t.child!==null){for(e=t.child,n=Wt(e,e.pendingProps),t.child=n,n.return=t;e.sibling!==null;)e=e.sibling,n=n.sibling=Wt(e,e.pendingProps),n.return=t;n.sibling=null}return t.child}function Wm(e,t,n){switch(t.tag){case 3:lp(t),bn();break;case 5:Tf(t);break;case 1:_e(t.type)&&pl(t);break;case 4:La(t,t.stateNode.containerInfo);break;case 10:var r=t.type._context,o=t.memoizedProps.value;H(gl,r._currentValue),r._currentValue=o;break;case 13:if(r=t.memoizedState,r!==null)return r.dehydrated!==null?(H(X,X.current&1),t.flags|=128,null):n&t.child.childLanes?ip(e,t,n):(H(X,X.current&1),e=kt(e,t,n),e!==null?e.sibling:null);H(X,X.current&1);break;case 19:if(r=(n&t.childLanes)!==0,e.flags&128){if(r)return sp(e,t,n);t.flags|=128}if(o=t.memoizedState,o!==null&&(o.rendering=null,o.tail=null,o.lastEffect=null),H(X,X.current),r)break;return null;case 22:case 23:return t.lanes=0,rp(e,t,n)}return kt(e,t,n)}var ap,Fs,up,cp;ap=function(e,t){for(var n=t.child;n!==null;){if(n.tag===5||n.tag===6)e.appendChild(n.stateNode);else if(n.tag!==4&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===t)break;for(;n.sibling===null;){if(n.return===null||n.return===t)return;n=n.return}n.sibling.return=n.return,n=n.sibling}};Fs=function(){};up=function(e,t,n,r){var o=e.memoizedProps;if(o!==r){e=t.stateNode,nn(at.current);var l=null;switch(n){case"input":o=ls(e,o),r=ls(e,r),l=[];break;case"select":o=q({},o,{value:void 0}),r=q({},r,{value:void 0}),l=[];break;case"textarea":o=as(e,o),r=as(e,r),l=[];break;default:typeof o.onClick!="function"&&typeof r.onClick=="function"&&(e.onclick=dl)}cs(n,r);var i;n=null;for(c in o)if(!r.hasOwnProperty(c)&&o.hasOwnProperty(c)&&o[c]!=null)if(c==="style"){var s=o[c];for(i in s)s.hasOwnProperty(i)&&(n||(n={}),n[i]="")}else c!=="dangerouslySetInnerHTML"&&c!=="children"&&c!=="suppressContentEditableWarning"&&c!=="suppressHydrationWarning"&&c!=="autoFocus"&&(zr.hasOwnProperty(c)?l||(l=[]):(l=l||[]).push(c,null));for(c in r){var a=r[c];if(s=o!=null?o[c]:void 0,r.hasOwnProperty(c)&&a!==s&&(a!=null||s!=null))if(c==="style")if(s){for(i in s)!s.hasOwnProperty(i)||a&&a.hasOwnProperty(i)||(n||(n={}),n[i]="");for(i in a)a.hasOwnProperty(i)&&s[i]!==a[i]&&(n||(n={}),n[i]=a[i])}else n||(l||(l=[]),l.push(c,n)),n=a;else c==="dangerouslySetInnerHTML"?(a=a?a.__html:void 0,s=s?s.__html:void 0,a!=null&&s!==a&&(l=l||[]).push(c,a)):c==="children"?typeof a!="string"&&typeof a!="number"||(l=l||[]).push(c,""+a):c!=="suppressContentEditableWarning"&&c!=="suppressHydrationWarning"&&(zr.hasOwnProperty(c)?(a!=null&&c==="onScroll"&&Q("scroll",e),l||s===a||(l=[])):(l=l||[]).push(c,a))}n&&(l=l||[]).push("style",n);var c=l;(t.updateQueue=c)&&(t.flags|=4)}};cp=function(e,t,n,r){n!==r&&(t.flags|=4)};function ir(e,t){if(!K)switch(e.tailMode){case"hidden":t=e.tail;for(var n=null;t!==null;)t.alternate!==null&&(n=t),t=t.sibling;n===null?e.tail=null:n.sibling=null;break;case"collapsed":n=e.tail;for(var r=null;n!==null;)n.alternate!==null&&(r=n),n=n.sibling;r===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:r.sibling=null}}function ye(e){var t=e.alternate!==null&&e.alternate.child===e.child,n=0,r=0;if(t)for(var o=e.child;o!==null;)n|=o.lanes|o.childLanes,r|=o.subtreeFlags&14680064,r|=o.flags&14680064,o.return=e,o=o.sibling;else for(o=e.child;o!==null;)n|=o.lanes|o.childLanes,r|=o.subtreeFlags,r|=o.flags,o.return=e,o=o.sibling;return e.subtreeFlags|=r,e.childLanes=n,t}function Hm(e,t,n){var r=t.pendingProps;switch(ja(t),t.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return ye(t),null;case 1:return _e(t.type)&&fl(),ye(t),null;case 3:return r=t.stateNode,Un(),G(Re),G(xe),Ta(),r.pendingContext&&(r.context=r.pendingContext,r.pendingContext=null),(e===null||e.child===null)&&(wo(t)?t.flags|=4:e===null||e.memoizedState.isDehydrated&&!(t.flags&256)||(t.flags|=1024,Je!==null&&(Vs(Je),Je=null))),Fs(e,t),ye(t),null;case 5:za(t);var o=nn(Hr.current);if(n=t.type,e!==null&&t.stateNode!=null)up(e,t,n,r,o),e.ref!==t.ref&&(t.flags|=512,t.flags|=2097152);else{if(!r){if(t.stateNode===null)throw Error(P(166));return ye(t),null}if(e=nn(at.current),wo(t)){r=t.stateNode,n=t.type;var l=t.memoizedProps;switch(r[lt]=t,r[Ur]=l,e=(t.mode&1)!==0,n){case"dialog":Q("cancel",r),Q("close",r);break;case"iframe":case"object":case"embed":Q("load",r);break;case"video":case"audio":for(o=0;o<pr.length;o++)Q(pr[o],r);break;case"source":Q("error",r);break;case"img":case"image":case"link":Q("error",r),Q("load",r);break;case"details":Q("toggle",r);break;case"input":vu(r,l),Q("invalid",r);break;case"select":r._wrapperState={wasMultiple:!!l.multiple},Q("invalid",r);break;case"textarea":wu(r,l),Q("invalid",r)}cs(n,l),o=null;for(var i in l)if(l.hasOwnProperty(i)){var s=l[i];i==="children"?typeof s=="string"?r.textContent!==s&&(l.suppressHydrationWarning!==!0&&xo(r.textContent,s,e),o=["children",s]):typeof s=="number"&&r.textContent!==""+s&&(l.suppressHydrationWarning!==!0&&xo(r.textContent,s,e),o=["children",""+s]):zr.hasOwnProperty(i)&&s!=null&&i==="onScroll"&&Q("scroll",r)}switch(n){case"input":co(r),xu(r,l,!0);break;case"textarea":co(r),ku(r);break;case"select":case"option":break;default:typeof l.onClick=="function"&&(r.onclick=dl)}r=o,t.updateQueue=r,r!==null&&(t.flags|=4)}else{i=o.nodeType===9?o:o.ownerDocument,e==="http://www.w3.org/1999/xhtml"&&(e=Fd(n)),e==="http://www.w3.org/1999/xhtml"?n==="script"?(e=i.createElement("div"),e.innerHTML="<script><\/script>",e=e.removeChild(e.firstChild)):typeof r.is=="string"?e=i.createElement(n,{is:r.is}):(e=i.createElement(n),n==="select"&&(i=e,r.multiple?i.multiple=!0:r.size&&(i.size=r.size))):e=i.createElementNS(e,n),e[lt]=t,e[Ur]=r,ap(e,t,!1,!1),t.stateNode=e;e:{switch(i=ds(n,r),n){case"dialog":Q("cancel",e),Q("close",e),o=r;break;case"iframe":case"object":case"embed":Q("load",e),o=r;break;case"video":case"audio":for(o=0;o<pr.length;o++)Q(pr[o],e);o=r;break;case"source":Q("error",e),o=r;break;case"img":case"image":case"link":Q("error",e),Q("load",e),o=r;break;case"details":Q("toggle",e),o=r;break;case"input":vu(e,r),o=ls(e,r),Q("invalid",e);break;case"option":o=r;break;case"select":e._wrapperState={wasMultiple:!!r.multiple},o=q({},r,{value:void 0}),Q("invalid",e);break;case"textarea":wu(e,r),o=as(e,r),Q("invalid",e);break;default:o=r}cs(n,o),s=o;for(l in s)if(s.hasOwnProperty(l)){var a=s[l];l==="style"?bd(e,a):l==="dangerouslySetInnerHTML"?(a=a?a.__html:void 0,a!=null&&Dd(e,a)):l==="children"?typeof a=="string"?(n!=="textarea"||a!=="")&&Tr(e,a):typeof a=="number"&&Tr(e,""+a):l!=="suppressContentEditableWarning"&&l!=="suppressHydrationWarning"&&l!=="autoFocus"&&(zr.hasOwnProperty(l)?a!=null&&l==="onScroll"&&Q("scroll",e):a!=null&&ua(e,l,a,i))}switch(n){case"input":co(e),xu(e,r,!1);break;case"textarea":co(e),ku(e);break;case"option":r.value!=null&&e.setAttribute("value",""+Vt(r.value));break;case"select":e.multiple=!!r.multiple,l=r.value,l!=null?Ln(e,!!r.multiple,l,!1):r.defaultValue!=null&&Ln(e,!!r.multiple,r.defaultValue,!0);break;default:typeof o.onClick=="function"&&(e.onclick=dl)}switch(n){case"button":case"input":case"select":case"textarea":r=!!r.autoFocus;break e;case"img":r=!0;break e;default:r=!1}}r&&(t.flags|=4)}t.ref!==null&&(t.flags|=512,t.flags|=2097152)}return ye(t),null;case 6:if(e&&t.stateNode!=null)cp(e,t,e.memoizedProps,r);else{if(typeof r!="string"&&t.stateNode===null)throw Error(P(166));if(n=nn(Hr.current),nn(at.current),wo(t)){if(r=t.stateNode,n=t.memoizedProps,r[lt]=t,(l=r.nodeValue!==n)&&(e=Ie,e!==null))switch(e.tag){case 3:xo(r.nodeValue,n,(e.mode&1)!==0);break;case 5:e.memoizedProps.suppressHydrationWarning!==!0&&xo(r.nodeValue,n,(e.mode&1)!==0)}l&&(t.flags|=4)}else r=(n.nodeType===9?n:n.ownerDocument).createTextNode(r),r[lt]=t,t.stateNode=r}return ye(t),null;case 13:if(G(X),r=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(K&&Te!==null&&t.mode&1&&!(t.flags&128))_f(),bn(),t.flags|=98560,l=!1;else if(l=wo(t),r!==null&&r.dehydrated!==null){if(e===null){if(!l)throw Error(P(318));if(l=t.memoizedState,l=l!==null?l.dehydrated:null,!l)throw Error(P(317));l[lt]=t}else bn(),!(t.flags&128)&&(t.memoizedState=null),t.flags|=4;ye(t),l=!1}else Je!==null&&(Vs(Je),Je=null),l=!0;if(!l)return t.flags&65536?t:null}return t.flags&128?(t.lanes=n,t):(r=r!==null,r!==(e!==null&&e.memoizedState!==null)&&r&&(t.child.flags|=8192,t.mode&1&&(e===null||X.current&1?ue===0&&(ue=3):Va())),t.updateQueue!==null&&(t.flags|=4),ye(t),null);case 4:return Un(),Fs(e,t),e===null&&br(t.stateNode.containerInfo),ye(t),null;case 10:return _a(t.type._context),ye(t),null;case 17:return _e(t.type)&&fl(),ye(t),null;case 19:if(G(X),l=t.memoizedState,l===null)return ye(t),null;if(r=(t.flags&128)!==0,i=l.rendering,i===null)if(r)ir(l,!1);else{if(ue!==0||e!==null&&e.flags&128)for(e=t.child;e!==null;){if(i=xl(e),i!==null){for(t.flags|=128,ir(l,!1),r=i.updateQueue,r!==null&&(t.updateQueue=r,t.flags|=4),t.subtreeFlags=0,r=n,n=t.child;n!==null;)l=n,e=r,l.flags&=14680066,i=l.alternate,i===null?(l.childLanes=0,l.lanes=e,l.child=null,l.subtreeFlags=0,l.memoizedProps=null,l.memoizedState=null,l.updateQueue=null,l.dependencies=null,l.stateNode=null):(l.childLanes=i.childLanes,l.lanes=i.lanes,l.child=i.child,l.subtreeFlags=0,l.deletions=null,l.memoizedProps=i.memoizedProps,l.memoizedState=i.memoizedState,l.updateQueue=i.updateQueue,l.type=i.type,e=i.dependencies,l.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext}),n=n.sibling;return H(X,X.current&1|2),t.child}e=e.sibling}l.tail!==null&&ne()>Hn&&(t.flags|=128,r=!0,ir(l,!1),t.lanes=4194304)}else{if(!r)if(e=xl(i),e!==null){if(t.flags|=128,r=!0,n=e.updateQueue,n!==null&&(t.updateQueue=n,t.flags|=4),ir(l,!0),l.tail===null&&l.tailMode==="hidden"&&!i.alternate&&!K)return ye(t),null}else 2*ne()-l.renderingStartTime>Hn&&n!==1073741824&&(t.flags|=128,r=!0,ir(l,!1),t.lanes=4194304);l.isBackwards?(i.sibling=t.child,t.child=i):(n=l.last,n!==null?n.sibling=i:t.child=i,l.last=i)}return l.tail!==null?(t=l.tail,l.rendering=t,l.tail=t.sibling,l.renderingStartTime=ne(),t.sibling=null,n=X.current,H(X,r?n&1|2:n&1),t):(ye(t),null);case 22:case 23:return Ha(),r=t.memoizedState!==null,e!==null&&e.memoizedState!==null!==r&&(t.flags|=8192),r&&t.mode&1?ze&1073741824&&(ye(t),t.subtreeFlags&6&&(t.flags|=8192)):ye(t),null;case 24:return null;case 25:return null}throw Error(P(156,t.tag))}function Vm(e,t){switch(ja(t),t.tag){case 1:return _e(t.type)&&fl(),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return Un(),G(Re),G(xe),Ta(),e=t.flags,e&65536&&!(e&128)?(t.flags=e&-65537|128,t):null;case 5:return za(t),null;case 13:if(G(X),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(P(340));bn()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return G(X),null;case 4:return Un(),null;case 10:return _a(t.type._context),null;case 22:case 23:return Ha(),null;case 24:return null;default:return null}}var Co=!1,ve=!1,Qm=typeof WeakSet=="function"?WeakSet:Set,N=null;function $n(e,t){var n=e.ref;if(n!==null)if(typeof n=="function")try{n(null)}catch(r){te(e,t,r)}else n.current=null}function Ds(e,t,n){try{n()}catch(r){te(e,t,r)}}var cc=!1;function Ym(e,t){if(ks=al,e=mf(),Sa(e)){if("selectionStart"in e)var n={start:e.selectionStart,end:e.selectionEnd};else e:{n=(n=e.ownerDocument)&&n.defaultView||window;var r=n.getSelection&&n.getSelection();if(r&&r.rangeCount!==0){n=r.anchorNode;var o=r.anchorOffset,l=r.focusNode;r=r.focusOffset;try{n.nodeType,l.nodeType}catch{n=null;break e}var i=0,s=-1,a=-1,c=0,h=0,p=e,m=null;t:for(;;){for(var x;p!==n||o!==0&&p.nodeType!==3||(s=i+o),p!==l||r!==0&&p.nodeType!==3||(a=i+r),p.nodeType===3&&(i+=p.nodeValue.length),(x=p.firstChild)!==null;)m=p,p=x;for(;;){if(p===e)break t;if(m===n&&++c===o&&(s=i),m===l&&++h===r&&(a=i),(x=p.nextSibling)!==null)break;p=m,m=p.parentNode}p=x}n=s===-1||a===-1?null:{start:s,end:a}}else n=null}n=n||{start:0,end:0}}else n=null;for(Ss={focusedElem:e,selectionRange:n},al=!1,N=t;N!==null;)if(t=N,e=t.child,(t.subtreeFlags&1028)!==0&&e!==null)e.return=t,N=e;else for(;N!==null;){t=N;try{var v=t.alternate;if(t.flags&1024)switch(t.tag){case 0:case 11:case 15:break;case 1:if(v!==null){var w=v.memoizedProps,E=v.memoizedState,f=t.stateNode,d=f.getSnapshotBeforeUpdate(t.elementType===t.type?w:Ge(t.type,w),E);f.__reactInternalSnapshotBeforeUpdate=d}break;case 3:var g=t.stateNode.containerInfo;g.nodeType===1?g.textContent="":g.nodeType===9&&g.documentElement&&g.removeChild(g.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(P(163))}}catch(S){te(t,t.return,S)}if(e=t.sibling,e!==null){e.return=t.return,N=e;break}N=t.return}return v=cc,cc=!1,v}function Rr(e,t,n){var r=t.updateQueue;if(r=r!==null?r.lastEffect:null,r!==null){var o=r=r.next;do{if((o.tag&e)===e){var l=o.destroy;o.destroy=void 0,l!==void 0&&Ds(t,n,l)}o=o.next}while(o!==r)}}function Bl(e,t){if(t=t.updateQueue,t=t!==null?t.lastEffect:null,t!==null){var n=t=t.next;do{if((n.tag&e)===e){var r=n.create;n.destroy=r()}n=n.next}while(n!==t)}}function As(e){var t=e.ref;if(t!==null){var n=e.stateNode;switch(e.tag){case 5:e=n;break;default:e=n}typeof t=="function"?t(e):t.current=e}}function dp(e){var t=e.alternate;t!==null&&(e.alternate=null,dp(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&(delete t[lt],delete t[Ur],delete t[Es],delete t[$m],delete t[Nm])),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}function fp(e){return e.tag===5||e.tag===3||e.tag===4}function dc(e){e:for(;;){for(;e.sibling===null;){if(e.return===null||fp(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.flags&2||e.child===null||e.tag===4)continue e;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function bs(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?n.nodeType===8?n.parentNode.insertBefore(e,t):n.insertBefore(e,t):(n.nodeType===8?(t=n.parentNode,t.insertBefore(e,n)):(t=n,t.appendChild(e)),n=n._reactRootContainer,n!=null||t.onclick!==null||(t.onclick=dl));else if(r!==4&&(e=e.child,e!==null))for(bs(e,t,n),e=e.sibling;e!==null;)bs(e,t,n),e=e.sibling}function Bs(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?n.insertBefore(e,t):n.appendChild(e);else if(r!==4&&(e=e.child,e!==null))for(Bs(e,t,n),e=e.sibling;e!==null;)Bs(e,t,n),e=e.sibling}var fe=null,Ke=!1;function Rt(e,t,n){for(n=n.child;n!==null;)pp(e,t,n),n=n.sibling}function pp(e,t,n){if(st&&typeof st.onCommitFiberUnmount=="function")try{st.onCommitFiberUnmount(Tl,n)}catch{}switch(n.tag){case 5:ve||$n(n,t);case 6:var r=fe,o=Ke;fe=null,Rt(e,t,n),fe=r,Ke=o,fe!==null&&(Ke?(e=fe,n=n.stateNode,e.nodeType===8?e.parentNode.removeChild(n):e.removeChild(n)):fe.removeChild(n.stateNode));break;case 18:fe!==null&&(Ke?(e=fe,n=n.stateNode,e.nodeType===8?wi(e.parentNode,n):e.nodeType===1&&wi(e,n),Fr(e)):wi(fe,n.stateNode));break;case 4:r=fe,o=Ke,fe=n.stateNode.containerInfo,Ke=!0,Rt(e,t,n),fe=r,Ke=o;break;case 0:case 11:case 14:case 15:if(!ve&&(r=n.updateQueue,r!==null&&(r=r.lastEffect,r!==null))){o=r=r.next;do{var l=o,i=l.destroy;l=l.tag,i!==void 0&&(l&2||l&4)&&Ds(n,t,i),o=o.next}while(o!==r)}Rt(e,t,n);break;case 1:if(!ve&&($n(n,t),r=n.stateNode,typeof r.componentWillUnmount=="function"))try{r.props=n.memoizedProps,r.state=n.memoizedState,r.componentWillUnmount()}catch(s){te(n,t,s)}Rt(e,t,n);break;case 21:Rt(e,t,n);break;case 22:n.mode&1?(ve=(r=ve)||n.memoizedState!==null,Rt(e,t,n),ve=r):Rt(e,t,n);break;default:Rt(e,t,n)}}function fc(e){var t=e.updateQueue;if(t!==null){e.updateQueue=null;var n=e.stateNode;n===null&&(n=e.stateNode=new Qm),t.forEach(function(r){var o=ng.bind(null,e,r);n.has(r)||(n.add(r),r.then(o,o))})}}function Ye(e,t){var n=t.deletions;if(n!==null)for(var r=0;r<n.length;r++){var o=n[r];try{var l=e,i=t,s=i;e:for(;s!==null;){switch(s.tag){case 5:fe=s.stateNode,Ke=!1;break e;case 3:fe=s.stateNode.containerInfo,Ke=!0;break e;case 4:fe=s.stateNode.containerInfo,Ke=!0;break e}s=s.return}if(fe===null)throw Error(P(160));pp(l,i,o),fe=null,Ke=!1;var a=o.alternate;a!==null&&(a.return=null),o.return=null}catch(c){te(o,t,c)}}if(t.subtreeFlags&12854)for(t=t.child;t!==null;)hp(t,e),t=t.sibling}function hp(e,t){var n=e.alternate,r=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:if(Ye(t,e),rt(e),r&4){try{Rr(3,e,e.return),Bl(3,e)}catch(w){te(e,e.return,w)}try{Rr(5,e,e.return)}catch(w){te(e,e.return,w)}}break;case 1:Ye(t,e),rt(e),r&512&&n!==null&&$n(n,n.return);break;case 5:if(Ye(t,e),rt(e),r&512&&n!==null&&$n(n,n.return),e.flags&32){var o=e.stateNode;try{Tr(o,"")}catch(w){te(e,e.return,w)}}if(r&4&&(o=e.stateNode,o!=null)){var l=e.memoizedProps,i=n!==null?n.memoizedProps:l,s=e.type,a=e.updateQueue;if(e.updateQueue=null,a!==null)try{s==="input"&&l.type==="radio"&&l.name!=null&&Md(o,l),ds(s,i);var c=ds(s,l);for(i=0;i<a.length;i+=2){var h=a[i],p=a[i+1];h==="style"?bd(o,p):h==="dangerouslySetInnerHTML"?Dd(o,p):h==="children"?Tr(o,p):ua(o,h,p,c)}switch(s){case"input":is(o,l);break;case"textarea":Od(o,l);break;case"select":var m=o._wrapperState.wasMultiple;o._wrapperState.wasMultiple=!!l.multiple;var x=l.value;x!=null?Ln(o,!!l.multiple,x,!1):m!==!!l.multiple&&(l.defaultValue!=null?Ln(o,!!l.multiple,l.defaultValue,!0):Ln(o,!!l.multiple,l.multiple?[]:"",!1))}o[Ur]=l}catch(w){te(e,e.return,w)}}break;case 6:if(Ye(t,e),rt(e),r&4){if(e.stateNode===null)throw Error(P(162));o=e.stateNode,l=e.memoizedProps;try{o.nodeValue=l}catch(w){te(e,e.return,w)}}break;case 3:if(Ye(t,e),rt(e),r&4&&n!==null&&n.memoizedState.isDehydrated)try{Fr(t.containerInfo)}catch(w){te(e,e.return,w)}break;case 4:Ye(t,e),rt(e);break;case 13:Ye(t,e),rt(e),o=e.child,o.flags&8192&&(l=o.memoizedState!==null,o.stateNode.isHidden=l,!l||o.alternate!==null&&o.alternate.memoizedState!==null||(Ua=ne())),r&4&&fc(e);break;case 22:if(h=n!==null&&n.memoizedState!==null,e.mode&1?(ve=(c=ve)||h,Ye(t,e),ve=c):Ye(t,e),rt(e),r&8192){if(c=e.memoizedState!==null,(e.stateNode.isHidden=c)&&!h&&e.mode&1)for(N=e,h=e.child;h!==null;){for(p=N=h;N!==null;){switch(m=N,x=m.child,m.tag){case 0:case 11:case 14:case 15:Rr(4,m,m.return);break;case 1:$n(m,m.return);var v=m.stateNode;if(typeof v.componentWillUnmount=="function"){r=m,n=m.return;try{t=r,v.props=t.memoizedProps,v.state=t.memoizedState,v.componentWillUnmount()}catch(w){te(r,n,w)}}break;case 5:$n(m,m.return);break;case 22:if(m.memoizedState!==null){hc(p);continue}}x!==null?(x.return=m,N=x):hc(p)}h=h.sibling}e:for(h=null,p=e;;){if(p.tag===5){if(h===null){h=p;try{o=p.stateNode,c?(l=o.style,typeof l.setProperty=="function"?l.setProperty("display","none","important"):l.display="none"):(s=p.stateNode,a=p.memoizedProps.style,i=a!=null&&a.hasOwnProperty("display")?a.display:null,s.style.display=Ad("display",i))}catch(w){te(e,e.return,w)}}}else if(p.tag===6){if(h===null)try{p.stateNode.nodeValue=c?"":p.memoizedProps}catch(w){te(e,e.return,w)}}else if((p.tag!==22&&p.tag!==23||p.memoizedState===null||p===e)&&p.child!==null){p.child.return=p,p=p.child;continue}if(p===e)break e;for(;p.sibling===null;){if(p.return===null||p.return===e)break e;h===p&&(h=null),p=p.return}h===p&&(h=null),p.sibling.return=p.return,p=p.sibling}}break;case 19:Ye(t,e),rt(e),r&4&&fc(e);break;case 21:break;default:Ye(t,e),rt(e)}}function rt(e){var t=e.flags;if(t&2){try{e:{for(var n=e.return;n!==null;){if(fp(n)){var r=n;break e}n=n.return}throw Error(P(160))}switch(r.tag){case 5:var o=r.stateNode;r.flags&32&&(Tr(o,""),r.flags&=-33);var l=dc(e);Bs(e,l,o);break;case 3:case 4:var i=r.stateNode.containerInfo,s=dc(e);bs(e,s,i);break;default:throw Error(P(161))}}catch(a){te(e,e.return,a)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function Gm(e,t,n){N=e,mp(e)}function mp(e,t,n){for(var r=(e.mode&1)!==0;N!==null;){var o=N,l=o.child;if(o.tag===22&&r){var i=o.memoizedState!==null||Co;if(!i){var s=o.alternate,a=s!==null&&s.memoizedState!==null||ve;s=Co;var c=ve;if(Co=i,(ve=a)&&!c)for(N=o;N!==null;)i=N,a=i.child,i.tag===22&&i.memoizedState!==null?mc(o):a!==null?(a.return=i,N=a):mc(o);for(;l!==null;)N=l,mp(l),l=l.sibling;N=o,Co=s,ve=c}pc(e)}else o.subtreeFlags&8772&&l!==null?(l.return=o,N=l):pc(e)}}function pc(e){for(;N!==null;){var t=N;if(t.flags&8772){var n=t.alternate;try{if(t.flags&8772)switch(t.tag){case 0:case 11:case 15:ve||Bl(5,t);break;case 1:var r=t.stateNode;if(t.flags&4&&!ve)if(n===null)r.componentDidMount();else{var o=t.elementType===t.type?n.memoizedProps:Ge(t.type,n.memoizedProps);r.componentDidUpdate(o,n.memoizedState,r.__reactInternalSnapshotBeforeUpdate)}var l=t.updateQueue;l!==null&&Ju(t,l,r);break;case 3:var i=t.updateQueue;if(i!==null){if(n=null,t.child!==null)switch(t.child.tag){case 5:n=t.child.stateNode;break;case 1:n=t.child.stateNode}Ju(t,i,n)}break;case 5:var s=t.stateNode;if(n===null&&t.flags&4){n=s;var a=t.memoizedProps;switch(t.type){case"button":case"input":case"select":case"textarea":a.autoFocus&&n.focus();break;case"img":a.src&&(n.src=a.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(t.memoizedState===null){var c=t.alternate;if(c!==null){var h=c.memoizedState;if(h!==null){var p=h.dehydrated;p!==null&&Fr(p)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(P(163))}ve||t.flags&512&&As(t)}catch(m){te(t,t.return,m)}}if(t===e){N=null;break}if(n=t.sibling,n!==null){n.return=t.return,N=n;break}N=t.return}}function hc(e){for(;N!==null;){var t=N;if(t===e){N=null;break}var n=t.sibling;if(n!==null){n.return=t.return,N=n;break}N=t.return}}function mc(e){for(;N!==null;){var t=N;try{switch(t.tag){case 0:case 11:case 15:var n=t.return;try{Bl(4,t)}catch(a){te(t,n,a)}break;case 1:var r=t.stateNode;if(typeof r.componentDidMount=="function"){var o=t.return;try{r.componentDidMount()}catch(a){te(t,o,a)}}var l=t.return;try{As(t)}catch(a){te(t,l,a)}break;case 5:var i=t.return;try{As(t)}catch(a){te(t,i,a)}}}catch(a){te(t,t.return,a)}if(t===e){N=null;break}var s=t.sibling;if(s!==null){s.return=t.return,N=s;break}N=t.return}}var Km=Math.ceil,Sl=Ct.ReactCurrentDispatcher,ba=Ct.ReactCurrentOwner,Ue=Ct.ReactCurrentBatchConfig,F=0,de=null,le=null,pe=0,ze=0,Nn=Gt(0),ue=0,Gr=null,dn=0,Ul=0,Ba=0,_r=null,Ee=null,Ua=0,Hn=1/0,dt=null,Cl=!1,Us=null,Bt=null,jo=!1,It=null,jl=0,$r=0,Ws=null,Vo=-1,Qo=0;function ke(){return F&6?ne():Vo!==-1?Vo:Vo=ne()}function Ut(e){return e.mode&1?F&2&&pe!==0?pe&-pe:zm.transition!==null?(Qo===0&&(Qo=Zd()),Qo):(e=B,e!==0||(e=window.event,e=e===void 0?16:lf(e.type)),e):1}function qe(e,t,n,r){if(50<$r)throw $r=0,Ws=null,Error(P(185));qr(e,n,r),(!(F&2)||e!==de)&&(e===de&&(!(F&2)&&(Ul|=n),ue===4&&zt(e,pe)),$e(e,r),n===1&&F===0&&!(t.mode&1)&&(Hn=ne()+500,Dl&&Kt()))}function $e(e,t){var n=e.callbackNode;z0(e,t);var r=sl(e,e===de?pe:0);if(r===0)n!==null&&ju(n),e.callbackNode=null,e.callbackPriority=0;else if(t=r&-r,e.callbackPriority!==t){if(n!=null&&ju(n),t===1)e.tag===0?Lm(gc.bind(null,e)):Ef(gc.bind(null,e)),Rm(function(){!(F&6)&&Kt()}),n=null;else{switch(qd(r)){case 1:n=ha;break;case 4:n=Xd;break;case 16:n=il;break;case 536870912:n=Jd;break;default:n=il}n=Cp(n,gp.bind(null,e))}e.callbackPriority=t,e.callbackNode=n}}function gp(e,t){if(Vo=-1,Qo=0,F&6)throw Error(P(327));var n=e.callbackNode;if(On()&&e.callbackNode!==n)return null;var r=sl(e,e===de?pe:0);if(r===0)return null;if(r&30||r&e.expiredLanes||t)t=El(e,r);else{t=r;var o=F;F|=2;var l=vp();(de!==e||pe!==t)&&(dt=null,Hn=ne()+500,rn(e,t));do try{Zm();break}catch(s){yp(e,s)}while(!0);Ra(),Sl.current=l,F=o,le!==null?t=0:(de=null,pe=0,t=ue)}if(t!==0){if(t===2&&(o=gs(e),o!==0&&(r=o,t=Hs(e,o))),t===1)throw n=Gr,rn(e,0),zt(e,r),$e(e,ne()),n;if(t===6)zt(e,r);else{if(o=e.current.alternate,!(r&30)&&!Xm(o)&&(t=El(e,r),t===2&&(l=gs(e),l!==0&&(r=l,t=Hs(e,l))),t===1))throw n=Gr,rn(e,0),zt(e,r),$e(e,ne()),n;switch(e.finishedWork=o,e.finishedLanes=r,t){case 0:case 1:throw Error(P(345));case 2:Zt(e,Ee,dt);break;case 3:if(zt(e,r),(r&130023424)===r&&(t=Ua+500-ne(),10<t)){if(sl(e,0)!==0)break;if(o=e.suspendedLanes,(o&r)!==r){ke(),e.pingedLanes|=e.suspendedLanes&o;break}e.timeoutHandle=js(Zt.bind(null,e,Ee,dt),t);break}Zt(e,Ee,dt);break;case 4:if(zt(e,r),(r&4194240)===r)break;for(t=e.eventTimes,o=-1;0<r;){var i=31-Ze(r);l=1<<i,i=t[i],i>o&&(o=i),r&=~l}if(r=o,r=ne()-r,r=(120>r?120:480>r?480:1080>r?1080:1920>r?1920:3e3>r?3e3:4320>r?4320:1960*Km(r/1960))-r,10<r){e.timeoutHandle=js(Zt.bind(null,e,Ee,dt),r);break}Zt(e,Ee,dt);break;case 5:Zt(e,Ee,dt);break;default:throw Error(P(329))}}}return $e(e,ne()),e.callbackNode===n?gp.bind(null,e):null}function Hs(e,t){var n=_r;return e.current.memoizedState.isDehydrated&&(rn(e,t).flags|=256),e=El(e,t),e!==2&&(t=Ee,Ee=n,t!==null&&Vs(t)),e}function Vs(e){Ee===null?Ee=e:Ee.push.apply(Ee,e)}function Xm(e){for(var t=e;;){if(t.flags&16384){var n=t.updateQueue;if(n!==null&&(n=n.stores,n!==null))for(var r=0;r<n.length;r++){var o=n[r],l=o.getSnapshot;o=o.value;try{if(!nt(l(),o))return!1}catch{return!1}}}if(n=t.child,t.subtreeFlags&16384&&n!==null)n.return=t,t=n;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function zt(e,t){for(t&=~Ba,t&=~Ul,e.suspendedLanes|=t,e.pingedLanes&=~t,e=e.expirationTimes;0<t;){var n=31-Ze(t),r=1<<n;e[n]=-1,t&=~r}}function gc(e){if(F&6)throw Error(P(327));On();var t=sl(e,0);if(!(t&1))return $e(e,ne()),null;var n=El(e,t);if(e.tag!==0&&n===2){var r=gs(e);r!==0&&(t=r,n=Hs(e,r))}if(n===1)throw n=Gr,rn(e,0),zt(e,t),$e(e,ne()),n;if(n===6)throw Error(P(345));return e.finishedWork=e.current.alternate,e.finishedLanes=t,Zt(e,Ee,dt),$e(e,ne()),null}function Wa(e,t){var n=F;F|=1;try{return e(t)}finally{F=n,F===0&&(Hn=ne()+500,Dl&&Kt())}}function fn(e){It!==null&&It.tag===0&&!(F&6)&&On();var t=F;F|=1;var n=Ue.transition,r=B;try{if(Ue.transition=null,B=1,e)return e()}finally{B=r,Ue.transition=n,F=t,!(F&6)&&Kt()}}function Ha(){ze=Nn.current,G(Nn)}function rn(e,t){e.finishedWork=null,e.finishedLanes=0;var n=e.timeoutHandle;if(n!==-1&&(e.timeoutHandle=-1,Pm(n)),le!==null)for(n=le.return;n!==null;){var r=n;switch(ja(r),r.tag){case 1:r=r.type.childContextTypes,r!=null&&fl();break;case 3:Un(),G(Re),G(xe),Ta();break;case 5:za(r);break;case 4:Un();break;case 13:G(X);break;case 19:G(X);break;case 10:_a(r.type._context);break;case 22:case 23:Ha()}n=n.return}if(de=e,le=e=Wt(e.current,null),pe=ze=t,ue=0,Gr=null,Ba=Ul=dn=0,Ee=_r=null,tn!==null){for(t=0;t<tn.length;t++)if(n=tn[t],r=n.interleaved,r!==null){n.interleaved=null;var o=r.next,l=n.pending;if(l!==null){var i=l.next;l.next=o,r.next=i}n.pending=r}tn=null}return e}function yp(e,t){do{var n=le;try{if(Ra(),Uo.current=kl,wl){for(var r=J.memoizedState;r!==null;){var o=r.queue;o!==null&&(o.pending=null),r=r.next}wl=!1}if(cn=0,ce=se=J=null,Pr=!1,Vr=0,ba.current=null,n===null||n.return===null){ue=1,Gr=t,le=null;break}e:{var l=e,i=n.return,s=n,a=t;if(t=pe,s.flags|=32768,a!==null&&typeof a=="object"&&typeof a.then=="function"){var c=a,h=s,p=h.tag;if(!(h.mode&1)&&(p===0||p===11||p===15)){var m=h.alternate;m?(h.updateQueue=m.updateQueue,h.memoizedState=m.memoizedState,h.lanes=m.lanes):(h.updateQueue=null,h.memoizedState=null)}var x=rc(i);if(x!==null){x.flags&=-257,oc(x,i,s,l,t),x.mode&1&&nc(l,c,t),t=x,a=c;var v=t.updateQueue;if(v===null){var w=new Set;w.add(a),t.updateQueue=w}else v.add(a);break e}else{if(!(t&1)){nc(l,c,t),Va();break e}a=Error(P(426))}}else if(K&&s.mode&1){var E=rc(i);if(E!==null){!(E.flags&65536)&&(E.flags|=256),oc(E,i,s,l,t),Ea(Wn(a,s));break e}}l=a=Wn(a,s),ue!==4&&(ue=2),_r===null?_r=[l]:_r.push(l),l=i;do{switch(l.tag){case 3:l.flags|=65536,t&=-t,l.lanes|=t;var f=ep(l,a,t);Xu(l,f);break e;case 1:s=a;var d=l.type,g=l.stateNode;if(!(l.flags&128)&&(typeof d.getDerivedStateFromError=="function"||g!==null&&typeof g.componentDidCatch=="function"&&(Bt===null||!Bt.has(g)))){l.flags|=65536,t&=-t,l.lanes|=t;var S=tp(l,s,t);Xu(l,S);break e}}l=l.return}while(l!==null)}wp(n)}catch(j){t=j,le===n&&n!==null&&(le=n=n.return);continue}break}while(!0)}function vp(){var e=Sl.current;return Sl.current=kl,e===null?kl:e}function Va(){(ue===0||ue===3||ue===2)&&(ue=4),de===null||!(dn&268435455)&&!(Ul&268435455)||zt(de,pe)}function El(e,t){var n=F;F|=2;var r=vp();(de!==e||pe!==t)&&(dt=null,rn(e,t));do try{Jm();break}catch(o){yp(e,o)}while(!0);if(Ra(),F=n,Sl.current=r,le!==null)throw Error(P(261));return de=null,pe=0,ue}function Jm(){for(;le!==null;)xp(le)}function Zm(){for(;le!==null&&!C0();)xp(le)}function xp(e){var t=Sp(e.alternate,e,ze);e.memoizedProps=e.pendingProps,t===null?wp(e):le=t,ba.current=null}function wp(e){var t=e;do{var n=t.alternate;if(e=t.return,t.flags&32768){if(n=Vm(n,t),n!==null){n.flags&=32767,le=n;return}if(e!==null)e.flags|=32768,e.subtreeFlags=0,e.deletions=null;else{ue=6,le=null;return}}else if(n=Hm(n,t,ze),n!==null){le=n;return}if(t=t.sibling,t!==null){le=t;return}le=t=e}while(t!==null);ue===0&&(ue=5)}function Zt(e,t,n){var r=B,o=Ue.transition;try{Ue.transition=null,B=1,qm(e,t,n,r)}finally{Ue.transition=o,B=r}return null}function qm(e,t,n,r){do On();while(It!==null);if(F&6)throw Error(P(327));n=e.finishedWork;var o=e.finishedLanes;if(n===null)return null;if(e.finishedWork=null,e.finishedLanes=0,n===e.current)throw Error(P(177));e.callbackNode=null,e.callbackPriority=0;var l=n.lanes|n.childLanes;if(T0(e,l),e===de&&(le=de=null,pe=0),!(n.subtreeFlags&2064)&&!(n.flags&2064)||jo||(jo=!0,Cp(il,function(){return On(),null})),l=(n.flags&15990)!==0,n.subtreeFlags&15990||l){l=Ue.transition,Ue.transition=null;var i=B;B=1;var s=F;F|=4,ba.current=null,Ym(e,n),hp(n,e),xm(Ss),al=!!ks,Ss=ks=null,e.current=n,Gm(n),j0(),F=s,B=i,Ue.transition=l}else e.current=n;if(jo&&(jo=!1,It=e,jl=o),l=e.pendingLanes,l===0&&(Bt=null),R0(n.stateNode),$e(e,ne()),t!==null)for(r=e.onRecoverableError,n=0;n<t.length;n++)o=t[n],r(o.value,{componentStack:o.stack,digest:o.digest});if(Cl)throw Cl=!1,e=Us,Us=null,e;return jl&1&&e.tag!==0&&On(),l=e.pendingLanes,l&1?e===Ws?$r++:($r=0,Ws=e):$r=0,Kt(),null}function On(){if(It!==null){var e=qd(jl),t=Ue.transition,n=B;try{if(Ue.transition=null,B=16>e?16:e,It===null)var r=!1;else{if(e=It,It=null,jl=0,F&6)throw Error(P(331));var o=F;for(F|=4,N=e.current;N!==null;){var l=N,i=l.child;if(N.flags&16){var s=l.deletions;if(s!==null){for(var a=0;a<s.length;a++){var c=s[a];for(N=c;N!==null;){var h=N;switch(h.tag){case 0:case 11:case 15:Rr(8,h,l)}var p=h.child;if(p!==null)p.return=h,N=p;else for(;N!==null;){h=N;var m=h.sibling,x=h.return;if(dp(h),h===c){N=null;break}if(m!==null){m.return=x,N=m;break}N=x}}}var v=l.alternate;if(v!==null){var w=v.child;if(w!==null){v.child=null;do{var E=w.sibling;w.sibling=null,w=E}while(w!==null)}}N=l}}if(l.subtreeFlags&2064&&i!==null)i.return=l,N=i;else e:for(;N!==null;){if(l=N,l.flags&2048)switch(l.tag){case 0:case 11:case 15:Rr(9,l,l.return)}var f=l.sibling;if(f!==null){f.return=l.return,N=f;break e}N=l.return}}var d=e.current;for(N=d;N!==null;){i=N;var g=i.child;if(i.subtreeFlags&2064&&g!==null)g.return=i,N=g;else e:for(i=d;N!==null;){if(s=N,s.flags&2048)try{switch(s.tag){case 0:case 11:case 15:Bl(9,s)}}catch(j){te(s,s.return,j)}if(s===i){N=null;break e}var S=s.sibling;if(S!==null){S.return=s.return,N=S;break e}N=s.return}}if(F=o,Kt(),st&&typeof st.onPostCommitFiberRoot=="function")try{st.onPostCommitFiberRoot(Tl,e)}catch{}r=!0}return r}finally{B=n,Ue.transition=t}}return!1}function yc(e,t,n){t=Wn(n,t),t=ep(e,t,1),e=bt(e,t,1),t=ke(),e!==null&&(qr(e,1,t),$e(e,t))}function te(e,t,n){if(e.tag===3)yc(e,e,n);else for(;t!==null;){if(t.tag===3){yc(t,e,n);break}else if(t.tag===1){var r=t.stateNode;if(typeof t.type.getDerivedStateFromError=="function"||typeof r.componentDidCatch=="function"&&(Bt===null||!Bt.has(r))){e=Wn(n,e),e=tp(t,e,1),t=bt(t,e,1),e=ke(),t!==null&&(qr(t,1,e),$e(t,e));break}}t=t.return}}function eg(e,t,n){var r=e.pingCache;r!==null&&r.delete(t),t=ke(),e.pingedLanes|=e.suspendedLanes&n,de===e&&(pe&n)===n&&(ue===4||ue===3&&(pe&130023424)===pe&&500>ne()-Ua?rn(e,0):Ba|=n),$e(e,t)}function kp(e,t){t===0&&(e.mode&1?(t=ho,ho<<=1,!(ho&130023424)&&(ho=4194304)):t=1);var n=ke();e=wt(e,t),e!==null&&(qr(e,t,n),$e(e,n))}function tg(e){var t=e.memoizedState,n=0;t!==null&&(n=t.retryLane),kp(e,n)}function ng(e,t){var n=0;switch(e.tag){case 13:var r=e.stateNode,o=e.memoizedState;o!==null&&(n=o.retryLane);break;case 19:r=e.stateNode;break;default:throw Error(P(314))}r!==null&&r.delete(t),kp(e,n)}var Sp;Sp=function(e,t,n){if(e!==null)if(e.memoizedProps!==t.pendingProps||Re.current)Pe=!0;else{if(!(e.lanes&n)&&!(t.flags&128))return Pe=!1,Wm(e,t,n);Pe=!!(e.flags&131072)}else Pe=!1,K&&t.flags&1048576&&Pf(t,ml,t.index);switch(t.lanes=0,t.tag){case 2:var r=t.type;Ho(e,t),e=t.pendingProps;var o=An(t,xe.current);Mn(t,n),o=Ma(null,t,r,e,o,n);var l=Oa();return t.flags|=1,typeof o=="object"&&o!==null&&typeof o.render=="function"&&o.$$typeof===void 0?(t.tag=1,t.memoizedState=null,t.updateQueue=null,_e(r)?(l=!0,pl(t)):l=!1,t.memoizedState=o.state!==null&&o.state!==void 0?o.state:null,Na(t),o.updater=bl,t.stateNode=o,o._reactInternals=t,Ls(t,r,e,n),t=Is(null,t,r,!0,l,n)):(t.tag=0,K&&l&&Ca(t),we(null,t,o,n),t=t.child),t;case 16:r=t.elementType;e:{switch(Ho(e,t),e=t.pendingProps,o=r._init,r=o(r._payload),t.type=r,o=t.tag=og(r),e=Ge(r,e),o){case 0:t=Ts(null,t,r,e,n);break e;case 1:t=sc(null,t,r,e,n);break e;case 11:t=lc(null,t,r,e,n);break e;case 14:t=ic(null,t,r,Ge(r.type,e),n);break e}throw Error(P(306,r,""))}return t;case 0:return r=t.type,o=t.pendingProps,o=t.elementType===r?o:Ge(r,o),Ts(e,t,r,o,n);case 1:return r=t.type,o=t.pendingProps,o=t.elementType===r?o:Ge(r,o),sc(e,t,r,o,n);case 3:e:{if(lp(t),e===null)throw Error(P(387));r=t.pendingProps,l=t.memoizedState,o=l.element,zf(e,t),vl(t,r,null,n);var i=t.memoizedState;if(r=i.element,l.isDehydrated)if(l={element:r,isDehydrated:!1,cache:i.cache,pendingSuspenseBoundaries:i.pendingSuspenseBoundaries,transitions:i.transitions},t.updateQueue.baseState=l,t.memoizedState=l,t.flags&256){o=Wn(Error(P(423)),t),t=ac(e,t,r,n,o);break e}else if(r!==o){o=Wn(Error(P(424)),t),t=ac(e,t,r,n,o);break e}else for(Te=At(t.stateNode.containerInfo.firstChild),Ie=t,K=!0,Je=null,n=Nf(t,null,r,n),t.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling;else{if(bn(),r===o){t=kt(e,t,n);break e}we(e,t,r,n)}t=t.child}return t;case 5:return Tf(t),e===null&&_s(t),r=t.type,o=t.pendingProps,l=e!==null?e.memoizedProps:null,i=o.children,Cs(r,o)?i=null:l!==null&&Cs(r,l)&&(t.flags|=32),op(e,t),we(e,t,i,n),t.child;case 6:return e===null&&_s(t),null;case 13:return ip(e,t,n);case 4:return La(t,t.stateNode.containerInfo),r=t.pendingProps,e===null?t.child=Bn(t,null,r,n):we(e,t,r,n),t.child;case 11:return r=t.type,o=t.pendingProps,o=t.elementType===r?o:Ge(r,o),lc(e,t,r,o,n);case 7:return we(e,t,t.pendingProps,n),t.child;case 8:return we(e,t,t.pendingProps.children,n),t.child;case 12:return we(e,t,t.pendingProps.children,n),t.child;case 10:e:{if(r=t.type._context,o=t.pendingProps,l=t.memoizedProps,i=o.value,H(gl,r._currentValue),r._currentValue=i,l!==null)if(nt(l.value,i)){if(l.children===o.children&&!Re.current){t=kt(e,t,n);break e}}else for(l=t.child,l!==null&&(l.return=t);l!==null;){var s=l.dependencies;if(s!==null){i=l.child;for(var a=s.firstContext;a!==null;){if(a.context===r){if(l.tag===1){a=yt(-1,n&-n),a.tag=2;var c=l.updateQueue;if(c!==null){c=c.shared;var h=c.pending;h===null?a.next=a:(a.next=h.next,h.next=a),c.pending=a}}l.lanes|=n,a=l.alternate,a!==null&&(a.lanes|=n),$s(l.return,n,t),s.lanes|=n;break}a=a.next}}else if(l.tag===10)i=l.type===t.type?null:l.child;else if(l.tag===18){if(i=l.return,i===null)throw Error(P(341));i.lanes|=n,s=i.alternate,s!==null&&(s.lanes|=n),$s(i,n,t),i=l.sibling}else i=l.child;if(i!==null)i.return=l;else for(i=l;i!==null;){if(i===t){i=null;break}if(l=i.sibling,l!==null){l.return=i.return,i=l;break}i=i.return}l=i}we(e,t,o.children,n),t=t.child}return t;case 9:return o=t.type,r=t.pendingProps.children,Mn(t,n),o=We(o),r=r(o),t.flags|=1,we(e,t,r,n),t.child;case 14:return r=t.type,o=Ge(r,t.pendingProps),o=Ge(r.type,o),ic(e,t,r,o,n);case 15:return np(e,t,t.type,t.pendingProps,n);case 17:return r=t.type,o=t.pendingProps,o=t.elementType===r?o:Ge(r,o),Ho(e,t),t.tag=1,_e(r)?(e=!0,pl(t)):e=!1,Mn(t,n),qf(t,r,o),Ls(t,r,o,n),Is(null,t,r,!0,e,n);case 19:return sp(e,t,n);case 22:return rp(e,t,n)}throw Error(P(156,t.tag))};function Cp(e,t){return Kd(e,t)}function rg(e,t,n,r){this.tag=e,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Be(e,t,n,r){return new rg(e,t,n,r)}function Qa(e){return e=e.prototype,!(!e||!e.isReactComponent)}function og(e){if(typeof e=="function")return Qa(e)?1:0;if(e!=null){if(e=e.$$typeof,e===da)return 11;if(e===fa)return 14}return 2}function Wt(e,t){var n=e.alternate;return n===null?(n=Be(e.tag,t,e.key,e.mode),n.elementType=e.elementType,n.type=e.type,n.stateNode=e.stateNode,n.alternate=e,e.alternate=n):(n.pendingProps=t,n.type=e.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=e.flags&14680064,n.childLanes=e.childLanes,n.lanes=e.lanes,n.child=e.child,n.memoizedProps=e.memoizedProps,n.memoizedState=e.memoizedState,n.updateQueue=e.updateQueue,t=e.dependencies,n.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},n.sibling=e.sibling,n.index=e.index,n.ref=e.ref,n}function Yo(e,t,n,r,o,l){var i=2;if(r=e,typeof e=="function")Qa(e)&&(i=1);else if(typeof e=="string")i=5;else e:switch(e){case wn:return on(n.children,o,l,t);case ca:i=8,o|=8;break;case ts:return e=Be(12,n,t,o|2),e.elementType=ts,e.lanes=l,e;case ns:return e=Be(13,n,t,o),e.elementType=ns,e.lanes=l,e;case rs:return e=Be(19,n,t,o),e.elementType=rs,e.lanes=l,e;case zd:return Wl(n,o,l,t);default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case Nd:i=10;break e;case Ld:i=9;break e;case da:i=11;break e;case fa:i=14;break e;case $t:i=16,r=null;break e}throw Error(P(130,e==null?e:typeof e,""))}return t=Be(i,n,t,o),t.elementType=e,t.type=r,t.lanes=l,t}function on(e,t,n,r){return e=Be(7,e,r,t),e.lanes=n,e}function Wl(e,t,n,r){return e=Be(22,e,r,t),e.elementType=zd,e.lanes=n,e.stateNode={isHidden:!1},e}function _i(e,t,n){return e=Be(6,e,null,t),e.lanes=n,e}function $i(e,t,n){return t=Be(4,e.children!==null?e.children:[],e.key,t),t.lanes=n,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}function lg(e,t,n,r,o){this.tag=t,this.containerInfo=e,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=ui(0),this.expirationTimes=ui(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=ui(0),this.identifierPrefix=r,this.onRecoverableError=o,this.mutableSourceEagerHydrationData=null}function Ya(e,t,n,r,o,l,i,s,a){return e=new lg(e,t,n,s,a),t===1?(t=1,l===!0&&(t|=8)):t=0,l=Be(3,null,null,t),e.current=l,l.stateNode=e,l.memoizedState={element:r,isDehydrated:n,cache:null,transitions:null,pendingSuspenseBoundaries:null},Na(l),e}function ig(e,t,n){var r=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:xn,key:r==null?null:""+r,children:e,containerInfo:t,implementation:n}}function jp(e){if(!e)return Qt;e=e._reactInternals;e:{if(mn(e)!==e||e.tag!==1)throw Error(P(170));var t=e;do{switch(t.tag){case 3:t=t.stateNode.context;break e;case 1:if(_e(t.type)){t=t.stateNode.__reactInternalMemoizedMergedChildContext;break e}}t=t.return}while(t!==null);throw Error(P(171))}if(e.tag===1){var n=e.type;if(_e(n))return jf(e,n,t)}return t}function Ep(e,t,n,r,o,l,i,s,a){return e=Ya(n,r,!0,e,o,l,i,s,a),e.context=jp(null),n=e.current,r=ke(),o=Ut(n),l=yt(r,o),l.callback=t??null,bt(n,l,o),e.current.lanes=o,qr(e,o,r),$e(e,r),e}function Hl(e,t,n,r){var o=t.current,l=ke(),i=Ut(o);return n=jp(n),t.context===null?t.context=n:t.pendingContext=n,t=yt(l,i),t.payload={element:e},r=r===void 0?null:r,r!==null&&(t.callback=r),e=bt(o,t,i),e!==null&&(qe(e,o,i,l),Bo(e,o,i)),i}function Pl(e){if(e=e.current,!e.child)return null;switch(e.child.tag){case 5:return e.child.stateNode;default:return e.child.stateNode}}function vc(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var n=e.retryLane;e.retryLane=n!==0&&n<t?n:t}}function Ga(e,t){vc(e,t),(e=e.alternate)&&vc(e,t)}function sg(){return null}var Pp=typeof reportError=="function"?reportError:function(e){console.error(e)};function Ka(e){this._internalRoot=e}Vl.prototype.render=Ka.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(P(409));Hl(e,t,null,null)};Vl.prototype.unmount=Ka.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;fn(function(){Hl(null,e,null,null)}),t[xt]=null}};function Vl(e){this._internalRoot=e}Vl.prototype.unstable_scheduleHydration=function(e){if(e){var t=nf();e={blockedOn:null,target:e,priority:t};for(var n=0;n<Lt.length&&t!==0&&t<Lt[n].priority;n++);Lt.splice(n,0,e),n===0&&of(e)}};function Xa(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function Ql(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11&&(e.nodeType!==8||e.nodeValue!==" react-mount-point-unstable "))}function xc(){}function ag(e,t,n,r,o){if(o){if(typeof r=="function"){var l=r;r=function(){var c=Pl(i);l.call(c)}}var i=Ep(t,r,e,0,null,!1,!1,"",xc);return e._reactRootContainer=i,e[xt]=i.current,br(e.nodeType===8?e.parentNode:e),fn(),i}for(;o=e.lastChild;)e.removeChild(o);if(typeof r=="function"){var s=r;r=function(){var c=Pl(a);s.call(c)}}var a=Ya(e,0,!1,null,null,!1,!1,"",xc);return e._reactRootContainer=a,e[xt]=a.current,br(e.nodeType===8?e.parentNode:e),fn(function(){Hl(t,a,n,r)}),a}function Yl(e,t,n,r,o){var l=n._reactRootContainer;if(l){var i=l;if(typeof o=="function"){var s=o;o=function(){var a=Pl(i);s.call(a)}}Hl(t,i,e,o)}else i=ag(n,t,e,o,r);return Pl(i)}ef=function(e){switch(e.tag){case 3:var t=e.stateNode;if(t.current.memoizedState.isDehydrated){var n=fr(t.pendingLanes);n!==0&&(ma(t,n|1),$e(t,ne()),!(F&6)&&(Hn=ne()+500,Kt()))}break;case 13:fn(function(){var r=wt(e,1);if(r!==null){var o=ke();qe(r,e,1,o)}}),Ga(e,1)}};ga=function(e){if(e.tag===13){var t=wt(e,134217728);if(t!==null){var n=ke();qe(t,e,134217728,n)}Ga(e,134217728)}};tf=function(e){if(e.tag===13){var t=Ut(e),n=wt(e,t);if(n!==null){var r=ke();qe(n,e,t,r)}Ga(e,t)}};nf=function(){return B};rf=function(e,t){var n=B;try{return B=e,t()}finally{B=n}};ps=function(e,t,n){switch(t){case"input":if(is(e,n),t=n.name,n.type==="radio"&&t!=null){for(n=e;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll("input[name="+JSON.stringify(""+t)+'][type="radio"]'),t=0;t<n.length;t++){var r=n[t];if(r!==e&&r.form===e.form){var o=Fl(r);if(!o)throw Error(P(90));Id(r),is(r,o)}}}break;case"textarea":Od(e,n);break;case"select":t=n.value,t!=null&&Ln(e,!!n.multiple,t,!1)}};Wd=Wa;Hd=fn;var ug={usingClientEntryPoint:!1,Events:[to,jn,Fl,Bd,Ud,Wa]},sr={findFiberByHostInstance:en,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},cg={bundleType:sr.bundleType,version:sr.version,rendererPackageName:sr.rendererPackageName,rendererConfig:sr.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:Ct.ReactCurrentDispatcher,findHostInstanceByFiber:function(e){return e=Yd(e),e===null?null:e.stateNode},findFiberByHostInstance:sr.findFiberByHostInstance||sg,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var Eo=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Eo.isDisabled&&Eo.supportsFiber)try{Tl=Eo.inject(cg),st=Eo}catch{}}Oe.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=ug;Oe.createPortal=function(e,t){var n=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!Xa(t))throw Error(P(200));return ig(e,t,null,n)};Oe.createRoot=function(e,t){if(!Xa(e))throw Error(P(299));var n=!1,r="",o=Pp;return t!=null&&(t.unstable_strictMode===!0&&(n=!0),t.identifierPrefix!==void 0&&(r=t.identifierPrefix),t.onRecoverableError!==void 0&&(o=t.onRecoverableError)),t=Ya(e,1,!1,null,null,n,!1,r,o),e[xt]=t.current,br(e.nodeType===8?e.parentNode:e),new Ka(t)};Oe.findDOMNode=function(e){if(e==null)return null;if(e.nodeType===1)return e;var t=e._reactInternals;if(t===void 0)throw typeof e.render=="function"?Error(P(188)):(e=Object.keys(e).join(","),Error(P(268,e)));return e=Yd(t),e=e===null?null:e.stateNode,e};Oe.flushSync=function(e){return fn(e)};Oe.hydrate=function(e,t,n){if(!Ql(t))throw Error(P(200));return Yl(null,e,t,!0,n)};Oe.hydrateRoot=function(e,t,n){if(!Xa(e))throw Error(P(405));var r=n!=null&&n.hydratedSources||null,o=!1,l="",i=Pp;if(n!=null&&(n.unstable_strictMode===!0&&(o=!0),n.identifierPrefix!==void 0&&(l=n.identifierPrefix),n.onRecoverableError!==void 0&&(i=n.onRecoverableError)),t=Ep(t,null,e,1,n??null,o,!1,l,i),e[xt]=t.current,br(e),r)for(e=0;e<r.length;e++)n=r[e],o=n._getVersion,o=o(n._source),t.mutableSourceEagerHydrationData==null?t.mutableSourceEagerHydrationData=[n,o]:t.mutableSourceEagerHydrationData.push(n,o);return new Vl(t)};Oe.render=function(e,t,n){if(!Ql(t))throw Error(P(200));return Yl(null,e,t,!1,n)};Oe.unmountComponentAtNode=function(e){if(!Ql(e))throw Error(P(40));return e._reactRootContainer?(fn(function(){Yl(null,null,e,!1,function(){e._reactRootContainer=null,e[xt]=null})}),!0):!1};Oe.unstable_batchedUpdates=Wa;Oe.unstable_renderSubtreeIntoContainer=function(e,t,n,r){if(!Ql(n))throw Error(P(200));if(e==null||e._reactInternals===void 0)throw Error(P(38));return Yl(e,t,n,!1,r)};Oe.version="18.3.1-next-f1338f8080-20240426";function Rp(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(Rp)}catch(e){console.error(e)}}Rp(),Pd.exports=Oe;var dg=Pd.exports,_p,wc=dg;_p=wc.createRoot,wc.hydrateRoot;/**
 * react-router v7.16.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */var kc="popstate";function Sc(e){return typeof e=="object"&&e!=null&&"pathname"in e&&"search"in e&&"hash"in e&&"state"in e&&"key"in e}function fg(e={}){function t(r,o){var c;let l=(c=o.state)==null?void 0:c.masked,{pathname:i,search:s,hash:a}=l||r.location;return Qs("",{pathname:i,search:s,hash:a},o.state&&o.state.usr||null,o.state&&o.state.key||"default",l?{pathname:r.location.pathname,search:r.location.search,hash:r.location.hash}:void 0)}function n(r,o){return typeof o=="string"?o:Kr(o)}return hg(t,n,null,e)}function Z(e,t){if(e===!1||e===null||typeof e>"u")throw new Error(t)}function ut(e,t){if(!e){typeof console<"u"&&console.warn(t);try{throw new Error(t)}catch{}}}function pg(){return Math.random().toString(36).substring(2,10)}function Cc(e,t){return{usr:e.state,key:e.key,idx:t,masked:e.mask?{pathname:e.pathname,search:e.search,hash:e.hash}:void 0}}function Qs(e,t,n=null,r,o){return{pathname:typeof e=="string"?e:e.pathname,search:"",hash:"",...typeof t=="string"?Jn(t):t,state:n,key:t&&t.key||r||pg(),mask:o}}function Kr({pathname:e="/",search:t="",hash:n=""}){return t&&t!=="?"&&(e+=t.charAt(0)==="?"?t:"?"+t),n&&n!=="#"&&(e+=n.charAt(0)==="#"?n:"#"+n),e}function Jn(e){let t={};if(e){let n=e.indexOf("#");n>=0&&(t.hash=e.substring(n),e=e.substring(0,n));let r=e.indexOf("?");r>=0&&(t.search=e.substring(r),e=e.substring(0,r)),e&&(t.pathname=e)}return t}function hg(e,t,n,r={}){let{window:o=document.defaultView,v5Compat:l=!1}=r,i=o.history,s="POP",a=null,c=h();c==null&&(c=0,i.replaceState({...i.state,idx:c},""));function h(){return(i.state||{idx:null}).idx}function p(){s="POP";let E=h(),f=E==null?null:E-c;c=E,a&&a({action:s,location:w.location,delta:f})}function m(E,f){s="PUSH";let d=Sc(E)?E:Qs(w.location,E,f);c=h()+1;let g=Cc(d,c),S=w.createHref(d.mask||d);try{i.pushState(g,"",S)}catch(j){if(j instanceof DOMException&&j.name==="DataCloneError")throw j;o.location.assign(S)}l&&a&&a({action:s,location:w.location,delta:1})}function x(E,f){s="REPLACE";let d=Sc(E)?E:Qs(w.location,E,f);c=h();let g=Cc(d,c),S=w.createHref(d.mask||d);i.replaceState(g,"",S),l&&a&&a({action:s,location:w.location,delta:0})}function v(E){return mg(o,E)}let w={get action(){return s},get location(){return e(o,i)},listen(E){if(a)throw new Error("A history only accepts one active listener");return o.addEventListener(kc,p),a=E,()=>{o.removeEventListener(kc,p),a=null}},createHref(E){return t(o,E)},createURL:v,encodeLocation(E){let f=v(E);return{pathname:f.pathname,search:f.search,hash:f.hash}},push:m,replace:x,go(E){return i.go(E)}};return w}function mg(e,t,n=!1){let r="http://localhost";e&&(r=e.location.origin!=="null"?e.location.origin:e.location.href),Z(r,"No window.location.(origin|href) available to create URL");let o=typeof t=="string"?t:Kr(t);return o=o.replace(/ $/,"%20"),!n&&o.startsWith("//")&&(o=r+o),new URL(o,r)}function $p(e,t,n="/"){return gg(e,t,n,!1)}function gg(e,t,n,r,o){let l=typeof t=="string"?Jn(t):t,i=St(l.pathname||"/",n);if(i==null)return null;let s=yg(e),a=null,c=$g(i);for(let h=0;a==null&&h<s.length;++h)a=Rg(s[h],c,r);return a}function yg(e){let t=Np(e);return vg(t),t}function Np(e,t=[],n=[],r="",o=!1){let l=(i,s,a=o,c)=>{let h={relativePath:c===void 0?i.path||"":c,caseSensitive:i.caseSensitive===!0,childrenIndex:s,route:i};if(h.relativePath.startsWith("/")){if(!h.relativePath.startsWith(r)&&a)return;Z(h.relativePath.startsWith(r),`Absolute route path "${h.relativePath}" nested under path "${r}" is not valid. An absolute child route path must start with the combined path of all its parent routes.`),h.relativePath=h.relativePath.slice(r.length)}let p=et([r,h.relativePath]),m=n.concat(h);i.children&&i.children.length>0&&(Z(i.index!==!0,`Index routes must not have child routes. Please remove all child routes from route path "${p}".`),Np(i.children,t,m,p,a)),!(i.path==null&&!i.index)&&t.push({path:p,score:Eg(p,i.index),routesMeta:m})};return e.forEach((i,s)=>{var a;if(i.path===""||!((a=i.path)!=null&&a.includes("?")))l(i,s);else for(let c of Lp(i.path))l(i,s,!0,c)}),t}function Lp(e){let t=e.split("/");if(t.length===0)return[];let[n,...r]=t,o=n.endsWith("?"),l=n.replace(/\?$/,"");if(r.length===0)return o?[l,""]:[l];let i=Lp(r.join("/")),s=[];return s.push(...i.map(a=>a===""?l:[l,a].join("/"))),o&&s.push(...i),s.map(a=>e.startsWith("/")&&a===""?"/":a)}function vg(e){e.sort((t,n)=>t.score!==n.score?n.score-t.score:Pg(t.routesMeta.map(r=>r.childrenIndex),n.routesMeta.map(r=>r.childrenIndex)))}var xg=/^:[\w-]+$/,wg=3,kg=2,Sg=1,Cg=10,jg=-2,jc=e=>e==="*";function Eg(e,t){let n=e.split("/"),r=n.length;return n.some(jc)&&(r+=jg),t&&(r+=kg),n.filter(o=>!jc(o)).reduce((o,l)=>o+(xg.test(l)?wg:l===""?Sg:Cg),r)}function Pg(e,t){return e.length===t.length&&e.slice(0,-1).every((r,o)=>r===t[o])?e[e.length-1]-t[t.length-1]:0}function Rg(e,t,n=!1){let{routesMeta:r}=e,o={},l="/",i=[];for(let s=0;s<r.length;++s){let a=r[s],c=s===r.length-1,h=l==="/"?t:t.slice(l.length)||"/",p=Rl({path:a.relativePath,caseSensitive:a.caseSensitive,end:c},h),m=a.route;if(!p&&c&&n&&!r[r.length-1].route.index&&(p=Rl({path:a.relativePath,caseSensitive:a.caseSensitive,end:!1},h)),!p)return null;Object.assign(o,p.params),i.push({params:o,pathname:et([l,p.pathname]),pathnameBase:Tg(et([l,p.pathnameBase])),route:m}),p.pathnameBase!=="/"&&(l=et([l,p.pathnameBase]))}return i}function Rl(e,t){typeof e=="string"&&(e={path:e,caseSensitive:!1,end:!0});let[n,r]=_g(e.path,e.caseSensitive,e.end),o=t.match(n);if(!o)return null;let l=o[0],i=l.replace(/(.)\/+$/,"$1"),s=o.slice(1);return{params:r.reduce((c,{paramName:h,isOptional:p},m)=>{if(h==="*"){let v=s[m]||"";i=l.slice(0,l.length-v.length).replace(/(.)\/+$/,"$1")}const x=s[m];return p&&!x?c[h]=void 0:c[h]=(x||"").replace(/%2F/g,"/"),c},{}),pathname:l,pathnameBase:i,pattern:e}}function _g(e,t=!1,n=!0){ut(e==="*"||!e.endsWith("*")||e.endsWith("/*"),`Route path "${e}" will be treated as if it were "${e.replace(/\*$/,"/*")}" because the \`*\` character must always follow a \`/\` in the pattern. To get rid of this warning, please change the route path to "${e.replace(/\*$/,"/*")}".`);let r=[],o="^"+e.replace(/\/*\*?$/,"").replace(/^\/*/,"/").replace(/[\\.*+^${}|()[\]]/g,"\\$&").replace(/\/:([\w-]+)(\?)?/g,(i,s,a,c,h)=>{if(r.push({paramName:s,isOptional:a!=null}),a){let p=h.charAt(c+i.length);return p&&p!=="/"?"/([^\\/]*)":"(?:/([^\\/]*))?"}return"/([^\\/]+)"}).replace(/\/([\w-]+)\?(\/|$)/g,"(/$1)?$2");return e.endsWith("*")?(r.push({paramName:"*"}),o+=e==="*"||e==="/*"?"(.*)$":"(?:\\/(.+)|\\/*)$"):n?o+="\\/*$":e!==""&&e!=="/"&&(o+="(?:(?=\\/|$))"),[new RegExp(o,t?void 0:"i"),r]}function $g(e){try{return e.split("/").map(t=>decodeURIComponent(t).replace(/\//g,"%2F")).join("/")}catch(t){return ut(!1,`The URL path "${e}" could not be decoded because it is a malformed URL segment. This is probably due to a bad percent encoding (${t}).`),e}}function St(e,t){if(t==="/")return e;if(!e.toLowerCase().startsWith(t.toLowerCase()))return null;let n=t.endsWith("/")?t.length-1:t.length,r=e.charAt(n);return r&&r!=="/"?null:e.slice(n)||"/"}var Ng=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i;function Lg(e,t="/"){let{pathname:n,search:r="",hash:o=""}=typeof e=="string"?Jn(e):e,l;return n?(n=Tp(n),n.startsWith("/")?l=Ec(n.substring(1),"/"):l=Ec(n,t)):l=t,{pathname:l,search:Ig(r),hash:Mg(o)}}function Ec(e,t){let n=_l(t).split("/");return e.split("/").forEach(o=>{o===".."?n.length>1&&n.pop():o!=="."&&n.push(o)}),n.length>1?n.join("/"):"/"}function Ni(e,t,n,r){return`Cannot include a '${e}' character in a manually specified \`to.${t}\` field [${JSON.stringify(r)}].  Please separate it out to the \`to.${n}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`}function zg(e){return e.filter((t,n)=>n===0||t.route.path&&t.route.path.length>0)}function zp(e){let t=zg(e);return t.map((n,r)=>r===t.length-1?n.pathname:n.pathnameBase)}function Ja(e,t,n,r=!1){let o;typeof e=="string"?o=Jn(e):(o={...e},Z(!o.pathname||!o.pathname.includes("?"),Ni("?","pathname","search",o)),Z(!o.pathname||!o.pathname.includes("#"),Ni("#","pathname","hash",o)),Z(!o.search||!o.search.includes("#"),Ni("#","search","hash",o)));let l=e===""||o.pathname==="",i=l?"/":o.pathname,s;if(i==null)s=n;else{let p=t.length-1;if(!r&&i.startsWith("..")){let m=i.split("/");for(;m[0]==="..";)m.shift(),p-=1;o.pathname=m.join("/")}s=p>=0?t[p]:"/"}let a=Lg(o,s),c=i&&i!=="/"&&i.endsWith("/"),h=(l||i===".")&&n.endsWith("/");return!a.pathname.endsWith("/")&&(c||h)&&(a.pathname+="/"),a}var Tp=e=>e.replace(/\/\/+/g,"/"),et=e=>Tp(e.join("/")),_l=e=>e.replace(/\/+$/,""),Tg=e=>_l(e).replace(/^\/*/,"/"),Ig=e=>!e||e==="?"?"":e.startsWith("?")?e:"?"+e,Mg=e=>!e||e==="#"?"":e.startsWith("#")?e:"#"+e,Og=class{constructor(e,t,n,r=!1){this.status=e,this.statusText=t||"",this.internal=r,n instanceof Error?(this.data=n.toString(),this.error=n):this.data=n}};function Fg(e){return e!=null&&typeof e.status=="number"&&typeof e.statusText=="string"&&typeof e.internal=="boolean"&&"data"in e}function Dg(e){let t=e.map(n=>n.route.path).filter(Boolean);return et(t)||"/"}var Ip=typeof window<"u"&&typeof window.document<"u"&&typeof window.document.createElement<"u";function Mp(e,t){let n=e;if(typeof n!="string"||!Ng.test(n))return{absoluteURL:void 0,isExternal:!1,to:n};let r=n,o=!1;if(Ip)try{let l=new URL(window.location.href),i=n.startsWith("//")?new URL(l.protocol+n):new URL(n),s=St(i.pathname,t);i.origin===l.origin&&s!=null?n=s+i.search+i.hash:o=!0}catch{ut(!1,`<Link to="${n}"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.`)}return{absoluteURL:r,isExternal:o,to:n}}Object.getOwnPropertyNames(Object.prototype).sort().join("\0");var Op=["POST","PUT","PATCH","DELETE"];new Set(Op);var Ag=["GET",...Op];new Set(Ag);var Zn=k.createContext(null);Zn.displayName="DataRouter";var Gl=k.createContext(null);Gl.displayName="DataRouterState";var Fp=k.createContext(!1);function bg(){return k.useContext(Fp)}var Dp=k.createContext({isTransitioning:!1});Dp.displayName="ViewTransition";var Bg=k.createContext(new Map);Bg.displayName="Fetchers";var Ug=k.createContext(null);Ug.displayName="Await";var Qe=k.createContext(null);Qe.displayName="Navigation";var ro=k.createContext(null);ro.displayName="Location";var jt=k.createContext({outlet:null,matches:[],isDataRoute:!1});jt.displayName="Route";var Za=k.createContext(null);Za.displayName="RouteError";var Ap="REACT_ROUTER_ERROR",Wg="REDIRECT",Hg="ROUTE_ERROR_RESPONSE";function Vg(e){if(e.startsWith(`${Ap}:${Wg}:{`))try{let t=JSON.parse(e.slice(28));if(typeof t=="object"&&t&&typeof t.status=="number"&&typeof t.statusText=="string"&&typeof t.location=="string"&&typeof t.reloadDocument=="boolean"&&typeof t.replace=="boolean")return t}catch{}}function Qg(e){if(e.startsWith(`${Ap}:${Hg}:{`))try{let t=JSON.parse(e.slice(40));if(typeof t=="object"&&t&&typeof t.status=="number"&&typeof t.statusText=="string")return new Og(t.status,t.statusText,t.data)}catch{}}function Yg(e,{relative:t}={}){Z(oo(),"useHref() may be used only in the context of a <Router> component.");let{basename:n,navigator:r}=k.useContext(Qe),{hash:o,pathname:l,search:i}=lo(e,{relative:t}),s=l;return n!=="/"&&(s=l==="/"?n:et([n,l])),r.createHref({pathname:s,search:i,hash:o})}function oo(){return k.useContext(ro)!=null}function ct(){return Z(oo(),"useLocation() may be used only in the context of a <Router> component."),k.useContext(ro).location}var bp="You should call navigate() in a React.useEffect(), not when your component is first rendered.";function Bp(e){k.useContext(Qe).static||k.useLayoutEffect(e)}function qa(){let{isDataRoute:e}=k.useContext(jt);return e?i1():Gg()}function Gg(){Z(oo(),"useNavigate() may be used only in the context of a <Router> component.");let e=k.useContext(Zn),{basename:t,navigator:n}=k.useContext(Qe),{matches:r}=k.useContext(jt),{pathname:o}=ct(),l=JSON.stringify(zp(r)),i=k.useRef(!1);return Bp(()=>{i.current=!0}),k.useCallback((a,c={})=>{if(ut(i.current,bp),!i.current)return;if(typeof a=="number"){n.go(a);return}let h=Ja(a,JSON.parse(l),o,c.relative==="path");e==null&&t!=="/"&&(h.pathname=h.pathname==="/"?t:et([t,h.pathname])),(c.replace?n.replace:n.push)(h,c.state,c)},[t,n,l,o,e])}k.createContext(null);function lo(e,{relative:t}={}){let{matches:n}=k.useContext(jt),{pathname:r}=ct(),o=JSON.stringify(zp(n));return k.useMemo(()=>Ja(e,JSON.parse(o),r,t==="path"),[e,o,r,t])}function Kg(e,t){return Up(e,t)}function Up(e,t,n){var E;Z(oo(),"useRoutes() may be used only in the context of a <Router> component.");let{navigator:r}=k.useContext(Qe),{matches:o}=k.useContext(jt),l=o[o.length-1],i=l?l.params:{},s=l?l.pathname:"/",a=l?l.pathnameBase:"/",c=l&&l.route;{let f=c&&c.path||"";Hp(s,!c||f.endsWith("*")||f.endsWith("*?"),`You rendered descendant <Routes> (or called \`useRoutes()\`) at "${s}" (under <Route path="${f}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

Please change the parent <Route path="${f}"> to <Route path="${f==="/"?"*":`${f}/*`}">.`)}let h=ct(),p;if(t){let f=typeof t=="string"?Jn(t):t;Z(a==="/"||((E=f.pathname)==null?void 0:E.startsWith(a)),`When overriding the location using \`<Routes location>\` or \`useRoutes(routes, location)\`, the location pathname must begin with the portion of the URL pathname that was matched by all parent routes. The current pathname base is "${a}" but pathname "${f.pathname}" was given in the \`location\` prop.`),p=f}else p=h;let m=p.pathname||"/",x=m;if(a!=="/"){let f=a.replace(/^\//,"").split("/");x="/"+m.replace(/^\//,"").split("/").slice(f.length).join("/")}let v=n&&n.state.matches.length?n.state.matches.map(f=>Object.assign(f,{route:n.manifest[f.route.id]||f.route})):$p(e,{pathname:x});ut(c||v!=null,`No routes matched location "${p.pathname}${p.search}${p.hash}" `),ut(v==null||v[v.length-1].route.element!==void 0||v[v.length-1].route.Component!==void 0||v[v.length-1].route.lazy!==void 0,`Matched leaf route at location "${p.pathname}${p.search}${p.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`);let w=e1(v&&v.map(f=>Object.assign({},f,{params:Object.assign({},i,f.params),pathname:et([a,r.encodeLocation?r.encodeLocation(f.pathname.replace(/%/g,"%25").replace(/\?/g,"%3F").replace(/#/g,"%23")).pathname:f.pathname]),pathnameBase:f.pathnameBase==="/"?a:et([a,r.encodeLocation?r.encodeLocation(f.pathnameBase.replace(/%/g,"%25").replace(/\?/g,"%3F").replace(/#/g,"%23")).pathname:f.pathnameBase])})),o,n);return t&&w?k.createElement(ro.Provider,{value:{location:{pathname:"/",search:"",hash:"",state:null,key:"default",mask:void 0,...p},navigationType:"POP"}},w):w}function Xg(){let e=l1(),t=Fg(e)?`${e.status} ${e.statusText}`:e instanceof Error?e.message:JSON.stringify(e),n=e instanceof Error?e.stack:null,r="rgba(200,200,200, 0.5)",o={padding:"0.5rem",backgroundColor:r},l={padding:"2px 4px",backgroundColor:r},i=null;return console.error("Error handled by React Router default ErrorBoundary:",e),i=k.createElement(k.Fragment,null,k.createElement("p",null,"💿 Hey developer 👋"),k.createElement("p",null,"You can provide a way better UX than this when your app throws errors by providing your own ",k.createElement("code",{style:l},"ErrorBoundary")," or"," ",k.createElement("code",{style:l},"errorElement")," prop on your route.")),k.createElement(k.Fragment,null,k.createElement("h2",null,"Unexpected Application Error!"),k.createElement("h3",{style:{fontStyle:"italic"}},t),n?k.createElement("pre",{style:o},n):null,i)}var Jg=k.createElement(Xg,null),Wp=class extends k.Component{constructor(e){super(e),this.state={location:e.location,revalidation:e.revalidation,error:e.error}}static getDerivedStateFromError(e){return{error:e}}static getDerivedStateFromProps(e,t){return t.location!==e.location||t.revalidation!=="idle"&&e.revalidation==="idle"?{error:e.error,location:e.location,revalidation:e.revalidation}:{error:e.error!==void 0?e.error:t.error,location:t.location,revalidation:e.revalidation||t.revalidation}}componentDidCatch(e,t){this.props.onError?this.props.onError(e,t):console.error("React Router caught the following error during render",e)}render(){let e=this.state.error;if(this.context&&typeof e=="object"&&e&&"digest"in e&&typeof e.digest=="string"){const n=Qg(e.digest);n&&(e=n)}let t=e!==void 0?k.createElement(jt.Provider,{value:this.props.routeContext},k.createElement(Za.Provider,{value:e,children:this.props.component})):this.props.children;return this.context?k.createElement(Zg,{error:e},t):t}};Wp.contextType=Fp;var Li=new WeakMap;function Zg({children:e,error:t}){let{basename:n}=k.useContext(Qe);if(typeof t=="object"&&t&&"digest"in t&&typeof t.digest=="string"){let r=Vg(t.digest);if(r){let o=Li.get(t);if(o)throw o;let l=Mp(r.location,n);if(Ip&&!Li.get(t))if(l.isExternal||r.reloadDocument)window.location.href=l.absoluteURL||l.to;else{const i=Promise.resolve().then(()=>window.__reactRouterDataRouter.navigate(l.to,{replace:r.replace}));throw Li.set(t,i),i}return k.createElement("meta",{httpEquiv:"refresh",content:`0;url=${l.absoluteURL||l.to}`})}}return e}function qg({routeContext:e,match:t,children:n}){let r=k.useContext(Zn);return r&&r.static&&r.staticContext&&(t.route.errorElement||t.route.ErrorBoundary)&&(r.staticContext._deepestRenderedBoundaryId=t.route.id),k.createElement(jt.Provider,{value:e},n)}function e1(e,t=[],n){let r=n==null?void 0:n.state;if(e==null){if(!r)return null;if(r.errors)e=r.matches;else if(t.length===0&&!r.initialized&&r.matches.length>0)e=r.matches;else return null}let o=e,l=r==null?void 0:r.errors;if(l!=null){let h=o.findIndex(p=>p.route.id&&(l==null?void 0:l[p.route.id])!==void 0);Z(h>=0,`Could not find a matching route for errors on route IDs: ${Object.keys(l).join(",")}`),o=o.slice(0,Math.min(o.length,h+1))}let i=!1,s=-1;if(n&&r){i=r.renderFallback;for(let h=0;h<o.length;h++){let p=o[h];if((p.route.HydrateFallback||p.route.hydrateFallbackElement)&&(s=h),p.route.id){let{loaderData:m,errors:x}=r,v=p.route.loader&&!m.hasOwnProperty(p.route.id)&&(!x||x[p.route.id]===void 0);if(p.route.lazy||v){n.isStatic&&(i=!0),s>=0?o=o.slice(0,s+1):o=[o[0]];break}}}}let a=n==null?void 0:n.onError,c=r&&a?(h,p)=>{var m,x;a(h,{location:r.location,params:((x=(m=r.matches)==null?void 0:m[0])==null?void 0:x.params)??{},pattern:Dg(r.matches),errorInfo:p})}:void 0;return o.reduceRight((h,p,m)=>{let x,v=!1,w=null,E=null;r&&(x=l&&p.route.id?l[p.route.id]:void 0,w=p.route.errorElement||Jg,i&&(s<0&&m===0?(Hp("route-fallback",!1,"No `HydrateFallback` element provided to render during initial hydration"),v=!0,E=null):s===m&&(v=!0,E=p.route.hydrateFallbackElement||null)));let f=t.concat(o.slice(0,m+1)),d=()=>{let g;return x?g=w:v?g=E:p.route.Component?g=k.createElement(p.route.Component,null):p.route.element?g=p.route.element:g=h,k.createElement(qg,{match:p,routeContext:{outlet:h,matches:f,isDataRoute:r!=null},children:g})};return r&&(p.route.ErrorBoundary||p.route.errorElement||m===0)?k.createElement(Wp,{location:r.location,revalidation:r.revalidation,component:w,error:x,children:d(),routeContext:{outlet:null,matches:f,isDataRoute:!0},onError:c}):d()},null)}function eu(e){return`${e} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`}function t1(e){let t=k.useContext(Zn);return Z(t,eu(e)),t}function n1(e){let t=k.useContext(Gl);return Z(t,eu(e)),t}function r1(e){let t=k.useContext(jt);return Z(t,eu(e)),t}function tu(e){let t=r1(e),n=t.matches[t.matches.length-1];return Z(n.route.id,`${e} can only be used on routes that contain a unique "id"`),n.route.id}function o1(){return tu("useRouteId")}function l1(){var r;let e=k.useContext(Za),t=n1("useRouteError"),n=tu("useRouteError");return e!==void 0?e:(r=t.errors)==null?void 0:r[n]}function i1(){let{router:e}=t1("useNavigate"),t=tu("useNavigate"),n=k.useRef(!1);return Bp(()=>{n.current=!0}),k.useCallback(async(o,l={})=>{ut(n.current,bp),n.current&&(typeof o=="number"?await e.navigate(o):await e.navigate(o,{fromRouteId:t,...l}))},[e,t])}var Pc={};function Hp(e,t,n){!t&&!Pc[e]&&(Pc[e]=!0,ut(!1,n))}k.memo(s1);function s1({routes:e,manifest:t,future:n,state:r,isStatic:o,onError:l}){return Up(e,void 0,{manifest:t,state:r,isStatic:o,onError:l})}function hr(e){Z(!1,"A <Route> is only ever to be used as the child of <Routes> element, never rendered directly. Please wrap your <Route> in a <Routes>.")}function a1({basename:e="/",children:t=null,location:n,navigationType:r="POP",navigator:o,static:l=!1,useTransitions:i}){Z(!oo(),"You cannot render a <Router> inside another <Router>. You should never have more than one in your app.");let s=e.replace(/^\/*/,"/"),a=k.useMemo(()=>({basename:s,navigator:o,static:l,useTransitions:i,future:{}}),[s,o,l,i]);typeof n=="string"&&(n=Jn(n));let{pathname:c="/",search:h="",hash:p="",state:m=null,key:x="default",mask:v}=n,w=k.useMemo(()=>{let E=St(c,s);return E==null?null:{location:{pathname:E,search:h,hash:p,state:m,key:x,mask:v},navigationType:r}},[s,c,h,p,m,x,r,v]);return ut(w!=null,`<Router basename="${s}"> is not able to match the URL "${c}${h}${p}" because it does not start with the basename, so the <Router> won't render anything.`),w==null?null:k.createElement(Qe.Provider,{value:a},k.createElement(ro.Provider,{children:t,value:w}))}function u1({children:e,location:t}){return Kg(Ys(e),t)}function Ys(e,t=[]){let n=[];return k.Children.forEach(e,(r,o)=>{if(!k.isValidElement(r))return;let l=[...t,o];if(r.type===k.Fragment){n.push.apply(n,Ys(r.props.children,l));return}Z(r.type===hr,`[${typeof r.type=="string"?r.type:r.type.name}] is not a <Route> component. All component children of <Routes> must be a <Route> or <React.Fragment>`),Z(!r.props.index||!r.props.children,"An index route cannot have child routes.");let i={id:r.props.id||l.join("-"),caseSensitive:r.props.caseSensitive,element:r.props.element,Component:r.props.Component,index:r.props.index,path:r.props.path,middleware:r.props.middleware,loader:r.props.loader,action:r.props.action,hydrateFallbackElement:r.props.hydrateFallbackElement,HydrateFallback:r.props.HydrateFallback,errorElement:r.props.errorElement,ErrorBoundary:r.props.ErrorBoundary,hasErrorBoundary:r.props.hasErrorBoundary===!0||r.props.ErrorBoundary!=null||r.props.errorElement!=null,shouldRevalidate:r.props.shouldRevalidate,handle:r.props.handle,lazy:r.props.lazy};r.props.children&&(i.children=Ys(r.props.children,l)),n.push(i)}),n}var Go="get",Ko="application/x-www-form-urlencoded";function Kl(e){return typeof HTMLElement<"u"&&e instanceof HTMLElement}function c1(e){return Kl(e)&&e.tagName.toLowerCase()==="button"}function d1(e){return Kl(e)&&e.tagName.toLowerCase()==="form"}function f1(e){return Kl(e)&&e.tagName.toLowerCase()==="input"}function p1(e){return!!(e.metaKey||e.altKey||e.ctrlKey||e.shiftKey)}function h1(e,t){return e.button===0&&(!t||t==="_self")&&!p1(e)}var Po=null;function m1(){if(Po===null)try{new FormData(document.createElement("form"),0),Po=!1}catch{Po=!0}return Po}var g1=new Set(["application/x-www-form-urlencoded","multipart/form-data","text/plain"]);function zi(e){return e!=null&&!g1.has(e)?(ut(!1,`"${e}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${Ko}"`),null):e}function y1(e,t){let n,r,o,l,i;if(d1(e)){let s=e.getAttribute("action");r=s?St(s,t):null,n=e.getAttribute("method")||Go,o=zi(e.getAttribute("enctype"))||Ko,l=new FormData(e)}else if(c1(e)||f1(e)&&(e.type==="submit"||e.type==="image")){let s=e.form;if(s==null)throw new Error('Cannot submit a <button> or <input type="submit"> without a <form>');let a=e.getAttribute("formaction")||s.getAttribute("action");if(r=a?St(a,t):null,n=e.getAttribute("formmethod")||s.getAttribute("method")||Go,o=zi(e.getAttribute("formenctype"))||zi(s.getAttribute("enctype"))||Ko,l=new FormData(s,e),!m1()){let{name:c,type:h,value:p}=e;if(h==="image"){let m=c?`${c}.`:"";l.append(`${m}x`,"0"),l.append(`${m}y`,"0")}else c&&l.append(c,p)}}else{if(Kl(e))throw new Error('Cannot submit element that is not <form>, <button>, or <input type="submit|image">');n=Go,r=null,o=Ko,i=e}return l&&o==="text/plain"&&(i=l,l=void 0),{action:r,method:n.toLowerCase(),encType:o,formData:l,body:i}}Object.getOwnPropertyNames(Object.prototype).sort().join("\0");function nu(e,t){if(e===!1||e===null||typeof e>"u")throw new Error(t)}function Vp(e,t,n,r){let o=typeof e=="string"?new URL(e,typeof window>"u"?"server://singlefetch/":window.location.origin):e;return n?o.pathname.endsWith("/")?o.pathname=`${o.pathname}_.${r}`:o.pathname=`${o.pathname}.${r}`:o.pathname==="/"?o.pathname=`_root.${r}`:t&&St(o.pathname,t)==="/"?o.pathname=`${_l(t)}/_root.${r}`:o.pathname=`${_l(o.pathname)}.${r}`,o}async function v1(e,t){if(e.id in t)return t[e.id];try{let n=await import(e.module);return t[e.id]=n,n}catch(n){return console.error(`Error loading route module \`${e.module}\`, reloading page...`),console.error(n),window.__reactRouterContext&&window.__reactRouterContext.isSpaMode,window.location.reload(),new Promise(()=>{})}}function x1(e){return e==null?!1:e.href==null?e.rel==="preload"&&typeof e.imageSrcSet=="string"&&typeof e.imageSizes=="string":typeof e.rel=="string"&&typeof e.href=="string"}async function w1(e,t,n){let r=await Promise.all(e.map(async o=>{let l=t.routes[o.route.id];if(l){let i=await v1(l,n);return i.links?i.links():[]}return[]}));return j1(r.flat(1).filter(x1).filter(o=>o.rel==="stylesheet"||o.rel==="preload").map(o=>o.rel==="stylesheet"?{...o,rel:"prefetch",as:"style"}:{...o,rel:"prefetch"}))}function Rc(e,t,n,r,o,l){let i=(a,c)=>n[c]?a.route.id!==n[c].route.id:!0,s=(a,c)=>{var h;return n[c].pathname!==a.pathname||((h=n[c].route.path)==null?void 0:h.endsWith("*"))&&n[c].params["*"]!==a.params["*"]};return l==="assets"?t.filter((a,c)=>i(a,c)||s(a,c)):l==="data"?t.filter((a,c)=>{var p;let h=r.routes[a.route.id];if(!h||!h.hasLoader)return!1;if(i(a,c)||s(a,c))return!0;if(a.route.shouldRevalidate){let m=a.route.shouldRevalidate({currentUrl:new URL(o.pathname+o.search+o.hash,window.origin),currentParams:((p=n[0])==null?void 0:p.params)||{},nextUrl:new URL(e,window.origin),nextParams:a.params,defaultShouldRevalidate:!0});if(typeof m=="boolean")return m}return!0}):[]}function k1(e,t,{includeHydrateFallback:n}={}){return S1(e.map(r=>{let o=t.routes[r.route.id];if(!o)return[];let l=[o.module];return o.clientActionModule&&(l=l.concat(o.clientActionModule)),o.clientLoaderModule&&(l=l.concat(o.clientLoaderModule)),n&&o.hydrateFallbackModule&&(l=l.concat(o.hydrateFallbackModule)),o.imports&&(l=l.concat(o.imports)),l}).flat(1))}function S1(e){return[...new Set(e)]}function C1(e){let t={},n=Object.keys(e).sort();for(let r of n)t[r]=e[r];return t}function j1(e,t){let n=new Set;return new Set(t),e.reduce((r,o)=>{let l=JSON.stringify(C1(o));return n.has(l)||(n.add(l),r.push({key:l,link:o})),r},[])}function ru(){let e=k.useContext(Zn);return nu(e,"You must render this element inside a <DataRouterContext.Provider> element"),e}function E1(){let e=k.useContext(Gl);return nu(e,"You must render this element inside a <DataRouterStateContext.Provider> element"),e}var ou=k.createContext(void 0);ou.displayName="FrameworkContext";function lu(){let e=k.useContext(ou);return nu(e,"You must render this element inside a <HydratedRouter> element"),e}function P1(e,t){let n=k.useContext(ou),[r,o]=k.useState(!1),[l,i]=k.useState(!1),{onFocus:s,onBlur:a,onMouseEnter:c,onMouseLeave:h,onTouchStart:p}=t,m=k.useRef(null);k.useEffect(()=>{if(e==="render"&&i(!0),e==="viewport"){let w=f=>{f.forEach(d=>{i(d.isIntersecting)})},E=new IntersectionObserver(w,{threshold:.5});return m.current&&E.observe(m.current),()=>{E.disconnect()}}},[e]),k.useEffect(()=>{if(r){let w=setTimeout(()=>{i(!0)},100);return()=>{clearTimeout(w)}}},[r]);let x=()=>{o(!0)},v=()=>{o(!1),i(!1)};return n?e!=="intent"?[l,m,{}]:[l,m,{onFocus:ar(s,x),onBlur:ar(a,v),onMouseEnter:ar(c,x),onMouseLeave:ar(h,v),onTouchStart:ar(p,x)}]:[!1,m,{}]}function ar(e,t){return n=>{e&&e(n),n.defaultPrevented||t(n)}}function R1({page:e,...t}){let n=bg(),{router:r}=ru(),o=k.useMemo(()=>$p(r.routes,e,r.basename),[r.routes,e,r.basename]);return o?n?k.createElement($1,{page:e,matches:o,...t}):k.createElement(N1,{page:e,matches:o,...t}):null}function _1(e){let{manifest:t,routeModules:n}=lu(),[r,o]=k.useState([]);return k.useEffect(()=>{let l=!1;return w1(e,t,n).then(i=>{l||o(i)}),()=>{l=!0}},[e,t,n]),r}function $1({page:e,matches:t,...n}){let r=ct(),{future:o}=lu(),{basename:l}=ru(),i=k.useMemo(()=>{if(e===r.pathname+r.search+r.hash)return[];let s=Vp(e,l,o.v8_trailingSlashAwareDataRequests,"rsc"),a=!1,c=[];for(let h of t)typeof h.route.shouldRevalidate=="function"?a=!0:c.push(h.route.id);return a&&c.length>0&&s.searchParams.set("_routes",c.join(",")),[s.pathname+s.search]},[l,o.v8_trailingSlashAwareDataRequests,e,r,t]);return k.createElement(k.Fragment,null,i.map(s=>k.createElement("link",{key:s,rel:"prefetch",as:"fetch",href:s,...n})))}function N1({page:e,matches:t,...n}){let r=ct(),{future:o,manifest:l,routeModules:i}=lu(),{basename:s}=ru(),{loaderData:a,matches:c}=E1(),h=k.useMemo(()=>Rc(e,t,c,l,r,"data"),[e,t,c,l,r]),p=k.useMemo(()=>Rc(e,t,c,l,r,"assets"),[e,t,c,l,r]),m=k.useMemo(()=>{if(e===r.pathname+r.search+r.hash)return[];let w=new Set,E=!1;if(t.forEach(d=>{var S;let g=l.routes[d.route.id];!g||!g.hasLoader||(!h.some(j=>j.route.id===d.route.id)&&d.route.id in a&&((S=i[d.route.id])!=null&&S.shouldRevalidate)||g.hasClientLoader?E=!0:w.add(d.route.id))}),w.size===0)return[];let f=Vp(e,s,o.v8_trailingSlashAwareDataRequests,"data");return E&&w.size>0&&f.searchParams.set("_routes",t.filter(d=>w.has(d.route.id)).map(d=>d.route.id).join(",")),[f.pathname+f.search]},[s,o.v8_trailingSlashAwareDataRequests,a,r,l,h,t,e,i]),x=k.useMemo(()=>k1(p,l),[p,l]),v=_1(p);return k.createElement(k.Fragment,null,m.map(w=>k.createElement("link",{key:w,rel:"prefetch",as:"fetch",href:w,...n})),x.map(w=>k.createElement("link",{key:w,rel:"modulepreload",href:w,...n})),v.map(({key:w,link:E})=>k.createElement("link",{key:w,nonce:n.nonce,...E,crossOrigin:E.crossOrigin??n.crossOrigin})))}function L1(...e){return t=>{e.forEach(n=>{typeof n=="function"?n(t):n!=null&&(n.current=t)})}}var z1=typeof window<"u"&&typeof window.document<"u"&&typeof window.document.createElement<"u";try{z1&&(window.__reactRouterVersion="7.16.0")}catch{}function T1({basename:e,children:t,useTransitions:n,window:r}){let o=k.useRef();o.current==null&&(o.current=fg({window:r,v5Compat:!0}));let l=o.current,[i,s]=k.useState({action:l.action,location:l.location}),a=k.useCallback(c=>{n===!1?s(c):k.startTransition(()=>s(c))},[n]);return k.useLayoutEffect(()=>l.listen(a),[l,a]),k.createElement(a1,{basename:e,children:t,location:i.location,navigationType:i.action,navigator:l,useTransitions:n})}var Qp=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,Yp=k.forwardRef(function({onClick:t,discover:n="render",prefetch:r="none",relative:o,reloadDocument:l,replace:i,mask:s,state:a,target:c,to:h,preventScrollReset:p,viewTransition:m,defaultShouldRevalidate:x,...v},w){let{basename:E,navigator:f,useTransitions:d}=k.useContext(Qe),g=typeof h=="string"&&Qp.test(h),S=Mp(h,E);h=S.to;let j=Yg(h,{relative:o}),_=ct(),C=null;if(s){let me=Ja(s,[],_.mask?_.mask.pathname:"/",!0);E!=="/"&&(me.pathname=me.pathname==="/"?E:et([E,me.pathname])),C=f.createHref(me)}let[R,O,T]=P1(r,v),W=F1(h,{replace:i,mask:s,state:a,target:c,preventScrollReset:p,relative:o,viewTransition:m,defaultShouldRevalidate:x,useTransitions:d});function Ne(me){t&&t(me),me.defaultPrevented||W(me)}let V=!(S.isExternal||l),je=k.createElement("a",{...v,...T,href:(V?C:void 0)||S.absoluteURL||j,onClick:V?Ne:t,ref:L1(w,O),target:c,"data-discover":!g&&n==="render"?"true":void 0});return R&&!g?k.createElement(k.Fragment,null,je,k.createElement(R1,{page:j})):je});Yp.displayName="Link";var I1=k.forwardRef(function({"aria-current":t="page",caseSensitive:n=!1,className:r="",end:o=!1,style:l,to:i,viewTransition:s,children:a,...c},h){let p=lo(i,{relative:c.relative}),m=ct(),x=k.useContext(Gl),{navigator:v,basename:w}=k.useContext(Qe),E=x!=null&&U1(p)&&s===!0,f=v.encodeLocation?v.encodeLocation(p).pathname:p.pathname,d=m.pathname,g=x&&x.navigation&&x.navigation.location?x.navigation.location.pathname:null;n||(d=d.toLowerCase(),g=g?g.toLowerCase():null,f=f.toLowerCase()),g&&w&&(g=St(g,w)||g);const S=f!=="/"&&f.endsWith("/")?f.length-1:f.length;let j=d===f||!o&&d.startsWith(f)&&d.charAt(S)==="/",_=g!=null&&(g===f||!o&&g.startsWith(f)&&g.charAt(f.length)==="/"),C={isActive:j,isPending:_,isTransitioning:E},R=j?t:void 0,O;typeof r=="function"?O=r(C):O=[r,j?"active":null,_?"pending":null,E?"transitioning":null].filter(Boolean).join(" ");let T=typeof l=="function"?l(C):l;return k.createElement(Yp,{...c,"aria-current":R,className:O,ref:h,style:T,to:i,viewTransition:s},typeof a=="function"?a(C):a)});I1.displayName="NavLink";var M1=k.forwardRef(({discover:e="render",fetcherKey:t,navigate:n,reloadDocument:r,replace:o,state:l,method:i=Go,action:s,onSubmit:a,relative:c,preventScrollReset:h,viewTransition:p,defaultShouldRevalidate:m,...x},v)=>{let{useTransitions:w}=k.useContext(Qe),E=b1(),f=B1(s,{relative:c}),d=i.toLowerCase()==="get"?"get":"post",g=typeof s=="string"&&Qp.test(s),S=j=>{if(a&&a(j),j.defaultPrevented)return;j.preventDefault();let _=j.nativeEvent.submitter,C=(_==null?void 0:_.getAttribute("formmethod"))||i,R=()=>E(_||j.currentTarget,{fetcherKey:t,method:C,navigate:n,replace:o,state:l,relative:c,preventScrollReset:h,viewTransition:p,defaultShouldRevalidate:m});w&&n!==!1?k.startTransition(()=>R()):R()};return k.createElement("form",{ref:v,method:d,action:f,onSubmit:r?a:S,...x,"data-discover":!g&&e==="render"?"true":void 0})});M1.displayName="Form";function O1(e){return`${e} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`}function Gp(e){let t=k.useContext(Zn);return Z(t,O1(e)),t}function F1(e,{target:t,replace:n,mask:r,state:o,preventScrollReset:l,relative:i,viewTransition:s,defaultShouldRevalidate:a,useTransitions:c}={}){let h=qa(),p=ct(),m=lo(e,{relative:i});return k.useCallback(x=>{if(h1(x,t)){x.preventDefault();let v=n!==void 0?n:Kr(p)===Kr(m),w=()=>h(e,{replace:v,mask:r,state:o,preventScrollReset:l,relative:i,viewTransition:s,defaultShouldRevalidate:a});c?k.startTransition(()=>w()):w()}},[p,h,m,n,r,o,t,e,l,i,s,a,c])}var D1=0,A1=()=>`__${String(++D1)}__`;function b1(){let{router:e}=Gp("useSubmit"),{basename:t}=k.useContext(Qe),n=o1(),r=e.fetch,o=e.navigate;return k.useCallback(async(l,i={})=>{let{action:s,method:a,encType:c,formData:h,body:p}=y1(l,t);if(i.navigate===!1){let m=i.fetcherKey||A1();await r(m,n,i.action||s,{defaultShouldRevalidate:i.defaultShouldRevalidate,preventScrollReset:i.preventScrollReset,formData:h,body:p,formMethod:i.method||a,formEncType:i.encType||c,flushSync:i.flushSync})}else await o(i.action||s,{defaultShouldRevalidate:i.defaultShouldRevalidate,preventScrollReset:i.preventScrollReset,formData:h,body:p,formMethod:i.method||a,formEncType:i.encType||c,replace:i.replace,state:i.state,fromRouteId:n,flushSync:i.flushSync,viewTransition:i.viewTransition})},[r,o,t,n])}function B1(e,{relative:t}={}){let{basename:n}=k.useContext(Qe),r=k.useContext(jt);Z(r,"useFormAction must be used inside a RouteContext");let[o]=r.matches.slice(-1),l={...lo(e||".",{relative:t})},i=ct();if(e==null){l.search=i.search;let s=new URLSearchParams(l.search),a=s.getAll("index");if(a.some(h=>h==="")){s.delete("index"),a.filter(p=>p).forEach(p=>s.append("index",p));let h=s.toString();l.search=h?`?${h}`:""}}return(!e||e===".")&&o.route.index&&(l.search=l.search?l.search.replace(/^\?/,"?index&"):"?index"),n!=="/"&&(l.pathname=l.pathname==="/"?n:et([n,l.pathname])),Kr(l)}function U1(e,{relative:t}={}){let n=k.useContext(Dp);Z(n!=null,"`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?");let{basename:r}=Gp("useViewTransitionState"),o=lo(e,{relative:t});if(!n.isTransitioning)return!1;let l=St(n.currentLocation.pathname,r)||n.currentLocation.pathname,i=St(n.nextLocation.pathname,r)||n.nextLocation.pathname;return Rl(o.pathname,i)!=null||Rl(o.pathname,l)!=null}var Y="-ms-",Nr="-moz-",A="-webkit-",Kp="comm",Xl="rule",iu="decl",W1="@import",H1="@namespace",Xp="@keyframes",V1="@layer",Jp=Math.abs,su=String.fromCharCode,Gs=Object.assign;function Q1(e,t){return ae(e,0)^45?(((t<<2^ae(e,0))<<2^ae(e,1))<<2^ae(e,2))<<2^ae(e,3):0}function Zp(e){return e.trim()}function ft(e,t){return(e=t.exec(e))?e[0]:e}function I(e,t,n){return e.replace(t,n)}function Xo(e,t,n){return e.indexOf(t,n)}function ae(e,t){return e.charCodeAt(t)|0}function pn(e,t,n){return e.slice(t,n)}function Xe(e){return e.length}function qp(e){return e.length}function mr(e,t){return t.push(e),e}function Y1(e,t){return e.map(t).join("")}function _c(e,t){return e.filter(function(n){return!ft(n,t)})}var Jl=1,Vn=1,eh=0,Ve=0,oe=0,qn="";function Zl(e,t,n,r,o,l,i,s){return{value:e,root:t,parent:n,type:r,props:o,children:l,line:Jl,column:Vn,length:i,return:"",siblings:s}}function _t(e,t){return Gs(Zl("",null,null,"",null,null,0,e.siblings),e,{length:-e.length},t)}function yn(e){for(;e.root;)e=_t(e.root,{children:[e]});mr(e,e.siblings)}function G1(){return oe}function K1(){return oe=Ve>0?ae(qn,--Ve):0,Vn--,oe===10&&(Vn=1,Jl--),oe}function tt(){return oe=Ve<eh?ae(qn,Ve++):0,Vn++,oe===10&&(Vn=1,Jl++),oe}function Mt(){return ae(qn,Ve)}function Jo(){return Ve}function ql(e,t){return pn(qn,e,t)}function Xr(e){switch(e){case 0:case 9:case 10:case 13:case 32:return 5;case 33:case 43:case 44:case 47:case 62:case 64:case 126:case 59:case 123:case 125:return 4;case 58:return 3;case 34:case 39:case 40:case 91:return 2;case 41:case 93:return 1}return 0}function X1(e){return Jl=Vn=1,eh=Xe(qn=e),Ve=0,[]}function J1(e){return qn="",e}function Ti(e){return Zp(ql(Ve-1,Ks(e===91?e+2:e===40?e+1:e)))}function Z1(e){for(;(oe=Mt())&&oe<33;)tt();return Xr(e)>2||Xr(oe)>3?"":" "}function q1(e,t){for(;--t&&tt()&&!(oe<48||oe>102||oe>57&&oe<65||oe>70&&oe<97););return ql(e,Jo()+(t<6&&Mt()==32&&tt()==32))}function Ks(e){for(;tt();)switch(oe){case e:return Ve;case 34:case 39:e!==34&&e!==39&&Ks(oe);break;case 40:e===41&&Ks(e);break;case 92:tt();break}return Ve}function ey(e,t){for(;tt()&&e+oe!==57;)if(e+oe===84&&Mt()===47)break;return"/*"+ql(t,Ve-1)+"*"+su(e===47?e:tt())}function ty(e){for(;!Xr(Mt());)tt();return ql(e,Ve)}function ny(e){return J1(Zo("",null,null,null,[""],e=X1(e),0,[0],e))}function Zo(e,t,n,r,o,l,i,s,a){for(var c=0,h=0,p=i,m=0,x=0,v=0,w=1,E=1,f=1,d=0,g="",S=o,j=l,_=r,C=g;E;)switch(v=d,d=tt()){case 40:if(v!=108&&ae(C,p-1)==58){Xo(C+=I(Ti(d),"&","&\f"),"&\f",Jp(c?s[c-1]:0))!=-1&&(f=-1);break}case 34:case 39:case 91:C+=Ti(d);break;case 9:case 10:case 13:case 32:C+=Z1(v);break;case 92:C+=q1(Jo()-1,7);continue;case 47:switch(Mt()){case 42:case 47:mr(ry(ey(tt(),Jo()),t,n,a),a),(Xr(v||1)==5||Xr(Mt()||1)==5)&&Xe(C)&&pn(C,-1,void 0)!==" "&&(C+=" ");break;default:C+="/"}break;case 123*w:s[c++]=Xe(C)*f;case 125*w:case 59:case 0:switch(d){case 0:case 125:E=0;case 59+h:f==-1&&(C=I(C,/\f/g,"")),x>0&&(Xe(C)-p||w===0&&v===47)&&mr(x>32?Nc(C+";",r,n,p-1,a):Nc(I(C," ","")+";",r,n,p-2,a),a);break;case 59:C+=";";default:if(mr(_=$c(C,t,n,c,h,o,s,g,S=[],j=[],p,l),l),d===123)if(h===0)Zo(C,t,_,_,S,l,p,s,j);else{switch(m){case 99:if(ae(C,3)===110)break;case 108:if(ae(C,2)===97)break;default:h=0;case 100:case 109:case 115:}h?Zo(e,_,_,r&&mr($c(e,_,_,0,0,o,s,g,o,S=[],p,j),j),o,j,p,s,r?S:j):Zo(C,_,_,_,[""],j,0,s,j)}}c=h=x=0,w=f=1,g=C="",p=i;break;case 58:p=1+Xe(C),x=v;default:if(w<1){if(d==123)--w;else if(d==125&&w++==0&&K1()==125)continue}switch(C+=su(d),d*w){case 38:f=h>0?1:(C+="\f",-1);break;case 44:s[c++]=(Xe(C)-1)*f,f=1;break;case 64:Mt()===45&&(C+=Ti(tt())),m=Mt(),h=p=Xe(g=C+=ty(Jo())),d++;break;case 45:v===45&&Xe(C)==2&&(w=0)}}return l}function $c(e,t,n,r,o,l,i,s,a,c,h,p){for(var m=o-1,x=o===0?l:[""],v=qp(x),w=0,E=0,f=0;w<r;++w)for(var d=0,g=pn(e,m+1,m=Jp(E=i[w])),S=e;d<v;++d)(S=Zp(E>0?x[d]+" "+g:I(g,/&\f/g,x[d])))&&(a[f++]=S);return Zl(e,t,n,o===0?Xl:s,a,c,h,p)}function ry(e,t,n,r){return Zl(e,t,n,Kp,su(G1()),pn(e,2,-2),0,r)}function Nc(e,t,n,r,o){return Zl(e,t,n,iu,pn(e,0,r),pn(e,r+1,-1),r,o)}function th(e,t,n){switch(Q1(e,t)){case 5103:return A+"print-"+e+e;case 5737:case 4201:case 3177:case 3433:case 1641:case 4457:case 2921:case 5572:case 6356:case 5844:case 3191:case 6645:case 3005:case 4215:case 6389:case 5109:case 5365:case 5621:case 3829:case 6391:case 5879:case 5623:case 6135:case 4599:return A+e+e;case 4855:return A+e.replace("add","source-over").replace("substract","source-out").replace("intersect","source-in").replace("exclude","xor")+e;case 4789:return Nr+e+e;case 5349:case 4246:case 4810:case 6968:case 2756:return A+e+Nr+e+Y+e+e;case 5936:switch(ae(e,t+11)){case 114:return A+e+Y+I(e,/[svh]\w+-[tblr]{2}/,"tb")+e;case 108:return A+e+Y+I(e,/[svh]\w+-[tblr]{2}/,"tb-rl")+e;case 45:return A+e+Y+I(e,/[svh]\w+-[tblr]{2}/,"lr")+e}case 6828:case 4268:case 2903:return A+e+Y+e+e;case 6165:return A+e+Y+"flex-"+e+e;case 5187:return A+e+I(e,/(\w+).+(:[^]+)/,A+"box-$1$2"+Y+"flex-$1$2")+e;case 5443:return A+e+Y+"flex-item-"+I(e,/flex-|-self/g,"")+(ft(e,/flex-|baseline/)?"":Y+"grid-row-"+I(e,/flex-|-self/g,""))+e;case 4675:return A+e+Y+"flex-line-pack"+I(e,/align-content|flex-|-self/g,"")+e;case 5548:return A+e+Y+I(e,"shrink","negative")+e;case 5292:return A+e+Y+I(e,"basis","preferred-size")+e;case 6060:return A+"box-"+I(e,"-grow","")+A+e+Y+I(e,"grow","positive")+e;case 4554:return A+I(e,/([^-])(transform)/g,"$1"+A+"$2")+e;case 6187:return I(I(I(e,/(zoom-|grab)/,A+"$1"),/(image-set)/,A+"$1"),e,"")+e;case 5495:case 3959:return I(e,/(image-set\([^]*)/,A+"$1$`$1");case 4968:return I(I(e,/(.+:)(flex-)?(.*)/,A+"box-pack:$3"+Y+"flex-pack:$3"),/space-between/,"justify")+A+e+e;case 4200:if(!ft(e,/flex-|baseline/))return Y+"grid-column-align"+pn(e,t)+e;break;case 2592:case 3360:return Y+I(e,"template-","")+e;case 4384:case 3616:return n&&n.some(function(r,o){return t=o,ft(r.props,/grid-\w+-end/)})?~Xo(e+(n=n[t].value),"span",0)?e:Y+I(e,"-start","")+e+Y+"grid-row-span:"+(~Xo(n,"span",0)?ft(n,/\d+/):+ft(n,/\d+/)-+ft(e,/\d+/))+";":Y+I(e,"-start","")+e;case 4896:case 4128:return n&&n.some(function(r){return ft(r.props,/grid-\w+-start/)})?e:Y+I(I(e,"-end","-span"),"span ","")+e;case 4095:case 3583:case 4068:case 2532:return I(e,/(.+)-inline(.+)/,A+"$1$2")+e;case 8116:case 7059:case 5753:case 5535:case 5445:case 5701:case 4933:case 4677:case 5533:case 5789:case 5021:case 4765:if(Xe(e)-1-t>6)switch(ae(e,t+1)){case 109:if(ae(e,t+4)!==45)break;case 102:return I(e,/(.+:)(.+)-([^]+)/,"$1"+A+"$2-$3$1"+Nr+(ae(e,t+3)==108?"$3":"$2-$3"))+e;case 115:return~Xo(e,"stretch",0)?th(I(e,"stretch","fill-available"),t,n)+e:e}break;case 5152:case 5920:return I(e,/(.+?):(\d+)(\s*\/\s*(span)?\s*(\d+))?(.*)/,function(r,o,l,i,s,a,c){return Y+o+":"+l+c+(i?Y+o+"-span:"+(s?a:+a-+l)+c:"")+e});case 4949:if(ae(e,t+6)===121)return I(e,":",":"+A)+e;break;case 6444:switch(ae(e,ae(e,14)===45?18:11)){case 120:return I(e,/(.+:)([^;\s!]+)(;|(\s+)?!.+)?/,"$1"+A+(ae(e,14)===45?"inline-":"")+"box$3$1"+A+"$2$3$1"+Y+"$2box$3")+e;case 100:return I(e,":",":"+Y)+e}break;case 5719:case 2647:case 2135:case 3927:case 2391:return I(e,"scroll-","scroll-snap-")+e}return e}function $l(e,t){for(var n="",r=0;r<e.length;r++)n+=t(e[r],r,e,t)||"";return n}function oy(e,t,n,r){switch(e.type){case V1:if(e.children.length)break;case W1:case H1:case iu:return e.return=e.return||e.value;case Kp:return"";case Xp:return e.return=e.value+"{"+$l(e.children,r)+"}";case Xl:if(!Xe(e.value=e.props.join(",")))return""}return Xe(n=$l(e.children,r))?e.return=e.value+"{"+n+"}":""}function ly(e){var t=qp(e);return function(n,r,o,l){for(var i="",s=0;s<t;s++)i+=e[s](n,r,o,l)||"";return i}}function iy(e){return function(t){t.root||(t=t.return)&&e(t)}}function sy(e,t,n,r){if(e.length>-1&&!e.return)switch(e.type){case iu:e.return=th(e.value,e.length,n);return;case Xp:return $l([_t(e,{value:I(e.value,"@","@"+A)})],r);case Xl:if(e.length)return Y1(n=e.props,function(o){switch(ft(o,r=/(::plac\w+|:read-\w+)/)){case":read-only":case":read-write":yn(_t(e,{props:[I(o,/:(read-\w+)/,":"+Nr+"$1")]})),yn(_t(e,{props:[o]})),Gs(e,{props:_c(n,r)});break;case"::placeholder":yn(_t(e,{props:[I(o,/:(plac\w+)/,":"+A+"input-$1")]})),yn(_t(e,{props:[I(o,/:(plac\w+)/,":"+Nr+"$1")]})),yn(_t(e,{props:[I(o,/:(plac\w+)/,Y+"input-$1")]})),yn(_t(e,{props:[o]})),Gs(e,{props:_c(n,r)});break}return""})}}var Fn={},Ii,Mi;const Qn=typeof process<"u"&&Fn!==void 0&&(Fn.REACT_APP_SC_ATTR||Fn.SC_ATTR)||"data-styled",nh="active",rh="data-styled-version",ei="6.4.2",au=`/*!sc*/
`,Lr=typeof window<"u"&&typeof document<"u";function Lc(e){if(typeof process<"u"&&Fn!==void 0){const t=Fn[e];if(t!==void 0&&t!=="")return t!=="false"}}const ay=!!(typeof SC_DISABLE_SPEEDY=="boolean"?SC_DISABLE_SPEEDY:(Mi=(Ii=Lc("REACT_APP_SC_DISABLE_SPEEDY"))!==null&&Ii!==void 0?Ii:Lc("SC_DISABLE_SPEEDY"))!==null&&Mi!==void 0?Mi:typeof process<"u"&&Fn!==void 0&&!1),oh="sc-keyframes-";function io(e,...t){return new Error(`An error occurred. See https://github.com/styled-components/styled-components/blob/main/packages/styled-components/src/utils/errors.md#${e} for more information.${t.length>0?` Args: ${t.join(", ")}`:""}`)}let qo=new Map,Nl=new Map,el=1;const gr=e=>{if(qo.has(e))return qo.get(e);for(;Nl.has(el);)el++;const t=el++;return qo.set(e,t),Nl.set(t,e),t},uy=e=>Nl.get(e),cy=(e,t)=>{el=t+1,qo.set(e,t),Nl.set(t,e)},uu=Object.freeze([]),Yn=Object.freeze({});function dy(e,t,n=Yn){return e.theme!==n.theme&&e.theme||t||n.theme}const fy=/[!"#$%&'()*+,./:;<=>?@[\\\]^`{|}~-]+/g,py=/(^-|-$)/g;function lh(e){return e.replace(fy,"-").replace(py,"")}const hy=/(a)(d)/gi,zc=e=>String.fromCharCode(e+(e>25?39:97));function cu(e){let t,n="";for(t=Math.abs(e);t>52;t=t/52|0)n=zc(t%52)+n;return(zc(t%52)+n).replace(hy,"$1-$2")}const Xs=5381,ln=(e,t)=>{let n=t.length;for(;n;)e=33*e^t.charCodeAt(--n);return e},ih=e=>ln(Xs,e);function sh(e){return cu(ih(e)>>>0)}function my(e){return e.displayName||e.name||"Component"}function Js(e){return typeof e=="string"&&!0}function gy(e){return Js(e)?`styled.${e}`:`Styled(${my(e)})`}const ah=Symbol.for("react.memo"),yy=Symbol.for("react.forward_ref"),vy={contextType:!0,defaultProps:!0,displayName:!0,getDerivedStateFromError:!0,getDerivedStateFromProps:!0,propTypes:!0,type:!0},xy={name:!0,length:!0,prototype:!0,caller:!0,callee:!0,arguments:!0,arity:!0},uh={$$typeof:!0,compare:!0,defaultProps:!0,displayName:!0,propTypes:!0,type:!0},wy={[yy]:{$$typeof:!0,render:!0,defaultProps:!0,displayName:!0,propTypes:!0},[ah]:uh};function Tc(e){return("type"in(t=e)&&t.type.$$typeof)===ah?uh:"$$typeof"in e?wy[e.$$typeof]:vy;var t}const ky=Object.defineProperty,Sy=Object.getOwnPropertyNames,Cy=Object.getOwnPropertySymbols,jy=Object.getOwnPropertyDescriptor,Ey=Object.getPrototypeOf,Py=Object.prototype;function ch(e,t,n){if(typeof t!="string"){const r=Ey(t);r&&r!==Py&&ch(e,r,n);const o=Sy(t).concat(Cy(t)),l=Tc(e),i=Tc(t);for(let s=0;s<o.length;++s){const a=o[s];if(!(a in xy||n&&n[a]||i&&a in i||l&&a in l)){const c=jy(t,a);try{ky(e,a,c)}catch{}}}}return e}function ti(e){return typeof e=="function"}const Ry=Symbol.for("react.forward_ref");function dh(e){return e!=null&&(typeof e=="object"||typeof e=="function")&&e.$$typeof===Ry&&"styledComponentId"in e}function yr(e,t){return e&&t?e+" "+t:e||t||""}function Zs(e,t){return e.join("")}function Jr(e){return e!==null&&typeof e=="object"&&e.constructor.name===Object.name&&!("props"in e&&e.$$typeof)}function qs(e,t,n=!1){if(!n&&!Jr(e)&&!Array.isArray(e))return t;if(Array.isArray(t))for(let r=0;r<t.length;r++)e[r]=qs(e[r],t[r]);else if(Jr(t))for(const r in t)e[r]=qs(e[r],t[r]);return e}function du(e,t){Object.defineProperty(e,"toString",{value:t})}const _y=class{constructor(e){this.groupSizes=new Uint32Array(512),this.length=512,this.tag=e,this._cGroup=0,this._cIndex=0}indexOfGroup(e){if(e===this._cGroup)return this._cIndex;let t=this._cIndex;if(e>this._cGroup)for(let n=this._cGroup;n<e;n++)t+=this.groupSizes[n];else for(let n=this._cGroup-1;n>=e;n--)t-=this.groupSizes[n];return this._cGroup=e,this._cIndex=t,t}insertRules(e,t){if(e>=this.groupSizes.length){const o=this.groupSizes,l=o.length;let i=l;for(;e>=i;)if(i<<=1,i<0)throw io(16,`${e}`);this.groupSizes=new Uint32Array(i),this.groupSizes.set(o),this.length=i;for(let s=l;s<i;s++)this.groupSizes[s]=0}let n=this.indexOfGroup(e+1),r=0;for(let o=0,l=t.length;o<l;o++)this.tag.insertRule(n,t[o])&&(this.groupSizes[e]++,n++,r++);r>0&&this._cGroup>e&&(this._cIndex+=r)}clearGroup(e){if(e<this.length){const t=this.groupSizes[e],n=this.indexOfGroup(e),r=n+t;this.groupSizes[e]=0;for(let o=n;o<r;o++)this.tag.deleteRule(n);t>0&&this._cGroup>e&&(this._cIndex-=t)}}getGroup(e){let t="";if(e>=this.length||this.groupSizes[e]===0)return t;const n=this.groupSizes[e],r=this.indexOfGroup(e),o=r+n;for(let l=r;l<o;l++)t+=this.tag.getRule(l)+au;return t}},$y=`style[${Qn}][${rh}="${ei}"]`,Ny=new RegExp(`^${Qn}\\.g(\\d+)\\[id="([\\w\\d-]+)"\\].*?"([^"]*)`),Ic=e=>typeof ShadowRoot<"u"&&e instanceof ShadowRoot||"host"in e&&e.nodeType===11,ea=e=>{if(!e)return document;if(Ic(e))return e;if("getRootNode"in e){const t=e.getRootNode();if(Ic(t))return t}return document},Ly=(e,t,n)=>{const r=n.split(",");let o;for(let l=0,i=r.length;l<i;l++)(o=r[l])&&e.registerName(t,o)},zy=(e,t)=>{var n;const r=((n=t.textContent)!==null&&n!==void 0?n:"").split(au),o=[];for(let l=0,i=r.length;l<i;l++){const s=r[l].trim();if(!s)continue;const a=s.match(Ny);if(a){const c=0|parseInt(a[1],10),h=a[2];c!==0&&(cy(h,c),Ly(e,h,a[3]),e.getTag().insertRules(c,o)),o.length=0}else o.push(s)}},Oi=e=>{const t=ea(e.options.target).querySelectorAll($y);for(let n=0,r=t.length;n<r;n++){const o=t[n];o&&o.getAttribute(Qn)!==nh&&(zy(e,o),o.parentNode&&o.parentNode.removeChild(o))}};let ur=!1;function Ty(){if(ur!==!1)return ur;if(typeof document<"u"){const e=document.head.querySelector('meta[property="csp-nonce"]');if(e)return ur=e.nonce||e.getAttribute("content")||void 0;const t=document.head.querySelector('meta[name="sc-nonce"]');if(t)return ur=t.getAttribute("content")||void 0}return ur=typeof __webpack_nonce__<"u"?__webpack_nonce__:void 0}const fh=(e,t)=>{const n=document.head,r=e||n,o=document.createElement("style"),l=(a=>{const c=Array.from(a.querySelectorAll(`style[${Qn}]`));return c[c.length-1]})(r),i=l!==void 0?l.nextSibling:null;o.setAttribute(Qn,nh),o.setAttribute(rh,ei);const s=t||Ty();return s&&o.setAttribute("nonce",s),r.insertBefore(o,i),o},Iy=class{constructor(e,t){this.element=fh(e,t),this.element.appendChild(document.createTextNode("")),this.sheet=(n=>{var r;if(n.sheet)return n.sheet;const o=(r=n.getRootNode().styleSheets)!==null&&r!==void 0?r:document.styleSheets;for(let l=0,i=o.length;l<i;l++){const s=o[l];if(s.ownerNode===n)return s}throw io(17)})(this.element),this.length=0}insertRule(e,t){try{return this.sheet.insertRule(t,e),this.length++,!0}catch{return!1}}deleteRule(e){this.sheet.deleteRule(e),this.length--}getRule(e){const t=this.sheet.cssRules[e];return t&&t.cssText?t.cssText:""}},My=class{constructor(e,t){this.element=fh(e,t),this.nodes=this.element.childNodes,this.length=0}insertRule(e,t){if(e<=this.length&&e>=0){const n=document.createTextNode(t);return this.element.insertBefore(n,this.nodes[e]||null),this.length++,!0}return!1}deleteRule(e){this.element.removeChild(this.nodes[e]),this.length--}getRule(e){return e<this.length?this.nodes[e].textContent:""}};let Mc=Lr;const Oy={isServer:!Lr,useCSSOMInjection:!ay};class ni{static registerId(t){return gr(t)}constructor(t=Yn,n={},r){this.options=Object.assign(Object.assign({},Oy),t),this.gs=n,this.keyframeIds=new Set,this.names=new Map(r),this.server=!!t.isServer,!this.server&&Lr&&Mc&&(Mc=!1,Oi(this)),du(this,()=>(o=>{const l=o.getTag(),{length:i}=l;let s="";for(let a=0;a<i;a++){const c=uy(a);if(c===void 0)continue;const h=o.names.get(c);if(h===void 0||!h.size)continue;const p=l.getGroup(a);if(p.length===0)continue;const m=Qn+".g"+a+'[id="'+c+'"]';let x="";for(const v of h)v.length>0&&(x+=v+",");s+=p+m+'{content:"'+x+'"}'+au}return s})(this))}rehydrate(){!this.server&&Lr&&Oi(this)}reconstructWithOptions(t,n=!0){const r=new ni(Object.assign(Object.assign({},this.options),t),this.gs,n&&this.names||void 0);return r.keyframeIds=new Set(this.keyframeIds),!this.server&&Lr&&t.target!==this.options.target&&ea(this.options.target)!==ea(t.target)&&Oi(r),r}allocateGSInstance(t){return this.gs[t]=(this.gs[t]||0)+1}getTag(){return this.tag||(this.tag=(t=(({useCSSOMInjection:n,target:r,nonce:o})=>n?new Iy(r,o):new My(r,o))(this.options),new _y(t)));var t}hasNameForId(t,n){var r,o;return(o=(r=this.names.get(t))===null||r===void 0?void 0:r.has(n))!==null&&o!==void 0&&o}registerName(t,n){gr(t),t.startsWith(oh)&&this.keyframeIds.add(t);const r=this.names.get(t);r?r.add(n):this.names.set(t,new Set([n]))}insertRules(t,n,r){this.registerName(t,n),this.getTag().insertRules(gr(t),r)}clearNames(t){this.names.has(t)&&this.names.get(t).clear()}clearRules(t){this.getTag().clearGroup(gr(t)),this.clearNames(t)}clearTag(){this.tag=void 0}}const ph=new WeakSet,Fy={animationIterationCount:1,aspectRatio:1,borderImageOutset:1,borderImageSlice:1,borderImageWidth:1,columnCount:1,columns:1,flex:1,flexGrow:1,flexShrink:1,gridRow:1,gridRowEnd:1,gridRowSpan:1,gridRowStart:1,gridColumn:1,gridColumnEnd:1,gridColumnSpan:1,gridColumnStart:1,fontWeight:1,lineHeight:1,opacity:1,order:1,orphans:1,scale:1,tabSize:1,widows:1,zIndex:1,zoom:1,WebkitLineClamp:1,fillOpacity:1,floodOpacity:1,stopOpacity:1,strokeDasharray:1,strokeDashoffset:1,strokeMiterlimit:1,strokeOpacity:1,strokeWidth:1};function Dy(e,t){return t==null||typeof t=="boolean"||t===""?"":typeof t!="number"||t===0||e in Fy||e.startsWith("--")?String(t).trim():t+"px"}const qt=47;function Oc(e){if(e.charCodeAt(0)===45&&e.charCodeAt(1)===45)return e;let t="";for(let n=0;n<e.length;n++){const r=e.charCodeAt(n);t+=r>=65&&r<=90?"-"+String.fromCharCode(r+32):e[n]}return t.startsWith("ms-")?"-"+t:t}const hh=Symbol.for("sc-keyframes");function Ay(e){return typeof e=="object"&&e!==null&&hh in e}function mh(e){return ti(e)&&!(e.prototype&&e.prototype.isReactComponent)}const gh=e=>e==null||e===!1||e==="",by=Symbol.for("react.client.reference");function Fc(e){return e.$$typeof===by}function yh(e,t){for(const n in e){const r=e[n];e.hasOwnProperty(n)&&!gh(r)&&(Array.isArray(r)&&ph.has(r)||ti(r)?t.push(Oc(n)+":",r,";"):Jr(r)?(t.push(n+" {"),yh(r,t),t.push("}")):t.push(Oc(n)+": "+Dy(n,r)+";"))}}function sn(e,t,n,r,o=[]){if(gh(e))return o;const l=typeof e;if(l==="string")return o.push(e),o;if(l==="function"){if(Fc(e))return o;if(mh(e)&&t){const i=e(t);return sn(i,t,n,r,o)}return o.push(e),o}if(Array.isArray(e)){for(let i=0;i<e.length;i++)sn(e[i],t,n,r,o);return o}return dh(e)?(o.push(`.${e.styledComponentId}`),o):Ay(e)?(n?(e.inject(n,r),o.push(e.getName(r))):o.push(e),o):Fc(e)?o:Jr(e)?e.toString!==Object.prototype.toString?(o.push(e.toString()),o):(yh(e,o),o):(o.push(e.toString()),o)}const By=ih(ei);class Uy{constructor(t,n,r){this.rules=t,this.componentId=n,this.baseHash=ln(By,n),this.baseStyle=r,ni.registerId(n)}generateAndInjectStyles(t,n,r){let o=this.baseStyle?this.baseStyle.generateAndInjectStyles(t,n,r):"";{let l="";for(let i=0;i<this.rules.length;i++){const s=this.rules[i];if(typeof s=="string")l+=s;else if(s)if(mh(s)){const a=s(t);typeof a=="string"?l+=a:a!=null&&a!==!1&&(l+=Zs(sn(a,t,n,r)))}else l+=Zs(sn(s,t,n,r))}if(l){this.dynamicNameCache||(this.dynamicNameCache=new Map);const i=r.hash?r.hash+l:l;let s=this.dynamicNameCache.get(i);if(!s){if(s=cu(ln(ln(this.baseHash,r.hash),l)>>>0),this.dynamicNameCache.size>=200){const a=this.dynamicNameCache.keys().next().value;a!==void 0&&this.dynamicNameCache.delete(a)}this.dynamicNameCache.set(i,s)}if(!n.hasNameForId(this.componentId,s)){const a=r(l,"."+s,void 0,this.componentId);n.insertRules(this.componentId,s,a)}o=yr(o,s)}}return o}}const Wy=/&/g;function vh(e,t){let n=0;for(;--t>=0&&e.charCodeAt(t)===92;)n++;return!(1&~n)}function Fi(e){const t=e.length;let n="",r=0,o=0,l=0,i=!1,s=!1;for(let a=0;a<t;a++){const c=e.charCodeAt(a);if(l!==0||i||c!==qt||e.charCodeAt(a+1)!==42)if(i)c===42&&e.charCodeAt(a+1)===qt&&(i=!1,a++);else if(c!==34&&c!==39||vh(e,a)){if(l===0)if(c===123)o++;else if(c===125){if(o--,o<0){s=!0;let h=a+1;for(;h<t;){const p=e.charCodeAt(h);if(p===59||p===10)break;h++}h<t&&e.charCodeAt(h)===59&&h++,o=0,a=h-1,r=h;continue}o===0&&(n+=e.substring(r,a+1),r=a+1)}else c===59&&o===0&&(n+=e.substring(r,a+1),r=a+1)}else l===0?l=c:l===c&&(l=0);else i=!0,a++}return s||o!==0||l!==0?(r<t&&o===0&&l===0&&(n+=e.substring(r)),n):e}function xh(e,t){const n=t+" ",r=","+n;for(let o=0;o<e.length;o++){const l=e[o];if(l.type==="rule"){l.value=(n+l.value).replaceAll(",",r);const i=l.props,s=[];for(let a=0;a<i.length;a++)s[a]=n+i[a];l.props=s}Array.isArray(l.children)&&l.type!=="@keyframes"&&xh(l.children,t)}return e}function Hy({options:e=Yn,plugins:t=uu}=Yn){let n,r,o;const l=(m,x,v)=>v.startsWith(r)&&v.endsWith(r)&&v.replaceAll(r,"").length>0?`.${n}`:m,i=t.slice();i.push(m=>{m.type===Xl&&m.value.includes("&")&&(o||(o=new RegExp(`\\${r}\\b`,"g")),m.props[0]=m.props[0].replace(Wy,r).replace(o,l))}),e.prefix&&i.push(sy),i.push(oy);let s=[];const a=ly(i.concat(iy(m=>s.push(m)))),c=(m,x="",v="",w="&")=>{n=w,r=x,o=void 0;const E=function(d){const g=d.indexOf("//")!==-1,S=d.indexOf("}")!==-1;if(!g&&!S)return d;if(!g)return Fi(d);const j=d.length;let _="",C=0,R=0,O=0,T=0,W=0,Ne=!1;for(;R<j;){const V=d.charCodeAt(R);if(V!==34&&V!==39||vh(d,R))if(O===0)if(V===qt&&R+1<j&&d.charCodeAt(R+1)===42){for(R+=2;R+1<j&&(d.charCodeAt(R)!==42||d.charCodeAt(R+1)!==qt);)R++;R+=2}else if(V!==40)if(V!==41)if(T>0)R++;else if(V===42&&R+1<j&&d.charCodeAt(R+1)===qt)_+=d.substring(C,R),R+=2,C=R,Ne=!0;else if(V===qt&&R+1<j&&d.charCodeAt(R+1)===qt){for(_+=d.substring(C,R);R<j&&d.charCodeAt(R)!==10;)R++;C=R,Ne=!0}else V===123?W++:V===125&&W--,R++;else T>0&&T--,R++;else T++,R++;else R++;else O===0?O=V:O===V&&(O=0),R++}return Ne?(C<j&&(_+=d.substring(C)),W===0?_:Fi(_)):W===0?d:Fi(d)}(m);let f=ny(v||x?v+" "+x+" { "+E+" }":E);return e.namespace&&(f=xh(f,e.namespace)),s=[],$l(f,a),s},h=e;let p=Xs;for(let m=0;m<t.length;m++)t[m].name||io(15),p=ln(p,t[m].name);return h!=null&&h.namespace&&(p=ln(p,h.namespace)),h!=null&&h.prefix&&(p=ln(p,"p")),c.hash=p!==Xs?p.toString():"",c}const Vy=new ni,ta=Hy(),wh=it.createContext({shouldForwardProp:void 0,styleSheet:Vy,stylis:ta,stylisPlugins:void 0});wh.Consumer;function Qy(){return it.useContext(wh)}const kh=it.createContext(void 0);kh.Consumer;const Dc=Object.prototype.hasOwnProperty,Di={};function Yy(e,t){const n=typeof e!="string"?"sc":lh(e);Di[n]=(Di[n]||0)+1;const r=n+"-"+sh(ei+n+Di[n]);return t?t+"-"+r:r}function Gy(e,t,n){const r=dh(e),o=e,l=!Js(e),{attrs:i=uu,componentId:s=Yy(t.displayName,t.parentComponentId),displayName:a=gy(e)}=t,c=t.displayName&&t.componentId?lh(t.displayName)+"-"+t.componentId:t.componentId||s,h=r&&o.attrs?o.attrs.concat(i).filter(Boolean):i;let{shouldForwardProp:p}=t;if(r&&o.shouldForwardProp){const w=o.shouldForwardProp;if(t.shouldForwardProp){const E=t.shouldForwardProp;p=(f,d)=>w(f,d)&&E(f,d)}else p=w}const m=new Uy(n,c,r?o.componentStyle:void 0);function x(w,E){return function(f,d,g){const{attrs:S,componentStyle:j,defaultProps:_,foldedComponentIds:C,styledComponentId:R,target:O}=f,T=it.useContext(kh),W=Qy(),Ne=f.shouldForwardProp||W.shouldForwardProp,V=dy(d,T,_)||Yn;let je,me;{const L=it.useRef(null),z=L.current;if(z!==null&&z[1]===V&&z[2]===W.styleSheet&&z[3]===W.stylis&&z[7]===j&&function(U,D,ie){const ee=U,re=D;let Le=0;for(const De in re)if(Dc.call(re,De)&&(Le++,ee[De]!==re[De]))return!1;return Le===ie}(z[0],d,z[4]))je=z[5],me=z[6];else{je=function(D,ie,ee){const re=Object.assign(Object.assign({},ie),{className:void 0,theme:ee}),Le=D.length>1;for(let De=0;De<D.length;De++){const ri=D[De],so=ti(ri)?ri(Le?Object.assign({},re):re):ri;for(const Pt in so)Pt==="className"?re.className=yr(re.className,so[Pt]):Pt==="style"?re.style=Object.assign(Object.assign({},re.style),so[Pt]):Pt in ie&&ie[Pt]===void 0||(re[Pt]=so[Pt])}return"className"in ie&&typeof ie.className=="string"&&(re.className=yr(re.className,ie.className)),re}(S,d,V),me=function(D,ie,ee,re){return D.generateAndInjectStyles(ie,ee,re)}(j,je,W.styleSheet,W.stylis);let U=0;for(const D in d)Dc.call(d,D)&&U++;L.current=[d,V,W.styleSheet,W.stylis,U,je,me,j]}}const Et=je.as||O,Xt=function(L,z,U,D){const ie={};for(const ee in L)L[ee]===void 0||ee[0]==="$"||ee==="as"||ee==="theme"&&L.theme===U||(ee==="forwardedAs"?ie.as=L.forwardedAs:D&&!D(ee,z)||(ie[ee]=L[ee]));return ie}(je,Et,V,Ne);let $=yr(C,R);return me&&($+=" "+me),je.className&&($+=" "+je.className),Xt[Js(Et)&&Et.includes("-")?"class":"className"]=$,g&&(Xt.ref=g),k.createElement(Et,Xt)}(v,w,E)}x.displayName=a;let v=it.forwardRef(x);return v.attrs=h,v.componentStyle=m,v.displayName=a,v.shouldForwardProp=p,v.foldedComponentIds=r?yr(o.foldedComponentIds,o.styledComponentId):"",v.styledComponentId=c,v.target=r?o.target:e,Object.defineProperty(v,"defaultProps",{get(){return this._foldedDefaultProps},set(w){this._foldedDefaultProps=r?function(E,...f){for(const d of f)qs(E,d,!0);return E}({},o.defaultProps,w):w}}),du(v,()=>`.${v.styledComponentId}`),l&&ch(v,e,{attrs:!0,componentStyle:!0,displayName:!0,foldedComponentIds:!0,shouldForwardProp:!0,styledComponentId:!0,target:!0}),v}var Ky=new Set(["a","abbr","address","area","article","aside","audio","b","bdi","bdo","blockquote","body","button","br","canvas","caption","cite","code","col","colgroup","data","datalist","dd","del","details","dfn","dialog","div","dl","dt","em","embed","fieldset","figcaption","figure","footer","form","h1","h2","h3","h4","h5","h6","header","hgroup","hr","html","i","iframe","img","input","ins","kbd","label","legend","li","main","map","mark","menu","meter","nav","object","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","slot","small","span","strong","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","u","ul","var","video","wbr","circle","clipPath","defs","ellipse","feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence","filter","foreignObject","g","image","line","linearGradient","marker","mask","path","pattern","polygon","polyline","radialGradient","rect","stop","svg","switch","symbol","text","textPath","tspan","use"]);function Ac(e,t){const n=[e[0]];for(let r=0,o=t.length;r<o;r+=1)n.push(t[r],e[r+1]);return n}const bc=e=>(ph.add(e),e);function Sh(e,...t){if(ti(e)||Jr(e))return bc(sn(Ac(uu,[e,...t])));const n=e;return t.length===0&&n.length===1&&typeof n[0]=="string"?sn(n):bc(sn(Ac(n,t)))}function na(e,t,n=Yn){if(!t)throw io(1,t);const r=(o,...l)=>e(t,n,Sh(o,...l));return r.attrs=o=>na(e,t,Object.assign(Object.assign({},n),{attrs:Array.prototype.concat(n.attrs,o).filter(Boolean)})),r.withConfig=o=>na(e,t,Object.assign(Object.assign({},n),o)),r}const Ch=e=>na(Gy,e),y=Ch;Ky.forEach(e=>{y[e]=Ch(e)});var jh;class Xy{constructor(t,n){this[jh]=!0,this.inject=(r,o=ta)=>{const l=this.getName(o);if(!r.hasNameForId(this.id,l)){const i=o(this.rules,l,"@keyframes");r.insertRules(this.id,l,i)}},this.name=t,this.id=oh+t,this.rules=n,gr(this.id),du(this,()=>{throw io(12,String(this.name))})}getName(t=ta){return t.hash?this.name+cu(+t.hash>>>0):this.name}}function Eh(e,...t){const n=Zs(Sh(e,...t)),r=sh(n);return new Xy(r,n)}jh=hh;/**
 * @license lucide-react v1.17.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ph=(...e)=>e.filter((t,n,r)=>!!t&&t.trim()!==""&&r.indexOf(t)===n).join(" ").trim();/**
 * @license lucide-react v1.17.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Jy=e=>e.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase();/**
 * @license lucide-react v1.17.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Zy=e=>e.replace(/^([A-Z])|[\s-_]+(\w)/g,(t,n,r)=>r?r.toUpperCase():n.toLowerCase());/**
 * @license lucide-react v1.17.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Bc=e=>{const t=Zy(e);return t.charAt(0).toUpperCase()+t.slice(1)};/**
 * @license lucide-react v1.17.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var Ai={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v1.17.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const qy=e=>{for(const t in e)if(t.startsWith("aria-")||t==="role"||t==="title")return!0;return!1},ev=k.createContext({}),tv=()=>k.useContext(ev),nv=k.forwardRef(({color:e,size:t,strokeWidth:n,absoluteStrokeWidth:r,className:o="",children:l,iconNode:i,...s},a)=>{const{size:c=24,strokeWidth:h=2,absoluteStrokeWidth:p=!1,color:m="currentColor",className:x=""}=tv()??{},v=r??p?Number(n??h)*24/Number(t??c):n??h;return k.createElement("svg",{ref:a,...Ai,width:t??c??Ai.width,height:t??c??Ai.height,stroke:e??m,strokeWidth:v,className:Ph("lucide",x,o),...!l&&!qy(s)&&{"aria-hidden":"true"},...s},[...i.map(([w,E])=>k.createElement(w,E)),...Array.isArray(l)?l:[l]])});/**
 * @license lucide-react v1.17.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const b=(e,t)=>{const n=k.forwardRef(({className:r,...o},l)=>k.createElement(nv,{ref:l,iconNode:t,className:Ph(`lucide-${Jy(Bc(e))}`,`lucide-${e}`,r),...o}));return n.displayName=Bc(e),n};/**
 * @license lucide-react v1.17.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const rv=[["path",{d:"M12 7v14",key:"1akyts"}],["path",{d:"M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z",key:"ruj8y"}]],ov=b("book-open",rv);/**
 * @license lucide-react v1.17.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const lv=[["path",{d:"m9 18 6-6-6-6",key:"mthhwq"}]],iv=b("chevron-right",lv);/**
 * @license lucide-react v1.17.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const sv=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M12 6v6l4 2",key:"mmk7yg"}]],av=b("clock",sv);/**
 * @license lucide-react v1.17.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const uv=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m16.24 7.76-1.804 5.411a2 2 0 0 1-1.265 1.265L7.76 16.24l1.804-5.411a2 2 0 0 1 1.265-1.265z",key:"9ktpf1"}]],cv=b("compass",uv);/**
 * @license lucide-react v1.17.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const dv=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M6 12c0-1.7.7-3.2 1.8-4.2",key:"oqkarx"}],["circle",{cx:"12",cy:"12",r:"2",key:"1c9p78"}],["path",{d:"M18 12c0 1.7-.7 3.2-1.8 4.2",key:"1eah9h"}]],bi=b("disc-3",dv);/**
 * @license lucide-react v1.17.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const fv=[["path",{d:"M12 15V3",key:"m9g1x1"}],["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",key:"ih7n3h"}],["path",{d:"m7 10 5 5 5-5",key:"brsn70"}]],pv=b("download",fv);/**
 * @license lucide-react v1.17.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const hv=[["circle",{cx:"12",cy:"12",r:"1",key:"41hilf"}],["circle",{cx:"19",cy:"12",r:"1",key:"1wjl8i"}],["circle",{cx:"5",cy:"12",r:"1",key:"1pcz8c"}]],Rh=b("ellipsis",hv);/**
 * @license lucide-react v1.17.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const mv=[["path",{d:"M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5",key:"mvr1a0"}]],Ll=b("heart",mv);/**
 * @license lucide-react v1.17.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const gv=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M12 16v-4",key:"1dtifu"}],["path",{d:"M12 8h.01",key:"e9boi3"}]],Uc=b("info",gv);/**
 * @license lucide-react v1.17.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const yv=[["path",{d:"m16 6 4 14",key:"ji33uf"}],["path",{d:"M12 6v14",key:"1n7gus"}],["path",{d:"M8 8v12",key:"1gg7y9"}],["path",{d:"M4 4v16",key:"6qkkli"}]],vv=b("library",yv);/**
 * @license lucide-react v1.17.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const xv=[["path",{d:"m16 17 5-5-5-5",key:"1bji2h"}],["path",{d:"M21 12H9",key:"dn1m92"}],["path",{d:"M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4",key:"1uf3rs"}]],wv=b("log-out",xv);/**
 * @license lucide-react v1.17.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const kv=[["path",{d:"M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719",key:"1sd12s"}]],Bi=b("message-circle",kv);/**
 * @license lucide-react v1.17.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Sv=[["path",{d:"M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401",key:"kfwtm"}]],Cv=b("moon",Sv);/**
 * @license lucide-react v1.17.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const jv=[["path",{d:"M9 18V5l12-2v13",key:"1jmyc2"}],["circle",{cx:"6",cy:"18",r:"3",key:"fqmcym"}],["circle",{cx:"18",cy:"16",r:"3",key:"1hluhg"}]],Ht=b("music",jv);/**
 * @license lucide-react v1.17.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ev=[["rect",{x:"14",y:"3",width:"5",height:"18",rx:"1",key:"kaeet6"}],["rect",{x:"5",y:"3",width:"5",height:"18",rx:"1",key:"1wsw3u"}]],_h=b("pause",Ev);/**
 * @license lucide-react v1.17.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Pv=[["path",{d:"M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z",key:"10ikf1"}]],$h=b("play",Pv);/**
 * @license lucide-react v1.17.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Rv=[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"M12 5v14",key:"s699le"}]],_v=b("plus",Rv);/**
 * @license lucide-react v1.17.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $v=[["path",{d:"m17 2 4 4-4 4",key:"nntrym"}],["path",{d:"M3 11v-1a4 4 0 0 1 4-4h14",key:"84bu3i"}],["path",{d:"m7 22-4-4 4-4",key:"1wqhfi"}],["path",{d:"M21 13v1a4 4 0 0 1-4 4H3",key:"1rx37r"}]],Nh=b("repeat",$v);/**
 * @license lucide-react v1.17.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Nv=[["path",{d:"m21 21-4.34-4.34",key:"14j7rj"}],["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}]],Lv=b("search",Nv);/**
 * @license lucide-react v1.17.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const zv=[["path",{d:"M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915",key:"1i5ecw"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]],Wc=b("settings",zv);/**
 * @license lucide-react v1.17.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Tv=[["circle",{cx:"18",cy:"5",r:"3",key:"gq8acd"}],["circle",{cx:"6",cy:"12",r:"3",key:"w7nqdw"}],["circle",{cx:"18",cy:"19",r:"3",key:"1xt0gg"}],["line",{x1:"8.59",x2:"15.42",y1:"13.51",y2:"17.49",key:"47mynk"}],["line",{x1:"15.41",x2:"8.59",y1:"6.51",y2:"10.49",key:"1n3mei"}]],Lh=b("share-2",Tv);/**
 * @license lucide-react v1.17.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Iv=[["path",{d:"m18 14 4 4-4 4",key:"10pe0f"}],["path",{d:"m18 2 4 4-4 4",key:"pucp1d"}],["path",{d:"M2 18h1.973a4 4 0 0 0 3.3-1.7l5.454-8.6a4 4 0 0 1 3.3-1.7H22",key:"1ailkh"}],["path",{d:"M2 6h1.972a4 4 0 0 1 3.6 2.2",key:"km57vx"}],["path",{d:"M22 18h-6.041a4 4 0 0 1-3.3-1.8l-.359-.45",key:"os18l9"}]],zh=b("shuffle",Iv);/**
 * @license lucide-react v1.17.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Mv=[["path",{d:"M17.971 4.285A2 2 0 0 1 21 6v12a2 2 0 0 1-3.029 1.715l-9.997-5.998a2 2 0 0 1-.003-3.432z",key:"15892j"}],["path",{d:"M3 20V4",key:"1ptbpl"}]],Th=b("skip-back",Mv);/**
 * @license lucide-react v1.17.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ov=[["path",{d:"M21 4v16",key:"7j8fe9"}],["path",{d:"M6.029 4.285A2 2 0 0 0 3 6v12a2 2 0 0 0 3.029 1.715l9.997-5.998a2 2 0 0 0 .003-3.432z",key:"zs4d6"}]],Ih=b("skip-forward",Ov);/**
 * @license lucide-react v1.17.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Fv=[["path",{d:"M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z",key:"1s2grr"}],["path",{d:"M20 2v4",key:"1rf3ol"}],["path",{d:"M22 4h-4",key:"gwowj6"}],["circle",{cx:"4",cy:"20",r:"2",key:"6kqj1y"}]],Hc=b("sparkles",Fv);/**
 * @license lucide-react v1.17.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Dv=[["path",{d:"M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z",key:"r04s7s"}]],Vc=b("star",Dv);/**
 * @license lucide-react v1.17.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Av=[["path",{d:"M21 5H3",key:"1fi0y6"}],["path",{d:"M15 12H3",key:"6jk70r"}],["path",{d:"M17 19H3",key:"z6ezky"}]],Mh=b("text-align-start",Av);/**
 * @license lucide-react v1.17.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const bv=[["path",{d:"M12 3v12",key:"1x0j5s"}],["path",{d:"m17 8-5-5-5 5",key:"7q97r8"}],["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",key:"ih7n3h"}]],Bv=b("upload",bv);/**
 * @license lucide-react v1.17.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Uv=[["path",{d:"M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2",key:"975kel"}],["circle",{cx:"12",cy:"7",r:"4",key:"17ys0d"}]],Oh=b("user",Uv);/**
 * @license lucide-react v1.17.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Wv=[["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",key:"1yyitq"}],["path",{d:"M16 3.128a4 4 0 0 1 0 7.744",key:"16gr8j"}],["path",{d:"M22 21v-2a4 4 0 0 0-3-3.87",key:"kshegd"}],["circle",{cx:"9",cy:"7",r:"4",key:"nufk8"}]],tl=b("users",Wv);/**
 * @license lucide-react v1.17.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Hv=[["path",{d:"M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z",key:"uqj9uw"}],["path",{d:"M16 9a5 5 0 0 1 0 6",key:"1q6k2b"}],["path",{d:"M19.364 18.364a9 9 0 0 0 0-12.728",key:"ijwkga"}]],Vv=b("volume-2",Hv),Qc=e=>{let t;const n=new Set,r=(c,h)=>{const p=typeof c=="function"?c(t):c;if(!Object.is(p,t)){const m=t;t=h??(typeof p!="object"||p===null)?p:Object.assign({},t,p),n.forEach(x=>x(t,m))}},o=()=>t,s={setState:r,getState:o,getInitialState:()=>a,subscribe:c=>(n.add(c),()=>n.delete(c))},a=t=e(r,o,s);return s},Qv=e=>e?Qc(e):Qc,Yv=e=>e;function Gv(e,t=Yv){const n=it.useSyncExternalStore(e.subscribe,it.useCallback(()=>t(e.getState()),[e,t]),it.useCallback(()=>t(e.getInitialState()),[e,t]));return it.useDebugValue(n),n}const Yc=e=>{const t=Qv(e),n=r=>Gv(t,r);return Object.assign(n,t),n},Kv=e=>e?Yc(e):Yc,Xv={currentSong:null,isPlaying:!1,volume:.7,progress:0,shuffle:!1,repeat:"off",currentPlaylist:[],currentIndex:-1},gt=Kv((e,t)=>({...Xv,setCurrentSong:n=>e({currentSong:n}),setIsPlaying:n=>e({isPlaying:n}),setVolume:n=>e({volume:Math.max(0,Math.min(1,n))}),setProgress:n=>e({progress:Math.max(0,Math.min(100,n))}),setShuffle:n=>e({shuffle:n}),setRepeat:n=>e({repeat:n}),setCurrentPlaylist:n=>e({currentPlaylist:n,currentIndex:-1}),setCurrentIndex:n=>{const{currentPlaylist:r}=t();n>=0&&n<r.length&&e({currentIndex:n,currentSong:r[n]})},playNext:()=>{const{currentPlaylist:n,currentIndex:r,shuffle:o,repeat:l}=t();let i;if(o)i=Math.floor(Math.random()*n.length);else if(l==="one")i=r;else if(l==="all"&&r===n.length-1)i=0;else if(r<n.length-1)i=r+1;else return;e({currentIndex:i,currentSong:n[i],isPlaying:!0})},playPrevious:()=>{const{currentPlaylist:n,currentIndex:r,shuffle:o}=t();let l;o?l=Math.floor(Math.random()*n.length):r>0?l=r-1:l=n.length-1,e({currentIndex:l,currentSong:n[l],isPlaying:!0})},playSongAt:n=>{const{currentPlaylist:r}=t();n>=0&&n<r.length&&e({currentIndex:n,currentSong:r[n],isPlaying:!0})}})),Gc=[{id:"1",title:"Comfortably Numb",artist:"Pink Floyd",album:"The Wall",duration:382,url:""},{id:"2",title:"Wish You Were Here",artist:"Pink Floyd",album:"Wish You Were Here",duration:334,url:""},{id:"3",title:"Time",artist:"Pink Floyd",album:"The Dark Side of the Moon",duration:412,url:""},{id:"4",title:"Echoes",artist:"Pink Floyd",album:"Meddle",duration:742,url:""}],Kc=[{id:"1",name:"Daily Recommendation",cover:"https://neeko-copilot.bytedance.net/api/text_to_image?prompt=abstract%20prism%20refraction%20pink%20floyd%20style%20dark%20side%20of%20moon&image_size=square",songs:Gc.slice(0,3)},{id:"2",name:"Classic Trilogy",cover:"https://neeko-copilot.bytedance.net/api/text_to_image?prompt=vintage%20vinyl%20record%20pink%20floyd%20album%20art&image_size=square",songs:Gc.slice(1,4)}],Jv=[{id:"1",title:"Money",type:"Blues Riff",duration:12},{id:"2",title:"Another Brick in the Wall",type:"Punk Riff",duration:8},{id:"3",title:"Shine On You Crazy Diamond",type:"Ambient",duration:15}],Zv=y.div`
  min-height: 100vh;
  padding: 20px;
  padding-bottom: 200px;
`,qv=y.header`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 30px;
`,ex=y.h1`
  font-size: 32px;
  font-weight: 700;
  color: #d9ceb2;
  margin: 0;
  padding-top: calc(env(safe-area-inset-top) + 10px);
`,tx=y.div`
  position: relative;
  display: flex;
  align-items: center;
`,nx=y.input`
  width: 100%;
  height: 48px;
  padding: 0 50px 0 20px;
  border: none;
  border-radius: 24px;
  background: rgba(217, 206, 178, 0.1);
  color: #d9ceb2;
  font-size: 16px;
  outline: none;
  transition: all 0.3s ease;

  &::placeholder {
    color: rgba(217, 206, 178, 0.5);
  }

  &:focus {
    background: rgba(217, 206, 178, 0.15);
  }
`,rx=y(Lv)`
  position: absolute;
  right: 16px;
  width: 20px;
  height: 20px;
  color: rgba(217, 206, 178, 0.5);
`,Ro=y.section`
  margin-bottom: 30px;
`,_o=y.h2`
  font-size: 18px;
  font-weight: 600;
  color: #d9ceb2;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
`,ox=y.div`
  background: linear-gradient(135deg, rgba(217, 206, 178, 0.1) 0%, rgba(217, 206, 178, 0.05) 100%);
  border-radius: 20px;
  padding: 24px;
  display: flex;
  gap: 20px;
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-4px);
  }
`,lx=y.div`
  width: 100px;
  height: 100px;
  border-radius: 12px;
  background: linear-gradient(135deg, #d9ceb2, #a89f80);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  svg {
    width: 40px;
    height: 40px;
    color: #1f6156;
  }
`,ix=y.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 8px;
`,sx=y.h3`
  font-size: 20px;
  font-weight: 600;
  color: #d9ceb2;
  margin: 0;
`,ax=y.p`
  font-size: 14px;
  color: rgba(217, 206, 178, 0.6);
  margin: 0;
`,ux=y.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
`,cx=y.div`
  background: rgba(217, 206, 178, 0.08);
  border-radius: 16px;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-4px);
  }
`,dx=y.div`
  width: 100%;
  aspect-ratio: 1;
  background: linear-gradient(135deg, #d9ceb2, #a89f80);
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 40px;
    height: 40px;
    color: #1f6156;
  }
`,fx=y.div`
  padding: 12px;
`,px=y.h4`
  font-size: 14px;
  font-weight: 500;
  color: #d9ceb2;
  margin: 0 0 4px;
`,hx=y.p`
  font-size: 12px;
  color: rgba(217, 206, 178, 0.5);
  margin: 0;
`,mx=y.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`,gx=y.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background: rgba(217, 206, 178, 0.05);
  border-radius: 12px;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: rgba(217, 206, 178, 0.1);
  }
`,yx=y.div`
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: linear-gradient(135deg, #d9ceb2, #a89f80);
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 18px;
    height: 18px;
    color: #1f6156;
  }
`,vx=y.div`
  flex: 1;
`,xx=y.h4`
  font-size: 14px;
  font-weight: 500;
  color: #d9ceb2;
  margin: 0 0 2px;
`,wx=y.p`
  font-size: 11px;
  color: rgba(217, 206, 178, 0.5);
  margin: 0;
`,kx=y.span`
  font-size: 12px;
  color: rgba(217, 206, 178, 0.6);
`,Sx=y.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
`,$o=y.div`
  background: rgba(217, 206, 178, 0.08);
  border-radius: 16px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(217, 206, 178, 0.12);
    transform: translateY(-2px);
  }

  svg {
    width: 28px;
    height: 28px;
    color: #d9ceb2;
  }

  span {
    font-size: 12px;
    font-weight: 500;
    color: #d9ceb2;
  }
`,Cx=()=>{const[e,t]=k.useState(""),{setCurrentPlaylist:n,playSongAt:r}=gt(),o=l=>{n(l),r(0)};return u.jsxs(Zv,{children:[u.jsxs(qv,{children:[u.jsx(ex,{children:"Discover"}),u.jsxs(tx,{children:[u.jsx(nx,{type:"text",placeholder:"Search songs, albums, artists...",value:e,onChange:l=>t(l.target.value)}),u.jsx(rx,{})]})]}),u.jsxs(Ro,{children:[u.jsxs(_o,{children:[u.jsx(Hc,{style:{width:20,height:20}}),"Daily Recommendation"]}),u.jsxs(ox,{onClick:()=>o(Kc[0].songs),children:[u.jsx(lx,{children:u.jsx(bi,{})}),u.jsxs(ix,{children:[u.jsx(sx,{children:"Today's Vibe"}),u.jsx(ax,{children:"Based on your listening history"})]})]})]}),u.jsxs(Ro,{children:[u.jsxs(_o,{children:[u.jsx(Vc,{style:{width:20,height:20}}),"Featured Playlists"]}),u.jsx(ux,{children:Kc.map(l=>u.jsxs(cx,{onClick:()=>o(l.songs),children:[u.jsx(dx,{children:u.jsx(Ht,{})}),u.jsxs(fx,{children:[u.jsx(px,{children:l.name}),u.jsxs(hx,{children:[l.songs.length," songs"]})]})]},l.id))})]}),u.jsxs(Ro,{children:[u.jsxs(_o,{children:[u.jsx(Ht,{style:{width:20,height:20}}),"Riff Highlights"]}),u.jsx(mx,{children:Jv.map(l=>u.jsxs(gx,{children:[u.jsx(yx,{children:u.jsx(bi,{})}),u.jsxs(vx,{children:[u.jsx(xx,{children:l.title}),u.jsx(wx,{children:l.type})]}),u.jsxs(kx,{children:[l.duration,"s"]})]},l.id))})]}),u.jsxs(Ro,{children:[u.jsxs(_o,{children:[u.jsx(ov,{style:{width:20,height:20}}),"Explore"]}),u.jsxs(Sx,{children:[u.jsxs($o,{children:[u.jsx(bi,{}),u.jsx("span",{children:"Rock Hall of Fame"})]}),u.jsxs($o,{children:[u.jsx(Ht,{}),u.jsx("span",{children:"Solo Showcase"})]}),u.jsxs($o,{children:[u.jsx(Vc,{}),u.jsx("span",{children:"Behind the Scenes"})]}),u.jsxs($o,{children:[u.jsx(Hc,{}),u.jsx("span",{children:"AI Discover"})]})]})]})]})},Ui=[{id:"1",title:"Comfortably Numb",artist:"Pink Floyd",album:"The Wall",duration:382,url:""},{id:"2",title:"Hey You",artist:"Pink Floyd",album:"The Wall",duration:286,url:""}],Xc=[{id:"1",userId:"1",userName:"Riff考古员",content:"02:17 处镲片衰减时间比 1973 年温布利场长 120ms —— 听出混响算法升级了吗？",timestamp:Date.now()-12e4,position:137},{id:"2",userId:"2",userName:"Gilmour迷",content:"这段吉他solo用的是Fender Stratocaster + Dallas Arbiter Fuzz Face",timestamp:Date.now()-3e5,position:180},{id:"3",userId:"3",userName:"音效工程师",content:"EMT 140 Plate Reverb 的经典应用",timestamp:Date.now()-6e5,position:210}],jx=[{id:"1",name:"迷幻摇滚迷",level:"Riff考古员 Lv.7",avatar:null,reason:"推荐因这段使用了 1975 年 EMI Abbey Road Studio 3 的 Plate Reverb"},{id:"2",name:"PinkFloydFan",level:"音效解析师 Lv.5",avatar:null,reason:"Gilmour 的音色调制非常经典"}],Ex=y.div`
  min-height: 100vh;
  padding: 20px;
  padding-bottom: 200px;
`,Px=y.header`
  margin-bottom: 24px;
  padding-top: calc(env(safe-area-inset-top) + 10px);
`,Rx=y.h1`
  font-size: 32px;
  font-weight: 700;
  color: #d9ceb2;
  margin: 0 0 8px;
`,_x=y.p`
  font-size: 14px;
  color: rgba(217, 206, 178, 0.6);
  margin: 0;
`,$x=y.div`
  background: rgba(217, 206, 178, 0.08);
  border-radius: 20px;
  padding: 24px;
  margin-bottom: 24px;
`,Nx=y.div`
  width: 100%;
  aspect-ratio: 1;
  border-radius: 16px;
  background: linear-gradient(135deg, #d9ceb2, #a89f80);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;

  svg {
    width: 80px;
    height: 80px;
    color: #1f6156;
  }
`,Lx=y.div`
  text-align: center;
  margin-bottom: 20px;
`,zx=y.h2`
  font-size: 24px;
  font-weight: 600;
  color: #d9ceb2;
  margin: 0 0 8px;
`,Tx=y.p`
  font-size: 16px;
  color: rgba(217, 206, 178, 0.7);
  margin: 0;
`,Ix=y.div`
  height: 4px;
  background: rgba(217, 206, 178, 0.2);
  border-radius: 2px;
  cursor: pointer;
  margin-bottom: 12px;
`,Mx=y.div`
  height: 100%;
  background: linear-gradient(90deg, #d9ceb2, #a89f80);
  border-radius: 2px;
  width: 35%;
`,Ox=y.div`
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: rgba(217, 206, 178, 0.5);
  margin-bottom: 20px;
`,Fx=y.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 24px;
`,vr=y.button`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: none;
  background: rgba(217, 206, 178, 0.15);
  color: #d9ceb2;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(217, 206, 178, 0.25);
  }

  &:active {
    transform: scale(0.95);
  }

  svg {
    width: 24px;
    height: 24px;
  }
`,Dx=y(vr)`
  width: 64px;
  height: 64px;
  background: linear-gradient(135deg, #d9ceb2, #a89f80);
  color: #1f6156;

  svg {
    width: 28px;
    height: 28px;
  }
`,Ax=y.div`
  position: relative;
  height: 120px;
  background: rgba(13, 61, 54, 0.5);
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 24px;
`,bx=y.div`
  position: absolute;
  padding: 8px 16px;
  background: rgba(217, 206, 178, 0.15);
  border-radius: 20px;
  font-size: 12px;
  color: #d9ceb2;
  white-space: nowrap;
  animation: flow 8s linear forwards;

  @keyframes flow {
    from {
      transform: translateX(100%);
    }
    to {
      transform: translateX(-100%);
    }
  }
`,Jc=y.section`
  margin-bottom: 24px;
`,Bx=y.h2`
  font-size: 18px;
  font-weight: 600;
  color: #d9ceb2;
  margin: 0 0 16px;
  display: flex;
  align-items: center;
  gap: 8px;

  svg {
    width: 20px;
    height: 20px;
  }
`,Ux=y.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`,Wx=y.div`
  display: flex;
  gap: 12px;
  padding: 16px;
  background: rgba(217, 206, 178, 0.05);
  border-radius: 12px;
`,Fh=y.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: linear-gradient(135deg, #d9ceb2, #a89f80);
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 24px;
    height: 24px;
    color: #1f6156;
  }
`,Hx=y.div`
  flex: 1;
`,Vx=y.h4`
  font-size: 14px;
  font-weight: 500;
  color: #d9ceb2;
  margin: 0 0 4px;
`,Qx=y.span`
  font-size: 11px;
  color: rgba(217, 206, 178, 0.5);
`,Yx=y.p`
  font-size: 12px;
  color: rgba(217, 206, 178, 0.7);
  margin: 8px 0 0;
  line-height: 1.5;
`,Gx=y.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`,Kx=y.div`
  padding: 16px;
  background: rgba(217, 206, 178, 0.05);
  border-radius: 12px;
`,Xx=y.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
`,Jx=y(Fh)`
  width: 36px;
  height: 36px;

  svg {
    width: 18px;
    height: 18px;
  }
`,Zx=y.h4`
  font-size: 13px;
  font-weight: 500;
  color: #d9ceb2;
  margin: 0;
`,qx=y.p`
  font-size: 14px;
  color: rgba(217, 206, 178, 0.9);
  margin: 0;
  line-height: 1.6;
`,e2=y.div`
  display: flex;
  align-items: center;
  gap: 20px;
  margin-top: 10px;
`,Zc=y.button`
  display: flex;
  align-items: center;
  gap: 4px;
  background: none;
  border: none;
  color: rgba(217, 206, 178, 0.5);
  cursor: pointer;
  font-size: 12px;
  transition: color 0.3s ease;

  &:hover {
    color: #d9ceb2;
  }

  svg {
    width: 14px;
    height: 14px;
  }
`,t2=y.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`,n2=y.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background: rgba(217, 206, 178, 0.05);
  border-radius: 12px;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: rgba(217, 206, 178, 0.1);
  }
`,r2=y.div`
  width: 50px;
  height: 50px;
  border-radius: 8px;
  background: linear-gradient(135deg, #d9ceb2, #a89f80);
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 24px;
    height: 24px;
    color: #1f6156;
  }
`,o2=y.div`
  flex: 1;
`,l2=y.h4`
  font-size: 14px;
  font-weight: 500;
  color: #d9ceb2;
  margin: 0 0 2px;
`,i2=y.p`
  font-size: 12px;
  color: rgba(217, 206, 178, 0.5);
  margin: 0;
`,s2=()=>{const[e,t]=k.useState("recommenders"),{setCurrentPlaylist:n,playSongAt:r}=gt(),o=l=>{n([l]),r(0)};return u.jsxs(Ex,{children:[u.jsxs(Px,{children:[u.jsx(Rx,{children:"Meet"}),u.jsx(_x,{children:"Discover music through community"})]}),u.jsxs($x,{children:[u.jsx(Nx,{children:u.jsx(Ht,{})}),u.jsxs(Lx,{children:[u.jsx(zx,{children:Ui[0].title}),u.jsx(Tx,{children:Ui[0].artist})]}),u.jsx(Ix,{children:u.jsx(Mx,{})}),u.jsxs(Ox,{children:[u.jsx("span",{children:"01:15"}),u.jsx("span",{children:"06:22"})]}),u.jsxs(Fx,{children:[u.jsx(vr,{children:u.jsx(Lh,{})}),u.jsx(vr,{children:u.jsx(Ll,{})}),u.jsx(Dx,{children:u.jsx("svg",{viewBox:"0 0 24 24",fill:"currentColor",children:u.jsx("path",{d:"M8 5v14l11-7z"})})}),u.jsx(vr,{children:u.jsx(Rh,{})}),u.jsx(vr,{children:u.jsx(Bi,{})})]})]}),u.jsx(Ax,{children:Xc.slice(0,2).map((l,i)=>u.jsx(bx,{style:{top:`${i*40+20}px`,animationDelay:`${i*2}s`},children:l.content},l.id))}),u.jsxs(Jc,{children:[u.jsxs("div",{style:{display:"flex",gap:16,marginBottom:16},children:[u.jsxs("button",{onClick:()=>t("recommenders"),style:{background:e==="recommenders"?"rgba(217, 206, 178, 0.2)":"transparent",border:"none",borderRadius:"12px",padding:"8px 20px",color:"#d9ceb2",fontSize:"14px",fontWeight:"500",cursor:"pointer"},children:[u.jsx(tl,{style:{width:18,height:18,display:"inline",marginRight:6}}),"Recommenders"]}),u.jsxs("button",{onClick:()=>t("comments"),style:{background:e==="comments"?"rgba(217, 206, 178, 0.2)":"transparent",border:"none",borderRadius:"12px",padding:"8px 20px",color:"#d9ceb2",fontSize:"14px",fontWeight:"500",cursor:"pointer"},children:[u.jsx(Bi,{style:{width:18,height:18,display:"inline",marginRight:6}}),"Comments"]})]}),e==="recommenders"?u.jsx(Ux,{children:jx.map(l=>u.jsxs(Wx,{children:[u.jsx(Fh,{children:u.jsx(tl,{})}),u.jsxs(Hx,{children:[u.jsxs("div",{style:{display:"flex",alignItems:"center",gap:8},children:[u.jsx(Vx,{children:l.name}),u.jsx(Qx,{children:l.level})]}),u.jsx(Yx,{children:l.reason})]})]},l.id))}):u.jsx(Gx,{children:Xc.map(l=>u.jsxs(Kx,{children:[u.jsxs(Xx,{children:[u.jsx(Jx,{children:u.jsx(tl,{})}),u.jsx(Zx,{children:l.userName})]}),u.jsx(qx,{children:l.content}),u.jsxs(e2,{children:[u.jsxs(Zc,{children:[u.jsx(Ll,{}),"Like"]}),u.jsxs(Zc,{children:[u.jsx(Bi,{}),"Reply"]})]})]},l.id))})]}),u.jsxs(Jc,{children:[u.jsxs(Bx,{children:[u.jsx(Ht,{}),"Related Songs"]}),u.jsx(t2,{children:Ui.slice(1).map(l=>u.jsxs(n2,{onClick:()=>o(l),children:[u.jsx(r2,{children:u.jsx(Ht,{})}),u.jsxs(o2,{children:[u.jsx(l2,{children:l.title}),u.jsx(i2,{children:l.artist})]})]},l.id))})]})]})},qc=[{id:"1",title:"Comfortably Numb",artist:"Pink Floyd",album:"The Wall",duration:382,url:""},{id:"2",title:"Wish You Were Here",artist:"Pink Floyd",album:"Wish You Were Here",duration:334,url:""},{id:"3",title:"Time",artist:"Pink Floyd",album:"The Dark Side of the Moon",duration:412,url:""}],a2=[{id:"1",name:"My Favorites",count:12},{id:"2",name:"Classic Rock",count:8},{id:"3",name:"Live Recordings",count:5}],u2=y.div`
  min-height: 100vh;
  padding: 20px;
  padding-bottom: 200px;
`,c2=y.header`
  margin-bottom: 30px;
  padding-top: calc(env(safe-area-inset-top) + 10px);
`,d2=y.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
`,f2=y.div`
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: linear-gradient(135deg, #d9ceb2, #a89f80);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  svg {
    width: 36px;
    height: 36px;
    color: #1f6156;
  }
`,p2=y.div`
  position: absolute;
  bottom: -4px;
  right: -4px;
  padding: 2px 8px;
  background: linear-gradient(135deg, #d9ceb2, #a89f80);
  border-radius: 10px;
  font-size: 10px;
  font-weight: 600;
  color: #1f6156;
`,h2=y.div`
  flex: 1;
`,m2=y.h2`
  font-size: 20px;
  font-weight: 600;
  color: #d9ceb2;
  margin: 0 0 4px;
`,g2=y.span`
  font-size: 12px;
  color: rgba(217, 206, 178, 0.6);
`,y2=y.button`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: none;
  background: rgba(217, 206, 178, 0.1);
  color: #d9ceb2;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(217, 206, 178, 0.2);
  }

  svg {
    width: 20px;
    height: 20px;
  }
`,v2=y.div`
  background: rgba(217, 206, 178, 0.08);
  border-radius: 16px;
  padding: 20px;
  margin-bottom: 24px;
`,x2=y.p`
  font-size: 14px;
  color: rgba(217, 206, 178, 0.9);
  margin: 0 0 8px;
  font-style: italic;
  line-height: 1.6;
`,w2=y.p`
  font-size: 12px;
  color: rgba(217, 206, 178, 0.5);
  margin: 0;
  text-align: right;
`,Wi=y.section`
  margin-bottom: 24px;
`,Hi=y.h2`
  font-size: 18px;
  font-weight: 600;
  color: #d9ceb2;
  margin: 0 0 16px;
`,k2=y.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
`,No=y.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 16px;
  background: rgba(217, 206, 178, 0.08);
  border: none;
  border-radius: 16px;
  color: #d9ceb2;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(217, 206, 178, 0.15);
    transform: translateY(-2px);
  }

  svg {
    width: 28px;
    height: 28px;
  }

  span {
    font-size: 11px;
    font-weight: 500;
  }
`,S2=y.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`,C2=y.button`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  background: rgba(217, 206, 178, 0.05);
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;

  &:hover {
    background: rgba(217, 206, 178, 0.1);
  }
`,j2=y.div`
  width: 48px;
  height: 48px;
  border-radius: 10px;
  background: linear-gradient(135deg, #d9ceb2, #a89f80);
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 24px;
    height: 24px;
    color: #1f6156;
  }
`,E2=y.div`
  flex: 1;
  text-align: left;
`,P2=y.h4`
  font-size: 14px;
  font-weight: 500;
  color: #d9ceb2;
  margin: 0 0 4px;
`,R2=y.p`
  font-size: 12px;
  color: rgba(217, 206, 178, 0.5);
  margin: 0;
`,Lo=y(iv)`
  width: 20px;
  height: 20px;
  color: rgba(217, 206, 178, 0.4);
`,_2=y.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`,$2=y.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background: rgba(217, 206, 178, 0.05);
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(217, 206, 178, 0.1);
  }
`,N2=y.span`
  width: 24px;
  font-size: 12px;
  color: rgba(217, 206, 178, 0.5);
  text-align: center;
`,L2=y.div`
  width: 44px;
  height: 44px;
  border-radius: 8px;
  background: linear-gradient(135deg, #d9ceb2, #a89f80);
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 20px;
    height: 20px;
    color: #1f6156;
  }
`,z2=y.div`
  flex: 1;
  min-width: 0;
`,T2=y.h4`
  font-size: 13px;
  font-weight: 500;
  color: #d9ceb2;
  margin: 0 0 2px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`,I2=y.p`
  font-size: 11px;
  color: rgba(217, 206, 178, 0.5);
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`,M2=y.span`
  font-size: 12px;
  color: rgba(217, 206, 178, 0.5);
`,O2=y.div`
  height: 1px;
  background: rgba(217, 206, 178, 0.1);
  margin: 24px 0;
`,F2=y.div`
  display: flex;
  flex-direction: column;
`,nl=y.button`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  background: none;
  border: none;
  color: #d9ceb2;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;
  text-align: left;

  &:hover {
    background: rgba(217, 206, 178, 0.1);
  }

  svg {
    width: 20px;
    height: 20px;
    color: rgba(217, 206, 178, 0.7);
  }

  span {
    font-size: 15px;
    flex: 1;
  }
`,D2=y(nl)`
  color: rgba(239, 68, 68, 0.8);

  svg {
    color: rgba(239, 68, 68, 0.8);
  }
`,A2=y.input`
  display: none;
`,b2=()=>{const{setCurrentPlaylist:e,playSongAt:t}=gt(),[n,r]=k.useState(0),o=i=>{const s=i.target.files;if(s&&s.length>0){const a=Array.from(s).map((c,h)=>({id:`local-${h}`,title:c.name.replace(/\.[^/.]+$/,""),artist:"Local File",album:"Local Music",duration:0,url:URL.createObjectURL(c)}));e(a),t(0),r(c=>c+1)}},l=(i,s)=>{e(qc),t(s)};return u.jsxs(u2,{children:[u.jsxs(c2,{children:[u.jsxs(d2,{children:[u.jsxs(f2,{children:[u.jsx(Oh,{}),u.jsx(p2,{children:"Riff Lv.5"})]}),u.jsxs(h2,{children:[u.jsx(m2,{children:"PinkFloydFan"}),u.jsx(g2,{children:"Music Explorer"})]}),u.jsx(y2,{children:u.jsx(Wc,{})})]}),u.jsxs(v2,{children:[u.jsx(x2,{children:'"The band is a democracy... until someone brings in a new idea."'}),u.jsx(w2,{children:"— Roger Waters"})]})]}),u.jsxs(Wi,{children:[u.jsx(Hi,{children:"Quick Actions"}),u.jsxs(k2,{children:[u.jsxs(No,{children:[u.jsx(vv,{}),u.jsx("span",{children:"Library"})]}),u.jsxs(No,{children:[u.jsx(Ll,{}),u.jsx("span",{children:"Favorites"})]}),u.jsxs(No,{children:[u.jsx(pv,{}),u.jsx("span",{children:"Downloads"})]}),u.jsxs(No,{onClick:()=>{var i;return(i=document.getElementById("file-upload"))==null?void 0:i.click()},children:[u.jsx(Bv,{}),u.jsx("span",{children:"Import"})]}),u.jsx(A2,{id:"file-upload",type:"file",accept:"audio/*",multiple:!0,onChange:o},n)]})]}),u.jsxs(Wi,{children:[u.jsx(Hi,{children:"Favorite Songs"}),u.jsx(_2,{children:qc.map((i,s)=>u.jsxs($2,{onClick:()=>l(i,s),children:[u.jsx(N2,{children:s+1}),u.jsx(L2,{children:u.jsx(Ht,{})}),u.jsxs(z2,{children:[u.jsx(T2,{children:i.title}),u.jsx(I2,{children:i.artist})]}),u.jsxs(M2,{children:[Math.floor(i.duration/60),":",String(i.duration%60).padStart(2,"0")]})]},i.id))})]}),u.jsxs(Wi,{children:[u.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16},children:[u.jsx(Hi,{children:"My Playlists"}),u.jsxs("button",{style:{background:"none",border:"none",color:"#d9ceb2",fontSize:"14px",cursor:"pointer",display:"flex",alignItems:"center",gap:4},children:[u.jsx(_v,{style:{width:18,height:18}}),"New"]})]}),u.jsx(S2,{children:a2.map(i=>u.jsxs(C2,{children:[u.jsx(j2,{children:u.jsx(Ht,{})}),u.jsxs(E2,{children:[u.jsx(P2,{children:i.name}),u.jsxs(R2,{children:[i.count," songs"]})]}),u.jsx(Lo,{})]},i.id))})]}),u.jsx(O2,{}),u.jsxs(F2,{children:[u.jsxs(nl,{children:[u.jsx(Cv,{}),u.jsx("span",{children:"Dark Mode"}),u.jsx(Lo,{})]}),u.jsxs(nl,{children:[u.jsx(av,{}),u.jsx("span",{children:"Recently Played"}),u.jsx(Lo,{})]}),u.jsxs(nl,{children:[u.jsx(Wc,{}),u.jsx("span",{children:"Settings"}),u.jsx(Lo,{})]}),u.jsxs(D2,{children:[u.jsx(wv,{}),u.jsx("span",{children:"Log Out"})]})]})]})},ed=y.div`
  min-height: 100vh;
  padding: 20px;
  padding-bottom: 200px;
  background: linear-gradient(180deg, #0d3d36 0%, #1f6156 100%);
`,B2=y.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  padding-top: calc(env(safe-area-inset-top) + 10px);
`,Dh=y.button`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: 1px solid rgba(217, 206, 178, 0.3);
  background: rgba(217, 206, 178, 0.1);
  color: #d9ceb2;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(217, 206, 178, 0.2);
  }

  svg {
    width: 20px;
    height: 20px;
  }
`,U2=y.div`
  display: flex;
  gap: 12px;
`,Vi=y(Dh)`
  svg {
    width: 18px;
    height: 18px;
  }
`,td=y.div`
  background: linear-gradient(145deg, #2a2a2a, #1a1a1a);
  border-radius: 16px;
  padding: 20px;
  margin-bottom: 30px;
  box-shadow: 
    0 10px 40px rgba(0, 0, 0, 0.4),
    inset 0 2px 4px rgba(255, 255, 255, 0.05);
  border: 3px solid #3a3a3a;
`,nd=y.div`
  background: linear-gradient(180deg, #d9ceb2 0%, #c9bf9a 100%);
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
  min-height: 80px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`,rd=y.h2`
  font-size: 18px;
  font-weight: 700;
  color: #1f6156;
  margin: 0 0 4px;
  text-transform: uppercase;
  letter-spacing: 1px;
`,od=y.p`
  font-size: 14px;
  color: #3a5a52;
  margin: 0;
`,ld=y.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
`,zo=y.div`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background: radial-gradient(circle, #4a4a4a 0%, #2a2a2a 70%, #1a1a1a 100%);
  border: 3px solid #5a5a5a;
  position: relative;
  box-shadow: 
    inset 0 2px 4px rgba(0, 0, 0, 0.5),
    0 2px 4px rgba(0, 0, 0, 0.3);
`,To=y.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: #1a1a1a;
  border: 2px solid #3a3a3a;
`,Io=y.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 40px;
  height: 40px;
  
  &::before, &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 0;
    width: 100%;
    height: 2px;
    background: #5a5a5a;
    transform: translateY(-50%);
  }
  
  &::after {
    transform: translateY(-50%) rotate(90deg);
  }
`,id=y.div`
  width: 120px;
  height: 80px;
  background: linear-gradient(180deg, #1a1a1a 0%, #0d0d0d 100%);
  border-radius: 8px;
  border: 2px solid #3a3a3a;
  position: relative;
  overflow: hidden;
`,sd=y.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90px;
  height: 60px;
  background: repeating-linear-gradient(
    90deg,
    #2a2a2a 0px,
    #2a2a2a 2px,
    #1a1a1a 2px,
    #1a1a1a 4px
  );
  opacity: 0.8;
`,ad=y.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  gap: 30px;
`,Mo=y.div`
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #0d0d0d;
  border: 2px solid #3a3a3a;
`,ud=y.div`
  display: flex;
  justify-content: center;
  gap: 4px;
  margin-top: 12px;
`,vn=y.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #5a5a5a;
`,Qi=y.div`
  position: relative;
  margin-bottom: 24px;
`,Yi=y.div`
  background: linear-gradient(135deg, #8b4513 0%, #654321 50%, #4a3015 100%);
  border-radius: 12px;
  padding: 12px;
  box-shadow: 
    0 4px 15px rgba(0, 0, 0, 0.3),
    inset 0 1px 2px rgba(255, 255, 255, 0.1);
`,Gi=y.div`
  display: flex;
  align-items: center;
  gap: 8px;
`,Ki=y.div`
  flex: 1;
  height: 24px;
  position: relative;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  overflow: hidden;
`,Xi=y.div`
  position: absolute;
  top: 50%;
  left: 0;
  width: 100%;
  height: 2px;
  background: linear-gradient(90deg, #c0c0c0, #e8e8e8, #c0c0c0);
  transform: translateY(-50%);
  
  &:nth-child(1) { top: 20%; }
  &:nth-child(2) { top: 35%; }
  &:nth-child(3) { top: 50%; }
  &:nth-child(4) { top: 65%; }
  &:nth-child(5) { top: 80%; }
`,Ji=y.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: linear-gradient(135deg, #d9ceb2, #a89f80);
  box-shadow: 
    0 2px 8px rgba(0, 0, 0, 0.3),
    inset 0 1px 2px rgba(255, 255, 255, 0.5);
  cursor: pointer;
  transition: transform 0.2s ease;
  
  &:hover {
    transform: scale(1.1);
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 4px;
    right: 4px;
    height: 4px;
    background: rgba(0, 0, 0, 0.2);
    border-radius: 2px;
    transform: translateY(-50%);
  }
`,Zi=y.div`
  display: flex;
  justify-content: space-between;
  margin-top: 8px;
  font-size: 11px;
  color: rgba(217, 206, 178, 0.6);
`,cd=y.input`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
`,W2=y.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin-bottom: 24px;
`,xr=y.button`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: 2px solid rgba(217, 206, 178, 0.3);
  background: rgba(217, 206, 178, 0.1);
  color: #d9ceb2;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(217, 206, 178, 0.2);
    border-color: rgba(217, 206, 178, 0.5);
  }

  &:active {
    transform: scale(0.95);
  }

  svg {
    width: 22px;
    height: 22px;
  }
`,H2=y(xr)`
  width: 72px;
  height: 72px;
  background: linear-gradient(135deg, #d9ceb2, #a89f80);
  border-color: #d9ceb2;
  color: #1f6156;

  svg {
    width: 30px;
    height: 30px;
  }
`,V2=y.div`
  display: flex;
  justify-content: center;
  gap: 32px;
  margin-bottom: 24px;
`,dd=y.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  background: none;
  border: none;
  color: #d9ceb2;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
  }

  svg {
    width: 28px;
    height: 28px;
    opacity: 0.7;
  }

  span {
    font-size: 11px;
    color: rgba(217, 206, 178, 0.7);
  }
`,fd=y.div`
  background: rgba(217, 206, 178, 0.08);
  border-radius: 16px;
  padding: 20px;
  border: 1px solid rgba(217, 206, 178, 0.1);
`,pd=y.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
`,Q2=y(Mh)`
  width: 18px;
  height: 18px;
  color: #d9ceb2;
`,hd=y.h3`
  font-size: 15px;
  font-weight: 600;
  color: #d9ceb2;
  margin: 0;
`,Y2=y.div`
  font-size: 14px;
  color: rgba(217, 206, 178, 0.9);
  line-height: 2;
  text-align: center;
`,G2=y.span`
  color: #d9ceb2;
  font-weight: 500;
  font-size: 16px;
`,qi=e=>{const t=Math.floor(e/60),n=Math.floor(e%60);return`${t}:${n.toString().padStart(2,"0")}`},K2=()=>{const{currentSong:e,isPlaying:t,progress:n,volume:r,shuffle:o,repeat:l,setIsPlaying:i,setVolume:s,setShuffle:a,setRepeat:c,playNext:h,playPrevious:p}=gt(),[m,x]=k.useState(!0),[v,w]=k.useState(1),E=()=>{i(!t)};return e?u.jsxs(ed,{children:[u.jsxs(B2,{children:[u.jsx(Dh,{onClick:()=>window.history.back(),children:u.jsx("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:u.jsx("path",{d:"M15 19l-7-7 7-7"})})}),u.jsxs(U2,{children:[u.jsx(Vi,{children:u.jsx(Ll,{})}),u.jsx(Vi,{children:u.jsx(Lh,{})}),u.jsx(Vi,{children:u.jsx(Rh,{})})]})]}),u.jsxs(td,{children:[u.jsxs(nd,{children:[u.jsx(rd,{children:e.title}),u.jsxs(od,{children:[e.artist," - ",e.album]})]}),u.jsxs(ld,{children:[u.jsx(zo,{children:u.jsx(To,{children:u.jsx(Io,{})})}),u.jsxs(id,{children:[u.jsx(sd,{}),u.jsxs(ad,{children:[u.jsx(Mo,{}),u.jsx(Mo,{})]})]}),u.jsx(zo,{children:u.jsx(To,{children:u.jsx(Io,{})})})]}),u.jsxs(ud,{children:[u.jsx(vn,{}),u.jsx(vn,{}),u.jsx(vn,{})]})]}),u.jsxs(Qi,{children:[u.jsxs(Zi,{children:[u.jsx("span",{children:"Progress"}),u.jsxs("span",{children:[qi(n/100*(e.duration||300))," / ",qi(e.duration||300)]})]}),u.jsx(Yi,{children:u.jsxs(Gi,{children:[u.jsxs(Ki,{children:[[...Array(5)].map((f,d)=>u.jsx(Xi,{style:{opacity:n>(d+1)*20?1:.3}},d)),u.jsx("div",{style:{position:"absolute",top:0,left:`${n}%`,width:4,height:"100%",background:"#d9ceb2",transform:"translateX(-50%)",boxShadow:"0 0 8px rgba(217, 206, 178, 0.8)"}})]}),u.jsx(Ji,{})]})}),u.jsx(cd,{type:"range",min:"0",max:"100",value:n,onChange:f=>gt.getState().setProgress(parseFloat(f.target.value))})]}),u.jsxs(W2,{children:[u.jsx(xr,{onClick:()=>a(!o),children:u.jsx(zh,{style:{opacity:o?1:.4}})}),u.jsx(xr,{onClick:p,children:u.jsx(Th,{})}),u.jsx(H2,{onClick:E,children:t?u.jsx(_h,{}):u.jsx($h,{})}),u.jsx(xr,{onClick:h,children:u.jsx(Ih,{})}),u.jsx(xr,{onClick:()=>{c(l==="off"?"all":l==="all"?"one":"off")},children:u.jsx(Nh,{style:{opacity:l!=="off"?1:.4}})})]}),u.jsxs(Qi,{children:[u.jsxs(Zi,{children:[u.jsxs("span",{children:[u.jsx(Vv,{style:{width:14,height:14}})," Volume"]}),u.jsxs("span",{children:[Math.round(r*100),"%"]})]}),u.jsx(Yi,{children:u.jsxs(Gi,{children:[u.jsxs(Ki,{children:[[...Array(5)].map((f,d)=>u.jsx(Xi,{style:{opacity:r>(d+1)*.2?1:.3}},d)),u.jsx("div",{style:{position:"absolute",top:0,left:`${r*100}%`,width:4,height:"100%",background:"#d9ceb2",transform:"translateX(-50%)",boxShadow:"0 0 8px rgba(217, 206, 178, 0.8)"}})]}),u.jsx(Ji,{})]})}),u.jsx(cd,{type:"range",min:"0",max:"1",step:"0.01",value:r,onChange:f=>s(parseFloat(f.target.value))})]}),u.jsxs(Qi,{children:[u.jsxs(Zi,{children:[u.jsx("span",{children:"Speed"}),u.jsxs("span",{children:[v.toFixed(1),"x"]})]}),u.jsx(Yi,{children:u.jsxs(Gi,{children:[u.jsxs(Ki,{children:[[...Array(5)].map((f,d)=>u.jsx(Xi,{style:{opacity:v>.5+d*.3?1:.3}},d)),u.jsx("div",{style:{position:"absolute",top:0,left:`${(v-.5)/1.5*100}%`,width:4,height:"100%",background:"#d9ceb2",transform:"translateX(-50%)",boxShadow:"0 0 8px rgba(217, 206, 178, 0.8)"}})]}),u.jsx(Ji,{})]})}),u.jsx("input",{type:"range",min:"0.5",max:"2",step:"0.1",value:v,onChange:f=>w(parseFloat(f.target.value)),style:{position:"absolute",top:0,left:0,width:"100%",height:"100%",opacity:0,cursor:"pointer"}})]}),u.jsxs(V2,{children:[u.jsxs(dd,{onClick:()=>x(!0),children:[u.jsx(Mh,{style:{opacity:m?1:.4}}),u.jsx("span",{children:"Lyrics"})]}),u.jsxs(dd,{onClick:()=>x(!1),children:[u.jsx(Uc,{style:{opacity:m?.4:1}}),u.jsx("span",{children:"Info"})]})]}),m&&u.jsxs(fd,{children:[u.jsxs(pd,{children:[u.jsx(Q2,{}),u.jsx(hd,{children:"Lyrics"})]}),u.jsx(Y2,{children:u.jsxs("p",{children:["Hello? Is there anybody in there?",u.jsx("br",{}),"Just nod if you can hear me.",u.jsx("br",{}),u.jsx(G2,{children:"Is there anyone at home?"}),u.jsx("br",{}),"Come on, now. I hear you're feeling down.",u.jsx("br",{}),"Well, I can ease your pain.",u.jsx("br",{}),"Get you on your feet again.",u.jsx("br",{})]})})]}),!m&&u.jsxs(fd,{children:[u.jsxs(pd,{children:[u.jsx(Uc,{}),u.jsx(hd,{children:"Track Info"})]}),u.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:12},children:[u.jsxs("div",{style:{display:"flex",justifyContent:"space-between"},children:[u.jsx("span",{style:{color:"rgba(217, 206, 178, 0.6)"},children:"Album"}),u.jsx("span",{style:{color:"#d9ceb2"},children:e.album})]}),u.jsxs("div",{style:{display:"flex",justifyContent:"space-between"},children:[u.jsx("span",{style:{color:"rgba(217, 206, 178, 0.6)"},children:"Duration"}),u.jsx("span",{style:{color:"#d9ceb2"},children:qi(e.duration||300)})]}),u.jsxs("div",{style:{display:"flex",justifyContent:"space-between"},children:[u.jsx("span",{style:{color:"rgba(217, 206, 178, 0.6)"},children:"Year"}),u.jsx("span",{style:{color:"#d9ceb2"},children:"1979"})]}),u.jsxs("div",{style:{display:"flex",justifyContent:"space-between"},children:[u.jsx("span",{style:{color:"rgba(217, 206, 178, 0.6)"},children:"Studio"}),u.jsx("span",{style:{color:"#d9ceb2"},children:"Britannia Row"})]})]})]})]}):u.jsx(ed,{children:u.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",height:"60vh",gap:20},children:[u.jsxs(td,{children:[u.jsxs(nd,{children:[u.jsx(rd,{children:"No Tape"}),u.jsx(od,{children:"Insert a cassette"})]}),u.jsxs(ld,{children:[u.jsx(zo,{children:u.jsx(To,{children:u.jsx(Io,{})})}),u.jsxs(id,{children:[u.jsx(sd,{}),u.jsxs(ad,{children:[u.jsx(Mo,{}),u.jsx(Mo,{})]})]}),u.jsx(zo,{children:u.jsx(To,{children:u.jsx(Io,{})})})]}),u.jsxs(ud,{children:[u.jsx(vn,{}),u.jsx(vn,{}),u.jsx(vn,{})]})]}),u.jsx("p",{style:{fontSize:16,color:"rgba(217, 206, 178, 0.6)"},children:"No song playing"})]})})},X2=y.nav`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 65px;
  background: rgba(31, 97, 86, 0.95);
  backdrop-filter: blur(20px);
  border-top: 1px solid rgba(217, 206, 178, 0.1);
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding-bottom: env(safe-area-inset-bottom);
  z-index: 100;
`,J2=y.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  background: none;
  border: none;
  color: ${e=>e.active?"#d9ceb2":"rgba(217, 206, 178, 0.5)"};
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 8px 20px;
  border-radius: 12px;

  &:hover {
    color: #d9ceb2;
    background: rgba(217, 206, 178, 0.1);
  }

  svg {
    width: 24px;
    height: 24px;
    transition: transform 0.3s ease;
    ${e=>e.active&&"transform: scale(1.1);"}
  }

  span {
    font-size: 10px;
    font-weight: 500;
  }
`,Z2=()=>{const e=ct(),t=qa(),n=[{path:"/",icon:cv,label:"发现"},{path:"/meet",icon:tl,label:"邂逅"},{path:"/my",icon:Oh,label:"我的"}];return u.jsx(X2,{children:n.map(r=>{const o=r.icon,l=e.pathname===r.path;return u.jsxs(J2,{active:l,onClick:()=>t(r.path),children:[u.jsx(o,{}),u.jsx("span",{children:r.label})]},r.path)})})},q2=y.div`
  position: fixed;
  bottom: ${e=>e.hasSong?"65px":"100%"};
  left: 0;
  right: 0;
  height: 60px;
  background: rgba(13, 61, 54, 0.98);
  backdrop-filter: blur(20px);
  border-top: 1px solid rgba(217, 206, 178, 0.1);
  display: flex;
  align-items: center;
  padding: 0 16px;
  padding-bottom: env(safe-area-inset-bottom);
  gap: 12px;
  z-index: 99;
  transition: bottom 0.3s ease;
`,ew=y.div`
  width: 48px;
  height: 48px;
  border-radius: 8px;
  background: linear-gradient(135deg, #d9ceb2 0%, #a89f80 100%);
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 24px;
    height: 24px;
    color: #1f6156;
  }
`,tw=y.div`
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 2px;

  h4 {
    font-size: 13px;
    font-weight: 500;
    color: #d9ceb2;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  p {
    font-size: 11px;
    color: rgba(217, 206, 178, 0.6);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`,nw=y.div`
  display: flex;
  align-items: center;
  gap: 16px;
`,wr=y.button`
  background: none;
  border: none;
  color: #d9ceb2;
  cursor: pointer;
  padding: 8px;
  border-radius: 50%;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(217, 206, 178, 0.1);
  }

  &:active {
    transform: scale(0.95);
  }

  svg {
    width: 20px;
    height: 20px;
  }
`,rw=y(wr)`
  width: 40px;
  height: 40px;
  background: rgba(217, 206, 178, 0.2);

  svg {
    width: 22px;
    height: 22px;
  }

  &:hover {
    background: rgba(217, 206, 178, 0.3);
  }
`,ow=y.div`
  position: absolute;
  bottom: 60px;
  left: 0;
  right: 0;
  height: 3px;
  background: rgba(217, 206, 178, 0.2);
  cursor: pointer;

  &:hover {
    height: 4px;
  }
`,lw=y.div`
  height: 100%;
  background: linear-gradient(90deg, #d9ceb2, #a89f80);
  width: ${e=>e.progress}%;
  transition: width 0.1s linear;
`,iw=()=>{const e=qa(),{currentSong:t,isPlaying:n,progress:r,shuffle:o,repeat:l,setIsPlaying:i,playNext:s,playPrevious:a}=gt(),c=()=>{i(!n)};return t?u.jsxs(u.Fragment,{children:[u.jsx(ow,{onClick:h=>{const p=h.currentTarget.getBoundingClientRect(),x=(h.clientX-p.left)/p.width*100;gt.getState().setProgress(x)},children:u.jsx(lw,{progress:r})}),u.jsxs(q2,{hasSong:!!t,children:[u.jsx(ew,{onClick:()=>e("/now-playing"),children:u.jsxs("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[u.jsx("circle",{cx:"12",cy:"12",r:"10"}),u.jsx("polyline",{points:"12 6 12 12 16 14"})]})}),u.jsxs(tw,{onClick:()=>e("/now-playing"),children:[u.jsx("h4",{children:t.title}),u.jsx("p",{children:t.artist})]}),u.jsxs(nw,{children:[u.jsx(wr,{onClick:()=>gt.getState().setShuffle(!o),children:u.jsx(zh,{style:{opacity:o?1:.4}})}),u.jsx(wr,{onClick:a,children:u.jsx(Th,{})}),u.jsx(rw,{onClick:c,children:n?u.jsx(_h,{}):u.jsx($h,{})}),u.jsx(wr,{onClick:s,children:u.jsx(Ih,{})}),u.jsx(wr,{onClick:()=>{const h=l==="off"?"all":l==="all"?"one":"off";gt.getState().setRepeat(h)},children:u.jsx(Nh,{style:{opacity:l!=="off"?1:.4}})})]})]})]}):null},sw=Eh`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,aw=Eh`
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
`,uw=y.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, #0d3d36 0%, #1f6156 50%, #0d3d36 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`,cw=y.div`
  position: relative;
  width: 120px;
  height: 120px;
  margin-bottom: 30px;
`,dw=y.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 3px solid rgba(217, 206, 178, 0.2);
  transform: translate(-50%, -50%);
`,fw=y.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 3px solid transparent;
  border-top-color: #d9ceb2;
  border-right-color: #d9ceb2;
  transform: translate(-50%, -50%);
  animation: ${sw} 2s linear infinite;
`,pw=y.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: rgba(217, 206, 178, 0.15);
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  justify-content: center;
`,hw=y.div`
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  svg {
    width: 100%;
    height: 100%;
    color: #d9ceb2;
  }
`,mw=y.p`
  font-size: 18px;
  font-weight: 500;
  color: #d9ceb2;
  margin: 0;
  animation: ${aw} 2s ease-in-out infinite;
`,gw=y.p`
  font-size: 12px;
  color: rgba(217, 206, 178, 0.5);
  margin-top: 12px;
`,yw=()=>u.jsxs(uw,{children:[u.jsxs(cw,{children:[u.jsx(dw,{}),u.jsx(fw,{}),u.jsx(pw,{children:u.jsx(hw,{children:u.jsxs("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[u.jsx("circle",{cx:"12",cy:"12",r:"10"}),u.jsx("polyline",{points:"12 6 12 12 16 14"})]})})})]}),u.jsx(mw,{children:"PF Player"}),u.jsx(gw,{children:"v3.3.5"})]});function vw(){const[e,t]=k.useState(!0);return k.useEffect(()=>{const n=setTimeout(()=>{t(!1)},2e3);return()=>clearTimeout(n)},[]),e?u.jsx(yw,{}):u.jsx(T1,{children:u.jsxs("div",{className:"app-container",children:[u.jsxs(u1,{children:[u.jsx(hr,{path:"/",element:u.jsx(Cx,{})}),u.jsx(hr,{path:"/meet",element:u.jsx(s2,{})}),u.jsx(hr,{path:"/my",element:u.jsx(b2,{})}),u.jsx(hr,{path:"/now-playing",element:u.jsx(K2,{})})]}),u.jsx(Z2,{}),u.jsx(iw,{})]})})}_p(document.getElementById("root")).render(u.jsx(k.StrictMode,{children:u.jsx(vw,{})}));
