const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/user');

const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');
// ROUTE GET api/users
// desc test route
//acces public 
router.get('/', auth, async (req, res) => {
    try {
        console.log('user before get auth')
        const user = await User.findById(req.user.id).select('-password');
        console.log('user after get auth')

        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }


})

// @route    POST api/auth
// @desc     Authenticate user & get token
// @access   Public
router.post('/', [
    check('email', 'Por favor, incluye un correo electrónico válido').isEmail(),
    check('password', 'Se requiere contraseña').exists()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const  { email, password } = req.body;

    try {
        console.log('before get user in login')
       
        let user = await User.findOne({ email });
        console.log('user', user)
     
        if (!user) {
            return res
                .status(400)
                .json({ errors: [{ msg: 'Credenciales inválidas' }] });
        }
       
    

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res
                .status(400)
                .json({ errors: [{ msg: 'Credenciales inválidas' }] });
        }

        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(
            payload,
            config.get('jwtSecret'),
            { expiresIn: '5 days' },
            (err, token) => {
                if (err) throw err;
                res.json({ token });
            }
        );
    } catch (err) {
        console.error('error post', err.message);
        res.status(500).send('Error del servidor');
    }
});


module.exports = router;