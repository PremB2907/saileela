const db = require('../config/db');

// Ganeshotsav 2026 Schedule Data for Mumbai Central Cha Raja
const scheduleData = [
  {
    day: 1,
    title: 'Padya Pujan & Mandal Sankalp Sohala',
    date: 'Day 1 (Ganeshotsav Countdown)',
    distance_km: 0,
    halt_location: 'BIT Chawl Central Ground, Mumbai Central',
    facilities: ['Vedic Mantra Chanting', 'Floral Arch Decoration', 'Modak Prasad Distribution'],
    emergency_contact: '+91 98765 11111'
  },
  {
    day: 2,
    title: 'Grand Aagman Sohala (Grand Arrival Procession)',
    date: 'Day 2 (Aagman Day)',
    distance_km: 5,
    halt_location: 'Belasis Road to BIT Chawl Mandap',
    facilities: ['Nashik Dhol & Tasha Pathak', 'Gulal & Flower Rain', 'Security & Crowd Management'],
    emergency_contact: '+91 98765 22222'
  },
  {
    day: 3,
    title: 'Pratishthapana & First Maha Aarti (CURRENT HALT)',
    date: 'Day 3 (Ganesh Chaturthi)',
    distance_km: 0,
    halt_location: 'Mumbai Central Cha Raja Royal Mandap',
    facilities: ['Morning 8:00 AM Aarti', 'VIP & Bhavik Pass Queue', 'Evening 8:00 PM Maha Aarti'],
    emergency_contact: '+91 98765 33333'
  },
  {
    day: 4,
    title: 'Modak & Annadan Mahaprasad Day 1',
    date: 'Day 4',
    distance_km: 0,
    halt_location: 'BIT Chawl Seva Ground',
    facilities: ['10,000+ Hot Mahaprasad Meals', 'Clean Drinking Water Booths', 'Medical First Aid Desk'],
    emergency_contact: '+91 98765 44444'
  },
  {
    day: 5,
    title: 'Cultural & Lavani-Bhajan Sandhya',
    date: 'Day 5',
    distance_km: 0,
    halt_location: 'Cultural Stage, BIT Chawl Complex',
    facilities: ['Traditional Folk Performances', 'Karyakarta Assistance Desk', 'Wheelchair Support'],
    emergency_contact: '+91 98765 55555'
  },
  {
    day: 6,
    title: 'Special Health & Blood Donation Camp',
    date: 'Day 6',
    distance_km: 0,
    halt_location: 'Community Hall, Mumbai Central',
    facilities: ['Free Health Checkup', 'Blood Donation Drive', 'Devotee Welfare Desk'],
    emergency_contact: '+91 98765 66666'
  },
  {
    day: 7,
    title: 'Gauri Ganpati Visarjan & Evening Aarti',
    date: 'Day 7',
    distance_km: 0,
    halt_location: 'Royal Mandap Stage',
    facilities: ['Special Flower Decoration', 'Free Prasad Packets', '24/7 Security Patrol'],
    emergency_contact: '+91 98765 77777'
  },
  {
    day: 8,
    title: 'Grand Chappan Bhog & Special Deepotsav',
    date: 'Day 8',
    distance_km: 0,
    halt_location: 'Mumbai Central Cha Raja Garbhagriha',
    facilities: ['1008 Diya Deepotsav', 'VIP VIP Pass Entry', 'Live Camera Stream Desk'],
    emergency_contact: '+91 98765 88888'
  },
  {
    day: 9,
    title: 'Mahasattra & Senior Citizen Darshan Seva',
    date: 'Day 9',
    distance_km: 0,
    halt_location: 'Mandap Main Entrance',
    facilities: ['Priority Senior Queue', 'E-Rickshaw Shuttle', 'Emergency Ambulance'],
    emergency_contact: '+91 98765 99999'
  },
  {
    day: 10,
    title: 'Anant Chaturdashi Uttarpuja & Visarjan Miravand',
    date: 'Day 10 (Grand Farewell)',
    distance_km: 12,
    halt_location: 'Mumbai Central to Girgaon Chowpatty',
    facilities: ['Grand Procession Chariot', 'Safety Lifejackets & Lifeguard Team', 'Girgaon Visarjan Seva'],
    emergency_contact: '+91 98765 00000'
  }
];

module.exports = {
  // Render Landing Page
  renderHomePage(req, res) {
    const status = db.getYatraStatus();
    res.render('index', {
      title: 'Mumbai Central Cha Raja 2026 | Belasis Road B.I.T. Chawl Sarvajanik Shri Ganeshotsav Mandal',
      activeTab: 'home',
      yatraStatus: status,
      scheduleData: scheduleData.slice(0, 4) // Show next 4 events on home
    });
  },

  // Render Schedule Page
  renderSchedulePage(req, res) {
    const status = db.getYatraStatus();
    res.render('schedule', {
      title: 'Ganeshotsav 2026 Event Schedule & Aarti Times | Mumbai Central Cha Raja',
      activeTab: 'schedule',
      yatraStatus: status,
      scheduleData
    });
  },

  // Live Status JSON API endpoint
  getLiveStatusApi(req, res) {
    const status = db.getYatraStatus();
    res.json({
      success: true,
      status
    });
  }
};
