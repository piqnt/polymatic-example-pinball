import{y as Oe,r as ca}from"./index-DexR3tYR.js";/**
 * Polymatic v0.3.0
 * @copyright Copyright 2026 Ali Shakiba
 * @license Licensed under the MIT (https://github.com/piqnt/polymatic/blob/main/LICENSE.md)
 */let be=class ha{static create(t){return new ha(t)}constructor(t){this.name=t}};const ma=be.create("polymatic:failure"),nl="__POLYMATIC_INSPECTOR__";function Pe(){return globalThis[nl]}let Xi=!1,Zi=0;class he{constructor(){this.__handlers={},this.__children=[],this.__parent=null,this.__pendingActivate=!1,this._swap=t=>{const e=this.__children,n=[],r=[];for(const s of t)e.indexOf(s)===-1&&r.push(s);for(const s of e)t.indexOf(s)===-1&&n.push(s);this.__children.length=0,this.__children.push(...t);for(const s of n)s.__deactivate(),s.__detach();if(this.activated)for(const s of r)s.__attach(this),s.__activate()}}get activated(){return this.__parent?this.__parent.activated:!1}use(t){this.__children.indexOf(t)===-1&&(this.activated&&(t.__attach(this),t.__activate()),this.__children.push(t))}unuse(t){const e=this.__children.indexOf(t);e!==-1&&(this.__children.splice(e,1),t==null||t.__deactivate(),t==null||t.__detach())}__attach(t){if(!this.__parent){this.__parent=t,this.__pendingActivate=!0;for(let e=0;e<this.__children.length;e++)this.__children[e].__attach(this)}}__activate(){var t,e;if(this.__pendingActivate){this.__pendingActivate=!1,(e=(t=Pe())===null||t===void 0?void 0:t.activate)===null||e===void 0||e.call(t,this),this._handle("activate");for(let n=0;n<this.__children.length;n++)this.__children[n].__activate()}}__deactivate(){var t,e;if(this.__parent){this.__pendingActivate||((e=(t=Pe())===null||t===void 0?void 0:t.deactivate)===null||e===void 0||e.call(t,this),this._handle("deactivate"));for(let n=0;n<this.__children.length;n++)this.__children[n].__deactivate()}}__detach(){if(this.__parent){for(let t=0;t<this.__children.length;t++)this.__children[t].__detach();this.__pendingActivate=!1,this.__parent=null}}get context(){return this.__parent?this.__parent.context:null}setContext(t){this.__parent?this.__parent.setContext(t):console.error("Middleware is not activated")}on(t,e){const n=typeof t=="string"?t:t.name;if(this.__handlers[n])throw Error(`Handler for ${n} already exists`);this.__handlers[n]=e}_consume(t,e){if(this._handle(t,e))return!0;for(let r=0;r<this.__children.length;r++)if(this.__children[r]._consume(t,e))return!0;return!1}_handle(t,e){var n;if(!this.activated)return;const r=this.__handlers&&this.__handlers[t];if(r&&typeof r=="function"){Zi++;const s=Pe(),o=s!=null&&s.handle?performance.now():0;let a,l=!1,h;try{a=r.call(this,e)}catch(p){l=!0,h=p}const _=a===!0;return(n=s==null?void 0:s.handle)===null||n===void 0||n.call(s,t,e,this,performance.now()-o,_),l?Bs({error:h,middleware:this,type:t,ev:e}):a&&typeof a.then=="function"&&a.then(void 0,p=>Bs({error:p,middleware:this,type:t,ev:e})),_}return!1}emit(t,...[e]){var n,r;if(!this.activated)return;const s=typeof t=="string"?t:t.name;if(Xi||(r=(n=Pe())===null||n===void 0?void 0:n.emit)===null||r===void 0||r.call(n,s,e,this),this.__parent){const o=Xi;Xi=!0;try{this.__parent.emit(s,e)}finally{Xi=o}}else console.error(Error("Not active!"))}static activate(t,e){return ar.activate(t,e)}}function Bs(i){var t,e,n;let r=null,s=i.middleware.__parent;for(;s&&!r;){const o=s.activated&&((t=s.__handlers)===null||t===void 0?void 0:t[ma.name]);if(typeof o=="function")try{o.call(s,i)===!0&&(r=s)}catch(a){ks(a)}s=s.__parent}(n=(e=Pe())===null||e===void 0?void 0:e.failure)===null||n===void 0||n.call(e,i,r),r||ks(i.error)}function ks(i){const t=globalThis.reportError;typeof t=="function"?t(i):console.error(i)}class ar extends he{constructor(){super(...arguments),this.__handlers={},this.__children=[],this._activated=!1,this.contextUpdateEmit=()=>{this.emit("context-change")},this._microtask=Promise.resolve()}get activated(){return this._activated}_activate(t){var e,n;if(!this._activated){this._context=t,this._activated=!0;for(let r=0;r<this.__children.length;r++)this.__children[r].__attach(this);(n=(e=Pe())===null||e===void 0?void 0:e.activate)===null||n===void 0||n.call(e,this),this._handle("activate");for(let r=0;r<this.__children.length;r++)this.__children[r].__activate()}}_deactivate(){var t,e;if(this._activated){(e=(t=Pe())===null||t===void 0?void 0:t.deactivate)===null||e===void 0||e.call(t,this),this._handle("deactivate");for(let n=0;n<this.__children.length;n++)this.__children[n].__deactivate();for(let n=0;n<this.__children.length;n++)this.__children[n].__detach();this._activated=!1}}get context(){return this._context}setContext(t){if(typeof t!="function"){console.error("Setter is not a function: ",t);return}t(this.context),clearTimeout(this.contextUpdateEmitTimeout),this.contextUpdateEmitTimeout=setTimeout(this.contextUpdateEmit)}emit(t,...[e]){var n,r;const s=typeof t=="string"?t:t.name;Xi||(r=(n=Pe())===null||n===void 0?void 0:n.emit)===null||r===void 0||r.call(n,s,e,this),this._microtask.then(()=>this.__dispatch(s,e))}__dispatch(t,e){var n,r;const s=Pe();if(!s){this._consume(t,e);return}(n=s.dispatch)===null||n===void 0||n.call(s,t,e,this);const o=Zi;Zi=0;try{this._consume(t,e)}finally{const a=Zi;Zi=o,(r=s.dispatched)===null||r===void 0||r.call(s,t,e,a)}}static activate(t,e){const n=new ar;n.use(t),n._activate(e)}static deactivate(t){if("_deactivate"in t&&typeof t._deactivate=="function")return t._deactivate(),!0;const e=t.__parent;return e&&"_deactivate"in e&&typeof e._deactivate=="function"?(e._deactivate(),!0):!1}}class Dt{constructor(){this._componentsById={}}static create(t){return new class extends Dt{constructor(){super(...arguments),this.filter=t.filter,this.enter=t.enter,this.exit=t.exit,this.update=t.update}}}ref(t){return this._componentsById[t]}}class lr{constructor(){this._drivers=[],this._map={},this._mapBuffer={},this._updateBuffer=[],this._updateKeys=[],this._enterBuffer=[],this._enterKeys=[],this._exitBuffer=[],this._exitKeys=[]}static create(t){return new class extends lr{constructor(){super(...arguments),this.key=t.key,this._drivers=t.drivers?[...t.drivers]:[]}}}addDriver(t){if(!(t&&t.filter&&t.enter&&t.exit&&t.update))throw"Invalid driver: "+t;return this._drivers.push(t),this}data(t){this.setData(t)}setData(t){if(!Array.isArray(t))throw"Invalid data: "+t;this._enterBuffer.length=0,this._enterKeys.length=0,this._exitBuffer.length=0,this._exitKeys.length=0,this._updateBuffer.length=t.length,this._updateKeys.length=t.length;for(let n=0;n<t.length;n++){const r=t[n];if(typeof r!="object"||r===null)continue;const s=this.key(r);if(!rl(s)){console.warn("Invalid key, data is ignored: "+s,r);continue}if(this._mapBuffer[s]){console.warn("Duplicate key, data is ignored: "+s,r);continue}this._map[s]?delete this._map[s]:(this._enterBuffer.push(r),this._enterKeys.push(s)),this._updateBuffer[n]=r,this._updateKeys[n]=s,this._mapBuffer[s]=r}for(const n in this._map)this._exitBuffer.push(this._map[n]),this._exitKeys.push(n),delete this._map[n];const e=this._map;this._map=this._mapBuffer,this._mapBuffer=e;for(let n=0;n<this._exitBuffer.length;n++){const r=this._exitBuffer[n],s=this._exitKeys[n];for(const o of this._drivers){if(o.filter(r)){const a=o._componentsById[s];a!==void 0&&o.exit(r,a)}delete o._componentsById[s]}}for(let n=0;n<this._enterBuffer.length;n++){const r=this._enterBuffer[n],s=this._enterKeys[n];for(const o of this._drivers)if(o.filter(r)){const a=o.enter(r);a&&(o._componentsById[s]=a)}}for(let n=0;n<this._updateBuffer.length;n++){const r=this._updateBuffer[n];if(r===void 0)continue;const s=this._updateKeys[n];for(const o of this._drivers)if(o.filter(r)){const a=o._componentsById[s];a!==void 0&&o.update(r,a)}}this._enterBuffer.length=0,this._enterKeys.length=0,this._exitBuffer.length=0,this._exitKeys.length=0,this._updateBuffer.length=0,this._updateKeys.length=0}}function rl(i){return typeof i=="string"?i!=="":typeof i=="number"?i===i:!1}class is{static create(t){return new is(t)}constructor(t){this.name=t}}const sl=is.create("polymatic:failure"),ol="__POLYMATIC_INSPECTOR__";function Ms(i){globalThis[ol]=i??void 0}var cr,Z,ua,Ue,Cs,_a,pa,pr,Gn,nn,da,ns,Jr,Yr,Xn={},Zn=[],al=/acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i,hr=Array.isArray;function Le(i,t){for(var e in t)i[e]=t[e];return i}function rs(i){i&&i.parentNode&&i.parentNode.removeChild(i)}function ll(i,t,e){var n,r,s,o={};for(s in t)s=="key"?n=t[s]:s=="ref"?r=t[s]:o[s]=t[s];if(arguments.length>2&&(o.children=arguments.length>3?cr.call(arguments,2):e),typeof i=="function"&&i.defaultProps!=null)for(s in i.defaultProps)o[s]===void 0&&(o[s]=i.defaultProps[s]);return Hn(i,o,n,r,null)}function Hn(i,t,e,n,r){var s={type:i,props:t,key:e,ref:n,__k:null,__:null,__b:0,__e:null,__c:null,constructor:void 0,__v:r??++ua,__i:-1,__u:0};return r==null&&Z.vnode!=null&&Z.vnode(s),s}function Di(i){return i.children}function jn(i,t){this.props=i,this.context=t}function hi(i,t){if(t==null)return i.__?hi(i.__,i.__i+1):null;for(var e;t<i.__k.length;t++)if((e=i.__k[t])!=null&&e.__e!=null)return e.__e;return typeof i.type=="function"?hi(i):null}function cl(i){if(i.__P&&i.__d){var t=i.__v,e=t.__e,n=[],r=[],s=Le({},t);s.__v=t.__v+1,Z.vnode&&Z.vnode(s),ss(i.__P,s,t,i.__n,i.__P.namespaceURI,32&t.__u?[e]:null,n,e??hi(t),!!(32&t.__u),r),s.__v=t.__v,s.__.__k[s.__i]=s,ga(n,s,r),t.__e=t.__=null,s.__e!=e&&fa(s)}}function fa(i){if((i=i.__)!=null&&i.__c!=null)return i.__e=i.__c.base=null,i.__k.some(function(t){if(t!=null&&t.__e!=null)return i.__e=i.__c.base=t.__e}),fa(i)}function Vs(i){(!i.__d&&(i.__d=!0)&&Ue.push(i)&&!Qn.__r++||Cs!=Z.debounceRendering)&&((Cs=Z.debounceRendering)||_a)(Qn)}function Qn(){try{for(var i,t=1;Ue.length;)Ue.length>t&&Ue.sort(pa),i=Ue.shift(),t=Ue.length,cl(i)}finally{Ue.length=Qn.__r=0}}function va(i,t,e,n,r,s,o,a,l,h,_){var p,c,m,f,d,v,y=n&&n.__k||Zn,x=t.length;for(l=hl(e,t,y,l,x),p=0;p<x;p++)(m=e.__k[p])!=null&&(c=m.__i!=-1&&y[m.__i]||Xn,m.__i=p,v=ss(i,m,c,r,s,o,a,l,h,_),f=m.__e,m.ref&&c.ref!=m.ref&&(c.ref&&os(c.ref,null,m),_.push(m.ref,m.__c||f,m)),d==null&&f!=null&&(d=f),4&m.__u?(l=ya(m,l,i),c.__e&&(c.__e=null)):typeof m.type=="function"&&v!==void 0?l=v:f&&(l=f.nextSibling),m.__u&=-7);return e.__e=d,l}function hl(i,t,e,n,r){var s,o,a,l,h,_=e.length,p=_,c=0;for(i.__k=new Array(r),s=0;s<r;s++)(o=t[s])!=null&&typeof o!="boolean"&&typeof o!="function"?(typeof o=="string"||typeof o=="number"||typeof o=="bigint"||o.constructor==String?o=i.__k[s]=Hn(null,o,null,null,null):hr(o)?o=i.__k[s]=Hn(Di,{children:o},null,null,null):o.constructor===void 0&&o.__b>0?o=i.__k[s]=Hn(o.type,o.props,o.key,o.ref?o.ref:null,o.__v):i.__k[s]=o,l=s+c,o.__=i,o.__b=i.__b+1,a=null,(h=o.__i=ml(o,e,l,p))!=-1&&(p--,(a=e[h])&&(a.__u|=2)),a==null||a.__v==null?(h==-1&&(r>_?c--:r<_&&c++),typeof o.type!="function"&&(o.__u|=4)):h!=l&&(h==l-1?c--:h==l+1?c++:(h>l?c--:c++,o.__u|=4))):i.__k[s]=null;if(p)for(s=0;s<_;s++)(a=e[s])!=null&&(2&a.__u)==0&&(a.__e==n&&(n=hi(a)),Aa(a,a));return n}function ya(i,t,e){var n,r;if(typeof i.type=="function"){for(n=i.__k,r=0;n&&r<n.length;r++)n[r]&&(n[r].__=i,t=ya(n[r],t,e));return t}i.__e!=t&&(t&&i.type&&!t.parentNode&&(t=hi(i)),t=e.insertBefore(i.__e,t||null));do t=t&&t.nextSibling;while(t!=null&&t.nodeType==8);return t}function ml(i,t,e,n){var r,s,o,a=i.key,l=i.type,h=t[e],_=h!=null&&(2&h.__u)==0;if(h===null&&a==null||_&&a==h.key&&l==h.type)return e;if(n>(_?1:0)){for(r=e-1,s=e+1;r>=0||s<t.length;)if((h=t[o=r>=0?r--:s++])!=null&&(2&h.__u)==0&&a==h.key&&l==h.type)return o}return-1}function Ss(i,t,e){t[0]=="-"?i.setProperty(t,e??""):i[t]=e==null?"":typeof e!="number"||al.test(t)?e:e+"px"}function un(i,t,e,n,r){var s,o;t:if(t=="style")if(typeof e=="string")i.style.cssText=e;else{if(typeof n=="string"&&(i.style.cssText=n=""),n)for(t in n)e&&t in e||Ss(i.style,t,"");if(e)for(t in e)n&&e[t]==n[t]||Ss(i.style,t,e[t])}else if(t[0]=="o"&&t[1]=="n")s=t!=(t=t.replace(da,"$1")),o=t.toLowerCase(),t=o in i||t=="onFocusOut"||t=="onFocusIn"?o.slice(2):t.slice(2),i.l||(i.l={}),i.l[t+s]=e,e?n?e[nn]=n[nn]:(e[nn]=ns,i.addEventListener(t,s?Yr:Jr,s)):i.removeEventListener(t,s?Yr:Jr,s);else{if(r=="http://www.w3.org/2000/svg")t=t.replace(/xlink(H|:h)/,"h").replace(/sName$/,"s");else if(t!="width"&&t!="height"&&t!="href"&&t!="list"&&t!="form"&&t!="tabIndex"&&t!="download"&&t!="rowSpan"&&t!="colSpan"&&t!="role"&&t!="popover"&&t in i)try{i[t]=e??"";break t}catch{}typeof e=="function"||(e==null||e===!1&&t[4]!="-"?i.removeAttribute(t):i.setAttribute(t,t=="popover"&&e==1?"":e))}}function Is(i){return function(t){if(this.l){var e=this.l[t.type+i];if(t[Gn]==null)t[Gn]=ns++;else if(t[Gn]<e[nn])return;return e(Z.event?Z.event(t):t)}}}function ss(i,t,e,n,r,s,o,a,l,h){var _,p,c,m,f,d,v,y,x,b,B,A,M,C,I,T,L=t.type;if(t.constructor!==void 0)return null;128&e.__u&&(l=!!(32&e.__u),s=[a=t.__e=e.__e]),(_=Z.__b)&&_(t);t:if(typeof L=="function"){p=o.length;try{if(x=t.props,b=L.prototype&&L.prototype.render,B=(_=L.contextType)&&n[_.__c],A=_?B?B.props.value:_.__:n,e.__c?y=(c=t.__c=e.__c).__=c.__E:(b?t.__c=c=new L(x,A):(t.__c=c=new jn(x,A),c.constructor=L,c.render=_l),B&&B.sub(c),c.state||(c.state={}),c.__n=n,m=c.__d=!0,c.__h=[],c._sb=[]),b&&c.__s==null&&(c.__s=c.state),b&&L.getDerivedStateFromProps!=null&&(c.__s==c.state&&(c.__s=Le({},c.__s)),Le(c.__s,L.getDerivedStateFromProps(x,c.__s))),f=c.props,d=c.state,c.__v=t,m)b&&L.getDerivedStateFromProps==null&&c.componentWillMount!=null&&c.componentWillMount(),b&&c.componentDidMount!=null&&c.__h.push(c.componentDidMount);else{if(b&&L.getDerivedStateFromProps==null&&x!==f&&c.componentWillReceiveProps!=null&&c.componentWillReceiveProps(x,A),t.__v==e.__v||!c.__e&&c.shouldComponentUpdate!=null&&c.shouldComponentUpdate(x,c.__s,A)===!1){t.__v!=e.__v&&(c.props=x,c.state=c.__s,c.__d=!1),t.__e=e.__e,t.__k=e.__k,t.__k.some(function(q){q&&(q.__=t)}),Zn.push.apply(c.__h,c._sb),c._sb=[],c.__h.length&&o.push(c),a=hi(e);break t}c.componentWillUpdate!=null&&c.componentWillUpdate(x,c.__s,A),b&&c.componentDidUpdate!=null&&c.__h.push(function(){c.componentDidUpdate(f,d,v)})}if(c.context=A,c.props=x,c.__P=i,c.__e=!1,M=Z.__r,C=0,b)c.state=c.__s,c.__d=!1,M&&M(t),_=c.render(c.props,c.state,c.context),Zn.push.apply(c.__h,c._sb),c._sb=[];else do c.__d=!1,M&&M(t),_=c.render(c.props,c.state,c.context),c.state=c.__s;while(c.__d&&++C<25);c.state=c.__s,c.getChildContext!=null&&(n=Le(Le({},n),c.getChildContext())),b&&!m&&c.getSnapshotBeforeUpdate!=null&&(v=c.getSnapshotBeforeUpdate(f,d)),I=_!=null&&_.type===Di&&_.key==null?ba(_.props.children):_,a=va(i,hr(I)?I:[I],t,e,n,r,s,o,a,l,h),c.base=t.__e,t.__u&=-161,c.__h.length&&o.push(c),y&&(c.__E=c.__=null)}catch(q){if(o.length=p,t.__v=null,l||s!=null){if(q.then){for(t.__u|=l?160:128;a&&a.nodeType==8&&a.nextSibling;)a=a.nextSibling;s!=null&&(s[s.indexOf(a)]=null),t.__e=a}else if(s!=null)for(T=s.length;T--;)rs(s[T])}else t.__e=e.__e;t.__k==null&&(t.__k=e.__k||[]),q.then||xa(t),Z.__e(q,t,e)}}else s==null&&t.__v==e.__v?(t.__k=e.__k,t.__e=e.__e):a=t.__e=ul(e.__e,t,e,n,r,s,o,l,h);return(_=Z.diffed)&&_(t),128&t.__u?void 0:a}function xa(i){i&&(i.__c&&(i.__c.__e=!0),i.__k&&i.__k.some(xa))}function ga(i,t,e){for(var n=0;n<e.length;n++)os(e[n],e[++n],e[++n]);Z.__c&&Z.__c(t,i),i.some(function(r){try{i=r.__h,r.__h=[],i.some(function(s){s.call(r)})}catch(s){Z.__e(s,r.__v)}})}function ba(i){return typeof i!="object"||i==null||i.__b>0?i:hr(i)?i.map(ba):i.constructor!==void 0?null:Le({},i)}function ul(i,t,e,n,r,s,o,a,l){var h,_,p,c,m,f,d,v=e.props||Xn,y=t.props,x=t.type;if(x=="svg"?r="http://www.w3.org/2000/svg":x=="math"?r="http://www.w3.org/1998/Math/MathML":r||(r="http://www.w3.org/1999/xhtml"),s!=null){for(h=0;h<s.length;h++)if((m=s[h])&&"setAttribute"in m==!!x&&(x?m.localName==x:m.nodeType==3)){i=m,s[h]=null;break}}if(i==null){if(x==null)return document.createTextNode(y);i=document.createElementNS(r,x,y.is&&y),a&&(Z.__m&&Z.__m(t,s),a=!1),s=null}if(x==null)v===y||a&&i.data==y||(i.data=y);else{if(s=x=="textarea"&&y.defaultValue!=null?null:s&&cr.call(i.childNodes),!a&&s!=null)for(v={},h=0;h<i.attributes.length;h++)v[(m=i.attributes[h]).name]=m.value;for(h in v)m=v[h],h=="dangerouslySetInnerHTML"?p=m:h=="children"||h in y||h=="value"&&"defaultValue"in y||h=="checked"&&"defaultChecked"in y||un(i,h,null,m,r);for(h in y)m=y[h],h=="children"?c=m:h=="dangerouslySetInnerHTML"?_=m:h=="value"?f=m:h=="checked"?d=m:a&&typeof m!="function"||v[h]===m||un(i,h,m,v[h],r);if(_)a||p&&(_.__html==p.__html||_.__html==i.innerHTML)||(i.innerHTML=_.__html),t.__k=[];else if(p&&(i.innerHTML=""),va(t.type=="template"?i.content:i,hr(c)?c:[c],t,e,n,x=="foreignObject"?"http://www.w3.org/1999/xhtml":r,s,o,s?s[0]:e.__k&&hi(e,0),a,l),s!=null)for(h=s.length;h--;)rs(s[h]);a&&x!="textarea"||(h="value",x=="progress"&&f==null?i.removeAttribute("value"):f!=null&&(f!==i[h]||x=="progress"&&!f||x=="option"&&f!=v[h])&&un(i,h,f,v[h],r),h="checked",d!=null&&d!=i[h]&&un(i,h,d,v[h],r))}return i}function os(i,t,e){try{if(typeof i=="function"){var n=typeof i.__u=="function";n&&i.__u(),n&&t==null||(i.__u=i(t))}else i.current=t}catch(r){Z.__e(r,e)}}function Aa(i,t,e){var n,r;if(Z.unmount&&Z.unmount(i),(n=i.ref)&&(n.current&&n.current!=i.__e||os(n,null,t)),(n=i.__c)!=null){if(n.componentWillUnmount)try{n.componentWillUnmount()}catch(s){Z.__e(s,t)}n.base=n.__P=n.__n=null}if(n=i.__k)for(r=0;r<n.length;r++)n[r]&&Aa(n[r],t,e||typeof i.type!="function");e||rs(i.__e),i.__c=i.__=i.__e=void 0}function _l(i,t,e){return this.constructor(i,e)}function pl(i,t,e){var n,r,s,o;t==document&&(t=document.documentElement),Z.__&&Z.__(i,t),r=(n=!1)?null:t.__k,s=[],o=[],ss(t,i=t.__k=ll(Di,null,[i]),r||Xn,Xn,t.namespaceURI,r?null:t.firstChild?cr.call(t.childNodes):null,s,r?r.__e:t.firstChild,n,o),ga(s,i,o),i.props.children=null}cr=Zn.slice,Z={__e:function(i,t,e,n){for(var r,s,o;t=t.__;)if((r=t.__c)&&!r.__)try{if((s=r.constructor)&&s.getDerivedStateFromError!=null&&(r.setState(s.getDerivedStateFromError(i)),o=r.__d),r.componentDidCatch!=null&&(r.componentDidCatch(i,n||{}),o=r.__d),o)return r.__E=r}catch(a){i=a}throw i}},ua=0,jn.prototype.setState=function(i,t){var e;e=this.__s!=null&&this.__s!=this.state?this.__s:this.__s=Le({},this.state),typeof i=="function"&&(i=i(Le({},e),this.props)),i&&Le(e,i),i!=null&&this.__v&&(t&&this._sb.push(t),Vs(this))},jn.prototype.forceUpdate=function(i){this.__v&&(this.__e=!0,i&&this.__h.push(i),Vs(this))},jn.prototype.render=Di,Ue=[],_a=typeof Promise=="function"?Promise.prototype.then.bind(Promise.resolve()):setTimeout,pa=function(i,t){return i.__v.__b-t.__v.__b},Qn.__r=0,pr=Math.random().toString(8),Gn="__d"+pr,nn="__a"+pr,da=/(PointerCapture)$|Capture$/i,ns=0,Jr=Is(!1),Yr=Is(!0);var dl=0;function S(i,t,e,n,r,s){t||(t={});var o,a,l=t;if("ref"in l)for(a in l={},t)a=="ref"?o=t[a]:l[a]=t[a];var h={type:i,props:l,key:e,ref:o,__k:null,__:null,__b:0,__e:null,__c:null,constructor:void 0,__v:--dl,__i:-1,__u:0,__source:r,__self:s};if(typeof i=="function"&&(o=i.defaultProps))for(a in o)l[a]===void 0&&(l[a]=o[a]);return Z.vnode&&Z.vnode(h),h}var an,ot,dr,Ps,tr=0,wa=[],_t=Z,Ls=_t.__b,Ts=_t.__r,zs=_t.diffed,Fs=_t.__c,qs=_t.unmount,Es=_t.__;function as(i,t){_t.__h&&_t.__h(ot,i,tr||t),tr=0;var e=ot.__H||(ot.__H={__:[],__h:[]});return i>=e.__.length&&e.__.push({}),e.__[i]}function Ti(i){return tr=1,fl(ka,i)}function fl(i,t,e){var n=as(an++,2);if(n.t=i,!n.__c&&(n.__=[ka(void 0,t),function(a){var l=n.__N?n.__N[0]:n.__[0],h=n.t(l,a);l!==h&&(n.__N=[h,n.__[1]],n.__c.setState({}))}],n.__c=ot,!ot.__f)){var r=function(a,l,h){if(!n.__c.__H)return!0;var _=!1,p=n.__c.props!==a;if(n.__c.__H.__.some(function(m){if(m.__N){_=!0;var f=m.__[0];m.__=m.__N,m.__N=void 0,f!==m.__[0]&&(p=!0)}}),s){var c=s.call(this,a,l,h);return _?c||p:c}return!_||p};ot.__f=!0;var s=ot.shouldComponentUpdate,o=ot.componentWillUpdate;ot.componentWillUpdate=function(a,l,h){if(this.__e){var _=s;s=void 0,r(a,l,h),s=_}o&&o.call(this,a,l,h)},ot.shouldComponentUpdate=r}return n.__N||n.__}function vl(i,t){var e=as(an++,3);!_t.__s&&Ba(e.__H,t)&&(e.__=i,e.u=t,ot.__H.__h.push(e))}function yl(i){return tr=5,xl(function(){return{current:i}},[])}function xl(i,t){var e=as(an++,7);return Ba(e.__H,t)&&(e.__=i(),e.__H=t,e.__h=i),e.__}function gl(){for(var i;i=wa.shift();){var t=i.__H;if(i.__P&&t)try{t.__h.some(Jn),t.__h.some(Wr),t.__h=[]}catch(e){t.__h=[],_t.__e(e,i.__v)}}}_t.__b=function(i){ot=null,Ls&&Ls(i)},_t.__=function(i,t){i&&t.__k&&t.__k.__m&&(i.__m=t.__k.__m),Es&&Es(i,t)},_t.__r=function(i){Ts&&Ts(i),an=0;var t=(ot=i.__c).__H;t&&(dr===ot?(t.__h=[],ot.__h=[],t.__.some(function(e){e.__N&&(e.__=e.__N),e.u=e.__N=void 0})):(t.__h.some(Jn),t.__h.some(Wr),t.__h=[],an=0)),dr=ot},_t.diffed=function(i){zs&&zs(i);var t=i.__c;t&&t.__H&&(t.__H.__h.length&&(wa.push(t)!==1&&Ps===_t.requestAnimationFrame||((Ps=_t.requestAnimationFrame)||bl)(gl)),t.__H.__.some(function(e){e.u&&(e.__H=e.u,e.u=void 0)})),dr=ot=null},_t.__c=function(i,t){t.some(function(e){try{e.__h.some(Jn),e.__h=e.__h.filter(function(n){return!n.__||Wr(n)})}catch(n){t.some(function(r){r.__h&&(r.__h=[])}),t=[],_t.__e(n,e.__v)}}),Fs&&Fs(i,t)},_t.unmount=function(i){qs&&qs(i);var t,e=i.__c;e&&e.__H&&(e.__H.__.some(function(n){try{Jn(n)}catch(r){t=r}}),e.__H=void 0,t&&_t.__e(t,e.__v))};var Ds=typeof requestAnimationFrame=="function";function bl(i){var t,e=function(){clearTimeout(n),Ds&&cancelAnimationFrame(t),setTimeout(i)},n=setTimeout(e,35);Ds&&(t=requestAnimationFrame(e))}function Jn(i){var t=ot,e=i.__c;typeof e=="function"&&(i.__c=void 0,e()),ot=t}function Wr(i){var t=ot;i.__c=i.__(),ot=t}function Ba(i,t){return!i||i.length!==t.length||t.some(function(e,n){return e!==i[n]})}function ka(i,t){return typeof t=="function"?t(i):t}function Et(i){var t,e,n;return i?(n=(t=i.displayName)!==null&&t!==void 0?t:(e=i.constructor)===null||e===void 0?void 0:e.name)!==null&&n!==void 0?n:"Middleware":"?"}function qi(i,t=1,e=120){const n=Yn(i,t,new WeakSet);return n.length>e?n.slice(0,e-1)+"…":n}function Yn(i,t,e){if(i===void 0)return"";if(i===null)return"null";switch(typeof i){case"string":return JSON.stringify(i);case"number":return Number.isInteger(i)?String(i):i.toFixed(2);case"boolean":case"bigint":return String(i);case"function":return"ƒ "+(i.name||"anonymous");case"symbol":return i.toString()}if(e.has(i))return"↻";if(e.add(i),ls(i))return"signal("+Yn(i.peek(),t,e)+")";if(i.__handlers&&i.__children)return"<"+Et(i)+">";if(typeof Node<"u"&&i instanceof Node)return"<"+i.nodeName.toLowerCase()+">";if(Array.isArray(i))return t<=0?"[…"+i.length+"]":"["+i.slice(0,5).map(a=>Yn(a,t-1,e)).join(", ")+(i.length>5?", …"+(i.length-5):"")+"]";const n=i.constructor&&i.constructor!==Object?i.constructor.name+" ":"",r=Object.keys(i);if(t<=0)return n+"{…"+r.length+"}";const s=r.slice(0,6).map(o=>o+": "+Yn(i[o],t-1,e));return n+"{"+s.join(", ")+(r.length>6?", …":"")+"}"}function ls(i){return typeof i.peek=="function"&&typeof i.subscribe=="function"&&"value"in i}function Qi(i,t){var e;if(!t)return i;let n=i;for(const r of t.split(".").filter(Boolean)){if(n==null)return;n=ls(n)?(e=n.peek())===null||e===void 0?void 0:e[r]:n[r]}return n}function Te(i){return i<.1?"<0.1ms":i.toFixed(i<10?2:1)+"ms"}function ri(i,t=3,e=[]){if(i==null)return i;switch(typeof i){case"number":return Number.isFinite(i)?i:String(i);case"string":case"boolean":return i;case"bigint":case"symbol":return i.toString();case"function":return}if(e.indexOf(i)>=0)return"[Circular]";if(ls(i))return ri(i.peek(),t,e);if(i.__handlers&&i.__children)return"<"+Et(i)+">";if(typeof Node<"u"&&i instanceof Node)return"<"+i.nodeName.toLowerCase()+">";const n=i.constructor&&i.constructor!==Object?i.constructor.name:"";if(t<=0)return Array.isArray(i)?"[Array("+i.length+")]":"["+(n||"Object")+"]";e.push(i);try{if(Array.isArray(i))return i.map(s=>{var o;return(o=ri(s,t-1,e))!==null&&o!==void 0?o:null});if(i instanceof Map){const s=[];return i.forEach((o,a)=>s.push([ri(a,t-1,e),ri(o,t-1,e)])),s}if(i instanceof Set){const s=[];return i.forEach(o=>s.push(ri(o,t-1,e))),s}const r={};n&&(r.$class=n);for(const s of Object.keys(i)){const o=ri(i[s],t-1,e);o!==void 0&&(r[s]=o)}return r}finally{e.pop()}}const fr=new Set(["activate","deactivate"]),Al=60,wl=100;class Bl{constructor(t={}){this.runtimes=new Set,this.events=[],this.lifecycle=[],this.failures=[],this.sent=new Map,this.unhandled=new Map,this.lastId=0,this.nextId=1,this.queued=[],this.current=null,this.frames=new Map,this.frame=null,this.listeners=new Set,this.frameEvents=new Set(["frame-update","frame-render"]),this.maxEvents=500,this.logFrameEvents=!1,this.configure(t)}configure(t){t.frameEvents&&(this.frameEvents=new Set(t.frameEvents)),t.logFrameEvents!==void 0&&(this.logFrameEvents=t.logFrameEvents),t.maxEvents!==void 0&&(this.maxEvents=t.maxEvents,this.events.splice(0,Math.max(0,this.events.length-this.maxEvents)),this.lifecycle.splice(0,Math.max(0,this.lifecycle.length-this.maxEvents)))}onDelivered(t){return this.listeners.add(t),()=>this.listeners.delete(t)}clear(){this.events.length=0,this.lifecycle.length=0,this.sent.clear(),this.unhandled.clear(),this.frames.clear(),this.failures.length=0}emit(t,e,n){var r;const s=kl(n);s&&this.runtimes.add(s),this.sent.set(t,((r=this.sent.get(t))!==null&&r!==void 0?r:0)+1);const o={id:this.nextId++,type:t,from:Et(n),payload:qi(e,1,80),sent:performance.now(),handlers:[]};this.queued.push({record:o,ev:e,runtime:s})}dispatch(t,e,n){this.runtimes.add(n);const r=this.queued.findIndex(o=>o.record.type===t&&o.ev===e&&o.runtime===n),s=r>=0?this.queued.splice(r,1)[0].record:{id:this.nextId++,type:t,from:"?",payload:qi(e,1,80),sent:performance.now(),handlers:[]};s.delivered=performance.now(),this.current=s,this.frame=this.frameEvents.has(t)?new Map:null}handle(t,e,n,r,s){var o,a,l;if(fr.has(t)&&((o=this.current)===null||o===void 0?void 0:o.type)!==t){const h=this.lifecycle[this.lifecycle.length-1];h&&h.change===t&&h.middleware===Et(n)&&(h.ms=r);return}!this.current||this.current.type!==t||(this.current.handlers.push({middleware:Et(n),ms:r,stopped:s}),(a=this.frame)===null||a===void 0||a.set(n,((l=this.frame.get(n))!==null&&l!==void 0?l:0)+r))}dispatched(t,e,n){var r;const s=this.current;if(this.current=null,!!s){if(s.handled=n,this.lastId=s.id,n===0&&!fr.has(t)&&this.unhandled.set(t,((r=this.unhandled.get(t))!==null&&r!==void 0?r:0)+1),this.frame){let o=this.frames.get(t);o||this.frames.set(t,o=[]),o.push(this.frame),o.length>Al&&o.shift(),this.frame=null}(this.logFrameEvents||!this.frameEvents.has(t))&&(this.events.push(s),this.events.length>this.maxEvents&&this.events.shift()),this.listeners.forEach(o=>o(s))}}activate(t){t.__parent||this.runtimes.add(t),this.pushLifecycle(t,"activate")}deactivate(t){this.pushLifecycle(t,"deactivate")}pushLifecycle(t,e){this.lifecycle.push({time:performance.now(),middleware:Et(t),change:e}),this.lifecycle.length>this.maxEvents&&this.lifecycle.shift()}failure(t,e){const n=Et(t.middleware),r=t.error,s=r instanceof Error?r.name+": "+r.message:String(r),o=performance.now();let a;const l=this.current,h=l==null?void 0:l.handlers[l.handlers.length-1];l&&l.type===t.type&&(h==null?void 0:h.middleware)===n&&(h.failed=!0,a=l.id);let _=this.failures.find(p=>p.middleware===n&&p.type===t.type&&p.message===s);_||(_={middleware:n,type:t.type,message:s,stack:r==null?void 0:r.stack,count:0,first:o,last:o,stoppedBy:null},this.failures.push(_),this.failures.length>wl&&this.failures.shift()),_.count++,_.last=o,_.stoppedBy=e?Et(e):null,_.eventId=a}frameCosts(){const t={};return this.frames.forEach((e,n)=>{const r=new Map;for(const s of e)s.forEach((o,a)=>{var l;const h=(l=r.get(a))!==null&&l!==void 0?l:{sum:0,max:0};h.sum+=o,h.max=Math.max(h.max,o),r.set(a,h)});t[n]=[...r.entries()].map(([s,o])=>({middleware:Et(s),avg:o.sum/e.length,max:o.max})).sort((s,o)=>o.avg-s.avg)}),t}unmatched(){const t=[...this.unhandled.entries()].map(([r,s])=>({type:r,count:s})),e=new Map;for(const r of this.runtimes)mr(r,s=>{var o;if(s.activated)for(const a of Object.keys(s.__handlers))fr.has(a)||a===sl.name||this.sent.has(a)||e.set(a,[...(o=e.get(a))!==null&&o!==void 0?o:[],Et(s)])});const n=[...e.entries()].map(([r,s])=>({type:r,middlewares:s}));return{noHandler:t,notSent:n}}}function kl(i){let t=i;for(;t!=null&&t.__parent;)t=t.__parent;return t&&t!==i||t!=null&&t.activated?t:null}function mr(i,t,e=0){t(i,e);for(const n of i.__children)mr(n,t,e+1)}const Ml=new Set(["activate","deactivate"]),Cl=500;class Vl{constructor(t){this.recorder=t,this.host=document.createElement("div"),this.host.setAttribute("data-polymatic-devtools",""),this.root=this.host.attachShadow({mode:"open"})}get visible(){return this.host.isConnected}show(){this.visible||document.body.append(this.host),this.render()}hide(){this.host.remove(),this.render()}toggle(){this.visible?this.hide():this.show()}render(){pl(S(Il,{recorder:this.recorder,visible:this.visible,onClose:()=>this.hide()}),this.root)}}const Sl=[{key:"tree",title:"Tree"},{key:"events",title:"Events"},{key:"frame",title:"Frame"},{key:"issues",title:"Issues"},{key:"context",title:"Context"}];function Il(i){const{recorder:t,visible:e}=i,[n,r]=Ti("events"),[,s]=Ti(0),o=yl(null);vl(()=>{if(!e)return;const l=setInterval(()=>s(h=>h+1),Cl);return()=>clearInterval(l)},[e]);const a=l=>{if(l.target.closest("button"))return;const h=o.current,_=h.getBoundingClientRect(),p=l.clientX-_.left,c=l.clientY-_.top,m=d=>{h.style.left=Math.max(0,d.clientX-p)+"px",h.style.top=Math.max(0,d.clientY-c)+"px",h.style.right="auto",h.style.bottom="auto"},f=()=>{window.removeEventListener("mousemove",m),window.removeEventListener("mouseup",f)};window.addEventListener("mousemove",m),window.addEventListener("mouseup",f),l.preventDefault()};return S(Di,{children:[S("style",{children:El}),S("div",{class:"panel",ref:o,children:[S("div",{class:"header",onMouseDown:a,children:[S("span",{class:"title",children:"polymatic"}),S("div",{class:"tabs",children:Sl.map(l=>{const h=l.key==="issues"?t.failures.length:0;return S("button",{class:"tab"+(l.key===n?" active":"")+(h?" error":""),onClick:()=>r(l.key),children:[l.title,h?" ("+h+")":""]},l.key)})}),S("button",{class:"close",title:"Close (Alt+Shift+D)",onClick:i.onClose,children:"×"})]}),S("div",{class:"tab-view",hidden:n!=="tree",children:n==="tree"&&S(Pl,{recorder:t})}),S(Ll,{recorder:t,hidden:n!=="events"}),S("div",{class:"tab-view",hidden:n!=="frame",children:n==="frame"&&S(zl,{recorder:t})}),S("div",{class:"tab-view",hidden:n!=="issues",children:n==="issues"&&S(Fl,{recorder:t})}),S(ql,{recorder:t,hidden:n!=="context"})]})]})}function Ma(){var i;return String((i=document.getSelection())!==null&&i!==void 0?i:"").length>0}function Pl({recorder:i}){const t=[];for(const e of i.runtimes)mr(e,(n,r)=>{t.push(S("div",{class:"row"+(n.activated?"":" inactive"),style:{paddingLeft:r*14+4+"px"},children:[S("span",{class:"dot",title:n.activated?"active":"inactive",children:n.activated?"●":"○"}),S("span",{class:"name",children:Et(n)}),Object.keys(n.__handlers).map(s=>S("span",{class:"chip"+(Ml.has(s)||i.sent.has(s)?"":" dim"),children:s},s))]}))});return S("div",{class:"content tree",children:t.length?t:S("div",{class:"empty",children:"No runtime seen yet"})})}function Ll({recorder:i,hidden:t}){const[e,n]=Ti(""),[r,s]=Ti(null),[o,a]=Ti(()=>new Set),l=c=>{if(Ma())return;const m=new Set(o);m.has(c)?m.delete(c):m.add(c),a(m)},h=r??i.events,_=e.trim().toLowerCase(),p=t?[]:h.filter(c=>!_||c.type.toLowerCase().includes(_)||c.from.toLowerCase().includes(_)).slice(-200).reverse();return S("div",{class:"tab-view",hidden:t,children:[S("div",{class:"toolbar bar",children:[S("input",{placeholder:"filter events",value:e,onInput:c=>n(c.target.value)}),S("label",{children:[S("input",{type:"checkbox",checked:!!r,onChange:c=>s(c.target.checked?i.events.slice():null)})," ","pause"]}),S("button",{onClick:()=>{i.clear(),a(new Set),r&&s([])},children:"clear"})]}),S("div",{class:"content events",children:[!p.length&&S("div",{class:"empty",children:h.length?"No matching events":"No events yet"}),p.map(c=>S(Tl,{event:c,open:o.has(c.id),onToggle:l},c.id))]})]})}function Tl({event:i,open:t,onToggle:e}){var n,r,s;const o=i.handlers.find(l=>l.stopped),a=i.handlers.reduce((l,h)=>l+h.ms,0);return S(Di,{children:[S("div",{class:"row event"+(i.handled===0?" unhandled":""),onClick:()=>e(i.id),children:[S("span",{class:"time",children:(((n=i.delivered)!==null&&n!==void 0?n:i.sent)/1e3).toFixed(2)+"s"}),S("span",{class:"name",children:i.type}),S("span",{class:"muted",children:["from ",i.from]}),S("span",{class:"badge"+(i.handled===0?" warn":""),children:String((r=i.handled)!==null&&r!==void 0?r:"…")}),i.handlers.some(l=>l.failed)&&S("span",{class:"error",children:"failed"}),o&&S("span",{class:"stop",children:["stopped by ",o.middleware]}),S("span",{class:"muted right",children:Te(a)})]}),t&&S("div",{class:"details",children:[S("div",{class:"muted",children:["payload ",i.payload||"(none)"]}),S("div",{class:"muted",children:["queued ",Te(((s=i.delivered)!==null&&s!==void 0?s:i.sent)-i.sent)," before delivery"]}),!i.handlers.length&&S("div",{class:"warn",children:"no middleware handled it"}),i.handlers.map((l,h)=>S("div",{class:"handler",children:[S("span",{children:l.middleware}),S("span",{class:"muted",children:Te(l.ms)}),l.failed&&S("span",{class:"error",children:"threw"}),l.stopped&&S("span",{class:"stop",children:"stopped"})]},h))]})]})}function zl({recorder:i}){const t=i.frameCosts(),e=Object.keys(t);return S("div",{class:"content",children:[!e.length&&S("div",{class:"empty",children:"No frame events yet"}),e.map(n=>{const r=t[n],s=r.reduce((o,a)=>o+a.avg,0);return S("div",{children:[S("div",{class:"section",children:[n," — ",Te(s)," per frame, last 60 frames"]}),r.map(o=>S("div",{class:"row",children:[S("span",{class:"name",children:o.middleware}),S("span",{class:"bar-graph",style:{width:Math.min(100,o.avg/(s||1)*100)+"%"}}),S("span",{class:"muted right",children:[Te(o.avg)," avg, ",Te(o.max)," max"]})]},o.middleware))]},n)})]})}function Fl({recorder:i}){const{noHandler:t,notSent:e}=i.unmatched(),n=i.failures.slice().reverse();return S("div",{class:"content",children:[S("div",{class:"section",children:"Failed handlers"}),!n.length&&S("div",{class:"empty",children:"None"}),n.map(r=>{var s;return S("div",{class:"row",title:(s=r.stack)!==null&&s!==void 0?s:r.message,children:[S("span",{class:"name error",children:r.middleware}),S("span",{class:"muted",children:["handling ",r.type]}),S("span",{class:"value",children:r.message}),S("span",{class:"muted right",children:[r.stoppedBy?"stopped by "+r.stoppedBy:"uncaught"," · ",r.count,"×"]})]},r.middleware+" "+r.type+" "+r.message)}),S("div",{class:"section",children:"Sent, but no middleware handled them"}),!t.length&&S("div",{class:"empty",children:"None"}),t.map(r=>S("div",{class:"row",children:[S("span",{class:"name warn",children:r.type}),S("span",{class:"muted right",children:[r.count,"×"]})]},r.type)),S("div",{class:"section",children:"Handled, but not sent so far"}),!e.length&&S("div",{class:"empty",children:"None"}),e.map(r=>S("div",{class:"row",children:[S("span",{class:"name",children:r.type}),S("span",{class:"muted",children:["by ",r.middlewares.join(", ")]})]},r.type)),S("div",{class:"hint",children:"Events that only happen later, like game over, show up here until they are sent."})]})}function ql({recorder:i,hidden:t}){const[e,n]=Ti(""),r=[...i.runtimes][0];let s;if(t)s=null;else if(!r)s=S("div",{class:"empty",children:"No runtime seen yet"});else{const o=Qi(r.context,e),a=o&&typeof o=="object"&&typeof o.peek=="function"?o.peek():o;!a||typeof a!="object"?s=S("div",{class:"row",children:S("span",{class:"value",children:qi(a,2,400)||"undefined"})}):s=Object.keys(a).map(l=>{const h=a[l],_=h&&typeof h=="object";return S("div",{class:"row"+(_?" link":""),onClick:_?()=>!Ma()&&n((e?e+".":"")+l):void 0,children:[S("span",{class:"name",children:l}),S("span",{class:"value",children:qi(h,1,160)})]},l)})}return S("div",{class:"tab-view",hidden:t,children:[S("div",{class:"toolbar bar",children:[S("input",{placeholder:"path, for example mission.score",value:e,onInput:o=>n(o.target.value.trim())}),S("button",{onClick:()=>n(e.split(".").slice(0,-1).join(".")),children:"up"})]}),S("div",{class:"content",children:s})]})}const El=`
.panel {
  position: fixed; right: 12px; bottom: 12px; z-index: 2147483647;
  width: 460px; height: 380px; min-width: 280px; min-height: 160px;
  display: flex; flex-direction: column; resize: both; overflow: hidden;
  background: #1e1f24; color: #d6d7dc; border: 1px solid #3a3c44; border-radius: 6px;
  font: 11px/1.45 ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  box-shadow: 0 6px 24px rgba(0, 0, 0, 0.35);
}
.header { display: flex; align-items: center; gap: 6px; padding: 4px 6px; background: #26282e; cursor: move; user-select: none; }
.title { font-weight: 600; color: #9fb4ff; margin-right: 4px; }
.tabs { display: flex; gap: 2px; flex: 1; }
button { font: inherit; color: inherit; background: #33363e; border: 1px solid #44474f; border-radius: 3px; padding: 1px 6px; cursor: pointer; }
button:hover { background: #3d4049; }
.tab.active { background: #4a5d9e; border-color: #5b70b8; color: #fff; }
.close { background: none; border: none; font-size: 15px; line-height: 1; padding: 0 4px; }
.tab-view { flex: 1; min-height: 0; display: flex; flex-direction: column; }
.tab-view[hidden] { display: none; }
.toolbar { padding: 4px 6px; border-bottom: 1px solid #33363e; }
.bar { display: flex; gap: 6px; align-items: center; }
input:not([type]) { flex: 1; font: inherit; color: inherit; background: #15161a; border: 1px solid #3a3c44; border-radius: 3px; padding: 2px 5px; }
.content { flex: 1; overflow: auto; padding: 2px 0; }
.row { display: flex; gap: 6px; align-items: baseline; padding: 1px 6px; white-space: nowrap; }
.tree .row { flex-wrap: wrap; row-gap: 2px; }
.row:hover { background: #26282e; }
.event, .link { cursor: pointer; }
.inactive { opacity: 0.45; }
.dot { color: #6fcf8e; }
.inactive .dot { color: #888; }
.name { color: #e8e9ee; }
.muted { color: #8b8e98; }
.right { margin-left: auto; }
.value { color: #b6c4e8; overflow: hidden; text-overflow: ellipsis; }
.chip { color: #a6b0c8; background: #2c2f37; border-radius: 3px; padding: 0 4px; }
.chip.dim { color: #6b6e78; font-style: italic; }
.badge { background: #2f3e2f; color: #9fd8a5; border-radius: 8px; padding: 0 5px; }
.badge.warn, .warn { color: #ffb86b; }
.badge.warn { background: #45351f; }
.unhandled .name { color: #ffb86b; }
.stop { color: #ff8a8a; }
.error, .name.error { color: #ff6b6b; }
.time { color: #6b6e78; width: 52px; text-align: right; }
.details { padding: 2px 6px 4px 64px; border-left: 2px solid #4a5d9e; margin-left: 6px; }
.handler { display: flex; gap: 8px; }
.section { padding: 6px 6px 2px; color: #9fb4ff; font-weight: 600; }
.bar-graph { height: 6px; background: #4a5d9e; border-radius: 2px; align-self: center; min-width: 1px; }
.empty, .hint { padding: 4px 6px; color: #6b6e78; }
.hint { padding-top: 10px; white-space: normal; }
`,ye={hotkey:!0,frameEvents:["frame-update","frame-render"],maxEvents:500,logFrameEvents:!1,quiet:!1},Jt={log:(...i)=>ye.quiet||console.log(...i),table:i=>ye.quiet||console.table(i),info:(...i)=>ye.quiet||console.info(...i)};let tt=null;function Qt(){return tt||Jt.info(Ca),tt}const Ca="[polymatic] devtools are not installed, call polymaticDevtools.install() first";function Ns(i){const t=e=>({name:Et(e),active:e.activated,events:Object.keys(e.__handlers),children:e.__children.map(t)});return[...i.recorder.runtimes].map(t)}function Dl(i){var t;return{id:i.id,type:i.type,from:i.from,handled:i.handled,stoppedBy:(t=i.handlers.find(e=>e.stopped))===null||t===void 0?void 0:t.middleware,failed:i.handlers.some(e=>e.failed)?i.handlers.filter(e=>e.failed).map(e=>e.middleware):void 0,ms:Math.round(i.handlers.reduce((e,n)=>e+n.ms,0)*1e3)/1e3,payload:i.payload}}function vr(i){var t;return(t=i.panel)!==null&&t!==void 0?t:i.panel=new Vl(i.recorder)}function _n(i){const t=[...i.recorder.runtimes][0];return t==null?void 0:t.context}const er={get installed(){return!!tt},get recorder(){var i;return(i=tt==null?void 0:tt.recorder)!==null&&i!==void 0?i:null},config(i){return Object.assign(ye,i??{}),tt==null||tt.recorder.configure(ye),tt==null||tt.setHotkey(ye.hotkey),Object.assign(Object.assign({},ye),{frameEvents:[...ye.frameEvents]})},install(){if(tt)return er;const i=new Bl(ye),t={recorder:i,panel:null,logPattern:null,watched:new Map,setHotkey:()=>{},stop:()=>{}},e=i.onDelivered(s=>{if(t.logPattern&&t.logPattern.test(s.type)){const o=s.handlers.map(a=>a.middleware+(a.failed?" (failed)":a.stopped?" (stopped)":"")).join(", ");console.log(`%c${s.type}%c from ${s.from} → ${o||"no handler"}`,"color:#5b70b8;font-weight:bold","color:inherit",s.payload)}if(t.watched.size){const o=_n(t);t.watched.forEach((a,l)=>{const h=qi(Qi(o,l),2,200);h!==a&&(console.log(`[polymatic] context.${l}: ${a} → ${h}`,`(after ${s.type})`),t.watched.set(l,h))})}}),n=s=>{s.altKey&&s.shiftKey&&s.code==="KeyD"&&vr(t).toggle()};let r=!1;return t.setHotkey=s=>{s=s&&typeof window<"u",s!==r&&(r=s,s?window.addEventListener("keydown",n):window.removeEventListener("keydown",n))},t.setHotkey(ye.hotkey),t.stop=()=>{var s;e(),(s=t.panel)===null||s===void 0||s.hide(),t.setHotkey(!1)},tt=t,Ms(i),er},uninstall(){tt&&(Ms(null),tt.stop(),tt=null)},tree(){const i=Qt();if(!i)return[];const t=Ns(i);for(const e of i.recorder.runtimes){const n=[];mr(e,(r,s)=>{const o=Object.keys(r.__handlers);n.push("  ".repeat(s)+(r.activated?"● ":"○ ")+Et(r)+(o.length?"  ["+o.join(", ")+"]":""))}),Jt.log(n.join(`
`))}return t.length||Jt.log("[polymatic] no runtime seen yet"),t},events(i){const t=Qt();if(!t)return[];const e=i==null?void 0:i.toLowerCase(),n=t.recorder.events.filter(r=>!e||r.type.toLowerCase().includes(e)||r.from.toLowerCase().includes(e));return Jt.table(n.slice(-50).map(r=>{var s,o;return{type:r.type,from:r.from,handled:r.handled,"stopped by":(o=(s=r.handlers.find(a=>a.stopped))===null||s===void 0?void 0:s.middleware)!==null&&o!==void 0?o:"","handler time":Te(r.handlers.reduce((a,l)=>a+l.ms,0)),payload:r.payload}})),n},failures(){const i=Qt();if(!i)return[];const t=i.recorder.failures.map(e=>Object.assign({},e));return Jt.table(t.map(e=>{var n;return{middleware:e.middleware,handling:e.type,error:e.message,count:e.count,"stopped by":(n=e.stoppedBy)!==null&&n!==void 0?n:"uncaught"}})),t},unmatched(){const i=Qt();if(!i)return{noHandler:[],notSent:[]};const t=i.recorder.unmatched();return Jt.log("[polymatic] sent, but no middleware handled them:"),Jt.table(t.noHandler),Jt.log("[polymatic] handled, but not sent so far:"),Jt.table(t.notSent.map(e=>({type:e.type,by:e.middlewares.join(", ")}))),t},frame(){const i=Qt();if(!i)return{};const t=i.recorder.frameCosts();for(const e of Object.keys(t))Jt.log(`[polymatic] ${e}, last 60 frames:`),Jt.table(t[e].map(n=>({middleware:n.middleware,avg:Te(n.avg),max:Te(n.max)})));return t},report(i){var t;const e=Qt(),n={noHandler:[],notSent:[]};if(!e)return{installed:!1,lastEventId:0,failures:[],tree:[],events:[],unmatched:n,frame:{}};const r=l=>Math.round(l*1e3)/1e3,s=e.recorder.frameCosts(),o={};for(const l of Object.keys(s))o[l]=s[l].map(h=>({middleware:h.middleware,avg:r(h.avg),max:r(h.max)}));const a={installed:!0,lastEventId:e.recorder.lastId,failures:e.recorder.failures.map(l=>Object.assign({},l)),tree:Ns(e),events:e.recorder.events.slice(-((t=i==null?void 0:i.events)!==null&&t!==void 0?t:20)).map(Dl),unmatched:e.recorder.unmatched(),frame:o};return Jt.log("[polymatic] report",a),a},waitFor(i,t={}){const e=tt;if(!e)return Promise.reject(new Error(Ca));const n=typeof i=="string"?i:i.name,{after:r,where:s,timeout:o=1e4}=t,a=h=>h.type===n&&(r===void 0||h.id>r)&&(!s||s(h)),l=r!==void 0?e.recorder.events.find(a):void 0;return l?Promise.resolve(l):new Promise((h,_)=>{let p=null;const c=e.recorder.onDelivered(m=>{a(m)&&(c(),clearTimeout(p),h(m))});o>0&&(p=setTimeout(()=>{c(),_(new Error(`[polymatic] timed out after ${o}ms waiting for "${n}"`))},o))})},snapshot(i,t=3){const e=Qt();return e?ri(Qi(_n(e),i),t):void 0},context(i){const t=Qt();return t?Qi(_n(t),i):void 0},watch(i){const t=Qt();t&&t.watched.set(i,qi(Qi(_n(t),i),2,200))},unwatch(i){tt&&(i?tt.watched.delete(i):tt.watched.clear())},log(i){const t=Qt();t&&(t.logPattern=i===null?null:typeof i=="string"?new RegExp(i):i)},panel(i){var t;const e=Qt();e&&(i===void 0?vr(e).toggle():i?vr(e).show():(t=e.panel)===null||t===void 0||t.hide())},clear(){tt==null||tt.recorder.clear()}};typeof globalThis<"u"&&!globalThis.polymaticDevtools&&(globalThis.polymaticDevtools=er);er.install();/**
 * Planck.js v1.4.3
 * @license The MIT license
 * @copyright Copyright (c) 2026 Erin Catto, Ali Shakiba
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */var Kr=function(i,t){return Kr=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,n){e.__proto__=n}||function(e,n){for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])},Kr(i,t)};function wt(i,t){if(typeof t!="function"&&t!==null)throw new TypeError("Class extends value "+String(t)+" is not a constructor or null");Kr(i,t);function e(){this.constructor=i}i.prototype=t===null?Object.create(t):(e.prototype=t.prototype,new e)}var At=function(){return At=Object.assign||function(t){for(var e,n=1,r=arguments.length;n<r;n++){e=arguments[n];for(var s in e)Object.prototype.hasOwnProperty.call(e,s)&&(t[s]=e[s])}return t},At.apply(this,arguments)};var Rt=function(i,t){(i===null||typeof i>"u")&&(i={});var e=At({},i);for(var n in t)t.hasOwnProperty(n)&&typeof i[n]>"u"&&(e[n]=t[n]);if(typeof Object.getOwnPropertySymbols=="function")for(var r=Object.getOwnPropertySymbols(t),s=0;s<r.length;s++){var o=r[s];t.propertyIsEnumerable(o)&&typeof i[o]>"u"&&(e[o]=t[o])}return e},Nl=Math.random,Mt=1e-9,Rl=Number.isFinite;function Ol(i){return i|=i>>1,i|=i>>2,i|=i>>4,i|=i>>8,i|=i>>16,i+1}function Ul(i){return i>0&&(i&i-1)===0}function Va(i,t,e){return typeof t>"u"?(e=1,t=0):typeof e>"u"&&(e=t,t=0),e>t?(i=(i-t)%(e-t),i+(i<0?e:t)):(i=(i-e)%(t-e),i+(i<=0?t:e))}function yt(i,t,e){return i<t?t:i>e?e:i}function $l(i,t){return typeof i>"u"?(t=1,i=0):typeof t>"u"&&(t=i,i=0),i===t?i:Nl()*(t-i)+i}var _i=Object.create(Math);_i.EPSILON=Mt;_i.isFinite=Rl;_i.nextPowerOfTwo=Ol;_i.isPowerOfTwo=Ul;_i.mod=Va;_i.clamp=yt;_i.random=$l;var Rs=Math.abs,yr=Math.sqrt,Os=Math.max,Us=Math.min,u=(function(){function i(t,e){if(!(this instanceof i))return new i(t,e);typeof t>"u"?(this.x=0,this.y=0):typeof t=="object"?(this.x=t.x,this.y=t.y):(this.x=t,this.y=e)}return i.prototype._serialize=function(){return{x:this.x,y:this.y}},i._deserialize=function(t){var e=Object.create(i.prototype);return e.x=t.x,e.y=t.y,e},i.zero=function(){var t=Object.create(i.prototype);return t.x=0,t.y=0,t},i.neo=function(t,e){var n=Object.create(i.prototype);return n.x=t,n.y=e,n},i.clone=function(t){return i.neo(t.x,t.y)},i.prototype.toString=function(){return JSON.stringify(this)},i.isValid=function(t){return t===null||typeof t>"u"?!1:Number.isFinite(t.x)&&Number.isFinite(t.y)},i.assert=function(t){},i.prototype.clone=function(){return i.clone(this)},i.prototype.setZero=function(){return this.x=0,this.y=0,this},i.prototype.set=function(t,e){return typeof t=="object"?(this.x=t.x,this.y=t.y):(this.x=t,this.y=e),this},i.prototype.setNum=function(t,e){return this.x=t,this.y=e,this},i.prototype.setVec2=function(t){return this.x=t.x,this.y=t.y,this},i.prototype.wSet=function(t,e,n,r){return typeof n<"u"||typeof r<"u"?this.setCombine(t,e,n,r):this.setMul(t,e)},i.prototype.setCombine=function(t,e,n,r){var s=t*e.x+n*r.x,o=t*e.y+n*r.y;return this.x=s,this.y=o,this},i.prototype.setMul=function(t,e){var n=t*e.x,r=t*e.y;return this.x=n,this.y=r,this},i.prototype.add=function(t){return this.x+=t.x,this.y+=t.y,this},i.prototype.wAdd=function(t,e,n,r){return typeof n<"u"||typeof r<"u"?this.addCombine(t,e,n,r):this.addMul(t,e)},i.prototype.addCombine=function(t,e,n,r){var s=t*e.x+n*r.x,o=t*e.y+n*r.y;return this.x+=s,this.y+=o,this},i.prototype.addMul=function(t,e){var n=t*e.x,r=t*e.y;return this.x+=n,this.y+=r,this},i.prototype.wSub=function(t,e,n,r){return typeof n<"u"||typeof r<"u"?this.subCombine(t,e,n,r):this.subMul(t,e)},i.prototype.subCombine=function(t,e,n,r){var s=t*e.x+n*r.x,o=t*e.y+n*r.y;return this.x-=s,this.y-=o,this},i.prototype.subMul=function(t,e){var n=t*e.x,r=t*e.y;return this.x-=n,this.y-=r,this},i.prototype.sub=function(t){return this.x-=t.x,this.y-=t.y,this},i.prototype.mul=function(t){return this.x*=t,this.y*=t,this},i.prototype.length=function(){return i.lengthOf(this)},i.prototype.lengthSquared=function(){return i.lengthSquared(this)},i.prototype.normalize=function(){var t=this.length();if(t<Mt)return 0;var e=1/t;return this.x*=e,this.y*=e,t},i.normalize=function(t){var e=i.lengthOf(t);if(e<Mt)return i.zero();var n=1/e;return i.neo(t.x*n,t.y*n)},i.lengthOf=function(t){return yr(t.x*t.x+t.y*t.y)},i.lengthSquared=function(t){return t.x*t.x+t.y*t.y},i.distance=function(t,e){var n=t.x-e.x,r=t.y-e.y;return yr(n*n+r*r)},i.distanceSquared=function(t,e){var n=t.x-e.x,r=t.y-e.y;return n*n+r*r},i.areEqual=function(t,e){return t===e||typeof e=="object"&&e!==null&&t.x===e.x&&t.y===e.y},i.skew=function(t){return i.neo(-t.y,t.x)},i.dot=function(t,e){return t.x*e.x+t.y*e.y},i.cross=function(t,e){return typeof e=="number"?i.neo(e*t.y,-e*t.x):typeof t=="number"?i.neo(-t*e.y,t*e.x):t.x*e.y-t.y*e.x},i.crossVec2Vec2=function(t,e){return t.x*e.y-t.y*e.x},i.crossVec2Num=function(t,e){return i.neo(e*t.y,-e*t.x)},i.crossNumVec2=function(t,e){return i.neo(-t*e.y,t*e.x)},i.addCross=function(t,e,n){if(typeof n=="number")return i.neo(n*e.y+t.x,-n*e.x+t.y);if(typeof e=="number")return i.neo(-e*n.y+t.x,e*n.x+t.y)},i.addCrossVec2Num=function(t,e,n){return i.neo(n*e.y+t.x,-n*e.x+t.y)},i.addCrossNumVec2=function(t,e,n){return i.neo(-e*n.y+t.x,e*n.x+t.y)},i.add=function(t,e){return i.neo(t.x+e.x,t.y+e.y)},i.wAdd=function(t,e,n,r){return typeof n<"u"||typeof r<"u"?i.combine(t,e,n,r):i.mulNumVec2(t,e)},i.combine=function(t,e,n,r){return i.zero().setCombine(t,e,n,r)},i.sub=function(t,e){return i.neo(t.x-e.x,t.y-e.y)},i.mul=function(t,e){if(typeof t=="object")return i.neo(t.x*e,t.y*e);if(typeof e=="object")return i.neo(t*e.x,t*e.y)},i.mulVec2Num=function(t,e){return i.neo(t.x*e,t.y*e)},i.mulNumVec2=function(t,e){return i.neo(t*e.x,t*e.y)},i.prototype.neg=function(){return this.x=-this.x,this.y=-this.y,this},i.neg=function(t){return i.neo(-t.x,-t.y)},i.abs=function(t){return i.neo(Rs(t.x),Rs(t.y))},i.mid=function(t,e){return i.neo((t.x+e.x)*.5,(t.y+e.y)*.5)},i.upper=function(t,e){return i.neo(Os(t.x,e.x),Os(t.y,e.y))},i.lower=function(t,e){return i.neo(Us(t.x,e.x),Us(t.y,e.y))},i.prototype.clamp=function(t){var e=this.x*this.x+this.y*this.y;if(e>t*t){var n=t/yr(e);this.x*=n,this.y*=n}return this},i.clamp=function(t,e){var n=i.neo(t.x,t.y);return n.clamp(e),n},i.clampVec2=function(t,e,n){return{x:yt(t.x,e==null?void 0:e.x,n==null?void 0:n.x),y:yt(t.y,e==null?void 0:e.y,n==null?void 0:n.y)}},i.scaleFn=function(t,e){return function(n){return i.neo(n.x*t,n.y*e)}},i.translateFn=function(t,e){return function(n){return i.neo(n.x+t,n.y+e)}},i})(),Ut=Math.max,$t=Math.min,gt=(function(){function i(t,e){if(!(this instanceof i))return new i(t,e);this.lowerBound=u.zero(),this.upperBound=u.zero(),typeof t=="object"&&this.lowerBound.setVec2(t),typeof e=="object"?this.upperBound.setVec2(e):typeof t=="object"&&this.upperBound.setVec2(t)}return i.prototype.isValid=function(){return i.isValid(this)},i.isValid=function(t){return t===null||typeof t>"u"?!1:u.isValid(t.lowerBound)&&u.isValid(t.upperBound)&&u.sub(t.upperBound,t.lowerBound).lengthSquared()>=0},i.assert=function(t){},i.prototype.getCenter=function(){return u.neo((this.lowerBound.x+this.upperBound.x)*.5,(this.lowerBound.y+this.upperBound.y)*.5)},i.prototype.getExtents=function(){return u.neo((this.upperBound.x-this.lowerBound.x)*.5,(this.upperBound.y-this.lowerBound.y)*.5)},i.prototype.getPerimeter=function(){return 2*(this.upperBound.x-this.lowerBound.x+this.upperBound.y-this.lowerBound.y)},i.prototype.combine=function(t,e){e=e||this;var n=t.lowerBound,r=t.upperBound,s=e.lowerBound,o=e.upperBound,a=$t(n.x,s.x),l=$t(n.y,s.y),h=Ut(o.x,r.x),_=Ut(o.y,r.y);this.lowerBound.setNum(a,l),this.upperBound.setNum(h,_)},i.prototype.combinePoints=function(t,e){this.lowerBound.setNum($t(t.x,e.x),$t(t.y,e.y)),this.upperBound.setNum(Ut(t.x,e.x),Ut(t.y,e.y))},i.prototype.set=function(t){this.lowerBound.setNum(t.lowerBound.x,t.lowerBound.y),this.upperBound.setNum(t.upperBound.x,t.upperBound.y)},i.prototype.contains=function(t){var e=!0;return e=e&&this.lowerBound.x<=t.lowerBound.x,e=e&&this.lowerBound.y<=t.lowerBound.y,e=e&&t.upperBound.x<=this.upperBound.x,e=e&&t.upperBound.y<=this.upperBound.y,e},i.prototype.extend=function(t){return i.extend(this,t),this},i.extend=function(t,e){return t.lowerBound.x-=e,t.lowerBound.y-=e,t.upperBound.x+=e,t.upperBound.y+=e,t},i.testOverlap=function(t,e){var n=e.lowerBound.x-t.upperBound.x,r=t.lowerBound.x-e.upperBound.x,s=e.lowerBound.y-t.upperBound.y,o=t.lowerBound.y-e.upperBound.y;return!(n>0||s>0||r>0||o>0)},i.areEqual=function(t,e){return u.areEqual(t.lowerBound,e.lowerBound)&&u.areEqual(t.upperBound,e.upperBound)},i.diff=function(t,e){var n=Ut(0,$t(t.upperBound.x,e.upperBound.x)-Ut(e.lowerBound.x,t.lowerBound.x)),r=Ut(0,$t(t.upperBound.y,e.upperBound.y)-Ut(e.lowerBound.y,t.lowerBound.y)),s=t.upperBound.x-t.lowerBound.x,o=t.upperBound.y-t.lowerBound.y,a=e.upperBound.x-e.lowerBound.x,l=e.upperBound.y-e.lowerBound.y;return s*o+a*l-n*r},i.prototype.rayCast=function(t,e){var n=-1/0,r=1/0,s=e.p1,o=u.sub(e.p2,e.p1),a=u.abs(o),l=u.zero();if(a.x<Mt){if(s.x<this.lowerBound.x||this.upperBound.x<s.x)return!1}else{var h=1/o.x,_=(this.lowerBound.x-s.x)*h,p=(this.upperBound.x-s.x)*h,c=-1;if(_>p){var m=_;_=p,p=m,c=1}if(_>n&&(l.setZero(),l.x=c,n=_),r=$t(r,p),n>r)return!1}if(a.y<Mt){if(s.y<this.lowerBound.y||this.upperBound.y<s.y)return!1}else{var h=1/o.y,_=(this.lowerBound.y-s.y)*h,p=(this.upperBound.y-s.y)*h,c=-1;if(_>p){var m=_;_=p,p=m,c=1}if(_>n&&(l.setZero(),l.y=c,n=_),r=$t(r,p),n>r)return!1}return n<0||e.maxFraction<n?!1:(t.fraction=n,t.normal=l,!0)},i.prototype.toString=function(){return JSON.stringify(this)},i.combinePoints=function(t,e,n){return t.lowerBound.x=$t(e.x,n.x),t.lowerBound.y=$t(e.y,n.y),t.upperBound.x=Ut(e.x,n.x),t.upperBound.y=Ut(e.y,n.y),t},i.combinedPerimeter=function(t,e){var n=$t(t.lowerBound.x,e.lowerBound.x),r=$t(t.lowerBound.y,e.lowerBound.y),s=Ut(t.upperBound.x,e.upperBound.x),o=Ut(t.upperBound.y,e.upperBound.y);return 2*(s-n+o-r)},i})(),pn=Math.PI,O=(function(){function i(){}return Object.defineProperty(i,"polygonRadius",{get:function(){return 2*i.linearSlop},enumerable:!1,configurable:!0}),i.lengthUnitsPerMeter=1,i.maxManifoldPoints=2,i.maxPolygonVertices=12,i.aabbExtension=.1,i.aabbMultiplier=2,i.linearSlop=.005,i.angularSlop=2/180*pn,i.maxSubSteps=8,i.maxTOIContacts=32,i.maxTOIIterations=20,i.maxDistanceIterations=20,i.velocityThreshold=1,i.maxLinearCorrection=.2,i.maxAngularCorrection=8/180*pn,i.maxTranslation=2,i.maxRotation=.5*pn,i.baumgarte=.2,i.toiBaugarte=.75,i.timeToSleep=.5,i.linearSleepTolerance=.01,i.angularSleepTolerance=2/180*pn,i})(),P=(function(){function i(){}return Object.defineProperty(i,"maxManifoldPoints",{get:function(){return O.maxManifoldPoints},enumerable:!1,configurable:!0}),Object.defineProperty(i,"maxPolygonVertices",{get:function(){return O.maxPolygonVertices},enumerable:!1,configurable:!0}),Object.defineProperty(i,"aabbExtension",{get:function(){return O.aabbExtension*O.lengthUnitsPerMeter},enumerable:!1,configurable:!0}),Object.defineProperty(i,"aabbMultiplier",{get:function(){return O.aabbMultiplier},enumerable:!1,configurable:!0}),Object.defineProperty(i,"linearSlop",{get:function(){return O.linearSlop*O.lengthUnitsPerMeter},enumerable:!1,configurable:!0}),Object.defineProperty(i,"linearSlopSquared",{get:function(){return O.linearSlop*O.lengthUnitsPerMeter*O.linearSlop*O.lengthUnitsPerMeter},enumerable:!1,configurable:!0}),Object.defineProperty(i,"angularSlop",{get:function(){return O.angularSlop},enumerable:!1,configurable:!0}),Object.defineProperty(i,"polygonRadius",{get:function(){return 2*O.linearSlop},enumerable:!1,configurable:!0}),Object.defineProperty(i,"maxSubSteps",{get:function(){return O.maxSubSteps},enumerable:!1,configurable:!0}),Object.defineProperty(i,"maxTOIContacts",{get:function(){return O.maxTOIContacts},enumerable:!1,configurable:!0}),Object.defineProperty(i,"maxTOIIterations",{get:function(){return O.maxTOIIterations},enumerable:!1,configurable:!0}),Object.defineProperty(i,"maxDistanceIterations",{get:function(){return O.maxDistanceIterations},enumerable:!1,configurable:!0}),Object.defineProperty(i,"velocityThreshold",{get:function(){return O.velocityThreshold*O.lengthUnitsPerMeter},enumerable:!1,configurable:!0}),Object.defineProperty(i,"maxLinearCorrection",{get:function(){return O.maxLinearCorrection*O.lengthUnitsPerMeter},enumerable:!1,configurable:!0}),Object.defineProperty(i,"maxAngularCorrection",{get:function(){return O.maxAngularCorrection},enumerable:!1,configurable:!0}),Object.defineProperty(i,"maxTranslation",{get:function(){return O.maxTranslation*O.lengthUnitsPerMeter},enumerable:!1,configurable:!0}),Object.defineProperty(i,"maxTranslationSquared",{get:function(){return O.maxTranslation*O.lengthUnitsPerMeter*O.maxTranslation*O.lengthUnitsPerMeter},enumerable:!1,configurable:!0}),Object.defineProperty(i,"maxRotation",{get:function(){return O.maxRotation},enumerable:!1,configurable:!0}),Object.defineProperty(i,"maxRotationSquared",{get:function(){return O.maxRotation*O.maxRotation},enumerable:!1,configurable:!0}),Object.defineProperty(i,"baumgarte",{get:function(){return O.baumgarte},enumerable:!1,configurable:!0}),Object.defineProperty(i,"toiBaugarte",{get:function(){return O.toiBaugarte},enumerable:!1,configurable:!0}),Object.defineProperty(i,"timeToSleep",{get:function(){return O.timeToSleep},enumerable:!1,configurable:!0}),Object.defineProperty(i,"linearSleepTolerance",{get:function(){return O.linearSleepTolerance*O.lengthUnitsPerMeter},enumerable:!1,configurable:!0}),Object.defineProperty(i,"linearSleepToleranceSqr",{get:function(){return O.linearSleepTolerance*O.lengthUnitsPerMeter*O.linearSleepTolerance*O.lengthUnitsPerMeter},enumerable:!1,configurable:!0}),Object.defineProperty(i,"angularSleepTolerance",{get:function(){return O.angularSleepTolerance},enumerable:!1,configurable:!0}),Object.defineProperty(i,"angularSleepToleranceSqr",{get:function(){return O.angularSleepTolerance*O.angularSleepTolerance},enumerable:!1,configurable:!0}),i})(),rn=(function(){function i(t){this._list=[],this._max=1/0,this._hasCreateFn=!1,this._createCount=0,this._hasAllocateFn=!1,this._allocateCount=0,this._hasReleaseFn=!1,this._releaseCount=0,this._hasDisposeFn=!1,this._disposeCount=0,this._list=[],this._max=t.max||this._max,this._createFn=t.create,this._hasCreateFn=typeof this._createFn=="function",this._allocateFn=t.allocate,this._hasAllocateFn=typeof this._allocateFn=="function",this._releaseFn=t.release,this._hasReleaseFn=typeof this._releaseFn=="function",this._disposeFn=t.dispose,this._hasDisposeFn=typeof this._disposeFn=="function"}return i.prototype.max=function(t){return typeof t=="number"?(this._max=t,this):this._max},i.prototype.size=function(){return this._list.length},i.prototype.allocate=function(){var t;return this._list.length>0?t=this._list.shift():(this._createCount++,this._hasCreateFn?t=this._createFn():t={}),this._allocateCount++,this._hasAllocateFn&&this._allocateFn(t),t},i.prototype.release=function(t){this._list.length<this._max?(this._releaseCount++,this._hasReleaseFn&&this._releaseFn(t),this._list.push(t)):(this._disposeCount++,this._hasDisposeFn&&(t=this._disposeFn(t)))},i.prototype.toString=function(){return" +"+this._createCount+" >"+this._allocateCount+" <"+this._releaseCount+" -"+this._disposeCount+" ="+this._list.length+"/"+this._max},i})(),$s=Math.abs,Tt=Math.max,Gl=(function(){function i(t){this.aabb=new gt,this.userData=null,this.parent=null,this.child1=null,this.child2=null,this.height=-1,this.id=t}return i.prototype.toString=function(){return this.id+": "+this.userData},i.prototype.isLeaf=function(){return this.child1==null},i})(),Gs=new rn({create:function(){return new Gl},release:function(i){i.userData=null,i.parent=null,i.child1=null,i.child2=null,i.height=-1,i.id=void 0}}),Hl=(function(){function i(){this.inputPool=new rn({create:function(){return{}},release:function(t){}}),this.stackPool=new rn({create:function(){return[]},release:function(t){t.length=0}}),this.iteratorPool=new rn({create:function(){return new jl},release:function(t){t.close()}}),this.m_root=null,this.m_nodes={},this.m_lastProxyId=0}return i.prototype.getUserData=function(t){var e=this.m_nodes[t];return e.userData},i.prototype.getFatAABB=function(t){var e=this.m_nodes[t];return e.aabb},i.prototype.allocateNode=function(){var t=Gs.allocate();return t.id=++this.m_lastProxyId,this.m_nodes[t.id]=t,t},i.prototype.freeNode=function(t){delete this.m_nodes[t.id],Gs.release(t)},i.prototype.createProxy=function(t,e){var n=this.allocateNode();return n.aabb.set(t),gt.extend(n.aabb,P.aabbExtension),n.userData=e,n.height=0,this.insertLeaf(n),n.id},i.prototype.destroyProxy=function(t){var e=this.m_nodes[t];this.removeLeaf(e),this.freeNode(e)},i.prototype.moveProxy=function(t,e,n){var r=this.m_nodes[t];return r.aabb.contains(e)?!1:(this.removeLeaf(r),r.aabb.set(e),e=r.aabb,gt.extend(e,P.aabbExtension),n.x<0?e.lowerBound.x+=n.x*P.aabbMultiplier:e.upperBound.x+=n.x*P.aabbMultiplier,n.y<0?e.lowerBound.y+=n.y*P.aabbMultiplier:e.upperBound.y+=n.y*P.aabbMultiplier,this.insertLeaf(r),!0)},i.prototype.insertLeaf=function(t){if(this.m_root==null){this.m_root=t,this.m_root.parent=null;return}for(var e=t.aabb,n=this.m_root;!n.isLeaf();){var r=n.child1,s=n.child2,o=n.aabb.getPerimeter(),a=gt.combinedPerimeter(n.aabb,e),l=2*a,h=2*(a-o),_=gt.combinedPerimeter(e,r.aabb),p=_+h;if(!r.isLeaf()){var c=r.aabb.getPerimeter();p-=c}var m=gt.combinedPerimeter(e,s.aabb),f=m+h;if(!s.isLeaf()){var c=s.aabb.getPerimeter();f-=c}if(l<p&&l<f)break;p<f?n=r:n=s}var d=n,v=d.parent,y=this.allocateNode();for(y.parent=v,y.userData=null,y.aabb.combine(e,d.aabb),y.height=d.height+1,v!=null?(v.child1===d?v.child1=y:v.child2=y,y.child1=d,y.child2=t,d.parent=y,t.parent=y):(y.child1=d,y.child2=t,d.parent=y,t.parent=y,this.m_root=y),n=t.parent;n!=null;){n=this.balance(n);var r=n.child1,s=n.child2;n.height=1+Tt(r.height,s.height),n.aabb.combine(r.aabb,s.aabb),n=n.parent}},i.prototype.removeLeaf=function(t){if(t===this.m_root){this.m_root=null;return}var e=t.parent,n=e.parent,r;if(e.child1===t?r=e.child2:r=e.child1,n!=null){n.child1===e?n.child1=r:n.child2=r,r.parent=n,this.freeNode(e);for(var s=n;s!=null;){s=this.balance(s);var o=s.child1,a=s.child2;s.aabb.combine(o.aabb,a.aabb),s.height=1+Tt(o.height,a.height),s=s.parent}}else this.m_root=r,r.parent=null,this.freeNode(e)},i.prototype.balance=function(t){var e=t;if(e.isLeaf()||e.height<2)return t;var n=e.child1,r=e.child2,s=r.height-n.height;if(s>1){var o=r.child1,a=r.child2;return r.child1=e,r.parent=e.parent,e.parent=r,r.parent!=null?r.parent.child1===t?r.parent.child1=r:r.parent.child2=r:this.m_root=r,o.height>a.height?(r.child2=o,e.child2=a,a.parent=e,e.aabb.combine(n.aabb,a.aabb),r.aabb.combine(e.aabb,o.aabb),e.height=1+Tt(n.height,a.height),r.height=1+Tt(e.height,o.height)):(r.child2=a,e.child2=o,o.parent=e,e.aabb.combine(n.aabb,o.aabb),r.aabb.combine(e.aabb,a.aabb),e.height=1+Tt(n.height,o.height),r.height=1+Tt(e.height,a.height)),r}if(s<-1){var l=n.child1,h=n.child2;return n.child1=e,n.parent=e.parent,e.parent=n,n.parent!=null?n.parent.child1===e?n.parent.child1=n:n.parent.child2=n:this.m_root=n,l.height>h.height?(n.child2=l,e.child1=h,h.parent=e,e.aabb.combine(r.aabb,h.aabb),n.aabb.combine(e.aabb,l.aabb),e.height=1+Tt(r.height,h.height),n.height=1+Tt(e.height,l.height)):(n.child2=h,e.child1=l,l.parent=e,e.aabb.combine(r.aabb,l.aabb),n.aabb.combine(e.aabb,h.aabb),e.height=1+Tt(r.height,l.height),n.height=1+Tt(e.height,h.height)),n}return e},i.prototype.getHeight=function(){return this.m_root==null?0:this.m_root.height},i.prototype.getAreaRatio=function(){if(this.m_root==null)return 0;for(var t=this.m_root,e=t.aabb.getPerimeter(),n=0,r,s=this.iteratorPool.allocate().preorder(this.m_root);r=s.next();)r.height<0||(n+=r.aabb.getPerimeter());return this.iteratorPool.release(s),n/e},i.prototype.computeHeight=function(t){var e;if(typeof t<"u"?e=this.m_nodes[t]:e=this.m_root,e.isLeaf())return 0;var n=this.computeHeight(e.child1.id),r=this.computeHeight(e.child2.id);return 1+Tt(n,r)},i.prototype.validateStructure=function(t){if(t!=null){this.m_root;var e=t.child1,n=t.child2;t.isLeaf()||(this.validateStructure(e),this.validateStructure(n))}},i.prototype.validateMetrics=function(t){if(t!=null){var e=t.child1,n=t.child2;t.isLeaf()||(this.validateMetrics(e),this.validateMetrics(n))}},i.prototype.validate=function(){},i.prototype.getMaxBalance=function(){for(var t=0,e,n=this.iteratorPool.allocate().preorder(this.m_root);e=n.next();)if(!(e.height<=1)){var r=$s(e.child2.height-e.child1.height);t=Tt(t,r)}return this.iteratorPool.release(n),t},i.prototype.rebuildBottomUp=function(){for(var t=[],e=0,n,r=this.iteratorPool.allocate().preorder(this.m_root);n=r.next();)n.height<0||(n.isLeaf()?(n.parent=null,t[e]=n,++e):this.freeNode(n));for(this.iteratorPool.release(r);e>1;){for(var s=1/0,o=-1,a=-1,l=0;l<e;++l)for(var h=t[l].aabb,_=l+1;_<e;++_){var p=t[_].aabb,c=gt.combinedPerimeter(h,p);c<s&&(o=l,a=_,s=c)}var m=t[o],f=t[a],d=this.allocateNode();d.child1=m,d.child2=f,d.height=1+Tt(m.height,f.height),d.aabb.combine(m.aabb,f.aabb),d.parent=null,m.parent=d,f.parent=d,t[a]=t[e-1],t[o]=d,--e}this.m_root=t[0]},i.prototype.shiftOrigin=function(t){for(var e,n=this.iteratorPool.allocate().preorder(this.m_root);e=n.next();){var r=e.aabb;r.lowerBound.x-=t.x,r.lowerBound.y-=t.y,r.upperBound.x-=t.x,r.upperBound.y-=t.y}this.iteratorPool.release(n)},i.prototype.query=function(t,e){var n=this.stackPool.allocate();for(n.push(this.m_root);n.length>0;){var r=n.pop();if(r!=null&&gt.testOverlap(r.aabb,t))if(r.isLeaf()){var s=e(r.id);if(s===!1)return}else n.push(r.child1),n.push(r.child2)}this.stackPool.release(n)},i.prototype.rayCast=function(t,e){var n=t.p1,r=t.p2,s=u.sub(r,n);s.normalize();var o=u.crossNumVec2(1,s),a=u.abs(o),l=t.maxFraction,h=new gt,_=u.combine(1-l,n,l,r);h.combinePoints(n,_);var p=this.stackPool.allocate(),c=this.inputPool.allocate();for(p.push(this.m_root);p.length>0;){var m=p.pop();if(m!=null&&gt.testOverlap(m.aabb,h)!==!1){var f=m.aabb.getCenter(),d=m.aabb.getExtents(),v=$s(u.dot(o,u.sub(n,f)))-u.dot(a,d);if(!(v>0))if(m.isLeaf()){c.p1=u.clone(t.p1),c.p2=u.clone(t.p2),c.maxFraction=l;var y=e(c,m.id);if(y===0)break;y>0&&(l=y,_=u.combine(1-l,n,l,r),h.combinePoints(n,_))}else p.push(m.child1),p.push(m.child2)}}this.stackPool.release(p),this.inputPool.release(c)},i})(),jl=(function(){function i(){this.parents=[],this.states=[]}return i.prototype.preorder=function(t){return this.parents.length=0,this.parents.push(t),this.states.length=0,this.states.push(0),this},i.prototype.next=function(){for(;this.parents.length>0;){var t=this.parents.length-1,e=this.parents[t];if(this.states[t]===0)return this.states[t]=1,e;if(this.states[t]===1&&(this.states[t]=2,e.child1))return this.parents.push(e.child1),this.states.push(1),e.child1;if(this.states[t]===2&&(this.states[t]=3,e.child2))return this.parents.push(e.child2),this.states.push(1),e.child2;this.parents.pop(),this.states.pop()}},i.prototype.close=function(){this.parents.length=0},i})(),Jl=Math.max,Yl=Math.min,Wl=(function(){function i(){var t=this;this.m_tree=new Hl,this.m_moveBuffer=[],this.query=function(e,n){t.m_tree.query(e,n)},this.queryCallback=function(e){if(e===t.m_queryProxyId)return!0;var n=Yl(e,t.m_queryProxyId),r=Jl(e,t.m_queryProxyId),s=t.m_tree.getUserData(n),o=t.m_tree.getUserData(r);return t.m_callback(s,o),!0}}return i.prototype.getUserData=function(t){return this.m_tree.getUserData(t)},i.prototype.testOverlap=function(t,e){var n=this.m_tree.getFatAABB(t),r=this.m_tree.getFatAABB(e);return gt.testOverlap(n,r)},i.prototype.getFatAABB=function(t){return this.m_tree.getFatAABB(t)},i.prototype.getProxyCount=function(){return this.m_moveBuffer.length},i.prototype.getTreeHeight=function(){return this.m_tree.getHeight()},i.prototype.getTreeBalance=function(){return this.m_tree.getMaxBalance()},i.prototype.getTreeQuality=function(){return this.m_tree.getAreaRatio()},i.prototype.rayCast=function(t,e){this.m_tree.rayCast(t,e)},i.prototype.shiftOrigin=function(t){this.m_tree.shiftOrigin(t)},i.prototype.createProxy=function(t,e){var n=this.m_tree.createProxy(t,e);return this.bufferMove(n),n},i.prototype.destroyProxy=function(t){this.unbufferMove(t),this.m_tree.destroyProxy(t)},i.prototype.moveProxy=function(t,e,n){var r=this.m_tree.moveProxy(t,e,n);r&&this.bufferMove(t)},i.prototype.touchProxy=function(t){this.bufferMove(t)},i.prototype.bufferMove=function(t){this.m_moveBuffer.push(t)},i.prototype.unbufferMove=function(t){for(var e=0;e<this.m_moveBuffer.length;++e)this.m_moveBuffer[e]===t&&(this.m_moveBuffer[e]=null)},i.prototype.updatePairs=function(t){for(this.m_callback=t;this.m_moveBuffer.length>0;)if(this.m_queryProxyId=this.m_moveBuffer.pop(),this.m_queryProxyId!==null){var e=this.m_tree.getFatAABB(this.m_queryProxyId);this.m_tree.query(e,this.queryCallback)}},i})(),Sa=Math.sin,Ia=Math.cos,cs=Math.sqrt;function w(i,t){return{x:i,y:t}}function Kl(i){return{s:Sa(i),c:Ia(i)}}function vt(i,t,e){return i.x=t,i.y=e,i}function g(i,t){return i.x=t.x,i.y=t.y,i}function z(i){return i.x=0,i.y=0,i}function ln(i){return i.x=-i.x,i.y=-i.y,i}function Wt(i,t){return i.x+=t.x,i.y+=t.y,i}function Xl(i,t,e){return i.x=t.x+e.x,i.y=t.y+e.y,i}function Se(i,t){return i.x-=t.x,i.y-=t.y,i}function N(i,t,e){return i.x=t.x-e.x,i.y=t.y-e.y,i}function Hs(i,t){return i.x*=t,i.y*=t,i}function F(i,t,e){return i.x=t*e.x,i.y=t*e.y,i}function re(i,t,e){return i.x+=t*e.x,i.y+=t*e.y,i}function tn(i,t,e){return i.x-=t*e.x,i.y-=t*e.y,i}function Q(i,t,e,n,r){return i.x=t*e.x+n*r.x,i.y=t*e.y+n*r.y,i}function fe(i,t,e,n,r,s,o){return i.x=t*e.x+n*r.x+s*o.x,i.y=t*e.y+n*r.y+s*o.y,i}function Zl(i){var t=cs(i.x*i.x+i.y*i.y);if(t!==0){var e=1/t;i.x*=e,i.y*=e}return t}function se(i){var t=cs(i.x*i.x+i.y*i.y);if(t>0){var e=1/t;i.x*=e,i.y*=e}return i}function ai(i,t,e){var n=e*t.y,r=-e*t.x;return i.x=n,i.y=r,i}function qt(i,t,e){var n=-t*e.y,r=t*e.x;return i.x=n,i.y=r,i}function U(i,t){return i.x*t.y-i.y*t.x}function V(i,t){return i.x*t.x+i.y*t.y}function li(i){return i.x*i.x+i.y*i.y}function Pa(i,t){var e=i.x-t.x,n=i.y-t.y;return cs(e*e+n*n)}function ci(i,t){var e=i.x-t.x,n=i.y-t.y;return e*e+n*n}function Ql(i,t){return i.c=Ia(t),i.s=Sa(t),i}function Xt(i,t,e){return i.x=t.c*e.x-t.s*e.y,i.y=t.s*e.x+t.c*e.y,i}function Li(i,t,e){var n=t.c*e.x+t.s*e.y,r=-t.s*e.x+t.c*e.y;return i.x=n,i.y=r,i}function tc(i,t,e,n){var r=t.c*n.x+t.s*n.y,s=-t.s*n.x+t.c*n.y,o=e.c*r-e.s*s,a=e.s*r+e.c*s;return i.x=o,i.y=a,i}function pi(i,t,e){return{p:w(i,t),q:Kl(e)}}function ir(i,t){return i.p.x=t.p.x,i.p.y=t.p.y,i.q.s=t.q.s,i.q.c=t.q.c,i}function D(i,t,e){var n=t.q.c*e.x-t.q.s*e.y+t.p.x,r=t.q.s*e.x+t.q.c*e.y+t.p.y;return i.x=n,i.y=r,i}function hs(i,t,e){var n=e.x-t.p.x,r=e.y-t.p.y,s=t.q.c*n+t.q.s*r,o=-t.q.s*n+t.q.c*r;return i.x=s,i.y=o,i}function La(i,t,e,n){var r=t.q.c*n.x-t.q.s*n.y+t.p.x,s=t.q.s*n.x+t.q.c*n.y+t.p.y,o=r-e.p.x,a=s-e.p.y,l=e.q.c*o+e.q.s*a,h=-e.q.s*o+e.q.c*a;return i.x=l,i.y=h,i}function Ta(i,t,e){var n=t.q.c*e.q.c+t.q.s*e.q.s,r=t.q.c*e.q.s-t.q.s*e.q.c,s=t.q.c*(e.p.x-t.p.x)+t.q.s*(e.p.y-t.p.y),o=-t.q.s*(e.p.x-t.p.x)+t.q.c*(e.p.y-t.p.y);return i.q.c=n,i.q.s=r,i.p.x=s,i.p.y=o,i}var js=Math.sin,Js=Math.cos,ec=Math.atan2,k=(function(){function i(t){if(!(this instanceof i))return new i(t);typeof t=="number"?this.setAngle(t):typeof t=="object"?this.setRot(t):this.setIdentity()}return i.neo=function(t){var e=Object.create(i.prototype);return e.setAngle(t),e},i.clone=function(t){var e=Object.create(i.prototype);return e.s=t.s,e.c=t.c,e},i.identity=function(){var t=Object.create(i.prototype);return t.s=0,t.c=1,t},i.isValid=function(t){return t===null||typeof t>"u"?!1:Number.isFinite(t.s)&&Number.isFinite(t.c)},i.assert=function(t){},i.prototype.setIdentity=function(){this.s=0,this.c=1},i.prototype.set=function(t){typeof t=="object"?(this.s=t.s,this.c=t.c):(this.s=js(t),this.c=Js(t))},i.prototype.setRot=function(t){this.s=t.s,this.c=t.c},i.prototype.setAngle=function(t){this.s=js(t),this.c=Js(t)},i.prototype.getAngle=function(){return ec(this.s,this.c)},i.prototype.getXAxis=function(){return u.neo(this.c,this.s)},i.prototype.getYAxis=function(){return u.neo(-this.s,this.c)},i.mul=function(t,e){if("c"in e&&"s"in e){var n=i.identity();return n.s=t.s*e.c+t.c*e.s,n.c=t.c*e.c-t.s*e.s,n}else if("x"in e&&"y"in e)return u.neo(t.c*e.x-t.s*e.y,t.s*e.x+t.c*e.y)},i.mulRot=function(t,e){var n=i.identity();return n.s=t.s*e.c+t.c*e.s,n.c=t.c*e.c-t.s*e.s,n},i.mulVec2=function(t,e){return u.neo(t.c*e.x-t.s*e.y,t.s*e.x+t.c*e.y)},i.mulSub=function(t,e,n){var r=t.c*(e.x-n.x)-t.s*(e.y-n.y),s=t.s*(e.x-n.x)+t.c*(e.y-n.y);return u.neo(r,s)},i.mulT=function(t,e){if("c"in e&&"s"in e){var n=i.identity();return n.s=t.c*e.s-t.s*e.c,n.c=t.c*e.c+t.s*e.s,n}else if("x"in e&&"y"in e)return u.neo(t.c*e.x+t.s*e.y,-t.s*e.x+t.c*e.y)},i.mulTRot=function(t,e){var n=i.identity();return n.s=t.c*e.s-t.s*e.c,n.c=t.c*e.c+t.s*e.s,n},i.mulTVec2=function(t,e){return u.neo(t.c*e.x+t.s*e.y,-t.s*e.x+t.c*e.y)},i})(),ic=Math.atan2,Ys=Math.PI,je=w(0,0),Ei=(function(){function i(){this.localCenter=u.zero(),this.c=u.zero(),this.a=0,this.alpha0=0,this.c0=u.zero(),this.a0=0}return i.prototype.recycle=function(){z(this.localCenter),z(this.c),this.a=0,this.alpha0=0,z(this.c0),this.a0=0},i.prototype.setTransform=function(t){D(je,t,this.localCenter),g(this.c,je),g(this.c0,je),this.a=this.a0=ic(t.q.s,t.q.c)},i.prototype.setLocalCenter=function(t,e){g(this.localCenter,t),D(je,e,this.localCenter),g(this.c,je),g(this.c0,je)},i.prototype.getTransform=function(t,e){e===void 0&&(e=0),Ql(t.q,(1-e)*this.a0+e*this.a),Q(t.p,1-e,this.c0,e,this.c),Se(t.p,Xt(je,t.q,this.localCenter))},i.prototype.advance=function(t){var e=(t-this.alpha0)/(1-this.alpha0);Q(this.c0,e,this.c,1-e,this.c0),this.a0=e*this.a+(1-e)*this.a0,this.alpha0=t},i.prototype.forward=function(){this.a0=this.a,g(this.c0,this.c)},i.prototype.normalize=function(){var t=Va(this.a0,-Ys,+Ys);this.a-=this.a0-t,this.a0=t},i.prototype.set=function(t){g(this.localCenter,t.localCenter),g(this.c,t.c),this.a=t.a,this.alpha0=t.alpha0,g(this.c0,t.c0),this.a0=t.a0},i})(),oe=(function(){function i(t,e){if(!(this instanceof i))return new i(t,e);this.p=u.zero(),this.q=k.identity(),typeof t<"u"&&this.p.setVec2(t),typeof e<"u"&&this.q.setAngle(e)}return i.clone=function(t){var e=Object.create(i.prototype);return e.p=u.clone(t.p),e.q=k.clone(t.q),e},i.neo=function(t,e){var n=Object.create(i.prototype);return n.p=u.clone(t),n.q=k.clone(e),n},i.identity=function(){var t=Object.create(i.prototype);return t.p=u.zero(),t.q=k.identity(),t},i.prototype.setIdentity=function(){this.p.setZero(),this.q.setIdentity()},i.prototype.set=function(t,e){typeof e>"u"?(this.p.set(t.p),this.q.set(t.q)):(this.p.set(t),this.q.set(e))},i.prototype.setNum=function(t,e){this.p.setVec2(t),this.q.setAngle(e)},i.prototype.setTransform=function(t){this.p.setVec2(t.p),this.q.setRot(t.q)},i.isValid=function(t){return t===null||typeof t>"u"?!1:u.isValid(t.p)&&k.isValid(t.q)},i.assert=function(t){},i.mul=function(t,e){if(Array.isArray(e)){for(var n=[],r=0;r<e.length;r++)n[r]=i.mul(t,e[r]);return n}else{if("x"in e&&"y"in e)return i.mulVec2(t,e);if("p"in e&&"q"in e)return i.mulXf(t,e)}},i.mulAll=function(t,e){for(var n=[],r=0;r<e.length;r++)n[r]=i.mul(t,e[r]);return n},i.mulFn=function(t){return function(e){return i.mul(t,e)}},i.mulVec2=function(t,e){var n=t.q.c*e.x-t.q.s*e.y+t.p.x,r=t.q.s*e.x+t.q.c*e.y+t.p.y;return u.neo(n,r)},i.mulXf=function(t,e){var n=i.identity();return n.q=k.mulRot(t.q,e.q),n.p=u.add(k.mulVec2(t.q,e.p),t.p),n},i.mulT=function(t,e){if("x"in e&&"y"in e)return i.mulTVec2(t,e);if("p"in e&&"q"in e)return i.mulTXf(t,e)},i.mulTVec2=function(t,e){var n=e.x-t.p.x,r=e.y-t.p.y,s=t.q.c*n+t.q.s*r,o=-t.q.s*n+t.q.c*r;return u.neo(s,o)},i.mulTXf=function(t,e){var n=i.identity();return n.q.setRot(k.mulTRot(t.q,e.q)),n.p.setVec2(k.mulTVec2(t.q,u.sub(e.p,t.p))),n},i})(),nc=(function(){function i(){this.v=u.zero(),this.w=0}return i})(),za=Math.sin,Fa=Math.cos,rc=(function(){function i(){this.c=u.zero(),this.a=0}return i.prototype.getTransform=function(t,e){return t.q.c=Fa(this.a),t.q.s=za(this.a),t.p.x=this.c.x-(t.q.c*e.x-t.q.s*e.y),t.p.y=this.c.y-(t.q.s*e.x+t.q.c*e.y),t},i})();function dn(i,t,e,n){return i.q.c=Fa(n),i.q.s=za(n),i.p.x=e.x-(i.q.c*t.x-i.q.s*t.y),i.p.y=e.y-(i.q.s*t.x+i.q.c*t.y),i}var di=(function(){function i(){this.style={},this.appData={}}return i.isValid=function(t){return t===null||typeof t>"u"?!1:typeof t.m_type=="string"&&typeof t.m_radius=="number"},i})(),Ws=new gt,Ks=new gt,Xs=w(0,0),sc={userData:null,friction:.2,restitution:0,density:0,isSensor:!1,filterGroupIndex:0,filterCategoryBits:1,filterMaskBits:65535},Zs=(function(){function i(t,e){this.aabb=new gt,this.fixture=t,this.childIndex=e}return i})(),nr=(function(){function i(t,e,n){this.style={},this.appData={},e.shape?(n=e,e=e.shape):typeof n=="number"&&(n={density:n}),n=Rt(n,sc),this.m_body=t,this.m_friction=n.friction,this.m_restitution=n.restitution,this.m_density=n.density,this.m_isSensor=n.isSensor,this.m_filterGroupIndex=n.filterGroupIndex,this.m_filterCategoryBits=n.filterCategoryBits,this.m_filterMaskBits=n.filterMaskBits,this.m_shape=e,this.m_next=null,this.m_proxies=[],this.m_proxyCount=0;for(var r=this.m_shape.getChildCount(),s=0;s<r;++s)this.m_proxies[s]=new Zs(this,s);this.m_userData=n.userData,typeof n.style=="object"&&n.style!==null&&(this.style=n.style)}return i.prototype._reset=function(){var t=this.getBody(),e=t.m_world.m_broadPhase;this.destroyProxies(e),this.m_shape._reset&&this.m_shape._reset();for(var n=this.m_shape.getChildCount(),r=0;r<n;++r)this.m_proxies[r]=new Zs(this,r);this.createProxies(e,t.m_xf),t.resetMassData()},i.prototype._serialize=function(){return{friction:this.m_friction,restitution:this.m_restitution,density:this.m_density,isSensor:this.m_isSensor,filterGroupIndex:this.m_filterGroupIndex,filterCategoryBits:this.m_filterCategoryBits,filterMaskBits:this.m_filterMaskBits,shape:this.m_shape}},i._deserialize=function(t,e,n){var r=n(di,t.shape),s=r&&new i(e,r,t);return s},i.prototype.getType=function(){return this.m_shape.m_type},i.prototype.getShape=function(){return this.m_shape},i.prototype.isSensor=function(){return this.m_isSensor},i.prototype.setSensor=function(t){t!=this.m_isSensor&&(this.m_body.setAwake(!0),this.m_isSensor=t)},i.prototype.getUserData=function(){return this.m_userData},i.prototype.setUserData=function(t){this.m_userData=t},i.prototype.getBody=function(){return this.m_body},i.prototype.getNext=function(){return this.m_next},i.prototype.getDensity=function(){return this.m_density},i.prototype.setDensity=function(t){this.m_density=t},i.prototype.getFriction=function(){return this.m_friction},i.prototype.setFriction=function(t){this.m_friction=t},i.prototype.getRestitution=function(){return this.m_restitution},i.prototype.setRestitution=function(t){this.m_restitution=t},i.prototype.testPoint=function(t){return this.m_shape.testPoint(this.m_body.getTransform(),t)},i.prototype.rayCast=function(t,e,n){return this.m_shape.rayCast(t,e,this.m_body.getTransform(),n)},i.prototype.getMassData=function(t){this.m_shape.computeMass(t,this.m_density)},i.prototype.getAABB=function(t){return this.m_proxies[t].aabb},i.prototype.createProxies=function(t,e){this.m_proxyCount=this.m_shape.getChildCount();for(var n=0;n<this.m_proxyCount;++n){var r=this.m_proxies[n];this.m_shape.computeAABB(r.aabb,e,n),r.proxyId=t.createProxy(r.aabb,r)}},i.prototype.destroyProxies=function(t){for(var e=0;e<this.m_proxyCount;++e){var n=this.m_proxies[e];t.destroyProxy(n.proxyId),n.proxyId=null}this.m_proxyCount=0},i.prototype.synchronize=function(t,e,n){for(var r=0;r<this.m_proxyCount;++r){var s=this.m_proxies[r];this.m_shape.computeAABB(Ws,e,s.childIndex),this.m_shape.computeAABB(Ks,n,s.childIndex),s.aabb.combine(Ws,Ks),N(Xs,n.p,e.p),t.moveProxy(s.proxyId,s.aabb,Xs)}},i.prototype.setFilterData=function(t){this.m_filterGroupIndex=t.groupIndex,this.m_filterCategoryBits=t.categoryBits,this.m_filterMaskBits=t.maskBits,this.refilter()},i.prototype.getFilterGroupIndex=function(){return this.m_filterGroupIndex},i.prototype.setFilterGroupIndex=function(t){this.m_filterGroupIndex=t,this.refilter()},i.prototype.getFilterCategoryBits=function(){return this.m_filterCategoryBits},i.prototype.setFilterCategoryBits=function(t){this.m_filterCategoryBits=t,this.refilter()},i.prototype.getFilterMaskBits=function(){return this.m_filterMaskBits},i.prototype.setFilterMaskBits=function(t){this.m_filterMaskBits=t,this.refilter()},i.prototype.refilter=function(){if(this.m_body!=null){for(var t=this.m_body.getContactList();t;){var e=t.contact,n=e.getFixtureA(),r=e.getFixtureB();(n==this||r==this)&&e.flagForFiltering(),t=t.next}var s=this.m_body.getWorld();if(s!=null)for(var o=s.m_broadPhase,a=0;a<this.m_proxyCount;++a)o.touchProxy(this.m_proxies[a].proxyId)}},i.prototype.shouldCollide=function(t){if(t.m_filterGroupIndex===this.m_filterGroupIndex&&t.m_filterGroupIndex!==0)return t.m_filterGroupIndex>0;var e=(t.m_filterMaskBits&this.m_filterCategoryBits)!==0,n=(t.m_filterCategoryBits&this.m_filterMaskBits)!==0,r=e&&n;return r},i})(),Pi="static",Qs="kinematic",te="dynamic",fn=w(0,0),Je=w(0,0),vn=w(0,0),yn=w(0,0),to=pi(0,0,0),oc={type:Pi,position:u.zero(),angle:0,linearVelocity:u.zero(),angularVelocity:0,linearDamping:0,angularDamping:0,fixedRotation:!1,bullet:!1,gravityScale:1,allowSleep:!0,awake:!0,active:!0,userData:null},Y=(function(){function i(t,e){this.style={},this.appData={},e=Rt(e,oc),this.m_world=t,this.m_awakeFlag=e.awake,this.m_autoSleepFlag=e.allowSleep,this.m_bulletFlag=e.bullet,this.m_fixedRotationFlag=e.fixedRotation,this.m_activeFlag=e.active,this.m_islandFlag=!1,this.m_toiFlag=!1,this.m_userData=e.userData,this.m_type=e.type,this.m_type==te?(this.m_mass=1,this.m_invMass=1):(this.m_mass=0,this.m_invMass=0),this.m_I=0,this.m_invI=0,this.m_xf=oe.identity(),this.m_xf.p.setVec2(e.position),this.m_xf.q.setAngle(e.angle),this.m_sweep=new Ei,this.m_sweep.setTransform(this.m_xf),this.c_velocity=new nc,this.c_position=new rc,this.m_force=u.zero(),this.m_torque=0,this.m_linearVelocity=u.clone(e.linearVelocity),this.m_angularVelocity=e.angularVelocity,this.m_linearDamping=e.linearDamping,this.m_angularDamping=e.angularDamping,this.m_gravityScale=e.gravityScale,this.m_sleepTime=0,this.m_jointList=null,this.m_contactList=null,this.m_fixtureList=null,this.m_prev=null,this.m_next=null,this.m_destroyed=!1,typeof e.style=="object"&&e.style!==null&&(this.style=e.style)}return i.prototype._serialize=function(){for(var t=[],e=this.m_fixtureList;e;e=e.m_next)t.push(e);return{type:this.m_type,bullet:this.m_bulletFlag,position:this.m_xf.p,angle:this.m_xf.q.getAngle(),linearVelocity:this.m_linearVelocity,angularVelocity:this.m_angularVelocity,fixtures:t}},i._deserialize=function(t,e,n){var r=new i(e,t);if(t.fixtures)for(var s=t.fixtures.length-1;s>=0;s--){var o=n(nr,t.fixtures[s],r);r._addFixture(o)}return r},i.prototype.isWorldLocked=function(){return!!(this.m_world&&this.m_world.isLocked())},i.prototype.getWorld=function(){return this.m_world},i.prototype.getNext=function(){return this.m_next},i.prototype.setUserData=function(t){this.m_userData=t},i.prototype.getUserData=function(){return this.m_userData},i.prototype.getFixtureList=function(){return this.m_fixtureList},i.prototype.getJointList=function(){return this.m_jointList},i.prototype.getContactList=function(){return this.m_contactList},i.prototype.isStatic=function(){return this.m_type==Pi},i.prototype.isDynamic=function(){return this.m_type==te},i.prototype.isKinematic=function(){return this.m_type==Qs},i.prototype.setStatic=function(){return this.setType(Pi),this},i.prototype.setDynamic=function(){return this.setType(te),this},i.prototype.setKinematic=function(){return this.setType(Qs),this},i.prototype.getType=function(){return this.m_type},i.prototype.setType=function(t){if(this.isWorldLocked()!=!0&&this.m_type!=t){this.m_type=t,this.resetMassData(),this.m_type==Pi&&(this.m_linearVelocity.setZero(),this.m_angularVelocity=0,this.m_sweep.forward(),this.synchronizeFixtures()),this.setAwake(!0),this.m_force.setZero(),this.m_torque=0;for(var e=this.m_contactList;e;){var n=e;e=e.next,this.m_world.destroyContact(n.contact)}this.m_contactList=null;for(var r=this.m_world.m_broadPhase,s=this.m_fixtureList;s;s=s.m_next)for(var o=0;o<s.m_proxyCount;++o)r.touchProxy(s.m_proxies[o].proxyId)}},i.prototype.isBullet=function(){return this.m_bulletFlag},i.prototype.setBullet=function(t){this.m_bulletFlag=!!t},i.prototype.isSleepingAllowed=function(){return this.m_autoSleepFlag},i.prototype.setSleepingAllowed=function(t){this.m_autoSleepFlag=!!t,this.m_autoSleepFlag==!1&&this.setAwake(!0)},i.prototype.isAwake=function(){return this.m_awakeFlag},i.prototype.setAwake=function(t){t?(this.m_awakeFlag=!0,this.m_sleepTime=0):(this.m_awakeFlag=!1,this.m_sleepTime=0,this.m_linearVelocity.setZero(),this.m_angularVelocity=0,this.m_force.setZero(),this.m_torque=0)},i.prototype.isActive=function(){return this.m_activeFlag},i.prototype.setActive=function(t){if(t!=this.m_activeFlag)if(this.m_activeFlag=!!t,this.m_activeFlag){for(var e=this.m_world.m_broadPhase,n=this.m_fixtureList;n;n=n.m_next)n.createProxies(e,this.m_xf);this.m_world.m_newFixture=!0}else{for(var e=this.m_world.m_broadPhase,n=this.m_fixtureList;n;n=n.m_next)n.destroyProxies(e);for(var r=this.m_contactList;r;){var s=r;r=r.next,this.m_world.destroyContact(s.contact)}this.m_contactList=null}},i.prototype.isFixedRotation=function(){return this.m_fixedRotationFlag},i.prototype.setFixedRotation=function(t){this.m_fixedRotationFlag!=t&&(this.m_fixedRotationFlag=!!t,this.m_angularVelocity=0,this.resetMassData())},i.prototype.getTransform=function(){return this.m_xf},i.prototype.setTransform=function(t,e){if(this.isWorldLocked()!=!0){typeof e=="number"?this.m_xf.setNum(t,e):this.m_xf.setTransform(t),this.m_sweep.setTransform(this.m_xf);for(var n=this.m_world.m_broadPhase,r=this.m_fixtureList;r;r=r.m_next)r.synchronize(n,this.m_xf,this.m_xf);this.setAwake(!0)}},i.prototype.synchronizeTransform=function(){this.m_sweep.getTransform(this.m_xf,1)},i.prototype.synchronizeFixtures=function(){this.m_sweep.getTransform(to,0);for(var t=this.m_world.m_broadPhase,e=this.m_fixtureList;e;e=e.m_next)e.synchronize(t,to,this.m_xf)},i.prototype.advance=function(t){this.m_sweep.advance(t),g(this.m_sweep.c,this.m_sweep.c0),this.m_sweep.a=this.m_sweep.a0,this.m_sweep.getTransform(this.m_xf,1)},i.prototype.getPosition=function(){return this.m_xf.p},i.prototype.setPosition=function(t){this.setTransform(t,this.m_sweep.a)},i.prototype.getAngle=function(){return this.m_sweep.a},i.prototype.setAngle=function(t){this.setTransform(this.m_xf.p,t)},i.prototype.getWorldCenter=function(){return this.m_sweep.c},i.prototype.getLocalCenter=function(){return this.m_sweep.localCenter},i.prototype.getLinearVelocity=function(){return this.m_linearVelocity},i.prototype.getLinearVelocityFromWorldPoint=function(t){var e=u.sub(t,this.m_sweep.c);return u.add(this.m_linearVelocity,u.crossNumVec2(this.m_angularVelocity,e))},i.prototype.getLinearVelocityFromLocalPoint=function(t){return this.getLinearVelocityFromWorldPoint(this.getWorldPoint(t))},i.prototype.setLinearVelocity=function(t){this.m_type!=Pi&&(u.dot(t,t)>0&&this.setAwake(!0),this.m_linearVelocity.setVec2(t))},i.prototype.getAngularVelocity=function(){return this.m_angularVelocity},i.prototype.setAngularVelocity=function(t){this.m_type!=Pi&&(t*t>0&&this.setAwake(!0),this.m_angularVelocity=t)},i.prototype.getLinearDamping=function(){return this.m_linearDamping},i.prototype.setLinearDamping=function(t){this.m_linearDamping=t},i.prototype.getAngularDamping=function(){return this.m_angularDamping},i.prototype.setAngularDamping=function(t){this.m_angularDamping=t},i.prototype.getGravityScale=function(){return this.m_gravityScale},i.prototype.setGravityScale=function(t){this.m_gravityScale=t},i.prototype.getMass=function(){return this.m_mass},i.prototype.getInertia=function(){return this.m_I+this.m_mass*u.dot(this.m_sweep.localCenter,this.m_sweep.localCenter)},i.prototype.getMassData=function(t){t.mass=this.m_mass,t.I=this.getInertia(),g(t.center,this.m_sweep.localCenter)},i.prototype.resetMassData=function(){if(this.m_mass=0,this.m_invMass=0,this.m_I=0,this.m_invI=0,z(this.m_sweep.localCenter),this.isStatic()||this.isKinematic()){g(this.m_sweep.c0,this.m_xf.p),g(this.m_sweep.c,this.m_xf.p),this.m_sweep.a0=this.m_sweep.a;return}z(Je);for(var t=this.m_fixtureList;t;t=t.m_next)if(t.m_density!=0){var e={mass:0,center:w(0,0),I:0};t.getMassData(e),this.m_mass+=e.mass,re(Je,e.mass,e.center),this.m_I+=e.I}this.m_mass>0?(this.m_invMass=1/this.m_mass,F(Je,this.m_invMass,Je)):(this.m_mass=1,this.m_invMass=1),this.m_I>0&&this.m_fixedRotationFlag==!1?(this.m_I-=this.m_mass*V(Je,Je),this.m_invI=1/this.m_I):(this.m_I=0,this.m_invI=0),g(fn,this.m_sweep.c),this.m_sweep.setLocalCenter(Je,this.m_xf),N(vn,this.m_sweep.c,fn),qt(yn,this.m_angularVelocity,vn),Wt(this.m_linearVelocity,yn)},i.prototype.setMassData=function(t){this.isWorldLocked()!=!0&&this.m_type==te&&(this.m_invMass=0,this.m_I=0,this.m_invI=0,this.m_mass=t.mass,this.m_mass<=0&&(this.m_mass=1),this.m_invMass=1/this.m_mass,t.I>0&&this.m_fixedRotationFlag==!1&&(this.m_I=t.I-this.m_mass*V(t.center,t.center),this.m_invI=1/this.m_I),g(fn,this.m_sweep.c),this.m_sweep.setLocalCenter(t.center,this.m_xf),N(vn,this.m_sweep.c,fn),qt(yn,this.m_angularVelocity,vn),Wt(this.m_linearVelocity,yn))},i.prototype.applyForce=function(t,e,n){n===void 0&&(n=!0),this.m_type==te&&(n&&this.m_awakeFlag==!1&&this.setAwake(!0),this.m_awakeFlag&&(this.m_force.add(t),this.m_torque+=u.crossVec2Vec2(u.sub(e,this.m_sweep.c),t)))},i.prototype.applyForceToCenter=function(t,e){e===void 0&&(e=!0),this.m_type==te&&(e&&this.m_awakeFlag==!1&&this.setAwake(!0),this.m_awakeFlag&&this.m_force.add(t))},i.prototype.applyTorque=function(t,e){e===void 0&&(e=!0),this.m_type==te&&(e&&this.m_awakeFlag==!1&&this.setAwake(!0),this.m_awakeFlag&&(this.m_torque+=t))},i.prototype.applyLinearImpulse=function(t,e,n){n===void 0&&(n=!0),this.m_type==te&&(n&&this.m_awakeFlag==!1&&this.setAwake(!0),this.m_awakeFlag&&(this.m_linearVelocity.addMul(this.m_invMass,t),this.m_angularVelocity+=this.m_invI*u.crossVec2Vec2(u.sub(e,this.m_sweep.c),t)))},i.prototype.applyAngularImpulse=function(t,e){e===void 0&&(e=!0),this.m_type==te&&(e&&this.m_awakeFlag==!1&&this.setAwake(!0),this.m_awakeFlag&&(this.m_angularVelocity+=this.m_invI*t))},i.prototype.shouldCollide=function(t){if(this.m_type!=te&&t.m_type!=te)return!1;for(var e=this.m_jointList;e;e=e.next)if(e.other==t&&e.joint.m_collideConnected==!1)return!1;return!0},i.prototype._addFixture=function(t){if(this.isWorldLocked()==!0)return null;if(this.m_activeFlag){var e=this.m_world.m_broadPhase;t.createProxies(e,this.m_xf)}return t.m_next=this.m_fixtureList,this.m_fixtureList=t,t.m_density>0&&this.resetMassData(),this.m_world.m_newFixture=!0,t},i.prototype.createFixture=function(t,e){if(this.isWorldLocked()==!0)return null;var n=new nr(this,t,e);return this._addFixture(n),n},i.prototype.destroyFixture=function(t){if(this.isWorldLocked()!=!0){if(this.m_fixtureList===t)this.m_fixtureList=t.m_next;else for(var e=this.m_fixtureList;e!=null;){if(e.m_next===t){e.m_next=t.m_next;break}e=e.m_next}for(var n=this.m_contactList;n;){var r=n.contact;n=n.next;var s=r.getFixtureA(),o=r.getFixtureB();(t==s||t==o)&&this.m_world.destroyContact(r)}if(this.m_activeFlag){var a=this.m_world.m_broadPhase;t.destroyProxies(a)}t.m_body=null,t.m_next=null,this.m_world.publish("remove-fixture",t),this.resetMassData()}},i.prototype.getWorldPoint=function(t){return oe.mulVec2(this.m_xf,t)},i.prototype.getWorldVector=function(t){return k.mulVec2(this.m_xf.q,t)},i.prototype.getLocalPoint=function(t){return oe.mulTVec2(this.m_xf,t)},i.prototype.getLocalVector=function(t){return k.mulTVec2(this.m_xf.q,t)},i.STATIC="static",i.KINEMATIC="kinematic",i.DYNAMIC="dynamic",i})(),eo=(function(){function i(){this.other=null,this.joint=null,this.prev=null,this.next=null}return i})(),bt=(function(){function i(t,e,n){this.m_type="unknown-joint",this.m_prev=null,this.m_next=null,this.m_edgeA=new eo,this.m_edgeB=new eo,this.m_islandFlag=!1,this.style={},this.appData={},e="bodyA"in t?t.bodyA:e,n="bodyB"in t?t.bodyB:n,this.m_bodyA=e,this.m_bodyB=n,this.m_collideConnected=!!t.collideConnected,this.m_userData=t.userData,typeof t.style=="object"&&t.style!==null&&(this.style=t.style)}return i.prototype.isActive=function(){return this.m_bodyA.isActive()&&this.m_bodyB.isActive()},i.prototype.getType=function(){return this.m_type},i.prototype.getBodyA=function(){return this.m_bodyA},i.prototype.getBodyB=function(){return this.m_bodyB},i.prototype.getNext=function(){return this.m_next},i.prototype.getUserData=function(){return this.m_userData},i.prototype.setUserData=function(t){this.m_userData=t},i.prototype.getCollideConnected=function(){return this.m_collideConnected},i.prototype.shiftOrigin=function(t){},i.prototype._resetAnchors=function(t){return this._reset(t)},i})(),et={gjkCalls:0,gjkIters:0,gjkMaxIters:0,toiTime:0,toiMaxTime:0,toiCalls:0,toiIters:0,toiMaxIters:0,toiRootIters:0,toiMaxRootIters:0},ac=function(){return Date.now()},lc=function(i){return Date.now()-i};const io={now:ac,diff:lc};var cc=Math.max,xn=w(0,0),gn=w(0,0),zt=w(0,0),bn=w(0,0),xr=w(0,0),hc=w(0,0),mc=w(0,0);et.gjkCalls=0;et.gjkIters=0;et.gjkMaxIters=0;var ms=(function(){function i(){this.proxyA=new mi,this.proxyB=new mi,this.transformA=oe.identity(),this.transformB=oe.identity(),this.useRadii=!1}return i.prototype.recycle=function(){this.proxyA.recycle(),this.proxyB.recycle(),this.transformA.setIdentity(),this.transformB.setIdentity(),this.useRadii=!1},i})(),us=(function(){function i(){this.pointA=w(0,0),this.pointB=w(0,0),this.distance=0,this.iterations=0}return i.prototype.recycle=function(){z(this.pointA),z(this.pointB),this.distance=0,this.iterations=0},i})(),_s=(function(){function i(){this.metric=0,this.indexA=[],this.indexB=[],this.count=0}return i.prototype.recycle=function(){this.metric=0,this.indexA.length=0,this.indexB.length=0,this.count=0},i})(),fi=function(i,t,e){++et.gjkCalls;var n=e.proxyA,r=e.proxyB,s=e.transformA,o=e.transformB;ee.recycle(),ee.readCache(t,n,s,r,o);for(var a=ee.m_v,l=P.maxDistanceIterations,h=[],_=[],p=0,c=0;c<l;){p=ee.m_count;for(var m=0;m<p;++m)h[m]=a[m].indexA,_[m]=a[m].indexB;if(ee.solve(),ee.m_count===3)break;var f=ee.getSearchDirection();if(li(f)<Mt*Mt)break;var d=a[ee.m_count];d.indexA=n.getSupport(Li(xn,s.q,F(xn,-1,f))),D(d.wA,s,n.getVertex(d.indexA)),d.indexB=r.getSupport(Li(xn,o.q,f)),D(d.wB,o,r.getVertex(d.indexB)),N(d.w,d.wB,d.wA),++c,++et.gjkIters;for(var v=!1,m=0;m<p;++m)if(d.indexA===h[m]&&d.indexB===_[m]){v=!0;break}if(v)break;++ee.m_count}if(et.gjkMaxIters=cc(et.gjkMaxIters,c),ee.getWitnessPoints(i.pointA,i.pointB),i.distance=Pa(i.pointA,i.pointB),i.iterations=c,ee.writeCache(t),e.useRadii){var y=n.m_radius,x=r.m_radius;if(i.distance>y+x&&i.distance>Mt)i.distance-=y+x,N(gn,i.pointB,i.pointA),se(gn),re(i.pointA,y,gn),tn(i.pointB,x,gn);else{var b=N(xn,i.pointA,i.pointB);g(i.pointA,b),g(i.pointB,b),i.distance=0}}},mi=(function(){function i(){this.m_vertices=[],this.m_count=0,this.m_radius=0}return i.prototype.recycle=function(){this.m_vertices.length=0,this.m_count=0,this.m_radius=0},i.prototype.getVertexCount=function(){return this.m_count},i.prototype.getVertex=function(t){return this.m_vertices[t]},i.prototype.getSupport=function(t){for(var e=-1,n=-1/0,r=0;r<this.m_count;++r){var s=V(this.m_vertices[r],t);s>n&&(e=r,n=s)}return e},i.prototype.getSupportVertex=function(t){return this.m_vertices[this.getSupport(t)]},i.prototype.set=function(t,e){t.computeDistanceProxy(this,e)},i.prototype.setVertices=function(t,e,n){this.m_vertices=t,this.m_count=e,this.m_radius=n},i})(),gr=(function(){function i(){this.wA=w(0,0),this.indexA=0,this.wB=w(0,0),this.indexB=0,this.w=w(0,0),this.a=0}return i.prototype.recycle=function(){this.indexA=0,this.indexB=0,z(this.wA),z(this.wB),z(this.w),this.a=0},i.prototype.set=function(t){this.indexA=t.indexA,this.indexB=t.indexB,g(this.wA,t.wA),g(this.wB,t.wB),g(this.w,t.w),this.a=t.a},i})(),An=w(0,0),Oi=w(0,0),uc=(function(){function i(){this.m_v1=new gr,this.m_v2=new gr,this.m_v3=new gr,this.m_v=[this.m_v1,this.m_v2,this.m_v3]}return i.prototype.recycle=function(){this.m_v1.recycle(),this.m_v2.recycle(),this.m_v3.recycle(),this.m_count=0},i.prototype.toString=function(){return this.m_count===3?["+"+this.m_count,this.m_v1.a,this.m_v1.wA.x,this.m_v1.wA.y,this.m_v1.wB.x,this.m_v1.wB.y,this.m_v2.a,this.m_v2.wA.x,this.m_v2.wA.y,this.m_v2.wB.x,this.m_v2.wB.y,this.m_v3.a,this.m_v3.wA.x,this.m_v3.wA.y,this.m_v3.wB.x,this.m_v3.wB.y].toString():this.m_count===2?["+"+this.m_count,this.m_v1.a,this.m_v1.wA.x,this.m_v1.wA.y,this.m_v1.wB.x,this.m_v1.wB.y,this.m_v2.a,this.m_v2.wA.x,this.m_v2.wA.y,this.m_v2.wB.x,this.m_v2.wB.y].toString():this.m_count===1?["+"+this.m_count,this.m_v1.a,this.m_v1.wA.x,this.m_v1.wA.y,this.m_v1.wB.x,this.m_v1.wB.y].toString():"+"+this.m_count},i.prototype.readCache=function(t,e,n,r,s){this.m_count=t.count;for(var o=0;o<this.m_count;++o){var a=this.m_v[o];a.indexA=t.indexA[o],a.indexB=t.indexB[o];var l=e.getVertex(a.indexA),h=r.getVertex(a.indexB);D(a.wA,n,l),D(a.wB,s,h),N(a.w,a.wB,a.wA),a.a=0}if(this.m_count>1){var _=t.metric,p=this.getMetric();(p<.5*_||2*_<p||p<Mt)&&(this.m_count=0)}if(this.m_count===0){var a=this.m_v[0];a.indexA=0,a.indexB=0;var l=e.getVertex(0),h=r.getVertex(0);D(a.wA,n,l),D(a.wB,s,h),N(a.w,a.wB,a.wA),a.a=1,this.m_count=1}},i.prototype.writeCache=function(t){t.metric=this.getMetric(),t.count=this.m_count;for(var e=0;e<this.m_count;++e)t.indexA[e]=this.m_v[e].indexA,t.indexB[e]=this.m_v[e].indexB},i.prototype.getSearchDirection=function(){var t=this.m_v1,e=this.m_v2;switch(this.m_count){case 1:return vt(An,-t.w.x,-t.w.y);case 2:{N(zt,e.w,t.w);var n=-U(zt,t.w);return n>0?vt(An,-zt.y,zt.x):vt(An,zt.y,-zt.x)}default:return z(An)}},i.prototype.getClosestPoint=function(){var t=this.m_v1,e=this.m_v2;switch(this.m_count){case 0:return z(Oi);case 1:return g(Oi,t.w);case 2:return Q(Oi,t.a,t.w,e.a,e.w);case 3:return z(Oi);default:return z(Oi)}},i.prototype.getWitnessPoints=function(t,e){var n=this.m_v1,r=this.m_v2,s=this.m_v3;switch(this.m_count){case 0:break;case 1:g(t,n.wA),g(e,n.wB);break;case 2:Q(t,n.a,n.wA,r.a,r.wA),Q(e,n.a,n.wB,r.a,r.wB);break;case 3:fe(t,n.a,n.wA,r.a,r.wA,s.a,s.wA),g(e,t);break}},i.prototype.getMetric=function(){switch(this.m_count){case 0:return 0;case 1:return 0;case 2:return Pa(this.m_v1.w,this.m_v2.w);case 3:return U(N(hc,this.m_v2.w,this.m_v1.w),N(mc,this.m_v3.w,this.m_v1.w));default:return 0}},i.prototype.solve=function(){switch(this.m_count){case 1:break;case 2:this.solve2();break;case 3:this.solve3();break}},i.prototype.solve2=function(){var t=this.m_v1.w,e=this.m_v2.w;N(zt,e,t);var n=-V(t,zt);if(n<=0){this.m_v1.a=1,this.m_count=1;return}var r=V(e,zt);if(r<=0){this.m_v2.a=1,this.m_count=1,this.m_v1.set(this.m_v2);return}var s=1/(r+n);this.m_v1.a=r*s,this.m_v2.a=n*s,this.m_count=2},i.prototype.solve3=function(){var t=this.m_v1.w,e=this.m_v2.w,n=this.m_v3.w;N(zt,e,t);var r=V(t,zt),s=V(e,zt),o=s,a=-r;N(bn,n,t);var l=V(t,bn),h=V(n,bn),_=h,p=-l;N(xr,n,e);var c=V(e,xr),m=V(n,xr),f=m,d=-c,v=U(zt,bn),y=v*U(e,n),x=v*U(n,t),b=v*U(t,e);if(a<=0&&p<=0){this.m_v1.a=1,this.m_count=1;return}if(o>0&&a>0&&b<=0){var B=1/(o+a);this.m_v1.a=o*B,this.m_v2.a=a*B,this.m_count=2;return}if(_>0&&p>0&&x<=0){var A=1/(_+p);this.m_v1.a=_*A,this.m_v3.a=p*A,this.m_count=2,this.m_v2.set(this.m_v3);return}if(o<=0&&d<=0){this.m_v2.a=1,this.m_count=1,this.m_v1.set(this.m_v2);return}if(_<=0&&f<=0){this.m_v3.a=1,this.m_count=1,this.m_v1.set(this.m_v3);return}if(f>0&&d>0&&y<=0){var M=1/(f+d);this.m_v2.a=f*M,this.m_v3.a=d*M,this.m_count=2,this.m_v1.set(this.m_v3);return}var C=1/(y+x+b);this.m_v1.a=y*C,this.m_v2.a=x*C,this.m_v3.a=b*C,this.m_count=3},i})(),ee=new uc,Ye=new ms,no=new _s,br=new us,qa=function(i,t,e,n,r,s){return Ye.recycle(),Ye.proxyA.set(i,t),Ye.proxyB.set(e,n),ir(Ye.transformA,r),ir(Ye.transformB,s),Ye.useRadii=!0,br.recycle(),no.recycle(),fi(br,no,Ye),br.distance<10*Mt};fi.testOverlap=qa;fi.Input=ms;fi.Output=us;fi.Proxy=mi;fi.Cache=_s;(function(){function i(){this.proxyA=new mi,this.proxyB=new mi,this.transformA=oe.identity(),this.transformB=oe.identity(),this.translationB=u.zero()}return i.prototype.recycle=function(){this.proxyA.recycle(),this.proxyB.recycle(),this.transformA.setIdentity(),this.transformB.setIdentity(),z(this.translationB)},i})();var _c=Math.abs,wn=Math.max,Ea=(function(){function i(){this.proxyA=new mi,this.proxyB=new mi,this.sweepA=new Ei,this.sweepB=new Ei}return i.prototype.recycle=function(){this.proxyA.recycle(),this.proxyB.recycle(),this.sweepA.recycle(),this.sweepB.recycle(),this.tMax=-1},i})(),Kt;(function(i){i[i.e_unset=-1]="e_unset",i[i.e_unknown=0]="e_unknown",i[i.e_failed=1]="e_failed",i[i.e_overlapped=2]="e_overlapped",i[i.e_touching=3]="e_touching",i[i.e_separated=4]="e_separated"})(Kt||(Kt={}));var Da=(function(){function i(){this.state=Kt.e_unset,this.t=-1}return i.prototype.recycle=function(){this.state=Kt.e_unset,this.t=-1},i})();et.toiTime=0;et.toiMaxTime=0;et.toiCalls=0;et.toiIters=0;et.toiMaxIters=0;et.toiRootIters=0;et.toiMaxRootIters=0;var yi=new ms,Ar=new us,wr=new _s,St=pi(0,0,0),It=pi(0,0,0),Ui=w(0,0),me=w(0,0),Gt=w(0,0),Vt=w(0,0),Bn=w(0,0),kn=w(0,0),Mn=w(0,0),Cn=w(0,0),ps=function(i,t){var e=io.now();++et.toiCalls,i.state=Kt.e_unknown,i.t=t.tMax;var n=t.proxyA,r=t.proxyB,s=t.sweepA,o=t.sweepB;s.normalize(),o.normalize();var a=t.tMax,l=n.m_radius+r.m_radius,h=wn(P.linearSlop,l-3*P.linearSlop),_=.25*P.linearSlop,p=0,c=P.maxTOIIterations,m=0;for(wr.recycle(),yi.proxyA.setVertices(n.m_vertices,n.m_count,n.m_radius),yi.proxyB.setVertices(r.m_vertices,r.m_count,r.m_radius),yi.useRadii=!1;;){if(s.getTransform(St,p),o.getTransform(It,p),ir(yi.transformA,St),ir(yi.transformB,It),fi(Ar,wr,yi),Ar.distance<=0){i.state=Kt.e_overlapped,i.t=0;break}if(Ar.distance<h+_){i.state=Kt.e_touching,i.t=p;break}$i.initialize(wr,n,s,r,o,p);for(var f=!1,d=a,v=0;;){var y=$i.findMinSeparation(d);if(y>h+_){i.state=Kt.e_separated,i.t=a,f=!0;break}if(y>h-_){p=d;break}var x=$i.evaluate(p);if(x<h-_){i.state=Kt.e_failed,i.t=p,f=!0;break}if(x<=h+_){i.state=Kt.e_touching,i.t=p,f=!0;break}for(var b=0,B=p,A=d;;){var M=void 0;b&1?M=B+(h-x)*(A-B)/(y-x):M=.5*(B+A),++b,++et.toiRootIters;var C=$i.evaluate(M);if(_c(C-h)<_){d=M;break}if(C>h?(B=M,x=C):(A=M,y=C),b===50)break}if(et.toiMaxRootIters=wn(et.toiMaxRootIters,b),++v,v===P.maxPolygonVertices)break}if(++m,++et.toiIters,f)break;if(m===c){i.state=Kt.e_failed,i.t=p;break}}et.toiMaxIters=wn(et.toiMaxIters,m);var I=io.diff(e);et.toiMaxTime=wn(et.toiMaxTime,I),et.toiTime+=I,$i.recycle()},ve;(function(i){i[i.e_unset=-1]="e_unset",i[i.e_points=1]="e_points",i[i.e_faceA=2]="e_faceA",i[i.e_faceB=3]="e_faceB"})(ve||(ve={}));var pc=(function(){function i(){this.m_proxyA=null,this.m_proxyB=null,this.m_sweepA=null,this.m_sweepB=null,this.m_type=ve.e_unset,this.m_localPoint=w(0,0),this.m_axis=w(0,0),this.indexA=-1,this.indexB=-1}return i.prototype.recycle=function(){this.m_proxyA=null,this.m_proxyB=null,this.m_sweepA=null,this.m_sweepB=null,this.m_type=ve.e_unset,z(this.m_localPoint),z(this.m_axis),this.indexA=-1,this.indexB=-1},i.prototype.initialize=function(t,e,n,r,s,o){var a=t.count;if(this.m_proxyA=e,this.m_proxyB=r,this.m_sweepA=n,this.m_sweepB=s,this.m_sweepA.getTransform(St,o),this.m_sweepB.getTransform(It,o),a===1){this.m_type=ve.e_points;var l=this.m_proxyA.getVertex(t.indexA[0]),h=this.m_proxyB.getVertex(t.indexB[0]);D(me,St,l),D(Gt,It,h),N(this.m_axis,Gt,me);var _=Zl(this.m_axis);return _}else if(t.indexA[0]===t.indexA[1]){this.m_type=ve.e_faceB;var p=r.getVertex(t.indexB[0]),c=r.getVertex(t.indexB[1]);ai(this.m_axis,N(Ui,c,p),1),se(this.m_axis),Xt(Vt,It.q,this.m_axis),Q(this.m_localPoint,.5,p,.5,c),D(Gt,It,this.m_localPoint);var m=e.getVertex(t.indexA[0]),f=oe.mulVec2(St,m),_=V(f,Vt)-V(Gt,Vt);return _<0&&(ln(this.m_axis),_=-_),_}else{this.m_type=ve.e_faceA;var d=this.m_proxyA.getVertex(t.indexA[0]),v=this.m_proxyA.getVertex(t.indexA[1]);ai(this.m_axis,N(Ui,v,d),1),se(this.m_axis),Xt(Vt,St.q,this.m_axis),Q(this.m_localPoint,.5,d,.5,v),D(me,St,this.m_localPoint);var y=this.m_proxyB.getVertex(t.indexB[0]);D(Gt,It,y);var _=V(Gt,Vt)-V(me,Vt);return _<0&&(ln(this.m_axis),_=-_),_}},i.prototype.compute=function(t,e){switch(this.m_sweepA.getTransform(St,e),this.m_sweepB.getTransform(It,e),this.m_type){case ve.e_points:{t&&(Li(Bn,St.q,this.m_axis),Li(kn,It.q,F(Ui,-1,this.m_axis)),this.indexA=this.m_proxyA.getSupport(Bn),this.indexB=this.m_proxyB.getSupport(kn)),g(Mn,this.m_proxyA.getVertex(this.indexA)),g(Cn,this.m_proxyB.getVertex(this.indexB)),D(me,St,Mn),D(Gt,It,Cn);var n=V(Gt,this.m_axis)-V(me,this.m_axis);return n}case ve.e_faceA:{Xt(Vt,St.q,this.m_axis),D(me,St,this.m_localPoint),t&&(Li(kn,It.q,F(Ui,-1,Vt)),this.indexA=-1,this.indexB=this.m_proxyB.getSupport(kn)),g(Cn,this.m_proxyB.getVertex(this.indexB)),D(Gt,It,Cn);var n=V(Gt,Vt)-V(me,Vt);return n}case ve.e_faceB:{Xt(Vt,It.q,this.m_axis),D(Gt,It,this.m_localPoint),t&&(Li(Bn,St.q,F(Ui,-1,Vt)),this.indexB=-1,this.indexA=this.m_proxyA.getSupport(Bn)),g(Mn,this.m_proxyA.getVertex(this.indexA)),D(me,St,Mn);var n=V(me,Vt)-V(Gt,Vt);return n}default:return t&&(this.indexA=-1,this.indexB=-1),0}},i.prototype.findMinSeparation=function(t){return this.compute(!0,t)},i.prototype.evaluate=function(t){return this.compute(!1,t)},i})(),$i=new pc;ps.Input=Ea;ps.Output=Da;var ro=Math.abs,so=Math.sqrt,Vn=Math.min,ds=(function(){function i(){this.dt=0,this.inv_dt=0,this.velocityIterations=0,this.positionIterations=0,this.warmStarting=!1,this.blockSolve=!0,this.inv_dt0=0,this.dtRatio=1}return i.prototype.reset=function(t){this.dt>0&&(this.inv_dt0=this.inv_dt),this.dt=t,this.inv_dt=t==0?0:1/t,this.dtRatio=t*this.inv_dt0},i})(),xi=new ds,Ae=w(0,0),xt=w(0,0),Sn=w(0,0),gi=new Ea,Br=new Da,oo=new Ei,ao=new Ei,lo=new Ei,dc=(function(){function i(t){this.contact=t,this.normals=[],this.tangents=[]}return i.prototype.recycle=function(){this.normals.length=0,this.tangents.length=0},Object.defineProperty(i.prototype,"normalImpulses",{get:function(){var t=this.contact,e=this.normals;e.length=0;for(var n=0;n<t.v_points.length;++n)e.push(t.v_points[n].normalImpulse);return e},enumerable:!1,configurable:!0}),Object.defineProperty(i.prototype,"tangentImpulses",{get:function(){var t=this.contact,e=this.tangents;e.length=0;for(var n=0;n<t.v_points.length;++n)e.push(t.v_points[n].tangentImpulse);return e},enumerable:!1,configurable:!0}),i})(),Na=(function(){function i(t){this.m_world=t,this.m_stack=[],this.m_bodies=[],this.m_contacts=[],this.m_joints=[]}return i.prototype.clear=function(){this.m_stack.length=0,this.m_bodies.length=0,this.m_contacts.length=0,this.m_joints.length=0},i.prototype.addBody=function(t){this.m_bodies.push(t)},i.prototype.addContact=function(t){this.m_contacts.push(t)},i.prototype.addJoint=function(t){this.m_joints.push(t)},i.prototype.solveWorld=function(t){for(var e=this.m_world,n=e.m_bodyList;n;n=n.m_next)n.m_islandFlag=!1;for(var r=e.m_contactList;r;r=r.m_next)r.m_islandFlag=!1;for(var s=e.m_jointList;s;s=s.m_next)s.m_islandFlag=!1;for(var o=this.m_stack,a=e.m_bodyList;a;a=a.m_next)if(!a.m_islandFlag&&!(a.isAwake()==!1||a.isActive()==!1)&&!a.isStatic()){for(this.clear(),o.push(a),a.m_islandFlag=!0;o.length>0;){var n=o.pop();if(this.addBody(n),n.m_awakeFlag=!0,!n.isStatic()){for(var l=n.m_contactList;l;l=l.next){var h=l.contact;if(!h.m_islandFlag&&!(h.isEnabled()==!1||h.isTouching()==!1)){var _=h.m_fixtureA.m_isSensor,p=h.m_fixtureB.m_isSensor;if(!(_||p)){this.addContact(h),h.m_islandFlag=!0;var c=l.other;c.m_islandFlag||(o.push(c),c.m_islandFlag=!0)}}}for(var m=n.m_jointList;m;m=m.next)if(m.joint.m_islandFlag!=!0){var c=m.other;c.isActive()!=!1&&(this.addJoint(m.joint),m.joint.m_islandFlag=!0,!c.m_islandFlag&&(o.push(c),c.m_islandFlag=!0))}}}this.solveIsland(t);for(var f=0;f<this.m_bodies.length;++f){var n=this.m_bodies[f];n.isStatic()&&(n.m_islandFlag=!1)}}},i.prototype.solveIsland=function(t){for(var e=this.m_world,n=e.m_gravity,r=e.m_allowSleep,s=t.dt,o=0;o<this.m_bodies.length;++o){var a=this.m_bodies[o];g(Ae,a.m_sweep.c);var l=a.m_sweep.a;g(xt,a.m_linearVelocity);var h=a.m_angularVelocity;g(a.m_sweep.c0,a.m_sweep.c),a.m_sweep.a0=a.m_sweep.a,a.isDynamic()&&(re(xt,s*a.m_gravityScale,n),re(xt,s*a.m_invMass,a.m_force),h+=s*a.m_invI*a.m_torque,F(xt,1/(1+s*a.m_linearDamping),xt),h*=1/(1+s*a.m_angularDamping)),g(a.c_position.c,Ae),a.c_position.a=l,g(a.c_velocity.v,xt),a.c_velocity.w=h}for(var o=0;o<this.m_contacts.length;++o){var _=this.m_contacts[o];_.initConstraint(t)}for(var o=0;o<this.m_contacts.length;++o){var _=this.m_contacts[o];_.initVelocityConstraint(t)}if(t.warmStarting)for(var o=0;o<this.m_contacts.length;++o){var _=this.m_contacts[o];_.warmStartConstraint(t)}for(var o=0;o<this.m_joints.length;++o){var p=this.m_joints[o];p.initVelocityConstraints(t)}for(var o=0;o<t.velocityIterations;++o){for(var c=0;c<this.m_joints.length;++c){var p=this.m_joints[c];p.solveVelocityConstraints(t)}for(var c=0;c<this.m_contacts.length;++c){var _=this.m_contacts[c];_.solveVelocityConstraint(t)}}for(var o=0;o<this.m_contacts.length;++o){var _=this.m_contacts[o];_.storeConstraintImpulses(t)}for(var o=0;o<this.m_bodies.length;++o){var a=this.m_bodies[o];g(Ae,a.c_position.c);var l=a.c_position.a;g(xt,a.c_velocity.v);var h=a.c_velocity.w;F(Sn,s,xt);var m=li(Sn);if(m>P.maxTranslationSquared){var f=P.maxTranslation/so(m);Hs(xt,f)}var d=s*h;if(d*d>P.maxRotationSquared){var f=P.maxRotation/ro(d);h*=f}re(Ae,s,xt),l+=s*h,g(a.c_position.c,Ae),a.c_position.a=l,g(a.c_velocity.v,xt),a.c_velocity.w=h}for(var v=!1,o=0;o<t.positionIterations;++o){for(var y=0,c=0;c<this.m_contacts.length;++c){var _=this.m_contacts[c],x=_.solvePositionConstraint(t);y=Vn(y,x)}for(var b=y>=-3*P.linearSlop,B=!0,c=0;c<this.m_joints.length;++c){var p=this.m_joints[c],A=p.solvePositionConstraints(t);B=B&&A}if(b&&B){v=!0;break}}for(var o=0;o<this.m_bodies.length;++o){var a=this.m_bodies[o];g(a.m_sweep.c,a.c_position.c),a.m_sweep.a=a.c_position.a,g(a.m_linearVelocity,a.c_velocity.v),a.m_angularVelocity=a.c_velocity.w,a.synchronizeTransform()}if(this.postSolveIsland(),r){for(var M=1/0,C=P.linearSleepToleranceSqr,I=P.angularSleepToleranceSqr,o=0;o<this.m_bodies.length;++o){var a=this.m_bodies[o];a.isStatic()||(a.m_autoSleepFlag==!1||a.m_angularVelocity*a.m_angularVelocity>I||li(a.m_linearVelocity)>C?(a.m_sleepTime=0,M=0):(a.m_sleepTime+=s,M=Vn(M,a.m_sleepTime)))}if(M>=P.timeToSleep&&v)for(var o=0;o<this.m_bodies.length;++o){var a=this.m_bodies[o];a.setAwake(!1)}}},i.prototype.solveWorldTOI=function(t){var e=this.m_world;if(e.m_stepComplete){for(var n=e.m_bodyList;n;n=n.m_next)n.m_islandFlag=!1,n.m_sweep.alpha0=0;for(var r=e.m_contactList;r;r=r.m_next)r.m_toiFlag=!1,r.m_islandFlag=!1,r.m_toiCount=0,r.m_toi=1}for(;;){for(var s=null,o=1,a=e.m_contactList;a;a=a.m_next)if(a.isEnabled()!=!1&&!(a.m_toiCount>P.maxSubSteps)){var l=1;if(a.m_toiFlag)l=a.m_toi;else{var h=a.getFixtureA(),_=a.getFixtureB();if(h.isSensor()||_.isSensor())continue;var p=h.getBody(),c=_.getBody(),m=p.isAwake()&&!p.isStatic(),f=c.isAwake()&&!c.isStatic();if(m==!1&&f==!1)continue;var d=p.isBullet()||!p.isDynamic(),v=c.isBullet()||!c.isDynamic();if(d==!1&&v==!1)continue;var y=p.m_sweep.alpha0;p.m_sweep.alpha0<c.m_sweep.alpha0?(y=c.m_sweep.alpha0,p.m_sweep.advance(y)):c.m_sweep.alpha0<p.m_sweep.alpha0&&(y=p.m_sweep.alpha0,c.m_sweep.advance(y));var x=a.getChildIndexA(),b=a.getChildIndexB();gi.proxyA.set(h.getShape(),x),gi.proxyB.set(_.getShape(),b),gi.sweepA.set(p.m_sweep),gi.sweepB.set(c.m_sweep),gi.tMax=1,ps(Br,gi);var B=Br.t;Br.state==Kt.e_touching?l=Vn(y+(1-y)*B,1):l=1,a.m_toi=l,a.m_toiFlag=!0}l<o&&(s=a,o=l)}if(s==null||1-10*Mt<o){e.m_stepComplete=!0;break}var A=s.getFixtureA(),M=s.getFixtureB(),C=A.getBody(),I=M.getBody();if(ao.set(C.m_sweep),lo.set(I.m_sweep),C.advance(o),I.advance(o),s.update(e),s.m_toiFlag=!1,++s.m_toiCount,s.isEnabled()==!1||s.isTouching()==!1){s.setEnabled(!1),C.m_sweep.set(ao),I.m_sweep.set(lo),C.synchronizeTransform(),I.synchronizeTransform();continue}C.setAwake(!0),I.setAwake(!0),this.clear(),this.addBody(C),this.addBody(I),this.addContact(s),C.m_islandFlag=!0,I.m_islandFlag=!0,s.m_islandFlag=!0;for(var T=[C,I],L=0;L<T.length;++L){var q=T[L];if(q.isDynamic())for(var $=q.m_contactList;$;$=$.next){var j=$.contact;if(!j.m_islandFlag){var G=$.other;if(!(G.isDynamic()&&!q.isBullet()&&!G.isBullet())){var Lt=j.m_fixtureA.m_isSensor,ft=j.m_fixtureB.m_isSensor;if(!(Lt||ft)){if(oo.set(G.m_sweep),G.m_islandFlag==!1&&G.advance(o),j.update(e),j.isEnabled()==!1||j.isTouching()==!1){G.m_sweep.set(oo),G.synchronizeTransform();continue}j.m_islandFlag=!0,this.addContact(j),!G.m_islandFlag&&(G.m_islandFlag=!0,G.isStatic()||G.setAwake(!0),this.addBody(G))}}}}}xi.reset((1-o)*t.dt),xi.dtRatio=1,xi.positionIterations=20,xi.velocityIterations=t.velocityIterations,xi.warmStarting=!1,this.solveIslandTOI(xi,C,I);for(var L=0;L<this.m_bodies.length;++L){var q=this.m_bodies[L];if(q.m_islandFlag=!1,!!q.isDynamic()){q.synchronizeFixtures();for(var $=q.m_contactList;$;$=$.next)$.contact.m_toiFlag=!1,$.contact.m_islandFlag=!1}}if(e.findNewContacts(),e.m_subStepping){e.m_stepComplete=!1;break}}},i.prototype.solveIslandTOI=function(t,e,n){for(var _=0;_<this.m_bodies.length;++_){var r=this.m_bodies[_];g(r.c_position.c,r.m_sweep.c),r.c_position.a=r.m_sweep.a,g(r.c_velocity.v,r.m_linearVelocity),r.c_velocity.w=r.m_angularVelocity}for(var _=0;_<this.m_contacts.length;++_){var s=this.m_contacts[_];s.initConstraint(t)}for(var _=0;_<t.positionIterations;++_){for(var o=0,a=0;a<this.m_contacts.length;++a){var s=this.m_contacts[a],l=s.solvePositionConstraintTOI(t,e,n);o=Vn(o,l)}var h=o>=-1.5*P.linearSlop;if(h)break}var _;g(e.m_sweep.c0,e.c_position.c),e.m_sweep.a0=e.c_position.a,g(n.m_sweep.c0,n.c_position.c),n.m_sweep.a0=n.c_position.a;for(var _=0;_<this.m_contacts.length;++_){var s=this.m_contacts[_];s.initVelocityConstraint(t)}for(var _=0;_<t.velocityIterations;++_)for(var a=0;a<this.m_contacts.length;++a){var s=this.m_contacts[a];s.solveVelocityConstraint(t)}for(var p=t.dt,_=0;_<this.m_bodies.length;++_){var r=this.m_bodies[_];g(Ae,r.c_position.c);var c=r.c_position.a;g(xt,r.c_velocity.v);var m=r.c_velocity.w;F(Sn,p,xt);var f=li(Sn);if(f>P.maxTranslationSquared){var d=P.maxTranslation/so(f);Hs(xt,d)}var v=p*m;if(v*v>P.maxRotationSquared){var d=P.maxRotation/ro(v);m*=d}re(Ae,p,xt),c+=p*m,g(r.c_position.c,Ae),r.c_position.a=c,g(r.c_velocity.v,xt),r.c_velocity.w=m,g(r.m_sweep.c,Ae),r.m_sweep.a=c,g(r.m_linearVelocity,xt),r.m_angularVelocity=m,r.synchronizeTransform()}this.postSolveIsland()},i.prototype.postSolveIsland=function(){for(var t=0;t<this.m_contacts.length;++t){var e=this.m_contacts[t];this.m_world.postSolve(e,e.m_impulse)}},i})();Na.TimeStep=ds;var ae=(function(){function i(t,e,n,r){typeof t=="object"&&t!==null?(this.ex=u.clone(t),this.ey=u.clone(e)):typeof t=="number"?(this.ex=u.neo(t,n),this.ey=u.neo(e,r)):(this.ex=u.zero(),this.ey=u.zero())}return i.prototype.toString=function(){return JSON.stringify(this)},i.isValid=function(t){return t===null||typeof t>"u"?!1:u.isValid(t.ex)&&u.isValid(t.ey)},i.assert=function(t){},i.prototype.set=function(t,e,n,r){typeof t=="number"&&typeof e=="number"&&typeof n=="number"&&typeof r=="number"?(this.ex.setNum(t,n),this.ey.setNum(e,r)):typeof t=="object"&&typeof e=="object"?(this.ex.setVec2(t),this.ey.setVec2(e)):typeof t=="object"&&(this.ex.setVec2(t.ex),this.ey.setVec2(t.ey))},i.prototype.setIdentity=function(){this.ex.x=1,this.ey.x=0,this.ex.y=0,this.ey.y=1},i.prototype.setZero=function(){this.ex.x=0,this.ey.x=0,this.ex.y=0,this.ey.y=0},i.prototype.getInverse=function(){var t=this.ex.x,e=this.ey.x,n=this.ex.y,r=this.ey.y,s=t*r-e*n;s!==0&&(s=1/s);var o=new i;return o.ex.x=s*r,o.ey.x=-s*e,o.ex.y=-s*n,o.ey.y=s*t,o},i.prototype.solve=function(t){var e=this.ex.x,n=this.ey.x,r=this.ex.y,s=this.ey.y,o=e*s-n*r;o!==0&&(o=1/o);var a=u.zero();return a.x=o*(s*t.x-n*t.y),a.y=o*(e*t.y-r*t.x),a},i.mul=function(t,e){if(e&&"x"in e&&"y"in e){var n=t.ex.x*e.x+t.ey.x*e.y,r=t.ex.y*e.x+t.ey.y*e.y;return u.neo(n,r)}else if(e&&"ex"in e&&"ey"in e){var s=t.ex.x*e.ex.x+t.ey.x*e.ex.y,o=t.ex.x*e.ey.x+t.ey.x*e.ey.y,a=t.ex.y*e.ex.x+t.ey.y*e.ex.y,l=t.ex.y*e.ey.x+t.ey.y*e.ey.y;return new i(s,o,a,l)}},i.mulVec2=function(t,e){var n=t.ex.x*e.x+t.ey.x*e.y,r=t.ex.y*e.x+t.ey.y*e.y;return u.neo(n,r)},i.mulMat22=function(t,e){var n=t.ex.x*e.ex.x+t.ey.x*e.ex.y,r=t.ex.x*e.ey.x+t.ey.x*e.ey.y,s=t.ex.y*e.ex.x+t.ey.y*e.ex.y,o=t.ex.y*e.ey.x+t.ey.y*e.ey.y;return new i(n,r,s,o)},i.mulT=function(t,e){if(e&&"x"in e&&"y"in e)return u.neo(u.dot(e,t.ex),u.dot(e,t.ey));if(e&&"ex"in e&&"ey"in e){var n=u.neo(u.dot(t.ex,e.ex),u.dot(t.ey,e.ex)),r=u.neo(u.dot(t.ex,e.ey),u.dot(t.ey,e.ey));return new i(n,r)}},i.mulTVec2=function(t,e){return u.neo(u.dot(e,t.ex),u.dot(e,t.ey))},i.mulTMat22=function(t,e){var n=u.neo(u.dot(t.ex,e.ex),u.dot(t.ey,e.ex)),r=u.neo(u.dot(t.ex,e.ey),u.dot(t.ey,e.ey));return new i(n,r)},i.abs=function(t){return new i(u.abs(t.ex),u.abs(t.ey))},i.add=function(t,e){return new i(u.add(t.ex,e.ex),u.add(t.ey,e.ey))},i})(),fc=Math.sqrt,kr=w(0,0),Mr=w(0,0),Gi=w(0,0),we=w(0,0),Be=w(0,0),Cr=w(0,0),In=w(0,0),Fe=w(0,0),it;(function(i){i[i.e_unset=-1]="e_unset",i[i.e_circles=0]="e_circles",i[i.e_faceA=1]="e_faceA",i[i.e_faceB=2]="e_faceB"})(it||(it={}));var H;(function(i){i[i.e_unset=-1]="e_unset",i[i.e_vertex=0]="e_vertex",i[i.e_face=1]="e_face"})(H||(H={}));var oi;(function(i){i[i.nullState=0]="nullState",i[i.addState=1]="addState",i[i.persistState=2]="persistState",i[i.removeState=3]="removeState"})(oi||(oi={}));var Nt=(function(){function i(){this.v=w(0,0),this.id=new Oa}return i.prototype.set=function(t){g(this.v,t.v),this.id.set(t.id)},i.prototype.recycle=function(){z(this.v),this.id.recycle()},i})(),Ra=(function(){function i(){this.localNormal=w(0,0),this.localPoint=w(0,0),this.points=[new co,new co],this.pointCount=0}return i.prototype.set=function(t){this.type=t.type,g(this.localNormal,t.localNormal),g(this.localPoint,t.localPoint),this.pointCount=t.pointCount,this.points[0].set(t.points[0]),this.points[1].set(t.points[1])},i.prototype.recycle=function(){this.type=it.e_unset,z(this.localNormal),z(this.localPoint),this.pointCount=0,this.points[0].recycle(),this.points[1].recycle()},i.prototype.getWorldManifold=function(t,e,n,r,s){if(this.pointCount==0)return t;t=t||new Ua,t.pointCount=this.pointCount;var o=t.normal,a=t.points,l=t.separations;switch(this.type){case it.e_circles:{vt(o,1,0);var h=this.points[0];D(kr,e,this.localPoint),D(Mr,r,h.localPoint),N(Cr,Mr,kr);var _=li(Cr);if(_>Mt*Mt){var p=fc(_);F(o,1/p,Cr)}Q(we,1,kr,n,o),Q(Be,1,Mr,-s,o),Q(a[0],.5,we,.5,Be),l[0]=V(N(Gi,Be,we),o);break}case it.e_faceA:{Xt(o,e.q,this.localNormal),D(In,e,this.localPoint);for(var c=0;c<this.pointCount;++c){var h=this.points[c];D(Fe,r,h.localPoint),Q(we,1,Fe,n-V(N(Gi,Fe,In),o),o),Q(Be,1,Fe,-s,o),Q(a[c],.5,we,.5,Be),l[c]=V(N(Gi,Be,we),o)}break}case it.e_faceB:{Xt(o,r.q,this.localNormal),D(In,r,this.localPoint);for(var c=0;c<this.pointCount;++c){var h=this.points[c];D(Fe,e,h.localPoint),Q(Be,1,Fe,s-V(N(Gi,Fe,In),o),o),Q(we,1,Fe,-n,o),Q(a[c],.5,we,.5,Be),l[c]=V(N(Gi,we,Be),o)}ln(o);break}}return t},i.clipSegmentToLine=cn,i.ClipVertex=Nt,i.getPointStates=vc,i.PointState=oi,i})(),co=(function(){function i(){this.localPoint=w(0,0),this.normalImpulse=0,this.tangentImpulse=0,this.id=new Oa}return i.prototype.set=function(t){g(this.localPoint,t.localPoint),this.normalImpulse=t.normalImpulse,this.tangentImpulse=t.tangentImpulse,this.id.set(t.id)},i.prototype.recycle=function(){z(this.localPoint),this.normalImpulse=0,this.tangentImpulse=0,this.id.recycle()},i})(),Oa=(function(){function i(){this.key=-1,this.indexA=-1,this.indexB=-1,this.typeA=H.e_unset,this.typeB=H.e_unset}return i.prototype.setFeatures=function(t,e,n,r){this.indexA=t,this.indexB=n,this.typeA=e,this.typeB=r,this.key=this.indexA+this.indexB*4+this.typeA*16+this.typeB*64},i.prototype.set=function(t){this.indexA=t.indexA,this.indexB=t.indexB,this.typeA=t.typeA,this.typeB=t.typeB,this.key=this.indexA+this.indexB*4+this.typeA*16+this.typeB*64},i.prototype.swapFeatures=function(){var t=this.indexA,e=this.indexB,n=this.typeA,r=this.typeB;this.indexA=e,this.indexB=t,this.typeA=r,this.typeB=n,this.key=this.indexA+this.indexB*4+this.typeA*16+this.typeB*64},i.prototype.recycle=function(){this.indexA=0,this.indexB=0,this.typeA=H.e_unset,this.typeB=H.e_unset,this.key=-1},i})(),Ua=(function(){function i(){this.normal=w(0,0),this.points=[w(0,0),w(0,0)],this.separations=[0,0],this.pointCount=0}return i.prototype.recycle=function(){z(this.normal),z(this.points[0]),z(this.points[1]),this.separations[0]=0,this.separations[1]=0,this.pointCount=0},i})();function vc(i,t,e,n){for(var r=0;r<e.pointCount;++r){var s=e.points[r].id;i[r]=oi.removeState;for(var o=0;o<n.pointCount;++o)if(n.points[o].id.key===s.key){i[r]=oi.persistState;break}}for(var r=0;r<n.pointCount;++r){var s=n.points[r].id;t[r]=oi.addState;for(var o=0;o<e.pointCount;++o)if(e.points[o].id.key===s.key){t[r]=oi.persistState;break}}}function cn(i,t,e,n,r){var s=0,o=V(e,t[0].v)-n,a=V(e,t[1].v)-n;if(o<=0&&i[s++].set(t[0]),a<=0&&i[s++].set(t[1]),o*a<0){var l=o/(o-a);Q(i[s].v,1-l,t[0].v,l,t[1].v),i[s].id.setFeatures(r,H.e_vertex,t[0].id.indexB,H.e_face),++s}return s}var yc=Math.sqrt,xc=Math.max,gc=Math.min,ho=new rn({create:function(){return new ge},release:function(i){i.recycle()}}),bi=new Ra,Pn=new Ua,mo=(function(){function i(t){this.prev=null,this.next=null,this.other=null,this.contact=t}return i.prototype.recycle=function(){this.prev=null,this.next=null,this.other=null},i})();function uo(i,t){return yc(i*t)}function _o(i,t){return i>t?i:t}var We=[],po=(function(){function i(){this.rA=w(0,0),this.rB=w(0,0),this.normalImpulse=0,this.tangentImpulse=0,this.normalMass=0,this.tangentMass=0,this.velocityBias=0}return i.prototype.recycle=function(){z(this.rA),z(this.rB),this.normalImpulse=0,this.tangentImpulse=0,this.normalMass=0,this.tangentMass=0,this.velocityBias=0},i})(),ke=w(0,0),rt=w(0,0),Me=w(0,0),st=w(0,0),qe=w(0,0),Ke=pi(0,0,0),Xe=pi(0,0,0),Ln=w(0,0),Tn=w(0,0),Ai=w(0,0),zn=w(0,0),Vr=w(0,0),Sr=w(0,0),at=w(0,0),W=w(0,0),Hi=w(0,0),Ht=w(0,0),wi=w(0,0),Bi=w(0,0),Ft=w(0,0),Ce=w(0,0),X=w(0,0),jt=w(0,0),lt=w(0,0),ct=w(0,0),ue=w(0,0),ge=(function(){function i(){this.m_nodeA=new mo(this),this.m_nodeB=new mo(this),this.m_fixtureA=null,this.m_fixtureB=null,this.m_indexA=-1,this.m_indexB=-1,this.m_evaluateFcn=null,this.m_manifold=new Ra,this.m_prev=null,this.m_next=null,this.m_toi=1,this.m_toiCount=0,this.m_toiFlag=!1,this.m_friction=0,this.m_restitution=0,this.m_tangentSpeed=0,this.m_enabledFlag=!0,this.m_islandFlag=!1,this.m_touchingFlag=!1,this.m_filterFlag=!1,this.m_bulletHitFlag=!1,this.m_impulse=new dc(this),this.v_points=[new po,new po],this.v_normal=w(0,0),this.v_normalMass=new ae,this.v_K=new ae,this.v_pointCount=0,this.v_tangentSpeed=0,this.v_friction=0,this.v_restitution=0,this.v_invMassA=0,this.v_invMassB=0,this.v_invIA=0,this.v_invIB=0,this.p_localPoints=[w(0,0),w(0,0)],this.p_localNormal=w(0,0),this.p_localPoint=w(0,0),this.p_localCenterA=w(0,0),this.p_localCenterB=w(0,0),this.p_type=it.e_unset,this.p_radiusA=0,this.p_radiusB=0,this.p_pointCount=0,this.p_invMassA=0,this.p_invMassB=0,this.p_invIA=0,this.p_invIB=0}return i.prototype.initialize=function(t,e,n,r,s){this.m_fixtureA=t,this.m_fixtureB=n,this.m_indexA=e,this.m_indexB=r,this.m_evaluateFcn=s,this.m_friction=uo(this.m_fixtureA.m_friction,this.m_fixtureB.m_friction),this.m_restitution=_o(this.m_fixtureA.m_restitution,this.m_fixtureB.m_restitution)},i.prototype.recycle=function(){this.m_nodeA.recycle(),this.m_nodeB.recycle(),this.m_fixtureA=null,this.m_fixtureB=null,this.m_indexA=-1,this.m_indexB=-1,this.m_evaluateFcn=null,this.m_manifold.recycle(),this.m_prev=null,this.m_next=null,this.m_toi=1,this.m_toiCount=0,this.m_toiFlag=!1,this.m_friction=0,this.m_restitution=0,this.m_tangentSpeed=0,this.m_enabledFlag=!0,this.m_islandFlag=!1,this.m_touchingFlag=!1,this.m_filterFlag=!1,this.m_bulletHitFlag=!1,this.m_impulse.recycle();for(var t=0,e=this.v_points;t<e.length;t++){var n=e[t];n.recycle()}z(this.v_normal),this.v_normalMass.setZero(),this.v_K.setZero(),this.v_pointCount=0,this.v_tangentSpeed=0,this.v_friction=0,this.v_restitution=0,this.v_invMassA=0,this.v_invMassB=0,this.v_invIA=0,this.v_invIB=0;for(var r=0,s=this.p_localPoints;r<s.length;r++){var o=s[r];z(o)}z(this.p_localNormal),z(this.p_localPoint),z(this.p_localCenterA),z(this.p_localCenterB),this.p_type=it.e_unset,this.p_radiusA=0,this.p_radiusB=0,this.p_pointCount=0,this.p_invMassA=0,this.p_invMassB=0,this.p_invIA=0,this.p_invIB=0},i.prototype.initConstraint=function(t){var e=this.m_fixtureA,n=this.m_fixtureB;if(!(e===null||n===null)){var r=e.m_body,s=n.m_body;if(!(r===null||s===null)){var o=e.m_shape,a=n.m_shape;if(!(o===null||a===null)){var l=this.m_manifold,h=l.pointCount;this.v_invMassA=r.m_invMass,this.v_invMassB=s.m_invMass,this.v_invIA=r.m_invI,this.v_invIB=s.m_invI,this.v_friction=this.m_friction,this.v_restitution=this.m_restitution,this.v_tangentSpeed=this.m_tangentSpeed,this.v_pointCount=h,this.v_K.setZero(),this.v_normalMass.setZero(),this.p_invMassA=r.m_invMass,this.p_invMassB=s.m_invMass,this.p_invIA=r.m_invI,this.p_invIB=s.m_invI,g(this.p_localCenterA,r.m_sweep.localCenter),g(this.p_localCenterB,s.m_sweep.localCenter),this.p_radiusA=o.m_radius,this.p_radiusB=a.m_radius,this.p_type=l.type,g(this.p_localNormal,l.localNormal),g(this.p_localPoint,l.localPoint),this.p_pointCount=h;for(var _=0;_<P.maxManifoldPoints;++_)this.v_points[_].recycle(),z(this.p_localPoints[_]);for(var _=0;_<h;++_){var p=l.points[_],c=this.v_points[_];t.warmStarting&&(c.normalImpulse=t.dtRatio*p.normalImpulse,c.tangentImpulse=t.dtRatio*p.tangentImpulse),g(this.p_localPoints[_],p.localPoint)}}}}},i.prototype.getManifold=function(){return this.m_manifold},i.prototype.getWorldManifold=function(t){var e=this.m_fixtureA,n=this.m_fixtureB;if(!(e===null||n===null)){var r=e.m_body,s=n.m_body;if(!(r===null||s===null)){var o=e.m_shape,a=n.m_shape;if(!(o===null||a===null))return this.m_manifold.getWorldManifold(t,r.getTransform(),o.m_radius,s.getTransform(),a.m_radius)}}},i.prototype.setEnabled=function(t){this.m_enabledFlag=!!t},i.prototype.isEnabled=function(){return this.m_enabledFlag},i.prototype.isTouching=function(){return this.m_touchingFlag},i.prototype.getNext=function(){return this.m_next},i.prototype.getFixtureA=function(){return this.m_fixtureA},i.prototype.getFixtureB=function(){return this.m_fixtureB},i.prototype.getChildIndexA=function(){return this.m_indexA},i.prototype.getChildIndexB=function(){return this.m_indexB},i.prototype.flagForFiltering=function(){this.m_filterFlag=!0},i.prototype.setFriction=function(t){this.m_friction=t},i.prototype.getFriction=function(){return this.m_friction},i.prototype.resetFriction=function(){var t=this.m_fixtureA,e=this.m_fixtureB;t===null||e===null||(this.m_friction=uo(t.m_friction,e.m_friction))},i.prototype.setRestitution=function(t){this.m_restitution=t},i.prototype.getRestitution=function(){return this.m_restitution},i.prototype.resetRestitution=function(){var t=this.m_fixtureA,e=this.m_fixtureB;t===null||e===null||(this.m_restitution=_o(t.m_restitution,e.m_restitution))},i.prototype.setTangentSpeed=function(t){this.m_tangentSpeed=t},i.prototype.getTangentSpeed=function(){return this.m_tangentSpeed},i.prototype.evaluate=function(t,e,n){var r=this.m_fixtureA,s=this.m_fixtureB;r===null||s===null||this.m_evaluateFcn(t,e,r,this.m_indexA,n,s,this.m_indexB)},i.prototype.update=function(t){var e=this.m_fixtureA,n=this.m_fixtureB;if(!(e===null||n===null)){var r=e.m_body,s=n.m_body;if(!(r===null||s===null)){var o=e.m_shape,a=n.m_shape;if(!(o===null||a===null)){this.m_enabledFlag=!0;var l=!1,h=this.m_touchingFlag,_=e.m_isSensor,p=n.m_isSensor,c=_||p,m=r.m_xf,f=s.m_xf;if(c)l=qa(o,this.m_indexA,a,this.m_indexB,m,f),this.m_manifold.pointCount=0;else{bi.recycle(),bi.set(this.m_manifold),this.m_manifold.recycle(),this.evaluate(this.m_manifold,m,f),l=this.m_manifold.pointCount>0;for(var d=0;d<this.m_manifold.pointCount;++d){var v=this.m_manifold.points[d];v.normalImpulse=0,v.tangentImpulse=0;for(var y=0;y<bi.pointCount;++y){var x=bi.points[y];if(x.id.key===v.id.key){v.normalImpulse=x.normalImpulse,v.tangentImpulse=x.tangentImpulse;break}}}l!==h&&(r.setAwake(!0),s.setAwake(!0))}this.m_touchingFlag=l;var b=typeof t=="object"&&t!==null;!h&&l&&b&&t.beginContact(this),h&&!l&&b&&t.endContact(this),!c&&l&&b&&bi&&t.preSolve(this,bi)}}}},i.prototype.solvePositionConstraint=function(t){return this._solvePositionConstraint(t,null,null)},i.prototype.solvePositionConstraintTOI=function(t,e,n){return this._solvePositionConstraint(t,e,n)},i.prototype._solvePositionConstraint=function(t,e,n){var r=e!==null&&n!==null,s=0,o=this.m_fixtureA,a=this.m_fixtureB;if(o===null||a===null)return s;var l=o.m_body,h=a.m_body;if(l===null||h===null)return s;var _=l.c_position,p=h.c_position,c=this.p_localCenterA,m=this.p_localCenterB,f=0,d=0;(!r||l===e||l===n)&&(f=this.p_invMassA,d=this.p_invIA);var v=0,y=0;(!r||h===e||h===n)&&(v=this.p_invMassB,y=this.p_invIB),g(ke,_.c);var x=_.a;g(Me,p.c);for(var b=p.a,B=0;B<this.p_pointCount;++B){dn(Ke,c,ke,x),dn(Xe,m,Me,b);var A=void 0;switch(this.p_type){case it.e_circles:{D(Ln,Ke,this.p_localPoint),D(Tn,Xe,this.p_localPoints[0]),N(W,Tn,Ln),se(W),Q(Hi,.5,Ln,.5,Tn),A=V(Tn,W)-V(Ln,W)-this.p_radiusA-this.p_radiusB;break}case it.e_faceA:{Xt(W,Ke.q,this.p_localNormal),D(zn,Ke,this.p_localPoint),D(Ai,Xe,this.p_localPoints[B]),A=V(Ai,W)-V(zn,W)-this.p_radiusA-this.p_radiusB,g(Hi,Ai);break}case it.e_faceB:{Xt(W,Xe.q,this.p_localNormal),D(zn,Xe,this.p_localPoint),D(Ai,Ke,this.p_localPoints[B]),A=V(Ai,W)-V(zn,W)-this.p_radiusA-this.p_radiusB,g(Hi,Ai),ln(W);break}default:return s}N(Vr,Hi,ke),N(Sr,Hi,Me),s=gc(s,A);var M=r?P.toiBaugarte:P.baumgarte,C=P.linearSlop,I=P.maxLinearCorrection,T=yt(M*(A+C),-I,0),L=U(Vr,W),q=U(Sr,W),$=f+v+d*L*L+y*q*q,j=$>0?-T/$:0;F(at,j,W),tn(ke,f,at),x-=d*U(Vr,at),re(Me,v,at),b+=y*U(Sr,at)}return g(_.c,ke),_.a=x,g(p.c,Me),p.a=b,s},i.prototype.initVelocityConstraint=function(t){var e=this.m_fixtureA,n=this.m_fixtureB;if(!(e===null||n===null)){var r=e.m_body,s=n.m_body;if(!(r===null||s===null)){var o=r.c_velocity,a=s.c_velocity,l=r.c_position,h=s.c_position,_=this.p_radiusA,p=this.p_radiusB,c=this.m_manifold,m=this.v_invMassA,f=this.v_invMassB,d=this.v_invIA,v=this.v_invIB,y=this.p_localCenterA,x=this.p_localCenterB;g(ke,l.c);var b=l.a;g(rt,o.v);var B=o.w;g(Me,h.c);var A=h.a;g(st,a.v);var M=a.w;dn(Ke,y,ke,b),dn(Xe,x,Me,A),Pn.recycle(),c.getWorldManifold(Pn,Ke,_,Xe,p),g(this.v_normal,Pn.normal);for(var C=0;C<this.v_pointCount;++C){var I=this.v_points[C],T=Pn.points[C];N(I.rA,T,ke),N(I.rB,T,Me);var L=U(I.rA,this.v_normal),q=U(I.rB,this.v_normal),$=m+f+d*L*L+v*q*q;I.normalMass=$>0?1/$:0,ai(qe,this.v_normal,1);var j=U(I.rA,qe),G=U(I.rB,qe),Lt=m+f+d*j*j+v*G*G;I.tangentMass=Lt>0?1/Lt:0,I.velocityBias=0;var ft=0;ft+=V(this.v_normal,st),ft+=V(this.v_normal,qt(ue,M,I.rB)),ft-=V(this.v_normal,rt),ft-=V(this.v_normal,qt(ue,B,I.rA)),ft<-P.velocityThreshold&&(I.velocityBias=-this.v_restitution*ft)}if(this.v_pointCount==2&&t.blockSolve){var Zt=this.v_points[0],Ct=this.v_points[1],nt=U(Zt.rA,this.v_normal),Ni=U(Zt.rB,this.v_normal),Ot=U(Ct.rA,this.v_normal),ze=U(Ct.rB,this.v_normal),Ge=m+f+d*nt*nt+v*Ni*Ni,Ri=m+f+d*Ot*Ot+v*ze*ze,vi=m+f+d*nt*Ot+v*Ni*ze,_r=1e3;if(Ge*Ge<_r*(Ge*Ri-vi*vi)){this.v_K.ex.setNum(Ge,vi),this.v_K.ey.setNum(vi,Ri);var gs=this.v_K.ex.x,bs=this.v_K.ey.x,As=this.v_K.ex.y,ws=this.v_K.ey.y,He=gs*ws-bs*As;He!==0&&(He=1/He),this.v_normalMass.ex.x=He*ws,this.v_normalMass.ey.x=-He*bs,this.v_normalMass.ex.y=-He*As,this.v_normalMass.ey.y=He*gs}else this.v_pointCount=1}g(l.c,ke),l.a=b,g(o.v,rt),o.w=B,g(h.c,Me),h.a=A,g(a.v,st),a.w=M}}},i.prototype.warmStartConstraint=function(t){var e=this.m_fixtureA,n=this.m_fixtureB;if(!(e===null||n===null)){var r=e.m_body,s=n.m_body;if(!(r===null||s===null)){var o=r.c_velocity,a=s.c_velocity,l=this.v_invMassA,h=this.v_invIA,_=this.v_invMassB,p=this.v_invIB;g(rt,o.v);var c=o.w;g(st,a.v);var m=a.w;g(W,this.v_normal),ai(qe,W,1);for(var f=0;f<this.v_pointCount;++f){var d=this.v_points[f];Q(at,d.normalImpulse,W,d.tangentImpulse,qe),c-=h*U(d.rA,at),tn(rt,l,at),m+=p*U(d.rB,at),re(st,_,at)}g(o.v,rt),o.w=c,g(a.v,st),a.w=m}}},i.prototype.storeConstraintImpulses=function(t){for(var e=this.m_manifold,n=0;n<this.v_pointCount;++n)e.points[n].normalImpulse=this.v_points[n].normalImpulse,e.points[n].tangentImpulse=this.v_points[n].tangentImpulse},i.prototype.solveVelocityConstraint=function(t){var e=this.m_fixtureA,n=this.m_fixtureB;if(!(e===null||n===null)){var r=e.m_body,s=n.m_body;if(!(r===null||s===null)){var o=r.c_velocity,a=s.c_velocity,l=this.v_invMassA,h=this.v_invIA,_=this.v_invMassB,p=this.v_invIB;g(rt,o.v);var c=o.w;g(st,a.v);var m=a.w;g(W,this.v_normal),ai(qe,W,1);for(var f=this.v_friction,d=0;d<this.v_pointCount;++d){var v=this.v_points[d];z(Ht),Wt(Ht,st),Wt(Ht,qt(ue,m,v.rB)),Se(Ht,rt),Se(Ht,qt(ue,c,v.rA));var y=V(Ht,qe)-this.v_tangentSpeed,x=v.tangentMass*-y,b=f*v.normalImpulse,B=yt(v.tangentImpulse+x,-b,b);x=B-v.tangentImpulse,v.tangentImpulse=B,F(at,x,qe),tn(rt,l,at),c-=h*U(v.rA,at),re(st,_,at),m+=p*U(v.rB,at)}if(this.v_pointCount==1||t.blockSolve==!1)for(var A=0;A<this.v_pointCount;++A){var v=this.v_points[A];z(Ht),Wt(Ht,st),Wt(Ht,qt(ue,m,v.rB)),Se(Ht,rt),Se(Ht,qt(ue,c,v.rA));var M=V(Ht,W),x=-v.normalMass*(M-v.velocityBias),B=xc(v.normalImpulse+x,0);x=B-v.normalImpulse,v.normalImpulse=B,F(at,x,W),tn(rt,l,at),c-=h*U(v.rA,at),re(st,_,at),m+=p*U(v.rB,at)}else{var C=this.v_points[0],I=this.v_points[1];vt(Ce,C.normalImpulse,I.normalImpulse),z(wi),Wt(wi,st),Wt(wi,qt(ue,m,C.rB)),Se(wi,rt),Se(wi,qt(ue,c,C.rA)),z(Bi),Wt(Bi,st),Wt(Bi,qt(ue,m,I.rB)),Se(Bi,rt),Se(Bi,qt(ue,c,I.rA));var T=V(wi,W),L=V(Bi,W);for(vt(Ft,T-C.velocityBias,L-I.velocityBias),Ft.x-=this.v_K.ex.x*Ce.x+this.v_K.ey.x*Ce.y,Ft.y-=this.v_K.ex.y*Ce.x+this.v_K.ey.y*Ce.y;;){if(z(X),X.x=-(this.v_normalMass.ex.x*Ft.x+this.v_normalMass.ey.x*Ft.y),X.y=-(this.v_normalMass.ex.y*Ft.x+this.v_normalMass.ey.y*Ft.y),X.x>=0&&X.y>=0){N(jt,X,Ce),F(lt,jt.x,W),F(ct,jt.y,W),fe(rt,-l,lt,-l,ct,1,rt),c-=h*(U(C.rA,lt)+U(I.rA,ct)),fe(st,_,lt,_,ct,1,st),m+=p*(U(C.rB,lt)+U(I.rB,ct)),C.normalImpulse=X.x,I.normalImpulse=X.y;break}if(X.x=-C.normalMass*Ft.x,X.y=0,T=0,L=this.v_K.ex.y*X.x+Ft.y,X.x>=0&&L>=0){N(jt,X,Ce),F(lt,jt.x,W),F(ct,jt.y,W),fe(rt,-l,lt,-l,ct,1,rt),c-=h*(U(C.rA,lt)+U(I.rA,ct)),fe(st,_,lt,_,ct,1,st),m+=p*(U(C.rB,lt)+U(I.rB,ct)),C.normalImpulse=X.x,I.normalImpulse=X.y;break}if(X.x=0,X.y=-I.normalMass*Ft.y,T=this.v_K.ey.x*X.y+Ft.x,L=0,X.y>=0&&T>=0){N(jt,X,Ce),F(lt,jt.x,W),F(ct,jt.y,W),fe(rt,-l,lt,-l,ct,1,rt),c-=h*(U(C.rA,lt)+U(I.rA,ct)),fe(st,_,lt,_,ct,1,st),m+=p*(U(C.rB,lt)+U(I.rB,ct)),C.normalImpulse=X.x,I.normalImpulse=X.y;break}if(X.x=0,X.y=0,T=Ft.x,L=Ft.y,T>=0&&L>=0){N(jt,X,Ce),F(lt,jt.x,W),F(ct,jt.y,W),fe(rt,-l,lt,-l,ct,1,rt),c-=h*(U(C.rA,lt)+U(I.rA,ct)),fe(st,_,lt,_,ct,1,st),m+=p*(U(C.rB,lt)+U(I.rB,ct)),C.normalImpulse=X.x,I.normalImpulse=X.y;break}break}}g(o.v,rt),o.w=c,g(a.v,st),a.w=m}}},i.addType=function(t,e,n){We[t]=We[t]||{},We[t][e]=n},i.create=function(t,e,n,r){var s=t.m_shape.m_type,o=n.m_shape.m_type,a=ho.allocate(),l;if(l=We[s]&&We[s][o])a.initialize(t,e,n,r,l);else if(l=We[o]&&We[o][s])a.initialize(n,r,t,e,l);else return null;t=a.m_fixtureA,n=a.m_fixtureB,e=a.getChildIndexA(),r=a.getChildIndexB();var h=t.m_body,_=n.m_body;return a.m_nodeA.contact=a,a.m_nodeA.other=_,a.m_nodeA.prev=null,a.m_nodeA.next=h.m_contactList,h.m_contactList!=null&&(h.m_contactList.prev=a.m_nodeA),h.m_contactList=a.m_nodeA,a.m_nodeB.contact=a,a.m_nodeB.other=h,a.m_nodeB.prev=null,a.m_nodeB.next=_.m_contactList,_.m_contactList!=null&&(_.m_contactList.prev=a.m_nodeB),_.m_contactList=a.m_nodeB,t.isSensor()==!1&&n.isSensor()==!1&&(h.setAwake(!0),_.setAwake(!0)),a},i.destroy=function(t,e){var n=t.m_fixtureA,r=t.m_fixtureB;if(!(n===null||r===null)){var s=n.m_body,o=r.m_body;s===null||o===null||(t.isTouching()&&e.endContact(t),t.m_nodeA.prev&&(t.m_nodeA.prev.next=t.m_nodeA.next),t.m_nodeA.next&&(t.m_nodeA.next.prev=t.m_nodeA.prev),t.m_nodeA==s.m_contactList&&(s.m_contactList=t.m_nodeA.next),t.m_nodeB.prev&&(t.m_nodeB.prev.next=t.m_nodeB.next),t.m_nodeB.next&&(t.m_nodeB.next.prev=t.m_nodeB.prev),t.m_nodeB==o.m_contactList&&(o.m_contactList=t.m_nodeB.next),t.m_manifold.pointCount>0&&!n.m_isSensor&&!r.m_isSensor&&(s.setAwake(!0),o.setAwake(!0)),ho.release(t))}},i})(),bc={gravity:u.zero(),allowSleep:!0,warmStarting:!0,continuousPhysics:!0,subStepping:!1,blockSolve:!0,velocityIterations:8,positionIterations:3},mn=(function(){function i(t){if(!(this instanceof i))return new i(t);this.s_step=new ds,t?u.isValid(t)&&(t={gravity:t}):t={},t=Rt(t,bc),this.m_solver=new Na(this),this.m_broadPhase=new Wl,this.m_contactList=null,this.m_contactCount=0,this.m_bodyList=null,this.m_bodyCount=0,this.m_jointList=null,this.m_jointCount=0,this.m_stepComplete=!0,this.m_allowSleep=t.allowSleep,this.m_gravity=u.clone(t.gravity),this.m_clearForces=!0,this.m_newFixture=!1,this.m_locked=!1,this.m_warmStarting=t.warmStarting,this.m_continuousPhysics=t.continuousPhysics,this.m_subStepping=t.subStepping,this.m_blockSolve=t.blockSolve,this.m_velocityIterations=t.velocityIterations,this.m_positionIterations=t.positionIterations,this.m_t=0,this.m_step_callback=[]}return i.prototype._serialize=function(){for(var t=[],e=[],n=this.getBodyList();n;n=n.getNext())t.push(n);for(var r=this.getJointList();r;r=r.getNext())typeof r._serialize=="function"&&e.push(r);return{gravity:this.m_gravity,bodies:t,joints:e}},i._deserialize=function(t,e,n){if(!t)return new i;var r=new i(t.gravity);if(t.bodies)for(var s=t.bodies.length-1;s>=0;s-=1)r._addBody(n(Y,t.bodies[s],r));if(t.joints)for(var s=t.joints.length-1;s>=0;s--)r.createJoint(n(bt,t.joints[s],r));return r},i.prototype.getBodyList=function(){return this.m_bodyList},i.prototype.getJointList=function(){return this.m_jointList},i.prototype.getContactList=function(){return this.m_contactList},i.prototype.getBodyCount=function(){return this.m_bodyCount},i.prototype.getJointCount=function(){return this.m_jointCount},i.prototype.getContactCount=function(){return this.m_contactCount},i.prototype.setGravity=function(t){this.m_gravity.set(t)},i.prototype.getGravity=function(){return this.m_gravity},i.prototype.isLocked=function(){return this.m_locked},i.prototype.setAllowSleeping=function(t){if(t!=this.m_allowSleep&&(this.m_allowSleep=t,this.m_allowSleep==!1))for(var e=this.m_bodyList;e;e=e.m_next)e.setAwake(!0)},i.prototype.getAllowSleeping=function(){return this.m_allowSleep},i.prototype.setWarmStarting=function(t){this.m_warmStarting=t},i.prototype.getWarmStarting=function(){return this.m_warmStarting},i.prototype.setContinuousPhysics=function(t){this.m_continuousPhysics=t},i.prototype.getContinuousPhysics=function(){return this.m_continuousPhysics},i.prototype.setSubStepping=function(t){this.m_subStepping=t},i.prototype.getSubStepping=function(){return this.m_subStepping},i.prototype.setAutoClearForces=function(t){this.m_clearForces=t},i.prototype.getAutoClearForces=function(){return this.m_clearForces},i.prototype.clearForces=function(){for(var t=this.m_bodyList;t;t=t.getNext())t.m_force.setZero(),t.m_torque=0},i.prototype.queryAABB=function(t,e){var n=this.m_broadPhase;this.m_broadPhase.query(t,function(r){var s=n.getUserData(r);return e(s.fixture)})},i.prototype.rayCast=function(t,e,n){var r=this.m_broadPhase;this.m_broadPhase.rayCast({maxFraction:1,p1:t,p2:e},function(s,o){var a=r.getUserData(o),l=a.fixture,h=a.childIndex,_={},p=l.rayCast(_,s,h);if(p){var c=_.fraction,m=u.add(u.mulNumVec2(1-c,s.p1),u.mulNumVec2(c,s.p2));return n(l,m,_.normal,c)}return s.maxFraction})},i.prototype.getProxyCount=function(){return this.m_broadPhase.getProxyCount()},i.prototype.getTreeHeight=function(){return this.m_broadPhase.getTreeHeight()},i.prototype.getTreeBalance=function(){return this.m_broadPhase.getTreeBalance()},i.prototype.getTreeQuality=function(){return this.m_broadPhase.getTreeQuality()},i.prototype.shiftOrigin=function(t){if(!this.isLocked()){for(var e=this.m_bodyList;e;e=e.m_next)e.m_xf.p.sub(t),e.m_sweep.c0.sub(t),e.m_sweep.c.sub(t);for(var n=this.m_jointList;n;n=n.m_next)n.shiftOrigin(t);this.m_broadPhase.shiftOrigin(t)}},i.prototype._addBody=function(t){this.isLocked()||(t.m_prev=null,t.m_next=this.m_bodyList,this.m_bodyList&&(this.m_bodyList.m_prev=t),this.m_bodyList=t,++this.m_bodyCount)},i.prototype.createBody=function(t,e){if(this.isLocked())return null;var n={};t&&(u.isValid(t)?n={position:t,angle:e}:typeof t=="object"&&(n=t));var r=new Y(this,n);return this._addBody(r),r},i.prototype.createDynamicBody=function(t,e){var n={};return t&&(u.isValid(t)?n={position:t,angle:e}:typeof t=="object"&&(n=t)),n.type="dynamic",this.createBody(n)},i.prototype.createKinematicBody=function(t,e){var n={};return t&&(u.isValid(t)?n={position:t,angle:e}:typeof t=="object"&&(n=t)),n.type="kinematic",this.createBody(n)},i.prototype.destroyBody=function(t){if(!this.isLocked()){if(t.m_destroyed)return!1;for(var e=t.m_jointList;e;){var n=e;e=e.next,this.publish("remove-joint",n.joint),this.destroyJoint(n.joint),t.m_jointList=e}t.m_jointList=null;for(var r=t.m_contactList;r;){var s=r;r=r.next,this.destroyContact(s.contact),t.m_contactList=r}t.m_contactList=null;for(var o=t.m_fixtureList;o;){var a=o;o=o.m_next,this.publish("remove-fixture",a),a.destroyProxies(this.m_broadPhase),t.m_fixtureList=o}return t.m_fixtureList=null,t.m_prev&&(t.m_prev.m_next=t.m_next),t.m_next&&(t.m_next.m_prev=t.m_prev),t==this.m_bodyList&&(this.m_bodyList=t.m_next),t.m_destroyed=!0,--this.m_bodyCount,this.publish("remove-body",t),!0}},i.prototype.createJoint=function(t){if(this.isLocked())return null;if(t.m_prev=null,t.m_next=this.m_jointList,this.m_jointList&&(this.m_jointList.m_prev=t),this.m_jointList=t,++this.m_jointCount,t.m_edgeA.joint=t,t.m_edgeA.other=t.m_bodyB,t.m_edgeA.prev=null,t.m_edgeA.next=t.m_bodyA.m_jointList,t.m_bodyA.m_jointList&&(t.m_bodyA.m_jointList.prev=t.m_edgeA),t.m_bodyA.m_jointList=t.m_edgeA,t.m_edgeB.joint=t,t.m_edgeB.other=t.m_bodyA,t.m_edgeB.prev=null,t.m_edgeB.next=t.m_bodyB.m_jointList,t.m_bodyB.m_jointList&&(t.m_bodyB.m_jointList.prev=t.m_edgeB),t.m_bodyB.m_jointList=t.m_edgeB,t.m_collideConnected==!1)for(var e=t.m_bodyB.getContactList();e;e=e.next)e.other==t.m_bodyA&&e.contact.flagForFiltering();return t},i.prototype.destroyJoint=function(t){if(!this.isLocked()){t.m_prev&&(t.m_prev.m_next=t.m_next),t.m_next&&(t.m_next.m_prev=t.m_prev),t==this.m_jointList&&(this.m_jointList=t.m_next);var e=t.m_bodyA,n=t.m_bodyB;if(e.setAwake(!0),n.setAwake(!0),t.m_edgeA.prev&&(t.m_edgeA.prev.next=t.m_edgeA.next),t.m_edgeA.next&&(t.m_edgeA.next.prev=t.m_edgeA.prev),t.m_edgeA==e.m_jointList&&(e.m_jointList=t.m_edgeA.next),t.m_edgeA.prev=null,t.m_edgeA.next=null,t.m_edgeB.prev&&(t.m_edgeB.prev.next=t.m_edgeB.next),t.m_edgeB.next&&(t.m_edgeB.next.prev=t.m_edgeB.prev),t.m_edgeB==n.m_jointList&&(n.m_jointList=t.m_edgeB.next),t.m_edgeB.prev=null,t.m_edgeB.next=null,--this.m_jointCount,t.m_collideConnected==!1)for(var r=n.getContactList();r;)r.other==e&&r.contact.flagForFiltering(),r=r.next;this.publish("remove-joint",t)}},i.prototype.step=function(t,e,n){if(this.publish("pre-step",t),(e|0)!==e&&(e=0),e=e||this.m_velocityIterations,n=n||this.m_positionIterations,this.m_newFixture&&(this.findNewContacts(),this.m_newFixture=!1),this.m_locked=!0,this.s_step.reset(t),this.s_step.velocityIterations=e,this.s_step.positionIterations=n,this.s_step.warmStarting=this.m_warmStarting,this.s_step.blockSolve=this.m_blockSolve,this.updateContacts(),this.m_stepComplete&&t>0){this.m_solver.solveWorld(this.s_step);for(var r=this.m_bodyList;r;r=r.getNext())r.m_islandFlag!=!1&&(r.isStatic()||r.synchronizeFixtures());this.findNewContacts()}this.m_continuousPhysics&&t>0&&this.m_solver.solveWorldTOI(this.s_step),this.m_clearForces&&this.clearForces(),this.m_locked=!1;for(var s;s=this.m_step_callback.shift();)s(this);this.publish("post-step",t)},i.prototype.queueUpdate=function(t){this.isLocked()?this.m_step_callback.push(t):t(this)},i.prototype.findNewContacts=function(){var t=this;this.m_broadPhase.updatePairs(function(e,n){return t.createContact(e,n)})},i.prototype.createContact=function(t,e){var n=t.fixture,r=e.fixture,s=t.childIndex,o=e.childIndex,a=n.getBody(),l=r.getBody();if(a!=l){for(var h=l.getContactList();h;){if(h.other==a){var _=h.contact.getFixtureA(),p=h.contact.getFixtureB(),c=h.contact.getChildIndexA(),m=h.contact.getChildIndexB();if(_==n&&p==r&&c==s&&m==o||_==r&&p==n&&c==o&&m==s)return}h=h.next}if(l.shouldCollide(a)!=!1&&r.shouldCollide(n)!=!1){var f=ge.create(n,s,r,o);f!=null&&(f.m_prev=null,this.m_contactList!=null&&(f.m_next=this.m_contactList,this.m_contactList.m_prev=f),this.m_contactList=f,++this.m_contactCount)}}},i.prototype.updateContacts=function(){for(var t,e=this.m_contactList;t=e;){e=t.getNext();var n=t.getFixtureA(),r=t.getFixtureB(),s=t.getChildIndexA(),o=t.getChildIndexB(),a=n.getBody(),l=r.getBody();if(t.m_filterFlag){if(l.shouldCollide(a)==!1){this.destroyContact(t);continue}if(r.shouldCollide(n)==!1){this.destroyContact(t);continue}t.m_filterFlag=!1}var h=a.isAwake()&&!a.isStatic(),_=l.isAwake()&&!l.isStatic();if(!(h==!1&&_==!1)){var p=n.m_proxies[s].proxyId,c=r.m_proxies[o].proxyId,m=this.m_broadPhase.testOverlap(p,c);if(m==!1){this.destroyContact(t);continue}t.update(this)}}},i.prototype.destroyContact=function(t){t.m_prev&&(t.m_prev.m_next=t.m_next),t.m_next&&(t.m_next.m_prev=t.m_prev),t==this.m_contactList&&(this.m_contactList=t.m_next),ge.destroy(t,this),--this.m_contactCount},i.prototype.on=function(t,e){return typeof t!="string"||typeof e!="function"?this:(this._listeners||(this._listeners={}),this._listeners[t]||(this._listeners[t]=[]),this._listeners[t].push(e),this)},i.prototype.off=function(t,e){if(typeof t!="string"||typeof e!="function")return this;var n=this._listeners&&this._listeners[t];if(!n||!n.length)return this;var r=n.indexOf(e);return r>=0&&n.splice(r,1),this},i.prototype.publish=function(t,e,n,r){var s=this._listeners&&this._listeners[t];if(!s||!s.length)return 0;for(var o=0;o<s.length;o++)s[o].call(this,e,n,r);return s.length},i.prototype.beginContact=function(t){this.publish("begin-contact",t)},i.prototype.endContact=function(t){this.publish("end-contact",t)},i.prototype.preSolve=function(t,e){this.publish("pre-solve",t,e)},i.prototype.postSolve=function(t,e){this.publish("post-solve",t,e)},i})(),J=(function(){function i(t,e,n){if(!(this instanceof i))return new i(t,e,n);typeof t>"u"?(this.x=0,this.y=0,this.z=0):typeof t=="object"?(this.x=t.x,this.y=t.y,this.z=t.z):(this.x=t,this.y=e,this.z=n)}return i.prototype._serialize=function(){return{x:this.x,y:this.y,z:this.z}},i._deserialize=function(t){var e=Object.create(i.prototype);return e.x=t.x,e.y=t.y,e.z=t.z,e},i.neo=function(t,e,n){var r=Object.create(i.prototype);return r.x=t,r.y=e,r.z=n,r},i.zero=function(){var t=Object.create(i.prototype);return t.x=0,t.y=0,t.z=0,t},i.clone=function(t){return i.neo(t.x,t.y,t.z)},i.prototype.toString=function(){return JSON.stringify(this)},i.isValid=function(t){return t===null||typeof t>"u"?!1:Number.isFinite(t.x)&&Number.isFinite(t.y)&&Number.isFinite(t.z)},i.assert=function(t){},i.prototype.setZero=function(){return this.x=0,this.y=0,this.z=0,this},i.prototype.set=function(t,e,n){return this.x=t,this.y=e,this.z=n,this},i.prototype.add=function(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this},i.prototype.sub=function(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this},i.prototype.mul=function(t){return this.x*=t,this.y*=t,this.z*=t,this},i.areEqual=function(t,e){return t===e||typeof t=="object"&&t!==null&&typeof e=="object"&&e!==null&&t.x===e.x&&t.y===e.y&&t.z===e.z},i.dot=function(t,e){return t.x*e.x+t.y*e.y+t.z*e.z},i.cross=function(t,e){return new i(t.y*e.z-t.z*e.y,t.z*e.x-t.x*e.z,t.x*e.y-t.y*e.x)},i.add=function(t,e){return new i(t.x+e.x,t.y+e.y,t.z+e.z)},i.sub=function(t,e){return new i(t.x-e.x,t.y-e.y,t.z-e.z)},i.mul=function(t,e){return new i(e*t.x,e*t.y,e*t.z)},i.prototype.neg=function(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this},i.neg=function(t){return new i(-t.x,-t.y,-t.z)},i})(),fo=w(0,0),vo=w(0,0),le=(function(i){wt(t,i);function t(e,n){var r=this;return r instanceof t?(r=i.call(this)||this,r.m_type=t.TYPE,r.m_radius=P.polygonRadius,r.m_vertex1=e?u.clone(e):u.zero(),r.m_vertex2=n?u.clone(n):u.zero(),r.m_vertex0=u.zero(),r.m_vertex3=u.zero(),r.m_hasVertex0=!1,r.m_hasVertex3=!1,r):new t(e,n)}return t.prototype._serialize=function(){return{type:this.m_type,vertex1:this.m_vertex1,vertex2:this.m_vertex2,vertex0:this.m_vertex0,vertex3:this.m_vertex3,hasVertex0:this.m_hasVertex0,hasVertex3:this.m_hasVertex3}},t._deserialize=function(e){var n=new t(e.vertex1,e.vertex2);return n.m_hasVertex0&&n.setPrevVertex(e.vertex0),n.m_hasVertex3&&n.setNextVertex(e.vertex3),n},t.prototype._reset=function(){},t.prototype.getRadius=function(){return this.m_radius},t.prototype.getType=function(){return this.m_type},t.prototype.setNext=function(e){return this.setNextVertex(e)},t.prototype.setNextVertex=function(e){return e?(this.m_vertex3.setVec2(e),this.m_hasVertex3=!0):(this.m_vertex3.setZero(),this.m_hasVertex3=!1),this},t.prototype.getNextVertex=function(){return this.m_vertex3},t.prototype.setPrev=function(e){return this.setPrevVertex(e)},t.prototype.setPrevVertex=function(e){return e?(this.m_vertex0.setVec2(e),this.m_hasVertex0=!0):(this.m_vertex0.setZero(),this.m_hasVertex0=!1),this},t.prototype.getPrevVertex=function(){return this.m_vertex0},t.prototype._set=function(e,n){return this.m_vertex1.setVec2(e),this.m_vertex2.setVec2(n),this.m_hasVertex0=!1,this.m_hasVertex3=!1,this},t.prototype._clone=function(){var e=new t;return e.m_type=this.m_type,e.m_radius=this.m_radius,e.m_vertex1.setVec2(this.m_vertex1),e.m_vertex2.setVec2(this.m_vertex2),e.m_vertex0.setVec2(this.m_vertex0),e.m_vertex3.setVec2(this.m_vertex3),e.m_hasVertex0=this.m_hasVertex0,e.m_hasVertex3=this.m_hasVertex3,e},t.prototype.getChildCount=function(){return 1},t.prototype.testPoint=function(e,n){return!1},t.prototype.rayCast=function(e,n,r,s){var o=k.mulTVec2(r.q,u.sub(n.p1,r.p)),a=k.mulTVec2(r.q,u.sub(n.p2,r.p)),l=u.sub(a,o),h=this.m_vertex1,_=this.m_vertex2,p=u.sub(_,h),c=u.neo(p.y,-p.x);c.normalize();var m=u.dot(c,u.sub(h,o)),f=u.dot(c,l);if(f==0)return!1;var d=m/f;if(d<0||n.maxFraction<d)return!1;var v=u.add(o,u.mulNumVec2(d,l)),y=u.sub(_,h),x=u.dot(y,y);if(x==0)return!1;var b=u.dot(u.sub(v,h),y)/x;return b<0||1<b?!1:(e.fraction=d,m>0?e.normal=k.mulVec2(r.q,c).neg():e.normal=k.mulVec2(r.q,c),!0)},t.prototype.computeAABB=function(e,n,r){D(fo,n,this.m_vertex1),D(vo,n,this.m_vertex2),gt.combinePoints(e,fo,vo),gt.extend(e,this.m_radius)},t.prototype.computeMass=function(e,n){e.mass=0,Q(e.center,.5,this.m_vertex1,.5,this.m_vertex2),e.I=0},t.prototype.computeDistanceProxy=function(e){e.m_vertices[0]=this.m_vertex1,e.m_vertices[1]=this.m_vertex2,e.m_vertices.length=2,e.m_count=2,e.m_radius=this.m_radius},t.TYPE="edge",t})(di),yo=w(0,0),xo=w(0,0),hn=(function(i){wt(t,i);function t(e,n){var r=this;return r instanceof t?(r=i.call(this)||this,r.m_type=t.TYPE,r.m_radius=P.polygonRadius,r.m_vertices=[],r.m_count=0,r.m_prevVertex=null,r.m_nextVertex=null,r.m_hasPrevVertex=!1,r.m_hasNextVertex=!1,r.m_isLoop=!!n,e&&e.length&&(n?r._createLoop(e):r._createChain(e)),r):new t(e,n)}return t.prototype._serialize=function(){var e={type:this.m_type,vertices:this.m_isLoop?this.m_vertices.slice(0,this.m_vertices.length-1):this.m_vertices,isLoop:this.m_isLoop,hasPrevVertex:this.m_hasPrevVertex,hasNextVertex:this.m_hasNextVertex,prevVertex:null,nextVertex:null};return this.m_prevVertex&&(e.prevVertex=this.m_prevVertex),this.m_nextVertex&&(e.nextVertex=this.m_nextVertex),e},t._deserialize=function(e,n,r){var s=[];if(e.vertices)for(var o=0;o<e.vertices.length;o++)s.push(r(u,e.vertices[o]));var a=new t(s,e.isLoop);return e.prevVertex&&a.setPrevVertex(e.prevVertex),e.nextVertex&&a.setNextVertex(e.nextVertex),a},t.prototype.getType=function(){return this.m_type},t.prototype.getRadius=function(){return this.m_radius},t.prototype._createLoop=function(e){if(!(e.length<3)){var n;this.m_vertices=[],this.m_count=e.length+1;for(var n=0;n<e.length;++n)this.m_vertices[n]=u.clone(e[n]);return this.m_vertices[e.length]=u.clone(e[0]),this.m_prevVertex=this.m_vertices[this.m_count-2],this.m_nextVertex=this.m_vertices[1],this.m_hasPrevVertex=!0,this.m_hasNextVertex=!0,this}},t.prototype._createChain=function(e){var n;this.m_vertices=[],this.m_count=e.length;for(var n=0;n<e.length;++n)this.m_vertices[n]=u.clone(e[n]);return this.m_prevVertex=null,this.m_nextVertex=null,this.m_hasPrevVertex=!1,this.m_hasNextVertex=!1,this},t.prototype._reset=function(){this.m_isLoop?this._createLoop(this.m_vertices.slice(0,this.m_vertices.length-1)):this._createChain(this.m_vertices)},t.prototype.setPrevVertex=function(e){this.m_prevVertex=e,this.m_hasPrevVertex=!0},t.prototype.getPrevVertex=function(){return this.m_prevVertex},t.prototype.setNextVertex=function(e){this.m_nextVertex=e,this.m_hasNextVertex=!0},t.prototype.getNextVertex=function(){return this.m_nextVertex},t.prototype._clone=function(){var e=new t;return e._createChain(this.m_vertices),e.m_type=this.m_type,e.m_radius=this.m_radius,e.m_prevVertex=this.m_prevVertex,e.m_nextVertex=this.m_nextVertex,e.m_hasPrevVertex=this.m_hasPrevVertex,e.m_hasNextVertex=this.m_hasNextVertex,e},t.prototype.getChildCount=function(){return this.m_count-1},t.prototype.getChildEdge=function(e,n){e.m_type=le.TYPE,e.m_radius=this.m_radius,e.m_vertex1=this.m_vertices[n],e.m_vertex2=this.m_vertices[n+1],n>0?(e.m_vertex0=this.m_vertices[n-1],e.m_hasVertex0=!0):(e.m_vertex0=this.m_prevVertex,e.m_hasVertex0=this.m_hasPrevVertex),n<this.m_count-2?(e.m_vertex3=this.m_vertices[n+2],e.m_hasVertex3=!0):(e.m_vertex3=this.m_nextVertex,e.m_hasVertex3=this.m_hasNextVertex)},t.prototype.getVertex=function(e){return e<this.m_count?this.m_vertices[e]:this.m_vertices[0]},t.prototype.isLoop=function(){return this.m_isLoop},t.prototype.testPoint=function(e,n){return!1},t.prototype.rayCast=function(e,n,r,s){var o=new le(this.getVertex(s),this.getVertex(s+1));return o.rayCast(e,n,r,0)},t.prototype.computeAABB=function(e,n,r){D(yo,n,this.getVertex(r)),D(xo,n,this.getVertex(r+1)),gt.combinePoints(e,yo,xo)},t.prototype.computeMass=function(e,n){e.mass=0,z(e.center),e.I=0},t.prototype.computeDistanceProxy=function(e,n){e.m_vertices[0]=this.getVertex(n),e.m_vertices[1]=this.getVertex(n+1),e.m_count=2,e.m_radius=this.m_radius},t.TYPE="chain",t})(di),go=Math.max,Ir=Math.min,si=w(0,0),bo=w(0,0),ji=w(0,0),ki=w(0,0),Ze=w(0,0),Ee=w(0,0),ce=(function(i){wt(t,i);function t(e){var n=this;return n instanceof t?(n=i.call(this)||this,n.m_type=t.TYPE,n.m_radius=P.polygonRadius,n.m_centroid=u.zero(),n.m_vertices=[],n.m_normals=[],n.m_count=0,e&&e.length&&n._set(e),n):new t(e)}return t.prototype._serialize=function(){return{type:this.m_type,vertices:this.m_vertices}},t._deserialize=function(e,n,r){var s=[];if(e.vertices)for(var o=0;o<e.vertices.length;o++)s.push(r(u,e.vertices[o]));var a=new t(s);return a},t.prototype.getType=function(){return this.m_type},t.prototype.getRadius=function(){return this.m_radius},t.prototype._clone=function(){var e=new t;e.m_type=this.m_type,e.m_radius=this.m_radius,e.m_count=this.m_count,e.m_centroid.setVec2(this.m_centroid);for(var n=0;n<this.m_count;n++)e.m_vertices.push(this.m_vertices[n].clone());for(var n=0;n<this.m_normals.length;n++)e.m_normals.push(this.m_normals[n].clone());return e},t.prototype.getChildCount=function(){return 1},t.prototype._reset=function(){this._set(this.m_vertices)},t.prototype._set=function(e){if(e.length<3){this._setAsBox(1,1);return}for(var n=Ir(e.length,P.maxPolygonVertices),r=[],s=0;s<n;++s){for(var o=e[s],a=!0,l=0;l<r.length;++l)if(u.distanceSquared(o,r[l])<.25*P.linearSlopSquared){a=!1;break}a&&r.push(u.clone(o))}if(n=r.length,n<3){this._setAsBox(1,1);return}for(var h=0,_=r[0].x,s=1;s<n;++s){var p=r[s].x;(p>_||p===_&&r[s].y<r[h].y)&&(h=s,_=p)}for(var c=[],m=0,f=h;;){c[m]=f;for(var d=0,l=1;l<n;++l){if(d===f){d=l;continue}var v=u.sub(r[d],r[c[m]]),o=u.sub(r[l],r[c[m]]),y=u.crossVec2Vec2(v,o);y<0&&(d=l),y===0&&o.lengthSquared()>v.lengthSquared()&&(d=l)}if(++m,f=d,d===h)break}if(m<3){this._setAsBox(1,1);return}this.m_count=m,this.m_vertices=[];for(var s=0;s<m;++s)this.m_vertices[s]=r[c[s]];for(var s=0;s<m;++s){var x=s,b=s+1<m?s+1:0,B=u.sub(this.m_vertices[b],this.m_vertices[x]);this.m_normals[s]=u.crossVec2Num(B,1),this.m_normals[s].normalize()}this.m_centroid=Ac(this.m_vertices,m)},t.prototype._setAsBox=function(e,n,r,s){if(this.m_vertices[0]=u.neo(e,-n),this.m_vertices[1]=u.neo(e,n),this.m_vertices[2]=u.neo(-e,n),this.m_vertices[3]=u.neo(-e,-n),this.m_normals[0]=u.neo(1,0),this.m_normals[1]=u.neo(0,1),this.m_normals[2]=u.neo(-1,0),this.m_normals[3]=u.neo(0,-1),this.m_count=4,r&&u.isValid(r)){s=s||0,g(this.m_centroid,r);var o=oe.identity();o.p.setVec2(r),o.q.setAngle(s);for(var a=0;a<this.m_count;++a)this.m_vertices[a]=oe.mulVec2(o,this.m_vertices[a]),this.m_normals[a]=k.mulVec2(o.q,this.m_normals[a])}},t.prototype.testPoint=function(e,n){for(var r=hs(si,e,n),s=0;s<this.m_count;++s){var o=V(this.m_normals[s],r)-V(this.m_normals[s],this.m_vertices[s]);if(o>0)return!1}return!0},t.prototype.rayCast=function(e,n,r,s){for(var o=k.mulTVec2(r.q,u.sub(n.p1,r.p)),a=k.mulTVec2(r.q,u.sub(n.p2,r.p)),l=u.sub(a,o),h=0,_=n.maxFraction,p=-1,c=0;c<this.m_count;++c){var m=u.dot(this.m_normals[c],u.sub(this.m_vertices[c],o)),f=u.dot(this.m_normals[c],l);if(f==0){if(m<0)return!1}else f<0&&m<h*f?(h=m/f,p=c):f>0&&m<_*f&&(_=m/f);if(_<h)return!1}return p>=0?(e.fraction=h,e.normal=k.mulVec2(r.q,this.m_normals[p]),!0):!1},t.prototype.computeAABB=function(e,n,r){for(var s=1/0,o=1/0,a=-1/0,l=-1/0,h=0;h<this.m_count;++h){var _=D(si,n,this.m_vertices[h]);s=Ir(s,_.x),a=go(a,_.x),o=Ir(o,_.y),l=go(l,_.y)}vt(e.lowerBound,s-this.m_radius,o-this.m_radius),vt(e.upperBound,a+this.m_radius,l+this.m_radius)},t.prototype.computeMass=function(e,n){z(Ze);var r=0,s=0;z(Ee);for(var o=0;o<this.m_count;++o)Wt(Ee,this.m_vertices[o]);F(Ee,1/this.m_count,Ee);for(var a=1/3,o=0;o<this.m_count;++o){N(ji,this.m_vertices[o],Ee),o+1<this.m_count?N(ki,this.m_vertices[o+1],Ee):N(ki,this.m_vertices[0],Ee);var l=U(ji,ki),h=.5*l;r+=h,Q(si,h*a,ji,h*a,ki),Wt(Ze,si);var _=ji.x,p=ji.y,c=ki.x,m=ki.y,f=_*_+c*_+c*c,d=p*p+m*p+m*m;s+=.25*a*l*(f+d)}e.mass=n*r,F(Ze,1/r,Ze),Xl(e.center,Ze,Ee),e.I=n*s,e.I+=e.mass*(V(e.center,e.center)-V(Ze,Ze))},t.prototype.validate=function(){for(var e=0;e<this.m_count;++e){var n=e,r=e<this.m_count-1?n+1:0,s=this.m_vertices[n];N(bo,this.m_vertices[r],s);for(var o=0;o<this.m_count;++o)if(!(o==n||o==r)){var a=U(bo,N(si,this.m_vertices[o],s));if(a<0)return!1}}return!0},t.prototype.computeDistanceProxy=function(e){for(var n=0;n<this.m_count;++n)e.m_vertices[n]=this.m_vertices[n];e.m_vertices.length=this.m_count,e.m_count=this.m_count,e.m_radius=this.m_radius},t.TYPE="polygon",t})(di);function Ac(i,t){for(var e=u.zero(),n=0,r=u.zero(),s,o=1/3,s=0;s<t;++s){var a=r,l=i[s],h=s+1<t?i[s+1]:i[0],_=u.sub(l,a),p=u.sub(h,a),c=u.crossVec2Vec2(_,p),m=.5*c;n+=m,fe(si,1,a,1,l,1,h),re(e,m*o,si)}return e.mul(1/n),e}var wc=Math.sqrt,Bc=Math.PI,Ao=w(0,0),xe=(function(i){wt(t,i);function t(e,n){var r=this;return r instanceof t?(r=i.call(this)||this,r.m_type=t.TYPE,r.m_p=u.zero(),r.m_radius=1,typeof e=="object"&&u.isValid(e)?(r.m_p.setVec2(e),typeof n=="number"&&(r.m_radius=n)):typeof e=="number"&&(r.m_radius=e),r):new t(e,n)}return t.prototype._serialize=function(){return{type:this.m_type,p:this.m_p,radius:this.m_radius}},t._deserialize=function(e){return new t(e.p,e.radius)},t.prototype._reset=function(){},t.prototype.getType=function(){return this.m_type},t.prototype.getRadius=function(){return this.m_radius},t.prototype.getCenter=function(){return this.m_p},t.prototype._clone=function(){var e=new t;return e.m_type=this.m_type,e.m_radius=this.m_radius,e.m_p=this.m_p.clone(),e},t.prototype.getChildCount=function(){return 1},t.prototype.testPoint=function(e,n){var r=D(Ao,e,this.m_p);return ci(n,r)<=this.m_radius*this.m_radius},t.prototype.rayCast=function(e,n,r,s){var o=u.add(r.p,k.mulVec2(r.q,this.m_p)),a=u.sub(n.p1,o),l=u.dot(a,a)-this.m_radius*this.m_radius,h=u.sub(n.p2,n.p1),_=u.dot(a,h),p=u.dot(h,h),c=_*_-p*l;if(c<0||p<Mt)return!1;var m=-(_+wc(c));return 0<=m&&m<=n.maxFraction*p?(m/=p,e.fraction=m,e.normal=u.add(a,u.mulNumVec2(m,h)),e.normal.normalize(),!0):!1},t.prototype.computeAABB=function(e,n,r){var s=D(Ao,n,this.m_p);vt(e.lowerBound,s.x-this.m_radius,s.y-this.m_radius),vt(e.upperBound,s.x+this.m_radius,s.y+this.m_radius)},t.prototype.computeMass=function(e,n){e.mass=n*Bc*this.m_radius*this.m_radius,g(e.center,this.m_p),e.I=e.mass*(.5*this.m_radius*this.m_radius+li(this.m_p))},t.prototype.computeDistanceProxy=function(e){e.m_vertices[0]=this.m_p,e.m_vertices.length=1,e.m_count=1,e.m_radius=this.m_radius},t.TYPE="circle",t})(di),kc=Math.abs,Mc=Math.PI,Cc={frequencyHz:0,dampingRatio:0},wo=(function(i){wt(t,i);function t(e,n,r,s,o){var a=this;if(!(a instanceof t))return new t(e,n,r,s,o);if(r&&s&&"m_type"in s&&"x"in r&&"y"in r){var l=r;r=s,s=l}return e=Rt(e,Cc),a=i.call(this,e,n,r)||this,n=a.m_bodyA,r=a.m_bodyB,a.m_type=t.TYPE,a.m_localAnchorA=u.clone(s?n.getLocalPoint(s):e.localAnchorA||u.zero()),a.m_localAnchorB=u.clone(o?r.getLocalPoint(o):e.localAnchorB||u.zero()),a.m_length=Number.isFinite(e.length)?e.length:u.distance(n.getWorldPoint(a.m_localAnchorA),r.getWorldPoint(a.m_localAnchorB)),a.m_frequencyHz=e.frequencyHz,a.m_dampingRatio=e.dampingRatio,a.m_impulse=0,a.m_gamma=0,a.m_bias=0,a}return t.prototype._serialize=function(){return{type:this.m_type,bodyA:this.m_bodyA,bodyB:this.m_bodyB,collideConnected:this.m_collideConnected,frequencyHz:this.m_frequencyHz,dampingRatio:this.m_dampingRatio,localAnchorA:this.m_localAnchorA,localAnchorB:this.m_localAnchorB,length:this.m_length,impulse:this.m_impulse,gamma:this.m_gamma,bias:this.m_bias}},t._deserialize=function(e,n,r){e=At({},e),e.bodyA=r(Y,e.bodyA,n),e.bodyB=r(Y,e.bodyB,n);var s=new t(e);return s},t.prototype._reset=function(e){e.anchorA?this.m_localAnchorA.setVec2(this.m_bodyA.getLocalPoint(e.anchorA)):e.localAnchorA&&this.m_localAnchorA.setVec2(e.localAnchorA),e.anchorB?this.m_localAnchorB.setVec2(this.m_bodyB.getLocalPoint(e.anchorB)):e.localAnchorB&&this.m_localAnchorB.setVec2(e.localAnchorB),e.length>0?this.m_length=+e.length:e.length<0||(e.anchorA||e.anchorA||e.anchorA||e.anchorA)&&(this.m_length=u.distance(this.m_bodyA.getWorldPoint(this.m_localAnchorA),this.m_bodyB.getWorldPoint(this.m_localAnchorB))),Number.isFinite(e.frequencyHz)&&(this.m_frequencyHz=e.frequencyHz),Number.isFinite(e.dampingRatio)&&(this.m_dampingRatio=e.dampingRatio)},t.prototype.getLocalAnchorA=function(){return this.m_localAnchorA},t.prototype.getLocalAnchorB=function(){return this.m_localAnchorB},t.prototype.setLength=function(e){this.m_length=e},t.prototype.getLength=function(){return this.m_length},t.prototype.setFrequency=function(e){this.m_frequencyHz=e},t.prototype.getFrequency=function(){return this.m_frequencyHz},t.prototype.setDampingRatio=function(e){this.m_dampingRatio=e},t.prototype.getDampingRatio=function(){return this.m_dampingRatio},t.prototype.getAnchorA=function(){return this.m_bodyA.getWorldPoint(this.m_localAnchorA)},t.prototype.getAnchorB=function(){return this.m_bodyB.getWorldPoint(this.m_localAnchorB)},t.prototype.getReactionForce=function(e){return u.mulNumVec2(this.m_impulse,this.m_u).mul(e)},t.prototype.getReactionTorque=function(e){return 0},t.prototype.initVelocityConstraints=function(e){this.m_localCenterA=this.m_bodyA.m_sweep.localCenter,this.m_localCenterB=this.m_bodyB.m_sweep.localCenter,this.m_invMassA=this.m_bodyA.m_invMass,this.m_invMassB=this.m_bodyB.m_invMass,this.m_invIA=this.m_bodyA.m_invI,this.m_invIB=this.m_bodyB.m_invI;var n=this.m_bodyA.c_position.c,r=this.m_bodyA.c_position.a,s=this.m_bodyA.c_velocity.v,o=this.m_bodyA.c_velocity.w,a=this.m_bodyB.c_position.c,l=this.m_bodyB.c_position.a,h=this.m_bodyB.c_velocity.v,_=this.m_bodyB.c_velocity.w,p=k.neo(r),c=k.neo(l);this.m_rA=k.mulVec2(p,u.sub(this.m_localAnchorA,this.m_localCenterA)),this.m_rB=k.mulVec2(c,u.sub(this.m_localAnchorB,this.m_localCenterB)),this.m_u=u.sub(u.add(a,this.m_rB),u.add(n,this.m_rA));var m=this.m_u.length();m>P.linearSlop?this.m_u.mul(1/m):this.m_u.setNum(0,0);var f=u.crossVec2Vec2(this.m_rA,this.m_u),d=u.crossVec2Vec2(this.m_rB,this.m_u),v=this.m_invMassA+this.m_invIA*f*f+this.m_invMassB+this.m_invIB*d*d;if(this.m_mass=v!=0?1/v:0,this.m_frequencyHz>0){var y=m-this.m_length,x=2*Mc*this.m_frequencyHz,b=2*this.m_mass*this.m_dampingRatio*x,B=this.m_mass*x*x,A=e.dt;this.m_gamma=A*(b+A*B),this.m_gamma=this.m_gamma!=0?1/this.m_gamma:0,this.m_bias=y*A*B*this.m_gamma,v+=this.m_gamma,this.m_mass=v!=0?1/v:0}else this.m_gamma=0,this.m_bias=0;if(e.warmStarting){this.m_impulse*=e.dtRatio;var M=u.mulNumVec2(this.m_impulse,this.m_u);s.subMul(this.m_invMassA,M),o-=this.m_invIA*u.crossVec2Vec2(this.m_rA,M),h.addMul(this.m_invMassB,M),_+=this.m_invIB*u.crossVec2Vec2(this.m_rB,M)}else this.m_impulse=0;this.m_bodyA.c_velocity.v.setVec2(s),this.m_bodyA.c_velocity.w=o,this.m_bodyB.c_velocity.v.setVec2(h),this.m_bodyB.c_velocity.w=_},t.prototype.solveVelocityConstraints=function(e){var n=this.m_bodyA.c_velocity.v,r=this.m_bodyA.c_velocity.w,s=this.m_bodyB.c_velocity.v,o=this.m_bodyB.c_velocity.w,a=u.add(n,u.crossNumVec2(r,this.m_rA)),l=u.add(s,u.crossNumVec2(o,this.m_rB)),h=u.dot(this.m_u,l)-u.dot(this.m_u,a),_=-this.m_mass*(h+this.m_bias+this.m_gamma*this.m_impulse);this.m_impulse+=_;var p=u.mulNumVec2(_,this.m_u);n.subMul(this.m_invMassA,p),r-=this.m_invIA*u.crossVec2Vec2(this.m_rA,p),s.addMul(this.m_invMassB,p),o+=this.m_invIB*u.crossVec2Vec2(this.m_rB,p),this.m_bodyA.c_velocity.v.setVec2(n),this.m_bodyA.c_velocity.w=r,this.m_bodyB.c_velocity.v.setVec2(s),this.m_bodyB.c_velocity.w=o},t.prototype.solvePositionConstraints=function(e){if(this.m_frequencyHz>0)return!0;var n=this.m_bodyA.c_position.c,r=this.m_bodyA.c_position.a,s=this.m_bodyB.c_position.c,o=this.m_bodyB.c_position.a,a=k.neo(r),l=k.neo(o),h=k.mulSub(a,this.m_localAnchorA,this.m_localCenterA),_=k.mulSub(l,this.m_localAnchorB,this.m_localCenterB),p=u.sub(u.add(s,_),u.add(n,h)),c=p.normalize(),m=yt(c-this.m_length,-P.maxLinearCorrection,P.maxLinearCorrection),f=-this.m_mass*m,d=u.mulNumVec2(f,p);return n.subMul(this.m_invMassA,d),r-=this.m_invIA*u.crossVec2Vec2(h,d),s.addMul(this.m_invMassB,d),o+=this.m_invIB*u.crossVec2Vec2(_,d),this.m_bodyA.c_position.c.setVec2(n),this.m_bodyA.c_position.a=r,this.m_bodyB.c_position.c.setVec2(s),this.m_bodyB.c_position.a=o,kc(m)<P.linearSlop},t.TYPE="distance-joint",t})(bt),Vc={maxForce:0,maxTorque:0},Bo=(function(i){wt(t,i);function t(e,n,r,s){var o=this;return o instanceof t?(e=Rt(e,Vc),o=i.call(this,e,n,r)||this,n=o.m_bodyA,r=o.m_bodyB,o.m_type=t.TYPE,o.m_localAnchorA=u.clone(s?n.getLocalPoint(s):e.localAnchorA||u.zero()),o.m_localAnchorB=u.clone(s?r.getLocalPoint(s):e.localAnchorB||u.zero()),o.m_linearImpulse=u.zero(),o.m_angularImpulse=0,o.m_maxForce=e.maxForce,o.m_maxTorque=e.maxTorque,o):new t(e,n,r,s)}return t.prototype._serialize=function(){return{type:this.m_type,bodyA:this.m_bodyA,bodyB:this.m_bodyB,collideConnected:this.m_collideConnected,maxForce:this.m_maxForce,maxTorque:this.m_maxTorque,localAnchorA:this.m_localAnchorA,localAnchorB:this.m_localAnchorB}},t._deserialize=function(e,n,r){e=At({},e),e.bodyA=r(Y,e.bodyA,n),e.bodyB=r(Y,e.bodyB,n);var s=new t(e);return s},t.prototype._reset=function(e){e.anchorA?this.m_localAnchorA.setVec2(this.m_bodyA.getLocalPoint(e.anchorA)):e.localAnchorA&&this.m_localAnchorA.setVec2(e.localAnchorA),e.anchorB?this.m_localAnchorB.setVec2(this.m_bodyB.getLocalPoint(e.anchorB)):e.localAnchorB&&this.m_localAnchorB.setVec2(e.localAnchorB),Number.isFinite(e.maxForce)&&(this.m_maxForce=e.maxForce),Number.isFinite(e.maxTorque)&&(this.m_maxTorque=e.maxTorque)},t.prototype.getLocalAnchorA=function(){return this.m_localAnchorA},t.prototype.getLocalAnchorB=function(){return this.m_localAnchorB},t.prototype.setMaxForce=function(e){this.m_maxForce=e},t.prototype.getMaxForce=function(){return this.m_maxForce},t.prototype.setMaxTorque=function(e){this.m_maxTorque=e},t.prototype.getMaxTorque=function(){return this.m_maxTorque},t.prototype.getAnchorA=function(){return this.m_bodyA.getWorldPoint(this.m_localAnchorA)},t.prototype.getAnchorB=function(){return this.m_bodyB.getWorldPoint(this.m_localAnchorB)},t.prototype.getReactionForce=function(e){return u.mulNumVec2(e,this.m_linearImpulse)},t.prototype.getReactionTorque=function(e){return e*this.m_angularImpulse},t.prototype.initVelocityConstraints=function(e){this.m_localCenterA=this.m_bodyA.m_sweep.localCenter,this.m_localCenterB=this.m_bodyB.m_sweep.localCenter,this.m_invMassA=this.m_bodyA.m_invMass,this.m_invMassB=this.m_bodyB.m_invMass,this.m_invIA=this.m_bodyA.m_invI,this.m_invIB=this.m_bodyB.m_invI;var n=this.m_bodyA.c_position.a,r=this.m_bodyA.c_velocity.v,s=this.m_bodyA.c_velocity.w,o=this.m_bodyB.c_position.a,a=this.m_bodyB.c_velocity.v,l=this.m_bodyB.c_velocity.w,h=k.neo(n),_=k.neo(o);this.m_rA=k.mulVec2(h,u.sub(this.m_localAnchorA,this.m_localCenterA)),this.m_rB=k.mulVec2(_,u.sub(this.m_localAnchorB,this.m_localCenterB));var p=this.m_invMassA,c=this.m_invMassB,m=this.m_invIA,f=this.m_invIB,d=new ae;if(d.ex.x=p+c+m*this.m_rA.y*this.m_rA.y+f*this.m_rB.y*this.m_rB.y,d.ex.y=-m*this.m_rA.x*this.m_rA.y-f*this.m_rB.x*this.m_rB.y,d.ey.x=d.ex.y,d.ey.y=p+c+m*this.m_rA.x*this.m_rA.x+f*this.m_rB.x*this.m_rB.x,this.m_linearMass=d.getInverse(),this.m_angularMass=m+f,this.m_angularMass>0&&(this.m_angularMass=1/this.m_angularMass),e.warmStarting){this.m_linearImpulse.mul(e.dtRatio),this.m_angularImpulse*=e.dtRatio;var v=u.neo(this.m_linearImpulse.x,this.m_linearImpulse.y);r.subMul(p,v),s-=m*(u.crossVec2Vec2(this.m_rA,v)+this.m_angularImpulse),a.addMul(c,v),l+=f*(u.crossVec2Vec2(this.m_rB,v)+this.m_angularImpulse)}else this.m_linearImpulse.setZero(),this.m_angularImpulse=0;this.m_bodyA.c_velocity.v=r,this.m_bodyA.c_velocity.w=s,this.m_bodyB.c_velocity.v=a,this.m_bodyB.c_velocity.w=l},t.prototype.solveVelocityConstraints=function(e){var n=this.m_bodyA.c_velocity.v,r=this.m_bodyA.c_velocity.w,s=this.m_bodyB.c_velocity.v,o=this.m_bodyB.c_velocity.w,a=this.m_invMassA,l=this.m_invMassB,h=this.m_invIA,_=this.m_invIB,p=e.dt;{var c=o-r,m=-this.m_angularMass*c,f=this.m_angularImpulse,d=p*this.m_maxTorque;this.m_angularImpulse=yt(this.m_angularImpulse+m,-d,d),m=this.m_angularImpulse-f,r-=h*m,o+=_*m}{var c=u.sub(u.add(s,u.crossNumVec2(o,this.m_rB)),u.add(n,u.crossNumVec2(r,this.m_rA))),m=u.neg(ae.mulVec2(this.m_linearMass,c)),f=this.m_linearImpulse;this.m_linearImpulse.add(m);var d=p*this.m_maxForce;this.m_linearImpulse.lengthSquared()>d*d&&(this.m_linearImpulse.normalize(),this.m_linearImpulse.mul(d)),m=u.sub(this.m_linearImpulse,f),n.subMul(a,m),r-=h*u.crossVec2Vec2(this.m_rA,m),s.addMul(l,m),o+=_*u.crossVec2Vec2(this.m_rB,m)}this.m_bodyA.c_velocity.v=n,this.m_bodyA.c_velocity.w=r,this.m_bodyB.c_velocity.v=s,this.m_bodyB.c_velocity.w=o},t.prototype.solvePositionConstraints=function(e){return!0},t.TYPE="friction-joint",t})(bt),$e=(function(){function i(t,e,n){typeof t=="object"&&t!==null?(this.ex=J.clone(t),this.ey=J.clone(e),this.ez=J.clone(n)):(this.ex=J.zero(),this.ey=J.zero(),this.ez=J.zero())}return i.prototype.toString=function(){return JSON.stringify(this)},i.isValid=function(t){return t===null||typeof t>"u"?!1:J.isValid(t.ex)&&J.isValid(t.ey)&&J.isValid(t.ez)},i.assert=function(t){},i.prototype.setZero=function(){return this.ex.setZero(),this.ey.setZero(),this.ez.setZero(),this},i.prototype.solve33=function(t){var e=this.ey.y*this.ez.z-this.ey.z*this.ez.y,n=this.ey.z*this.ez.x-this.ey.x*this.ez.z,r=this.ey.x*this.ez.y-this.ey.y*this.ez.x,s=this.ex.x*e+this.ex.y*n+this.ex.z*r;s!==0&&(s=1/s);var o=new J;return e=this.ey.y*this.ez.z-this.ey.z*this.ez.y,n=this.ey.z*this.ez.x-this.ey.x*this.ez.z,r=this.ey.x*this.ez.y-this.ey.y*this.ez.x,o.x=s*(t.x*e+t.y*n+t.z*r),e=t.y*this.ez.z-t.z*this.ez.y,n=t.z*this.ez.x-t.x*this.ez.z,r=t.x*this.ez.y-t.y*this.ez.x,o.y=s*(this.ex.x*e+this.ex.y*n+this.ex.z*r),e=this.ey.y*t.z-this.ey.z*t.y,n=this.ey.z*t.x-this.ey.x*t.z,r=this.ey.x*t.y-this.ey.y*t.x,o.z=s*(this.ex.x*e+this.ex.y*n+this.ex.z*r),o},i.prototype.solve22=function(t){var e=this.ex.x,n=this.ey.x,r=this.ex.y,s=this.ey.y,o=e*s-n*r;o!==0&&(o=1/o);var a=u.zero();return a.x=o*(s*t.x-n*t.y),a.y=o*(e*t.y-r*t.x),a},i.prototype.getInverse22=function(t){var e=this.ex.x,n=this.ey.x,r=this.ex.y,s=this.ey.y,o=e*s-n*r;o!==0&&(o=1/o),t.ex.x=o*s,t.ey.x=-o*n,t.ex.z=0,t.ex.y=-o*r,t.ey.y=o*e,t.ey.z=0,t.ez.x=0,t.ez.y=0,t.ez.z=0},i.prototype.getSymInverse33=function(t){var e=J.dot(this.ex,J.cross(this.ey,this.ez));e!==0&&(e=1/e);var n=this.ex.x,r=this.ey.x,s=this.ez.x,o=this.ey.y,a=this.ez.y,l=this.ez.z;t.ex.x=e*(o*l-a*a),t.ex.y=e*(s*a-r*l),t.ex.z=e*(r*a-s*o),t.ey.x=t.ex.y,t.ey.y=e*(n*l-s*s),t.ey.z=e*(s*r-n*a),t.ez.x=t.ex.z,t.ez.y=t.ey.z,t.ez.z=e*(n*o-r*r)},i.mul=function(t,e){if(e&&"z"in e&&"y"in e&&"x"in e){var n=t.ex.x*e.x+t.ey.x*e.y+t.ez.x*e.z,r=t.ex.y*e.x+t.ey.y*e.y+t.ez.y*e.z,s=t.ex.z*e.x+t.ey.z*e.y+t.ez.z*e.z;return new J(n,r,s)}else if(e&&"y"in e&&"x"in e){var n=t.ex.x*e.x+t.ey.x*e.y,r=t.ex.y*e.x+t.ey.y*e.y;return u.neo(n,r)}},i.mulVec3=function(t,e){var n=t.ex.x*e.x+t.ey.x*e.y+t.ez.x*e.z,r=t.ex.y*e.x+t.ey.y*e.y+t.ez.y*e.z,s=t.ex.z*e.x+t.ey.z*e.y+t.ez.z*e.z;return new J(n,r,s)},i.mulVec2=function(t,e){var n=t.ex.x*e.x+t.ey.x*e.y,r=t.ex.y*e.x+t.ey.y*e.y;return u.neo(n,r)},i.add=function(t,e){return new i(J.add(t.ex,e.ex),J.add(t.ey,e.ey),J.add(t.ez,e.ez))},i})(),ko=Math.abs,dt;(function(i){i[i.inactiveLimit=0]="inactiveLimit",i[i.atLowerLimit=1]="atLowerLimit",i[i.atUpperLimit=2]="atUpperLimit",i[i.equalLimits=3]="equalLimits"})(dt||(dt={}));var Mi={lowerAngle:0,upperAngle:0,maxMotorTorque:0,motorSpeed:0,enableLimit:!1,enableMotor:!1},Ie=(function(i){wt(t,i);function t(e,n,r,s){var o=this,a,l,h,_,p,c;return o instanceof t?(e=e??{},o=i.call(this,e,n,r)||this,n=o.m_bodyA,r=o.m_bodyB,o.m_mass=new $e,o.m_limitState=dt.inactiveLimit,o.m_type=t.TYPE,u.isValid(s)?o.m_localAnchorA=n.getLocalPoint(s):u.isValid(e.localAnchorA)?o.m_localAnchorA=u.clone(e.localAnchorA):o.m_localAnchorA=u.zero(),u.isValid(s)?o.m_localAnchorB=r.getLocalPoint(s):u.isValid(e.localAnchorB)?o.m_localAnchorB=u.clone(e.localAnchorB):o.m_localAnchorB=u.zero(),Number.isFinite(e.referenceAngle)?o.m_referenceAngle=e.referenceAngle:o.m_referenceAngle=r.getAngle()-n.getAngle(),o.m_impulse=new J,o.m_motorImpulse=0,o.m_lowerAngle=(a=e.lowerAngle)!==null&&a!==void 0?a:Mi.lowerAngle,o.m_upperAngle=(l=e.upperAngle)!==null&&l!==void 0?l:Mi.upperAngle,o.m_maxMotorTorque=(h=e.maxMotorTorque)!==null&&h!==void 0?h:Mi.maxMotorTorque,o.m_motorSpeed=(_=e.motorSpeed)!==null&&_!==void 0?_:Mi.motorSpeed,o.m_enableLimit=(p=e.enableLimit)!==null&&p!==void 0?p:Mi.enableLimit,o.m_enableMotor=(c=e.enableMotor)!==null&&c!==void 0?c:Mi.enableMotor,o):new t(e,n,r,s)}return t.prototype._serialize=function(){return{type:this.m_type,bodyA:this.m_bodyA,bodyB:this.m_bodyB,collideConnected:this.m_collideConnected,lowerAngle:this.m_lowerAngle,upperAngle:this.m_upperAngle,maxMotorTorque:this.m_maxMotorTorque,motorSpeed:this.m_motorSpeed,enableLimit:this.m_enableLimit,enableMotor:this.m_enableMotor,localAnchorA:this.m_localAnchorA,localAnchorB:this.m_localAnchorB,referenceAngle:this.m_referenceAngle}},t._deserialize=function(e,n,r){e=At({},e),e.bodyA=r(Y,e.bodyA,n),e.bodyB=r(Y,e.bodyB,n);var s=new t(e);return s},t.prototype._reset=function(e){e.anchorA?this.m_localAnchorA.setVec2(this.m_bodyA.getLocalPoint(e.anchorA)):e.localAnchorA&&this.m_localAnchorA.setVec2(e.localAnchorA),e.anchorB?this.m_localAnchorB.setVec2(this.m_bodyB.getLocalPoint(e.anchorB)):e.localAnchorB&&this.m_localAnchorB.setVec2(e.localAnchorB),Number.isFinite(e.referenceAngle)&&(this.m_referenceAngle=e.referenceAngle),e.enableLimit!==void 0&&(this.m_enableLimit=e.enableLimit),Number.isFinite(e.lowerAngle)&&(this.m_lowerAngle=e.lowerAngle),Number.isFinite(e.upperAngle)&&(this.m_upperAngle=e.upperAngle),Number.isFinite(e.maxMotorTorque)&&(this.m_maxMotorTorque=e.maxMotorTorque),Number.isFinite(e.motorSpeed)&&(this.m_motorSpeed=e.motorSpeed),e.enableMotor!==void 0&&(this.m_enableMotor=e.enableMotor)},t.prototype.getLocalAnchorA=function(){return this.m_localAnchorA},t.prototype.getLocalAnchorB=function(){return this.m_localAnchorB},t.prototype.getReferenceAngle=function(){return this.m_referenceAngle},t.prototype.getJointAngle=function(){var e=this.m_bodyA,n=this.m_bodyB;return n.m_sweep.a-e.m_sweep.a-this.m_referenceAngle},t.prototype.getJointSpeed=function(){var e=this.m_bodyA,n=this.m_bodyB;return n.m_angularVelocity-e.m_angularVelocity},t.prototype.isMotorEnabled=function(){return this.m_enableMotor},t.prototype.enableMotor=function(e){e!=this.m_enableMotor&&(this.m_bodyA.setAwake(!0),this.m_bodyB.setAwake(!0),this.m_enableMotor=e)},t.prototype.getMotorTorque=function(e){return e*this.m_motorImpulse},t.prototype.setMotorSpeed=function(e){e!=this.m_motorSpeed&&(this.m_bodyA.setAwake(!0),this.m_bodyB.setAwake(!0),this.m_motorSpeed=e)},t.prototype.getMotorSpeed=function(){return this.m_motorSpeed},t.prototype.setMaxMotorTorque=function(e){e!=this.m_maxMotorTorque&&(this.m_bodyA.setAwake(!0),this.m_bodyB.setAwake(!0),this.m_maxMotorTorque=e)},t.prototype.getMaxMotorTorque=function(){return this.m_maxMotorTorque},t.prototype.isLimitEnabled=function(){return this.m_enableLimit},t.prototype.enableLimit=function(e){e!=this.m_enableLimit&&(this.m_bodyA.setAwake(!0),this.m_bodyB.setAwake(!0),this.m_enableLimit=e,this.m_impulse.z=0)},t.prototype.getLowerLimit=function(){return this.m_lowerAngle},t.prototype.getUpperLimit=function(){return this.m_upperAngle},t.prototype.setLimits=function(e,n){(e!=this.m_lowerAngle||n!=this.m_upperAngle)&&(this.m_bodyA.setAwake(!0),this.m_bodyB.setAwake(!0),this.m_impulse.z=0,this.m_lowerAngle=e,this.m_upperAngle=n)},t.prototype.getAnchorA=function(){return this.m_bodyA.getWorldPoint(this.m_localAnchorA)},t.prototype.getAnchorB=function(){return this.m_bodyB.getWorldPoint(this.m_localAnchorB)},t.prototype.getReactionForce=function(e){return u.neo(this.m_impulse.x,this.m_impulse.y).mul(e)},t.prototype.getReactionTorque=function(e){return e*this.m_impulse.z},t.prototype.initVelocityConstraints=function(e){this.m_localCenterA=this.m_bodyA.m_sweep.localCenter,this.m_localCenterB=this.m_bodyB.m_sweep.localCenter,this.m_invMassA=this.m_bodyA.m_invMass,this.m_invMassB=this.m_bodyB.m_invMass,this.m_invIA=this.m_bodyA.m_invI,this.m_invIB=this.m_bodyB.m_invI;var n=this.m_bodyA.c_position.a,r=this.m_bodyA.c_velocity.v,s=this.m_bodyA.c_velocity.w,o=this.m_bodyB.c_position.a,a=this.m_bodyB.c_velocity.v,l=this.m_bodyB.c_velocity.w,h=k.neo(n),_=k.neo(o);this.m_rA=k.mulVec2(h,u.sub(this.m_localAnchorA,this.m_localCenterA)),this.m_rB=k.mulVec2(_,u.sub(this.m_localAnchorB,this.m_localCenterB));var p=this.m_invMassA,c=this.m_invMassB,m=this.m_invIA,f=this.m_invIB,d=m+f===0;if(this.m_mass.ex.x=p+c+this.m_rA.y*this.m_rA.y*m+this.m_rB.y*this.m_rB.y*f,this.m_mass.ey.x=-this.m_rA.y*this.m_rA.x*m-this.m_rB.y*this.m_rB.x*f,this.m_mass.ez.x=-this.m_rA.y*m-this.m_rB.y*f,this.m_mass.ex.y=this.m_mass.ey.x,this.m_mass.ey.y=p+c+this.m_rA.x*this.m_rA.x*m+this.m_rB.x*this.m_rB.x*f,this.m_mass.ez.y=this.m_rA.x*m+this.m_rB.x*f,this.m_mass.ex.z=this.m_mass.ez.x,this.m_mass.ey.z=this.m_mass.ez.y,this.m_mass.ez.z=m+f,this.m_motorMass=m+f,this.m_motorMass>0&&(this.m_motorMass=1/this.m_motorMass),(this.m_enableMotor==!1||d)&&(this.m_motorImpulse=0),this.m_enableLimit&&d==!1){var v=o-n-this.m_referenceAngle;ko(this.m_upperAngle-this.m_lowerAngle)<2*P.angularSlop?this.m_limitState=dt.equalLimits:v<=this.m_lowerAngle?(this.m_limitState!=dt.atLowerLimit&&(this.m_impulse.z=0),this.m_limitState=dt.atLowerLimit):v>=this.m_upperAngle?(this.m_limitState!=dt.atUpperLimit&&(this.m_impulse.z=0),this.m_limitState=dt.atUpperLimit):(this.m_limitState=dt.inactiveLimit,this.m_impulse.z=0)}else this.m_limitState=dt.inactiveLimit;if(e.warmStarting){this.m_impulse.mul(e.dtRatio),this.m_motorImpulse*=e.dtRatio;var y=u.neo(this.m_impulse.x,this.m_impulse.y);r.subMul(p,y),s-=m*(u.crossVec2Vec2(this.m_rA,y)+this.m_motorImpulse+this.m_impulse.z),a.addMul(c,y),l+=f*(u.crossVec2Vec2(this.m_rB,y)+this.m_motorImpulse+this.m_impulse.z)}else this.m_impulse.setZero(),this.m_motorImpulse=0;this.m_bodyA.c_velocity.v=r,this.m_bodyA.c_velocity.w=s,this.m_bodyB.c_velocity.v=a,this.m_bodyB.c_velocity.w=l},t.prototype.solveVelocityConstraints=function(e){var n=this.m_bodyA.c_velocity.v,r=this.m_bodyA.c_velocity.w,s=this.m_bodyB.c_velocity.v,o=this.m_bodyB.c_velocity.w,a=this.m_invMassA,l=this.m_invMassB,h=this.m_invIA,_=this.m_invIB,p=h+_===0;if(this.m_enableMotor&&this.m_limitState!=dt.equalLimits&&p==!1){var c=o-r-this.m_motorSpeed,m=-this.m_motorMass*c,f=this.m_motorImpulse,d=e.dt*this.m_maxMotorTorque;this.m_motorImpulse=yt(this.m_motorImpulse+m,-d,d),m=this.m_motorImpulse-f,r-=h*m,o+=_*m}if(this.m_enableLimit&&this.m_limitState!=dt.inactiveLimit&&p==!1){var v=u.zero();v.addCombine(1,s,1,u.crossNumVec2(o,this.m_rB)),v.subCombine(1,n,1,u.crossNumVec2(r,this.m_rA));var y=o-r,c=new J(v.x,v.y,y),m=J.neg(this.m_mass.solve33(c));if(this.m_limitState==dt.equalLimits)this.m_impulse.add(m);else if(this.m_limitState==dt.atLowerLimit){var x=this.m_impulse.z+m.z;if(x<0){var b=u.combine(-1,v,this.m_impulse.z,u.neo(this.m_mass.ez.x,this.m_mass.ez.y)),B=this.m_mass.solve22(b);m.x=B.x,m.y=B.y,m.z=-this.m_impulse.z,this.m_impulse.x+=B.x,this.m_impulse.y+=B.y,this.m_impulse.z=0}else this.m_impulse.add(m)}else if(this.m_limitState==dt.atUpperLimit){var x=this.m_impulse.z+m.z;if(x>0){var b=u.combine(-1,v,this.m_impulse.z,u.neo(this.m_mass.ez.x,this.m_mass.ez.y)),B=this.m_mass.solve22(b);m.x=B.x,m.y=B.y,m.z=-this.m_impulse.z,this.m_impulse.x+=B.x,this.m_impulse.y+=B.y,this.m_impulse.z=0}else this.m_impulse.add(m)}var A=u.neo(m.x,m.y);n.subMul(a,A),r-=h*(u.crossVec2Vec2(this.m_rA,A)+m.z),s.addMul(l,A),o+=_*(u.crossVec2Vec2(this.m_rB,A)+m.z)}else{var c=u.zero();c.addCombine(1,s,1,u.crossNumVec2(o,this.m_rB)),c.subCombine(1,n,1,u.crossNumVec2(r,this.m_rA));var m=this.m_mass.solve22(u.neg(c));this.m_impulse.x+=m.x,this.m_impulse.y+=m.y,n.subMul(a,m),r-=h*u.crossVec2Vec2(this.m_rA,m),s.addMul(l,m),o+=_*u.crossVec2Vec2(this.m_rB,m)}this.m_bodyA.c_velocity.v=n,this.m_bodyA.c_velocity.w=r,this.m_bodyB.c_velocity.v=s,this.m_bodyB.c_velocity.w=o},t.prototype.solvePositionConstraints=function(e){var n=this.m_bodyA.c_position.c,r=this.m_bodyA.c_position.a,s=this.m_bodyB.c_position.c,o=this.m_bodyB.c_position.a,a=k.neo(r),l=k.neo(o),h=0,_=0,p=this.m_invIA+this.m_invIB==0;if(this.m_enableLimit&&this.m_limitState!=dt.inactiveLimit&&p==!1){var c=o-r-this.m_referenceAngle,m=0;if(this.m_limitState==dt.equalLimits){var f=yt(c-this.m_lowerAngle,-P.maxAngularCorrection,P.maxAngularCorrection);m=-this.m_motorMass*f,h=ko(f)}else if(this.m_limitState==dt.atLowerLimit){var f=c-this.m_lowerAngle;h=-f,f=yt(f+P.angularSlop,-P.maxAngularCorrection,0),m=-this.m_motorMass*f}else if(this.m_limitState==dt.atUpperLimit){var f=c-this.m_upperAngle;h=f,f=yt(f-P.angularSlop,0,P.maxAngularCorrection),m=-this.m_motorMass*f}r-=this.m_invIA*m,o+=this.m_invIB*m}{a.setAngle(r),l.setAngle(o);var d=k.mulVec2(a,u.sub(this.m_localAnchorA,this.m_localCenterA)),v=k.mulVec2(l,u.sub(this.m_localAnchorB,this.m_localCenterB)),f=u.zero();f.addCombine(1,s,1,v),f.subCombine(1,n,1,d),_=f.length();var y=this.m_invMassA,x=this.m_invMassB,b=this.m_invIA,B=this.m_invIB,A=new ae;A.ex.x=y+x+b*d.y*d.y+B*v.y*v.y,A.ex.y=-b*d.x*d.y-B*v.x*v.y,A.ey.x=A.ex.y,A.ey.y=y+x+b*d.x*d.x+B*v.x*v.x;var M=u.neg(A.solve(f));n.subMul(y,M),r-=b*u.crossVec2Vec2(d,M),s.addMul(x,M),o+=B*u.crossVec2Vec2(v,M)}return this.m_bodyA.c_position.c.setVec2(n),this.m_bodyA.c_position.a=r,this.m_bodyB.c_position.c.setVec2(s),this.m_bodyB.c_position.a=o,_<=P.linearSlop&&h<=P.angularSlop},t.TYPE="revolute-joint",t})(bt),Ji=Math.abs,Mo=Math.max,Sc=Math.min,Pt;(function(i){i[i.inactiveLimit=0]="inactiveLimit",i[i.atLowerLimit=1]="atLowerLimit",i[i.atUpperLimit=2]="atUpperLimit",i[i.equalLimits=3]="equalLimits"})(Pt||(Pt={}));var Ic={enableLimit:!1,lowerTranslation:0,upperTranslation:0,enableMotor:!1,maxMotorForce:0,motorSpeed:0},Xr=(function(i){wt(t,i);function t(e,n,r,s,o){var a=this;return a instanceof t?(e=Rt(e,Ic),a=i.call(this,e,n,r)||this,n=a.m_bodyA,r=a.m_bodyB,a.m_type=t.TYPE,a.m_localAnchorA=u.clone(s?n.getLocalPoint(s):e.localAnchorA||u.zero()),a.m_localAnchorB=u.clone(s?r.getLocalPoint(s):e.localAnchorB||u.zero()),a.m_localXAxisA=u.clone(o?n.getLocalVector(o):e.localAxisA||u.neo(1,0)),a.m_localXAxisA.normalize(),a.m_localYAxisA=u.crossNumVec2(1,a.m_localXAxisA),a.m_referenceAngle=Number.isFinite(e.referenceAngle)?e.referenceAngle:r.getAngle()-n.getAngle(),a.m_impulse=new J,a.m_motorMass=0,a.m_motorImpulse=0,a.m_lowerTranslation=e.lowerTranslation,a.m_upperTranslation=e.upperTranslation,a.m_maxMotorForce=e.maxMotorForce,a.m_motorSpeed=e.motorSpeed,a.m_enableLimit=e.enableLimit,a.m_enableMotor=e.enableMotor,a.m_limitState=Pt.inactiveLimit,a.m_axis=u.zero(),a.m_perp=u.zero(),a.m_K=new $e,a):new t(e,n,r,s,o)}return t.prototype._serialize=function(){return{type:this.m_type,bodyA:this.m_bodyA,bodyB:this.m_bodyB,collideConnected:this.m_collideConnected,lowerTranslation:this.m_lowerTranslation,upperTranslation:this.m_upperTranslation,maxMotorForce:this.m_maxMotorForce,motorSpeed:this.m_motorSpeed,enableLimit:this.m_enableLimit,enableMotor:this.m_enableMotor,localAnchorA:this.m_localAnchorA,localAnchorB:this.m_localAnchorB,localAxisA:this.m_localXAxisA,referenceAngle:this.m_referenceAngle}},t._deserialize=function(e,n,r){e=At({},e),e.bodyA=r(Y,e.bodyA,n),e.bodyB=r(Y,e.bodyB,n),e.localAxisA=u.clone(e.localAxisA);var s=new t(e);return s},t.prototype._reset=function(e){e.anchorA?this.m_localAnchorA.setVec2(this.m_bodyA.getLocalPoint(e.anchorA)):e.localAnchorA&&this.m_localAnchorA.setVec2(e.localAnchorA),e.anchorB?this.m_localAnchorB.setVec2(this.m_bodyB.getLocalPoint(e.anchorB)):e.localAnchorB&&this.m_localAnchorB.setVec2(e.localAnchorB),e.localAxisA&&(this.m_localXAxisA.setVec2(e.localAxisA),this.m_localYAxisA.setVec2(u.crossNumVec2(1,e.localAxisA))),Number.isFinite(e.referenceAngle)&&(this.m_referenceAngle=e.referenceAngle),typeof e.enableLimit<"u"&&(this.m_enableLimit=!!e.enableLimit),Number.isFinite(e.lowerTranslation)&&(this.m_lowerTranslation=e.lowerTranslation),Number.isFinite(e.upperTranslation)&&(this.m_upperTranslation=e.upperTranslation),typeof e.enableMotor<"u"&&(this.m_enableMotor=!!e.enableMotor),Number.isFinite(e.maxMotorForce)&&(this.m_maxMotorForce=e.maxMotorForce),Number.isFinite(e.motorSpeed)&&(this.m_motorSpeed=e.motorSpeed)},t.prototype.getLocalAnchorA=function(){return this.m_localAnchorA},t.prototype.getLocalAnchorB=function(){return this.m_localAnchorB},t.prototype.getLocalAxisA=function(){return this.m_localXAxisA},t.prototype.getReferenceAngle=function(){return this.m_referenceAngle},t.prototype.getJointTranslation=function(){var e=this.m_bodyA.getWorldPoint(this.m_localAnchorA),n=this.m_bodyB.getWorldPoint(this.m_localAnchorB),r=u.sub(n,e),s=this.m_bodyA.getWorldVector(this.m_localXAxisA),o=u.dot(r,s);return o},t.prototype.getJointSpeed=function(){var e=this.m_bodyA,n=this.m_bodyB,r=k.mulVec2(e.m_xf.q,u.sub(this.m_localAnchorA,e.m_sweep.localCenter)),s=k.mulVec2(n.m_xf.q,u.sub(this.m_localAnchorB,n.m_sweep.localCenter)),o=u.add(e.m_sweep.c,r),a=u.add(n.m_sweep.c,s),l=u.sub(a,o),h=k.mulVec2(e.m_xf.q,this.m_localXAxisA),_=e.m_linearVelocity,p=n.m_linearVelocity,c=e.m_angularVelocity,m=n.m_angularVelocity,f=u.dot(l,u.crossNumVec2(c,h))+u.dot(h,u.sub(u.addCrossNumVec2(p,m,s),u.addCrossNumVec2(_,c,r)));return f},t.prototype.isLimitEnabled=function(){return this.m_enableLimit},t.prototype.enableLimit=function(e){e!=this.m_enableLimit&&(this.m_bodyA.setAwake(!0),this.m_bodyB.setAwake(!0),this.m_enableLimit=e,this.m_impulse.z=0)},t.prototype.getLowerLimit=function(){return this.m_lowerTranslation},t.prototype.getUpperLimit=function(){return this.m_upperTranslation},t.prototype.setLimits=function(e,n){(e!=this.m_lowerTranslation||n!=this.m_upperTranslation)&&(this.m_bodyA.setAwake(!0),this.m_bodyB.setAwake(!0),this.m_lowerTranslation=e,this.m_upperTranslation=n,this.m_impulse.z=0)},t.prototype.isMotorEnabled=function(){return this.m_enableMotor},t.prototype.enableMotor=function(e){e!=this.m_enableMotor&&(this.m_bodyA.setAwake(!0),this.m_bodyB.setAwake(!0),this.m_enableMotor=e)},t.prototype.setMotorSpeed=function(e){e!=this.m_motorSpeed&&(this.m_bodyA.setAwake(!0),this.m_bodyB.setAwake(!0),this.m_motorSpeed=e)},t.prototype.setMaxMotorForce=function(e){e!=this.m_maxMotorForce&&(this.m_bodyA.setAwake(!0),this.m_bodyB.setAwake(!0),this.m_maxMotorForce=e)},t.prototype.getMaxMotorForce=function(){return this.m_maxMotorForce},t.prototype.getMotorSpeed=function(){return this.m_motorSpeed},t.prototype.getMotorForce=function(e){return e*this.m_motorImpulse},t.prototype.getAnchorA=function(){return this.m_bodyA.getWorldPoint(this.m_localAnchorA)},t.prototype.getAnchorB=function(){return this.m_bodyB.getWorldPoint(this.m_localAnchorB)},t.prototype.getReactionForce=function(e){return u.combine(this.m_impulse.x,this.m_perp,this.m_motorImpulse+this.m_impulse.z,this.m_axis).mul(e)},t.prototype.getReactionTorque=function(e){return e*this.m_impulse.y},t.prototype.initVelocityConstraints=function(e){this.m_localCenterA=this.m_bodyA.m_sweep.localCenter,this.m_localCenterB=this.m_bodyB.m_sweep.localCenter,this.m_invMassA=this.m_bodyA.m_invMass,this.m_invMassB=this.m_bodyB.m_invMass,this.m_invIA=this.m_bodyA.m_invI,this.m_invIB=this.m_bodyB.m_invI;var n=this.m_bodyA.c_position.c,r=this.m_bodyA.c_position.a,s=this.m_bodyA.c_velocity.v,o=this.m_bodyA.c_velocity.w,a=this.m_bodyB.c_position.c,l=this.m_bodyB.c_position.a,h=this.m_bodyB.c_velocity.v,_=this.m_bodyB.c_velocity.w,p=k.neo(r),c=k.neo(l),m=k.mulVec2(p,u.sub(this.m_localAnchorA,this.m_localCenterA)),f=k.mulVec2(c,u.sub(this.m_localAnchorB,this.m_localCenterB)),d=u.zero();d.addCombine(1,a,1,f),d.subCombine(1,n,1,m);var v=this.m_invMassA,y=this.m_invMassB,x=this.m_invIA,b=this.m_invIB;this.m_axis=k.mulVec2(p,this.m_localXAxisA),this.m_a1=u.crossVec2Vec2(u.add(d,m),this.m_axis),this.m_a2=u.crossVec2Vec2(f,this.m_axis),this.m_motorMass=v+y+x*this.m_a1*this.m_a1+b*this.m_a2*this.m_a2,this.m_motorMass>0&&(this.m_motorMass=1/this.m_motorMass);{this.m_perp=k.mulVec2(p,this.m_localYAxisA),this.m_s1=u.crossVec2Vec2(u.add(d,m),this.m_perp),this.m_s2=u.crossVec2Vec2(f,this.m_perp),u.crossVec2Vec2(m,this.m_perp);var B=v+y+x*this.m_s1*this.m_s1+b*this.m_s2*this.m_s2,A=x*this.m_s1+b*this.m_s2,M=x*this.m_s1*this.m_a1+b*this.m_s2*this.m_a2,C=x+b;C==0&&(C=1);var I=x*this.m_a1+b*this.m_a2,T=v+y+x*this.m_a1*this.m_a1+b*this.m_a2*this.m_a2;this.m_K.ex.set(B,A,M),this.m_K.ey.set(A,C,I),this.m_K.ez.set(M,I,T)}if(this.m_enableLimit){var L=u.dot(this.m_axis,d);Ji(this.m_upperTranslation-this.m_lowerTranslation)<2*P.linearSlop?this.m_limitState=Pt.equalLimits:L<=this.m_lowerTranslation?this.m_limitState!=Pt.atLowerLimit&&(this.m_limitState=Pt.atLowerLimit,this.m_impulse.z=0):L>=this.m_upperTranslation?this.m_limitState!=Pt.atUpperLimit&&(this.m_limitState=Pt.atUpperLimit,this.m_impulse.z=0):(this.m_limitState=Pt.inactiveLimit,this.m_impulse.z=0)}else this.m_limitState=Pt.inactiveLimit,this.m_impulse.z=0;if(this.m_enableMotor==!1&&(this.m_motorImpulse=0),e.warmStarting){this.m_impulse.mul(e.dtRatio),this.m_motorImpulse*=e.dtRatio;var q=u.combine(this.m_impulse.x,this.m_perp,this.m_motorImpulse+this.m_impulse.z,this.m_axis),$=this.m_impulse.x*this.m_s1+this.m_impulse.y+(this.m_motorImpulse+this.m_impulse.z)*this.m_a1,j=this.m_impulse.x*this.m_s2+this.m_impulse.y+(this.m_motorImpulse+this.m_impulse.z)*this.m_a2;s.subMul(v,q),o-=x*$,h.addMul(y,q),_+=b*j}else this.m_impulse.setZero(),this.m_motorImpulse=0;this.m_bodyA.c_velocity.v.setVec2(s),this.m_bodyA.c_velocity.w=o,this.m_bodyB.c_velocity.v.setVec2(h),this.m_bodyB.c_velocity.w=_},t.prototype.solveVelocityConstraints=function(e){var n=this.m_bodyA.c_velocity.v,r=this.m_bodyA.c_velocity.w,s=this.m_bodyB.c_velocity.v,o=this.m_bodyB.c_velocity.w,a=this.m_invMassA,l=this.m_invMassB,h=this.m_invIA,_=this.m_invIB;if(this.m_enableMotor&&this.m_limitState!=Pt.equalLimits){var p=u.dot(this.m_axis,u.sub(s,n))+this.m_a2*o-this.m_a1*r,c=this.m_motorMass*(this.m_motorSpeed-p),m=this.m_motorImpulse,f=e.dt*this.m_maxMotorForce;this.m_motorImpulse=yt(this.m_motorImpulse+c,-f,f),c=this.m_motorImpulse-m;var d=u.mulNumVec2(c,this.m_axis),v=c*this.m_a1,y=c*this.m_a2;n.subMul(a,d),r-=h*v,s.addMul(l,d),o+=_*y}var x=u.zero();if(x.x+=u.dot(this.m_perp,s)+this.m_s2*o,x.x-=u.dot(this.m_perp,n)+this.m_s1*r,x.y=o-r,this.m_enableLimit&&this.m_limitState!=Pt.inactiveLimit){var b=0;b+=u.dot(this.m_axis,s)+this.m_a2*o,b-=u.dot(this.m_axis,n)+this.m_a1*r;var p=new J(x.x,x.y,b),B=J.clone(this.m_impulse),A=this.m_K.solve33(J.neg(p));this.m_impulse.add(A),this.m_limitState==Pt.atLowerLimit?this.m_impulse.z=Mo(this.m_impulse.z,0):this.m_limitState==Pt.atUpperLimit&&(this.m_impulse.z=Sc(this.m_impulse.z,0));var M=u.combine(-1,x,-(this.m_impulse.z-B.z),u.neo(this.m_K.ez.x,this.m_K.ez.y)),C=u.add(this.m_K.solve22(M),u.neo(B.x,B.y));this.m_impulse.x=C.x,this.m_impulse.y=C.y,A=J.sub(this.m_impulse,B);var d=u.combine(A.x,this.m_perp,A.z,this.m_axis),v=A.x*this.m_s1+A.y+A.z*this.m_a1,y=A.x*this.m_s2+A.y+A.z*this.m_a2;n.subMul(a,d),r-=h*v,s.addMul(l,d),o+=_*y}else{var A=this.m_K.solve22(u.neg(x));this.m_impulse.x+=A.x,this.m_impulse.y+=A.y;var d=u.mulNumVec2(A.x,this.m_perp),v=A.x*this.m_s1+A.y,y=A.x*this.m_s2+A.y;n.subMul(a,d),r-=h*v,s.addMul(l,d),o+=_*y}this.m_bodyA.c_velocity.v=n,this.m_bodyA.c_velocity.w=r,this.m_bodyB.c_velocity.v=s,this.m_bodyB.c_velocity.w=o},t.prototype.solvePositionConstraints=function(e){var n=this.m_bodyA.c_position.c,r=this.m_bodyA.c_position.a,s=this.m_bodyB.c_position.c,o=this.m_bodyB.c_position.a,a=k.neo(r),l=k.neo(o),h=this.m_invMassA,_=this.m_invMassB,p=this.m_invIA,c=this.m_invIB,m=k.mulVec2(a,u.sub(this.m_localAnchorA,this.m_localCenterA)),f=k.mulVec2(l,u.sub(this.m_localAnchorB,this.m_localCenterB)),d=u.sub(u.add(s,f),u.add(n,m)),v=k.mulVec2(a,this.m_localXAxisA),y=u.crossVec2Vec2(u.add(d,m),v),x=u.crossVec2Vec2(f,v),b=k.mulVec2(a,this.m_localYAxisA),B=u.crossVec2Vec2(u.add(d,m),b),A=u.crossVec2Vec2(f,b),M=new J,C=u.zero();C.x=u.dot(b,d),C.y=o-r-this.m_referenceAngle;var I=Ji(C.x),T=Ji(C.y),L=P.linearSlop,q=P.maxLinearCorrection,$=!1,j=0;if(this.m_enableLimit){var G=u.dot(v,d);Ji(this.m_upperTranslation-this.m_lowerTranslation)<2*L?(j=yt(G,-q,q),I=Mo(I,Ji(G)),$=!0):G<=this.m_lowerTranslation?(j=yt(G-this.m_lowerTranslation+L,-q,0),I=Math.max(I,this.m_lowerTranslation-G),$=!0):G>=this.m_upperTranslation&&(j=yt(G-this.m_upperTranslation-L,0,q),I=Math.max(I,G-this.m_upperTranslation),$=!0)}if($){var Lt=h+_+p*B*B+c*A*A,ft=p*B+c*A,Zt=p*B*y+c*A*x,Ct=p+c;Ct==0&&(Ct=1);var nt=p*y+c*x,Ni=h+_+p*y*y+c*x*x,Ot=new $e;Ot.ex.set(Lt,ft,Zt),Ot.ey.set(ft,Ct,nt),Ot.ez.set(Zt,nt,Ni);var ze=new J;ze.x=C.x,ze.y=C.y,ze.z=j,M=Ot.solve33(J.neg(ze))}else{var Lt=h+_+p*B*B+c*A*A,ft=p*B+c*A,Ct=p+c;Ct==0&&(Ct=1);var Ot=new ae;Ot.ex.setNum(Lt,ft),Ot.ey.setNum(ft,Ct);var Ge=Ot.solve(u.neg(C));M.x=Ge.x,M.y=Ge.y,M.z=0}var Ri=u.combine(M.x,b,M.z,v),vi=M.x*B+M.y+M.z*y,_r=M.x*A+M.y+M.z*x;return n.subMul(h,Ri),r-=p*vi,s.addMul(_,Ri),o+=c*_r,this.m_bodyA.c_position.c=n,this.m_bodyA.c_position.a=r,this.m_bodyB.c_position.c=s,this.m_bodyB.c_position.a=o,I<=P.linearSlop&&T<=P.angularSlop},t.TYPE="prismatic-joint",t})(bt),Pc={ratio:1},Co=(function(i){wt(t,i);function t(e,n,r,s,o,a){var l=this;if(!(l instanceof t))return new t(e,n,r,s,o,a);e=Rt(e,Pc),l=i.call(this,e,n,r)||this,n=l.m_bodyA,r=l.m_bodyB,l.m_type=t.TYPE,l.m_joint1=s||e.joint1,l.m_joint2=o||e.joint2,l.m_ratio=Number.isFinite(a)?a:e.ratio,l.m_type1=l.m_joint1.getType(),l.m_type2=l.m_joint2.getType();var h,_;l.m_bodyC=l.m_joint1.getBodyA(),l.m_bodyA=l.m_joint1.getBodyB();var p=l.m_bodyA.m_xf,c=l.m_bodyA.m_sweep.a,m=l.m_bodyC.m_xf,f=l.m_bodyC.m_sweep.a;if(l.m_type1===Ie.TYPE){var d=l.m_joint1;l.m_localAnchorC=d.m_localAnchorA,l.m_localAnchorA=d.m_localAnchorB,l.m_referenceAngleA=d.m_referenceAngle,l.m_localAxisC=u.zero(),h=c-f-l.m_referenceAngleA}else{var v=l.m_joint1;l.m_localAnchorC=v.m_localAnchorA,l.m_localAnchorA=v.m_localAnchorB,l.m_referenceAngleA=v.m_referenceAngle,l.m_localAxisC=v.m_localXAxisA;var y=l.m_localAnchorC,x=k.mulTVec2(m.q,u.add(k.mulVec2(p.q,l.m_localAnchorA),u.sub(p.p,m.p)));h=u.dot(x,l.m_localAxisC)-u.dot(y,l.m_localAxisC)}l.m_bodyD=l.m_joint2.getBodyA(),l.m_bodyB=l.m_joint2.getBodyB();var b=l.m_bodyB.m_xf,B=l.m_bodyB.m_sweep.a,A=l.m_bodyD.m_xf,M=l.m_bodyD.m_sweep.a;if(l.m_type2===Ie.TYPE){var d=l.m_joint2;l.m_localAnchorD=d.m_localAnchorA,l.m_localAnchorB=d.m_localAnchorB,l.m_referenceAngleB=d.m_referenceAngle,l.m_localAxisD=u.zero(),_=B-M-l.m_referenceAngleB}else{var v=l.m_joint2;l.m_localAnchorD=v.m_localAnchorA,l.m_localAnchorB=v.m_localAnchorB,l.m_referenceAngleB=v.m_referenceAngle,l.m_localAxisD=v.m_localXAxisA;var C=l.m_localAnchorD,I=k.mulTVec2(A.q,u.add(k.mulVec2(b.q,l.m_localAnchorB),u.sub(b.p,A.p)));_=u.dot(I,l.m_localAxisD)-u.dot(C,l.m_localAxisD)}return l.m_constant=h+l.m_ratio*_,l.m_impulse=0,l}return t.prototype._serialize=function(){return{type:this.m_type,bodyA:this.m_bodyA,bodyB:this.m_bodyB,collideConnected:this.m_collideConnected,joint1:this.m_joint1,joint2:this.m_joint2,ratio:this.m_ratio}},t._deserialize=function(e,n,r){e=At({},e),e.bodyA=r(Y,e.bodyA,n),e.bodyB=r(Y,e.bodyB,n),e.joint1=r(bt,e.joint1,n),e.joint2=r(bt,e.joint2,n);var s=new t(e);return s},t.prototype._reset=function(e){Number.isFinite(e.ratio)&&(this.m_ratio=e.ratio)},t.prototype.getJoint1=function(){return this.m_joint1},t.prototype.getJoint2=function(){return this.m_joint2},t.prototype.setRatio=function(e){this.m_ratio=e},t.prototype.getRatio=function(){return this.m_ratio},t.prototype.getAnchorA=function(){return this.m_bodyA.getWorldPoint(this.m_localAnchorA)},t.prototype.getAnchorB=function(){return this.m_bodyB.getWorldPoint(this.m_localAnchorB)},t.prototype.getReactionForce=function(e){return u.mulNumVec2(this.m_impulse,this.m_JvAC).mul(e)},t.prototype.getReactionTorque=function(e){var n=this.m_impulse*this.m_JwA;return e*n},t.prototype.initVelocityConstraints=function(e){this.m_lcA=this.m_bodyA.m_sweep.localCenter,this.m_lcB=this.m_bodyB.m_sweep.localCenter,this.m_lcC=this.m_bodyC.m_sweep.localCenter,this.m_lcD=this.m_bodyD.m_sweep.localCenter,this.m_mA=this.m_bodyA.m_invMass,this.m_mB=this.m_bodyB.m_invMass,this.m_mC=this.m_bodyC.m_invMass,this.m_mD=this.m_bodyD.m_invMass,this.m_iA=this.m_bodyA.m_invI,this.m_iB=this.m_bodyB.m_invI,this.m_iC=this.m_bodyC.m_invI,this.m_iD=this.m_bodyD.m_invI;var n=this.m_bodyA.c_position.a,r=this.m_bodyA.c_velocity.v,s=this.m_bodyA.c_velocity.w,o=this.m_bodyB.c_position.a,a=this.m_bodyB.c_velocity.v,l=this.m_bodyB.c_velocity.w,h=this.m_bodyC.c_position.a,_=this.m_bodyC.c_velocity.v,p=this.m_bodyC.c_velocity.w,c=this.m_bodyD.c_position.a,m=this.m_bodyD.c_velocity.v,f=this.m_bodyD.c_velocity.w,d=k.neo(n),v=k.neo(o),y=k.neo(h),x=k.neo(c);if(this.m_mass=0,this.m_type1==Ie.TYPE)this.m_JvAC=u.zero(),this.m_JwA=1,this.m_JwC=1,this.m_mass+=this.m_iA+this.m_iC;else{var b=k.mulVec2(y,this.m_localAxisC),B=k.mulSub(y,this.m_localAnchorC,this.m_lcC),A=k.mulSub(d,this.m_localAnchorA,this.m_lcA);this.m_JvAC=b,this.m_JwC=u.crossVec2Vec2(B,b),this.m_JwA=u.crossVec2Vec2(A,b),this.m_mass+=this.m_mC+this.m_mA+this.m_iC*this.m_JwC*this.m_JwC+this.m_iA*this.m_JwA*this.m_JwA}if(this.m_type2==Ie.TYPE)this.m_JvBD=u.zero(),this.m_JwB=this.m_ratio,this.m_JwD=this.m_ratio,this.m_mass+=this.m_ratio*this.m_ratio*(this.m_iB+this.m_iD);else{var b=k.mulVec2(x,this.m_localAxisD),M=k.mulSub(x,this.m_localAnchorD,this.m_lcD),C=k.mulSub(v,this.m_localAnchorB,this.m_lcB);this.m_JvBD=u.mulNumVec2(this.m_ratio,b),this.m_JwD=this.m_ratio*u.crossVec2Vec2(M,b),this.m_JwB=this.m_ratio*u.crossVec2Vec2(C,b),this.m_mass+=this.m_ratio*this.m_ratio*(this.m_mD+this.m_mB)+this.m_iD*this.m_JwD*this.m_JwD+this.m_iB*this.m_JwB*this.m_JwB}this.m_mass=this.m_mass>0?1/this.m_mass:0,e.warmStarting?(r.addMul(this.m_mA*this.m_impulse,this.m_JvAC),s+=this.m_iA*this.m_impulse*this.m_JwA,a.addMul(this.m_mB*this.m_impulse,this.m_JvBD),l+=this.m_iB*this.m_impulse*this.m_JwB,_.subMul(this.m_mC*this.m_impulse,this.m_JvAC),p-=this.m_iC*this.m_impulse*this.m_JwC,m.subMul(this.m_mD*this.m_impulse,this.m_JvBD),f-=this.m_iD*this.m_impulse*this.m_JwD):this.m_impulse=0,this.m_bodyA.c_velocity.v.setVec2(r),this.m_bodyA.c_velocity.w=s,this.m_bodyB.c_velocity.v.setVec2(a),this.m_bodyB.c_velocity.w=l,this.m_bodyC.c_velocity.v.setVec2(_),this.m_bodyC.c_velocity.w=p,this.m_bodyD.c_velocity.v.setVec2(m),this.m_bodyD.c_velocity.w=f},t.prototype.solveVelocityConstraints=function(e){var n=this.m_bodyA.c_velocity.v,r=this.m_bodyA.c_velocity.w,s=this.m_bodyB.c_velocity.v,o=this.m_bodyB.c_velocity.w,a=this.m_bodyC.c_velocity.v,l=this.m_bodyC.c_velocity.w,h=this.m_bodyD.c_velocity.v,_=this.m_bodyD.c_velocity.w,p=u.dot(this.m_JvAC,n)-u.dot(this.m_JvAC,a)+u.dot(this.m_JvBD,s)-u.dot(this.m_JvBD,h);p+=this.m_JwA*r-this.m_JwC*l+(this.m_JwB*o-this.m_JwD*_);var c=-this.m_mass*p;this.m_impulse+=c,n.addMul(this.m_mA*c,this.m_JvAC),r+=this.m_iA*c*this.m_JwA,s.addMul(this.m_mB*c,this.m_JvBD),o+=this.m_iB*c*this.m_JwB,a.subMul(this.m_mC*c,this.m_JvAC),l-=this.m_iC*c*this.m_JwC,h.subMul(this.m_mD*c,this.m_JvBD),_-=this.m_iD*c*this.m_JwD,this.m_bodyA.c_velocity.v.setVec2(n),this.m_bodyA.c_velocity.w=r,this.m_bodyB.c_velocity.v.setVec2(s),this.m_bodyB.c_velocity.w=o,this.m_bodyC.c_velocity.v.setVec2(a),this.m_bodyC.c_velocity.w=l,this.m_bodyD.c_velocity.v.setVec2(h),this.m_bodyD.c_velocity.w=_},t.prototype.solvePositionConstraints=function(e){var n=this.m_bodyA.c_position.c,r=this.m_bodyA.c_position.a,s=this.m_bodyB.c_position.c,o=this.m_bodyB.c_position.a,a=this.m_bodyC.c_position.c,l=this.m_bodyC.c_position.a,h=this.m_bodyD.c_position.c,_=this.m_bodyD.c_position.a,p=k.neo(r),c=k.neo(o),m=k.neo(l),f=k.neo(_),d=0,v,y,x,b,B,A,M,C,I=0;if(this.m_type1==Ie.TYPE)x=u.zero(),B=1,M=1,I+=this.m_iA+this.m_iC,v=r-l-this.m_referenceAngleA;else{var T=k.mulVec2(m,this.m_localAxisC),L=k.mulSub(m,this.m_localAnchorC,this.m_lcC),q=k.mulSub(p,this.m_localAnchorA,this.m_lcA);x=T,M=u.crossVec2Vec2(L,T),B=u.crossVec2Vec2(q,T),I+=this.m_mC+this.m_mA+this.m_iC*M*M+this.m_iA*B*B;var $=u.sub(this.m_localAnchorC,this.m_lcC),j=k.mulTVec2(m,u.add(q,u.sub(n,a)));v=u.dot(u.sub(j,$),this.m_localAxisC)}if(this.m_type2==Ie.TYPE)b=u.zero(),A=this.m_ratio,C=this.m_ratio,I+=this.m_ratio*this.m_ratio*(this.m_iB+this.m_iD),y=o-_-this.m_referenceAngleB;else{var T=k.mulVec2(f,this.m_localAxisD),G=k.mulSub(f,this.m_localAnchorD,this.m_lcD),Lt=k.mulSub(c,this.m_localAnchorB,this.m_lcB);b=u.mulNumVec2(this.m_ratio,T),C=this.m_ratio*u.crossVec2Vec2(G,T),A=this.m_ratio*u.crossVec2Vec2(Lt,T),I+=this.m_ratio*this.m_ratio*(this.m_mD+this.m_mB)+this.m_iD*C*C+this.m_iB*A*A;var ft=u.sub(this.m_localAnchorD,this.m_lcD),Zt=k.mulTVec2(f,u.add(Lt,u.sub(s,h)));y=u.dot(Zt,this.m_localAxisD)-u.dot(ft,this.m_localAxisD)}var Ct=v+this.m_ratio*y-this.m_constant,nt=0;return I>0&&(nt=-Ct/I),n.addMul(this.m_mA*nt,x),r+=this.m_iA*nt*B,s.addMul(this.m_mB*nt,b),o+=this.m_iB*nt*A,a.subMul(this.m_mC*nt,x),l-=this.m_iC*nt*M,h.subMul(this.m_mD*nt,b),_-=this.m_iD*nt*C,this.m_bodyA.c_position.c.setVec2(n),this.m_bodyA.c_position.a=r,this.m_bodyB.c_position.c.setVec2(s),this.m_bodyB.c_position.a=o,this.m_bodyC.c_position.c.setVec2(a),this.m_bodyC.c_position.a=l,this.m_bodyD.c_position.c.setVec2(h),this.m_bodyD.c_position.a=_,d<P.linearSlop},t.TYPE="gear-joint",t})(bt),Lc={maxForce:1,maxTorque:1,correctionFactor:.3},Vo=(function(i){wt(t,i);function t(e,n,r){var s=this;return s instanceof t?(e=Rt(e,Lc),s=i.call(this,e,n,r)||this,n=s.m_bodyA,r=s.m_bodyB,s.m_type=t.TYPE,s.m_linearOffset=u.isValid(e.linearOffset)?u.clone(e.linearOffset):n.getLocalPoint(r.getPosition()),s.m_angularOffset=Number.isFinite(e.angularOffset)?e.angularOffset:r.getAngle()-n.getAngle(),s.m_linearImpulse=u.zero(),s.m_angularImpulse=0,s.m_maxForce=e.maxForce,s.m_maxTorque=e.maxTorque,s.m_correctionFactor=e.correctionFactor,s):new t(e,n,r)}return t.prototype._serialize=function(){return{type:this.m_type,bodyA:this.m_bodyA,bodyB:this.m_bodyB,collideConnected:this.m_collideConnected,maxForce:this.m_maxForce,maxTorque:this.m_maxTorque,correctionFactor:this.m_correctionFactor,linearOffset:this.m_linearOffset,angularOffset:this.m_angularOffset}},t._deserialize=function(e,n,r){e=At({},e),e.bodyA=r(Y,e.bodyA,n),e.bodyB=r(Y,e.bodyB,n);var s=new t(e);return s},t.prototype._reset=function(e){Number.isFinite(e.angularOffset)&&(this.m_angularOffset=e.angularOffset),Number.isFinite(e.maxForce)&&(this.m_maxForce=e.maxForce),Number.isFinite(e.maxTorque)&&(this.m_maxTorque=e.maxTorque),Number.isFinite(e.correctionFactor)&&(this.m_correctionFactor=e.correctionFactor),u.isValid(e.linearOffset)&&this.m_linearOffset.set(e.linearOffset)},t.prototype.setMaxForce=function(e){this.m_maxForce=e},t.prototype.getMaxForce=function(){return this.m_maxForce},t.prototype.setMaxTorque=function(e){this.m_maxTorque=e},t.prototype.getMaxTorque=function(){return this.m_maxTorque},t.prototype.setCorrectionFactor=function(e){this.m_correctionFactor=e},t.prototype.getCorrectionFactor=function(){return this.m_correctionFactor},t.prototype.setLinearOffset=function(e){(e.x!=this.m_linearOffset.x||e.y!=this.m_linearOffset.y)&&(this.m_bodyA.setAwake(!0),this.m_bodyB.setAwake(!0),this.m_linearOffset.set(e))},t.prototype.getLinearOffset=function(){return this.m_linearOffset},t.prototype.setAngularOffset=function(e){e!=this.m_angularOffset&&(this.m_bodyA.setAwake(!0),this.m_bodyB.setAwake(!0),this.m_angularOffset=e)},t.prototype.getAngularOffset=function(){return this.m_angularOffset},t.prototype.getAnchorA=function(){return this.m_bodyA.getPosition()},t.prototype.getAnchorB=function(){return this.m_bodyB.getPosition()},t.prototype.getReactionForce=function(e){return u.mulNumVec2(e,this.m_linearImpulse)},t.prototype.getReactionTorque=function(e){return e*this.m_angularImpulse},t.prototype.initVelocityConstraints=function(e){this.m_localCenterA=this.m_bodyA.m_sweep.localCenter,this.m_localCenterB=this.m_bodyB.m_sweep.localCenter,this.m_invMassA=this.m_bodyA.m_invMass,this.m_invMassB=this.m_bodyB.m_invMass,this.m_invIA=this.m_bodyA.m_invI,this.m_invIB=this.m_bodyB.m_invI;var n=this.m_bodyA.c_position.c,r=this.m_bodyA.c_position.a,s=this.m_bodyA.c_velocity.v,o=this.m_bodyA.c_velocity.w,a=this.m_bodyB.c_position.c,l=this.m_bodyB.c_position.a,h=this.m_bodyB.c_velocity.v,_=this.m_bodyB.c_velocity.w,p=k.neo(r),c=k.neo(l);this.m_rA=k.mulVec2(p,u.sub(this.m_linearOffset,this.m_localCenterA)),this.m_rB=k.mulVec2(c,u.neg(this.m_localCenterB));var m=this.m_invMassA,f=this.m_invMassB,d=this.m_invIA,v=this.m_invIB,y=new ae;if(y.ex.x=m+f+d*this.m_rA.y*this.m_rA.y+v*this.m_rB.y*this.m_rB.y,y.ex.y=-d*this.m_rA.x*this.m_rA.y-v*this.m_rB.x*this.m_rB.y,y.ey.x=y.ex.y,y.ey.y=m+f+d*this.m_rA.x*this.m_rA.x+v*this.m_rB.x*this.m_rB.x,this.m_linearMass=y.getInverse(),this.m_angularMass=d+v,this.m_angularMass>0&&(this.m_angularMass=1/this.m_angularMass),this.m_linearError=u.zero(),this.m_linearError.addCombine(1,a,1,this.m_rB),this.m_linearError.subCombine(1,n,1,this.m_rA),this.m_angularError=l-r-this.m_angularOffset,e.warmStarting){this.m_linearImpulse.mul(e.dtRatio),this.m_angularImpulse*=e.dtRatio;var x=u.neo(this.m_linearImpulse.x,this.m_linearImpulse.y);s.subMul(m,x),o-=d*(u.crossVec2Vec2(this.m_rA,x)+this.m_angularImpulse),h.addMul(f,x),_+=v*(u.crossVec2Vec2(this.m_rB,x)+this.m_angularImpulse)}else this.m_linearImpulse.setZero(),this.m_angularImpulse=0;this.m_bodyA.c_velocity.v=s,this.m_bodyA.c_velocity.w=o,this.m_bodyB.c_velocity.v=h,this.m_bodyB.c_velocity.w=_},t.prototype.solveVelocityConstraints=function(e){var n=this.m_bodyA.c_velocity.v,r=this.m_bodyA.c_velocity.w,s=this.m_bodyB.c_velocity.v,o=this.m_bodyB.c_velocity.w,a=this.m_invMassA,l=this.m_invMassB,h=this.m_invIA,_=this.m_invIB,p=e.dt,c=e.inv_dt;{var m=o-r+c*this.m_correctionFactor*this.m_angularError,f=-this.m_angularMass*m,d=this.m_angularImpulse,v=p*this.m_maxTorque;this.m_angularImpulse=yt(this.m_angularImpulse+f,-v,v),f=this.m_angularImpulse-d,r-=h*f,o+=_*f}{var m=u.zero();m.addCombine(1,s,1,u.crossNumVec2(o,this.m_rB)),m.subCombine(1,n,1,u.crossNumVec2(r,this.m_rA)),m.addMul(c*this.m_correctionFactor,this.m_linearError);var f=u.neg(ae.mulVec2(this.m_linearMass,m)),d=u.clone(this.m_linearImpulse);this.m_linearImpulse.add(f);var v=p*this.m_maxForce;this.m_linearImpulse.clamp(v),f=u.sub(this.m_linearImpulse,d),n.subMul(a,f),r-=h*u.crossVec2Vec2(this.m_rA,f),s.addMul(l,f),o+=_*u.crossVec2Vec2(this.m_rB,f)}this.m_bodyA.c_velocity.v=n,this.m_bodyA.c_velocity.w=r,this.m_bodyB.c_velocity.v=s,this.m_bodyB.c_velocity.w=o},t.prototype.solvePositionConstraints=function(e){return!0},t.TYPE="motor-joint",t})(bt),Tc=Math.PI,zc={maxForce:0,frequencyHz:5,dampingRatio:.7},So=(function(i){wt(t,i);function t(e,n,r,s){var o=this;return o instanceof t?(e=Rt(e,zc),o=i.call(this,e,n,r)||this,n=o.m_bodyA,r=o.m_bodyB,o.m_type=t.TYPE,u.isValid(s)?o.m_targetA=u.clone(s):u.isValid(e.target)?o.m_targetA=u.clone(e.target):o.m_targetA=u.zero(),o.m_localAnchorB=oe.mulTVec2(r.getTransform(),o.m_targetA),o.m_maxForce=e.maxForce,o.m_impulse=u.zero(),o.m_frequencyHz=e.frequencyHz,o.m_dampingRatio=e.dampingRatio,o.m_beta=0,o.m_gamma=0,o.m_rB=u.zero(),o.m_localCenterB=u.zero(),o.m_invMassB=0,o.m_invIB=0,o.m_mass=new ae,o.m_C=u.zero(),o):new t(e,n,r,s)}return t.prototype._serialize=function(){return{type:this.m_type,bodyA:this.m_bodyA,bodyB:this.m_bodyB,collideConnected:this.m_collideConnected,target:this.m_targetA,maxForce:this.m_maxForce,frequencyHz:this.m_frequencyHz,dampingRatio:this.m_dampingRatio,_localAnchorB:this.m_localAnchorB}},t._deserialize=function(e,n,r){e=At({},e),e.bodyA=r(Y,e.bodyA,n),e.bodyB=r(Y,e.bodyB,n),e.target=u.clone(e.target);var s=new t(e);return e._localAnchorB&&(s.m_localAnchorB=e._localAnchorB),s},t.prototype._reset=function(e){Number.isFinite(e.maxForce)&&(this.m_maxForce=e.maxForce),Number.isFinite(e.frequencyHz)&&(this.m_frequencyHz=e.frequencyHz),Number.isFinite(e.dampingRatio)&&(this.m_dampingRatio=e.dampingRatio)},t.prototype.setTarget=function(e){u.areEqual(e,this.m_targetA)||(this.m_bodyB.setAwake(!0),this.m_targetA.set(e))},t.prototype.getTarget=function(){return this.m_targetA},t.prototype.setMaxForce=function(e){this.m_maxForce=e},t.prototype.getMaxForce=function(){return this.m_maxForce},t.prototype.setFrequency=function(e){this.m_frequencyHz=e},t.prototype.getFrequency=function(){return this.m_frequencyHz},t.prototype.setDampingRatio=function(e){this.m_dampingRatio=e},t.prototype.getDampingRatio=function(){return this.m_dampingRatio},t.prototype.getAnchorA=function(){return u.clone(this.m_targetA)},t.prototype.getAnchorB=function(){return this.m_bodyB.getWorldPoint(this.m_localAnchorB)},t.prototype.getReactionForce=function(e){return u.mulNumVec2(e,this.m_impulse)},t.prototype.getReactionTorque=function(e){return e*0},t.prototype.shiftOrigin=function(e){this.m_targetA.sub(e)},t.prototype.initVelocityConstraints=function(e){this.m_localCenterB=this.m_bodyB.m_sweep.localCenter,this.m_invMassB=this.m_bodyB.m_invMass,this.m_invIB=this.m_bodyB.m_invI;var n=this.m_bodyB.c_position,r=this.m_bodyB.c_velocity,s=n.c,o=n.a,a=r.v,l=r.w,h=k.neo(o),_=this.m_bodyB.getMass(),p=2*Tc*this.m_frequencyHz,c=2*_*this.m_dampingRatio*p,m=_*(p*p),f=e.dt;this.m_gamma=f*(c+f*m),this.m_gamma!=0&&(this.m_gamma=1/this.m_gamma),this.m_beta=f*m*this.m_gamma,this.m_rB=k.mulVec2(h,u.sub(this.m_localAnchorB,this.m_localCenterB));var d=new ae;d.ex.x=this.m_invMassB+this.m_invIB*this.m_rB.y*this.m_rB.y+this.m_gamma,d.ex.y=-this.m_invIB*this.m_rB.x*this.m_rB.y,d.ey.x=d.ex.y,d.ey.y=this.m_invMassB+this.m_invIB*this.m_rB.x*this.m_rB.x+this.m_gamma,this.m_mass=d.getInverse(),this.m_C.setVec2(s),this.m_C.addCombine(1,this.m_rB,-1,this.m_targetA),this.m_C.mul(this.m_beta),l*=.98,e.warmStarting?(this.m_impulse.mul(e.dtRatio),a.addMul(this.m_invMassB,this.m_impulse),l+=this.m_invIB*u.crossVec2Vec2(this.m_rB,this.m_impulse)):this.m_impulse.setZero(),r.v.setVec2(a),r.w=l},t.prototype.solveVelocityConstraints=function(e){var n=this.m_bodyB.c_velocity,r=u.clone(n.v),s=n.w,o=u.crossNumVec2(s,this.m_rB);o.add(r),o.addCombine(1,this.m_C,this.m_gamma,this.m_impulse),o.neg();var a=ae.mulVec2(this.m_mass,o),l=u.clone(this.m_impulse);this.m_impulse.add(a);var h=e.dt*this.m_maxForce;this.m_impulse.clamp(h),a=u.sub(this.m_impulse,l),r.addMul(this.m_invMassB,a),s+=this.m_invIB*u.crossVec2Vec2(this.m_rB,a),n.v.setVec2(r),n.w=s},t.prototype.solvePositionConstraints=function(e){return!0},t.TYPE="mouse-joint",t})(bt),Fc=Math.abs,qc={collideConnected:!0},Io=(function(i){wt(t,i);function t(e,n,r,s,o,a,l,h){var _=this;return _ instanceof t?(e=Rt(e,qc),_=i.call(this,e,n,r)||this,n=_.m_bodyA,r=_.m_bodyB,_.m_type=t.TYPE,_.m_groundAnchorA=u.clone(s||e.groundAnchorA||u.neo(-1,1)),_.m_groundAnchorB=u.clone(o||e.groundAnchorB||u.neo(1,1)),_.m_localAnchorA=u.clone(a?n.getLocalPoint(a):e.localAnchorA||u.neo(-1,0)),_.m_localAnchorB=u.clone(l?r.getLocalPoint(l):e.localAnchorB||u.neo(1,0)),_.m_lengthA=Number.isFinite(e.lengthA)?e.lengthA:u.distance(a,s),_.m_lengthB=Number.isFinite(e.lengthB)?e.lengthB:u.distance(l,o),_.m_ratio=Number.isFinite(h)?h:e.ratio,_.m_constant=_.m_lengthA+_.m_ratio*_.m_lengthB,_.m_impulse=0,_):new t(e,n,r,s,o,a,l,h)}return t.prototype._serialize=function(){return{type:this.m_type,bodyA:this.m_bodyA,bodyB:this.m_bodyB,collideConnected:this.m_collideConnected,groundAnchorA:this.m_groundAnchorA,groundAnchorB:this.m_groundAnchorB,localAnchorA:this.m_localAnchorA,localAnchorB:this.m_localAnchorB,lengthA:this.m_lengthA,lengthB:this.m_lengthB,ratio:this.m_ratio}},t._deserialize=function(e,n,r){e=At({},e),e.bodyA=r(Y,e.bodyA,n),e.bodyB=r(Y,e.bodyB,n);var s=new t(e);return s},t.prototype._reset=function(e){u.isValid(e.groundAnchorA)&&this.m_groundAnchorA.set(e.groundAnchorA),u.isValid(e.groundAnchorB)&&this.m_groundAnchorB.set(e.groundAnchorB),u.isValid(e.localAnchorA)?this.m_localAnchorA.set(e.localAnchorA):u.isValid(e.anchorA)&&this.m_localAnchorA.set(this.m_bodyA.getLocalPoint(e.anchorA)),u.isValid(e.localAnchorB)?this.m_localAnchorB.set(e.localAnchorB):u.isValid(e.anchorB)&&this.m_localAnchorB.set(this.m_bodyB.getLocalPoint(e.anchorB)),Number.isFinite(e.lengthA)&&(this.m_lengthA=e.lengthA),Number.isFinite(e.lengthB)&&(this.m_lengthB=e.lengthB),Number.isFinite(e.ratio)&&(this.m_ratio=e.ratio)},t.prototype.getGroundAnchorA=function(){return this.m_groundAnchorA},t.prototype.getGroundAnchorB=function(){return this.m_groundAnchorB},t.prototype.getLengthA=function(){return this.m_lengthA},t.prototype.getLengthB=function(){return this.m_lengthB},t.prototype.getRatio=function(){return this.m_ratio},t.prototype.getCurrentLengthA=function(){var e=this.m_bodyA.getWorldPoint(this.m_localAnchorA),n=this.m_groundAnchorA;return u.distance(e,n)},t.prototype.getCurrentLengthB=function(){var e=this.m_bodyB.getWorldPoint(this.m_localAnchorB),n=this.m_groundAnchorB;return u.distance(e,n)},t.prototype.shiftOrigin=function(e){this.m_groundAnchorA.sub(e),this.m_groundAnchorB.sub(e)},t.prototype.getAnchorA=function(){return this.m_bodyA.getWorldPoint(this.m_localAnchorA)},t.prototype.getAnchorB=function(){return this.m_bodyB.getWorldPoint(this.m_localAnchorB)},t.prototype.getReactionForce=function(e){return u.mulNumVec2(this.m_impulse,this.m_uB).mul(e)},t.prototype.getReactionTorque=function(e){return 0},t.prototype.initVelocityConstraints=function(e){this.m_localCenterA=this.m_bodyA.m_sweep.localCenter,this.m_localCenterB=this.m_bodyB.m_sweep.localCenter,this.m_invMassA=this.m_bodyA.m_invMass,this.m_invMassB=this.m_bodyB.m_invMass,this.m_invIA=this.m_bodyA.m_invI,this.m_invIB=this.m_bodyB.m_invI;var n=this.m_bodyA.c_position.c,r=this.m_bodyA.c_position.a,s=this.m_bodyA.c_velocity.v,o=this.m_bodyA.c_velocity.w,a=this.m_bodyB.c_position.c,l=this.m_bodyB.c_position.a,h=this.m_bodyB.c_velocity.v,_=this.m_bodyB.c_velocity.w,p=k.neo(r),c=k.neo(l);this.m_rA=k.mulVec2(p,u.sub(this.m_localAnchorA,this.m_localCenterA)),this.m_rB=k.mulVec2(c,u.sub(this.m_localAnchorB,this.m_localCenterB)),this.m_uA=u.sub(u.add(n,this.m_rA),this.m_groundAnchorA),this.m_uB=u.sub(u.add(a,this.m_rB),this.m_groundAnchorB);var m=this.m_uA.length(),f=this.m_uB.length();m>10*P.linearSlop?this.m_uA.mul(1/m):this.m_uA.setZero(),f>10*P.linearSlop?this.m_uB.mul(1/f):this.m_uB.setZero();var d=u.crossVec2Vec2(this.m_rA,this.m_uA),v=u.crossVec2Vec2(this.m_rB,this.m_uB),y=this.m_invMassA+this.m_invIA*d*d,x=this.m_invMassB+this.m_invIB*v*v;if(this.m_mass=y+this.m_ratio*this.m_ratio*x,this.m_mass>0&&(this.m_mass=1/this.m_mass),e.warmStarting){this.m_impulse*=e.dtRatio;var b=u.mulNumVec2(-this.m_impulse,this.m_uA),B=u.mulNumVec2(-this.m_ratio*this.m_impulse,this.m_uB);s.addMul(this.m_invMassA,b),o+=this.m_invIA*u.crossVec2Vec2(this.m_rA,b),h.addMul(this.m_invMassB,B),_+=this.m_invIB*u.crossVec2Vec2(this.m_rB,B)}else this.m_impulse=0;this.m_bodyA.c_velocity.v=s,this.m_bodyA.c_velocity.w=o,this.m_bodyB.c_velocity.v=h,this.m_bodyB.c_velocity.w=_},t.prototype.solveVelocityConstraints=function(e){var n=this.m_bodyA.c_velocity.v,r=this.m_bodyA.c_velocity.w,s=this.m_bodyB.c_velocity.v,o=this.m_bodyB.c_velocity.w,a=u.add(n,u.crossNumVec2(r,this.m_rA)),l=u.add(s,u.crossNumVec2(o,this.m_rB)),h=-u.dot(this.m_uA,a)-this.m_ratio*u.dot(this.m_uB,l),_=-this.m_mass*h;this.m_impulse+=_;var p=u.mulNumVec2(-_,this.m_uA),c=u.mulNumVec2(-this.m_ratio*_,this.m_uB);n.addMul(this.m_invMassA,p),r+=this.m_invIA*u.crossVec2Vec2(this.m_rA,p),s.addMul(this.m_invMassB,c),o+=this.m_invIB*u.crossVec2Vec2(this.m_rB,c),this.m_bodyA.c_velocity.v=n,this.m_bodyA.c_velocity.w=r,this.m_bodyB.c_velocity.v=s,this.m_bodyB.c_velocity.w=o},t.prototype.solvePositionConstraints=function(e){var n=this.m_bodyA.c_position.c,r=this.m_bodyA.c_position.a,s=this.m_bodyB.c_position.c,o=this.m_bodyB.c_position.a,a=k.neo(r),l=k.neo(o),h=k.mulVec2(a,u.sub(this.m_localAnchorA,this.m_localCenterA)),_=k.mulVec2(l,u.sub(this.m_localAnchorB,this.m_localCenterB)),p=u.sub(u.add(n,this.m_rA),this.m_groundAnchorA),c=u.sub(u.add(s,this.m_rB),this.m_groundAnchorB),m=p.length(),f=c.length();m>10*P.linearSlop?p.mul(1/m):p.setZero(),f>10*P.linearSlop?c.mul(1/f):c.setZero();var d=u.crossVec2Vec2(h,p),v=u.crossVec2Vec2(_,c),y=this.m_invMassA+this.m_invIA*d*d,x=this.m_invMassB+this.m_invIB*v*v,b=y+this.m_ratio*this.m_ratio*x;b>0&&(b=1/b);var B=this.m_constant-m-this.m_ratio*f,A=Fc(B),M=-b*B,C=u.mulNumVec2(-M,p),I=u.mulNumVec2(-this.m_ratio*M,c);return n.addMul(this.m_invMassA,C),r+=this.m_invIA*u.crossVec2Vec2(h,C),s.addMul(this.m_invMassB,I),o+=this.m_invIB*u.crossVec2Vec2(_,I),this.m_bodyA.c_position.c=n,this.m_bodyA.c_position.a=r,this.m_bodyB.c_position.c=s,this.m_bodyB.c_position.a=o,A<P.linearSlop},t.TYPE="pulley-joint",t})(bt),Ec=Math.min,sn;(function(i){i[i.inactiveLimit=0]="inactiveLimit",i[i.atLowerLimit=1]="atLowerLimit",i[i.atUpperLimit=2]="atUpperLimit",i[i.equalLimits=3]="equalLimits"})(sn||(sn={}));var Dc={maxLength:0},Po=(function(i){wt(t,i);function t(e,n,r,s){var o=this;return o instanceof t?(e=Rt(e,Dc),o=i.call(this,e,n,r)||this,n=o.m_bodyA,r=o.m_bodyB,o.m_type=t.TYPE,o.m_localAnchorA=u.clone(s?n.getLocalPoint(s):e.localAnchorA||u.neo(-1,0)),o.m_localAnchorB=u.clone(s?r.getLocalPoint(s):e.localAnchorB||u.neo(1,0)),o.m_maxLength=e.maxLength,o.m_mass=0,o.m_impulse=0,o.m_length=0,o.m_state=sn.inactiveLimit,o):new t(e,n,r,s)}return t.prototype._serialize=function(){return{type:this.m_type,bodyA:this.m_bodyA,bodyB:this.m_bodyB,collideConnected:this.m_collideConnected,localAnchorA:this.m_localAnchorA,localAnchorB:this.m_localAnchorB,maxLength:this.m_maxLength}},t._deserialize=function(e,n,r){e=At({},e),e.bodyA=r(Y,e.bodyA,n),e.bodyB=r(Y,e.bodyB,n);var s=new t(e);return s},t.prototype._reset=function(e){Number.isFinite(e.maxLength)&&(this.m_maxLength=e.maxLength)},t.prototype.getLocalAnchorA=function(){return this.m_localAnchorA},t.prototype.getLocalAnchorB=function(){return this.m_localAnchorB},t.prototype.setMaxLength=function(e){this.m_maxLength=e},t.prototype.getMaxLength=function(){return this.m_maxLength},t.prototype.getLimitState=function(){return this.m_state},t.prototype.getAnchorA=function(){return this.m_bodyA.getWorldPoint(this.m_localAnchorA)},t.prototype.getAnchorB=function(){return this.m_bodyB.getWorldPoint(this.m_localAnchorB)},t.prototype.getReactionForce=function(e){return u.mulNumVec2(this.m_impulse,this.m_u).mul(e)},t.prototype.getReactionTorque=function(e){return 0},t.prototype.initVelocityConstraints=function(e){this.m_localCenterA=this.m_bodyA.m_sweep.localCenter,this.m_localCenterB=this.m_bodyB.m_sweep.localCenter,this.m_invMassA=this.m_bodyA.m_invMass,this.m_invMassB=this.m_bodyB.m_invMass,this.m_invIA=this.m_bodyA.m_invI,this.m_invIB=this.m_bodyB.m_invI;var n=this.m_bodyA.c_position.c,r=this.m_bodyA.c_position.a,s=this.m_bodyA.c_velocity.v,o=this.m_bodyA.c_velocity.w,a=this.m_bodyB.c_position.c,l=this.m_bodyB.c_position.a,h=this.m_bodyB.c_velocity.v,_=this.m_bodyB.c_velocity.w,p=k.neo(r),c=k.neo(l);this.m_rA=k.mulSub(p,this.m_localAnchorA,this.m_localCenterA),this.m_rB=k.mulSub(c,this.m_localAnchorB,this.m_localCenterB),this.m_u=u.zero(),this.m_u.addCombine(1,a,1,this.m_rB),this.m_u.subCombine(1,n,1,this.m_rA),this.m_length=this.m_u.length();var m=this.m_length-this.m_maxLength;if(m>0?this.m_state=sn.atUpperLimit:this.m_state=sn.inactiveLimit,this.m_length>P.linearSlop)this.m_u.mul(1/this.m_length);else{this.m_u.setZero(),this.m_mass=0,this.m_impulse=0;return}var f=u.crossVec2Vec2(this.m_rA,this.m_u),d=u.crossVec2Vec2(this.m_rB,this.m_u),v=this.m_invMassA+this.m_invIA*f*f+this.m_invMassB+this.m_invIB*d*d;if(this.m_mass=v!=0?1/v:0,e.warmStarting){this.m_impulse*=e.dtRatio;var y=u.mulNumVec2(this.m_impulse,this.m_u);s.subMul(this.m_invMassA,y),o-=this.m_invIA*u.crossVec2Vec2(this.m_rA,y),h.addMul(this.m_invMassB,y),_+=this.m_invIB*u.crossVec2Vec2(this.m_rB,y)}else this.m_impulse=0;this.m_bodyA.c_velocity.v.setVec2(s),this.m_bodyA.c_velocity.w=o,this.m_bodyB.c_velocity.v.setVec2(h),this.m_bodyB.c_velocity.w=_},t.prototype.solveVelocityConstraints=function(e){var n=this.m_bodyA.c_velocity.v,r=this.m_bodyA.c_velocity.w,s=this.m_bodyB.c_velocity.v,o=this.m_bodyB.c_velocity.w,a=u.addCrossNumVec2(n,r,this.m_rA),l=u.addCrossNumVec2(s,o,this.m_rB),h=this.m_length-this.m_maxLength,_=u.dot(this.m_u,u.sub(l,a));h<0&&(_+=e.inv_dt*h);var p=-this.m_mass*_,c=this.m_impulse;this.m_impulse=Ec(0,this.m_impulse+p),p=this.m_impulse-c;var m=u.mulNumVec2(p,this.m_u);n.subMul(this.m_invMassA,m),r-=this.m_invIA*u.crossVec2Vec2(this.m_rA,m),s.addMul(this.m_invMassB,m),o+=this.m_invIB*u.crossVec2Vec2(this.m_rB,m),this.m_bodyA.c_velocity.v=n,this.m_bodyA.c_velocity.w=r,this.m_bodyB.c_velocity.v=s,this.m_bodyB.c_velocity.w=o},t.prototype.solvePositionConstraints=function(e){var n=this.m_bodyA.c_position.c,r=this.m_bodyA.c_position.a,s=this.m_bodyB.c_position.c,o=this.m_bodyB.c_position.a,a=k.neo(r),l=k.neo(o),h=k.mulSub(a,this.m_localAnchorA,this.m_localCenterA),_=k.mulSub(l,this.m_localAnchorB,this.m_localCenterB),p=u.zero();p.addCombine(1,s,1,_),p.subCombine(1,n,1,h);var c=p.normalize(),m=c-this.m_maxLength;m=yt(m,0,P.maxLinearCorrection);var f=-this.m_mass*m,d=u.mulNumVec2(f,p);return n.subMul(this.m_invMassA,d),r-=this.m_invIA*u.crossVec2Vec2(h,d),s.addMul(this.m_invMassB,d),o+=this.m_invIB*u.crossVec2Vec2(_,d),this.m_bodyA.c_position.c.setVec2(n),this.m_bodyA.c_position.a=r,this.m_bodyB.c_position.c.setVec2(s),this.m_bodyB.c_position.a=o,c-this.m_maxLength<P.linearSlop},t.TYPE="rope-joint",t})(bt),Nc=Math.abs,Rc=Math.PI,Oc={frequencyHz:0,dampingRatio:0},Lo=(function(i){wt(t,i);function t(e,n,r,s){var o=this;return o instanceof t?(e=Rt(e,Oc),o=i.call(this,e,n,r)||this,n=o.m_bodyA,r=o.m_bodyB,o.m_type=t.TYPE,o.m_localAnchorA=u.clone(s?n.getLocalPoint(s):e.localAnchorA||u.zero()),o.m_localAnchorB=u.clone(s?r.getLocalPoint(s):e.localAnchorB||u.zero()),o.m_referenceAngle=Number.isFinite(e.referenceAngle)?e.referenceAngle:r.getAngle()-n.getAngle(),o.m_frequencyHz=e.frequencyHz,o.m_dampingRatio=e.dampingRatio,o.m_impulse=new J,o.m_bias=0,o.m_gamma=0,o.m_mass=new $e,o):new t(e,n,r,s)}return t.prototype._serialize=function(){return{type:this.m_type,bodyA:this.m_bodyA,bodyB:this.m_bodyB,collideConnected:this.m_collideConnected,frequencyHz:this.m_frequencyHz,dampingRatio:this.m_dampingRatio,localAnchorA:this.m_localAnchorA,localAnchorB:this.m_localAnchorB,referenceAngle:this.m_referenceAngle}},t._deserialize=function(e,n,r){e=At({},e),e.bodyA=r(Y,e.bodyA,n),e.bodyB=r(Y,e.bodyB,n);var s=new t(e);return s},t.prototype._reset=function(e){e.anchorA?this.m_localAnchorA.setVec2(this.m_bodyA.getLocalPoint(e.anchorA)):e.localAnchorA&&this.m_localAnchorA.setVec2(e.localAnchorA),e.anchorB?this.m_localAnchorB.setVec2(this.m_bodyB.getLocalPoint(e.anchorB)):e.localAnchorB&&this.m_localAnchorB.setVec2(e.localAnchorB),Number.isFinite(e.frequencyHz)&&(this.m_frequencyHz=e.frequencyHz),Number.isFinite(e.dampingRatio)&&(this.m_dampingRatio=e.dampingRatio)},t.prototype.getLocalAnchorA=function(){return this.m_localAnchorA},t.prototype.getLocalAnchorB=function(){return this.m_localAnchorB},t.prototype.getReferenceAngle=function(){return this.m_referenceAngle},t.prototype.setFrequency=function(e){this.m_frequencyHz=e},t.prototype.getFrequency=function(){return this.m_frequencyHz},t.prototype.setDampingRatio=function(e){this.m_dampingRatio=e},t.prototype.getDampingRatio=function(){return this.m_dampingRatio},t.prototype.getAnchorA=function(){return this.m_bodyA.getWorldPoint(this.m_localAnchorA)},t.prototype.getAnchorB=function(){return this.m_bodyB.getWorldPoint(this.m_localAnchorB)},t.prototype.getReactionForce=function(e){return u.neo(this.m_impulse.x,this.m_impulse.y).mul(e)},t.prototype.getReactionTorque=function(e){return e*this.m_impulse.z},t.prototype.initVelocityConstraints=function(e){this.m_localCenterA=this.m_bodyA.m_sweep.localCenter,this.m_localCenterB=this.m_bodyB.m_sweep.localCenter,this.m_invMassA=this.m_bodyA.m_invMass,this.m_invMassB=this.m_bodyB.m_invMass,this.m_invIA=this.m_bodyA.m_invI,this.m_invIB=this.m_bodyB.m_invI;var n=this.m_bodyA.c_position.a,r=this.m_bodyA.c_velocity.v,s=this.m_bodyA.c_velocity.w,o=this.m_bodyB.c_position.a,a=this.m_bodyB.c_velocity.v,l=this.m_bodyB.c_velocity.w,h=k.neo(n),_=k.neo(o);this.m_rA=k.mulVec2(h,u.sub(this.m_localAnchorA,this.m_localCenterA)),this.m_rB=k.mulVec2(_,u.sub(this.m_localAnchorB,this.m_localCenterB));var p=this.m_invMassA,c=this.m_invMassB,m=this.m_invIA,f=this.m_invIB,d=new $e;if(d.ex.x=p+c+this.m_rA.y*this.m_rA.y*m+this.m_rB.y*this.m_rB.y*f,d.ey.x=-this.m_rA.y*this.m_rA.x*m-this.m_rB.y*this.m_rB.x*f,d.ez.x=-this.m_rA.y*m-this.m_rB.y*f,d.ex.y=d.ey.x,d.ey.y=p+c+this.m_rA.x*this.m_rA.x*m+this.m_rB.x*this.m_rB.x*f,d.ez.y=this.m_rA.x*m+this.m_rB.x*f,d.ex.z=d.ez.x,d.ey.z=d.ez.y,d.ez.z=m+f,this.m_frequencyHz>0){d.getInverse22(this.m_mass);var v=m+f,y=v>0?1/v:0,x=o-n-this.m_referenceAngle,b=2*Rc*this.m_frequencyHz,B=2*y*this.m_dampingRatio*b,A=y*b*b,M=e.dt;this.m_gamma=M*(B+M*A),this.m_gamma=this.m_gamma!=0?1/this.m_gamma:0,this.m_bias=x*M*A*this.m_gamma,v+=this.m_gamma,this.m_mass.ez.z=v!=0?1/v:0}else d.ez.z==0?(d.getInverse22(this.m_mass),this.m_gamma=0,this.m_bias=0):(d.getSymInverse33(this.m_mass),this.m_gamma=0,this.m_bias=0);if(e.warmStarting){this.m_impulse.mul(e.dtRatio);var C=u.neo(this.m_impulse.x,this.m_impulse.y);r.subMul(p,C),s-=m*(u.crossVec2Vec2(this.m_rA,C)+this.m_impulse.z),a.addMul(c,C),l+=f*(u.crossVec2Vec2(this.m_rB,C)+this.m_impulse.z)}else this.m_impulse.setZero();this.m_bodyA.c_velocity.v=r,this.m_bodyA.c_velocity.w=s,this.m_bodyB.c_velocity.v=a,this.m_bodyB.c_velocity.w=l},t.prototype.solveVelocityConstraints=function(e){var n=this.m_bodyA.c_velocity.v,r=this.m_bodyA.c_velocity.w,s=this.m_bodyB.c_velocity.v,o=this.m_bodyB.c_velocity.w,a=this.m_invMassA,l=this.m_invMassB,h=this.m_invIA,_=this.m_invIB;if(this.m_frequencyHz>0){var p=o-r,c=-this.m_mass.ez.z*(p+this.m_bias+this.m_gamma*this.m_impulse.z);this.m_impulse.z+=c,r-=h*c,o+=_*c;var m=u.zero();m.addCombine(1,s,1,u.crossNumVec2(o,this.m_rB)),m.subCombine(1,n,1,u.crossNumVec2(r,this.m_rA));var f=u.neg($e.mulVec2(this.m_mass,m));this.m_impulse.x+=f.x,this.m_impulse.y+=f.y;var d=u.clone(f);n.subMul(a,d),r-=h*u.crossVec2Vec2(this.m_rA,d),s.addMul(l,d),o+=_*u.crossVec2Vec2(this.m_rB,d)}else{var m=u.zero();m.addCombine(1,s,1,u.crossNumVec2(o,this.m_rB)),m.subCombine(1,n,1,u.crossNumVec2(r,this.m_rA));var p=o-r,v=new J(m.x,m.y,p),y=J.neg($e.mulVec3(this.m_mass,v));this.m_impulse.add(y);var d=u.neo(y.x,y.y);n.subMul(a,d),r-=h*(u.crossVec2Vec2(this.m_rA,d)+y.z),s.addMul(l,d),o+=_*(u.crossVec2Vec2(this.m_rB,d)+y.z)}this.m_bodyA.c_velocity.v=n,this.m_bodyA.c_velocity.w=r,this.m_bodyB.c_velocity.v=s,this.m_bodyB.c_velocity.w=o},t.prototype.solvePositionConstraints=function(e){var n=this.m_bodyA.c_position.c,r=this.m_bodyA.c_position.a,s=this.m_bodyB.c_position.c,o=this.m_bodyB.c_position.a,a=k.neo(r),l=k.neo(o),h=this.m_invMassA,_=this.m_invMassB,p=this.m_invIA,c=this.m_invIB,m=k.mulVec2(a,u.sub(this.m_localAnchorA,this.m_localCenterA)),f=k.mulVec2(l,u.sub(this.m_localAnchorB,this.m_localCenterB)),d,v,y=new $e;if(y.ex.x=h+_+m.y*m.y*p+f.y*f.y*c,y.ey.x=-m.y*m.x*p-f.y*f.x*c,y.ez.x=-m.y*p-f.y*c,y.ex.y=y.ey.x,y.ey.y=h+_+m.x*m.x*p+f.x*f.x*c,y.ez.y=m.x*p+f.x*c,y.ex.z=y.ez.x,y.ey.z=y.ez.y,y.ez.z=p+c,this.m_frequencyHz>0){var x=u.zero();x.addCombine(1,s,1,f),x.subCombine(1,n,1,m),d=x.length(),v=0;var b=u.neg(y.solve22(x));n.subMul(h,b),r-=p*u.crossVec2Vec2(m,b),s.addMul(_,b),o+=c*u.crossVec2Vec2(f,b)}else{var x=u.zero();x.addCombine(1,s,1,f),x.subCombine(1,n,1,m);var B=o-r-this.m_referenceAngle;d=x.length(),v=Nc(B);var A=new J(x.x,x.y,B),M=new J;if(y.ez.z>0)M=J.neg(y.solve33(A));else{var C=u.neg(y.solve22(x));M.set(C.x,C.y,0)}var b=u.neo(M.x,M.y);n.subMul(h,b),r-=p*(u.crossVec2Vec2(m,b)+M.z),s.addMul(_,b),o+=c*(u.crossVec2Vec2(f,b)+M.z)}return this.m_bodyA.c_position.c=n,this.m_bodyA.c_position.a=r,this.m_bodyB.c_position.c=s,this.m_bodyB.c_position.a=o,d<=P.linearSlop&&v<=P.angularSlop},t.TYPE="weld-joint",t})(bt),Uc=Math.abs,$c=Math.PI,Gc={enableMotor:!1,maxMotorTorque:0,motorSpeed:0,frequencyHz:2,dampingRatio:.7},To=(function(i){wt(t,i);function t(e,n,r,s,o){var a=this;return a instanceof t?(e=Rt(e,Gc),a=i.call(this,e,n,r)||this,n=a.m_bodyA,r=a.m_bodyB,a.m_ax=u.zero(),a.m_ay=u.zero(),a.m_type=t.TYPE,a.m_localAnchorA=u.clone(s?n.getLocalPoint(s):e.localAnchorA||u.zero()),a.m_localAnchorB=u.clone(s?r.getLocalPoint(s):e.localAnchorB||u.zero()),u.isValid(o)?a.m_localXAxisA=n.getLocalVector(o):u.isValid(e.localAxisA)?a.m_localXAxisA=u.clone(e.localAxisA):u.isValid(e.localAxis)?a.m_localXAxisA=u.clone(e.localAxis):a.m_localXAxisA=u.neo(1,0),a.m_localYAxisA=u.crossNumVec2(1,a.m_localXAxisA),a.m_mass=0,a.m_impulse=0,a.m_motorMass=0,a.m_motorImpulse=0,a.m_springMass=0,a.m_springImpulse=0,a.m_maxMotorTorque=e.maxMotorTorque,a.m_motorSpeed=e.motorSpeed,a.m_enableMotor=e.enableMotor,a.m_frequencyHz=e.frequencyHz,a.m_dampingRatio=e.dampingRatio,a.m_bias=0,a.m_gamma=0,a):new t(e,n,r,s,o)}return t.prototype._serialize=function(){return{type:this.m_type,bodyA:this.m_bodyA,bodyB:this.m_bodyB,collideConnected:this.m_collideConnected,enableMotor:this.m_enableMotor,maxMotorTorque:this.m_maxMotorTorque,motorSpeed:this.m_motorSpeed,frequencyHz:this.m_frequencyHz,dampingRatio:this.m_dampingRatio,localAnchorA:this.m_localAnchorA,localAnchorB:this.m_localAnchorB,localAxisA:this.m_localXAxisA}},t._deserialize=function(e,n,r){e=At({},e),e.bodyA=r(Y,e.bodyA,n),e.bodyB=r(Y,e.bodyB,n);var s=new t(e);return s},t.prototype._reset=function(e){e.anchorA?this.m_localAnchorA.setVec2(this.m_bodyA.getLocalPoint(e.anchorA)):e.localAnchorA&&this.m_localAnchorA.setVec2(e.localAnchorA),e.anchorB?this.m_localAnchorB.setVec2(this.m_bodyB.getLocalPoint(e.anchorB)):e.localAnchorB&&this.m_localAnchorB.setVec2(e.localAnchorB),e.localAxisA&&(this.m_localXAxisA.setVec2(e.localAxisA),this.m_localYAxisA.setVec2(u.crossNumVec2(1,e.localAxisA))),e.enableMotor!==void 0&&(this.m_enableMotor=e.enableMotor),Number.isFinite(e.maxMotorTorque)&&(this.m_maxMotorTorque=e.maxMotorTorque),Number.isFinite(e.motorSpeed)&&(this.m_motorSpeed=e.motorSpeed),Number.isFinite(e.frequencyHz)&&(this.m_frequencyHz=e.frequencyHz),Number.isFinite(e.dampingRatio)&&(this.m_dampingRatio=e.dampingRatio)},t.prototype.getLocalAnchorA=function(){return this.m_localAnchorA},t.prototype.getLocalAnchorB=function(){return this.m_localAnchorB},t.prototype.getLocalAxisA=function(){return this.m_localXAxisA},t.prototype.getJointTranslation=function(){var e=this.m_bodyA,n=this.m_bodyB,r=e.getWorldPoint(this.m_localAnchorA),s=n.getWorldPoint(this.m_localAnchorB),o=u.sub(s,r),a=e.getWorldVector(this.m_localXAxisA),l=u.dot(o,a);return l},t.prototype.getJointSpeed=function(){var e=this.m_bodyA.m_angularVelocity,n=this.m_bodyB.m_angularVelocity;return n-e},t.prototype.isMotorEnabled=function(){return this.m_enableMotor},t.prototype.enableMotor=function(e){e!=this.m_enableMotor&&(this.m_bodyA.setAwake(!0),this.m_bodyB.setAwake(!0),this.m_enableMotor=e)},t.prototype.setMotorSpeed=function(e){e!=this.m_motorSpeed&&(this.m_bodyA.setAwake(!0),this.m_bodyB.setAwake(!0),this.m_motorSpeed=e)},t.prototype.getMotorSpeed=function(){return this.m_motorSpeed},t.prototype.setMaxMotorTorque=function(e){e!=this.m_maxMotorTorque&&(this.m_bodyA.setAwake(!0),this.m_bodyB.setAwake(!0),this.m_maxMotorTorque=e)},t.prototype.getMaxMotorTorque=function(){return this.m_maxMotorTorque},t.prototype.getMotorTorque=function(e){return e*this.m_motorImpulse},t.prototype.setSpringFrequencyHz=function(e){this.m_frequencyHz=e},t.prototype.getSpringFrequencyHz=function(){return this.m_frequencyHz},t.prototype.setSpringDampingRatio=function(e){this.m_dampingRatio=e},t.prototype.getSpringDampingRatio=function(){return this.m_dampingRatio},t.prototype.getAnchorA=function(){return this.m_bodyA.getWorldPoint(this.m_localAnchorA)},t.prototype.getAnchorB=function(){return this.m_bodyB.getWorldPoint(this.m_localAnchorB)},t.prototype.getReactionForce=function(e){return u.combine(this.m_impulse,this.m_ay,this.m_springImpulse,this.m_ax).mul(e)},t.prototype.getReactionTorque=function(e){return e*this.m_motorImpulse},t.prototype.initVelocityConstraints=function(e){this.m_localCenterA=this.m_bodyA.m_sweep.localCenter,this.m_localCenterB=this.m_bodyB.m_sweep.localCenter,this.m_invMassA=this.m_bodyA.m_invMass,this.m_invMassB=this.m_bodyB.m_invMass,this.m_invIA=this.m_bodyA.m_invI,this.m_invIB=this.m_bodyB.m_invI;var n=this.m_invMassA,r=this.m_invMassB,s=this.m_invIA,o=this.m_invIB,a=this.m_bodyA.c_position.c,l=this.m_bodyA.c_position.a,h=this.m_bodyA.c_velocity.v,_=this.m_bodyA.c_velocity.w,p=this.m_bodyB.c_position.c,c=this.m_bodyB.c_position.a,m=this.m_bodyB.c_velocity.v,f=this.m_bodyB.c_velocity.w,d=k.neo(l),v=k.neo(c),y=k.mulVec2(d,u.sub(this.m_localAnchorA,this.m_localCenterA)),x=k.mulVec2(v,u.sub(this.m_localAnchorB,this.m_localCenterB)),b=u.zero();if(b.addCombine(1,p,1,x),b.subCombine(1,a,1,y),this.m_ay=k.mulVec2(d,this.m_localYAxisA),this.m_sAy=u.crossVec2Vec2(u.add(b,y),this.m_ay),this.m_sBy=u.crossVec2Vec2(x,this.m_ay),this.m_mass=n+r+s*this.m_sAy*this.m_sAy+o*this.m_sBy*this.m_sBy,this.m_mass>0&&(this.m_mass=1/this.m_mass),this.m_springMass=0,this.m_bias=0,this.m_gamma=0,this.m_frequencyHz>0){this.m_ax=k.mulVec2(d,this.m_localXAxisA),this.m_sAx=u.crossVec2Vec2(u.add(b,y),this.m_ax),this.m_sBx=u.crossVec2Vec2(x,this.m_ax);var B=n+r+s*this.m_sAx*this.m_sAx+o*this.m_sBx*this.m_sBx;if(B>0){this.m_springMass=1/B;var A=u.dot(b,this.m_ax),M=2*$c*this.m_frequencyHz,C=2*this.m_springMass*this.m_dampingRatio*M,I=this.m_springMass*M*M,T=e.dt;this.m_gamma=T*(C+T*I),this.m_gamma>0&&(this.m_gamma=1/this.m_gamma),this.m_bias=A*T*I*this.m_gamma,this.m_springMass=B+this.m_gamma,this.m_springMass>0&&(this.m_springMass=1/this.m_springMass)}}else this.m_springImpulse=0;if(this.m_enableMotor?(this.m_motorMass=s+o,this.m_motorMass>0&&(this.m_motorMass=1/this.m_motorMass)):(this.m_motorMass=0,this.m_motorImpulse=0),e.warmStarting){this.m_impulse*=e.dtRatio,this.m_springImpulse*=e.dtRatio,this.m_motorImpulse*=e.dtRatio;var L=u.combine(this.m_impulse,this.m_ay,this.m_springImpulse,this.m_ax),q=this.m_impulse*this.m_sAy+this.m_springImpulse*this.m_sAx+this.m_motorImpulse,$=this.m_impulse*this.m_sBy+this.m_springImpulse*this.m_sBx+this.m_motorImpulse;h.subMul(this.m_invMassA,L),_-=this.m_invIA*q,m.addMul(this.m_invMassB,L),f+=this.m_invIB*$}else this.m_impulse=0,this.m_springImpulse=0,this.m_motorImpulse=0;this.m_bodyA.c_velocity.v.setVec2(h),this.m_bodyA.c_velocity.w=_,this.m_bodyB.c_velocity.v.setVec2(m),this.m_bodyB.c_velocity.w=f},t.prototype.solveVelocityConstraints=function(e){var n=this.m_invMassA,r=this.m_invMassB,s=this.m_invIA,o=this.m_invIB,a=this.m_bodyA.c_velocity.v,l=this.m_bodyA.c_velocity.w,h=this.m_bodyB.c_velocity.v,_=this.m_bodyB.c_velocity.w;{var p=u.dot(this.m_ax,h)-u.dot(this.m_ax,a)+this.m_sBx*_-this.m_sAx*l,c=-this.m_springMass*(p+this.m_bias+this.m_gamma*this.m_springImpulse);this.m_springImpulse+=c;var m=u.mulNumVec2(c,this.m_ax),f=c*this.m_sAx,d=c*this.m_sBx;a.subMul(n,m),l-=s*f,h.addMul(r,m),_+=o*d}{var p=_-l-this.m_motorSpeed,c=-this.m_motorMass*p,v=this.m_motorImpulse,y=e.dt*this.m_maxMotorTorque;this.m_motorImpulse=yt(this.m_motorImpulse+c,-y,y),c=this.m_motorImpulse-v,l-=s*c,_+=o*c}{var p=u.dot(this.m_ay,h)-u.dot(this.m_ay,a)+this.m_sBy*_-this.m_sAy*l,c=-this.m_mass*p;this.m_impulse+=c;var m=u.mulNumVec2(c,this.m_ay),f=c*this.m_sAy,d=c*this.m_sBy;a.subMul(n,m),l-=s*f,h.addMul(r,m),_+=o*d}this.m_bodyA.c_velocity.v.setVec2(a),this.m_bodyA.c_velocity.w=l,this.m_bodyB.c_velocity.v.setVec2(h),this.m_bodyB.c_velocity.w=_},t.prototype.solvePositionConstraints=function(e){var n=this.m_bodyA.c_position.c,r=this.m_bodyA.c_position.a,s=this.m_bodyB.c_position.c,o=this.m_bodyB.c_position.a,a=k.neo(r),l=k.neo(o),h=k.mulVec2(a,u.sub(this.m_localAnchorA,this.m_localCenterA)),_=k.mulVec2(l,u.sub(this.m_localAnchorB,this.m_localCenterB)),p=u.zero();p.addCombine(1,s,1,_),p.subCombine(1,n,1,h);var c=k.mulVec2(a,this.m_localYAxisA),m=u.crossVec2Vec2(u.add(p,h),c),f=u.crossVec2Vec2(_,c),d=u.dot(p,c),v=this.m_invMassA+this.m_invMassB+this.m_invIA*this.m_sAy*this.m_sAy+this.m_invIB*this.m_sBy*this.m_sBy,y=v!=0?-d/v:0,x=u.mulNumVec2(y,c),b=y*m,B=y*f;return n.subMul(this.m_invMassA,x),r-=this.m_invIA*b,s.addMul(this.m_invMassB,x),o+=this.m_invIB*B,this.m_bodyA.c_position.c.setVec2(n),this.m_bodyA.c_position.a=r,this.m_bodyB.c_position.c.setVec2(s),this.m_bodyB.c_position.a=o,Uc(d)<=P.linearSlop},t.TYPE="wheel-joint",t})(bt),ht,Hc=0,zo={World:mn,Body:Y,Joint:bt,Fixture:nr,Shape:di},Fo={Vec2:u,Vec3:J,World:mn,Body:Y,Joint:bt,Fixture:nr,Shape:di},jc=(ht={},ht[Y.STATIC]=Y,ht[Y.DYNAMIC]=Y,ht[Y.KINEMATIC]=Y,ht[hn.TYPE]=hn,ht[ce.TYPE]=ce,ht[le.TYPE]=le,ht[xe.TYPE]=xe,ht[wo.TYPE]=wo,ht[Bo.TYPE]=Bo,ht[Co.TYPE]=Co,ht[Vo.TYPE]=Vo,ht[So.TYPE]=So,ht[Xr.TYPE]=Xr,ht[Io.TYPE]=Io,ht[Ie.TYPE]=Ie,ht[Po.TYPE]=Po,ht[Lo.TYPE]=Lo,ht[To.TYPE]=To,ht),Jc={rootClass:mn,preSerialize:function(i){return i},postSerialize:function(i,t){return i},preDeserialize:function(i){return i},postDeserialize:function(i,t){return i}},fs=(function(){function i(t){var e=this;this.toJson=function(n){var r=e.options.preSerialize,s=e.options.postSerialize,o=[],a=[n],l={};function h(f,d){if(f.__sid=f.__sid||++Hc,!l[f.__sid]){a.push(f);var v=o.length+a.length,y={refIndex:v,refType:d};l[f.__sid]=y}return l[f.__sid]}function _(f){f=r(f);var d=f._serialize();return d=s(d,f),d}function p(f,d){if(d===void 0&&(d=!1),typeof f!="object"||f===null)return f;if(typeof f._serialize=="function"){if(!d){for(var v in zo)if(f instanceof zo[v])return h(f,v)}f=_(f)}if(Array.isArray(f)){for(var y=[],x=0;x<f.length;x++)y[x]=p(f[x]);f=y}else{var y={};for(var x in f)f.hasOwnProperty(x)&&(y[x]=p(f[x]));f=y}return f}for(;a.length;){var c=a.shift(),m=p(c,!0);o.push(m)}return o},this.fromJson=function(n){var r=e.options.preDeserialize,s=e.options.postDeserialize,o=e.options.rootClass,a={};function l(p,c,m){(!p||!p._deserialize)&&(p=jc[c.type]);var f=p&&p._deserialize;if(f){c=r(c);var d=p._deserialize,v=d(c,m,h);return v=s(v,c),v}}function h(p,c,m){var f=c.refIndex&&c.refType;if(!f)return l(p,c,m);var d=c;Fo[d.refType]&&(p=Fo[d.refType]);var v=d.refIndex;if(!a[v]){var y=n[v],x=l(p,y,m);a[v]=x}return a[v]}var _=l(o,n[0],null);return _},this.options=At(At({},Jc),t)}return i})(),$a=new fs({rootClass:mn});fs.fromJson=$a.fromJson;fs.toJson=$a.toJson;(function(){function i(){}return i.mount=function(t){throw new Error("Not implemented")},i.start=function(t){var e=i.mount();return e.start(t),e},i})();(function(i){wt(t,i);function t(e,n,r,s){var o=this;return o instanceof t?(o=i.call(this)||this,o._setAsBox(e,n,r,s),o):new t(e,n,r,s)}return t.TYPE="polygon",t})(ce);ge.addType(xe.TYPE,xe.TYPE,Yc);function Yc(i,t,e,n,r,s,o){Wc(i,e.getShape(),t,s.getShape(),r)}var qo=w(0,0),Eo=w(0,0),Wc=function(i,t,e,n,r){i.pointCount=0,D(qo,e,t.m_p),D(Eo,r,n.m_p);var s=ci(Eo,qo),o=t.m_radius,a=n.m_radius,l=o+a;s>l*l||(i.type=it.e_circles,g(i.localPoint,t.m_p),z(i.localNormal),i.pointCount=1,g(i.points[0].localPoint,n.m_p),i.points[0].id.setFeatures(0,H.e_vertex,0,H.e_vertex))};ge.addType(le.TYPE,xe.TYPE,Kc);ge.addType(hn.TYPE,xe.TYPE,Xc);function Kc(i,t,e,n,r,s,o){var a=e.getShape(),l=s.getShape();Ga(i,a,t,l,r)}function Xc(i,t,e,n,r,s,o){var a=e.getShape(),l=new le;a.getChildEdge(l,n);var h=l,_=s.getShape();Ga(i,h,t,_,r)}var Qe=w(0,0),Pr=w(0,0),Lr=w(0,0),Ve=w(0,0),ti=w(0,0),Ci=w(0,0),Ga=function(i,t,e,n,r){i.pointCount=0,La(Ve,r,e,n.m_p);var s=t.m_vertex1,o=t.m_vertex2;N(Qe,o,s);var a=V(Qe,o)-V(Qe,Ve),l=V(Qe,Ve)-V(Qe,s),h=t.m_radius+n.m_radius;if(l<=0){g(ti,s);var _=ci(Ve,s);if(_>h*h)return;if(t.m_hasVertex0){var p=t.m_vertex0,c=s;N(Pr,c,p);var m=V(Pr,c)-V(Pr,Ve);if(m>0)return}i.type=it.e_circles,z(i.localNormal),g(i.localPoint,ti),i.pointCount=1,g(i.points[0].localPoint,n.m_p),i.points[0].id.setFeatures(0,H.e_vertex,0,H.e_vertex);return}if(a<=0){g(ti,o);var f=ci(Ve,ti);if(f>h*h)return;if(t.m_hasVertex3){var d=t.m_vertex3,v=o;N(Lr,d,v);var y=V(Lr,Ve)-V(Lr,v);if(y>0)return}i.type=it.e_circles,z(i.localNormal),g(i.localPoint,ti),i.pointCount=1,g(i.points[0].localPoint,n.m_p),i.points[0].id.setFeatures(1,H.e_vertex,0,H.e_vertex);return}var x=li(Qe);Q(ti,a/x,s,l/x,o);var b=ci(Ve,ti);b>h*h||(qt(Ci,1,Qe),V(Ci,Ve)-V(Ci,s)<0&&ln(Ci),se(Ci),i.type=it.e_faceA,g(i.localNormal,Ci),g(i.localPoint,s),i.pointCount=1,g(i.points[0].localPoint,n.m_p),i.points[0].id.setFeatures(0,H.e_face,0,H.e_vertex))},Fn=[new Nt,new Nt],qn=[new Nt,new Nt],ei=[new Nt,new Nt],En=w(0,0),Do=w(0,0),Tr=w(0,0),zr=pi(0,0,0),ii=w(0,0),Vi=w(0,0),Dn=w(0,0),No=w(0,0),Ro=w(0,0),De=w(0,0),Fr=w(0,0),Oo=w(0,0);ge.addType(ce.TYPE,ce.TYPE,Zc);function Zc(i,t,e,n,r,s,o){th(i,e.getShape(),t,s.getShape(),r)}function Uo(i,t,e,n,r){var s=i.m_count,o=e.m_count,a=i.m_normals,l=i.m_vertices,h=e.m_vertices;Ta(zr,n,t);for(var _=0,p=-1/0,c=0;c<s;++c){Xt(Tr,zr.q,a[c]),D(Do,zr,l[c]);for(var m=1/0,f=0;f<o;++f){var d=V(Tr,h[f])-V(Tr,Do);d<m&&(m=d)}m>p&&(p=m,_=c)}r.maxSeparation=p,r.bestIndex=_}function Qc(i,t,e,n,r,s){var o=t.m_normals,a=r.m_count,l=r.m_vertices,h=r.m_normals;tc(Oo,s.q,e.q,o[n]);for(var _=0,p=1/0,c=0;c<a;++c){var m=V(Oo,h[c]);m<p&&(p=m,_=c)}var f=_,d=f+1<a?f+1:0;D(i[0].v,s,l[f]),i[0].id.setFeatures(n,H.e_face,f,H.e_vertex),D(i[1].v,s,l[d]),i[1].id.setFeatures(n,H.e_face,d,H.e_vertex)}var Si={maxSeparation:0,bestIndex:0},th=function(i,t,e,n,r){i.pointCount=0;var s=t.m_radius+n.m_radius;Uo(t,e,n,r,Si);var o=Si.bestIndex,a=Si.maxSeparation;if(!(a>s)){Uo(n,r,t,e,Si);var l=Si.bestIndex,h=Si.maxSeparation;if(!(h>s)){var _,p,c,m,f,d,v=.1*P.linearSlop;h>a+v?(_=n,p=t,c=r,m=e,f=l,i.type=it.e_faceB,d=!0):(_=t,p=n,c=e,m=r,f=o,i.type=it.e_faceA,d=!1),Fn[0].recycle(),Fn[1].recycle(),Qc(Fn,_,c,f,p,m);var y=_.m_count,x=_.m_vertices,b=f,B=f+1<y?f+1:0;g(ii,x[b]),g(Vi,x[B]),N(Dn,Vi,ii),se(Dn),ai(No,Dn,1),Q(Ro,.5,ii,.5,Vi),Xt(De,c.q,Dn),ai(Fr,De,1),D(ii,c,ii),D(Vi,c,Vi);var A=V(Fr,ii),M=-V(De,ii)+s,C=V(De,Vi)+s;qn[0].recycle(),qn[1].recycle(),ei[0].recycle(),ei[1].recycle(),vt(En,-De.x,-De.y);var I=cn(qn,Fn,En,M,b);if(!(I<2)){vt(En,De.x,De.y);var T=cn(ei,qn,En,C,B);if(!(T<2)){g(i.localNormal,No),g(i.localPoint,Ro);for(var L=0,q=0;q<ei.length;++q){var $=V(Fr,ei[q].v)-A;if($<=s){var j=i.points[L];hs(j.localPoint,m,ei[q].v),j.id.set(ei[q].id),d&&j.id.swapFeatures(),++L}}i.pointCount=L}}}}};ge.addType(ce.TYPE,xe.TYPE,eh);function eh(i,t,e,n,r,s,o){ih(i,e.getShape(),t,s.getShape(),r)}var ie=w(0,0),qr=w(0,0),ih=function(i,t,e,n,r){i.pointCount=0,La(ie,r,e,n.m_p);for(var s=0,o=-1/0,a=t.m_radius+n.m_radius,l=t.m_count,h=t.m_vertices,_=t.m_normals,p=0;p<l;++p){var c=V(_[p],ie)-V(_[p],h[p]);if(c>a)return;c>o&&(o=c,s=p)}var m=s,f=m+1<l?m+1:0,d=h[m],v=h[f];if(o<Mt){i.pointCount=1,i.type=it.e_faceA,g(i.localNormal,_[s]),Q(i.localPoint,.5,d,.5,v),g(i.points[0].localPoint,n.m_p),i.points[0].id.setFeatures(0,H.e_vertex,0,H.e_vertex);return}var y=V(ie,v)-V(ie,d)-V(d,v)+V(d,d),x=V(ie,d)-V(ie,v)-V(v,d)+V(v,v);if(y<=0){if(ci(ie,d)>a*a)return;i.pointCount=1,i.type=it.e_faceA,N(i.localNormal,ie,d),se(i.localNormal),g(i.localPoint,d),g(i.points[0].localPoint,n.m_p),i.points[0].id.setFeatures(0,H.e_vertex,0,H.e_vertex)}else if(x<=0){if(ci(ie,v)>a*a)return;i.pointCount=1,i.type=it.e_faceA,N(i.localNormal,ie,v),se(i.localNormal),g(i.localPoint,v),g(i.points[0].localPoint,n.m_p),i.points[0].id.setFeatures(0,H.e_vertex,0,H.e_vertex)}else{Q(qr,.5,d,.5,v);var b=V(ie,_[m])-V(qr,_[m]);if(b>a)return;i.pointCount=1,i.type=it.e_faceA,g(i.localNormal,_[m]),g(i.localPoint,qr),g(i.points[0].localPoint,n.m_p),i.points[0].id.setFeatures(0,H.e_vertex,0,H.e_vertex)}},nh=Math.min;ge.addType(le.TYPE,ce.TYPE,rh);ge.addType(hn.TYPE,ce.TYPE,sh);function rh(i,t,e,n,r,s,o){ja(i,e.getShape(),t,s.getShape(),r)}var $o=new le;function sh(i,t,e,n,r,s,o){var a=e.getShape();a.getChildEdge($o,n),ja(i,$o,t,s.getShape(),r)}var Yt;(function(i){i[i.e_unknown=-1]="e_unknown",i[i.e_edgeA=1]="e_edgeA",i[i.e_edgeB=2]="e_edgeB"})(Yt||(Yt={}));var Go;(function(i){i[i.e_isolated=0]="e_isolated",i[i.e_concave=1]="e_concave",i[i.e_convex=2]="e_convex"})(Go||(Go={}));var Ha=(function(){function i(){}return i})(),oh=(function(){function i(){this.vertices=[],this.normals=[],this.count=0;for(var t=0;t<P.maxPolygonVertices;t++)this.vertices.push(w(0,0)),this.normals.push(w(0,0))}return i})(),ah=(function(){function i(){this.v1=w(0,0),this.v2=w(0,0),this.normal=w(0,0),this.sideNormal1=w(0,0),this.sideNormal2=w(0,0)}return i.prototype.recycle=function(){z(this.v1),z(this.v2),z(this.normal),z(this.sideNormal1),z(this.sideNormal2)},i})(),Nn=[new Nt,new Nt],Ne=[new Nt,new Nt],ne=[new Nt,new Nt],_e=new Ha,Bt=new Ha,pt=new oh,R=new ah,Rn=w(0,0),Yi=w(0,0),Ii=w(0,0),Wi=w(0,0),Ki=pi(0,0,0),K=w(0,0),pe=w(0,0),E=w(0,0),de=w(0,0),mt=w(0,0),ut=w(0,0),Ho=w(0,0),Re=w(0,0),ja=function(i,t,e,n,r){Ta(Ki,e,r),D(Rn,Ki,n.m_centroid);var s=t.m_vertex0,o=t.m_vertex1,a=t.m_vertex2,l=t.m_vertex3,h=t.m_hasVertex0,_=t.m_hasVertex3;N(Ii,a,o),se(Ii),vt(E,Ii.y,-Ii.x);var p=V(E,Rn)-V(E,o),c=0,m=0,f=!1,d=!1;z(pe),z(de),h&&(N(Yi,o,s),se(Yi),vt(pe,Yi.y,-Yi.x),f=U(Yi,Ii)>=0,c=u.dot(pe,Rn)-u.dot(pe,s)),_&&(N(Wi,l,a),se(Wi),vt(de,Wi.y,-Wi.x),d=u.crossVec2Vec2(Ii,Wi)>0,m=u.dot(de,Rn)-u.dot(de,a));var v;z(K),z(mt),z(ut),h&&_?f&&d?(v=c>=0||p>=0||m>=0,v?(g(K,E),g(mt,pe),g(ut,de)):(F(K,-1,E),F(mt,-1,E),F(ut,-1,E))):f?(v=c>=0||p>=0&&m>=0,v?(g(K,E),g(mt,pe),g(ut,E)):(F(K,-1,E),F(mt,-1,de),F(ut,-1,E))):d?(v=m>=0||c>=0&&p>=0,v?(g(K,E),g(mt,E),g(ut,de)):(F(K,-1,E),F(mt,-1,E),F(ut,-1,pe))):(v=c>=0&&p>=0&&m>=0,v?(g(K,E),g(mt,E),g(ut,E)):(F(K,-1,E),F(mt,-1,de),F(ut,-1,pe))):h?f?(v=c>=0||p>=0,v?(g(K,E),g(mt,pe),F(ut,-1,E)):(F(K,-1,E),g(mt,E),F(ut,-1,E))):(v=c>=0&&p>=0,v?(g(K,E),g(mt,E),F(ut,-1,E)):(F(K,-1,E),g(mt,E),F(ut,-1,pe))):_?d?(v=p>=0||m>=0,v?(g(K,E),F(mt,-1,E),g(ut,de)):(F(K,-1,E),F(mt,-1,E),g(ut,E))):(v=p>=0&&m>=0,v?(g(K,E),F(mt,-1,E),g(ut,E)):(F(K,-1,E),F(mt,-1,de),g(ut,E))):(v=p>=0,v?(g(K,E),F(mt,-1,E),F(ut,-1,E)):(F(K,-1,E),g(mt,E),g(ut,E))),pt.count=n.m_count;for(var y=0;y<n.m_count;++y)D(pt.vertices[y],Ki,n.m_vertices[y]),Xt(pt.normals[y],Ki.q,n.m_normals[y]);var x=n.m_radius+t.m_radius;i.pointCount=0;{_e.type=Yt.e_edgeA,_e.index=v?0:1,_e.separation=1/0;for(var y=0;y<pt.count;++y){var b=pt.vertices[y],B=V(K,b)-V(K,o);B<_e.separation&&(_e.separation=B)}}if(_e.type!=Yt.e_unknown&&!(_e.separation>x)){{Bt.type=Yt.e_unknown,Bt.index=-1,Bt.separation=-1/0,vt(Ho,-K.y,K.x);for(var y=0;y<pt.count;++y){F(Re,-1,pt.normals[y]);var A=V(Re,pt.vertices[y])-V(Re,o),M=V(Re,pt.vertices[y])-V(Re,a),B=nh(A,M);if(B>x){Bt.type=Yt.e_edgeB,Bt.index=y,Bt.separation=B;break}if(V(Re,Ho)>=0){if(V(Re,K)-V(ut,K)<-P.angularSlop)continue}else if(V(Re,K)-V(mt,K)<-P.angularSlop)continue;B>Bt.separation&&(Bt.type=Yt.e_edgeB,Bt.index=y,Bt.separation=B)}}if(!(Bt.type!=Yt.e_unknown&&Bt.separation>x)){var C=.98,I=.001,T;if(Bt.type==Yt.e_unknown?T=_e:Bt.separation>C*_e.separation+I?T=Bt:T=_e,ne[0].recycle(),ne[1].recycle(),T.type==Yt.e_edgeA){i.type=it.e_faceA;for(var L=0,q=V(K,pt.normals[0]),y=1;y<pt.count;++y){var $=V(K,pt.normals[y]);$<q&&(q=$,L=y)}var j=L,G=j+1<pt.count?j+1:0;g(ne[0].v,pt.vertices[j]),ne[0].id.setFeatures(0,H.e_face,j,H.e_vertex),g(ne[1].v,pt.vertices[G]),ne[1].id.setFeatures(0,H.e_face,G,H.e_vertex),v?(R.i1=0,R.i2=1,g(R.v1,o),g(R.v2,a),g(R.normal,E)):(R.i1=1,R.i2=0,g(R.v1,a),g(R.v2,o),F(R.normal,-1,E))}else i.type=it.e_faceB,g(ne[0].v,o),ne[0].id.setFeatures(0,H.e_vertex,T.index,H.e_face),g(ne[1].v,a),ne[1].id.setFeatures(0,H.e_vertex,T.index,H.e_face),R.i1=T.index,R.i2=R.i1+1<pt.count?R.i1+1:0,g(R.v1,pt.vertices[R.i1]),g(R.v2,pt.vertices[R.i2]),g(R.normal,pt.normals[R.i1]);vt(R.sideNormal1,R.normal.y,-R.normal.x),vt(R.sideNormal2,-R.sideNormal1.x,-R.sideNormal1.y),R.sideOffset1=V(R.sideNormal1,R.v1),R.sideOffset2=V(R.sideNormal2,R.v2),Nn[0].recycle(),Nn[1].recycle(),Ne[0].recycle(),Ne[1].recycle();var Lt=cn(Nn,ne,R.sideNormal1,R.sideOffset1,R.i1);if(!(Lt<P.maxManifoldPoints)){var ft=cn(Ne,Nn,R.sideNormal2,R.sideOffset2,R.i2);if(!(ft<P.maxManifoldPoints)){T.type==Yt.e_edgeA?(g(i.localNormal,R.normal),g(i.localPoint,R.v1)):(g(i.localNormal,n.m_normals[R.i1]),g(i.localPoint,n.m_vertices[R.i1]));for(var Zt=0,y=0;y<P.maxManifoldPoints;++y){var Ct=V(R.normal,Ne[y].v)-V(R.normal,R.v1);if(Ct<=x){var nt=i.points[Zt];T.type==Yt.e_edgeA?(hs(nt.localPoint,Ki,Ne[y].v),nt.id.set(Ne[y].id)):(g(nt.localPoint,Ne[y].v),nt.id.set(Ne[y].id),nt.id.swapFeatures()),++Zt}}i.pointCount=Zt}}}}};(function(){function i(t,e){this._refMap={},this._map={},this._xmap={},this._data=[],this._entered=[],this._exited=[],this._key=t,this._listener=e}return i.prototype.update=function(t){if(!Array.isArray(t))throw"Invalid data: "+t;this._entered.length=0,this._exited.length=0,this._data.length=t.length;for(var e=0;e<t.length;e++)if(!(typeof t[e]!="object"||t[e]===null)){var n=t[e],r=this._key(n);this._map[r]?delete this._map[r]:this._entered.push(n),this._data[e]=n,this._xmap[r]=n}for(var r in this._map)this._exited.push(this._map[r]),delete this._map[r];var s=this._map;this._map=this._xmap,this._xmap=s;for(var e=0;e<this._exited.length;e++){var n=this._exited[e],o=this._key(n),a=this._refMap[o];this._listener.exit(n,a),delete this._refMap[o]}for(var e=0;e<this._entered.length;e++){var n=this._entered[e],o=this._key(n),a=this._listener.enter(n);a&&(this._refMap[o]=a)}for(var e=0;e<this._data.length;e++)if(!(typeof t[e]!="object"||t[e]===null)){var n=this._data[e],o=this._key(n),a=this._refMap[o];this._listener.update(n,a)}this._entered.length=0,this._exited.length=0,this._data.length=0},i.prototype.ref=function(t){return this._refMap[this._key(t)]},i})();const rr=40,On=.1,lh=.008,ch=.01,hh=.008,mh=3,jo=15,uh=1,_h=1.2,Jo=1.1,ph=6,dh=1.6,fh=.012,Er=2.4,Yo=3,vh=5,Wo=8e-4,Ko=1,yh=.4,Xo=3.2,Ja=3,xh=10,gh=2,bh={bumper:100,slingshot:10,kicker:50,rollover:50,target:200,"drop-target":250,spinner:25,saucer:750,lock:1e3,"ramp-exit":1500},Zo=2500,Ah=1e4;O.lengthUnitsPerMeter=1;class kt{constructor(t,e,n){this.key="part-"+Math.random(),this.angle=0,this.closed=!1,this.lit=!1,this.down=!1,this.active=!1,this.hitAt=-1/0,this.type=t,this.elementId=e,this.origin={x:n.x,y:n.y},this.position={x:n.x,y:n.y}}}class zi extends kt{constructor(t,e){super("flipper",t,e),this.isLeft=!0}}class Zr extends kt{constructor(t,e){super("plunger",t,e),this.press=0}}class sr extends kt{constructor(t,e){super("spinner",t,e),this.spin=0,this.spinSpeed=0}}class ui extends kt{constructor(t,e,n){super(t,e,n),this.full=!1}}class Fi{constructor(t,e,n){this.key="ball-"+Math.random(),this.type="ball",this.angle=0,this.layer="ground",this.heldBy=null,this.heldUntil=0,this.freeAt=0,this.kick=null,this.drained=!1,this.elementId=n,this.origin={x:t.x,y:t.y},this.position={x:t.x,y:t.y},this.radius=e}}const wh=i=>{let t=1/0,e=-1/0,n=1/0,r=-1/0;for(const s of i)s.x<t&&(t=s.x),s.x>e&&(e=s.x),s.y<n&&(n=s.y),s.y>r&&(r=s.y);return{min:{x:t,y:n},max:{x:e,y:r},center:{x:(t+e)/2,y:(n+r)/2}}},Bh=(i,t)=>i.map(e=>({x:e.x-t.x,y:e.y-t.y}));class kh{constructor(){this.score=Oe(0),this.best=Oe(0),this.ball=Oe(1),this.balls=Oe(3),this.over=Oe(!1),this.tilted=Oe(!1),this.message=Oe(null)}}const Mh=`<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!-- Clockwork: a steampunk workshop in its own cabinet, and a table with every kind of part.
     Layers: "art" and every shape labelled "art" are decoration, which physics skips; art with
     data-part="<id>" moves and lights up with that part, and art with data-light="<name>" lights with the
     game (ball-save, lock-1, lock-2, multiball, tilt, ball-1..3).
     In "table", each part is labelled with its role; unlabelled shapes are walls. Settings are data-
     attributes: data-group (rollovers, targets and drop targets complete as a group), data-points,
     data-direction (degrees clockwise from up, or up/right/down/left: the way a gate or a ramp's entrance
     lets the ball through, the way a saucer or lock kicks it out), data-locks (balls locked for multiball).
     Balls on the playfield are drawn where the ball is in this file, under anything after it: the ramp and
     the apron. -->

<svg
   width="66"
   height="90"
   viewBox="0 0 66 90"
   version="1.1"
   id="table-clockwork"
   data-name="Clockwork"
   data-color="#d9a441"
   data-blurb="Brass and gears, and every kind of part: a ramp, a lock, a magnet"
   data-order="1"
   sodipodi:docname="clockwork.svg"
   inkscape:version="1.1.1 (c3084ef, 2021-09-22)"
   xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape"
   xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd"
   xmlns:xlink="http://www.w3.org/1999/xlink"
   xmlns="http://www.w3.org/2000/svg"
   xmlns:svg="http://www.w3.org/2000/svg">
  <sodipodi:namedview
     id="namedview1137"
     pagecolor="#ffffff"
     bordercolor="#000000"
     borderopacity="0.25"
     inkscape:pageshadow="2"
     inkscape:pageopacity="0.0"
     inkscape:pagecheckerboard="0"
     showgrid="false"
     inkscape:zoom="18.535949"
     inkscape:cx="48.122705"
     inkscape:cy="76.796716"
     inkscape:window-width="1293"
     inkscape:window-height="792"
     inkscape:window-x="0"
     inkscape:window-y="38"
     inkscape:window-maximized="0"
     inkscape:current-layer="layer1"
     inkscape:snap-global="false" />
  <style
     id="style1">
    #table-clockwork .sky { fill: url(#cw-walnut); }
    #table-clockwork .grain { fill: none; stroke: #2a160b; stroke-width: 0.25; opacity: 0.35; }
    #table-clockwork .bg-gear { fill: #6b4a1f; opacity: 0.35; transform-box: fill-box; transform-origin: center; animation: turn 40s linear infinite; }
    #table-clockwork .bg-gear.back { animation-direction: reverse; animation-duration: 28s; }
    #table-clockwork .cabinet { fill: url(#cw-felt); }
    #table-clockwork .rivet { fill: #e8c77a; }
    #table-clockwork .plate { fill: url(#cw-plate); stroke: #3a2410; stroke-width: 0.06; }
    #table-clockwork .apron { fill: url(#cw-brass-v); stroke: #3a2410; stroke-width: 0.08; }
    #table-clockwork .apron-inset { fill: #2a160b; opacity: 0.85; }
    #table-clockwork .walls { filter: url(#shadow); }
    #table-clockwork .wall { fill: none; stroke: #d9a441; stroke-width: 0.2; stroke-linecap: round; stroke-linejoin: round; }
    #table-clockwork .guide { stroke-width: 0.12; }
    #table-clockwork .drain { fill: none; stroke: #8c2f1b; stroke-width: 0.1; stroke-dasharray: 0.25 0.2; }
    #table-clockwork .sling { fill: none; stroke: #ff8f3a; stroke-width: 0.26; stroke-linecap: round; filter: url(#glow); }
    #table-clockwork .sling-body { fill: #4a2a12; opacity: 0.8; }
    #table-clockwork .post { fill: #f2d48a; stroke: #6b4a1f; stroke-width: 0.06; }
    #table-clockwork .bumper { fill: url(#cw-copper); stroke: #f2d48a; stroke-width: 0.1; filter: url(#shadow); }
    #table-clockwork .bumper.hit { fill: #ffd27a; filter: url(#glow); }
    #table-clockwork .bumper-teeth { fill: #b0702a; stroke: #3a2410; stroke-width: 0.04; transform-box: fill-box; transform-origin: center; animation: turn 6s linear infinite; }
    #table-clockwork .bumper-cap { fill: #3a2410; stroke: #f2d48a; stroke-width: 0.05; }
    #table-clockwork .rollover { fill: #3a2410; stroke: #d9a441; stroke-width: 0.06; }
    #table-clockwork .rollover.lit { fill: #ffe08a; filter: url(#glow); }
    #table-clockwork .target { fill: #c9c2b0; stroke: #3a2410; stroke-width: 0.05; }
    #table-clockwork .target.lit { fill: #7cf0b0; filter: url(#glow); }
    #table-clockwork .target.hit { fill: #ffffff; }
    #table-clockwork .drop-target { fill: url(#cw-brass); stroke: #3a2410; stroke-width: 0.05; transition: opacity 0.15s; }
    #table-clockwork .drop-target.down { opacity: 0.18; }
    #table-clockwork .spinner { fill: #e8e2d0; stroke: #3a2410; stroke-width: 0.04; }
    #table-clockwork .gate { fill: none; stroke: #f2d48a; stroke-width: 0.12; stroke-dasharray: 0.3 0.12; }
    #table-clockwork .saucer, .lock { fill: #140a04; stroke: #d9a441; stroke-width: 0.1; }
    #table-clockwork .saucer.full, .lock.full { stroke: #ffe08a; filter: url(#glow); }
    #table-clockwork .saucer-ring { fill: none; stroke: #6b4a1f; stroke-width: 0.12; }
    #table-clockwork .magnet { fill: url(#cw-coil); stroke: #6b4a1f; stroke-width: 0.08; }
    #table-clockwork .magnet-glow { fill: none; stroke: #7cd8ff; stroke-width: 0.12; opacity: 0; transition: opacity 0.3s; }
    #table-clockwork .magnet-glow.active { opacity: 0.9; filter: url(#glow); }
    #table-clockwork .coil { fill: none; stroke: #c9772f; stroke-width: 0.1; }
    #table-clockwork .disc { fill: url(#cw-disc); stroke: #3a2410; stroke-width: 0.06; }
    #table-clockwork .disc-teeth { fill: #9a6a2a; stroke: #3a2410; stroke-width: 0.04; }
    #table-clockwork .disc-spoke { stroke: #3a2410; stroke-width: 0.12; }
    #table-clockwork .captive-ball { fill: url(#cw-coin); stroke: #5a3806; stroke-width: 0.03; }
    #table-clockwork .channel { fill: #1a0e06; opacity: 0.6; }
    #table-clockwork .ramp-floor { fill: none; stroke: #f2d48a; stroke-width: 1.2; opacity: 0.16; stroke-linejoin: round; }
    #table-clockwork .ramp-wall { fill: none; stroke: #e8c77a; stroke-width: 0.14; stroke-linecap: round; stroke-linejoin: round; filter: url(#shadow); }
    #table-clockwork .ramp-tie { stroke: #8a5a24; stroke-width: 0.08; }
    #table-clockwork .ramp-enter, .ramp-exit { fill: none; stroke: none; }
    #table-clockwork .ramp-arrow { fill: #ffe08a; opacity: 0.25; animation: chase 1.2s linear infinite; }
    #table-clockwork .lamp { fill: #2a160b; stroke: #d9a441; stroke-width: 0.05; }
    #table-clockwork .lamp.lit { fill: #ffe08a; filter: url(#glow); }
    #table-clockwork .lamp-text { fill: #d9a441; font: 700 0.42px Georgia, &quot;Times New Roman&quot;, serif; letter-spacing: 0.05px; text-anchor: middle; }
    #table-clockwork .apron-text { fill: #3a2410; font: 700 0.5px Georgia, &quot;Times New Roman&quot;, serif; letter-spacing: 0.08px; text-anchor: middle; }
    #table-clockwork .gauge { fill: #efe6cc; stroke: #6b4a1f; stroke-width: 0.1; }
    #table-clockwork .gauge-tick { stroke: #6b4a1f; stroke-width: 0.025; stroke-linecap: round; }
    #table-clockwork .gauge-tick.major { stroke: #3a2410; stroke-width: 0.045; }
    #table-clockwork .gauge-red { fill: none; stroke: #b23a24; stroke-width: 0.08; opacity: 0.85; }
    #table-clockwork .gauge-hub { fill: #c9a24a; stroke: #3a2410; stroke-width: 0.03; }
    #table-clockwork .needle { stroke: #8c2f1b; stroke-width: 0.06; stroke-linecap: round; transform-box: fill-box; transform-origin: right bottom; animation: needle 3.5s ease-in-out infinite; }
    #table-clockwork .chevron { fill: none; stroke: #ffe08a; stroke-width: 0.13; stroke-linecap: round; animation: chase 1s linear infinite; }
    #table-clockwork .title { fill: #d9a441; opacity: 0.5; font: 700 1.05px Georgia, &quot;Times New Roman&quot;, serif; letter-spacing: 0.33px; text-anchor: middle; }
    #table-clockwork .kicker { fill: url(#cw-brass); stroke: #3a2410; stroke-width: 0.05; }
    #table-clockwork .kicker.hit { fill: #fff1c0; filter: url(#glow); }
    #table-clockwork .ball { fill: url(#cw-coin); stroke: #5a3806; stroke-width: 0.03; }
    #table-clockwork .flipper { fill: url(#cw-brass); stroke: #3a2410; stroke-width: 0.05; filter: url(#shadow); }
    #table-clockwork .pivot { fill: #3a2410; stroke: #f2d48a; stroke-width: 0.05; }
    #table-clockwork .plunger { fill: url(#cw-brass-v); stroke: #3a2410; stroke-width: 0.04; }
    #table-clockwork .plunger-spring { fill: none; stroke: #c8ccd4; stroke-width: 0.07; }
    @keyframes turn { to { transform: rotate(360deg); } }
    @keyframes needle { 0%, 100% { transform: rotate(-4deg); } 50% { transform: rotate(6deg); } }
    @keyframes chase { 0%, 45%, 100% { opacity: 0.2; } 15% { opacity: 1; } }
    @keyframes twinkle { 0%, 100% { opacity: 0.25; } 50% { opacity: 1; } }
    @keyframes rise { from { transform: translateY(0); opacity: 0; } 15% { opacity: 0.9; } to { transform: translateY(-40px); opacity: 0; } }
    @keyframes sway { 0%, 100% { transform: rotate(-3deg); } 50% { transform: rotate(3deg); } }
    @keyframes pulse { 0%, 100% { opacity: 0.55; } 50% { opacity: 1; } }
  </style>
  <defs
     id="defs2">
    <filter
       id="glow"
       filterUnits="userSpaceOnUse"
       x="-6"
       y="-6"
       width="36"
       height="48">
      <feGaussianBlur
         in="SourceGraphic"
         stdDeviation="0.22"
         result="blur"
         id="feGaussianBlur825" />
      <feMerge
         id="feMerge833">
        <feMergeNode
           in="blur"
           id="feMergeNode827" />
        <feMergeNode
           in="blur"
           id="feMergeNode829" />
        <feMergeNode
           in="SourceGraphic"
           id="feMergeNode831" />
      </feMerge>
    </filter>
    <filter
       id="soft"
       filterUnits="userSpaceOnUse"
       x="-6"
       y="-6"
       width="36"
       height="48">
      <feGaussianBlur
         in="SourceGraphic"
         stdDeviation="0.1"
         result="blur"
         id="feGaussianBlur836" />
      <feMerge
         id="feMerge842">
        <feMergeNode
           in="blur"
           id="feMergeNode838" />
        <feMergeNode
           in="SourceGraphic"
           id="feMergeNode840" />
      </feMerge>
    </filter>
    <filter
       id="shadow"
       filterUnits="userSpaceOnUse"
       x="-6"
       y="-6"
       width="36"
       height="48">
      <feDropShadow
         dx="0.08"
         dy="0.14"
         stdDeviation="0.08"
         flood-color="#000"
         flood-opacity="0.35" />
    </filter>
    <linearGradient
       id="cw-walnut"
       x1="0"
       y1="0"
       x2="1"
       y2="1">
      <stop
         offset="0"
         stop-color="#3b2212"
         id="stop846" />
      <stop
         offset="0.5"
         stop-color="#2a170b"
         id="stop848" />
      <stop
         offset="1"
         stop-color="#1a0d05"
         id="stop850" />
    </linearGradient>
    <radialGradient
       id="cw-felt"
       cx="12.978326"
       cy="10.361044"
       r="20.206613"
       gradientTransform="matrix(0.88860847,0,0,1.2024901,-0.38265014,-0.50580936)"
       fx="12.978326"
       fy="10.361044"
       gradientUnits="userSpaceOnUse">
      <stop
         offset="0"
         stop-color="#3a2614"
         id="stop853" />
      <stop
         offset="1"
         stop-color="#1e1108"
         id="stop855" />
    </radialGradient>
    <radialGradient
       id="cw-copper"
       cx="0.35"
       cy="0.3"
       r="0.8">
      <stop
         offset="0"
         stop-color="#ffc58a"
         id="stop858" />
      <stop
         offset="0.55"
         stop-color="#c46a2c"
         id="stop860" />
      <stop
         offset="1"
         stop-color="#5a2a0e"
         id="stop862" />
    </radialGradient>
    <linearGradient
       id="cw-brass"
       x1="0"
       y1="0"
       x2="0"
       y2="1">
      <stop
         offset="0"
         stop-color="#ffe7a3"
         id="stop865" />
      <stop
         offset="0.5"
         stop-color="#d9a441"
         id="stop867" />
      <stop
         offset="1"
         stop-color="#7a5418"
         id="stop869" />
    </linearGradient>
    <linearGradient
       id="cw-brass-v"
       x1="0"
       y1="0"
       x2="1"
       y2="0">
      <stop
         offset="0"
         stop-color="#7a5418"
         id="stop872" />
      <stop
         offset="0.5"
         stop-color="#e8c77a"
         id="stop874" />
      <stop
         offset="1"
         stop-color="#7a5418"
         id="stop876" />
    </linearGradient>
    <radialGradient
       id="cw-steel"
       cx="0.35"
       cy="0.3"
       r="0.75">
      <stop
         offset="0"
         stop-color="#ffffff"
         id="stop879" />
      <stop
         offset="0.45"
         stop-color="#c8ccd4"
         id="stop881" />
      <stop
         offset="1"
         stop-color="#3c4048"
         id="stop883" />
    </radialGradient>
    <!-- the balls, brass coins: a polished face, a raised rim, a beaded ring, and a cog stamped in the middle. Lit
         evenly, since a coin rolls, and a light from one side would turn with it. In the ball's own box, so it
         goes where each ball goes -->
    <radialGradient id="cw-coin-face" cx="0.5" cy="0.5" r="0.5"><stop offset="0" stop-color="#fbe08a" /><stop offset="0.55" stop-color="#eab546" /><stop offset="0.85" stop-color="#c98d1c" /><stop offset="1" stop-color="#8a5a12" /></radialGradient>
    <pattern id="cw-coin" width="1" height="1" patternContentUnits="objectBoundingBox">
      <rect width="1" height="1" fill="url(#cw-coin-face)" />
      <circle cx="0.5" cy="0.5" r="0.455" fill="none" stroke="#6b4309" stroke-width="0.07" />
      <circle cx="0.5" cy="0.5" r="0.4" fill="none" stroke="#ffe7a0" stroke-width="0.025" opacity="0.8" />
      <circle cx="0.5" cy="0.5" r="0.33" fill="none" stroke="#8a5a12" stroke-width="0.03" stroke-dasharray="0.035 0.035" />
      <circle cx="0.5" cy="0.5" r="0.15" fill="none" stroke="#8a5a12" stroke-width="0.09" stroke-dasharray="0.059 0.059" />
      <circle cx="0.5" cy="0.5" r="0.1" fill="#b27a18" stroke="#8a5a12" stroke-width="0.02" />
      <circle cx="0.5" cy="0.5" r="0.035" fill="#5a3806" />
    </pattern>
    <radialGradient
       id="cw-disc"
       cx="3"
       cy="6.8000002"
       r="1.5310111"
       fx="3"
       fy="6.8000002"
       gradientUnits="userSpaceOnUse">
      <stop
         offset="0"
         stop-color="#e8c77a"
         id="stop886" />
      <stop
         offset="1"
         stop-color="#8a5a24"
         id="stop888" />
    </radialGradient>
    <radialGradient
       id="cw-coil"
       cx="10.35"
       cy="13.2"
       r="1.1413482"
       fx="10.35"
       fy="13.2"
       gradientUnits="userSpaceOnUse">
      <stop
         offset="0"
         stop-color="#2a3a44"
         id="stop891" />
      <stop
         offset="0.7"
         stop-color="#4a3a2a"
         id="stop893" />
      <stop
         offset="1"
         stop-color="#6b4a1f"
         id="stop895" />
    </radialGradient>
    <linearGradient
       id="cw-plate"
       x1="0"
       y1="0"
       x2="0"
       y2="1">
      <stop
         offset="0"
         stop-color="#5a3a18"
         id="stop898" />
      <stop
         offset="1"
         stop-color="#3a2410"
         id="stop900" />
    </linearGradient>
    <linearGradient
       inkscape:collect="always"
       xlink:href="#cw-brass-v"
       id="linearGradient1573"
       x1="0.091694177"
       y1="77.281802"
       x2="7.138039"
       y2="77.281802"
       gradientTransform="matrix(2.932823,0,0,0.36433938,-0.38265014,-0.38044534)"
       gradientUnits="userSpaceOnUse" />
    <radialGradient
       inkscape:collect="always"
       xlink:href="#cw-steel"
       id="radialGradient1810"
       cx="20.976899"
       cy="24.835865"
       r="0.61550556"
       fx="20.976899"
       fy="24.835865"
       gradientUnits="userSpaceOnUse" />
    <radialGradient
       inkscape:collect="always"
       xlink:href="#cw-steel"
       id="radialGradient1812"
       cx="1.2053484"
       cy="10.333798"
       r="0.62325834"
       fx="1.2053484"
       fy="10.333798"
       gradientUnits="userSpaceOnUse" />
    <linearGradient
       inkscape:collect="always"
       xlink:href="#cw-brass-v"
       id="linearGradient1814"
       x1="57.947873"
       y1="9.3692965"
       x2="58.614511"
       y2="9.3692965"
       gradientTransform="scale(0.36203789,2.7621418)"
       gradientUnits="userSpaceOnUse" />
    <linearGradient
       inkscape:collect="always"
       xlink:href="#cw-brass"
       id="linearGradient1816"
       x1="-6.9282032"
       y1="-5.1961524"
       x2="-6.9282032"
       y2="36.373067"
       gradientTransform="matrix(0.895746,0,0,1.1929083,-0.38265014,-0.50580936)"
       gradientUnits="userSpaceOnUse" />
    <linearGradient
       inkscape:collect="always"
       xlink:href="#cw-brass"
       id="linearGradient1818"
       x1="-6.9282032"
       y1="-5.1961524"
       x2="-6.9282032"
       y2="36.373067"
       gradientTransform="matrix(0.895746,0,0,1.1929083,-0.38265014,-0.50580936)"
       gradientUnits="userSpaceOnUse" />
    <linearGradient
       inkscape:collect="always"
       xlink:href="#cw-brass"
       id="linearGradient1820"
       x1="-6.9282032"
       y1="-5.1961524"
       x2="-6.9282032"
       y2="36.373067"
       gradientTransform="matrix(0.895746,0,0,1.1929083,-0.38265014,-0.50580936)"
       gradientUnits="userSpaceOnUse" />
    <linearGradient
       inkscape:collect="always"
       xlink:href="#cw-brass"
       id="linearGradient1822"
       x1="6.7321014"
       y1="25.608759"
       x2="6.7321014"
       y2="26.233975"
       gradientTransform="scale(1.6821134,0.59449024)"
       gradientUnits="userSpaceOnUse" />
    <linearGradient
       inkscape:collect="always"
       xlink:href="#cw-brass"
       id="linearGradient1824"
       x1="5.8403661"
       y1="25.608759"
       x2="5.8403661"
       y2="26.233975"
       gradientTransform="scale(1.6821134,0.59449024)"
       gradientUnits="userSpaceOnUse" />
    <linearGradient
       inkscape:collect="always"
       xlink:href="#cw-brass"
       id="linearGradient1826"
       x1="4.9486307"
       y1="25.608759"
       x2="4.9486307"
       y2="26.233975"
       gradientTransform="scale(1.6821134,0.59449024)"
       gradientUnits="userSpaceOnUse" />
    <radialGradient
       inkscape:collect="always"
       xlink:href="#cw-copper"
       id="radialGradient1828"
       cx="7.6210233"
       cy="7.2746139"
       r="33.255376"
       gradientTransform="matrix(0.895746,0,0,1.1929083,-0.38265014,-0.50580936)"
       fx="7.6210233"
       fy="7.2746139"
       gradientUnits="userSpaceOnUse" />
    <radialGradient
       inkscape:collect="always"
       xlink:href="#cw-copper"
       id="radialGradient1830"
       cx="7.6210233"
       cy="7.2746139"
       r="33.255376"
       gradientTransform="matrix(0.895746,0,0,1.1929083,-0.38265014,-0.50580936)"
       fx="7.6210233"
       fy="7.2746139"
       gradientUnits="userSpaceOnUse" />
    <radialGradient
       inkscape:collect="always"
       xlink:href="#cw-copper"
       id="radialGradient1832"
       cx="7.6210233"
       cy="7.2746139"
       r="33.255376"
       gradientTransform="matrix(0.895746,0,0,1.1929083,-0.38265014,-0.50580936)"
       fx="7.6210233"
       fy="7.2746139"
       gradientUnits="userSpaceOnUse" />
    <linearGradient
       inkscape:collect="always"
       xlink:href="#cw-brass"
       id="linearGradient1834"
       x1="0.2024119"
       y1="49.122201"
       x2="0.2024119"
       y2="49.77229"
       gradientTransform="scale(1.8484951,0.5409806)"
       gradientUnits="userSpaceOnUse" />
  </defs>
  <g
     id="layer-sky"
     inkscape:groupmode="layer"
     >
    <rect
       
       class="sky"
       x="0"
       y="0"
       width="66"
       height="90"
       id="rect904" />
    <path
       
       class="grain"
       d="M 0 3.0 C 20 3.5 44 4.0 66 3.6"
       id="path906" />
    <path
       
       class="grain"
       d="M 0 7.0 C 20 8.8 44 8.0 66 7.8"
       id="path908" />
    <path
       
       class="grain"
       d="M 0 11.0 C 20 9.1 44 10.9 66 11.9"
       id="path910" />
    <path
       
       class="grain"
       d="M 0 15.0 C 20 15.6 44 16.6 66 14.2"
       id="path912" />
    <path
       
       class="grain"
       d="M 0 19.0 C 20 18.9 44 18.0 66 19.1"
       id="path914" />
    <path
       
       class="grain"
       d="M 0 23.0 C 20 23.3 44 21.1 66 22.4"
       id="path916" />
    <path
       
       class="grain"
       d="M 0 27.0 C 20 26.1 44 28.7 66 27.5"
       id="path918" />
    <path
       
       class="grain"
       d="M 0 31.0 C 20 29.6 44 32.2 66 30.3"
       id="path920" />
    <path
       
       class="grain"
       d="M 0 35.0 C 20 35.5 44 33.5 66 34.0"
       id="path922" />
    <path
       
       class="grain"
       d="M 0 39.0 C 20 40.5 44 37.8 66 38.4"
       id="path924" />
    <path
       
       class="grain"
       d="M 0 43.0 C 20 44.9 44 44.5 66 42.6"
       id="path926" />
    <path
       
       class="grain"
       d="M 0 47.0 C 20 48.8 44 47.2 66 47.4"
       id="path928" />
    <path
       
       class="grain"
       d="M 0 51.0 C 20 49.8 44 52.8 66 51.4"
       id="path930" />
    <path
       
       class="grain"
       d="M 0 55.0 C 20 56.9 44 56.6 66 54.6"
       id="path932" />
    <path
       
       class="grain"
       d="M 0 59.0 C 20 58.4 44 57.7 66 58.3"
       id="path934" />
    <path
       
       class="grain"
       d="M 0 63.0 C 20 61.3 44 62.2 66 63.2"
       id="path936" />
    <path
       
       class="grain"
       d="M 0 67.0 C 20 65.0 44 67.7 66 66.7"
       id="path938" />
    <path
       
       class="grain"
       d="M 0 71.0 C 20 70.2 44 72.3 66 71.0"
       id="path940" />
    <path
       
       class="grain"
       d="M 0 75.0 C 20 74.3 44 74.9 66 75.4"
       id="path942" />
    <path
       
       class="grain"
       d="M 0 79.0 C 20 77.2 44 80.9 66 78.0"
       id="path944" />
    <path
       
       class="grain"
       d="M 0 83.0 C 20 84.0 44 84.4 66 82.0"
       id="path946" />
    <path
       
       class="grain"
       d="M 0 87.0 C 20 88.2 44 86.5 66 87.2"
       id="path948" />
  </g>
  <g
     id="layer1"
     transform="matrix(2.9665854,0,0,2.9597528,0.23960055,0.34031059)"
     inkscape:groupmode="layer"
     inkscape:label="table">
    <g
       id="art-back"
       
       transform="matrix(0.96682028,0,0,0.96797088,0.36995392,0.48960874)"
       style="stroke-width:1.0337">
      <path
         
         class="cabinet"
         d="M 20.2,29.25 H 22 V 4.7 C 22,2.27 20.03,0.3 17.6,0.3 H 2.9 C 1.464,0.3 0.3,1.464 0.3,2.9 v 26.8 z"
         id="path955"
         style="fill:url(#cw-felt);stroke-width:1.0337" />
      <path
         
         class="chevron"
         d="m 20.72,18.7 0.4,-0.3 0.4,0.3"
         id="path957" />
      <path
         
         class="chevron"
         d="m 20.72,17.2 0.4,-0.3 0.4,0.3"
         id="path959" />
      <path
         
         class="chevron"
         d="m 20.72,15.7 0.4,-0.3 0.4,0.3"
         id="path961" />
      <path
         
         class="chevron"
         d="m 20.72,14.2 0.4,-0.3 0.4,0.3"
         id="path963" />
      <path
         
         class="chevron"
         d="m 20.72,12.7 0.4,-0.3 0.4,0.3"
         id="path965" />
      <path
         
         class="sling-body"
         d="m 3.3,19.8 v 3.4 l 2.5,1.1 z"
         id="path967"
         style="stroke-width:1.0337" />
      <path
         
         class="sling-body"
         d="m 17.4,19.8 v 3.4 l -2.5,1.1 z"
         id="path969"
         style="stroke-width:1.0337" />
      <rect
         
         class="channel"
         x="0.44999999"
         y="8.3999996"
         width="1.75"
         height="2.9000001"
         rx="0.2"
         id="rect971"
         style="stroke-width:1.0337" />
      <circle
         
         class="saucer-ring"
         cx="3.2"
         cy="12.9"
         r="0.60000002"
         id="circle973" />
      <circle
         
         class="saucer-ring"
         cx="17.9"
         cy="13.9"
         r="0.60000002"
         id="circle975" />
      <circle
         
         class="gauge"
         cx="17.200001"
         cy="3.3"
         r="0.75"
         id="circle977" />
      <!-- the gauge's scale: a sweep of ticks from lower left over the top to lower right, longer every third,
           and a red zone before its end -->
      <g
         id="gauge-scale"
         >
        <path class="gauge-red" d="M 17.800,3.300 A 0.6,0.6 0 0 1 17.624,3.724" />
        <line class="gauge-tick major" x1="16.875" y1="3.625" x2="16.747" y2="3.753" />
        <line class="gauge-tick" x1="16.758" y1="3.610" x2="16.676" y2="3.667" />
        <line class="gauge-tick" x1="16.711" y1="3.528" x2="16.620" y2="3.570" />
        <line class="gauge-tick major" x1="16.756" y1="3.419" x2="16.582" y2="3.466" />
        <line class="gauge-tick" x1="16.662" y1="3.347" x2="16.562" y2="3.356" />
        <line class="gauge-tick" x1="16.662" y1="3.253" x2="16.562" y2="3.244" />
        <line class="gauge-tick major" x1="16.756" y1="3.181" x2="16.582" y2="3.134" />
        <line class="gauge-tick" x1="16.711" y1="3.072" x2="16.620" y2="3.030" />
        <line class="gauge-tick" x1="16.758" y1="2.990" x2="16.676" y2="2.933" />
        <line class="gauge-tick major" x1="16.875" y1="2.975" x2="16.747" y2="2.847" />
        <line class="gauge-tick" x1="16.890" y1="2.858" x2="16.833" y2="2.776" />
        <line class="gauge-tick" x1="16.972" y1="2.811" x2="16.930" y2="2.720" />
        <line class="gauge-tick major" x1="17.081" y1="2.856" x2="17.034" y2="2.682" />
        <line class="gauge-tick" x1="17.153" y1="2.762" x2="17.144" y2="2.662" />
        <line class="gauge-tick" x1="17.247" y1="2.762" x2="17.256" y2="2.662" />
        <line class="gauge-tick major" x1="17.319" y1="2.856" x2="17.366" y2="2.682" />
        <line class="gauge-tick" x1="17.428" y1="2.811" x2="17.470" y2="2.720" />
        <line class="gauge-tick" x1="17.510" y1="2.858" x2="17.567" y2="2.776" />
        <line class="gauge-tick major" x1="17.525" y1="2.975" x2="17.653" y2="2.847" />
        <line class="gauge-tick" x1="17.642" y1="2.990" x2="17.724" y2="2.933" />
        <line class="gauge-tick" x1="17.689" y1="3.072" x2="17.780" y2="3.030" />
        <line class="gauge-tick major" x1="17.644" y1="3.181" x2="17.818" y2="3.134" />
        <line class="gauge-tick" x1="17.738" y1="3.253" x2="17.838" y2="3.244" />
        <line class="gauge-tick" x1="17.738" y1="3.347" x2="17.838" y2="3.356" />
        <line class="gauge-tick major" x1="17.644" y1="3.419" x2="17.818" y2="3.466" />
        <line class="gauge-tick" x1="17.689" y1="3.528" x2="17.780" y2="3.570" />
        <line class="gauge-tick" x1="17.642" y1="3.610" x2="17.724" y2="3.667" />
        <line class="gauge-tick major" x1="17.525" y1="3.625" x2="17.653" y2="3.753" />
      </g>
      <line
         
         class="needle"
         x1="16.700001"
         y1="2.8499999"
         x2="17.200001"
         y2="3.3"
         id="line979" />
      <circle
         
         class="gauge-hub"
         cx="17.200001"
         cy="3.3"
         r="0.09"
         id="gauge-hub" />
      <circle
         
         class="magnet-glow"
         data-part="magnet-1"
         cx="10.35"
         cy="13.2"
         r="1.25"
         id="circle981" />
      <circle
         
         class="lamp"
         data-light="lock-1"
         cx="17.15"
         cy="14.85"
         r="0.2"
         id="circle983" />
      <circle
         
         class="lamp"
         data-light="lock-2"
         cx="17.65"
         cy="15.05"
         r="0.2"
         id="circle985" />
      <text
         
         class="lamp-text"
         x="17.700001"
         y="13.1"
         id="text987"
         style="font-style:normal;font-variant:normal;font-weight:700;font-stretch:normal;font-size:0.42px;line-height:normal;font-family:Georgia, 'Times New Roman', serif;stroke-width:1.06854">VAULT</text>
      <circle
         
         class="lamp"
         data-light="multiball"
         cx="10.35"
         cy="11.45"
         r="0.22"
         id="circle989" />
      <path
         
         class="plunger-spring"
         d="m 20.75,27.75 0.7,0.15 -0.7,0.15 0.7,0.15 -0.7,0.15 0.7,0.15 -0.7,0.15 0.7,0.15 -0.7,0.15 0.7,0.15"
         id="path991" />
    </g>
    <g
       id="walls"
       class="walls"
       transform="matrix(0.96682028,0,0,0.96797088,0.36995392,0.48960874)"
       style="stroke-width:1.0337">
      <path
         id="outer-wall"
         inkscape:label="wall"
         class="wall"
         d="M 20.2,29.25 H 22 V 4.7 C 22,2.27 20.03,0.3 17.6,0.3 H 2.9 C 1.464,0.3 0.3,1.464 0.3,2.9 v 26.8" />
      <path
         id="lane-wall"
         inkscape:label="wall"
         class="wall"
         d="M 20.2,5.4 V 29.25" />
      <path
         id="lower-wall-0"
         inkscape:label="wall"
         class="wall"
         d="m 1.65,18.6 v 5.2 l 4.55,2.6" />
      <path
         id="lower-wall-1"
         inkscape:label="wall"
         class="wall"
         d="m 3.3,19.8 v 3.4 l 2.5,1.1" />
      <path
         id="lower-wall-2"
         inkscape:label="wall"
         class="wall"
         d="m 19.05,18.6 v 5.2 l -4.55,2.6" />
      <path
         id="lower-wall-3"
         inkscape:label="wall"
         class="wall"
         d="m 17.4,19.8 v 3.4 l -2.5,1.1" />
    </g>
    <path
       id="drain"
       class="drain"
       inkscape:label="drain"
       d="M 0.66,28.635524 H 19.899724" />
    <path
       id="sling-0"
       class="sling"
       inkscape:label="slingshot"
       d="m 3.3,19.8 2.5,4.5"
       transform="matrix(0.96682028,0,0,0.96797088,0.36995392,0.48960874)" />
    <path
       id="sling-1"
       class="sling"
       inkscape:label="slingshot"
       d="m 17.4,19.8 -2.5,4.5"
       transform="matrix(0.96682028,0,0,0.96797088,0.36995392,0.48960874)" />
    <path
       id="ledge-0"
       inkscape:label="wall"
       class="wall guide"
       d="m 19.899724,25.027671 0.512414,0.300071" />
    <path
       id="ledge-1"
       inkscape:label="wall"
       class="wall guide"
       d="M 21.127585,25.308382 21.64,25.008311" />
    <ellipse
       id="divider-post-0"
       class="post"
       inkscape:label="post"
       cx="1.9652073"
       cy="18.493868"
       rx="0.21270046"
       ry="0.2129536" />
    <ellipse
       id="divider-post-1"
       class="post"
       inkscape:label="post"
       cx="18.78788"
       cy="18.493868"
       rx="0.21270046"
       ry="0.2129536" />
    <rect
       id="kickback"
       class="kicker"
       inkscape:label="kicker"
       x="0.75668204"
       y="26.237635"
       width="1.1118433"
       height="0.29039127"
       style="fill:url(#linearGradient1834)" />
    <path
       id="guide-0"
       inkscape:label="wall"
       class="wall guide"
       d="M 7.0410139,1.9415651 V 3.1999272" />
    <ellipse
       id="post-0"
       class="post"
       inkscape:label="post"
       cx="7.0410137"
       cy="3.3451228"
       rx="0.21270046"
       ry="0.2129536" />
    <path
       id="guide-1"
       inkscape:label="wall"
       class="wall guide"
       d="M 9.2647005,1.9415651 V 3.1999272" />
    <ellipse
       id="post-1"
       class="post"
       inkscape:label="post"
       cx="9.2646999"
       cy="3.3451228"
       rx="0.21270046"
       ry="0.2129536" />
    <path
       id="guide-2"
       inkscape:label="wall"
       class="wall guide"
       d="M 11.488387,1.9415651 V 3.1999272" />
    <ellipse
       id="post-2"
       class="post"
       inkscape:label="post"
       cx="11.488387"
       cy="3.3451228"
       rx="0.21270046"
       ry="0.2129536" />
    <path
       id="guide-3"
       inkscape:label="wall"
       class="wall guide"
       d="M 13.712074,1.9415651 V 3.1999272" />
    <ellipse
       id="post-3"
       class="post"
       inkscape:label="post"
       cx="13.712074"
       cy="3.3451228"
       rx="0.21270046"
       ry="0.2129536" />
    <ellipse
       id="rollover-0"
       class="rollover"
       inkscape:label="rollover"
       data-group="top"
       cx="8.1528578"
       cy="2.6191447"
       rx="0.2900461"
       ry="0.29039127" />
    <ellipse
       id="rollover-1"
       class="rollover"
       inkscape:label="rollover"
       data-group="top"
       cx="10.376544"
       cy="2.6191447"
       rx="0.2900461"
       ry="0.29039127" />
    <ellipse
       id="rollover-2"
       class="rollover"
       inkscape:label="rollover"
       data-group="top"
       cx="12.60023"
       cy="2.6191447"
       rx="0.2900461"
       ry="0.29039127" />
    <circle
       id="bumper-0"
       class="bumper"
       inkscape:label="bumper"
       cx="8.3000002"
       cy="7.5"
       r="0.94999999"
       transform="matrix(0.96682028,0,0,0.96797088,0.36995392,0.48960874)"
       style="fill:url(#radialGradient1832)" />
    <path
       
       class="bumper-teeth"
       d="m 8.9640194,7.7493903 0.1382553,0.1122847 -0.026104,0.1093807 -0.1740276,0.036783 -0.046407,0.07647 0.045441,0.1722988 -0.08508,0.072598 -0.1633926,-0.07163 -0.08218,0.033879 -0.06381,0.166491 -0.1121512,0.00871 L 8.3056148,8.3127494 8.218601,8.291454 8.0697106,8.3882511 7.9730286,8.3292049 7.992365,8.1520662 7.933389,8.0843083 7.7564609,8.0746286 7.7129539,7.9710557 7.8318728,7.8384437 7.8251051,7.7493903 7.6868498,7.6371057 7.7129539,7.527725 7.8869816,7.490942 l 0.046407,-0.07647 -0.045441,-0.1722988 0.08508,-0.072598 0.1633926,0.07163 0.08218,-0.033879 0.06381,-0.1664909 0.1121511,-0.00871 0.088948,0.1539074 0.087014,0.021295 0.1488904,-0.096797 0.096682,0.059046 -0.019336,0.1771387 0.058976,0.067758 0.1769281,0.00968 0.043507,0.1035729 -0.1189189,0.132612 z"
       data-part="bumper-0"
       id="path1021" />
    <ellipse
       
       class="bumper-cap"
       data-part="bumper-0"
       cx="8.3945627"
       cy="7.7493901"
       id="circle1023"
       rx="0.33065253"
       ry="0.33104604" />
    <circle
       id="bumper-1"
       class="bumper"
       inkscape:label="bumper"
       cx="12.4"
       cy="7.5"
       r="0.94999999"
       transform="matrix(0.96682028,0,0,0.96797088,0.36995392,0.48960874)"
       style="fill:url(#radialGradient1830)" />
    <path
       
       class="bumper-teeth"
       d="m 12.927983,7.7493903 0.138255,0.1122847 -0.0261,0.1093807 -0.174028,0.036783 -0.04641,0.07647 0.04544,0.1722988 -0.08508,0.072598 -0.163393,-0.07163 -0.08218,0.033879 -0.06381,0.166491 -0.112152,0.00871 -0.08895,-0.1539074 -0.08701,-0.021295 -0.14889,0.096797 -0.09668,-0.059046 0.01934,-0.1771387 -0.05898,-0.067758 -0.176928,-0.00968 -0.04351,-0.1035729 0.118919,-0.132612 -0.0068,-0.089053 -0.138255,-0.1122846 0.0261,-0.1093807 0.174028,-0.036783 0.04641,-0.07647 -0.04544,-0.1722988 0.08508,-0.072598 0.163392,0.07163 0.08218,-0.033879 0.06381,-0.1664909 0.112151,-0.00871 0.08895,0.1539074 0.08701,0.021295 0.14889,-0.096797 0.09668,0.059046 -0.01934,0.1771387 0.05898,0.067758 0.176928,0.00968 0.04351,0.1035729 -0.118919,0.132612 z"
       data-part="bumper-1"
       id="path1026" />
    <ellipse
       
       class="bumper-cap"
       data-part="bumper-1"
       cx="12.358525"
       cy="7.7493901"
       id="circle1028"
       rx="0.33065253"
       ry="0.33104604" />
    <circle
       id="bumper-2"
       class="bumper"
       inkscape:label="bumper"
       cx="10.35"
       cy="10.1"
       r="0.94999999"
       transform="matrix(0.96682028,0,0,0.96797088,0.36995392,0.48960874)"
       style="fill:url(#radialGradient1828)" />
    <path
       
       class="bumper-teeth"
       d="m 10.946001,10.266115 0.138255,0.112284 -0.0261,0.109381 -0.174028,0.03678 -0.04641,0.07647 0.04544,0.172298 -0.08508,0.0726 -0.163392,-0.07163 -0.08218,0.03388 -0.06381,0.166491 -0.112151,0.0087 -0.08895,-0.153907 -0.08701,-0.0213 -0.148891,0.0968 -0.096682,-0.05905 0.019336,-0.177138 -0.058976,-0.06776 -0.1769281,-0.0097 -0.043507,-0.103573 0.1189189,-0.132612 -0.00677,-0.08905 -0.1382553,-0.112285 0.026104,-0.109381 0.1740277,-0.03678 0.046407,-0.076469 -0.04544,-0.1722988 0.08508,-0.072598 0.1633928,0.07163 0.08218,-0.033879 0.06381,-0.166491 0.112151,-0.00871 0.08895,0.1539074 0.08701,0.021295 0.14889,-0.096797 0.09668,0.059046 -0.01934,0.1771386 0.05898,0.067758 0.176928,0.00968 0.04351,0.1035728 -0.118919,0.132612 z"
       data-part="bumper-2"
       id="path1031" />
    <ellipse
       
       class="bumper-cap"
       data-part="bumper-2"
       cx="10.376544"
       cy="10.266115"
       id="circle1033"
       rx="0.33065253"
       ry="0.33104604" />
    <ellipse
       id="disc-1"
       class="disc"
       inkscape:label="disc"
       cx="3.2704148"
       cy="7.0718107"
       style="fill:url(#cw-disc)"
       rx="1.4502305"
       ry="1.4519563" />
    <path
       
       class="disc-teeth"
       d="M 4.4305991,7.0718107 4.6413659,7.2073266 4.6220295,7.3409066 4.3803244,7.4086646 4.3426185,7.5161094 4.4857079,7.7222872 4.4160968,7.8384437 4.167624,7.8084366 4.0912452,7.893618 4.1444203,8.1385146 4.0361364,8.2188562 3.817635,8.0959239 3.7141853,8.1452904 3.6706784,8.392123 3.5391908,8.425034 3.3844996,8.227568 3.2704148,8.2333758 3.1350599,8.4443934 3.0016387,8.425034 2.9339613,8.1830413 2.8266443,8.1452904 2.6207115,8.2885501 2.5046931,8.2188562 2.5346645,7.9700877 2.4495843,7.893618 2.2049788,7.9468564 2.1247327,7.8384437 2.2475189,7.6196822 2.1982111,7.5161094 1.9516719,7.4725507 1.9188,7.3409066 2.1160313,7.1860313 2.1102304,7.0718107 1.8994636,6.9362948 1.9188,6.8027148 2.1605051,6.7349569 2.1982111,6.6275121 2.0551217,6.4213343 2.1247327,6.3051778 2.3732055,6.3351849 2.4495843,6.2500034 2.3964092,6.0051068 2.5046931,5.9247652 2.7231945,6.0476975 2.8266443,5.998331 2.8701512,5.7514984 3.0016387,5.7185874 3.15633,5.9160535 3.2704148,5.9102457 3.4057696,5.699228 l 0.1334212,0.019359 0.067677,0.2419928 0.1073171,0.037751 0.2059327,-0.1432597 0.1160184,0.069694 -0.029971,0.2487685 0.08508,0.07647 0.2446055,-0.053238 0.080246,0.1084128 -0.1227862,0.2187614 0.049308,0.1035729 0.2465391,0.043559 0.032872,0.131644 -0.1972313,0.1548754 z"
       data-part="disc-1"
       id="path1036" />
    <line
       
       class="disc-spoke"
       data-part="disc-1"
       x1="2.2552536"
       y1="7.0718107"
       x2="4.2855763"
       y2="7.0718107"
       id="line1038" />
    <line
       
       class="disc-spoke"
       data-part="disc-1"
       x1="2.7628341"
       y1="6.191925"
       x2="3.7779956"
       y2="7.9516964"
       id="line1040" />
    <line
       
       class="disc-spoke"
       data-part="disc-1"
       x1="3.7779956"
       y1="6.191925"
       x2="2.7628341"
       y2="7.9516964"
       id="line1042" />
    <ellipse
       id="magnet-1"
       class="magnet"
       inkscape:label="magnet"
       cx="10.376544"
       cy="13.266824"
       style="fill:url(#cw-coil)"
       rx="1.0635023"
       ry="1.064768" />
    <ellipse
       
       class="coil"
       cx="10.376544"
       cy="13.266824"
       id="circle1045"
       rx="0.37222579"
       ry="0.37266877" />
    <ellipse
       
       class="coil"
       cx="10.376544"
       cy="13.266824"
       id="circle1047"
       rx="0.58492631"
       ry="0.58562243" />
    <ellipse
       
       class="coil"
       cx="10.376544"
       cy="13.266824"
       id="circle1049"
       rx="0.79762673"
       ry="0.79857594" />
    <ellipse
       id="saucer-1"
       class="saucer"
       inkscape:label="saucer"
       data-direction="45"
       cx="3.463779"
       cy="12.976433"
       rx="0.3383871"
       ry="0.33878979" />
    <ellipse
       id="lock-1"
       class="lock"
       inkscape:label="lock"
       data-locks="2"
       data-direction="235"
       cx="17.676037"
       cy="13.944404"
       rx="0.3383871"
       ry="0.33878979" />
    <path
       id="channel"
       inkscape:label="wall"
       class="wall"
       d="M 0.80502305,11.42768 V 8.6205641 H 2.4969585 V 11.42768" />
    <rect
       id="captive-target"
       class="target"
       inkscape:label="target"
       data-points="1000"
       x="1.0950692"
       y="8.7173615"
       width="1.1118433"
       height="0.2129536" />
    <ellipse
       id="captive-post-0"
       class="post"
       inkscape:label="post"
       cx="1.1724148"
       cy="11.379281"
       rx="0.19336405"
       ry="0.19359417" />
    <ellipse
       id="captive-post-1"
       class="post"
       inkscape:label="post"
       cx="2.139235"
       cy="11.379281"
       rx="0.19336405"
       ry="0.19359417" />
    <rect
       id="target-0"
       class="target"
       inkscape:label="target"
       data-group="right"
       x="19.580673"
       y="10.556505"
       width="0.27070969"
       height="0.91957235" />
    <rect
       id="target-1"
       class="target"
       inkscape:label="target"
       data-group="right"
       x="19.580673"
       y="11.911665"
       width="0.27070969"
       height="0.91957235" />
    <rect
       id="drop-0"
       class="drop-target"
       inkscape:label="drop-target"
       data-group="bank"
       x="8.4429035"
       y="15.251164"
       width="0.9668203"
       height="0.30975068"
       style="fill:url(#linearGradient1826)" />
    <rect
       id="drop-1"
       class="drop-target"
       inkscape:label="drop-target"
       data-group="bank"
       x="9.8931341"
       y="15.251164"
       width="0.9668203"
       height="0.30975068"
       style="fill:url(#linearGradient1824)" />
    <rect
       id="drop-2"
       class="drop-target"
       inkscape:label="drop-target"
       data-group="bank"
       x="11.343365"
       y="15.251164"
       width="0.9668203"
       height="0.30975068"
       style="fill:url(#linearGradient1822)" />
    <rect
       id="spinner-1"
       class="spinner"
       inkscape:label="spinner"
       x="14.659557"
       y="15.347962"
       width="1.1988572"
       height="0.15487534" />
    <path
       id="gate-1"
       class="gate"
       inkscape:label="gate"
       data-direction="up"
       d="M 19.948065,5.6682529 21.591659,4.8938762" />
    <path
       id="flipper-left"
       class="flipper"
       inkscape:label="flipper-left"
       d="M 6.6001,26.4599 9.3,27.7866 9.4366,27.75 9.4,27.6134 6.8999,25.9401 l -0.4098,0.11 z"
       transform="matrix(0.96682028,0.0,0.0,0.96797088,-0.03121058,1.51489374)"
       style="fill:url(#linearGradient1820)" />
    <ellipse
       id="pivot-flipper-left"
       class="pivot"
       inkscape:label="flipper-anchor-left"
       cx="6.4948263"
       cy="26.875732"
       rx="0.24170507"
       ry="0.24199273" />
    <path
       id="flipper-right"
       class="flipper"
       inkscape:label="flipper-right"
       d="M 13.8001,25.9401 11.3,27.6134 11.2634,27.75 11.4,27.7866 l 2.6999,-1.3267 0.11,-0.4098 z"
       transform="matrix(0.96682028,0.0,0.0,0.96797088,0.71779792,1.51517874)"
       style="fill:url(#linearGradient1818)" />
    <ellipse
       id="pivot-flipper-right"
       class="pivot"
       inkscape:label="flipper-anchor-right"
       cx="14.204941"
       cy="26.876017"
       rx="0.24170507"
       ry="0.24199273" />
    <path
       id="flipper-upper"
       class="flipper"
       inkscape:label="flipper-right"
       d="m 19.4447,15.6191 -1.9298,0.9373 -0.0585,0.1287 0.1287,0.0585 2.0702,-0.5627 0.1756,-0.3862 z"
       transform="matrix(0.96682028,0,0,0.96797088,0.36995392,0.48960874)"
       style="fill:url(#linearGradient1816)" />
    <ellipse
       id="pivot-flipper-upper"
       class="pivot"
       inkscape:label="flipper-anchor-right"
       cx="19.27129"
       cy="15.880345"
       rx="0.24170507"
       ry="0.24199273" />
    <rect
       id="plunger"
       class="plunger"
       inkscape:label="plunger"
       x="20.67318"
       y="25.560055"
       width="0.19336405"
       height="1.7423475"
       style="fill:url(#linearGradient1814)" />
    <ellipse
       id="captive-ball"
       class="captive-ball"
       inkscape:label="captive-ball"
       cx="1.6558249"
       cy="10.653303"
       rx="0.38672811"
       ry="0.38718835" />
    <ellipse
       id="ball"
       class="ball"
       inkscape:label="ball"
       cx="20.769863"
       cy="24.688881"
       rx="0.38672811"
       ry="0.38718835" />
    <g
       id="apron"
       
       transform="matrix(0.96682028,0,0,0.96797088,0.36995392,0.36825999)"
       style="stroke-width:1.0337">
      <path
         
         class="apron"
         d="m 0.3,27.3 5.25,0.6 3.5,1.1 h 2.6 l 3.5,-1.1 5.05,-0.6 v 2.4 H 0.3 Z"
         id="path1073"
         style="fill:url(#linearGradient1573)" />
      <path
         
         class="apron-inset"
         d="m 9.55,29.25 h 1.6 v 0.25 h -1.6 z"
         id="path1075"
         style="stroke-width:1.0337" />
      <circle
         
         class="lamp"
         data-light="ball-save"
         cx="3.0999999"
         cy="28.549999"
         r="0.30000001"
         id="circle1077" />
      <text
         
         class="apron-text"
         x="3.0999999"
         y="29.450001"
         id="text1079"
         style="font-style:normal;font-variant:normal;font-weight:700;font-stretch:normal;font-size:0.5px;line-height:normal;font-family:Georgia, 'Times New Roman', serif;stroke-width:1.0337">SHOOT AGAIN</text>
      <circle
         
         class="lamp"
         data-light="ball-1"
         cx="16.9"
         cy="28.5"
         r="0.18000001"
         id="circle1081" />
      <circle
         
         class="lamp"
         data-light="ball-2"
         cx="17.5"
         cy="28.5"
         r="0.18000001"
         id="circle1083" />
      <circle
         
         class="lamp"
         data-light="ball-3"
         cx="18.1"
         cy="28.5"
         r="0.18000001"
         id="circle1085" />
      <text
         
         class="apron-text"
         x="17.5"
         y="29.450001"
         id="text1087"
         style="font-style:normal;font-variant:normal;font-weight:700;font-stretch:normal;font-size:0.5px;line-height:normal;font-family:Georgia, 'Times New Roman', serif;stroke-width:1.0337">BALL</text>
      <circle
         
         class="rivet"
         cx="0.69999999"
         cy="29.299999"
         r="0.090000004"
         id="circle1089"
         style="stroke-width:1.0337" />
      <circle
         
         class="rivet"
         cx="19.799999"
         cy="29.299999"
         r="0.090000004"
         id="circle1091"
         style="stroke-width:1.0337" />
    </g>
    <g
       id="ramp"
       
       transform="matrix(0.96682028,0,0,0.96797088,0.36995392,0.48960874)"
       style="stroke-width:1.0337">
      <path
         
         class="ramp-floor"
         d="M 15.4,14.8 V 6.6 C 15.4,5.716 14.684,5 13.8,5 H 7 C 6.116,5 5.4,5.716 5.4,6.6 v 7.5"
         id="path1094" />
      <line
         
         class="ramp-tie"
         x1="14.78"
         y1="13.8"
         x2="16.02"
         y2="13.8"
         id="line1096" />
      <line
         
         class="ramp-tie"
         x1="14.78"
         y1="12.4"
         x2="16.02"
         y2="12.4"
         id="line1098" />
      <line
         
         class="ramp-tie"
         x1="14.78"
         y1="11"
         x2="16.02"
         y2="11"
         id="line1100" />
      <line
         
         class="ramp-tie"
         x1="14.78"
         y1="9.6000004"
         x2="16.02"
         y2="9.6000004"
         id="line1102" />
      <line
         
         class="ramp-tie"
         x1="14.78"
         y1="8.1999998"
         x2="16.02"
         y2="8.1999998"
         id="line1104" />
      <line
         
         class="ramp-tie"
         x1="4.7800002"
         y1="13.2"
         x2="6.02"
         y2="13.2"
         id="line1106" />
      <line
         
         class="ramp-tie"
         x1="4.7800002"
         y1="11.8"
         x2="6.02"
         y2="11.8"
         id="line1108" />
      <line
         
         class="ramp-tie"
         x1="4.7800002"
         y1="10.4"
         x2="6.02"
         y2="10.4"
         id="line1110" />
      <line
         
         class="ramp-tie"
         x1="4.7800002"
         y1="9"
         x2="6.02"
         y2="9"
         id="line1112" />
      <line
         
         class="ramp-tie"
         x1="4.7800002"
         y1="7.5999999"
         x2="6.02"
         y2="7.5999999"
         id="line1114" />
      <line
         
         class="ramp-tie"
         x1="8"
         y1="4.3800001"
         x2="8"
         y2="5.6199999"
         id="line1116" />
      <line
         
         class="ramp-tie"
         x1="9.6000004"
         y1="4.3800001"
         x2="9.6000004"
         y2="5.6199999"
         id="line1118" />
      <line
         
         class="ramp-tie"
         x1="11.2"
         y1="4.3800001"
         x2="11.2"
         y2="5.6199999"
         id="line1120" />
      <line
         
         class="ramp-tie"
         x1="12.8"
         y1="4.3800001"
         x2="12.8"
         y2="5.6199999"
         id="line1122" />
      <path
         
         class="ramp-arrow"
         d="m 15,13.75 0.4,-0.35 0.4,0.35 z"
         id="path1124"
         style="stroke-width:1.06854" />
      <path
         
         class="ramp-arrow"
         d="m 15,12.95 0.4,-0.35 0.4,0.35 z"
         id="path1126"
         style="stroke-width:1.06854" />
      <path
         
         class="ramp-arrow"
         d="m 15,12.15 0.4,-0.35 0.4,0.35 z"
         id="path1128"
         style="stroke-width:1.06854" />
    </g>
    <path
       id="ramp-outer"
       class="ramp-wall"
       inkscape:label="ramp-wall"
       d="M 16.02,14.8 V 6.6 C 16.02,5.374 15.026,4.38 13.8,4.38 H 7 C 5.774,4.38 4.78,5.374 4.78,6.6 v 7.5"
       transform="matrix(0.96682028,0,0,0.96797088,0.36995392,0.48960874)" />
    <path
       id="ramp-inner"
       class="ramp-wall"
       inkscape:label="ramp-wall"
       d="M 14.78,14.8 V 6.6 C 14.78,6.059 14.341,5.62 13.8,5.62 H 7 C 6.459,5.62 6.02,6.059 6.02,6.6 v 7.5"
       transform="matrix(0.96682028,0,0,0.96797088,0.36995392,0.48960874)" />
    <path
       id="ramp-enter"
       class="ramp-enter"
       inkscape:label="ramp-enter"
       data-direction="up"
       d="m 14.659558,14.670382 h 1.198857"
       style="stroke-width:0.999997" />
    <path
       id="ramp-exit"
       class="ramp-exit"
       inkscape:label="ramp-exit"
       d="M 4.9913549,13.944404 H 6.190212"
       style="stroke-width:0.999997" />
  </g>
</svg>
`,Ch=`<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!-- Created with Inkscape (http://www.inkscape.org/) -->

<svg
   width="66"
   height="90"
   viewBox="0 0 66 90"
   version="1.1"
   id="svg5"
   data-name="Ghost"
   data-color="#ff4fd8"
   data-blurb="Neon on a haunted night"
   data-order="2"
   sodipodi:docname="ghost.svg"
   inkscape:version="1.1.1 (c3084ef, 2021-09-22)"
   xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape"
   xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd"
   xmlns:xlink="http://www.w3.org/1999/xlink"
   xmlns="http://www.w3.org/2000/svg"
   xmlns:svg="http://www.w3.org/2000/svg">
  <sodipodi:namedview
     id="namedview846"
     pagecolor="#ffffff"
     bordercolor="#000000"
     borderopacity="0.25"
     inkscape:pageshadow="2"
     inkscape:pageopacity="0.0"
     inkscape:pagecheckerboard="0"
     showgrid="false"
     inkscape:zoom="10.46293"
     inkscape:cx="26.187694"
     inkscape:cy="55.76832"
     inkscape:window-width="1512"
     inkscape:window-height="916"
     inkscape:window-x="0"
     inkscape:window-y="38"
     inkscape:window-maximized="1"
     inkscape:current-layer="layer-sky"
     inkscape:snap-global="false" />
  <style
     id="style1">
    /* the table: neon on a haunted night. Shapes labelled &quot;art&quot; are decoration, and physics skips them */
    #svg5 .sky { fill: url(#sky); }
    #svg5 .haze { fill: url(#haze); }
    #svg5 .moon { fill: #fff6d8; filter: url(#glow); }
    #svg5 .star { fill: #fff; animation: twinkle 3s ease-in-out infinite; }
    #svg5 .walls { filter: url(#glow); }
    #svg5 .wall { fill: none; stroke: #8ff7ff; stroke-width: 0.16; stroke-linecap: round; stroke-linejoin: round; }
    #svg5 .guide { stroke-width: 0.1; }
    #svg5 .drain { fill: none; stroke: #8ff7ff; stroke-width: 0.16; stroke-linecap: round; stroke-linejoin: round; filter: url(#glow); }
    #svg5 .sling { fill: none; stroke: #ff4fd8; stroke-width: 0.26; stroke-linecap: round; filter: url(#glow); }
    #svg5 .bumper { stroke: #ff4fd8; stroke-width: 0.2; filter: url(#glow); }
    #svg5 .eye { fill: url(#eye); stroke: #8ff7ff; }
    #svg5 .mouth { fill: url(#mouth); }
    #svg5 .pupil { fill: #140a2e; }
    #svg5 .shine { fill: #fff; }
    #svg5 .cheek { fill: url(#blush); }
    #svg5 .bulb { fill: #ffd84d; animation: chase 1.8s linear infinite; }
    #svg5 .chevron { fill: none; stroke: #ffd84d; stroke-width: 0.14; stroke-linecap: round; stroke-linejoin: round; animation: chase 1s linear infinite; }
    #svg5 .kicker { fill: #ffb627; stroke: #fff3c4; stroke-width: 0.06; filter: url(#glow); }
    #svg5 .ball { fill: url(#moon-ball); filter: url(#glow); }
    #svg5 .flipper { fill: url(#flipper); stroke: #fff; stroke-width: 0.05; filter: url(#glow); }
    #svg5 .pivot { fill: #dfe6f5; stroke: #39425c; stroke-width: 0.06; }
    #svg5 .plunger { fill: url(#plunger); stroke: #fff; stroke-width: 0.03; }
    @keyframes twinkle { 0%, 100% { opacity: 0.25; } 50% { opacity: 1; } }
    @keyframes chase { 0%, 45%, 100% { opacity: 0.2; } 15% { opacity: 1; } }
  </style>
  <defs
     id="defs2">
    <!-- the ball, a little moon: a pale face lit from the upper left, like the moon in the corner, with craters.
         In the ball's own box, so they go where each ball goes -->
    <radialGradient
       id="moon-face"
       cx="0.38"
       cy="0.34"
       r="0.72">
      <stop
         offset="0"
         stop-color="#fffbea"
         id="stop826" />
      <stop
         offset="0.45"
         stop-color="#f6eed2"
         id="stop828" />
      <stop
         offset="0.8"
         stop-color="#dcd2b0"
         id="stop830" />
      <stop
         offset="1"
         stop-color="#b9ad8a"
         id="stop832" />
    </radialGradient>
    <pattern
       id="moon-ball"
       width="1"
       height="1"
       patternContentUnits="objectBoundingBox">
      <rect
         width="1"
         height="1"
         fill="url(#moon-face)"
         id="rect835" />
      <g
         fill="#b3a680"
         opacity="0.55"
         id="g847">
        <circle
           cx="0.64"
           cy="0.3"
           r="0.1"
           id="circle837" />
        <circle
           cx="0.36"
           cy="0.62"
           r="0.13"
           id="circle839" />
        <circle
           cx="0.7"
           cy="0.68"
           r="0.07"
           id="circle841" />
        <circle
           cx="0.3"
           cy="0.3"
           r="0.05"
           id="circle843" />
        <circle
           cx="0.52"
           cy="0.86"
           r="0.05"
           id="circle845" />
      </g>
      <!-- each crater's lit rim, on its lower right -->
      <g
         fill="none"
         stroke="#fffbea"
         stroke-width="0.02"
         opacity="0.6"
         id="g855">
        <path
           d="M 0.73,0.33 A 0.1,0.1 0 0 1 0.62,0.4"
           id="path849" />
        <path
           d="M 0.48,0.66 A 0.13,0.13 0 0 1 0.33,0.75"
           id="path851" />
        <path
           d="M 0.76,0.7 A 0.07,0.07 0 0 1 0.69,0.75"
           id="path853" />
      </g>
    </pattern>
    <radialGradient
       id="sky"
       cx="0.5"
       cy="0.42"
       r="0.75">
      <stop
         offset="0"
         stop-color="#2d1768"
         id="stop858" />
      <stop
         offset="0.6"
         stop-color="#1d0f45"
         id="stop860" />
      <stop
         offset="1"
         stop-color="#0b0620"
         id="stop862" />
    </radialGradient>
    <radialGradient
       id="haze"
       cx="0.5"
       cy="0.5"
       r="0.5">
      <stop
         offset="0"
         stop-color="#b9f8ff"
         stop-opacity="0.22"
         id="stop833" />
      <stop
         offset="1"
         stop-color="#b9f8ff"
         stop-opacity="0"
         id="stop835" />
    </radialGradient>
    <radialGradient
       id="eye"
       cx="0.5"
       cy="0.45"
       r="0.55">
      <stop
         offset="0"
         stop-color="#ffffff"
         id="stop838" />
      <stop
         offset="1"
         stop-color="#bfe9ff"
         id="stop840" />
    </radialGradient>
    <radialGradient
       id="mouth"
       cx="13.856406"
       cy="11.431536"
       r="24.941533"
       gradientTransform="matrix(0.94688602,0,0,1.2283452,-1.0302268,-0.95955525)"
       fx="13.856406"
       fy="11.431536"
       gradientUnits="userSpaceOnUse">
      <stop
         offset="0"
         stop-color="#050211"
         id="stop843" />
      <stop
         offset="0.75"
         stop-color="#2a0d4a"
         id="stop845" />
      <stop
         offset="1"
         stop-color="#6b1a78"
         id="stop847" />
    </radialGradient>
    <radialGradient
       id="blush"
       cx="0.5"
       cy="0.5"
       r="0.5">
      <stop
         offset="0"
         stop-color="#ff7ab8"
         stop-opacity="0.55"
         id="stop850" />
      <stop
         offset="1"
         stop-color="#ff7ab8"
         stop-opacity="0"
         id="stop852" />
    </radialGradient>
    <radialGradient
       id="chrome"
       cx="21.050299"
       cy="7.9986739"
       r="0.41617709"
       fx="21.050299"
       fy="7.9986739"
       gradientUnits="userSpaceOnUse">
      <stop
         offset="0"
         stop-color="#ffffff"
         id="stop855" />
      <stop
         offset="0.45"
         stop-color="#cfd8ea"
         id="stop857" />
      <stop
         offset="0.85"
         stop-color="#6b7892"
         id="stop859" />
      <stop
         offset="1"
         stop-color="#2b3242"
         id="stop861" />
    </radialGradient>
    <linearGradient
       id="flipper"
       x1="0"
       y1="0"
       x2="1"
       y2="0">
      <stop
         offset="0"
         stop-color="#ffd84d"
         id="stop864" />
      <stop
         offset="1"
         stop-color="#ff3d7f"
         id="stop866" />
    </linearGradient>
    <linearGradient
       id="plunger"
       x1="66.721935"
       y1="6.4005913"
       x2="66.721935"
       y2="7.0646463"
       gradientTransform="scale(0.31503233,3.1742774)"
       gradientUnits="userSpaceOnUse">
      <stop
         offset="0"
         stop-color="#ff5a5a"
         id="stop869" />
      <stop
         offset="1"
         stop-color="#8f1d2c"
         id="stop871" />
    </linearGradient>
    <!-- the crescent: the moon, less a disc -->
    <mask
       id="moon-bite"
       maskUnits="userSpaceOnUse"
       x="0"
       y="0"
       width="8"
       height="8">
      <rect
         
         x="0"
         y="0"
         width="8"
         height="8"
         fill="#fff"
         id="rect874" />
      <circle
         
         cx="4.1"
         cy="2.4"
         r="1.75"
         fill="#000"
         id="circle876" />
    </mask>
    <!-- neon: the shape, over two blurred copies of itself. Big enough, in the table's units, for any part wherever it moves -->
    <filter
       id="glow"
       filterUnits="userSpaceOnUse"
       x="-6"
       y="-6"
       width="36"
       height="48">
      <feGaussianBlur
         in="SourceGraphic"
         stdDeviation="0.22"
         result="blur"
         id="feGaussianBlur879" />
      <feMerge
         id="feMerge887">
        <feMergeNode
           in="blur"
           id="feMergeNode881" />
        <feMergeNode
           in="blur"
           id="feMergeNode883" />
        <feMergeNode
           in="SourceGraphic"
           id="feMergeNode885" />
      </feMerge>
    </filter>
    <linearGradient
       inkscape:collect="always"
       xlink:href="#flipper"
       id="linearGradient1399"
       x1="-6.9282032"
       y1="-5.1961524"
       x2="34.641016"
       y2="-5.1961524"
       gradientTransform="matrix(0.94080567,-0.0109151,-0.01451824,1.2364523,0.43366551,-1.3402718)"
       gradientUnits="userSpaceOnUse" />
    <linearGradient
       inkscape:collect="always"
       xlink:href="#flipper"
       id="linearGradient1401"
       x1="-6.9282032"
       y1="-5.1961524"
       x2="34.641016"
       y2="-5.1961524"
       gradientTransform="matrix(0.94080567,-0.0109151,-0.01451824,1.2364523,-1.3668149,-0.33486529)"
       gradientUnits="userSpaceOnUse" />
    <radialGradient
       inkscape:collect="always"
       xlink:href="#blush"
       id="radialGradient1407"
       cx="2.5102866"
       cy="12.237647"
       r="1.0198039"
       gradientTransform="matrix(1.3937784,0,0,0.83449628,-1.0302268,-0.95955525)"
       fx="2.5102866"
       fy="12.237647"
       gradientUnits="userSpaceOnUse" />
    <radialGradient
       inkscape:collect="always"
       xlink:href="#blush"
       id="radialGradient1409"
       cx="13.414344"
       cy="12.237647"
       r="1.0198039"
       gradientTransform="matrix(1.3937784,0,0,0.83449628,-1.0302268,-0.95955525)"
       fx="13.414344"
       fy="12.237647"
       gradientUnits="userSpaceOnUse" />
  </defs>
  <g
     id="layer-sky"
     inkscape:groupmode="layer"
     >
    <rect
       
       class="sky"
       x="0"
       y="0"
       width="66"
       height="90"
       id="rect891" />
    <ellipse
       
       class="haze"
       cx="31"
       cy="40"
       rx="30"
       ry="38"
       id="ellipse893" />
    <circle
       
       class="star"
       cx="21.73"
       cy="14.27"
       r="0.18"
       style="animation-delay:0.22s"
       id="circle897" />
    <circle
       
       class="star"
       cx="35.30"
       cy="33.18"
       r="0.18"
       style="animation-delay:2.73s"
       id="circle899" />
    <circle
       
       class="star"
       cx="14.74"
       cy="8.56"
       r="0.4"
       style="animation-delay:0.21s"
       id="circle901" />
    <circle
       
       class="star"
       cx="6.81"
       cy="38.36"
       r="0.18"
       style="animation-delay:2.84s"
       id="circle903" />
    <circle
       
       class="star"
       cx="41.36"
       cy="52.30"
       r="0.18"
       style="animation-delay:1.73s"
       id="circle905" />
    <circle
       
       class="star"
       cx="26.39"
       cy="86.91"
       r="0.18"
       style="animation-delay:1.67s"
       id="circle907" />
    <circle
       
       class="star"
       cx="9.52"
       cy="37.88"
       r="0.18"
       style="animation-delay:1.71s"
       id="circle909" />
    <circle
       
       class="star"
       cx="36.86"
       cy="61.02"
       r="0.18"
       style="animation-delay:1.74s"
       id="circle911" />
    <circle
       
       class="star"
       cx="41.89"
       cy="33.77"
       r="0.18"
       style="animation-delay:1.69s"
       id="circle913" />
    <circle
       
       class="star"
       cx="40.62"
       cy="44.68"
       r="0.4"
       style="animation-delay:2.33s"
       id="circle915" />
    <circle
       
       class="star"
       cx="30.80"
       cy="82.26"
       r="0.3"
       style="animation-delay:0.90s"
       id="circle917" />
    <circle
       
       class="star"
       cx="51.84"
       cy="62.51"
       r="0.22"
       style="animation-delay:0.25s"
       id="circle919" />
    <circle
       
       class="star"
       cx="20.22"
       cy="44.57"
       r="0.3"
       style="animation-delay:2.19s"
       id="circle921" />
    <circle
       
       class="star"
       cx="19.43"
       cy="87.26"
       r="0.18"
       style="animation-delay:1.54s"
       id="circle923" />
    <circle
       
       class="star"
       cx="11.56"
       cy="31.10"
       r="0.4"
       style="animation-delay:1.27s"
       id="circle925" />
    <circle
       
       class="star"
       cx="62.57"
       cy="7.83"
       r="0.3"
       style="animation-delay:1.02s"
       id="circle927" />
    <circle
       
       class="star"
       cx="23.41"
       cy="44.71"
       r="0.4"
       style="animation-delay:0.21s"
       id="circle929" />
    <circle
       
       class="star"
       cx="6.99"
       cy="24.75"
       r="0.18"
       style="animation-delay:0.18s"
       id="circle931" />
    <circle
       
       class="star"
       cx="31.900002"
       cy="61.950001"
       r="0.40000001"
       id="circle933" />
    <circle
       
       class="star"
       cx="25.69"
       cy="59.84"
       r="0.18"
       style="animation-delay:2.82s"
       id="circle935" />
    <circle
       
       class="star"
       cx="23.75"
       cy="54.76"
       r="0.4"
       style="animation-delay:0.18s"
       id="circle937" />
    <circle
       
       class="star"
       cx="50.17"
       cy="12.38"
       r="0.22"
       style="animation-delay:1.19s"
       id="circle939" />
    <circle
       
       class="star"
       cx="59.68"
       cy="44.69"
       r="0.22"
       style="animation-delay:1.35s"
       id="circle941" />
    <circle
       
       class="star"
       cx="36.16"
       cy="78.74"
       r="0.4"
       style="animation-delay:2.59s"
       id="circle943" />
    <circle
       
       class="star"
       cx="18.82"
       cy="37.55"
       r="0.3"
       style="animation-delay:2.05s"
       id="circle945" />
    <circle
       
       class="star"
       cx="25.35"
       cy="21.31"
       r="0.18"
       style="animation-delay:0.53s"
       id="circle947" />
    <circle
       
       class="star"
       cx="15.85"
       cy="21.53"
       r="0.4"
       style="animation-delay:2.49s"
       id="circle949" />
    <circle
       
       class="star"
       cx="12.67"
       cy="25.81"
       r="0.22"
       style="animation-delay:1.26s"
       id="circle951" />
    <circle
       
       class="star"
       cx="24.63"
       cy="50.84"
       r="0.22"
       style="animation-delay:2.07s"
       id="circle953" />
    <circle
       
       class="star"
       cx="33.99"
       cy="55.35"
       r="0.18"
       style="animation-delay:1.37s"
       id="circle955" />
    <circle
       
       class="star"
       cx="56.74"
       cy="84.77"
       r="0.4"
       style="animation-delay:1.19s"
       id="circle957" />
    <circle
       
       class="star"
       cx="5.31"
       cy="19.37"
       r="0.22"
       style="animation-delay:0.33s"
       id="circle961" />
    <circle
       
       class="star"
       cx="39.45"
       cy="10.01"
       r="0.22"
       style="animation-delay:1.61s"
       id="circle963" />
    <circle
       
       class="star"
       cx="61.73"
       cy="55.01"
       r="0.18"
       style="animation-delay:2.62s"
       id="circle965" />
    <circle
       
       class="star"
       cx="40.30"
       cy="14.07"
       r="0.3"
       style="animation-delay:2.87s"
       id="circle967" />
    <circle
       
       class="star"
       cx="39.55"
       cy="42.73"
       r="0.18"
       style="animation-delay:2.55s"
       id="circle969" />
    <circle
       
       class="star"
       cx="64.56"
       cy="42.01"
       r="0.4"
       style="animation-delay:0.94s"
       id="circle971" />
    <circle
       
       class="star"
       cx="10.22"
       cy="66.97"
       r="0.3"
       style="animation-delay:1.44s"
       id="circle973" />
    <circle
       
       class="star"
       cx="45.29"
       cy="46.44"
       r="0.22"
       style="animation-delay:2.85s"
       id="circle975" />
    <circle
       
       class="star"
       cx="34.81"
       cy="13.90"
       r="0.18"
       style="animation-delay:2.27s"
       id="circle977" />
    <circle
       
       class="star"
       cx="20.08"
       cy="57.58"
       r="0.18"
       style="animation-delay:2.09s"
       id="circle979" />
    <circle
       
       class="star"
       cx="17.71"
       cy="33.27"
       r="0.22"
       style="animation-delay:1.07s"
       id="circle981" />
    <circle
       
       class="star"
       cx="15.26"
       cy="48.66"
       r="0.3"
       style="animation-delay:1.91s"
       id="circle983" />
    <circle
       
       class="star"
       cx="40.25"
       cy="70.38"
       r="0.22"
       style="animation-delay:2.42s"
       id="circle985" />
    <circle
       
       class="star"
       cx="53.37"
       cy="66.11"
       r="0.22"
       style="animation-delay:0.60s"
       id="circle987" />
  </g>
  <g
     id="layer1"
     transform="matrix(2.9665854,0,0,2.9597528,0.23960055,0.34031059)"
     inkscape:groupmode="layer"
     inkscape:label="table">
    <g
       id="walls"
       class="walls"
       transform="matrix(0.91460364,0,0,0.94004561,0.9422492,0.9020257)"
       style="stroke-width:1.07847">
      <path
         d="m 4.0664818,15.736794 c 0,0 -2.0575217,-0.165397 -2.3628557,1.632801 -0.305334,1.798196 0.2330996,8.492964 -0.3333495,9.123048 -0.56644903,0.630084 -0.90026203,0.70411 -1.22303746,0.100986 C -0.17553628,25.99051 -0.01814084,7.3818153 -0.01814084,7.3818153 c 0,0 -0.41325937,-7.26259506 4.37368564,-7.29737834 2.7147557,-0.01972618 4.4578004,2.64686434 6.3428282,2.64910604 1.889501,0.00225 5.113144,-3.16624671 7.408597,-2.73823197 4.153881,0.77454102 3.819555,6.58252327 3.957965,7.81482107 0.13841,1.2322978 -0.0091,20.0621359 -0.0091,20.0621359"
         id="path1097"
         inkscape:label="wall"
         class="wall"
         sodipodi:nodetypes="czzzcssszc" />
      <path
         d="m 20.153784,6.8776748 c 0,0 0.507637,16.3980392 -0.412763,17.3084122 -0.9204,0.910373 -1.599439,-0.320969 -1.561231,-0.952004 C 18.218,22.603048 18.16186,20.993035 18.16003,18.017 18.15823,15.040965 15.950131,15.639975 15.950131,15.639975"
         id="path3273-8"
         inkscape:label="wall"
         class="wall"
         sodipodi:nodetypes="czzzc" />
      <path
         d="m 3.617972,17.822133 c 0,0 -0.2817543,1.067222 -0.3211447,2.350304 -0.055335,1.802443 -0.072827,3.41645 0.4442702,4.595878 0.4759946,1.085679 1.9183497,2.325012 1.9183497,2.325012"
         id="path1179"
         inkscape:label="wall"
         class="wall"
         sodipodi:nodetypes="cssc" />
      <path
         d="m 5.3276047,19.802868 c 0,0 -0.5441238,-0.892678 -0.6465498,0.189478 -0.1189072,1.256288 0.078205,3.01151 0.4925527,3.796192 0.4141616,0.784329 1.7580266,2.288548 2.3347431,2.146748 0.5090023,-0.12515 0.2131166,-0.638806 0.2131166,-0.638806"
         id="path1179-2"
         inkscape:label="wall"
         class="wall"
         sodipodi:nodetypes="csssc" />
      <path
         d="m 13.286925,27.031926 c 0,0 1.974927,-1.102997 2.816016,-2.658651 0.84109,-1.555654 0.297868,-6.331982 0.297868,-6.331982"
         id="path1181"
         inkscape:label="wall"
         class="wall"
         sodipodi:nodetypes="czc" />
      <path
         d="m 11.864604,24.466556 c 0,0 -0.320928,0.774171 0.566141,0.371888 0.490457,-0.222421 1.346787,-0.64596 1.821932,-1.318784 0.47992,-0.679586 0.944183,-2.888038 0.775397,-4.046393 -0.146707,-1.006826 -0.616271,-0.168149 -0.616271,-0.168149"
         id="path1181-2"
         inkscape:label="wall"
         class="wall"
         sodipodi:nodetypes="csssc" />
      <path
         d="M 20.743428,20.157822 20.254086,19.867173"
         id="path6628"
         inkscape:label="wall"
         class="wall guide" />
      <path
         d="m 21.468378,20.139656 0.598083,-0.308814"
         id="path6630"
         inkscape:label="wall"
         class="wall guide" />
    </g>
    <path
       d="m 2.3850276,26.614645 c 0,0 -1.3562208,0.157895 -1.3458447,1.209981 0.010376,1.052088 1.5739522,1.278768 1.5739522,1.278768 0,0 15.6180409,0.285218 17.0449159,0 1.426875,-0.285218 1.439031,-1.901128 1.439031,-1.901128"
       id="path3770"
       class="drain"
       inkscape:label="drain"
       sodipodi:nodetypes="czczc" />
    <path
       d="M 5.3364069,19.821891 7.7214681,25.29648"
       id="path1235"
       class="sling"
       inkscape:label="slingshot"
       sodipodi:nodetypes="cc"
       transform="matrix(0.91460364,0,0,0.94004561,0.9422492,0.9020257)" />
    <path
       d="m 11.869516,24.481327 2.58159,-5.235293"
       id="path1237"
       class="sling"
       inkscape:label="slingshot"
       sodipodi:nodetypes="cc"
       transform="matrix(0.91460364,0,0,0.94004561,0.9422492,0.9020257)" />
    <g
       id="face-back"
       
       transform="matrix(0.91460364,0,0,0.94004561,0.9422492,0.9020257)"
       style="stroke-width:1.07847">
      <ellipse
         
         class="cheek"
         cx="3.2"
         cy="9.6000004"
         rx="1.3"
         ry="0.80000001"
         id="ellipse1002"
         style="fill:url(#radialGradient1407);stroke-width:1.07847" />
      <ellipse
         
         class="cheek"
         cx="17.1"
         cy="9.6000004"
         rx="1.3"
         ry="0.80000001"
         id="ellipse1004"
         style="fill:url(#radialGradient1409);stroke-width:1.07847" />
      <circle
         
         class="bulb"
         cx="15.496129"
         cy="23.199848"
         r="0.17"
         id="circle1006"
         style="stroke-width:1.1631" />
      <circle
         
         class="bulb"
         cx="4.1428852"
         cy="19.022974"
         r="0.17"
         id="circle1008"
         style="stroke-width:1.1631" />
      <circle
         
         class="bulb"
         cx="4.1582909"
         cy="23.564766"
         r="0.17"
         id="circle1010"
         style="stroke-width:1.1631" />
      <circle
         
         class="bulb"
         cx="4.0812807"
         cy="20.161747"
         r="0.17"
         id="circle1012"
         style="stroke-width:1.1631" />
      <circle
         
         class="bulb"
         cx="15.670464"
         cy="22.192118"
         r="0.17"
         id="circle1014"
         style="stroke-width:1.1631" />
      <circle
         
         class="bulb"
         cx="15.76964"
         cy="18.911219"
         r="0.17"
         id="circle1016"
         style="stroke-width:1.1631" />
      <circle
         
         class="bulb"
         cx="15.760734"
         cy="20.053478"
         r="0.17"
         id="circle1018"
         style="stroke-width:1.1631" />
      <circle
         
         class="bulb"
         cx="15.721816"
         cy="21.157808"
         r="0.17"
         id="circle1020"
         style="stroke-width:1.1631" />
      <circle
         
         class="bulb"
         cx="12.430432"
         cy="26.148932"
         r="0.17"
         id="circle1022"
         style="stroke-width:1.1631" />
      <circle
         
         class="bulb"
         cx="4.0430832"
         cy="22.395979"
         r="0.17"
         id="circle1024"
         style="stroke-width:1.1631" />
      <circle
         
         class="bulb"
         cx="5.0007296"
         cy="25.04327"
         r="0.17"
         id="circle1026"
         style="stroke-width:1.1631" />
      <circle
         
         class="bulb"
         cx="4.0144162"
         cy="21.295338"
         r="0.17"
         id="circle1028"
         style="stroke-width:1.1631" />
      <circle
         
         class="bulb"
         cx="6.2622881"
         cy="26.415918"
         r="0.17"
         id="circle1030"
         style="stroke-width:1.1631" />
      <circle
         
         class="bulb"
         cx="14.403059"
         cy="24.895796"
         r="0.17"
         id="circle1032"
         style="stroke-width:1.1631" />
      <path
         
         class="chevron"
         d="m 20.72,18.7 0.4,-0.3 0.4,0.3"
         id="path1034" />
      <path
         
         class="chevron"
         d="m 20.72,17.2 0.4,-0.3 0.4,0.3"
         id="path1036" />
      <path
         
         class="chevron"
         d="m 20.72,15.7 0.4,-0.3 0.4,0.3"
         id="path1038" />
      <path
         
         class="chevron"
         d="m 20.72,14.2 0.4,-0.3 0.4,0.3"
         id="path1040" />
      <path
         
         class="chevron"
         d="m 20.72,12.7 0.4,-0.3 0.4,0.3"
         id="path1042" />
    </g>
    <ellipse
       id="path1443-2-1"
       class="bumper mouth"
       inkscape:label="bumper"
       cy="12.606346"
       cx="9.6486998"
       rx="2.5480659"
       ry="2.5539482"
       transform="matrix(0.91460364,0,0,0.94004561,0.9422492,0.9020257)"
       style="fill:none" />
    <circle
       id="path1443-2-1-3"
       class="bumper eye"
       cx="14.348636"
       cy="6.7268748"
       inkscape:label="bumper"
       r="1.5"
       transform="matrix(0.91460364,0,0,0.94004561,0.9422492,0.9020257)"
       style="fill:none" />
    <circle
       id="path1443-2-1-3-5"
       class="bumper eye"
       cx="5.894927"
       cy="6.659843"
       inkscape:label="bumper"
       r="1.5"
       transform="matrix(0.91460364,0,0,0.94004561,0.9422492,0.9020257)"
       style="fill:none" />
    <rect
       id="rect1372"
       class="kicker"
       width="1.000023"
       height="0.99997705"
       x="16.857441"
       y="19.854559"
       inkscape:label="kicker"
       transform="matrix(0.91000892,-0.09410891,0.0911448,0.93536611,0.9422492,0.9020257)" />
    <rect
       id="rect1372-9"
       class="kicker"
       width="1.0000393"
       height="0.99996084"
       x="2.6542895"
       y="17.594814"
       inkscape:label="kicker"
       transform="matrix(0.90674518,0.1229649,-0.1190958,0.93204176,0.9422492,0.9020257)" />
    <rect
       id="rect1850"
       class="plunger"
       width="0.16174273"
       height="1.9511027"
       x="20.181618"
       y="20.016376"
       inkscape:label="plunger"
       style="fill:url(#plunger)" />
    <path
       id="rect1713"
       class="flipper"
       inkscape:label="flipper-left"
       transform="matrix(0.79832999,0.45869807,-0.44471654,0.82143582,0.9422492,0.9020257)"
       d="m 18.645369,20.929613 3.310859,0.04976 0.0017,0.05329 -3.312567,0.27983 c -0.268325,3.82e-4 -0.285868,-0.373885 8e-6,-0.382883 z"
       sodipodi:nodetypes="ccccc"
       style="fill:url(#linearGradient1401)" />
    <path
       id="path1828"
       class="flipper"
       inkscape:label="flipper-right"
       d="m 1.8298273,30.191334 3.3223795,0.08909 -0.00395,0.05727 -3.3184345,0.259602 c -0.2819591,-0.01102 -0.2980329,-0.390444 4.1e-6,-0.405958 z"
       sodipodi:nodetypes="ccccc"
       transform="matrix(-0.79832999,0.45869807,0.44471654,0.82143582,0.9422492,0.9020257)"
       style="fill:url(#linearGradient1399)" />
    <ellipse
       id="path951"
       class="pivot"
       cx="6.5949244"
       cy="26.89365"
       rx="0.23008437"
       ry="0.23703066"
       inkscape:label="flipper-anchor-left" />
    <ellipse
       id="path951-7"
       class="pivot"
       cx="12.756073"
       cy="26.840975"
       rx="0.23008437"
       ry="0.23703066"
       inkscape:label="flipper-anchor-right" />
    <ellipse
       id="path1443-2-1-3-5-2"
       class="ball"
       cx="20.194929"
       cy="8.4211435"
       inkscape:label="ball"
       rx="0.36584145"
       ry="0.37601826" />
  </g>
</svg>
`,Vh=Object.assign({"../svg-table/clockwork.svg":Mh,"../svg-table/ghost.svg":Ch}),Ya=i=>{const t=document.createElement("template");return t.innerHTML=i,t.content.querySelector("svg")},Sh=(i,t)=>{const e=i.slice(i.lastIndexOf("/")+1,-4),n=Ya(t),r=s=>n.getAttribute("data-"+s);return{id:e,name:r("name")??e,color:r("color")??"#888888",blurb:r("blurb")??"",order:r("order")!=null?Number(r("order")):1/0,svg:t}},vs=Object.entries(Vh).map(([i,t])=>Sh(i,t)).sort((i,t)=>i.order-t.order||i.name.localeCompare(t.name));function Wa(i){return vs.find(t=>t.id===i)}function Ih(){const i=location.hash.slice(1);return Wa(i)?i:vs[0].id}class Ph{constructor(){this.tables=vs,this.time=0,this.drawing=null,this.parts=[],this.ballTemplate=null,this.balls=[],this.game={state:"over",score:0,ball:1,locked:0,multiball:!1,ballSaveUntil:0,tilt:0,tilted:!1},this.lights=new Set,this.callout=null,this.activePointers=new Map,this.keysPressed=new Set,this.leftFlipperPressed=!1,this.rightFlipperPressed=!1,this.plungerPressed=!1,this.ballInLane=!1,this.table=Oe(Ih()),this.hud=new kh}}const ur=be.create("frame-update"),ys=be.create("frame-render"),Lh=100;class Th extends he{constructor(){super(),this.request=0,this.last=0,this.handleActivate=()=>{this.last=performance.now(),this.request=requestAnimationFrame(this.frame)},this.handleDeactivate=()=>{cancelAnimationFrame(this.request)},this.frame=t=>{const e={dt:Math.min(t-this.last,Lh),now:t};this.last=t,this.emit(ur,e),this.emit(ys,e),this.request=requestAnimationFrame(this.frame)},this.on("activate",this.handleActivate),this.on("deactivate",this.handleDeactivate)}}const Ka=be.create("select-table"),Xa=be.create("new-game"),xs=be.create("table-loaded"),Wn=be.create("hit"),Za=be.create("ball-drained"),Qr=be.create("flipper-press"),or=be.create("nudge");function zh(i){return i&&i.__esModule&&Object.prototype.hasOwnProperty.call(i,"default")?i.default:i}var Dr,Qo;function Fh(){if(Qo)return Dr;Qo=1;var i={a:7,c:6,h:1,l:2,m:2,r:4,q:4,s:4,t:2,v:1,z:0},t=[5760,6158,8192,8193,8194,8195,8196,8197,8198,8199,8200,8201,8202,8239,8287,12288,65279];function e(m){return m===10||m===13||m===8232||m===8233||m===32||m===9||m===11||m===12||m===160||m>=5760&&t.indexOf(m)>=0}function n(m){switch(m|32){case 109:case 122:case 108:case 104:case 118:case 99:case 115:case 113:case 116:case 97:case 114:return!0}return!1}function r(m){return(m|32)===97}function s(m){return m>=48&&m<=57}function o(m){return m>=48&&m<=57||m===43||m===45||m===46}function a(m){this.index=0,this.path=m,this.max=m.length,this.result=[],this.param=0,this.err="",this.segmentStart=0,this.data=[]}function l(m){for(;m.index<m.max&&e(m.path.charCodeAt(m.index));)m.index++}function h(m){var f=m.path.charCodeAt(m.index);if(f===48){m.param=0,m.index++;return}if(f===49){m.param=1,m.index++;return}m.err="SvgPath: arc flag can be 0 or 1 only (at pos "+m.index+")"}function _(m){var f=m.index,d=f,v=m.max,y=!1,x=!1,b=!1,B=!1,A;if(d>=v){m.err="SvgPath: missed param (at pos "+d+")";return}if(A=m.path.charCodeAt(d),(A===43||A===45)&&(d++,A=d<v?m.path.charCodeAt(d):0),!s(A)&&A!==46){m.err="SvgPath: param should start with 0..9 or `.` (at pos "+d+")";return}if(A!==46){if(y=A===48,d++,A=d<v?m.path.charCodeAt(d):0,y&&d<v&&A&&s(A)){m.err="SvgPath: numbers started with `0` such as `09` are illegal (at pos "+f+")";return}for(;d<v&&s(m.path.charCodeAt(d));)d++,x=!0;A=d<v?m.path.charCodeAt(d):0}if(A===46){for(B=!0,d++;s(m.path.charCodeAt(d));)d++,b=!0;A=d<v?m.path.charCodeAt(d):0}if(A===101||A===69){if(B&&!x&&!b){m.err="SvgPath: invalid float exponent (at pos "+d+")";return}if(d++,A=d<v?m.path.charCodeAt(d):0,(A===43||A===45)&&d++,d<v&&s(m.path.charCodeAt(d)))for(;d<v&&s(m.path.charCodeAt(d));)d++;else{m.err="SvgPath: invalid float exponent (at pos "+d+")";return}}m.index=d,m.param=parseFloat(m.path.slice(f,d))+0}function p(m){var f,d;f=m.path[m.segmentStart],d=f.toLowerCase();var v=m.data;if(d==="m"&&v.length>2&&(m.result.push([f,v[0],v[1]]),v=v.slice(2),d="l",f=f==="m"?"l":"L"),d==="r")m.result.push([f].concat(v));else for(;v.length>=i[d]&&(m.result.push([f].concat(v.splice(0,i[d]))),!!i[d]););}function c(m){var f=m.max,d,v,y,x,b;if(m.segmentStart=m.index,d=m.path.charCodeAt(m.index),v=r(d),!n(d)){m.err="SvgPath: bad command "+m.path[m.index]+" (at pos "+m.index+")";return}if(x=i[m.path[m.index].toLowerCase()],m.index++,l(m),m.data=[],!x){p(m);return}for(y=!1;;){for(b=x;b>0;b--){if(v&&(b===3||b===4)?h(m):_(m),m.err.length){p(m);return}m.data.push(m.param),l(m),y=!1,m.index<f&&m.path.charCodeAt(m.index)===44&&(m.index++,l(m),y=!0)}if(!y&&(m.index>=m.max||!o(m.path.charCodeAt(m.index))))break}p(m)}return Dr=function(f){var d=new a(f),v=d.max;for(l(d);d.index<v&&!d.err.length;)c(d);return d.result.length&&("mM".indexOf(d.result[0][0])<0?(d.err="SvgPath: string should start with `M` or `m`",d.result=[]):d.result[0][0]="M"),{err:d.err,segments:d.result}},Dr}var Nr,ta;function Qa(){if(ta)return Nr;ta=1;function i(e,n){return[e[0]*n[0]+e[2]*n[1],e[1]*n[0]+e[3]*n[1],e[0]*n[2]+e[2]*n[3],e[1]*n[2]+e[3]*n[3],e[0]*n[4]+e[2]*n[5]+e[4],e[1]*n[4]+e[3]*n[5]+e[5]]}function t(){if(!(this instanceof t))return new t;this.queue=[],this.cache=null}return t.prototype.matrix=function(e){return e[0]===1&&e[1]===0&&e[2]===0&&e[3]===1&&e[4]===0&&e[5]===0?this:(this.cache=null,this.queue.push(e),this)},t.prototype.translate=function(e,n){return(e!==0||n!==0)&&(this.cache=null,this.queue.push([1,0,0,1,e,n])),this},t.prototype.scale=function(e,n){return(e!==1||n!==1)&&(this.cache=null,this.queue.push([e,0,0,n,0,0])),this},t.prototype.rotate=function(e,n,r){var s,o,a;return e!==0&&(this.translate(n,r),s=e*Math.PI/180,o=Math.cos(s),a=Math.sin(s),this.queue.push([o,a,-a,o,0,0]),this.cache=null,this.translate(-n,-r)),this},t.prototype.skewX=function(e){return e!==0&&(this.cache=null,this.queue.push([1,0,Math.tan(e*Math.PI/180),1,0,0])),this},t.prototype.skewY=function(e){return e!==0&&(this.cache=null,this.queue.push([1,Math.tan(e*Math.PI/180),0,1,0,0])),this},t.prototype.toArray=function(){if(this.cache)return this.cache;if(!this.queue.length)return this.cache=[1,0,0,1,0,0],this.cache;if(this.cache=this.queue[0],this.queue.length===1)return this.cache;for(var e=1;e<this.queue.length;e++)this.cache=i(this.cache,this.queue[e]);return this.cache},t.prototype.calc=function(e,n,r){var s;return this.queue.length?(this.cache||(this.cache=this.toArray()),s=this.cache,[e*s[0]+n*s[2]+(r?0:s[4]),e*s[1]+n*s[3]+(r?0:s[5])]):[e,n]},Nr=t,Nr}var Rr,ea;function qh(){if(ea)return Rr;ea=1;var i=Qa(),t={matrix:!0,scale:!0,rotate:!0,translate:!0,skewX:!0,skewY:!0},e=/\s*(matrix|translate|scale|rotate|skewX|skewY)\s*\(\s*(.+?)\s*\)[\s,]*/,n=/[\s,]+/;return Rr=function(s){var o=new i,a,l;return s.split(e).forEach(function(h){if(h.length){if(typeof t[h]<"u"){a=h;return}switch(l=h.split(n).map(function(_){return+_||0}),a){case"matrix":l.length===6&&o.matrix(l);return;case"scale":l.length===1?o.scale(l[0],l[0]):l.length===2&&o.scale(l[0],l[1]);return;case"rotate":l.length===1?o.rotate(l[0],0,0):l.length===3&&o.rotate(l[0],l[1],l[2]);return;case"translate":l.length===1?o.translate(l[0],0):l.length===2&&o.translate(l[0],l[1]);return;case"skewX":l.length===1&&o.skewX(l[0]);return;case"skewY":l.length===1&&o.skewY(l[0]);return}}}),o},Rr}var Or,ia;function Eh(){if(ia)return Or;ia=1;var i=Math.PI*2;function t(r,s,o,a){var l=r*a-s*o<0?-1:1,h=r*o+s*a;return h>1&&(h=1),h<-1&&(h=-1),l*Math.acos(h)}function e(r,s,o,a,l,h,_,p,c,m){var f=m*(r-o)/2+c*(s-a)/2,d=-c*(r-o)/2+m*(s-a)/2,v=_*_,y=p*p,x=f*f,b=d*d,B=v*y-v*b-y*x;B<0&&(B=0),B/=v*b+y*x,B=Math.sqrt(B)*(l===h?-1:1);var A=B*_/p*d,M=B*-p/_*f,C=m*A-c*M+(r+o)/2,I=c*A+m*M+(s+a)/2,T=(f-A)/_,L=(d-M)/p,q=(-f-A)/_,$=(-d-M)/p,j=t(1,0,T,L),G=t(T,L,q,$);return h===0&&G>0&&(G-=i),h===1&&G<0&&(G+=i),[C,I,j,G]}function n(r,s){var o=1.3333333333333333*Math.tan(s/4),a=Math.cos(r),l=Math.sin(r),h=Math.cos(r+s),_=Math.sin(r+s);return[a,l,a-l*o,l+a*o,h+_*o,_-h*o,h,_]}return Or=function(s,o,a,l,h,_,p,c,m){var f=Math.sin(m*i/360),d=Math.cos(m*i/360),v=d*(s-a)/2+f*(o-l)/2,y=-f*(s-a)/2+d*(o-l)/2;if(v===0&&y===0)return[];if(p===0||c===0)return[];p=Math.abs(p),c=Math.abs(c);var x=v*v/(p*p)+y*y/(c*c);x>1&&(p*=Math.sqrt(x),c*=Math.sqrt(x));var b=e(s,o,a,l,h,_,p,c,f,d),B=[],A=b[2],M=b[3],C=Math.max(Math.ceil(Math.abs(M)/(i/4)),1);M/=C;for(var I=0;I<C;I++)B.push(n(A,M)),A+=M;return B.map(function(T){for(var L=0;L<T.length;L+=2){var q=T[L+0],$=T[L+1];q*=p,$*=c;var j=d*q-f*$,G=f*q+d*$;T[L+0]=j+b[0],T[L+1]=G+b[1]}return T})},Or}var Ur,na;function Dh(){if(na)return Ur;na=1;var i=1e-10,t=Math.PI/180;function e(n,r,s){if(!(this instanceof e))return new e(n,r,s);this.rx=n,this.ry=r,this.ax=s}return e.prototype.transform=function(n){var r=Math.cos(this.ax*t),s=Math.sin(this.ax*t),o=[this.rx*(n[0]*r+n[2]*s),this.rx*(n[1]*r+n[3]*s),this.ry*(-n[0]*s+n[2]*r),this.ry*(-n[1]*s+n[3]*r)],a=o[0]*o[0]+o[2]*o[2],l=o[1]*o[1]+o[3]*o[3],h=((o[0]-o[3])*(o[0]-o[3])+(o[2]+o[1])*(o[2]+o[1]))*((o[0]+o[3])*(o[0]+o[3])+(o[2]-o[1])*(o[2]-o[1])),_=(a+l)/2;if(h<i*_)return this.rx=this.ry=Math.sqrt(_),this.ax=0,this;var p=o[0]*o[1]+o[2]*o[3];h=Math.sqrt(h);var c=_+h/2,m=_-h/2;return this.ax=Math.abs(p)<i&&Math.abs(c-l)<i?90:Math.atan(Math.abs(p)>Math.abs(c-l)?(c-a)/p:p/(c-l))*180/Math.PI,this.ax>=0?(this.rx=Math.sqrt(c),this.ry=Math.sqrt(m)):(this.ax+=90,this.rx=Math.sqrt(m),this.ry=Math.sqrt(c)),this},e.prototype.isDegenerate=function(){return this.rx<i*this.ry||this.ry<i*this.rx},Ur=e,Ur}var $r,ra;function Nh(){if(ra)return $r;ra=1;var i=Fh(),t=qh(),e=Qa(),n=Eh(),r=Dh();function s(o){if(!(this instanceof s))return new s(o);var a=i(o);this.segments=a.segments,this.err=a.err,this.__stack=[]}return s.from=function(o){if(typeof o=="string")return new s(o);if(o instanceof s){var a=new s("");return a.err=o.err,a.segments=o.segments.map(function(l){return l.slice()}),a.__stack=o.__stack.map(function(l){return e().matrix(l.toArray())}),a}throw new Error("SvgPath.from: invalid param type "+o)},s.prototype.__matrix=function(o){var a=this,l;o.queue.length&&this.iterate(function(h,_,p,c){var m,f,d,v;switch(h[0]){case"v":m=o.calc(0,h[1],!0),f=m[0]===0?["v",m[1]]:["l",m[0],m[1]];break;case"V":m=o.calc(p,h[1],!1),f=m[0]===o.calc(p,c,!1)[0]?["V",m[1]]:["L",m[0],m[1]];break;case"h":m=o.calc(h[1],0,!0),f=m[1]===0?["h",m[0]]:["l",m[0],m[1]];break;case"H":m=o.calc(h[1],c,!1),f=m[1]===o.calc(p,c,!1)[1]?["H",m[0]]:["L",m[0],m[1]];break;case"a":case"A":var y=o.toArray(),x=r(h[1],h[2],h[3]).transform(y);if(y[0]*y[3]-y[1]*y[2]<0&&(h[5]=h[5]?"0":"1"),m=o.calc(h[6],h[7],h[0]==="a"),h[0]==="A"&&h[6]===p&&h[7]===c||h[0]==="a"&&h[6]===0&&h[7]===0){f=[h[0]==="a"?"l":"L",m[0],m[1]];break}x.isDegenerate()?f=[h[0]==="a"?"l":"L",m[0],m[1]]:f=[h[0],x.rx,x.ry,x.ax,h[4],h[5],m[0],m[1]];break;case"m":v=_>0,m=o.calc(h[1],h[2],v),f=["m",m[0],m[1]];break;default:for(d=h[0],f=[d],v=d.toLowerCase()===d,l=1;l<h.length;l+=2)m=o.calc(h[l],h[l+1],v),f.push(m[0],m[1])}a.segments[_]=f},!0)},s.prototype.__evaluateStack=function(){var o,a;if(this.__stack.length){if(this.__stack.length===1){this.__matrix(this.__stack[0]),this.__stack=[];return}for(o=e(),a=this.__stack.length;--a>=0;)o.matrix(this.__stack[a].toArray());this.__matrix(o),this.__stack=[]}},s.prototype.toString=function(){var o="",a="",l=!1;this.__evaluateStack();for(var h=0,_=this.segments.length;h<_;h++){var p=this.segments[h],c=p[0];c!==a||c==="m"||c==="M"?(c==="m"&&a==="z"&&(o+=" "),o+=c,l=!1):l=!0;for(var m=1;m<p.length;m++){var f=p[m];m===1?l&&f>=0&&(o+=" "):f>=0&&(o+=" "),o+=f}a=c}return o},s.prototype.translate=function(o,a){return this.__stack.push(e().translate(o,a||0)),this},s.prototype.scale=function(o,a){return this.__stack.push(e().scale(o,!a&&a!==0?o:a)),this},s.prototype.rotate=function(o,a,l){return this.__stack.push(e().rotate(o,a||0,l||0)),this},s.prototype.skewX=function(o){return this.__stack.push(e().skewX(o)),this},s.prototype.skewY=function(o){return this.__stack.push(e().skewY(o)),this},s.prototype.matrix=function(o){return this.__stack.push(e().matrix(o)),this},s.prototype.transform=function(o){return o.trim()?(this.__stack.push(t(o)),this):this},s.prototype.round=function(o){var a=0,l=0,h=0,_=0,p;return o=o||0,this.__evaluateStack(),this.segments.forEach(function(c){var m=c[0].toLowerCase()===c[0];switch(c[0]){case"H":case"h":m&&(c[1]+=h),h=c[1]-c[1].toFixed(o),c[1]=+c[1].toFixed(o);return;case"V":case"v":m&&(c[1]+=_),_=c[1]-c[1].toFixed(o),c[1]=+c[1].toFixed(o);return;case"Z":case"z":h=a,_=l;return;case"M":case"m":m&&(c[1]+=h,c[2]+=_),h=c[1]-c[1].toFixed(o),_=c[2]-c[2].toFixed(o),a=h,l=_,c[1]=+c[1].toFixed(o),c[2]=+c[2].toFixed(o);return;case"A":case"a":m&&(c[6]+=h,c[7]+=_),h=c[6]-c[6].toFixed(o),_=c[7]-c[7].toFixed(o),c[1]=+c[1].toFixed(o),c[2]=+c[2].toFixed(o),c[3]=+c[3].toFixed(o+2),c[6]=+c[6].toFixed(o),c[7]=+c[7].toFixed(o);return;default:p=c.length,m&&(c[p-2]+=h,c[p-1]+=_),h=c[p-2]-c[p-2].toFixed(o),_=c[p-1]-c[p-1].toFixed(o),c.forEach(function(f,d){d&&(c[d]=+c[d].toFixed(o))});return}}),this},s.prototype.iterate=function(o,a){var l=this.segments,h={},_=!1,p=0,c=0,m=0,f=0,d,v,y;if(a||this.__evaluateStack(),l.forEach(function(x,b){var B=o(x,b,p,c);Array.isArray(B)&&(h[b]=B,_=!0);var A=x[0]===x[0].toLowerCase();switch(x[0]){case"m":case"M":p=x[1]+(A?p:0),c=x[2]+(A?c:0),m=p,f=c;return;case"h":case"H":p=x[1]+(A?p:0);return;case"v":case"V":c=x[1]+(A?c:0);return;case"z":case"Z":p=m,c=f;return;default:p=x[x.length-2]+(A?p:0),c=x[x.length-1]+(A?c:0)}}),!_)return this;for(y=[],d=0;d<l.length;d++)if(typeof h[d]<"u")for(v=0;v<h[d].length;v++)y.push(h[d][v]);else y.push(l[d]);return this.segments=y,this},s.prototype.abs=function(){return this.iterate(function(o,a,l,h){var _=o[0],p=_.toUpperCase(),c;if(_!==p)switch(o[0]=p,_){case"v":o[1]+=h;return;case"a":o[6]+=l,o[7]+=h;return;default:for(c=1;c<o.length;c++)o[c]+=c%2?l:h}},!0),this},s.prototype.rel=function(){return this.iterate(function(o,a,l,h){var _=o[0],p=_.toLowerCase(),c;if(_!==p&&!(a===0&&_==="M"))switch(o[0]=p,_){case"V":o[1]-=h;return;case"A":o[6]-=l,o[7]-=h;return;default:for(c=1;c<o.length;c++)o[c]-=c%2?l:h}},!0),this},s.prototype.unarc=function(){return this.iterate(function(o,a,l,h){var _,p,c,m=[],f=o[0];return f!=="A"&&f!=="a"?null:(f==="a"?(p=l+o[6],c=h+o[7]):(p=o[6],c=o[7]),_=n(l,h,p,c,o[4],o[5],o[1],o[2],o[3]),_.length===0?[[o[0]==="a"?"l":"L",o[6],o[7]]]:(_.forEach(function(d){m.push(["C",d[2],d[3],d[4],d[5],d[6],d[7]])}),m))}),this},s.prototype.unshort=function(){var o=this.segments,a,l,h,_,p;return this.iterate(function(c,m,f,d){var v=c[0],y=v.toUpperCase(),x;m&&(y==="T"?(x=v==="t",h=o[m-1],h[0]==="Q"?(a=h[1]-f,l=h[2]-d):h[0]==="q"?(a=h[1]-h[3],l=h[2]-h[4]):(a=0,l=0),_=-a,p=-l,x||(_+=f,p+=d),o[m]=[x?"q":"Q",_,p,c[1],c[2]]):y==="S"&&(x=v==="s",h=o[m-1],h[0]==="C"?(a=h[3]-f,l=h[4]-d):h[0]==="c"?(a=h[3]-h[5],l=h[4]-h[6]):(a=0,l=0),_=-a,p=-l,x||(_+=f,p+=d),o[m]=[x?"c":"C",_,p,c[1],c[2],c[3],c[4]]))}),this},$r=s,$r}var Gr,sa;function Rh(){return sa||(sa=1,Gr=Nh()),Gr}var Oh=Rh();const Uh=zh(Oh),$h=new Set(["defs","mask","pattern","clipPath","symbol","marker","linearGradient","radialGradient","filter"]);function Gh(i,t={}){const e=typeof i=="string"?new DOMParser().parseFromString(i,"image/svg+xml").documentElement:i,n=[],r=t.curveSegments??8,s=(o,a)=>{var _;if($h.has(o.localName)||(_=t.skip)!=null&&_.call(t,o))return;const l=o===e?a:a.multiply(Hh(o)),h=jh(o,l,r);h&&n.push(...h);for(const p of Array.from(o.children))s(p,l)};return s(e,t.transform??new DOMMatrix),n}function Hh(i){var n;const t=(n=i.transform)==null?void 0:n.baseVal,e=t&&t.numberOfItems>0?t.consolidate():null;return e?DOMMatrix.fromMatrix(e.matrix):new DOMMatrix}function jh(i,t,e){const n=(o,a)=>{const l=t.transformPoint(new DOMPoint(o,a));return{x:l.x,y:l.y}},r=o=>o.baseVal.value,s=Math.sqrt(Math.abs(t.a*t.d-t.b*t.c));if(i instanceof SVGCircleElement)return[{type:"circle",element:i,center:n(r(i.cx),r(i.cy)),radius:r(i.r)*s}];if(i instanceof SVGEllipseElement){const o=Math.sqrt(r(i.rx)*r(i.ry))*s;return[{type:"circle",element:i,center:n(r(i.cx),r(i.cy)),radius:o}]}if(i instanceof SVGRectElement){const o=r(i.x),a=r(i.y),l=r(i.width),h=r(i.height);return[{type:"polygon",element:i,points:[n(o,a),n(o+l,a),n(o+l,a+h),n(o,a+h)]}]}if(i instanceof SVGLineElement){const o=[n(r(i.x1),r(i.y1)),n(r(i.x2),r(i.y2))];return[{type:"chain",element:i,points:o}]}if(i instanceof SVGPolylineElement||i instanceof SVGPolygonElement){const o=i.points,a=[];for(let l=0;l<o.numberOfItems;l++)a.push(n(o.getItem(l).x,o.getItem(l).y));return[oa(i,a,i instanceof SVGPolygonElement)].filter(Boolean)}return i instanceof SVGPathElement?Jh(i.getAttribute("d")??"",e).map(({points:o,closed:a})=>oa(i,o.map(l=>n(l.x,l.y)),a)).filter(Boolean):null}function oa(i,t,e){const n=(r,s)=>Math.abs(r.x-s.x)<1e-9&&Math.abs(r.y-s.y)<1e-9;return t=t.filter((r,s)=>s===0||!n(r,t[s-1])),t.length>2&&n(t[0],t[t.length-1])&&(t.pop(),e=!0),t.length<2?null:e&&t.length>2?{type:"polygon",element:i,points:t}:{type:"chain",element:i,points:t}}function Jh(i,t){const e=[];let n=[],r={x:0,y:0};const s=a=>{n.length>1&&e.push({points:n,closed:a}),n=[]},o=(a,l,h,_,p,c,m,f)=>{for(let d=1;d<=t;d++){const v=d/t,y=1-v;n.push({x:y*y*y*a+3*y*y*v*h+3*y*v*v*p+v*v*v*m,y:y*y*y*l+3*y*y*v*_+3*y*v*v*c+v*v*v*f})}};return Uh(i).abs().unshort().unarc().iterate((a,l,h,_)=>{switch(a[0]){case"M":s(!1),r={x:a[1],y:a[2]},n.push(r);break;case"L":n.push({x:a[1],y:a[2]});break;case"H":n.push({x:a[1],y:_});break;case"V":n.push({x:h,y:a[1]});break;case"C":o(h,_,a[1],a[2],a[3],a[4],a[5],a[6]);break;case"Q":o(h,_,h+2/3*(a[1]-h),_+2/3*(a[2]-_),a[3]+2/3*(a[1]-a[3]),a[4]+2/3*(a[2]-a[4]),a[3],a[4]);break;case"Z":case"z":s(!0),n=[r];break}}),s(!1),e}const Yh=new DOMMatrix().scale(1/rr,-1/rr);class Wh extends he{constructor(){super(),this.handleActivate=()=>{this.load(this.context.table.value)},this.handleSelectTable=t=>{this.load(t)},this.on("activate",this.handleActivate),this.on(Ka,this.handleSelectTable)}load(t){const e=Ya(Wa(t).svg),n=Gh(e,{transform:Yh}),r=new Zh;for(const s of n)r.read(s);r.pairFlippers(),this.context.balls=[],this.context.parts=r.parts,this.context.ballTemplate=r.ball,this.context.drawing=e,this.emit(xs)}}const Kh=["bumper","post","rollover","target","saucer","lock","magnet","disc","captive-ball"],Xh=["wall","drain","slingshot","kicker","plunger","rollover","target","drop-target","spinner","gate","ramp-wall","ramp-enter","ramp-exit"];class Zh{constructor(){this.parts=[],this.ball=null,this.anchors=[]}read(t){const e=t.element,n=im(e);if(t.type==="circle"){n==="ball"?this.ball=new Fi(t.center,t.radius,e.id):n==="flipper-anchor-left"||n==="flipper-anchor-right"?this.anchors.push({center:t.center,isLeft:n==="flipper-anchor-left"}):Kh.includes(n)&&(this.part(e,n,t.center).radius=t.radius);return}let r;if(n==="flipper-left"||n==="flipper-right")r="flipper";else if(Xh.includes(n))r=n;else return;const s=wh(t.points).center,o=this.part(e,r,s);o.vertices=Bh(t.points,s),o.closed=t.type==="polygon",o instanceof zi&&(o.isLeft=n==="flipper-left")}part(t,e,n){const r=Qh(e,t.id,n),s=o=>t.getAttribute("data-"+o);return s("group")!=null&&(r.group=s("group")),s("points")!=null&&(r.points=Number(s("points"))),s("locks")!=null&&r instanceof ui&&(r.locks=Number(s("locks"))),s("direction")!=null&&(r.direction=em(s("direction"))),this.parts.push(r),r}pairFlippers(){for(const t of this.parts.filter(e=>e instanceof zi)){let e=null,n=1/0;for(const r of this.anchors){if(r.isLeft!==t.isLeft)continue;const s=Math.hypot(r.center.x-t.position.x,r.center.y-t.position.y);s<n&&(n=s,e=r)}e?t.anchor=e.center:console.warn("A flipper has no anchor on its side",t.elementId)}this.parts=this.parts.filter(t=>!(t instanceof zi)||t.anchor)}}const Qh=(i,t,e)=>{switch(i){case"flipper":return new zi(t,e);case"plunger":return new Zr(t,e);case"spinner":return new sr(t,e);case"saucer":case"lock":return new ui(i,t,e);default:return new kt(i,t,e)}},tm={up:0,right:90,down:180,left:270},em=i=>{const e=(tm[i]??Number(i))*Math.PI/180;return{x:Math.sin(e),y:Math.cos(e)}},im=i=>i.getAttribute("inkscape:label")||i.getAttribute("data-pinball-label");class nm extends he{constructor(){super(),this.handleActivate=()=>{window.addEventListener("keydown",this.handleKeyDown),window.addEventListener("keyup",this.handleKeyUp),window.addEventListener("blur",this.handleBlur)},this.handleDeactivate=()=>{window.removeEventListener("keydown",this.handleKeyDown),window.removeEventListener("keyup",this.handleKeyUp),window.removeEventListener("blur",this.handleBlur)},this.handleKeyDown=t=>{t.target instanceof Element&&t.target.closest("button, [role=listbox], [role=dialog]")||(this.context.keysPressed.add(t.code),!t.repeat&&(t.code==="ShiftLeft"&&this.emit(or,{direction:-1}),t.code==="ShiftRight"&&this.emit(or,{direction:1}),(t.code==="Space"||t.code.startsWith("Arrow"))&&t.preventDefault()))},this.handleKeyUp=t=>{this.context.keysPressed.delete(t.code)},this.handleBlur=()=>{this.context.keysPressed.clear()},this.on("activate",this.handleActivate),this.on("deactivate",this.handleDeactivate)}}class rm extends he{constructor(t=window){super(),this.handleActivate=()=>{this.isTouchDevice="ontouchstart"in window,window.PointerEvent?(window.addEventListener("pointerdown",this.handleStart,{passive:!1}),window.addEventListener("pointermove",this.handleMove,{passive:!1}),window.addEventListener("pointerup",this.handleEnd,{passive:!0}),window.addEventListener("pointercancel",this.handleEnd,{passive:!0})):(window.addEventListener("touchstart",this.handleStart,{passive:!1}),window.addEventListener("touchmove",this.handleMove,{passive:!1}),window.addEventListener("touchend",this.handleEnd,{passive:!0}),window.addEventListener("touchcancel",this.handleEnd,{passive:!0}),window.addEventListener("mousedown",this.handleStart,{passive:!1}),window.addEventListener("mousemove",this.handleMove,{passive:!1}),window.addEventListener("mouseup",this.handleEnd,{passive:!0}),window.addEventListener("mouseleave",this.handleEnd,{passive:!0}))},this.handleDeactivate=()=>{window.removeEventListener("pointerdown",this.handleStart),window.removeEventListener("pointermove",this.handleMove),window.removeEventListener("pointerup",this.handleEnd),window.removeEventListener("pointercancel",this.handleEnd),window.removeEventListener("touchstart",this.handleStart),window.removeEventListener("touchmove",this.handleMove),window.removeEventListener("touchend",this.handleEnd),window.removeEventListener("touchcancel",this.handleEnd),window.removeEventListener("mousedown",this.handleStart),window.removeEventListener("mousemove",this.handleMove),window.removeEventListener("mouseup",this.handleEnd),window.removeEventListener("mouseleave",this.handleEnd),this.context.activePointers.clear()},this.handleStart=e=>{if(e.target instanceof Element&&e.target.closest("#ui-root button, #ui-root [role=listbox], #ui-root [role=dialog]"))return;e.preventDefault();const r=e.touches||[e];for(const s of r){const o=s,a=s,l={pointerId:o.identifier??a.pointerId,type:a.pointerType||(this.isTouchDevice?"touch":"mouse"),x:s.clientX,y:s.clientY,side:this.getSide(s.clientX)};this.context.activePointers.set(l.pointerId,l),this.emit("pointer-start",l)}},this.handleMove=e=>{e.preventDefault();const r=e.touches||[e];for(const s of r){const o=s,a=s,l=o.identifier??a.pointerId,h=this.context.activePointers.get(l);if(!h)continue;const _=this.getSide(a.clientX);h.x=s.clientX,h.y=s.clientY,h.side=_,this.emit("pointer-move",h)}},this.handleEnd=e=>{const n=e,r=e;n.touches;const s=new Set;if(r.pointerId!==void 0)s.add(r.pointerId);else if(n.changedTouches)for(const o of n.changedTouches)s.add(o.identifier);for(const o of s){const a=this.context.activePointers.get(o);a&&(this.context.activePointers.delete(o),this.emit("pointer-end",a))}},this.on("activate",this.handleActivate),this.on("deactivate",this.handleDeactivate)}getSide(t){const e=window.innerWidth;return t<e/2?"left":"right"}}class sm extends he{constructor(){super(),this.handleFrameUpdate=()=>{const t=this.context;let e=!1,n=!1;t.activePointers.forEach(l=>{l.side==="left"?e=!0:l.side==="right"&&(n=!0)});const r=t.keysPressed,s=e||r.has("ArrowLeft")||r.has("KeyA"),o=n||r.has("ArrowRight")||r.has("KeyD"),a=r.has("Space")||r.has("Enter")||r.has("KeyS")||r.has("ArrowDown")||t.ballInLane&&(e||n);s&&!t.leftFlipperPressed&&this.emit(Qr,{left:!0}),o&&!t.rightFlipperPressed&&this.emit(Qr,{left:!1}),a&&!t.plungerPressed&&t.game.state==="over"&&this.emit(Xa),t.leftFlipperPressed=s,t.rightFlipperPressed=o,t.plungerPressed=a},this.on(ur,this.handleFrameUpdate),this.use(new nm),this.use(new rm)}}const ni=1/60,en=1,ts=2,on=4,aa={ground:en|on,ramp:ts|on},om=["magnet","disc"],am=["rollover","spinner","saucer","lock","ramp-enter","ramp-exit"],Hr=["bumper","slingshot","kicker","target","drop-target","rollover"],Un=(i,t)=>{const{x:e,y:n}=t.getPosition();i.position.x=e,i.position.y=n,i.angle=t.getAngle()};class lm extends he{constructor(){super(),this.dt=0,this.rest=0,this.touches=[],this.leaves=[],this.captiveHits=[],this.ballBodies=new Map,this.handleFrameUpdate=t=>{const e=this.context;for(this.dt=t.dt,this.rest+=t.dt/1e3;this.rest>=ni;)this.rest-=ni,this.applyFields(),this.world.step(ni),e.time+=ni,this.afterStep();this.binder.setData([...e.parts,...e.balls]),this.checkLane()},this.handleNudge=({direction:t})=>{for(const[e,n]of this.ballBodies)e.heldBy||n.applyLinearImpulse({x:t*Wo,y:Wo*.5},n.getWorldCenter())},this.handleBeginContact=t=>{const e=this.touchOf(t);if(e){this.touches.push(e);return}const n=t.getFixtureA().getBody().getUserData(),r=t.getFixtureB().getBody().getUserData();n instanceof kt&&r instanceof kt&&(n.type==="captive-ball"&&Hr.includes(r.type)&&this.captiveHits.push(r),r.type==="captive-ball"&&Hr.includes(n.type)&&this.captiveHits.push(n))},this.handleEndContact=t=>{const e=this.touchOf(t);(e==null?void 0:e.part.type)==="ramp-enter"&&this.leaves.push(e)},this.handlePreSolve=t=>{const e=this.touchOf(t);if(!e)return;const{part:n,ballBody:r}=e;switch(n.type){case"bumper":t.setEnabled(!1),this.bounceBumper(r,n);break;case"kicker":t.setEnabled(!1),this.bounceNormal(r,t,jr(ch,.1));break;case"slingshot":this.bounceNormal(r,t,jr(hh,.1));break;case"drain":t.setEnabled(!1);break;case"gate":{const s=r.getLinearVelocity();s.x*n.direction.x+s.y*n.direction.y>0&&t.setEnabled(!1);break}}},this.partDriver=Dt.create({filter:t=>t instanceof kt&&!(t instanceof zi)&&!(t instanceof Zr)&&!om.includes(t.type)&&t.type!=="captive-ball",enter:t=>{const e=this.world.createBody({type:"static",position:t.position,userData:t}),n=am.includes(t.type),r=t.type==="ramp-wall"||t.type==="ramp-exit",s=t.type==="ramp-enter"?en|ts:r?ts:en,o=n||t.type==="target"||t.type==="drop-target"||t.type==="kicker";for(const a of this.shapesOf(t,o))e.createFixture({shape:a,isSensor:n,restitution:t.type==="post"?.75:t.type==="bumper"?0:r?.1:.3,friction:r?0:.2,filterCategoryBits:s,filterMaskBits:65535});return e},update:(t,e)=>{t.type==="drop-target"&&e.isActive()===t.down&&e.setActive(!t.down)},exit:(t,e)=>{this.world.destroyBody(e)}}),this.ballDriver=Dt.create({filter:t=>t instanceof Fi,enter:t=>{const e=this.world.createBody({type:"dynamic",bullet:!0,position:t.position,userData:t});return e.createFixture({shape:new xe(t.radius),density:1,filterCategoryBits:on,filterMaskBits:aa[t.layer]}),this.ballBodies.set(t,e),e},update:(t,e)=>Un(t,e),exit:(t,e)=>{this.ballBodies.delete(t),this.world.destroyBody(e)}}),this.captiveDriver=Dt.create({filter:t=>t instanceof kt&&t.type==="captive-ball",enter:t=>{const e=this.world.createBody({type:"dynamic",bullet:!0,position:t.position,userData:t});return e.createFixture({shape:new xe(t.radius),density:1,filterCategoryBits:en,filterMaskBits:en|on}),e},update:(t,e)=>Un(t,e),exit:(t,e)=>this.world.destroyBody(e)}),this.flipperDriver=Dt.create({filter:t=>t instanceof zi,enter:t=>{const e=this.world.createBody({type:"dynamic",position:t.position,angle:0,userData:t}),n=t.vertices,r=n.length<=12?n:Array.from({length:12},(a,l)=>n[Math.floor(l*n.length/12)]);e.createFixture({shape:new ce(r),density:mh,restitution:.1});const s=this.world.createBody({type:"static"}),o=this.world.createJoint(new Ie({lowerAngle:t.isLeft?0:-.9,upperAngle:t.isLeft?.9:0,enableLimit:!0,motorSpeed:0,maxMotorTorque:uh,enableMotor:!0},s,e,t.anchor));return{body:e,anchor:s,joint:o}},update:(t,{body:e,joint:n})=>{Un(t,e);const r=this.context,s=!r.game.tilted&&(t.isLeft?r.leftFlipperPressed:r.rightFlipperPressed);n.setMotorSpeed(s?t.isLeft?jo:-jo:0),n.enableMotor(s)},exit:(t,{body:e,anchor:n})=>{this.world.destroyBody(e),this.world.destroyBody(n)}}),this.plungerDriver=Dt.create({filter:t=>t instanceof Zr,enter:t=>{const e=this.world.createBody({type:"dynamic",position:t.position,userData:t,bullet:!0,fixedRotation:!0});e.createFixture({shape:new ce(t.vertices),density:.01});const n=this.world.createBody({type:"static"}),r=this.world.createJoint(new Xr({lowerTranslation:0,upperTranslation:0,enableLimit:!0,motorSpeed:10,maxMotorForce:1,enableMotor:!0},n,e,t.position,{x:0,y:1}));return{body:e,joint:r,ground:n}},update:(t,{joint:e,body:n})=>{Un(t,n),this.context.plungerPressed?(t.press+=On*(this.dt/1e3),t.press=Math.min(On,t.press)):t.press>0?t.press=-t.press:(t.press+=On*(this.dt/200),t.press=Math.min(0,t.press)),e.setLimits(-On*1.1,-t.press)},exit:(t,{body:e,ground:n})=>{this.world.destroyBody(e),this.world.destroyBody(n)}}),this.binder=lr.create({key:t=>t.key,drivers:[this.partDriver,this.ballDriver,this.captiveDriver,this.flipperDriver,this.plungerDriver]}),this.on("activate",this.handleActivate),this.on(ur,this.handleFrameUpdate),this.on(or,this.handleNudge)}handleActivate(){this.world||(this.world=new mn({gravity:{x:0,y:-1}}),this.world.on("pre-solve",this.handlePreSolve),this.world.on("begin-contact",this.handleBeginContact),this.world.on("end-contact",this.handleEndContact))}applyFields(){const t=this.context;for(const e of t.parts){if(e.type==="magnet")e.active=t.time%ph<dh;else if(e.type==="disc")e.angle+=Er*ni;else if(e instanceof sr){this.turnSpinner(e);continue}else continue;for(const[n,r]of this.ballBodies){if(n.heldBy||n.layer!=="ground")continue;const s=r.getPosition(),o=e.position.x-s.x,a=e.position.y-s.y,l=Math.hypot(o,a);if(l>e.radius)continue;const h=r.getLinearVelocity(),_=r.getMass();if(e.type==="magnet"&&e.active){const p=fh*(.4+.6*l/e.radius);r.applyForceToCenter({x:p*o/(l||1)-2*_*h.x,y:p*a/(l||1)-2*_*h.y})}else if(e.type==="disc"){const p={x:Er*a,y:-Er*o};r.applyForceToCenter({x:Yo*_*(p.x-h.x),y:Yo*_*(p.y-h.y)})}}}}turnSpinner(t){const e=Math.floor(t.spin);t.spin+=t.spinSpeed*ni,t.spinSpeed*=Math.exp(-.9*ni),t.spinSpeed<.3&&(t.spinSpeed=0);for(let n=e;n<Math.floor(t.spin);n++)this.emit(Wn,{part:t})}touchOf(t){const e=t.getFixtureA().getBody(),n=t.getFixtureB().getBody(),r=e.getUserData(),s=n.getUserData();return r instanceof Fi&&s instanceof kt?{ball:r,ballBody:e,part:s,contact:t}:s instanceof Fi&&r instanceof kt?{ball:s,ballBody:n,part:r,contact:t}:null}afterStep(){const t=this.context,e=this.touches;this.touches=[];for(const{ball:r,ballBody:s,part:o}of e)if(!r.drained){if(o instanceof sr){const a=s.getLinearVelocity();o.spinSpeed+=Math.hypot(a.x,a.y)*vh;continue}else if(o instanceof ui){if(r.heldBy||t.time<r.freeAt||r.layer!=="ground")continue;r.heldBy=o,r.heldUntil=o.type==="saucer"?t.time+_h:1/0,o.full=!0}else switch(o.type){case"drain":r.drained=!0,this.emit(Za,{ball:r});continue;case"drop-target":if(o.down)continue;o.down=!0;break;case"ramp-enter":continue;case"ramp-exit":if(r.layer!=="ramp")continue;this.setLayer(r,s,"ground");break;default:if(!Hr.includes(o.type))continue}t.time-o.hitAt<.08||(o.hitAt=t.time,this.emit(Wn,{part:o,ball:r}))}for(const r of this.captiveHits)t.time-r.hitAt<.08||(r.hitAt=t.time,this.emit(Wn,{part:r}));this.captiveHits=[];const n=this.leaves;this.leaves=[];for(const{ball:r,ballBody:s,part:o}of n)this.leaveEntrance(r,s,o);this.holdBalls()}leaveEntrance(t,e,n){const r=n.vertices[0],s=n.vertices[n.vertices.length-1],o={x:n.position.x+r.x,y:n.position.y+r.y},a={x:n.position.x+s.x,y:n.position.y+s.y},l=e.getPosition(),h={x:a.x-o.x,y:a.y-o.y},_=((l.x-o.x)*h.x+(l.y-o.y)*h.y)/(h.x*h.x+h.y*h.y),p=(l.x-o.x)*n.direction.x+(l.y-o.y)*n.direction.y>0;this.setLayer(t,e,p&&_>0&&_<1?"ramp":"ground")}setLayer(t,e,n){t.layer!==n&&(t.layer=n,e.getFixtureList().setFilterData({groupIndex:0,categoryBits:on,maskBits:aa[n]}))}holdBalls(){const t=this.context;for(const[e,n]of this.ballBodies){if(e.heldBy){const r=e.heldBy;if(t.time>=e.heldUntil){e.heldBy=null,e.freeAt=t.time+.6,r.full=t.balls.some(o=>o.heldBy===r);const s=r.direction??{x:0,y:-1};e.kick={x:s.x*Jo,y:s.y*Jo}}else{n.setPosition(r.position),n.setLinearVelocity({x:0,y:0}),n.setGravityScale(0);continue}}e.kick&&(n.setGravityScale(1),n.setLinearVelocity(e.kick),e.kick=null)}}checkLane(){const t=this.context.ballTemplate;this.context.ballInLane=!!t&&this.context.balls.some(e=>{const n=this.ballBodies.get(e);if(!n)return!1;const r=n.getPosition(),s=n.getLinearVelocity();return Math.abs(r.x-t.origin.x)<.06&&Math.abs(r.y-t.origin.y)<.15&&Math.abs(s.y)<.2})}bounceBumper(t,e){const n=t.getPosition(),r={x:n.x-e.position.x,y:n.y-e.position.y},s=Math.hypot(r.x,r.y);if(s===0)return;const o=jr(lh,.1);t.applyLinearImpulse({x:r.x/s*o,y:r.y/s*o},t.getWorldCenter())}bounceNormal(t,e,n){var s;const r=(s=e.getManifold())==null?void 0:s.localNormal;r&&t.applyLinearImpulse({x:r.x*n,y:r.y*n},t.getWorldCenter())}shapesOf(t,e){if(t.radius)return[new xe(t.radius)];const n=t.vertices;if(n.length===2)return[new le(n[0],n[1])];if(e&&t.closed&&n.length<=8&&cm(n))return[new ce(n)];if(e){const r=[];for(let s=0;s+1<n.length;s++)r.push(new le(n[s],n[s+1]));return t.closed&&r.push(new le(n[n.length-1],n[0])),r}return[new hn(n,t.closed)]}}const jr=(i,t)=>i+i*(Math.random()*2-1)*t,cm=i=>{let t=0;for(let e=0;e<i.length;e++){const n=i[e],r=i[(e+1)%i.length],s=i[(e+2)%i.length],o=(r.x-n.x)*(s.y-r.y)-(r.y-n.y)*(s.x-r.x);if(!(Math.abs(o)<1e-12)){if(t===0)t=Math.sign(o);else if(Math.sign(o)!==t)return!1}}return!0},hm=1.7,mm=1.2;class um extends he{constructor(){super(),this.bankResets=new Map,this.handleNewGame=()=>{const t=this.context;if(t.ballTemplate){t.balls=[];for(const e of t.parts)e.lit=!1,e.down=!1,e instanceof ui&&(e.full=!1);this.bankResets.clear(),Object.assign(this.game,{state:"playing",score:0,ball:1,locked:0,multiball:!1,tilt:0,tilted:!1}),this.serve(),this.callout("Ball 1")}},this.handleHit=({part:t})=>{if(this.game.state!=="playing"||this.game.tilted)return;let e=t.points??bh[t.type]??0;switch(t.type){case"rollover":t.lit=!0,this.completeGroup(t,n=>n.lit,"Lanes complete");break;case"target":t.lit=!0,this.completeGroup(t,n=>n.lit,"Targets complete");break;case"drop-target":t.group&&this.groupOf(t).every(n=>n.down)&&(this.score(Zo),this.callout("Bank down!"),this.bankResets.set(t.group,this.context.time+mm));break;case"lock":t instanceof ui&&this.lock(t);break;case"ramp-exit":this.game.multiball?(e=Ah,this.callout("Jackpot!")):this.callout("Ramp!");break}this.score(e)},this.handleBallDrained=({ball:t})=>{const e=this.context;if(e.balls=e.balls.filter(r=>r!==t),this.game.state!=="playing")return;const n=e.balls.filter(r=>{var s;return((s=r.heldBy)==null?void 0:s.type)!=="lock"});if(n.length>0){this.game.multiball&&n.length===1&&(this.game.multiball=!1,this.callout("Multiball over"));return}if(e.time<this.game.ballSaveUntil&&!this.game.tilted){this.serve(),this.callout("Ball saved");return}if(this.game.multiball=!1,this.game.tilted=!1,this.game.tilt=0,this.game.ball>=Ja){this.game.state="over",e.balls=[];return}this.game.ball++,this.serve(),this.callout(`Ball ${this.game.ball}`)},this.handleFlipperPress=({left:t})=>{if(this.game.state!=="playing")return;const e=new Map;for(const n of this.context.parts)n.type!=="rollover"||!n.group||(e.has(n.group)||e.set(n.group,[]),e.get(n.group).push(n));for(const n of e.values()){n.sort((o,a)=>o.position.x-a.position.x);const r=n.map(o=>o.lit),s=n.length;n.forEach((o,a)=>o.lit=t?r[(a+1)%s]:r[(a-1+s)%s])}},this.handleNudge=()=>{this.game.state!=="playing"||this.game.tilted||(this.game.tilt+=Ko,this.game.tilt>Xo?(this.game.tilted=!0,this.callout("Tilt")):this.game.tilt>Xo-Ko&&this.callout("Danger"))},this.handleFrameUpdate=t=>{const e=this.context,n=this.game;n.tilt=Math.max(0,n.tilt-yh*t.dt/1e3);for(const[s,o]of this.bankResets)if(!(e.time<o)){this.bankResets.delete(s);for(const a of e.parts)a.type==="drop-target"&&a.group===s&&(a.down=!1)}const r=e.lights;if(r.clear(),n.state==="playing"){e.time<n.ballSaveUntil&&r.add("ball-save"),n.multiball&&r.add("multiball"),n.tilted&&r.add("tilt");for(let s=1;s<=n.locked;s++)r.add(`lock-${s}`);for(let s=1;s<=n.ball;s++)r.add(`ball-${s}`)}},this.on("activate",this.handleNewGame),this.on(xs,this.handleNewGame),this.on(Xa,this.handleNewGame),this.on(Wn,this.handleHit),this.on(Za,this.handleBallDrained),this.on(Qr,this.handleFlipperPress),this.on(or,this.handleNudge),this.on(ur,this.handleFrameUpdate)}get game(){return this.context.game}serve(t=!1){const e=this.context,n=e.ballTemplate,r=new Fi(n.origin,n.radius,n.elementId);t&&(r.kick={x:0,y:hm}),e.balls.push(r),this.game.ballSaveUntil=e.time+xh}groupOf(t){return this.context.parts.filter(e=>e.type===t.type&&e.group===t.group)}completeGroup(t,e,n){if(!t.group)return;const r=this.groupOf(t);if(r.every(e)){this.score(Zo),this.callout(n);for(const s of r)s.lit=!1}}lock(t){var r;const e=this.context;this.game.locked++;const n=t.locks??gh;if(this.game.locked>=n){let s=e.time+.3;for(const o of e.balls)((r=o.heldBy)==null?void 0:r.type)==="lock"&&(o.heldUntil=s,s+=.6);this.game.locked=0,this.game.multiball=!0,this.serve(!0),this.callout("Multiball!")}else this.serve(),this.callout(`Ball ${this.game.locked} locked`)}score(t){this.game.score+=t}callout(t){this.context.callout={text:t,at:performance.now()}}}const tl=new DOMMatrix().scale(1/rr,-1/rr),_m=tl.inverse(),pm=.15;class dm extends he{constructor(){super(),this.ballTemplate=null,this.lightElements=[],this.handleActivate=()=>{this.container=document.getElementById("table")??document.body,this.show(this.context.drawing)},this.handleTableLoaded=()=>{this.show(this.context.drawing)},this.handleDeactivate=()=>{var t;this.binder.setData([]),(t=this.svg)==null||t.remove(),this.svg=null},this.handleFrameRender=()=>{var n;if(!this.svg)return;const t=this.context,e=t.ballTemplate;e&&!this.ballTemplate&&(this.ballTemplate=this.svg.getElementById(e.elementId),(n=this.ballTemplate)==null||n.setAttribute("visibility","hidden")),this.binder.setData([...t.parts,...t.balls]);for(const r of this.lightElements)r.classList.toggle("lit",t.lights.has(r.getAttribute("data-light")))},this.ballDriver=Dt.create({filter:t=>t instanceof Fi,enter:()=>{const t=this.ballTemplate;if(!t)return null;const e=t.cloneNode(!0);return e.removeAttribute("id"),e.removeAttribute("visibility"),e.setAttribute("data-role","ball"),t.after(e),{...this.place(e),layer:"ground"}},update:(t,e)=>{e.layer!==t.layer&&(e.layer=t.layer,t.layer==="ramp"?this.ballTemplate.parentElement.append(e.element):this.ballTemplate.after(e.element));let n=this.rigid(t);t.layer==="ramp"&&(n=n.translate(t.origin.x,t.origin.y).scale(1.18).translate(-t.origin.x,-t.origin.y)),this.move(e,n)},exit:(t,{element:e})=>e.remove()}),this.movingDriver=Dt.create({filter:t=>t instanceof kt&&["flipper","plunger","captive-ball","disc"].includes(t.type),enter:t=>this.elementsOf(t).map(e=>this.place(e)),update:(t,e)=>{const n=this.rigid(t);for(const r of e)this.move(r,n),this.showState(t,r.element)},exit:()=>{}}),this.spinnerDriver=Dt.create({filter:t=>t instanceof sr,enter:t=>{const e=t.vertices,n=e?Math.atan2(e[1].y-e[0].y,e[1].x-e[0].x):0;return{placed:this.elementsOf(t).map(r=>this.place(r)),axis:n}},update:(t,{placed:e,axis:n})=>{const r=n*180/Math.PI,s=Math.max(.08,Math.abs(Math.cos(t.spin*Math.PI))),o=new DOMMatrix().translate(t.position.x,t.position.y).rotate(r).scale(1,s).rotate(-r).translate(-t.position.x,-t.position.y);for(const a of e)this.move(a,o)},exit:()=>{}}),this.stateDriver=Dt.create({filter:t=>t instanceof kt&&["bumper","slingshot","kicker","rollover","target","drop-target","saucer","lock","magnet","ramp-exit"].includes(t.type),enter:t=>this.elementsOf(t),update:(t,e)=>{for(const n of e)this.showState(t,n)},exit:()=>{}}),this.roleDriver=Dt.create({filter:t=>t instanceof kt,enter:t=>{const e=this.svg.getElementById(t.elementId);return e==null||e.setAttribute("data-role",t.type),e},update:()=>{},exit:(t,e)=>e==null?void 0:e.removeAttribute("data-role")}),this.nameDriver=Dt.create({filter:t=>t instanceof kt,enter:t=>this.elementsOf(t).map(e=>{const n=document.createElementNS("http://www.w3.org/2000/svg","title");return n.textContent=[`${t.type}: ${t.elementId}`,t.group!=null&&`group: ${t.group}`,t.points!=null&&`points: ${t.points}`,t instanceof ui&&t.locks!=null&&`locks: ${t.locks}`].filter(Boolean).join(`
`),e.prepend(n),n}),update:()=>{},exit:(t,e)=>{for(const n of e)n.remove()}}),this.binder=lr.create({key:t=>t.key,drivers:[this.ballDriver,this.movingDriver,this.spinnerDriver,this.stateDriver,this.nameDriver,this.roleDriver]}),this.on("activate",this.handleActivate),this.on("deactivate",this.handleDeactivate),this.on(xs,this.handleTableLoaded),this.on(ys,this.handleFrameRender)}show(t){var n;if(!t||t===this.svg)return;this.binder.setData([]),(n=this.svg)==null||n.remove(),this.svg=t,this.svg.removeAttribute("width"),this.svg.removeAttribute("height"),this.container.appendChild(this.svg);const e=this.svg.viewBox.baseVal;e!=null&&e.width&&e.height&&this.container.style.setProperty("--table-aspect",String(e.width/e.height)),this.ballTemplate=null,this.lightElements=Array.from(this.svg.querySelectorAll("[data-light]"));for(const r of Array.from(this.svg.querySelectorAll("*"))){const s=r.getAttribute("inkscape:label")||r.getAttribute("data-pinball-label");(s==="flipper-anchor-left"||s==="flipper-anchor-right")&&r.setAttribute("data-role","pivot")}this.svg.insertAdjacentHTML("afterbegin",vm)}elementsOf(t){const e=this.svg.getElementById(t.elementId),n=this.svg.querySelectorAll(`[data-part="${CSS.escape(t.elementId)}"]`);return[...e?[e]:[],...n]}place(t){const e=fm(t,this.svg);return{element:t,parent:e,parentInverse:e.inverse(),own:el(t)}}move({element:t,parent:e,parentInverse:n,own:r},s){const o=n.multiply(_m).multiply(s).multiply(tl).multiply(e).multiply(r);t.setAttribute("transform",`matrix(${o.a} ${o.b} ${o.c} ${o.d} ${o.e} ${o.f})`)}rigid(t){return new DOMMatrix().translate(t.position.x,t.position.y).rotate(t.angle*180/Math.PI).translate(-t.origin.x,-t.origin.y)}showState(t,e){const n=e.classList;n.toggle("lit",t.lit),n.toggle("down",t.down),n.toggle("active",t.active),n.toggle("full",t instanceof ui&&t.full),n.toggle("hit",this.context.time-t.hitAt<pm)}}function el(i){const t=i.transform.baseVal.consolidate();return t?DOMMatrix.fromMatrix(t.matrix):new DOMMatrix}function fm(i,t){let e=new DOMMatrix;for(let n=i.parentElement;n&&n!==t;n=n.parentElement)n instanceof SVGGraphicsElement&&(e=el(n).multiply(e));return e}const $n=(i,t)=>`<pattern id="${i}" width="0.22" height="0.22" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="0.22" height="0.22" fill="#f1e7cf" /><line x1="0" y1="0" x2="0" y2="0.22" stroke="${t}" stroke-width="0.05" /></pattern>`,vm='<defs id="engineers-plate-defs">'+$n("plate-hatch-red","#9a2b1c")+$n("plate-hatch-indigo","#2d3f73")+$n("plate-hatch-ochre","#a8741e")+$n("plate-hatch-ink","#2b2016")+'<pattern id="plate-dots" width="0.16" height="0.16" patternUnits="userSpaceOnUse"><rect width="0.16" height="0.16" fill="#f1e7cf" /><circle cx="0.04" cy="0.04" r="0.028" fill="#2b2016" /><circle cx="0.12" cy="0.12" r="0.028" fill="#2b2016" /></pattern><pattern id="plate-cross" width="1" height="1" patternContentUnits="objectBoundingBox"><rect width="1" height="1" fill="#f1e7cf" /><path d="M 0.5,0 V 1 M 0,0.5 H 1" stroke="#2b2016" stroke-width="0.14" /></pattern></defs>';class ym extends he{constructor(){super(),this.handleFrameRender=()=>{const{hud:t,game:e,table:n}=this.context,r="pinball-best-"+n.value,s=Math.max(e.score,la(r));s>la(r)&&xm(r,s),t.score.value=e.score,t.best.value=s,t.ball.value=e.ball,t.balls.value=Ja,t.over.value=e.state==="over",t.tilted.value=e.tilted,this.context.callout!==t.message.value&&(t.message.value=this.context.callout)},this.on(ys,this.handleFrameRender)}}const Kn=new Map;function la(i){if(!Kn.has(i)){let t=0;try{t=Number(localStorage.getItem(i))||0}catch{}Kn.set(i,t)}return Kn.get(i)}function xm(i,t){Kn.set(i,t);try{localStorage.setItem(i,String(t))}catch{}}class gm extends he{constructor(){super(),this.handleSelectTable=t=>{this.context.table.value=t,history.replaceState(null,"","#"+t)},this.use(new Th),this.use(new Wh),this.use(new sm),this.use(new lm),this.use(new um),this.use(new dm),this.use(new ym),this.on(Ka,this.handleSelectTable),this.on(ma,t=>(console.error(`Pinball: a handler for "${t.type}" failed`,t.error),!0))}}const es=new gm,il=new Ph;ar.activate(es,il);ca.value={context:il,emit:es.emit.bind(es)};typeof window<"u"&&(window.runtime=ca.value);
