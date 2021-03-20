import React, { useRef } from 'react';
import {
  StatusBar,
  View,
  Image,
  SafeAreaView,
  Text,
  Animated,
  Dimensions,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { HeaderText, Button } from '../../common';
import { styles } from './styles';

const { width } = Dimensions.get('window');

const slides = [
  {
    title: 'Top Rated Riders',
    text:
      'We always send our highest-rated Riders that’s close to you, ensuring a five star dispatch servce.',
  },
  {
    title: 'Easy Tracking',
    text:
      'Tracking as never been so Easy! Call, text & track your delivery rider with our user friendly interface.',
  },
  {
    title: 'Your Dispatch Service',
    text:
      'Pack and Ship anything, anywhere from the convenience of your home or office.',
  },
];

const Pagination = ({ scrollX }) => {
  return (
    <View style={styles.pagination}>
      <View style={styles.paginations}>
        {slides.map((_, index) => {
          const inputRange = [
            (index - 1) * width,
            index * width,
            (index + 1) * width,
          ];
          const scale = scrollX.interpolate({
            inputRange,
            outputRange: [1, 1.4, 1],
            extrapolate: 'clamp',
          });
          return (
            <Animated.View
              style={[styles.paginationDot, { transform: [{ scaleX: scale }] }]}
              key={index}
            />
          );
        })}
      </View>
    </View>
  );
};

const Onboarding = () => {
  const scrollX = useRef(new Animated.Value(0)).current;
  return (
    <>
      <StatusBar
        backgroundColor="white"
        barStyle="dark-content"
        animated={true}
      />
      <SafeAreaView style={styles.safeView}>
        <View style={styles.container}>
          <Image
            source={require('../../../assets/images/logo.png')}
            style={styles.logo}
          />
          <Pagination scrollX={scrollX} />
          <Animated.ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            bounces
            pagingEnabled
            scrollEventThrottle={16}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { x: scrollX } } }],
              { useNativeDriver: true },
            )}>
            {slides.map((slide, index) => (
              <View style={styles.texts} key={index}>
                {/* <View style={styles.paginations}>
                <View style={[styles.paginationDot, styles.current]} />
                <View style={styles.paginationDot} />
                <View style={styles.paginationDot} />
              </View> */}
                <HeaderText title={slide.title} style={styles.sliderHeader} />
                <Text style={styles.sliderText}>{slide.text}</Text>
                <Button
                  title="Get Started"
                  style={{ marginTop: 64 }}
                  onPress={() => Actions.sign_in()}
                />
                <View style={styles.sliderFooter}>
                  <Text style={styles.sliderFooterText}>
                    Are you a dispatch rider?
                  </Text>
                  <Text style={styles.sliderFooterButton}>Sign In</Text>
                </View>
              </View>
            ))}
          </Animated.ScrollView>
        </View>
      </SafeAreaView>
    </>
  );
};

export default Onboarding;
