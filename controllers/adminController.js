const db = require('../config/db');
const twilio = require('../config/twilio');

module.exports = {
  // Render Admin Dashboard
  async renderDashboard(req, res) {
    const passes = await db.getPasses();
    const donations = await db.getDonations();
    const yatraStatus = db.getYatraStatus();
    const logs = db.getLogs();

    const totalDonations = donations.reduce((sum, d) => sum + parseFloat(d.amount), 0);

    res.render('admin/dashboard', {
      title: 'Admin Control Panel | Shri Saileela Palkhi Seva Trust',
      activeTab: 'admin',
      passes,
      donations,
      yatraStatus,
      logs,
      totalDonations,
      totalPasses: passes.length,
      query: req.query
    });
  },

  // API to verify pass code (for scanner simulation)
  async verifyPassApi(req, res) {
    const { code } = req.body;
    if (!code) {
      return res.status(400).json({ success: false, message: 'Pass code is required.' });
    }

    const pass = await db.getPassByCode(code);
    if (!pass) {
      return res.json({ success: false, message: 'Invalid or unregistered pass code.' });
    }

    res.json({
      success: true,
      pass,
      message: `Pass Verified: ${pass.full_name} (${pass.batch})`
    });
  },

  // Trigger SMS Broadcast to all registered devotees via Twilio
  async sendBroadcastSMS(req, res) {
    try {
      const { message } = req.body;
      if (!message || message.trim().length === 0) {
        return res.redirect('/admin?broadcast_error=Message content cannot be empty.');
      }

      const passes = await db.getPasses();
      let sentCount = 0;

      for (const pass of passes) {
        if (pass.phone) {
          await twilio.sendSMS(pass.phone, `[SAI LEELA PALKHI ANNOUNCEMENT] ${message.trim()}`);
          sentCount++;
        }
      }

      db.addLog('BROADCAST', `SMS broadcast sent to ${sentCount} registered devotees.`);
      res.redirect(`/admin?broadcast_success=Announcement sent successfully to ${sentCount} registered devotees.`);
    } catch (err) {
      console.error('Broadcast error:', err);
      res.redirect('/admin?broadcast_error=Failed to dispatch broadcast messages.');
    }
  }
};
