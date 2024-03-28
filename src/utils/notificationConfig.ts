import notifee, { RepeatFrequency, TimestampTrigger, TriggerType } from "@notifee/react-native";
import { String } from "./String";

const triggerNotification = async (reminder: any, key: string, userId: string) => {
  try {
    const trigger: TimestampTrigger = {
      type: TriggerType.TIMESTAMP,
      timestamp: new Date(reminder.datetime).getTime(),
      repeatFrequency: reminder.dateselecteButton === String.everyday ? RepeatFrequency.DAILY : undefined,
    };

    await notifee.createTriggerNotification(
      {
        id: key,
        title: reminder.title,
        body: reminder.description,
        android: {
          channelId: userId,
        },
      },
      trigger,
    );
  } catch (error: any) {
    console.log('error', error);
  }
}

export default triggerNotification;