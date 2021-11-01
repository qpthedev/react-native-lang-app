import React, { useRef, useState } from "react";
import { Animated, Dimensions, PanResponder, Pressable } from "react-native";
import styled from "styled-components/native";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Box = styled.View`
  background-color: tomato;
  width: 200px;
  height: 200px;
`;

const AnimatedBox = Animated.createAnimatedComponent(Box);

export default function App() {
  const POSITION = useRef(
    new Animated.ValueXY({
      x: 0,
      y: 0,
    })
  ).current;

  const borderRadius = POSITION.y.interpolate({
    inputRange: [-200, 200],
    outputRange: [100, 0],
  });

  const rotation = POSITION.y.interpolate({
    inputRange: [-200, 200],
    outputRange: ["-360deg", "360deg"],
  });

  const bgColor = POSITION.y.interpolate({
    inputRange: [-200, 200],
    outputRange: ["rgb(255, 99, 71)", "rgb(71, 166, 255)"],
  });

  const panResponder = useRef(
    PanResponder.create({
      // start listening on touch
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        POSITION.setOffset({
          x: POSITION.x._value,
          y: POSITION.y._value,
        });
      },
      onPanResponderMove: (_, { dx, dy }) => {
        POSITION.setValue({
          x: dx,
          y: dy,
        });
      },
      onPanResponderRelease: () => {
        POSITION.flattenOffset();
      },
    })
  ).current;

  return (
    <Container>
      <AnimatedBox
        {...panResponder.panHandlers}
        style={{
          backgroundColor: bgColor,
          borderRadius,
          transform: POSITION.getTranslateTransform(),
        }}
      />
    </Container>
  );
}
