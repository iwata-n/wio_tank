// ウィンドウの読み込み完了
window.onload = () => {
  // Milkcocoa
  const milkcocoa = new MilkCocoa('oniolavi4s.mlkcca.com');
  const ds = milkcocoa.dataStore('command');

  // APIのテストで確認したトークン
  const ACCESS_TOKEN = '1591919673ed0affc8d0298ca5fa1176';

  // ボタン
  const forward = document.getElementById('forward');
  const stop = document.getElementById('stop');
  const back = document.getElementById('back');
  const left = document.getElementById('left');
  const right = document.getElementById('right');

  // コマンド履歴
  const timeline = document.getElementById('timeline');

  // 各ボタンを押した時のコールバックを定義
  forward.addEventListener('click', (e) => {
    const sequence = [
      'https://iot.seeed.cc/v1/node/GroveI2CMotorDriverI2C1/dcmotor_speed/0/0?access_token=' + ACCESS_TOKEN,
      'https://iot.seeed.cc/v1/node/GroveI2CMotorDriverI2C1/dcmotor1_resume?access_token=' + ACCESS_TOKEN,
      'https://iot.seeed.cc/v1/node/GroveI2CMotorDriverI2C1/dcmotor1_change_direction?access_token=' + ACCESS_TOKEN,
      'https://iot.seeed.cc/v1/node/GroveI2CMotorDriverI2C1/dcmotor2_resume?access_token=' + ACCESS_TOKEN,
      'https://iot.seeed.cc/v1/node/GroveI2CMotorDriverI2C1/dcmotor_speed/255/255?access_token=' + ACCESS_TOKEN,
    ];
    sequence.reduce((promise, value) => {
      return promise.then(() => {
        return $.post({url: value}).then((data)=>console.log(data));
      });
    }, Promise.resolve())
    .then(ds.send({command: '前進'}));
  });

  stop.addEventListener('click', (e) => {
    const sequence = [
      'https://iot.seeed.cc/v1/node/GroveI2CMotorDriverI2C1/dcmotor_speed/0/0?access_token=' + ACCESS_TOKEN,
    ];
    sequence.reduce((promise, value) => {
      return promise.then(() => {
        return $.post({url: value}).then((data)=>console.log(data));
      });
    }, Promise.resolve())
    .then(ds.send({command: '停止'}));
  });

  back.addEventListener('click', (e) => {
    const sequence = [
      $.post({ url: 'https://iot.seeed.cc/v1/node/GroveI2CMotorDriverI2C1/dcmotor_speed/0/0?access_token=' + ACCESS_TOKEN }),
      $.post({ url: 'https://iot.seeed.cc/v1/node/GroveI2CMotorDriverI2C1/dcmotor1_resume?access_token=' + ACCESS_TOKEN }),
      $.post({ url: 'https://iot.seeed.cc/v1/node/GroveI2CMotorDriverI2C1/dcmotor2_resume?access_token=' + ACCESS_TOKEN }),
      $.post({ url: 'https://iot.seeed.cc/v1/node/GroveI2CMotorDriverI2C1/dcmotor2_change_direction?access_token=' + ACCESS_TOKEN }),
      $.post({ url: 'https://iot.seeed.cc/v1/node/GroveI2CMotorDriverI2C1/dcmotor_speed/255/255?access_token=' + ACCESS_TOKEN }),
    ];
    sequence.reduce((promise, value) => {
      return promise.then(() => {
        return $.post({url: value}).then((data)=>console.log(data));
      });
    }, Promise.resolve())
    .then(ds.send({command: '後退'}));
   });

  left.addEventListener('click', (e) => {
    const sequence = [
      'https://iot.seeed.cc/v1/node/GroveI2CMotorDriverI2C1/dcmotor_speed/0/0?access_token=' + ACCESS_TOKEN,
      'https://iot.seeed.cc/v1/node/GroveI2CMotorDriverI2C1/dcmotor1_resume?access_token=' + ACCESS_TOKEN,
      'https://iot.seeed.cc/v1/node/GroveI2CMotorDriverI2C1/dcmotor1_change_direction?access_token=' + ACCESS_TOKEN,
      'https://iot.seeed.cc/v1/node/GroveI2CMotorDriverI2C1/dcmotor2_resume?access_token=' + ACCESS_TOKEN,
      'https://iot.seeed.cc/v1/node/GroveI2CMotorDriverI2C1/dcmotor2_change_direction?access_token=' + ACCESS_TOKEN,
      'https://iot.seeed.cc/v1/node/GroveI2CMotorDriverI2C1/dcmotor_speed/255/255?access_token=' + ACCESS_TOKEN,
    ];
    sequence.reduce((promise, value) => {
      return promise.then(() => {
        return $.post({url: value}).then((data)=>console.log(data));
      });
    }, Promise.resolve())
    .then(ds.send({command: '左回転'}));
  });

  right.addEventListener('click', (e) => {
    const sequence = [
      'https://iot.seeed.cc/v1/node/GroveI2CMotorDriverI2C1/dcmotor_speed/0/0?access_token=' + ACCESS_TOKEN,
      'https://iot.seeed.cc/v1/node/GroveI2CMotorDriverI2C1/dcmotor1_resume?access_token=' + ACCESS_TOKEN,
      'https://iot.seeed.cc/v1/node/GroveI2CMotorDriverI2C1/dcmotor2_resume?access_token=' + ACCESS_TOKEN,
      'https://iot.seeed.cc/v1/node/GroveI2CMotorDriverI2C1/dcmotor_speed/255/255?access_token=' + ACCESS_TOKEN,
    ];
    sequence.reduce((promise, value) => {
      return promise.then(() => {
        return $.post({url: value}).then((data)=>console.log(data));
      });
    }, Promise.resolve())
    .then(ds.send({command: '右回転'}));
  });

  // Milkcocoaからデータが送られてきた時のコールバック
  ds.on('send', (data) => {
    console.log(data.value);
    // 送られてきたデータをコマンド履歴の一番最初に追加する
    const child = document.createElement('div');
    child.innerHTML = data.value['command']
    timeline.insertBefore(child, timeline.firstChild);
  })
}
