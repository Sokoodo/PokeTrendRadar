
export enum PageRouteEnum {
    DEFAULT = "home",
    SINGLES = "singles",
    SEALED = "sealed",
    MY_CARDS = "my-cards",
    PRODUCT_DETAIL = "product-details/:id_url",
    PROFILE_SECTION = "profile"
}

export interface CustomNotification {
    id: number;
    title: string;
    message: string;
    timestamp: Date;
    route?: string; 
}