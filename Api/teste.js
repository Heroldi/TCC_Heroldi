import cry from'crypto-js';	

var x =  "Olá mundo";

var ciphertext = cry.AES.encrypt(x, 'secret key 123').toString();

console.log(ciphertext);

var bytes  = cry.AES.decrypt("u2fsdgvkx1+imw1lryy4jginlxidgxfix2dzrm7qano=", 'secret key 123');

console.log(bytes.toString(cry.enc.Utf8));