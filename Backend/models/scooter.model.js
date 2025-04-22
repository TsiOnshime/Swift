const mongoose = require('mongoose');

const scooterSchema = new mongoose.Schema({
    qrCode: {
        type: String,
        required: true,
        unique: true,
    },
    location: {
        type: {
            type: String,
            enum: ['Point'],
            required: true,
        },
        coordinates: {
            type: [Number], // [longitude, latitude]
            required: true,
        },
    },
    batteryLevel: {
        type: Number,
        required: true,
        min: 0,
        max: 100,
    },
    isAvailable: {
        type: Boolean,
        default: true,
    },
    lastRentedAt: {
        type: Date,
    },
    rentalPricePerMinute: {
        type: Number,
        required: true,
    },
});

// Index for geospatial queries
scooterSchema.index({ location: '2dsphere' });

// Instance methods
scooterSchema.methods.markAsRented = function () {
    this.isAvailable = false;
    this.lastRentedAt = new Date();
    return this.save();
};

scooterSchema.methods.markAsReturned = function (newLocation) {
    this.isAvailable = true;
    this.location = newLocation;
    return this.save();
};

// Static methods
scooterSchema.statics.findAvailableScooters = function (location, maxDistance) {
    return this.find({
        isAvailable: true,
        location: {
            $near: {
                $geometry: {
                    type: 'Point',
                    coordinates: location,
                },
                $maxDistance: maxDistance,
            },
        },
    });
};

scooterSchema.statics.updateBatteryLevel = async function (qrCode, batteryLevel) {
    return this.findOneAndUpdate(
        { qrCode },
        { batteryLevel },
        { new: true }
    );
};

const Scooter = mongoose.model('Scooter', scooterSchema);

module.exports = Scooter;