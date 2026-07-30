import { createElement, type ElementType } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { LoadingFilled, Loading2Filled, Loading4Filled } from '@mingcute/react-native/core-filled';
import { LoadingRegular, Loading2Regular, Loading4Regular } from '@mingcute/react-native/core-regular';
import type { IconProps } from '@mingcute/react-native';

const fixtures: readonly [label: string, icon: ElementType<IconProps>][] = [
  ['regular/loading', LoadingRegular],
  ['regular/loading-2', Loading2Regular],
  ['regular/loading-4', Loading4Regular],
  ['filled/loading', LoadingFilled],
  ['filled/loading-2', Loading2Filled],
  ['filled/loading-4', Loading4Filled],
];

export function AngularGradientFixture() {
  return createElement(
    ScrollView,
    { contentContainerStyle: styles.page },
    createElement(Text, { style: styles.heading }, 'Mingcute angular gradients - 6 native renders'),
    ...fixtures.map(([label, Component]) =>
      createElement(
        View,
        { key: label, style: styles.card },
        createElement(Text, { style: styles.label }, label),
        createElement(
          View,
          { style: styles.samples },
          createElement(
            View,
            { style: styles.lightSample },
            createElement(Component, { size: 48, color: '#10161f' }),
          ),
          createElement(
            View,
            { style: styles.darkSample },
            createElement(Component, { size: 128, color: '#60a5fa' }),
          ),
        ),
      ),
    ),
  );
}

export const angularGradientFixtureCount = fixtures.length;

const styles = StyleSheet.create({
  page: { padding: 20, gap: 12, backgroundColor: '#eef2f6' },
  heading: { color: '#10161f', fontSize: 22, fontWeight: '700' },
  card: { padding: 12, gap: 8, borderRadius: 8, backgroundColor: '#ffffff' },
  label: { color: '#10161f', fontSize: 13, fontWeight: '600' },
  samples: { flexDirection: 'row', alignItems: 'center', gap: 16 },
  lightSample: {
    width: 80,
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  },
  darkSample: {
    width: 160,
    height: 160,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0f172a',
  },
});
