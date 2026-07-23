const db = require('../config/db');

// Itinerary data for Shri Saileela Palkhi Yatra (Mumbai -> Shirdi Route)
const scheduleData = [
  {
    day: 1,
    title: 'Grand Departure - Gateway of India / Dadar Ground',
    date: 'Day 1 (Flag Off)',
    distance_km: 25,
    halt_location: 'Vashi Shiv Mandir Ground, Navi Mumbai',
    facilities: ['Morning Tea & Breakfast', 'Free Medical Camp', 'Night Mahaprasad'],
    emergency_contact: '+91 98765 11111'
  },
  {
    day: 2,
    title: 'Navi Mumbai to Panvel Highway Pass',
    date: 'Day 2',
    distance_km: 30,
    halt_location: 'Panvel Sai Baba Sansthan Temple',
    facilities: ['Mid-day Water Booth', 'Physiotherapy & Foot Care', 'Clean Drinking Water'],
    emergency_contact: '+91 98765 22222'
  },
  {
    day: 3,
    title: 'Ascent to Khopoli Ghat & Lonavala Foothills',
    date: 'Day 3',
    distance_km: 35,
    halt_location: 'Khopoli Municipal Ground',
    facilities: ['Energy Drink Booths', 'Emergency Ambulance', 'Mobile Charging Vans'],
    emergency_contact: '+91 98765 33333'
  },
  {
    day: 4,
    title: 'Pune Outskirts & Talegaon Junction (CURRENT HALT)',
    date: 'Day 4',
    distance_km: 40,
    halt_location: 'Talegaon Dabhade Palkhi Ground',
    facilities: ['Mahaprasad Lunch', 'Night Accommodation Tents', 'Doctors On Duty'],
    emergency_contact: '+91 98765 44444'
  },
  {
    day: 5,
    title: 'Chakan to Rajgurunagar Stretch',
    date: 'Day 5',
    distance_km: 32,
    halt_location: 'Rajgurunagar Ashram Shala',
    facilities: ['Snacks & Fruit Distribution', 'Security Patrol', 'Rest Tents'],
    emergency_contact: '+91 98765 55555'
  },
  {
    day: 6,
    title: 'Narayangaon & Manchar Valley',
    date: 'Day 6',
    distance_km: 28,
    halt_location: 'Narayangaon Mandi Parishad',
    facilities: ['Foot Relief Camp', '24/7 Ambulance', 'Sanitary Facilities'],
    emergency_contact: '+91 98765 66666'
  },
  {
    day: 7,
    title: 'Alephata to Sangamner Entrance',
    date: 'Day 7',
    distance_km: 35,
    halt_location: 'Sangamner Bypass Seva Camp',
    facilities: ['Mahaprasad Seva', 'Rain Coats & Gear', 'Police Escort'],
    emergency_contact: '+91 98765 77777'
  },
  {
    day: 8,
    title: 'Sangamner Town to Loni Junction',
    date: 'Day 8',
    distance_km: 24,
    halt_location: 'Loni Agriculture College Complex',
    facilities: ['Clean Restrooms', 'Physiotherapy Team', 'Cultural Bhajan Sandhya'],
    emergency_contact: '+91 98765 88888'
  },
  {
    day: 9,
    title: 'Babaleshwar to Rahata Border',
    date: 'Day 9',
    distance_km: 22,
    halt_location: 'Babaleshwar Mandir Ground',
    facilities: ['Palkhi Snan & Poojan', 'Full Meal Seva', 'Information Booth'],
    emergency_contact: '+91 98765 99999'
  },
  {
    day: 10,
    title: 'Grand Shirdi Entry Procession',
    date: 'Day 10 (Final Stretch)',
    distance_km: 14,
    halt_location: 'Shirdi Nagar Entrance Gate',
    facilities: ['Flower Shower Procession', 'Band & Lezim Squad', 'Devotee Welcome Hub'],
    emergency_contact: '+91 98765 00000'
  },
  {
    day: 11,
    title: 'Shirdi Sai Baba Samadhi Mandir Darshan & Mahaprasad',
    date: 'Day 11 (Purna Ahuti)',
    distance_km: 0,
    halt_location: 'Shirdi Sai Baba Temple Complex',
    facilities: ['VIP Pass Darshan', 'Kala Prasadam', 'Farewell Ceremony'],
    emergency_contact: '+91 98765 12345'
  }
];

module.exports = {
  // Render Landing Page
  renderHomePage(req, res) {
    const status = db.getYatraStatus();
    res.render('index', {
      title: 'Shri Saileela Palkhi Sohala 2026 | Official Pilgrimage Portal',
      activeTab: 'home',
      yatraStatus: status,
      scheduleData: scheduleData.slice(0, 4) // Show next 4 stops on home
    });
  },

  // Render Schedule Page
  renderSchedulePage(req, res) {
    const status = db.getYatraStatus();
    res.render('schedule', {
      title: 'Route Itinerary & Halt Map | Shri Saileela Palkhi 2026',
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
