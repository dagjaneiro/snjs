declare type RequestCallback = (response: any) => void;
interface IRequestParams {
    [key: string]: string;
}
export default class HttpManager {
    private static instance?;
    static get(): HttpManager;
    postAbsolute(url: string, params: IRequestParams, onsuccess: RequestCallback, onerror: RequestCallback): void;
    patchAbsolute(url: string, params: IRequestParams, onsuccess: RequestCallback, onerror: RequestCallback): void;
    getAbsolute(url: string, params: IRequestParams, onsuccess: RequestCallback, onerror: RequestCallback): void;
    httpRequest(verb: string, url: string, params: IRequestParams, onsuccess: RequestCallback, onerror: RequestCallback): void;
    formatParams(params: IRequestParams): string;
}
export {};
