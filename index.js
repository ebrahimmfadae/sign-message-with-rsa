import crypto, { privateEncrypt, publicDecrypt } from "crypto";
import { promisify } from "util";

console.log("Starting app...\n");

const { privateKey, publicKey } = await promisify(crypto.generateKeyPair)(
  "rsa",
  {
    modulusLength: 512,
  }
);

console.log(privateKey.export({ format: "pem", type: "pkcs1" }));
console.log(publicKey.export({ format: "pem", type: "pkcs1" }));

const cipher = privateEncrypt(
  privateKey,
  Buffer.from("This message is classified")
);
const cipherBase64 = cipher.toString("base64");
console.log("Encrypted message:", `\x1b[31m${cipherBase64}\x1b[0m`);
const plain = publicDecrypt(publicKey, Buffer.from(cipherBase64, "base64"));
console.log("Decrypted message:", `\x1b[32m${plain.toString("ascii")}\x1b[0m`);
