const gTTS = require('gtts');

// Text you want to convert
const text = "Arre Avtar, sun le seedha muh pe... Tu woh purana, phata hua, kala pada rubber ka tukda hai jo koi bhi use karne ke baad naali mein phenk deta hai. Teri gaand aisi stretched aur baggy ho chuki hai ki andar haath daal ke pura mobile ghuma sakte hain aur battery low hone pe bhi vibrate mode laga sakte hain. Tu hamse gaand marwane ka addicted ho gaya hai na? To le — hum tere muh mein itna gehra pel denge ki tera gale tak bulge dikhne lagega. Har dhakke pe tera dimag reset ho jaayega, aankhein ghumne lagenge aur tu sirf “hmmph hmmph” karta reh jaayega. Kaam? Kaam toh door ki baat, saans lene ka bhi mann nahi karega. Tu humara walking talking fleshlight hai — bina switch off kiye roz 4-5 baar use karte hain, aur tu khud hi position change karke let jaata hai. Andar daalte hi teri body automatic mode mein aa jaati hai, muh khulta hai, aankhein band ho jaati hain aur gaand khud hilne lagti hai. Teri aukaat itni gandi hai ki public toilet ka flush bhi tujhe dekh ke sharma jaata hai. Ab jaa ke ise bol. Sunte hi uska pura din kharab ho jaayega, kaam pe dhyan nahi lagega aur chehra laal-pad jaayega.";

// Language (en = English, hi = Hindi)
const gtts = new gTTS(text, 'en');

// Save as MP3 file
gtts.save('voice.mp3', function (err, result) {
    if (err) throw err;
    console.log("Voice file saved as voice.mp3");
});