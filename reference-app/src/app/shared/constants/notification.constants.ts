export type ToastrType = 'success' | 'info' | 'error' | 'warn'

export interface FullNotificationConfig {
  type?: ToastrType
  message: string
  duration?: number
}

export type NotificationConfig = string | FullNotificationConfig
