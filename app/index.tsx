import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import React, { useMemo, useState } from 'react';
import { FlatList, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';

import { WorkoutCard } from '@/components/workout-card';

export type Workout = {
  id: number;
  title: string;
  category: string;
  duration: string;
  calories: string;
  description: string;
  steps: string[];
  image: { uri: string };
};

const makeArtwork = (base: string, accent: string, label: string) => ({
  uri:
    'data:image/svg+xml;utf8,' +
    encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" width="900" height="500" viewBox="0 0 900 500">
        <rect width="900" height="500" rx="34" fill="${base}"/>
        <rect x="70" y="110" width="760" height="250" rx="26" fill="${accent}" opacity="0.36"/>
        <rect x="180" y="155" width="180" height="140" rx="18" fill="rgba(255,255,255,0.18)"/>
        <rect x="400" y="155" width="260" height="26" rx="13" fill="rgba(255,255,255,0.28)"/>
        <rect x="400" y="210" width="220" height="18" rx="9" fill="rgba(255,255,255,0.22)"/>
        <rect x="400" y="245" width="180" height="18" rx="9" fill="rgba(255,255,255,0.18)"/>
        <circle cx="760" cy="150" r="62" fill="rgba(255,255,255,0.18)"/>
        <text x="90" y="420" fill="rgba(40,30,35,0.7)" font-family="Arial, sans-serif" font-size="42" font-weight="700">${label}</text>
      </svg>
    `),
});

const workoutBackgroundIllustration = require('@/assets/images/image.png');

const workoutData: Workout[] = [
  {
    id: 1,
    title: 'Power Yoga',
    category: 'Yoga',
    duration: '25 min',
    calories: '180 kcal',
    description:
      'A full-body flow focused on strength, flexibility, and balance with controlled breathing.',
    steps: [
      'Warm up the shoulders and hips before each pose.',
      'Hold each pose for controlled breathing cycles.',
      'Finish with a calm cooldown and stretching sequence.',
    ],
    image: makeArtwork('#f6dfe5', '#f9c7d1', 'Yoga'),
  },
  {
    id: 2,
    title: 'HIIT Burn',
    category: 'Cardio',
    duration: '30 min',
    calories: '260 kcal',
    description:
      'An intense interval workout that keeps your heart rate high while improving endurance.',
    steps: [
      'Alternate 30 seconds of effort and 15 seconds of rest.',
      'Keep your form tight during explosive moves.',
      'Hydrate and recover between rounds.',
    ],
    image: makeArtwork('#fbe7d7', '#f7c3b1', 'HIIT'),
  },
  {
    id: 3,
    title: 'Core Blast',
    category: 'Strength',
    duration: '20 min',
    calories: '210 kcal',
    description:
      'A focused core routine for abs, obliques, and lower back stability.',
    steps: [
      'Keep your spine neutral throughout each rep.',
      'Move in controlled tempo to activate the core.',
      'Pause briefly at the top for maximum tension.',
    ],
    image: makeArtwork('#f5e1ef', '#d6c4ef', 'Core'),
  },
  {
    id: 4,
    title: 'Upper Body',
    category: 'Gym',
    duration: '35 min',
    calories: '300 kcal',
    description:
      'Build strength in your chest, shoulders, and arms with a balanced routine.',
    steps: [
      'Warm up your shoulders before pushing movements.',
      'Use a full range of motion for each press.',
      'Complete slow controlled reps on the final set.',
    ],
    image: makeArtwork('#fbe0de', '#f2b0a6', 'Upper'),
  },
  {
    id: 5,
    title: 'Leg Day',
    category: 'Gym',
    duration: '40 min',
    calories: '340 kcal',
    description:
      'A leg-focused session designed to build power, endurance, and muscular strength.',
    steps: [
      'Drive through the floor on each squat or press.',
      'Keep knees tracking over toes for safe movement.',
      'Use a steady breathing rhythm during each set.',
    ],
    image: makeArtwork('#e4efe3', '#b9d7ae', 'Legs'),
  },
  {
    id: 6,
    title: 'Stretch Flow',
    category: 'Recovery',
    duration: '18 min',
    calories: '120 kcal',
    description:
      'A gentle routine to release tension, improve flexibility, and reset your body.',
    steps: [
      'Start with slow mobility work for the lower body.',
      'Hold each stretch at a comfortable breathing pace.',
      'Take a few moments to ease into full relaxation.',
    ],
    image: makeArtwork('#e9dfe8', '#c7b5d9', 'Flow'),
  },
];

export default function WorkoutListScreen() {
  const router = useRouter();
  const [favorites, setFavorites] = useState<Record<number, boolean>>({});

  const favoriteCount = useMemo(
    () => Object.values(favorites).filter(Boolean).length,
    [favorites],
  );

  const toggleFavorite = (id: number) => {
    setFavorites((previous) => ({
      ...previous,
      [id]: !previous[id],
    }));
  };

  const openWorkout = (workout: Workout) => {
    const workoutParam = encodeURIComponent(JSON.stringify(workout));

    router.push({
      pathname: '/workout-details',
      params: { workout: workoutParam },
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.backgroundLayer} pointerEvents="none">
        <Image
          source={workoutBackgroundIllustration}
          style={styles.backgroundIllustration}
          contentFit="cover"
        />
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.container}>
        <View style={styles.headerCard}>
          <View style={styles.textWrap}>
            <Text style={styles.dateText}>Today, 8 Jul</Text>
            <Text style={styles.kcalText}>1 883 Kcal</Text>
            <Text style={styles.trackText}>Track your activity</Text>
          </View>

          <View style={styles.heroVisual}>
            <View style={styles.heroImageWrap}>
              <Image
                source={require('@/assets/images/Scroll-1.jpg')}
                style={styles.heroImage}
                contentFit="cover"
              />
            </View>
          </View>
        </View>

        <View style={styles.summaryRow}>
          <Text style={styles.summaryItem}>5</Text>
          <Text style={styles.summaryItem}>6</Text>
          <Text style={styles.summaryItemActive}>7</Text>
          <Text style={styles.summaryItem}>8</Text>
          <Text style={styles.summaryItem}>9</Text>
          <Text style={styles.summaryItem}>10</Text>
          <Text style={styles.summaryItem}>11</Text>
        </View>

        <View style={styles.sectionHead}>
          <Text style={styles.sectionTitle}>Workout list</Text>
          <Text style={styles.sectionBadge}>{favoriteCount} favorites</Text>
        </View>

        <FlatList
          data={workoutData}
          scrollEnabled={false}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <WorkoutCard
              imageSource={item.image}
              title={item.title}
              duration={item.duration}
              calories={item.calories}
              isFavorite={!!favorites[item.id]}
              onToggleFavorite={() => toggleFavorite(item.id)}
              onPress={() => openWorkout(item)}
            />
          )}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f7e9ec',
    position: 'relative',
  },
  scrollView: {
    flex: 1,
  },
  backgroundLayer: {
    position: 'absolute',
    inset: 0,
    opacity: 0.42,
    zIndex: 0,
  },
  backgroundIllustration: {
    width: '100%',
    height: '100%',
  },
  container: {
    paddingHorizontal: 18,
    paddingBottom: 30,
    zIndex: 1,
  },
  headerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f0a5b3',
    borderRadius: 32,
    paddingHorizontal: 18,
    paddingVertical: 18,
    marginTop: 12,
    minHeight: 180,
    overflow: 'hidden',
  },
  textWrap: {
    flex: 1,
    paddingRight: 10,
    zIndex: 1,
  },
  dateText: {
    color: '#fff3f5',
    fontSize: 18,
    marginBottom: 8,
  },
  kcalText: {
    color: '#ffffff',
    fontSize: 42,
    fontWeight: '800',
    lineHeight: 48,
  },
  trackText: {
    marginTop: 10,
    alignSelf: 'flex-start',
    fontSize: 14,
    color: '#fff3f5',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.7)',
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 8,
    overflow: 'hidden',
  },
  heroVisual: {
    width: 200,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  heroImageWrap: {
    width: 190,
    height: 190,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 95,
    overflow: 'hidden',
    backgroundColor: 'rgba(255,255,255,0.22)',
  },
  heroImage: {
    width: 190,
    height: 190,
    borderRadius: 95,
    backgroundColor: 'rgba(255,255,255,0.22)',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 8,
    marginTop: 18,
    marginBottom: 12,
    backgroundColor: '#f5dce1',
    borderRadius: 24,
  },
  summaryItem: {
    fontSize: 18,
    color: '#665a60',
    fontWeight: '700',
  },
  summaryItemActive: {
    fontSize: 18,
    color: '#2f2a2d',
    fontWeight: '800',
    backgroundColor: '#f9f4f6',
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 8,
    overflow: 'hidden',
  },
  newStatsContainer: {
    paddingTop: 8,
    paddingBottom: 16,
  },
  totalKcal: {
    fontSize: 58,
    fontWeight: '800',
    color: '#2f2a2d',
    textAlign: 'center',
    marginTop: 8,
  },
  totalLabel: {
    textAlign: 'center',
    color: '#7a666d',
    fontSize: 18,
    marginTop: 8,
  },
  statGrid: {
    marginTop: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  metricBox: {
    flex: 1,
    alignItems: 'center',
  },
  metricValue: {
    fontSize: 28,
    color: '#2f2a2d',
    fontWeight: '800',
  },
  metricLabel: {
    fontSize: 15,
    color: '#7a666d',
    marginTop: 5,
  },
  sectionHead: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: '#2f2a2d',
  },
  sectionBadge: {
    fontSize: 14,
    color: '#ff6b8a',
    backgroundColor: '#f9dfe6',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    fontWeight: '700',
  },
});
