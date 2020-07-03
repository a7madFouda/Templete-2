// Check if there is Local storage Color Option ====================

let mainColors = localStorage.getItem('color-option');

if (mainColors !== null) {

    document.documentElement.style.setProperty('--main-color', mainColors);

    // Remove Class Active From All Color List

    document.querySelectorAll('.colors-list li').forEach( element => {

        element.classList.remove('active');

        // Add Class Active To Checked Color

        if(element.dataset.color === mainColors) {

            element.classList.add('active');
        }
    })
}

// variable for random background ==================================

// RAndom background option

let backgroundOption = true;

// To Control Background Interval
let backgroundInterval;

// Check if there is Local storage background Option ================

let backgroundLocalItem = localStorage.getItem('background-option');

// check if random background local storage is not empty

if ( backgroundLocalItem !== null) {

    if (backgroundLocalItem === 'true') {

        backgroundOption = true;

    } else 

        backgroundOption = false;
}

// Remove Active Class From All Element

document.querySelectorAll('.random-backgrounds span').forEach(element => {

    element.classList.remove('active');
});

// Add Class Active To Checked One

if (backgroundLocalItem === 'true') {

    document.querySelector('.random-backgrounds .yes').classList.add('active');

} else {

    document.querySelector('.random-backgrounds .no').classList.add('active');
}

// Toggle spin class on icon ========================================

document.querySelector('.setting-icon i').onclick = function () {

    // Toggle Class Spin for Rotation
    this.classList.toggle('fa-spin');

    //Toggle Class for Open The Setting
    document.querySelector('.setting-box').classList.toggle('open');
}

// Switching Color ====================================================

const colorLi = document.querySelectorAll('.colors-list li');

// Loop Of All List Items
colorLi.forEach(li => {

    // Click On Every List Item
    li.addEventListener('click', (e) => {

        // Set color On Root
        document.documentElement.style.setProperty('--main-color', e.target.dataset.color);

        // Set Color On Local Storage

        localStorage.setItem('color-option', e.target.dataset.color);

        // function To Handle Active Class

        handleActive(e);

    });
});

// Switch Background =================================================

const randomBackEl = document.querySelectorAll('.random-backgrounds span');

//loop For All Spans

randomBackEl.forEach( span => {

    // Click On Every Span

    span.addEventListener('click', (e) => {

        // function To Handle Active Class

        handleActive(e);

        // Yes And No Option

        if (e.target.dataset.background === 'yes') {

            backgroundOption = true;

            randomizeImgs();

            localStorage.setItem('background-option', true);

        } else {

            backgroundOption = false;

            clearInterval(backgroundInterval);

            localStorage.setItem('background-option', false);
        }
    });
});

// Select Landing Page Element ========================================

let landingPage = document.querySelector('.landing-page');

// Get Array Of Images

let imgsArray = ['1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg'];

// Change Background ===================================================

// function to randomize images

function randomizeImgs () {

    if (backgroundOption === true) {

        backgroundInterval = setInterval( () => {

            // Get Random Array
        
            let randomNum = Math.floor(Math.random() * imgsArray.length);
        
            // Change Background Img URL
        
            landingPage.style.backgroundImage = 'url("Images/'+ imgsArray[randomNum] +'")';
        
            // Transition for move
        
            landingPage.style.transition = '1.5s'
        
        }, 3000);
    } 
}

randomizeImgs();

// Select Skills Selector ==================================================

let ourSkills = document.querySelector('.skills')

window.onscroll = function () {

    //Skills Offset Top .. The Height From Start To The Div

    let skillsOffsetTop = ourSkills.offsetTop;

    // Skills Outer Height .. The Height Of The Div

    let skillsOuterHeight = ourSkills.offsetHeight;

    //window height .. The Height Of The Window

    let windowHeight = this.innerHeight;

    //window ScrollTop .. The Height That Scrolled

    let windowScrollTop = this.pageYOffset;


    if (windowScrollTop >= (skillsOffsetTop + skillsOuterHeight - windowHeight)) {

        let allSkills = document.querySelectorAll('.skill-box .skill-progress span');

        allSkills.forEach(skill => {

            skill.style.width = skill.dataset.progress;
        });
    }
    
};

// Create A Popup With The Image ======================================================

let ourGallery = document.querySelectorAll('.gallery img');

