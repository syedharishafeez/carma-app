const crypto = require("crypto");

const encrypt = (valueToBeEncrypt) => {
    // AES 256 encryption algorithm
    const algorithm = "aes-256-cbc";
    const key = crypto.scryptSync("carma-password", "salt", 32);
    const iv = Buffer.alloc(16, 0);

    const cipher = crypto.createCipheriv(algorithm, key, iv);
    const encrypted =
    cipher.update(valueToBeEncrypt, "utf8", "hex") +
    cipher.final("hex");
    return encrypted
}

const decrypt = (valueToDecrypt) => {
    const algorithm = "aes-256-cbc";
    const key = crypto.scryptSync("carma-password", "salt", 32);
    const iv = Buffer.alloc(16, 0);
    const passwordForDecrypt = valueToDecrypt;
    const decipher = crypto.createDecipheriv(algorithm, key, iv);
    const decrypted =
      decipher.update(passwordForDecrypt, "hex", "utf8") + decipher.final("utf8");
    return decrypted;
  }
module.exports = {encrypt, decrypt}