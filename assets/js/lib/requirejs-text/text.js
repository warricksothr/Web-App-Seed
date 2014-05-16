define(["module"],function(module){"use strict";var e,t,n,r,o,i=["Msxml2.XMLHTTP","Microsoft.XMLHTTP","Msxml2.XMLHTTP.4.0"],a=/^\s*<\?xml(\s)+version=[\'\"](\d)*.(\d)*[\'\"](\s)*\?>/im,s=/<body[^>]*>\s*([\s\S]+)\s*<\/body>/im,u="undefined"!=typeof location&&location.href,d=u&&location.protocol&&location.protocol.replace(/\:/,""),p=u&&location.hostname,l=u&&(location.port||void 0),c={},f=module.config&&module.config()||{};return e={version:"2.0.12",strip:function(e){if(e){e=e.replace(a,"");var t=e.match(s);t&&(e=t[1])}else e="";return e},jsEscape:function(e){return e.replace(/(['\\])/g,"\\$1").replace(/[\f]/g,"\\f").replace(/[\b]/g,"\\b").replace(/[\n]/g,"\\n").replace(/[\t]/g,"\\t").replace(/[\r]/g,"\\r").replace(/[\u2028]/g,"\\u2028").replace(/[\u2029]/g,"\\u2029")},createXhr:f.createXhr||function(){var e,t,n;if("undefined"!=typeof XMLHttpRequest)return new XMLHttpRequest;if("undefined"!=typeof ActiveXObject)for(t=0;3>t;t+=1){n=i[t];try{e=new ActiveXObject(n)}catch(r){}if(e){i=[n];break}}return e},parseName:function(e){var t,n,r,o=!1,i=e.indexOf("."),a=0===e.indexOf("./")||0===e.indexOf("../");return-1!==i&&(!a||i>1)?(t=e.substring(0,i),n=e.substring(i+1,e.length)):t=e,r=n||t,i=r.indexOf("!"),-1!==i&&(o="strip"===r.substring(i+1),r=r.substring(0,i),n?n=r:t=r),{moduleName:t,ext:n,strip:o}},xdRegExp:/^((\w+)\:)?\/\/([^\/\\]+)/,useXhr:function(t,n,r,o){var i,a,s,u=e.xdRegExp.exec(t);return u?(i=u[2],a=u[3],a=a.split(":"),s=a[1],a=a[0],!(i&&i!==n||a&&a.toLowerCase()!==r.toLowerCase()||(s||a)&&s!==o)):!0},finishLoad:function(t,n,r,o){r=n?e.strip(r):r,f.isBuild&&(c[t]=r),o(r)},load:function(t,n,r,o){if(o&&o.isBuild&&!o.inlineText)return r(),void 0;f.isBuild=o&&o.isBuild;var i=e.parseName(t),a=i.moduleName+(i.ext?"."+i.ext:""),s=n.toUrl(a),c=f.useXhr||e.useXhr;return 0===s.indexOf("empty:")?(r(),void 0):(!u||c(s,d,p,l)?e.get(s,function(n){e.finishLoad(t,i.strip,n,r)},function(e){r.error&&r.error(e)}):n([a],function(t){e.finishLoad(i.moduleName+"."+i.ext,i.strip,t,r)}),void 0)},write:function(t,n,r){if(c.hasOwnProperty(n)){var o=e.jsEscape(c[n]);r.asModule(t+"!"+n,"define(function () { return '"+o+"';});\n")}},writeFile:function(t,n,r,o,i){var a=e.parseName(n),s=a.ext?"."+a.ext:"",u=a.moduleName+s,d=r.toUrl(a.moduleName+s)+".js";e.load(u,r,function(){var n=function(e){return o(d,e)};n.asModule=function(e,t){return o.asModule(e,d,t)},e.write(t,u,n,i)},i)}},"node"===f.env||!f.env&&"undefined"!=typeof process&&process.versions&&process.versions.node&&!process.versions["node-webkit"]?(t=require.nodeRequire("fs"),e.get=function(e,n,r){try{var o=t.readFileSync(e,"utf8");0===o.indexOf("﻿")&&(o=o.substring(1)),n(o)}catch(i){r&&r(i)}}):"xhr"===f.env||!f.env&&e.createXhr()?e.get=function(t,n,r,o){var i,a=e.createXhr();if(a.open("GET",t,!0),o)for(i in o)o.hasOwnProperty(i)&&a.setRequestHeader(i.toLowerCase(),o[i]);f.onXhr&&f.onXhr(a,t),a.onreadystatechange=function(){var e,o;4===a.readyState&&(e=a.status||0,e>399&&600>e?(o=new Error(t+" HTTP status: "+e),o.xhr=a,r&&r(o)):n(a.responseText),f.onXhrComplete&&f.onXhrComplete(a,t))},a.send(null)}:"rhino"===f.env||!f.env&&"undefined"!=typeof Packages&&"undefined"!=typeof java?e.get=function(e,t){var n,r,o="utf-8",i=new java.io.File(e),a=java.lang.System.getProperty("line.separator"),s=new java.io.BufferedReader(new java.io.InputStreamReader(new java.io.FileInputStream(i),o)),u="";try{for(n=new java.lang.StringBuffer,r=s.readLine(),r&&r.length()&&65279===r.charAt(0)&&(r=r.substring(1)),null!==r&&n.append(r);null!==(r=s.readLine());)n.append(a),n.append(r);u=String(n.toString())}finally{s.close()}t(u)}:("xpconnect"===f.env||!f.env&&"undefined"!=typeof Components&&Components.classes&&Components.interfaces)&&(n=Components.classes,r=Components.interfaces,Components.utils["import"]("resource://gre/modules/FileUtils.jsm"),o="@mozilla.org/windows-registry-key;1"in n,e.get=function(e,t){var i,a,s,u={};o&&(e=e.replace(/\//g,"\\")),s=new FileUtils.File(e);try{i=n["@mozilla.org/network/file-input-stream;1"].createInstance(r.nsIFileInputStream),i.init(s,1,0,!1),a=n["@mozilla.org/intl/converter-input-stream;1"].createInstance(r.nsIConverterInputStream),a.init(i,"utf-8",i.available(),r.nsIConverterInputStream.DEFAULT_REPLACEMENT_CHARACTER),a.readString(i.available(),u),a.close(),i.close(),t(u.value)}catch(d){throw new Error((s&&s.path||"")+": "+d)}}),e});