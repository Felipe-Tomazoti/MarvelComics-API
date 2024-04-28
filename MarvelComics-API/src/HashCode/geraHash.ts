import {md5} from "./md5.min"; 

const privateKey = "0d4efc5ba4375613217a619dacf7c4840170f92b";
const publicKey = "7532d6c26516fb750db9578b9817cd8c";
const ts = Math.floor(Date.now() / 1000);

function createHash() {
    const myHash = ts + privateKey + publicKey;
    const hashMessage = md5(myHash);
    return hashMessage;
}

export {publicKey, ts, createHash}
