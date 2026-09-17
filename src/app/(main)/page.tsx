import { getCurrentQuestion } from '@/server/utils/questions';
import { HomeView } from '@/views/home';

export default async function Home() {
  const currentQuestion = await getCurrentQuestion();

  return <HomeView currentQuestion={currentQuestion} />;
}
