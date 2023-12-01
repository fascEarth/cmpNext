const IPCalc = require('ip-subnet-calculator');

function calculateIPRanges(gatewayCIDR) {
    const [ipAddress, subnet] = gatewayCIDR.split('/');
  const subnetMask = parseInt(subnet, 10);
  const ipOctets = ipAddress.split('.').map(Number);

  // Calculate the number of IPs in the subnet based on the subnet mask
  const numberOfIPs = Math.pow(2, 32 - subnetMask);

  // Convert IP address to a 32-bit integer
  const ipInt = ipOctets.reduce((acc, val) => (acc << 8) + val, 0);

  // Calculate the network address
  const networkAddress = ipInt & ((-1 << (32 - subnetMask)));

  // Calculate the start and end IP addresses for the given CIDR block within the network
  const startIP = networkAddress + 1;
  const endIP = networkAddress + numberOfIPs - 2;

  // Convert back to IP format
  const startIPOctets = [(startIP >> 24) & 0xff, (startIP >> 16) & 0xff, (startIP >> 8) & 0xff, startIP & 0xff].join('.');
  const endIPOctets = [(endIP >> 24) & 0xff, (endIP >> 16) & 0xff, (endIP >> 8) & 0xff, endIP & 0xff].join('.');

  return { startIP: startIPOctets, endIP: endIPOctets };
}

export default calculateIPRanges;
