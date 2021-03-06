export type Picture = {
    id?: number;
    mimeType: string;
    binaryContent: string | ArrayBuffer;
    name: string;
}