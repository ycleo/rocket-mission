const { getAllLaunches, addNewLaunch } = require('../../models/launches.model');

function httpGetAllLaunches (req, res) {
    return res.status(200).json(getAllLaunches());
}

function httpAddNewLaunch (req, res) {
    const launch = req.body;
    // check if any info is missing
    if (!launch.mission || !launch.rocket || !launch.launchDate || !launch.target) {
        return res.status(400).json({
            error: 'Missing required launch information',
        });
    }
    // check if the date match the format
    launch.launchDate = new Date(launch.launchDate);
    if (isNaN(launch.launchDate)) {
        return res.status(400).json({
            error: 'Invalid launch date',
        });
    } 

    addNewLaunch(launch);
    return res.status(201).json(launch);
}

module.exports = { 
    httpGetAllLaunches,
    httpAddNewLaunch,
};