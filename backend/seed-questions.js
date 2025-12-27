const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Module = require('./models/Module');
const Question = require('./models/Question');

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/quizapp';

// Sample modules
const sampleModules = [
  {
    moduleNumber: 1,
    title: 'JavaScript Fundamentals',
    description: 'Core JavaScript concepts and basics',
    category: 'JavaScript',
    totalQuestions: 0,
    hotIndex: '🔥🔥🔥'
  },
  {
    moduleNumber: 2,
    title: 'React Basics',
    description: 'Introduction to React framework',
    category: 'React',
    totalQuestions: 0,
    hotIndex: '🔥🔥'
  },
  {
    moduleNumber: 3,
    title: 'Advanced JavaScript',
    description: 'Advanced JavaScript patterns and concepts',
    category: 'JavaScript',
    totalQuestions: 0,
    hotIndex: '🔥🔥🔥'
  }
];

// Sample questions
const sampleQuestions = [
  // JavaScript Questions
  {
    topic: 'Variables',
    question: 'What is the difference between let, const, and var in JavaScript?',
    options: [
      'let and const are block-scoped, var is function-scoped',
      'They are all the same',
      'var is block-scoped, let and const are function-scoped',
      'There is no difference'
    ],
    correctAnswer: 0,
    explanation: 'let and const are block-scoped, meaning they are only accessible within the block they are declared. var is function-scoped, meaning it is accessible throughout the entire function.',
    difficulty: 'easy',
    technology: 'JavaScript',
    questionLength: 'medium',
    tags: ['variables', 'scope', 'fundamentals']
  },
  {
    topic: 'Closures',
    question: 'What is a closure in JavaScript?',
    options: [
      'A function that has access to variables in its outer scope',
      'A way to close a function',
      'A method to hide variables',
      'A type of loop'
    ],
    correctAnswer: 0,
    explanation: 'A closure is a function that has access to variables in its outer (enclosing) lexical scope, even after the outer function has returned.',
    difficulty: 'medium',
    technology: 'JavaScript',
    questionLength: 'short',
    tags: ['closures', 'functions', 'scope']
  },
  {
    topic: 'Event Loop',
    question: 'What is the event loop in JavaScript?',
    options: [
      'A mechanism that handles asynchronous operations',
      'A type of loop statement',
      'A way to handle events',
      'A debugging tool'
    ],
    correctAnswer: 0,
    explanation: 'The event loop is a mechanism that allows JavaScript to perform non-blocking operations by offloading operations to the system kernel whenever possible.',
    difficulty: 'hard',
    technology: 'JavaScript',
    questionLength: 'medium',
    tags: ['event-loop', 'asynchronous', 'advanced']
  },
  {
    topic: 'Promises',
    question: 'What does Promise.resolve() return?',
    options: [
      'A resolved promise',
      'A rejected promise',
      'An error',
      'Nothing'
    ],
    correctAnswer: 0,
    explanation: 'Promise.resolve() returns a Promise object that is resolved with the given value.',
    difficulty: 'medium',
    technology: 'JavaScript',
    questionLength: 'short',
    tags: ['promises', 'asynchronous']
  },
  {
    topic: 'Arrow Functions',
    question: 'What is the main difference between arrow functions and regular functions?',
    options: [
      'Arrow functions do not have their own this binding',
      'Arrow functions cannot be used as constructors',
      'Both A and B',
      'There is no difference'
    ],
    correctAnswer: 2,
    explanation: 'Arrow functions do not have their own this binding and cannot be used as constructors. They inherit this from the enclosing scope.',
    difficulty: 'medium',
    technology: 'JavaScript',
    questionLength: 'medium',
    tags: ['arrow-functions', 'functions']
  },
  // React Questions
  {
    topic: 'Components',
    question: 'What is a React component?',
    options: [
      'A reusable piece of UI',
      'A JavaScript function',
      'A HTML element',
      'A CSS class'
    ],
    correctAnswer: 0,
    explanation: 'A React component is a reusable piece of UI that can be composed together to build complex user interfaces.',
    difficulty: 'easy',
    technology: 'React',
    questionLength: 'short',
    tags: ['components', 'basics']
  },
  {
    topic: 'Hooks',
    question: 'What is useState hook used for?',
    options: [
      'To manage state in functional components',
      'To create side effects',
      'To fetch data',
      'To style components'
    ],
    correctAnswer: 0,
    explanation: 'useState is a React hook that allows you to add state to functional components.',
    difficulty: 'easy',
    technology: 'React',
    questionLength: 'short',
    tags: ['hooks', 'state', 'basics']
  },
  {
    topic: 'Props',
    question: 'What are props in React?',
    options: [
      'Properties passed to components',
      'Internal state of components',
      'Methods of components',
      'CSS styles'
    ],
    correctAnswer: 0,
    explanation: 'Props (short for properties) are read-only attributes passed from parent components to child components.',
    difficulty: 'easy',
    technology: 'React',
    questionLength: 'short',
    tags: ['props', 'basics']
  },
  {
    topic: 'useEffect',
    question: 'When does useEffect run?',
    options: [
      'After every render by default',
      'Only once on mount',
      'Never',
      'Only on state changes'
    ],
    correctAnswer: 0,
    explanation: 'useEffect runs after every render by default, but you can control when it runs using the dependency array.',
    difficulty: 'medium',
    technology: 'React',
    questionLength: 'medium',
    tags: ['hooks', 'useEffect', 'side-effects']
  },
  {
    topic: 'Virtual DOM',
    question: 'What is the Virtual DOM?',
    options: [
      'A JavaScript representation of the real DOM',
      'A faster version of the DOM',
      'A database',
      'A server'
    ],
    correctAnswer: 0,
    explanation: 'The Virtual DOM is a JavaScript representation of the real DOM that React uses to optimize updates.',
    difficulty: 'medium',
    technology: 'React',
    questionLength: 'short',
    tags: ['virtual-dom', 'performance']
  },
  {
    topic: 'Context API',
    question: 'What is React Context used for?',
    options: [
      'To share data across components without prop drilling',
      'To style components',
      'To handle events',
      'To create routes'
    ],
    correctAnswer: 0,
    explanation: 'React Context provides a way to pass data through the component tree without having to pass props down manually at every level.',
    difficulty: 'medium',
    technology: 'React',
    questionLength: 'short',
    tags: ['context', 'state-management']
  },
  {
    topic: 'Keys in Lists',
    question: 'Why do we need keys in React lists?',
    options: [
      'To help React identify which items have changed',
      'To style list items',
      'To sort items',
      'They are not needed'
    ],
    correctAnswer: 0,
    explanation: 'Keys help React identify which items have changed, been added, or removed, enabling efficient updates.',
    difficulty: 'easy',
    technology: 'React',
    questionLength: 'short',
    tags: ['lists', 'performance', 'basics']
  },
  {
    topic: 'Conditional Rendering',
    question: 'What is conditional rendering in React?',
    options: [
      'Rendering different UI based on conditions',
      'Rendering components conditionally',
      'Both A and B',
      'None of the above'
    ],
    correctAnswer: 2,
    explanation: 'Conditional rendering allows you to render different UI elements or components based on certain conditions.',
    difficulty: 'easy',
    technology: 'React',
    questionLength: 'short',
    tags: ['rendering', 'basics']
  },
  {
    topic: 'Higher Order Components',
    question: 'What is a Higher Order Component (HOC)?',
    options: [
      'A function that takes a component and returns a new component',
      'A component with higher priority',
      'A component that renders other components',
      'A type of hook'
    ],
    correctAnswer: 0,
    explanation: 'A Higher Order Component is a function that takes a component and returns a new component with additional functionality.',
    difficulty: 'hard',
    technology: 'React',
    questionLength: 'medium',
    tags: ['hoc', 'patterns', 'advanced']
  },
  {
    topic: 'Memoization',
    question: 'What is React.memo used for?',
    options: [
      'To memoize functional components',
      'To create memo hooks',
      'To store data',
      'To handle events'
    ],
    correctAnswer: 0,
    explanation: 'React.memo is a higher-order component that memoizes the result of a component, preventing unnecessary re-renders.',
    difficulty: 'medium',
    technology: 'React',
    questionLength: 'short',
    tags: ['performance', 'optimization']
  }
];

