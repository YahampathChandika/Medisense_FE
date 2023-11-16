export const mockTests = (count) => {
    const mockData = [];
  
    for (let i = 1; i <= count; i++) {
      mockData.push({
        code: `TST00${i}`,
        description: `Description ${i}`,
        testType: `Type 0${i}`,
        amount: `RS ${Math.floor(Math.random() * 1000)}.00`, // Generate random number between 0 and 1000
      });
    }
  
    return mockData;
  };
  