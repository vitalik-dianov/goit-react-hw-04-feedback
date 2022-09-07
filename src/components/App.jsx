import React, { useState } from 'react';
import { Statistics } from './Statistics/Statistics';
import { FeedbackOptions } from './FeedbackOptions/FeedbackOptions';
import { Section } from './Section/Section';
import { Notifycation } from './Notifycation/Notifycation';
import { Box } from 'Box';

export const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const options = {
    good,
    neutral,
    bad,
  };
  const addFeedback = feedback => {
    switch (feedback) {
      case 'good':
        setGood(state => state + 1);
        break;
      case 'neutral':
        setNeutral(state => state + 1);
        break;
      case 'bad':
        setBad(state => state + 1);
        break;
      default:
        console.log('Error, unknown type feedback');
        break;
    }
  };

  const countTotalFeedback = () => {
    const totalValues = Object.values(options);
    const total = totalValues.reduce((acc, value) => {
      return acc + value;
    }, 0);
    return total;
  };
  const countPositiveFeedbackPercentage = () => {
    const percentage = parseInt((good / countTotalFeedback()) * 100);
    return percentage ? percentage : 0;
  };

  return (
    <Box width="100%" height="100vh" pt={7} backgroundColor="backgroundPrimary">
      <Section title="Please leave feedback">
        <FeedbackOptions onLeaveFeedback={addFeedback} options={options} />

        {countTotalFeedback() === 0 ? (
          <Notifycation message="There is no feedback" />
        ) : (
          <Statistics
            good={good}
            neutral={neutral}
            bad={bad}
            total={countTotalFeedback()}
            positivePercentage={countPositiveFeedbackPercentage()}
          />
        )}
      </Section>
    </Box>
  );
};
