const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const User = require('./models/User');

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/quizapp';

// Sample users data
const sampleUsers = [
  {
    name: 'John Doe',
    email: 'john.doe@example.com',
    password: 'password123',
    role: 'student',
    profile: {
      jobRole: 'Frontend Developer',
      experience: '3-5 years',
      technologyStack: ['JavaScript', 'React', 'TypeScript'],
      modules: [],
      topics: ['Event Loop', 'Closures', 'React Hooks']
    },
    subscription: {
      type: 'premium',
      startDate: new Date(),
      endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
      isActive: true
    }
  },
  {
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    password: 'password123',
    role: 'student',
    profile: {
      jobRole: 'Full Stack Developer',
      experience: '5-10 years',
      technologyStack: ['JavaScript', 'React', 'Node.js', 'TypeScript'],
      modules: [],
      topics: ['Async Patterns', 'React Patterns', 'Performance']
    },
    subscription: {
      type: 'enterprise',
      startDate: new Date(),
      endDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000), // 90 days
      isActive: true
    }
  },
  {
    name: 'Bob Johnson',
    email: 'bob.johnson@example.com',
    password: 'password123',
    role: 'student',
    profile: {
      jobRole: 'React Developer',
      experience: '1-3 years',
      technologyStack: ['React', 'JavaScript'],
      modules: [],
      topics: ['React Hooks', 'Context API']
    },
    subscription: {
      type: 'free',
      startDate: new Date(),
      endDate: null,
      isActive: true
    }
  },
  {
    name: 'Alice Williams',
    email: 'alice.williams@example.com',
    password: 'password123',
    role: 'student',
    profile: {
      jobRole: 'Backend Developer',
      experience: '0-1 years',
      technologyStack: ['JavaScript', 'Node.js'],
      modules: [],
      topics: ['Async Programming', 'Promises']
    },
    subscription: {
      type: 'free',
      startDate: new Date(),
      endDate: null,
      isActive: true
    }
  },
  {
    name: 'Admin User',
    email: 'admin@quizapp.com',
    password: 'admin123',
    role: 'admin',
    profile: {
      jobRole: 'Other',
      experience: '10+ years',
      technologyStack: ['JavaScript', 'React', 'Node.js'],
      modules: [],
      topics: []
    },
    subscription: {
      type: 'enterprise',
      startDate: new Date(),
      endDate: null,
      isActive: true
    }
  }
];

async function seedUsers() {
  try {
    console.log('🔌 Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB\n');

    // Clear existing users (optional - comment out if you want to keep existing users)
    // await User.deleteMany({});
    // console.log('🗑️  Cleared existing users\n');

    console.log('👥 Creating sample users...\n');

    let created = 0;
    let skipped = 0;

    for (const userData of sampleUsers) {
      try {
        // Check if user already exists
        const existingUser = await User.findOne({ email: userData.email });
        
        if (existingUser) {
          console.log(`⏭️  User ${userData.email} already exists, skipping...`);
          skipped++;
          continue;
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(userData.password, salt);

        // Create user
        const user = await User.create({
          ...userData,
          password: hashedPassword
        });

        console.log(`✅ Created user: ${user.name} (${user.email})`);
        console.log(`   Role: ${user.role}`);
        console.log(`   Subscription: ${user.subscription.type}`);
        console.log(`   Profile: ${user.profile.jobRole} - ${user.profile.experience}\n`);
        created++;
      } catch (error) {
        console.error(`❌ Error creating user ${userData.email}:`, error.message);
      }
    }

    console.log('\n📊 Summary:');
    console.log(`   ✅ Created: ${created} users`);
    console.log(`   ⏭️  Skipped: ${skipped} users (already exist)`);
    console.log(`   📝 Total: ${sampleUsers.length} users\n`);

    console.log('🔐 Login Credentials:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    sampleUsers.forEach(user => {
      console.log(`   Email: ${user.email}`);
      console.log(`   Password: ${user.password}`);
      console.log(`   Role: ${user.role}`);
      console.log('   ──────────────────────────────────────────────────────');
    });
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    console.log('✅ Seeding completed successfully!');
    
  } catch (error) {
    console.error('❌ Error seeding users:', error);
  } finally {
    await mongoose.connection.close();
    console.log('🔌 MongoDB connection closed');
    process.exit(0);
  }
}

// Run the seed function
seedUsers();


