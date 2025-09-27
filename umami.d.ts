import { UmamiAPI } from '@/analytics/Umami/types';

declare global {
  interface Window {
    umami?: UmamiAPI;
  }
}
