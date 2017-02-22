module App.Models {
    export class Image {
        id: number;
        name: string;
        subText: string;
        url: string;
        photos: Array<Image>;
    }
}
