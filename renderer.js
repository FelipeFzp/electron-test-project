const { usb, getDeviceList } = require('usb')
const tableify = require('tableify')

async function listSerialPorts() {
    try {
        const ports = getDeviceList();
        console.log('ports', ports);

        if (ports.length === 0) {
            document.getElementById('error').textContent = 'No ports discovered'
        } else {
            document.getElementById('error').textContent = ''
        }


        ports.forEach(p => {
            delete p.deviceDescriptor
        })
        tableHTML = tableify(ports)
        document.getElementById('ports').innerHTML = tableHTML
    } catch (error) {
        document.getElementById('error').textContent = err.message
    }
}

async function listPorts() {
    await listSerialPorts();
    setTimeout(listPorts, 2000);
}

listPorts()





document
.getElementById('list-ports')
.addEventListener('click', async () => {
    // Prompt user to select any serial port.
    const port = await navigator.serial.requestPort();
    console.log('port', port)
  });