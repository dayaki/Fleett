import React from 'react';
import { StyleSheet } from 'react-native';
import { RegularText, BackView, hp, ScarpaFlow } from '../../common';

const About = ({ navigation }) => {
  return (
    <BackView isScroll title="About us" backAction={() => navigation.goBack()}>
      <RegularText
        title="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
        style={styles.text}
      />
      <RegularText
        title="It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
        style={styles.text}
      />
      <RegularText
        title="It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English."
        style={styles.text}
      />
      <RegularText
        title="Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)."
        style={styles.text}
      />
      <RegularText
        title="There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text."
        style={styles.text}
      />
    </BackView>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: hp(16),
    color: ScarpaFlow,
    marginBottom: hp(15),
    fontWeight: 'normal',
  },
});

export default About;
