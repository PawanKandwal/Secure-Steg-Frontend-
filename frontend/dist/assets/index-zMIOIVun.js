(function(){const v=document.createElement("link").relList;if(v&&v.supports&&v.supports("modulepreload"))return;for(const j of document.querySelectorAll('link[rel="modulepreload"]'))N(j);new MutationObserver(j=>{for(const H of j)if(H.type==="childList")for(const K of H.addedNodes)K.tagName==="LINK"&&K.rel==="modulepreload"&&N(K)}).observe(document,{childList:!0,subtree:!0});function d(j){const H={};return j.integrity&&(H.integrity=j.integrity),j.referrerPolicy&&(H.referrerPolicy=j.referrerPolicy),j.crossOrigin==="use-credentials"?H.credentials="include":j.crossOrigin==="anonymous"?H.credentials="omit":H.credentials="same-origin",H}function N(j){if(j.ep)return;j.ep=!0;const H=d(j);fetch(j.href,H)}})();var To={exports:{}},Cr={},Mo={exports:{}},ee={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Mu;function af(){if(Mu)return ee;Mu=1;var a=Symbol.for("react.element"),v=Symbol.for("react.portal"),d=Symbol.for("react.fragment"),N=Symbol.for("react.strict_mode"),j=Symbol.for("react.profiler"),H=Symbol.for("react.provider"),K=Symbol.for("react.context"),Y=Symbol.for("react.forward_ref"),D=Symbol.for("react.suspense"),L=Symbol.for("react.memo"),P=Symbol.for("react.lazy"),I=Symbol.iterator;function X(p){return p===null||typeof p!="object"?null:(p=I&&p[I]||p["@@iterator"],typeof p=="function"?p:null)}var le={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},de=Object.assign,q={};function G(p,g,B){this.props=p,this.context=g,this.refs=q,this.updater=B||le}G.prototype.isReactComponent={},G.prototype.setState=function(p,g){if(typeof p!="object"&&typeof p!="function"&&p!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,p,g,"setState")},G.prototype.forceUpdate=function(p){this.updater.enqueueForceUpdate(this,p,"forceUpdate")};function Z(){}Z.prototype=G.prototype;function oe(p,g,B){this.props=p,this.context=g,this.refs=q,this.updater=B||le}var ye=oe.prototype=new Z;ye.constructor=oe,de(ye,G.prototype),ye.isPureReactComponent=!0;var te=Array.isArray,ve=Object.prototype.hasOwnProperty,we={current:null},ae={key:!0,ref:!0,__self:!0,__source:!0};function ze(p,g,B){var _,R={},z=null,$=null;if(g!=null)for(_ in g.ref!==void 0&&($=g.ref),g.key!==void 0&&(z=""+g.key),g)ve.call(g,_)&&!ae.hasOwnProperty(_)&&(R[_]=g[_]);var J=arguments.length-2;if(J===1)R.children=B;else if(1<J){for(var ie=Array(J),_e=0;_e<J;_e++)ie[_e]=arguments[_e+2];R.children=ie}if(p&&p.defaultProps)for(_ in J=p.defaultProps,J)R[_]===void 0&&(R[_]=J[_]);return{$$typeof:a,type:p,key:z,ref:$,props:R,_owner:we.current}}function Ee(p,g){return{$$typeof:a,type:p.type,key:g,ref:p.ref,props:p.props,_owner:p._owner}}function Fe(p){return typeof p=="object"&&p!==null&&p.$$typeof===a}function qe(p){var g={"=":"=0",":":"=2"};return"$"+p.replace(/[=:]/g,function(B){return g[B]})}var Ve=/\/+/g;function Le(p,g){return typeof p=="object"&&p!==null&&p.key!=null?qe(""+p.key):g.toString(36)}function Re(p,g,B,_,R){var z=typeof p;(z==="undefined"||z==="boolean")&&(p=null);var $=!1;if(p===null)$=!0;else switch(z){case"string":case"number":$=!0;break;case"object":switch(p.$$typeof){case a:case v:$=!0}}if($)return $=p,R=R($),p=_===""?"."+Le($,0):_,te(R)?(B="",p!=null&&(B=p.replace(Ve,"$&/")+"/"),Re(R,g,B,"",function(_e){return _e})):R!=null&&(Fe(R)&&(R=Ee(R,B+(!R.key||$&&$.key===R.key?"":(""+R.key).replace(Ve,"$&/")+"/")+p)),g.push(R)),1;if($=0,_=_===""?".":_+":",te(p))for(var J=0;J<p.length;J++){z=p[J];var ie=_+Le(z,J);$+=Re(z,g,B,ie,R)}else if(ie=X(p),typeof ie=="function")for(p=ie.call(p),J=0;!(z=p.next()).done;)z=z.value,ie=_+Le(z,J++),$+=Re(z,g,B,ie,R);else if(z==="object")throw g=String(p),Error("Objects are not valid as a React child (found: "+(g==="[object Object]"?"object with keys {"+Object.keys(p).join(", ")+"}":g)+"). If you meant to render a collection of children, use an array instead.");return $}function Qe(p,g,B){if(p==null)return p;var _=[],R=0;return Re(p,_,"","",function(z){return g.call(B,z,R++)}),_}function Ce(p){if(p._status===-1){var g=p._result;g=g(),g.then(function(B){(p._status===0||p._status===-1)&&(p._status=1,p._result=B)},function(B){(p._status===0||p._status===-1)&&(p._status=2,p._result=B)}),p._status===-1&&(p._status=0,p._result=g)}if(p._status===1)return p._result.default;throw p._result}var ue={current:null},x={transition:null},M={ReactCurrentDispatcher:ue,ReactCurrentBatchConfig:x,ReactCurrentOwner:we};function C(){throw Error("act(...) is not supported in production builds of React.")}return ee.Children={map:Qe,forEach:function(p,g,B){Qe(p,function(){g.apply(this,arguments)},B)},count:function(p){var g=0;return Qe(p,function(){g++}),g},toArray:function(p){return Qe(p,function(g){return g})||[]},only:function(p){if(!Fe(p))throw Error("React.Children.only expected to receive a single React element child.");return p}},ee.Component=G,ee.Fragment=d,ee.Profiler=j,ee.PureComponent=oe,ee.StrictMode=N,ee.Suspense=D,ee.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=M,ee.act=C,ee.cloneElement=function(p,g,B){if(p==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+p+".");var _=de({},p.props),R=p.key,z=p.ref,$=p._owner;if(g!=null){if(g.ref!==void 0&&(z=g.ref,$=we.current),g.key!==void 0&&(R=""+g.key),p.type&&p.type.defaultProps)var J=p.type.defaultProps;for(ie in g)ve.call(g,ie)&&!ae.hasOwnProperty(ie)&&(_[ie]=g[ie]===void 0&&J!==void 0?J[ie]:g[ie])}var ie=arguments.length-2;if(ie===1)_.children=B;else if(1<ie){J=Array(ie);for(var _e=0;_e<ie;_e++)J[_e]=arguments[_e+2];_.children=J}return{$$typeof:a,type:p.type,key:R,ref:z,props:_,_owner:$}},ee.createContext=function(p){return p={$$typeof:K,_currentValue:p,_currentValue2:p,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},p.Provider={$$typeof:H,_context:p},p.Consumer=p},ee.createElement=ze,ee.createFactory=function(p){var g=ze.bind(null,p);return g.type=p,g},ee.createRef=function(){return{current:null}},ee.forwardRef=function(p){return{$$typeof:Y,render:p}},ee.isValidElement=Fe,ee.lazy=function(p){return{$$typeof:P,_payload:{_status:-1,_result:p},_init:Ce}},ee.memo=function(p,g){return{$$typeof:L,type:p,compare:g===void 0?null:g}},ee.startTransition=function(p){var g=x.transition;x.transition={};try{p()}finally{x.transition=g}},ee.unstable_act=C,ee.useCallback=function(p,g){return ue.current.useCallback(p,g)},ee.useContext=function(p){return ue.current.useContext(p)},ee.useDebugValue=function(){},ee.useDeferredValue=function(p){return ue.current.useDeferredValue(p)},ee.useEffect=function(p,g){return ue.current.useEffect(p,g)},ee.useId=function(){return ue.current.useId()},ee.useImperativeHandle=function(p,g,B){return ue.current.useImperativeHandle(p,g,B)},ee.useInsertionEffect=function(p,g){return ue.current.useInsertionEffect(p,g)},ee.useLayoutEffect=function(p,g){return ue.current.useLayoutEffect(p,g)},ee.useMemo=function(p,g){return ue.current.useMemo(p,g)},ee.useReducer=function(p,g,B){return ue.current.useReducer(p,g,B)},ee.useRef=function(p){return ue.current.useRef(p)},ee.useState=function(p){return ue.current.useState(p)},ee.useSyncExternalStore=function(p,g,B){return ue.current.useSyncExternalStore(p,g,B)},ee.useTransition=function(){return ue.current.useTransition()},ee.version="18.3.1",ee}var Du;function Uo(){return Du||(Du=1,Mo.exports=af()),Mo.exports}/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Iu;function uf(){if(Iu)return Cr;Iu=1;var a=Uo(),v=Symbol.for("react.element"),d=Symbol.for("react.fragment"),N=Object.prototype.hasOwnProperty,j=a.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,H={key:!0,ref:!0,__self:!0,__source:!0};function K(Y,D,L){var P,I={},X=null,le=null;L!==void 0&&(X=""+L),D.key!==void 0&&(X=""+D.key),D.ref!==void 0&&(le=D.ref);for(P in D)N.call(D,P)&&!H.hasOwnProperty(P)&&(I[P]=D[P]);if(Y&&Y.defaultProps)for(P in D=Y.defaultProps,D)I[P]===void 0&&(I[P]=D[P]);return{$$typeof:v,type:Y,key:X,ref:le,props:I,_owner:j.current}}return Cr.Fragment=d,Cr.jsx=K,Cr.jsxs=K,Cr}var Ou;function cf(){return Ou||(Ou=1,To.exports=uf()),To.exports}var u=cf(),Dl={},Do={exports:{}},Ze={},Io={exports:{}},Oo={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Fu;function df(){return Fu||(Fu=1,(function(a){function v(x,M){var C=x.length;x.push(M);e:for(;0<C;){var p=C-1>>>1,g=x[p];if(0<j(g,M))x[p]=M,x[C]=g,C=p;else break e}}function d(x){return x.length===0?null:x[0]}function N(x){if(x.length===0)return null;var M=x[0],C=x.pop();if(C!==M){x[0]=C;e:for(var p=0,g=x.length,B=g>>>1;p<B;){var _=2*(p+1)-1,R=x[_],z=_+1,$=x[z];if(0>j(R,C))z<g&&0>j($,R)?(x[p]=$,x[z]=C,p=z):(x[p]=R,x[_]=C,p=_);else if(z<g&&0>j($,C))x[p]=$,x[z]=C,p=z;else break e}}return M}function j(x,M){var C=x.sortIndex-M.sortIndex;return C!==0?C:x.id-M.id}if(typeof performance=="object"&&typeof performance.now=="function"){var H=performance;a.unstable_now=function(){return H.now()}}else{var K=Date,Y=K.now();a.unstable_now=function(){return K.now()-Y}}var D=[],L=[],P=1,I=null,X=3,le=!1,de=!1,q=!1,G=typeof setTimeout=="function"?setTimeout:null,Z=typeof clearTimeout=="function"?clearTimeout:null,oe=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function ye(x){for(var M=d(L);M!==null;){if(M.callback===null)N(L);else if(M.startTime<=x)N(L),M.sortIndex=M.expirationTime,v(D,M);else break;M=d(L)}}function te(x){if(q=!1,ye(x),!de)if(d(D)!==null)de=!0,Ce(ve);else{var M=d(L);M!==null&&ue(te,M.startTime-x)}}function ve(x,M){de=!1,q&&(q=!1,Z(ze),ze=-1),le=!0;var C=X;try{for(ye(M),I=d(D);I!==null&&(!(I.expirationTime>M)||x&&!qe());){var p=I.callback;if(typeof p=="function"){I.callback=null,X=I.priorityLevel;var g=p(I.expirationTime<=M);M=a.unstable_now(),typeof g=="function"?I.callback=g:I===d(D)&&N(D),ye(M)}else N(D);I=d(D)}if(I!==null)var B=!0;else{var _=d(L);_!==null&&ue(te,_.startTime-M),B=!1}return B}finally{I=null,X=C,le=!1}}var we=!1,ae=null,ze=-1,Ee=5,Fe=-1;function qe(){return!(a.unstable_now()-Fe<Ee)}function Ve(){if(ae!==null){var x=a.unstable_now();Fe=x;var M=!0;try{M=ae(!0,x)}finally{M?Le():(we=!1,ae=null)}}else we=!1}var Le;if(typeof oe=="function")Le=function(){oe(Ve)};else if(typeof MessageChannel<"u"){var Re=new MessageChannel,Qe=Re.port2;Re.port1.onmessage=Ve,Le=function(){Qe.postMessage(null)}}else Le=function(){G(Ve,0)};function Ce(x){ae=x,we||(we=!0,Le())}function ue(x,M){ze=G(function(){x(a.unstable_now())},M)}a.unstable_IdlePriority=5,a.unstable_ImmediatePriority=1,a.unstable_LowPriority=4,a.unstable_NormalPriority=3,a.unstable_Profiling=null,a.unstable_UserBlockingPriority=2,a.unstable_cancelCallback=function(x){x.callback=null},a.unstable_continueExecution=function(){de||le||(de=!0,Ce(ve))},a.unstable_forceFrameRate=function(x){0>x||125<x?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):Ee=0<x?Math.floor(1e3/x):5},a.unstable_getCurrentPriorityLevel=function(){return X},a.unstable_getFirstCallbackNode=function(){return d(D)},a.unstable_next=function(x){switch(X){case 1:case 2:case 3:var M=3;break;default:M=X}var C=X;X=M;try{return x()}finally{X=C}},a.unstable_pauseExecution=function(){},a.unstable_requestPaint=function(){},a.unstable_runWithPriority=function(x,M){switch(x){case 1:case 2:case 3:case 4:case 5:break;default:x=3}var C=X;X=x;try{return M()}finally{X=C}},a.unstable_scheduleCallback=function(x,M,C){var p=a.unstable_now();switch(typeof C=="object"&&C!==null?(C=C.delay,C=typeof C=="number"&&0<C?p+C:p):C=p,x){case 1:var g=-1;break;case 2:g=250;break;case 5:g=1073741823;break;case 4:g=1e4;break;default:g=5e3}return g=C+g,x={id:P++,callback:M,priorityLevel:x,startTime:C,expirationTime:g,sortIndex:-1},C>p?(x.sortIndex=C,v(L,x),d(D)===null&&x===d(L)&&(q?(Z(ze),ze=-1):q=!0,ue(te,C-p))):(x.sortIndex=g,v(D,x),de||le||(de=!0,Ce(ve))),x},a.unstable_shouldYield=qe,a.unstable_wrapCallback=function(x){var M=X;return function(){var C=X;X=M;try{return x.apply(this,arguments)}finally{X=C}}}})(Oo)),Oo}var Au;function ff(){return Au||(Au=1,Io.exports=df()),Io.exports}/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Uu;function pf(){if(Uu)return Ze;Uu=1;var a=Uo(),v=ff();function d(e){for(var t="https://reactjs.org/docs/error-decoder.html?invariant="+e,n=1;n<arguments.length;n++)t+="&args[]="+encodeURIComponent(arguments[n]);return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var N=new Set,j={};function H(e,t){K(e,t),K(e+"Capture",t)}function K(e,t){for(j[e]=t,e=0;e<t.length;e++)N.add(t[e])}var Y=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),D=Object.prototype.hasOwnProperty,L=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,P={},I={};function X(e){return D.call(I,e)?!0:D.call(P,e)?!1:L.test(e)?I[e]=!0:(P[e]=!0,!1)}function le(e,t,n,r){if(n!==null&&n.type===0)return!1;switch(typeof t){case"function":case"symbol":return!0;case"boolean":return r?!1:n!==null?!n.acceptsBooleans:(e=e.toLowerCase().slice(0,5),e!=="data-"&&e!=="aria-");default:return!1}}function de(e,t,n,r){if(t===null||typeof t>"u"||le(e,t,n,r))return!0;if(r)return!1;if(n!==null)switch(n.type){case 3:return!t;case 4:return t===!1;case 5:return isNaN(t);case 6:return isNaN(t)||1>t}return!1}function q(e,t,n,r,l,i,o){this.acceptsBooleans=t===2||t===3||t===4,this.attributeName=r,this.attributeNamespace=l,this.mustUseProperty=n,this.propertyName=e,this.type=t,this.sanitizeURL=i,this.removeEmptyString=o}var G={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e){G[e]=new q(e,0,!1,e,null,!1,!1)}),[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(e){var t=e[0];G[t]=new q(t,1,!1,e[1],null,!1,!1)}),["contentEditable","draggable","spellCheck","value"].forEach(function(e){G[e]=new q(e,2,!1,e.toLowerCase(),null,!1,!1)}),["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(e){G[e]=new q(e,2,!1,e,null,!1,!1)}),"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e){G[e]=new q(e,3,!1,e.toLowerCase(),null,!1,!1)}),["checked","multiple","muted","selected"].forEach(function(e){G[e]=new q(e,3,!0,e,null,!1,!1)}),["capture","download"].forEach(function(e){G[e]=new q(e,4,!1,e,null,!1,!1)}),["cols","rows","size","span"].forEach(function(e){G[e]=new q(e,6,!1,e,null,!1,!1)}),["rowSpan","start"].forEach(function(e){G[e]=new q(e,5,!1,e.toLowerCase(),null,!1,!1)});var Z=/[\-:]([a-z])/g;function oe(e){return e[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e){var t=e.replace(Z,oe);G[t]=new q(t,1,!1,e,null,!1,!1)}),"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e){var t=e.replace(Z,oe);G[t]=new q(t,1,!1,e,"http://www.w3.org/1999/xlink",!1,!1)}),["xml:base","xml:lang","xml:space"].forEach(function(e){var t=e.replace(Z,oe);G[t]=new q(t,1,!1,e,"http://www.w3.org/XML/1998/namespace",!1,!1)}),["tabIndex","crossOrigin"].forEach(function(e){G[e]=new q(e,1,!1,e.toLowerCase(),null,!1,!1)}),G.xlinkHref=new q("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1),["src","href","action","formAction"].forEach(function(e){G[e]=new q(e,1,!1,e.toLowerCase(),null,!0,!0)});function ye(e,t,n,r){var l=G.hasOwnProperty(t)?G[t]:null;(l!==null?l.type!==0:r||!(2<t.length)||t[0]!=="o"&&t[0]!=="O"||t[1]!=="n"&&t[1]!=="N")&&(de(t,n,l,r)&&(n=null),r||l===null?X(t)&&(n===null?e.removeAttribute(t):e.setAttribute(t,""+n)):l.mustUseProperty?e[l.propertyName]=n===null?l.type===3?!1:"":n:(t=l.attributeName,r=l.attributeNamespace,n===null?e.removeAttribute(t):(l=l.type,n=l===3||l===4&&n===!0?"":""+n,r?e.setAttributeNS(r,t,n):e.setAttribute(t,n))))}var te=a.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,ve=Symbol.for("react.element"),we=Symbol.for("react.portal"),ae=Symbol.for("react.fragment"),ze=Symbol.for("react.strict_mode"),Ee=Symbol.for("react.profiler"),Fe=Symbol.for("react.provider"),qe=Symbol.for("react.context"),Ve=Symbol.for("react.forward_ref"),Le=Symbol.for("react.suspense"),Re=Symbol.for("react.suspense_list"),Qe=Symbol.for("react.memo"),Ce=Symbol.for("react.lazy"),ue=Symbol.for("react.offscreen"),x=Symbol.iterator;function M(e){return e===null||typeof e!="object"?null:(e=x&&e[x]||e["@@iterator"],typeof e=="function"?e:null)}var C=Object.assign,p;function g(e){if(p===void 0)try{throw Error()}catch(n){var t=n.stack.trim().match(/\n( *(at )?)/);p=t&&t[1]||""}return`
`+p+e}var B=!1;function _(e,t){if(!e||B)return"";B=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(t)if(t=function(){throw Error()},Object.defineProperty(t.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(t,[])}catch(y){var r=y}Reflect.construct(e,[],t)}else{try{t.call()}catch(y){r=y}e.call(t.prototype)}else{try{throw Error()}catch(y){r=y}e()}}catch(y){if(y&&r&&typeof y.stack=="string"){for(var l=y.stack.split(`
`),i=r.stack.split(`
`),o=l.length-1,s=i.length-1;1<=o&&0<=s&&l[o]!==i[s];)s--;for(;1<=o&&0<=s;o--,s--)if(l[o]!==i[s]){if(o!==1||s!==1)do if(o--,s--,0>s||l[o]!==i[s]){var c=`
`+l[o].replace(" at new "," at ");return e.displayName&&c.includes("<anonymous>")&&(c=c.replace("<anonymous>",e.displayName)),c}while(1<=o&&0<=s);break}}}finally{B=!1,Error.prepareStackTrace=n}return(e=e?e.displayName||e.name:"")?g(e):""}function R(e){switch(e.tag){case 5:return g(e.type);case 16:return g("Lazy");case 13:return g("Suspense");case 19:return g("SuspenseList");case 0:case 2:case 15:return e=_(e.type,!1),e;case 11:return e=_(e.type.render,!1),e;case 1:return e=_(e.type,!0),e;default:return""}}function z(e){if(e==null)return null;if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case ae:return"Fragment";case we:return"Portal";case Ee:return"Profiler";case ze:return"StrictMode";case Le:return"Suspense";case Re:return"SuspenseList"}if(typeof e=="object")switch(e.$$typeof){case qe:return(e.displayName||"Context")+".Consumer";case Fe:return(e._context.displayName||"Context")+".Provider";case Ve:var t=e.render;return e=e.displayName,e||(e=t.displayName||t.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case Qe:return t=e.displayName||null,t!==null?t:z(e.type)||"Memo";case Ce:t=e._payload,e=e._init;try{return z(e(t))}catch{}}return null}function $(e){var t=e.type;switch(e.tag){case 24:return"Cache";case 9:return(t.displayName||"Context")+".Consumer";case 10:return(t._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return e=t.render,e=e.displayName||e.name||"",t.displayName||(e!==""?"ForwardRef("+e+")":"ForwardRef");case 7:return"Fragment";case 5:return t;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return z(t);case 8:return t===ze?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof t=="function")return t.displayName||t.name||null;if(typeof t=="string")return t}return null}function J(e){switch(typeof e){case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function ie(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(t==="checkbox"||t==="radio")}function _e(e){var t=ie(e)?"checked":"value",n=Object.getOwnPropertyDescriptor(e.constructor.prototype,t),r=""+e[t];if(!e.hasOwnProperty(t)&&typeof n<"u"&&typeof n.get=="function"&&typeof n.set=="function"){var l=n.get,i=n.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return l.call(this)},set:function(o){r=""+o,i.call(this,o)}}),Object.defineProperty(e,t,{enumerable:n.enumerable}),{getValue:function(){return r},setValue:function(o){r=""+o},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function et(e){e._valueTracker||(e._valueTracker=_e(e))}function Nr(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var n=t.getValue(),r="";return e&&(r=ie(e)?e.checked?"true":"false":e.value),e=r,e!==n?(t.setValue(e),!0):!1}function Zt(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}function Al(e,t){var n=t.checked;return C({},t,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:n??e._wrapperState.initialChecked})}function Bo(e,t){var n=t.defaultValue==null?"":t.defaultValue,r=t.checked!=null?t.checked:t.defaultChecked;n=J(t.value!=null?t.value:n),e._wrapperState={initialChecked:r,initialValue:n,controlled:t.type==="checkbox"||t.type==="radio"?t.checked!=null:t.value!=null}}function Wo(e,t){t=t.checked,t!=null&&ye(e,"checked",t,!1)}function Ul(e,t){Wo(e,t);var n=J(t.value),r=t.type;if(n!=null)r==="number"?(n===0&&e.value===""||e.value!=n)&&(e.value=""+n):e.value!==""+n&&(e.value=""+n);else if(r==="submit"||r==="reset"){e.removeAttribute("value");return}t.hasOwnProperty("value")?Bl(e,t.type,n):t.hasOwnProperty("defaultValue")&&Bl(e,t.type,J(t.defaultValue)),t.checked==null&&t.defaultChecked!=null&&(e.defaultChecked=!!t.defaultChecked)}function $o(e,t,n){if(t.hasOwnProperty("value")||t.hasOwnProperty("defaultValue")){var r=t.type;if(!(r!=="submit"&&r!=="reset"||t.value!==void 0&&t.value!==null))return;t=""+e._wrapperState.initialValue,n||t===e.value||(e.value=t),e.defaultValue=t}n=e.name,n!==""&&(e.name=""),e.defaultChecked=!!e._wrapperState.initialChecked,n!==""&&(e.name=n)}function Bl(e,t,n){(t!=="number"||Zt(e.ownerDocument)!==e)&&(n==null?e.defaultValue=""+e._wrapperState.initialValue:e.defaultValue!==""+n&&(e.defaultValue=""+n))}var Un=Array.isArray;function pn(e,t,n,r){if(e=e.options,t){t={};for(var l=0;l<n.length;l++)t["$"+n[l]]=!0;for(n=0;n<e.length;n++)l=t.hasOwnProperty("$"+e[n].value),e[n].selected!==l&&(e[n].selected=l),l&&r&&(e[n].defaultSelected=!0)}else{for(n=""+J(n),t=null,l=0;l<e.length;l++){if(e[l].value===n){e[l].selected=!0,r&&(e[l].defaultSelected=!0);return}t!==null||e[l].disabled||(t=e[l])}t!==null&&(t.selected=!0)}}function Wl(e,t){if(t.dangerouslySetInnerHTML!=null)throw Error(d(91));return C({},t,{value:void 0,defaultValue:void 0,children:""+e._wrapperState.initialValue})}function Ho(e,t){var n=t.value;if(n==null){if(n=t.children,t=t.defaultValue,n!=null){if(t!=null)throw Error(d(92));if(Un(n)){if(1<n.length)throw Error(d(93));n=n[0]}t=n}t==null&&(t=""),n=t}e._wrapperState={initialValue:J(n)}}function Vo(e,t){var n=J(t.value),r=J(t.defaultValue);n!=null&&(n=""+n,n!==e.value&&(e.value=n),t.defaultValue==null&&e.defaultValue!==n&&(e.defaultValue=n)),r!=null&&(e.defaultValue=""+r)}function Qo(e){var t=e.textContent;t===e._wrapperState.initialValue&&t!==""&&t!==null&&(e.value=t)}function Yo(e){switch(e){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function $l(e,t){return e==null||e==="http://www.w3.org/1999/xhtml"?Yo(t):e==="http://www.w3.org/2000/svg"&&t==="foreignObject"?"http://www.w3.org/1999/xhtml":e}var _r,Ko=(function(e){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(t,n,r,l){MSApp.execUnsafeLocalFunction(function(){return e(t,n,r,l)})}:e})(function(e,t){if(e.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in e)e.innerHTML=t;else{for(_r=_r||document.createElement("div"),_r.innerHTML="<svg>"+t.valueOf().toString()+"</svg>",t=_r.firstChild;e.firstChild;)e.removeChild(e.firstChild);for(;t.firstChild;)e.appendChild(t.firstChild)}});function Bn(e,t){if(t){var n=e.firstChild;if(n&&n===e.lastChild&&n.nodeType===3){n.nodeValue=t;return}}e.textContent=t}var Wn={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},dc=["Webkit","ms","Moz","O"];Object.keys(Wn).forEach(function(e){dc.forEach(function(t){t=t+e.charAt(0).toUpperCase()+e.substring(1),Wn[t]=Wn[e]})});function Xo(e,t,n){return t==null||typeof t=="boolean"||t===""?"":n||typeof t!="number"||t===0||Wn.hasOwnProperty(e)&&Wn[e]?(""+t).trim():t+"px"}function Go(e,t){e=e.style;for(var n in t)if(t.hasOwnProperty(n)){var r=n.indexOf("--")===0,l=Xo(n,t[n],r);n==="float"&&(n="cssFloat"),r?e.setProperty(n,l):e[n]=l}}var fc=C({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function Hl(e,t){if(t){if(fc[e]&&(t.children!=null||t.dangerouslySetInnerHTML!=null))throw Error(d(137,e));if(t.dangerouslySetInnerHTML!=null){if(t.children!=null)throw Error(d(60));if(typeof t.dangerouslySetInnerHTML!="object"||!("__html"in t.dangerouslySetInnerHTML))throw Error(d(61))}if(t.style!=null&&typeof t.style!="object")throw Error(d(62))}}function Vl(e,t){if(e.indexOf("-")===-1)return typeof t.is=="string";switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var Ql=null;function Yl(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var Kl=null,hn=null,mn=null;function bo(e){if(e=ur(e)){if(typeof Kl!="function")throw Error(d(280));var t=e.stateNode;t&&(t=Gr(t),Kl(e.stateNode,e.type,t))}}function Zo(e){hn?mn?mn.push(e):mn=[e]:hn=e}function Jo(){if(hn){var e=hn,t=mn;if(mn=hn=null,bo(e),t)for(e=0;e<t.length;e++)bo(t[e])}}function qo(e,t){return e(t)}function es(){}var Xl=!1;function ts(e,t,n){if(Xl)return e(t,n);Xl=!0;try{return qo(e,t,n)}finally{Xl=!1,(hn!==null||mn!==null)&&(es(),Jo())}}function $n(e,t){var n=e.stateNode;if(n===null)return null;var r=Gr(n);if(r===null)return null;n=r[t];e:switch(t){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(r=!r.disabled)||(e=e.type,r=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!r;break e;default:e=!1}if(e)return null;if(n&&typeof n!="function")throw Error(d(231,t,typeof n));return n}var Gl=!1;if(Y)try{var Hn={};Object.defineProperty(Hn,"passive",{get:function(){Gl=!0}}),window.addEventListener("test",Hn,Hn),window.removeEventListener("test",Hn,Hn)}catch{Gl=!1}function pc(e,t,n,r,l,i,o,s,c){var y=Array.prototype.slice.call(arguments,3);try{t.apply(n,y)}catch(k){this.onError(k)}}var Vn=!1,jr=null,Pr=!1,bl=null,hc={onError:function(e){Vn=!0,jr=e}};function mc(e,t,n,r,l,i,o,s,c){Vn=!1,jr=null,pc.apply(hc,arguments)}function gc(e,t,n,r,l,i,o,s,c){if(mc.apply(this,arguments),Vn){if(Vn){var y=jr;Vn=!1,jr=null}else throw Error(d(198));Pr||(Pr=!0,bl=y)}}function Jt(e){var t=e,n=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do t=e,(t.flags&4098)!==0&&(n=t.return),e=t.return;while(e)}return t.tag===3?n:null}function ns(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function rs(e){if(Jt(e)!==e)throw Error(d(188))}function yc(e){var t=e.alternate;if(!t){if(t=Jt(e),t===null)throw Error(d(188));return t!==e?null:e}for(var n=e,r=t;;){var l=n.return;if(l===null)break;var i=l.alternate;if(i===null){if(r=l.return,r!==null){n=r;continue}break}if(l.child===i.child){for(i=l.child;i;){if(i===n)return rs(l),e;if(i===r)return rs(l),t;i=i.sibling}throw Error(d(188))}if(n.return!==r.return)n=l,r=i;else{for(var o=!1,s=l.child;s;){if(s===n){o=!0,n=l,r=i;break}if(s===r){o=!0,r=l,n=i;break}s=s.sibling}if(!o){for(s=i.child;s;){if(s===n){o=!0,n=i,r=l;break}if(s===r){o=!0,r=i,n=l;break}s=s.sibling}if(!o)throw Error(d(189))}}if(n.alternate!==r)throw Error(d(190))}if(n.tag!==3)throw Error(d(188));return n.stateNode.current===n?e:t}function ls(e){return e=yc(e),e!==null?is(e):null}function is(e){if(e.tag===5||e.tag===6)return e;for(e=e.child;e!==null;){var t=is(e);if(t!==null)return t;e=e.sibling}return null}var os=v.unstable_scheduleCallback,ss=v.unstable_cancelCallback,vc=v.unstable_shouldYield,xc=v.unstable_requestPaint,ke=v.unstable_now,wc=v.unstable_getCurrentPriorityLevel,Zl=v.unstable_ImmediatePriority,as=v.unstable_UserBlockingPriority,zr=v.unstable_NormalPriority,kc=v.unstable_LowPriority,us=v.unstable_IdlePriority,Lr=null,vt=null;function Sc(e){if(vt&&typeof vt.onCommitFiberRoot=="function")try{vt.onCommitFiberRoot(Lr,e,void 0,(e.current.flags&128)===128)}catch{}}var dt=Math.clz32?Math.clz32:Nc,Ec=Math.log,Cc=Math.LN2;function Nc(e){return e>>>=0,e===0?32:31-(Ec(e)/Cc|0)|0}var Rr=64,Tr=4194304;function Qn(e){switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return e&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return e}}function Mr(e,t){var n=e.pendingLanes;if(n===0)return 0;var r=0,l=e.suspendedLanes,i=e.pingedLanes,o=n&268435455;if(o!==0){var s=o&~l;s!==0?r=Qn(s):(i&=o,i!==0&&(r=Qn(i)))}else o=n&~l,o!==0?r=Qn(o):i!==0&&(r=Qn(i));if(r===0)return 0;if(t!==0&&t!==r&&(t&l)===0&&(l=r&-r,i=t&-t,l>=i||l===16&&(i&4194240)!==0))return t;if((r&4)!==0&&(r|=n&16),t=e.entangledLanes,t!==0)for(e=e.entanglements,t&=r;0<t;)n=31-dt(t),l=1<<n,r|=e[n],t&=~l;return r}function _c(e,t){switch(e){case 1:case 2:case 4:return t+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function jc(e,t){for(var n=e.suspendedLanes,r=e.pingedLanes,l=e.expirationTimes,i=e.pendingLanes;0<i;){var o=31-dt(i),s=1<<o,c=l[o];c===-1?((s&n)===0||(s&r)!==0)&&(l[o]=_c(s,t)):c<=t&&(e.expiredLanes|=s),i&=~s}}function Jl(e){return e=e.pendingLanes&-1073741825,e!==0?e:e&1073741824?1073741824:0}function cs(){var e=Rr;return Rr<<=1,(Rr&4194240)===0&&(Rr=64),e}function ql(e){for(var t=[],n=0;31>n;n++)t.push(e);return t}function Yn(e,t,n){e.pendingLanes|=t,t!==536870912&&(e.suspendedLanes=0,e.pingedLanes=0),e=e.eventTimes,t=31-dt(t),e[t]=n}function Pc(e,t){var n=e.pendingLanes&~t;e.pendingLanes=t,e.suspendedLanes=0,e.pingedLanes=0,e.expiredLanes&=t,e.mutableReadLanes&=t,e.entangledLanes&=t,t=e.entanglements;var r=e.eventTimes;for(e=e.expirationTimes;0<n;){var l=31-dt(n),i=1<<l;t[l]=0,r[l]=-1,e[l]=-1,n&=~i}}function ei(e,t){var n=e.entangledLanes|=t;for(e=e.entanglements;n;){var r=31-dt(n),l=1<<r;l&t|e[r]&t&&(e[r]|=t),n&=~l}}var se=0;function ds(e){return e&=-e,1<e?4<e?(e&268435455)!==0?16:536870912:4:1}var fs,ti,ps,hs,ms,ni=!1,Dr=[],Tt=null,Mt=null,Dt=null,Kn=new Map,Xn=new Map,It=[],zc="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function gs(e,t){switch(e){case"focusin":case"focusout":Tt=null;break;case"dragenter":case"dragleave":Mt=null;break;case"mouseover":case"mouseout":Dt=null;break;case"pointerover":case"pointerout":Kn.delete(t.pointerId);break;case"gotpointercapture":case"lostpointercapture":Xn.delete(t.pointerId)}}function Gn(e,t,n,r,l,i){return e===null||e.nativeEvent!==i?(e={blockedOn:t,domEventName:n,eventSystemFlags:r,nativeEvent:i,targetContainers:[l]},t!==null&&(t=ur(t),t!==null&&ti(t)),e):(e.eventSystemFlags|=r,t=e.targetContainers,l!==null&&t.indexOf(l)===-1&&t.push(l),e)}function Lc(e,t,n,r,l){switch(t){case"focusin":return Tt=Gn(Tt,e,t,n,r,l),!0;case"dragenter":return Mt=Gn(Mt,e,t,n,r,l),!0;case"mouseover":return Dt=Gn(Dt,e,t,n,r,l),!0;case"pointerover":var i=l.pointerId;return Kn.set(i,Gn(Kn.get(i)||null,e,t,n,r,l)),!0;case"gotpointercapture":return i=l.pointerId,Xn.set(i,Gn(Xn.get(i)||null,e,t,n,r,l)),!0}return!1}function ys(e){var t=qt(e.target);if(t!==null){var n=Jt(t);if(n!==null){if(t=n.tag,t===13){if(t=ns(n),t!==null){e.blockedOn=t,ms(e.priority,function(){ps(n)});return}}else if(t===3&&n.stateNode.current.memoizedState.isDehydrated){e.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}e.blockedOn=null}function Ir(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var n=li(e.domEventName,e.eventSystemFlags,t[0],e.nativeEvent);if(n===null){n=e.nativeEvent;var r=new n.constructor(n.type,n);Ql=r,n.target.dispatchEvent(r),Ql=null}else return t=ur(n),t!==null&&ti(t),e.blockedOn=n,!1;t.shift()}return!0}function vs(e,t,n){Ir(e)&&n.delete(t)}function Rc(){ni=!1,Tt!==null&&Ir(Tt)&&(Tt=null),Mt!==null&&Ir(Mt)&&(Mt=null),Dt!==null&&Ir(Dt)&&(Dt=null),Kn.forEach(vs),Xn.forEach(vs)}function bn(e,t){e.blockedOn===t&&(e.blockedOn=null,ni||(ni=!0,v.unstable_scheduleCallback(v.unstable_NormalPriority,Rc)))}function Zn(e){function t(l){return bn(l,e)}if(0<Dr.length){bn(Dr[0],e);for(var n=1;n<Dr.length;n++){var r=Dr[n];r.blockedOn===e&&(r.blockedOn=null)}}for(Tt!==null&&bn(Tt,e),Mt!==null&&bn(Mt,e),Dt!==null&&bn(Dt,e),Kn.forEach(t),Xn.forEach(t),n=0;n<It.length;n++)r=It[n],r.blockedOn===e&&(r.blockedOn=null);for(;0<It.length&&(n=It[0],n.blockedOn===null);)ys(n),n.blockedOn===null&&It.shift()}var gn=te.ReactCurrentBatchConfig,Or=!0;function Tc(e,t,n,r){var l=se,i=gn.transition;gn.transition=null;try{se=1,ri(e,t,n,r)}finally{se=l,gn.transition=i}}function Mc(e,t,n,r){var l=se,i=gn.transition;gn.transition=null;try{se=4,ri(e,t,n,r)}finally{se=l,gn.transition=i}}function ri(e,t,n,r){if(Or){var l=li(e,t,n,r);if(l===null)ki(e,t,r,Fr,n),gs(e,r);else if(Lc(l,e,t,n,r))r.stopPropagation();else if(gs(e,r),t&4&&-1<zc.indexOf(e)){for(;l!==null;){var i=ur(l);if(i!==null&&fs(i),i=li(e,t,n,r),i===null&&ki(e,t,r,Fr,n),i===l)break;l=i}l!==null&&r.stopPropagation()}else ki(e,t,r,null,n)}}var Fr=null;function li(e,t,n,r){if(Fr=null,e=Yl(r),e=qt(e),e!==null)if(t=Jt(e),t===null)e=null;else if(n=t.tag,n===13){if(e=ns(t),e!==null)return e;e=null}else if(n===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null);return Fr=e,null}function xs(e){switch(e){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(wc()){case Zl:return 1;case as:return 4;case zr:case kc:return 16;case us:return 536870912;default:return 16}default:return 16}}var Ot=null,ii=null,Ar=null;function ws(){if(Ar)return Ar;var e,t=ii,n=t.length,r,l="value"in Ot?Ot.value:Ot.textContent,i=l.length;for(e=0;e<n&&t[e]===l[e];e++);var o=n-e;for(r=1;r<=o&&t[n-r]===l[i-r];r++);return Ar=l.slice(e,1<r?1-r:void 0)}function Ur(e){var t=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function Br(){return!0}function ks(){return!1}function tt(e){function t(n,r,l,i,o){this._reactName=n,this._targetInst=l,this.type=r,this.nativeEvent=i,this.target=o,this.currentTarget=null;for(var s in e)e.hasOwnProperty(s)&&(n=e[s],this[s]=n?n(i):i[s]);return this.isDefaultPrevented=(i.defaultPrevented!=null?i.defaultPrevented:i.returnValue===!1)?Br:ks,this.isPropagationStopped=ks,this}return C(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=Br)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=Br)},persist:function(){},isPersistent:Br}),t}var yn={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},oi=tt(yn),Jn=C({},yn,{view:0,detail:0}),Dc=tt(Jn),si,ai,qn,Wr=C({},Jn,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:ci,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==qn&&(qn&&e.type==="mousemove"?(si=e.screenX-qn.screenX,ai=e.screenY-qn.screenY):ai=si=0,qn=e),si)},movementY:function(e){return"movementY"in e?e.movementY:ai}}),Ss=tt(Wr),Ic=C({},Wr,{dataTransfer:0}),Oc=tt(Ic),Fc=C({},Jn,{relatedTarget:0}),ui=tt(Fc),Ac=C({},yn,{animationName:0,elapsedTime:0,pseudoElement:0}),Uc=tt(Ac),Bc=C({},yn,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),Wc=tt(Bc),$c=C({},yn,{data:0}),Es=tt($c),Hc={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},Vc={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},Qc={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function Yc(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=Qc[e])?!!t[e]:!1}function ci(){return Yc}var Kc=C({},Jn,{key:function(e){if(e.key){var t=Hc[e.key]||e.key;if(t!=="Unidentified")return t}return e.type==="keypress"?(e=Ur(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?Vc[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:ci,charCode:function(e){return e.type==="keypress"?Ur(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?Ur(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),Xc=tt(Kc),Gc=C({},Wr,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),Cs=tt(Gc),bc=C({},Jn,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:ci}),Zc=tt(bc),Jc=C({},yn,{propertyName:0,elapsedTime:0,pseudoElement:0}),qc=tt(Jc),ed=C({},Wr,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),td=tt(ed),nd=[9,13,27,32],di=Y&&"CompositionEvent"in window,er=null;Y&&"documentMode"in document&&(er=document.documentMode);var rd=Y&&"TextEvent"in window&&!er,Ns=Y&&(!di||er&&8<er&&11>=er),_s=" ",js=!1;function Ps(e,t){switch(e){case"keyup":return nd.indexOf(t.keyCode)!==-1;case"keydown":return t.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function zs(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var vn=!1;function ld(e,t){switch(e){case"compositionend":return zs(t);case"keypress":return t.which!==32?null:(js=!0,_s);case"textInput":return e=t.data,e===_s&&js?null:e;default:return null}}function id(e,t){if(vn)return e==="compositionend"||!di&&Ps(e,t)?(e=ws(),Ar=ii=Ot=null,vn=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case"compositionend":return Ns&&t.locale!=="ko"?null:t.data;default:return null}}var od={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Ls(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t==="input"?!!od[e.type]:t==="textarea"}function Rs(e,t,n,r){Zo(r),t=Yr(t,"onChange"),0<t.length&&(n=new oi("onChange","change",null,n,r),e.push({event:n,listeners:t}))}var tr=null,nr=null;function sd(e){Gs(e,0)}function $r(e){var t=En(e);if(Nr(t))return e}function ad(e,t){if(e==="change")return t}var Ts=!1;if(Y){var fi;if(Y){var pi="oninput"in document;if(!pi){var Ms=document.createElement("div");Ms.setAttribute("oninput","return;"),pi=typeof Ms.oninput=="function"}fi=pi}else fi=!1;Ts=fi&&(!document.documentMode||9<document.documentMode)}function Ds(){tr&&(tr.detachEvent("onpropertychange",Is),nr=tr=null)}function Is(e){if(e.propertyName==="value"&&$r(nr)){var t=[];Rs(t,nr,e,Yl(e)),ts(sd,t)}}function ud(e,t,n){e==="focusin"?(Ds(),tr=t,nr=n,tr.attachEvent("onpropertychange",Is)):e==="focusout"&&Ds()}function cd(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return $r(nr)}function dd(e,t){if(e==="click")return $r(t)}function fd(e,t){if(e==="input"||e==="change")return $r(t)}function pd(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var ft=typeof Object.is=="function"?Object.is:pd;function rr(e,t){if(ft(e,t))return!0;if(typeof e!="object"||e===null||typeof t!="object"||t===null)return!1;var n=Object.keys(e),r=Object.keys(t);if(n.length!==r.length)return!1;for(r=0;r<n.length;r++){var l=n[r];if(!D.call(t,l)||!ft(e[l],t[l]))return!1}return!0}function Os(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function Fs(e,t){var n=Os(e);e=0;for(var r;n;){if(n.nodeType===3){if(r=e+n.textContent.length,e<=t&&r>=t)return{node:n,offset:t-e};e=r}e:{for(;n;){if(n.nextSibling){n=n.nextSibling;break e}n=n.parentNode}n=void 0}n=Os(n)}}function As(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?As(e,t.parentNode):"contains"in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function Us(){for(var e=window,t=Zt();t instanceof e.HTMLIFrameElement;){try{var n=typeof t.contentWindow.location.href=="string"}catch{n=!1}if(n)e=t.contentWindow;else break;t=Zt(e.document)}return t}function hi(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||t==="textarea"||e.contentEditable==="true")}function hd(e){var t=Us(),n=e.focusedElem,r=e.selectionRange;if(t!==n&&n&&n.ownerDocument&&As(n.ownerDocument.documentElement,n)){if(r!==null&&hi(n)){if(t=r.start,e=r.end,e===void 0&&(e=t),"selectionStart"in n)n.selectionStart=t,n.selectionEnd=Math.min(e,n.value.length);else if(e=(t=n.ownerDocument||document)&&t.defaultView||window,e.getSelection){e=e.getSelection();var l=n.textContent.length,i=Math.min(r.start,l);r=r.end===void 0?i:Math.min(r.end,l),!e.extend&&i>r&&(l=r,r=i,i=l),l=Fs(n,i);var o=Fs(n,r);l&&o&&(e.rangeCount!==1||e.anchorNode!==l.node||e.anchorOffset!==l.offset||e.focusNode!==o.node||e.focusOffset!==o.offset)&&(t=t.createRange(),t.setStart(l.node,l.offset),e.removeAllRanges(),i>r?(e.addRange(t),e.extend(o.node,o.offset)):(t.setEnd(o.node,o.offset),e.addRange(t)))}}for(t=[],e=n;e=e.parentNode;)e.nodeType===1&&t.push({element:e,left:e.scrollLeft,top:e.scrollTop});for(typeof n.focus=="function"&&n.focus(),n=0;n<t.length;n++)e=t[n],e.element.scrollLeft=e.left,e.element.scrollTop=e.top}}var md=Y&&"documentMode"in document&&11>=document.documentMode,xn=null,mi=null,lr=null,gi=!1;function Bs(e,t,n){var r=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;gi||xn==null||xn!==Zt(r)||(r=xn,"selectionStart"in r&&hi(r)?r={start:r.selectionStart,end:r.selectionEnd}:(r=(r.ownerDocument&&r.ownerDocument.defaultView||window).getSelection(),r={anchorNode:r.anchorNode,anchorOffset:r.anchorOffset,focusNode:r.focusNode,focusOffset:r.focusOffset}),lr&&rr(lr,r)||(lr=r,r=Yr(mi,"onSelect"),0<r.length&&(t=new oi("onSelect","select",null,t,n),e.push({event:t,listeners:r}),t.target=xn)))}function Hr(e,t){var n={};return n[e.toLowerCase()]=t.toLowerCase(),n["Webkit"+e]="webkit"+t,n["Moz"+e]="moz"+t,n}var wn={animationend:Hr("Animation","AnimationEnd"),animationiteration:Hr("Animation","AnimationIteration"),animationstart:Hr("Animation","AnimationStart"),transitionend:Hr("Transition","TransitionEnd")},yi={},Ws={};Y&&(Ws=document.createElement("div").style,"AnimationEvent"in window||(delete wn.animationend.animation,delete wn.animationiteration.animation,delete wn.animationstart.animation),"TransitionEvent"in window||delete wn.transitionend.transition);function Vr(e){if(yi[e])return yi[e];if(!wn[e])return e;var t=wn[e],n;for(n in t)if(t.hasOwnProperty(n)&&n in Ws)return yi[e]=t[n];return e}var $s=Vr("animationend"),Hs=Vr("animationiteration"),Vs=Vr("animationstart"),Qs=Vr("transitionend"),Ys=new Map,Ks="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function Ft(e,t){Ys.set(e,t),H(t,[e])}for(var vi=0;vi<Ks.length;vi++){var xi=Ks[vi],gd=xi.toLowerCase(),yd=xi[0].toUpperCase()+xi.slice(1);Ft(gd,"on"+yd)}Ft($s,"onAnimationEnd"),Ft(Hs,"onAnimationIteration"),Ft(Vs,"onAnimationStart"),Ft("dblclick","onDoubleClick"),Ft("focusin","onFocus"),Ft("focusout","onBlur"),Ft(Qs,"onTransitionEnd"),K("onMouseEnter",["mouseout","mouseover"]),K("onMouseLeave",["mouseout","mouseover"]),K("onPointerEnter",["pointerout","pointerover"]),K("onPointerLeave",["pointerout","pointerover"]),H("onChange","change click focusin focusout input keydown keyup selectionchange".split(" ")),H("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),H("onBeforeInput",["compositionend","keypress","textInput","paste"]),H("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" ")),H("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" ")),H("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var ir="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),vd=new Set("cancel close invalid load scroll toggle".split(" ").concat(ir));function Xs(e,t,n){var r=e.type||"unknown-event";e.currentTarget=n,gc(r,t,void 0,e),e.currentTarget=null}function Gs(e,t){t=(t&4)!==0;for(var n=0;n<e.length;n++){var r=e[n],l=r.event;r=r.listeners;e:{var i=void 0;if(t)for(var o=r.length-1;0<=o;o--){var s=r[o],c=s.instance,y=s.currentTarget;if(s=s.listener,c!==i&&l.isPropagationStopped())break e;Xs(l,s,y),i=c}else for(o=0;o<r.length;o++){if(s=r[o],c=s.instance,y=s.currentTarget,s=s.listener,c!==i&&l.isPropagationStopped())break e;Xs(l,s,y),i=c}}}if(Pr)throw e=bl,Pr=!1,bl=null,e}function fe(e,t){var n=t[ji];n===void 0&&(n=t[ji]=new Set);var r=e+"__bubble";n.has(r)||(bs(t,e,2,!1),n.add(r))}function wi(e,t,n){var r=0;t&&(r|=4),bs(n,e,r,t)}var Qr="_reactListening"+Math.random().toString(36).slice(2);function or(e){if(!e[Qr]){e[Qr]=!0,N.forEach(function(n){n!=="selectionchange"&&(vd.has(n)||wi(n,!1,e),wi(n,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[Qr]||(t[Qr]=!0,wi("selectionchange",!1,t))}}function bs(e,t,n,r){switch(xs(t)){case 1:var l=Tc;break;case 4:l=Mc;break;default:l=ri}n=l.bind(null,t,n,e),l=void 0,!Gl||t!=="touchstart"&&t!=="touchmove"&&t!=="wheel"||(l=!0),r?l!==void 0?e.addEventListener(t,n,{capture:!0,passive:l}):e.addEventListener(t,n,!0):l!==void 0?e.addEventListener(t,n,{passive:l}):e.addEventListener(t,n,!1)}function ki(e,t,n,r,l){var i=r;if((t&1)===0&&(t&2)===0&&r!==null)e:for(;;){if(r===null)return;var o=r.tag;if(o===3||o===4){var s=r.stateNode.containerInfo;if(s===l||s.nodeType===8&&s.parentNode===l)break;if(o===4)for(o=r.return;o!==null;){var c=o.tag;if((c===3||c===4)&&(c=o.stateNode.containerInfo,c===l||c.nodeType===8&&c.parentNode===l))return;o=o.return}for(;s!==null;){if(o=qt(s),o===null)return;if(c=o.tag,c===5||c===6){r=i=o;continue e}s=s.parentNode}}r=r.return}ts(function(){var y=i,k=Yl(n),S=[];e:{var w=Ys.get(e);if(w!==void 0){var T=oi,A=e;switch(e){case"keypress":if(Ur(n)===0)break e;case"keydown":case"keyup":T=Xc;break;case"focusin":A="focus",T=ui;break;case"focusout":A="blur",T=ui;break;case"beforeblur":case"afterblur":T=ui;break;case"click":if(n.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":T=Ss;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":T=Oc;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":T=Zc;break;case $s:case Hs:case Vs:T=Uc;break;case Qs:T=qc;break;case"scroll":T=Dc;break;case"wheel":T=td;break;case"copy":case"cut":case"paste":T=Wc;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":T=Cs}var U=(t&4)!==0,Se=!U&&e==="scroll",h=U?w!==null?w+"Capture":null:w;U=[];for(var f=y,m;f!==null;){m=f;var E=m.stateNode;if(m.tag===5&&E!==null&&(m=E,h!==null&&(E=$n(f,h),E!=null&&U.push(sr(f,E,m)))),Se)break;f=f.return}0<U.length&&(w=new T(w,A,null,n,k),S.push({event:w,listeners:U}))}}if((t&7)===0){e:{if(w=e==="mouseover"||e==="pointerover",T=e==="mouseout"||e==="pointerout",w&&n!==Ql&&(A=n.relatedTarget||n.fromElement)&&(qt(A)||A[Et]))break e;if((T||w)&&(w=k.window===k?k:(w=k.ownerDocument)?w.defaultView||w.parentWindow:window,T?(A=n.relatedTarget||n.toElement,T=y,A=A?qt(A):null,A!==null&&(Se=Jt(A),A!==Se||A.tag!==5&&A.tag!==6)&&(A=null)):(T=null,A=y),T!==A)){if(U=Ss,E="onMouseLeave",h="onMouseEnter",f="mouse",(e==="pointerout"||e==="pointerover")&&(U=Cs,E="onPointerLeave",h="onPointerEnter",f="pointer"),Se=T==null?w:En(T),m=A==null?w:En(A),w=new U(E,f+"leave",T,n,k),w.target=Se,w.relatedTarget=m,E=null,qt(k)===y&&(U=new U(h,f+"enter",A,n,k),U.target=m,U.relatedTarget=Se,E=U),Se=E,T&&A)t:{for(U=T,h=A,f=0,m=U;m;m=kn(m))f++;for(m=0,E=h;E;E=kn(E))m++;for(;0<f-m;)U=kn(U),f--;for(;0<m-f;)h=kn(h),m--;for(;f--;){if(U===h||h!==null&&U===h.alternate)break t;U=kn(U),h=kn(h)}U=null}else U=null;T!==null&&Zs(S,w,T,U,!1),A!==null&&Se!==null&&Zs(S,Se,A,U,!0)}}e:{if(w=y?En(y):window,T=w.nodeName&&w.nodeName.toLowerCase(),T==="select"||T==="input"&&w.type==="file")var W=ad;else if(Ls(w))if(Ts)W=fd;else{W=cd;var V=ud}else(T=w.nodeName)&&T.toLowerCase()==="input"&&(w.type==="checkbox"||w.type==="radio")&&(W=dd);if(W&&(W=W(e,y))){Rs(S,W,n,k);break e}V&&V(e,w,y),e==="focusout"&&(V=w._wrapperState)&&V.controlled&&w.type==="number"&&Bl(w,"number",w.value)}switch(V=y?En(y):window,e){case"focusin":(Ls(V)||V.contentEditable==="true")&&(xn=V,mi=y,lr=null);break;case"focusout":lr=mi=xn=null;break;case"mousedown":gi=!0;break;case"contextmenu":case"mouseup":case"dragend":gi=!1,Bs(S,n,k);break;case"selectionchange":if(md)break;case"keydown":case"keyup":Bs(S,n,k)}var Q;if(di)e:{switch(e){case"compositionstart":var b="onCompositionStart";break e;case"compositionend":b="onCompositionEnd";break e;case"compositionupdate":b="onCompositionUpdate";break e}b=void 0}else vn?Ps(e,n)&&(b="onCompositionEnd"):e==="keydown"&&n.keyCode===229&&(b="onCompositionStart");b&&(Ns&&n.locale!=="ko"&&(vn||b!=="onCompositionStart"?b==="onCompositionEnd"&&vn&&(Q=ws()):(Ot=k,ii="value"in Ot?Ot.value:Ot.textContent,vn=!0)),V=Yr(y,b),0<V.length&&(b=new Es(b,e,null,n,k),S.push({event:b,listeners:V}),Q?b.data=Q:(Q=zs(n),Q!==null&&(b.data=Q)))),(Q=rd?ld(e,n):id(e,n))&&(y=Yr(y,"onBeforeInput"),0<y.length&&(k=new Es("onBeforeInput","beforeinput",null,n,k),S.push({event:k,listeners:y}),k.data=Q))}Gs(S,t)})}function sr(e,t,n){return{instance:e,listener:t,currentTarget:n}}function Yr(e,t){for(var n=t+"Capture",r=[];e!==null;){var l=e,i=l.stateNode;l.tag===5&&i!==null&&(l=i,i=$n(e,n),i!=null&&r.unshift(sr(e,i,l)),i=$n(e,t),i!=null&&r.push(sr(e,i,l))),e=e.return}return r}function kn(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5);return e||null}function Zs(e,t,n,r,l){for(var i=t._reactName,o=[];n!==null&&n!==r;){var s=n,c=s.alternate,y=s.stateNode;if(c!==null&&c===r)break;s.tag===5&&y!==null&&(s=y,l?(c=$n(n,i),c!=null&&o.unshift(sr(n,c,s))):l||(c=$n(n,i),c!=null&&o.push(sr(n,c,s)))),n=n.return}o.length!==0&&e.push({event:t,listeners:o})}var xd=/\r\n?/g,wd=/\u0000|\uFFFD/g;function Js(e){return(typeof e=="string"?e:""+e).replace(xd,`
`).replace(wd,"")}function Kr(e,t,n){if(t=Js(t),Js(e)!==t&&n)throw Error(d(425))}function Xr(){}var Si=null,Ei=null;function Ci(e,t){return e==="textarea"||e==="noscript"||typeof t.children=="string"||typeof t.children=="number"||typeof t.dangerouslySetInnerHTML=="object"&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var Ni=typeof setTimeout=="function"?setTimeout:void 0,kd=typeof clearTimeout=="function"?clearTimeout:void 0,qs=typeof Promise=="function"?Promise:void 0,Sd=typeof queueMicrotask=="function"?queueMicrotask:typeof qs<"u"?function(e){return qs.resolve(null).then(e).catch(Ed)}:Ni;function Ed(e){setTimeout(function(){throw e})}function _i(e,t){var n=t,r=0;do{var l=n.nextSibling;if(e.removeChild(n),l&&l.nodeType===8)if(n=l.data,n==="/$"){if(r===0){e.removeChild(l),Zn(t);return}r--}else n!=="$"&&n!=="$?"&&n!=="$!"||r++;n=l}while(n);Zn(t)}function At(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t==="$"||t==="$!"||t==="$?")break;if(t==="/$")return null}}return e}function ea(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="$"||n==="$!"||n==="$?"){if(t===0)return e;t--}else n==="/$"&&t++}e=e.previousSibling}return null}var Sn=Math.random().toString(36).slice(2),xt="__reactFiber$"+Sn,ar="__reactProps$"+Sn,Et="__reactContainer$"+Sn,ji="__reactEvents$"+Sn,Cd="__reactListeners$"+Sn,Nd="__reactHandles$"+Sn;function qt(e){var t=e[xt];if(t)return t;for(var n=e.parentNode;n;){if(t=n[Et]||n[xt]){if(n=t.alternate,t.child!==null||n!==null&&n.child!==null)for(e=ea(e);e!==null;){if(n=e[xt])return n;e=ea(e)}return t}e=n,n=e.parentNode}return null}function ur(e){return e=e[xt]||e[Et],!e||e.tag!==5&&e.tag!==6&&e.tag!==13&&e.tag!==3?null:e}function En(e){if(e.tag===5||e.tag===6)return e.stateNode;throw Error(d(33))}function Gr(e){return e[ar]||null}var Pi=[],Cn=-1;function Ut(e){return{current:e}}function pe(e){0>Cn||(e.current=Pi[Cn],Pi[Cn]=null,Cn--)}function ce(e,t){Cn++,Pi[Cn]=e.current,e.current=t}var Bt={},Ae=Ut(Bt),Ye=Ut(!1),en=Bt;function Nn(e,t){var n=e.type.contextTypes;if(!n)return Bt;var r=e.stateNode;if(r&&r.__reactInternalMemoizedUnmaskedChildContext===t)return r.__reactInternalMemoizedMaskedChildContext;var l={},i;for(i in n)l[i]=t[i];return r&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=t,e.__reactInternalMemoizedMaskedChildContext=l),l}function Ke(e){return e=e.childContextTypes,e!=null}function br(){pe(Ye),pe(Ae)}function ta(e,t,n){if(Ae.current!==Bt)throw Error(d(168));ce(Ae,t),ce(Ye,n)}function na(e,t,n){var r=e.stateNode;if(t=t.childContextTypes,typeof r.getChildContext!="function")return n;r=r.getChildContext();for(var l in r)if(!(l in t))throw Error(d(108,$(e)||"Unknown",l));return C({},n,r)}function Zr(e){return e=(e=e.stateNode)&&e.__reactInternalMemoizedMergedChildContext||Bt,en=Ae.current,ce(Ae,e),ce(Ye,Ye.current),!0}function ra(e,t,n){var r=e.stateNode;if(!r)throw Error(d(169));n?(e=na(e,t,en),r.__reactInternalMemoizedMergedChildContext=e,pe(Ye),pe(Ae),ce(Ae,e)):pe(Ye),ce(Ye,n)}var Ct=null,Jr=!1,zi=!1;function la(e){Ct===null?Ct=[e]:Ct.push(e)}function _d(e){Jr=!0,la(e)}function Wt(){if(!zi&&Ct!==null){zi=!0;var e=0,t=se;try{var n=Ct;for(se=1;e<n.length;e++){var r=n[e];do r=r(!0);while(r!==null)}Ct=null,Jr=!1}catch(l){throw Ct!==null&&(Ct=Ct.slice(e+1)),os(Zl,Wt),l}finally{se=t,zi=!1}}return null}var _n=[],jn=0,qr=null,el=0,it=[],ot=0,tn=null,Nt=1,_t="";function nn(e,t){_n[jn++]=el,_n[jn++]=qr,qr=e,el=t}function ia(e,t,n){it[ot++]=Nt,it[ot++]=_t,it[ot++]=tn,tn=e;var r=Nt;e=_t;var l=32-dt(r)-1;r&=~(1<<l),n+=1;var i=32-dt(t)+l;if(30<i){var o=l-l%5;i=(r&(1<<o)-1).toString(32),r>>=o,l-=o,Nt=1<<32-dt(t)+l|n<<l|r,_t=i+e}else Nt=1<<i|n<<l|r,_t=e}function Li(e){e.return!==null&&(nn(e,1),ia(e,1,0))}function Ri(e){for(;e===qr;)qr=_n[--jn],_n[jn]=null,el=_n[--jn],_n[jn]=null;for(;e===tn;)tn=it[--ot],it[ot]=null,_t=it[--ot],it[ot]=null,Nt=it[--ot],it[ot]=null}var nt=null,rt=null,he=!1,pt=null;function oa(e,t){var n=ct(5,null,null,0);n.elementType="DELETED",n.stateNode=t,n.return=e,t=e.deletions,t===null?(e.deletions=[n],e.flags|=16):t.push(n)}function sa(e,t){switch(e.tag){case 5:var n=e.type;return t=t.nodeType!==1||n.toLowerCase()!==t.nodeName.toLowerCase()?null:t,t!==null?(e.stateNode=t,nt=e,rt=At(t.firstChild),!0):!1;case 6:return t=e.pendingProps===""||t.nodeType!==3?null:t,t!==null?(e.stateNode=t,nt=e,rt=null,!0):!1;case 13:return t=t.nodeType!==8?null:t,t!==null?(n=tn!==null?{id:Nt,overflow:_t}:null,e.memoizedState={dehydrated:t,treeContext:n,retryLane:1073741824},n=ct(18,null,null,0),n.stateNode=t,n.return=e,e.child=n,nt=e,rt=null,!0):!1;default:return!1}}function Ti(e){return(e.mode&1)!==0&&(e.flags&128)===0}function Mi(e){if(he){var t=rt;if(t){var n=t;if(!sa(e,t)){if(Ti(e))throw Error(d(418));t=At(n.nextSibling);var r=nt;t&&sa(e,t)?oa(r,n):(e.flags=e.flags&-4097|2,he=!1,nt=e)}}else{if(Ti(e))throw Error(d(418));e.flags=e.flags&-4097|2,he=!1,nt=e}}}function aa(e){for(e=e.return;e!==null&&e.tag!==5&&e.tag!==3&&e.tag!==13;)e=e.return;nt=e}function tl(e){if(e!==nt)return!1;if(!he)return aa(e),he=!0,!1;var t;if((t=e.tag!==3)&&!(t=e.tag!==5)&&(t=e.type,t=t!=="head"&&t!=="body"&&!Ci(e.type,e.memoizedProps)),t&&(t=rt)){if(Ti(e))throw ua(),Error(d(418));for(;t;)oa(e,t),t=At(t.nextSibling)}if(aa(e),e.tag===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(d(317));e:{for(e=e.nextSibling,t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="/$"){if(t===0){rt=At(e.nextSibling);break e}t--}else n!=="$"&&n!=="$!"&&n!=="$?"||t++}e=e.nextSibling}rt=null}}else rt=nt?At(e.stateNode.nextSibling):null;return!0}function ua(){for(var e=rt;e;)e=At(e.nextSibling)}function Pn(){rt=nt=null,he=!1}function Di(e){pt===null?pt=[e]:pt.push(e)}var jd=te.ReactCurrentBatchConfig;function cr(e,t,n){if(e=n.ref,e!==null&&typeof e!="function"&&typeof e!="object"){if(n._owner){if(n=n._owner,n){if(n.tag!==1)throw Error(d(309));var r=n.stateNode}if(!r)throw Error(d(147,e));var l=r,i=""+e;return t!==null&&t.ref!==null&&typeof t.ref=="function"&&t.ref._stringRef===i?t.ref:(t=function(o){var s=l.refs;o===null?delete s[i]:s[i]=o},t._stringRef=i,t)}if(typeof e!="string")throw Error(d(284));if(!n._owner)throw Error(d(290,e))}return e}function nl(e,t){throw e=Object.prototype.toString.call(t),Error(d(31,e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e))}function ca(e){var t=e._init;return t(e._payload)}function da(e){function t(h,f){if(e){var m=h.deletions;m===null?(h.deletions=[f],h.flags|=16):m.push(f)}}function n(h,f){if(!e)return null;for(;f!==null;)t(h,f),f=f.sibling;return null}function r(h,f){for(h=new Map;f!==null;)f.key!==null?h.set(f.key,f):h.set(f.index,f),f=f.sibling;return h}function l(h,f){return h=Gt(h,f),h.index=0,h.sibling=null,h}function i(h,f,m){return h.index=m,e?(m=h.alternate,m!==null?(m=m.index,m<f?(h.flags|=2,f):m):(h.flags|=2,f)):(h.flags|=1048576,f)}function o(h){return e&&h.alternate===null&&(h.flags|=2),h}function s(h,f,m,E){return f===null||f.tag!==6?(f=_o(m,h.mode,E),f.return=h,f):(f=l(f,m),f.return=h,f)}function c(h,f,m,E){var W=m.type;return W===ae?k(h,f,m.props.children,E,m.key):f!==null&&(f.elementType===W||typeof W=="object"&&W!==null&&W.$$typeof===Ce&&ca(W)===f.type)?(E=l(f,m.props),E.ref=cr(h,f,m),E.return=h,E):(E=_l(m.type,m.key,m.props,null,h.mode,E),E.ref=cr(h,f,m),E.return=h,E)}function y(h,f,m,E){return f===null||f.tag!==4||f.stateNode.containerInfo!==m.containerInfo||f.stateNode.implementation!==m.implementation?(f=jo(m,h.mode,E),f.return=h,f):(f=l(f,m.children||[]),f.return=h,f)}function k(h,f,m,E,W){return f===null||f.tag!==7?(f=dn(m,h.mode,E,W),f.return=h,f):(f=l(f,m),f.return=h,f)}function S(h,f,m){if(typeof f=="string"&&f!==""||typeof f=="number")return f=_o(""+f,h.mode,m),f.return=h,f;if(typeof f=="object"&&f!==null){switch(f.$$typeof){case ve:return m=_l(f.type,f.key,f.props,null,h.mode,m),m.ref=cr(h,null,f),m.return=h,m;case we:return f=jo(f,h.mode,m),f.return=h,f;case Ce:var E=f._init;return S(h,E(f._payload),m)}if(Un(f)||M(f))return f=dn(f,h.mode,m,null),f.return=h,f;nl(h,f)}return null}function w(h,f,m,E){var W=f!==null?f.key:null;if(typeof m=="string"&&m!==""||typeof m=="number")return W!==null?null:s(h,f,""+m,E);if(typeof m=="object"&&m!==null){switch(m.$$typeof){case ve:return m.key===W?c(h,f,m,E):null;case we:return m.key===W?y(h,f,m,E):null;case Ce:return W=m._init,w(h,f,W(m._payload),E)}if(Un(m)||M(m))return W!==null?null:k(h,f,m,E,null);nl(h,m)}return null}function T(h,f,m,E,W){if(typeof E=="string"&&E!==""||typeof E=="number")return h=h.get(m)||null,s(f,h,""+E,W);if(typeof E=="object"&&E!==null){switch(E.$$typeof){case ve:return h=h.get(E.key===null?m:E.key)||null,c(f,h,E,W);case we:return h=h.get(E.key===null?m:E.key)||null,y(f,h,E,W);case Ce:var V=E._init;return T(h,f,m,V(E._payload),W)}if(Un(E)||M(E))return h=h.get(m)||null,k(f,h,E,W,null);nl(f,E)}return null}function A(h,f,m,E){for(var W=null,V=null,Q=f,b=f=0,De=null;Q!==null&&b<m.length;b++){Q.index>b?(De=Q,Q=null):De=Q.sibling;var re=w(h,Q,m[b],E);if(re===null){Q===null&&(Q=De);break}e&&Q&&re.alternate===null&&t(h,Q),f=i(re,f,b),V===null?W=re:V.sibling=re,V=re,Q=De}if(b===m.length)return n(h,Q),he&&nn(h,b),W;if(Q===null){for(;b<m.length;b++)Q=S(h,m[b],E),Q!==null&&(f=i(Q,f,b),V===null?W=Q:V.sibling=Q,V=Q);return he&&nn(h,b),W}for(Q=r(h,Q);b<m.length;b++)De=T(Q,h,b,m[b],E),De!==null&&(e&&De.alternate!==null&&Q.delete(De.key===null?b:De.key),f=i(De,f,b),V===null?W=De:V.sibling=De,V=De);return e&&Q.forEach(function(bt){return t(h,bt)}),he&&nn(h,b),W}function U(h,f,m,E){var W=M(m);if(typeof W!="function")throw Error(d(150));if(m=W.call(m),m==null)throw Error(d(151));for(var V=W=null,Q=f,b=f=0,De=null,re=m.next();Q!==null&&!re.done;b++,re=m.next()){Q.index>b?(De=Q,Q=null):De=Q.sibling;var bt=w(h,Q,re.value,E);if(bt===null){Q===null&&(Q=De);break}e&&Q&&bt.alternate===null&&t(h,Q),f=i(bt,f,b),V===null?W=bt:V.sibling=bt,V=bt,Q=De}if(re.done)return n(h,Q),he&&nn(h,b),W;if(Q===null){for(;!re.done;b++,re=m.next())re=S(h,re.value,E),re!==null&&(f=i(re,f,b),V===null?W=re:V.sibling=re,V=re);return he&&nn(h,b),W}for(Q=r(h,Q);!re.done;b++,re=m.next())re=T(Q,h,b,re.value,E),re!==null&&(e&&re.alternate!==null&&Q.delete(re.key===null?b:re.key),f=i(re,f,b),V===null?W=re:V.sibling=re,V=re);return e&&Q.forEach(function(sf){return t(h,sf)}),he&&nn(h,b),W}function Se(h,f,m,E){if(typeof m=="object"&&m!==null&&m.type===ae&&m.key===null&&(m=m.props.children),typeof m=="object"&&m!==null){switch(m.$$typeof){case ve:e:{for(var W=m.key,V=f;V!==null;){if(V.key===W){if(W=m.type,W===ae){if(V.tag===7){n(h,V.sibling),f=l(V,m.props.children),f.return=h,h=f;break e}}else if(V.elementType===W||typeof W=="object"&&W!==null&&W.$$typeof===Ce&&ca(W)===V.type){n(h,V.sibling),f=l(V,m.props),f.ref=cr(h,V,m),f.return=h,h=f;break e}n(h,V);break}else t(h,V);V=V.sibling}m.type===ae?(f=dn(m.props.children,h.mode,E,m.key),f.return=h,h=f):(E=_l(m.type,m.key,m.props,null,h.mode,E),E.ref=cr(h,f,m),E.return=h,h=E)}return o(h);case we:e:{for(V=m.key;f!==null;){if(f.key===V)if(f.tag===4&&f.stateNode.containerInfo===m.containerInfo&&f.stateNode.implementation===m.implementation){n(h,f.sibling),f=l(f,m.children||[]),f.return=h,h=f;break e}else{n(h,f);break}else t(h,f);f=f.sibling}f=jo(m,h.mode,E),f.return=h,h=f}return o(h);case Ce:return V=m._init,Se(h,f,V(m._payload),E)}if(Un(m))return A(h,f,m,E);if(M(m))return U(h,f,m,E);nl(h,m)}return typeof m=="string"&&m!==""||typeof m=="number"?(m=""+m,f!==null&&f.tag===6?(n(h,f.sibling),f=l(f,m),f.return=h,h=f):(n(h,f),f=_o(m,h.mode,E),f.return=h,h=f),o(h)):n(h,f)}return Se}var zn=da(!0),fa=da(!1),rl=Ut(null),ll=null,Ln=null,Ii=null;function Oi(){Ii=Ln=ll=null}function Fi(e){var t=rl.current;pe(rl),e._currentValue=t}function Ai(e,t,n){for(;e!==null;){var r=e.alternate;if((e.childLanes&t)!==t?(e.childLanes|=t,r!==null&&(r.childLanes|=t)):r!==null&&(r.childLanes&t)!==t&&(r.childLanes|=t),e===n)break;e=e.return}}function Rn(e,t){ll=e,Ii=Ln=null,e=e.dependencies,e!==null&&e.firstContext!==null&&((e.lanes&t)!==0&&(Xe=!0),e.firstContext=null)}function st(e){var t=e._currentValue;if(Ii!==e)if(e={context:e,memoizedValue:t,next:null},Ln===null){if(ll===null)throw Error(d(308));Ln=e,ll.dependencies={lanes:0,firstContext:e}}else Ln=Ln.next=e;return t}var rn=null;function Ui(e){rn===null?rn=[e]:rn.push(e)}function pa(e,t,n,r){var l=t.interleaved;return l===null?(n.next=n,Ui(t)):(n.next=l.next,l.next=n),t.interleaved=n,jt(e,r)}function jt(e,t){e.lanes|=t;var n=e.alternate;for(n!==null&&(n.lanes|=t),n=e,e=e.return;e!==null;)e.childLanes|=t,n=e.alternate,n!==null&&(n.childLanes|=t),n=e,e=e.return;return n.tag===3?n.stateNode:null}var $t=!1;function Bi(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function ha(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,effects:e.effects})}function Pt(e,t){return{eventTime:e,lane:t,tag:0,payload:null,callback:null,next:null}}function Ht(e,t,n){var r=e.updateQueue;if(r===null)return null;if(r=r.shared,(ne&2)!==0){var l=r.pending;return l===null?t.next=t:(t.next=l.next,l.next=t),r.pending=t,jt(e,n)}return l=r.interleaved,l===null?(t.next=t,Ui(r)):(t.next=l.next,l.next=t),r.interleaved=t,jt(e,n)}function il(e,t,n){if(t=t.updateQueue,t!==null&&(t=t.shared,(n&4194240)!==0)){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,ei(e,n)}}function ma(e,t){var n=e.updateQueue,r=e.alternate;if(r!==null&&(r=r.updateQueue,n===r)){var l=null,i=null;if(n=n.firstBaseUpdate,n!==null){do{var o={eventTime:n.eventTime,lane:n.lane,tag:n.tag,payload:n.payload,callback:n.callback,next:null};i===null?l=i=o:i=i.next=o,n=n.next}while(n!==null);i===null?l=i=t:i=i.next=t}else l=i=t;n={baseState:r.baseState,firstBaseUpdate:l,lastBaseUpdate:i,shared:r.shared,effects:r.effects},e.updateQueue=n;return}e=n.lastBaseUpdate,e===null?n.firstBaseUpdate=t:e.next=t,n.lastBaseUpdate=t}function ol(e,t,n,r){var l=e.updateQueue;$t=!1;var i=l.firstBaseUpdate,o=l.lastBaseUpdate,s=l.shared.pending;if(s!==null){l.shared.pending=null;var c=s,y=c.next;c.next=null,o===null?i=y:o.next=y,o=c;var k=e.alternate;k!==null&&(k=k.updateQueue,s=k.lastBaseUpdate,s!==o&&(s===null?k.firstBaseUpdate=y:s.next=y,k.lastBaseUpdate=c))}if(i!==null){var S=l.baseState;o=0,k=y=c=null,s=i;do{var w=s.lane,T=s.eventTime;if((r&w)===w){k!==null&&(k=k.next={eventTime:T,lane:0,tag:s.tag,payload:s.payload,callback:s.callback,next:null});e:{var A=e,U=s;switch(w=t,T=n,U.tag){case 1:if(A=U.payload,typeof A=="function"){S=A.call(T,S,w);break e}S=A;break e;case 3:A.flags=A.flags&-65537|128;case 0:if(A=U.payload,w=typeof A=="function"?A.call(T,S,w):A,w==null)break e;S=C({},S,w);break e;case 2:$t=!0}}s.callback!==null&&s.lane!==0&&(e.flags|=64,w=l.effects,w===null?l.effects=[s]:w.push(s))}else T={eventTime:T,lane:w,tag:s.tag,payload:s.payload,callback:s.callback,next:null},k===null?(y=k=T,c=S):k=k.next=T,o|=w;if(s=s.next,s===null){if(s=l.shared.pending,s===null)break;w=s,s=w.next,w.next=null,l.lastBaseUpdate=w,l.shared.pending=null}}while(!0);if(k===null&&(c=S),l.baseState=c,l.firstBaseUpdate=y,l.lastBaseUpdate=k,t=l.shared.interleaved,t!==null){l=t;do o|=l.lane,l=l.next;while(l!==t)}else i===null&&(l.shared.lanes=0);sn|=o,e.lanes=o,e.memoizedState=S}}function ga(e,t,n){if(e=t.effects,t.effects=null,e!==null)for(t=0;t<e.length;t++){var r=e[t],l=r.callback;if(l!==null){if(r.callback=null,r=n,typeof l!="function")throw Error(d(191,l));l.call(r)}}}var dr={},wt=Ut(dr),fr=Ut(dr),pr=Ut(dr);function ln(e){if(e===dr)throw Error(d(174));return e}function Wi(e,t){switch(ce(pr,t),ce(fr,e),ce(wt,dr),e=t.nodeType,e){case 9:case 11:t=(t=t.documentElement)?t.namespaceURI:$l(null,"");break;default:e=e===8?t.parentNode:t,t=e.namespaceURI||null,e=e.tagName,t=$l(t,e)}pe(wt),ce(wt,t)}function Tn(){pe(wt),pe(fr),pe(pr)}function ya(e){ln(pr.current);var t=ln(wt.current),n=$l(t,e.type);t!==n&&(ce(fr,e),ce(wt,n))}function $i(e){fr.current===e&&(pe(wt),pe(fr))}var me=Ut(0);function sl(e){for(var t=e;t!==null;){if(t.tag===13){var n=t.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||n.data==="$?"||n.data==="$!"))return t}else if(t.tag===19&&t.memoizedProps.revealOrder!==void 0){if((t.flags&128)!==0)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var Hi=[];function Vi(){for(var e=0;e<Hi.length;e++)Hi[e]._workInProgressVersionPrimary=null;Hi.length=0}var al=te.ReactCurrentDispatcher,Qi=te.ReactCurrentBatchConfig,on=0,ge=null,je=null,Te=null,ul=!1,hr=!1,mr=0,Pd=0;function Ue(){throw Error(d(321))}function Yi(e,t){if(t===null)return!1;for(var n=0;n<t.length&&n<e.length;n++)if(!ft(e[n],t[n]))return!1;return!0}function Ki(e,t,n,r,l,i){if(on=i,ge=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,al.current=e===null||e.memoizedState===null?Td:Md,e=n(r,l),hr){i=0;do{if(hr=!1,mr=0,25<=i)throw Error(d(301));i+=1,Te=je=null,t.updateQueue=null,al.current=Dd,e=n(r,l)}while(hr)}if(al.current=fl,t=je!==null&&je.next!==null,on=0,Te=je=ge=null,ul=!1,t)throw Error(d(300));return e}function Xi(){var e=mr!==0;return mr=0,e}function kt(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return Te===null?ge.memoizedState=Te=e:Te=Te.next=e,Te}function at(){if(je===null){var e=ge.alternate;e=e!==null?e.memoizedState:null}else e=je.next;var t=Te===null?ge.memoizedState:Te.next;if(t!==null)Te=t,je=e;else{if(e===null)throw Error(d(310));je=e,e={memoizedState:je.memoizedState,baseState:je.baseState,baseQueue:je.baseQueue,queue:je.queue,next:null},Te===null?ge.memoizedState=Te=e:Te=Te.next=e}return Te}function gr(e,t){return typeof t=="function"?t(e):t}function Gi(e){var t=at(),n=t.queue;if(n===null)throw Error(d(311));n.lastRenderedReducer=e;var r=je,l=r.baseQueue,i=n.pending;if(i!==null){if(l!==null){var o=l.next;l.next=i.next,i.next=o}r.baseQueue=l=i,n.pending=null}if(l!==null){i=l.next,r=r.baseState;var s=o=null,c=null,y=i;do{var k=y.lane;if((on&k)===k)c!==null&&(c=c.next={lane:0,action:y.action,hasEagerState:y.hasEagerState,eagerState:y.eagerState,next:null}),r=y.hasEagerState?y.eagerState:e(r,y.action);else{var S={lane:k,action:y.action,hasEagerState:y.hasEagerState,eagerState:y.eagerState,next:null};c===null?(s=c=S,o=r):c=c.next=S,ge.lanes|=k,sn|=k}y=y.next}while(y!==null&&y!==i);c===null?o=r:c.next=s,ft(r,t.memoizedState)||(Xe=!0),t.memoizedState=r,t.baseState=o,t.baseQueue=c,n.lastRenderedState=r}if(e=n.interleaved,e!==null){l=e;do i=l.lane,ge.lanes|=i,sn|=i,l=l.next;while(l!==e)}else l===null&&(n.lanes=0);return[t.memoizedState,n.dispatch]}function bi(e){var t=at(),n=t.queue;if(n===null)throw Error(d(311));n.lastRenderedReducer=e;var r=n.dispatch,l=n.pending,i=t.memoizedState;if(l!==null){n.pending=null;var o=l=l.next;do i=e(i,o.action),o=o.next;while(o!==l);ft(i,t.memoizedState)||(Xe=!0),t.memoizedState=i,t.baseQueue===null&&(t.baseState=i),n.lastRenderedState=i}return[i,r]}function va(){}function xa(e,t){var n=ge,r=at(),l=t(),i=!ft(r.memoizedState,l);if(i&&(r.memoizedState=l,Xe=!0),r=r.queue,Zi(Sa.bind(null,n,r,e),[e]),r.getSnapshot!==t||i||Te!==null&&Te.memoizedState.tag&1){if(n.flags|=2048,yr(9,ka.bind(null,n,r,l,t),void 0,null),Me===null)throw Error(d(349));(on&30)!==0||wa(n,t,l)}return l}function wa(e,t,n){e.flags|=16384,e={getSnapshot:t,value:n},t=ge.updateQueue,t===null?(t={lastEffect:null,stores:null},ge.updateQueue=t,t.stores=[e]):(n=t.stores,n===null?t.stores=[e]:n.push(e))}function ka(e,t,n,r){t.value=n,t.getSnapshot=r,Ea(t)&&Ca(e)}function Sa(e,t,n){return n(function(){Ea(t)&&Ca(e)})}function Ea(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!ft(e,n)}catch{return!0}}function Ca(e){var t=jt(e,1);t!==null&&yt(t,e,1,-1)}function Na(e){var t=kt();return typeof e=="function"&&(e=e()),t.memoizedState=t.baseState=e,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:gr,lastRenderedState:e},t.queue=e,e=e.dispatch=Rd.bind(null,ge,e),[t.memoizedState,e]}function yr(e,t,n,r){return e={tag:e,create:t,destroy:n,deps:r,next:null},t=ge.updateQueue,t===null?(t={lastEffect:null,stores:null},ge.updateQueue=t,t.lastEffect=e.next=e):(n=t.lastEffect,n===null?t.lastEffect=e.next=e:(r=n.next,n.next=e,e.next=r,t.lastEffect=e)),e}function _a(){return at().memoizedState}function cl(e,t,n,r){var l=kt();ge.flags|=e,l.memoizedState=yr(1|t,n,void 0,r===void 0?null:r)}function dl(e,t,n,r){var l=at();r=r===void 0?null:r;var i=void 0;if(je!==null){var o=je.memoizedState;if(i=o.destroy,r!==null&&Yi(r,o.deps)){l.memoizedState=yr(t,n,i,r);return}}ge.flags|=e,l.memoizedState=yr(1|t,n,i,r)}function ja(e,t){return cl(8390656,8,e,t)}function Zi(e,t){return dl(2048,8,e,t)}function Pa(e,t){return dl(4,2,e,t)}function za(e,t){return dl(4,4,e,t)}function La(e,t){if(typeof t=="function")return e=e(),t(e),function(){t(null)};if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function Ra(e,t,n){return n=n!=null?n.concat([e]):null,dl(4,4,La.bind(null,t,e),n)}function Ji(){}function Ta(e,t){var n=at();t=t===void 0?null:t;var r=n.memoizedState;return r!==null&&t!==null&&Yi(t,r[1])?r[0]:(n.memoizedState=[e,t],e)}function Ma(e,t){var n=at();t=t===void 0?null:t;var r=n.memoizedState;return r!==null&&t!==null&&Yi(t,r[1])?r[0]:(e=e(),n.memoizedState=[e,t],e)}function Da(e,t,n){return(on&21)===0?(e.baseState&&(e.baseState=!1,Xe=!0),e.memoizedState=n):(ft(n,t)||(n=cs(),ge.lanes|=n,sn|=n,e.baseState=!0),t)}function zd(e,t){var n=se;se=n!==0&&4>n?n:4,e(!0);var r=Qi.transition;Qi.transition={};try{e(!1),t()}finally{se=n,Qi.transition=r}}function Ia(){return at().memoizedState}function Ld(e,t,n){var r=Kt(e);if(n={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null},Oa(e))Fa(t,n);else if(n=pa(e,t,n,r),n!==null){var l=He();yt(n,e,r,l),Aa(n,t,r)}}function Rd(e,t,n){var r=Kt(e),l={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null};if(Oa(e))Fa(t,l);else{var i=e.alternate;if(e.lanes===0&&(i===null||i.lanes===0)&&(i=t.lastRenderedReducer,i!==null))try{var o=t.lastRenderedState,s=i(o,n);if(l.hasEagerState=!0,l.eagerState=s,ft(s,o)){var c=t.interleaved;c===null?(l.next=l,Ui(t)):(l.next=c.next,c.next=l),t.interleaved=l;return}}catch{}finally{}n=pa(e,t,l,r),n!==null&&(l=He(),yt(n,e,r,l),Aa(n,t,r))}}function Oa(e){var t=e.alternate;return e===ge||t!==null&&t===ge}function Fa(e,t){hr=ul=!0;var n=e.pending;n===null?t.next=t:(t.next=n.next,n.next=t),e.pending=t}function Aa(e,t,n){if((n&4194240)!==0){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,ei(e,n)}}var fl={readContext:st,useCallback:Ue,useContext:Ue,useEffect:Ue,useImperativeHandle:Ue,useInsertionEffect:Ue,useLayoutEffect:Ue,useMemo:Ue,useReducer:Ue,useRef:Ue,useState:Ue,useDebugValue:Ue,useDeferredValue:Ue,useTransition:Ue,useMutableSource:Ue,useSyncExternalStore:Ue,useId:Ue,unstable_isNewReconciler:!1},Td={readContext:st,useCallback:function(e,t){return kt().memoizedState=[e,t===void 0?null:t],e},useContext:st,useEffect:ja,useImperativeHandle:function(e,t,n){return n=n!=null?n.concat([e]):null,cl(4194308,4,La.bind(null,t,e),n)},useLayoutEffect:function(e,t){return cl(4194308,4,e,t)},useInsertionEffect:function(e,t){return cl(4,2,e,t)},useMemo:function(e,t){var n=kt();return t=t===void 0?null:t,e=e(),n.memoizedState=[e,t],e},useReducer:function(e,t,n){var r=kt();return t=n!==void 0?n(t):t,r.memoizedState=r.baseState=t,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:t},r.queue=e,e=e.dispatch=Ld.bind(null,ge,e),[r.memoizedState,e]},useRef:function(e){var t=kt();return e={current:e},t.memoizedState=e},useState:Na,useDebugValue:Ji,useDeferredValue:function(e){return kt().memoizedState=e},useTransition:function(){var e=Na(!1),t=e[0];return e=zd.bind(null,e[1]),kt().memoizedState=e,[t,e]},useMutableSource:function(){},useSyncExternalStore:function(e,t,n){var r=ge,l=kt();if(he){if(n===void 0)throw Error(d(407));n=n()}else{if(n=t(),Me===null)throw Error(d(349));(on&30)!==0||wa(r,t,n)}l.memoizedState=n;var i={value:n,getSnapshot:t};return l.queue=i,ja(Sa.bind(null,r,i,e),[e]),r.flags|=2048,yr(9,ka.bind(null,r,i,n,t),void 0,null),n},useId:function(){var e=kt(),t=Me.identifierPrefix;if(he){var n=_t,r=Nt;n=(r&~(1<<32-dt(r)-1)).toString(32)+n,t=":"+t+"R"+n,n=mr++,0<n&&(t+="H"+n.toString(32)),t+=":"}else n=Pd++,t=":"+t+"r"+n.toString(32)+":";return e.memoizedState=t},unstable_isNewReconciler:!1},Md={readContext:st,useCallback:Ta,useContext:st,useEffect:Zi,useImperativeHandle:Ra,useInsertionEffect:Pa,useLayoutEffect:za,useMemo:Ma,useReducer:Gi,useRef:_a,useState:function(){return Gi(gr)},useDebugValue:Ji,useDeferredValue:function(e){var t=at();return Da(t,je.memoizedState,e)},useTransition:function(){var e=Gi(gr)[0],t=at().memoizedState;return[e,t]},useMutableSource:va,useSyncExternalStore:xa,useId:Ia,unstable_isNewReconciler:!1},Dd={readContext:st,useCallback:Ta,useContext:st,useEffect:Zi,useImperativeHandle:Ra,useInsertionEffect:Pa,useLayoutEffect:za,useMemo:Ma,useReducer:bi,useRef:_a,useState:function(){return bi(gr)},useDebugValue:Ji,useDeferredValue:function(e){var t=at();return je===null?t.memoizedState=e:Da(t,je.memoizedState,e)},useTransition:function(){var e=bi(gr)[0],t=at().memoizedState;return[e,t]},useMutableSource:va,useSyncExternalStore:xa,useId:Ia,unstable_isNewReconciler:!1};function ht(e,t){if(e&&e.defaultProps){t=C({},t),e=e.defaultProps;for(var n in e)t[n]===void 0&&(t[n]=e[n]);return t}return t}function qi(e,t,n,r){t=e.memoizedState,n=n(r,t),n=n==null?t:C({},t,n),e.memoizedState=n,e.lanes===0&&(e.updateQueue.baseState=n)}var pl={isMounted:function(e){return(e=e._reactInternals)?Jt(e)===e:!1},enqueueSetState:function(e,t,n){e=e._reactInternals;var r=He(),l=Kt(e),i=Pt(r,l);i.payload=t,n!=null&&(i.callback=n),t=Ht(e,i,l),t!==null&&(yt(t,e,l,r),il(t,e,l))},enqueueReplaceState:function(e,t,n){e=e._reactInternals;var r=He(),l=Kt(e),i=Pt(r,l);i.tag=1,i.payload=t,n!=null&&(i.callback=n),t=Ht(e,i,l),t!==null&&(yt(t,e,l,r),il(t,e,l))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var n=He(),r=Kt(e),l=Pt(n,r);l.tag=2,t!=null&&(l.callback=t),t=Ht(e,l,r),t!==null&&(yt(t,e,r,n),il(t,e,r))}};function Ua(e,t,n,r,l,i,o){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(r,i,o):t.prototype&&t.prototype.isPureReactComponent?!rr(n,r)||!rr(l,i):!0}function Ba(e,t,n){var r=!1,l=Bt,i=t.contextType;return typeof i=="object"&&i!==null?i=st(i):(l=Ke(t)?en:Ae.current,r=t.contextTypes,i=(r=r!=null)?Nn(e,l):Bt),t=new t(n,i),e.memoizedState=t.state!==null&&t.state!==void 0?t.state:null,t.updater=pl,e.stateNode=t,t._reactInternals=e,r&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=l,e.__reactInternalMemoizedMaskedChildContext=i),t}function Wa(e,t,n,r){e=t.state,typeof t.componentWillReceiveProps=="function"&&t.componentWillReceiveProps(n,r),typeof t.UNSAFE_componentWillReceiveProps=="function"&&t.UNSAFE_componentWillReceiveProps(n,r),t.state!==e&&pl.enqueueReplaceState(t,t.state,null)}function eo(e,t,n,r){var l=e.stateNode;l.props=n,l.state=e.memoizedState,l.refs={},Bi(e);var i=t.contextType;typeof i=="object"&&i!==null?l.context=st(i):(i=Ke(t)?en:Ae.current,l.context=Nn(e,i)),l.state=e.memoizedState,i=t.getDerivedStateFromProps,typeof i=="function"&&(qi(e,t,i,n),l.state=e.memoizedState),typeof t.getDerivedStateFromProps=="function"||typeof l.getSnapshotBeforeUpdate=="function"||typeof l.UNSAFE_componentWillMount!="function"&&typeof l.componentWillMount!="function"||(t=l.state,typeof l.componentWillMount=="function"&&l.componentWillMount(),typeof l.UNSAFE_componentWillMount=="function"&&l.UNSAFE_componentWillMount(),t!==l.state&&pl.enqueueReplaceState(l,l.state,null),ol(e,n,l,r),l.state=e.memoizedState),typeof l.componentDidMount=="function"&&(e.flags|=4194308)}function Mn(e,t){try{var n="",r=t;do n+=R(r),r=r.return;while(r);var l=n}catch(i){l=`
Error generating stack: `+i.message+`
`+i.stack}return{value:e,source:t,stack:l,digest:null}}function to(e,t,n){return{value:e,source:null,stack:n??null,digest:t??null}}function no(e,t){try{console.error(t.value)}catch(n){setTimeout(function(){throw n})}}var Id=typeof WeakMap=="function"?WeakMap:Map;function $a(e,t,n){n=Pt(-1,n),n.tag=3,n.payload={element:null};var r=t.value;return n.callback=function(){wl||(wl=!0,vo=r),no(e,t)},n}function Ha(e,t,n){n=Pt(-1,n),n.tag=3;var r=e.type.getDerivedStateFromError;if(typeof r=="function"){var l=t.value;n.payload=function(){return r(l)},n.callback=function(){no(e,t)}}var i=e.stateNode;return i!==null&&typeof i.componentDidCatch=="function"&&(n.callback=function(){no(e,t),typeof r!="function"&&(Qt===null?Qt=new Set([this]):Qt.add(this));var o=t.stack;this.componentDidCatch(t.value,{componentStack:o!==null?o:""})}),n}function Va(e,t,n){var r=e.pingCache;if(r===null){r=e.pingCache=new Id;var l=new Set;r.set(t,l)}else l=r.get(t),l===void 0&&(l=new Set,r.set(t,l));l.has(n)||(l.add(n),e=Gd.bind(null,e,t,n),t.then(e,e))}function Qa(e){do{var t;if((t=e.tag===13)&&(t=e.memoizedState,t=t!==null?t.dehydrated!==null:!0),t)return e;e=e.return}while(e!==null);return null}function Ya(e,t,n,r,l){return(e.mode&1)===0?(e===t?e.flags|=65536:(e.flags|=128,n.flags|=131072,n.flags&=-52805,n.tag===1&&(n.alternate===null?n.tag=17:(t=Pt(-1,1),t.tag=2,Ht(n,t,1))),n.lanes|=1),e):(e.flags|=65536,e.lanes=l,e)}var Od=te.ReactCurrentOwner,Xe=!1;function $e(e,t,n,r){t.child=e===null?fa(t,null,n,r):zn(t,e.child,n,r)}function Ka(e,t,n,r,l){n=n.render;var i=t.ref;return Rn(t,l),r=Ki(e,t,n,r,i,l),n=Xi(),e!==null&&!Xe?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~l,zt(e,t,l)):(he&&n&&Li(t),t.flags|=1,$e(e,t,r,l),t.child)}function Xa(e,t,n,r,l){if(e===null){var i=n.type;return typeof i=="function"&&!No(i)&&i.defaultProps===void 0&&n.compare===null&&n.defaultProps===void 0?(t.tag=15,t.type=i,Ga(e,t,i,r,l)):(e=_l(n.type,null,r,t,t.mode,l),e.ref=t.ref,e.return=t,t.child=e)}if(i=e.child,(e.lanes&l)===0){var o=i.memoizedProps;if(n=n.compare,n=n!==null?n:rr,n(o,r)&&e.ref===t.ref)return zt(e,t,l)}return t.flags|=1,e=Gt(i,r),e.ref=t.ref,e.return=t,t.child=e}function Ga(e,t,n,r,l){if(e!==null){var i=e.memoizedProps;if(rr(i,r)&&e.ref===t.ref)if(Xe=!1,t.pendingProps=r=i,(e.lanes&l)!==0)(e.flags&131072)!==0&&(Xe=!0);else return t.lanes=e.lanes,zt(e,t,l)}return ro(e,t,n,r,l)}function ba(e,t,n){var r=t.pendingProps,l=r.children,i=e!==null?e.memoizedState:null;if(r.mode==="hidden")if((t.mode&1)===0)t.memoizedState={baseLanes:0,cachePool:null,transitions:null},ce(In,lt),lt|=n;else{if((n&1073741824)===0)return e=i!==null?i.baseLanes|n:n,t.lanes=t.childLanes=1073741824,t.memoizedState={baseLanes:e,cachePool:null,transitions:null},t.updateQueue=null,ce(In,lt),lt|=e,null;t.memoizedState={baseLanes:0,cachePool:null,transitions:null},r=i!==null?i.baseLanes:n,ce(In,lt),lt|=r}else i!==null?(r=i.baseLanes|n,t.memoizedState=null):r=n,ce(In,lt),lt|=r;return $e(e,t,l,n),t.child}function Za(e,t){var n=t.ref;(e===null&&n!==null||e!==null&&e.ref!==n)&&(t.flags|=512,t.flags|=2097152)}function ro(e,t,n,r,l){var i=Ke(n)?en:Ae.current;return i=Nn(t,i),Rn(t,l),n=Ki(e,t,n,r,i,l),r=Xi(),e!==null&&!Xe?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~l,zt(e,t,l)):(he&&r&&Li(t),t.flags|=1,$e(e,t,n,l),t.child)}function Ja(e,t,n,r,l){if(Ke(n)){var i=!0;Zr(t)}else i=!1;if(Rn(t,l),t.stateNode===null)ml(e,t),Ba(t,n,r),eo(t,n,r,l),r=!0;else if(e===null){var o=t.stateNode,s=t.memoizedProps;o.props=s;var c=o.context,y=n.contextType;typeof y=="object"&&y!==null?y=st(y):(y=Ke(n)?en:Ae.current,y=Nn(t,y));var k=n.getDerivedStateFromProps,S=typeof k=="function"||typeof o.getSnapshotBeforeUpdate=="function";S||typeof o.UNSAFE_componentWillReceiveProps!="function"&&typeof o.componentWillReceiveProps!="function"||(s!==r||c!==y)&&Wa(t,o,r,y),$t=!1;var w=t.memoizedState;o.state=w,ol(t,r,o,l),c=t.memoizedState,s!==r||w!==c||Ye.current||$t?(typeof k=="function"&&(qi(t,n,k,r),c=t.memoizedState),(s=$t||Ua(t,n,s,r,w,c,y))?(S||typeof o.UNSAFE_componentWillMount!="function"&&typeof o.componentWillMount!="function"||(typeof o.componentWillMount=="function"&&o.componentWillMount(),typeof o.UNSAFE_componentWillMount=="function"&&o.UNSAFE_componentWillMount()),typeof o.componentDidMount=="function"&&(t.flags|=4194308)):(typeof o.componentDidMount=="function"&&(t.flags|=4194308),t.memoizedProps=r,t.memoizedState=c),o.props=r,o.state=c,o.context=y,r=s):(typeof o.componentDidMount=="function"&&(t.flags|=4194308),r=!1)}else{o=t.stateNode,ha(e,t),s=t.memoizedProps,y=t.type===t.elementType?s:ht(t.type,s),o.props=y,S=t.pendingProps,w=o.context,c=n.contextType,typeof c=="object"&&c!==null?c=st(c):(c=Ke(n)?en:Ae.current,c=Nn(t,c));var T=n.getDerivedStateFromProps;(k=typeof T=="function"||typeof o.getSnapshotBeforeUpdate=="function")||typeof o.UNSAFE_componentWillReceiveProps!="function"&&typeof o.componentWillReceiveProps!="function"||(s!==S||w!==c)&&Wa(t,o,r,c),$t=!1,w=t.memoizedState,o.state=w,ol(t,r,o,l);var A=t.memoizedState;s!==S||w!==A||Ye.current||$t?(typeof T=="function"&&(qi(t,n,T,r),A=t.memoizedState),(y=$t||Ua(t,n,y,r,w,A,c)||!1)?(k||typeof o.UNSAFE_componentWillUpdate!="function"&&typeof o.componentWillUpdate!="function"||(typeof o.componentWillUpdate=="function"&&o.componentWillUpdate(r,A,c),typeof o.UNSAFE_componentWillUpdate=="function"&&o.UNSAFE_componentWillUpdate(r,A,c)),typeof o.componentDidUpdate=="function"&&(t.flags|=4),typeof o.getSnapshotBeforeUpdate=="function"&&(t.flags|=1024)):(typeof o.componentDidUpdate!="function"||s===e.memoizedProps&&w===e.memoizedState||(t.flags|=4),typeof o.getSnapshotBeforeUpdate!="function"||s===e.memoizedProps&&w===e.memoizedState||(t.flags|=1024),t.memoizedProps=r,t.memoizedState=A),o.props=r,o.state=A,o.context=c,r=y):(typeof o.componentDidUpdate!="function"||s===e.memoizedProps&&w===e.memoizedState||(t.flags|=4),typeof o.getSnapshotBeforeUpdate!="function"||s===e.memoizedProps&&w===e.memoizedState||(t.flags|=1024),r=!1)}return lo(e,t,n,r,i,l)}function lo(e,t,n,r,l,i){Za(e,t);var o=(t.flags&128)!==0;if(!r&&!o)return l&&ra(t,n,!1),zt(e,t,i);r=t.stateNode,Od.current=t;var s=o&&typeof n.getDerivedStateFromError!="function"?null:r.render();return t.flags|=1,e!==null&&o?(t.child=zn(t,e.child,null,i),t.child=zn(t,null,s,i)):$e(e,t,s,i),t.memoizedState=r.state,l&&ra(t,n,!0),t.child}function qa(e){var t=e.stateNode;t.pendingContext?ta(e,t.pendingContext,t.pendingContext!==t.context):t.context&&ta(e,t.context,!1),Wi(e,t.containerInfo)}function eu(e,t,n,r,l){return Pn(),Di(l),t.flags|=256,$e(e,t,n,r),t.child}var io={dehydrated:null,treeContext:null,retryLane:0};function oo(e){return{baseLanes:e,cachePool:null,transitions:null}}function tu(e,t,n){var r=t.pendingProps,l=me.current,i=!1,o=(t.flags&128)!==0,s;if((s=o)||(s=e!==null&&e.memoizedState===null?!1:(l&2)!==0),s?(i=!0,t.flags&=-129):(e===null||e.memoizedState!==null)&&(l|=1),ce(me,l&1),e===null)return Mi(t),e=t.memoizedState,e!==null&&(e=e.dehydrated,e!==null)?((t.mode&1)===0?t.lanes=1:e.data==="$!"?t.lanes=8:t.lanes=1073741824,null):(o=r.children,e=r.fallback,i?(r=t.mode,i=t.child,o={mode:"hidden",children:o},(r&1)===0&&i!==null?(i.childLanes=0,i.pendingProps=o):i=jl(o,r,0,null),e=dn(e,r,n,null),i.return=t,e.return=t,i.sibling=e,t.child=i,t.child.memoizedState=oo(n),t.memoizedState=io,e):so(t,o));if(l=e.memoizedState,l!==null&&(s=l.dehydrated,s!==null))return Fd(e,t,o,r,s,l,n);if(i){i=r.fallback,o=t.mode,l=e.child,s=l.sibling;var c={mode:"hidden",children:r.children};return(o&1)===0&&t.child!==l?(r=t.child,r.childLanes=0,r.pendingProps=c,t.deletions=null):(r=Gt(l,c),r.subtreeFlags=l.subtreeFlags&14680064),s!==null?i=Gt(s,i):(i=dn(i,o,n,null),i.flags|=2),i.return=t,r.return=t,r.sibling=i,t.child=r,r=i,i=t.child,o=e.child.memoizedState,o=o===null?oo(n):{baseLanes:o.baseLanes|n,cachePool:null,transitions:o.transitions},i.memoizedState=o,i.childLanes=e.childLanes&~n,t.memoizedState=io,r}return i=e.child,e=i.sibling,r=Gt(i,{mode:"visible",children:r.children}),(t.mode&1)===0&&(r.lanes=n),r.return=t,r.sibling=null,e!==null&&(n=t.deletions,n===null?(t.deletions=[e],t.flags|=16):n.push(e)),t.child=r,t.memoizedState=null,r}function so(e,t){return t=jl({mode:"visible",children:t},e.mode,0,null),t.return=e,e.child=t}function hl(e,t,n,r){return r!==null&&Di(r),zn(t,e.child,null,n),e=so(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function Fd(e,t,n,r,l,i,o){if(n)return t.flags&256?(t.flags&=-257,r=to(Error(d(422))),hl(e,t,o,r)):t.memoizedState!==null?(t.child=e.child,t.flags|=128,null):(i=r.fallback,l=t.mode,r=jl({mode:"visible",children:r.children},l,0,null),i=dn(i,l,o,null),i.flags|=2,r.return=t,i.return=t,r.sibling=i,t.child=r,(t.mode&1)!==0&&zn(t,e.child,null,o),t.child.memoizedState=oo(o),t.memoizedState=io,i);if((t.mode&1)===0)return hl(e,t,o,null);if(l.data==="$!"){if(r=l.nextSibling&&l.nextSibling.dataset,r)var s=r.dgst;return r=s,i=Error(d(419)),r=to(i,r,void 0),hl(e,t,o,r)}if(s=(o&e.childLanes)!==0,Xe||s){if(r=Me,r!==null){switch(o&-o){case 4:l=2;break;case 16:l=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:l=32;break;case 536870912:l=268435456;break;default:l=0}l=(l&(r.suspendedLanes|o))!==0?0:l,l!==0&&l!==i.retryLane&&(i.retryLane=l,jt(e,l),yt(r,e,l,-1))}return Co(),r=to(Error(d(421))),hl(e,t,o,r)}return l.data==="$?"?(t.flags|=128,t.child=e.child,t=bd.bind(null,e),l._reactRetry=t,null):(e=i.treeContext,rt=At(l.nextSibling),nt=t,he=!0,pt=null,e!==null&&(it[ot++]=Nt,it[ot++]=_t,it[ot++]=tn,Nt=e.id,_t=e.overflow,tn=t),t=so(t,r.children),t.flags|=4096,t)}function nu(e,t,n){e.lanes|=t;var r=e.alternate;r!==null&&(r.lanes|=t),Ai(e.return,t,n)}function ao(e,t,n,r,l){var i=e.memoizedState;i===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:r,tail:n,tailMode:l}:(i.isBackwards=t,i.rendering=null,i.renderingStartTime=0,i.last=r,i.tail=n,i.tailMode=l)}function ru(e,t,n){var r=t.pendingProps,l=r.revealOrder,i=r.tail;if($e(e,t,r.children,n),r=me.current,(r&2)!==0)r=r&1|2,t.flags|=128;else{if(e!==null&&(e.flags&128)!==0)e:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&nu(e,n,t);else if(e.tag===19)nu(e,n,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break e;for(;e.sibling===null;){if(e.return===null||e.return===t)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}r&=1}if(ce(me,r),(t.mode&1)===0)t.memoizedState=null;else switch(l){case"forwards":for(n=t.child,l=null;n!==null;)e=n.alternate,e!==null&&sl(e)===null&&(l=n),n=n.sibling;n=l,n===null?(l=t.child,t.child=null):(l=n.sibling,n.sibling=null),ao(t,!1,l,n,i);break;case"backwards":for(n=null,l=t.child,t.child=null;l!==null;){if(e=l.alternate,e!==null&&sl(e)===null){t.child=l;break}e=l.sibling,l.sibling=n,n=l,l=e}ao(t,!0,n,null,i);break;case"together":ao(t,!1,null,null,void 0);break;default:t.memoizedState=null}return t.child}function ml(e,t){(t.mode&1)===0&&e!==null&&(e.alternate=null,t.alternate=null,t.flags|=2)}function zt(e,t,n){if(e!==null&&(t.dependencies=e.dependencies),sn|=t.lanes,(n&t.childLanes)===0)return null;if(e!==null&&t.child!==e.child)throw Error(d(153));if(t.child!==null){for(e=t.child,n=Gt(e,e.pendingProps),t.child=n,n.return=t;e.sibling!==null;)e=e.sibling,n=n.sibling=Gt(e,e.pendingProps),n.return=t;n.sibling=null}return t.child}function Ad(e,t,n){switch(t.tag){case 3:qa(t),Pn();break;case 5:ya(t);break;case 1:Ke(t.type)&&Zr(t);break;case 4:Wi(t,t.stateNode.containerInfo);break;case 10:var r=t.type._context,l=t.memoizedProps.value;ce(rl,r._currentValue),r._currentValue=l;break;case 13:if(r=t.memoizedState,r!==null)return r.dehydrated!==null?(ce(me,me.current&1),t.flags|=128,null):(n&t.child.childLanes)!==0?tu(e,t,n):(ce(me,me.current&1),e=zt(e,t,n),e!==null?e.sibling:null);ce(me,me.current&1);break;case 19:if(r=(n&t.childLanes)!==0,(e.flags&128)!==0){if(r)return ru(e,t,n);t.flags|=128}if(l=t.memoizedState,l!==null&&(l.rendering=null,l.tail=null,l.lastEffect=null),ce(me,me.current),r)break;return null;case 22:case 23:return t.lanes=0,ba(e,t,n)}return zt(e,t,n)}var lu,uo,iu,ou;lu=function(e,t){for(var n=t.child;n!==null;){if(n.tag===5||n.tag===6)e.appendChild(n.stateNode);else if(n.tag!==4&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===t)break;for(;n.sibling===null;){if(n.return===null||n.return===t)return;n=n.return}n.sibling.return=n.return,n=n.sibling}},uo=function(){},iu=function(e,t,n,r){var l=e.memoizedProps;if(l!==r){e=t.stateNode,ln(wt.current);var i=null;switch(n){case"input":l=Al(e,l),r=Al(e,r),i=[];break;case"select":l=C({},l,{value:void 0}),r=C({},r,{value:void 0}),i=[];break;case"textarea":l=Wl(e,l),r=Wl(e,r),i=[];break;default:typeof l.onClick!="function"&&typeof r.onClick=="function"&&(e.onclick=Xr)}Hl(n,r);var o;n=null;for(y in l)if(!r.hasOwnProperty(y)&&l.hasOwnProperty(y)&&l[y]!=null)if(y==="style"){var s=l[y];for(o in s)s.hasOwnProperty(o)&&(n||(n={}),n[o]="")}else y!=="dangerouslySetInnerHTML"&&y!=="children"&&y!=="suppressContentEditableWarning"&&y!=="suppressHydrationWarning"&&y!=="autoFocus"&&(j.hasOwnProperty(y)?i||(i=[]):(i=i||[]).push(y,null));for(y in r){var c=r[y];if(s=l!=null?l[y]:void 0,r.hasOwnProperty(y)&&c!==s&&(c!=null||s!=null))if(y==="style")if(s){for(o in s)!s.hasOwnProperty(o)||c&&c.hasOwnProperty(o)||(n||(n={}),n[o]="");for(o in c)c.hasOwnProperty(o)&&s[o]!==c[o]&&(n||(n={}),n[o]=c[o])}else n||(i||(i=[]),i.push(y,n)),n=c;else y==="dangerouslySetInnerHTML"?(c=c?c.__html:void 0,s=s?s.__html:void 0,c!=null&&s!==c&&(i=i||[]).push(y,c)):y==="children"?typeof c!="string"&&typeof c!="number"||(i=i||[]).push(y,""+c):y!=="suppressContentEditableWarning"&&y!=="suppressHydrationWarning"&&(j.hasOwnProperty(y)?(c!=null&&y==="onScroll"&&fe("scroll",e),i||s===c||(i=[])):(i=i||[]).push(y,c))}n&&(i=i||[]).push("style",n);var y=i;(t.updateQueue=y)&&(t.flags|=4)}},ou=function(e,t,n,r){n!==r&&(t.flags|=4)};function vr(e,t){if(!he)switch(e.tailMode){case"hidden":t=e.tail;for(var n=null;t!==null;)t.alternate!==null&&(n=t),t=t.sibling;n===null?e.tail=null:n.sibling=null;break;case"collapsed":n=e.tail;for(var r=null;n!==null;)n.alternate!==null&&(r=n),n=n.sibling;r===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:r.sibling=null}}function Be(e){var t=e.alternate!==null&&e.alternate.child===e.child,n=0,r=0;if(t)for(var l=e.child;l!==null;)n|=l.lanes|l.childLanes,r|=l.subtreeFlags&14680064,r|=l.flags&14680064,l.return=e,l=l.sibling;else for(l=e.child;l!==null;)n|=l.lanes|l.childLanes,r|=l.subtreeFlags,r|=l.flags,l.return=e,l=l.sibling;return e.subtreeFlags|=r,e.childLanes=n,t}function Ud(e,t,n){var r=t.pendingProps;switch(Ri(t),t.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return Be(t),null;case 1:return Ke(t.type)&&br(),Be(t),null;case 3:return r=t.stateNode,Tn(),pe(Ye),pe(Ae),Vi(),r.pendingContext&&(r.context=r.pendingContext,r.pendingContext=null),(e===null||e.child===null)&&(tl(t)?t.flags|=4:e===null||e.memoizedState.isDehydrated&&(t.flags&256)===0||(t.flags|=1024,pt!==null&&(ko(pt),pt=null))),uo(e,t),Be(t),null;case 5:$i(t);var l=ln(pr.current);if(n=t.type,e!==null&&t.stateNode!=null)iu(e,t,n,r,l),e.ref!==t.ref&&(t.flags|=512,t.flags|=2097152);else{if(!r){if(t.stateNode===null)throw Error(d(166));return Be(t),null}if(e=ln(wt.current),tl(t)){r=t.stateNode,n=t.type;var i=t.memoizedProps;switch(r[xt]=t,r[ar]=i,e=(t.mode&1)!==0,n){case"dialog":fe("cancel",r),fe("close",r);break;case"iframe":case"object":case"embed":fe("load",r);break;case"video":case"audio":for(l=0;l<ir.length;l++)fe(ir[l],r);break;case"source":fe("error",r);break;case"img":case"image":case"link":fe("error",r),fe("load",r);break;case"details":fe("toggle",r);break;case"input":Bo(r,i),fe("invalid",r);break;case"select":r._wrapperState={wasMultiple:!!i.multiple},fe("invalid",r);break;case"textarea":Ho(r,i),fe("invalid",r)}Hl(n,i),l=null;for(var o in i)if(i.hasOwnProperty(o)){var s=i[o];o==="children"?typeof s=="string"?r.textContent!==s&&(i.suppressHydrationWarning!==!0&&Kr(r.textContent,s,e),l=["children",s]):typeof s=="number"&&r.textContent!==""+s&&(i.suppressHydrationWarning!==!0&&Kr(r.textContent,s,e),l=["children",""+s]):j.hasOwnProperty(o)&&s!=null&&o==="onScroll"&&fe("scroll",r)}switch(n){case"input":et(r),$o(r,i,!0);break;case"textarea":et(r),Qo(r);break;case"select":case"option":break;default:typeof i.onClick=="function"&&(r.onclick=Xr)}r=l,t.updateQueue=r,r!==null&&(t.flags|=4)}else{o=l.nodeType===9?l:l.ownerDocument,e==="http://www.w3.org/1999/xhtml"&&(e=Yo(n)),e==="http://www.w3.org/1999/xhtml"?n==="script"?(e=o.createElement("div"),e.innerHTML="<script><\/script>",e=e.removeChild(e.firstChild)):typeof r.is=="string"?e=o.createElement(n,{is:r.is}):(e=o.createElement(n),n==="select"&&(o=e,r.multiple?o.multiple=!0:r.size&&(o.size=r.size))):e=o.createElementNS(e,n),e[xt]=t,e[ar]=r,lu(e,t,!1,!1),t.stateNode=e;e:{switch(o=Vl(n,r),n){case"dialog":fe("cancel",e),fe("close",e),l=r;break;case"iframe":case"object":case"embed":fe("load",e),l=r;break;case"video":case"audio":for(l=0;l<ir.length;l++)fe(ir[l],e);l=r;break;case"source":fe("error",e),l=r;break;case"img":case"image":case"link":fe("error",e),fe("load",e),l=r;break;case"details":fe("toggle",e),l=r;break;case"input":Bo(e,r),l=Al(e,r),fe("invalid",e);break;case"option":l=r;break;case"select":e._wrapperState={wasMultiple:!!r.multiple},l=C({},r,{value:void 0}),fe("invalid",e);break;case"textarea":Ho(e,r),l=Wl(e,r),fe("invalid",e);break;default:l=r}Hl(n,l),s=l;for(i in s)if(s.hasOwnProperty(i)){var c=s[i];i==="style"?Go(e,c):i==="dangerouslySetInnerHTML"?(c=c?c.__html:void 0,c!=null&&Ko(e,c)):i==="children"?typeof c=="string"?(n!=="textarea"||c!=="")&&Bn(e,c):typeof c=="number"&&Bn(e,""+c):i!=="suppressContentEditableWarning"&&i!=="suppressHydrationWarning"&&i!=="autoFocus"&&(j.hasOwnProperty(i)?c!=null&&i==="onScroll"&&fe("scroll",e):c!=null&&ye(e,i,c,o))}switch(n){case"input":et(e),$o(e,r,!1);break;case"textarea":et(e),Qo(e);break;case"option":r.value!=null&&e.setAttribute("value",""+J(r.value));break;case"select":e.multiple=!!r.multiple,i=r.value,i!=null?pn(e,!!r.multiple,i,!1):r.defaultValue!=null&&pn(e,!!r.multiple,r.defaultValue,!0);break;default:typeof l.onClick=="function"&&(e.onclick=Xr)}switch(n){case"button":case"input":case"select":case"textarea":r=!!r.autoFocus;break e;case"img":r=!0;break e;default:r=!1}}r&&(t.flags|=4)}t.ref!==null&&(t.flags|=512,t.flags|=2097152)}return Be(t),null;case 6:if(e&&t.stateNode!=null)ou(e,t,e.memoizedProps,r);else{if(typeof r!="string"&&t.stateNode===null)throw Error(d(166));if(n=ln(pr.current),ln(wt.current),tl(t)){if(r=t.stateNode,n=t.memoizedProps,r[xt]=t,(i=r.nodeValue!==n)&&(e=nt,e!==null))switch(e.tag){case 3:Kr(r.nodeValue,n,(e.mode&1)!==0);break;case 5:e.memoizedProps.suppressHydrationWarning!==!0&&Kr(r.nodeValue,n,(e.mode&1)!==0)}i&&(t.flags|=4)}else r=(n.nodeType===9?n:n.ownerDocument).createTextNode(r),r[xt]=t,t.stateNode=r}return Be(t),null;case 13:if(pe(me),r=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(he&&rt!==null&&(t.mode&1)!==0&&(t.flags&128)===0)ua(),Pn(),t.flags|=98560,i=!1;else if(i=tl(t),r!==null&&r.dehydrated!==null){if(e===null){if(!i)throw Error(d(318));if(i=t.memoizedState,i=i!==null?i.dehydrated:null,!i)throw Error(d(317));i[xt]=t}else Pn(),(t.flags&128)===0&&(t.memoizedState=null),t.flags|=4;Be(t),i=!1}else pt!==null&&(ko(pt),pt=null),i=!0;if(!i)return t.flags&65536?t:null}return(t.flags&128)!==0?(t.lanes=n,t):(r=r!==null,r!==(e!==null&&e.memoizedState!==null)&&r&&(t.child.flags|=8192,(t.mode&1)!==0&&(e===null||(me.current&1)!==0?Pe===0&&(Pe=3):Co())),t.updateQueue!==null&&(t.flags|=4),Be(t),null);case 4:return Tn(),uo(e,t),e===null&&or(t.stateNode.containerInfo),Be(t),null;case 10:return Fi(t.type._context),Be(t),null;case 17:return Ke(t.type)&&br(),Be(t),null;case 19:if(pe(me),i=t.memoizedState,i===null)return Be(t),null;if(r=(t.flags&128)!==0,o=i.rendering,o===null)if(r)vr(i,!1);else{if(Pe!==0||e!==null&&(e.flags&128)!==0)for(e=t.child;e!==null;){if(o=sl(e),o!==null){for(t.flags|=128,vr(i,!1),r=o.updateQueue,r!==null&&(t.updateQueue=r,t.flags|=4),t.subtreeFlags=0,r=n,n=t.child;n!==null;)i=n,e=r,i.flags&=14680066,o=i.alternate,o===null?(i.childLanes=0,i.lanes=e,i.child=null,i.subtreeFlags=0,i.memoizedProps=null,i.memoizedState=null,i.updateQueue=null,i.dependencies=null,i.stateNode=null):(i.childLanes=o.childLanes,i.lanes=o.lanes,i.child=o.child,i.subtreeFlags=0,i.deletions=null,i.memoizedProps=o.memoizedProps,i.memoizedState=o.memoizedState,i.updateQueue=o.updateQueue,i.type=o.type,e=o.dependencies,i.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext}),n=n.sibling;return ce(me,me.current&1|2),t.child}e=e.sibling}i.tail!==null&&ke()>On&&(t.flags|=128,r=!0,vr(i,!1),t.lanes=4194304)}else{if(!r)if(e=sl(o),e!==null){if(t.flags|=128,r=!0,n=e.updateQueue,n!==null&&(t.updateQueue=n,t.flags|=4),vr(i,!0),i.tail===null&&i.tailMode==="hidden"&&!o.alternate&&!he)return Be(t),null}else 2*ke()-i.renderingStartTime>On&&n!==1073741824&&(t.flags|=128,r=!0,vr(i,!1),t.lanes=4194304);i.isBackwards?(o.sibling=t.child,t.child=o):(n=i.last,n!==null?n.sibling=o:t.child=o,i.last=o)}return i.tail!==null?(t=i.tail,i.rendering=t,i.tail=t.sibling,i.renderingStartTime=ke(),t.sibling=null,n=me.current,ce(me,r?n&1|2:n&1),t):(Be(t),null);case 22:case 23:return Eo(),r=t.memoizedState!==null,e!==null&&e.memoizedState!==null!==r&&(t.flags|=8192),r&&(t.mode&1)!==0?(lt&1073741824)!==0&&(Be(t),t.subtreeFlags&6&&(t.flags|=8192)):Be(t),null;case 24:return null;case 25:return null}throw Error(d(156,t.tag))}function Bd(e,t){switch(Ri(t),t.tag){case 1:return Ke(t.type)&&br(),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return Tn(),pe(Ye),pe(Ae),Vi(),e=t.flags,(e&65536)!==0&&(e&128)===0?(t.flags=e&-65537|128,t):null;case 5:return $i(t),null;case 13:if(pe(me),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(d(340));Pn()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return pe(me),null;case 4:return Tn(),null;case 10:return Fi(t.type._context),null;case 22:case 23:return Eo(),null;case 24:return null;default:return null}}var gl=!1,We=!1,Wd=typeof WeakSet=="function"?WeakSet:Set,O=null;function Dn(e,t){var n=e.ref;if(n!==null)if(typeof n=="function")try{n(null)}catch(r){xe(e,t,r)}else n.current=null}function co(e,t,n){try{n()}catch(r){xe(e,t,r)}}var su=!1;function $d(e,t){if(Si=Or,e=Us(),hi(e)){if("selectionStart"in e)var n={start:e.selectionStart,end:e.selectionEnd};else e:{n=(n=e.ownerDocument)&&n.defaultView||window;var r=n.getSelection&&n.getSelection();if(r&&r.rangeCount!==0){n=r.anchorNode;var l=r.anchorOffset,i=r.focusNode;r=r.focusOffset;try{n.nodeType,i.nodeType}catch{n=null;break e}var o=0,s=-1,c=-1,y=0,k=0,S=e,w=null;t:for(;;){for(var T;S!==n||l!==0&&S.nodeType!==3||(s=o+l),S!==i||r!==0&&S.nodeType!==3||(c=o+r),S.nodeType===3&&(o+=S.nodeValue.length),(T=S.firstChild)!==null;)w=S,S=T;for(;;){if(S===e)break t;if(w===n&&++y===l&&(s=o),w===i&&++k===r&&(c=o),(T=S.nextSibling)!==null)break;S=w,w=S.parentNode}S=T}n=s===-1||c===-1?null:{start:s,end:c}}else n=null}n=n||{start:0,end:0}}else n=null;for(Ei={focusedElem:e,selectionRange:n},Or=!1,O=t;O!==null;)if(t=O,e=t.child,(t.subtreeFlags&1028)!==0&&e!==null)e.return=t,O=e;else for(;O!==null;){t=O;try{var A=t.alternate;if((t.flags&1024)!==0)switch(t.tag){case 0:case 11:case 15:break;case 1:if(A!==null){var U=A.memoizedProps,Se=A.memoizedState,h=t.stateNode,f=h.getSnapshotBeforeUpdate(t.elementType===t.type?U:ht(t.type,U),Se);h.__reactInternalSnapshotBeforeUpdate=f}break;case 3:var m=t.stateNode.containerInfo;m.nodeType===1?m.textContent="":m.nodeType===9&&m.documentElement&&m.removeChild(m.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(d(163))}}catch(E){xe(t,t.return,E)}if(e=t.sibling,e!==null){e.return=t.return,O=e;break}O=t.return}return A=su,su=!1,A}function xr(e,t,n){var r=t.updateQueue;if(r=r!==null?r.lastEffect:null,r!==null){var l=r=r.next;do{if((l.tag&e)===e){var i=l.destroy;l.destroy=void 0,i!==void 0&&co(t,n,i)}l=l.next}while(l!==r)}}function yl(e,t){if(t=t.updateQueue,t=t!==null?t.lastEffect:null,t!==null){var n=t=t.next;do{if((n.tag&e)===e){var r=n.create;n.destroy=r()}n=n.next}while(n!==t)}}function fo(e){var t=e.ref;if(t!==null){var n=e.stateNode;switch(e.tag){case 5:e=n;break;default:e=n}typeof t=="function"?t(e):t.current=e}}function au(e){var t=e.alternate;t!==null&&(e.alternate=null,au(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&(delete t[xt],delete t[ar],delete t[ji],delete t[Cd],delete t[Nd])),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}function uu(e){return e.tag===5||e.tag===3||e.tag===4}function cu(e){e:for(;;){for(;e.sibling===null;){if(e.return===null||uu(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.flags&2||e.child===null||e.tag===4)continue e;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function po(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?n.nodeType===8?n.parentNode.insertBefore(e,t):n.insertBefore(e,t):(n.nodeType===8?(t=n.parentNode,t.insertBefore(e,n)):(t=n,t.appendChild(e)),n=n._reactRootContainer,n!=null||t.onclick!==null||(t.onclick=Xr));else if(r!==4&&(e=e.child,e!==null))for(po(e,t,n),e=e.sibling;e!==null;)po(e,t,n),e=e.sibling}function ho(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?n.insertBefore(e,t):n.appendChild(e);else if(r!==4&&(e=e.child,e!==null))for(ho(e,t,n),e=e.sibling;e!==null;)ho(e,t,n),e=e.sibling}var Ie=null,mt=!1;function Vt(e,t,n){for(n=n.child;n!==null;)du(e,t,n),n=n.sibling}function du(e,t,n){if(vt&&typeof vt.onCommitFiberUnmount=="function")try{vt.onCommitFiberUnmount(Lr,n)}catch{}switch(n.tag){case 5:We||Dn(n,t);case 6:var r=Ie,l=mt;Ie=null,Vt(e,t,n),Ie=r,mt=l,Ie!==null&&(mt?(e=Ie,n=n.stateNode,e.nodeType===8?e.parentNode.removeChild(n):e.removeChild(n)):Ie.removeChild(n.stateNode));break;case 18:Ie!==null&&(mt?(e=Ie,n=n.stateNode,e.nodeType===8?_i(e.parentNode,n):e.nodeType===1&&_i(e,n),Zn(e)):_i(Ie,n.stateNode));break;case 4:r=Ie,l=mt,Ie=n.stateNode.containerInfo,mt=!0,Vt(e,t,n),Ie=r,mt=l;break;case 0:case 11:case 14:case 15:if(!We&&(r=n.updateQueue,r!==null&&(r=r.lastEffect,r!==null))){l=r=r.next;do{var i=l,o=i.destroy;i=i.tag,o!==void 0&&((i&2)!==0||(i&4)!==0)&&co(n,t,o),l=l.next}while(l!==r)}Vt(e,t,n);break;case 1:if(!We&&(Dn(n,t),r=n.stateNode,typeof r.componentWillUnmount=="function"))try{r.props=n.memoizedProps,r.state=n.memoizedState,r.componentWillUnmount()}catch(s){xe(n,t,s)}Vt(e,t,n);break;case 21:Vt(e,t,n);break;case 22:n.mode&1?(We=(r=We)||n.memoizedState!==null,Vt(e,t,n),We=r):Vt(e,t,n);break;default:Vt(e,t,n)}}function fu(e){var t=e.updateQueue;if(t!==null){e.updateQueue=null;var n=e.stateNode;n===null&&(n=e.stateNode=new Wd),t.forEach(function(r){var l=Zd.bind(null,e,r);n.has(r)||(n.add(r),r.then(l,l))})}}function gt(e,t){var n=t.deletions;if(n!==null)for(var r=0;r<n.length;r++){var l=n[r];try{var i=e,o=t,s=o;e:for(;s!==null;){switch(s.tag){case 5:Ie=s.stateNode,mt=!1;break e;case 3:Ie=s.stateNode.containerInfo,mt=!0;break e;case 4:Ie=s.stateNode.containerInfo,mt=!0;break e}s=s.return}if(Ie===null)throw Error(d(160));du(i,o,l),Ie=null,mt=!1;var c=l.alternate;c!==null&&(c.return=null),l.return=null}catch(y){xe(l,t,y)}}if(t.subtreeFlags&12854)for(t=t.child;t!==null;)pu(t,e),t=t.sibling}function pu(e,t){var n=e.alternate,r=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:if(gt(t,e),St(e),r&4){try{xr(3,e,e.return),yl(3,e)}catch(U){xe(e,e.return,U)}try{xr(5,e,e.return)}catch(U){xe(e,e.return,U)}}break;case 1:gt(t,e),St(e),r&512&&n!==null&&Dn(n,n.return);break;case 5:if(gt(t,e),St(e),r&512&&n!==null&&Dn(n,n.return),e.flags&32){var l=e.stateNode;try{Bn(l,"")}catch(U){xe(e,e.return,U)}}if(r&4&&(l=e.stateNode,l!=null)){var i=e.memoizedProps,o=n!==null?n.memoizedProps:i,s=e.type,c=e.updateQueue;if(e.updateQueue=null,c!==null)try{s==="input"&&i.type==="radio"&&i.name!=null&&Wo(l,i),Vl(s,o);var y=Vl(s,i);for(o=0;o<c.length;o+=2){var k=c[o],S=c[o+1];k==="style"?Go(l,S):k==="dangerouslySetInnerHTML"?Ko(l,S):k==="children"?Bn(l,S):ye(l,k,S,y)}switch(s){case"input":Ul(l,i);break;case"textarea":Vo(l,i);break;case"select":var w=l._wrapperState.wasMultiple;l._wrapperState.wasMultiple=!!i.multiple;var T=i.value;T!=null?pn(l,!!i.multiple,T,!1):w!==!!i.multiple&&(i.defaultValue!=null?pn(l,!!i.multiple,i.defaultValue,!0):pn(l,!!i.multiple,i.multiple?[]:"",!1))}l[ar]=i}catch(U){xe(e,e.return,U)}}break;case 6:if(gt(t,e),St(e),r&4){if(e.stateNode===null)throw Error(d(162));l=e.stateNode,i=e.memoizedProps;try{l.nodeValue=i}catch(U){xe(e,e.return,U)}}break;case 3:if(gt(t,e),St(e),r&4&&n!==null&&n.memoizedState.isDehydrated)try{Zn(t.containerInfo)}catch(U){xe(e,e.return,U)}break;case 4:gt(t,e),St(e);break;case 13:gt(t,e),St(e),l=e.child,l.flags&8192&&(i=l.memoizedState!==null,l.stateNode.isHidden=i,!i||l.alternate!==null&&l.alternate.memoizedState!==null||(yo=ke())),r&4&&fu(e);break;case 22:if(k=n!==null&&n.memoizedState!==null,e.mode&1?(We=(y=We)||k,gt(t,e),We=y):gt(t,e),St(e),r&8192){if(y=e.memoizedState!==null,(e.stateNode.isHidden=y)&&!k&&(e.mode&1)!==0)for(O=e,k=e.child;k!==null;){for(S=O=k;O!==null;){switch(w=O,T=w.child,w.tag){case 0:case 11:case 14:case 15:xr(4,w,w.return);break;case 1:Dn(w,w.return);var A=w.stateNode;if(typeof A.componentWillUnmount=="function"){r=w,n=w.return;try{t=r,A.props=t.memoizedProps,A.state=t.memoizedState,A.componentWillUnmount()}catch(U){xe(r,n,U)}}break;case 5:Dn(w,w.return);break;case 22:if(w.memoizedState!==null){gu(S);continue}}T!==null?(T.return=w,O=T):gu(S)}k=k.sibling}e:for(k=null,S=e;;){if(S.tag===5){if(k===null){k=S;try{l=S.stateNode,y?(i=l.style,typeof i.setProperty=="function"?i.setProperty("display","none","important"):i.display="none"):(s=S.stateNode,c=S.memoizedProps.style,o=c!=null&&c.hasOwnProperty("display")?c.display:null,s.style.display=Xo("display",o))}catch(U){xe(e,e.return,U)}}}else if(S.tag===6){if(k===null)try{S.stateNode.nodeValue=y?"":S.memoizedProps}catch(U){xe(e,e.return,U)}}else if((S.tag!==22&&S.tag!==23||S.memoizedState===null||S===e)&&S.child!==null){S.child.return=S,S=S.child;continue}if(S===e)break e;for(;S.sibling===null;){if(S.return===null||S.return===e)break e;k===S&&(k=null),S=S.return}k===S&&(k=null),S.sibling.return=S.return,S=S.sibling}}break;case 19:gt(t,e),St(e),r&4&&fu(e);break;case 21:break;default:gt(t,e),St(e)}}function St(e){var t=e.flags;if(t&2){try{e:{for(var n=e.return;n!==null;){if(uu(n)){var r=n;break e}n=n.return}throw Error(d(160))}switch(r.tag){case 5:var l=r.stateNode;r.flags&32&&(Bn(l,""),r.flags&=-33);var i=cu(e);ho(e,i,l);break;case 3:case 4:var o=r.stateNode.containerInfo,s=cu(e);po(e,s,o);break;default:throw Error(d(161))}}catch(c){xe(e,e.return,c)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function Hd(e,t,n){O=e,hu(e)}function hu(e,t,n){for(var r=(e.mode&1)!==0;O!==null;){var l=O,i=l.child;if(l.tag===22&&r){var o=l.memoizedState!==null||gl;if(!o){var s=l.alternate,c=s!==null&&s.memoizedState!==null||We;s=gl;var y=We;if(gl=o,(We=c)&&!y)for(O=l;O!==null;)o=O,c=o.child,o.tag===22&&o.memoizedState!==null?yu(l):c!==null?(c.return=o,O=c):yu(l);for(;i!==null;)O=i,hu(i),i=i.sibling;O=l,gl=s,We=y}mu(e)}else(l.subtreeFlags&8772)!==0&&i!==null?(i.return=l,O=i):mu(e)}}function mu(e){for(;O!==null;){var t=O;if((t.flags&8772)!==0){var n=t.alternate;try{if((t.flags&8772)!==0)switch(t.tag){case 0:case 11:case 15:We||yl(5,t);break;case 1:var r=t.stateNode;if(t.flags&4&&!We)if(n===null)r.componentDidMount();else{var l=t.elementType===t.type?n.memoizedProps:ht(t.type,n.memoizedProps);r.componentDidUpdate(l,n.memoizedState,r.__reactInternalSnapshotBeforeUpdate)}var i=t.updateQueue;i!==null&&ga(t,i,r);break;case 3:var o=t.updateQueue;if(o!==null){if(n=null,t.child!==null)switch(t.child.tag){case 5:n=t.child.stateNode;break;case 1:n=t.child.stateNode}ga(t,o,n)}break;case 5:var s=t.stateNode;if(n===null&&t.flags&4){n=s;var c=t.memoizedProps;switch(t.type){case"button":case"input":case"select":case"textarea":c.autoFocus&&n.focus();break;case"img":c.src&&(n.src=c.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(t.memoizedState===null){var y=t.alternate;if(y!==null){var k=y.memoizedState;if(k!==null){var S=k.dehydrated;S!==null&&Zn(S)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(d(163))}We||t.flags&512&&fo(t)}catch(w){xe(t,t.return,w)}}if(t===e){O=null;break}if(n=t.sibling,n!==null){n.return=t.return,O=n;break}O=t.return}}function gu(e){for(;O!==null;){var t=O;if(t===e){O=null;break}var n=t.sibling;if(n!==null){n.return=t.return,O=n;break}O=t.return}}function yu(e){for(;O!==null;){var t=O;try{switch(t.tag){case 0:case 11:case 15:var n=t.return;try{yl(4,t)}catch(c){xe(t,n,c)}break;case 1:var r=t.stateNode;if(typeof r.componentDidMount=="function"){var l=t.return;try{r.componentDidMount()}catch(c){xe(t,l,c)}}var i=t.return;try{fo(t)}catch(c){xe(t,i,c)}break;case 5:var o=t.return;try{fo(t)}catch(c){xe(t,o,c)}}}catch(c){xe(t,t.return,c)}if(t===e){O=null;break}var s=t.sibling;if(s!==null){s.return=t.return,O=s;break}O=t.return}}var Vd=Math.ceil,vl=te.ReactCurrentDispatcher,mo=te.ReactCurrentOwner,ut=te.ReactCurrentBatchConfig,ne=0,Me=null,Ne=null,Oe=0,lt=0,In=Ut(0),Pe=0,wr=null,sn=0,xl=0,go=0,kr=null,Ge=null,yo=0,On=1/0,Lt=null,wl=!1,vo=null,Qt=null,kl=!1,Yt=null,Sl=0,Sr=0,xo=null,El=-1,Cl=0;function He(){return(ne&6)!==0?ke():El!==-1?El:El=ke()}function Kt(e){return(e.mode&1)===0?1:(ne&2)!==0&&Oe!==0?Oe&-Oe:jd.transition!==null?(Cl===0&&(Cl=cs()),Cl):(e=se,e!==0||(e=window.event,e=e===void 0?16:xs(e.type)),e)}function yt(e,t,n,r){if(50<Sr)throw Sr=0,xo=null,Error(d(185));Yn(e,n,r),((ne&2)===0||e!==Me)&&(e===Me&&((ne&2)===0&&(xl|=n),Pe===4&&Xt(e,Oe)),be(e,r),n===1&&ne===0&&(t.mode&1)===0&&(On=ke()+500,Jr&&Wt()))}function be(e,t){var n=e.callbackNode;jc(e,t);var r=Mr(e,e===Me?Oe:0);if(r===0)n!==null&&ss(n),e.callbackNode=null,e.callbackPriority=0;else if(t=r&-r,e.callbackPriority!==t){if(n!=null&&ss(n),t===1)e.tag===0?_d(xu.bind(null,e)):la(xu.bind(null,e)),Sd(function(){(ne&6)===0&&Wt()}),n=null;else{switch(ds(r)){case 1:n=Zl;break;case 4:n=as;break;case 16:n=zr;break;case 536870912:n=us;break;default:n=zr}n=ju(n,vu.bind(null,e))}e.callbackPriority=t,e.callbackNode=n}}function vu(e,t){if(El=-1,Cl=0,(ne&6)!==0)throw Error(d(327));var n=e.callbackNode;if(Fn()&&e.callbackNode!==n)return null;var r=Mr(e,e===Me?Oe:0);if(r===0)return null;if((r&30)!==0||(r&e.expiredLanes)!==0||t)t=Nl(e,r);else{t=r;var l=ne;ne|=2;var i=ku();(Me!==e||Oe!==t)&&(Lt=null,On=ke()+500,un(e,t));do try{Kd();break}catch(s){wu(e,s)}while(!0);Oi(),vl.current=i,ne=l,Ne!==null?t=0:(Me=null,Oe=0,t=Pe)}if(t!==0){if(t===2&&(l=Jl(e),l!==0&&(r=l,t=wo(e,l))),t===1)throw n=wr,un(e,0),Xt(e,r),be(e,ke()),n;if(t===6)Xt(e,r);else{if(l=e.current.alternate,(r&30)===0&&!Qd(l)&&(t=Nl(e,r),t===2&&(i=Jl(e),i!==0&&(r=i,t=wo(e,i))),t===1))throw n=wr,un(e,0),Xt(e,r),be(e,ke()),n;switch(e.finishedWork=l,e.finishedLanes=r,t){case 0:case 1:throw Error(d(345));case 2:cn(e,Ge,Lt);break;case 3:if(Xt(e,r),(r&130023424)===r&&(t=yo+500-ke(),10<t)){if(Mr(e,0)!==0)break;if(l=e.suspendedLanes,(l&r)!==r){He(),e.pingedLanes|=e.suspendedLanes&l;break}e.timeoutHandle=Ni(cn.bind(null,e,Ge,Lt),t);break}cn(e,Ge,Lt);break;case 4:if(Xt(e,r),(r&4194240)===r)break;for(t=e.eventTimes,l=-1;0<r;){var o=31-dt(r);i=1<<o,o=t[o],o>l&&(l=o),r&=~i}if(r=l,r=ke()-r,r=(120>r?120:480>r?480:1080>r?1080:1920>r?1920:3e3>r?3e3:4320>r?4320:1960*Vd(r/1960))-r,10<r){e.timeoutHandle=Ni(cn.bind(null,e,Ge,Lt),r);break}cn(e,Ge,Lt);break;case 5:cn(e,Ge,Lt);break;default:throw Error(d(329))}}}return be(e,ke()),e.callbackNode===n?vu.bind(null,e):null}function wo(e,t){var n=kr;return e.current.memoizedState.isDehydrated&&(un(e,t).flags|=256),e=Nl(e,t),e!==2&&(t=Ge,Ge=n,t!==null&&ko(t)),e}function ko(e){Ge===null?Ge=e:Ge.push.apply(Ge,e)}function Qd(e){for(var t=e;;){if(t.flags&16384){var n=t.updateQueue;if(n!==null&&(n=n.stores,n!==null))for(var r=0;r<n.length;r++){var l=n[r],i=l.getSnapshot;l=l.value;try{if(!ft(i(),l))return!1}catch{return!1}}}if(n=t.child,t.subtreeFlags&16384&&n!==null)n.return=t,t=n;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function Xt(e,t){for(t&=~go,t&=~xl,e.suspendedLanes|=t,e.pingedLanes&=~t,e=e.expirationTimes;0<t;){var n=31-dt(t),r=1<<n;e[n]=-1,t&=~r}}function xu(e){if((ne&6)!==0)throw Error(d(327));Fn();var t=Mr(e,0);if((t&1)===0)return be(e,ke()),null;var n=Nl(e,t);if(e.tag!==0&&n===2){var r=Jl(e);r!==0&&(t=r,n=wo(e,r))}if(n===1)throw n=wr,un(e,0),Xt(e,t),be(e,ke()),n;if(n===6)throw Error(d(345));return e.finishedWork=e.current.alternate,e.finishedLanes=t,cn(e,Ge,Lt),be(e,ke()),null}function So(e,t){var n=ne;ne|=1;try{return e(t)}finally{ne=n,ne===0&&(On=ke()+500,Jr&&Wt())}}function an(e){Yt!==null&&Yt.tag===0&&(ne&6)===0&&Fn();var t=ne;ne|=1;var n=ut.transition,r=se;try{if(ut.transition=null,se=1,e)return e()}finally{se=r,ut.transition=n,ne=t,(ne&6)===0&&Wt()}}function Eo(){lt=In.current,pe(In)}function un(e,t){e.finishedWork=null,e.finishedLanes=0;var n=e.timeoutHandle;if(n!==-1&&(e.timeoutHandle=-1,kd(n)),Ne!==null)for(n=Ne.return;n!==null;){var r=n;switch(Ri(r),r.tag){case 1:r=r.type.childContextTypes,r!=null&&br();break;case 3:Tn(),pe(Ye),pe(Ae),Vi();break;case 5:$i(r);break;case 4:Tn();break;case 13:pe(me);break;case 19:pe(me);break;case 10:Fi(r.type._context);break;case 22:case 23:Eo()}n=n.return}if(Me=e,Ne=e=Gt(e.current,null),Oe=lt=t,Pe=0,wr=null,go=xl=sn=0,Ge=kr=null,rn!==null){for(t=0;t<rn.length;t++)if(n=rn[t],r=n.interleaved,r!==null){n.interleaved=null;var l=r.next,i=n.pending;if(i!==null){var o=i.next;i.next=l,r.next=o}n.pending=r}rn=null}return e}function wu(e,t){do{var n=Ne;try{if(Oi(),al.current=fl,ul){for(var r=ge.memoizedState;r!==null;){var l=r.queue;l!==null&&(l.pending=null),r=r.next}ul=!1}if(on=0,Te=je=ge=null,hr=!1,mr=0,mo.current=null,n===null||n.return===null){Pe=1,wr=t,Ne=null;break}e:{var i=e,o=n.return,s=n,c=t;if(t=Oe,s.flags|=32768,c!==null&&typeof c=="object"&&typeof c.then=="function"){var y=c,k=s,S=k.tag;if((k.mode&1)===0&&(S===0||S===11||S===15)){var w=k.alternate;w?(k.updateQueue=w.updateQueue,k.memoizedState=w.memoizedState,k.lanes=w.lanes):(k.updateQueue=null,k.memoizedState=null)}var T=Qa(o);if(T!==null){T.flags&=-257,Ya(T,o,s,i,t),T.mode&1&&Va(i,y,t),t=T,c=y;var A=t.updateQueue;if(A===null){var U=new Set;U.add(c),t.updateQueue=U}else A.add(c);break e}else{if((t&1)===0){Va(i,y,t),Co();break e}c=Error(d(426))}}else if(he&&s.mode&1){var Se=Qa(o);if(Se!==null){(Se.flags&65536)===0&&(Se.flags|=256),Ya(Se,o,s,i,t),Di(Mn(c,s));break e}}i=c=Mn(c,s),Pe!==4&&(Pe=2),kr===null?kr=[i]:kr.push(i),i=o;do{switch(i.tag){case 3:i.flags|=65536,t&=-t,i.lanes|=t;var h=$a(i,c,t);ma(i,h);break e;case 1:s=c;var f=i.type,m=i.stateNode;if((i.flags&128)===0&&(typeof f.getDerivedStateFromError=="function"||m!==null&&typeof m.componentDidCatch=="function"&&(Qt===null||!Qt.has(m)))){i.flags|=65536,t&=-t,i.lanes|=t;var E=Ha(i,s,t);ma(i,E);break e}}i=i.return}while(i!==null)}Eu(n)}catch(W){t=W,Ne===n&&n!==null&&(Ne=n=n.return);continue}break}while(!0)}function ku(){var e=vl.current;return vl.current=fl,e===null?fl:e}function Co(){(Pe===0||Pe===3||Pe===2)&&(Pe=4),Me===null||(sn&268435455)===0&&(xl&268435455)===0||Xt(Me,Oe)}function Nl(e,t){var n=ne;ne|=2;var r=ku();(Me!==e||Oe!==t)&&(Lt=null,un(e,t));do try{Yd();break}catch(l){wu(e,l)}while(!0);if(Oi(),ne=n,vl.current=r,Ne!==null)throw Error(d(261));return Me=null,Oe=0,Pe}function Yd(){for(;Ne!==null;)Su(Ne)}function Kd(){for(;Ne!==null&&!vc();)Su(Ne)}function Su(e){var t=_u(e.alternate,e,lt);e.memoizedProps=e.pendingProps,t===null?Eu(e):Ne=t,mo.current=null}function Eu(e){var t=e;do{var n=t.alternate;if(e=t.return,(t.flags&32768)===0){if(n=Ud(n,t,lt),n!==null){Ne=n;return}}else{if(n=Bd(n,t),n!==null){n.flags&=32767,Ne=n;return}if(e!==null)e.flags|=32768,e.subtreeFlags=0,e.deletions=null;else{Pe=6,Ne=null;return}}if(t=t.sibling,t!==null){Ne=t;return}Ne=t=e}while(t!==null);Pe===0&&(Pe=5)}function cn(e,t,n){var r=se,l=ut.transition;try{ut.transition=null,se=1,Xd(e,t,n,r)}finally{ut.transition=l,se=r}return null}function Xd(e,t,n,r){do Fn();while(Yt!==null);if((ne&6)!==0)throw Error(d(327));n=e.finishedWork;var l=e.finishedLanes;if(n===null)return null;if(e.finishedWork=null,e.finishedLanes=0,n===e.current)throw Error(d(177));e.callbackNode=null,e.callbackPriority=0;var i=n.lanes|n.childLanes;if(Pc(e,i),e===Me&&(Ne=Me=null,Oe=0),(n.subtreeFlags&2064)===0&&(n.flags&2064)===0||kl||(kl=!0,ju(zr,function(){return Fn(),null})),i=(n.flags&15990)!==0,(n.subtreeFlags&15990)!==0||i){i=ut.transition,ut.transition=null;var o=se;se=1;var s=ne;ne|=4,mo.current=null,$d(e,n),pu(n,e),hd(Ei),Or=!!Si,Ei=Si=null,e.current=n,Hd(n),xc(),ne=s,se=o,ut.transition=i}else e.current=n;if(kl&&(kl=!1,Yt=e,Sl=l),i=e.pendingLanes,i===0&&(Qt=null),Sc(n.stateNode),be(e,ke()),t!==null)for(r=e.onRecoverableError,n=0;n<t.length;n++)l=t[n],r(l.value,{componentStack:l.stack,digest:l.digest});if(wl)throw wl=!1,e=vo,vo=null,e;return(Sl&1)!==0&&e.tag!==0&&Fn(),i=e.pendingLanes,(i&1)!==0?e===xo?Sr++:(Sr=0,xo=e):Sr=0,Wt(),null}function Fn(){if(Yt!==null){var e=ds(Sl),t=ut.transition,n=se;try{if(ut.transition=null,se=16>e?16:e,Yt===null)var r=!1;else{if(e=Yt,Yt=null,Sl=0,(ne&6)!==0)throw Error(d(331));var l=ne;for(ne|=4,O=e.current;O!==null;){var i=O,o=i.child;if((O.flags&16)!==0){var s=i.deletions;if(s!==null){for(var c=0;c<s.length;c++){var y=s[c];for(O=y;O!==null;){var k=O;switch(k.tag){case 0:case 11:case 15:xr(8,k,i)}var S=k.child;if(S!==null)S.return=k,O=S;else for(;O!==null;){k=O;var w=k.sibling,T=k.return;if(au(k),k===y){O=null;break}if(w!==null){w.return=T,O=w;break}O=T}}}var A=i.alternate;if(A!==null){var U=A.child;if(U!==null){A.child=null;do{var Se=U.sibling;U.sibling=null,U=Se}while(U!==null)}}O=i}}if((i.subtreeFlags&2064)!==0&&o!==null)o.return=i,O=o;else e:for(;O!==null;){if(i=O,(i.flags&2048)!==0)switch(i.tag){case 0:case 11:case 15:xr(9,i,i.return)}var h=i.sibling;if(h!==null){h.return=i.return,O=h;break e}O=i.return}}var f=e.current;for(O=f;O!==null;){o=O;var m=o.child;if((o.subtreeFlags&2064)!==0&&m!==null)m.return=o,O=m;else e:for(o=f;O!==null;){if(s=O,(s.flags&2048)!==0)try{switch(s.tag){case 0:case 11:case 15:yl(9,s)}}catch(W){xe(s,s.return,W)}if(s===o){O=null;break e}var E=s.sibling;if(E!==null){E.return=s.return,O=E;break e}O=s.return}}if(ne=l,Wt(),vt&&typeof vt.onPostCommitFiberRoot=="function")try{vt.onPostCommitFiberRoot(Lr,e)}catch{}r=!0}return r}finally{se=n,ut.transition=t}}return!1}function Cu(e,t,n){t=Mn(n,t),t=$a(e,t,1),e=Ht(e,t,1),t=He(),e!==null&&(Yn(e,1,t),be(e,t))}function xe(e,t,n){if(e.tag===3)Cu(e,e,n);else for(;t!==null;){if(t.tag===3){Cu(t,e,n);break}else if(t.tag===1){var r=t.stateNode;if(typeof t.type.getDerivedStateFromError=="function"||typeof r.componentDidCatch=="function"&&(Qt===null||!Qt.has(r))){e=Mn(n,e),e=Ha(t,e,1),t=Ht(t,e,1),e=He(),t!==null&&(Yn(t,1,e),be(t,e));break}}t=t.return}}function Gd(e,t,n){var r=e.pingCache;r!==null&&r.delete(t),t=He(),e.pingedLanes|=e.suspendedLanes&n,Me===e&&(Oe&n)===n&&(Pe===4||Pe===3&&(Oe&130023424)===Oe&&500>ke()-yo?un(e,0):go|=n),be(e,t)}function Nu(e,t){t===0&&((e.mode&1)===0?t=1:(t=Tr,Tr<<=1,(Tr&130023424)===0&&(Tr=4194304)));var n=He();e=jt(e,t),e!==null&&(Yn(e,t,n),be(e,n))}function bd(e){var t=e.memoizedState,n=0;t!==null&&(n=t.retryLane),Nu(e,n)}function Zd(e,t){var n=0;switch(e.tag){case 13:var r=e.stateNode,l=e.memoizedState;l!==null&&(n=l.retryLane);break;case 19:r=e.stateNode;break;default:throw Error(d(314))}r!==null&&r.delete(t),Nu(e,n)}var _u;_u=function(e,t,n){if(e!==null)if(e.memoizedProps!==t.pendingProps||Ye.current)Xe=!0;else{if((e.lanes&n)===0&&(t.flags&128)===0)return Xe=!1,Ad(e,t,n);Xe=(e.flags&131072)!==0}else Xe=!1,he&&(t.flags&1048576)!==0&&ia(t,el,t.index);switch(t.lanes=0,t.tag){case 2:var r=t.type;ml(e,t),e=t.pendingProps;var l=Nn(t,Ae.current);Rn(t,n),l=Ki(null,t,r,e,l,n);var i=Xi();return t.flags|=1,typeof l=="object"&&l!==null&&typeof l.render=="function"&&l.$$typeof===void 0?(t.tag=1,t.memoizedState=null,t.updateQueue=null,Ke(r)?(i=!0,Zr(t)):i=!1,t.memoizedState=l.state!==null&&l.state!==void 0?l.state:null,Bi(t),l.updater=pl,t.stateNode=l,l._reactInternals=t,eo(t,r,e,n),t=lo(null,t,r,!0,i,n)):(t.tag=0,he&&i&&Li(t),$e(null,t,l,n),t=t.child),t;case 16:r=t.elementType;e:{switch(ml(e,t),e=t.pendingProps,l=r._init,r=l(r._payload),t.type=r,l=t.tag=qd(r),e=ht(r,e),l){case 0:t=ro(null,t,r,e,n);break e;case 1:t=Ja(null,t,r,e,n);break e;case 11:t=Ka(null,t,r,e,n);break e;case 14:t=Xa(null,t,r,ht(r.type,e),n);break e}throw Error(d(306,r,""))}return t;case 0:return r=t.type,l=t.pendingProps,l=t.elementType===r?l:ht(r,l),ro(e,t,r,l,n);case 1:return r=t.type,l=t.pendingProps,l=t.elementType===r?l:ht(r,l),Ja(e,t,r,l,n);case 3:e:{if(qa(t),e===null)throw Error(d(387));r=t.pendingProps,i=t.memoizedState,l=i.element,ha(e,t),ol(t,r,null,n);var o=t.memoizedState;if(r=o.element,i.isDehydrated)if(i={element:r,isDehydrated:!1,cache:o.cache,pendingSuspenseBoundaries:o.pendingSuspenseBoundaries,transitions:o.transitions},t.updateQueue.baseState=i,t.memoizedState=i,t.flags&256){l=Mn(Error(d(423)),t),t=eu(e,t,r,n,l);break e}else if(r!==l){l=Mn(Error(d(424)),t),t=eu(e,t,r,n,l);break e}else for(rt=At(t.stateNode.containerInfo.firstChild),nt=t,he=!0,pt=null,n=fa(t,null,r,n),t.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling;else{if(Pn(),r===l){t=zt(e,t,n);break e}$e(e,t,r,n)}t=t.child}return t;case 5:return ya(t),e===null&&Mi(t),r=t.type,l=t.pendingProps,i=e!==null?e.memoizedProps:null,o=l.children,Ci(r,l)?o=null:i!==null&&Ci(r,i)&&(t.flags|=32),Za(e,t),$e(e,t,o,n),t.child;case 6:return e===null&&Mi(t),null;case 13:return tu(e,t,n);case 4:return Wi(t,t.stateNode.containerInfo),r=t.pendingProps,e===null?t.child=zn(t,null,r,n):$e(e,t,r,n),t.child;case 11:return r=t.type,l=t.pendingProps,l=t.elementType===r?l:ht(r,l),Ka(e,t,r,l,n);case 7:return $e(e,t,t.pendingProps,n),t.child;case 8:return $e(e,t,t.pendingProps.children,n),t.child;case 12:return $e(e,t,t.pendingProps.children,n),t.child;case 10:e:{if(r=t.type._context,l=t.pendingProps,i=t.memoizedProps,o=l.value,ce(rl,r._currentValue),r._currentValue=o,i!==null)if(ft(i.value,o)){if(i.children===l.children&&!Ye.current){t=zt(e,t,n);break e}}else for(i=t.child,i!==null&&(i.return=t);i!==null;){var s=i.dependencies;if(s!==null){o=i.child;for(var c=s.firstContext;c!==null;){if(c.context===r){if(i.tag===1){c=Pt(-1,n&-n),c.tag=2;var y=i.updateQueue;if(y!==null){y=y.shared;var k=y.pending;k===null?c.next=c:(c.next=k.next,k.next=c),y.pending=c}}i.lanes|=n,c=i.alternate,c!==null&&(c.lanes|=n),Ai(i.return,n,t),s.lanes|=n;break}c=c.next}}else if(i.tag===10)o=i.type===t.type?null:i.child;else if(i.tag===18){if(o=i.return,o===null)throw Error(d(341));o.lanes|=n,s=o.alternate,s!==null&&(s.lanes|=n),Ai(o,n,t),o=i.sibling}else o=i.child;if(o!==null)o.return=i;else for(o=i;o!==null;){if(o===t){o=null;break}if(i=o.sibling,i!==null){i.return=o.return,o=i;break}o=o.return}i=o}$e(e,t,l.children,n),t=t.child}return t;case 9:return l=t.type,r=t.pendingProps.children,Rn(t,n),l=st(l),r=r(l),t.flags|=1,$e(e,t,r,n),t.child;case 14:return r=t.type,l=ht(r,t.pendingProps),l=ht(r.type,l),Xa(e,t,r,l,n);case 15:return Ga(e,t,t.type,t.pendingProps,n);case 17:return r=t.type,l=t.pendingProps,l=t.elementType===r?l:ht(r,l),ml(e,t),t.tag=1,Ke(r)?(e=!0,Zr(t)):e=!1,Rn(t,n),Ba(t,r,l),eo(t,r,l,n),lo(null,t,r,!0,e,n);case 19:return ru(e,t,n);case 22:return ba(e,t,n)}throw Error(d(156,t.tag))};function ju(e,t){return os(e,t)}function Jd(e,t,n,r){this.tag=e,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function ct(e,t,n,r){return new Jd(e,t,n,r)}function No(e){return e=e.prototype,!(!e||!e.isReactComponent)}function qd(e){if(typeof e=="function")return No(e)?1:0;if(e!=null){if(e=e.$$typeof,e===Ve)return 11;if(e===Qe)return 14}return 2}function Gt(e,t){var n=e.alternate;return n===null?(n=ct(e.tag,t,e.key,e.mode),n.elementType=e.elementType,n.type=e.type,n.stateNode=e.stateNode,n.alternate=e,e.alternate=n):(n.pendingProps=t,n.type=e.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=e.flags&14680064,n.childLanes=e.childLanes,n.lanes=e.lanes,n.child=e.child,n.memoizedProps=e.memoizedProps,n.memoizedState=e.memoizedState,n.updateQueue=e.updateQueue,t=e.dependencies,n.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},n.sibling=e.sibling,n.index=e.index,n.ref=e.ref,n}function _l(e,t,n,r,l,i){var o=2;if(r=e,typeof e=="function")No(e)&&(o=1);else if(typeof e=="string")o=5;else e:switch(e){case ae:return dn(n.children,l,i,t);case ze:o=8,l|=8;break;case Ee:return e=ct(12,n,t,l|2),e.elementType=Ee,e.lanes=i,e;case Le:return e=ct(13,n,t,l),e.elementType=Le,e.lanes=i,e;case Re:return e=ct(19,n,t,l),e.elementType=Re,e.lanes=i,e;case ue:return jl(n,l,i,t);default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case Fe:o=10;break e;case qe:o=9;break e;case Ve:o=11;break e;case Qe:o=14;break e;case Ce:o=16,r=null;break e}throw Error(d(130,e==null?e:typeof e,""))}return t=ct(o,n,t,l),t.elementType=e,t.type=r,t.lanes=i,t}function dn(e,t,n,r){return e=ct(7,e,r,t),e.lanes=n,e}function jl(e,t,n,r){return e=ct(22,e,r,t),e.elementType=ue,e.lanes=n,e.stateNode={isHidden:!1},e}function _o(e,t,n){return e=ct(6,e,null,t),e.lanes=n,e}function jo(e,t,n){return t=ct(4,e.children!==null?e.children:[],e.key,t),t.lanes=n,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}function ef(e,t,n,r,l){this.tag=t,this.containerInfo=e,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=ql(0),this.expirationTimes=ql(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=ql(0),this.identifierPrefix=r,this.onRecoverableError=l,this.mutableSourceEagerHydrationData=null}function Po(e,t,n,r,l,i,o,s,c){return e=new ef(e,t,n,s,c),t===1?(t=1,i===!0&&(t|=8)):t=0,i=ct(3,null,null,t),e.current=i,i.stateNode=e,i.memoizedState={element:r,isDehydrated:n,cache:null,transitions:null,pendingSuspenseBoundaries:null},Bi(i),e}function tf(e,t,n){var r=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:we,key:r==null?null:""+r,children:e,containerInfo:t,implementation:n}}function Pu(e){if(!e)return Bt;e=e._reactInternals;e:{if(Jt(e)!==e||e.tag!==1)throw Error(d(170));var t=e;do{switch(t.tag){case 3:t=t.stateNode.context;break e;case 1:if(Ke(t.type)){t=t.stateNode.__reactInternalMemoizedMergedChildContext;break e}}t=t.return}while(t!==null);throw Error(d(171))}if(e.tag===1){var n=e.type;if(Ke(n))return na(e,n,t)}return t}function zu(e,t,n,r,l,i,o,s,c){return e=Po(n,r,!0,e,l,i,o,s,c),e.context=Pu(null),n=e.current,r=He(),l=Kt(n),i=Pt(r,l),i.callback=t??null,Ht(n,i,l),e.current.lanes=l,Yn(e,l,r),be(e,r),e}function Pl(e,t,n,r){var l=t.current,i=He(),o=Kt(l);return n=Pu(n),t.context===null?t.context=n:t.pendingContext=n,t=Pt(i,o),t.payload={element:e},r=r===void 0?null:r,r!==null&&(t.callback=r),e=Ht(l,t,o),e!==null&&(yt(e,l,o,i),il(e,l,o)),o}function zl(e){if(e=e.current,!e.child)return null;switch(e.child.tag){case 5:return e.child.stateNode;default:return e.child.stateNode}}function Lu(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var n=e.retryLane;e.retryLane=n!==0&&n<t?n:t}}function zo(e,t){Lu(e,t),(e=e.alternate)&&Lu(e,t)}function nf(){return null}var Ru=typeof reportError=="function"?reportError:function(e){console.error(e)};function Lo(e){this._internalRoot=e}Ll.prototype.render=Lo.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(d(409));Pl(e,t,null,null)},Ll.prototype.unmount=Lo.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;an(function(){Pl(null,e,null,null)}),t[Et]=null}};function Ll(e){this._internalRoot=e}Ll.prototype.unstable_scheduleHydration=function(e){if(e){var t=hs();e={blockedOn:null,target:e,priority:t};for(var n=0;n<It.length&&t!==0&&t<It[n].priority;n++);It.splice(n,0,e),n===0&&ys(e)}};function Ro(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function Rl(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11&&(e.nodeType!==8||e.nodeValue!==" react-mount-point-unstable "))}function Tu(){}function rf(e,t,n,r,l){if(l){if(typeof r=="function"){var i=r;r=function(){var y=zl(o);i.call(y)}}var o=zu(t,r,e,0,null,!1,!1,"",Tu);return e._reactRootContainer=o,e[Et]=o.current,or(e.nodeType===8?e.parentNode:e),an(),o}for(;l=e.lastChild;)e.removeChild(l);if(typeof r=="function"){var s=r;r=function(){var y=zl(c);s.call(y)}}var c=Po(e,0,!1,null,null,!1,!1,"",Tu);return e._reactRootContainer=c,e[Et]=c.current,or(e.nodeType===8?e.parentNode:e),an(function(){Pl(t,c,n,r)}),c}function Tl(e,t,n,r,l){var i=n._reactRootContainer;if(i){var o=i;if(typeof l=="function"){var s=l;l=function(){var c=zl(o);s.call(c)}}Pl(t,o,e,l)}else o=rf(n,t,e,l,r);return zl(o)}fs=function(e){switch(e.tag){case 3:var t=e.stateNode;if(t.current.memoizedState.isDehydrated){var n=Qn(t.pendingLanes);n!==0&&(ei(t,n|1),be(t,ke()),(ne&6)===0&&(On=ke()+500,Wt()))}break;case 13:an(function(){var r=jt(e,1);if(r!==null){var l=He();yt(r,e,1,l)}}),zo(e,1)}},ti=function(e){if(e.tag===13){var t=jt(e,134217728);if(t!==null){var n=He();yt(t,e,134217728,n)}zo(e,134217728)}},ps=function(e){if(e.tag===13){var t=Kt(e),n=jt(e,t);if(n!==null){var r=He();yt(n,e,t,r)}zo(e,t)}},hs=function(){return se},ms=function(e,t){var n=se;try{return se=e,t()}finally{se=n}},Kl=function(e,t,n){switch(t){case"input":if(Ul(e,n),t=n.name,n.type==="radio"&&t!=null){for(n=e;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll("input[name="+JSON.stringify(""+t)+'][type="radio"]'),t=0;t<n.length;t++){var r=n[t];if(r!==e&&r.form===e.form){var l=Gr(r);if(!l)throw Error(d(90));Nr(r),Ul(r,l)}}}break;case"textarea":Vo(e,n);break;case"select":t=n.value,t!=null&&pn(e,!!n.multiple,t,!1)}},qo=So,es=an;var lf={usingClientEntryPoint:!1,Events:[ur,En,Gr,Zo,Jo,So]},Er={findFiberByHostInstance:qt,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},of={bundleType:Er.bundleType,version:Er.version,rendererPackageName:Er.rendererPackageName,rendererConfig:Er.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:te.ReactCurrentDispatcher,findHostInstanceByFiber:function(e){return e=ls(e),e===null?null:e.stateNode},findFiberByHostInstance:Er.findFiberByHostInstance||nf,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var Ml=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Ml.isDisabled&&Ml.supportsFiber)try{Lr=Ml.inject(of),vt=Ml}catch{}}return Ze.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=lf,Ze.createPortal=function(e,t){var n=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!Ro(t))throw Error(d(200));return tf(e,t,null,n)},Ze.createRoot=function(e,t){if(!Ro(e))throw Error(d(299));var n=!1,r="",l=Ru;return t!=null&&(t.unstable_strictMode===!0&&(n=!0),t.identifierPrefix!==void 0&&(r=t.identifierPrefix),t.onRecoverableError!==void 0&&(l=t.onRecoverableError)),t=Po(e,1,!1,null,null,n,!1,r,l),e[Et]=t.current,or(e.nodeType===8?e.parentNode:e),new Lo(t)},Ze.findDOMNode=function(e){if(e==null)return null;if(e.nodeType===1)return e;var t=e._reactInternals;if(t===void 0)throw typeof e.render=="function"?Error(d(188)):(e=Object.keys(e).join(","),Error(d(268,e)));return e=ls(t),e=e===null?null:e.stateNode,e},Ze.flushSync=function(e){return an(e)},Ze.hydrate=function(e,t,n){if(!Rl(t))throw Error(d(200));return Tl(null,e,t,!0,n)},Ze.hydrateRoot=function(e,t,n){if(!Ro(e))throw Error(d(405));var r=n!=null&&n.hydratedSources||null,l=!1,i="",o=Ru;if(n!=null&&(n.unstable_strictMode===!0&&(l=!0),n.identifierPrefix!==void 0&&(i=n.identifierPrefix),n.onRecoverableError!==void 0&&(o=n.onRecoverableError)),t=zu(t,null,e,1,n??null,l,!1,i,o),e[Et]=t.current,or(e),r)for(e=0;e<r.length;e++)n=r[e],l=n._getVersion,l=l(n._source),t.mutableSourceEagerHydrationData==null?t.mutableSourceEagerHydrationData=[n,l]:t.mutableSourceEagerHydrationData.push(n,l);return new Ll(t)},Ze.render=function(e,t,n){if(!Rl(t))throw Error(d(200));return Tl(null,e,t,!1,n)},Ze.unmountComponentAtNode=function(e){if(!Rl(e))throw Error(d(40));return e._reactRootContainer?(an(function(){Tl(null,null,e,!1,function(){e._reactRootContainer=null,e[Et]=null})}),!0):!1},Ze.unstable_batchedUpdates=So,Ze.unstable_renderSubtreeIntoContainer=function(e,t,n,r){if(!Rl(n))throw Error(d(200));if(e==null||e._reactInternals===void 0)throw Error(d(38));return Tl(e,t,n,!1,r)},Ze.version="18.3.1-next-f1338f8080-20240426",Ze}var Bu;function hf(){if(Bu)return Do.exports;Bu=1;function a(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(a)}catch(v){console.error(v)}}return a(),Do.exports=pf(),Do.exports}var Wu;function mf(){if(Wu)return Dl;Wu=1;var a=hf();return Dl.createRoot=a.createRoot,Dl.hydrateRoot=a.hydrateRoot,Dl}var gf=mf(),F=Uo();/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const yf=a=>a.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),vf=a=>a.replace(/^([A-Z])|[\s-_]+(\w)/g,(v,d,N)=>N?N.toUpperCase():d.toLowerCase()),$u=a=>{const v=vf(a);return v.charAt(0).toUpperCase()+v.slice(1)},tc=(...a)=>a.filter((v,d,N)=>!!v&&v.trim()!==""&&N.indexOf(v)===d).join(" ").trim();/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var xf={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const wf=F.forwardRef(({color:a="currentColor",size:v=24,strokeWidth:d=2,absoluteStrokeWidth:N,className:j="",children:H,iconNode:K,...Y},D)=>F.createElement("svg",{ref:D,...xf,width:v,height:v,stroke:a,strokeWidth:N?Number(d)*24/Number(v):d,className:tc("lucide",j),...Y},[...K.map(([L,P])=>F.createElement(L,P)),...Array.isArray(H)?H:[H]]));/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Je=(a,v)=>{const d=F.forwardRef(({className:N,...j},H)=>F.createElement(wf,{ref:H,iconNode:v,className:tc(`lucide-${yf($u(a))}`,`lucide-${a}`,N),...j}));return d.displayName=$u(a),d};/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const kf=[["path",{d:"m12 19-7-7 7-7",key:"1l729n"}],["path",{d:"M19 12H5",key:"x3x0zl"}]],Sf=Je("arrow-left",kf);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ef=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["line",{x1:"12",x2:"12",y1:"8",y2:"12",key:"1pkeuh"}],["line",{x1:"12",x2:"12.01",y1:"16",y2:"16",key:"4dfq90"}]],Cf=Je("circle-alert",Ef);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Nf=[["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",key:"ih7n3h"}],["polyline",{points:"7 10 12 15 17 10",key:"2ggqvy"}],["line",{x1:"12",x2:"12",y1:"15",y2:"3",key:"1vk2je"}]],_f=Je("download",Nf);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const jf=[["path",{d:"M16 5h6",key:"1vod17"}],["path",{d:"M19 2v6",key:"4bpg5p"}],["path",{d:"M21 11.5V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7.5",key:"1ue2ih"}],["path",{d:"m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21",key:"1xmnt7"}],["circle",{cx:"9",cy:"9",r:"2",key:"af1f0g"}]],Pf=Je("image-plus",jf);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const zf=[["path",{d:"M21 12a9 9 0 1 1-6.219-8.56",key:"13zald"}]],Lf=Je("loader-circle",zf);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Rf=[["rect",{width:"18",height:"11",x:"3",y:"11",rx:"2",ry:"2",key:"1w4ew1"}],["path",{d:"M7 11V7a5 5 0 0 1 9.9-1",key:"1mm8w8"}]],Tf=Je("lock-open",Rf);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Mf=[["rect",{width:"18",height:"11",x:"3",y:"11",rx:"2",ry:"2",key:"1w4ew1"}],["path",{d:"M7 11V7a5 5 0 0 1 10 0v4",key:"fwvmzm"}]],Df=Je("lock",Mf);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const If=[["path",{d:"M21.3 15.3a2.4 2.4 0 0 1 0 3.4l-2.6 2.6a2.4 2.4 0 0 1-3.4 0L2.7 8.7a2.41 2.41 0 0 1 0-3.4l2.6-2.6a2.41 2.41 0 0 1 3.4 0Z",key:"icamh8"}],["path",{d:"m14.5 12.5 2-2",key:"inckbg"}],["path",{d:"m11.5 9.5 2-2",key:"fmmyf7"}],["path",{d:"m8.5 6.5 2-2",key:"vc6u1g"}],["path",{d:"m17.5 15.5 2-2",key:"wo5hmg"}]],Of=Je("ruler",If);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ff=[["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}],["path",{d:"m21 21-4.3-4.3",key:"1qie3q"}]],Af=Je("search",Ff);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Uf=[["path",{d:"M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z",key:"4pj2yx"}],["path",{d:"M20 3v4",key:"1olli1"}],["path",{d:"M22 5h-4",key:"1gvqau"}],["path",{d:"M4 17v2",key:"vumght"}],["path",{d:"M5 18H3",key:"zchphs"}]],Bf=Je("sparkles",Uf);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Wf=[["path",{d:"M3 6h18",key:"d0wm0j"}],["path",{d:"M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6",key:"4alrt4"}],["path",{d:"M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2",key:"v07s0e"}],["line",{x1:"10",x2:"10",y1:"11",y2:"17",key:"1uufr5"}],["line",{x1:"14",x2:"14",y1:"11",y2:"17",key:"xtxkd"}]],$f=Je("trash-2",Wf);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Hf=[["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",key:"ih7n3h"}],["polyline",{points:"17 8 12 3 7 8",key:"t8dd8p"}],["line",{x1:"12",x2:"12",y1:"3",y2:"15",key:"widbto"}]],Vf=Je("upload",Hf);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Qf=[["circle",{cx:"12",cy:"5",r:"3",key:"rqqgnr"}],["path",{d:"M6.5 8a2 2 0 0 0-1.905 1.46L2.1 18.5A2 2 0 0 0 4 21h16a2 2 0 0 0 1.925-2.54L19.4 9.5A2 2 0 0 0 17.48 8Z",key:"56o5sh"}]],Yf=Je("weight",Qf);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Kf=[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]],nc=Je("x",Kf),rc="https://secure-steg-backend.onrender.com".replace(/\/$/,"")??"https://secure-steg-backend.onrender.com";class fn extends Error{constructor(v,d){super(v),this.name="SecureStegApiError",this.status=d}}async function lc(a){let v="";try{v=(await a.text()).trim()}catch{}return a.status===400?new fn(v&&v.length<200?v:"That request wasn't valid. Please check your image, message, and key.",a.status):a.status===413?new fn("That image is too large to upload.",a.status):a.status>=500?new fn("The server ran into a problem processing your request. Please try again.",a.status):new fn("Something went wrong talking to the server. Please try again.",a.status)}async function Xf(a,v,d){const N=new FormData;N.append("imageFile",a),N.append("message",v),N.append("key",d);let j;try{j=await fetch(`${rc}/api/steg/hide`,{method:"POST",body:N})}catch{throw new fn("Couldn't reach the server. Is the backend running?")}if(!j.ok)throw await lc(j);return j.blob()}async function Gf(a,v){const d=new FormData;d.append("imageFile",a),d.append("key",v);let N;try{N=await fetch(`${rc}/api/steg/reveal`,{method:"POST",body:d})}catch{throw new fn("Couldn't reach the server. Is the backend running?")}if(!N.ok)throw await lc(N);return N.text()}const bf="/assets/pokemon-pikachu-BM9YRtDm.png",ic="steg-pokedex:collection:v1",oc="steg-pokedex:unread:v1";function Zf(){if(typeof window>"u")return[];try{const a=window.localStorage.getItem(ic);if(!a)return[];const v=JSON.parse(a);return Array.isArray(v)?v:[]}catch{return[]}}function Jf(){if(typeof window>"u")return[];try{const a=window.localStorage.getItem(oc);if(!a)return[];const v=JSON.parse(a);return Array.isArray(v)?v.filter(d=>typeof d=="number"&&Number.isFinite(d)):[]}catch{return[]}}function qf(){const[a,v]=F.useState(Zf),[d,N]=F.useState(Jf);F.useEffect(()=>{try{window.localStorage.setItem(ic,JSON.stringify(a))}catch{}},[a]),F.useEffect(()=>{try{window.localStorage.setItem(oc,JSON.stringify(d))}catch{}},[d]);const j=F.useCallback(D=>{v(L=>L.some(I=>I.id===D.id)?L.map(I=>I.id===D.id?{...I,caughtAt:D.caughtAt,types:D.types.length>0?D.types:I.types,height:D.height>0?D.height:I.height,weight:D.weight>0?D.weight:I.weight,abilities:D.abilities.length>0?D.abilities:I.abilities,stats:D.stats.length>0?D.stats:I.stats,sprite:D.sprite||I.sprite}:I):[...L,D].sort((I,X)=>I.id-X.id)),N(L=>L.includes(D.id)?L:[...L,D.id].sort((P,I)=>P-I))},[]),H=F.useCallback(D=>{N(L=>L.filter(P=>P!==D))},[]),K=F.useCallback(D=>{v(L=>L.map(P=>P.id===D.id?D:P).sort((P,I)=>P.id-I.id))},[]),Y=F.useCallback(D=>{v(L=>L.filter(P=>P.id!==D)),N(L=>L.filter(P=>P!==D))},[]);return{collection:a,addPokemon:j,releasePokemon:Y,unreadIds:d,markPokemonViewed:H,updatePokemon:K}}const ep={normal:"#A8A77A",fire:"#EE8130",water:"#6390F0",electric:"#F7D02C",grass:"#7AC74C",ice:"#96D9D6",fighting:"#C22E28",poison:"#A33EA1",ground:"#E2BF65",flying:"#A98FF3",psychic:"#F95587",bug:"#A6B91A",rock:"#B6A136",ghost:"#735797",dragon:"#6F35FC",dark:"#705746",steel:"#B7B7CE",fairy:"#D685AD"};function Ol(a){return ep[a]??"#94a3b8"}function Rt(a){return a.split("-").map(v=>v.charAt(0).toUpperCase()+v.slice(1)).join(" ")}function tp(a){return`${(a/10).toFixed(1)} m`}function np(a){return`${(a/10).toFixed(1)} kg`}const rp={hp:"HP",attack:"Attack",defense:"Defense","special-attack":"Sp. Atk","special-defense":"Sp. Def",speed:"Speed"},lp=200,ip="https://pokeapi.co/api/v2/pokemon",op=1e4;class An extends Error{constructor(v){super(v),this.name="PokeApiError"}}function sp(a){var d,N;const v=((N=(d=a.sprites.other)==null?void 0:d["official-artwork"])==null?void 0:N.front_default)??a.sprites.front_default??"";return{id:a.id,name:a.name,sprite:v,types:a.types.map(j=>j.type.name),height:a.height,weight:a.weight,abilities:a.abilities.map(j=>j.ability.name),stats:a.stats.map(j=>({name:j.stat.name,value:j.base_stat})),caughtAt:Date.now()}}async function ap(a){const v=new AbortController,d=window.setTimeout(()=>v.abort(),op);try{const N=await fetch(a,{signal:v.signal,headers:{Accept:"application/json"}});if(!N.ok)throw new An(N.status===404?"Pokémon not found.":`Pokédex request failed (${N.status}).`);return await N.json()}catch(N){throw N instanceof An?N:N instanceof DOMException&&N.name==="AbortError"?new An("The Pokédex request timed out. Check your connection."):new An("Couldn't reach the Pokédex. Check your connection.")}finally{window.clearTimeout(d)}}async function up(a){const v=a.trim().toLowerCase().replace(/\s+/g,"-");if(!v)throw new An("Enter a Pokémon name or Pokédex number.");const d=await ap(`${ip}/${encodeURIComponent(v)}`);return sp(d)}const Hu="steg-pokedex:skin",cp="steg-pokedex:skin-change";function dp({open:a,onClose:v,collection:d,onRelease:N,initialSelectedId:j,catalog:H,unreadIds:K,onMarkViewed:Y,onUpdatePokemon:D}){const[L,P]=F.useState(()=>typeof window>"u"?"modern":window.localStorage.getItem(Hu)==="retro"?"retro":"modern"),[I,X]=F.useState(j),le=K.length;F.useEffect(()=>{a&&X(j)},[a,j]),F.useEffect(()=>{try{window.localStorage.setItem(Hu,L)}catch{}window.dispatchEvent(new CustomEvent(cp,{detail:{skin:L}}))},[L]),F.useEffect(()=>{if(!a)return;const oe=ye=>{ye.key==="Escape"&&(I!==null?X(null):v())};return window.addEventListener("keydown",oe),()=>{window.removeEventListener("keydown",oe)}},[a,v,I]);const de=F.useMemo(()=>d.find(oe=>oe.id===I)??null,[d,I]),q=oe=>{X(oe),Y(oe)},G=oe=>{N(oe),X(null)};if(!a)return null;const Z=L==="retro";return u.jsxs("div",{className:"fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4",style:{background:"rgba(15, 23, 42, 0.42)",backdropFilter:"blur(7px)",WebkitBackdropFilter:"blur(7px)",animation:"dexBackdropIn 0.18s ease-out",overscrollBehavior:"contain"},onClick:v,role:"presentation",children:[u.jsx("style",{children:`
        @keyframes dexBackdropIn {
          from {
            opacity: 0;
          }

          to {
            opacity: 1;
          }
        }

        @keyframes dexPanelIn {
          from {
            opacity: 0;
            transform:
              translateY(16px)
              scale(0.97);
          }

          to {
            opacity: 1;
            transform:
              translateY(0)
              scale(1);
          }
        }

        @keyframes dexCardIn {
          from {
            opacity: 0;
            transform:
              translateY(7px)
              scale(0.98);
          }

          to {
            opacity: 1;
            transform:
              translateY(0)
              scale(1);
          }
        }

        @keyframes dexDotPulse {
          0%,
          100% {
            transform: scale(1);
            box-shadow:
              0 0 0
              rgba(239,68,68,0.15);
          }

          50% {
            transform: scale(1.12);
            box-shadow:
              0 0 9px
              rgba(239,68,68,0.4);
          }
        }

        .dex-skin-btn {
          transition:
            background 0.15s ease,
            color 0.15s ease,
            box-shadow 0.15s ease;
        }

        .dex-thumb {
          position: relative;
          transition:
            transform 0.15s ease,
            box-shadow 0.15s ease,
            border-color 0.15s ease;
          animation:
            dexCardIn 0.22s ease-out both;
        }

        .dex-thumb:hover {
          transform: translateY(-3px);
        }

        .dex-thumb:active {
          transform: translateY(-1px) scale(0.985);
        }

        .dex-unread-dot {
          position: absolute;
          top: 7px;
          right: 7px;
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: #ef4444;
          border: 2px solid rgba(255,255,255,0.96);
          z-index: 5;
          pointer-events: none;
          animation:
            dexDotPulse 1.7s ease-in-out infinite;
        }

        .dex-scroll {
          overscroll-behavior: contain;
          scrollbar-width: thin;
          scrollbar-color:
            rgba(148,163,184,0.45)
            transparent;
        }

        .dex-scroll::-webkit-scrollbar {
          width: 7px;
        }

        .dex-scroll::-webkit-scrollbar-thumb {
          background:
            rgba(148,163,184,0.4);
          border-radius: 8px;
        }

        .dex-stat-fill {
          transition:
            width 0.5s
            cubic-bezier(
              0.34,
              1.56,
              0.64,
              1
            );
        }

        .dex-led {
          animation:
            dexBlink
            2.6s
            ease-in-out
            infinite;
        }

        @keyframes dexBlink {
          0%,
          88%,
          100% {
            opacity: 1;
          }

          92% {
            opacity: 0.35;
          }
        }

        @media (max-width: 480px) {
          .dex-mobile-panel {
            max-height:
              min(92dvh, 760px) !important;
            border-radius:
              24px !important;
          }

          .dex-mobile-header {
            padding:
              12px 13px !important;
          }

          .dex-mobile-grid {
            grid-template-columns:
              repeat(2, minmax(0, 1fr))
            !important;
            gap: 8px !important;
          }

          .dex-mobile-body {
            max-height:
              calc(
                min(92dvh, 760px) -
                60px
              ) !important;
          }

          .dex-mobile-detail {
            padding-left: 0 !important;
            padding-right: 0 !important;
          }
        }

        @media (min-width: 481px) {
          .dex-grid {
            grid-template-columns:
              repeat(3, minmax(0, 1fr));
          }
        }
      `}),u.jsxs("div",{className:"dex-mobile-panel w-full max-w-md rounded-[28px] overflow-hidden",style:{animation:"dexPanelIn 0.22s cubic-bezier(0.16, 1, 0.3, 1)",maxHeight:"min(720px, 88dvh)",...Z?{background:"linear-gradient(155deg, #ef4444 0%, #dc2626 55%, #b91c1c 100%)",border:"1px solid rgba(0,0,0,0.15)",boxShadow:"0 24px 60px rgba(185,28,28,0.35), inset 0 1px 0 rgba(255,255,255,0.25)"}:{background:"rgba(255,255,255,0.65)",backdropFilter:"blur(28px)",WebkitBackdropFilter:"blur(28px)",border:"1px solid rgba(255,255,255,0.85)",boxShadow:"0 24px 60px rgba(100,130,200,0.22)"}},onClick:oe=>oe.stopPropagation(),role:"dialog","aria-modal":"true","aria-label":"Pokédex",children:[u.jsxs("div",{className:"dex-mobile-header flex items-center justify-between gap-2.5 px-5 py-4",style:Z?{background:"rgba(0,0,0,0.12)",borderBottom:"1px solid rgba(0,0,0,0.15)"}:{borderBottom:"1px solid rgba(30,41,59,0.08)"},children:[u.jsxs("div",{className:"flex items-center gap-2.5 min-w-0",children:[Z&&u.jsx("span",{className:"dex-led rounded-full shrink-0",style:{width:12,height:12,background:"#38bdf8",boxShadow:"0 0 10px 2px rgba(56,189,248,0.85)"}}),u.jsx("h2",{className:"text-lg font-semibold tracking-tight",style:{color:Z?"#fff7ed":"#1e293b",fontFamily:"'Outfit', sans-serif"},children:"Pokédex"}),u.jsxs("span",{className:"text-[11px] sm:text-xs font-semibold rounded-full px-2 py-0.5 shrink-0",style:{background:Z?"rgba(255,255,255,0.18)":le>0?"rgba(239,68,68,0.11)":"rgba(30,41,59,0.08)",color:Z?"#fff7ed":le>0?"#dc2626":"#64748b"},children:[le," ","new"]})]}),u.jsxs("div",{className:"flex items-center gap-1.5 shrink-0",children:[u.jsxs("div",{className:"flex items-center rounded-full p-0.5 text-[11px] font-medium",style:{background:Z?"rgba(0,0,0,0.18)":"rgba(30,41,59,0.06)"},children:[u.jsx("button",{type:"button",onClick:()=>P("retro"),className:"dex-skin-btn rounded-full px-2.5 py-1","aria-pressed":Z,style:{background:Z?"rgba(255,255,255,0.22)":"transparent",color:Z?"#fff7ed":"#94a3b8"},children:"Retro"}),u.jsx("button",{type:"button",onClick:()=>P("modern"),className:"dex-skin-btn rounded-full px-2.5 py-1","aria-pressed":!Z,style:{background:Z?"transparent":"rgba(255,255,255,0.9)",color:Z?"rgba(255,247,237,0.75)":"#1e293b"},children:"Modern"})]}),u.jsx("button",{type:"button",onClick:v,"aria-label":"Close Pokédex",className:"rounded-full p-1.5 shrink-0",style:{color:Z?"#fff7ed":"#64748b",background:Z?"rgba(0,0,0,0.18)":"rgba(30,41,59,0.06)"},children:u.jsx(nc,{size:15})})]})]}),u.jsx("div",{className:"dex-mobile-body dex-scroll overflow-y-auto",style:{maxHeight:"calc(min(720px, 88dvh) - 64px)",padding:Z?14:0},children:u.jsx("div",{className:"rounded-2xl",style:{background:Z?"#eaf6e8":"transparent",border:Z?"3px solid rgba(0,0,0,0.2)":"none",minHeight:Z?380:void 0,padding:Z?14:"18px 20px 22px"},children:de?u.jsx(hp,{pokemon:de,isRetro:Z,onBack:()=>X(null),onRelease:()=>G(de.id),onUpdatePokemon:D}):u.jsx(fp,{collection:d,catalog:H,isRetro:Z,unreadIds:K,onSelect:q})})})]})]})}function fp({collection:a,catalog:v,isRetro:d,unreadIds:N,onSelect:j}){const[H,K]=F.useState(""),Y=F.useMemo(()=>{const L=new Map;for(const P of a)L.set(P.id,P);return L},[a]);if(v&&v.length>0){const L=H.trim().toLowerCase(),P=L?v.filter(I=>I.name.toLowerCase().includes(L)||String(I.id).padStart(3,"0").includes(L)||String(I.id).includes(L)):v;return u.jsxs("div",{className:"flex flex-col gap-3",children:[u.jsx(Vu,{isRetro:d,query:H,onChange:K,placeholder:"Search the Pokédex..."}),P.length===0?u.jsx(Qu,{}):u.jsx("div",{className:"dex-grid grid grid-cols-3 gap-2.5 p-1",children:P.map(I=>{const X=Y.get(I.id);return X?u.jsx(Yu,{pokemon:X,isRetro:d,unread:N.includes(I.id),onSelect:j},I.id):u.jsx(pp,{id:I.id,isRetro:d},I.id)})})]})}const D=F.useMemo(()=>{const L=H.trim().toLowerCase();return L?a.filter(P=>P.name.toLowerCase().includes(L)||String(P.id).padStart(3,"0").includes(L)||String(P.id).includes(L)):a},[a,H]);return a.length===0?u.jsxs("div",{className:"flex flex-col items-center justify-center text-center gap-2 py-14 px-4",children:[u.jsx(Bf,{size:26,style:{color:d?"#16a34a":"#94a3b8"}}),u.jsx("p",{className:"text-sm font-medium",style:{color:d?"#166534":"#475569"},children:"Your Pokédex is empty"}),u.jsx("p",{className:"text-xs max-w-[220px]",style:{color:d?"#3f6b3f":"#94a3b8"},children:"Catch Pokémon with the Pokéball, then they'll stay here on this device."})]}):u.jsxs("div",{className:"flex flex-col gap-3",children:[u.jsx(Vu,{isRetro:d,query:H,onChange:K,placeholder:"Search your Pokédex..."}),D.length===0?u.jsx(Qu,{}):u.jsx("div",{className:"dex-grid grid grid-cols-3 gap-2.5 p-1",children:D.map(L=>u.jsx(Yu,{pokemon:L,isRetro:d,unread:N.includes(L.id),onSelect:j},L.id))})]})}function Vu({isRetro:a,query:v,onChange:d,placeholder:N}){return u.jsxs("div",{className:"glass-input flex items-center gap-2 rounded-xl px-3 py-2.5",style:{background:a?"rgba(255,255,255,0.72)":"rgba(255,255,255,0.5)"},children:[u.jsx(Af,{size:14,className:"text-slate-400 shrink-0"}),u.jsx("input",{value:v,onChange:j=>d(j.target.value),placeholder:N,className:"w-full bg-transparent outline-none text-xs text-slate-700 placeholder:text-slate-400",enterKeyHint:"search",autoComplete:"off",spellCheck:!1}),v&&u.jsx("button",{type:"button",onClick:()=>d(""),className:"text-[11px] text-slate-400 hover:text-slate-600 shrink-0","aria-label":"Clear Pokédex search",children:"Clear"})]})}function Qu(){return u.jsxs("div",{className:"py-10 text-center",children:[u.jsx("p",{className:"text-sm font-medium text-slate-600",children:"Nothing matches."}),u.jsx("p",{className:"mt-1 text-xs text-slate-400",children:"Try a name or Pokédex number."})]})}function Yu({pokemon:a,isRetro:v,unread:d,onSelect:N}){const j=Ol(a.types[0]??"normal");return u.jsxs("button",{type:"button",onClick:()=>N(a.id),className:"dex-thumb flex flex-col items-center gap-1 rounded-xl py-2.5 px-1.5",style:{background:v?"rgba(255,255,255,0.7)":"rgba(255,255,255,0.55)",border:d?"1.5px solid rgba(239,68,68,0.55)":`1px solid ${j}33`,boxShadow:d?"0 4px 14px rgba(239,68,68,0.16)":`0 2px 10px ${j}22`},"aria-label":d?`${Rt(a.name)}, newly caught`:Rt(a.name),children:[d&&u.jsx("span",{className:"dex-unread-dot","aria-hidden":"true"}),u.jsx("div",{className:"rounded-full flex items-center justify-center",style:{width:52,height:52,background:`${j}1c`},children:a.sprite?u.jsx("img",{src:a.sprite,alt:a.name,className:"w-11 h-11 object-contain",draggable:!1,onError:H=>{H.currentTarget.onerror=null,H.currentTarget.style.display="none"}}):u.jsx("span",{className:"text-[10px] text-slate-400",children:"?"})}),u.jsxs("span",{className:"text-[10px] font-semibold text-slate-500",children:["#",String(a.id).padStart(3,"0")]}),u.jsx("span",{className:"text-xs font-medium text-slate-700 truncate max-w-full",children:Rt(a.name)}),a.types.length>0&&u.jsx("div",{className:"flex gap-1 mt-0.5",children:a.types.slice(0,2).map(H=>u.jsx("span",{className:"text-[8px] font-semibold rounded-full px-1.5 py-0.5 text-white",style:{background:Ol(H)},children:Rt(H)},H))})]})}function pp({id:a,isRetro:v}){return u.jsxs("div",{className:"flex flex-col items-center gap-1 rounded-xl py-2.5 px-1.5",style:{background:v?"rgba(0,0,0,0.06)":"rgba(30,41,59,0.04)",border:"1px solid rgba(148,163,184,0.25)"},children:[u.jsx("div",{className:"rounded-full flex items-center justify-center",style:{width:52,height:52,background:"rgba(148,163,184,0.18)"},children:u.jsx("span",{className:"text-sm font-semibold text-slate-400",children:"?"})}),u.jsxs("span",{className:"text-[10px] font-semibold text-slate-400",children:["#",String(a).padStart(3,"0")]}),u.jsx("span",{className:"text-xs font-medium text-slate-400",children:"???"})]})}function hp({pokemon:a,isRetro:v,onBack:d,onRelease:N,onUpdatePokemon:j}){const[H,K]=F.useState(!1),[Y,D]=F.useState(null);F.useEffect(()=>{if(a.types.length>0&&a.stats.length>0&&a.abilities.length>0&&a.height>0&&a.weight>0)return;let P=!1;return(async()=>{K(!0),D(null);try{const X=await up(String(a.id));if(P)return;j({...X,caughtAt:a.caughtAt})}catch(X){if(P)return;D(X instanceof An?X.message:"Couldn't load Pokémon details.")}finally{P||K(!1)}})(),()=>{P=!0}},[a.id,a.types.length,a.stats.length,a.abilities.length,a.height,a.weight,a.caughtAt,j]);const L=Ol(a.types[0]??"normal");return u.jsxs("div",{className:"dex-mobile-detail flex flex-col gap-4 px-1",children:[u.jsxs("div",{className:"flex items-center justify-between gap-2",children:[u.jsxs("button",{type:"button",onClick:d,className:"flex items-center gap-1.5 text-xs font-medium rounded-full px-3 py-1.5",style:{color:v?"#166534":"#64748b",background:v?"rgba(0,0,0,0.06)":"rgba(30,41,59,0.06)"},children:[u.jsx(Sf,{size:12}),"Back"]}),u.jsxs("button",{type:"button",onClick:N,className:"flex items-center gap-1.5 text-xs font-medium rounded-full px-3 py-1.5",style:{color:"#dc2626",background:"rgba(220,38,38,0.08)"},children:[u.jsx($f,{size:11}),"Release"]})]}),u.jsxs("div",{className:"flex flex-col items-center gap-2 pt-1",children:[u.jsx("div",{className:"rounded-full flex items-center justify-center",style:{width:"clamp(104px, 32vw, 132px)",height:"clamp(104px, 32vw, 132px)",background:`radial-gradient(circle, ${L}33 0%, ${L}0d 70%, transparent 100%)`},children:a.sprite&&u.jsx("img",{src:a.sprite,alt:a.name,className:"w-[88%] h-[88%] object-contain",style:{filter:"drop-shadow(0 6px 12px rgba(0,0,0,0.18))"},draggable:!1,onError:P=>{P.currentTarget.onerror=null,P.currentTarget.style.display="none"}})}),u.jsxs("span",{className:"text-xs font-semibold text-slate-400",children:["#",String(a.id).padStart(3,"0")]}),u.jsx("h3",{className:"text-xl font-semibold text-slate-800 tracking-tight",children:Rt(a.name)}),a.types.length>0?u.jsx("div",{className:"flex flex-wrap justify-center gap-1.5",children:a.types.map(P=>u.jsx("span",{className:"text-[11px] font-semibold px-2.5 py-1 rounded-full text-white",style:{background:Ol(P)},children:Rt(P)},P))}):u.jsx("span",{className:"text-xs text-slate-400",children:"Type information loading..."})]}),H&&u.jsxs("div",{className:"flex items-center justify-center gap-2 text-xs text-slate-400 rounded-xl px-3 py-2",style:{background:"rgba(30,41,59,0.04)"},children:[u.jsx(Lf,{size:14,className:"animate-spin"}),"Loading Pokémon details..."]}),Y&&u.jsxs("div",{className:"flex items-start gap-2 text-xs rounded-xl px-3 py-2.5",style:{background:"rgba(254,226,226,0.72)",border:"1px solid rgba(248,113,113,0.45)",color:"#991b1b"},children:[u.jsx(Cf,{size:14,className:"mt-0.5 shrink-0"}),u.jsx("span",{children:Y})]}),(a.height>0||a.weight>0)&&u.jsxs("div",{className:"grid grid-cols-2 gap-2.5",children:[a.height>0&&u.jsxs("div",{className:"rounded-xl px-3 py-2.5",style:{background:"rgba(30,41,59,0.045)"},children:[u.jsxs("div",{className:"flex items-center gap-1.5 text-[10px] text-slate-400",children:[u.jsx(Of,{size:12}),"Height"]}),u.jsx("div",{className:"mt-1 text-sm font-semibold text-slate-700",children:tp(a.height)})]}),a.weight>0&&u.jsxs("div",{className:"rounded-xl px-3 py-2.5",style:{background:"rgba(30,41,59,0.045)"},children:[u.jsxs("div",{className:"flex items-center gap-1.5 text-[10px] text-slate-400",children:[u.jsx(Yf,{size:12}),"Weight"]}),u.jsx("div",{className:"mt-1 text-sm font-semibold text-slate-700",children:np(a.weight)})]})]}),a.abilities.length>0&&u.jsxs("div",{className:"rounded-xl px-3 py-3",style:{background:"rgba(30,41,59,0.035)"},children:[u.jsx("div",{className:"text-[10px] font-semibold uppercase tracking-wider text-slate-400",children:"Abilities"}),u.jsx("div",{className:"flex flex-wrap gap-1.5 mt-2",children:a.abilities.map(P=>u.jsx("span",{className:"text-[11px] rounded-full px-2.5 py-1",style:{background:`${L}14`,color:"#475569",border:`1px solid ${L}22`},children:Rt(P)},P))})]}),a.stats.length>0&&u.jsxs("div",{className:"rounded-xl px-3 py-3",style:{background:"rgba(30,41,59,0.035)"},children:[u.jsx("div",{className:"text-[10px] font-semibold uppercase tracking-wider text-slate-400 mb-2.5",children:"Base stats"}),u.jsx("div",{className:"flex flex-col gap-2",children:a.stats.map(P=>u.jsxs("div",{className:"flex items-center gap-2.5",children:[u.jsx("span",{className:"text-[10px] font-medium text-slate-500 w-16 shrink-0",children:rp[P.name]??Rt(P.name)}),u.jsx("div",{className:"flex-1 h-2 rounded-full overflow-hidden",style:{background:"rgba(30,41,59,0.08)"},children:u.jsx("div",{className:"dex-stat-fill h-full rounded-full",style:{width:`${Math.min(100,P.value/lp*100)}%`,background:L}})}),u.jsx("span",{className:"text-[10px] font-semibold text-slate-500 w-7 text-right",children:P.value})]},P.name))})]})]})}const sc="secure-steg-pokemon-mode",ac="steg-pokedex:skin",Ku="steg-pokedex:skin-change",mp=140,gp=68,yp=36,vp=22,xp=5,Xu=40,Gu=60,wp=90,uc={common:{weight:60,catchChance:.92},uncommon:{weight:27,catchChance:.76},rare:{weight:10,catchChance:.48},epic:{weight:3,catchChance:.2}},kp=["Bulbasaur","Ivysaur","Venusaur","Charmander","Charmeleon","Charizard","Squirtle","Wartortle","Blastoise","Caterpie","Metapod","Butterfree","Weedle","Kakuna","Beedrill","Pidgey","Pidgeotto","Pidgeot","Rattata","Raticate","Spearow","Fearow","Ekans","Arbok","Pikachu","Raichu","Sandshrew","Sandslash","Nidoran-f","Nidorina","Nidoqueen","Nidoran-m","Nidorino","Nidoking","Clefairy","Clefable","Vulpix","Ninetales","Jigglypuff","Wigglytuff","Zubat","Golbat","Oddish","Gloom","Vileplume","Paras","Parasect","Venonat","Venomoth","Diglett","Dugtrio","Meowth","Persian","Psyduck","Golduck","Mankey","Primeape","Growlithe","Arcanine","Poliwag","Poliwhirl","Poliwrath","Abra","Kadabra","Alakazam","Machop","Machoke","Machamp","Bellsprout","Weepinbell","Victreebel","Tentacool","Tentacruel","Geodude","Graveler","Golem","Ponyta","Rapidash","Slowpoke","Slowbro","Magnemite","Magneton","Farfetchd","Doduo","Dodrio","Seel","Dewgong","Grimer","Muk","Shellder","Cloyster","Gastly","Haunter","Gengar","Onix","Drowzee","Hypno","Krabby","Kingler","Voltorb","Electrode","Exeggcute","Exeggutor","Cubone","Marowak","Hitmonlee","Hitmonchan","Lickitung","Koffing","Weezing","Rhyhorn","Rhydon","Chansey","Tangela","Kangaskhan","Horsea","Seadra","Goldeen","Seaking","Staryu","Starmie","Mr-mime","Scyther","Jynx","Electabuzz","Magmar","Pinsir","Tauros","Magikarp","Gyarados","Lapras","Ditto","Eevee","Vaporeon","Jolteon","Flareon","Porygon","Omanyte","Omastar","Kabuto","Kabutops","Aerodactyl","Snorlax","Articuno","Zapdos","Moltres","Dratini","Dragonair","Dragonite","Mewtwo","Mew"],Sp=new Set([144,145,146,150,151]),Ep=new Set([3,6,9,31,34,38,59,65,68,80,94,115,121,130,131,134,135,136,143,149]);function Cp(a){return Sp.has(a)?"epic":Ep.has(a)?"rare":a%3===0?"uncommon":"common"}function Np(a){return`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iii/emerald/${a}.png`}function _p(a){return`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${a}.png`}const Fl=kp.map((a,v)=>{const d=v+1;return{id:d,name:a,rarity:Cp(d),cuteSprite:_p(d),pixelSprite:Np(d)}}),jp=Fl.map(a=>({id:a.id,name:a.name})),bu=Fl.flatMap(a=>Array.from({length:uc[a.rarity].weight},()=>a));function Pp(){return Fl[Math.floor(Math.random()*Fl.length)]}function zp(){return bu[Math.floor(Math.random()*bu.length)]}function Ao(a,v){const d=v==="playground";return{...d?Pp():zp(),instanceId:a,left:2+Math.random()*92,size:d?46+Math.random()*70:46+Math.random()*30,duration:d?11+Math.random()*10:13+Math.random()*9,delay:Math.random()*(d?14:9),drift:-24+Math.random()*48}}function Zu(a){const v=typeof window<"u"&&window.innerWidth<=700;return Array.from({length:a==="playground"?v?gp:mp:v?vp:yp},(N,j)=>Ao(j,a))}function Lp(a){return{id:a.id,name:a.name,sprite:a.cuteSprite,types:[],height:0,weight:0,abilities:[],stats:[],caughtAt:Date.now()}}function Rp(){try{return window.localStorage.getItem(sc)==="catch"?"catch":"playground"}catch{return"playground"}}function Ju(){try{return window.localStorage.getItem(ac)==="retro"?"retro":"modern"}catch{return"modern"}}function Fo(a){return new Promise(v=>window.setTimeout(v,a))}function Il(a){a.currentTarget.onerror=null,a.currentTarget.style.visibility="hidden"}function Tp(){const{collection:a,addPokemon:v,releasePokemon:d,unreadIds:N,markPokemonViewed:j,updatePokemon:H}=qf(),K=F.useMemo(()=>Rp(),[]),[Y,D]=F.useState(K),[L,P]=F.useState(()=>Zu(K)),[I,X]=F.useState(null),le=F.useRef(null),de=F.useRef(L),[q,G]=F.useState({}),[Z,oe]=F.useState(!1),ye=F.useRef(null),[te,ve]=F.useState("idle"),we=F.useRef("idle"),[ae,ze]=F.useState(null),[Ee,Fe]=F.useState({x:0,y:0}),[qe,Ve]=F.useState({x:0,y:0}),[Le,Re]=F.useState(null),[Qe,Ce]=F.useState(!1),[ue,x]=F.useState(Ju);F.useEffect(()=>{de.current=L},[L]),F.useEffect(()=>{we.current=te},[te]),F.useEffect(()=>{const g=_=>{var $,J;const R=_,z=(($=R.detail)==null?void 0:$.skin)??((J=R.detail)==null?void 0:J.theme);x(z==="retro"||z==="modern"?z:Ju())},B=_=>{_.key===ac&&(_.newValue==="retro"||_.newValue==="modern")&&x(_.newValue)};return window.addEventListener(Ku,g),window.addEventListener("storage",B),()=>{window.removeEventListener(Ku,g),window.removeEventListener("storage",B)}},[]);const M=F.useCallback(g=>{D(g);try{window.localStorage.setItem(sc,g)}catch{}le.current=null,X(null),oe(!1),ve("idle"),ze(null),Re(null),G({}),Ce(!1),P(Zu(g))},[]);F.useEffect(()=>{const g=_=>{var Zt;const R=le.current;if(!R)return;const z=_.clientX-R.offsetX,$=_.clientY-R.offsetY,J={...R,left:z,top:$};le.current=J,X(J);const ie=(Zt=ye.current)==null?void 0:Zt.getBoundingClientRect();if(!ie){oe(!1);return}const _e=z+R.size/2,et=$+R.size/2,Nr=_e>=ie.left&&_e<=ie.right&&et>=ie.top&&et<=ie.bottom;oe(Nr)},B=()=>{var _e;const _=le.current;if(!_)return;le.current=null,X(null),oe(!1);const R=de.current.find(et=>et.instanceId===_.instanceId);if(!R)return;const z=(_e=ye.current)==null?void 0:_e.getBoundingClientRect(),$=_.left+_.size/2,J=_.top+_.size/2;if(!!z&&$>=z.left&&$<=z.right&&J>=z.top&&J<=z.bottom&&z){if(we.current!=="idle"){G(et=>({...et,[R.instanceId]:{x:_.left,y:_.top,size:R.size,sprite:Y==="playground"?R.cuteSprite:R.pixelSprite,drift:R.drift,duration:Math.max(6,R.duration*.65)}}));return}ze(R),Fe({x:_.left,y:_.top}),Ve({x:z.left+z.width/2-R.size/2,y:z.top+z.height/2-R.size/2}),ve("opening");return}G(et=>({...et,[R.instanceId]:{x:_.left,y:_.top,size:R.size,sprite:Y==="playground"?R.cuteSprite:R.pixelSprite,drift:R.drift,duration:Math.max(6,R.duration*.65)}}))};return window.addEventListener("pointermove",g),window.addEventListener("pointerup",B),window.addEventListener("pointercancel",B),()=>{window.removeEventListener("pointermove",g),window.removeEventListener("pointerup",B),window.removeEventListener("pointercancel",B)}},[Y]),F.useEffect(()=>{if(!ae)return;let g=!1;return(async()=>{if(ve("opening"),await Fo(700),g||(ve("shaking"),await Fo(5e3),g)||(Math.random()<uc[ae.rarity].catchChance?(v(Lp(ae)),Re(ae.name),ve("success")):(Re(null),ve("failed")),await Fo(1200),g))return;const R=ae.instanceId;P(z=>z.map($=>$.instanceId===R?{...Ao(R,Y),delay:0}:$)),ze(null),ve("idle"),Re(null)})(),()=>{g=!0}},[ae,v,Y]);const C=(g,B)=>{var z,$;if(le.current)return;g.preventDefault(),g.stopPropagation(),($=(z=window.getSelection)==null?void 0:z.call(window))==null||$.removeAllRanges();const _=g.currentTarget.getBoundingClientRect(),R={instanceId:B.instanceId,pointerId:g.pointerId,offsetX:g.clientX-_.left,offsetY:g.clientY-_.top,left:_.left,top:_.top,size:B.size};le.current=R,X(R)},p=F.useMemo(()=>jp,[]);return u.jsxs(u.Fragment,{children:[u.jsx("style",{children:`
        /* ============================================================
           NORMAL FLOAT
        ============================================================ */

        @keyframes pcFloatUp {
          0% {
            transform:
              translateY(110vh)
              translateX(0)
              rotate(-4deg)
              scale(1);
            opacity: 0;
          }

          5% {
            opacity: 1;
          }

          50% {
            transform:
              translateY(0vh)
              translateX(var(--drift))
              rotate(3deg)
              scale(1.03);
            opacity: 1;
          }

          95% {
            opacity: 1;
          }

          100% {
            transform:
              translateY(-115vh)
              translateX(0)
              rotate(-2deg)
              scale(0.95);
            opacity: 0;
          }
        }

        /* ============================================================
           RELEASED FLOAT
        ============================================================ */

        @keyframes pcContinueFloat {
          0% {
            transform:
              translate3d(0, 0, 0)
              rotate(-2deg)
              scale(1);
            opacity: 1;
          }

          20% {
            transform:
              translate3d(
                calc(
                  var(--released-drift) * 0.25
                ),
                -18vh,
                0
              )
              rotate(2deg)
              scale(1.02);
            opacity: 1;
          }

          40% {
            transform:
              translate3d(
                calc(
                  var(--released-drift) * 0.7
                ),
                -38vh,
                0
              )
              rotate(-1deg)
              scale(1);
            opacity: 1;
          }

          60% {
            transform:
              translate3d(
                var(--released-drift),
                -60vh,
                0
              )
              rotate(2deg)
              scale(1.01);
            opacity: 1;
          }

          80% {
            transform:
              translate3d(
                calc(
                  var(--released-drift) * 0.45
                ),
                -88vh,
                0
              )
              rotate(-2deg)
              scale(0.98);
            opacity: 1;
          }

          100% {
            transform:
              translate3d(
                0,
                -125vh,
                0
              )
              rotate(2deg)
              scale(0.94);
            opacity: 1;
          }
        }

        /* ============================================================
           CAPTURE POKÉMON
        ============================================================ */

        @keyframes pcCapturePokemon {
          0% {
            transform:
              translate(0, 0)
              scale(1.05)
              rotate(0deg);
            opacity: 1;
          }

          100% {
            transform:
              translate(
                calc(var(--capture-dx)),
                calc(var(--capture-dy))
              )
              scale(0.18)
              rotate(360deg);
            opacity: 0;
          }
        }

        /* ============================================================
           POKÉBALL SHAKE
        ============================================================ */

        @keyframes pcBallShake {
          0% {
            transform:
              translateX(0)
              rotate(0deg);
          }

          10% {
            transform:
              translateX(-8px)
              rotate(-7deg);
          }

          20% {
            transform:
              translateX(8px)
              rotate(7deg);
          }

          30% {
            transform:
              translateX(-7px)
              rotate(-6deg);
          }

          40% {
            transform:
              translateX(7px)
              rotate(6deg);
          }

          50% {
            transform:
              translateX(-5px)
              rotate(-4deg);
          }

          60% {
            transform:
              translateX(5px)
              rotate(4deg);
          }

          70% {
            transform:
              translateX(-3px)
              rotate(-2deg);
          }

          80% {
            transform:
              translateX(3px)
              rotate(2deg);
          }

          100% {
            transform:
              translateX(0)
              rotate(0deg);
          }
        }

        /* ============================================================
           RED CAPTURE LIGHT
        ============================================================ */

        @keyframes pcBallRedPulse {
          0%,
          100% {
            filter:
              drop-shadow(
                0 0 3px
                rgba(239, 68, 68, 0.25)
              );
          }

          50% {
            filter:
              drop-shadow(
                0 0 18px
                rgba(239, 68, 68, 0.95)
              );
          }
        }

        @keyframes pcBallGreenPulse {
          0%,
          100% {
            filter:
              drop-shadow(
                0 0 4px
                rgba(34, 197, 94, 0.35)
              );
          }

          50% {
            filter:
              drop-shadow(
                0 0 18px
                rgba(34, 197, 94, 0.95)
              );
          }
        }

        /* ============================================================
           RESULT
        ============================================================ */

        @keyframes pcResultIn {
          0% {
            opacity: 0;

            transform:
              translate(-50%, -50%)
              translateY(12px)
              scale(0.8);
          }

          100% {
            opacity: 1;

            transform:
              translate(-50%, -50%)
              translateY(0)
              scale(1);
          }
        }

        /* ============================================================
           MODE SWITCH
        ============================================================ */

        .pc-mode-switch {
          position: fixed;

          top: 20px;
          right: 20px;

          z-index:
            ${Gu};

          display: flex;

          align-items: center;

          gap: 10px;

          padding:
            8px 12px 8px 16px;

          border:
            0;

          border-radius:
            999px;

          background:
            rgba(
              255,
              255,
              255,
              0.9
            );

          backdrop-filter:
            blur(14px);

          box-shadow:
            0 10px 28px
            rgba(
              100,
              130,
              200,
              0.18
            );

          cursor:
            pointer;

          user-select:
            none;

          -webkit-user-select:
            none;
        }

        .pc-mode-label {
          font-size:
            12px;

          font-weight:
            800;

          letter-spacing:
            0.04em;
        }

        .pc-mode-track {
          display:
            flex;

          align-items:
            center;

          width:
            48px;

          height:
            26px;

          padding:
            3px;

          border-radius:
            999px;

          background:
            #e2e8f0;
        }

        .pc-mode-switch.catch
          .pc-mode-track {
          background:
            #ef4444;
        }

        .pc-mode-knob {
          display:
            flex;

          align-items:
            center;

          justify-content:
            center;

          width:
            20px;

          height:
            20px;

          border-radius:
            50%;

          background:
            white;

          font-size:
            9px;

          box-shadow:
            0 2px 5px
            rgba(
              0,
              0,
              0,
              0.12
            );

          transition:
            transform
            0.25s
            ease;
        }

        .pc-mode-switch.catch
          .pc-mode-knob {
          transform:
            translateX(22px);
        }

        /* ============================================================
           CONTROLS
        ============================================================ */

        .pc-controls {
          position:
            fixed;

          right:
            20px;

          bottom:
            20px;

          z-index:
            ${Gu};

          display:
            flex;

          align-items:
            center;

          gap:
            14px;
        }

        .pc-control {
          border:
            0;

          cursor:
            pointer;
        }

        /* Pokédex - same size as Pokéball */
        .pc-dex-btn {
          position:
            relative;

          flex:
            0 0 64px;

          width:
            64px;

          height:
            64px;

          min-width:
            64px;

          min-height:
            64px;

          aspect-ratio:
            1 / 1;

          border-radius:
            50%;

          display:
            flex;

          align-items:
            center;

          justify-content:
            center;

          color:
            #334155;

          background:
            rgba(
              255,
              255,
              255,
              0.95
            );

          backdrop-filter:
            blur(14px);

          box-shadow:
            0 10px 30px
            rgba(
              100,
              130,
              200,
              0.28
            );

          border:
            0;

          padding:
            0;

          user-select:
            none;

          -webkit-user-select:
            none;

          transition:
            transform
            0.15s
            ease;
        }

        .pc-dex-btn:hover {
          transform:
            translateY(-1px);
        }

        .pc-badge {
          position:
            absolute;

          top:
            -3px;

          right:
            -3px;

          min-width:
            18px;

          height:
            18px;

          padding:
            0 5px;

          border-radius:
            999px;

          display:
            flex;

          align-items:
            center;

          justify-content:
            center;

          background:
            #ef4444;

          color:
            white;

          font-size:
            9px;

          font-weight:
            800;
        }

        /* Pokéball - same size */
        .pc-pokeball {
          position:
            relative;

          flex:
            0 0 64px;

          width:
            64px;

          height:
            64px;

          min-width:
            64px;

          min-height:
            64px;

          aspect-ratio:
            1 / 1;

          border-radius:
            50%;

          display:
            flex;

          align-items:
            center;

          justify-content:
            center;

          border:
            0;

          padding:
            0;

          background:
            rgba(
              255,
              255,
              255,
              0.95
            );

          box-shadow:
            0 10px 30px
            rgba(
              100,
              130,
              200,
              0.28
            );

          overflow:
            visible;

          user-select:
            none;

          -webkit-user-select:
            none;
        }

        .pc-pokeball:disabled {
          opacity:
            1;
        }

        .pc-ball-glow {
          position:
            absolute;

          inset:
            -8px;

          border-radius:
            50%;

          background:
            radial-gradient(
              circle,
              rgba(
                239,
                68,
                68,
                0.24
              ),
              transparent 70%
            );

          pointer-events:
            none;
        }

        .pc-release-hint {
          position:
            absolute;

          bottom:
            70px;

          right:
            0;

          white-space:
            nowrap;

          padding:
            7px 10px;

          border-radius:
            999px;

          background:
            rgba(
              255,
              255,
              255,
              0.94
            );

          box-shadow:
            0 6px 18px
            rgba(
              100,
              130,
              200,
              0.2
            );

          font-size:
            11px;

          font-weight:
            700;

          color:
            #334155;

          user-select:
            none;

          -webkit-user-select:
            none;
        }

        /* ============================================================
           RESULT
        ============================================================ */

        .pc-capture-result {
          position:
            fixed;

          left:
            50%;

          top:
            50%;

          padding:
            12px 22px;

          border-radius:
            999px;

          background:
            rgba(
              255,
              255,
              255,
              0.97
            );

          box-shadow:
            0 10px 30px
            rgba(
              0,
              0,
              0,
              0.16
            );

          font-size:
            18px;

          font-weight:
            900;

          white-space:
            nowrap;

          animation:
            pcResultIn
            400ms
            ease-out
            forwards;

          user-select:
            none;

          -webkit-user-select:
            none;
        }

        .pc-success-result {
          color:
            #16a34a;
        }

        .pc-failed-result {
          color:
            #ef4444;
        }

        /* ============================================================
           MOBILE
        ============================================================ */

        @media (
          max-width: 640px
        ) {
          .pc-mode-switch {
            top:
              max(12px, env(safe-area-inset-top));

            right:
              max(12px, env(safe-area-inset-right));

            padding:
              7px 10px 7px 12px;
          }

          .pc-controls {
            right:
              max(12px, env(safe-area-inset-right));

            bottom:
              max(12px, env(safe-area-inset-bottom));

            gap:
              8px;
          }

          .pc-dex-btn {
            flex:
              0 0 54px;

            width:
              54px;

            height:
              54px;

            min-width:
              54px;

            min-height:
              54px;
          }

          .pc-pokeball {
            flex:
              0 0 54px;

            width:
              54px;

            height:
              54px;

            min-width:
              54px;

            min-height:
              54px;
          }
        }
      `}),u.jsxs("button",{type:"button",className:`pc-mode-switch ${Y}`,onClick:()=>M(Y==="playground"?"catch":"playground"),onDoubleClick:g=>{g.preventDefault(),g.stopPropagation()},"aria-label":Y==="playground"?"Switch to Catch mode":"Switch to Playground mode",children:[u.jsx("span",{className:"pc-mode-label",children:Y==="playground"?"PLAYGROUND":"CATCH"}),u.jsx("span",{className:"pc-mode-track",children:u.jsx("span",{className:"pc-mode-knob",children:Y==="playground"?"◀":"▶"})})]}),u.jsxs("div",{style:{position:"fixed",inset:0,zIndex:xp,overflow:"hidden",pointerEvents:"none",userSelect:"none",WebkitUserSelect:"none"},onDoubleClick:g=>{g.preventDefault()},children:[L.map(g=>{const B=(I==null?void 0:I.instanceId)===g.instanceId,_=!!q[g.instanceId],R=(ae==null?void 0:ae.instanceId)===g.instanceId&&te!=="idle";if(_||R)return null;const z=Y==="playground"?g.cuteSprite:g.pixelSprite;return B&&I?u.jsx("div",{style:{position:"fixed",left:I.left,top:I.top,width:g.size,zIndex:Xu,pointerEvents:"auto",touchAction:"none",cursor:"grabbing",userSelect:"none",WebkitUserSelect:"none"},onDoubleClick:$=>{$.preventDefault(),$.stopPropagation()},children:u.jsx("img",{src:z,alt:"",draggable:!1,onError:Il,style:{width:"100%",pointerEvents:"none",userSelect:"none",WebkitUserSelect:"none",transform:Z?"scale(1.1)":"scale(1)",filter:Z?"drop-shadow(0 0 16px rgba(239,68,68,0.75))":"drop-shadow(0 6px 10px rgba(0,0,0,0.25))",transition:"transform 0.15s, filter 0.15s"}})},g.instanceId):u.jsx("div",{onPointerDown:$=>C($,g),onContextMenu:$=>$.preventDefault(),onDoubleClick:$=>{$.preventDefault(),$.stopPropagation()},style:{position:"absolute",bottom:0,left:`${g.left}%`,width:g.size,pointerEvents:"auto",cursor:"grab",touchAction:"none",userSelect:"none",WebkitUserSelect:"none",animation:`pcFloatUp ${g.duration}s ${g.delay}s infinite ease-in-out`,animationFillMode:"both","--drift":`${g.drift}px`},children:u.jsx("img",{src:z,alt:"",draggable:!1,loading:"lazy",onError:Il,style:{width:"100%",pointerEvents:"none",userSelect:"none",WebkitUserSelect:"none",filter:"drop-shadow(0 4px 10px rgba(0,0,0,0.18))"}})},g.instanceId)}),Object.entries(q).map(([g,B])=>{const _=Number(g),R=de.current.find(z=>z.instanceId===_);return R?u.jsx("div",{onPointerDown:z=>{z.preventDefault(),z.stopPropagation(),G($=>{const J={...$};return delete J[_],J}),C(z,R)},onContextMenu:z=>z.preventDefault(),onDoubleClick:z=>{z.preventDefault(),z.stopPropagation()},style:{position:"fixed",left:B.x,top:B.y,width:B.size,zIndex:Xu,pointerEvents:"auto",touchAction:"none",cursor:"grab",userSelect:"none",WebkitUserSelect:"none",animation:`pcContinueFloat ${B.duration}s linear forwards`,"--released-drift":`${B.drift}px`},onAnimationEnd:()=>{q[_]&&(G(z=>{const $={...z};return delete $[_],$}),P(z=>z.map($=>$.instanceId===_?{...Ao(_,Y),delay:0}:$)))},children:u.jsx("img",{src:B.sprite,alt:"",draggable:!1,onError:Il,style:{width:"100%",pointerEvents:"none",userSelect:"none",WebkitUserSelect:"none",filter:"drop-shadow(0 4px 10px rgba(0,0,0,0.18))"}})},`released-${_}`):null})]}),Y==="catch"&&u.jsxs("div",{className:"pc-controls",children:[u.jsxs("button",{type:"button",className:"pc-control pc-dex-btn",onClick:()=>Ce(!0),onDoubleClick:g=>{g.preventDefault(),g.stopPropagation()},"aria-label":"Open Pokédex",children:[ue==="retro"?u.jsx(Mp,{}):u.jsx(Dp,{}),N.length>0&&u.jsx("span",{className:"pc-badge","aria-label":`${N.length} unread Pokédex ${N.length===1?"entry":"entries"}`,children:N.length>99?"99+":N.length})]}),u.jsxs("button",{ref:ye,type:"button",className:"pc-control pc-pokeball","aria-label":"Pokéball",disabled:te!=="idle",onDoubleClick:g=>{g.preventDefault(),g.stopPropagation()},children:[Z&&te==="idle"&&u.jsx("span",{className:"pc-ball-glow"}),u.jsx(Ip,{open:Z||te==="shaking",capturing:te==="shaking",success:te==="success"}),Z&&te==="idle"&&u.jsx("span",{className:"pc-release-hint",children:"Release to catch"})]})]}),ae&&te!=="idle"&&u.jsxs("div",{style:{position:"fixed",inset:0,zIndex:wp,pointerEvents:"none",userSelect:"none",WebkitUserSelect:"none"},children:[te==="opening"&&u.jsx("div",{style:{position:"fixed",left:Ee.x,top:Ee.y,width:ae.size,animation:"pcCapturePokemon 700ms ease-in forwards","--capture-dx":`${qe.x-Ee.x}px`,"--capture-dy":`${qe.y-Ee.y}px`},children:u.jsx("img",{src:ae.pixelSprite,alt:"",draggable:!1,onError:Il,style:{width:"100%",pointerEvents:"none"}})}),te==="success"&&u.jsxs("div",{className:"pc-capture-result pc-success-result",children:["✨ GOTCHA!"," ",Le?Rt(Le):"","✨"]}),te==="failed"&&u.jsx("div",{className:"pc-capture-result pc-failed-result",children:"💨 IT RAN AWAY!"})]}),u.jsx(dp,{open:Qe,onClose:()=>Ce(!1),collection:a,onRelease:d,initialSelectedId:null,catalog:p,unreadIds:N,onMarkViewed:j,onUpdatePokemon:H})]})}function Mp(){return u.jsxs("svg",{width:"34",height:"34",viewBox:"0 0 64 64",fill:"none","aria-hidden":"true",style:{display:"block",flex:"0 0 auto"},children:[u.jsx("path",{d:`
          M8 14
          C8 10.686 10.686 8 14 8
          H50
          C53.314 8 56 10.686 56 14
          V50
          C56 53.314 53.314 56 50 56
          H14
          C10.686 56 8 53.314 8 50
          Z
        `,fill:"#DC2626",stroke:"#7F1D1D",strokeWidth:"2.5",strokeLinejoin:"round"}),u.jsx("circle",{cx:"22",cy:"20",r:"7",fill:"#38BDF8",stroke:"#F0F9FF",strokeWidth:"2"}),u.jsx("circle",{cx:"38",cy:"14",r:"1.8",fill:"#FDE68A"}),u.jsx("circle",{cx:"45",cy:"14",r:"1.8",fill:"#FDE68A"}),u.jsx("circle",{cx:"51",cy:"14",r:"1.8",fill:"#FDE68A"}),u.jsx("path",{d:`
          M10 31
          H38
          L48 22
          H54
          V30
          H49
          L39 39
          H10
          Z
        `,fill:"#B91C1C",stroke:"#7F1D1D",strokeWidth:"2",strokeLinejoin:"round"}),u.jsx("path",{d:"M12 43L16 45L12 47Z",fill:"#FDE68A"}),u.jsx("rect",{x:"23",y:"48",width:"18",height:"3",rx:"1.5",fill:"#991B1B"})]})}function Dp(){return u.jsxs("svg",{width:"34",height:"34",viewBox:"0 0 64 64",fill:"none","aria-hidden":"true",style:{display:"block",flex:"0 0 auto"},children:[u.jsx("path",{d:`
          M23 7
          C16 8 11 14 11 21
          V48
          L30 57
          L49 46
          V23
          C49 20 48 18 46 16
          L38 9
          C34 6 28 6 23 7
          Z
        `,fill:"#CFEFF7",stroke:"#374151",strokeWidth:"3.4",strokeLinejoin:"round"}),u.jsx("path",{d:"M30 7V14",stroke:"#374151",strokeWidth:"3",strokeLinecap:"round"}),u.jsx("circle",{cx:"30",cy:"25",r:"11",fill:"#DDF6FC",stroke:"#374151",strokeWidth:"3"}),u.jsx("path",{d:`
          M21 25
          A9 9 0 0 1 39 25
          Z
        `,fill:"#1D9FE2"}),u.jsx("line",{x1:"19",y1:"25",x2:"41",y2:"25",stroke:"#374151",strokeWidth:"3"}),u.jsx("circle",{cx:"30",cy:"25",r:"4",fill:"white",stroke:"#374151",strokeWidth:"2.4"}),u.jsx("circle",{cx:"20",cy:"41",r:"3",fill:"#374151"}),u.jsx("path",{d:"M18 48H28",stroke:"#374151",strokeWidth:"3",strokeLinecap:"round"}),u.jsx("path",{d:"M18 53H25",stroke:"#374151",strokeWidth:"2.5",strokeLinecap:"round"})]})}function Ip({open:a,capturing:v,success:d}){return u.jsxs("svg",{width:"70%",height:"70%",viewBox:"0 0 160 160",preserveAspectRatio:"xMidYMid meet",fill:"none",style:{width:"70%",height:"70%",aspectRatio:"1 / 1",display:"block",flex:"0 0 auto",userSelect:"none",WebkitUserSelect:"none",animation:v?"pcBallShake 0.8s ease-in-out infinite, pcBallRedPulse 0.65s ease-in-out infinite":d?"pcBallGreenPulse 0.75s ease-in-out infinite":void 0},children:[u.jsx("defs",{children:u.jsx("clipPath",{id:"pokeball-circle-clip",children:u.jsx("circle",{cx:"80",cy:"80",r:"72"})})}),u.jsx("circle",{cx:"80",cy:"80",r:"72",fill:"white"}),u.jsx("rect",{x:"8",y:"8",width:"144",height:"72",fill:"#EF4444",clipPath:"url(#pokeball-circle-clip)"}),u.jsx("circle",{cx:"80",cy:"80",r:"72",stroke:"#1E293B",strokeWidth:"8"}),u.jsx("line",{x1:"8",y1:"80",x2:"152",y2:"80",stroke:"#1E293B",strokeWidth:"8"}),u.jsx("circle",{cx:"80",cy:"80",r:"22",fill:"white",stroke:"#1E293B",strokeWidth:"8"}),u.jsx("circle",{cx:"80",cy:"80",r:"9",fill:d?"#22C55E":a?"#EF4444":"#1E293B"})]})}const cc=[25,1,7,6,39,94,133,143,54,4,152,155,158,175,183,196,197,2,3,5,8,9,10,13,16,19,21,23,27,29,32,35,37,41,43,46,48,50,52,56,58,60,63,66,69,72,74,77,79,81,83,84,86,88,90,92,95,96,98,100,102,104,107,108,109,111,113,114,115,116,118,120,122,123,124,125,126,127,128,129,130,131,132,134,135,136,137,138,140,142,144,145,146,147,148,149,150,151,153,154,156,157,159,160,161,163,165,167,170,172,173,174,176,177,179,181,182,184,185,186,187,190,191,193,194,198,199,200,201,202],Op=Object.assign({});Object.values(Op);function Fp(a){return a.length===0?null:a[Math.floor(Math.random()*a.length)]}function Ap(){return`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${Fp(cc)??25}.png`}const qu=Ap(),Up=151,Bp=Array.from({length:Up},(a,v)=>v);function Wp(a){const v=[...a];for(let d=v.length-1;d>0;d--){const N=Math.floor(Math.random()*(d+1));[v[d],v[N]]=[v[N],v[d]]}return v}const ec=Wp(cc);function $p(a){return`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${ec[a%ec.length]}.png`}function Hp(a){const v=a*2654435761>>>0,d=v%94+1,N=(v>>4)%220/10,j=10+(v>>8)%80/10,H=55+(v>>12)%55,K=(v>>16)%40-20,Y=$p(a);return{index:a,src:Y,left:`${d}%`,delay:`${N}s`,duration:`${j}s`,size:H,drift:K}}Bp.map(a=>Hp(a));function Vp(){const[a,v]=F.useState("hide"),[d,N]=F.useState(""),[j,H]=F.useState(""),[K,Y]=F.useState(null),[D,L]=F.useState(null),[P,I]=F.useState(!1),[X,le]=F.useState(!1),[de,q]=F.useState(null),[G,Z]=F.useState(null),[oe,ye]=F.useState(null),te=F.useRef(null),[ve,we]=F.useState(null),[ae,ze]=F.useState(null),Ee=F.useRef(null);F.useEffect(()=>{const x=C=>{Ee.current&&we(p=>{var g;return!p||p.index!==((g=Ee.current)==null?void 0:g.index)?p:{...p,left:C.clientX-Ee.current.offsetX,top:C.clientY-Ee.current.offsetY}})},M=()=>{if(!Ee.current)return;const C=ve;Ee.current=null,C&&ze(C),we(null)};return window.addEventListener("pointermove",x),window.addEventListener("pointerup",M),()=>{window.removeEventListener("pointermove",x),window.removeEventListener("pointerup",M)}},[ve]),F.useEffect(()=>()=>{G&&URL.revokeObjectURL(G)},[G]);const Fe=()=>{q(null),le(!1),G&&URL.revokeObjectURL(G),Z(null),ye(null)},qe=x=>{x===a||P||(v(x),Fe())},Ve=x=>{var p;const M=(p=x.target.files)==null?void 0:p[0];if(!M)return;Fe(),Y(M);const C=new FileReader;C.onload=()=>{L(C.result)},C.readAsDataURL(M)},Le=()=>{Fe(),Y(null),L(null),te.current&&(te.current.value="")},Re=x=>{var p;x.preventDefault();const M=(p=x.dataTransfer.files)==null?void 0:p[0];if(!M||!M.type.startsWith("image/"))return;Fe(),Y(M);const C=new FileReader;C.onload=()=>{L(C.result)},C.readAsDataURL(M)},Qe=!P&&!!K&&!!d&&(a==="reveal"||!!j),Ce=async()=>{if(q(null),le(!1),a==="reveal"&&ye(null),a==="hide"&&G&&(URL.revokeObjectURL(G),Z(null)),!K){q("Please attach an image first.");return}if(!d.trim()){q("Please enter a key.");return}if(a==="hide"&&!j.trim()){q("Please enter a message to hide.");return}I(!0);try{if(a==="hide"){const x=await Xf(K,j,d),M=URL.createObjectURL(x);Z(M),le(!0)}else{const x=await Gf(K,d);ye(x),q(null),le(!0)}}catch(x){a==="reveal"&&ye(null),le(!1);const M=x instanceof fn?x.message:"Something went wrong. Please try again.";q(M)}finally{I(!1)}},ue=()=>{var C;if(!G)return;const x=document.createElement("a");x.href=G;const M=((C=K==null?void 0:K.name)==null?void 0:C.replace(/\.[^.]+$/,""))??"image";x.download=`${M}-encoded.png`,document.body.appendChild(x),x.click(),x.remove()};return u.jsxs("div",{className:"relative w-full min-h-full overflow-hidden",style:{minHeight:"100dvh",fontFamily:"'Outfit', sans-serif"},children:[u.jsx("style",{children:`
        @keyframes floatUp {
          0% {
            transform:
              translateY(110vh)
              translateX(0px)
              rotate(-4deg)
              scale(1);
            opacity: 0;
          }

          5% {
            opacity: 1;
          }

          50% {
            transform:
              translateY(0vh)
              translateX(var(--drift))
              rotate(3deg)
              scale(1.03);
            opacity: 1;
          }

          95% {
            opacity: 1;
          }

          100% {
            transform:
              translateY(-115vh)
              translateX(0px)
              rotate(-2deg)
              scale(0.95);
            opacity: 0;
          }
        }

        @keyframes floatFromGrab {
          0% {
            transform:
              translateY(0px)
              translateX(0px)
              rotate(0deg)
              scale(1.03);
            opacity: 1;
          }

          100% {
            transform:
              translateY(-115vh)
              translateX(var(--drift))
              rotate(3deg)
              scale(1);
            opacity: 0;
          }
        }

        .glass-card {
          background: rgba(255, 255, 255, 0.52);

          backdrop-filter: blur(28px);
          -webkit-backdrop-filter: blur(28px);

          border:
            1px solid
            rgba(255, 255, 255, 0.82);

          box-shadow:
            0 8px 48px rgba(100, 130, 200, 0.14),
            0 2px 12px rgba(100, 130, 200, 0.1),
            inset 0 1.5px 0 rgba(255, 255, 255, 0.95),
            inset 0 -1px 0 rgba(200, 220, 255, 0.15);
        }

        .glass-input {
          background: rgba(255, 255, 255, 0.5);

          border:
            1px solid
            rgba(200, 215, 240, 0.6);

          color: #1e293b;

          transition:
            border-color 0.2s,
            background 0.2s,
            box-shadow 0.2s;
        }

        .glass-input::placeholder {
          color: #94a3b8;
        }

        .glass-input:focus {
          background: rgba(255, 255, 255, 0.72);

          border-color:
            rgba(59, 130, 246, 0.45);

          box-shadow:
            0 0 0 3px
            rgba(59, 130, 246, 0.1);

          outline: none;
        }

        .drop-zone {
          background: rgba(255, 255, 255, 0.38);

          border:
            1.5px dashed
            rgba(148, 163, 184, 0.55);

          transition:
            background 0.2s,
            border-color 0.2s;
        }

        .drop-zone:hover {
          background: rgba(255, 255, 255, 0.6);

          border-color:
            rgba(59, 130, 246, 0.45);
        }

        .upload-btn {
          background:
            linear-gradient(
              135deg,
              #ffcb05 0%,
              #f59e0b 100%
            );

          border:
            1px solid
            rgba(245, 158, 11, 0.5);

          box-shadow:
            0 4px 20px
            rgba(245, 158, 11, 0.3),
            inset 0 1px 0
            rgba(255, 255, 255, 0.4);

          color: #1e293b;

          transition:
            transform 0.15s,
            box-shadow 0.15s;

          position: relative;

          overflow: visible;
        }

        .upload-btn:hover:not(:disabled) {
          box-shadow:
            0 6px 28px
            rgba(245, 158, 11, 0.45),
            inset 0 1px 0
            rgba(255, 255, 255, 0.5);

          transform:
            translateY(-1px);
        }

        .upload-btn:active:not(:disabled) {
          transform:
            translateY(0px)
            scale(0.98);
        }

        .upload-btn:disabled {
          opacity: 0.55;
          cursor: not-allowed;
        }

        .pikachu-btn {
          position: absolute;

          bottom: -18px;
          right: -14px;

          width: 62px;
          height: 62px;

          pointer-events: none;

          filter:
            drop-shadow(
              0 3px 6px
              rgba(0, 0, 0, 0.22)
            );

          transition:
            transform 0.2s;
        }

        .upload-btn:hover:not(:disabled)
          .pikachu-btn {
          transform:
            translateY(-3px)
            rotate(5deg);
        }

        .mode-toggle-btn {
          transition:
            background 0.2s,
            color 0.2s,
            box-shadow 0.2s;
        }

        .floating-sticker {
          will-change:
            transform,
            left,
            top;

          user-select: none;

          -webkit-user-select: none;
          -webkit-user-drag: none;
          -webkit-touch-callout: none;
        }

        @media (max-width: 640px) {
          .glass-card {
            box-shadow:
              0 12px 44px
              rgba(100,130,200,0.16),
              0 2px 10px
              rgba(100,130,200,0.10),
              inset 0 1px 1px
              rgba(255,255,255,0.9);
          }

          .pikachu-btn {
            width: 54px;
            height: 54px;
            right: -9px;
            bottom: -13px;
          }

          .floating-sticker {
            max-width: 24vw;
          }
        }
      `}),u.jsx("div",{className:"absolute inset-0",style:{background:"linear-gradient(145deg, #dbeafe 0%, #ede9fe 38%, #fce7f3 68%, #e0f2fe 100%)"}}),!1,u.jsx("div",{className:"absolute inset-0 flex items-center justify-center p-3 sm:p-6 pointer-events-none",style:{zIndex:20,paddingTop:"max(12px, env(safe-area-inset-top))",paddingBottom:"max(12px, env(safe-area-inset-bottom))"},children:u.jsxs("div",{className:"glass-card rounded-[24px] sm:rounded-3xl w-full max-w-md p-5 sm:p-8 flex flex-col gap-4 sm:gap-5 relative overflow-y-auto overflow-x-hidden pointer-events-auto",style:{zIndex:20,maxHeight:"calc(100dvh - max(24px, env(safe-area-inset-top) + env(safe-area-inset-bottom) + 24px))",WebkitOverflowScrolling:"touch"},children:[u.jsx("div",{className:"absolute -top-8 -right-8 pointer-events-none select-none",style:{opacity:.07},children:u.jsxs("svg",{width:"160",height:"160",viewBox:"0 0 160 160",fill:"none",children:[u.jsx("circle",{cx:"80",cy:"80",r:"78",stroke:"#1e293b",strokeWidth:"4"}),u.jsx("path",{d:"M2 80 Q80 80 158 80",stroke:"#1e293b",strokeWidth:"4"}),u.jsx("path",{d:"M2 80 A78 78 0 0 1 158 80",fill:"#ef4444"}),u.jsx("circle",{cx:"80",cy:"80",r:"22",fill:"white",stroke:"#1e293b",strokeWidth:"4"}),u.jsx("circle",{cx:"80",cy:"80",r:"11",fill:"white",stroke:"#1e293b",strokeWidth:"3"})]})}),u.jsx("div",{className:"absolute -bottom-6 -left-6 pointer-events-none select-none",style:{opacity:.05},children:u.jsxs("svg",{width:"100",height:"100",viewBox:"0 0 160 160",fill:"none",children:[u.jsx("circle",{cx:"80",cy:"80",r:"78",stroke:"#1e293b",strokeWidth:"4"}),u.jsx("path",{d:"M2 80 Q80 80 158 80",stroke:"#1e293b",strokeWidth:"4"}),u.jsx("path",{d:"M2 80 A78 78 0 0 1 158 80",fill:"#ef4444"}),u.jsx("circle",{cx:"80",cy:"80",r:"22",fill:"white",stroke:"#1e293b",strokeWidth:"4"}),u.jsx("circle",{cx:"80",cy:"80",r:"11",fill:"white",stroke:"#1e293b",strokeWidth:"3"})]})}),u.jsxs("div",{className:"flex flex-col gap-1",children:[u.jsx("h1",{className:"text-slate-800 text-[22px] sm:text-2xl font-semibold tracking-tight leading-tight",children:a==="hide"?"Write a Message":"Reveal a Message"}),u.jsx("p",{className:"text-slate-400 text-sm font-light",children:a==="hide"?"Write something and attach an image.":"Attach an encoded image and enter its key."})]}),u.jsxs("div",{className:"flex items-center gap-3 -mt-1",children:[u.jsx("div",{className:"flex-1 h-px",style:{background:"rgba(30,41,59,0.08)"}}),u.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 160 160",fill:"none",style:{opacity:.25},children:[u.jsx("circle",{cx:"80",cy:"80",r:"78",stroke:"#1e293b",strokeWidth:"10"}),u.jsx("line",{x1:"2",y1:"80",x2:"158",y2:"80",stroke:"#1e293b",strokeWidth:"10"}),u.jsx("path",{d:"M2 80 A78 78 0 0 1 158 80",fill:"#ef4444"}),u.jsx("circle",{cx:"80",cy:"80",r:"24",fill:"white",stroke:"#1e293b",strokeWidth:"10"}),u.jsx("circle",{cx:"80",cy:"80",r:"10",fill:"#1e293b"})]}),u.jsx("div",{className:"flex-1 h-px",style:{background:"rgba(30,41,59,0.08)"}})]}),u.jsxs("div",{className:"glass-input flex items-center rounded-2xl p-1 text-sm",style:{fontFamily:"'Inter', sans-serif"},children:[u.jsxs("button",{type:"button",onClick:()=>qe("hide"),className:"mode-toggle-btn flex-1 flex items-center justify-center gap-1.5 rounded-xl py-2",style:{background:a==="hide"?"rgba(255,255,255,0.9)":"transparent",color:a==="hide"?"#1e293b":"#94a3b8",boxShadow:a==="hide"?"0 1px 4px rgba(100,130,200,0.18)":"none"},children:[u.jsx(Df,{size:13}),"Hide"]}),u.jsxs("button",{type:"button",onClick:()=>qe("reveal"),className:"mode-toggle-btn flex-1 flex items-center justify-center gap-1.5 rounded-xl py-2",style:{background:a==="reveal"?"rgba(255,255,255,0.9)":"transparent",color:a==="reveal"?"#1e293b":"#94a3b8",boxShadow:a==="reveal"?"0 1px 4px rgba(100,130,200,0.18)":"none"},children:[u.jsx(Tf,{size:13}),"Reveal"]})]}),u.jsx("input",{type:"text",value:d,onChange:x=>N(x.target.value),placeholder:"Enter your key...",className:"glass-input w-full rounded-2xl px-4 py-3 text-sm",style:{fontFamily:"'Inter', sans-serif"},autoComplete:"off"}),a==="hide"&&u.jsx("textarea",{value:j,onChange:x=>H(x.target.value),placeholder:"What's your message?",rows:5,className:"glass-input w-full resize-none rounded-2xl px-4 py-3 text-sm leading-relaxed",style:{fontFamily:"'Inter', sans-serif"}}),u.jsx("div",{onDrop:Re,onDragOver:x=>x.preventDefault(),children:D?u.jsxs("div",{className:"relative rounded-2xl overflow-hidden",style:{height:"clamp(120px, 24vw, 160px)"},children:[u.jsx("img",{src:D,alt:"Preview",className:"w-full h-full object-cover"}),u.jsx("div",{className:"absolute inset-0",style:{background:"linear-gradient(to top, rgba(0,0,0,0.32), transparent)"}}),u.jsx("div",{className:"absolute bottom-2 left-3 text-white text-xs font-medium truncate max-w-[80%]",children:K==null?void 0:K.name}),u.jsx("button",{onClick:Le,className:"absolute top-2 right-2 rounded-full p-1.5 text-white hover:opacity-80 transition-opacity",style:{background:"rgba(0,0,0,0.45)"},"aria-label":"Remove file",children:u.jsx(nc,{size:13})})]}):u.jsxs("label",{htmlFor:"file-input",className:"drop-zone flex items-center gap-3 cursor-pointer rounded-2xl px-4 py-3.5 group",children:[u.jsx(Pf,{size:18,className:"text-slate-400 group-hover:text-blue-500 transition-colors shrink-0"}),u.jsx("span",{className:"text-slate-400 group-hover:text-slate-600 text-sm transition-colors truncate",children:"Attach an image — or drag & drop"}),u.jsx("input",{ref:te,id:"file-input",type:"file",accept:"image/*",className:"hidden",onChange:Ve})]})}),de&&u.jsx("div",{className:"rounded-2xl px-4 py-3 text-sm",style:{background:"rgba(254, 226, 226, 0.7)",border:"1px solid rgba(248, 113, 113, 0.5)",color:"#991b1b",fontFamily:"'Inter', sans-serif"},children:de}),a==="reveal"&&!de&&oe!==null&&u.jsx("div",{className:"glass-input rounded-2xl px-4 py-3 text-sm leading-relaxed break-words",style:{fontFamily:"'Inter', sans-serif"},children:oe}),a==="hide"&&G&&u.jsxs("div",{className:"relative rounded-2xl overflow-hidden",style:{height:"clamp(120px, 24vw, 160px)"},children:[u.jsx("img",{src:G,alt:"Encoded result",className:"w-full h-full object-cover"}),u.jsxs("button",{onClick:ue,className:"absolute bottom-2 right-2 flex items-center gap-1.5 rounded-full px-3 py-1.5 text-white text-xs font-medium hover:opacity-90 transition-opacity",style:{background:"rgba(0,0,0,0.55)"},children:[u.jsx(_f,{size:12}),"Download"]})]}),u.jsx("div",{className:"relative mt-1",children:u.jsxs("button",{onClick:Ce,disabled:!Qe,className:"upload-btn w-full flex items-center justify-center gap-2.5 rounded-2xl py-3.5 px-4 sm:px-6 font-semibold text-sm tracking-wide",children:[X&&!de?u.jsxs(u.Fragment,{children:[u.jsx("svg",{width:"16",height:"16",viewBox:"0 0 16 16",fill:"none",children:u.jsx("path",{d:"M3 8.5l3.5 3.5 6.5-7",stroke:"currentColor",strokeWidth:"1.8",strokeLinecap:"round",strokeLinejoin:"round"})}),a==="hide"?"Uploaded!":"Revealed!"]}):P?u.jsxs(u.Fragment,{children:[u.jsxs("svg",{className:"animate-spin",width:"16",height:"16",viewBox:"0 0 16 16",fill:"none",children:[u.jsx("circle",{cx:"8",cy:"8",r:"6",stroke:"rgba(30,41,59,0.2)",strokeWidth:"2"}),u.jsx("path",{d:"M8 2a6 6 0 0 1 6 6",stroke:"#1e293b",strokeWidth:"2",strokeLinecap:"round"})]}),a==="hide"?"Uploading...":"Revealing..."]}):u.jsxs(u.Fragment,{children:[u.jsx(Vf,{size:15}),a==="hide"?"Upload":"Reveal"]}),qu&&u.jsx("img",{src:qu,alt:"",className:"pikachu-btn",draggable:!1,onError:x=>{x.currentTarget.onerror=null,x.currentTarget.src=bf}})]})})]})}),u.jsx(Tp,{})]})}gf.createRoot(document.getElementById("root")).render(u.jsx(Vp,{}));
