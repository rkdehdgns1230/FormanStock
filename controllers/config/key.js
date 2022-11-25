//배포할 때 process.env.NODE_ENV가 production이 되고 local에서는 development가 된다.
//이에 해당 환경변수를 통해 설정.
// 배포할 떄는 prod.js
// 개발할 때는 dev.js
if(process.env.NODE_ENV === 'production'){
    //Json형태로 prod.js의 module.exports 안에 있는 것들이 담김.
    module.exports = require('./prod');
} else{
    module.exports = require('./dev');
}