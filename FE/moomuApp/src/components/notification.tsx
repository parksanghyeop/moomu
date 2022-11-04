import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

type Props = {
  item: any;
  onPress?: () => void;
};

const elapsedTime = (date: string) => {
  const start: any = new Date(date);
  const end: any = new Date(); // 현재 날짜

  const diff = end - start; // 경과 시간

  const times = [
    { time: '분', milliSeconds: 1000 * 60 },
    { time: '시간', milliSeconds: 1000 * 60 * 60 },
    { time: '일', milliSeconds: 1000 * 60 * 60 * 24 },
    { time: '개월', milliSeconds: 1000 * 60 * 60 * 24 * 30 },
    { time: '년', milliSeconds: 1000 * 60 * 60 * 24 * 365 },
  ].reverse();

  // 년 단위부터 알맞는 단위 찾기
  for (const value of times) {
    const betweenTime = Math.floor(diff / value.milliSeconds);

    // 큰 단위는 0보다 작은 소수 단위 나옴
    if (betweenTime > 0) {
      return `${betweenTime}${value.time} 전`;
    }
  }

  // 모든 단위가 맞지 않을 시
  return '방금 전';
};

export const Notification = ({ item, onPress }: Props) => {
  return (
    <Pressable style={styles.itemContainer} onPress={onPress}>
      <View style={styles.itemFlex}>
        <View style={styles.content}>
          <Text
            style={styles.contentText}
            numberOfLines={2}
            ellipsizeMode="tail"
          >
            {item.content}
          </Text>
        </View>
        <View style={styles.time}>
          <Text style={styles.timeText}>{elapsedTime(item.created_date)}</Text>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    justifyContent: 'center',
    // alignItems: 'center',
    padding: 10,
    width: '80%',
    // height: 60,
  },
  itemFlex: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  content: {
    width: 280,
  },
  time: {
    width: '100%',
  },
  contentText: {
    color: '#63B3ED',
    paddingRight: 10,
    fontSize: 16,
  },
  timeText: {
    color: '#63B3ED',
    fontSize: 14,
  },
});
