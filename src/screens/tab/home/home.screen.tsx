import * as React from 'react';
import {
  Dimensions,
  ImageBackground,
  ListRenderItemInfo,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import HomeContext from '../../../contexts/home/context';
import {
  Divider,
  List,
  TopNavigation,
  Text,
  Card,
  Button,
  StyleService,
} from '@ui-kitten/components';
import t from '../../../utils/i18n';
import SliderCard from '../../../components/slider-card';
import {CartIcon} from '../../../components/icons';
import {getImageForRN} from '../../../utils/image-utils';
import {Product} from "../../../models/product";
import {SliderItem} from "../../../models/sliderItem";

export default class HomeScreen extends React.Component {
  renderSliderItem(sliderItem: SliderItem, openPage: Function) {
    return (
      <SliderCard
        onPress={() => openPage(sliderItem.url)}
        style={styles.horizontalItem}
        sliderItem={sliderItem}
      />
    );
  }

  renderProduct(product: Product, openPage: Function) {
    return (
      <Card
        style={styles.productItem}
        header={() => (
          <ImageBackground
            style={styles.itemHeader}
            source={getImageForRN(product.image)}
          />
        )}
        footer={() => (
          <View style={styles.itemFooter}>
            <Text category="s1">{product.price} ₺</Text>
            <Button
              style={styles.iconButton}
              size="small"
              icon={CartIcon}
              onPress={() => openPage(product.url)}
            />
          </View>
        )}
        onPress={() => openPage(product.url)}>
        <Text category="s1">{product.title}</Text>
        <Text appearance="hint" category="c1">
          {product.category}
        </Text>
      </Card>
    );
  }

  render() {
    return (
      <HomeContext.Consumer>
        {state => (
          <React.Fragment>
            <TopNavigation alignment={'center'} title={t('Home')} />
            <Divider />
            <List
              contentContainerStyle={styles.horizontalList}
              horizontal={true}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              data={state.sliderItems}
              renderItem={(itemInfo: ListRenderItemInfo<SliderItem>) =>
                this.renderSliderItem(itemInfo.item, state.actions.openPage)
              }
            />
            <Text style={styles.title} status={'control'} category="h2">
              {t('Kutularımız')}
            </Text>
            <List
              contentContainerStyle={styles.productList}
              data={(state.products.length && state.products) || []}
              numColumns={2}
              renderItem={(itemInfo: ListRenderItemInfo<Product>) =>
                this.renderProduct(itemInfo.item, state.actions.openPage)
              }
            />
          </React.Fragment>
        )}
      </HomeContext.Consumer>
    );
  }
}

const styles = StyleService.create({
  list: {
    paddingVertical: 24,
  },
  headerTitle: {
    marginHorizontal: 16,
  },
  horizontalList: {
    paddingHorizontal: 8,
  },
  verticalItem: {
    marginVertical: 8,
    marginHorizontal: 16,
  },
  horizontalItem: {
    width: 250,
    height: 150,
    marginHorizontal: 8,
  },
  productList: {
    paddingHorizontal: 8,
  },
  productItem: {
    flex: 1,
    margin: 8,
    maxWidth: Dimensions.get('window').width / 2 - 24,
    backgroundColor: 'background-basic-color-1',
  },
  itemHeader: {
    height: 140,
  },
  itemFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconButton: {
    paddingHorizontal: 0,
  },
  title: {
    padding: 15,
    color: '#000',
  },
});
