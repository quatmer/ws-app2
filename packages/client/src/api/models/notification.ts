export interface INotification {
  id: string;
  type: 'danger' | 'warning' | 'information';
  title: string;
  description: string;
  duration?: number;
}
