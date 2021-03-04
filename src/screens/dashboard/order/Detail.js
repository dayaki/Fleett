import React from 'react';
import { View } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { RegularText, TitleText } from '../../../common';
import { DeliverySwitch } from '../../../../assets/svgs';
import { detailStyles as dstyles, styles } from './styles';

const OrderDetail = () => {
  return (
    <View style={styles.container}>
      <MapView
        style={dstyles.map}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      />
      <View style={dstyles.content}>
        <View style={styles.order}>
          <View style={styles.doubleView}>
            <View style={styles.orderSection}>
              <TitleText title="Pick up" style={styles.doubleViewTitle} />
              <RegularText
                title="14 Kogberegbe street, Ikorodu, Lagos"
                style={styles.doubleViewText}
              />
            </View>
            <DeliverySwitch style={{ marginTop: 13 }} />
            <View style={styles.orderSection}>
              <TitleText title="Delivery" style={styles.doubleViewTitle} />
              <RegularText
                title="4 Adebayo cresent, Ijora, Lagos"
                style={styles.doubleViewText}
              />
            </View>
          </View>
          <View style={styles.divider} />
          <View style={styles.doubleView}>
            <View style={styles.orderSection}>
              <TitleText title="Receiver" style={styles.doubleViewTitle} />
              <RegularText
                title="Mary Akinlapa"
                style={styles.doubleViewText}
              />
              <RegularText title="08038327370" style={styles.doubleViewText} />
            </View>
          </View>
          <View style={styles.divider} />
          <View style={styles.doubleView}>
            <View style={styles.orderSection}>
              <TitleText title="Rider details" style={styles.doubleViewTitle} />
              <View>
                <View>
                  <RegularText
                    title="Noah Peters E"
                    style={styles.doubleViewText}
                  />
                  <RegularText
                    title="AKD 001 GF"
                    style={styles.doubleViewText}
                  />
                </View>
                <View>
                  <RegularText
                    title="07038327370"
                    style={styles.doubleViewText}
                  />
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default OrderDetail;
