import React from 'react';
import {
  ImageBackgroundProps,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import FastImage, {FastImageProps} from 'react-native-fast-image';

interface OverlayImageStyle extends ViewStyle {
  overlayColor?: string;
}

export interface ImageOverlayProps extends ImageBackgroundProps {
  style?: StyleProp<OverlayImageStyle>;
  children?: React.ReactNode;
}

const DEFAULT_OVERLAY_COLOR = 'rgba(0, 0, 0, 0.45)';

export const ImageOverlay = (
  props?: FastImageProps,
): React.ReactElement<ImageBackgroundProps> => {
  const {style, children, ...imageBackgroundProps} = props;
  const {overlayColor, ...imageBackgroundStyle} = StyleSheet.flatten(style);

  return (
    <FastImage {...props} style={imageBackgroundStyle}>
      <View
        style={[
          StyleSheet.absoluteFill,
          {backgroundColor: overlayColor || DEFAULT_OVERLAY_COLOR},
        ]}
      />
      {children}
    </FastImage>
  );
};
