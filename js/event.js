var eventUtil = {
    // 添加句柄
    addHandler: function (element, type, handler) {
        if (element.addEventListener) {
            element.addEventListener(type, handler, false);
        } else if (element.attachEvent) {
            element.attachEvent('on' + type, handler);
        } else {
            element['on' + type] = handler;
        }
    },
    // 删除句柄
    removeHandler: function (element, type, handler) {
        if (element.removeEventListener) {
            element.removeEventListener(type, handler, false);
        } else if (element.detachEvent) {
            element.detachEvent('on' + type, handler);
        } else {
            element['on' + type] = null;
        }
    },
    getEvent: function (event) {
        return event ? event : window.event;
    },
    getType: function (event) {
        return event.type;
    },
    getElement: function (event) {
        return event.target || event.srcElement;
    },
    preventDefault: function (event) {
        if (event.preventDefault) {
            event.preventDefault();
        } else {
            event.returnValue = false;
        }
    },
    stopPropagation: function (event) {
        if (event.stopPropagation) {
            event.stopPropagation();
        } else {
            event.cancelBubble = true;
        }
    }
}


// window.onload=function(){
//   var go=document.getElementById('go'),
//   eventUtil.addHandler(go,'click',function(e){
//   	//e=eventUtil.getEvent(e);
//   	e=e || window.event;
//   	alert(eventUtil.getElement(e).nodeName);
//   	eventUtil.preventDefault(e);
//   	eventUtil.stopPropagation(e);
//   });
// }

// getElementsByClassName
if (!document.getElementsByClassName) {
    document.getElementsByClassName = function (cls) {
        var ret = [];
        var els = document.getElementsByTagName('*');
        for (var i = 0, len = els.length; i < len; i++) {
            if (els[i].className === cls
                || els[i].className.indexOf(cls + ' ') >= 0
                || els[i].className.indexOf(' ' + cls + ' ') >= 0
                || els[i].className.indexOf(' ' + cls) >= 0) {
                ret.push(els[i]);
            }
        }
        return ret;
    }
}

function getByClass(clsName,parent){
  var oParent=parent?document.getElementById(parent):document,
      eles=[],
      elements=oParent.getElementsByTagName('*');

  for(var i=0,l=elements.length;i<l;i++){
    if(elements[i].className==clsName){
      eles.push(elements[i]);
    }
  }
  return eles;
}