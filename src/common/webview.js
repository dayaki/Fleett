import React, { useRef } from 'react';
import {
  SafeAreaView,
  View,
  ActivityIndicator,
  StyleSheet,
  StatusBar,
} from 'react-native';
import { WebView } from 'react-native-webview';
import { Actions } from 'react-native-router-flux';
import { RegularText } from './Text';
import { hp, wp } from './utils';

const Web = ({ params }) => {
  const webview = useRef();

  const onNavigationStateChange = (event) => {
    const { url } = event;
    console.log('webview url', url);

    // successful payment
    if (url.includes('payment-status')) {
      Actions.transaction_status({
        type: 'reset',
        status: 'success',
        title: 'Hank Purchase Successful',
        message:
          'You have successfully placed an order for hank. Your hank will be delivered within 14 working days',
        isOrder: true,
      });
    }

    // failed payment
    // if (url.includes('payment-status=error')) {
    //   Actions.transaction_status({
    //     type: 'reset',
    //     title: 'Payment Failed',
    //     message:
    //       'Your order was not processed because your payment was not successful. Please ensure that your information was entered correctly and try again.',
    //     isOrder: true,
    //     retry: () => {
    //       Actions.webview({ params: props.params });
    //     },
    //   });
    // }

    if (url.includes('cancelled')) {
      Actions.pop();
    }
  };
  const LoadingView = () => (
    <View style={styles.loadingView}>
      <ActivityIndicator size="small" color="#000" />
      <RegularText title="Loading..." style={styles.loadingText} />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      <WebView
        source={params}
        ref={webview}
        startInLoadingState
        scalesPageToFit
        javaScriptEnabled
        domStorageEnabled
        onNavigationStateChange={onNavigationStateChange}
        mixedContentMode="always"
        thirdPartyCookiesEnabled
        renderLoading={LoadingView}
      />
    </SafeAreaView>
  );
};

export default Web;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingView: {
    alignItems: 'center',
    flex: 1,
  },
  loadingText: {
    marginTop: hp(10),
    fontSize: 20,
  },
  activityIndicator: {
    alignSelf: 'center',
    width: wp(100),
    height: hp(150),
  },
});
