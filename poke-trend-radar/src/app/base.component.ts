import { CommonModule } from "@angular/common";
import { Component, DestroyRef, inject } from "@angular/core";
import { Subject } from "rxjs";

@Component({
    selector: "app-base",
    standalone: true,
    template: ``,
    imports: [CommonModule]
})
export class BaseComponent {
    private _destroyRef = inject(DestroyRef);
    protected destroyed: Subject<void>;

    constructor() {
        this.destroyed = new Subject<void>();
        this._destroyRef.onDestroy(() => {
            this.destroyed.next();
            this.destroyed.complete();
        });
    }


}