import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface CustomNotification {
    title: string;
    message: string;
    timestamp: Date;
    route?: string;
}
@Injectable({
    providedIn: 'root'
})
export class NotificationService {
    private _notifications = new BehaviorSubject<CustomNotification[]>([]);

    notifications$ = this._notifications.asObservable();

    addNotification(notification: CustomNotification) {
        const current = this._notifications.value;
        const updated = [notification, ...current];
        this._notifications.next(updated.slice(0, 70)); // To keep last 70
    }

    getRecentNotifications(limit: number = 4): CustomNotification[] {
        return this._notifications.value.slice(0, limit);
    }

    getAllNotifications(): CustomNotification[] {
        return this._notifications.value;
    }
}
