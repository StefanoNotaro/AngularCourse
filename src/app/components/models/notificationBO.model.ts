export class NotificationBO {
    confirmation: boolean;

    icon: string;
    title: string;
    showConfirmButton: boolean;
    showCancelButton: boolean;

    object: any;

    constructor(icon?: string, title?: string, showConfirmationButton?: boolean, showCancelButton?: boolean, object?: any) {
        this.icon = icon ? icon : 'error';
        this.title = title ? title : 'Sin titulo';
        this.showConfirmButton = showConfirmationButton ? showConfirmationButton : true;
        this.showCancelButton = showCancelButton ? showCancelButton : false;

        this.object = object;
    }
}
