import { BrowserType, getBrowser } from '../../utils/browsers';
import { PlatformType, getPlatform } from '../../utils/platforms';

export const getBrowserSrc = async (): Promise<string> => {
  const browser = getBrowser();
  switch (browser) {
    case BrowserType.Arc:
      return (await import('../Icons/Arc.svg')).default;
    case BrowserType.Brave:
      return (await import('../Icons/Brave.svg')).default;
    case BrowserType.Chrome:
      return (await import('../Icons/Chrome.svg')).default;
    case BrowserType.Edge:
      return (await import('../Icons/Edge.svg')).default;
    case BrowserType.Firefox:
      return (await import('../Icons/Firefox.svg')).default;
    case BrowserType.Opera:
      return (await import('../Icons/Opera.svg')).default;
    case BrowserType.Safari:
      return (await import('../Icons/Safari.svg')).default;
    default:
      return (await import('../Icons/Browser.svg')).default;
  }
};

export const getPlatformSrc = async (): Promise<string> => {
  const platform = getPlatform();
  switch (platform) {
    case PlatformType.Windows:
      return (await import('../Icons/Windows.svg')).default;
    case PlatformType.MacOS:
      return (await import('../Icons/Macos.svg')).default;
    case PlatformType.Linux:
      return (await import('../Icons/Linux.svg')).default;
    default:
      return (await import('../Icons/Linux.svg')).default;
  }
};

export const stepIcons = {
  connect: () => 'ConnectIcon',
  create: () => 'CreateIcon',
  install: (wallet: any) => ({
    component: 'AsyncImage',
    props: {
      background: wallet.iconBackground,
      borderColor: 'generalBorder',
      borderRadius: '10',
      height: '48',
      src: wallet.iconUrl,
      width: '48',
    },
  }),
  refresh: () => 'RefreshIcon',
  scan: () => 'ScanIcon',
}; 