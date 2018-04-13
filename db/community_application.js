import { Schema, model } from 'mongoose';
import { isEmail } from 'validator';
import * as uniqueValidator from 'mongoose-unique-validator';

const CommunityApplicationSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: (value) => isEmail(value),
            msg: 'Invalid email'
        },
    },

    first_name: {
        type: String,
        required: true,
    },
    
});

// add unique validator plugin
// called during save() and throws useful error message on failure
CommunityApplicationSchema.plugin(uniqueValidator);

const CommunityApplication = model('community_application', CommunityApplicationSchema);

export   {
    CommunityApplicationSchema,
    CommunityApplication
};
