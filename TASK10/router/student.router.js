const router = require('express').Router();
const db = require('../database/MySQL').getInstance();

router.get('/', async (req, res) => {
  const Student = db.getModel('Student');
  const studik = await Student.findOne({
    attributes: [
      'name',
      'age'
    ],
    where: {
      id: req.query.id
    }
  });
  res.json(studik);
});

module.exports = router;
