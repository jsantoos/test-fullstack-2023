const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config({ path: 'C:\\Users\\msn-j\\Starti\\v1\\.env'});

exports.createUser = async (req, res) => {
  try {
    const { name, email, password, userType } = req.body;
    const user = await User.create({ name, email, password, userType });
    res.status(201).json({ user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    
    if (!user) {
      return res.status(404).json({ error: 'Usuário ou senha incorreta' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Usuário ou senha incorreta' });
    }


    const payload = {
      id: user.id,
      username: user.username,
      userType: user.userType, // Inclua o tipo de usuário (admin ou user)
    };
    
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });


    // const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    //   expiresIn: '1h',
    // });

    userRole = user.userType;

    res.json({ token, userRole });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);

    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const user = await User.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    if (!user[0]) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    res.json({ success: 'Usuário atualizado com sucesso' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    res.json({ success: 'Usuário excluído com sucesso' });
  } catch (err){
        res.status(400).json({ error: err.message });
    }
};
