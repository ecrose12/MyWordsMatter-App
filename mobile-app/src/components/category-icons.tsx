// The nine category icons, copied line for line from mywordsmatter.app.
// Each one is drawn on a 64 x 64 grid and shown at 40 x 40.

import Svg, { Circle, G, Line, Path, Rect } from 'react-native-svg';

export type CategoryIconName =
  | 'single-pec-selector'
  | 'sentence-creator'
  | 'emergency-cards'
  | 'todays-schedule'
  | 'daily-schedule'
  | 'chore-list'
  | 'weekly-chore-list'
  | 'first-then'
  | 'consequence-reward';

type Props = {
  name: CategoryIconName;
  color: string;
  size?: number;
};

export function CategoryIcon({ name, color, size = 40 }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 64 64" accessible={false}>
      <G
        fill="none"
        stroke={color}
        strokeWidth={4}
        strokeLinecap="round"
        strokeLinejoin="round">
        {drawings(name, color)}
      </G>
    </Svg>
  );
}

function drawings(name: CategoryIconName, color: string) {
  switch (name) {
    case 'single-pec-selector':
      return (
        <>
          <Rect x="12" y="12" width="40" height="40" rx="6" />
          <Line x1="32" y1="24" x2="32" y2="40" />
          <Line x1="24" y1="32" x2="40" y2="32" />
        </>
      );
    case 'sentence-creator':
      return (
        <>
          <Rect x="6" y="22" width="14" height="14" rx="3" />
          <Rect x="25" y="22" width="14" height="14" rx="3" />
          <Rect x="44" y="22" width="14" height="14" rx="3" />
          <Line x1="20" y1="29" x2="25" y2="29" />
          <Line x1="39" y1="29" x2="44" y2="29" />
        </>
      );
    case 'emergency-cards':
      return (
        <>
          <Path d="M32 8 L58 54 L6 54 Z" />
          <Line x1="32" y1="24" x2="32" y2="38" />
          <Circle cx="32" cy="46" r="1.5" fill={color} stroke="none" />
        </>
      );
    case 'todays-schedule':
      return (
        <>
          <Circle cx="32" cy="32" r="22" />
          <Line x1="32" y1="32" x2="32" y2="19" />
          <Line x1="32" y1="32" x2="42" y2="36" />
        </>
      );
    case 'daily-schedule':
      return (
        <>
          <Rect x="8" y="8" width="48" height="48" rx="6" />
          <Rect x="16" y="18" width="7" height="7" rx="1.5" />
          <Line x1="27" y1="21.5" x2="48" y2="21.5" />
          <Path d="M16.5 33 L19 35.5 L23.5 30" />
          <Line x1="27" y1="33" x2="48" y2="33" />
          <Rect x="16" y="42" width="7" height="7" rx="1.5" />
          <Line x1="27" y1="45.5" x2="48" y2="45.5" />
        </>
      );
    case 'chore-list':
      return (
        <>
          <Rect x="12" y="10" width="40" height="46" rx="5" />
          <Rect x="24" y="6" width="16" height="8" rx="2" />
          <Line x1="20" y1="26" x2="44" y2="26" />
          <Line x1="20" y1="36" x2="44" y2="36" />
          <Line x1="20" y1="46" x2="38" y2="46" />
        </>
      );
    case 'weekly-chore-list':
      return (
        <>
          <Rect x="8" y="12" width="48" height="42" rx="5" />
          <Line x1="8" y1="24" x2="56" y2="24" />
          <Line x1="21" y1="12" x2="21" y2="54" />
          <Line x1="34" y1="12" x2="34" y2="54" />
          <Line x1="47" y1="12" x2="47" y2="54" />
          <Line x1="18" y1="6" x2="18" y2="16" />
          <Line x1="46" y1="6" x2="46" y2="16" />
        </>
      );
    case 'first-then':
      return (
        <>
          <Rect x="6" y="20" width="20" height="20" rx="4" />
          <Rect x="38" y="20" width="20" height="20" rx="4" />
          <Line x1="28" y1="30" x2="36" y2="30" />
          <Path d="M33 26 L38 30 L33 34" />
        </>
      );
    case 'consequence-reward':
      return (
        <>
          <Rect x="6" y="20" width="20" height="20" rx="4" />
          <Rect x="38" y="20" width="20" height="20" rx="4" />
          <Line x1="28" y1="30" x2="36" y2="30" />
          <Path d="M33 26 L38 30 L33 34" />
          <Path d="M48 25 L49.4 28.2 L53 28.6 L50.3 31 L51.1 34.6 L48 32.8 L44.9 34.6 L45.7 31 L43 28.6 L46.6 28.2 Z" />
        </>
      );
  }
}
