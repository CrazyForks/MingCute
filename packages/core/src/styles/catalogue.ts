export const iconStyles = ['core-regular', 'core-filled'] as const;

export type IconStyle = (typeof iconStyles)[number];
