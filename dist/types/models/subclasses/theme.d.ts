import { SNComponent } from '../app/component';
export declare class SNTheme extends SNComponent {
    constructor(json_obj: any);
    isLayerable(): any;
    readonly content_type: string;
    readonly displayName: string;
    setMobileRules(rules: any): void;
    getMobileRules(): any;
    hasMobileRules(): any;
    setNotAvailOnMobile(na: any): void;
    getNotAvailOnMobile(): any;
    setMobileActive(active: any): void;
    isMobileActive(): any;
}
