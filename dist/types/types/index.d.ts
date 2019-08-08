export declare enum ExtensionContentTypes {
    Component = "SN|Component",
    Theme = "SN|Theme",
    SFExtension = "SF|Extension",
    Extension = "Extension"
}
export interface IDisposable {
    isDisposed: boolean;
    dispose(): void;
}
export declare type Callback<T extends any[] = []> = (...args: T) => void;
