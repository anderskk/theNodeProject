import express from 'express';
import path from 'path';

import eventsGetRouter from '../src/api/event/routes/get_events';
import eventsPostRouter from '../src/api/event/routes/post_events';
import userPostRouter from '../src/api/user/routes/post_user';
import validateUserRouter from '../src/api/user/routes/get_validate_user';
import locationsGetRouter from '../src/api/location/routes/get_location';
import locationsPostRouter from '../src/api/location/routes/post_location';

const test = process.env.NODE_ENV === 'test'

const router = express.Router();

const isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated() || test)
        return next();
    res.redirect('/');
}

router.use('/api/user', userPostRouter);
router.use('/api/validateUser', validateUserRouter);

router.use('/api/events', isLoggedIn, eventsGetRouter);
router.use('/api/events', isLoggedIn, eventsPostRouter);

router.use('/api/locations', isLoggedIn, locationsGetRouter);
router.use('/api/locations', isLoggedIn, locationsPostRouter);

//to be deleted:
router.get('/login', (req, res) => {
    res.sendFile(path.dirname(process.mainModule.filename) + '/public/login.html');
});

router.get('/forgot', (req, res) => {
    res.sendFile(path.dirname(process.mainModule.filename) + '/public/forgot.html');
});

router.get('/signup', (req, res) => {
    res.sendFile(path.dirname(process.mainModule.filename) + '/public/signup.html');
});

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/login');
});

router.get('/', (req, res) => {
    res.redirect('/login')
})

export default router;
