type RequestCallback = (response: any) => void;

interface IRequestParams {
  [key: string]: string;
}

export default class HttpManager {
  /* Singleton */
  private static instance?: HttpManager;

  static get() {
    if (!this.instance) {
      this.instance = new HttpManager();
    }
    return this.instance;
  }

  postAbsolute(
    url: string,
    params: IRequestParams,
    onsuccess: RequestCallback,
    onerror: RequestCallback
  ) {
    this.httpRequest('post', url, params, onsuccess, onerror);
  }

  patchAbsolute(
    url: string,
    params: IRequestParams,
    onsuccess: RequestCallback,
    onerror: RequestCallback
  ) {
    this.httpRequest('patch', url, params, onsuccess, onerror);
  }

  getAbsolute(
    url: string,
    params: IRequestParams,
    onsuccess: RequestCallback,
    onerror: RequestCallback
  ) {
    this.httpRequest('get', url, params, onsuccess, onerror);
  }

  httpRequest(
    verb: string,
    url: string,
    params: IRequestParams,
    onsuccess: RequestCallback,
    onerror: RequestCallback
  ) {
    const xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = () => {
      if (xmlhttp.readyState === 4) {
        let response = xmlhttp.responseText;
        if (response) {
          try {
            response = JSON.parse(response);
          } catch (e) {
            // Not JSON
          }
        }

        if (xmlhttp.status >= 200 && xmlhttp.status <= 299) {
          onsuccess(response);
        } else {
          console.error('Request error:', response);
          onerror(response);
        }
      }
    };

    if (verb === 'get' && Object.keys(params).length > 0) {
      url = url + this.formatParams(params);
    }

    xmlhttp.open(verb, url, true);
    xmlhttp.setRequestHeader('Content-type', 'application/json');

    if (verb === 'post' || verb === 'patch') {
      xmlhttp.send(JSON.stringify(params));
    } else {
      xmlhttp.send();
    }
  }

  formatParams(params: IRequestParams) {
    return (
      '?' +
      Object.keys(params)
        .map(key => {
          return key + '=' + encodeURIComponent(params[key]);
        })
        .join('&')
    );
  }
}
