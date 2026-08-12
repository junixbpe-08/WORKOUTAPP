import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import type { Workout } from '@/app/index';

export default function WorkoutDetailsScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ workout?: string | string[] }>();
  const rawWorkout = Array.isArray(params.workout) ? params.workout[0] : params.workout;

  const workout = useMemo<Workout | null>(() => {
    if (!rawWorkout) return null;

    try {
      return JSON.parse(decodeURIComponent(rawWorkout)) as Workout;
    } catch {
      try {
        return JSON.parse(rawWorkout) as Workout;
      } catch {
        return null;
      }
    }
  }, [rawWorkout]);

  const [isCompleted, setIsCompleted] = useState(false);

  if (!workout) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>Workout not found.</Text>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backButtonText}>Go back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => router.back()} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
          <Ionicons name="arrow-back" size={26} color="#2c2b2d" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Workout</Text>
        <View style={styles.headerSpacer} />
      </View>

      <View style={styles.heroCard}>
        <View style={styles.heroBadge}>
          <Ionicons name="fitness-outline" size={30} color="#ff6b8a" />
        </View>

        <Text style={styles.title}>{workout.title}</Text>
        <Text style={styles.subtitle}>{workout.category}</Text>

        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{workout.duration}</Text>
            <Text style={styles.statLabel}>Duration</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{workout.calories}</Text>
            <Text style={styles.statLabel}>Calories</Text>
          </View>
        </View>
      </View>

      <View style={styles.infoCard}>
        <Text style={styles.sectionTitle}>Workout details</Text>
        <Text style={styles.description}>{workout.description}</Text>

        <View style={styles.pointsList}>
          {workout.steps.map((step: string) => (
            <View key={step} style={styles.pointRow}>
              <View style={styles.bullet} />
              <Text style={styles.pointText}>{step}</Text>
            </View>
          ))}
        </View>
      </View>

      <TouchableOpacity
        style={[styles.actionButton, isCompleted && styles.actionButtonCompleted]}
        onPress={() => setIsCompleted((previous) => !previous)}
      >
        <Text style={[styles.actionButtonText, isCompleted && styles.actionButtonTextCompleted]}>
          {isCompleted ? 'Completed' : 'Start Workout'}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7e9ec',
  },
  content: {
    paddingHorizontal: 22,
    paddingTop: 36,
    paddingBottom: 40,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2f2a2d',
  },
  headerSpacer: {
    width: 26,
  },
  heroCard: {
    backgroundColor: '#fff8f9',
    borderRadius: 30,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#d9a5af',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 18,
    elevation: 3,
  },
  heroBadge: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#f9dfe6',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 18,
  },
  title: {
    fontSize: 36,
    fontWeight: '800',
    color: '#2f2a2d',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: '#7a666d',
    marginTop: 8,
    marginBottom: 22,
  },
  statsRow: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 30,
    fontWeight: '800',
    color: '#2f2a2d',
  },
  statLabel: {
    fontSize: 14,
    color: '#7a666d',
    marginTop: 4,
  },
  infoCard: {
    backgroundColor: '#fff8f9',
    borderRadius: 28,
    padding: 22,
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#2f2a2d',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#574c50',
    marginBottom: 18,
  },
  pointsList: {
    gap: 12,
  },
  pointRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bullet: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#ff7a96',
    marginRight: 12,
  },
  pointText: {
    fontSize: 16,
    color: '#2f2a2d',
    flexShrink: 1,
  },
  actionButton: {
    marginTop: 28,
    backgroundColor: '#ff7a96',
    borderRadius: 18,
    paddingVertical: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionButtonCompleted: {
    backgroundColor: '#d8f0d3',
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
  },
  actionButtonTextCompleted: {
    color: '#1d6d31',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f7e9ec',
    padding: 24,
  },
  emptyText: {
    fontSize: 20,
    color: '#2f2a2d',
    marginBottom: 18,
  },
  backButton: {
    backgroundColor: '#ff7a96',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
  },
  backButtonText: {
    color: '#fff',
    fontWeight: '700',
  },
});
