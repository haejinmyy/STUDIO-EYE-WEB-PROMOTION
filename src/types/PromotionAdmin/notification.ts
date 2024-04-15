export interface INotification {
  notification: notification;
  isRead: boolean;
}

export type notification = {
  id: number;
  requestId: number;
};
