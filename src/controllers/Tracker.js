const User = require('../models/User.model');
const Tracker = require('../models/Tracker.model');
const crypto = require('crypto'); 

exports.createTracker = async (req, resp) => {
    const { username, trackerName, toggleValue } = req.body;
    const user = await User.findOne({ username });
    
    if (user) {
        const userId = user._id;

        let uniqueLink = '';
        if (toggleValue) {
            const randomString = crypto.randomBytes(16).toString('hex');
            uniqueLink = `${req.protocol}://${req.get('host')}/tracker/${randomString}`;
        }

        // Create the tracker
        const tracker = new Tracker({
            trackerName,
            uniqueLink,
            members: [userId], // Add the creator to the members list
            currentMonthExpenses: [], // Initially, no expenses are associated
            history: [] // No history at the time of creation
        });

        try {
            await tracker.save();

            resp.status(201).json({
                success: true,
                message: 'Tracker created successfully',
                trackerId: tracker._id,
                uniqueLink,
            });
        } catch (err) {
            console.error(err);
            resp.status(500).json({
                success: false,
                message: 'Error creating tracker',
            });
        }
    } else {
        resp.status(404).json({ success: false, message: 'User not found' });
    }
};

