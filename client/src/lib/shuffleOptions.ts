export interface ShuffledQuestion<T> {
  question: T;
  shuffledOptions: string[];
  shuffledCorrectIndex: number;
  originalToShuffledMap: number[];
}

export function shuffleQuestionOptions<T extends { options: string[]; correctAnswer: number }>(
  question: T,
  seed?: number
): ShuffledQuestion<T> {
  const options = [...question.options];
  const originalCorrectIndex = question.correctAnswer;
  
  const indexedOptions = options.map((opt, i) => ({ opt, originalIndex: i }));
  
  const seededRandom = seed !== undefined 
    ? createSeededRandom(seed)
    : () => Math.random();
  
  for (let i = indexedOptions.length - 1; i > 0; i--) {
    const j = Math.floor(seededRandom() * (i + 1));
    [indexedOptions[i], indexedOptions[j]] = [indexedOptions[j], indexedOptions[i]];
  }
  
  const shuffledOptions = indexedOptions.map(item => item.opt);
  const originalToShuffledMap = new Array(options.length);
  
  indexedOptions.forEach((item, shuffledIndex) => {
    originalToShuffledMap[item.originalIndex] = shuffledIndex;
  });
  
  const shuffledCorrectIndex = originalToShuffledMap[originalCorrectIndex];
  
  return {
    question,
    shuffledOptions,
    shuffledCorrectIndex,
    originalToShuffledMap,
  };
}

function createSeededRandom(seed: number): () => number {
  let state = seed;
  return () => {
    state = (state * 1103515245 + 12345) & 0x7fffffff;
    return state / 0x7fffffff;
  };
}

export function shuffleMultipleQuestions<T extends { options: string[]; correctAnswer: number }>(
  questions: T[],
  seedBase?: number
): ShuffledQuestion<T>[] {
  return questions.map((q, index) => {
    const seed = seedBase !== undefined ? seedBase + index : undefined;
    return shuffleQuestionOptions(q, seed);
  });
}
