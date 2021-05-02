async function morph(str) {
  const appID = "9486ef140a8d2dfa29ad0ae7a6ee39fb5cf73f87aa63611211b74ef38edd5a1b"　//形態素解析API
  let postData = {app_id:appID,sentence:str,info_filter:"form|read"};
  let ans = await fetch('https://labs.goo.ne.jp/api/morph',{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(postData),
  })
  .then(response => response.json())
  .then(data => data.word_list[0]);
  return ans
};

function haikuLength(str) {
  let ary = str.match(/ャ|ュ|ョ/g);
  if (ary == null) {
    return str.length;
  } else {
    return str.length - ary.length;
  };
};
//575に分割
async function parce(str) {
  let ary = await morph(str);
  let kami="",naka="",simo="",kami_y="",naka_y="",simo_y="";

  while (haikuLength(kami_y) < 5 && ary.length >0) {
    let word = ary.shift();
    kami += word[0];
    kami_y += word[1];
  };
  while (haikuLength(naka_y) < 7 && ary.length >0) {
    let word = ary.shift();
    naka += word[0];
    naka_y += word[1];
  };
  while (ary.length >0) {
    let word = ary.shift();
    simo += word[0];
    simo_y += word[1];
  };
  
  if (haikuLength(kami_y)==5 && haikuLength(naka_y) == 7 && haikuLength(simo_y)==5) {
    let json = {
      haiku:[
        kami,naka,simo
      ],
      read:[
        kami_y,naka_y,simo_y
      ]
    };
    return json
  } else {
    return null;
  };
};