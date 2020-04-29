const fs = require('fs');

const tours = JSON.parse(fs.readFileSync('./dev-data/data/tours-simple.json'));

exports.checkId = (req, res, next, val) => {
    console.log(`Tour ID is ${val}`);
    if(req.params.id * 1 > tours.length) {
        return res.status(404).json({
            status: "fail",
            message: "Invalid ID"
        });
    };
    next();
}; // Middleware that works when a url param is used

exports.checkBody = (req, res, next) => {
    if (!req.body.name || !req.body.price) {
        return res.status(400).json({
            status: "fail",
            message: "Missing name or price"
        }); // 400 Means bad request (invalid)
    };
    next();
};

exports.getAllTours = (req, res) => {
    console.log(req.requestTime);
    res.status(200).json({
        status: 'success',
        results: tours.length,
        data: {
            tours
        }
    });
};

exports.getTour = (req, res) => {
    console.log(req.params);
    const id = req.params.id * 1;
    const tour = tours.find(el => el.id === id);

    res.status(200).json({
        status: 'success',
        data: {
            tour
        }
    });
};

exports.createTour = (req, res) => {
    // console.log(req.body);

    const newId = tours[tours.length - 1].id + 1;
    const newTour = Object.assign({id: newId}, req.body); // Object.assign allows us to make a new object from merging two existing objects

    tours.push(newTour);

    fs.writeFile('./dev-data/data/tours-simple.json', JSON.stringify(tours), err => {
        res.status(201).json({
            status: 'success',
            data: {
                tour: newTour
            }
        }); // 201 stands for Created
    });
};

exports.updateTour = (req, res) => {
    res.status(200).json({
        status: "success",
        data: {
            tour: '<Updated tour here...>'
        }
    });
};

exports.deleteTour = (req, res) => {
    res.status(204).json({
        status: "success",
        data: null
    }); // 204 stands for no content
};