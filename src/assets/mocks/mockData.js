export const mockData = (count) => {
  const mockData = [];

  for (let i = 1; i <= count; i++) {
    mockData.push({
      code: `TST00${i}`,
      description: `Description ${i}`,
      testType: `Type 0${i}`,
      amount: `RS ${Math.floor(Math.random() * 1000)}`,
      no: `00${i}`,
      type: `Ray ${i}`,
      xrayFilm: `film ${i}`,
      remarks: `remark ${i}`,
      result: `result ${i}`,
      unit: `unit ${i}`,
      status: `status ${i}`,
      package: `package ${i}`,
      email: `user${i}@gmail.com`,
      role: `Role ${i}`,
    });
  }

  return mockData;
};
