const uniqueValidator = require('mongoose-unique-validator');
const { countryEnum } = require('./enums');
const { isEmail, isURL } = require('validator');
const mongoose = require('mongoose');

const CommunityApplicationSchema = new mongoose.Schema({
    // static questions present on all application forms
    email: {
        type: String,
        required: true,
        unique: true,
        set: (value) => value.toLowerCase(),
        validate: {
            validator: (value) => isEmail(value),
            msg: 'Invalid email'
        },
    },

    first_name: {
        type: String,
        required: true,
    },

    last_name: {
        type: String,
        required: true,
    },

    // What is your gender?
    gender: {
        type: String,
        required: true,
        enum: ['Male', 'Female', 'Other', 'Prefer not to answer']
    },

    // Where will you be coding from? ex. Spain
    country: {
        type: String,
        required: true,
        enum: [...countryEnum]
    },

    // How committed are you to completing your coding goals?
    coding_commitment: {
        type: String,
        required: true,
        enum: [
            'I. Can\'t. Stop. Coding.',
            'I meet most of my coding goals',
            'I have been struggling to meet my coding goals',
            'I am not progressing as expected'  
        ]
    },

    // where are you in your coding journey?
    experience_level: {
        type: String,
        required: true,
        enum: [
            'Just getting started',
            'I have the basics but have not completed any projects',
            'I have built some projects but want to build something more extensive',
            'I have built many projects but want to gain more experience',
            'I am a professional developer looking for new challenges',
        ]
    },

    // how many hours do you commit to learning programming each week
    time_commitment: {
        type: String,
        required: true,
        enum: ['1-5', '5-10', '10-15', '20+']
    },

    // Where did you hear about Chingu?
    referral_source: {
        type: String,
        required: true,
        enum: [
            'Medium',
            'Google',
            'Free Code Camp',
            'Twitter',
            'Youtube',
            'Chingu Member'
        ]
    },

    // Who referred you? [if user selects Chingu Member]
    chingu_referral: String,

    // What are you three favorite interests?
    interests: {
        type: String,
        required: true,
    },

    // What is the hardest part about learning how to code?
    // placeholder / hint text: E.g. Imposter Syndrome, Time, Resources, Motivation...
    why_learning_is_hard: {
        type: String,
        required: true
    },

    // How many people are you close with who are developers or learning coding?
    coding_friends_count: {
        type: Number,
        required: true
    },

    // What is your background?
    // placeholder / hint text: Business, Journalism, Music, Philosophy
    background: {
        type: String,
        required: true
    },

    // Share a project (GitHub or hosted link) you have completed that you are most proud of
    proudest_project: {
        type: String,
        required: true,
        validate: {
            validator: (value) => isURL(value),
            msg: 'Invalid url'
        }
    },

// OPTIONAL FIELDS

    // What is your three month goal?
    three_month_goal: String,

    // What is your five year goal?
    five_year_goal: String,

    // Why do you think joining Chingu will be valuable to you?   
    chingu_personal_value: String,

    // Given the choice of anyone in the world, whom would you want as a dinner guest? (optional: why that person?) 
    dinner_guest: String,

    // What is the greatest accomplishment of your life? (doesn't have to be crazy :) - past members have answered "my daughter", "finishing the front-end cert", "graduating", "leaving my last job") etc
    greatest_accomplishment: String,

    // What is something that is true that almost nobody agrees with you on?
    true_disagreemenet: String

});

// add unique field constraint validator plugin
// called during save() and throws useful error message on failure
CommunityApplicationSchema.plugin(uniqueValidator);

const CommunityApplication = mongoose.model(
    'CommunityApplication',
    CommunityApplicationSchema,
);

module.exports = {
    CommunityApplication,
    CommunityApplicationSchema,
};
