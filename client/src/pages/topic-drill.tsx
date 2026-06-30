import { useParams } from 'wouter';
import { TopicDrill } from '@/components/topic-drill';
import { getDrillTopic } from '@/lib/drillTopics';
import NotFound from '@/pages/not-found';

export default function TopicDrillPage() {
  const params = useParams<{ topicId: string }>();
  const config = getDrillTopic(params.topicId);
  if (!config) return <NotFound />;
  return <TopicDrill config={config} />;
}
