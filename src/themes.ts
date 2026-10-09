import type { GlobalThemeOverrides } from 'naive-ui';

const fontFamily = `-apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', 'Noto Sans SC', 'Helvetica Neue', Arial, sans-serif`;

const fontFamilyMono = `ui-monospace, SFMono-Regular, 'SF Mono', Menlo, Consolas, 'Liberation Mono', 'Microsoft YaHei', monospace`;

const commonOverrides = {
  borderRadius: '8px',
  borderRadiusSmall: '4px',
  fontFamily,
  fontFamilyMono,
};

export const lightThemeOverrides: GlobalThemeOverrides = {
  common: {
    ...commonOverrides,
    primaryColor: '#1D9E75',
    primaryColorHover: '#2FB388',
    primaryColorPressed: '#0F6E56',
    primaryColorSuppl: '#2FB388',
  },

  Layout: {
    color: '#fafafa',
    siderColor: '#ffffff',
    siderBorderColor: '#ececec',
  },

  Card: {
    borderColor: '#ebebeb',
  },

  Menu: {
    itemHeight: '34px',
    borderRadius: '6px',
  },

  AutoComplete: {
    peers: {
      InternalSelectMenu: { height: '500px' },
    },
  },
};

export const darkThemeOverrides: GlobalThemeOverrides = {
  common: {
    ...commonOverrides,
    primaryColor: '#3BC793',
    primaryColorHover: '#55D4A5',
    primaryColorPressed: '#1D9E75',
    primaryColorSuppl: '#55D4A5',
  },

  Notification: {
    color: '#262626',
  },

  AutoComplete: {
    peers: {
      InternalSelectMenu: { height: '500px', color: '#1e1e1e' },
    },
  },

  Menu: {
    itemHeight: '34px',
    borderRadius: '6px',
  },

  Layout: {
    color: '#141414',
    siderColor: '#1a1a1a',
    siderBorderColor: 'transparent',
  },

  Card: {
    color: '#1d1d1d',
    borderColor: '#2a2a2a',
  },

  Table: {
    tdColor: '#1d1d1d',
    thColor: '#2a2a2a',
  },
};
