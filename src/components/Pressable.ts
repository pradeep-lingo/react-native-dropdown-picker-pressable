import { ReactNode } from 'react';
import { Pressable as PressableRaw, StyleProp, ViewStyle } from 'react-native';
import DeviceInfo from 'react-native-device-info';
export interface PressableProps {
  children: ReactNode;
  onPress: () => void;
  hitSlop?: number;
  style?: StyleProp<ViewStyle>;
  testID?: string;
  accessibilityLabel?: string;
  disabled?: boolean;
  accessible?: boolean;
}

export const Pressable = (props: PressableProps) => {
  const {
    style = {},
    onPress,
    hitSlop = 25,
    children,
    accessibilityLabel,
    testID,
    disabled,
    accessible = false,
  } = props;

  /**
   * The onPress/onPressOut condition is a workaround for an iPhone XS bug where the onPress event only fires once and subsequent events do not register.
   * A few things to note:
   * - Possible that this is a bug with the simulator itself (don't have a real device to test)
   * - Only happens on iPhone XS (not iPhone XR)
   * - Noticed this occuring in react-native v0.72.6
   */
  const isIphoneXs =
    DeviceInfo.getModel() === 'iPhone XS' || DeviceInfo.getModel() === 'iPhone XS Max';

  return (
    <PressableRaw
      onPress={isIphoneXs ? undefined : onPress}
      onPressOut={isIphoneXs ? onPress : undefined}
      hitSlop={hitSlop}
      style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1 }, style]}
      accessibilityLabel={accessibilityLabel}
      testID={testID}
      accessible={accessible}
      disabled={disabled}
    >
      {children}
    </PressableRaw>
  );
};