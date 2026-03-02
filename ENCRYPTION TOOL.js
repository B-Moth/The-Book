// ENCRYPTION TOOL - Paste in browser console

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

async function generateHash(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// Generate a new password-message pair
async function createSecret(password, message) {
    const hash = await generateHash(password);
    const encrypted = encryptMessage(message, password);
    
    console.log(`{
    hash: '${hash}',
    encrypted: '${encrypted}',
    password: '${password}' // Remove this line in production
},`);
}

// Example usage:
createSecret("4", "Next clue: Look under the red book");
