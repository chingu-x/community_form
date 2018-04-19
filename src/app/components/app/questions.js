import { countryEnum } from '../../../../db/enums';

const questions = [
    {
        name: 'email',
        type: 'email',
        required: true,
        description: 'Enter an email address we can use to contact you'
    },
    {
        name: 'first_name',
        type: 'text',
        required: true,
        description: 'Enter your first name'
    },
    {
        name: 'last_name',
        type: 'text',
        required: true,
        description: 'Enter your last name'
    },
    {
        name: 'gender',
        type: 'select',
        required: true,
        description: 'What is your gender?',
        options: ['Male', 'Female', 'Other', 'Prefer not to answer']
    },
    {
        name: 'country',
        type: 'select',
        required: true,
        description: 'What country are you coding from?',
        options: countryEnum
    },
    {
        name: 'coding_commitment',
        type: 'select',
        required: true,
        description: 'How committed are you to completing your coding goals?',
        options: [
            'I. Can\'t. Stop. Coding.',
            'I meet most of my coding goals',
            'I have been struggling to meet my coding goals',
            'I am not progressing as expected'
        ]
    },
    {
        name: 'experience_level',
        type: 'select',
        required: true,
        description: 'Where are you in your coding journey?',
        options: [
            'Just getting started',
            'I have the basics but have not completed any projects',
            'I have built some projects but want to build something more extensive',
            'I have built many projects but want to gain more experience',
            'I am a professional developer looking for new challenges',
        ]
    },
    {
        name: 'time_commitment',
        type: 'select',
        required: true,
        description: 'How many hours do you commit to learning programming each week',
        options: ['1-5', '5-10', '10-15', '20+']
    },
    {
        name: 'referral_source',
        type: 'select',
        required: true,
        description: 'Where did you hear about Chingu?',
        options: [
            'Chingu Member',
            'Medium',
            'Google',
            'Free Code Camp',
            'Twitter',
            'Youtube'
        ]
    },
    {
        name: 'chingu_referral',
        type: 'text',
        description: 'Which Chingu referred you?'
    },
    {
        name: 'interests',
        type: 'text',
        required: true,
        description: 'What are your three favorite interests?',
        placeholder: 'Coding, coding, coding'
    },
    {
        name: 'why_learning_is_hard',
        type: 'text',
        required: true,
        description: 'What is the hardest part about learning how to code?',
        placeholder: 'Imposter Syndrome, Time, Resources, Motivation...'
    },
    {
        name: 'coding_friends_count',
        type: 'number',
        required: true,
        description: 'How many people are you close with who are developers or learning coding?'
    },
    {
        name: 'background',
        type: 'text',
        required: true,
        description: 'What is your background (professional and / or educational?)',
        placeholder: 'Business, Journalism, Music, Philosophy...'
    },
    {
        name: 'proudest_project',
        type: 'url',
        required: true,
        description: 'Share a project (GitHub or hosted link) you have completed that you are most proud of'
    },
    {
        name: 'three_month_goal',
        type: 'text',
        description: 'What is your three month goal?'
    },
    {
        name: 'five_year_goal',
        type: 'text',
        description: 'What is your five year goal?'
    },
    {
        name: 'chingu_personal_value',
        type: 'text',
        description: 'Why do you think joining Chingu will be valuable to you? '
    },
    {
        name: 'dinner_guest',
        type: 'text',
        description: 'Given the choice of anyone in the world, whom would you want as a dinner guest? (bonus: why that person?)'
    },
    {
        name: 'greatest_accomplishment',
        type: 'text',
        description: 'What is the greatest accomplishment of your life?',
        placeholder: 'my daughter, finishing the front-end cert, graduating, leaving my last job'
    },
    {
        name: 'true_disagreement',
        type: 'text',
        description: 'What is something that is true that almost nobody agrees with you on?'
    }
];

module.exports = {
    questions
};
