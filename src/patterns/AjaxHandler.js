import Interface from './Interface';

const AjaxHandler = new Interface('Ajaxhandler', ['request', 'createXhrObject']);
//implements AjaxHandler
class SimpleHandler {
  request({method = 'get', url, callback = {}, postVars = null}) {
    const xhr = this.createXhrObject();
    xhr.onreadystatechange = () => {
      if (xhr.readyState !== 4) return;
      xhr.status === 200 ?
      callback.success(xhr.responseText, xhr.responseXML) :
      callback.fail(xhr.status);
    }
    xhr.open(method, url, true);
    xhr.send(postVars);
  }
  createXhrObject() {
    const methods = [
      () => new XMLHttpRequest(),
      () => new ActiveXObject('msxml2.XMLHTTP'),
      () => new ActiveXObject('Microsoft.XMLHTTP')
    ];
    for (let fn of methods) {
      try {
        fn();
      } catch(e) {
        continue;
      }
      this.createXhrObject = fn;
      return fn();
    }
    throw new Error('SimpleHandler: could not create an XHR object');
  }
}

class QueueHandler extend SimpleHandler{
  constructor(retryDelay = 5) {
    super();
    this.queue = [];
    this.requestInProgress = false;
    this.retryDelay = retryDelay;
  }
  request({method = 'GET', url, callback, postVars = null, override} = {}) {
    if (this.requestInProgress && !override) {
      this.queue.push({method, url, callback, postVars});
    } else {
      this.requestInProgress = true;
      const xhr = this.createXhrObject();
      xhr.onreadystatechange = () => {
        if (xhr.readyState !== 4) return;
        if (xhr.status === 200) {
          callback.success(xhr.responseText, xhr.responseXML);
          this.advanceQueue();
        } else {
          callback.fail(xhr.status);
          const timer = setTimeout(() => {
            this.request({method, url, callback, postVars, override: true});
              clearTimeout(timer);
          }, this.retryDelay * 1000);
        }
      }
      xhr.open(method, url, true);
      xhr.send(postVars);
    }
  }
  advanceQueue() {
    if (this.queue.length === 0) {
      this.requestInProgress = false;
      return;
    }
    const req = this.queue.shift();
    req.override = true;
    this.request(req);
  }


}






export {SimpleHandler};
