// ウィンドウの読み込み完了
window.onload = () => {
  // Milkcocoa
  const milkcocoa = new MilkCocoa('oniolavi4s.mlkcca.com');
  const ds = milkcocoa.dataStore('command');

  const ACCESS_TOKEN = 'ebbaec233567949b8accb33e80ccf3b3';


  // ボタン
  const forward = document.getElementById('forward');
  const back = document.getElementById('back');
  const left = document.getElementById('left');
  const right = document.getElementById('right');

  // コマンド履歴
  const timeline = document.getElementById('timeline');

  // 各ボタンを押した時のコールバックを定義
  forward.addEventListener('click', (e) => {
    // Milkcocoaを利用してデータを送信する
    $.ajax({
      url: 'https://iot.seeed.cc/v1/node/GroveI2CMotorDriverI2C0/dcmotor1_resume?access_token=' + ACCESS_TOKEN
    }).then(
      (data) => {
        console.log(data);
        ds.send({command: 'f'});
      }
    )

  });
  back.addEventListener('click', (e) => {
    ds.send({command: 'b'});
  });
  left.addEventListener('click', (e) => {
    ds.send({command: 'l'});
  });
  right.addEventListener('click', (e) => {
    ds.send({command: 'r'});
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
