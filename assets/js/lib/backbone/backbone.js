!function(t,e){if("function"==typeof define&&define.amd)define(["underscore","jquery","exports"],function(i,n,exports){t.Backbone=e(t,exports,i,n)});else if("undefined"!=typeof exports){var i=require("underscore");e(t,exports,i)}else t.Backbone=e(t,{},t._,t.jQuery||t.Zepto||t.ender||t.$)}(this,function(t,e,i,n){{var s=t.Backbone,o=[],r=(o.push,o.slice);o.splice}e.VERSION="1.1.2",e.$=n,e.noConflict=function(){return t.Backbone=s,this},e.emulateHTTP=!1,e.emulateJSON=!1;var a=e.Events={on:function(t,e,i){if(!h(this,"on",t,[e,i])||!e)return this;this._events||(this._events={});var n=this._events[t]||(this._events[t]=[]);return n.push({callback:e,context:i,ctx:i||this}),this},once:function(t,e,n){if(!h(this,"once",t,[e,n])||!e)return this;var s=this,o=i.once(function(){s.off(t,o),e.apply(this,arguments)});return o._callback=e,this.on(t,o,n)},off:function(t,e,n){var s,o,r,a,l,c,u,d;if(!this._events||!h(this,"off",t,[e,n]))return this;if(!t&&!e&&!n)return this._events=void 0,this;for(a=t?[t]:i.keys(this._events),l=0,c=a.length;c>l;l++)if(t=a[l],r=this._events[t]){if(this._events[t]=s=[],e||n)for(u=0,d=r.length;d>u;u++)o=r[u],(e&&e!==o.callback&&e!==o.callback._callback||n&&n!==o.context)&&s.push(o);s.length||delete this._events[t]}return this},trigger:function(t){if(!this._events)return this;var e=r.call(arguments,1);if(!h(this,"trigger",t,e))return this;var i=this._events[t],n=this._events.all;return i&&c(i,e),n&&c(n,arguments),this},stopListening:function(t,e,n){var s=this._listeningTo;if(!s)return this;var o=!e&&!n;n||"object"!=typeof e||(n=this),t&&((s={})[t._listenId]=t);for(var r in s)t=s[r],t.off(e,n,this),(o||i.isEmpty(t._events))&&delete this._listeningTo[r];return this}},l=/\s+/,h=function(t,e,i,n){if(!i)return!0;if("object"==typeof i){for(var s in i)t[e].apply(t,[s,i[s]].concat(n));return!1}if(l.test(i)){for(var o=i.split(l),r=0,a=o.length;a>r;r++)t[e].apply(t,[o[r]].concat(n));return!1}return!0},c=function(t,e){var i,n=-1,s=t.length,o=e[0],r=e[1],a=e[2];switch(e.length){case 0:for(;++n<s;)(i=t[n]).callback.call(i.ctx);return;case 1:for(;++n<s;)(i=t[n]).callback.call(i.ctx,o);return;case 2:for(;++n<s;)(i=t[n]).callback.call(i.ctx,o,r);return;case 3:for(;++n<s;)(i=t[n]).callback.call(i.ctx,o,r,a);return;default:for(;++n<s;)(i=t[n]).callback.apply(i.ctx,e);return}},u={listenTo:"on",listenToOnce:"once"};i.each(u,function(t,e){a[e]=function(e,n,s){var o=this._listeningTo||(this._listeningTo={}),r=e._listenId||(e._listenId=i.uniqueId("l"));return o[r]=e,s||"object"!=typeof n||(s=this),e[t](n,s,this),this}}),a.bind=a.on,a.unbind=a.off,i.extend(e,a);var d=e.Model=function(t,e){var n=t||{};e||(e={}),this.cid=i.uniqueId("c"),this.attributes={},e.collection&&(this.collection=e.collection),e.parse&&(n=this.parse(n,e)||{}),n=i.defaults({},n,i.result(this,"defaults")),this.set(n,e),this.changed={},this.initialize.apply(this,arguments)};i.extend(d.prototype,a,{changed:null,validationError:null,idAttribute:"id",initialize:function(){},toJSON:function(){return i.clone(this.attributes)},sync:function(){return e.sync.apply(this,arguments)},get:function(t){return this.attributes[t]},escape:function(t){return i.escape(this.get(t))},has:function(t){return null!=this.get(t)},set:function(t,e,n){var s,o,r,a,l,h,c,u;if(null==t)return this;if("object"==typeof t?(o=t,n=e):(o={})[t]=e,n||(n={}),!this._validate(o,n))return!1;r=n.unset,l=n.silent,a=[],h=this._changing,this._changing=!0,h||(this._previousAttributes=i.clone(this.attributes),this.changed={}),u=this.attributes,c=this._previousAttributes,this.idAttribute in o&&(this.id=o[this.idAttribute]);for(s in o)e=o[s],i.isEqual(u[s],e)||a.push(s),i.isEqual(c[s],e)?delete this.changed[s]:this.changed[s]=e,r?delete u[s]:u[s]=e;if(!l){a.length&&(this._pending=n);for(var d=0,p=a.length;p>d;d++)this.trigger("change:"+a[d],this,u[a[d]],n)}if(h)return this;if(!l)for(;this._pending;)n=this._pending,this._pending=!1,this.trigger("change",this,n);return this._pending=!1,this._changing=!1,this},unset:function(t,e){return this.set(t,void 0,i.extend({},e,{unset:!0}))},clear:function(t){var e={};for(var n in this.attributes)e[n]=void 0;return this.set(e,i.extend({},t,{unset:!0}))},hasChanged:function(t){return null==t?!i.isEmpty(this.changed):i.has(this.changed,t)},changedAttributes:function(t){if(!t)return this.hasChanged()?i.clone(this.changed):!1;var e,n=!1,s=this._changing?this._previousAttributes:this.attributes;for(var o in t)i.isEqual(s[o],e=t[o])||((n||(n={}))[o]=e);return n},previous:function(t){return null!=t&&this._previousAttributes?this._previousAttributes[t]:null},previousAttributes:function(){return i.clone(this._previousAttributes)},fetch:function(t){t=t?i.clone(t):{},void 0===t.parse&&(t.parse=!0);var e=this,n=t.success;return t.success=function(i){return e.set(e.parse(i,t),t)?(n&&n(e,i,t),e.trigger("sync",e,i,t),void 0):!1},F(this,t),this.sync("read",this,t)},save:function(t,e,n){var s,o,r,a=this.attributes;if(null==t||"object"==typeof t?(s=t,n=e):(s={})[t]=e,n=i.extend({validate:!0},n),s&&!n.wait){if(!this.set(s,n))return!1}else if(!this._validate(s,n))return!1;s&&n.wait&&(this.attributes=i.extend({},a,s)),void 0===n.parse&&(n.parse=!0);var l=this,h=n.success;return n.success=function(t){l.attributes=a;var e=l.parse(t,n);return n.wait&&(e=i.extend(s||{},e)),i.isObject(e)&&!l.set(e,n)?!1:(h&&h(l,t,n),l.trigger("sync",l,t,n),void 0)},F(this,n),o=this.isNew()?"create":n.patch?"patch":"update","patch"===o&&(n.attrs=s),r=this.sync(o,this,n),s&&n.wait&&(this.attributes=a),r},destroy:function(t){t=t?i.clone(t):{};var e=this,n=t.success,s=function(){e.trigger("destroy",e,e.collection,t)};if(t.success=function(i){(t.wait||e.isNew())&&s(),n&&n(e,i,t),e.isNew()||e.trigger("sync",e,i,t)},this.isNew())return t.success(),!1;F(this,t);var o=this.sync("delete",this,t);return t.wait||s(),o},url:function(){var t=i.result(this,"urlRoot")||i.result(this.collection,"url")||U();return this.isNew()?t:t.replace(/([^\/])$/,"$1/")+encodeURIComponent(this.id)},parse:function(t){return t},clone:function(){return new this.constructor(this.attributes)},isNew:function(){return!this.has(this.idAttribute)},isValid:function(t){return this._validate({},i.extend(t||{},{validate:!0}))},_validate:function(t,e){if(!e.validate||!this.validate)return!0;t=i.extend({},this.attributes,t);var n=this.validationError=this.validate(t,e)||null;return n?(this.trigger("invalid",this,n,i.extend(e,{validationError:n})),!1):!0}});var p=["keys","values","pairs","invert","pick","omit"];i.each(p,function(t){d.prototype[t]=function(){var e=r.call(arguments);return e.unshift(this.attributes),i[t].apply(i,e)}});var f=e.Collection=function(t,e){e||(e={}),e.model&&(this.model=e.model),void 0!==e.comparator&&(this.comparator=e.comparator),this._reset(),this.initialize.apply(this,arguments),t&&this.reset(t,i.extend({silent:!0},e))},g={add:!0,remove:!0,merge:!0},v={add:!0,remove:!1};i.extend(f.prototype,a,{model:d,initialize:function(){},toJSON:function(t){return this.map(function(e){return e.toJSON(t)})},sync:function(){return e.sync.apply(this,arguments)},add:function(t,e){return this.set(t,i.extend({merge:!1},e,v))},remove:function(t,e){var n=!i.isArray(t);t=n?[t]:i.clone(t),e||(e={});var s,o,r,a;for(s=0,o=t.length;o>s;s++)a=t[s]=this.get(t[s]),a&&(delete this._byId[a.id],delete this._byId[a.cid],r=this.indexOf(a),this.models.splice(r,1),this.length--,e.silent||(e.index=r,a.trigger("remove",a,this,e)),this._removeReference(a,e));return n?t[0]:t},set:function(t,e){e=i.defaults({},e,g),e.parse&&(t=this.parse(t,e));var n=!i.isArray(t);t=n?t?[t]:[]:i.clone(t);var s,o,r,a,l,h,c,u=e.at,p=this.model,f=this.comparator&&null==u&&e.sort!==!1,v=i.isString(this.comparator)?this.comparator:null,m=[],y=[],b={},w=e.add,$=e.merge,x=e.remove,C=!f&&w&&x?[]:!1;for(s=0,o=t.length;o>s;s++){if(l=t[s]||{},r=l instanceof d?a=l:l[p.prototype.idAttribute||"id"],h=this.get(r))x&&(b[h.cid]=!0),$&&(l=l===a?a.attributes:l,e.parse&&(l=h.parse(l,e)),h.set(l,e),f&&!c&&h.hasChanged(v)&&(c=!0)),t[s]=h;else if(w){if(a=t[s]=this._prepareModel(l,e),!a)continue;m.push(a),this._addReference(a,e)}a=h||a,!C||!a.isNew()&&b[a.id]||C.push(a),b[a.id]=!0}if(x){for(s=0,o=this.length;o>s;++s)b[(a=this.models[s]).cid]||y.push(a);y.length&&this.remove(y,e)}if(m.length||C&&C.length)if(f&&(c=!0),this.length+=m.length,null!=u)for(s=0,o=m.length;o>s;s++)this.models.splice(u+s,0,m[s]);else{C&&(this.models.length=0);var T=C||m;for(s=0,o=T.length;o>s;s++)this.models.push(T[s])}if(c&&this.sort({silent:!0}),!e.silent){for(s=0,o=m.length;o>s;s++)(a=m[s]).trigger("add",a,this,e);(c||C&&C.length)&&this.trigger("sort",this,e)}return n?t[0]:t},reset:function(t,e){e||(e={});for(var n=0,s=this.models.length;s>n;n++)this._removeReference(this.models[n],e);return e.previousModels=this.models,this._reset(),t=this.add(t,i.extend({silent:!0},e)),e.silent||this.trigger("reset",this,e),t},push:function(t,e){return this.add(t,i.extend({at:this.length},e))},pop:function(t){var e=this.at(this.length-1);return this.remove(e,t),e},unshift:function(t,e){return this.add(t,i.extend({at:0},e))},shift:function(t){var e=this.at(0);return this.remove(e,t),e},slice:function(){return r.apply(this.models,arguments)},get:function(t){return null==t?void 0:this._byId[t]||this._byId[t.id]||this._byId[t.cid]},at:function(t){return this.models[t]},where:function(t,e){return i.isEmpty(t)?e?void 0:[]:this[e?"find":"filter"](function(e){for(var i in t)if(t[i]!==e.get(i))return!1;return!0})},findWhere:function(t){return this.where(t,!0)},sort:function(t){if(!this.comparator)throw new Error("Cannot sort a set without a comparator");return t||(t={}),i.isString(this.comparator)||1===this.comparator.length?this.models=this.sortBy(this.comparator,this):this.models.sort(i.bind(this.comparator,this)),t.silent||this.trigger("sort",this,t),this},pluck:function(t){return i.invoke(this.models,"get",t)},fetch:function(t){t=t?i.clone(t):{},void 0===t.parse&&(t.parse=!0);var e=t.success,n=this;return t.success=function(i){var s=t.reset?"reset":"set";n[s](i,t),e&&e(n,i,t),n.trigger("sync",n,i,t)},F(this,t),this.sync("read",this,t)},create:function(t,e){if(e=e?i.clone(e):{},!(t=this._prepareModel(t,e)))return!1;e.wait||this.add(t,e);var n=this,s=e.success;return e.success=function(t,i){e.wait&&n.add(t,e),s&&s(t,i,e)},t.save(null,e),t},parse:function(t){return t},clone:function(){return new this.constructor(this.models)},_reset:function(){this.length=0,this.models=[],this._byId={}},_prepareModel:function(t,e){if(t instanceof d)return t;e=e?i.clone(e):{},e.collection=this;var n=new this.model(t,e);return n.validationError?(this.trigger("invalid",this,n.validationError,e),!1):n},_addReference:function(t){this._byId[t.cid]=t,null!=t.id&&(this._byId[t.id]=t),t.collection||(t.collection=this),t.on("all",this._onModelEvent,this)},_removeReference:function(t){this===t.collection&&delete t.collection,t.off("all",this._onModelEvent,this)},_onModelEvent:function(t,e,i,n){("add"!==t&&"remove"!==t||i===this)&&("destroy"===t&&this.remove(e,n),e&&t==="change:"+e.idAttribute&&(delete this._byId[e.previous(e.idAttribute)],null!=e.id&&(this._byId[e.id]=e)),this.trigger.apply(this,arguments))}});var m=["forEach","each","map","collect","reduce","foldl","inject","reduceRight","foldr","find","detect","filter","select","reject","every","all","some","any","include","contains","invoke","max","min","toArray","size","first","head","take","initial","rest","tail","drop","last","without","difference","indexOf","shuffle","lastIndexOf","isEmpty","chain","sample"];i.each(m,function(t){f.prototype[t]=function(){var e=r.call(arguments);return e.unshift(this.models),i[t].apply(i,e)}});var y=["groupBy","countBy","sortBy","indexBy"];i.each(y,function(t){f.prototype[t]=function(e,n){var s=i.isFunction(e)?e:function(t){return t.get(e)};return i[t](this.models,s,n)}});var b=e.View=function(t){this.cid=i.uniqueId("view"),t||(t={}),i.extend(this,i.pick(t,$)),this._ensureElement(),this.initialize.apply(this,arguments),this.delegateEvents()},w=/^(\S+)\s*(.*)$/,$=["model","collection","el","id","attributes","className","tagName","events"];i.extend(b.prototype,a,{tagName:"div",$:function(t){return this.$el.find(t)},initialize:function(){},render:function(){return this},remove:function(){return this.$el.remove(),this.stopListening(),this},setElement:function(t,i){return this.$el&&this.undelegateEvents(),this.$el=t instanceof e.$?t:e.$(t),this.el=this.$el[0],i!==!1&&this.delegateEvents(),this},delegateEvents:function(t){if(!t&&!(t=i.result(this,"events")))return this;this.undelegateEvents();for(var e in t){var n=t[e];if(i.isFunction(n)||(n=this[t[e]]),n){var s=e.match(w),o=s[1],r=s[2];n=i.bind(n,this),o+=".delegateEvents"+this.cid,""===r?this.$el.on(o,n):this.$el.on(o,r,n)}}return this},undelegateEvents:function(){return this.$el.off(".delegateEvents"+this.cid),this},_ensureElement:function(){if(this.el)this.setElement(i.result(this,"el"),!1);else{var t=i.extend({},i.result(this,"attributes"));this.id&&(t.id=i.result(this,"id")),this.className&&(t["class"]=i.result(this,"className"));var n=e.$("<"+i.result(this,"tagName")+">").attr(t);this.setElement(n,!1)}}}),e.sync=function(t,n,s){var o=C[t];i.defaults(s||(s={}),{emulateHTTP:e.emulateHTTP,emulateJSON:e.emulateJSON});var r={type:o,dataType:"json"};if(s.url||(r.url=i.result(n,"url")||U()),null!=s.data||!n||"create"!==t&&"update"!==t&&"patch"!==t||(r.contentType="application/json",r.data=JSON.stringify(s.attrs||n.toJSON(s))),s.emulateJSON&&(r.contentType="application/x-www-form-urlencoded",r.data=r.data?{model:r.data}:{}),s.emulateHTTP&&("PUT"===o||"DELETE"===o||"PATCH"===o)){r.type="POST",s.emulateJSON&&(r.data._method=o);var a=s.beforeSend;s.beforeSend=function(t){return t.setRequestHeader("X-HTTP-Method-Override",o),a?a.apply(this,arguments):void 0}}"GET"===r.type||s.emulateJSON||(r.processData=!1),"PATCH"===r.type&&x&&(r.xhr=function(){return new ActiveXObject("Microsoft.XMLHTTP")});var l=s.xhr=e.ajax(i.extend(r,s));return n.trigger("request",n,l,s),l};var x=!("undefined"==typeof window||!window.ActiveXObject||window.XMLHttpRequest&&(new XMLHttpRequest).dispatchEvent),C={create:"POST",update:"PUT",patch:"PATCH","delete":"DELETE",read:"GET"};e.ajax=function(){return e.$.ajax.apply(e.$,arguments)};var T=e.Router=function(t){t||(t={}),t.routes&&(this.routes=t.routes),this._bindRoutes(),this.initialize.apply(this,arguments)},S=/\((.*?)\)/g,k=/(\(\?)?:\w+/g,E=/\*\w+/g,_=/[\-{}\[\]+?.,\\\^$|#\s]/g;i.extend(T.prototype,a,{initialize:function(){},route:function(t,n,s){i.isRegExp(t)||(t=this._routeToRegExp(t)),i.isFunction(n)&&(s=n,n=""),s||(s=this[n]);var o=this;return e.history.route(t,function(i){var r=o._extractParameters(t,i);o.execute(s,r),o.trigger.apply(o,["route:"+n].concat(r)),o.trigger("route",n,r),e.history.trigger("route",o,n,r)}),this},execute:function(t,e){t&&t.apply(this,e)},navigate:function(t,i){return e.history.navigate(t,i),this},_bindRoutes:function(){if(this.routes){this.routes=i.result(this,"routes");for(var t,e=i.keys(this.routes);null!=(t=e.pop());)this.route(t,this.routes[t])}},_routeToRegExp:function(t){return t=t.replace(_,"\\$&").replace(S,"(?:$1)?").replace(k,function(t,e){return e?t:"([^/?]+)"}).replace(E,"([^?]*?)"),new RegExp("^"+t+"(?:\\?([\\s\\S]*))?$")},_extractParameters:function(t,e){var n=t.exec(e).slice(1);return i.map(n,function(t,e){return e===n.length-1?t||null:t?decodeURIComponent(t):null})}});var j=e.History=function(){this.handlers=[],i.bindAll(this,"checkUrl"),"undefined"!=typeof window&&(this.location=window.location,this.history=window.history)},D=/^[#\/]|\s+$/g,P=/^\/+|\/+$/g,A=/msie [\w.]+/,L=/\/$/,H=/#.*$/;j.started=!1,i.extend(j.prototype,a,{interval:50,atRoot:function(){return this.location.pathname.replace(/[^\/]$/,"$&/")===this.root},getHash:function(t){var e=(t||this).location.href.match(/#(.*)$/);return e?e[1]:""},getFragment:function(t,e){if(null==t)if(this._hasPushState||!this._wantsHashChange||e){t=decodeURI(this.location.pathname+this.location.search);var i=this.root.replace(L,"");t.indexOf(i)||(t=t.slice(i.length))}else t=this.getHash();return t.replace(D,"")},start:function(t){if(j.started)throw new Error("Backbone.history has already been started");j.started=!0,this.options=i.extend({root:"/"},this.options,t),this.root=this.options.root,this._wantsHashChange=this.options.hashChange!==!1,this._wantsPushState=!!this.options.pushState,this._hasPushState=!!(this.options.pushState&&this.history&&this.history.pushState);var n=this.getFragment(),s=document.documentMode,o=A.exec(navigator.userAgent.toLowerCase())&&(!s||7>=s);if(this.root=("/"+this.root+"/").replace(P,"/"),o&&this._wantsHashChange){var r=e.$('<iframe src="javascript:0" tabindex="-1">');this.iframe=r.hide().appendTo("body")[0].contentWindow,this.navigate(n)}this._hasPushState?e.$(window).on("popstate",this.checkUrl):this._wantsHashChange&&"onhashchange"in window&&!o?e.$(window).on("hashchange",this.checkUrl):this._wantsHashChange&&(this._checkUrlInterval=setInterval(this.checkUrl,this.interval)),this.fragment=n;var a=this.location;if(this._wantsHashChange&&this._wantsPushState){if(!this._hasPushState&&!this.atRoot())return this.fragment=this.getFragment(null,!0),this.location.replace(this.root+"#"+this.fragment),!0;this._hasPushState&&this.atRoot()&&a.hash&&(this.fragment=this.getHash().replace(D,""),this.history.replaceState({},document.title,this.root+this.fragment))}return this.options.silent?void 0:this.loadUrl()},stop:function(){e.$(window).off("popstate",this.checkUrl).off("hashchange",this.checkUrl),this._checkUrlInterval&&clearInterval(this._checkUrlInterval),j.started=!1},route:function(t,e){this.handlers.unshift({route:t,callback:e})},checkUrl:function(){var t=this.getFragment();return t===this.fragment&&this.iframe&&(t=this.getFragment(this.getHash(this.iframe))),t===this.fragment?!1:(this.iframe&&this.navigate(t),this.loadUrl(),void 0)},loadUrl:function(t){return t=this.fragment=this.getFragment(t),i.any(this.handlers,function(e){return e.route.test(t)?(e.callback(t),!0):void 0})},navigate:function(t,e){if(!j.started)return!1;e&&e!==!0||(e={trigger:!!e});var i=this.root+(t=this.getFragment(t||""));if(t=t.replace(H,""),this.fragment!==t){if(this.fragment=t,""===t&&"/"!==i&&(i=i.slice(0,-1)),this._hasPushState)this.history[e.replace?"replaceState":"pushState"]({},document.title,i);else{if(!this._wantsHashChange)return this.location.assign(i);this._updateHash(this.location,t,e.replace),this.iframe&&t!==this.getFragment(this.getHash(this.iframe))&&(e.replace||this.iframe.document.open().close(),this._updateHash(this.iframe.location,t,e.replace))}return e.trigger?this.loadUrl(t):void 0}},_updateHash:function(t,e,i){if(i){var n=t.href.replace(/(javascript:|#).*$/,"");t.replace(n+"#"+e)}else t.hash="#"+e}}),e.history=new j;var O=function(t,e){var n,s=this;n=t&&i.has(t,"constructor")?t.constructor:function(){return s.apply(this,arguments)},i.extend(n,s,e);var o=function(){this.constructor=n};return o.prototype=s.prototype,n.prototype=new o,t&&i.extend(n.prototype,t),n.__super__=s.prototype,n};d.extend=f.extend=T.extend=b.extend=j.extend=O;var U=function(){throw new Error('A "url" property or function must be specified')},F=function(t,e){var i=e.error;e.error=function(n){i&&i(t,n,e),t.trigger("error",t,n,e)}};return e});