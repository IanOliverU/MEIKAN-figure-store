import { View } from 'react-native';

import { TimelineItem, TrackingStep } from './TimelineItem';

type TrackingTimelineProps = {
  steps: TrackingStep[];
};

export function TrackingTimeline({ steps }: TrackingTimelineProps) {
  return (
    <View>
      {steps.map((step, index) => (
        <TimelineItem key={step.id} step={step} isLast={index === steps.length - 1} />
      ))}
    </View>
  );
}
