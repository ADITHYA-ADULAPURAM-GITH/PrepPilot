export const aptitudeContent = {
  "Number System": {
    resources: [
      {
        type: "notes",
        title: "Number System — Fundamentals",
        body:
          "The number system is the foundation of quantitative aptitude. Important categories include natural numbers, whole numbers, integers, rational numbers, irrational numbers, and real numbers.\n\n" +
          "Placement questions commonly test divisibility, factors, multiples, remainders, prime numbers, HCF, LCM, and properties of numbers.\n\n" +
          "A prime number has exactly two positive factors: 1 and itself. The number 1 is neither prime nor composite.",
        order: 0,
      },
      {
        type: "notes",
        title: "Divisibility, HCF and LCM",
        body:
          "Divisibility rules provide quick ways to determine whether a number is divisible by another number without performing full division.\n\n" +
          "HCF (Highest Common Factor) is the greatest number that divides two or more numbers exactly.\n\n" +
          "LCM (Least Common Multiple) is the smallest positive number that is divisible by two or more numbers.\n\n" +
          "For two positive integers a and b: HCF(a,b) × LCM(a,b) = a × b.",
        order: 1,
      },
    ],
    practice: [
      {
        title: "Number System — Quick Check",
        order: 0,
        questions: [
          {
            question: "Which of the following is neither prime nor composite?",
            options: ["0", "1", "2", "3"],
            correctOptionIndex: 1,
            explanation:
              "The number 1 has only one positive factor, so it is neither prime nor composite.",
          },
          {
            question: "What is the HCF of 18 and 24?",
            options: ["3", "6", "9", "12"],
            correctOptionIndex: 1,
            explanation:
              "The common factors are 1, 2, 3 and 6. Therefore, the HCF is 6.",
          },
          {
            question: "What is the LCM of 6 and 8?",
            options: ["12", "18", "24", "48"],
            correctOptionIndex: 2,
            explanation:
              "The smallest positive number divisible by both 6 and 8 is 24.",
          },
        ],
      },
    ],
  },

  Percentages: {
    resources: [
      {
        type: "notes",
        title: "Percentages — Fundamentals",
        body:
          "Percentage means 'per hundred'. For example, 25% means 25 out of 100, or 25/100 = 1/4.\n\n" +
          "Percentage = (Part / Whole) × 100.\n\n" +
          "To find x% of a quantity N, calculate (x/100) × N.\n\n" +
          "Percentage change = (Change / Original Value) × 100.",
        order: 0,
      },
      {
        type: "notes",
        title: "Successive Percentage Changes",
        body:
          "When percentage changes happen successively, do not simply add the percentages.\n\n" +
          "For an increase of a% followed by an increase of b%, the net multiplier is (1 + a/100)(1 + b/100).\n\n" +
          "For an increase of a% followed by a decrease of b%, multiply by (1 + a/100)(1 - b/100).\n\n" +
          "This is a common placement-test trap.",
        order: 1,
      },
    ],
    practice: [
      {
        title: "Percentages — Quick Check",
        order: 0,
        questions: [
          {
            question: "What is 25% of 240?",
            options: ["40", "50", "60", "80"],
            correctOptionIndex: 2,
            explanation:
              "25% of 240 = 25/100 × 240 = 60.",
          },
          {
            question: "A number increases from 200 to 250. What is the percentage increase?",
            options: ["20%", "25%", "30%", "50%"],
            correctOptionIndex: 1,
            explanation:
              "Increase = 50. Percentage increase = 50/200 × 100 = 25%.",
          },
          {
            question: "A value increases by 20% and then decreases by 20%. What is the net change?",
            options: ["No change", "4% decrease", "4% increase", "2% decrease"],
            correctOptionIndex: 1,
            explanation:
              "100 × 1.2 × 0.8 = 96, so the final value is 4% lower.",
          },
        ],
      },
    ],
  },

  "Profit & Loss": {
    resources: [
      {
        type: "notes",
        title: "Profit and Loss — Fundamentals",
        body:
          "Cost Price (CP) is the price paid to acquire an item. Selling Price (SP) is the price at which it is sold.\n\n" +
          "Profit = SP − CP when SP is greater than CP.\n\n" +
          "Loss = CP − SP when CP is greater than SP.\n\n" +
          "Profit percentage = (Profit / CP) × 100.\n\n" +
          "Loss percentage = (Loss / CP) × 100.",
        order: 0,
      },
      {
        type: "notes",
        title: "Discounts and Marked Price",
        body:
          "Marked Price (MP) is the listed price of an item. A discount reduces the marked price to obtain the selling price.\n\n" +
          "Discount = MP − SP.\n\n" +
          "Discount percentage = (Discount / MP) × 100.\n\n" +
          "When solving placement questions, distinguish carefully between profit percentage, which is based on CP, and discount percentage, which is based on MP.",
        order: 1,
      },
    ],
    practice: [
      {
        title: "Profit & Loss — Quick Check",
        order: 0,
        questions: [
          {
            question: "An item costs ₹500 and is sold for ₹600. What is the profit percentage?",
            options: ["10%", "15%", "20%", "25%"],
            correctOptionIndex: 2,
            explanation:
              "Profit = 600 − 500 = 100. Profit percentage = 100/500 × 100 = 20%.",
          },
          {
            question: "An item marked at ₹1000 is sold for ₹800. What is the discount percentage?",
            options: ["10%", "15%", "20%", "25%"],
            correctOptionIndex: 2,
            explanation:
              "Discount = 1000 − 800 = 200. Discount percentage = 200/1000 × 100 = 20%.",
          },
          {
            question: "If CP is ₹400 and loss is 10%, what is SP?",
            options: ["₹350", "₹360", "₹370", "₹390"],
            correctOptionIndex: 1,
            explanation:
              "SP = 400 × 90/100 = ₹360.",
          },
        ],
      },
    ],
  },

  "Ratio & Proportion": {
    resources: [
      {
        type: "notes",
        title: "Ratio — Fundamentals",
        body:
          "A ratio compares two quantities of the same kind. A ratio a:b means a/b.\n\n" +
          "Ratios can be simplified by dividing both terms by their common factor.\n\n" +
          "If a:b = 2:3 and the total is 50, the quantities are 20 and 30 because the total number of parts is 5.",
        order: 0,
      },
      {
        type: "notes",
        title: "Proportion and Direct Relationships",
        body:
          "A proportion states that two ratios are equal. For example, a:b = c:d implies ad = bc.\n\n" +
          "In direct proportion, when one quantity increases, the other increases in the same ratio.\n\n" +
          "In inverse proportion, when one quantity increases, the other decreases so that their product remains constant under the given relationship.",
        order: 1,
      },
    ],
    practice: [
      {
        title: "Ratio & Proportion — Quick Check",
        order: 0,
        questions: [
          {
            question: "If the ratio of boys to girls is 2:3 and there are 50 students, how many are boys?",
            options: ["15", "20", "25", "30"],
            correctOptionIndex: 1,
            explanation:
              "Total parts = 2 + 3 = 5. Each part = 50/5 = 10. Boys = 2 × 10 = 20.",
          },
          {
            question: "If a:b = 3:4 and b:c = 2:5, what is a:c?",
            options: ["3:5", "3:10", "6:20", "4:5"],
            correctOptionIndex: 1,
            explanation:
              "Make b common: 3:4 becomes 3:4 and 2:5 becomes 4:10. Therefore a:c = 3:10.",
          },
        ],
      },
    ],
  },

  Averages: {
    resources: [
      {
        type: "notes",
        title: "Averages — Fundamentals",
        body:
          "Average = Sum of all observations / Number of observations.\n\n" +
          "If the average of n numbers is A, their total sum is n × A.\n\n" +
          "This reverse relationship is extremely useful in placement questions involving people joining or leaving a group.",
        order: 0,
      },
      {
        type: "notes",
        title: "Weighted and Combined Averages",
        body:
          "When groups have different sizes, the combined average is a weighted average rather than a simple average of the two averages.\n\n" +
          "Combined average = (Total of group 1 + Total of group 2) / (Total number of observations).\n\n" +
          "Always convert an average back into a total before combining groups.",
        order: 1,
      },
    ],
    practice: [
      {
        title: "Averages — Quick Check",
        order: 0,
        questions: [
          {
            question: "The average of 5 numbers is 20. What is their sum?",
            options: ["25", "50", "100", "125"],
            correctOptionIndex: 2,
            explanation:
              "Sum = Average × Number of values = 20 × 5 = 100.",
          },
          {
            question: "The average age of 4 people is 25. A fifth person joins and the average becomes 27. What is the fifth person's age?",
            options: ["30", "32", "35", "37"],
            correctOptionIndex: 2,
            explanation:
              "Original total = 4 × 25 = 100. New total = 5 × 27 = 135. New person's age = 35.",
          },
        ],
      },
    ],
  },

  "Time, Work & Distance": {
    resources: [
      {
        type: "notes",
        title: "Time and Work — Fundamentals",
        body:
          "If a person completes a job in n days, their one-day work rate is 1/n.\n\n" +
          "When two people work together, their rates are added.\n\n" +
          "For example, if A completes a job in 10 days and B in 15 days, their combined daily rate is 1/10 + 1/15 = 1/6, so together they finish the job in 6 days.",
        order: 0,
      },
      {
        type: "notes",
        title: "Speed, Time and Distance",
        body:
          "The basic relationship is Distance = Speed × Time.\n\n" +
          "Therefore, Speed = Distance / Time and Time = Distance / Speed.\n\n" +
          "When units differ, convert them before calculating. A common conversion is 1 m/s = 18/5 km/h.",
        order: 1,
      },
    ],
    practice: [
      {
        title: "Time, Work & Distance — Quick Check",
        order: 0,
        questions: [
          {
            question: "A can complete a job in 10 days. What fraction of the work does A complete in one day?",
            options: ["1/5", "1/10", "1/15", "10"],
            correctOptionIndex: 1,
            explanation:
              "If the whole job takes 10 days, the one-day work rate is 1/10.",
          },
          {
            question: "A car travels at 60 km/h for 2 hours. What distance does it cover?",
            options: ["30 km", "60 km", "120 km", "180 km"],
            correctOptionIndex: 2,
            explanation:
              "Distance = Speed × Time = 60 × 2 = 120 km.",
          },
          {
            question: "What is 10 m/s in km/h?",
            options: ["18 km/h", "24 km/h", "36 km/h", "72 km/h"],
            correctOptionIndex: 2,
            explanation:
              "10 × 18/5 = 36 km/h.",
          },
        ],
      },
    ],
  },

  "Probability & Permutations": {
    resources: [
      {
        type: "notes",
        title: "Probability — Fundamentals",
        body:
          "For equally likely outcomes, probability of an event = Favorable outcomes / Total possible outcomes.\n\n" +
          "Probability lies between 0 and 1 inclusive.\n\n" +
          "An impossible event has probability 0, while a certain event has probability 1.",
        order: 0,
      },
      {
        type: "notes",
        title: "Permutations and Combinations",
        body:
          "A permutation is an arrangement where order matters.\n\n" +
          "The number of arrangements of n distinct objects taken r at a time is nPr = n!/(n-r)!\n\n" +
          "A combination is a selection where order does not matter: nCr = n!/[r!(n-r)!].\n\n" +
          "Remember: permutation → arrangement/order matters; combination → selection/order does not matter.",
        order: 1,
      },
    ],
    practice: [
      {
        title: "Probability & Permutations — Quick Check",
        order: 0,
        questions: [
          {
            question: "What is the probability of getting a head when a fair coin is tossed once?",
            options: ["0", "1/4", "1/2", "1"],
            correctOptionIndex: 2,
            explanation:
              "There are two equally likely outcomes and one favorable outcome, so the probability is 1/2.",
          },
          {
            question: "How many ways can 3 distinct books be arranged on a shelf?",
            options: ["3", "6", "9", "12"],
            correctOptionIndex: 1,
            explanation:
              "The number of arrangements is 3! = 3 × 2 × 1 = 6.",
          },
          {
            question: "In which case does order matter?",
            options: [
              "Combination",
              "Permutation",
              "Average",
              "Probability only",
            ],
            correctOptionIndex: 1,
            explanation:
              "Order matters in permutations.",
          },
        ],
      },
    ],
  },

  "Data Interpretation": {
    resources: [
      {
        type: "notes",
        title: "Data Interpretation — Fundamentals",
        body:
          "Data Interpretation (DI) questions require extracting information from tables, bar charts, line graphs, pie charts, or other data representations.\n\n" +
          "The mathematics usually involves percentages, ratios, averages, differences, and arithmetic.\n\n" +
          "The key skill is reading the data accurately before calculating.",
        order: 0,
      },
      {
        type: "notes",
        title: "DI Calculation Strategy",
        body:
          "Before calculating, identify exactly what the question asks for and which data points are relevant.\n\n" +
          "For percentage change, use the original value as the denominator.\n\n" +
          "For ratios, compare quantities using the same units.\n\n" +
          "Avoid unnecessary calculations. In timed placement tests, estimation can sometimes eliminate incorrect options quickly.",
        order: 1,
      },
    ],
    practice: [
      {
        title: "Data Interpretation — Quick Check",
        order: 0,
        questions: [
          {
            question: "A company's sales increase from 200 to 250 units. What is the percentage increase?",
            options: ["20%", "25%", "30%", "50%"],
            correctOptionIndex: 1,
            explanation:
              "Increase = 50. Percentage increase = 50/200 × 100 = 25%.",
          },
          {
            question: "A table shows 40 students in Class A and 60 in Class B. What is the ratio A:B?",
            options: ["1:2", "2:3", "3:2", "4:5"],
            correctOptionIndex: 1,
            explanation:
              "40:60 simplifies to 2:3.",
          },
        ],
      },
    ],
  },

  "Logical Reasoning": {
    resources: [
      {
        type: "notes",
        title: "Logical Reasoning — Fundamentals",
        body:
          "Logical reasoning tests your ability to identify patterns, relationships, conditions, and valid conclusions.\n\n" +
          "Common placement topics include syllogisms, analogies, coding-decoding, series, directions, blood relations, and statement-based reasoning.\n\n" +
          "The most important habit is to use only the information given in the question rather than assumptions.",
        order: 0,
      },
      {
        type: "notes",
        title: "Approach to Reasoning Questions",
        body:
          "For sequence questions, identify the relationship between consecutive terms.\n\n" +
          "For statement and conclusion questions, separate facts from assumptions.\n\n" +
          "For direction questions, draw a simple coordinate-style diagram rather than trying to visualize everything mentally.\n\n" +
          "For coding questions, look for consistent transformations between the original and encoded forms.",
        order: 1,
      },
    ],
    practice: [
      {
        title: "Logical Reasoning — Quick Check",
        order: 0,
        questions: [
          {
            question: "Find the next number: 2, 4, 8, 16, ?",
            options: ["20", "24", "30", "32"],
            correctOptionIndex: 3,
            explanation:
              "Each number is multiplied by 2, so the next number is 32.",
          },
          {
            question: "If all cats are animals and some animals are black, what can definitely be concluded?",
            options: [
              "All cats are black",
              "Some cats are black",
              "Cats are animals",
              "No cats are black",
            ],
            correctOptionIndex: 2,
            explanation:
              "The only guaranteed conclusion from the statements is that cats are animals.",
          },
          {
            question: "If you face North and turn right, which direction are you facing?",
            options: ["West", "South", "East", "North"],
            correctOptionIndex: 2,
            explanation:
              "A right turn from North points East.",
          },
        ],
      },
    ],
  },

  "Puzzles & Seating Arrangement": {
    resources: [
      {
        type: "notes",
        title: "Seating Arrangement — Fundamentals",
        body:
          "Seating arrangement questions ask you to determine the positions of people or objects based on a set of constraints.\n\n" +
          "Common arrangements include linear rows, circular tables, and square or rectangular layouts.\n\n" +
          "The safest approach is to draw the arrangement and place fixed or highly constrained positions first.",
        order: 0,
      },
      {
        type: "notes",
        title: "Puzzle Solving Strategy",
        body:
          "Start with the strongest constraints, such as a person being fixed in a particular position or two people sitting together.\n\n" +
          "Then eliminate impossible positions using the remaining clues.\n\n" +
          "For circular arrangements, decide whether clockwise and anticlockwise relationships matter and fix one person as a reference point to avoid duplicate rotations.",
        order: 1,
      },
    ],
    practice: [
      {
        title: "Puzzles & Seating — Quick Check",
        order: 0,
        questions: [
          {
            question: "What is usually the best first step in a seating arrangement problem?",
            options: [
              "Guess the final answer",
              "Draw the arrangement and place the strongest constraints",
              "Ignore the conditions",
              "Calculate averages",
            ],
            correctOptionIndex: 1,
            explanation:
              "Drawing the arrangement and applying the strongest constraints reduces errors and makes elimination easier.",
          },
          {
            question: "In a circular arrangement, why is one person often fixed as a reference?",
            options: [
              "To eliminate equivalent rotations",
              "To change the number of people",
              "To calculate probability",
              "To determine salary",
            ],
            correctOptionIndex: 0,
            explanation:
              "Fixing one reference position prevents counting the same circular arrangement multiple times due to rotation.",
          },
        ],
      },
    ],
  },
};