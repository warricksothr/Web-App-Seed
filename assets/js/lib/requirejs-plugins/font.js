define(["propertyParser"],function(t){function e(e){for(var i,r={},o=e.split("|"),s=o.length;s--;)i=n.exec(o[s]),r[i[1]]=t.parseProperties(i[2]);return r}var n=/^([^,]+),([^\|]+)\|?/;return{load:function(t,n,i,r){if(r.isBuild)i(null);else{var o=e(t);o.active=i,o.inactive=function(){i(!1)},n([("https:"===document.location.protocol?"https":"http")+"://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js"],function(){WebFont.load(o)})}}}});