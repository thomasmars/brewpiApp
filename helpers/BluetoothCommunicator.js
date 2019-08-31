import BluetoothSerial from "react-native-bluetooth-serial-next";

const getReadData = async (timeout) => {
  return new Promise(resolve => {
    setTimeout(async () => {
      // Initiate tilt listener
      resolve(await BluetoothSerial.readFromDevice());
    }, timeout ? timeout : 0);
  });
};

const sendMessageWithAnswer = async (message, params = {}) => {
  let data = await BluetoothSerial.readFromDevice();
  let writeData = {
    message: message,
    ...params,
  };
  await BluetoothSerial.write(JSON.stringify(writeData));

  let retryCount = 0;
  while (!data && retryCount < 10) {
    data = await getReadData(500);
    retryCount += 1;
  }

  if (!data) {
    return false;
  }

  return JSON.parse(data);
};

module.exports = {
  sendMessageWithAnswer,
};
