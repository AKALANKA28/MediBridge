// data.js

export const patientFlowData = [
    { name: 'Week 1', ThisMonth: 300, LastMonth: 200 },
    { name: 'Week 2', ThisMonth: 350, LastMonth: 250 },
    { name: 'Week 3', ThisMonth: 400, LastMonth: 300 },
    { name: 'Week 4', ThisMonth: 450, LastMonth: 350 },
  ];
  
  export const peakTimesData = [
    { name: 'Mon', '6AM-12PM': 40, '12PM-6PM': 30, '6PM-12AM': 20 },
    { name: 'Tue', '6AM-12PM': 50, '12PM-6PM': 35, '6PM-12AM': 25 },
    { name: 'Wed', '6AM-12PM': 45, '12PM-6PM': 40, '6PM-12AM': 30 },
    { name: 'Thu', '6AM-12PM': 60, '12PM-6PM': 55, '6PM-12AM': 45 },
    { name: 'Fri', '6AM-12PM': 70, '12PM-6PM': 65, '6PM-12AM': 50 },
    { name: 'Sat', '6AM-12PM': 55, '12PM-6PM': 45, '6PM-12AM': 35 },
  ];
  
  export const equipmentData = [
    { name: 'MRI Scanner', type: 'Imaging', maintenanceDate: '12 Jan 2022', location: 'Radiology', status: 'Available' },
    { name: 'Ventilator Model ZX5000', type: 'Imaging', maintenanceDate: '12 Jan 2022', location: 'Radiology', status: 'Available' },
    { name: 'Ventilator Model ZX5000', type: 'Imaging', maintenanceDate: '12 Jan 2022', location: 'ICU Room 2', status: 'Under Maintenance' },
  ];
  
  export const equipmentAvailabilityData = [
    { name: 'In use', value: 55 },
    { name: 'Idle', value: 12 },
    { name: 'Unavailable', value: 29 },
    { name: 'Under Maintenance', value: 8 },
  ];
  