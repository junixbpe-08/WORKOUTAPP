import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import React from 'react';
import {
    ImageSourcePropType,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

export type WorkoutCardProps = {
  imageSource: ImageSourcePropType;
  title: string;
  duration: string;
  calories: string;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  onPress: () => void;
};

export function WorkoutCard({
  imageSource,
  title,
  duration,
  calories,
  isFavorite,
  onToggleFavorite,
  onPress,
}: WorkoutCardProps) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.9}>
      <Image source={imageSource} style={styles.image} contentFit="cover" />

      <TouchableOpacity
        style={[styles.favoriteButton, isFavorite && styles.favoriteButtonActive]}
        onPress={onToggleFavorite}
        hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
        activeOpacity={0.8}>
        <Ionicons
          name={isFavorite ? 'heart' : 'heart-outline'}
          size={18}
          color={isFavorite ? '#fff' : '#ff6b8a'}
        />
      </TouchableOpacity>

      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>

        <View style={styles.metaRow}>
          <View style={styles.metaItem}>
            <Ionicons name="time-outline" size={16} color="#6d5e66" />
            <Text style={styles.metaText}>{duration}</Text>
          </View>

          <View style={styles.metaItem}>
            <Ionicons name="flame-outline" size={16} color="#6d5e66" />
            <Text style={styles.metaText}>{calories}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff7f8',
    borderRadius: 28,
    overflow: 'hidden',
    marginBottom: 18,
    borderWidth: 1,
    borderColor: '#f3d8de',
    shadowColor: '#dca8b2',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 2,
  },
  image: {
    width: '100%',
    height: 170,
    backgroundColor: '#f7dfe3',
  },
  favoriteButton: {
    position: 'absolute',
    right: 14,
    top: 14,
    width: 38,
    height: 38,
    borderRadius: 19,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.8)',
  },
  favoriteButtonActive: {
    backgroundColor: '#f56d8a',
  },
  content: {
    paddingHorizontal: 18,
    paddingTop: 14,
    paddingBottom: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: '#2f2a2d',
    marginBottom: 10,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  metaText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#6d5e66',
  },
});
