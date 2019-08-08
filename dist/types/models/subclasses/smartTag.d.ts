import { SNTag } from '../app/tag';
export declare class SNSmartTag extends SNTag {
    static SystemSmartTagIdAllNotes: string;
    static SystemSmartTagIdArchivedNotes: string;
    static SystemSmartTagIdTrashedNotes: string;
    constructor(json_ob: any);
    static systemSmartTags(): SNSmartTag[];
}
