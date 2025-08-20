// mobile/components/CardStack.tsx
import React, { useState } from 'react';
import { View, Animated, PanResponder, StyleSheet } from 'react-native';

export default function CardStack({ data, onLike, onPass }) {
  const position = new Animated.ValueXY();

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (evt, gesture) => {
      position.setValue({ x: gesture.dx, y: gesture.dy });
    },
    onPanResponderRelease: (evt, gesture) => {
      if (gesture.dx > 120) {
        Animated.spring(position, { toValue: { x: 500, y: 0 } }).start(() => onLike());
      } else if (gesture.dx < -120) {
        Animated.spring(position, { toValue: { x: -500, y: 0 } }).start(() => onPass());
      } else {
        Animated.spring(position, { toValue: { x: 0, y: 0 }, friction: 5 }).start();
      }
    },
  });

  const rotate = position.x.interpolate({
    inputRange: [-200, 0, 200],
    outputRange: ['-30deg', '0deg', '30deg'],
  });

  return (
    <View style={styles.container}>
      {data.map((item, i) => {
        if (i < data.length - 3) return null;
        return (
          <Animated.View
            key={item.id}
            style={[
              styles.card,
              { transform: [...position.getTranslateTransform(), { rotate }] },
            ]}
            {...panResponder.panHandlers}
          >
            <Image source={{ uri: item.photos[0] }} style={styles.image} />
            <Text style={styles.name}>{item.name}, {item.age}</Text>
          </Animated.View>
        );
      })}
    </View>
  );
}