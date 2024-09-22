document.addEventListener("DOMContentLoaded", function () {
    const logos = [
        'https://1000logos.net/wp-content/uploads/2020/09/D.C.-United-logo-1024x700.png',
        'https://1000logos.net/wp-content/uploads/2017/05/Walmart-Logo-1536x864.png',
        'https://static.wixstatic.com/media/ebb0f2_6dd08299bcf24193b4e91ecb5602df9c~mv2.png', // New logo link for Allstate
        'https://1000logos.net/wp-content/uploads/2021/04/Louis-Vuitton-logo.png',
        'https://1000logos.net/wp-content/uploads/2017/02/Holiday-Inn-logo-1024x736.png',
        'https://1000logos.net/wp-content/uploads/2018/04/Macys-Logo.png',
        'https://1000logos.net/wp-content/uploads/2021/11/TD-Bank-logo.png',
        'https://1000logos.net/wp-content/uploads/2017/06/United-Airlines-Logo-1024x640.png',
        'https://1000logos.net/wp-content/uploads/2018/05/Washington-Nationals-Logo-1024x640.png',
        'https://companieslogo.com/img/orig/DKS_BIG-a7f5d09e.png?t=1721281172',
        'https://1000logos.net/wp-content/uploads/2017/08/Wendys-Logo-768x255.png',
        'https://1000logos.net/wp-content/uploads/2017/08/Tory-Burch-Logo.png',
        'https://bloximages.newyork1.vip.townnews.com/loudountimes.com/content/tncms/assets/v3/editorial/e/74/e74e0f06-622b-11ee-8895-0ffb0a50a63e/651c7a55740a7.image.png?resize=1200%2C214',
        'https://1000logos.net/wp-content/uploads/2016/11/Chanel-logo-1024x576.png',
        'https://1000logos.net/wp-content/uploads/2023/04/Starbucks-logo-1536x864.png',
        'https://1000logos.net/wp-content/uploads/2024/06/Verizon-Logo-1536x864.png',
        'https://brfoodbank.org/wp-content/uploads/2014/04/PaneraBread-Primary-logo-1.png',
        'https://1000logos.net/wp-content/uploads/2018/06/Washington-Capitals-Logo.png',
        'https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Smoothie_King_logo.svg/296px-Smoothie_King_logo.svg.png?20181115142802',
        'https://1000logos.net/wp-content/uploads/2016/10/Burger-King_Logo-1536x922.png',
        'https://1000logos.net/wp-content/uploads/2020/06/MT-Bank-Logo-1024x576.png',
        'https://1000logos.net/wp-content/uploads/2016/10/Apple-Logo-1536x864.png',
        'https://1000logos.net/wp-content/uploads/2020/01/Swarovski-Logo.png',
        'https://i.pinimg.com/originals/4b/9f/a5/4b9fa51a834694b94aa8bb37c7ad0f98.png'
    ];

    let currentlyDisplayed = []; // Array for currently displayed logos
    let availableLogos = []; // Array for logos not currently displayed

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    function initializeLogos() {
        const logoSlots = document.querySelectorAll('.logo-slot');
        
        // Shuffle the logos and take the first 15 unique logos for display
        availableLogos = shuffle([...logos]);

        // Set the first 15 logos into currently displayed
        currentlyDisplayed = availableLogos.slice(0, 15);
        availableLogos = availableLogos.slice(15); // Remaining logos for replacement

        // Set initial logos in the grid
        logoSlots.forEach((slot, index) => {
            slot.style.backgroundImage = `url(${currentlyDisplayed[index]})`;
        });
    }

    function replaceOneLogo() {
        const logoSlots = document.querySelectorAll('.logo-slot');

        // Randomly select a slot to replace the logo
        const randomSlotIndex = Math.floor(Math.random() * logoSlots.length);
        const slot = logoSlots[randomSlotIndex];

        // If all logos from the available array are used, re-populate it
        if (availableLogos.length === 0) {
            availableLogos = logos.filter(logo => !currentlyDisplayed.includes(logo)); // Avoid duplicates
        }

        // Get a new logo from availableLogos
        const newLogo = availableLogos.pop(); // Remove from available logos
        const oldLogo = currentlyDisplayed[randomSlotIndex]; // Current logo in this slot

        // Switch the logo by preparing the new one before fade-in
        slot.classList.add('fade-out');

        slot.addEventListener('transitionend', function () {
            // Ensure new logo is set before fading in
            slot.style.backgroundImage = `url(${newLogo})`;
            slot.classList.remove('fade-out');
            slot.classList.add('fade-in');

            // Update currently displayed and available logos
            currentlyDisplayed[randomSlotIndex] = newLogo;
            availableLogos.unshift(oldLogo); // Put the old logo into available logos

            // Remove the fade-in class after the transition to avoid conflicts
            setTimeout(() => {
                slot.classList.remove('fade-in');
            }, 1000); // Matches the CSS transition duration

        }, { once: true }); // This ensures the event only runs once for this transition

        // Set a delay for the next replacement
        const randomDelay = Math.random() * (4000 - 2000) + 2000;
        setTimeout(replaceOneLogo, randomDelay); // Schedule next replacement
    }

    // Initialize logos and start the replacement cycle
    initializeLogos();
    setTimeout(replaceOneLogo, Math.random() * (2000 - 1000) + 1000); // Start replacements
});
