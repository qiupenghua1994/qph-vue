var scrollChangeEvtList = new Set();
function onScrollTopChange(fn) {
  scrollChangeEvtList.add(fn);
  window.onscroll = function (e) {
    var t = document.documentElement.scrollTop || document.body.scrollTop;
    scrollChangeEvtList.forEach(evt => evt(t))
  };
}

/**
 * 主动触发事件，传入事件名和节点名
 * @param event
 * @param dom
 *
 *   Events ：包括所有的事件.
 HTMLEvents：包括 'abort', 'blur', 'change', 'error', 'focus', 'load', 'reset', 'resize', 'scroll', 'select',
 'submit', 'unload'. 事件
 UIEevents ：包括 'DOMActivate', 'DOMFocusIn', 'DOMFocusOut', 'keydown', 'keypress', 'keyup'.
 间接包含 MouseEvents.
 MouseEvents：包括 'click', 'mousedown', 'mousemove', 'mouseout', 'mouseover', 'mouseup'.
 MutationEvents:包括 'DOMAttrModified', 'DOMNodeInserted', 'DOMNodeRemoved',
 'DOMCharacterDataModified', 'DOMNodeInsertedIntoDocument',
 'DOMNodeRemovedFromDocument', 'DOMSubtreeModified'.
 */
function fireEvent(event, dom) {
  dom = dom || document.body;
  if (document.createEvent) {
    var evObj = document.createEvent('Events');
    evObj.initEvent(event, true, false);
    dom.dispatchEvent(evObj);
  } else if (document.createEventObject) {
    var evt = document.createEventObject();
    dom.fireEvent('on' + event, evt);
  }
}

function Stats() {

  var startTime = Date.now(), prevTime = startTime;
  var ms = 0, msMin = Infinity, msMax = 0;
  var fps = 0, fpsMin = Infinity, fpsMax = 0;
  var frames = 0, mode = 0;

  var container = document.createElement('div');
  container.id = 'stats';
  container.addEventListener('mousedown', function (event) {
    event.preventDefault();
    setMode(++mode % 2)
  }, false);
  container.style.cssText = 'width:80px;opacity:0.9;cursor:pointer';

  var fpsDiv = document.createElement('div');
  fpsDiv.id = 'fps';
  fpsDiv.style.cssText = 'padding:0 0 3px 3px;text-align:left;background-color:#002';
  container.appendChild(fpsDiv);

  var fpsText = document.createElement('div');
  fpsText.id = 'fpsText';
  fpsText.style.cssText = 'color:#0ff;font-family:Helvetica,Arial,sans-serif;font-size:9px;font-weight:bold;line-height:15px';
  fpsText.innerHTML = 'FPS';
  fpsDiv.appendChild(fpsText);

  var fpsGraph = document.createElement('div');
  fpsGraph.id = 'fpsGraph';
  fpsGraph.style.cssText = 'position:relative;width:74px;height:30px;background-color:#0ff';
  fpsDiv.appendChild(fpsGraph);

  while (fpsGraph.children.length < 74) {

    var bar = document.createElement('span');
    bar.style.cssText = 'width:1px;height:30px;float:left;background-color:#113';
    fpsGraph.appendChild(bar);

  }

  var msDiv = document.createElement('div');
  msDiv.id = 'ms';
  msDiv.style.cssText = 'padding:0 0 3px 3px;text-align:left;background-color:#020;display:none';
  container.appendChild(msDiv);

  var msText = document.createElement('div');
  msText.id = 'msText';
  msText.style.cssText = 'color:#0f0;font-family:Helvetica,Arial,sans-serif;font-size:9px;font-weight:bold;line-height:15px';
  msText.innerHTML = 'MS';
  msDiv.appendChild(msText);

  var msGraph = document.createElement('div');
  msGraph.id = 'msGraph';
  msGraph.style.cssText = 'position:relative;width:74px;height:30px;background-color:#0f0';
  msDiv.appendChild(msGraph);

  while (msGraph.children.length < 74) {

    var bar = document.createElement('span');
    bar.style.cssText = 'width:1px;height:30px;float:left;background-color:#131';
    msGraph.appendChild(bar);

  }

  var setMode = function (value) {

    mode = value;

    switch (mode) {

      case 0:
        fpsDiv.style.display = 'block';
        msDiv.style.display = 'none';
        break;
      case 1:
        fpsDiv.style.display = 'none';
        msDiv.style.display = 'block';
        break;
    }

  };

  var updateGraph = function (dom, value) {

    var child = dom.appendChild(dom.firstChild);
    child.style.height = value + 'px';

  };

  return {

    REVISION: 12,

    domElement: container,

    setMode: setMode,

    begin: function () {

      startTime = Date.now();

    },

    end: function () {

      var time = Date.now();

      ms = time - startTime;
      msMin = Math.min(msMin, ms);
      msMax = Math.max(msMax, ms);

      msText.textContent = ms + ' MS (' + msMin + '-' + msMax + ')';
      updateGraph(msGraph, Math.min(30, 30 - (ms / 200) * 30));

      frames++;

      if (time > prevTime + 1000) {

        fps = Math.round((frames * 1000) / (time - prevTime));
        fpsMin = Math.min(fpsMin, fps);
        fpsMax = Math.max(fpsMax, fps);

        fpsText.textContent = fps + ' FPS (' + fpsMin + '-' + fpsMax + ')';
        updateGraph(fpsGraph, Math.min(30, 30 - (fps / 100) * 30));

        prevTime = time;
        frames = 0;

      }

      return time;

    },

    update: function () {

      startTime = this.end();

    }

  }

};

export default {
  onScrollTopChange,
  Stats,
  fireEvent
}
export {
  fireEvent
}
export {
  onScrollTopChange
}
