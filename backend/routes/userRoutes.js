const express = require('express'); 
const User = require('../models/User'); 
const bcrypt = require('bcryptjs'); 
const router = express.Router(); 
router.post('/register', async (req, res) =
const { name, email, password } = req.body; 
try { 
const userExists = await User.findOne({ email }); 
if (userExists) { 
return res.status(400).json({ msg: 'Usu rio j  existe' }); 
} 
const salt = await bcrypt.genSalt(10); 
const hashedPassword = await bcrypt.hash(password, salt); 
const newUser = new User({ 
name, 
email, 
password: hashedPassword 
}); 
await newUser.save(); 
res.status(201).json({ msg: 'Usu rio criado com sucesso!' }); 
} catch (error) { 
console.error(error.message); 
res.status(500).json({ msg: 'Erro no servidor' }); 
} 
}); 
module.exports = router; 
