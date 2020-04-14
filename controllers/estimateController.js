const estimator = require('../src/estimator');

exports.estimatorJson = (req, res) => {
  const chain = ({ data, impact, severeImpact }) => {
    estimator.estimateCurrentlyInfected({ data, impact, severeImpact });
  };
  const {
    name,
    avgDailyIncomeInUSD,
    avgDailyIncomePopulation,
    avgAge,
    periodType,
    timeToElapse,
    reportedCases,
    totalHospitalBeds,
    population
  } = req.body;
  const data = {
    data: {
      region: {
        name,
        avgDailyIncomeInUSD,
        avgDailyIncomePopulation,
        avgAge
      },
      periodType,
      timeToElapse,
      reportedCases,
      totalHospitalBeds,
      population
    },
    impact: {},
    severeImpact: {}
  };
  console.log(population);
  res.json(chain(data));
};
