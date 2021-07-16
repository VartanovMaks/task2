const router = require('express').Router();
const { Op } = require('sequelize');
const db = require('../database/MySQL').getInstance();

router.get('/', async (req, res) => {
  const Student = db.getModel('Student');
  const { perPage = 20, page = 1, ...otherOption } = req.query;
  const offset = perPage * (page - 1);
  const where = _userQueryBuild(otherOption);

  // const studik = await Student.findOne({
  //   attributes: [
  //     'name',
  //     'age'
  //   ],
  //   where: {
  //     id: req.query.id
  //   }
  // });

  const students = await Student.findAll({
    where,
    raw: true,
    nest: true,
    limit: +perPage,
    offset
  });

  res.json(students);
});

module.exports = router;

function _userQueryBuild(queryOptions) {
  let query = {};

  if (queryOptions['age.gte']) {
    query = {
      ...query,
      age: {
        [Op.gte]: queryOptions['age.gte']
      }
    };
  }
  if (queryOptions['age.lte']) {
    query = {
      ...query,
      age: {
        [Op.lte]: queryOptions['age.lte']
      }
    };
  }
  if (queryOptions.name) {
    query = {
      ...query,
      name: {
        [Op.like]: queryOptions.name
      }
    };
  }

  return query;
}
