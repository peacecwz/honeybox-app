import * as React from 'react';
import {Text, Card} from '@ui-kitten/components';
import {StyleSheet} from 'react-native';
import {ImageOverlay} from './image-overlay';
import {getImage} from '../utils/image-utils';
import {SliderItem} from '../contexts/home/state';

export interface Props {
  sliderItem: SliderItem;
  style: any;
  onPress: any;
}

export default class SliderCard extends React.Component<Props> {
  render() {
    const {sliderItem, style, onPress} = this.props;
    return (
      <Card onPress={onPress} {...this.props} style={[styles.container, style]}>
        <ImageOverlay style={styles.image} source={getImage(sliderItem.image)}>
          <Text style={styles.title} category="h2" status="control">
            {sliderItem.title}
          </Text>
          <Text style={styles.level} category="s1" status="control">
            {sliderItem.description}
          </Text>
        </ImageOverlay>
      </Card>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 150,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    height: 200,
    paddingVertical: 24,
    paddingHorizontal: 16,
  },
  level: {
    zIndex: 1,
  },
  title: {
    zIndex: 1,
  },
  durationButton: {
    position: 'absolute',
    left: 16,
    bottom: 16,
    borderRadius: 16,
    paddingHorizontal: 0,
  },
});