async function seedQuestions() {
  try {
    console.log('🔌 Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB\n');

    // Create modules
    console.log('📚 Creating modules...\n');
    const createdModules = {};
    
    for (const moduleData of sampleModules) {
      let module = await Module.findOne({ moduleNumber: moduleData.moduleNumber });
      
      if (!module) {
        module = await Module.create(moduleData);
        console.log(`✅ Created module: ${module.title} (Module ${module.moduleNumber})`);
      } else {
        console.log(`⏭️  Module ${module.moduleNumber} already exists, skipping...`);
      }
      
      createdModules[moduleData.category] = createdModules[moduleData.category] || [];
      createdModules[moduleData.category].push(module);
    }

    console.log('\n📝 Creating questions...\n');

    let created = 0;
    let skipped = 0;

    for (const questionData of sampleQuestions) {
      try {
        // Find matching module
        const category = questionData.technology === 'JavaScript' ? 'JavaScript' : 'React';
        const module = createdModules[category]?.[0] || createdModules[category]?.[questionData.technology === 'JavaScript' ? 0 : 1];
        
        if (!module) {
          console.error(`❌ No module found for category: ${category}`);
          continue;
        }

        // Check if question already exists
        const existingQuestion = await Question.findOne({ 
          question: questionData.question,
          module: module._id
        });
        
        if (existingQuestion) {
          console.log(`⏭️  Question already exists, skipping...`);
          skipped++;
          continue;
        }

        // Create question
        const question = await Question.create({
          ...questionData,
          module: module._id
        });

        // Update module question count
        await Module.findByIdAndUpdate(module._id, {
          $inc: { totalQuestions: 1 }
        });

        console.log(`✅ Created question: ${questionData.topic} (${questionData.difficulty})`);
        created++;
      } catch (error) {
        console.error(`❌ Error creating question:`, error.message);
      }
    }

    console.log('\n📊 Summary:');
    console.log(`   ✅ Created: ${created} questions`);
    console.log(`   ⏭️  Skipped: ${skipped} questions (already exist)`);
    console.log(`   📝 Total: ${sampleQuestions.length} questions\n`);

    console.log('✅ Seeding completed successfully!');
    
  } catch (error) {
    console.error('❌ Error seeding questions:', error);
  } finally {
    await mongoose.connection.close();
    console.log('🔌 MongoDB connection closed');
    process.exit(0);
  }
}

// Run the seed function
seedQuestions();