ourGallery.forEach( img => {

    img.addEventListener('click', (e) => {

        // Create Overlay Element

        let overlay = document.createElement('div');

        // Add Class To Over Lay

        overlay.className = 'popup-overlay';

        // Append The Overlay Div In Body

        document.body.appendChild(overlay);

        // Create The Popup Box

        let popupBox = document.createElement('dix');

        // Add Class To The Popup Box 

        popupBox.className = 'popup-box';

        // Put Heading on The Top Of Image

        if (img.alt !== null) {

            // Create Heading

            let imgHeading = document.createElement('h3');

            // Create A Text For Heading

            let imgText = document.createTextNode(img.alt);

            // Append The Text To Heading

            imgHeading.appendChild(imgText);

            // Append The Heading To The Popup Box

            popupBox.appendChild(imgHeading);
        }

        // Create The Popup Image

        let popupImage = document.createElement('img');

        // Set Image Source 

        popupImage.src = img.src;

        // Append Img In The Popup Box

        popupBox.appendChild(popupImage);

        // Append THe Popup Box In The Body;

        document.body.appendChild(popupBox);

        // Create A Close Span

        let closeButton = document.createElement('span');

        // Create A Close Text

        let closeButtonText = document.createTextNode('X');

        // Append The Text To Close Button Span

        closeButton.appendChild(closeButtonText);

        // Add Class To Close Button

        closeButton.className = 'close-button';

        // Append Close Button To popup Box

        popupBox.appendChild(closeButton);
        
    });

});

// Close Popup

document.addEventListener('click', (e) => {

    if (e.target.className == 'close-button') {

        // Remove The Current Popup

        e.target.parentNode.remove();

        // Remove OverLay

        document.querySelector('.popup-overlay').remove();
    }
});

// Use Bullets to SCrolled To Sections =================================

// Select All Bullets

const allBullets = document.querySelectorAll('.nav-bullets .bullet');

// Select All Links

const allLinks = document.querySelectorAll('.links a');

// Function To Scroll

function scrollToSection (elements) {
    // Check All Links By Loop
    elements.forEach( element => {

        element.addEventListener('click', (e) => {
    
            e.preventDefault();
    
            document.querySelector(e.target.dataset.section).scrollIntoView({
    
                behavior:'smooth'
    
            });
    
        });
    
    });
} 

scrollToSection(allBullets);
scrollToSection(allLinks);

// Add And Remove Active Class ==========================================

function handleActive (ev) {

    // Remove Active Class From All Children

    ev.target.parentElement.querySelectorAll('.active').forEach( element => {

        element.classList.remove('active');
    });

    // Add Class Active

    ev.target.classList.add('active');
} 

// Show And Hide Bullets ================================================

let bulletsSpan = document.querySelectorAll('.bullets-option span');

let bulletsContainer = document.querySelector('.nav-bullets');

let bulletLocalItem = localStorage.getItem('bullets-option');

// Check local Storage

if (bulletLocalItem !== null) {

    bulletsSpan.forEach(span => {

        span.classList.remove('active');
    });

} 

if (bulletLocalItem === 'block') {

    bulletsContainer.style.display = 'block';

    document.querySelector('.bullets-option .yes').classList.add('active');

} else {

    bulletsContainer.style.display = 'none';

    document.querySelector('.bullets-option .no').classList.add('active');

}

// loop for Span

bulletsSpan.forEach( span => {

    span.addEventListener('click', (e) => {

        if(span.dataset.display === 'show') {

            bulletsContainer.style.display = 'block';

            localStorage.setItem('bullets-option', 'block');

        } else {

            bulletsContainer.style.display = 'none';

            localStorage.setItem('bullets-option', 'none');

        }

        // function To Handle Active Class

        handleActive(e);

    });

});

// Reset Button

document.querySelector('.reset-option').onclick = () => {

    //localStorage.clear(); ... to clear all Storage

    localStorage.removeItem('color-option');
    localStorage.removeItem('background-option');
    localStorage.removeItem('bullets-option');

    //reload Window

    window.location.reload();

}

// Toggle Menu ======================================================

let toggleBtn = document.querySelector('.toggle-menu');
let tLinks = document.querySelector('.links');

toggleBtn.onclick = function (e) {
    
    // Stop Propagation
    e.stopPropagation();

    // Toggle Class menu-Active On Button
    this.classList.toggle('menu-active');

    // Toggle Class Open On Links
    tLinks.classList.toggle('open');
};

// Click Anywhere Out Side Menu And Button

document.addEventListener('click', (e) => {

    if (e.target !== toggleBtn && e.target !== tLinks) {

        // Check if Menu IS Open
        if (tLinks.classList.contains('open')) {

            // Toggle Class menu-Active On Button
            toggleBtn.classList.toggle('menu-active');

            // Toggle Class Open On Links
            tLinks.classList.toggle('open');

        }
    }
});

//Stop Propagation

tLinks.onclick = function (e) {
    e.stopPropagation();
}
