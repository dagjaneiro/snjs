// This should be global to the application
export enum ExtensionContentTypes {
  Component = 'SN|Component',
  Theme = 'SN|Theme',
  SFExtension = 'SF|Extension',
  Extension = 'Extension'
}

export interface IDisposable {
  isDisposed: boolean;
  dispose(): void;
}

export type Callback<T extends any[] = []> = (...args: T) => void;
