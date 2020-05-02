const Tour = require('../models/tourModel');

// const tours = JSON.parse(fs.readFileSync('./dev-data/data/tours-simple.json'));

exports.getAllTours = async (req, res) => {
    try{
        // BUILD QUERY
        // 1) Filtering
        const queryObj = { ...req.query }; // Must be a copy of the object in order to not alter the original object
        const excludeFields = ['page', 'sort', 'limit', 'fields'];
        excludeFields.forEach(el => delete queryObj[el]);

        // 2) Advanced Filtering
        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`); // \b so that it only matches with the letters we want and not words that contain such letters. /g so that it goes through all occrances and not only one

        const query = Tour.find(JSON.parse(queryStr));

        // EXECUTE QUERY
        const tours = await query;

        // SEND REQUEST
        res.status(200).json({
            status: 'success',
            results: tours.length,
            data: {
                tours
            }
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        });
    }

};

exports.getTour = async (req, res) => {
    try{
        const tour = await Tour.findById(req.params.id);
        // Tour.findOne({ _id: req.params.id })

        res.status(200).json({
            status: 'success',
            data: {
                tour
            }
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        });
    }


};

exports.createTour = async (req, res) => {
    try {
        newTour = await Tour.create(req.body);
    
        res.status(201).json({
            status: 'success',
            data: {
                tour: newTour
            }
        }); // 201 stands for Created
    } catch (err) {
        res.status(400).json({
            status: "fail",
            message: err
        })
    }

};

exports.updateTour = async (req, res) => {
    try {
        const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
            new: true,  // Return the new document rather than the original
            runValidators: true  // Each time we update a certain document then the validators specified in the schema will run again
        });

        res.status(200).json({
            status: "success",
            data: {
                tour
            }
        });
    } catch (err) {
        res.status(404).json({
            status: "fail",
            message: err
        });
    }
};

exports.deleteTour = async (req, res) => {
    try {
        await Tour.findByIdAndDelete(req.params.id);

        res.status(204).json({
            status: "success",
            data: null
        }); // 204 stands for no content
    } catch (err) {
        res.status(404).json({
            status: "fail",
            message: err
        });
    }
};