// pages/api/data.js
const data = [
    { 
        power_status: 1, 
        host_name: 'Ubuntu-175998', 
        ip_address: '192.168.154.3', 
        specification:'2vCPU/4GB/20G',
        data_center:'Riyadh',
        os_details:'MSWindows 2022 x64',
        action:1
    },
    

    // ... additional data entries
  ];
  
  export default function handler(req, res) {
    const { start, length, search, sortColumn, sortDirection } = req.query;
  
    // Apply filters and search
    let filteredData = [...data];
    let filteredDataLength = filteredData.length;
  
    if (search) {
      filteredData = filteredData.filter((row) =>
        Object.values(row).some((value) =>
          String(value).toLowerCase().includes(search.toLowerCase())
        )
      );
      filteredDataLength = filteredData.length; // Update the filtered data length
    }
  
   
  
    // Sort the data
    if (sortColumn) {
      const column = sortColumn;
      const direction = sortDirection === 'asc' ? 1 : -1;
      filteredData.sort((a, b) => {
        if (a[column] < b[column]) return -1 * direction;
        if (a[column] > b[column]) return 1 * direction;
        return 0;
      });
    }
  
    // Paginate the data
    const slicedData = filteredData.slice(
      parseInt(start, 10),
      parseInt(start, 10) + parseInt(length, 10)
    );
  
    res.status(200).json({ data: slicedData, total: filteredDataLength });
  }
  