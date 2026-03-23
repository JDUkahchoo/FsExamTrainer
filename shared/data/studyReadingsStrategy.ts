import type { ReadingModule } from '../schema';

export const STUDY_READINGS_STRATEGY: ReadingModule[] = [
  {
    id: 'fs-strategy-spaced-rep',
    examTrack: 'fs',
    domainNumber: 0,
    domain: 'Study Strategy',
    title: 'Spaced Repetition & Memory Science',
    description: 'Understand the cognitive science behind the Optimal Review Timing and Memory Retention features. Learn how the Ebbinghaus forgetting curve, spaced repetition, and the SM-2 algorithm work together to help you remember more with less study time.',
    estimatedMinutes: 15,
    sections: [
      {
        id: 'fs-strategy-spaced-rep-s1',
        type: 'concept',
        title: 'The Forgetting Curve',
        content: 'In 1885, German psychologist Hermann Ebbinghaus conducted the first systematic experiments on human memory. He memorized lists of nonsense syllables, then tested himself at various intervals to measure how much he retained. The result was the "forgetting curve" — one of the most important findings in the science of learning.\n\nHis discovery: memory does not fade gradually or evenly. It decays exponentially. If you learn something today and do nothing to reinforce it, you will forget roughly:\n\n- 40% within the first 20 minutes\n- 56% within 1 hour\n- 66% within 1 day\n- 75% within 6 days\n- 90% or more within a month\n\nThis is expressed mathematically as:\n\nR = e^(-t/S)\n\nWhere R is retention (a value from 0 to 1), t is the time elapsed since learning, and S is "stability" — a measure of how strongly the memory has been consolidated. A newly learned fact has low stability. A well-practiced fact has high stability and decays much more slowly.\n\nThe practical implication: cramming the night before an exam temporarily inflates your recall, but most of that information is gone within days. For professional licensing exams like the FS and PS, which test a vast body of technical knowledge, this approach fails.\n\nWhy it matters for your study plan: the Optimal Review Timing and Memory Retention features in this app track your retention curve for each item you study. When retention drops toward 50%, the item is flagged for review. This is not an arbitrary threshold — it represents the optimal moment to review before significant decay occurs.',
      },
      {
        id: 'fs-strategy-spaced-rep-s2',
        type: 'concept',
        title: 'Spaced Repetition: The Solution',
        content: 'If forgetting curves are the problem, spaced repetition is the solution. The core insight: reviewing information just before you forget it is dramatically more effective than reviewing it repeatedly in a short session.\n\nThis works through a mechanism called the "spacing effect," first observed by Ebbinghaus himself: the same total study time produces far stronger long-term memories when spread across multiple sessions than when massed together (what he called "distributed practice" vs. "massed practice").\n\nHere is what happens each time you successfully review a memory just before it fades:\n\n1. The memory is reconsolidated — rebuilt and strengthened.\n2. The stability S in the forgetting curve increases. The same memory now decays more slowly.\n3. The next review can be scheduled further out — days, then weeks, then months.\n\nThis compounding effect means:\n- After review 1: review again in 1 day\n- After review 2 (successful): review again in 6 days\n- After review 3 (successful): review again in ~2 weeks\n- After review 4 (successful): review again in ~5 weeks\n- After review 5 (successful): review again in ~3–4 months\n\nThe intervals grow because each successful review increases stability. A concept you have reviewed 5 times with good recall is far more durable than one you have reviewed 15 times in a single cramming session.\n\nResearch consistently shows that spaced repetition can reduce total study time by 50–70% while producing equal or better long-term retention compared to massed practice.',
      },
      {
        id: 'fs-strategy-spaced-rep-s3',
        type: 'concept',
        title: 'The SM-2 Algorithm: How Your Schedule Is Calculated',
        content: 'This app uses the SM-2 algorithm (SuperMemo 2), developed by Piotr Wozniak in the 1980s, to calculate your personalized review schedule. It is one of the most widely validated spaced repetition algorithms and forms the basis for popular tools like Anki.\n\nHere is how it works step by step:\n\n1. QUALITY RATING: Each time you review a flashcard or lesson, you rate your recall on a scale of 1 to 5:\n   - 5: Perfect recall — immediate, confident, no hesitation\n   - 4: Correct with minor hesitation\n   - 3: Correct but with significant difficulty\n   - 2: Incorrect but the correct answer felt familiar when seen\n   - 1: Incorrect and did not recognize the answer\n\n2. EASE FACTOR (EF): Each item has an ease factor starting at 2.5. After every review, EF is updated:\n   EF_new = EF + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02))\n   A quality of 5 slightly increases EF. A quality below 3 decreases it. EF never falls below 1.3.\n\n3. INTERVAL CALCULATION:\n   - First review: always 1 day later\n   - Second successful review: 6 days later\n   - Subsequent successful reviews: interval = previous interval × EF (rounded)\n   - If quality < 3 (failed recall): reset interval to 1 day\n\n4. NEXT REVIEW DATE: next review = today + interval days\n\nOver time, items you consistently recall well get longer and longer intervals. Items you struggle with get shorter intervals and reduced ease factors, so the system gives them more practice.\n\nThis is why "Mark Done" uses quality 3 — it is the minimum threshold for "successful recall" in the SM-2 system. It advances the schedule forward without rewarding a review that was not actually performed, and it slightly reduces the ease factor to signal that the item may need a bit more attention.',
      },
      {
        id: 'fs-strategy-spaced-rep-s4',
        type: 'concept',
        title: 'Reading Your Retention Score',
        content: 'The Memory Retention section shows a retention percentage for each item you have studied. This is calculated using the forgetting curve formula:\n\nR = e^(-t/S) × 100\n\nWhere:\n- R is retention as a percentage (0–100%)\n- t is the number of days since your last review\n- S is your stability score for that item (derived from ease factor and review count)\n\nHow to read the scores:\n\n90–100% (Strong, green): You reviewed this recently or have high stability from many successful reviews. No action needed — reviewing now would not significantly improve long-term retention.\n\n50–89% (Fading, yellow): You are approaching the optimal review window. The item has not been forgotten, but reviewing now will significantly strengthen the memory before it decays further. This is when review is most efficient.\n\nBelow 50% (At Risk, red): The item has likely decayed substantially. Reviewing now is still valuable — you will relearn it — but you have passed the optimal window. The memory may feel unfamiliar and may require more effort to reactivate.\n\nDue Now (orange badge): The scheduled review date has passed. This item is in the "just before forgetting" window that SM-2 targets. Reviewing now produces the strongest possible consolidation for the time invested.\n\nStability grows with each successful review. An item reviewed 6 times with good recall will have a retention curve that stays above 80% for weeks, while a newly learned item drops below 50% within days.',
      },
      {
        id: 'fs-strategy-spaced-rep-s5',
        type: 'concept',
        title: 'Optimal Timing: Why the Window Matters',
        content: 'Spaced repetition is not just about reviewing things — it is about reviewing them at the right time. Timing determines whether a review is efficient or wasted.\n\nThree scenarios:\n\nTOO EARLY (retention > 80%): You still remember the item well. Reviewing it now produces only a small increase in stability because the memory is already strong. You are spending study time for minimal gain.\n\nOPTIMAL WINDOW (retention 40–70%): The memory has faded enough that retrieving it requires real mental effort. This "desirable difficulty" is what drives consolidation. The act of struggling to recall — and then succeeding — produces the largest gains in stability. This is called the "retrieval practice effect."\n\nTOO LATE (retention < 30%): The memory trace has weakened significantly. You may not be able to retrieve it at all without seeing the answer. This is more like relearning than reviewing. It resets the SM-2 interval rather than extending it.\n\nThe Optimal Review Timing section targets the window just before an item reaches the "too late" zone. This is why a "Due Now" alert is worth acting on promptly — every additional day of delay pushes the item further toward "At Risk" and eventually toward "forgotten."\n\nFor the FS and PS exams, where you may be studying for 3–6 months before test day, consistent use of the review system compounds dramatically. Concepts reviewed optimally 5–6 times over that period will be solidly retained on exam day. Concepts crammed once in the final week will not be.',
      },
      {
        id: 'fs-strategy-spaced-rep-s6',
        type: 'knowledge_check',
        title: 'Knowledge Check: Spaced Repetition Concepts',
        knowledgeCheck: {
          question: 'According to the SM-2 algorithm, what happens to a review item\'s interval if you give it a quality rating of 2 (incorrect but recognized the answer)?',
          options: [
            'The interval doubles, since you recognized the answer',
            'The interval stays the same — a rating of 2 is neutral',
            'The interval resets to 1 day, since quality below 3 is treated as failed recall',
            'The interval is halved as a partial credit',
          ],
          correctIndex: 2,
          explanation: 'In SM-2, any quality rating below 3 is treated as failed recall. The interval resets to 1 day regardless of how familiar the answer felt. Only ratings of 3 or higher advance the interval. This prevents the schedule from drifting out too far for items that are not yet solidly learned.',
        },
      },
      {
        id: 'fs-strategy-spaced-rep-s7',
        type: 'knowledge_check',
        title: 'Knowledge Check: Reading Retention Scores',
        knowledgeCheck: {
          question: 'A flashcard shows a retention score of 45% and is labeled "At Risk." What does this mean and what is the best course of action?',
          options: [
            'You still remember 45% of that flashcard\'s content — no review needed yet',
            'The item has decayed significantly past the optimal review window; review it now to reactivate and reconsolidate the memory',
            'The item was reviewed too recently and you should wait before reviewing again',
            '45% is a good score — only items below 20% need attention',
          ],
          correctIndex: 1,
          explanation: 'A retention score of 45% means the forgetting curve model estimates you have retained about 45% of the memory strength since your last review. "At Risk" (<50%) indicates the optimal review window has passed and the memory is at risk of being lost. Reviewing now will reactivate it, though it may require more effort than if you had caught it in the "Fading" (50–89%) window. Still worth doing — relearning is faster than first-time learning.',
        },
      },
      {
        id: 'fs-strategy-spaced-rep-s8',
        type: 'knowledge_check',
        title: 'Knowledge Check: Optimal Study Timing',
        knowledgeCheck: {
          question: 'You have a busy week and are deciding when to review a flashcard that is currently showing 65% retention (Fading, yellow). What does the spaced repetition science recommend?',
          options: [
            'Wait until it drops to 0% — reviewing at 65% wastes time since you still remember it',
            'Review it now — the 50–89% Fading window is the optimal zone for maximum consolidation efficiency',
            'Review it daily for the next week to make sure it stays at 100%',
            'Skip it entirely — if you forget it, you can just relearn it from scratch',
          ],
          correctIndex: 1,
          explanation: 'The Fading window (50–89% retention) is the optimal review zone. The memory has decayed enough that retrieval requires real effort (which drives consolidation) but has not been lost entirely. Reviewing now produces the largest stability gain per unit of time invested. Waiting until it drops further (At Risk or lower) means you will spend more effort relearning rather than reinforcing.',
        },
      },
      {
        id: 'fs-strategy-spaced-rep-s9',
        type: 'further_reading',
        title: 'Further Reading',
        furtherReading: [
          {
            book: 'Ebbinghaus, H. (1885). Über das Gedächtnis (Memory: A Contribution to Experimental Psychology)',
            chapter: 'Chapters 6–8',
            topic: 'Original forgetting curve experiments and retention measurements over time',
          },
          {
            book: 'Wozniak, P.A. (1990). Optimization of Learning (SuperMemo 2 Algorithm)',
            chapter: 'Algorithm SM-2',
            topic: 'Original SM-2 spaced repetition algorithm with ease factor and interval calculation',
          },
          {
            book: 'Roediger, H.L. & Karpicke, J.D. (2006). Test-Enhanced Learning',
            chapter: 'Psychological Science 17(3): 249–255',
            topic: 'Retrieval practice effect — why testing yourself beats re-reading by 50% or more',
          },
          {
            book: 'Cepeda, N.J. et al. (2006). Distributed Practice in Verbal Recall Tasks',
            chapter: 'Psychological Bulletin 132(3): 354–380',
            topic: 'Meta-analysis of 317 experiments confirming the spacing effect across learning domains',
          },
        ],
      },
    ],
  },
];
