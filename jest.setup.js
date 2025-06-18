import util from 'util';
import '@testing-library/jest-dom';

global.TextEncoder = class TextEncoder {
  encode(text) {
    const enc = new util.TextEncoder();
    return enc.encode(text);
  }
};

global.TextDecoder = class TextDecoder {
  decode(buffer) {
    const dec = new util.TextDecoder();
    return dec.decode(buffer);
  }
};
global.Request = class Request {
  constructor(url, options = {}) {
    this.url = url;
    this.method = options.method || 'GET';
    this.headers = options.headers || {};
    this.body = options.body || null;
  }
};

global.Response = class Response {
  constructor(body, options = {}) {
    this.body = body;
    this.status = options.status || 200;
    this.statusText = options.statusText || '';
    this.headers = options.headers || {};
    this._bodyInit = body;
  }

  async json() {
    return JSON.parse(this._bodyInit);
  }
};

global.Headers = class Headers {
  constructor(init = {}) {
    this._headers = {};
    Object.entries(init).forEach(([key, value]) => {
      this._headers[key.toLowerCase()] = value;
    });
  }

  get(name) {
    return this._headers[name.toLowerCase()] || null;
  }

  set(name, value) {
    this._headers[name.toLowerCase()] = value;
  }
};
