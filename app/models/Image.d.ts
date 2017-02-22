declare module App.Models {
    class Image {
        id: number;
        name: string;
        subText: string;
        url: string;
        photos: Array<Image>;
    }
}
