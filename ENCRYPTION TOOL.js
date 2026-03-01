// ENCRYPTION TOOL - Run this in browser console

function xorCipher(text, key) {
    let result = '';
    for (let i = 0; i < text.length; i++) {
        result += String.fromCharCode(text.charCodeAt(i) ^ key.charCodeAt(i % key.length));
    }
    return result;
}

function encryptMessage(message, password) {
    const encrypted = xorCipher(message, password);
    return btoa(encrypted);
}

// Generate hash for password
async function generateHash(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// Example usage:
const myPassword = "password";
const myMessage = `secret`;

console.log("=== YOUR ENCRYPTED DATA ===");
console.log("\nPassword Hash:");
generateHash(myPassword).then(hash => console.log(hash));

console.log("\nEncrypted Message:");
console.log(encryptMessage(myMessage, myPassword));