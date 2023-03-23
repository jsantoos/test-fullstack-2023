const os = require('os');
const { networkInterfaces } = os;

exports.getServerInfo = (req, res) => {
  const cpus = os.cpus();
  const totalMemory = os.totalmem();
  const freeMemory = os.freemem();
  const usedMemory = totalMemory - freeMemory;
  const disk = os.totalmem(); // Substitua por uma biblioteca que mostre informações do disco, como o 'diskusage'
  const ips = networkInterfaces();

  res.json({
    processador: cpus,
    memória: {
      total: totalMemory,
      livre: freeMemory,
      utilizada: usedMemory,
    },
    disco: disk, // Substitua por informações corretas do disco
    interfacesIP: ips,
  });
};
