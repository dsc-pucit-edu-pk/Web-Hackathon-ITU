import cron from 'node-cron';
import EventModel from '../models/Event.js';
import UserModel from '../models/User.js';
import { sendEmail } from '../utils/sendEmail.js';
import path from 'path';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config({ path: path.resolve(process.cwd(), '../.env') });

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(() => {
    console.log('Connected to MongoDB');
  }).catch((err) => {
    console.log('Error connecting to MongoDB', err);
  });

async function email() {
    console.log('Sending email');
    const events = await EventModel.find({status: 'active'});

    for (const event of events) {
        const users = await UserModel.find({tags: event.tags});
        for (const user of users) {
            const email = user.email;
            const subject = 'New Event';
            const text = `<p>A new event has been created that matches your interests. Check it out here: <a href="eventor.com/event/${event._id}">eventor.com/event/${event._id}</a></p>`;
            await sendEmail({email, subject, text});
        }
    }
}

cron.schedule('* * * * *', email);